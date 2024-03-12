import { __decorate } from "tslib";
import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Editing } from '../src/Editing.js';
import { Historing } from '../src/Historing.js';
let MockSetterLogger = class MockSetterLogger extends Editing(Historing(LitElement)) {
};
MockSetterLogger = __decorate([
    customElement('mock-setter-logger')
], MockSetterLogger);
export { MockSetterLogger };
//# sourceMappingURL=mock-setter-logger.js.map