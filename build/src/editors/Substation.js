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
import {LitElement, html, property, css} from "../../_snowpack/pkg/lit-element.js";
import {get} from "../../_snowpack/pkg/lit-translate.js";
import "../../_snowpack/pkg/@material/mwc-fab.js";
import "./substation/zeroline-pane.js";
import {newWizardEvent} from "../foundation.js";
import {wizards} from "../wizards/wizard-library.js";
export default class SubstationPlugin extends LitElement {
  openCreateSubstationWizard() {
    const wizard = wizards["Substation"].create(this.doc.documentElement);
    if (wizard)
      this.dispatchEvent(newWizardEvent(wizard));
  }
  render() {
    return html` <zeroline-pane .doc=${this.doc}></zeroline-pane>
      ${!this.doc?.querySelector(":root > Substation") ? html`<h1>
            <mwc-fab
              extended
              icon="add"
              label="${get("substation.wizard.title.add")}"
              @click=${() => this.openCreateSubstationWizard()}
            ></mwc-fab>
          </h1>` : html``}`;
  }
}
SubstationPlugin.styles = css`
    mwc-fab {
      position: fixed;
      bottom: 32px;
      right: 32px;
    }

    :host {
      width: 100vw;
    }
  `;
__decorate([
  property()
], SubstationPlugin.prototype, "doc", 2);
