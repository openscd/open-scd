import {getSclSchemaVersion} from "../../../../../openscd/src/foundation.js";
import {serviceTypes} from "../foundation.js";
function dataAttributeSpecification(anyLn, doName, daName) {
  const doc = anyLn.ownerDocument;
  const lNodeType = doc.querySelector(`LNodeType[id="${anyLn.getAttribute("lnType")}"]`);
  const doNames = doName.split(".");
  let leaf = lNodeType;
  for (const doName2 of doNames) {
    const dO = leaf?.querySelector(`DO[name="${doName2}"], SDO[name="${doName2}"]`);
    leaf = doc.querySelector(`DOType[id="${dO?.getAttribute("type")}"]`);
  }
  if (!leaf || !leaf.getAttribute("cdc"))
    return {cdc: null, bType: null};
  const cdc = leaf.getAttribute("cdc");
  const daNames = daName.split(".");
  for (const daName2 of daNames) {
    const dA = leaf?.querySelector(`DA[name="${daName2}"], BDA[name="${daName2}"]`);
    leaf = daNames.indexOf(daName2) < daNames.length - 1 ? doc.querySelector(`DAType[id="${dA?.getAttribute("type")}"]`) : dA;
  }
  if (!leaf || !leaf.getAttribute("bType"))
    return {cdc, bType: null};
  const bType = leaf.getAttribute("bType");
  return {bType, cdc};
}
export function fcdaSpecification(fcda) {
  const [doName, daName] = ["doName", "daName"].map((attr) => fcda.getAttribute(attr));
  if (!doName || !daName)
    return {cdc: null, bType: null};
  const ied = fcda.closest("IED");
  const anyLn = Array.from(ied?.querySelectorAll(`LDevice[inst="${fcda.getAttribute("ldInst")}"] > LN, LDevice[inst="${fcda.getAttribute("inst")}"] LN0`) ?? []).find((anyLn2) => {
    return (anyLn2.getAttribute("prefix") ?? "") === (fcda.getAttribute("prefix") ?? "") && (anyLn2.getAttribute("lnClass") ?? "") === (fcda.getAttribute("lnClass") ?? "") && (anyLn2.getAttribute("inst") ?? "") === (fcda.getAttribute("lnInst") ?? "");
  });
  if (!anyLn)
    return {cdc: null, bType: null};
  return dataAttributeSpecification(anyLn, doName, daName);
}
export function inputRestriction(extRef) {
  const [pLN, pDO, pDA] = ["pLN", "pDO", "pDA"].map((attr) => extRef.getAttribute(attr));
  if (!pLN || !pDO || !pDA)
    return {cdc: null, bType: null};
  const anyLns = Array.from(extRef.closest("IED")?.querySelectorAll(`LN[lnClass="${pLN}"],LN0[lnClass="${pLN}"]`) ?? []);
  for (const anyLn of anyLns) {
    const dataSpec = dataAttributeSpecification(anyLn, pDO, pDA);
    if (dataSpec.cdc !== null && dataSpec.bType !== null)
      return dataSpec;
  }
  return {cdc: null, bType: null};
}
export function sameAttributeValue(leftElement, rightElement, attributeName) {
  return (leftElement?.getAttribute(attributeName) ?? "") === (rightElement?.getAttribute(attributeName) ?? "");
}
export function sameAttributeValueDiffName(leftElement, leftAttributeName, rightElement, rightAttributeName) {
  return (leftElement?.getAttribute(leftAttributeName) ?? "") === (rightElement?.getAttribute(rightAttributeName) ?? "");
}
function checkEditionSpecificRequirements(controlTag, controlElement, extRefElement) {
  if (getSclSchemaVersion(extRefElement.ownerDocument) === "2003") {
    return true;
  }
  const lDeviceElement = controlElement?.closest("LDevice") ?? void 0;
  const lnElement = controlElement?.closest("LN0") ?? void 0;
  const extRefIsMissingSrcLNClass = !extRefElement.hasAttribute("srcLNClass");
  const isLnClassLLN0 = lnElement?.getAttribute("lnClass") === "LLN0";
  const canIgnoreSrcLNClass = isLnClassLLN0 && extRefIsMissingSrcLNClass;
  return (extRefElement.getAttribute("serviceType") ?? "") === serviceTypes[controlTag] && sameAttributeValueDiffName(extRefElement, "srcLDInst", lDeviceElement, "inst") && sameAttributeValueDiffName(extRefElement, "scrPrefix", lnElement, "prefix") && (canIgnoreSrcLNClass || sameAttributeValueDiffName(extRefElement, "srcLNClass", lnElement, "lnClass")) && sameAttributeValueDiffName(extRefElement, "srcLNInst", lnElement, "inst") && sameAttributeValueDiffName(extRefElement, "srcCBName", controlElement, "name");
}
export function isSubscribedTo(controlTag, controlElement, fcdaElement, extRefElement) {
  return extRefElement.getAttribute("iedName") === fcdaElement?.closest("IED")?.getAttribute("name") && sameAttributeValue(fcdaElement, extRefElement, "ldInst") && sameAttributeValue(fcdaElement, extRefElement, "prefix") && sameAttributeValue(fcdaElement, extRefElement, "lnClass") && sameAttributeValue(fcdaElement, extRefElement, "lnInst") && sameAttributeValue(fcdaElement, extRefElement, "doName") && sameAttributeValue(fcdaElement, extRefElement, "daName") && checkEditionSpecificRequirements(controlTag, controlElement, extRefElement);
}
export function isSubscribed(extRefElement) {
  return extRefElement.hasAttribute("iedName") && extRefElement.hasAttribute("ldInst") && extRefElement.hasAttribute("prefix") && extRefElement.hasAttribute("lnClass") && extRefElement.hasAttribute("lnInst") && extRefElement.hasAttribute("doName") && extRefElement.hasAttribute("daName");
}
export function getExtRefElements(rootElement, fcdaElement, includeLaterBinding) {
  return Array.from(rootElement.querySelectorAll("ExtRef")).filter((element) => includeLaterBinding && element.hasAttribute("intAddr") || !includeLaterBinding && !element.hasAttribute("intAddr")).filter((element) => element.closest("IED") !== fcdaElement?.closest("IED"));
}
export function getSubscribedExtRefElements(rootElement, controlTag, fcdaElement, controlElement, includeLaterBinding) {
  return getExtRefElements(rootElement, fcdaElement, includeLaterBinding).filter((extRefElement) => isSubscribedTo(controlTag, controlElement, fcdaElement, extRefElement));
}
