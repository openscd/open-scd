import {html, TemplateResult} from "lit-element";
import {repeat} from "lit-html/directives/repeat";
import {get, translate} from "lit-translate";

import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-icon';

import {identity, isSame, newWizardEvent, Wizard} from "../foundation.js";

import {getOpenScdElement} from "./foundation.js";

interface CompareOptions {
  title: string;
}

export type Diff<T> =
  | { oldValue: T; newValue: null }
  | { oldValue: null; newValue: T }
  | { oldValue: T; newValue: T };

function describe(element: Element): string {
  const id = identity(element);
  return typeof id === 'string' ? id : get('unidentifiable');
}

export function diffSclAttributes(
  oldElement: Element,
  newElement: Element
): [string, Diff<string>][] {
  const attrDiffs: [string, Diff<string>][] = [];

  // First check if there is any text inside the element and there should be no child elements.
  const oldText = oldElement.textContent ?? '';
  const newText = newElement.textContent ?? '';
  if (oldElement.childElementCount === 0 &&
    newElement.childElementCount === 0 &&
    newText !== oldText
  ) {
    attrDiffs.push(['value', {oldValue: oldText, newValue: newText}]);
  }

  // Next check if there are any difference between attributes.
  const attributeNames = new Set(newElement.getAttributeNames().concat(oldElement.getAttributeNames()));
  for (const name of attributeNames) {
    if (newElement.getAttribute(name) !== oldElement.getAttribute(name)) {
      attrDiffs.push([
        name,
        <Diff<string>>{
          newValue: newElement.getAttribute(name),
          oldValue: oldElement.getAttribute(name),
        },
      ]);
    }
  }
  return attrDiffs;
}

export function diffSclChilds(
  oldElement: Element,
  newElement: Element
): Diff<Element>[] {
  const childDiffs: Diff<Element>[] = [];
  const oldChildren = Array.from(oldElement.children);
  const newChildren = Array.from(newElement.children);

  newChildren.forEach(newValue => {
    if (!newValue.closest('Private')) {
      const twinIndex = oldChildren.findIndex(ourChild => isSame(newValue, ourChild));
      const oldValue = twinIndex > -1 ? oldChildren[twinIndex] : null;

      if (oldValue) {
        oldChildren.splice(twinIndex, 1);
        childDiffs.push({newValue, oldValue})
      } else {
        childDiffs.push({newValue: newValue, oldValue: null})
      }
    }
  });
  oldChildren.forEach(oldValue => {
    if (!oldValue.closest('Private')) {
      childDiffs.push({newValue: null, oldValue});
    }
  });
  return childDiffs;
}

export function renderDiff(
  oldElement: Element,
  newElement: Element
): TemplateResult {
  // Determine the ID from the current tag. These can be numbers or strings.
  let idTitle = identity(oldElement).toString();
  if (idTitle && idTitle !== '' && idTitle !== 'NaN') {
    idTitle = '(' + idTitle + ')';
  } else {
    idTitle = '';
  }

  // First get all differences in attributes and text for the current 2 elements.
  const attrDiffs: [string, Diff<string>][] = diffSclAttributes(oldElement, newElement);
  // Next check which elements are added, deleted or in both elements.
  const childDiffs: Diff<Element>[] = diffSclChilds(oldElement, newElement);

  const childAddedOrDeleted: Diff<Element>[] = [];
  const childToCompare: Diff<Element>[] = [];
  childDiffs.forEach(diff => {
    if (!diff.oldValue || !diff.newValue) {
      childAddedOrDeleted.push(diff);
    } else {
      childToCompare.push(diff);
    }
  });

  return html`
    ${(attrDiffs.length || childAddedOrDeleted.length)
      ? html `
          <mwc-list multi>
            ${attrDiffs.length
              ? html`<mwc-list-item noninteractive>${translate('compas.compare.attributes')} ${oldElement.tagName} ${idTitle}</mwc-list-item>
                     <li padded divider role="separator"></li>`
              : ''}
            ${repeat(
                attrDiffs,
                e => e,
                ([name, diff]) =>
                  html`
                    <mwc-list-item twoline
                                   left
                                   hasMeta>
                      <span>${name}</span>
                      <span slot="secondary">${diff.oldValue ?? ''}
                        ${diff.oldValue && diff.newValue ? html`&cularr;` : ' '}
                        ${diff.newValue ?? ''}</span>
                      <mwc-icon slot="meta">
                        ${diff.oldValue
                          ? diff.newValue
                            ? 'edit'
                            : 'delete'
                          : 'add'}</mwc-icon>
                    </mwc-list-item>`
              )}
            ${childAddedOrDeleted.length
              ? html`<mwc-list-item noninteractive>${translate('compas.compare.children')} ${oldElement.tagName} ${idTitle}</mwc-list-item>
                     <li padded divider role="separator"></li>`
              : ''}
            ${repeat(
                childAddedOrDeleted,
                e => e,
                (diff) =>
                  html`
                    <mwc-list-item twoline
                                   left
                                   hasMeta>
                      <span>${diff.oldValue?.tagName ?? diff.newValue?.tagName}</span>
                      <span slot="secondary">
                          ${diff.oldValue ? describe(diff.oldValue) : describe(diff.newValue)}
                        </span>
                      <mwc-icon slot="meta">
                        ${diff.oldValue ? 'delete' : 'add'}
                      </mwc-icon>
                    </mwc-list-item>`
              )}
          </mwc-list>`
      : ''}

    ${repeat(
      childToCompare,
        e => e,
        (diff) => {
          return html`${renderDiff(diff.oldValue!, diff.newValue!)}`
        }
      )}`;
}

export function compareWizard(
  oldElement: Element,
  newElement: Element,
  options: CompareOptions
): Wizard {
  function close() {
    return function () {
      getOpenScdElement().dispatchEvent(newWizardEvent())
      return [];
    };
  }

  return [
    {
      title: options.title,
      secondary: {
        icon: '',
        label: get('close'),
        action: close(),
      },
      content: [
        html `${renderDiff(oldElement, newElement)}`
      ],
    },
  ];
}
