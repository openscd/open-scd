import { __decorate } from "tslib";
import { LitElement, customElement, html, property, } from 'lit-element';
import '@material/mwc-fab';
import '../../action-icon.js';
import { newWizardEvent, newActionEvent } from '../../foundation.js';
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