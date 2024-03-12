import { __decorate } from "tslib";
import { html } from 'lit';
import { state, query } from 'lit/decorators.js';
import './wizard-dialog.js';
export function Wizarding(Base) {
    class WizardingElement extends Base {
        constructor(...args) {
            super(...args);
            /** FIFO queue of [[`Wizard`]]s to display. */
            this.workflow = [];
            this.addEventListener('wizard', this.onWizard);
            this.addEventListener('editor-action', () => this.wizardUI.requestUpdate());
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
        render() {
            return html `${super.render()}
        <wizard-dialog .wizard=${this.workflow[0]?.() ?? []}></wizard-dialog>`;
        }
    }
    __decorate([
        state()
    ], WizardingElement.prototype, "workflow", void 0);
    __decorate([
        query('wizard-dialog')
    ], WizardingElement.prototype, "wizardUI", void 0);
    return WizardingElement;
}
//# sourceMappingURL=Wizarding.js.map