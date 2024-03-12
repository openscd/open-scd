import { __decorate } from "tslib";
import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Historing } from '../../src/Historing.js';
let MockLogger = class MockLogger extends Historing(LitElement) {
};
MockLogger = __decorate([
    customElement('mock-logger')
], MockLogger);
export { MockLogger };
//# sourceMappingURL=mock-logger.js.map