import {html} from "lit-element";
import {repeat} from "lit-html/directives/repeat";
import {get, translate} from "lit-translate";

import {
  EditorAction,
  identity,
  isEqual,
  isSame,
  newWizardEvent,
  Wizard,
  WizardActor
} from "../foundation.js";

import "../compas/CompasCompareDialog.js";
import {ListItem} from "@material/mwc-list/mwc-list-item";

interface MergeOptions {
  title?: string;
  selected?: (diff: Diff<Element | string>) => boolean;
  auto?: (oldValue: Element, newValue: Element) => boolean;
}

export type Diff<T> =
  | { oldValue: T; newValue: null }
  | { oldValue: null; newValue: T }
  | { oldValue: T; newValue: T };

function describe(element: Element): string {
  const id = identity(element);

  return typeof id === 'string' ? id.replace(/^>/, '') : get('unidentifiable');
}

function compareWizardAction(
  attrDiffs: [string, Diff<string>][],
  childDiffs: Diff<Element>[],
  oldValue: Element,
  newValue: Element,
  options?: MergeOptions
): WizardActor {
  return (_, wizard: Element): EditorAction[] => {
    let acted = false;
    const checkList = wizard.shadowRoot!.querySelector('mwc-list')!;

    const selectedChildDiffs = (<ListItem[]>checkList.selected)
      .filter(item => item.classList.contains('child'))
      .map(item => childDiffs[item.value as unknown as number]);
    if (selectedChildDiffs.length) {
      for (const diff of selectedChildDiffs)
        if (diff.oldValue && diff.newValue) {
          acted = true;
          wizard.dispatchEvent(
            newWizardEvent(
              compareWizard(diff.oldValue, diff.newValue, {
                ...options,
                title: undefined,
              })
            )
          );
        }
    }

    if (!acted) {
      wizard.dispatchEvent(newWizardEvent());
    }

    return [
      {
        actions: [],
        title: get('compas.compare.elementTitle', {
          oldValue: describe(oldValue),
          newValue: describe(newValue),
          tag: oldValue.tagName,
        }),
      },
    ];
  };
}

export function compareWizard(
  oldElement: Element,
  newElement: Element,
  options?: MergeOptions
): Wizard {
  const attrDiffs: [string, Diff<string>][] = [];
  const oldText = oldElement.textContent ?? '';
  const newText = newElement.textContent ?? '';

  if (oldElement.childElementCount === 0 &&
    newElement.childElementCount === 0 &&
    newText !== oldText
  ) {
    attrDiffs.push(['value', {oldValue: oldText, newValue: newText}]);
  }

  const attributeNames = new Set(newElement.getAttributeNames().concat(oldElement.getAttributeNames()));

  for (const name of attributeNames)
    if (newElement.getAttribute(name) !== oldElement.getAttribute(name))
      attrDiffs.push([
        name,
        <Diff<string>>{
          newValue: newElement.getAttribute(name),
          oldValue: oldElement.getAttribute(name),
        },
      ]);

  const childDiffs: Diff<Element>[] = [];
  const ourChildren = Array.from(oldElement.children);
  const theirChildren = Array.from(newElement.children);

  theirChildren.forEach(newValue => {
    const twinIndex = ourChildren.findIndex(ourChild =>
      isSame(newValue, ourChild)
    );
    const oldValue = twinIndex > -1 ? ourChildren[twinIndex] : null;

    if (oldValue) ourChildren.splice(twinIndex, 1);
    if (oldValue && isEqual(newValue, oldValue)) return;

    if (!oldValue || !isEqual(newValue, oldValue)) childDiffs.push({ newValue, oldValue });
  });

  ourChildren.forEach(oldValue => childDiffs.push({ newValue: null, oldValue }));

  return [
    {
      title:
        options?.title ??
        get('compas.compare.elementTitle', {
          oldValue: describe(oldElement),
          newValue: describe(newElement),
          tag: oldElement.tagName,
        }),
      primary: {
        label: get('compas.compare.primaryButton'),
        icon: 'compare',
        action: compareWizardAction(attrDiffs, childDiffs, oldElement, newElement, options),
        auto: options?.auto?.(oldElement, newElement) ?? false,
      },
      content: [
        html`
          <mwc-list multi>
            ${repeat(
              attrDiffs,
              e => e,
              ([name, diff]) =>
                html`<mwc-list-item twoline
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

            ${childDiffs.length
              ? html`<mwc-list-item noninteractive>${translate('compas.compare.children')}</mwc-list-item>
                     <li padded divider role="separator"></li>`
              : ''}
            ${repeat(
                childDiffs,
                e => e,
                (diff, index) => {
                  if (diff.oldValue && diff.newValue) {
                    return html`
                      <mwc-check-list-item value=${index}
                                           class="child"
                                           twoline
                                           left
                                           hasMeta
                                           .selected=${options?.selected?.(diff) ?? false}
                                           style="--mdc-checkbox-checked-color: var(--mdc-theme-
                                                      ${diff.oldValue
                                                        ? diff.newValue
                                                          ? 'secondary'
                                                          : 'error'
                                                        : 'primary'});">
                        <span>${diff.oldValue?.tagName ?? diff.newValue?.tagName}</span>
                        <span slot="secondary">
                          ${describe(diff.oldValue)}
                          ${describe(diff.oldValue) && describe(diff.newValue) ? html`&cularr;` : html``}
                          ${describe(diff.newValue)}
                        </span>
                        <mwc-icon slot="meta">compare</mwc-icon>
                      </mwc-check-list-item>`
                  }
                  return html`
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
                }
              )}
          </mwc-list>`,
      ],
    },
  ];
}
