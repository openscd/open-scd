import { __decorate } from "tslib";
import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Editing } from '../../src/Editing.js';
let MockEditor = class MockEditor extends Editing(LitElement) {
};
MockEditor = __decorate([
    customElement('mock-editor')
], MockEditor);
export { MockEditor };
//# sourceMappingURL=mock-editor.js.map