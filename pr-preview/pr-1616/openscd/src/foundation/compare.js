import {html} from "../../../_snowpack/pkg/lit-element.js";
import {repeat} from "../../../_snowpack/pkg/lit-html/directives/repeat.js";
import {get} from "../../../_snowpack/pkg/lit-translate.js";
import "../../../_snowpack/pkg/@material/mwc-list.js";
import "../../../_snowpack/pkg/@material/mwc-list/mwc-list-item.js";
import "../../../_snowpack/pkg/@material/mwc-icon.js";
import {identity} from "../foundation.js";
import {attributeIcon, contentIcon, elementIcon} from "../icons/compare.js";
const diffTypeToIcon = new Map();
diffTypeToIcon.set("Attribute", attributeIcon);
diffTypeToIcon.set("Content", contentIcon);
diffTypeToIcon.set("Element", elementIcon);
function getDiffFilterSelector(elementToBeCompared, rootElementToBeCompared, filters) {
  const querySelector = rootElementToBeCompared === elementToBeCompared ? ":scope" : Object.keys(filters).find((selector) => Array.from(rootElementToBeCompared.querySelectorAll(selector)).includes(elementToBeCompared));
  return querySelector ? filters[querySelector] : void 0;
}
function shouldFilterElement(element, filter) {
  if (!filter || !filter.full) {
    return false;
  }
  const consumer = filter.full;
  return typeof consumer === "boolean" ? consumer : consumer(element);
}
function shouldFilterAttribute(element, attribute, filter) {
  if (!filter || !filter.attributes || !filter.attributes[attribute]) {
    return false;
  }
  const consumer = filter.attributes[attribute];
  return typeof consumer === "boolean" ? consumer : consumer(element);
}
function describe(element) {
  const id = identity(element);
  return typeof id === "string" ? id : get("unidentifiable");
}
export function diffSclAttributes(elementToBeCompared, elementToCompareAgainst, filterToIgnore, searchElementToBeCompared) {
  const attrDiffs = [];
  const newText = elementToBeCompared.textContent?.trim() ?? "";
  const oldText = elementToCompareAgainst.textContent?.trim() ?? "";
  if (elementToBeCompared.childElementCount === 0 && elementToCompareAgainst.childElementCount === 0 && newText !== oldText) {
    const shouldFilter = shouldFilterElement(elementToBeCompared, getDiffFilterSelector(elementToBeCompared, searchElementToBeCompared, filterToIgnore));
    if (!shouldFilter) {
      attrDiffs.push([
        "value",
        {type: "Content", newValue: newText, oldValue: oldText}
      ]);
    }
  }
  const attributeNames = new Set(elementToCompareAgainst.getAttributeNames().concat(elementToBeCompared.getAttributeNames()));
  for (const name of attributeNames) {
    const shouldFilter = shouldFilterAttribute(elementToBeCompared, name, getDiffFilterSelector(elementToBeCompared, searchElementToBeCompared, filterToIgnore));
    if (!shouldFilter && elementToCompareAgainst.getAttribute(name) !== elementToBeCompared.getAttribute(name)) {
      attrDiffs.push([
        name,
        {
          type: "Attribute",
          newValue: elementToBeCompared.getAttribute(name),
          oldValue: elementToCompareAgainst.getAttribute(name)
        }
      ]);
    }
  }
  return attrDiffs;
}
export function identityForCompare(element) {
  let identityOfElement = identity(element);
  if (typeof identityOfElement === "string") {
    identityOfElement = identityOfElement.split(">").pop() ?? "";
  }
  return identityOfElement;
}
export function isSame(newValue, oldValue) {
  return newValue.tagName === oldValue.tagName && identityForCompare(newValue) === identityForCompare(oldValue);
}
export function diffSclChilds(elementToBeCompared, elementToCompareAgainst, filterToIgnore, searchElementToBeCompared, searchElementToCompareAgainst) {
  const childDiffs = [];
  const childrenToBeCompared = Array.from(elementToBeCompared.children);
  const childrenToCompareTo = Array.from(elementToCompareAgainst.children);
  childrenToBeCompared.forEach((newElement) => {
    if (!newElement.closest("Private")) {
      const shouldFilter = shouldFilterElement(newElement, getDiffFilterSelector(newElement, searchElementToBeCompared, filterToIgnore));
      if (!shouldFilter) {
        const twinIndex = childrenToCompareTo.findIndex((ourChild) => isSame(newElement, ourChild));
        const oldElement = twinIndex > -1 ? childrenToCompareTo[twinIndex] : null;
        if (oldElement) {
          childrenToCompareTo.splice(twinIndex, 1);
          childDiffs.push({
            type: "Element",
            newValue: newElement,
            oldValue: oldElement
          });
        } else {
          childDiffs.push({
            type: "Element",
            newValue: newElement,
            oldValue: null
          });
        }
      }
    }
  });
  childrenToCompareTo.forEach((oldElement) => {
    if (!oldElement.closest("Private")) {
      const shouldFilter = shouldFilterElement(oldElement, getDiffFilterSelector(oldElement, searchElementToCompareAgainst, filterToIgnore));
      if (!shouldFilter) {
        childDiffs.push({
          type: "Element",
          newValue: null,
          oldValue: oldElement
        });
      }
    }
  });
  return childDiffs;
}
export function renderDiff(elementToBeCompared, elementToCompareAgainst, filterToIgnore = {}) {
  return renderDiffInternal(elementToBeCompared, elementToCompareAgainst, filterToIgnore, elementToBeCompared, elementToCompareAgainst);
}
function renderDiffInternal(elementToBeCompared, elementToCompareAgainst, filterToIgnore = {}, searchElementToBeCompared, searchElementToCompareAgainst) {
  let idTitle = identity(elementToBeCompared).toString();
  if (idTitle === "NaN") {
    idTitle = void 0;
  }
  searchElementToBeCompared = searchElementToBeCompared || elementToBeCompared;
  searchElementToCompareAgainst = searchElementToCompareAgainst || elementToCompareAgainst;
  const attrDiffs = diffSclAttributes(elementToBeCompared, elementToCompareAgainst, filterToIgnore, searchElementToBeCompared);
  const childDiffs = diffSclChilds(elementToBeCompared, elementToCompareAgainst, filterToIgnore, searchElementToBeCompared, searchElementToCompareAgainst);
  const childAddedOrDeleted = [];
  const childToCompare = [];
  childDiffs.forEach((diff) => {
    if (!diff.oldValue || !diff.newValue) {
      childAddedOrDeleted.push(diff);
    } else {
      childToCompare.push(diff);
    }
  });
  const childToCompareTemplates = childToCompare.map((diff) => renderDiff(diff.newValue, diff.oldValue, filterToIgnore)).filter((result) => result !== null);
  if (childToCompareTemplates.length > 0 || attrDiffs.length > 0 || childAddedOrDeleted.length > 0) {
    return html` ${attrDiffs.length > 0 || childAddedOrDeleted.length > 0 ? html`<div class="container container--alt">
          <div class="list__container list__container--left">
            <mwc-list multi right nonInteractive>
              ${repeat(attrDiffs, (e) => e, ([name, diff]) => html`<mwc-list-item right twoLine graphic="icon">
                    ${diff.oldValue !== null ? html`
                          <span>
                            ${name}:
                            ${diff.oldValue === "" ? '""' : diff.oldValue}
                          </span>
                          <span slot="secondary">${idTitle}</span>
                          <mwc-icon slot="graphic">
                            ${diffTypeToIcon.get(diff.type)}
                          </mwc-icon>
                        ` : ""}
                  </mwc-list-item>`)}
              ${repeat(childAddedOrDeleted, (e) => e, (diff) => html` <mwc-list-item right twoLine graphic="icon">
                    ${diff.oldValue ? html`
                          <span>${diff.oldValue.tagName}</span>
                          <span slot="secondary">
                            ${describe(diff.oldValue)}
                          </span>
                          <mwc-icon slot="graphic">
                            ${diffTypeToIcon.get(diff.type)}
                          </mwc-icon>
                        ` : ""}
                  </mwc-list-item>`)}
            </mwc-list>
          </div>
          <div class="list__container">
            <mwc-list multi left nonInteractive>
              ${repeat(attrDiffs, (e) => e, ([name, diff]) => html` <mwc-list-item left twoLine graphic="icon">
                    ${diff.newValue !== null ? html`
                          <span>
                            ${name}:
                            ${diff.newValue === "" ? '""' : diff.newValue}
                          </span>
                          <span slot="secondary">${idTitle}</span>
                          <mwc-icon slot="graphic">
                            ${diffTypeToIcon.get(diff.type)}
                          </mwc-icon>
                        ` : ""}
                  </mwc-list-item>`)}
              ${repeat(childAddedOrDeleted, (e) => e, (diff) => html` <mwc-list-item left twoLine graphic="icon">
                    ${diff.newValue ? html`
                          <span>${diff.newValue.tagName}</span>
                          <span slot="secondary">
                            ${describe(diff.newValue)}
                          </span>
                          <mwc-icon slot="graphic">
                            ${diffTypeToIcon.get(diff.type)}
                          </mwc-icon>
                        ` : ""}
                  </mwc-list-item>`)}
            </mwc-list>
          </div>
        </div>` : ""}
    ${childToCompareTemplates}`;
  }
  return null;
}
