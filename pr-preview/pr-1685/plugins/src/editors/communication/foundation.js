export function getCurrentConnectedAP(element) {
  return element.closest("ConnectedAP");
}
export function getAllConnectedAPsOfSameIED(element, doc) {
  if (!element || !doc) {
    return [];
  }
  const currentConnectedAP = getCurrentConnectedAP(element);
  if (!currentConnectedAP) {
    return [];
  }
  const iedName = currentConnectedAP.getAttribute("iedName");
  return Array.from(doc.querySelectorAll(`SubNetwork > ConnectedAP[iedName=${iedName}`));
}
export function canMoveCommunicationElementToConnectedAP(communicationElement, connectedAP, doc) {
  const currentConnectedAP = getCurrentConnectedAP(communicationElement);
  if (!currentConnectedAP || currentConnectedAP === connectedAP) {
    return false;
  }
  const apName = currentConnectedAP.getAttribute("apName");
  const iedName = currentConnectedAP.getAttribute("iedName");
  if (!apName || !iedName) {
    return false;
  }
  const ied = doc.querySelector(`IED[name=${iedName}]`);
  if (!ied) {
    return false;
  }
  const targetApName = connectedAP.getAttribute("apName");
  const targetAp = ied.querySelector(`:scope > AccessPoint[name=${targetApName}]`);
  if (!targetAp) {
    return false;
  }
  const hasServer = targetAp.querySelector(":scope > Server") !== null;
  const hasServerAt = targetAp.querySelector(`:scope > ServerAt[apName=${apName}]`) !== null;
  return hasServer || hasServerAt;
}
