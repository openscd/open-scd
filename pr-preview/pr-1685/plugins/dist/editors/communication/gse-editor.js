import { __decorate } from "../../../../_snowpack/pkg/tslib.js";
import { LitElement, html, customElement, property, state, css, } from '../../../../_snowpack/pkg/lit-element.js';
import '../../../../_snowpack/pkg/@material/mwc-icon.js';
import '../../../../openscd/src/action-icon.js';
import { newWizardEvent } from '../../../../openscd/src/foundation.js';
import { newActionEvent } from '../../../../_snowpack/link/packages/core/dist/foundation/deprecated/editor.js';
import { sizableGooseIcon } from '../../../../openscd/src/icons/icons.js';
import { editGseWizard } from '../../wizards/gse.js';
import { canMoveCommunicationElementToConnectedAP, getAllConnectedAPsOfSameIED } from './foundation.js';
let GseEditor = class GseEditor extends LitElement {
    get label() {
        return (this.element.getAttribute('ldInst') +
            '/' +
            this.element.getAttribute('cbName'));
    }
    openEditWizard() {
        this.dispatchEvent(newWizardEvent(editGseWizard(this.element)));
    }
    openGseMoveDialog() {
        this.dispatchEvent(new CustomEvent('request-gse-move', {
            detail: { element: this.element },
            bubbles: true,
            composed: true,
        }));
    }
    remove() {
        if (this.element)
            this.dispatchEvent(newActionEvent({
                old: {
                    parent: this.element.parentElement,
                    element: this.element,
                    reference: this.element.nextSibling,
                },
            }));
    }
    render() {
        const validTargetConnectedAPs = getAllConnectedAPsOfSameIED(this.element, this.doc).filter(cap => canMoveCommunicationElementToConnectedAP(this.element, cap, this.doc));
        const hasValidConnectedAPMoveTarget = validTargetConnectedAPs.length > 0;
        return html `<action-icon label="${this.label}" .icon="${sizableGooseIcon}"
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
        class="gse-move-button"
        ?disabled="${!hasValidConnectedAPMoveTarget}"
        @click="${() => this.openGseMoveDialog()}"
      >
      </mwc-fab>
    </action-icon> `;
    }
};
GseEditor.styles = css `
    :host(:focus-within) .gse-move-button[disabled] {
      color: var(--mdc-theme-text-disabled-on-light, #9e9e9e);
      pointer-events: none;
      cursor: not-allowed;
      opacity: 0.5;
    }
  `;
__decorate([
    property({ attribute: false })
], GseEditor.prototype, "doc", void 0);
__decorate([
    property({ attribute: false })
], GseEditor.prototype, "element", void 0);
__decorate([
    state()
], GseEditor.prototype, "label", null);
GseEditor = __decorate([
    customElement('gse-editor')
], GseEditor);
export { GseEditor };
//# sourceMappingURL=gse-editor.js.map