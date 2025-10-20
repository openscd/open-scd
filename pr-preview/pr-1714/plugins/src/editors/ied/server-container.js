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
  customElement,
  html,
  property,
  query,
  state
} from "../../../../_snowpack/pkg/lit-element.js";
import {nothing} from "../../../../_snowpack/pkg/lit-html.js";
import {translate} from "../../../../_snowpack/pkg/lit-translate.js";
import {serverIcon} from "../../../../openscd/src/icons/ied-icons.js";
import {getDescriptionAttribute} from "../../../../openscd/src/foundation.js";
import {createElement} from "../../../../_snowpack/link/packages/xml/dist/index.js";
import {newEditEventV2} from "../../../../_snowpack/link/packages/core/dist/foundation.js";
import {
  Container,
  findLLN0LNodeType,
  createLLN0LNodeType
} from "./foundation.js";
import "../../../../openscd/src/action-pane.js";
import "./ldevice-container.js";
import "./add-ldevice-dialog.js";
export let ServerContainer = class extends Container {
  constructor() {
    super(...arguments);
    this.selectedLNClasses = [];
  }
  header() {
    const desc = getDescriptionAttribute(this.element);
    return html`Server${desc ? html` &mdash; ${desc}` : nothing}`;
  }
  updated(_changedProperties) {
    super.updated(_changedProperties);
    if (_changedProperties.has("selectedLNClasses")) {
      this.requestUpdate("lDeviceElements");
    }
  }
  get lDeviceElements() {
    return Array.from(this.element.querySelectorAll(":scope > LDevice")).filter((element) => {
      return Array.from(element.querySelectorAll(":scope > LN,LN0")).filter((element2) => {
        const lnClass = element2.getAttribute("lnClass") ?? "";
        return this.selectedLNClasses.includes(lnClass);
      }).length > 0;
    });
  }
  handleAddLDevice(data) {
    const inserts = [];
    const lln0Type = findLLN0LNodeType(this.doc);
    const lnTypeId = lln0Type?.getAttribute("id") || "PlaceholderLLN0";
    if (!lln0Type) {
      const lnodeTypeInserts = createLLN0LNodeType(this.doc, lnTypeId);
      inserts.push(...lnodeTypeInserts);
    }
    const lDevice = createElement(this.doc, "LDevice", {
      inst: data.inst
    });
    const ln0 = createElement(this.doc, "LN0", {
      lnClass: "LLN0",
      lnType: lnTypeId
    });
    lDevice.appendChild(ln0);
    inserts.push({parent: this.element, node: lDevice, reference: null});
    this.dispatchEvent(newEditEventV2(inserts));
  }
  render() {
    return html`<action-pane .label="${this.header()}">
      <mwc-icon slot="icon">${serverIcon}</mwc-icon>
      <abbr
        slot="action"
        title=${translate("iededitor.addLDeviceDialog.title")}
      >
        <mwc-icon-button
          icon="playlist_add"
          @click=${() => this.addAccessPointDialog.show()}
        ></mwc-icon-button>
      </abbr>
      ${this.lDeviceElements.map((server) => html`<ldevice-container
            .editCount=${this.editCount}
            .doc=${this.doc}
            .element=${server}
            .nsdoc=${this.nsdoc}
            .selectedLNClasses=${this.selectedLNClasses}
            .ancestors=${[...this.ancestors, this.element]}
          ></ldevice-container>`)}
      <add-ldevice-dialog
        .server=${this.element}
        .onConfirm=${(data) => this.handleAddLDevice(data)}
      ></add-ldevice-dialog>
    </action-pane>`;
  }
};
__decorate([
  property()
], ServerContainer.prototype, "selectedLNClasses", 2);
__decorate([
  query("add-ldevice-dialog")
], ServerContainer.prototype, "addAccessPointDialog", 2);
__decorate([
  state()
], ServerContainer.prototype, "lDeviceElements", 1);
ServerContainer = __decorate([
  customElement("server-container")
], ServerContainer);
