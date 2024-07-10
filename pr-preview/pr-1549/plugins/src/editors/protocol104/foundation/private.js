import {SCL_NAMESPACE} from "../../../../../openscd/src/schemas.js";
export const PROTOCOL_104_PRIVATE = "IEC_60870_5_104";
export const PROTOCOL_104_NS = "http://www.iec.ch/61850-80-1/2007/IEC_60870-5-104";
export const PROTOCOL_104_PREFIX = "IEC_60870_5_104";
export function addPrefixAndNamespaceToDocument(document) {
  const rootElement = document.firstElementChild;
  if (!rootElement.hasAttribute("xmlns:" + PROTOCOL_104_PREFIX)) {
    rootElement.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:" + PROTOCOL_104_PREFIX, PROTOCOL_104_NS);
  }
}
export function getPrivateElement(daiElement) {
  return daiElement.querySelector(`Private[type="${PROTOCOL_104_PRIVATE}"]`);
}
export function createPrivateElement(document) {
  const privateElement = document.createElementNS(SCL_NAMESPACE, "Private");
  privateElement.setAttribute("type", PROTOCOL_104_PRIVATE);
  return privateElement;
}
export function createPrivateAddress(document, ti) {
  const addressElement = document.createElementNS(PROTOCOL_104_NS, "Address");
  addressElement.setAttribute("ti", ti);
  return addressElement;
}
