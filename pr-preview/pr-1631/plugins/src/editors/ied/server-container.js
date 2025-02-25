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
  state
} from "../../../../_snowpack/pkg/lit-element.js";
import {nothing} from "../../../../_snowpack/pkg/lit-html.js";
import "../../../../openscd/src/action-pane.js";
import "./ldevice-container.js";
import {serverIcon} from "../../../../openscd/src/icons/ied-icons.js";
import {getDescriptionAttribute} from "../../../../openscd/src/foundation.js";
import {Container} from "./foundation.js";
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
  render() {
    return html`<action-pane .label="${this.header()}">
      <mwc-icon slot="icon">${serverIcon}</mwc-icon>
      ${this.lDeviceElements.map((server) => html`<ldevice-container
            .editCount=${this.editCount}
            .doc=${this.doc}
            .element=${server}
            .nsdoc=${this.nsdoc}
            .selectedLNClasses=${this.selectedLNClasses}
            .ancestors=${[...this.ancestors, this.element]}
          ></ldevice-container>`)}
    </action-pane>`;
  }
};
__decorate([
  property()
], ServerContainer.prototype, "selectedLNClasses", 2);
__decorate([
  state()
], ServerContainer.prototype, "lDeviceElements", 1);
ServerContainer = __decorate([
  customElement("server-container")
], ServerContainer);
