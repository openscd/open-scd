export const PROTOCOL_104_PRIVATE = "IEC_60870_5_104";
export const PROTOCOL_104_NS = "http://www.iec.ch/61850-80-1/2007/IEC_60870-5-104";
export const PROTOCOL_104_PREFIX = "IEC_60870_5_104";


/**
 * Will add the namespace of the 104 Protocol to the Root Element of the Document (SCL) as prefix to
 * be used with all 104 elements (Address).
 *
 * @param element - Element to get the Document and Root Element from.
 */
export function addPrefixAndNamespaceToDocument(element: Element): void {
  const rootElement = element.ownerDocument.firstElementChild!;
  if (!rootElement.hasAttribute('xmlns:' + PROTOCOL_104_PREFIX)) {
    rootElement.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:' + PROTOCOL_104_PREFIX, PROTOCOL_104_NS);
  }
}

/**
 * Create an SCL Private Element with the type set to the 104 Protocol.
 *
 * @param daiElement - The DAI Element used to create the new element from.
 * @returns The created Private Element, <b>not</b> yet added to the DAI Element.
 */
export function createPrivateElement(daiElement: Element): Element {
  const privateElement = daiElement.ownerDocument.createElement("Private");
  privateElement.setAttribute('type', PROTOCOL_104_PRIVATE);
  return privateElement;
}

/**
 * Create a 104 Address element which will be added to the passed Private element. The attribute 'ti' will
 * also be set to value passed.
 *
 * @param daiElement     - The DAI Element used to create the new element from.
 * @param privateElement - The Private Element to which the Address element will be added.
 * @param ti             - The value for the attribute 'ti'.
 */
export function createPrivateAddress(daiElement: Element, privateElement: Element, ti: string): Element {
  const addressElement = daiElement.ownerDocument.createElementNS(PROTOCOL_104_NS, "Address");
  addressElement.setAttribute('ti', ti);
  privateElement.append(addressElement);
  return addressElement;
}
