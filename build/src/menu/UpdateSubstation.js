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
import {css, html, LitElement, query} from "../../_snowpack/pkg/lit-element.js";
import {get} from "../../_snowpack/pkg/lit-translate.js";
import {
  crossProduct,
  identity,
  newWizardEvent,
  selector,
  tags
} from "../foundation.js";
import {mergeWizard} from "../wizards.js";
export function isValidReference(doc, identity2) {
  if (typeof identity2 !== "string")
    return false;
  const [iedName, ldInst, prefix, lnClass, lnInst] = identity2.split(/[ /]/);
  if (!iedName || !lnClass)
    return false;
  if (ldInst === "(Client)") {
    const [
      iedNameSelectors2,
      prefixSelectors2,
      lnClassSelectors2,
      lnInstSelectors2
    ] = [
      [`IED[name="${iedName}"]`],
      prefix ? [`[prefix="${prefix}"]`] : [":not([prefix])", '[prefix=""]'],
      [`LN[lnClass="${lnClass}"]`],
      lnInst ? [`[inst="${lnInst}"]`] : [":not([inst])", '[inst=""]']
    ];
    return doc.querySelector(crossProduct(iedNameSelectors2, [">AccessPoint>"], lnClassSelectors2, prefixSelectors2, lnInstSelectors2).map((strings) => strings.join("")).join(",")) !== null;
  }
  const [
    iedNameSelectors,
    ldInstSelectors,
    prefixSelectors,
    lnClassSelectors,
    lnInstSelectors
  ] = [
    [`IED[name="${iedName}"]`],
    [`LDevice[inst="${ldInst}"]`],
    prefix ? [`[prefix="${prefix}"]`] : [":not([prefix])", '[prefix=""]'],
    lnClass === "LLN0" ? [`LN0`] : [`LN[lnClass="${lnClass}"]`],
    lnInst ? [`[inst="${lnInst}"]`] : [":not([inst])", '[inst=""]']
  ];
  return doc.querySelector(crossProduct(iedNameSelectors, [" "], ldInstSelectors, [">"], lnClassSelectors, prefixSelectors, lnInstSelectors).map((strings) => strings.join("")).join(",")) !== null;
}
export default class UpdateSubstationPlugin extends LitElement {
  updateSubstation(event) {
    const file = event.target?.files?.item(0) ?? false;
    if (file)
      file.text().then((text) => {
        const doc = new DOMParser().parseFromString(text, "application/xml");
        this.dispatchEvent(newWizardEvent(mergeWizard(this.doc.documentElement, doc.documentElement, {
          title: get("updatesubstation.title"),
          selected: (diff) => diff.theirs instanceof Element ? diff.theirs.tagName === "LNode" ? this.doc.querySelector(selector("LNode", identity(diff.theirs))) === null && isValidReference(doc, identity(diff.theirs)) : diff.theirs.tagName === "Substation" || !tags["SCL"].children.includes(diff.theirs.tagName) : diff.theirs !== null,
          disabled: (diff) => diff.theirs instanceof Element && diff.theirs.tagName === "LNode" && (this.doc.querySelector(selector("LNode", identity(diff.theirs))) !== null || !isValidReference(doc, identity(diff.theirs))),
          auto: () => true
        })));
      });
    this.pluginFileUI.onchange = null;
  }
  async run() {
    this.pluginFileUI.click();
  }
  render() {
    return html`<input @click=${(event) => event.target.value = ""} @change=${(e) => this.updateSubstation(e)} id="update-substation-plugin-input" accept=".sed,.scd,.ssd,.iid,.cid" type="file"></input>`;
  }
}
UpdateSubstationPlugin.styles = css`
    input {
      width: 0;
      height: 0;
      opacity: 0;
    }
  `;
__decorate([
  query("#update-substation-plugin-input")
], UpdateSubstationPlugin.prototype, "pluginFileUI", 2);
