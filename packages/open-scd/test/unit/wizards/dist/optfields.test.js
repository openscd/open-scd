"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var testing_1 = require("@open-wc/testing");
var sinon_1 = require("sinon");
require("../../../src/addons/Wizards.js");
var foundation_js_1 = require("../../../src/foundation.js");
var optfields_js_1 = require("../../../src/wizards/optfields.js");
describe('Wizards for SCL OptFields element', function () {
    var element;
    var optFields;
    var inputs;
    var primaryAction;
    var actionEvent;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<oscd-wizards .host=", "></oscd-wizards>"], ["<oscd-wizards .host=", "></oscd-wizards>"])), document))];
                case 1:
                    element = _a.sent();
                    optFields = (new DOMParser().parseFromString("<OptFields dataSet=\"true\" bufOvfl=\"true\"></OptFields>", 'application/xml').documentElement);
                    actionEvent = sinon_1.spy();
                    window.addEventListener('editor-action', actionEvent);
                    return [2 /*return*/];
            }
        });
    }); });
    describe('define an edit wizard that', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var wizard;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        wizard = optfields_js_1.editOptFieldsWizard(optFields);
                        element.workflow.push(function () { return wizard; });
                        return [4 /*yield*/, element.requestUpdate()];
                    case 1:
                        _b.sent();
                        inputs = Array.from(element.wizardUI.inputs);
                        return [4 /*yield*/, element.requestUpdate()];
                    case 2:
                        _b.sent();
                        primaryAction = ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-button[slot="primaryAction"]'));
                        return [2 /*return*/];
                }
            });
        }); });
        it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).dom.to.equalSnapshot()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }).timeout(5000);
        it('does not update a OptFields element with no changed attributes', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        primaryAction.click();
                        return [4 /*yield*/, element.requestUpdate()];
                    case 1:
                        _a.sent();
                        testing_1.expect(actionEvent.notCalled).to.be["true"];
                        return [2 /*return*/];
                }
            });
        }); });
        it('update the OptFields element with changed dataSet attribute', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input, action, updateAction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        input = inputs[2];
                        input.maybeValue = 'false';
                        return [4 /*yield*/, input.requestUpdate()];
                    case 1:
                        _a.sent();
                        primaryAction.click();
                        return [4 /*yield*/, element.requestUpdate()];
                    case 2:
                        _a.sent();
                        testing_1.expect(actionEvent).to.be.calledOnce;
                        action = actionEvent.args[0][0].detail.action;
                        testing_1.expect(action).to.satisfy(foundation_js_1.isReplace);
                        updateAction = action;
                        testing_1.expect(updateAction.old.element).to.have.attribute('dataSet', 'true');
                        testing_1.expect(updateAction["new"].element).to.have.attribute('dataSet', 'false');
                        return [2 /*return*/];
                }
            });
        }); });
        it('removes the OptFields attribute dataSet with nulled select', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input, action, updateAction;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        input = inputs[2];
                        (_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click();
                        return [4 /*yield*/, input.requestUpdate()];
                    case 1:
                        _b.sent();
                        primaryAction.click();
                        return [4 /*yield*/, element.requestUpdate()];
                    case 2:
                        _b.sent();
                        testing_1.expect(actionEvent).to.be.calledOnce;
                        action = actionEvent.args[0][0].detail.action;
                        testing_1.expect(action).to.satisfy(foundation_js_1.isReplace);
                        updateAction = action;
                        testing_1.expect(updateAction.old.element).to.have.attribute('dataSet', 'true');
                        testing_1.expect(updateAction["new"].element).to.not.have.attribute('dataSet');
                        return [2 /*return*/];
                }
            });
        }); });
        it('updates the OptFields element with changed seqNum attribute', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input, action, updateAction;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        input = inputs[0];
                        (_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click();
                        input.maybeValue = 'true';
                        return [4 /*yield*/, input.requestUpdate()];
                    case 1:
                        _b.sent();
                        primaryAction.click();
                        return [4 /*yield*/, element.requestUpdate()];
                    case 2:
                        _b.sent();
                        testing_1.expect(actionEvent).to.be.calledOnce;
                        action = actionEvent.args[0][0].detail.action;
                        testing_1.expect(action).to.satisfy(foundation_js_1.isReplace);
                        updateAction = action;
                        testing_1.expect(updateAction.old.element).to.not.have.attribute('seqNum');
                        testing_1.expect(updateAction["new"].element).to.have.attribute('seqNum', 'true');
                        return [2 /*return*/];
                }
            });
        }); });
        it('updates the OptFields element with changed timeStamp attribute', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input, action, updateAction;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        input = inputs[1];
                        (_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click();
                        input.maybeValue = 'true';
                        return [4 /*yield*/, input.requestUpdate()];
                    case 1:
                        _b.sent();
                        primaryAction.click();
                        return [4 /*yield*/, element.requestUpdate()];
                    case 2:
                        _b.sent();
                        testing_1.expect(actionEvent).to.be.calledOnce;
                        action = actionEvent.args[0][0].detail.action;
                        testing_1.expect(action).to.satisfy(foundation_js_1.isReplace);
                        updateAction = action;
                        testing_1.expect(updateAction.old.element).to.not.have.attribute('timeStamp');
                        testing_1.expect(updateAction["new"].element).to.have.attribute('timeStamp', 'true');
                        return [2 /*return*/];
                }
            });
        }); });
        it('updates the OptFields element with changed reasonCode attribute', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input, action, updateAction;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        input = inputs[3];
                        (_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click();
                        input.maybeValue = 'true';
                        return [4 /*yield*/, input.requestUpdate()];
                    case 1:
                        _b.sent();
                        primaryAction.click();
                        return [4 /*yield*/, element.requestUpdate()];
                    case 2:
                        _b.sent();
                        testing_1.expect(actionEvent).to.be.calledOnce;
                        action = actionEvent.args[0][0].detail.action;
                        testing_1.expect(action).to.satisfy(foundation_js_1.isReplace);
                        updateAction = action;
                        testing_1.expect(updateAction.old.element).to.not.have.attribute('reasonCode');
                        testing_1.expect(updateAction["new"].element).to.have.attribute('reasonCode', 'true');
                        return [2 /*return*/];
                }
            });
        }); });
        it('updates the OptFields element with changed dataRef attribute', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input, action, updateAction;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        input = inputs[4];
                        (_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click();
                        input.maybeValue = 'true';
                        return [4 /*yield*/, input.requestUpdate()];
                    case 1:
                        _b.sent();
                        primaryAction.click();
                        return [4 /*yield*/, element.requestUpdate()];
                    case 2:
                        _b.sent();
                        testing_1.expect(actionEvent).to.be.calledOnce;
                        action = actionEvent.args[0][0].detail.action;
                        testing_1.expect(action).to.satisfy(foundation_js_1.isReplace);
                        updateAction = action;
                        testing_1.expect(updateAction.old.element).to.not.have.attribute('dataRef');
                        testing_1.expect(updateAction["new"].element).to.have.attribute('dataRef', 'true');
                        return [2 /*return*/];
                }
            });
        }); });
        it('updates the OptFields element with changed entryID attribute', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input, action, updateAction;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        input = inputs[5];
                        (_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click();
                        input.maybeValue = 'true';
                        return [4 /*yield*/, input.requestUpdate()];
                    case 1:
                        _b.sent();
                        primaryAction.click();
                        return [4 /*yield*/, element.requestUpdate()];
                    case 2:
                        _b.sent();
                        testing_1.expect(actionEvent).to.be.calledOnce;
                        action = actionEvent.args[0][0].detail.action;
                        testing_1.expect(action).to.satisfy(foundation_js_1.isReplace);
                        updateAction = action;
                        testing_1.expect(updateAction.old.element).to.not.have.attribute('entryID');
                        testing_1.expect(updateAction["new"].element).to.have.attribute('entryID', 'true');
                        return [2 /*return*/];
                }
            });
        }); });
        it('updates the OptFields element with changed configRef attribute', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input, action, updateAction;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        input = inputs[6];
                        (_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click();
                        input.maybeValue = 'true';
                        return [4 /*yield*/, input.requestUpdate()];
                    case 1:
                        _b.sent();
                        primaryAction.click();
                        return [4 /*yield*/, element.requestUpdate()];
                    case 2:
                        _b.sent();
                        testing_1.expect(actionEvent).to.be.calledOnce;
                        action = actionEvent.args[0][0].detail.action;
                        testing_1.expect(action).to.satisfy(foundation_js_1.isReplace);
                        updateAction = action;
                        testing_1.expect(updateAction.old.element).to.not.have.attribute('configRef');
                        testing_1.expect(updateAction["new"].element).to.have.attribute('configRef', 'true');
                        return [2 /*return*/];
                }
            });
        }); });
        it('updates the OptFields element with changed bufOvfl attribute', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input, action, updateAction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        input = inputs[7];
                        input.maybeValue = 'false';
                        return [4 /*yield*/, input.requestUpdate()];
                    case 1:
                        _a.sent();
                        primaryAction.click();
                        return [4 /*yield*/, element.requestUpdate()];
                    case 2:
                        _a.sent();
                        testing_1.expect(actionEvent).to.be.calledOnce;
                        action = actionEvent.args[0][0].detail.action;
                        testing_1.expect(action).to.satisfy(foundation_js_1.isReplace);
                        updateAction = action;
                        testing_1.expect(updateAction.old.element).to.have.attribute('bufOvfl', 'true');
                        testing_1.expect(updateAction["new"].element).to.have.attribute('bufOvfl', 'false');
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
var templateObject_1;
