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
var fast_check_1 = require("fast-check");
require("../../../src/addons/Wizards.js");
var foundation_js_1 = require("../../../src/foundation.js");
var reportcontrol_js_1 = require("../../../src/wizards/reportcontrol.js");
var foundation_js_2 = require("../../foundation.js");
describe('Wizards for SCL ReportControl element', function () {
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
                    return [4 /*yield*/, fetch('test/testfiles/wizards/reportcontrol.scd')
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
        describe('for complete ReportControl element', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var wizard;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            wizard = reportcontrol_js_1.editReportControlWizard(doc.querySelector('ReportControl'));
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
            it('edits bufTime attribute only for valid inputs', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(fast_check_1.integer({ min: 0 }).map(function (num) { return "" + num; }), function (bufTime) { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            inputs[6].value = bufTime;
                                            return [4 /*yield*/, inputs[6].requestUpdate()];
                                        case 1:
                                            _a.sent();
                                            testing_1.expect(inputs[6].checkValidity()).to.be["true"];
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
            it('rejects bufTime attribute starting with not being a unsigned int', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_2.regexString(foundation_js_2.inverseRegExp.uint, 1), function (bufTime) { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            inputs[6].value = bufTime;
                                            return [4 /*yield*/, inputs[6].requestUpdate()];
                                        case 1:
                                            _a.sent();
                                            testing_1.expect(inputs[6].checkValidity()).to.be["false"];
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
            it('edits intgPd attribute only for valid inputs', function () { return __awaiter(void 0, void 0, void 0, function () {
                var input;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            input = inputs[7];
                            (_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click();
                            return [4 /*yield*/, input.requestUpdate()];
                        case 1:
                            _b.sent();
                            return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(fast_check_1.integer({ min: 0 }).map(function (num) { return "" + num; }), function (intgPd) { return __awaiter(void 0, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                input.value = intgPd;
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
            it('rejects intgPd attribute starting with not being a unsigned int', function () { return __awaiter(void 0, void 0, void 0, function () {
                var input;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            input = inputs[7];
                            (_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click();
                            return [4 /*yield*/, input.requestUpdate()];
                        case 1:
                            _b.sent();
                            return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_2.regexString(foundation_js_2.inverseRegExp.uint, 1), function (intgPd) { return __awaiter(void 0, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                input.value = intgPd;
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
            it('does not update the ReportControl element when no attribute nor Val has changed', function () { return __awaiter(void 0, void 0, void 0, function () {
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
            it('update a ReportControl element when only name attribute changed', function () { return __awaiter(void 0, void 0, void 0, function () {
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
                            testing_1.expect(action).to.not.satisfy(foundation_js_1.isSimple);
                            updateAction = action.actions[0];
                            testing_1.expect(updateAction.old.element).to.have.attribute('name', 'ReportCb');
                            testing_1.expect(updateAction["new"].element).to.have.attribute('name', 'myNewCbName');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('update a ReportControl element when only desc attribute changed', function () { return __awaiter(void 0, void 0, void 0, function () {
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
                            testing_1.expect(action).to.not.satisfy(foundation_js_1.isSimple);
                            updateAction = action.actions[0];
                            testing_1.expect(updateAction.old.element).to.not.have.attribute('desc');
                            testing_1.expect(updateAction["new"].element).to.have.attribute('desc', 'myDesc');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('update a ReportControl element when rptID attribute changed', function () { return __awaiter(void 0, void 0, void 0, function () {
                var input, action, updateAction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            input = inputs[3];
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
                            testing_1.expect(action).to.not.satisfy(foundation_js_1.isSimple);
                            updateAction = action.actions[0];
                            testing_1.expect(updateAction.old.element).to.have.attribute('rptID', 'reportCb1');
                            testing_1.expect(updateAction["new"].element).to.have.attribute('rptID', 'myNewType/ID');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('update a ReportControl element when indexed attribute changed', function () { return __awaiter(void 0, void 0, void 0, function () {
                var input, action, updateAction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            input = inputs[4];
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
                            testing_1.expect(action).to.not.satisfy(foundation_js_1.isSimple);
                            updateAction = action.actions[0];
                            testing_1.expect(updateAction.old.element).to.have.attribute('indexed', 'true');
                            testing_1.expect(updateAction["new"].element).to.have.attribute('indexed', 'false');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('update a ReportControl element when bufTime attribute changed', function () { return __awaiter(void 0, void 0, void 0, function () {
                var input, action, updateAction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            input = inputs[6];
                            input.value = '54';
                            return [4 /*yield*/, input.requestUpdate()];
                        case 1:
                            _a.sent();
                            primaryAction.click();
                            return [4 /*yield*/, element.requestUpdate()];
                        case 2:
                            _a.sent();
                            testing_1.expect(actionEvent).to.be.calledOnce;
                            action = actionEvent.args[0][0].detail.action;
                            testing_1.expect(action).to.not.satisfy(foundation_js_1.isSimple);
                            updateAction = action.actions[0];
                            testing_1.expect(updateAction.old.element).to.have.attribute('bufTime', '100');
                            testing_1.expect(updateAction["new"].element).to.have.attribute('bufTime', '54');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('update a ReportControl element when intgPd attribute changed', function () { return __awaiter(void 0, void 0, void 0, function () {
                var input, action, updateAction;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            input = inputs[7];
                            (_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click();
                            input.value = '1000';
                            return [4 /*yield*/, input.requestUpdate()];
                        case 1:
                            _b.sent();
                            primaryAction.click();
                            return [4 /*yield*/, element.requestUpdate()];
                        case 2:
                            _b.sent();
                            testing_1.expect(actionEvent).to.be.calledOnce;
                            action = actionEvent.args[0][0].detail.action;
                            testing_1.expect(action).to.not.satisfy(foundation_js_1.isSimple);
                            updateAction = action.actions[0];
                            testing_1.expect(updateAction.old.element).to.not.have.attribute('intgPd');
                            testing_1.expect(updateAction["new"].element).to.have.attribute('intgPd', '1000');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('updates the RptEnable element with changed max attribute', function () { return __awaiter(void 0, void 0, void 0, function () {
                var input, action, updateAction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            input = inputs[5];
                            input.value = '6';
                            return [4 /*yield*/, input.requestUpdate()];
                        case 1:
                            _a.sent();
                            primaryAction.click();
                            return [4 /*yield*/, element.requestUpdate()];
                        case 2:
                            _a.sent();
                            testing_1.expect(actionEvent).to.be.calledOnce;
                            action = actionEvent.args[0][0].detail.action;
                            testing_1.expect(action).to.not.satisfy(foundation_js_1.isSimple);
                            updateAction = action.actions[0];
                            testing_1.expect(updateAction["new"].element.tagName).to.equal('RptEnabled');
                            testing_1.expect(updateAction.old.element.tagName).to.equal('RptEnabled');
                            testing_1.expect(updateAction.old.element).to.have.attribute('max', '5');
                            testing_1.expect(updateAction["new"].element).to.have.attribute('max', '6');
                            return [2 /*return*/];
                    }
                });
            }); });
            describe('with missing RptEnabled child', function () {
                beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var wizard;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                wizard = reportcontrol_js_1.editReportControlWizard(doc.querySelector('ReportControl[name="ReportCb2"]'));
                                element.workflow.length = 0;
                                return [4 /*yield*/, element.requestUpdate()];
                            case 1:
                                _b.sent();
                                element.workflow.push(function () { return wizard; });
                                return [4 /*yield*/, element.requestUpdate()];
                            case 2:
                                _b.sent();
                                inputs = Array.from(element.wizardUI.inputs);
                                primaryAction = ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-button[slot="primaryAction"]'));
                                return [4 /*yield*/, element.wizardUI.requestUpdate()];
                            case 3:
                                _b.sent(); // make sure wizard is rendered
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('nulles max Client input', function () {
                    var input = inputs[5];
                    testing_1.expect(input.maybeValue).to.be["null"];
                });
                it('creates a RptEnable element when max Client activated', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var input, action, updateAction;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                doc.querySelector('ReportControl>RptEnabled').remove();
                                input = inputs[5];
                                (_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click();
                                input.value = '6';
                                return [4 /*yield*/, input.requestUpdate()];
                            case 1:
                                _b.sent();
                                primaryAction.click();
                                return [4 /*yield*/, element.requestUpdate()];
                            case 2:
                                _b.sent();
                                testing_1.expect(actionEvent).to.be.calledOnce;
                                action = actionEvent.args[0][0].detail.action;
                                testing_1.expect(action).to.not.satisfy(foundation_js_1.isSimple);
                                testing_1.expect(action.actions[0]).to.satisfy(foundation_js_1.isCreate);
                                updateAction = action.actions[0];
                                testing_1.expect(updateAction["new"].element.tagName).to.equal('RptEnabled');
                                testing_1.expect(updateAction["new"].element).to.have.attribute('max', '6');
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            describe('contains a remove button that', function () {
                var ln01gse = new DOMParser().parseFromString("<LN0 lnClass=\"LLN0\" lnType=\"myType\">\n                <DataSet name=\"myDataSet\"/>\n                <DataSet name=\"myDataSet2\"/>\n                <ReportControl name=\"myName\" datSet=\"myDataSet\"/>\n                <ReportControl name=\"myName2\" datSet=\"myDataSet2\"/>\n            </LN0>", 'application/xml').documentElement;
                var ln02gse = new DOMParser().parseFromString("<LN0 lnClass=\"LLN0\" lnType=\"myType\">\n                  <DataSet name=\"myDataSet\"/>\n                  <ReportControl name=\"myName\" datSet=\"myDataSet\"/>\n                  <ReportControl name=\"myName2\" datSet=\"myDataSet\"/>\n              </LN0>", 'application/xml').documentElement;
                var ln02rp = new DOMParser().parseFromString("<LN0 lnClass=\"LLN0\" lnType=\"myType\">\n                    <DataSet name=\"myDataSet\"/>\n                    <ReportControl name=\"myName\" datSet=\"myDataSet\"/>\n                    <GSEControl name=\"myName2\" datSet=\"myDataSet\"/>\n                </LN0>", 'application/xml').documentElement;
                var ln02smv = new DOMParser().parseFromString("<LN0 lnClass=\"LLN0\" lnType=\"myType\">\n                <DataSet name=\"myDataSet\"/>\n                <ReportControl name=\"myName\" datSet=\"myDataSet\"/>\n                <SampledValueControl name=\"myName2\" datSet=\"myDataSet\"/>\n            </LN0>", 'application/xml').documentElement;
                var missingparent = (new DOMParser().parseFromString("<ReportControl name=\"myName\" datSet=\"myDataSet\"/>", 'application/xml').documentElement);
                it('removes ReportControl and its referenced DataSet if no other ReportControl are assigned', function () {
                    var reportControl = ln01gse.querySelector('ReportControl');
                    var actions = (reportcontrol_js_1.removeReportControlAction(reportControl).actions);
                    testing_1.expect(actions.length).to.equal(2);
                    testing_1.expect(actions[0]).to.satisfy(foundation_js_1.isDelete);
                    testing_1.expect(actions[0].old.element).to.equal(reportControl);
                    testing_1.expect(actions[1]).to.satisfy(foundation_js_1.isDelete);
                    testing_1.expect(actions[1].old.element).to.equal(ln01gse.querySelector('DataSet'));
                });
                it('does not remove if another ReportControl is assigned to the same DataSet', function () {
                    var reportControl = ln02gse.querySelector('ReportControl');
                    var actions = (reportcontrol_js_1.removeReportControlAction(reportControl).actions);
                    testing_1.expect(actions.length).to.equal(1);
                    testing_1.expect(actions[0]).to.satisfy(foundation_js_1.isDelete);
                    testing_1.expect(actions[0].old.element).to.equal(reportControl);
                });
                it('does not remove if another GSEControl is assigned to the same DataSet', function () {
                    var reportControl = ln02rp.querySelector('ReportControl');
                    var actions = (reportcontrol_js_1.removeReportControlAction(reportControl).actions);
                    testing_1.expect(actions.length).to.equal(1);
                    testing_1.expect(actions[0]).to.satisfy(foundation_js_1.isDelete);
                    testing_1.expect(actions[0].old.element).to.equal(reportControl);
                });
                it('does not remove if another SMV is assigned to the same DataSet', function () {
                    var reportControl = ln02smv.querySelector('ReportControl');
                    var actions = (reportcontrol_js_1.removeReportControlAction(reportControl).actions);
                    testing_1.expect(actions.length).to.equal(1);
                    testing_1.expect(actions[0]).to.satisfy(foundation_js_1.isDelete);
                    testing_1.expect(actions[0].old.element).to.equal(reportControl);
                });
                it('does not remove with missing parent element', function () {
                    var action = reportcontrol_js_1.removeReportControlAction(missingparent);
                    testing_1.expect(action).to.be["null"];
                });
            });
        });
        describe('for ReportControl with missing child elements and referenced DataSet', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var ln0, reportControl, wizard;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            ln0 = new DOMParser().parseFromString('<LN0 lnClass="LNN0"><ReportControl name="testName"/><LN0>', 'application/xml');
                            reportControl = ln0.querySelector('ReportControl');
                            wizard = reportcontrol_js_1.editReportControlWizard(reportControl);
                            element.workflow.push(function () { return wizard; });
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _a.sent();
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
    describe('define a select wizard that', function () {
        describe('with existing ReportControl element', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var wizard;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            wizard = reportcontrol_js_1.selectReportControlWizard(doc.documentElement);
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
            it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).dom.to.equalSnapshot()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); }).timeout(5000);
        });
        describe('with invalid parent', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var wizard;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            wizard = reportcontrol_js_1.selectReportControlWizard(doc.querySelector('DO'));
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
            it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).dom.to.equalSnapshot()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); }).timeout(5000);
        });
    });
    describe('define an create wizard that', function () {
        var dataPicker;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var wizard;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        wizard = reportcontrol_js_1.createReportControlWizard(doc.querySelector('LN0'));
                        element.workflow.push(function () { return wizard; });
                        return [4 /*yield*/, element.requestUpdate()];
                    case 1:
                        _c.sent();
                        inputs = Array.from(element.wizardUI.inputs);
                        primaryAction = ((_a = element.wizardUI.dialogs[3]) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-button[slot="primaryAction"]'));
                        dataPicker = ((_b = element.wizardUI.dialogs[3]) === null || _b === void 0 ? void 0 : _b.querySelector('finder-list'));
                        return [4 /*yield*/, element.wizardUI.requestUpdate()];
                    case 2:
                        _c.sent(); // make sure wizard is rendered
                        return [2 /*return*/];
                }
            });
        }); });
        it('has four pages', function () {
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
        it('the forth page looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
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
        it('complex action carries ReportControl element', function () { return __awaiter(void 0, void 0, void 0, function () {
            var actions, action, createAction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, primaryAction.click()];
                    case 1:
                        _a.sent();
                        actions = actionEvent.args[0][0].detail.action
                            .actions;
                        testing_1.expect(actions.length).to.equal(2);
                        action = actions[0];
                        testing_1.expect(action).to.satisfy(foundation_js_1.isCreate);
                        createAction = action;
                        testing_1.expect(createAction["new"].element.tagName).to.equal('ReportControl');
                        return [2 /*return*/];
                }
            });
        }); });
        it('add default confRev to the ReportControlElement', function () { return __awaiter(void 0, void 0, void 0, function () {
            var actions, action, createAction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, primaryAction.click()];
                    case 1:
                        _a.sent();
                        actions = actionEvent.args[0][0].detail.action
                            .actions;
                        testing_1.expect(actions.length).to.equal(2);
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
                        testing_1.expect(actions.length).to.equal(2);
                        action = actions[1];
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
                        createAction = (actionEvent.args[0][0].detail.action.actions[1]);
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
                            'Server: IED2>P1',
                            'LDevice: IED2>>CircuitBreaker_CB1',
                            'LN0: IED2>>CircuitBreaker_CB1',
                            'DO: #Dummy.LLN0>Beh',
                            'DA: #Dummy.LLN0.Beh>stVal',
                        ];
                        dataPicker.paths = [path];
                        return [4 /*yield*/, element.requestUpdate()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, primaryAction.click()];
                    case 2:
                        _a.sent();
                        createAction = (actionEvent.args[0][0].detail.action.actions[1]);
                        testing_1.expect(createAction["new"].element.children).to.not.be.empty;
                        testing_1.expect(createAction["new"].element.children).to.have.lengthOf(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('complex action adding OptField element as child element', function () { return __awaiter(void 0, void 0, void 0, function () {
            var actions, action, createAction, optFields;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, primaryAction.click()];
                    case 1:
                        _a.sent();
                        actions = actionEvent.args[0][0].detail.action
                            .actions;
                        testing_1.expect(actions.length).to.equal(2);
                        action = actions[0];
                        testing_1.expect(action).to.satisfy(foundation_js_1.isCreate);
                        createAction = action;
                        optFields = createAction["new"].element.querySelector('OptFields');
                        testing_1.expect(optFields).to.exist;
                        testing_1.expect(optFields).to.have.attribute('seqNum', 'true');
                        return [2 /*return*/];
                }
            });
        }); });
        it('complex action adding TrgOps element as child element', function () { return __awaiter(void 0, void 0, void 0, function () {
            var actions, action, createAction, trgOps;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, primaryAction.click()];
                    case 1:
                        _a.sent();
                        actions = actionEvent.args[0][0].detail.action
                            .actions;
                        testing_1.expect(actions.length).to.equal(2);
                        action = actions[0];
                        testing_1.expect(action).to.satisfy(foundation_js_1.isCreate);
                        createAction = action;
                        trgOps = createAction["new"].element.querySelector('TrgOps');
                        testing_1.expect(trgOps).to.exist;
                        testing_1.expect(trgOps).to.have.attribute('dchg', 'true');
                        testing_1.expect(trgOps).to.have.attribute('gi', 'false');
                        return [2 /*return*/];
                }
            });
        }); });
        it('complex action adding RptEnabled element as child element with non nulled max Client', function () { return __awaiter(void 0, void 0, void 0, function () {
            var actions, action, createAction, rptEnabled;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, primaryAction.click()];
                    case 1:
                        _a.sent();
                        actions = actionEvent.args[0][0].detail.action
                            .actions;
                        testing_1.expect(actions.length).to.equal(2);
                        action = actions[0];
                        testing_1.expect(action).to.satisfy(foundation_js_1.isCreate);
                        createAction = action;
                        rptEnabled = createAction["new"].element.querySelector('RptEnabled');
                        testing_1.expect(rptEnabled).to.exist;
                        testing_1.expect(rptEnabled).to.have.attribute('max', '5');
                        return [2 /*return*/];
                }
            });
        }); });
        it('complex action adding RptEnabled element as child element with nulled max Client', function () { return __awaiter(void 0, void 0, void 0, function () {
            var max, actions, action, createAction, rptEnabled;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        max = (element.wizardUI.dialogs[0].querySelector('wizard-textfield[label="max Clients"]'));
                        (_a = max.nullSwitch) === null || _a === void 0 ? void 0 : _a.click();
                        return [4 /*yield*/, max.requestUpdate()];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, primaryAction.click()];
                    case 2:
                        _b.sent();
                        actions = actionEvent.args[0][0].detail.action
                            .actions;
                        testing_1.expect(actions.length).to.equal(2);
                        action = actions[0];
                        testing_1.expect(action).to.satisfy(foundation_js_1.isCreate);
                        createAction = action;
                        rptEnabled = createAction["new"].element.querySelector('RptEnabled');
                        testing_1.expect(rptEnabled).to.not.exist;
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('define a wizard to select the control block reference', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var wizard;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wizard = reportcontrol_js_1.reportControlParentSelector(doc);
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
    describe('define copy to other IED selector', function () {
        var iedsPicker;
        var listItem;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var sourceReportControl, wizard;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        sourceReportControl = doc.querySelector('IED[name="IED2"] ReportControl[name="ReportCb"]');
                        wizard = reportcontrol_js_1.reportControlCopyToIedSelector(sourceReportControl);
                        element.workflow.push(function () { return wizard; });
                        return [4 /*yield*/, element.requestUpdate()];
                    case 1:
                        _c.sent();
                        iedsPicker = ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('filtered-list'));
                        primaryAction = ((_b = element.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('mwc-button[slot="primaryAction"]'));
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
        it('allows to copy to multiple IED at once', function () {
            return testing_1.expect(iedsPicker.multi).to.be["true"];
        });
        describe('with a sink IED not meeting partially the data references', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            listItem = iedsPicker.items.find(function (item) { return item.value.includes('IED5'); });
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('disabled the list item', function () {
                return testing_1.expect(listItem.disabled).to.not.be["true"];
            });
            it('does copy the control block ', function () {
                listItem.click();
                primaryAction.click();
                testing_1.expect(actionEvent).to.have.been.called;
            });
        });
    });
});
var templateObject_1;
