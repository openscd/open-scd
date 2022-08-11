import { html, TemplateResult } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { get, translate } from 'lit-translate';

import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-icon';

import { identity } from '../foundation.js';
import { nothing } from 'lit-html';

export type Diff<T> =
  | { oldValue: T; newValue: null }
  | { oldValue: null; newValue: T }
  | { oldValue: T; newValue: T };

/**
 * Type to filter out a difference based on `tagName`.`attributeName`
 *
 * The matcher can be a boolean or a `consumer` that returns a boolean
 */
export interface DiffFilter<T> {
  [selector: string]: DiffFilterSelector<T>;
};

interface DiffFilterSelector<T> {
  full?: DiffFilterConsumer<T>;
  attributes?: {
    [name: string]: DiffFilterConsumer<T>;
  };
}

/**
 * Consumer to match if a diff should be filtered out.
 */
type DiffFilterConsumer<T> = boolean | ((value: T | null) => boolean);

function getDiffFilterSelector(
  elementToBeCompared: Element,
  rootElementToBeCompared: Element,
  filters: DiffFilter<Element>
): DiffFilterSelector<Element> | undefined {
  const querySelector: string | undefined =
    rootElementToBeCompared === elementToBeCompared
      ? ':scope'
      : Object.keys(filters).find(selector =>
          Array.from(
            rootElementToBeCompared.querySelectorAll(selector)
          ).includes(elementToBeCompared)
        );

  return querySelector ? filters[querySelector!] : undefined;
}

function shouldFilterElement(
  element: Element,
  filter: DiffFilterSelector<Element> | undefined
): boolean {
  if (!filter || !filter.full) {
    return false;
  }
  const consumer: DiffFilterConsumer<Element> = filter!.full!;

  return typeof consumer === 'boolean' ? consumer : consumer(element);
}

function shouldFilterAttribute(
  element: Element,
  attribute: string,
  filter: DiffFilterSelector<Element> | undefined
): boolean {
  if (!filter || !filter.attributes || !filter.attributes![attribute]) {
    return false;
  }
  const consumer: DiffFilterConsumer<Element> = filter!.attributes![attribute];

  return typeof consumer === 'boolean' ? consumer : consumer(element);
}

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
 * Check if there are any attribute values changed between the two elements.
 *
 * @param elementToBeCompared     - The element to check for differences.
 * @param elementToCompareAgainst - The element used to check against.
 */
export function diffSclAttributes(
  elementToBeCompared: Element,
  elementToCompareAgainst: Element,
  filterToIgnore: DiffFilter<Element>,
  searchElementToBeCompared: Element,
): [string, Diff<string>][] {

  const attrDiffs: [string, Diff<string>][] = [];

  // First check if there is any text inside the element and there should be no child elements.
  const newText = elementToBeCompared.textContent?.trim() ?? '';
  const oldText = elementToCompareAgainst.textContent?.trim() ?? '';
  if (
    elementToBeCompared.childElementCount === 0 &&
    elementToCompareAgainst.childElementCount === 0 &&
    newText !== oldText
  ) {
    const shouldFilter: boolean = shouldFilterElement(
      elementToBeCompared,
      getDiffFilterSelector(
        elementToBeCompared,
        searchElementToBeCompared,
        filterToIgnore
      )
    );

    if (!shouldFilter) {
      attrDiffs.push(['value', { newValue: newText, oldValue: oldText }]);
    }
  }

  // Next check if there are any difference between attributes.
  const attributeNames = new Set(
    elementToCompareAgainst
      .getAttributeNames()
      .concat(elementToBeCompared.getAttributeNames())
  );
  for (const name of attributeNames) {
    const shouldFilter: boolean = shouldFilterAttribute(
      elementToBeCompared,
      name,
      getDiffFilterSelector(
        elementToBeCompared,
        searchElementToBeCompared,
        filterToIgnore
      )
    );
    if (
      !shouldFilter &&
      elementToCompareAgainst.getAttribute(name) !==
        elementToBeCompared.getAttribute(name)
    ) {
      attrDiffs.push([
        name,
        <Diff<string>>{
          newValue: elementToBeCompared.getAttribute(name),
          oldValue: elementToCompareAgainst.getAttribute(name),
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
 * @param elementToBeCompared     - The element to check for differences.
 * @param elementToCompareAgainst - The element used to check against.
 */
export function diffSclChilds(
  elementToBeCompared: Element,
  elementToCompareAgainst: Element,
  filterToIgnore: DiffFilter<Element>,
  searchElementToBeCompared: Element,
  searchElementToCompareAgainst: Element
): Diff<Element>[] {
  const childDiffs: Diff<Element>[] = [];
  const childrenToBeCompared = Array.from(elementToBeCompared.children);
  const childrenToCompareTo = Array.from(elementToCompareAgainst.children);

  childrenToBeCompared.forEach(newElement => {
    if (!newElement.closest('Private')) {
      const shouldFilter: boolean = shouldFilterElement(
        newElement,
        getDiffFilterSelector(
          newElement,
          searchElementToBeCompared,
          filterToIgnore 
        )
      );
      if (!shouldFilter) {
        const twinIndex = childrenToCompareTo.findIndex(ourChild =>
          isSame(newElement, ourChild)
        );
        const oldElement =
          twinIndex > -1 ? childrenToCompareTo[twinIndex] : null;

        if (oldElement) {
          childrenToCompareTo.splice(twinIndex, 1);
          childDiffs.push({ newValue: newElement, oldValue: oldElement });
        } else {
          childDiffs.push({ newValue: newElement, oldValue: null });
        }
      }
    }
  });
  childrenToCompareTo.forEach(oldElement => {
    if (!oldElement.closest('Private')) {
      const shouldFilter: boolean = shouldFilterElement(
        oldElement,
        getDiffFilterSelector(
          oldElement,
          searchElementToCompareAgainst,
          filterToIgnore
        )
      );
      if (!shouldFilter) {
        childDiffs.push({ newValue: null, oldValue: oldElement });
      }
    }
  });
  return childDiffs;
}

/**
 * Generate HTML (TemplateResult) containing all the differences between the two elements passed.
 * If null is returned there are no differences between the two elements.
 *
 * @param elementToBeCompared     - The element to check for differences.
 * @param elementToCompareAgainst - The element used to check against.
 */
export function renderDiff(
  elementToBeCompared: Element,
  elementToCompareAgainst: Element,
  filterToIgnore: DiffFilter<Element> = {},
  searchElementToBeCompared?: Element,
  searchElementToCompareAgainst?: Element
): TemplateResult | null {
  // Determine the ID from the current tag. These can be numbers or strings.
  let idTitle: string | undefined = identity(elementToBeCompared).toString();
  if (idTitle === 'NaN') {
    idTitle = undefined;
  }

  // Set the root elements if they are not defined yet
  searchElementToBeCompared = searchElementToBeCompared || elementToBeCompared;
  searchElementToCompareAgainst =
    searchElementToCompareAgainst || elementToCompareAgainst;

  const attrDiffs: [string, Diff<string>][] = diffSclAttributes(
    elementToBeCompared,
    elementToCompareAgainst,
    filterToIgnore,
    searchElementToBeCompared,
  );

  // Next check which elements are added, deleted or in both elements.
  const childDiffs: Diff<Element>[] = diffSclChilds(
    elementToBeCompared,
    elementToCompareAgainst,
    filterToIgnore,
    searchElementToBeCompared,
    searchElementToCompareAgainst
  );

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
    .map(diff =>
      renderDiff(
        diff.newValue!,
        diff.oldValue!,
        filterToIgnore,
        searchElementToBeCompared,
        searchElementToCompareAgainst
      )
    )
    .filter(result => result !== null);

  // If there are difference generate the HTML otherwise just return null.
  if (
    childToCompareTemplates.length > 0 ||
    attrDiffs.length > 0 ||
    childAddedOrDeleted.length > 0
  ) {
    return html` ${
      attrDiffs.length > 0 || childAddedOrDeleted.length > 0
        ? html` <mwc-list multi>
          ${
            attrDiffs.length > 0
              ? html` <mwc-list-item noninteractive ?twoline=${!!idTitle}>
                  <span class="resultTitle">
                    ${translate('compare.attributes', {
                      elementName: elementToBeCompared.tagName,
                    })}
                  </span>
                  ${
                    idTitle
                      ? html`<span slot="secondary">${idTitle}</span>`
                      : nothing
                  }
                </mwc-list-item>
                <li padded divider role="separator"></li>`
              : ''
          }
          ${repeat(
            attrDiffs,
            e => e,
            ([name, diff]) =>
              html` <mwc-list-item twoline left hasMeta>
                <span>${name}</span>
                <span slot="secondary">
                  ${diff.oldValue ?? ''}
                  ${diff.oldValue && diff.newValue ? html`&curarr;` : ' '}
                  ${diff.newValue ?? ''}
                </span>
                <mwc-icon slot="meta">
                  ${diff.oldValue ? (diff.newValue ? 'edit' : 'delete') : 'add'}
                </mwc-icon>
              </mwc-list-item>`
          )}
          ${
            childAddedOrDeleted.length > 0
              ? html` <mwc-list-item noninteractive ?twoline=${!!idTitle}>
                  <span class="resultTitle">
                    ${translate('compare.children', {
                      elementName: elementToBeCompared.tagName,
                    })}
                  </span>
                  ${
                    idTitle
                      ? html`<span slot="secondary">${idTitle}</span>`
                      : nothing
                  }
                </mwc-list-item>
                <li padded divider role="separator"></li>`
              : ''
          }
          ${repeat(
            childAddedOrDeleted,
            e => e,
            diff =>
              html` <mwc-list-item twoline left hasMeta>
                <span>${diff.oldValue?.tagName ?? diff.newValue?.tagName}</span>
                <span slot="secondary">
                  ${
                    diff.oldValue
                      ? describe(diff.oldValue)
                      : describe(diff.newValue)
                  }
                </span>
                <mwc-icon slot="meta">
                  ${diff.oldValue ? 'delete' : 'add'}
                </mwc-icon>
              </mwc-list-item>`
          )}
        </mwc-list>`
        : ''
    }
    ${childToCompareTemplates}`;
  }
  return null;
}
