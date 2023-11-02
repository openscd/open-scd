import { LitElement, property } from 'lit-element';

import { getInstanceAttribute, getNameAttribute } from '../../foundation.js';
import { Nsdoc } from '../../foundation/nsdoc.js';

/** Base class for all containers inside the IED Editor. */
export class Container extends LitElement {
  @property()
  doc!: XMLDocument;
  @property({ type: Number })
  editCount = -1;

  @property({ attribute: false })
  element!: Element;

  @property()
  nsdoc!: Nsdoc;

  @property()
  ancestors: Element[] = [];

  constructor() {
    super();

    this.addEventListener('focus', event => {
      event.stopPropagation();
      const pathOfAncestorNames = this.ancestors.map(
        ancestor => getTitleForElementPath(ancestor)!
      );
      pathOfAncestorNames.push(getTitleForElementPath(this.element)!);

      this.dispatchEvent(newFullElementPathEvent(pathOfAncestorNames));
    });

    this.addEventListener('blur', () => {
      this.dispatchEvent(
        newFullElementPathEvent(
          this.ancestors.map(ancestor => getTitleForElementPath(ancestor)!)
        )
      );
    });
  }
}

/**
 * Search for an element with a passed tag-name in the list of ancestors passed.
 * @param ancestors - The list of elements to search in for an LN or LN0 element.
 * @param tagName - The Tag-name of the element to search for.
 * @returns The found element with the tag-name or null if not found.
 */
export function findElement(
  ancestors: Element[],
  tagName: string
): Element | null {
  return ancestors.find(element => element.tagName === tagName) ?? null;
}

/**
 * Search for the LN0 or LN element in the list of ancestors passed.
 * @param ancestors - The list of elements to search in for an LN or LN0 element.
 * @returns The LN0/LN Element found or null if not found.
 */
export function findLogicaNodeElement(ancestors: Element[]): Element | null {
  let element = findElement(ancestors, 'LN0');
  if (!element) {
    element = findElement(ancestors, 'LN');
  }
  return element;
}

/**
 * With the passed DO Element retrieve the type attribute and search for the DOType in the DataType Templates section.
 * @param element - The DO Element.
 * @returns The DOType element found in the DataType Templates section or null if it not exists.
 */
export function findDOTypeElement(element: Element | null): Element | null {
  if (element && element.hasAttribute('type')) {
    const type = element.getAttribute('type');
    return element
      .closest('SCL')!
      .querySelector(`:root > DataTypeTemplates > DOType[id="${type}"]`);
  }
  return null;
}

/**
 * Get the instance element (SDI / DAI) of a DA element (if available)
 * @param parentInstance - The parent instance if available to search in for other instance elements.
 * @param da             - The (B)DA object to search with.
 * @returns The optional SDI / DAI element.
 */
export function getInstanceDAElement(
  parentInstance: Element | null,
  da: Element
): Element | null {
  if (parentInstance) {
    const daName = getNameAttribute(da);
    const bType = da.getAttribute('bType');
    if (bType == 'Struct') {
      return parentInstance.querySelector(`:scope > SDI[name="${daName}"]`);
    }
    return parentInstance.querySelector(`:scope > DAI[name="${daName}"]`);
  }
  return null;
}

export function getTitleForElementPath(element: Element): string {
  switch (element.tagName) {
    case 'LN':
    case 'LN0': {
      return element.getAttribute('lnClass')!;
    }
    case 'LDevice': {
      return (getNameAttribute(element) ?? getInstanceAttribute(element))!;
    }
    case 'Server': {
      return 'Server';
    }
    default: {
      return element.getAttribute('name')!;
    }
  }
}

/** @returns  Array of 'Val' elements for a given parent data attribute */
export function getValueElements(parent: Element): Element[] {
  return Array.from(parent.querySelectorAll('Val'));
}

export interface FullElementPathDetail {
  elementNames: string[];
}
export type FullElementPathEvent = CustomEvent<FullElementPathDetail>;
export function newFullElementPathEvent(
  elementNames: string[],
  eventInitDict?: CustomEventInit<FullElementPathDetail>
): FullElementPathEvent {
  return new CustomEvent<FullElementPathDetail>('full-element-path', {
    bubbles: true,
    composed: true,
    ...eventInitDict,
    detail: { elementNames, ...eventInitDict?.detail },
  });
}

declare global {
  interface ElementEventMap {
    ['full-element-path']: FullElementPathEvent;
  }
}
