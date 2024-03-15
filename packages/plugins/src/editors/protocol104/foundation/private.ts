import { SCL_NAMESPACE } from '@openscd/open-scd/src/schemas.js';

export const PROTOCOL_104_PRIVATE = 'IEC_60870_5_104';
export const PROTOCOL_104_NS =
  'http://www.iec.ch/61850-80-1/2007/IEC_60870-5-104';
export const PROTOCOL_104_PREFIX = 'IEC_60870_5_104';

/**
 * Will add the namespace of the 104 Protocol to the Root Element of the Document (SCL) as prefix to
 * be used with all 104 elements (Address).
 *
 * @param document - The Owner Document used to registered the namespace.
 */
export function addPrefixAndNamespaceToDocument(document: Document): void {
  const rootElement = document.firstElementChild!;
  if (!rootElement.hasAttribute('xmlns:' + PROTOCOL_104_PREFIX)) {
    rootElement.setAttributeNS(
      'http://www.w3.org/2000/xmlns/',
      'xmlns:' + PROTOCOL_104_PREFIX,
      PROTOCOL_104_NS
    );
  }
}

/**
 * Get the SCL Private Element with the type set to the 104 Protocol.
 *
 * @param daiElement - The DAI Element to search for the 104 Private Element.
 * @returns The found Private Element or null if not there.
 */
export function getPrivateElement(daiElement: Element): Element | null {
  return daiElement.querySelector(`Private[type="${PROTOCOL_104_PRIVATE}"]`);
}

/**
 * Create an SCL Private Element with the type set to the 104 Protocol.
 *
 * @param document - The Owner Document used to create the new Private Element with.
 * @returns The created Private Element, <b>not</b> yet added to the DAI Element.
 */
export function createPrivateElement(document: Document): Element {
  const privateElement = document.createElementNS(SCL_NAMESPACE, 'Private');
  privateElement.setAttribute('type', PROTOCOL_104_PRIVATE);
  return privateElement;
}

/**
 * Create a 104 Address element which can be added to the Private element.
 * The attribute 'ti' will also be set to value passed.
 *
 * @param document - The Owner Document used to create the new Address Element with.
 * @param ti       - The value for the attribute 'ti'.
 */
export function createPrivateAddress(document: Document, ti: string): Element {
  const addressElement = document.createElementNS(PROTOCOL_104_NS, 'Address');
  addressElement.setAttribute('ti', ti);
  return addressElement;
}
