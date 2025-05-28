"use strict";
import {identity} from "../../../../openscd/src/foundation.js";
export function cleanSCLItems(cleanItems) {
  const actions = [];
  if (cleanItems) {
    cleanItems.forEach((item) => {
      actions.push({
        old: {
          parent: item.parentElement,
          element: item,
          reference: item.nextSibling
        }
      });
    });
  }
  return actions;
}
export function countBy(arr) {
  return arr.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
}
export function identitySort(elements) {
  return elements.sort((a, b) => {
    const aId = identity(a);
    const bId = identity(b);
    if (aId < bId) {
      return -1;
    }
    if (aId > bId) {
      return 1;
    }
    return 0;
  });
}
export function uniq(arr) {
  return Array.from(new Set(arr));
}
