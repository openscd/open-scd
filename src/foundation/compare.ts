import { html, TemplateResult } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { get, translate } from 'lit-translate';

import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-icon';

import { identity } from '../foundation.js';

export type Diff<T> =
  | { oldValue: T; newValue: null }
  | { oldValue: null; newValue: T }
  | { oldValue: T; newValue: T };

/**
 * Returns the description of the Element that differs.
 *
 * @param element - The Element to retrieve the identifier from.
 */
function describe(element: Element): string {
  const id = identity(element);
  return typeof id === 'string' ? id : get('unidentifiable');
}

/**
 * Check if there are any attribute values changed between the old and new element.
 *
 * @param oldElement - The old element to check the attributes from.
 * @param newElement - The new element to check the attributes to.
 */
export function diffSclAttributes(
  oldElement: Element,
  newElement: Element
): [string, Diff<string>][] {
  const attrDiffs: [string, Diff<string>][] = [];

  // First check if there is any text inside the element and there should be no child elements.
  const oldText = oldElement.textContent?.trim() ?? '';
  const newText = newElement.textContent?.trim() ?? '';
  if (
    oldElement.childElementCount === 0 &&
    newElement.childElementCount === 0 &&
    newText !== oldText
  ) {
    attrDiffs.push(['value', { oldValue: oldText, newValue: newText }]);
  }

  // Next check if there are any difference between attributes.
  const attributeNames = new Set(
    newElement.getAttributeNames().concat(oldElement.getAttributeNames())
  );
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

/**
 * Function to retrieve the identity to compare 2 children on the same level.
 * This means we only need to last part of the Identity string to compare the children.
 *
 * @param element - The element to retrieve the identity from.
 */
export function identityForCompare(element: Element): string | number {
  let identityOfElement = identity(element);
  if (typeof identityOfElement === 'string') {
    identityOfElement = identityOfElement.split('>').pop() ?? '';
  }
  return identityOfElement;
}

/**
 * Custom method for comparing to check if 2 elements are the same. Because they are on the same level
 * we don't need to compare the full identity, we just compare the part of the Element itself.
 *
 * <b>Remark</b>Private elements are already filtered out, so we don't need to bother them.
 *
 * @param newValue - The new element to compare with the old element.
 * @param oldValue - The old element to which the new element is compared.
 */
export function isSame(newValue: Element, oldValue: Element): boolean {
  return (
    newValue.tagName === oldValue.tagName &&
    identityForCompare(newValue) === identityForCompare(oldValue)
  );
}

/**
 * List of all differences between children elements that both old and new element have.
 * The list contains children both elements have and children that were added or removed
 * from the new element.
 * <b>Remark</b>: Private elements are ignored.
 *
 * @param oldElement - The old element to retrieve the children from.
 * @param newElement - The new element to retrieve the children from.
 */
export function diffSclChilds(
  oldElement: Element,
  newElement: Element
): Diff<Element>[] {
  const childDiffs: Diff<Element>[] = [];
  const oldChildren = Array.from(oldElement.children);
  const newChildren = Array.from(newElement.children);

  newChildren.forEach(newValue => {
    if (!newValue.closest('Private')) {
      const twinIndex = oldChildren.findIndex(ourChild =>
        isSame(newValue, ourChild)
      );
      const oldValue = twinIndex > -1 ? oldChildren[twinIndex] : null;

      if (oldValue) {
        oldChildren.splice(twinIndex, 1);
        childDiffs.push({ newValue, oldValue });
      } else {
        childDiffs.push({ newValue: newValue, oldValue: null });
      }
    }
  });
  oldChildren.forEach(oldValue => {
    if (!oldValue.closest('Private')) {
      childDiffs.push({ newValue: null, oldValue });
    }
  });
  return childDiffs;
}

/**
 * Generate HTML (TemplateResult) containing all the differences between the two elements passed.
 * If null is returned there are no differences between the two elements.
 *
 * @param oldElement - The old element to check for differences.
 * @param newElement - The new element which is checked against the old element for differences.
 */
export function renderDiff(
  oldElement: Element,
  newElement: Element
): TemplateResult | null {
  // Determine the ID from the current tag. These can be numbers or strings.
  let idTitle = identity(oldElement).toString();
  if (idTitle && idTitle !== '' && idTitle !== 'NaN') {
    idTitle = '(' + idTitle + ')';
  } else {
    idTitle = '';
  }

  // First get all differences in attributes and text for the current 2 elements.
  const attrDiffs: [string, Diff<string>][] = diffSclAttributes(
    oldElement,
    newElement
  );
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

  // These children exist in both old and new element, let's check if there are any difference in the children.
  const childToCompareTemplates = childToCompare
    .map(diff => renderDiff(diff.oldValue!, diff.newValue!))
    .filter(result => result !== null);

  // If there are difference generate the HTML otherwise just return null.
  if (
    childToCompareTemplates.length > 0 ||
    attrDiffs.length > 0 ||
    childAddedOrDeleted.length > 0
  ) {
    return html` ${attrDiffs.length > 0 || childAddedOrDeleted.length > 0
      ? html` <mwc-list multi>
          ${attrDiffs.length > 0
            ? html` <mwc-list-item noninteractive
                  >${translate('compare.attributes', {
                    elementName: `${oldElement.tagName} ${idTitle}`,
                  })}
                </mwc-list-item>
                <li padded divider role="separator"></li>`
            : ''}
          ${repeat(
            attrDiffs,
            e => e,
            ([name, diff]) =>
              html` <mwc-list-item twoline left hasMeta>
                <span>${name}</span>
                <span slot="secondary">
                  ${diff.oldValue ?? ''}
                  ${diff.oldValue && diff.newValue ? html`&cularr;` : ' '}
                  ${diff.newValue ?? ''}
                </span>
                <mwc-icon slot="meta">
                  ${diff.oldValue ? (diff.newValue ? 'edit' : 'delete') : 'add'}
                </mwc-icon>
              </mwc-list-item>`
          )}
          ${childAddedOrDeleted.length > 0
            ? html` <mwc-list-item noninteractive
                  >${translate('compare.children', {
                    elementName: `${oldElement.tagName} ${idTitle}`,
                  })}
                </mwc-list-item>
                <li padded divider role="separator"></li>`
            : ''}
          ${repeat(
            childAddedOrDeleted,
            e => e,
            diff =>
              html` <mwc-list-item twoline left hasMeta>
                <span>${diff.oldValue?.tagName ?? diff.newValue?.tagName}</span>
                <span slot="secondary">
                  ${diff.oldValue
                    ? describe(diff.oldValue)
                    : describe(diff.newValue)}
                </span>
                <mwc-icon slot="meta">
                  ${diff.oldValue ? 'delete' : 'add'}
                </mwc-icon>
              </mwc-list-item>`
          )}
        </mwc-list>`
      : ''}
    ${childToCompareTemplates}`;
  }
  return null;
}
