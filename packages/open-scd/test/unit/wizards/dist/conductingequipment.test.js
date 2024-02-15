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
var test_support_js_1 = require("./test-support.js");
var conductingequipment_js_1 = require("../../../src/wizards/conductingequipment.js");
describe('Wizards for SCL element ConductingEquipment', function () {
    var doc;
    var element;
    var inputs;
    var primaryAction;
    var actionEvent;
    describe('defines a create wizard that', function () {
        var parent;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, test_support_js_1.fetchDoc('/test/testfiles/valid2007B.scd')];
                    case 1:
                        doc = _a.sent();
                        actionEvent = sinon_1.spy();
                        window.addEventListener('editor-action', actionEvent);
                        return [2 /*return*/];
                }
            });
        }); });
        describe('when adding an earth switch', function () {
            describe('with existing ground cNode in the same VoltageLevel', function () {
                beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var wizard;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                parent = doc.querySelector('Bay');
                                return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<oscd-wizards .host=", "></mock-wizards>"], ["<oscd-wizards .host=", "></mock-wizards>"])), document))];
                            case 1:
                                element = _b.sent();
                                wizard = conductingequipment_js_1.createConductingEquipmentWizard(parent);
                                element.workflow.push(function () { return wizard; });
                                return [4 /*yield*/, element.requestUpdate()];
                            case 2:
                                _b.sent();
                                inputs = Array.from(element.wizardUI.inputs);
                                primaryAction = ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-button[slot="primaryAction"]'));
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('does not create a new ConnectivityNode', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                inputs[0].value = 'ERS';
                                inputs[1].value = 'QC9';
                                return [4 /*yield*/, element.requestUpdate()];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, primaryAction.click()];
                            case 2:
                                _a.sent();
                                testing_1.expect(actionEvent).to.be.calledOnce;
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('does set the Terminals attributes correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var action, terminal;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                inputs[0].value = 'ERS';
                                inputs[1].value = 'QC9';
                                return [4 /*yield*/, element.requestUpdate()];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, primaryAction.click()];
                            case 2:
                                _a.sent();
                                action = actionEvent.args[0][0].detail.action;
                                terminal = action["new"].element.querySelector('Terminal');
                                testing_1.expect(terminal).to.have.attribute('substationName', 'AA1');
                                testing_1.expect(terminal).to.have.attribute('voltageLevelName', 'E1');
                                testing_1.expect(terminal).to.have.attribute('bayName', 'COUPLING_BAY');
                                testing_1.expect(terminal).to.have.attribute('connectivityNode', 'AA1/E1/COUPLING_BAY/grounded');
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            describe('with missing ground cNode in the same VoltageLevel', function () {
                beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var wizard;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                parent = doc.querySelector('VoltageLevel[name="J1"] > Bay');
                                return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<oscd-wizards .host=", "></oscd-wizards>"], ["<oscd-wizards .host=", "></oscd-wizards>"])), document))];
                            case 1:
                                element = _b.sent();
                                wizard = conductingequipment_js_1.createConductingEquipmentWizard(parent);
                                element.workflow.push(function () { return wizard; });
                                return [4 /*yield*/, element.requestUpdate()];
                            case 2:
                                _b.sent();
                                inputs = Array.from(element.wizardUI.inputs);
                                primaryAction = ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-button[slot="primaryAction"]'));
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('does create a new ConnectivityNode', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var action;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                inputs[0].value = 'ERS';
                                inputs[1].value = 'QC9';
                                return [4 /*yield*/, element.requestUpdate()];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, primaryAction.click()];
                            case 2:
                                _a.sent();
                                testing_1.expect(actionEvent).to.be.calledTwice;
                                testing_1.expect(actionEvent.args[0][0].detail.action).to.satisfy(foundation_js_1.isCreate);
                                action = actionEvent.args[1][0].detail.action;
                                testing_1.expect(action["new"].element.tagName).to.equal('ConnectivityNode');
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('does set the pathName of ConnectivityNode correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var action;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                inputs[0].value = 'ERS';
                                inputs[1].value = 'QC9';
                                return [4 /*yield*/, element.requestUpdate()];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, primaryAction.click()];
                            case 2:
                                _a.sent();
                                action = actionEvent.args[1][0].detail.action;
                                testing_1.expect(action["new"].element).to.have.attribute('pathName', 'AA1/J1/Bay1/grounded');
                                testing_1.expect(action["new"].element).to.have.attribute('name', 'grounded');
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('does set the Terminals attributes correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var action, terminal;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                inputs[0].value = 'ERS';
                                inputs[1].value = 'QC9';
                                return [4 /*yield*/, element.requestUpdate()];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, primaryAction.click()];
                            case 2:
                                _a.sent();
                                action = actionEvent.args[0][0].detail.action;
                                terminal = action["new"].element.querySelector('Terminal');
                                testing_1.expect(terminal).to.have.attribute('substationName', 'AA1');
                                testing_1.expect(terminal).to.have.attribute('voltageLevelName', 'J1');
                                testing_1.expect(terminal).to.have.attribute('bayName', 'Bay1');
                                testing_1.expect(terminal).to.have.attribute('connectivityNode', 'AA1/J1/Bay1/grounded');
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
    });
});
var templateObject_1, templateObject_2;
