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
