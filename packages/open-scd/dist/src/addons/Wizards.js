import { __decorate } from "tslib";
import { html, LitElement } from 'lit';
import { state, query, customElement, property } from 'lit/decorators.js';
import '../wizard-dialog.js';
/** `LitElement` mixin that adds a `workflow` property which [[`Wizard`]]s are
 * queued onto on incoming [[`WizardEvent`]]s, first come first displayed. */
let Wizards = class Wizards extends LitElement {
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
], Wizards.prototype, "host", void 0);
__decorate([
    state()
], Wizards.prototype, "workflow", void 0);
__decorate([
    query('wizard-dialog')
], Wizards.prototype, "wizardUI", void 0);
Wizards = __decorate([
    customElement('oscd-wizards')
], Wizards);
export { Wizards };
//# sourceMappingURL=Wizards.js.map