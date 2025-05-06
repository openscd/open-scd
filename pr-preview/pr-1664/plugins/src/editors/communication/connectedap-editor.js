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
  LitElement,
  customElement,
  html,
  property
} from "../../../../_snowpack/pkg/lit-element.js";
import "../../../../_snowpack/pkg/@material/mwc-fab.js";
import "../../../../openscd/src/action-icon.js";
import {newWizardEvent} from "../../../../openscd/src/foundation.js";
import {newActionEvent} from "../../../../_snowpack/link/packages/core/dist/foundation/deprecated/editor.js";
import {editConnectedApWizard} from "../../wizards/connectedap.js";
export let ConnectedAPEditor = class extends LitElement {
  get apName() {
    return this.element.getAttribute("apName") ?? "UNDEFINED";
  }
  openEditWizard() {
    this.dispatchEvent(newWizardEvent(editConnectedApWizard(this.element)));
  }
  remove() {
    if (this.element)
      this.dispatchEvent(newActionEvent({
        old: {
          parent: this.element.parentElement,
          element: this.element,
          reference: this.element.nextSibling
        }
      }));
  }
  render() {
    return html`
      <action-icon label="${this.apName}" icon="settings_input_hdmi"
        ><mwc-fab
          slot="action"
          mini
          icon="edit"
          @click="${() => this.openEditWizard()}"
        ></mwc-fab>
        <mwc-fab
          slot="action"
          mini
          icon="delete"
          @click="${() => this.remove()}}"
        ></mwc-fab
      ></action-icon>
    `;
  }
};
__decorate([
  property({attribute: false})
], ConnectedAPEditor.prototype, "element", 2);
__decorate([
  property({type: String})
], ConnectedAPEditor.prototype, "apName", 1);
ConnectedAPEditor = __decorate([
  customElement("connectedap-editor")
], ConnectedAPEditor);
