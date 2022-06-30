import { SCL_NAMESPACE } from "../schemas.js";

export const COMPAS_NAMESPACE = 'https://www.lfenergy.org/compas/extension/v1';
export const COMPAS_PREFIX = 'compas';
export const COMPAS_SCL_PRIVATE_TYPE = 'compas_scl';

export function getPrivate(element: Element, type: string): Element | null {
  return element.querySelector(`Private[type="${type}"]`);
}

export function createPrivate(parent: Element, type: string): Element {
  const privateElement = parent.ownerDocument.createElementNS(SCL_NAMESPACE, "Private");
  privateElement.setAttribute('type', type);
  return privateElement;
}

export function getCompasSclName(element: Element): Element | null {
  const privateElement = getPrivate(element, COMPAS_SCL_PRIVATE_TYPE);
  return privateElement ? privateElement.querySelector(`SclName`) : null;
}

export function createCompasSclName(parent: Element, value: string): Element {
  // Make sure the prefix is available.
  addPrefixAndNamespaceToDocument(parent, COMPAS_NAMESPACE, COMPAS_PREFIX);

  const newSclNameElement = parent.ownerDocument.createElementNS(COMPAS_NAMESPACE, COMPAS_PREFIX + ":SclName");
  newSclNameElement.textContent = value;
  return newSclNameElement;
}

export function addPrefixAndNamespaceToDocument(element: Element, namespace: string, prefix: string) : void {
  const rootElement = element.ownerDocument.firstElementChild!;
  if (!rootElement.hasAttribute('xmlns:' +  prefix)) {
    rootElement.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:' +  prefix, namespace);
  }
}
