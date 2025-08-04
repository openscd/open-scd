import { __decorate } from "../../../_snowpack/pkg/tslib.js";
import { html, state, query, customElement, LitElement, property, } from '../../../_snowpack/pkg/lit-element.js';
import '../wizard-dialog.js';
/** `LitElement` mixin that adds a `workflow` property which [[`Wizard`]]s are
 * queued onto on incoming [[`WizardEvent`]]s, first come first displayed. */
let OscdWizards = class OscdWizards extends LitElement {
    constructor() {
        super(...arguments);
        /** FIFO queue of [[`Wizard`]]s to display. */
        this.workflow = [];
    }
    onWizard(we) {
        const wizard = we.detail.wizard;
        if (wizard === null)
            this.workflow.shift();
        else if (we.detail.subwizard)
            this.workflow.unshift(wizard);
        else
            this.workflow.push(wizard);
        this.requestUpdate('workflow');
        this.updateComplete.then(() => this.wizardUI.updateComplete.then(() => this.wizardUI.dialog?.updateComplete.then(() => this.wizardUI.dialog?.focus())));
    }
    connectedCallback() {
        super.connectedCallback();
        this.host.addEventListener('wizard', this.onWizard.bind(this));
        this.host.addEventListener('editor-action', () => this.wizardUI.requestUpdate());
    }
    render() {
        return html `<slot></slot>
      <wizard-dialog .wizard=${this.workflow[0]?.() ?? []}></wizard-dialog>`;
    }
};
__decorate([
    property({
        type: Object,
    })
], OscdWizards.prototype, "host", void 0);
__decorate([
    state()
], OscdWizards.prototype, "workflow", void 0);
__decorate([
    query('wizard-dialog')
], OscdWizards.prototype, "wizardUI", void 0);
OscdWizards = __decorate([
    customElement('oscd-wizards')
], OscdWizards);
export { OscdWizards };
//# sourceMappingURL=Wizards.js.map