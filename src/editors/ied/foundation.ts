import { getNameAttribute } from "../../foundation.js";

/**
 * Search for an element with a passed tag-name in the list of ancestors passed.
 * @param ancestors - The list of elements to search in for an LN or LN0 element.
 * @param tagName - The Tag-name of the element to search for.
 * @returns The found element with the tag-name or null if not found.
 */
export function findElement(ancestors: Element[], tagName: string): Element | null {
  return ancestors
    .find(element => element.tagName === tagName) ?? null;
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
    return element.closest('SCL')!.querySelector(`:root > DataTypeTemplates > DOType[id="${type}"]`);
  }
  return null;
}

/**
 * Get the instance element (SDI / DAI) of a DA element (if available)
 * @param parentInstance - The parent instance if available to search in for other instance elements.
 * @param da             - The (B)DA object to search with.
 * @returns The optional SDI / DAI element.
 */
export function getInstanceDAElement(parentInstance: Element | null, da: Element): Element | null {
  if (parentInstance) {
    const daName = getNameAttribute(da);
    const bType = da.getAttribute('bType');
    if (bType == 'Struct') {
      return parentInstance.querySelector(`:scope > SDI[name="${daName}"]`)
    }
    return parentInstance.querySelector(`:scope > DAI[name="${daName}"]`)
  }
  return null;
}

/**
 * Get the 'Val' element of another element.
 * @param element - The element to search for an 'Val' element.
 * @returns The 'Val' element, or null if not found.
 */
export function getValueElement(element: Element): Element | null {
  return element.querySelector('Val');
}
