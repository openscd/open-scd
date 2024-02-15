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
require("../../../src/addons/Wizards.js");
var foundation_js_1 = require("../../../src/foundation.js");
var test_support_js_1 = require("./test-support.js");
var dai_js_1 = require("../../../src/wizards/dai.js");
describe('Wizards for SCL element DAI', function () {
    var doc;
    var doi;
    var dai;
    var da;
    var element;
    var inputs;
    describe('create DAI with existing Val Element', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var wizard;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, test_support_js_1.fetchDoc('/test/testfiles/wizards/ied.scd')];
                    case 1:
                        doc = _a.sent();
                        dai = doc.querySelector('IED[name="IED1"] > AccessPoint[name="P1"] > Server > LDevice[inst="CircuitBreaker_CB1"] > LN[inst="1"][lnClass="XCBR"] > DOI[name="Beh"] > DAI[name="integer"]');
                        doi = dai.closest('DOI');
                        da = doc.querySelector('DOType[cdc="ENS"][id="Dummy.LLN0.Beh"] > DA[name="integer"]');
                        return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<oscd-wizards .host=", "></oscd-wizards>"], ["<oscd-wizards .host=", "></oscd-wizards>"])), document))];
                    case 2:
                        element = _a.sent();
                        wizard = dai_js_1.createDAIWizard(doi, dai, da);
                        element.workflow.push(function () { return wizard; });
                        return [4 /*yield*/, element.requestUpdate()];
                    case 3:
                        _a.sent();
                        inputs = Array.from(element.wizardUI.inputs);
                        return [2 /*return*/];
                }
            });
        }); });
        it('update value should be updated in document', function () {
            return __awaiter(this, void 0, void 0, function () {
                var complexActions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, test_support_js_1.setWizardTextFieldValue(inputs[0], '24')];
                        case 1:
                            _a.sent();
                            complexActions = dai_js_1.createValue(doi, da, dai, dai)(inputs, element.wizardUI);
                            expectCreateComplexAction(complexActions, '24');
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).dom.to.equalSnapshot()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('create DAI without Val Element', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var wizard;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, test_support_js_1.fetchDoc('/test/testfiles/wizards/ied.scd')];
                    case 1:
                        doc = _a.sent();
                        dai = doc.querySelector('IED[name="IED1"] > AccessPoint[name="P1"] > Server > LDevice[inst="CircuitBreaker_CB1"] > LN[inst="1"][lnClass="XCBR"] > DOI[name="Beh"] > DAI[name="t"]');
                        doi = dai.closest('DOI');
                        da = doc.querySelector('DOType[cdc="ENS"][id="Dummy.LLN0.Beh"] > DA[name="t"]');
                        return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<oscd-wizards .host=", "></oscd-wizards>"], ["<oscd-wizards .host=", "></oscd-wizards>"])), document))];
                    case 2:
                        element = _a.sent();
                        wizard = dai_js_1.createDAIWizard(doi, dai, da);
                        element.workflow.push(function () { return wizard; });
                        return [4 /*yield*/, element.requestUpdate()];
                    case 3:
                        _a.sent();
                        inputs = Array.from(element.wizardUI.inputs);
                        return [2 /*return*/];
                }
            });
        }); });
        it('update value should be updated in document', function () {
            return __awaiter(this, void 0, void 0, function () {
                var complexActions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, test_support_js_1.setWizardTextFieldValue(inputs[0], '')];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, test_support_js_1.setWizardTextFieldValue(inputs[1], '')];
                        case 2:
                            _a.sent();
                            complexActions = dai_js_1.createValue(doi, da, dai, dai)(inputs, element.wizardUI);
                            expectCreateComplexAction(complexActions, '0000-00-00T00:00:00.000');
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).dom.to.equalSnapshot()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('edit existing DAI with Val Element', function () {
        describe('having on value', function () {
            var val;
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var wizard;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, test_support_js_1.fetchDoc('/test/testfiles/wizards/ied.scd')];
                        case 1:
                            doc = _a.sent();
                            dai = doc.querySelector('IED[name="IED1"] > AccessPoint[name="P1"] > Server > LDevice[inst="CircuitBreaker_CB1"] > LN[prefix="CB"][lnClass="CSWI"] > DOI[name="Beh"] > DAI[name="integer"]');
                            val = dai.querySelector('Val');
                            da = doc.querySelector('DOType[cdc="ENS"][id="Dummy.LLN0.Beh"] > DA[name="integer"]');
                            return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_3 || (templateObject_3 = __makeTemplateObject(["<oscd-wizards .host=", "></oscd-wizards>"], ["<oscd-wizards .host=", "></oscd-wizards>"])), document))];
                        case 2:
                            element = _a.sent();
                            wizard = dai_js_1.editDAIWizard(da, dai);
                            element.workflow.push(function () { return wizard; });
                            return [4 /*yield*/, element.requestUpdate()];
                        case 3:
                            _a.sent();
                            inputs = Array.from(element.wizardUI.inputs);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('update value should be updated in document', function () {
                return __awaiter(this, void 0, void 0, function () {
                    var complexActions, replace;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, test_support_js_1.setWizardTextFieldValue(inputs[0], '8')];
                            case 1:
                                _a.sent();
                                complexActions = dai_js_1.updateValue(da, val)(inputs, element.wizardUI);
                                expectUpdateComplexAction(complexActions);
                                replace = complexActions[0].actions[0];
                                testing_1.expect(replace.old.element.textContent).to.equal('5');
                                testing_1.expect(replace["new"].element.textContent).to.equal('8');
                                return [2 /*return*/];
                        }
                    });
                });
            });
            it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).dom.to.equalSnapshot()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('having multiple setting group values', function () {
            var val;
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var wizard;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, test_support_js_1.fetchDoc('/test/testfiles/wizards/settingGroups.scd')];
                        case 1:
                            doc = _a.sent();
                            dai = doc.querySelector(':root > IED[name="IED1"] > AccessPoint[name="AP1"] > Server > ' +
                                'LDevice[inst="stage2"] > LN[lnType="OpenSCD_PTOC"] > DOI[name="StrVal"] > SDI[name="setMag"] > DAI[name="f"]');
                            val = dai.querySelectorAll('Val')[1];
                            da = doc.querySelector('DAType[id="OpenSCD_AnVal_FLOAT32"] > BDA[name="f"]');
                            return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_4 || (templateObject_4 = __makeTemplateObject(["<oscd-wizards .host=", "></oscd-wizards>"], ["<oscd-wizards .host=", "></oscd-wizards>"])), document))];
                        case 2:
                            element = _a.sent();
                            wizard = dai_js_1.editDAIWizard(da, dai);
                            element.workflow.push(function () { return wizard; });
                            return [4 /*yield*/, element.requestUpdate()];
                        case 3:
                            _a.sent();
                            inputs = Array.from(element.wizardUI.inputs);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('update value should be updated in document', function () {
                return __awaiter(this, void 0, void 0, function () {
                    var complexActions, replace;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, test_support_js_1.setWizardTextFieldValue(inputs[0], '800')];
                            case 1:
                                _a.sent();
                                complexActions = dai_js_1.updateValue(da, val)(inputs, element.wizardUI);
                                expectUpdateComplexAction(complexActions);
                                replace = complexActions[0].actions[0];
                                testing_1.expect(replace.old.element.textContent).to.equal('600');
                                testing_1.expect(replace["new"].element.textContent).to.equal('800');
                                return [2 /*return*/];
                        }
                    });
                });
            });
        });
    });
    function expectUpdateComplexAction(complexActions) {
        testing_1.expect(complexActions.length).to.equal(1);
        testing_1.expect(complexActions[0]).to.not.satisfy(foundation_js_1.isSimple);
        testing_1.expect(complexActions[0].title).to.equal('[dai.action.updatedai]');
        var actions = complexActions[0].actions;
        testing_1.expect(actions.length).to.equal(1);
    }
    function expectCreateComplexAction(complexActions, expectedValue) {
        testing_1.expect(complexActions.length).to.equal(1);
        testing_1.expect(complexActions[0]).to.not.satisfy(foundation_js_1.isSimple);
        testing_1.expect(complexActions[0].title).to.equal('[dai.action.createdai]');
        var actions = complexActions[0].actions;
        testing_1.expect(actions.length).to.equal(1);
        var create = actions[0];
        testing_1.expect(create["new"].parent).to.equal(doi);
        testing_1.expect(create["new"].element).to.equal(dai);
        var val = dai.querySelector('Val');
        testing_1.expect(val.textContent).to.be.equal(expectedValue);
    }
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
