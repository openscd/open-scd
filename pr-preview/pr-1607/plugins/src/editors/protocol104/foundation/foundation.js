import {html} from "../../../../../_snowpack/pkg/lit-element.js";
import {ifDefined} from "../../../../../_snowpack/pkg/lit-html/directives/if-defined.js";
import {get} from "../../../../../_snowpack/pkg/lit-translate.js";
import {
  getInstanceAttribute,
  getNameAttribute
} from "../../../../../openscd/src/foundation.js";
import {typeMaxLength} from "../../../wizards/foundation/p-types.js";
import {typeDescriptiveNameKeys, typePattern} from "./p-types.js";
export function getFullPath(element, topLevelTagName) {
  let currentElement = element;
  const paths = [];
  do {
    let value;
    switch (currentElement.tagName) {
      case "LN":
      case "LN0": {
        const prefix = currentElement.getAttribute("prefix");
        const inst = getInstanceAttribute(currentElement);
        value = `${prefix ? prefix + "-" : ""}${currentElement.getAttribute("lnClass")}${inst ? "-" + inst : ""}`;
        break;
      }
      case "LDevice": {
        value = getNameAttribute(currentElement) ?? getInstanceAttribute(currentElement);
        break;
      }
      default: {
        value = getNameAttribute(currentElement);
      }
    }
    if (value) {
      paths.unshift(value);
    }
    currentElement = currentElement.parentElement;
  } while (currentElement && currentElement.tagName != topLevelTagName);
  return paths.join(" / ");
}
export function getCdcValueFromDOIElement(doiElement) {
  const lnElement = doiElement.closest("LN0, LN");
  if (lnElement) {
    const lnType = lnElement.getAttribute("lnType");
    const doName = doiElement.getAttribute("name");
    const doElement = doiElement.ownerDocument.querySelector(`:root > DataTypeTemplates > LNodeType[id="${lnType}"] > DO[name="${doName}"]`);
    if (doElement) {
      return getCdcValueFromDOElement(doElement);
    }
  }
  return null;
}
export function getCdcValueFromDOElement(doElement) {
  const doType = getTypeAttribute(doElement);
  const doTypeElement = doElement.ownerDocument.querySelector(`:root > DataTypeTemplates > DOType[id="${doType}"]`);
  return doTypeElement ? doTypeElement.getAttribute("cdc") : null;
}
const addressAttributes = [
  "casdu",
  "ioa",
  "ti",
  "expectedValue",
  "unitMultiplier",
  "scaleMultiplier",
  "scaleOffset",
  "inverted",
  "check"
];
export function get104DetailsLine(daiElement, address) {
  return addressAttributes.filter((attrName) => address.hasAttribute(attrName)).map((attrName) => {
    const value = address.getAttribute(attrName);
    if (attrName === "expectedValue") {
      const enumValue = getEnumVal(daiElement, value);
      return `${attrName}: ${value}${enumValue ? ` (${enumValue})` : ``}`;
    } else {
      return `${attrName}: ${value}`;
    }
  }).join(", ");
}
export function getTypeAttribute(element) {
  const type = element.getAttribute("type");
  return type ? type : void 0;
}
export function getDaElement(doElement, name) {
  const doType = getTypeAttribute(doElement);
  if (doType) {
    return doElement.ownerDocument.querySelector(`:root > DataTypeTemplates > DOType[id="${doType}"] > DA[name="${name}"]`);
  }
  return null;
}
export function getDaValue(doElement, name) {
  const daElement = getDaElement(doElement, name);
  if (daElement) {
    return daElement.querySelector(":scope > Val")?.textContent ?? null;
  }
  return null;
}
export function getDaiElement(doiElement, name) {
  return doiElement.querySelector(`:scope > DAI[name="${name}"]`);
}
export function getDaiValue(doiElement, name) {
  const daiElement = getDaiElement(doiElement, name);
  if (daiElement) {
    return daiElement.querySelector(":scope > Val")?.textContent ?? null;
  }
  return null;
}
export function getDoiElement(lnElement, doName) {
  return lnElement.querySelector(`:scope > DOI[name="${doName}"]`);
}
export function getDoElement(lnElement, doName) {
  const lnType = lnElement.getAttribute("lnType");
  if (lnType) {
    return lnElement.ownerDocument.querySelector(`:root > DataTypeTemplates > LNodeType[id="${lnType}"] > DO[name="${doName}"]`);
  }
  return null;
}
export function getDoElements(lnElement) {
  const lnType = lnElement.getAttribute("lnType");
  if (lnType) {
    return Array.from(lnElement.ownerDocument.querySelectorAll(`:root > DataTypeTemplates > LNodeType[id="${lnType}"] > DO`));
  }
  return [];
}
export function getCtlModel(lnElement, doElement) {
  const doName = getNameAttribute(doElement);
  if (doName) {
    const doiElement = getDoiElement(lnElement, doName);
    if (doiElement) {
      return getDaiValue(doiElement, "ctlModel");
    } else {
      return getDaValue(doElement, "ctlModel");
    }
  }
  return null;
}
function buildInstanceChain(daiElement) {
  const instanceElementChain = [daiElement];
  let child = daiElement;
  if (child.parentElement) {
    do {
      child = child.parentElement;
      instanceElementChain.unshift(child);
    } while (child.tagName !== "DOI" && child.parentElement);
  }
  return instanceElementChain;
}
function buildTemplateChainFromInstanceElements(doc, instanceChain) {
  const templateChain = [];
  let typeElement;
  instanceChain.forEach((element) => {
    if (element.tagName === "DOI") {
      const lnElement = element.closest("LN, LN0");
      const typeId = lnElement.getAttribute("lnType") ?? "";
      typeElement = doc.querySelector(`:root > DataTypeTemplates > LNodeType[id="${typeId}"]`);
      if (typeElement) {
        const name = element.getAttribute("name");
        const doElement = typeElement.querySelector(`:scope > DO[name="${name}"]`);
        if (doElement) {
          templateChain.push(doElement);
          const typeId2 = getTypeAttribute(doElement) ?? "";
          typeElement = doc.querySelector(`:root > DataTypeTemplates > DOType[id="${typeId2}"]`);
        } else {
          typeElement = null;
        }
      }
    } else if (["SDI", "DAI"].includes(element.tagName)) {
      if (typeElement) {
        const name = element.getAttribute("name");
        const daElement = typeElement?.querySelector(`:scope > DA[name="${name}"], :scope > BDA[name="${name}"]`);
        if (daElement) {
          templateChain.push(daElement);
          if (daElement.getAttribute("bType") === "Struct") {
            const typeId = getTypeAttribute(element) ?? "";
            typeElement = doc.querySelector(`:root > DataTypeTemplates > DAType[id="${typeId}"]`);
          } else {
            typeElement = null;
          }
        } else {
          typeElement = null;
        }
      }
    }
  });
  return templateChain;
}
export function getDaElementByDaiElement(daiElement) {
  const instanceChain = buildInstanceChain(daiElement);
  const templateChain = buildTemplateChainFromInstanceElements(daiElement.ownerDocument, instanceChain);
  if (templateChain.length > 0) {
    const daElement = templateChain.pop();
    if (["DA", "BDA"].includes(daElement.tagName)) {
      return daElement;
    }
  }
  return void 0;
}
function isEnumType(daElement) {
  return daElement?.getAttribute("bType") === "Enum";
}
export function isEnumDataAttribute(daiElement) {
  const daElement = getDaElementByDaiElement(daiElement);
  return isEnumType(daElement);
}
export function getEnumVal(daiElement, ord) {
  const daElement = getDaElementByDaiElement(daiElement);
  if (isEnumType(daElement)) {
    const enumType = getTypeAttribute(daElement);
    const enumVal = daiElement.ownerDocument.querySelector(`:root > DataTypeTemplates > EnumType[id="${enumType}"] > EnumVal[ord="${ord}"]`);
    if (enumVal) {
      return enumVal.textContent;
    }
  }
  return null;
}
export function getEnumOrds(daiElement) {
  const ords = [];
  const daElement = getDaElementByDaiElement(daiElement);
  if (isEnumType(daElement)) {
    const enumType = getTypeAttribute(daElement);
    const enumVals = daiElement.ownerDocument.querySelectorAll(`:root > DataTypeTemplates > EnumType[id="${enumType}"] > EnumVal`);
    Array.from(enumVals).filter((valElement) => valElement.getAttribute("ord")).map((valElement) => ords.push(valElement.getAttribute("ord")));
  }
  return ords;
}
export function findElementInOriginalLNStructure(lnElement, clonedElement) {
  if (["LN0", "LN"].includes(clonedElement.tagName)) {
    return lnElement;
  }
  const clonedElements = [];
  let currentElement = clonedElement;
  while (currentElement && !["LN0", "LN"].includes(currentElement.tagName)) {
    clonedElements.unshift(currentElement);
    currentElement = currentElement?.parentElement;
  }
  let parentElement = lnElement;
  while (parentElement != null && clonedElements.length > 0) {
    const childElement = clonedElements.shift();
    if (childElement) {
      const name = getNameAttribute(childElement);
      parentElement = parentElement.querySelector(`:scope > DOI[name="${name}"], :scope > SDI[name="${name}"], :scope > DAI[name="${name}"]`);
    } else {
      parentElement = null;
    }
  }
  return parentElement;
}
export function createNetworkTextField(pType, maybeValue) {
  return html`<wizard-textfield
    required
    label="${pType}"
    pattern="${ifDefined(typePattern[pType])}"
    .maybeValue=${maybeValue ?? null}
    maxLength="${ifDefined(typeMaxLength[pType])}"
    helper="${get(typeDescriptiveNameKeys[pType])}"
  ></wizard-textfield>`;
}
export var View;
(function(View2) {
  View2[View2["VALUES"] = 0] = "VALUES";
  View2[View2["NETWORK"] = 1] = "NETWORK";
})(View || (View = {}));
export const VIEW_EVENT_NAME = "view-change-104-plugin";
export function newViewEvent(view) {
  return new CustomEvent(VIEW_EVENT_NAME, {
    bubbles: true,
    composed: true,
    detail: {view}
  });
}
