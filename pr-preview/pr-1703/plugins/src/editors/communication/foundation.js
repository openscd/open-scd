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
const controlTagDictionary = {
  GSE: "GSEControl",
  SMV: "SampledValueControl"
};
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
  if (!targetAp || !targetApName) {
    return false;
  }
  const server = queryServer(ied, targetApName);
  if (!server) {
    return false;
  }
  const ldInst = communicationElement.getAttribute("ldInst");
  const cbName = communicationElement.getAttribute("cbName");
  const controlTag = controlTagDictionary[communicationElement.tagName];
  const controlElement = server.querySelector(`:scope > LDevice[inst=${ldInst}] ${controlTag}[name=${cbName}]`);
  const serverHasControl = controlElement !== null;
  return serverHasControl;
}
function queryServer(ied, apName) {
  const accessPoint = ied.querySelector(`AccessPoint[name=${apName}]`);
  if (!accessPoint) {
    return null;
  }
  const server = accessPoint.querySelector("Server");
  if (server) {
    return server;
  }
  const serverAt = accessPoint.querySelector("ServerAt");
  const serverApName = serverAt?.getAttribute("apName");
  if (!serverApName) {
    return null;
  }
  const accessPointWithServer = ied.querySelector(`AccessPoint[name=${serverApName}]`);
  return accessPointWithServer?.querySelector("Server") ?? null;
}
