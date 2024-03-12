import { __decorate } from "tslib";
import { Editing } from '../src/Editing.js';
import { LitElement, html } from 'lit';
import { query, customElement } from 'lit/decorators.js';
import '../src/addons/Wizards.js';
let MockWizardEditor = class MockWizardEditor extends Editing(LitElement) {
    render() {
        return html `<oscd-wizards .host=${this}><slot></slot></oscd-wizards>`;
    }
    get wizardUI() {
        return this.wizards.wizardUI;
    }
    get dialog() {
        return this.wizardUI.dialog;
    }
    get dialogs() {
        return this.wizardUI.dialogs;
    }
    get workflow() {
        return this.wizards.workflow;
    }
};
__decorate([
    query('oscd-wizards')
], MockWizardEditor.prototype, "wizards", void 0);
MockWizardEditor = __decorate([
    customElement('mock-wizard-editor')
], MockWizardEditor);
export { MockWizardEditor };
//# sourceMappingURL=mock-wizard-editor.js.map