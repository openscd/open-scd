'use strict';

import { identity, Delete } from '../../foundation.js';

/**
 * Clean SCL items as requested by removing SCL elements specified from the SCL file
 * @returns an actions array to support undo/redo
 */
export function cleanSCLItems(cleanItems: Element[]): Delete[] {
  const actions: Delete[] = [];
  if (cleanItems) {
    cleanItems.forEach(item => {
      actions.push({
        old: {
          parent: <Element>item.parentElement!,
          element: item,
          reference: <Node | null>item!.nextSibling,
        },
      });
    });
  }
  return actions;
}

/**
 * Sort a list of Elements by their identity string.
 * @param elements - an array of Elements.
 * @returns a sorted list of elements.
 */
export function identitySort(elements: Element[]): Element[] {
  return elements.sort((a: Element, b: Element) => {
    // sorting using the identity ensures sort order includes IED and other useful properties
    const aId = identity(a);
    const bId = identity(b);
    if (aId < bId) {
      return -1;
    }
    if (aId > bId) {
      return 1;
    }
    // names must be equal
    return 0;
  });
}
