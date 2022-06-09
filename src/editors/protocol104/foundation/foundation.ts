import { getInstanceAttribute, getNameAttribute } from '../../../foundation.js';

export const PRIVATE_TYPE_104 = 'IEC_60870_5_104';

/**
 * Retrieve the full path as wanted for the IED Container in the 104 Plugin, meaning we go higher in the
 * hierarchy until the parent found is the IED, this element is excluded, because the containers are group per
 * IED.
 * From all parent between the DAI and IED the name or likely attributes are used to define a unique name.
 *
 * @param element - The DAI Element for which the full path needs to be defined.
 * @param topLevelTagName - Name of the Tag to stop at when travelling through the parents (excluding).
 * @returns The full path shown to the user for a DAI Element.
 */
export function getFullPath(element: Element, topLevelTagName: string): string {
  let path = getNameAttribute(element) ?? '';
  let parent = element.parentElement;

  while (parent && parent.tagName != topLevelTagName) {
    let value: string | undefined;
    switch (parent.tagName) {
      case 'LN':
      case 'LN0': {
        const prefix = parent.getAttribute('prefix');
        const inst = getInstanceAttribute(parent);
        value = `${prefix ? prefix + '-' : ''}${parent.getAttribute(
          'lnClass'
        )}${inst ? '-' + inst : ''}`;
        break;
      }
      case 'LDevice': {
        value = getNameAttribute(parent) ?? getInstanceAttribute(parent);
        break;
      }
      default: {
        // Just add the name to the list
        value = getNameAttribute(parent);
      }
    }
    path = (value ? value + ' / ' : '') + path;
    parent = parent.parentElement;
  }
  return path;
}

/**
 * Retrieve the CDC Value that belongs to a DAI Element, meaning, using the DOI/LN Elements to
 * search for a DO Element, which is again used to find the DO/DOType Element. The DOType Element
 * finally holds the attribute 'cdc'.
 *
 * @param doiElement - The DOI Element to start the search for the CDC Value.
 * @returns The CDC Value from the DOType Element.
 */
export function getCdcValue(doiElement: Element): string | null {
  const lnElement = doiElement.closest('LN0, LN');
  if (lnElement) {
    const lnType = lnElement.getAttribute('lnType');
    const doName = doiElement.getAttribute('name');

    const doElement = doiElement.ownerDocument.querySelector(
      `LNodeType[id="${lnType}"] > DO[name="${doName}"]`
    );
    if (doElement) {
      const doType = doElement.getAttribute('type');
      const doTypeElement = doiElement.ownerDocument.querySelector(
        `DOType[id="${doType}"]`
      );
      return doTypeElement ? doTypeElement.getAttribute('cdc') : null;
    }
  }
  return null;
}

/**
 * All available Address attributes that can be displayed.
 */
const addressAttributes = [
  'casdu',
  'ioa',
  'ti',
  'expectedValue',
  'unitMultiplier',
  'scaleMultiplier',
  'scaleOffset',
  'inverted',
  'check',
];

/**
 * Create a string to display all information about a 104 Address element.
 * A list of attributes is used to determine what can be displayed if available.
 *
 * @param daiElement - The DAI Element used if the attribute 'expectedValue' exists to retrieve the Enum Value.
 * @param address    - The Address element from which to retrieve all attribute values.
 * @returns A string to display with all attribute values.
 */
export function get104DetailsLine(
  daiElement: Element,
  address: Element
): string {
  return addressAttributes
    .filter(attrName => address.hasAttribute(attrName))
    .map(attrName => {
      const value = address.getAttribute(attrName)!;
      if (attrName === 'expectedValue') {
        const enumValue = getEnumVal(
          daiElement.ownerDocument,
          daiElement,
          value
        );
        return `${attrName}: ${value}${enumValue ? ` (${enumValue})` : ``}`;
      } else {
        return `${attrName}: ${value}`;
      }
    })
    .join(', ');
}

/**
 * Search for a DAI Element below the passed DOI Element.
 *
 * @param doiElement - The DOI Element to search on.
 * @param name       - The name of the DAI Element to search for.
 * @returns The found DAI Element or null, if not found.
 */
export function getDaiElement(
  doiElement: Element,
  name: string
): Element | null {
  return doiElement.querySelector(`:scope > DAI[name="${name}"]`);
}

/**
 * Search for the Value of a DAI Element below the passed DOI Element.
 *
 * @param doiElement - The DOI Element to search on.
 * @param name       - The name of the DAI Element to search for.
 * @returns The value (Val) of the found DAI Element or null, if not found.
 */
export function getDaiValue(doiElement: Element, name: string): string | null {
  const daiElement = getDaiElement(doiElement, name);
  if (daiElement) {
    return daiElement.querySelector(':scope > Val')?.textContent ?? null;
  }
  return null;
}

/**
 * Search for the DAI Element 'ctlModel', this one indicates if control Addresses need to be created.
 *
 * @param doiElement - The DOI Element.
 * @returns The value of the CtlModel.
 */
export function getCtlModel(doiElement: Element): string | null {
  return getDaiValue(doiElement, 'ctlModel');
}

function buildInstanceChain(daiElement: Element) {
  const instanceElementChain: Element[] = [daiElement];
  let child = daiElement;
  if (child.parentElement) {
    do {
      child = child.parentElement;
      instanceElementChain.unshift(child);
    } while (!['LN', 'LN0'].includes(child.tagName) && child.parentElement);
  }
  return instanceElementChain;
}

function buildTemplateChainFromInstanceElements(
  document: Document,
  instanceChain: Element[]
): Element[] {
  const templateChain: Element[] = [];
  let typeElement: Element | null;
  instanceChain.forEach(element => {
    if (['LN', 'LN0'].includes(element.tagName)) {
      const typeId = element.getAttribute('lnType') ?? '';
      typeElement = document.querySelector(`LNodeType[id="${typeId}"]`);
    } else if (element.tagName === 'DOI') {
      const name = element.getAttribute('name');
      const doElement = typeElement?.querySelector(
        `:scope > DO[name="${name}"]`
      );
      if (doElement) {
        templateChain.push(doElement);

        const typeId = doElement.getAttribute('type') ?? '';
        typeElement = document.querySelector(`DOType[id="${typeId}"]`);
      }
    } else if (['SDI', 'DAI'].includes(element.tagName)) {
      const name = element.getAttribute('name');
      const daElement = typeElement?.querySelector(
        `:scope > DA[name="${name}"], :scope > BDA[name="${name}"]`
      );
      if (daElement) {
        templateChain.push(daElement);

        if (daElement.getAttribute('bType') === 'Struct') {
          const typeId = element.getAttribute('type') ?? '';
          typeElement = document.querySelector(`DAType[id="${typeId}"]`);
        }
      }
    }
  });
  return templateChain;
}

function getDaElement(
  document: Document,
  daiElement: Element
): Element | undefined {
  // First step is to create the list of instance elements
  const instanceChain = buildInstanceChain(daiElement);
  // Next step is to build the Template Chain from the instance elements
  const templateChain = buildTemplateChainFromInstanceElements(
    document,
    instanceChain
  );
  if (templateChain.length > 0) {
    const daElement = templateChain.pop();
    if (['DA', 'BDA'].includes(daElement!.tagName)) {
      return daElement;
    }
  }
  return undefined;
}

export function isEnumDataAttribute(
  document: Document,
  daiElement: Element
): boolean {
  const daElement = getDaElement(document, daiElement);
  if (daElement) {
    return daElement!.getAttribute('bType') === 'Enum';
  }
  return false;
}

export function getEnumVal(
  document: Document,
  daiElement: Element,
  ord: string
): string | null {
  const daElement = getDaElement(document, daiElement);
  if (daElement) {
    const enumType = daElement!.getAttribute('type');
    const enumVal = daiElement.ownerDocument.querySelector(
      `EnumType[id="${enumType}"] > EnumVal[ord="${ord}"]`
    );
    if (enumVal) {
      return enumVal.textContent;
    }
  }
  return null;
}

export function getEnumOrds(document: Document, daiElement: Element): string[] {
  const ords: string[] = [];
  const daElement = getDaElement(document, daiElement);
  if (daElement) {
    const enumType = daElement.getAttribute('type');
    const enumVals = daiElement.ownerDocument.querySelectorAll(
      `EnumType[id="${enumType}"] > EnumVal`
    );
    Array.from(enumVals)
      .filter(valElement => valElement.getAttribute('ord'))
      .map(valElement => ords.push(valElement.getAttribute('ord')!));
  }
  return ords;
}

/**
 * Enumeration stating the active view of the 104 plugin.
 */
export enum View {
  VALUES,
  NETWORK,
}

export const VIEW_EVENT_NAME = 'view-change-104-plugin';

// Objects needed to register and fire the change of a view within the Communication 104 Plugin
export interface ViewDetail {
  view: View;
}
export type ViewEvent = CustomEvent<ViewDetail>;
export function newViewEvent(view: View): ViewEvent {
  return new CustomEvent<ViewDetail>(VIEW_EVENT_NAME, {
    bubbles: true,
    composed: true,
    detail: { view },
  });
}

declare global {
  interface ElementEventMap {
    [VIEW_EVENT_NAME]: ViewEvent;
  }
}
