import {directive} from "../../_snowpack/pkg/lit-html.js";
import {Select} from "../../_snowpack/pkg/@material/mwc-select.js";
import {getChildElementsByTagName} from "../../_snowpack/link/packages/xml/dist/index.js";
import {WizardTextField} from "./wizard-textfield.js";
import {WizardSelect} from "./wizard-select.js";
import {WizardCheckbox} from "./wizard-checkbox.js";
export const wizardInputSelector = "wizard-textfield, mwc-textfield, ace-editor, mwc-select, wizard-select, wizard-checkbox";
export function isWizardFactory(maybeFactory) {
  return typeof maybeFactory === "function";
}
export function checkValidity(input) {
  if (input instanceof WizardTextField || input instanceof Select)
    return input.checkValidity();
  else
    return true;
}
export function reportValidity(input) {
  if (input instanceof WizardTextField || input instanceof Select)
    return input.reportValidity();
  else
    return true;
}
export function getValue(input) {
  if (input instanceof WizardTextField || input instanceof WizardSelect || input instanceof WizardCheckbox)
    return input.maybeValue;
  else
    return input.value ?? null;
}
export function getMultiplier(input) {
  if (input instanceof WizardTextField)
    return input.multiplier;
  else
    return null;
}
export function newWizardEvent(wizardOrFactory, eventInitDict) {
  if (!wizardOrFactory)
    return new CustomEvent("wizard", {
      bubbles: true,
      composed: true,
      ...eventInitDict,
      detail: {wizard: null, ...eventInitDict?.detail}
    });
  const wizard = isWizardFactory(wizardOrFactory) ? wizardOrFactory : () => wizardOrFactory;
  return new CustomEvent("wizard", {
    bubbles: true,
    composed: true,
    ...eventInitDict,
    detail: {wizard, ...eventInitDict?.detail}
  });
}
export function newSubWizardEvent(wizardOrFactory) {
  return newWizardEvent(wizardOrFactory, {detail: {subwizard: true}});
}
export function referencePath(element) {
  let path = "";
  let nextParent = element.parentElement;
  while (nextParent?.getAttribute("name")) {
    path = "/" + nextParent.getAttribute("name") + path;
    nextParent = nextParent.parentElement;
  }
  return path;
}
export function getSclSchemaVersion(doc) {
  const scl = doc.documentElement;
  const edition = (scl.getAttribute("version") ?? "2003") + (scl.getAttribute("revision") ?? "") + (scl.getAttribute("release") ?? "");
  return edition;
}
export function getNameAttribute(element) {
  const name2 = element.getAttribute("name");
  return name2 ? name2 : void 0;
}
export function getLdNameAttribute(element) {
  const name2 = element.getAttribute("ldName");
  return name2 ? name2 : void 0;
}
export function getDescriptionAttribute(element) {
  const name2 = element.getAttribute("desc");
  return name2 ? name2 : void 0;
}
export function getPathNameAttribute(element) {
  const name2 = element.getAttribute("pathName");
  return name2 ? name2 : void 0;
}
export function getInstanceAttribute(element) {
  const inst = element.getAttribute("inst");
  return inst ? inst : void 0;
}
export function pathParts(identity2) {
  const path = identity2.split(">");
  const end = path.pop() ?? "";
  const start = path.join(">");
  return [start, end];
}
const voidSelector = ":not(*)";
function hitemIdentity(e) {
  return `${e.getAttribute("version")}	${e.getAttribute("revision")}`;
}
function hitemSelector(tagName, identity2) {
  const [version, revision] = identity2.split("	");
  if (!version || !revision)
    return voidSelector;
  return `${tagName}[version="${version}"][revision="${revision}"]`;
}
function terminalIdentity(e) {
  return identity(e.parentElement) + ">" + e.getAttribute("connectivityNode");
}
function terminalSelector(tagName, identity2) {
  const [parentIdentity, connectivityNode] = pathParts(identity2);
  const parentSelectors = tags[tagName].parents.flatMap((parentTag) => selector(parentTag, parentIdentity).split(","));
  return crossProduct(parentSelectors, [">"], [`${tagName}[connectivityNode="${connectivityNode}"]`]).map((strings) => strings.join("")).join(",");
}
function lNodeIdentity(e) {
  const [iedName, ldInst, prefix, lnClass, lnInst, lnType] = [
    "iedName",
    "ldInst",
    "prefix",
    "lnClass",
    "lnInst",
    "lnType"
  ].map((name2) => e.getAttribute(name2));
  if (iedName === "None")
    return `${identity(e.parentElement)}>(${lnClass} ${lnType})`;
  return `${iedName} ${ldInst || "(Client)"}/${prefix ?? ""} ${lnClass} ${lnInst ?? ""}`;
}
function lNodeSelector(tagName, identity2) {
  if (identity2.endsWith(")")) {
    const [parentIdentity, childIdentity] = pathParts(identity2);
    const [lnClass2, lnType] = childIdentity.substring(1, childIdentity.length - 1).split(" ");
    if (!lnClass2 || !lnType)
      return voidSelector;
    const parentSelectors = tags[tagName].parents.flatMap((parentTag) => selector(parentTag, parentIdentity).split(","));
    return crossProduct(parentSelectors, [">"], [`${tagName}[iedName="None"][lnClass="${lnClass2}"][lnType="${lnType}"]`]).map((strings) => strings.join("")).join(",");
  }
  const [iedName, ldInst, prefix, lnClass, lnInst] = identity2.split(/[ /]/);
  if (!iedName || !ldInst || !lnClass)
    return voidSelector;
  const [
    iedNameSelectors,
    ldInstSelectors,
    prefixSelectors,
    lnClassSelectors,
    lnInstSelectors
  ] = [
    [`[iedName="${iedName}"]`],
    ldInst === "(Client)" ? [":not([ldInst])", '[ldInst=""]'] : [`[ldInst="${ldInst}"]`],
    prefix ? [`[prefix="${prefix}"]`] : [":not([prefix])", '[prefix=""]'],
    [`[lnClass="${lnClass}"]`],
    lnInst ? [`[lnInst="${lnInst}"]`] : [":not([lnInst])", '[lnInst=""]']
  ];
  return crossProduct([tagName], iedNameSelectors, ldInstSelectors, prefixSelectors, lnClassSelectors, lnInstSelectors).map((strings) => strings.join("")).join(",");
}
function kDCIdentity(e) {
  return `${identity(e.parentElement)}>${e.getAttribute("iedName")} ${e.getAttribute("apName")}`;
}
function kDCSelector(tagName, identity2) {
  const [parentIdentity, childIdentity] = pathParts(identity2);
  const [iedName, apName] = childIdentity.split(" ");
  return `${selector("IED", parentIdentity)}>${tagName}[iedName="${iedName}"][apName="${apName}"]`;
}
function associationIdentity(e) {
  return `${identity(e.parentElement)}>${e.getAttribute("associationID") ?? ""}`;
}
function associationSelector(tagName, identity2) {
  const [parentIdentity, associationID] = pathParts(identity2);
  if (!associationID)
    return voidSelector;
  return `${selector("Server", parentIdentity)}>${tagName}[associationID="${associationID}"]`;
}
function lDeviceIdentity(e) {
  return `${identity(e.closest("IED"))}>>${e.getAttribute("inst")}`;
}
function lDeviceSelector(tagName, identity2) {
  const [iedName, inst] = identity2.split(">>");
  if (!inst)
    return voidSelector;
  return `IED[name="${iedName}"] ${tagName}[inst="${inst}"]`;
}
function iEDNameIdentity(e) {
  const iedName = e.textContent;
  const [apRef, ldInst, prefix, lnClass, lnInst] = [
    "apRef",
    "ldInst",
    "prefix",
    "lnClass",
    "lnInst"
  ].map((name2) => e.getAttribute(name2));
  return `${identity(e.parentElement)}>${iedName} ${apRef ? apRef : ""} ${ldInst ? ldInst : ""}/${prefix ?? ""} ${lnClass ?? ""} ${lnInst ?? ""}`;
}
function iEDNameSelector(tagName, identity2) {
  const [parentIdentity, childIdentity] = pathParts(identity2);
  const [iedName, apRef, ldInst, prefix, lnClass, lnInst] = childIdentity.split(/[ /]/);
  const [
    parentSelectors,
    apRefSelectors,
    ldInstSelectors,
    prefixSelectors,
    lnClassSelectors,
    lnInstSelectors
  ] = [
    tags[tagName].parents.flatMap((parentTag) => selector(parentTag, parentIdentity).split(",")),
    [`${iedName}`],
    apRef ? [`[apRef="${apRef}"]`] : [":not([apRef])", '[apRef=""]'],
    ldInst ? [`[ldInst="${ldInst}"]`] : [":not([ldInst])", '[ldInst=""]'],
    prefix ? [`[prefix="${prefix}"]`] : [":not([prefix])", '[prefix=""]'],
    [`[lnClass="${lnClass}"]`],
    lnInst ? [`[lnInst="${lnInst}"]`] : [":not([lnInst])", '[lnInst=""]']
  ];
  return crossProduct(parentSelectors, [">"], [tagName], apRefSelectors, ldInstSelectors, prefixSelectors, lnClassSelectors, lnInstSelectors).map((strings) => strings.join("")).join(",");
}
function fCDAIdentity(e) {
  const [ldInst, prefix, lnClass, lnInst, doName, daName, fc, ix] = [
    "ldInst",
    "prefix",
    "lnClass",
    "lnInst",
    "doName",
    "daName",
    "fc",
    "ix"
  ].map((name2) => e.getAttribute(name2));
  const dataPath = `${ldInst}/${prefix ?? ""} ${lnClass} ${lnInst ?? ""}.${doName} ${daName ? daName : ""}`;
  return `${identity(e.parentElement)}>${dataPath} (${fc}${ix ? " [" + ix + "]" : ""})`;
}
function fCDASelector(tagName, identity2) {
  const [parentIdentity, childIdentity] = pathParts(identity2);
  const [ldInst, prefix, lnClass, lnInst] = childIdentity.split(/[ /.]/);
  const matchDoDa = childIdentity.match(/.([A-Z][A-Za-z0-9.]*) ([A-Za-z0-9.]*) \(/);
  const doName = matchDoDa && matchDoDa[1] ? matchDoDa[1] : "";
  const daName = matchDoDa && matchDoDa[2] ? matchDoDa[2] : "";
  const matchFx = childIdentity.match(/\(([A-Z]{2})/);
  const matchIx = childIdentity.match(/ \[([0-9]{1,2})\]/);
  const fc = matchFx && matchFx[1] ? matchFx[1] : "";
  const ix = matchIx && matchIx[1] ? matchIx[1] : "";
  const [
    parentSelectors,
    ldInstSelectors,
    prefixSelectors,
    lnClassSelectors,
    lnInstSelectors,
    doNameSelectors,
    daNameSelectors,
    fcSelectors,
    ixSelectors
  ] = [
    tags[tagName].parents.flatMap((parentTag) => selector(parentTag, parentIdentity).split(",")),
    [`[ldInst="${ldInst}"]`],
    prefix ? [`[prefix="${prefix}"]`] : [":not([prefix])", '[prefix=""]'],
    [`[lnClass="${lnClass}"]`],
    lnInst ? [`[lnInst="${lnInst}"]`] : [":not([lnInst])", '[lnInst=""]'],
    [`[doName="${doName}"]`],
    daName ? [`[daName="${daName}"]`] : [":not([daName])", '[daName=""]'],
    [`[fc="${fc}"]`],
    ix ? [`[ix="${ix}"]`] : [":not([ix])", '[ix=""]']
  ];
  return crossProduct(parentSelectors, [">"], [tagName], ldInstSelectors, prefixSelectors, lnClassSelectors, lnInstSelectors, doNameSelectors, daNameSelectors, fcSelectors, ixSelectors).map((strings) => strings.join("")).join(",");
}
function extRefIdentity(e) {
  if (!e.parentElement)
    return NaN;
  const parentIdentity = identity(e.parentElement);
  const iedName = e.getAttribute("iedName");
  const intAddr = e.getAttribute("intAddr");
  const intAddrIndex = Array.from(e.parentElement.querySelectorAll(`ExtRef[intAddr="${intAddr}"]`)).indexOf(e);
  if (intAddr)
    return `${parentIdentity}>${intAddr}[${intAddrIndex}]`;
  const [
    ldInst,
    prefix,
    lnClass,
    lnInst,
    doName,
    daName,
    serviceType,
    srcLDInst,
    srcPrefix,
    srcLNClass,
    srcLNInst,
    srcCBName
  ] = [
    "ldInst",
    "prefix",
    "lnClass",
    "lnInst",
    "doName",
    "daName",
    "serviceType",
    "srcLDInst",
    "srcPrefix",
    "srcLNClass",
    "srcLNInst",
    "srcCBName"
  ].map((name2) => e.getAttribute(name2));
  const cbPath = srcCBName ? `${serviceType}:${srcCBName} ${srcLDInst ?? ""}/${srcPrefix ?? ""} ${srcLNClass ?? ""} ${srcLNInst ?? ""}` : "";
  const dataPath = `${iedName} ${ldInst}/${prefix ?? ""} ${lnClass} ${lnInst ?? ""} ${doName} ${daName ? daName : ""}`;
  return `${parentIdentity}>${cbPath ? cbPath + " " : ""}${dataPath}${intAddr ? `@${intAddr}` : ""}`;
}
function extRefSelector(tagName, identity2) {
  const [parentIdentity, childIdentity] = pathParts(identity2);
  const parentSelectors = tags[tagName].parents.flatMap((parentTag) => selector(parentTag, parentIdentity).split(","));
  if (childIdentity.endsWith("]")) {
    const [intAddr2] = childIdentity.split("[");
    const intAddrSelectors2 = [`[intAddr="${intAddr2}"]`];
    return crossProduct(parentSelectors, [">"], [tagName], intAddrSelectors2).map((strings) => strings.join("")).join(",");
  }
  let iedName, ldInst, prefix, lnClass, lnInst, doName, daName, serviceType, srcCBName, srcLDInst, srcPrefix, srcLNClass, srcLNInst, intAddr;
  if (!childIdentity.includes(":") && !childIdentity.includes("@")) {
    [iedName, ldInst, prefix, lnClass, lnInst, doName, daName] = childIdentity.split(/[ /]/);
  } else if (childIdentity.includes(":") && !childIdentity.includes("@")) {
    [
      serviceType,
      srcCBName,
      srcLDInst,
      srcPrefix,
      srcLNClass,
      srcLNInst,
      iedName,
      ldInst,
      prefix,
      lnClass,
      lnInst,
      doName,
      daName
    ] = childIdentity.split(/[ /:]/);
  } else if (!childIdentity.includes(":") && childIdentity.includes("@")) {
    [iedName, ldInst, prefix, lnClass, lnInst, doName, daName, intAddr] = childIdentity.split(/[ /@]/);
  } else {
    [
      serviceType,
      srcCBName,
      srcLDInst,
      srcPrefix,
      srcLNClass,
      srcLNInst,
      iedName,
      ldInst,
      prefix,
      lnClass,
      lnInst,
      doName,
      daName,
      intAddr
    ] = childIdentity.split(/[ /:@]/);
  }
  const [
    iedNameSelectors,
    ldInstSelectors,
    prefixSelectors,
    lnClassSelectors,
    lnInstSelectors,
    doNameSelectors,
    daNameSelectors,
    serviceTypeSelectors,
    srcCBNameSelectors,
    srcLDInstSelectors,
    srcPrefixSelectors,
    srcLNClassSelectors,
    srcLNInstSelectors,
    intAddrSelectors
  ] = [
    iedName ? [`[iedName="${iedName}"]`] : [":not([iedName])"],
    ldInst ? [`[ldInst="${ldInst}"]`] : [":not([ldInst])", '[ldInst=""]'],
    prefix ? [`[prefix="${prefix}"]`] : [":not([prefix])", '[prefix=""]'],
    lnClass ? [`[lnClass="${lnClass}"]`] : [":not([lnClass])"],
    lnInst ? [`[lnInst="${lnInst}"]`] : [":not([lnInst])", '[lnInst=""]'],
    doName ? [`[doName="${doName}"]`] : [":not([doName])"],
    daName ? [`[daName="${daName}"]`] : [":not([daName])", '[daName=""]'],
    serviceType ? [`[serviceType="${serviceType}"]`] : [":not([serviceType])", '[serviceType=""]'],
    srcCBName ? [`[srcCBName="${srcCBName}"]`] : [":not([srcCBName])", '[srcCBName=""]'],
    srcLDInst ? [`[srcLDInst="${srcLDInst}"]`] : [":not([srcLDInst])", '[srcLDInst=""]'],
    srcPrefix ? [`[srcPrefix="${srcPrefix}"]`] : [":not([srcPrefix])", '[srcPrefix=""]'],
    srcLNClass ? [`[srcLNClass="${srcLNClass}"]`] : [":not([srcLNClass])", '[srcLNClass=""]'],
    srcLNInst ? [`[srcLNInst="${srcLNInst}"]`] : [":not([srcLNInst])", '[srcLNInst=""]'],
    intAddr ? [`[intAddr="${intAddr}"]`] : [":not([intAddr])", '[intAddr=""]']
  ];
  return crossProduct(parentSelectors, [">"], [tagName], iedNameSelectors, ldInstSelectors, prefixSelectors, lnClassSelectors, lnInstSelectors, doNameSelectors, daNameSelectors, serviceTypeSelectors, srcCBNameSelectors, srcLDInstSelectors, srcPrefixSelectors, srcLNClassSelectors, srcLNInstSelectors, intAddrSelectors).map((strings) => strings.join("")).join(",");
}
function lNIdentity(e) {
  const [prefix, lnClass, inst] = ["prefix", "lnClass", "inst"].map((name2) => e.getAttribute(name2));
  return `${identity(e.parentElement)}>${prefix ?? ""} ${lnClass} ${inst}`;
}
function lNSelector(tagName, identity2) {
  const [parentIdentity, childIdentity] = pathParts(identity2);
  const parentSelectors = tags[tagName].parents.flatMap((parentTag) => selector(parentTag, parentIdentity).split(","));
  const [prefix, lnClass, inst] = childIdentity.split(" ");
  if (!lnClass)
    return voidSelector;
  const [prefixSelectors, lnClassSelectors, instSelectors] = [
    prefix ? [`[prefix="${prefix}"]`] : [":not([prefix])", '[prefix=""]'],
    [`[lnClass="${lnClass}"]`],
    [`[inst="${inst}"]`]
  ];
  return crossProduct(parentSelectors, [">"], [tagName], prefixSelectors, lnClassSelectors, instSelectors).map((strings) => strings.join("")).join(",");
}
function clientLNIdentity(e) {
  const [apRef, iedName, ldInst, prefix, lnClass, lnInst] = [
    "apRef",
    "iedName",
    "ldInst",
    "prefix",
    "lnClass",
    "lnInst"
  ].map((name2) => e.getAttribute(name2));
  return `${identity(e.parentElement)}>${iedName} ${apRef ? apRef : ""} ${ldInst}/${prefix ?? ""} ${lnClass} ${lnInst}`;
}
function clientLNSelector(tagName, identity2) {
  const [parentIdentity, childIdentity] = pathParts(identity2);
  const parentSelectors = tags[tagName].parents.flatMap((parentTag) => selector(parentTag, parentIdentity).split(","));
  const [iedName, apRef, ldInst, prefix, lnClass, lnInst] = childIdentity.split(/[ /]/);
  const [
    iedNameSelectors,
    apRefSelectors,
    ldInstSelectors,
    prefixSelectors,
    lnClassSelectors,
    lnInstSelectors
  ] = [
    iedName ? [`[iedName="${iedName}"]`] : [":not([iedName])", '[iedName=""]'],
    apRef ? [`[apRef="${apRef}"]`] : [":not([apRef])", '[apRef=""]'],
    ldInst ? [`[ldInst="${ldInst}"]`] : [":not([ldInst])", '[ldInst=""]'],
    prefix ? [`[prefix="${prefix}"]`] : [":not([prefix])", '[prefix=""]'],
    [`[lnClass="${lnClass}"]`],
    lnInst ? [`[lnInst="${lnInst}"]`] : [":not([lnInst])", '[lnInst=""]']
  ];
  return crossProduct(parentSelectors, [">"], [tagName], iedNameSelectors, apRefSelectors, ldInstSelectors, prefixSelectors, lnClassSelectors, lnInstSelectors).map((strings) => strings.join("")).join(",");
}
function ixNamingIdentity(e) {
  const [name2, ix] = ["name", "ix"].map((name3) => e.getAttribute(name3));
  return `${identity(e.parentElement)}>${name2}${ix ? "[" + ix + "]" : ""}`;
}
function ixNamingSelector(tagName, identity2, depth2 = -1) {
  if (depth2 === -1)
    depth2 = identity2.split(">").length;
  const [parentIdentity, childIdentity] = pathParts(identity2);
  const [_0, name2, _1, ix] = childIdentity.match(/([^[]*)(\[([0-9]*)\])?/) ?? [];
  if (!name2)
    return voidSelector;
  if (depth2 === 0)
    return `${tagName}[name="${name2}"]`;
  const parentSelectors = tags[tagName].parents.flatMap((parentTag) => parentTag === "SDI" ? ixNamingSelector(parentTag, parentIdentity, depth2 - 1).split(",") : selector(parentTag, parentIdentity).split(",")).filter((selector2) => !selector2.startsWith(voidSelector));
  if (parentSelectors.length === 0)
    return voidSelector;
  const [nameSelectors, ixSelectors] = [
    [`[name="${name2}"]`],
    ix ? [`[ix="${ix}"]`] : ['[ix=""]', ":not([ix])"]
  ];
  return crossProduct(parentSelectors, [">"], [tagName], nameSelectors, ixSelectors).map((strings) => strings.join("")).join(",");
}
function valIdentity(e) {
  if (!e.parentElement)
    return NaN;
  const sGroup = e.getAttribute("sGroup");
  const index = Array.from(e.parentElement.children).filter((child) => child.getAttribute("sGroup") === sGroup).findIndex((child) => child.isSameNode(e));
  return `${identity(e.parentElement)}>${sGroup ? sGroup + "." : ""} ${index}`;
}
function valSelector(tagName, identity2) {
  const [parentIdentity, childIdentity] = pathParts(identity2);
  const [sGroup, indexText] = childIdentity.split(" ");
  const index = parseFloat(indexText);
  const parentSelectors = tags[tagName].parents.flatMap((parentTag) => selector(parentTag, parentIdentity).split(","));
  const [nameSelectors, ixSelectors] = [
    sGroup ? [`[sGroup="${sGroup}"]`] : [""],
    index ? [`:nth-child(${index + 1})`] : [""]
  ];
  return crossProduct(parentSelectors, [">"], [tagName], nameSelectors, ixSelectors).map((strings) => strings.join("")).join(",");
}
function connectedAPIdentity(e) {
  const [iedName, apName] = ["iedName", "apName"].map((name2) => e.getAttribute(name2));
  return `${iedName} ${apName}`;
}
function connectedAPSelector(tagName, identity2) {
  const [iedName, apName] = identity2.split(" ");
  if (!iedName || !apName)
    return voidSelector;
  return `${tagName}[iedName="${iedName}"][apName="${apName}"]`;
}
function controlBlockIdentity(e) {
  const [ldInst, cbName] = ["ldInst", "cbName"].map((name2) => e.getAttribute(name2));
  return `${ldInst} ${cbName}`;
}
function controlBlockSelector(tagName, identity2) {
  const [ldInst, cbName] = identity2.split(" ");
  if (!ldInst || !cbName)
    return voidSelector;
  return `${tagName}[ldInst="${ldInst}"][cbName="${cbName}"]`;
}
function physConnIdentity(e) {
  if (!e.parentElement)
    return NaN;
  if (!e.parentElement.querySelector('PhysConn[type="RedConn"]'))
    return NaN;
  const pcType = e.getAttribute("type");
  if (e.parentElement.children.length > 1 && pcType !== "Connection" && pcType !== "RedConn")
    return NaN;
  return `${identity(e.parentElement)}>${pcType}`;
}
function physConnSelector(tagName, identity2) {
  const [parentIdentity, pcType] = pathParts(identity2);
  const [parentSelectors, typeSelectors] = [
    tags[tagName].parents.flatMap((parentTag) => selector(parentTag, parentIdentity).split(",")),
    pcType ? [`[type="${pcType}"]`] : [""]
  ];
  return crossProduct(parentSelectors, [">"], [tagName], typeSelectors).map((strings) => strings.join("")).join(",");
}
function pIdentity(e) {
  if (!e.parentElement)
    return NaN;
  const eParent = e.parentElement;
  const eType = e.getAttribute("type");
  if (eParent.tagName === "PhysConn")
    return `${identity(e.parentElement)}>${eType}`;
  const index = Array.from(e.parentElement.children).filter((child) => child.getAttribute("type") === eType).findIndex((child) => child.isSameNode(e));
  return `${identity(e.parentElement)}>${eType} [${index}]`;
}
function pSelector(tagName, identity2) {
  const [parentIdentity, childIdentity] = pathParts(identity2);
  const [type] = childIdentity.split(" ");
  const index = childIdentity && childIdentity.match(/\[([0-9]+)\]/) && childIdentity.match(/\[([0-9]+)\]/)[1] ? parseFloat(childIdentity.match(/\[([0-9]+)\]/)[1]) : NaN;
  const [parentSelectors, typeSelectors, ixSelectors] = [
    tags[tagName].parents.flatMap((parentTag) => selector(parentTag, parentIdentity).split(",")),
    [`[type="${type}"]`],
    index ? [`:nth-child(${index + 1})`] : [""]
  ];
  return crossProduct(parentSelectors, [">"], [tagName], typeSelectors, ixSelectors).map((strings) => strings.join("")).join(",");
}
function enumValIdentity(e) {
  return `${identity(e.parentElement)}>${e.getAttribute("ord")}`;
}
function enumValSelector(tagName, identity2) {
  const [parentIdentity, ord] = pathParts(identity2);
  return `${selector("EnumType", parentIdentity)}>${tagName}[ord="${ord}"]`;
}
function protNsIdentity(e) {
  return `${identity(e.parentElement)}>${e.getAttribute("type") || "8-MMS"}	${e.textContent}`;
}
function protNsSelector(tagName, identity2) {
  const [parentIdentity, childIdentity] = pathParts(identity2);
  const [type, value] = childIdentity.split("	");
  const [parentSelectors] = [
    tags[tagName].parents.flatMap((parentTag) => selector(parentTag, parentIdentity).split(","))
  ];
  return crossProduct(parentSelectors, [">"], [tagName], [`[type="${type}"]`], [">"], [value]).map((strings) => strings.join("")).join(",");
}
function sCLIdentity() {
  return "";
}
function sCLSelector() {
  return ":root";
}
function namingIdentity(e) {
  return e.parentElement.tagName === "SCL" ? e.getAttribute("name") : `${identity(e.parentElement)}>${e.getAttribute("name")}`;
}
function namingSelector(tagName, identity2, depth2 = -1) {
  if (depth2 === -1)
    depth2 = identity2.split(">").length;
  const [parentIdentity, name2] = pathParts(identity2);
  if (!name2)
    return voidSelector;
  if (depth2 === 0)
    return `${tagName}[name="${name2}"]`;
  const parents = tags[tagName].parents;
  if (!parents)
    return voidSelector;
  const parentSelectors = parents.flatMap((parentTag) => tags[parentTag].selector === tags["Substation"].selector ? namingSelector(parentTag, parentIdentity, depth2 - 1).split(",") : selector(parentTag, parentIdentity).split(",")).filter((selector2) => !selector2.startsWith(voidSelector));
  if (parentSelectors.length === 0)
    return voidSelector;
  return crossProduct(parentSelectors, [">"], [tagName], [`[name="${name2}"]`]).map((strings) => strings.join("")).join(",");
}
function singletonIdentity(e) {
  return identity(e.parentElement).toString();
}
function singletonSelector(tagName, identity2) {
  const parents = tags[tagName].parents;
  if (!parents)
    return voidSelector;
  const parentSelectors = parents.flatMap((parentTag) => selector(parentTag, identity2).split(",")).filter((selector2) => !selector2.startsWith(voidSelector));
  if (parentSelectors.length === 0)
    return voidSelector;
  return crossProduct(parentSelectors, [">"], [tagName]).map((strings) => strings.join("")).join(",");
}
function idNamingIdentity(e) {
  return `#${e.id}`;
}
function idNamingSelector(tagName, identity2) {
  const id = identity2.replace(/^#/, "");
  if (!id)
    return voidSelector;
  return `${tagName}[id="${id}"]`;
}
const tAbstractConductingEquipment = [
  "TransformerWinding",
  "ConductingEquipment"
];
const tEquipment = [
  "GeneralEquipment",
  "PowerTransformer",
  ...tAbstractConductingEquipment
];
const tEquipmentContainer = ["Substation", "VoltageLevel", "Bay"];
const tGeneralEquipmentContainer = ["Process", "Line"];
const tAbstractEqFuncSubFunc = ["EqSubFunction", "EqFunction"];
const tPowerSystemResource = [
  "SubFunction",
  "Function",
  "TapChanger",
  "SubEquipment",
  ...tEquipment,
  ...tEquipmentContainer,
  ...tGeneralEquipmentContainer,
  ...tAbstractEqFuncSubFunc
];
const tLNodeContainer = ["ConnectivityNode", ...tPowerSystemResource];
const tCertificate = ["GOOSESecurity", "SMVSecurity"];
const tNaming = ["SubNetwork", ...tCertificate, ...tLNodeContainer];
const tAbstractDataAttribute = ["BDA", "DA"];
const tControlWithIEDName = ["SampledValueControl", "GSEControl"];
const tControlWithTriggerOpt = ["LogControl", "ReportControl"];
const tControl = [...tControlWithIEDName, ...tControlWithTriggerOpt];
const tControlBlock = ["GSE", "SMV"];
const tUnNaming = [
  "ConnectedAP",
  "PhysConn",
  "SDO",
  "DO",
  "DAI",
  "SDI",
  "DOI",
  "Inputs",
  "RptEnabled",
  "Server",
  "ServerAt",
  "SettingControl",
  "Communication",
  "Log",
  "LDevice",
  "DataSet",
  "AccessPoint",
  "IED",
  "NeutralPoint",
  ...tControl,
  ...tControlBlock,
  ...tAbstractDataAttribute
];
const tAnyLN = ["LN0", "LN"];
const tAnyContentFromOtherNamespace = [
  "Text",
  "Private",
  "Hitem",
  "AccessControl"
];
const tCert = ["Subject", "IssuerName"];
const tDurationInMilliSec = ["MinTime", "MaxTime"];
const tIDNaming = ["LNodeType", "DOType", "DAType", "EnumType"];
const tServiceYesNo = [
  "FileHandling",
  "TimeSyncProt",
  "CommProt",
  "SGEdit",
  "ConfSG",
  "GetDirectory",
  "GetDataObjectDefinition",
  "DataObjectDirectory",
  "GetDataSetValue",
  "SetDataSetValue",
  "DataSetDirectory",
  "ReadWrite",
  "TimerActivatedControl",
  "GetCBValues",
  "GSEDir",
  "ConfLdName"
];
const tServiceWithMaxAndMaxAttributes = ["DynDataSet", "ConfDataSet"];
const tServiceWithMax = [
  "GSSE",
  "GOOSE",
  "ConfReportControl",
  "SMVsc",
  ...tServiceWithMaxAndMaxAttributes
];
const tServiceWithMaxNonZero = ["ConfLogControl", "ConfSigRef"];
const tServiceSettings = [
  "ReportSettings",
  "LogSettings",
  "GSESettings",
  "SMVSettings"
];
const tBaseElement = ["SCL", ...tNaming, ...tUnNaming, ...tIDNaming];
const sCLTags = [
  ...tBaseElement,
  ...tAnyContentFromOtherNamespace,
  "Header",
  "LNode",
  "Val",
  "Voltage",
  "Services",
  ...tCert,
  ...tDurationInMilliSec,
  "Association",
  "FCDA",
  "ClientLN",
  "IEDName",
  "ExtRef",
  "Protocol",
  ...tAnyLN,
  ...tServiceYesNo,
  "DynAssociation",
  "SettingGroups",
  ...tServiceWithMax,
  ...tServiceWithMaxNonZero,
  ...tServiceSettings,
  "ConfLNs",
  "ClientServices",
  "SupSubscription",
  "ValueHandling",
  "RedProt",
  "McSecurity",
  "KDC",
  "Address",
  "P",
  "ProtNs",
  "EnumVal",
  "Terminal",
  "BitRate",
  "Authentication",
  "DataTypeTemplates",
  "History",
  "OptFields",
  "SmvOpts",
  "TrgOps",
  "SamplesPerSec",
  "SmpRate",
  "SecPerSamples"
];
const tagSet = new Set(sCLTags);
function isSCLTag(tag) {
  return tagSet.has(tag);
}
const tBaseNameSequence = ["Text", "Private"];
const tNamingSequence = [...tBaseNameSequence];
const tUnNamingSequence = [...tBaseNameSequence];
const tIDNamingSequence = [...tBaseNameSequence];
const tAbstractDataAttributeSequence = [...tUnNamingSequence, "Val"];
const tLNodeContainerSequence = [...tNamingSequence, "LNode"];
const tPowerSystemResourceSequence = [...tLNodeContainerSequence];
const tEquipmentSequence = [...tPowerSystemResourceSequence];
const tEquipmentContainerSequence = [
  ...tPowerSystemResourceSequence,
  "PowerTransformer",
  "GeneralEquipment"
];
const tAbstractConductingEquipmentSequence = [
  ...tEquipmentSequence,
  "Terminal"
];
const tControlBlockSequence = [...tUnNamingSequence, "Address"];
const tControlSequence = [...tNamingSequence];
const tControlWithIEDNameSequence = [...tControlSequence, "IEDName"];
const tAnyLNSequence = [
  ...tUnNamingSequence,
  "DataSet",
  "ReportControl",
  "LogControl",
  "DOI",
  "Inputs",
  "Log"
];
const tGeneralEquipmentContainerSequence = [
  ...tPowerSystemResourceSequence,
  "GeneralEquipment",
  "Function"
];
const tControlWithTriggerOptSequence = [...tControlSequence, "TrgOps"];
const tAbstractEqFuncSubFuncSequence = [
  ...tPowerSystemResourceSequence,
  "GeneralEquipment",
  "EqSubFunction"
];
export const tags = {
  AccessControl: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["LDevice"],
    children: []
  },
  AccessPoint: {
    identity: namingIdentity,
    selector: namingSelector,
    parents: ["IED"],
    children: [
      ...tNamingSequence,
      "Server",
      "LN",
      "ServerAt",
      "Services",
      "GOOSESecurity",
      "SMVSecurity"
    ]
  },
  Address: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["ConnectedAP", "GSE", "SMV"],
    children: ["P"]
  },
  Association: {
    identity: associationIdentity,
    selector: associationSelector,
    parents: ["Server"],
    children: []
  },
  Authentication: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["Server"],
    children: []
  },
  BDA: {
    identity: namingIdentity,
    selector: namingSelector,
    parents: ["DAType"],
    children: [...tAbstractDataAttributeSequence]
  },
  BitRate: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["SubNetwork"],
    children: []
  },
  Bay: {
    identity: namingIdentity,
    selector: namingSelector,
    parents: ["VoltageLevel"],
    children: [
      ...tEquipmentContainerSequence,
      "ConductingEquipment",
      "ConnectivityNode",
      "Function"
    ]
  },
  ClientLN: {
    identity: clientLNIdentity,
    selector: clientLNSelector,
    parents: ["RptEnabled"],
    children: []
  },
  ClientServices: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["Services"],
    children: ["TimeSyncProt", "McSecurity"]
  },
  CommProt: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["Services"],
    children: []
  },
  Communication: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["SCL"],
    children: [...tUnNamingSequence, "SubNetwork"]
  },
  ConductingEquipment: {
    identity: namingIdentity,
    selector: namingSelector,
    parents: ["Process", "Line", "SubFunction", "Function", "Bay"],
    children: [
      ...tAbstractConductingEquipmentSequence,
      "EqFunction",
      "SubEquipment"
    ]
  },
  ConfDataSet: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["Services"],
    children: []
  },
  ConfLdName: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["Services"],
    children: []
  },
  ConfLNs: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["Services"],
    children: []
  },
  ConfLogControl: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["Services"],
    children: []
  },
  ConfReportControl: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["Services"],
    children: []
  },
  ConfSG: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["SettingGroups"],
    children: []
  },
  ConfSigRef: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["Services"],
    children: []
  },
  ConnectedAP: {
    identity: connectedAPIdentity,
    selector: connectedAPSelector,
    parents: ["SubNetwork"],
    children: [...tUnNamingSequence, "Address", "GSE", "SMV", "PhysConn"]
  },
  ConnectivityNode: {
    identity: namingIdentity,
    selector: namingSelector,
    parents: ["Bay", "Line"],
    children: [...tLNodeContainerSequence]
  },
  DA: {
    identity: namingIdentity,
    selector: namingSelector,
    parents: ["DOType"],
    children: [...tAbstractDataAttributeSequence]
  },
  DAI: {
    identity: ixNamingIdentity,
    selector: ixNamingSelector,
    parents: ["DOI", "SDI"],
    children: [...tUnNamingSequence, "Val"]
  },
  DAType: {
    identity: idNamingIdentity,
    selector: idNamingSelector,
    parents: ["DataTypeTemplates"],
    children: [...tIDNamingSequence, "BDA", "ProtNs"]
  },
  DO: {
    identity: namingIdentity,
    selector: namingSelector,
    parents: ["LNodeType"],
    children: [...tUnNamingSequence]
  },
  DOI: {
    identity: namingIdentity,
    selector: namingSelector,
    parents: [...tAnyLN],
    children: [...tUnNamingSequence, "SDI", "DAI"]
  },
  DOType: {
    identity: idNamingIdentity,
    selector: idNamingSelector,
    parents: ["DataTypeTemplates"],
    children: [...tIDNamingSequence, "SDO", "DA"]
  },
  DataObjectDirectory: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["Services"],
    children: []
  },
  DataSet: {
    identity: namingIdentity,
    selector: namingSelector,
    parents: [...tAnyLN],
    children: [...tNamingSequence, "FCDA"]
  },
  DataSetDirectory: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["Services"],
    children: []
  },
  DataTypeTemplates: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["SCL"],
    children: ["LNodeType", "DOType", "DAType", "EnumType"]
  },
  DynAssociation: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["Services"],
    children: []
  },
  DynDataSet: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["Services"],
    children: []
  },
  EnumType: {
    identity: idNamingIdentity,
    selector: idNamingSelector,
    parents: ["DataTypeTemplates"],
    children: [...tIDNamingSequence, "EnumVal"]
  },
  EnumVal: {
    identity: enumValIdentity,
    selector: enumValSelector,
    parents: ["EnumType"],
    children: []
  },
  EqFunction: {
    identity: namingIdentity,
    selector: namingSelector,
    parents: [
      "GeneralEquipment",
      "TapChanger",
      "TransformerWinding",
      "PowerTransformer",
      "SubEquipment",
      "ConductingEquipment"
    ],
    children: [...tAbstractEqFuncSubFuncSequence]
  },
  EqSubFunction: {
    identity: namingIdentity,
    selector: namingSelector,
    parents: ["EqSubFunction", "EqFunction"],
    children: [...tAbstractEqFuncSubFuncSequence]
  },
  ExtRef: {
    identity: extRefIdentity,
    selector: extRefSelector,
    parents: ["Inputs"],
    children: []
  },
  FCDA: {
    identity: fCDAIdentity,
    selector: fCDASelector,
    parents: ["DataSet"],
    children: []
  },
  FileHandling: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["Services"],
    children: []
  },
  Function: {
    identity: namingIdentity,
    selector: namingSelector,
    parents: ["Bay", "VoltageLevel", "Substation", "Process", "Line"],
    children: [
      ...tPowerSystemResourceSequence,
      "SubFunction",
      "GeneralEquipment",
      "ConductingEquipment"
    ]
  },
  GeneralEquipment: {
    identity: namingIdentity,
    selector: namingSelector,
    parents: [
      "SubFunction",
      "Function",
      ...tGeneralEquipmentContainer,
      ...tAbstractEqFuncSubFunc,
      ...tEquipmentContainer
    ],
    children: [...tEquipmentSequence, "EqFunction"]
  },
  GetCBValues: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["Services"],
    children: []
  },
  GetDataObjectDefinition: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["Services"],
    children: []
  },
  GetDataSetValue: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["Services"],
    children: []
  },
  GetDirectory: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["Services"],
    children: []
  },
  GOOSE: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["Services"],
    children: []
  },
  GOOSESecurity: {
    identity: namingIdentity,
    selector: namingSelector,
    parents: ["AccessPoint"],
    children: [...tNamingSequence, "Subject", "IssuerName"]
  },
  GSE: {
    identity: controlBlockIdentity,
    selector: controlBlockSelector,
    parents: ["ConnectedAP"],
    children: [...tControlBlockSequence, "MinTime", "MaxTime"]
  },
  GSEDir: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["Services"],
    children: []
  },
  GSEControl: {
    identity: namingIdentity,
    selector: namingSelector,
    parents: ["LN0"],
    children: [...tControlWithIEDNameSequence, "Protocol"]
  },
  GSESettings: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["Services"],
    children: []
  },
  GSSE: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["Services"],
    children: []
  },
  Header: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["SCL"],
    children: ["Text", "History"]
  },
  History: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["Header"],
    children: ["Hitem"]
  },
  Hitem: {
    identity: hitemIdentity,
    selector: hitemSelector,
    parents: ["History"],
    children: []
  },
  IED: {
    identity: namingIdentity,
    selector: namingSelector,
    parents: ["SCL"],
    children: [...tUnNamingSequence, "Services", "AccessPoint", "KDC"]
  },
  IEDName: {
    identity: iEDNameIdentity,
    selector: iEDNameSelector,
    parents: ["GSEControl", "SampledValueControl"],
    children: []
  },
  Inputs: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: [...tAnyLN],
    children: [...tUnNamingSequence, "ExtRef"]
  },
  IssuerName: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["GOOSESecurity", "SMVSecurity"],
    children: []
  },
  KDC: {
    identity: kDCIdentity,
    selector: kDCSelector,
    parents: ["IED"],
    children: []
  },
  LDevice: {
    identity: lDeviceIdentity,
    selector: lDeviceSelector,
    parents: ["Server"],
    children: [...tUnNamingSequence, "LN0", "LN", "AccessControl"]
  },
  LN: {
    identity: lNIdentity,
    selector: lNSelector,
    parents: ["AccessPoint", "LDevice"],
    children: [...tAnyLNSequence]
  },
  LN0: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["LDevice"],
    children: [
      ...tAnyLNSequence,
      "GSEControl",
      "SampledValueControl",
      "SettingControl"
    ]
  },
  LNode: {
    identity: lNodeIdentity,
    selector: lNodeSelector,
    parents: [...tLNodeContainer],
    children: [...tUnNamingSequence]
  },
  LNodeType: {
    identity: idNamingIdentity,
    selector: idNamingSelector,
    parents: ["DataTypeTemplates"],
    children: [...tIDNamingSequence, "DO"]
  },
  Line: {
    identity: namingIdentity,
    selector: namingSelector,
    parents: ["Process", "SCL"],
    children: [
      ...tGeneralEquipmentContainerSequence,
      "Voltage",
      "ConductingEquipment"
    ]
  },
  Log: {
    identity: namingIdentity,
    selector: namingSelector,
    parents: [...tAnyLN],
    children: [...tUnNamingSequence]
  },
  LogControl: {
    identity: namingIdentity,
    selector: namingSelector,
    parents: [...tAnyLN],
    children: [...tControlWithTriggerOptSequence]
  },
  LogSettings: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["Services"],
    children: []
  },
  MaxTime: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["GSE"],
    children: []
  },
  McSecurity: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["GSESettings", "SMVSettings", "ClientServices"],
    children: []
  },
  MinTime: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["GSE"],
    children: []
  },
  NeutralPoint: {
    identity: terminalIdentity,
    selector: terminalSelector,
    parents: ["TransformerWinding"],
    children: [...tUnNamingSequence]
  },
  OptFields: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["ReportControl"],
    children: []
  },
  P: {
    identity: pIdentity,
    selector: pSelector,
    parents: ["Address", "PhysConn"],
    children: []
  },
  PhysConn: {
    identity: physConnIdentity,
    selector: physConnSelector,
    parents: ["ConnectedAP"],
    children: [...tUnNamingSequence, "P"]
  },
  PowerTransformer: {
    identity: namingIdentity,
    selector: namingSelector,
    parents: [...tEquipmentContainer],
    children: [
      ...tEquipmentSequence,
      "TransformerWinding",
      "SubEquipment",
      "EqFunction"
    ]
  },
  Private: {
    identity: () => NaN,
    selector: () => voidSelector,
    parents: [],
    children: []
  },
  Process: {
    identity: namingIdentity,
    selector: namingSelector,
    parents: ["Process", "SCL"],
    children: [
      ...tGeneralEquipmentContainerSequence,
      "ConductingEquipment",
      "Substation",
      "Line",
      "Process"
    ]
  },
  ProtNs: {
    identity: protNsIdentity,
    selector: protNsSelector,
    parents: ["DAType", "DA"],
    children: []
  },
  Protocol: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["GSEControl", "SampledValueControl"],
    children: []
  },
  ReadWrite: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["Services"],
    children: []
  },
  RedProt: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["Services"],
    children: []
  },
  ReportControl: {
    identity: namingIdentity,
    selector: namingSelector,
    parents: [...tAnyLN],
    children: [...tControlWithTriggerOptSequence, "OptFields", "RptEnabled"]
  },
  ReportSettings: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["Services"],
    children: []
  },
  RptEnabled: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["ReportControl"],
    children: [...tUnNamingSequence, "ClientLN"]
  },
  SamplesPerSec: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["SMVSettings"],
    children: []
  },
  SampledValueControl: {
    identity: namingIdentity,
    selector: namingSelector,
    parents: ["LN0"],
    children: [...tControlWithIEDNameSequence, "SmvOpts"]
  },
  SecPerSamples: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["SMVSettings"],
    children: []
  },
  SCL: {
    identity: sCLIdentity,
    selector: sCLSelector,
    parents: [],
    children: [
      ...tBaseNameSequence,
      "Header",
      "Substation",
      "Communication",
      "IED",
      "DataTypeTemplates",
      "Line",
      "Process"
    ]
  },
  SDI: {
    identity: ixNamingIdentity,
    selector: ixNamingSelector,
    parents: ["DOI", "SDI"],
    children: [...tUnNamingSequence, "SDI", "DAI"]
  },
  SDO: {
    identity: namingIdentity,
    selector: namingSelector,
    parents: ["DOType"],
    children: [...tNamingSequence]
  },
  Server: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["AccessPoint"],
    children: [
      ...tUnNamingSequence,
      "Authentication",
      "LDevice",
      "Association"
    ]
  },
  ServerAt: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["AccessPoint"],
    children: [...tUnNamingSequence]
  },
  Services: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["IED", "AccessPoint"],
    children: [
      "DynAssociation",
      "SettingGroups",
      "GetDirectory",
      "GetDataObjectDefinition",
      "DataObjectDirectory",
      "GetDataSetValue",
      "SetDataSetValue",
      "DataSetDirectory",
      "ConfDataSet",
      "DynDataSet",
      "ReadWrite",
      "TimerActivatedControl",
      "ConfReportControl",
      "GetCBValues",
      "ConfLogControl",
      "ReportSettings",
      "LogSettings",
      "GSESettings",
      "SMVSettings",
      "GSEDir",
      "GOOSE",
      "GSSE",
      "SMVsc",
      "FileHandling",
      "ConfLNs",
      "ClientServices",
      "ConfLdName",
      "SupSubscription",
      "ConfSigRef",
      "ValueHandling",
      "RedProt",
      "TimeSyncProt",
      "CommProt"
    ]
  },
  SetDataSetValue: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["Services"],
    children: []
  },
  SettingControl: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["LN0"],
    children: [...tUnNamingSequence]
  },
  SettingGroups: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["Services"],
    children: ["SGEdit", "ConfSG"]
  },
  SGEdit: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["SettingGroups"],
    children: []
  },
  SmpRate: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["SMVSettings"],
    children: []
  },
  SMV: {
    identity: controlBlockIdentity,
    selector: controlBlockSelector,
    parents: ["ConnectedAP"],
    children: [...tControlBlockSequence]
  },
  SmvOpts: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["SampledValueControl"],
    children: []
  },
  SMVsc: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["Services"],
    children: []
  },
  SMVSecurity: {
    identity: namingIdentity,
    selector: namingSelector,
    parents: ["AccessPoint"],
    children: [...tNamingSequence, "Subject", "IssuerName"]
  },
  SMVSettings: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["Services"],
    children: ["SmpRate", "SamplesPerSec", "SecPerSamples", "McSecurity"]
  },
  SubEquipment: {
    identity: namingIdentity,
    selector: namingSelector,
    parents: [
      "TapChanger",
      "PowerTransformer",
      "ConductingEquipment",
      "TransformerWinding",
      ...tAbstractConductingEquipment
    ],
    children: [...tPowerSystemResourceSequence, "EqFunction"]
  },
  SubFunction: {
    identity: namingIdentity,
    selector: namingSelector,
    parents: ["SubFunction", "Function"],
    children: [
      ...tPowerSystemResourceSequence,
      "GeneralEquipment",
      "ConductingEquipment",
      "SubFunction"
    ]
  },
  SubNetwork: {
    identity: namingIdentity,
    selector: namingSelector,
    parents: ["Communication"],
    children: [...tNamingSequence, "BitRate", "ConnectedAP"]
  },
  Subject: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["GOOSESecurity", "SMVSecurity"],
    children: []
  },
  Substation: {
    identity: namingIdentity,
    selector: namingSelector,
    parents: ["SCL"],
    children: [...tEquipmentContainerSequence, "VoltageLevel", "Function"]
  },
  SupSubscription: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["Services"],
    children: []
  },
  TapChanger: {
    identity: namingIdentity,
    selector: namingSelector,
    parents: ["TransformerWinding"],
    children: [...tPowerSystemResourceSequence, "SubEquipment", "EqFunction"]
  },
  Terminal: {
    identity: terminalIdentity,
    selector: terminalSelector,
    parents: [...tEquipment],
    children: [...tUnNamingSequence]
  },
  Text: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: sCLTags.filter((tag) => tag !== "Text" && tag !== "Private"),
    children: []
  },
  TimerActivatedControl: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["Services"],
    children: []
  },
  TimeSyncProt: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["Services", "ClientServices"],
    children: []
  },
  TransformerWinding: {
    identity: namingIdentity,
    selector: namingSelector,
    parents: ["PowerTransformer"],
    children: [
      ...tAbstractConductingEquipmentSequence,
      "TapChanger",
      "NeutralPoint",
      "EqFunction",
      "SubEquipment"
    ]
  },
  TrgOps: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["ReportControl"],
    children: []
  },
  Val: {
    identity: valIdentity,
    selector: valSelector,
    parents: ["DAI", "DA", "BDA"],
    children: []
  },
  ValueHandling: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["Services"],
    children: []
  },
  Voltage: {
    identity: singletonIdentity,
    selector: singletonSelector,
    parents: ["VoltageLevel"],
    children: []
  },
  VoltageLevel: {
    identity: namingIdentity,
    selector: namingSelector,
    parents: ["Substation"],
    children: [...tEquipmentContainerSequence, "Voltage", "Bay", "Function"]
  }
};
export function getReference(parent, tag) {
  const parentTag = parent.tagName;
  const children = Array.from(parent.children);
  if (parentTag === "Services" || parentTag === "SettingGroups" || !isSCLTag(parentTag))
    return children.find((child) => child.tagName === tag) ?? null;
  const sequence = tags[parentTag]?.children ?? [];
  let index = sequence.findIndex((element) => element === tag);
  if (index < 0)
    return null;
  let nextSibling;
  while (index < sequence.length && !nextSibling) {
    nextSibling = children.find((child) => child.tagName === sequence[index]);
    index++;
  }
  return nextSibling ?? null;
}
function selector(tagName, identity2) {
  if (typeof identity2 !== "string")
    return voidSelector;
  if (isSCLTag(tagName))
    return tags[tagName].selector(tagName, identity2);
  return tagName;
}
export function find(root, tagName, identity2) {
  if (typeof identity2 !== "string" || !isSCLTag(tagName))
    return null;
  const element = root.querySelector(tags[tagName].selector(tagName, identity2));
  if (element === null || isPublic(element))
    return element;
  return Array.from(root.querySelectorAll(tags[tagName].selector(tagName, identity2))).find(isPublic) ?? null;
}
export function identity(e) {
  if (e === null)
    return NaN;
  if (e.closest("Private"))
    return NaN;
  const tag = e.tagName;
  if (isSCLTag(tag))
    return tags[tag].identity(e);
  return NaN;
}
export function isSame(a, b) {
  if (a.tagName === "Private")
    return isSame(a.parentElement, b.parentElement) && a.isEqualNode(b);
  return a.tagName === b.tagName && identity(a) === identity(b);
}
export function isEqual(a, b) {
  if (a.closest("Private") || b.closest("Private"))
    return a.isEqualNode(b);
  const attributeNames = new Set(a.getAttributeNames().concat(b.getAttributeNames()));
  for (const name2 of attributeNames)
    if (a.getAttribute(name2) !== b.getAttribute(name2))
      return false;
  if (a.childElementCount === 0)
    return b.childElementCount === 0 && a.textContent?.trim() === b.textContent?.trim();
  const aChildren = Array.from(a.children);
  const bChildren = Array.from(b.children);
  for (const aChild of aChildren) {
    const twindex = bChildren.findIndex((bChild) => isEqual(aChild, bChild));
    if (twindex === -1)
      return false;
    bChildren.splice(twindex, 1);
  }
  for (const bChild of bChildren)
    if (!aChildren.find((aChild) => isEqual(bChild, aChild)))
      return false;
  return true;
}
export const ifImplemented = directive((rendered) => (part) => {
  if (Object.keys(rendered).length)
    part.setValue(rendered);
  else
    part.setValue("");
});
const nameStartChar = "[:_A-Za-z]|[À-Ö]|[Ø-ö]|[ø-˿]|[Ͱ-ͽ]|[Ϳ-῿]|[‌-‍]|[⁰-↏]|[Ⰰ-⿯]|[、-퟿]|[豈-﷏]|[ﷰ-�]";
const nameChar = nameStartChar + "|[.0-9\\-]|·|[̀-ͯ]|[‿-⁀]";
const name = nameStartChar + "(" + nameChar + ")*";
const nmToken = "(" + nameChar + ")+";
export const patterns = {
  string: "([	-\n]|[\r]|[ -~]|[]|[ -퟿]|[-�])*",
  normalizedString: "([ -~]|[]|[ -퟿]|[-�])*",
  name,
  nmToken,
  names: name + "( " + name + ")*",
  nmTokens: nmToken + "( " + nmToken + ")*",
  decimal: "[+\\-]?[0-9]+(([.][0-9]*)?|([.][0-9]+))",
  unsigned: "[+]?[0-9]+(([.][0-9]*)?|([.][0-9]+))",
  integer: "[+\\-]?[0-9]+([0-9]*)",
  alphanumericFirstUpperCase: "[A-Z][0-9,A-Z,a-z]*",
  alphanumericFirstLowerCase: "[a-z][0-9,A-Z,a-z]*",
  lnClass: "(LLN0)|[A-Z]{4,4}"
};
export function compareNames(a, b) {
  if (typeof a === "string" && typeof b === "string")
    return a.localeCompare(b);
  if (typeof a === "object" && typeof b === "string")
    return (a.getAttribute("name") ?? "").localeCompare(b);
  if (typeof a === "string" && typeof b === "object")
    return a.localeCompare(b.getAttribute("name"));
  if (typeof a === "object" && typeof b === "object")
    return (a.getAttribute("name") ?? "").localeCompare(b.getAttribute("name") ?? "");
  return 0;
}
export function crossProduct(...arrays) {
  return arrays.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())), [[]]);
}
export function depth(t, mem = new WeakSet()) {
  if (mem.has(t))
    return Infinity;
  else
    switch (t?.constructor) {
      case Object:
      case Array:
        mem.add(t);
        return 1 + Math.max(-1, ...Object.values(t).map((_) => depth(_, mem)));
      default:
        return 0;
    }
}
export function findFCDAs(extRef) {
  if (extRef.tagName !== "ExtRef" || extRef.closest("Private"))
    return [];
  const [iedName, ldInst, prefix, lnClass, lnInst, doName, daName] = [
    "iedName",
    "ldInst",
    "prefix",
    "lnClass",
    "lnInst",
    "doName",
    "daName"
  ].map((name2) => extRef.getAttribute(name2));
  const ied = Array.from(extRef.ownerDocument.getElementsByTagName("IED")).find((element) => element.getAttribute("name") === iedName && !element.closest("Private"));
  if (!ied)
    return [];
  return Array.from(ied.getElementsByTagName("FCDA")).filter((item) => !item.closest("Private")).filter((fcda) => (fcda.getAttribute("ldInst") ?? "") === (ldInst ?? "") && (fcda.getAttribute("prefix") ?? "") === (prefix ?? "") && (fcda.getAttribute("lnClass") ?? "") === (lnClass ?? "") && (fcda.getAttribute("lnInst") ?? "") === (lnInst ?? "") && (fcda.getAttribute("doName") ?? "") === (doName ?? "") && (fcda.getAttribute("daName") ?? "") === (daName ?? ""));
}
const serviceTypeControlBlockTags = {
  GOOSE: ["GSEControl"],
  SMV: ["SampledValueControl"],
  Report: ["ReportControl"],
  NONE: ["LogControl", "GSEControl", "SampledValueControl", "ReportControl"]
};
export function findControlBlocks(extRef) {
  const fcdas = findFCDAs(extRef);
  const cbTags = serviceTypeControlBlockTags[extRef.getAttribute("serviceType") ?? "NONE"] ?? [];
  const controlBlocks = new Set(fcdas.flatMap((fcda) => {
    const dataSet = fcda.parentElement;
    const dsName = dataSet.getAttribute("name") ?? "";
    const anyLN = dataSet.parentElement;
    return cbTags.flatMap((tag) => Array.from(anyLN.getElementsByTagName(tag))).filter((cb) => cb.getAttribute("datSet") === dsName);
  }));
  return controlBlocks;
}
export function isPublic(element) {
  return !element.closest("Private");
}
export function getVersion(element) {
  const header = Array.from(element.ownerDocument.getElementsByTagName("Header")).filter((item) => !item.closest("Private"));
  return header[0].getAttribute("version") ?? "2003";
}
const maxLnInst = 99;
const lnInstRange = Array(maxLnInst).fill(1).map((_, i) => `${i + 1}`);
export function newLnInstGenerator(parent) {
  const generators = new Map();
  return (lnClass) => {
    if (!generators.has(lnClass)) {
      const lnInsts = new Set(getChildElementsByTagName(parent, "LNode").filter((lnode) => lnode.getAttribute("lnClass") === lnClass).map((lNode) => lNode.getAttribute("lnInst")));
      generators.set(lnClass, () => {
        const uniqueLnInst = lnInstRange.find((lnInst) => !lnInsts.has(lnInst));
        if (uniqueLnInst)
          lnInsts.add(uniqueLnInst);
        return uniqueLnInst;
      });
    }
    return generators.get(lnClass)();
  };
}
export function minAvailableLogicalNodeInstance(lnElements) {
  const lnInsts = new Set(lnElements.map((ln) => ln.getAttribute("inst") || ""));
  return lnInstRange.find((lnInst) => !lnInsts.has(lnInst));
}
