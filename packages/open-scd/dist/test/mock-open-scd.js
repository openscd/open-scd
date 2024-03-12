import { __decorate } from "tslib";
import { html } from 'lit';
import { customElement, query, queryAssignedNodes } from 'lit/decorators.js';
import { OpenSCD } from '../src/open-scd.js';
let MockOpenSCD = class MockOpenSCD extends OpenSCD {
    renderHosting() {
        return html `<slot></slot>`;
    }
    getPlugin(name) {
        return this._slots.find(s => s.tagName.toLowerCase() === name.toLowerCase());
    }
    getActivePlugin() {
        return this._slots[0];
    }
    get wizardUI() {
        return this.wizards.wizardUI;
    }
    get workflow() {
        return this.wizards.workflow;
    }
};
__decorate([
    queryAssignedNodes()
], MockOpenSCD.prototype, "_slots", void 0);
__decorate([
    query('oscd-wizards')
], MockOpenSCD.prototype, "wizards", void 0);
MockOpenSCD = __decorate([
    customElement('mock-open-scd')
], MockOpenSCD);
export { MockOpenSCD };
//# sourceMappingURL=mock-open-scd.js.map