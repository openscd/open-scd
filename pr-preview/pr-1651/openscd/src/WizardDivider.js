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
  LitElement,
  property
} from "../../_snowpack/pkg/lit-element.js";
export let WizardDividerElement = class extends LitElement {
  render() {
    return html` ${this.renderHeader()} ${this.renderSeparator()}`;
  }
  renderHeader() {
    if (!this.header) {
      return html``;
    }
    return html`<h4 class="header">${this.header}</h4>`;
  }
  renderSeparator() {
    return html`<div role="separator"></div>`;
  }
};
WizardDividerElement.styles = css`
    div {
      height: 0px;
      margin: 10px 0px 10px 0px;
      border-top: none;
      border-right: none;
      border-left: none;
      border-image: initial;
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    }
  `;
__decorate([
  property({
    type: String
  })
], WizardDividerElement.prototype, "header", 2);
WizardDividerElement = __decorate([
  customElement("wizard-divider")
], WizardDividerElement);
