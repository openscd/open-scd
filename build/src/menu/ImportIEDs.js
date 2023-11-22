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
import {
  css,
  html,
  LitElement,
  property,
  query,
  state
} from "../../_snowpack/pkg/lit-element.js";
import {get, translate} from "../../_snowpack/pkg/lit-translate.js";
import "../../_snowpack/pkg/@material/mwc-list/mwc-check-list-item.js";
import "../../_snowpack/pkg/@material/dialog.js";
import "../../_snowpack/pkg/@material/mwc-button.js";
import "../filtered-list.js";
import {
  createElement,
  identity,
  isPublic,
  newActionEvent,
  newLogEvent,
  newPendingStateEvent,
  selector
} from "../foundation.js";
function uniqueTemplateIedName(doc, ied) {
  const [manufacturer, type] = ["manufacturer", "type"].map((attr) => ied.getAttribute(attr)?.replace(/[^A-Za-z0-9_]/g, ""));
  const nameCore = manufacturer || type ? `${manufacturer ?? ""}${type ? "_" + type : ""}` : "TEMPLATE_IED";
  const siblingNames = Array.from(doc.querySelectorAll("IED")).filter(isPublic).map((child) => child.getAttribute("name") ?? child.tagName);
  if (!siblingNames.length)
    return nameCore + "_001";
  let newName = "";
  for (let i = 0; i < siblingNames.length + 1; i++) {
    const newDigit = (i + 1).toString().padStart(3, "0");
    newName = nameCore + "_" + newDigit;
    if (!siblingNames.includes(newName))
      return newName;
  }
  return newName;
}
function updateNamespaces(destElement, sourceElement) {
  Array.prototype.slice.call(sourceElement.attributes).filter((attr) => attr.name.startsWith("xmlns:")).filter((attr) => !destElement.hasAttribute(attr.name)).forEach((attr) => {
    destElement.setAttributeNS("http://www.w3.org/2000/xmlns/", attr.name, attr.value);
  });
}
function getSubNetwork(elements, element) {
  const existElement = elements.find((item) => item.getAttribute("name") === element.getAttribute("name"));
  return existElement ? existElement : element.cloneNode(false);
}
function addCommunicationElements(ied, doc) {
  const actions = [];
  const oldCommunicationElement = doc.querySelector(":root > Communication");
  const communication = oldCommunicationElement ? oldCommunicationElement : createElement(doc, "Communication", {});
  if (!oldCommunicationElement)
    actions.push({
      new: {
        parent: doc.querySelector(":root"),
        element: communication
      }
    });
  const connectedAPs = Array.from(ied.ownerDocument.querySelectorAll(`:root > Communication > SubNetwork > ConnectedAP[iedName="${ied.getAttribute("name")}"]`));
  const createdSubNetworks = [];
  connectedAPs.forEach((connectedAP) => {
    const newSubNetwork = connectedAP.parentElement;
    const oldSubNetworkMatch = communication.querySelector(`:root > Communication > SubNetwork[name="${newSubNetwork.getAttribute("name")}"]`);
    const subNetwork = oldSubNetworkMatch ? oldSubNetworkMatch : getSubNetwork(createdSubNetworks, newSubNetwork);
    const element = connectedAP.cloneNode(true);
    if (!oldSubNetworkMatch && !createdSubNetworks.includes(subNetwork)) {
      actions.push({
        new: {
          parent: communication,
          element: subNetwork
        }
      });
      createdSubNetworks.push(subNetwork);
    }
    actions.push({
      new: {
        parent: subNetwork,
        element
      }
    });
  });
  return actions;
}
function hasConnectionToIed(type, ied) {
  const data = type.parentElement;
  const id = type.getAttribute("id");
  if (!data || !id)
    return false;
  if (type.tagName === "EnumType")
    return Array.from(data.querySelectorAll(`DOType > DA[type="${id}"],DAType > BDA[type="${id}"]`)).some((typeChild) => hasConnectionToIed(typeChild.parentElement, ied));
  if (type.tagName === "DAType")
    return Array.from(data.querySelectorAll(`DOType > DA[type="${id}"],DAType > BDA[type="${id}"]`)).some((typeChild) => hasConnectionToIed(typeChild.parentElement, ied));
  if (type.tagName === "DOType")
    return Array.from(data.querySelectorAll(`LNodeType > DO[type="${id}"], DOType > SDO[type="${id}"]`)).some((typeChild) => hasConnectionToIed(typeChild.parentElement, ied));
  return Array.from(ied.getElementsByTagName("LN0")).concat(Array.from(ied.getElementsByTagName("LN"))).some((anyln) => anyln.getAttribute("lnType") === id);
}
function addEnumType(ied, enumType, parent) {
  if (!hasConnectionToIed(enumType, ied))
    return;
  const existEnumType = parent.querySelector(`EnumType[id="${enumType.getAttribute("id")}"]`);
  if (existEnumType && enumType.isEqualNode(existEnumType))
    return;
  if (existEnumType) {
    const data = enumType.parentElement;
    const idOld = enumType.getAttribute("id");
    const idNew = ied.getAttribute("name") + idOld;
    enumType.setAttribute("id", idNew);
    data.querySelectorAll(`DOType > DA[type="${idOld}"],DAType > BDA[type="${idOld}"]`).forEach((type) => type.setAttribute("type", idNew));
  }
  return {
    new: {
      parent,
      element: enumType
    }
  };
}
function addDAType(ied, daType, parent) {
  if (!hasConnectionToIed(daType, ied))
    return;
  const existDAType = parent.querySelector(`DAType[id="${daType.getAttribute("id")}"]`);
  if (existDAType && daType.isEqualNode(existDAType))
    return;
  if (existDAType) {
    const data = daType.parentElement;
    const idOld = daType.getAttribute("id");
    const idNew = ied.getAttribute("name") + idOld;
    daType.setAttribute("id", idNew);
    data.querySelectorAll(`DOType > DA[type="${idOld}"],DAType > BDA[type="${idOld}"]`).forEach((type) => type.setAttribute("type", idNew));
  }
  return {
    new: {
      parent,
      element: daType
    }
  };
}
function addDOType(ied, doType, parent) {
  if (!hasConnectionToIed(doType, ied))
    return;
  const existDOType = parent.querySelector(`DOType[id="${doType.getAttribute("id")}"]`);
  if (existDOType && doType.isEqualNode(existDOType))
    return;
  if (existDOType) {
    const data = doType.parentElement;
    const idOld = doType.getAttribute("id");
    const idNew = ied.getAttribute("name") + idOld;
    doType.setAttribute("id", idNew);
    data.querySelectorAll(`LNodeType > DO[type="${idOld}"], DOType > SDO[type="${idOld}"]`).forEach((type) => type.setAttribute("type", idNew));
  }
  return {
    new: {
      parent,
      element: doType
    }
  };
}
function addLNodeType(ied, lNodeType, parent) {
  if (!hasConnectionToIed(lNodeType, ied))
    return;
  const existLNodeType = parent.querySelector(`LNodeType[id="${lNodeType.getAttribute("id")}"]`);
  if (existLNodeType && lNodeType.isEqualNode(existLNodeType))
    return;
  if (existLNodeType) {
    const idOld = lNodeType.getAttribute("id");
    const idNew = ied.getAttribute("name").concat(idOld);
    lNodeType.setAttribute("id", idNew);
    Array.from(ied.querySelectorAll(`LN0[lnType="${idOld}"],LN[lnType="${idOld}"]`)).filter(isPublic).forEach((ln) => ln.setAttribute("lnType", idNew));
  }
  return {
    new: {
      parent,
      element: lNodeType
    }
  };
}
function addDataTypeTemplates(ied, doc) {
  const actions = [];
  const dataTypeTemplates = doc.querySelector(":root > DataTypeTemplates") ? doc.querySelector(":root > DataTypeTemplates") : createElement(doc, "DataTypeTemplates", {});
  if (!dataTypeTemplates.parentElement) {
    actions.push({
      new: {
        parent: doc.querySelector("SCL"),
        element: dataTypeTemplates
      }
    });
  }
  ied.ownerDocument.querySelectorAll(":root > DataTypeTemplates > LNodeType").forEach((lNodeType) => actions.push(addLNodeType(ied, lNodeType, dataTypeTemplates)));
  ied.ownerDocument.querySelectorAll(":root > DataTypeTemplates > DOType").forEach((doType) => actions.push(addDOType(ied, doType, dataTypeTemplates)));
  ied.ownerDocument.querySelectorAll(":root > DataTypeTemplates > DAType").forEach((daType) => actions.push(addDAType(ied, daType, dataTypeTemplates)));
  ied.ownerDocument.querySelectorAll(":root > DataTypeTemplates > EnumType").forEach((enumType) => actions.push(addEnumType(ied, enumType, dataTypeTemplates)));
  return actions.filter((item) => item !== void 0);
}
function isIedNameUnique(ied, doc) {
  const existingIedNames = Array.from(doc.querySelectorAll(":root > IED")).map((ied2) => ied2.getAttribute("name"));
  const importedIedName = ied.getAttribute("name");
  if (existingIedNames.includes(importedIedName))
    return false;
  return true;
}
function resetSelection(dialog) {
  dialog.querySelector("filtered-list").selected.forEach((item) => item.selected = false);
}
export default class ImportingIedPlugin extends LitElement {
  async run() {
    this.pluginFileUI.click();
  }
  async docUpdate() {
    await this.getRootNode().host.updateComplete;
  }
  importIED(ied) {
    if (ied.getAttribute("name") === "TEMPLATE") {
      const newIedName = uniqueTemplateIedName(this.doc, ied);
      ied.setAttribute("name", newIedName);
      Array.from(ied.ownerDocument.querySelectorAll(':root > Communication > SubNetwork > ConnectedAP[iedName="TEMPLATE"]')).forEach((connectedAp) => connectedAp.setAttribute("iedName", newIedName));
    }
    if (!isIedNameUnique(ied, this.doc)) {
      this.dispatchEvent(newLogEvent({
        kind: "error",
        title: get("import.log.nouniqueied", {
          name: ied.getAttribute("name")
        })
      }));
      return;
    }
    updateNamespaces(this.doc.documentElement, ied.ownerDocument.documentElement);
    const dataTypeTemplateActions = addDataTypeTemplates(ied, this.doc);
    const communicationActions = addCommunicationElements(ied, this.doc);
    const actions = communicationActions.concat(dataTypeTemplateActions);
    actions.push({
      new: {
        parent: this.doc.querySelector(":root"),
        element: ied
      }
    });
    this.dispatchEvent(newActionEvent({
      title: get("editing.import", {name: ied.getAttribute("name")}),
      actions
    }));
  }
  async importIEDs() {
    const selectedItems = this.dialog.querySelector("filtered-list").selected;
    const ieds = selectedItems.map((item) => {
      return this.importDoc.querySelector(selector("IED", item.value));
    }).filter((ied) => ied);
    resetSelection(this.dialog);
    this.dialog.close();
    for (const ied of ieds) {
      this.importIED(ied);
      await this.docUpdate();
    }
  }
  prepareImport() {
    if (!this.importDoc) {
      this.dispatchEvent(newLogEvent({
        kind: "error",
        title: get("import.log.loaderror")
      }));
      return;
    }
    if (this.importDoc.querySelector("parsererror")) {
      this.dispatchEvent(newLogEvent({
        kind: "error",
        title: get("import.log.parsererror")
      }));
      return;
    }
    const ieds = Array.from(this.importDoc.querySelectorAll(":root > IED"));
    if (ieds.length === 0) {
      this.dispatchEvent(newLogEvent({
        kind: "error",
        title: get("import.log.missingied")
      }));
      return;
    }
    if (ieds.length === 1) {
      this.importIED(ieds[0]);
      return;
    }
    this.dialog.show();
  }
  async onLoadFiles(event) {
    const files = Array.from(event.target?.files ?? []);
    const promises = files.map(async (file) => {
      this.importDoc = new DOMParser().parseFromString(await file.text(), "application/xml");
      return this.prepareImport();
    });
    const mergedPromise = new Promise((resolve, reject) => Promise.allSettled(promises).then(() => resolve(), () => reject()));
    this.dispatchEvent(newPendingStateEvent(mergedPromise));
  }
  renderInput() {
    return html`<input multiple @change=${(event) => {
      this.onLoadFiles(event);
      event.target.value = "";
    }} id="importied-plugin-input" accept=".sed,.scd,.ssd,.iid,.cid,.icd" type="file"></input>`;
  }
  renderIedSelection() {
    return html`<mwc-dialog>
      <filtered-list hasSlot multi>
        ${Array.from(this.importDoc?.querySelectorAll(":root > IED") ?? []).map((ied) => html`<mwc-check-list-item value="${identity(ied)}"
              >${ied.getAttribute("name")}</mwc-check-list-item
            >`)}
        <mwc-icon-button slot="meta" icon="edit"></mwc-icon-button>
      </filtered-list>
      <mwc-button
        dialogAction="close"
        label="${translate("close")}"
        slot="secondaryAction"
        style="--mdc-theme-primary: var(--mdc-theme-error)"
      ></mwc-button>
      <mwc-button
        label="IEDs"
        slot="primaryAction"
        icon="add"
        @click=${this.importIEDs}
      ></mwc-button>
    </mwc-dialog>`;
  }
  render() {
    return html`${this.renderIedSelection()}${this.renderInput()}`;
  }
}
ImportingIedPlugin.styles = css`
    input {
      width: 0;
      height: 0;
      opacity: 0;
    }
  `;
__decorate([
  property({attribute: false})
], ImportingIedPlugin.prototype, "doc", 2);
__decorate([
  state()
], ImportingIedPlugin.prototype, "importDoc", 2);
__decorate([
  query("#importied-plugin-input")
], ImportingIedPlugin.prototype, "pluginFileUI", 2);
__decorate([
  query("mwc-dialog")
], ImportingIedPlugin.prototype, "dialog", 2);
