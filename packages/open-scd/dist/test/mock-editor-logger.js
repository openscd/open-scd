import { __decorate } from "tslib";
import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Editing } from '../src/Editing.js';
import { Historing } from '../src/Historing.js';
let MockEditorLogger = class MockEditorLogger extends Editing(Historing(LitElement)) {
};
MockEditorLogger = __decorate([
    customElement('mock-editor-logger')
], MockEditorLogger);
export { MockEditorLogger };
//# sourceMappingURL=mock-editor-logger.js.map