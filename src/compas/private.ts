import { SCL_NAMESPACE } from '../schemas.js';

export const COMPAS_NAMESPACE = 'https://www.lfenergy.org/compas/extension/v1';
export const COMPAS_PREFIX = 'compas';
export const COMPAS_SCL_PRIVATE_TYPE = 'compas_scl';

export const COMPAS_LABELS_MAXIMUM = 20;

export function getPrivate(parent: Element, type: string): Element | null {
  return parent.querySelector(`:scope > Private[type="${type}"]`);
}

export function createPrivate(parent: Element, type: string): Element {
  const privateElement = parent.ownerDocument.createElementNS(
    SCL_NAMESPACE,
    'Private'
  );
  privateElement.setAttribute('type', type);
  return privateElement;
}

export function getCompasSclName(
  privateElement: Element | null
): Element | null {
  return privateElement?.querySelector(`SclName`) ?? null;
}

export function createCompasSclName(parent: Element, value: string): Element {
  // Make sure the prefix is available.
  addPrefixAndNamespaceToDocument(parent, COMPAS_NAMESPACE, COMPAS_PREFIX);

  const newSclNameElement = parent.ownerDocument.createElementNS(
    COMPAS_NAMESPACE,
    COMPAS_PREFIX + ':SclName'
  );
  newSclNameElement.textContent = value;
  return newSclNameElement;
}

export function getLabels(privateElement: Element): Element | null {
  return (
    Array.from(privateElement.querySelectorAll(`:scope > Labels`)).find(
      element => element.namespaceURI === COMPAS_NAMESPACE
    ) ?? null
  );
}

export function createLabels(privateElement: Element): Element {
  // Make sure the prefix is available.
  addPrefixAndNamespaceToDocument(
    privateElement,
    COMPAS_NAMESPACE,
    COMPAS_PREFIX
  );

  const labelsElement = privateElement.ownerDocument.createElementNS(
    COMPAS_NAMESPACE,
    COMPAS_PREFIX + ':Labels'
  );
  return labelsElement;
}

export function createLabel(labelsElement: Element, value: string): Element {
  const labelElement = labelsElement.ownerDocument.createElementNS(
    COMPAS_NAMESPACE,
    COMPAS_PREFIX + ':Label'
  );
  labelElement.textContent = value;
  labelsElement.append(labelElement);
  return labelElement;
}

export function addPrefixAndNamespaceToDocument(
  element: Element,
  namespace: string,
  prefix: string
): void {
  const rootElement = element.ownerDocument.firstElementChild!;
  if (!rootElement.hasAttribute('xmlns:' + prefix)) {
    rootElement.setAttributeNS(
      'http://www.w3.org/2000/xmlns/',
      'xmlns:' + prefix,
      namespace
    );
  }
}
