var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorate = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
import {LitElement, property} from "../../../../_snowpack/pkg/lit-element.js";
import {
  getInstanceAttribute,
  getNameAttribute
} from "../../../../openscd/src/foundation.js";
import {createElement} from "../../../../_snowpack/link/packages/xml/dist/index.js";
import {insertSelectedLNodeType} from "../../../../_snowpack/pkg/@openenergytools/scl-lib/dist/tDataTypeTemplates/insertSelectedLNodeType.js";
export class Container extends LitElement {
  constructor() {
    super();
    this.editCount = -1;
    this.ancestors = [];
    this.addEventListener("focus", (event) => {
      event.stopPropagation();
      const pathOfAncestorNames = this.ancestors.map((ancestor) => getTitleForElementPath(ancestor));
      pathOfAncestorNames.push(getTitleForElementPath(this.element));
      this.dispatchEvent(newFullElementPathEvent(pathOfAncestorNames));
    });
    this.addEventListener("blur", () => {
      this.dispatchEvent(newFullElementPathEvent(this.ancestors.map((ancestor) => getTitleForElementPath(ancestor))));
    });
  }
}
__decorate([
  property()
], Container.prototype, "doc", 2);
__decorate([
  property({type: Number})
], Container.prototype, "editCount", 2);
__decorate([
  property({attribute: false})
], Container.prototype, "element", 2);
__decorate([
  property()
], Container.prototype, "nsdoc", 2);
__decorate([
  property()
], Container.prototype, "ancestors", 2);
export function findElement(ancestors, tagName) {
  return ancestors.find((element) => element.tagName === tagName) ?? null;
}
export function findLogicalNodeElement(ancestors) {
  let element = findElement(ancestors, "LN0");
  if (!element) {
    element = findElement(ancestors, "LN");
  }
  return element;
}
export function findLLN0LNodeType(doc) {
  return doc.querySelector('DataTypeTemplates > LNodeType[lnClass="LLN0"]');
}
export function createLLN0LNodeType(doc, id) {
  const selection = {
    Beh: {
      stVal: {
        on: {},
        blocked: {},
        test: {},
        "test/blocked": {},
        off: {}
      },
      q: {},
      t: {}
    }
  };
  const logicalnode = {
    class: "LLN0",
    id
  };
  return insertSelectedLNodeType(doc, selection, logicalnode);
}
export function createIEDStructure(doc, iedName, lnTypeId, manufacturer = "OpenSCD") {
  const ied = createElement(doc, "IED", {
    name: iedName,
    manufacturer
  });
  const accessPoint = createElement(doc, "AccessPoint", {name: "AP1"});
  ied.appendChild(accessPoint);
  const server = createElement(doc, "Server", {});
  accessPoint.appendChild(server);
  const authentication = createElement(doc, "Authentication", {});
  server.appendChild(authentication);
  const lDevice = createElement(doc, "LDevice", {inst: "LD1"});
  server.appendChild(lDevice);
  const ln0 = createElement(doc, "LN0", {
    lnClass: "LLN0",
    inst: "",
    lnType: lnTypeId
  });
  lDevice.appendChild(ln0);
  return ied;
}
export function findDOTypeElement(element) {
  if (element && element.hasAttribute("type")) {
    const type = element.getAttribute("type");
    return element.closest("SCL").querySelector(`:root > DataTypeTemplates > DOType[id="${type}"]`);
  }
  return null;
}
export function getInstanceDAElement(parentInstance, da) {
  if (parentInstance) {
    const daName = getNameAttribute(da);
    const bType = da.getAttribute("bType");
    if (bType == "Struct") {
      return parentInstance.querySelector(`:scope > SDI[name="${daName}"]`);
    }
    return parentInstance.querySelector(`:scope > DAI[name="${daName}"]`);
  }
  return null;
}
export function getTitleForElementPath(element) {
  switch (element.tagName) {
    case "LN":
    case "LN0": {
      return element.getAttribute("lnClass");
    }
    case "LDevice": {
      return getNameAttribute(element) ?? getInstanceAttribute(element);
    }
    case "Server": {
      return "Server";
    }
    default: {
      return element.getAttribute("name");
    }
  }
}
export function getValueElements(parent) {
  return Array.from(parent.querySelectorAll("Val"));
}
export function newFullElementPathEvent(elementNames, eventInitDict) {
  return new CustomEvent("full-element-path", {
    bubbles: true,
    composed: true,
    ...eventInitDict,
    detail: {elementNames, ...eventInitDict?.detail}
  });
}
