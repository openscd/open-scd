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
import {css, html, LitElement, query} from "../../../_snowpack/pkg/lit-element.js";
import {newOpenDocEvent} from "../../../_snowpack/link/packages/core/dist/foundation/deprecated/open-event.js";
import {newLogEvent} from "../../../_snowpack/link/packages/core/dist/foundation/deprecated/history.js";
export default class OpenProjectPlugin extends LitElement {
  async openDoc(event) {
    const file = event.target?.files?.item(0) ?? false;
    if (!file)
      return;
    const text = await file.text();
    const docName = file.name;
    const doc = new DOMParser().parseFromString(text, "application/xml");
    this.dispatchEvent(newLogEvent({kind: "reset"}));
    this.dispatchEvent(newOpenDocEvent(doc, docName));
    this.pluginFileUI.onchange = null;
    this.closeMenu();
  }
  async closeMenu() {
    this.dispatchEvent(new CustomEvent("close-drawer", {
      bubbles: true,
      composed: true
    }));
  }
  async run() {
    this.pluginFileUI.click();
  }
  render() {
    return html`<input @click=${(event) => event.target.value = ""} @change=${this.openDoc} id="open-plugin-input" accept=".sed,.scd,.ssd,.isd,.iid,.cid,.icd" type="file"></input>`;
  }
}
OpenProjectPlugin.styles = css`
    input {
      width: 0;
      height: 0;
      opacity: 0;
    }
  `;
__decorate([
  query("#open-plugin-input")
], OpenProjectPlugin.prototype, "pluginFileUI", 2);
