import { __decorate } from "../../../../_snowpack/pkg/tslib.js";
import { LitElement, html, customElement, property, state, } from '../../../../_snowpack/pkg/lit-element.js';
import '../../../../_snowpack/pkg/@material/mwc-icon.js';
import '../../../../openscd/src/action-icon.js';
import { sizableSmvIcon } from '../../../../openscd/src/icons/icons.js';
import { newWizardEvent } from '../../../../openscd/src/foundation.js';
import { newActionEvent } from '../../../../_snowpack/link/packages/core/dist/foundation/deprecated/editor.js';
import { editSMvWizard } from '../../wizards/smv.js';
let SmvEditor = class SmvEditor extends LitElement {
    get label() {
        return (this.element.getAttribute('ldInst') +
            '/' +
            this.element.getAttribute('cbName'));
    }
    openEditWizard() {
        this.dispatchEvent(newWizardEvent(editSMvWizard(this.element)));
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
        return html `<action-icon label="${this.label}" .icon="${sizableSmvIcon}"
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
    ></action-icon>`;
    }
};
__decorate([
    property({ attribute: false })
], SmvEditor.prototype, "doc", void 0);
__decorate([
    property({ attribute: false })
], SmvEditor.prototype, "element", void 0);
__decorate([
    state()
], SmvEditor.prototype, "label", null);
SmvEditor = __decorate([
    customElement('smv-editor')
], SmvEditor);
export { SmvEditor };
//# sourceMappingURL=smv-editor.js.map