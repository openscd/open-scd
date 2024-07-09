import {crossProduct} from "../foundation.js";
function getDataModelChildren(parent) {
  if (["LDevice", "Server"].includes(parent.tagName))
    return Array.from(parent.children).filter((child) => child.tagName === "LDevice" || child.tagName === "LN0" || child.tagName === "LN");
  const id = parent.tagName === "LN" || parent.tagName === "LN0" ? parent.getAttribute("lnType") : parent.getAttribute("type");
  return Array.from(parent.ownerDocument.querySelectorAll(`LNodeType[id="${id}"] > DO, DOType[id="${id}"] > SDO, DOType[id="${id}"] > DA, DAType[id="${id}"] > BDA`));
}
export function existFcdaReference(fcda, ied) {
  const [ldInst, prefix, lnClass, lnInst, doName, daName, fc] = [
    "ldInst",
    "prefix",
    "lnClass",
    "lnInst",
    "doName",
    "daName",
    "fc"
  ].map((attr) => fcda.getAttribute(attr));
  const sinkLdInst = ied.querySelector(`LDevice[inst="${ldInst}"]`);
  if (!sinkLdInst)
    return false;
  const prefixSelctors = prefix ? [`[prefix="${prefix}"]`] : ['[prefix=""]', ":not([prefix])"];
  const lnInstSelectors = lnInst ? [`[inst="${lnInst}"]`] : ['[inst=""]', ":not([inst])"];
  const anyLnSelector = crossProduct(["LN0", "LN"], prefixSelctors, [`[lnClass="${lnClass}"]`], lnInstSelectors).map((strings) => strings.join("")).join(",");
  const sinkAnyLn = ied.querySelector(anyLnSelector);
  if (!sinkAnyLn)
    return false;
  const doNames = doName?.split(".");
  if (!doNames)
    return false;
  let parent = sinkAnyLn;
  for (const doNameAttr of doNames) {
    parent = getDataModelChildren(parent).find((child) => child.getAttribute("name") === doNameAttr);
    if (!parent)
      return false;
  }
  const daNames = daName?.split(".");
  const someFcInSink = getDataModelChildren(parent).some((da) => da.getAttribute("fc") === fc);
  if (!daNames && someFcInSink)
    return true;
  if (!daNames)
    return false;
  let sinkFc = "";
  for (const daNameAttr of daNames) {
    parent = getDataModelChildren(parent).find((child) => child.getAttribute("name") === daNameAttr);
    if (parent?.getAttribute("fc"))
      sinkFc = parent.getAttribute("fc");
    if (!parent)
      return false;
  }
  if (sinkFc !== fc)
    return false;
  return true;
}
