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
  html,
  customElement,
  property,
  state,
  css
} from "../../../../_snowpack/pkg/lit-element.js";
import "../../../../_snowpack/pkg/@material/mwc-icon.js";
import "../../../../openscd/src/action-icon.js";
import {sizableSmvIcon} from "../../../../openscd/src/icons/icons.js";
import {newWizardEvent} from "../../../../openscd/src/foundation.js";
import {newActionEvent} from "../../../../_snowpack/link/packages/core/dist/foundation/deprecated/editor.js";
import {editSMvWizard} from "../../wizards/smv.js";
import {canMoveCommunicationElementToConnectedAP, getAllConnectedAPsOfSameIED} from "./foundation.js";
export let SmvEditor = class extends LitElement {
  get label() {
    return this.element.getAttribute("ldInst") + "/" + this.element.getAttribute("cbName");
  }
  openEditWizard() {
    this.dispatchEvent(newWizardEvent(editSMvWizard(this.element)));
  }
  openSmvMoveDialog() {
    this.dispatchEvent(new CustomEvent("request-smv-move", {
      detail: {element: this.element},
      bubbles: true,
      composed: true
    }));
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
    const validTargetConnectedAPs = getAllConnectedAPsOfSameIED(this.element, this.doc).filter((cap) => canMoveCommunicationElementToConnectedAP(this.element, cap, this.doc));
    const hasValidConnectedAPMoveTarget = validTargetConnectedAPs.length > 0;
    return html`<action-icon label="${this.label}" .icon="${sizableSmvIcon}"
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
        @click="${() => this.remove()}"
      ></mwc-fab>
      <mwc-fab
        slot="action"
        mini
        icon="forward"
        class="smv-move-button"
        ?disabled=${!hasValidConnectedAPMoveTarget}
        @click="${() => this.openSmvMoveDialog()}"
      >
      </mwc-fab>
    </action-icon>`;
  }
};
SmvEditor.styles = css`
    :host(:focus-within) .smv-move-button[disabled] {
      color: var(--mdc-theme-text-disabled-on-light, #9e9e9e);
      pointer-events: none;
      cursor: not-allowed;
      opacity: 0.5;
    }
  `;
__decorate([
  property({attribute: false})
], SmvEditor.prototype, "doc", 2);
__decorate([
  property({attribute: false})
], SmvEditor.prototype, "element", 2);
__decorate([
  state()
], SmvEditor.prototype, "label", 1);
SmvEditor = __decorate([
  customElement("smv-editor")
], SmvEditor);
