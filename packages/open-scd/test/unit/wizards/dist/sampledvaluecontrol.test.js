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
var sampledvaluecontrol_js_1 = require("../../../src/wizards/sampledvaluecontrol.js");
var fast_check_1 = require("fast-check");
var foundation_js_2 = require("../../foundation.js");
describe('Wizards for SCL element SampledValueControl', function () {
    var doc;
    var element;
    var inputs;
    var primaryAction;
    var actionEvent;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<oscd-wizards .host=", "></oscd-wizards>"], ["<oscd-wizards .host=", "></oscd-wizards>"])), document))];
                case 1:
                    element = _a.sent();
                    return [4 /*yield*/, fetch('test/testfiles/wizards/sampledvaluecontrol.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                case 2:
                    doc = _a.sent();
                    actionEvent = sinon_1.spy();
                    window.addEventListener('editor-action', actionEvent);
                    return [2 /*return*/];
            }
        });
    }); });
    describe('define an edit wizard that', function () {
        describe('with muticast attribute set to false - deprecated', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var wizard;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            wizard = sampledvaluecontrol_js_1.editSampledValueControlWizard(doc.querySelector('SampledValueControl[multicast="false"]'));
                            element.workflow.push(function () { return wizard; });
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _b.sent();
                            inputs = Array.from(element.wizardUI.inputs);
                            primaryAction = ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-button[slot="primaryAction"]'));
                            return [4 /*yield*/, element.wizardUI.requestUpdate()];
                        case 2:
                            _b.sent(); // make sure wizard is rendered
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
            it('update a SampledValueControl element when only multicast attribute changed', function () { return __awaiter(void 0, void 0, void 0, function () {
                var action, updateAction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            inputs[2].checked = true;
                            primaryAction.click();
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _a.sent();
                            testing_1.expect(actionEvent).to.be.calledOnce;
                            action = actionEvent.args[0][0].detail.action;
                            testing_1.expect(action).to.satisfy(foundation_js_1.isReplace);
                            updateAction = action;
                            testing_1.expect(updateAction.old.element).to.have.attribute('multicast', 'false');
                            testing_1.expect(updateAction["new"].element).to.have.attribute('multicast', 'true');
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe(' with multicast set to treu', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var wizard;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            wizard = sampledvaluecontrol_js_1.editSampledValueControlWizard(doc.querySelector('SampledValueControl[multicast="true"]'));
                            element.workflow.push(function () { return wizard; });
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _b.sent();
                            inputs = Array.from(element.wizardUI.inputs);
                            primaryAction = ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-button[slot="primaryAction"]'));
                            return [4 /*yield*/, element.wizardUI.requestUpdate()];
                        case 2:
                            _b.sent(); // make sure wizard is rendered
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
            it('edits name attribute only for valid inputs', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_2.regexString(foundation_js_2.regExp.tAsciName, 1, 32), function (name) { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            inputs[0].value = name;
                                            return [4 /*yield*/, inputs[0].requestUpdate()];
                                        case 1:
                                            _a.sent();
                                            testing_1.expect(inputs[0].checkValidity()).to.be["true"];
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('rejects name attribute starting with decimals', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_2.regexString(foundation_js_2.regExp.decimal, 1, 1), function (name) { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            inputs[0].value = name;
                                            return [4 /*yield*/, inputs[0].requestUpdate()];
                                        case 1:
                                            _a.sent();
                                            testing_1.expect(inputs[0].checkValidity()).to.be["false"];
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('edits smpRate attribute only for valid inputs', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(fast_check_1.integer({ min: 0 }).map(function (num) { return "" + num; }), function (smpRate) { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            inputs[4].value = smpRate;
                                            return [4 /*yield*/, inputs[4].requestUpdate()];
                                        case 1:
                                            _a.sent();
                                            testing_1.expect(inputs[4].checkValidity()).to.be["true"];
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('rejects smpRate attribute in case input is not unsigned int', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_2.regexString(foundation_js_2.inverseRegExp.uint, 1), function (smpRate) { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            inputs[4].value = smpRate;
                                            return [4 /*yield*/, inputs[4].requestUpdate()];
                                        case 1:
                                            _a.sent();
                                            testing_1.expect(inputs[4].checkValidity()).to.be["false"];
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('edits nofASDU attribute only for valid inputs', function () { return __awaiter(void 0, void 0, void 0, function () {
                var input;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            input = inputs[5];
                            (_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click();
                            return [4 /*yield*/, input.requestUpdate()];
                        case 1:
                            _b.sent();
                            return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(fast_check_1.integer({ min: 0 }).map(function (num) { return "" + num; }), function (nofASDU) { return __awaiter(void 0, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                input.value = nofASDU;
                                                return [4 /*yield*/, input.requestUpdate()];
                                            case 1:
                                                _a.sent();
                                                testing_1.expect(input.checkValidity()).to.be["true"];
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }))];
                        case 2:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('rejects nofASDU attribute in case input is not unsigned int', function () { return __awaiter(void 0, void 0, void 0, function () {
                var input;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            input = inputs[5];
                            (_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click();
                            return [4 /*yield*/, input.requestUpdate()];
                        case 1:
                            _b.sent();
                            return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_2.regexString(foundation_js_2.inverseRegExp.uint, 1), function (nofASDU) { return __awaiter(void 0, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                input.value = nofASDU;
                                                return [4 /*yield*/, input.requestUpdate()];
                                            case 1:
                                                _a.sent();
                                                testing_1.expect(input.checkValidity()).to.be["false"];
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }))];
                        case 2:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('does not update the SampledValueControl element when no attribute has changed', function () { return __awaiter(void 0, void 0, void 0, function () {
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
            it('update a SampledValueControl element when only name attribute changed', function () { return __awaiter(void 0, void 0, void 0, function () {
                var input, action, updateAction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            input = inputs[0];
                            input.value = 'myNewCbName';
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
                            testing_1.expect(updateAction.old.element).to.have.attribute('name', 'MSVCB01');
                            testing_1.expect(updateAction["new"].element).to.have.attribute('name', 'myNewCbName');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('update a SampledValueControl element when only desc attribute changed', function () { return __awaiter(void 0, void 0, void 0, function () {
                var input, action, updateAction;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            input = inputs[1];
                            (_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click();
                            input.value = 'myDesc';
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
                            testing_1.expect(updateAction.old.element).to.not.have.attribute('desc');
                            testing_1.expect(updateAction["new"].element).to.have.attribute('desc', 'myDesc');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('update a SampledValueControl element when smvID attribute changed', function () { return __awaiter(void 0, void 0, void 0, function () {
                var input, action, updateAction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            input = inputs[2];
                            input.value = 'myNewType/ID';
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
                            testing_1.expect(updateAction.old.element).to.have.attribute('smvID', 'some/reference');
                            testing_1.expect(updateAction["new"].element).to.have.attribute('smvID', 'myNewType/ID');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('update a SampledValueControl element when smpMod attribute changed', function () { return __awaiter(void 0, void 0, void 0, function () {
                var input, action, updateAction;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            input = inputs[3];
                            (_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click();
                            input.value = 'SmpPerSec';
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
                            testing_1.expect(updateAction.old.element).to.not.have.attribute('smpMod');
                            testing_1.expect(updateAction["new"].element).to.have.attribute('smpMod', 'SmpPerSec');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('update a SampledValueControl element when smpRate attribute changed', function () { return __awaiter(void 0, void 0, void 0, function () {
                var input, action, updateAction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            input = inputs[4];
                            input.value = '4000';
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
                            testing_1.expect(updateAction.old.element).to.have.attribute('smpRate', '80');
                            testing_1.expect(updateAction["new"].element).to.have.attribute('smpRate', '4000');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('update a SampledValueControl element when nofASDU attribute changed', function () { return __awaiter(void 0, void 0, void 0, function () {
                var input, action, updateAction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            input = inputs[5];
                            input.value = '2';
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
                            testing_1.expect(updateAction.old.element).to.have.attribute('nofASDU', '1');
                            testing_1.expect(updateAction["new"].element).to.have.attribute('nofASDU', '2');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('updates the SampledValueEnable element when securityEnabled changed', function () { return __awaiter(void 0, void 0, void 0, function () {
                var input, action, updateAction;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            input = inputs[6];
                            (_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click();
                            input.value = 'Signature';
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
                            testing_1.expect(updateAction.old.element).to.not.have.attribute('securityEnabled');
                            testing_1.expect(updateAction["new"].element).to.have.attribute('securityEnabled', 'Signature');
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('contains a remove button that', function () {
            var ln01smv = new DOMParser().parseFromString("<LN0 lnClass=\"LLN0\" lnType=\"myType\">\n              <DataSet name=\"myDataSet\"/>\n              <DataSet name=\"myDataSet2\"/>\n              <SampledValueControl name=\"myName\" datSet=\"myDataSet\"/>\n              <ReportControl name=\"myName2\" datSet=\"myDataSet2\"/>\n          </LN0>", 'application/xml').documentElement;
            var ln02smv2 = new DOMParser().parseFromString("<LN0 lnClass=\"LLN0\" lnType=\"myType\">\n                <DataSet name=\"myDataSet\"/>\n                <SampledValueControl name=\"myName\" datSet=\"myDataSet\"/>\n                <SampledValueControl name=\"myName2\" datSet=\"myDataSet\"/>\n            </LN0>", 'application/xml').documentElement;
            var ln02gse = new DOMParser().parseFromString("<LN0 lnClass=\"LLN0\" lnType=\"myType\">\n                  <DataSet name=\"myDataSet\"/>\n                  <SampledValueControl name=\"myName\" datSet=\"myDataSet\"/>\n                  <GSEControl name=\"myName2\" datSet=\"myDataSet\"/>\n              </LN0>", 'application/xml').documentElement;
            var ln02rp = new DOMParser().parseFromString("<LN0 lnClass=\"LLN0\" lnType=\"myType\">\n              <DataSet name=\"myDataSet\"/>\n              <ReportControl name=\"myName\" datSet=\"myDataSet\"/>\n              <SampledValueControl name=\"myName2\" datSet=\"myDataSet\"/>\n          </LN0>", 'application/xml').documentElement;
            var missingparent = (new DOMParser().parseFromString("<SampledValueControl name=\"myName\" datSet=\"myDataSet\"/>", 'application/xml').documentElement);
            it('removes SampledValueControl and its referenced DataSet if no other SampledValueControl is assigned', function () {
                var _a;
                var sampledValueControl = ln01smv.querySelector('SampledValueControl');
                var actions = ((_a = sampledvaluecontrol_js_1.removeSampledValueControlAction(sampledValueControl)) === null || _a === void 0 ? void 0 : _a.actions);
                testing_1.expect(actions.length).to.equal(2);
                testing_1.expect(actions[0]).to.satisfy(foundation_js_1.isDelete);
                testing_1.expect(actions[0].old.element).to.equal(sampledValueControl);
                testing_1.expect(actions[1]).to.satisfy(foundation_js_1.isDelete);
                testing_1.expect(actions[1].old.element).to.equal(ln01smv.querySelector('DataSet'));
            });
            it('does not remove DataSet with another SampledValueControl referenced', function () {
                var _a;
                var sampledValueControl = ln02smv2.querySelector('SampledValueControl');
                var actions = ((_a = sampledvaluecontrol_js_1.removeSampledValueControlAction(sampledValueControl)) === null || _a === void 0 ? void 0 : _a.actions);
                testing_1.expect(actions.length).to.equal(1);
                testing_1.expect(actions[0]).to.satisfy(foundation_js_1.isDelete);
                testing_1.expect(actions[0].old.element).to.equal(sampledValueControl);
            });
            it('does not remove DataSet with another GSEControl referenced', function () {
                var _a;
                var sampledValueControl = ln02gse.querySelector('SampledValueControl');
                var actions = ((_a = sampledvaluecontrol_js_1.removeSampledValueControlAction(sampledValueControl)) === null || _a === void 0 ? void 0 : _a.actions);
                testing_1.expect(actions.length).to.equal(1);
                testing_1.expect(actions[0]).to.satisfy(foundation_js_1.isDelete);
                testing_1.expect(actions[0].old.element).to.equal(sampledValueControl);
            });
            it('does not remove DataSet with another ReportControl referenced', function () {
                var _a;
                var sampledValueControl = ln02rp.querySelector('SampledValueControl');
                var actions = ((_a = sampledvaluecontrol_js_1.removeSampledValueControlAction(sampledValueControl)) === null || _a === void 0 ? void 0 : _a.actions);
                testing_1.expect(actions.length).to.equal(1);
                testing_1.expect(actions[0]).to.satisfy(foundation_js_1.isDelete);
                testing_1.expect(actions[0].old.element).to.equal(sampledValueControl);
            });
            it('does not remove with missing parent element', function () {
                var action = sampledvaluecontrol_js_1.removeSampledValueControlAction(missingparent);
                testing_1.expect(action).to.be["null"];
            });
            it('removes referenced SMV element in the Communication section', function () {
                var _a;
                var sampledValueControl = doc.querySelector('IED[name="IED3"] SampledValueControl');
                var actions = ((_a = sampledvaluecontrol_js_1.removeSampledValueControlAction(sampledValueControl)) === null || _a === void 0 ? void 0 : _a.actions);
                testing_1.expect(actions.length).to.equal(3);
                testing_1.expect(actions[0]).to.satisfy(foundation_js_1.isDelete);
                testing_1.expect(actions[0].old.element).to.equal(sampledValueControl);
                testing_1.expect(actions[1]).to.satisfy(foundation_js_1.isDelete);
                testing_1.expect(actions[2]).to.satisfy(foundation_js_1.isDelete);
                testing_1.expect(actions[2].old.element).to.equal(doc.querySelector('Communication SMV[ldInst="MU01"][cbName="MSVCB01"]'));
            });
        });
    });
    describe('define an create wizard that', function () {
        var dataPicker;
        describe('with existing ConnectedAP element in the Communication section', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var wizard;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            wizard = sampledvaluecontrol_js_1.createSampledValueControlWizard(doc.querySelector('IED[name="IED3"] LN0'));
                            element.workflow.push(function () { return wizard; });
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _c.sent();
                            (element.wizardUI.dialogs[0].querySelector('wizard-textfield[label="smvID"]')).maybeValue = 'wer';
                            primaryAction = ((_a = element.wizardUI.dialogs[3]) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-button[slot="primaryAction"]'));
                            dataPicker = ((_b = element.wizardUI.dialogs[3]) === null || _b === void 0 ? void 0 : _b.querySelector('finder-list'));
                            return [4 /*yield*/, element.wizardUI.requestUpdate()];
                        case 2:
                            _c.sent(); // make sure wizard is rendered
                            return [2 /*return*/];
                    }
                });
            }); });
            it('has fourth pages', function () {
                return testing_1.expect(element.wizardUI.dialogs.length).to.equal(4);
            });
            it('the first page looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialogs[0]).dom.to.equalSnapshot()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); }).timeout(5000);
            it('the second page looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialogs[1]).dom.to.equalSnapshot()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); }).timeout(5000);
            it('the third page looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialogs[2]).dom.to.equalSnapshot()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); }).timeout(5000);
            it('the fourth page looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialogs[3]).dom.to.equalSnapshot()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); }).timeout(5000);
            it('triggers complex action on primary action click', function () { return __awaiter(void 0, void 0, void 0, function () {
                var action;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, primaryAction.click()];
                        case 1:
                            _a.sent();
                            testing_1.expect(actionEvent).to.be.calledOnce;
                            action = actionEvent.args[0][0].detail.action;
                            testing_1.expect(action).to.not.satisfy(foundation_js_1.isSimple);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('complex action carries SampledValueControl element', function () { return __awaiter(void 0, void 0, void 0, function () {
                var actions, action, createAction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, primaryAction.click()];
                        case 1:
                            _a.sent();
                            actions = actionEvent.args[0][0].detail.action
                                .actions;
                            testing_1.expect(actions.length).to.equal(3);
                            action = actions[0];
                            testing_1.expect(action).to.satisfy(foundation_js_1.isCreate);
                            createAction = action;
                            testing_1.expect(createAction["new"].element.tagName).to.equal('SampledValueControl');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('add default confRev to the SampledValueControl element', function () { return __awaiter(void 0, void 0, void 0, function () {
                var actions, action, createAction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, primaryAction.click()];
                        case 1:
                            _a.sent();
                            actions = actionEvent.args[0][0].detail.action
                                .actions;
                            testing_1.expect(actions.length).to.equal(3);
                            action = actions[0];
                            testing_1.expect(action).to.satisfy(foundation_js_1.isCreate);
                            createAction = action;
                            testing_1.expect(createAction["new"].element).has.attribute('confRev', '1');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('complex action carries referenced DataSet element', function () { return __awaiter(void 0, void 0, void 0, function () {
                var actions, action, createAction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, primaryAction.click()];
                        case 1:
                            _a.sent();
                            actions = actionEvent.args[0][0].detail.action
                                .actions;
                            testing_1.expect(actions.length).to.equal(3);
                            action = actions[2];
                            testing_1.expect(action).to.satisfy(foundation_js_1.isCreate);
                            createAction = action;
                            testing_1.expect(createAction["new"].element.tagName).to.equal('DataSet');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('referenced DataSet element not having any FCDA per default', function () { return __awaiter(void 0, void 0, void 0, function () {
                var createAction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, primaryAction.click()];
                        case 1:
                            _a.sent();
                            createAction = (actionEvent.args[0][0].detail.action.actions[2]);
                            testing_1.expect(createAction["new"].element.children).to.be.empty;
                            return [2 /*return*/];
                    }
                });
            }); });
            it('referenced DataSet element saving selected FCDA', function () { return __awaiter(void 0, void 0, void 0, function () {
                var path, createAction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            path = [
                                'Server: IED3>P1',
                                'LDevice: IED3>>MU01',
                                'LN0: IED3>>MU01',
                                'DO: #DummyTCTR>Amp',
                                'DA: #DummySAV>instMag',
                                'BDA: #AnalogueValue_i>i',
                            ];
                            dataPicker.paths = [path];
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, primaryAction.click()];
                        case 2:
                            _a.sent();
                            createAction = (actionEvent.args[0][0].detail.action.actions[2]);
                            testing_1.expect(createAction["new"].element.children).to.not.be.empty;
                            testing_1.expect(createAction["new"].element.children).to.have.lengthOf(1);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('complex action adding SMV element in the Communication section', function () { return __awaiter(void 0, void 0, void 0, function () {
                var actions, action, createAction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, primaryAction.click()];
                        case 1:
                            _a.sent();
                            actions = actionEvent.args[0][0].detail.action
                                .actions;
                            testing_1.expect(actions.length).to.equal(3);
                            action = actions[1];
                            testing_1.expect(action).to.satisfy(foundation_js_1.isCreate);
                            createAction = action;
                            testing_1.expect(createAction["new"].element.tagName).to.equal('SMV');
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('with missing ConnectedAP element in the Communication section', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var wizard;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            wizard = sampledvaluecontrol_js_1.createSampledValueControlWizard(doc.querySelector('IED[name="IED4"] LN0'));
                            element.workflow.push(function () { return wizard; });
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _c.sent();
                            (element.wizardUI.dialogs[0].querySelector('wizard-textfield[label="smvID"]')).maybeValue = 'wer';
                            primaryAction = ((_a = element.wizardUI.dialogs[3]) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-button[slot="primaryAction"]'));
                            dataPicker = ((_b = element.wizardUI.dialogs[3]) === null || _b === void 0 ? void 0 : _b.querySelector('finder-list'));
                            return [4 /*yield*/, element.wizardUI.requestUpdate()];
                        case 2:
                            _c.sent(); // make sure wizard is rendered
                            return [2 /*return*/];
                    }
                });
            }); });
            it('has fourth pages', function () {
                return testing_1.expect(element.wizardUI.dialogs.length).to.equal(4);
            });
            it('the third page having a warning message ', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialogs[2]).dom.to.equalSnapshot()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); }).timeout(5000);
            it('triggers complex action on primary action click', function () { return __awaiter(void 0, void 0, void 0, function () {
                var action;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, primaryAction.click()];
                        case 1:
                            _a.sent();
                            testing_1.expect(actionEvent).to.be.calledOnce;
                            action = actionEvent.args[0][0].detail.action;
                            testing_1.expect(action).to.not.satisfy(foundation_js_1.isSimple);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('complex action NOT adding SMV element in the Communication section', function () { return __awaiter(void 0, void 0, void 0, function () {
                var actions, action, createAction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, primaryAction.click()];
                        case 1:
                            _a.sent();
                            actions = actionEvent.args[0][0].detail.action
                                .actions;
                            testing_1.expect(actions.length).to.equal(2);
                            action = actions[1];
                            testing_1.expect(action).to.satisfy(foundation_js_1.isCreate);
                            createAction = action;
                            testing_1.expect(createAction["new"].element.tagName).to.equal('DataSet');
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe('define a select wizard that', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var wizard;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wizard = sampledvaluecontrol_js_1.selectSampledValueControlWizard(doc.documentElement);
                        element.workflow.push(function () { return wizard; });
                        return [4 /*yield*/, element.requestUpdate()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, element.wizardUI.requestUpdate()];
                    case 2:
                        _a.sent(); // make sure wizard is rendered
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
    });
});
var templateObject_1;
