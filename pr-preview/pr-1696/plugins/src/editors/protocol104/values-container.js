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
  customElement,
  html,
  property
} from "../../../../_snowpack/pkg/lit-element.js";
import {get} from "../../../../_snowpack/pkg/lit-translate.js";
import {
  compareNames,
  newWizardEvent
} from "../../../../openscd/src/foundation.js";
import "./ied-container.js";
import {selectDoWizard} from "./wizards/selectDo.js";
import {PROTOCOL_104_PRIVATE} from "./foundation/private.js";
import {Base104Container} from "./base-container.js";
export let Values104Container = class extends Base104Container {
  get iedElements() {
    return Array.from(this.doc.querySelectorAll("IED")).filter((ied) => ied.querySelectorAll(`DAI > Private[type="${PROTOCOL_104_PRIVATE}"] > Address`).length > 0).sort((a, b) => compareNames(a, b));
  }
  openCreateAddressWizard() {
    this.dispatchEvent(newWizardEvent(selectDoWizard(this.doc)));
  }
  renderAddButton() {
    return html`<h1>
      <mwc-fab
        extended
        icon="add"
        label="${get("protocol104.wizard.title.addAddress")}"
        @click=${() => this.openCreateAddressWizard()}
      >
      </mwc-fab>
    </h1>`;
  }
  render() {
    const ieds = this.iedElements;
    if (ieds.length > 0) {
      return html`
        ${ieds.map((iedElement) => {
        return html`<ied-104-container
            .editCount=${this.editCount}
            .doc="${this.doc}"
            .element="${iedElement}"
          ></ied-104-container>`;
      })}
        ${this.renderAddButton()}
      `;
    }
    return html` <h1>
        <span style="color: var(--base1)"
          >${get("protocol104.values.missing")}</span
        >
      </h1>
      ${this.renderAddButton()}`;
  }
};
Values104Container.styles = css`
    mwc-fab {
      position: fixed;
      bottom: 32px;
      right: 32px;
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
  `;
__decorate([
  property()
], Values104Container.prototype, "iedElements", 1);
Values104Container = __decorate([
  customElement("values-104-container")
], Values104Container);
