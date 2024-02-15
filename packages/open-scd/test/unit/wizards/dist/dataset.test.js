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
var dataset_js_1 = require("../../../src/wizards/dataset.js");
var foundation_js_1 = require("../../../src/foundation.js");
describe('dataset wizards', function () {
    var doc;
    var element;
    var wizardEvent;
    var actionEvent;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<oscd-wizards .host=", "></oscd-wizards>"], ["<oscd-wizards .host=", "></oscd-wizards>"])), document))];
                case 1:
                    element = _a.sent();
                    return [4 /*yield*/, fetch('/test/testfiles/wizards/gsecontrol.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                case 2:
                    doc = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('include a dataset edit wizard', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var wizard;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wizard = dataset_js_1.editDataSetWizard(doc.querySelector('IED[name="IED2"] DataSet[name="GooseDataSet1"]'));
                        element.workflow.push(function () { return wizard; });
                        return [4 /*yield*/, element.requestUpdate()];
                    case 1:
                        _a.sent();
                        wizardEvent = sinon_1.spy();
                        window.addEventListener('wizard', wizardEvent);
                        actionEvent = sinon_1.spy();
                        window.addEventListener('editor-action', actionEvent);
                        return [2 /*return*/];
                }
            });
        }); });
        it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).to.equalSnapshot()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); }).timeout(5000);
        it('allows to add a new FCDA on add FCDA button click', function () { return __awaiter(void 0, void 0, void 0, function () {
            var addButton;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        addButton = (Array.from(element.wizardUI.dialog.querySelectorAll('mwc-menu > mwc-list-item')).find(function (item) { return item.innerHTML.includes('dataset.fcda.add'); }));
                        return [4 /*yield*/, addButton.click()];
                    case 1:
                        _a.sent();
                        testing_1.expect(wizardEvent).to.be.calledOnce;
                        return [2 /*return*/];
                }
            });
        }); });
        describe('with stand alone DataSet', function () {
            var dataSet;
            var wizard;
            var inputs;
            var primaryAction;
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            dataSet = (new DOMParser().parseFromString("<DataSet name=\"myDS\"></DataSet>", 'application/xml').documentElement);
                            wizard = dataset_js_1.editDataSetWizard(dataSet);
                            element.workflow.length = 0;
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
            it('does not update a DataSet element when no attribute has changed', function () { return __awaiter(void 0, void 0, void 0, function () {
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
            it('update a DataSet element when only name attribute changed', function () { return __awaiter(void 0, void 0, void 0, function () {
                var input, action, updateAction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            input = inputs[0];
                            input.value = 'myNewDataSetName';
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
                            testing_1.expect(updateAction.old.element).to.have.attribute('name', 'myDS');
                            testing_1.expect(updateAction["new"].element).to.have.attribute('name', 'myNewDataSetName');
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('with connected DataSet', function () {
            var dataSet;
            var wizard;
            var inputs;
            var primaryAction;
            var firstFCDA;
            var thirdFCDA;
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            dataSet = doc.querySelector('IED[name="IED2"] DataSet[name="GooseDataSet1"]');
                            wizard = dataset_js_1.editDataSetWizard(dataSet);
                            element.workflow.length = 0;
                            element.workflow.push(function () { return wizard; });
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _d.sent();
                            inputs = Array.from(element.wizardUI.inputs);
                            return [4 /*yield*/, element.requestUpdate()];
                        case 2:
                            _d.sent();
                            primaryAction = ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-button[slot="primaryAction"]'));
                            firstFCDA = ((_b = element.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('filtered-list>mwc-check-list-item'));
                            thirdFCDA = ((_c = element.wizardUI.dialog) === null || _c === void 0 ? void 0 : _c.querySelector('filtered-list>mwc-check-list-item:nth-child(3)'));
                            return [2 /*return*/];
                    }
                });
            }); });
            it('does not update a DataSet element when no attribute has changed', function () { return __awaiter(void 0, void 0, void 0, function () {
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
            it('update a DataSet element when only name attribute changed', function () { return __awaiter(void 0, void 0, void 0, function () {
                var input, action, updateAction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            input = inputs[0];
                            input.value = 'myNewDataSetName';
                            return [4 /*yield*/, input.requestUpdate()];
                        case 1:
                            _a.sent();
                            primaryAction.click();
                            return [4 /*yield*/, element.requestUpdate()];
                        case 2:
                            _a.sent();
                            testing_1.expect(actionEvent).to.be.calledThrice;
                            action = actionEvent.args[0][0].detail.action;
                            testing_1.expect(action).to.satisfy(foundation_js_1.isReplace);
                            updateAction = action;
                            testing_1.expect(updateAction.old.element).to.have.attribute('name', 'GooseDataSet1');
                            testing_1.expect(updateAction["new"].element).to.have.attribute('name', 'myNewDataSetName');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('update a DataSet of all referenced control blocks', function () { return __awaiter(void 0, void 0, void 0, function () {
                var input, i, action, updateAction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            input = inputs[0];
                            input.value = 'myNewDataSetName';
                            return [4 /*yield*/, input.requestUpdate()];
                        case 1:
                            _a.sent();
                            primaryAction.click();
                            return [4 /*yield*/, element.requestUpdate()];
                        case 2:
                            _a.sent();
                            testing_1.expect(actionEvent).to.be.calledThrice;
                            for (i = 1; i < actionEvent.args.length; i++) {
                                action = actionEvent.args[i][0].detail.action;
                                testing_1.expect(action).to.satisfy(foundation_js_1.isReplace);
                                updateAction = action;
                                testing_1.expect(updateAction.old.element).to.have.attribute('datSet', 'GooseDataSet1');
                                testing_1.expect(updateAction["new"].element).to.have.attribute('datSet', 'myNewDataSetName');
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
            it('update a DataSet element when only desc attribute changed', function () { return __awaiter(void 0, void 0, void 0, function () {
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
            it('removes all unselected FCDA child elements', function () { return __awaiter(void 0, void 0, void 0, function () {
                var action, updateAction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            firstFCDA.click();
                            thirdFCDA.click();
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _a.sent();
                            primaryAction.click();
                            return [4 /*yield*/, element.requestUpdate()];
                        case 2:
                            _a.sent();
                            testing_1.expect(actionEvent).to.be.calledTwice;
                            action = actionEvent.args[0][0].detail.action;
                            testing_1.expect(action).to.satisfy(foundation_js_1.isDelete);
                            updateAction = action;
                            testing_1.expect(updateAction.old.element).to.have.attribute('ldInst', 'CBSW');
                            testing_1.expect(updateAction.old.element).to.have.attribute('prefix', '');
                            testing_1.expect(updateAction.old.element).to.have.attribute('lnClass', 'XSWI');
                            testing_1.expect(updateAction.old.element).to.have.attribute('lnInst', '2');
                            testing_1.expect(updateAction.old.element).to.have.attribute('doName', 'Pos');
                            testing_1.expect(updateAction.old.element).to.have.attribute('daName', 'stVal');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('removes all unselected FCDA child elements', function () { return __awaiter(void 0, void 0, void 0, function () {
                var action, updateAction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            firstFCDA.click();
                            thirdFCDA.click();
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _a.sent();
                            primaryAction.click();
                            return [4 /*yield*/, element.requestUpdate()];
                        case 2:
                            _a.sent();
                            testing_1.expect(actionEvent).to.be.calledTwice;
                            action = actionEvent.args[1][0].detail.action;
                            testing_1.expect(action).to.satisfy(foundation_js_1.isDelete);
                            updateAction = action;
                            testing_1.expect(updateAction.old.element).to.have.attribute('ldInst', 'CBSW');
                            testing_1.expect(updateAction.old.element).to.have.attribute('prefix', '');
                            testing_1.expect(updateAction.old.element).to.have.attribute('lnClass', 'XSWI');
                            testing_1.expect(updateAction.old.element).to.have.attribute('lnInst', '2');
                            testing_1.expect(updateAction.old.element).to.have.attribute('doName', 'OpSlc.dsd');
                            testing_1.expect(updateAction.old.element).to.have.attribute('daName', 'sasd.ads.asd');
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
});
var templateObject_1;
