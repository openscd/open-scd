import { __decorate } from "tslib";
import { html } from 'lit';
import { query } from 'lit/decorators.js';
import { OpenSCD } from '../src/open-scd.js';
export class MockOpenSCD extends OpenSCD {
    renderHosting() {
        return html `<oscd-plugin></oscd-plugin>`;
    }
    get wizardUI() {
        return this.wizards.wizardUI;
    }
    get workflow() {
        return this.wizards.workflow;
    }
}
__decorate([
    query('oscd-plugin')
], MockOpenSCD.prototype, "plugin", void 0);
__decorate([
    query('oscd-wizards')
], MockOpenSCD.prototype, "wizards", void 0);
//# sourceMappingURL=mock.open-scd.js.map