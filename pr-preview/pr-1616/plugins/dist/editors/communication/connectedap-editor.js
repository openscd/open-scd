import { __decorate } from "../../../../_snowpack/pkg/tslib.js";
import { LitElement, customElement, html, property, } from '../../../../_snowpack/pkg/lit-element.js';
import '../../../../_snowpack/pkg/@material/mwc-fab.js';
import '../../../../openscd/src/action-icon.js';
import { newWizardEvent } from '../../../../openscd/src/foundation.js';
import { newActionEvent } from '../../../../_snowpack/link/packages/core/dist/foundation/deprecated/editor.js';
import { editConnectedApWizard } from '../../wizards/connectedap.js';
/** [[`Communication`]] subeditor for a `ConnectedAP` element. */
let ConnectedAPEditor = class ConnectedAPEditor extends LitElement {
    /** ConnectedAP attribute apName */
    get apName() {
        return this.element.getAttribute('apName') ?? 'UNDEFINED';
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
                    reference: this.element.nextSibling,
                },
            }));
    }
    render() {
        return html `
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
    property({ attribute: false })
], ConnectedAPEditor.prototype, "element", void 0);
__decorate([
    property({ type: String })
], ConnectedAPEditor.prototype, "apName", null);
ConnectedAPEditor = __decorate([
    customElement('connectedap-editor')
], ConnectedAPEditor);
export { ConnectedAPEditor };
//# sourceMappingURL=connectedap-editor.js.map