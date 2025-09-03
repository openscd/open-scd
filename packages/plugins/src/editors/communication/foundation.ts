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

type communicationElementTag = 'GSE' | 'SMV';

const controlTagDictionary: { [key in communicationElementTag]: string } = {
  GSE: 'GSEControl',
  SMV: 'SampledValueControl'
};

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

  if (!targetAp || !targetApName) {
    return false;
  }

  const server = queryServer(ied, targetApName);
  if (!server) {
    return false;
  }

  const ldInst = communicationElement.getAttribute('ldInst');
  const cbName = communicationElement.getAttribute('cbName');
  const controlTag = controlTagDictionary[communicationElement.tagName as communicationElementTag];

  const controlElement = server.querySelector(`:scope > LDevice[inst=${ldInst}] ${controlTag}[name=${cbName}]`);
  const serverHasControl = controlElement !== null;

  return serverHasControl;
}

function queryServer(ied: Element, apName: string): Element | null {
  const accessPoint = ied.querySelector(`AccessPoint[name=${apName}]`);
  if (!accessPoint) {
    return null;
  }

  const server = accessPoint.querySelector('Server');
  if (server) {
    return server;
  }

  const serverAt = accessPoint.querySelector('ServerAt');
  const serverApName = serverAt?.getAttribute('apName');
  if (!serverApName) {
    return null;
  }

  const accessPointWithServer = ied.querySelector(`AccessPoint[name=${serverApName}]`);

  return accessPointWithServer?.querySelector('Server') ?? null;
}
