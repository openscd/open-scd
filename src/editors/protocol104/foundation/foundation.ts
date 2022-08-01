import { html, TemplateResult } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { translate } from 'lit-translate';
import { getInstanceAttribute, getNameAttribute } from '../../../foundation.js';
import { typeMaxLength } from '../../../wizards/foundation/p-types.js';
import { typeDescriptiveNameKeys, typePattern } from './p-types.js';

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
  let currentElement: Element | null = element;
  const paths: string[] = [];

  do {
    let value: string | undefined;
    switch (currentElement.tagName) {
      case 'LN':
      case 'LN0': {
        const prefix = currentElement.getAttribute('prefix');
        const inst = getInstanceAttribute(currentElement);
        value = `${prefix ? prefix + '-' : ''}${currentElement.getAttribute(
          'lnClass'
        )}${inst ? '-' + inst : ''}`;
        break;
      }
      case 'LDevice': {
        value =
          getNameAttribute(currentElement) ??
          getInstanceAttribute(currentElement);
        break;
      }
      default: {
        // Just add the name to the list
        value = getNameAttribute(currentElement);
      }
    }
    if (value) {
      paths.unshift(value);
    }
    currentElement = currentElement.parentElement;
  } while (currentElement && currentElement.tagName != topLevelTagName);

  return paths.join(' / ');
}

/**
 * Retrieve the CDC Value that belongs to a DAI Element, meaning, using the DOI/LN Elements to
 * search for a DO Element, which is again used to find the DO/DOType Element. The DOType Element
 * finally holds the attribute 'cdc'.
 *
 * @param doiElement - The DOI Element to start the search for the CDC Value.
 * @returns The CDC Value from the DOType Element.
 */
export function getCdcValueFromDOIElement(doiElement: Element): string | null {
  const lnElement = doiElement.closest('LN0, LN');
  if (lnElement) {
    const lnType = lnElement.getAttribute('lnType');
    const doName = doiElement.getAttribute('name');

    const doElement = doiElement.ownerDocument.querySelector(
      `:root > DataTypeTemplates > LNodeType[id="${lnType}"] > DO[name="${doName}"]`
    );
    if (doElement) {
      return getCdcValueFromDOElement(doElement);
    }
  }
  return null;
}

export function getCdcValueFromDOElement(doElement: Element): string | null {
  const doType = getTypeAttribute(doElement);
  const doTypeElement = doElement.ownerDocument.querySelector(
    `:root > DataTypeTemplates > DOType[id="${doType}"]`
  );
  return doTypeElement ? doTypeElement.getAttribute('cdc') : null;
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
        const enumValue = getEnumVal(daiElement, value);
        return `${attrName}: ${value}${enumValue ? ` (${enumValue})` : ``}`;
      } else {
        return `${attrName}: ${value}`;
      }
    })
    .join(', ');
}

/**
 * Extract the 'type' attribute from the given XML element.
 * @param element - The element to extract instance from.
 * @returns the value, or undefined if there is no instance.
 */
export function getTypeAttribute(element: Element): string | undefined {
  const type = element.getAttribute('type');
  return type ? type : undefined;
}

/**
 * Search for a DAI Element below the passed DOI Element.
 *
 * @param doElement - The DO Element to search on.
 * @param name      - The name of the DA Element to search for.
 * @returns The found DA Element or null, if not found.
 */
export function getDaElement(doElement: Element, name: string): Element | null {
  const doType = getTypeAttribute(doElement);
  if (doType) {
    return doElement.ownerDocument.querySelector(
      `:root > DataTypeTemplates > DOType[id="${doType}"] > DA[name="${name}"]`
    );
  }
  return null;
}

/**
 * Search for the Value of a DAI Element below the passed DOI Element.
 *
 * @param doElement - The DO Element to search on.
 * @param name      - The name of the DA Element to search for.
 * @returns The value (Val) of the found DA Element or null, if not found.
 */
export function getDaValue(doElement: Element, name: string): string | null {
  const daElement = getDaElement(doElement, name);
  if (daElement) {
    return daElement.querySelector(':scope > Val')?.textContent ?? null;
  }
  return null;
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

export function getDoiElement(
  lnElement: Element,
  doName: string
): Element | null {
  return lnElement.querySelector(`:scope > DOI[name="${doName}"]`);
}

export function getDoElement(
  lnElement: Element,
  doName: string
): Element | null {
  const lnType = lnElement.getAttribute('lnType');
  if (lnType) {
    return lnElement.ownerDocument.querySelector(
      `:root > DataTypeTemplates > LNodeType[id="${lnType}"] > DO[name="${doName}"]`
    );
  }
  return null;
}

export function getDoElements(lnElement: Element): Element[] {
  const lnType = lnElement.getAttribute('lnType');
  if (lnType) {
    return Array.from(
      lnElement.ownerDocument.querySelectorAll(
        `:root > DataTypeTemplates > LNodeType[id="${lnType}"] > DO`
      )
    );
  }
  return [];
}

/**
 * Search for the DAI Element 'ctlModel', this one indicates if control Addresses need to be created.
 *
 * @param lnElement - The LN Element.
 * @param doElement - The DO Element.
 * @returns The value of the CtlModel.
 */
export function getCtlModel(
  lnElement: Element,
  doElement: Element
): string | null {
  const doName = getNameAttribute(doElement);
  if (doName) {
    const doiElement = getDoiElement(lnElement, doName);
    if (doiElement) {
      return getDaiValue(doiElement, 'ctlModel');
    } else {
      return getDaValue(doElement, 'ctlModel');
    }
  }
  return null;
}

/**
 * Create a Array of Elements from the DOI Element to the passed daiElement.
 * This will contain of course the DOI Element, followed by zero or more SDI Elements
 * and finally the DAI Element with which we started.
 *
 * @param daiElement - The DAI Element to start walking to the LN(0) Element through parents.
 */
function buildInstanceChain(daiElement: Element): Element[] {
  const instanceElementChain: Element[] = [daiElement];
  let child = daiElement;
  if (child.parentElement) {
    // While the parent element exists and the parent that was processed isn't the LN(0) Element continue.
    do {
      child = child.parentElement;
      instanceElementChain.unshift(child);
    } while (child.tagName !== 'DOI' && child.parentElement);
  }
  return instanceElementChain;
}

/**
 * Use the initialed elements (DOI/SDI/DAI) to make the same chain containing the template elements like
 * DO/SDO/DA/BDA. This way all needed configuration values can be retrieved from the templates.
 *
 * @param doc           - The document which will be used to search different template elements.
 * @param instanceChain - The chain created from the LN(0) to the DAI in the IED.
 */
function buildTemplateChainFromInstanceElements(
  doc: Document,
  instanceChain: Element[]
): Element[] {
  const templateChain: Element[] = [];
  let typeElement: Element | null;
  instanceChain.forEach(element => {
    if (element.tagName === 'DOI') {
      // The LN Element will only be used as starting point to find the LNodeType.
      const lnElement = element.closest('LN, LN0')!;
      const typeId = lnElement.getAttribute('lnType') ?? '';
      typeElement = doc.querySelector(
        `:root > DataTypeTemplates > LNodeType[id="${typeId}"]`
      );

      if (typeElement) {
        // Next search for the DO Element below the LNodeType Element.
        const name = element.getAttribute('name');
        const doElement = typeElement.querySelector(
          `:scope > DO[name="${name}"]`
        );
        if (doElement) {
          templateChain.push(doElement);

          // For the next element search the DOType that is linked to the DO Element.
          const typeId = getTypeAttribute(doElement) ?? '';
          typeElement = doc.querySelector(
            `:root > DataTypeTemplates > DOType[id="${typeId}"]`
          );
        } else {
          typeElement = null;
        }
      }
    } else if (['SDI', 'DAI'].includes(element.tagName)) {
      if (typeElement) {
        // Search for the DA Element below the DOType or DAType from the previous Element
        const name = element.getAttribute('name');
        const daElement = typeElement?.querySelector(
          `:scope > DA[name="${name}"], :scope > BDA[name="${name}"]`
        );
        if (daElement) {
          templateChain.push(daElement);

          if (daElement.getAttribute('bType') === 'Struct') {
            // Only if the bType is a struct we need to search for the DAType for the next element.
            const typeId = getTypeAttribute(element) ?? '';
            typeElement = doc.querySelector(
              `:root > DataTypeTemplates > DAType[id="${typeId}"]`
            );
          } else {
            typeElement = null;
          }
        } else {
          typeElement = null;
        }
      }
    }
  });
  return templateChain;
}

/**
 * Retrieve the DA or BDA Element that's linked to the DAI Element passed.
 *
 * @param daiElement - The DAI Element for which to search the linked DA Element.
 */
export function getDaElementByDaiElement(
  daiElement: Element
): Element | undefined {
  // First step is to create the list of instance elements
  const instanceChain = buildInstanceChain(daiElement);
  // Next step is to build the Template Chain from the instance elements
  const templateChain = buildTemplateChainFromInstanceElements(
    daiElement.ownerDocument,
    instanceChain
  );
  if (templateChain.length > 0) {
    // The needed DA Element is the last Element from the Chain.
    const daElement = templateChain.pop();
    if (['DA', 'BDA'].includes(daElement!.tagName)) {
      return daElement;
    }
  }
  return undefined;
}

/**
 * Check if the DA Element is of the bType 'Enum'.
 *
 * @param daElement - The DA Element for which to check.
 */
function isEnumType(daElement: Element | undefined) {
  return daElement?.getAttribute('bType') === 'Enum' ?? false;
}

/**
 * Check if the DA Element that's linked to the DAI Element is of the bType 'Enum'.
 *
 * @param daiElement - The DAI Element for which to check.
 */
export function isEnumDataAttribute(daiElement: Element): boolean {
  const daElement = getDaElementByDaiElement(daiElement);
  return isEnumType(daElement);
}

/**
 * Retrieve the value of the Enum with passed 'ord' configured with the passed DAI Element.
 *
 * @param daiElement - The DAI Element that is configured as Enum Type.
 * @param ord        - The value of the attribute 'ord' to search the value of.
 */
export function getEnumVal(daiElement: Element, ord: string): string | null {
  const daElement = getDaElementByDaiElement(daiElement);
  if (isEnumType(daElement)) {
    const enumType = getTypeAttribute(daElement!);
    const enumVal = daiElement.ownerDocument.querySelector(
      `:root > DataTypeTemplates > EnumType[id="${enumType}"] > EnumVal[ord="${ord}"]`
    );
    if (enumVal) {
      return enumVal.textContent;
    }
  }
  return null;
}

/**
 * Retrieve all the 'ord' value the EnumType has configured with his values.
 *
 * @param daiElement - The DAI Element that is configured as Enum Type.
 */
export function getEnumOrds(daiElement: Element): string[] {
  const ords: string[] = [];
  const daElement = getDaElementByDaiElement(daiElement);
  if (isEnumType(daElement)) {
    const enumType = getTypeAttribute(daElement!);
    const enumVals = daiElement.ownerDocument.querySelectorAll(
      `:root > DataTypeTemplates > EnumType[id="${enumType}"] > EnumVal`
    );
    Array.from(enumVals)
      .filter(valElement => valElement.getAttribute('ord'))
      .map(valElement => ords.push(valElement.getAttribute('ord')!));
  }
  return ords;
}

/**
 * Search for the Element passed from the Cloned LN Structure in the original LN Structure.
 * If that element exists in the original LN Structure it will be returned.
 * If the cloned Element is a new Element 'null' will be returned.
 *
 * @param lnElement     - The original LN Element with the existing Elements.
 * @param clonedElement - The Element to search for in the existing structure using its key.
 * @returns The original element found or null if it didn't exist before.
 */
export function findElementInOriginalLNStructure(
  lnElement: Element,
  clonedElement: Element
): Element | null {
  if (['LN0', 'LN'].includes(clonedElement.tagName)) {
    return lnElement;
  }

  // First create a list of elements from the Cloned Element to the Cloned LN Element.
  const clonedElements: Element[] = [];
  let currentElement: Element | null | undefined = clonedElement;
  while (currentElement && !['LN0', 'LN'].includes(currentElement.tagName)) {
    clonedElements.unshift(currentElement!);
    currentElement = currentElement?.parentElement;
  }

  // Walk through the list of Cloned Elements and walk the original LN Structure.
  let parentElement: Element | null = lnElement;
  while (parentElement != null && clonedElements.length > 0) {
    // Get the first Cloned Element from the list and search the element on the original structure
    const childElement = clonedElements.shift();
    if (childElement) {
      // Below the LN there are only DOI/SDI/DAI Elements we need to search for.
      // The parent can be an LN, DOI or SDI Element.
      const name = getNameAttribute(childElement);
      parentElement = parentElement.querySelector(
        `:scope > DOI[name="${name}"], :scope > SDI[name="${name}"], :scope > DAI[name="${name}"]`
      );
    } else {
      parentElement = null;
    }
  }
  return parentElement;
}

/**
 * Create a wizard-textfield element for the wizards within the Network part of the 104 plugin.
 * @param pType - The type of P a Text Field has to be created for.
 * @returns - A Text Field created for a specific type for the Create wizard.
 */
export function createNetworkTextField(
  pType: string,
  maybeValue?: string
): TemplateResult {
  return html`<wizard-textfield
    required
    label="${pType}"
    pattern="${ifDefined(typePattern[pType])}"
    .maybeValue=${maybeValue ?? null}
    maxLength="${ifDefined(typeMaxLength[pType])}"
    helper="${translate(typeDescriptiveNameKeys[pType])}"
  ></wizard-textfield>`;
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
