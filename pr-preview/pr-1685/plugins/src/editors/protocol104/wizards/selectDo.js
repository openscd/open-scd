import {html} from "../../../../../_snowpack/pkg/lit-element.js";
import {get} from "../../../../../_snowpack/pkg/lit-translate.js";
import "../../../../../openscd/src/finder-list.js";
import {
  getDisplayString,
  getReader
} from "../../../wizards/foundation/finder.js";
import {
  compareNames,
  getNameAttribute,
  identity,
  newSubWizardEvent,
  find
} from "../../../../../openscd/src/foundation.js";
import {createAddressesWizard} from "./createAddresses.js";
import {supportedCdcTypes} from "../foundation/cdc.js";
import {PROTOCOL_104_PRIVATE} from "../foundation/private.js";
import {
  getCdcValueFromDOElement,
  getDoElements
} from "../foundation/foundation.js";
function filterAvailableDOElements(lnElement, doElement) {
  const cdc = getCdcValueFromDOElement(doElement) ?? "";
  if (!supportedCdcTypes.includes(cdc)) {
    return false;
  }
  const doName = getNameAttribute(doElement);
  return lnElement.querySelectorAll(`:scope > DOI[name="${doName}"] DAI > Private[type="${PROTOCOL_104_PRIVATE}"] > Address`).length <= 0;
}
function filterAvailableElements(child) {
  let lnElements;
  if (["LN0", "LN"].includes(child.tagName)) {
    lnElements = [child];
  } else {
    lnElements = Array.from(child.querySelectorAll("LN0, LN"));
  }
  return lnElements.filter((lnElement) => getDoElements(lnElement).filter((doElement) => filterAvailableDOElements(lnElement, doElement)).length > 0).length > 0;
}
export function getDataChildren(parent) {
  let children;
  if (["LN0", "LN"].includes(parent.tagName)) {
    const lnType = parent.getAttribute("lnType") ?? "";
    children = Array.from(parent.ownerDocument.querySelectorAll(`:root > DataTypeTemplates > LNodeType[id="${lnType}"] > DO`)).filter((child) => filterAvailableDOElements(parent, child)).sort((a, b) => compareNames(`${identity(a)}`, `${identity(b)}`));
  } else if (parent.tagName === "AccessPoint") {
    children = Array.from(parent.querySelectorAll("LDevice, :scope > LN")).filter((child) => filterAvailableElements(child)).sort((a, b) => compareNames(`${identity(a)}`, `${identity(b)}`));
  } else {
    children = Array.from(parent.children).filter((child) => ["IED", "AccessPoint", "LN0", "LN"].includes(child.tagName)).filter((child) => filterAvailableElements(child)).sort((a, b) => compareNames(`${identity(a)}`, `${identity(b)}`));
  }
  return children;
}
function openPrepareAddressWizard(doc) {
  return (_, wizard) => {
    const finder = wizard.shadowRoot?.querySelector("finder-list");
    const path = finder?.path ?? [];
    if (path.length === 0)
      return [];
    const doElement = checkAndGetLastElementFromPath(doc, path, ["DO"]);
    const lnElement = checkAndGetLastElementFromPath(doc, path, ["LN0", "LN"]);
    if (lnElement && doElement) {
      wizard.dispatchEvent(newSubWizardEvent(createAddressesWizard(lnElement, doElement)));
    }
    return [];
  };
}
function checkAndGetLastElementFromPath(doc, path, expectedTag) {
  const [tagName, id] = path.pop().split(": ");
  if (!expectedTag.includes(tagName))
    return null;
  return find(doc, tagName, id);
}
export function selectDoWizard(doc) {
  function renderTemplate(doc2) {
    return html` <finder-list
      path="${JSON.stringify(["SCL: "])}"
      .read=${getReader(doc2, getDataChildren)}
      .getDisplayString=${getDisplayString}
      .getTitle=${(path) => path[path.length - 1]}
    >
    </finder-list>`;
  }
  return [
    {
      title: get("wizard.title.select", {tagName: "DO(I)"}),
      primary: {
        icon: "",
        label: get("next"),
        action: openPrepareAddressWizard(doc)
      },
      content: [renderTemplate(doc)]
    }
  ];
}
