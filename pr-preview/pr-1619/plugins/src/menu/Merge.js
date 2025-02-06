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
import {newWizardEvent} from "../../../openscd/src/foundation.js";
import {mergeWizard} from "../../../openscd/src/wizards.js";
export default class MergePlugin extends LitElement {
  mergeDoc(event) {
    const file = event.target?.files?.item(0) ?? false;
    if (file)
      file.text().then((text) => {
        const doc = new DOMParser().parseFromString(text, "application/xml");
        this.dispatchEvent(newWizardEvent(mergeWizard(this.doc.documentElement, doc.documentElement)));
      });
    this.pluginFileUI.onchange = null;
  }
  async run() {
    this.pluginFileUI.click();
  }
  render() {
    return html`<input @click=${(event) => event.target.value = ""} @change=${this.mergeDoc} id="merge-plugin-input" accept=".sed,.scd,.ssd,.isd,.iid,.cid,.icd" type="file"></input>`;
  }
}
MergePlugin.styles = css`
    input {
      width: 0;
      height: 0;
      opacity: 0;
    }
  `;
__decorate([
  query("#merge-plugin-input")
], MergePlugin.prototype, "pluginFileUI", 2);
