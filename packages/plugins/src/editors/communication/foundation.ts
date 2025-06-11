/**
 * Returns the first element of type ConnectedAP in the provided element's hierarchy.
 * @param element - The reference element to search from
 * @returns An element of type ConnectedAP or null
 */
export function getCurrentConnectedAP(element: Element): Element | null {
  return element.closest('ConnectedAP');
}

/**
 * Retrieves all ConnectedAP elements within the same IED as the provided element.
 *
 * @param element - The reference element to find the current ConnectedAP and its IED.
 * @param doc - The XML document containing the SubNetwork and ConnectedAP elements.
 * @returns An array of ConnectedAP elements belonging to the same IED as the provided element.
 */
export function getAllConnectedAPsOfSameIED(
  element: Element,
  doc: XMLDocument
): Element[] {
  if (!element || !doc) {
    return [];
  }

  const currentConnectedAP = getCurrentConnectedAP(element);
  if (!currentConnectedAP) {
    return [];
  }

  const iedName = currentConnectedAP.getAttribute('iedName');

  return Array.from(
    doc.querySelectorAll(`SubNetwork > ConnectedAP[iedName=${iedName}`)
  );
}

export function canMoveCommunicationElementToConnectedAP(
  communicationElement: Element,
  connectedAP: Element,
  doc: XMLDocument
): boolean {
  const currentConnectedAP = getCurrentConnectedAP(communicationElement);

  if (!currentConnectedAP || currentConnectedAP === connectedAP) {
    return false;
  }

  const apName = currentConnectedAP.getAttribute('apName');
  const iedName = currentConnectedAP.getAttribute('iedName');

  if (!apName || !iedName) {
    return false;
  }

  const ied = doc.querySelector(`IED[name=${iedName}]`);

  if (!ied) {
    return false;
  }

  const targetApName = connectedAP.getAttribute('apName');
  const targetAp = ied.querySelector(`:scope > AccessPoint[name=${targetApName}]`);

  if (!targetAp) {
    return false;
  }

  const hasServer = targetAp.querySelector(':scope > Server') !== null;
  const hasServerAt = targetAp.querySelector(`:scope > ServerAt[apName=${apName}]`) !== null;

  return hasServer || hasServerAt;
}
