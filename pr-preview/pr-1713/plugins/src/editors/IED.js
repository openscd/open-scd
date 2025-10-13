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
  query,
  property,
  state,
  LitElement
} from "../../../_snowpack/pkg/lit-element.js";
import {translate} from "../../../_snowpack/pkg/lit-translate.js";
import {nothing} from "../../../_snowpack/pkg/lit-html.js";
import "../../../_snowpack/pkg/@material/mwc-list/mwc-check-list-item.js";
import "../../../_snowpack/pkg/@material/mwc-list/mwc-radio-list-item.js";
import "../../../_snowpack/pkg/@material/mwc-button.js";
import "../../../openscd/src/oscd-filter-button.js";
import "./ied/ied-container.js";
import "./ied/element-path.js";
import "./ied/create-ied-dialog.js";
import {
  findLLN0LNodeType,
  createLLN0LNodeType,
  createIEDStructure
} from "./ied/foundation.js";
import {
  compareNames,
  getDescriptionAttribute,
  getNameAttribute
} from "../../../openscd/src/foundation.js";
import {getIcon} from "../../../openscd/src/icons/icons.js";
import {newEditEventV2} from "../../../_snowpack/link/packages/core/dist/foundation.js";
export default class IedPlugin extends LitElement {
  constructor() {
    super(...arguments);
    this.editCount = -1;
    this.oscdApi = null;
    this.selectedIEDs = [];
    this.selectedLNClasses = [];
    this.lNClassListOpenedOnce = false;
  }
  get iedList() {
    return this.doc ? Array.from(this.doc.querySelectorAll(":root > IED")).sort((a, b) => compareNames(a, b)) : [];
  }
  get lnClassList() {
    const currentIed = this.selectedIed;
    const uniqueLNClassList = [];
    if (currentIed) {
      return Array.from(currentIed.querySelectorAll("LN0, LN")).filter((element) => element.hasAttribute("lnClass")).filter((element) => {
        const lnClass = element.getAttribute("lnClass") ?? "";
        if (uniqueLNClassList.includes(lnClass)) {
          return false;
        }
        uniqueLNClassList.push(lnClass);
        return true;
      }).sort((a, b) => {
        const aLnClass = a.getAttribute("lnClass") ?? "";
        const bLnClass = b.getAttribute("lnClass") ?? "";
        return aLnClass.localeCompare(bLnClass);
      }).map((element) => {
        const lnClass = element.getAttribute("lnClass");
        const label = this.nsdoc.getDataDescription(element).label;
        return [lnClass, label];
      });
    }
    return [];
  }
  get selectedIed() {
    if (this.selectedIEDs.length >= 1) {
      const iedList = this.iedList;
      return iedList.find((element) => {
        const iedName = getNameAttribute(element);
        return this.selectedIEDs[0] === iedName;
      });
    }
    return void 0;
  }
  connectedCallback() {
    super.connectedCallback();
    this.loadPluginState();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.storePluginState();
  }
  createVirtualIED(iedName) {
    const inserts = [];
    const existingLLN0 = findLLN0LNodeType(this.doc);
    const lnTypeId = existingLLN0?.getAttribute("id") || "PlaceholderLLN0";
    const ied = createIEDStructure(this.doc, iedName, lnTypeId);
    const dataTypeTemplates = this.doc.querySelector("DataTypeTemplates");
    inserts.push({
      parent: this.doc.querySelector("SCL"),
      node: ied,
      reference: dataTypeTemplates
    });
    if (!existingLLN0) {
      const lnodeTypeInserts = createLLN0LNodeType(this.doc, lnTypeId);
      inserts.push(...lnodeTypeInserts);
    }
    this.dispatchEvent(newEditEventV2(inserts));
    this.selectedIEDs = [iedName];
    this.selectedLNClasses = [];
    this.requestUpdate("selectedIed");
  }
  updated(_changedProperties) {
    super.updated(_changedProperties);
    const isDocumentUpdated = _changedProperties.has("doc") || _changedProperties.has("editCount") || _changedProperties.has("nsdoc");
    if (isDocumentUpdated) {
      const iedExists = this.doc?.querySelector(`IED[name="${this.selectedIEDs[0]}"]`);
      if (iedExists)
        return;
      this.selectedIEDs = [];
      this.selectedLNClasses = [];
      this.lNClassListOpenedOnce = false;
      const iedList = this.iedList;
      if (iedList.length > 0) {
        const iedName = getNameAttribute(iedList[0]);
        if (iedName) {
          this.selectedIEDs = [iedName];
        }
      }
    }
  }
  loadPluginState() {
    const stateApi = this.oscdApi?.pluginState;
    const selectedIEDs = stateApi?.getState()?.selectedIEDs ?? null;
    if (selectedIEDs) {
      this.onSelectionChange(selectedIEDs);
    }
  }
  storePluginState() {
    const stateApi = this.oscdApi?.pluginState;
    if (stateApi) {
      stateApi.setState({selectedIEDs: this.selectedIEDs});
    }
  }
  calcSelectedLNClasses() {
    const somethingSelected = this.selectedLNClasses.length > 0;
    const lnClasses = this.lnClassList.map((lnClassInfo) => lnClassInfo[0]);
    let selectedLNClasses = lnClasses;
    if (somethingSelected) {
      selectedLNClasses = lnClasses.filter((lnClass) => this.selectedLNClasses.includes(lnClass));
    }
    return selectedLNClasses;
  }
  onSelectionChange(selectedIeds) {
    const equalArrays = (first, second) => {
      return first.length === second.length && first.every((val, index) => val === second[index]);
    };
    const selectionChanged = !equalArrays(this.selectedIEDs, selectedIeds);
    if (!selectionChanged) {
      return;
    }
    this.lNClassListOpenedOnce = false;
    this.selectedIEDs = selectedIeds;
    this.selectedLNClasses = [];
    this.requestUpdate("selectedIed");
  }
  renderIEDList() {
    const iedList = this.iedList;
    if (iedList.length === 0) {
      return html`<h1>
        <span style="color: var(--base1)"
          >${translate("iededitor.missing")}</span
        >
      </h1>`;
    }
    return html`<section>
      <div class="header">
        <h1>${translate("filters")}:</h1>
        <oscd-filter-button
          id="iedFilter"
          icon="developer_board"
          .header=${translate("iededitor.iedSelector")}
          @selected-items-changed="${(e) => this.onSelectionChange(e.detail.selectedItems)}"
        >
          ${iedList.map((ied) => {
      const name = getNameAttribute(ied);
      const descr = getDescriptionAttribute(ied);
      const type = ied.getAttribute("type");
      const manufacturer = ied.getAttribute("manufacturer");
      return html` <mwc-radio-list-item
              value="${name}"
              ?twoline="${type && manufacturer}"
              ?selected="${this.selectedIEDs.includes(name ?? "")}"
            >
              ${name} ${descr ? html` (${descr})` : html``}
              <span slot="secondary">
                ${type} ${type && manufacturer ? html`&mdash;` : nothing}
                ${manufacturer}
              </span>
            </mwc-radio-list-item>`;
    })}
        </oscd-filter-button>

        <oscd-filter-button
          id="lnClassesFilter"
          multi="true"
          .header="${translate("iededitor.lnFilter")}"
          @selected-items-changed="${(e) => {
      this.selectedLNClasses = e.detail.selectedItems;
      this.requestUpdate("selectedIed");
    }}"
        >
          <span slot="icon">${getIcon("lNIcon")}</span>
          ${this.lnClassList.map((lnClassInfo) => {
      const value = lnClassInfo[0];
      const label = lnClassInfo[1];
      return html`<mwc-check-list-item
              value="${value}"
              ?selected="${this.selectedLNClasses.includes(value)}"
            >
              ${label}
            </mwc-check-list-item>`;
    })}
        </oscd-filter-button>

        <element-path class="elementPath"></element-path>
      </div>

      <ied-container
        .editCount=${this.editCount}
        .doc=${this.doc}
        .element=${this.selectedIed}
        .selectedLNClasses=${this.calcSelectedLNClasses()}
        .nsdoc=${this.nsdoc}
      ></ied-container>
    </section>`;
  }
  render() {
    return html`<div>
      <mwc-button
        class="add-ied-button"
        icon="add"
        @click=${() => this.createIedDialog.show()}
      >
        ${translate("iededitor.createIed")}
      </mwc-button>
      ${this.renderIEDList()}
      <create-ied-dialog
        .doc=${this.doc}
        .onConfirm=${(iedName) => this.createVirtualIED(iedName)}
      ></create-ied-dialog>
    </div>`;
  }
}
IedPlugin.styles = css`
    :host {
      width: 100vw;
      position: relative;
    }

    section {
      padding: 8px 12px 16px;
    }

    .header {
      display: flex;
    }

    h1 {
      color: var(--mdc-theme-on-surface);
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin: 0px;
      line-height: 48px;
      padding-left: 0.3em;
    }

    .elementPath {
      margin-left: auto;
      padding-right: 12px;
    }

    .add-ied-button {
      display: block;
      float: right;
      margin: 8px 12px 0 0;
    }
  `;
__decorate([
  property()
], IedPlugin.prototype, "doc", 2);
__decorate([
  property({type: Number})
], IedPlugin.prototype, "editCount", 2);
__decorate([
  property()
], IedPlugin.prototype, "nsdoc", 2);
__decorate([
  property()
], IedPlugin.prototype, "oscdApi", 2);
__decorate([
  query("create-ied-dialog")
], IedPlugin.prototype, "createIedDialog", 2);
__decorate([
  state()
], IedPlugin.prototype, "selectedIEDs", 2);
__decorate([
  state()
], IedPlugin.prototype, "selectedLNClasses", 2);
__decorate([
  state()
], IedPlugin.prototype, "iedList", 1);
__decorate([
  state()
], IedPlugin.prototype, "lnClassList", 1);
__decorate([
  state()
], IedPlugin.prototype, "selectedIed", 1);
