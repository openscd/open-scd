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
var ldevice_js_1 = require("../../../src/wizards/ldevice.js");
var test_support_js_1 = require("./test-support.js");
describe('Wizards for SCL element LDevice', function () {
    var doc;
    var ied;
    var services;
    var ldevice;
    var element;
    var inputs;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var wizard;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_support_js_1.fetchDoc('/test/testfiles/wizards/ied.scd')];
                case 1:
                    doc = _a.sent();
                    ied = doc.querySelector('IED[name="IED3"]');
                    services = ied.querySelector('Services');
                    ldevice = ied.querySelectorAll('AccessPoint > Server > LDevice')[0];
                    return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<oscd-wizards .host=", "></oscd-wizards>"], ["<oscd-wizards .host=", "></oscd-wizards>"])), document))];
                case 2:
                    element = _a.sent();
                    wizard = ldevice_js_1.editLDeviceWizard(ldevice);
                    element.workflow.push(function () { return wizard; });
                    return [4 /*yield*/, element.requestUpdate()];
                case 3:
                    _a.sent();
                    inputs = Array.from(element.wizardUI.inputs);
                    return [2 /*return*/];
            }
        });
    }); });
    it('contains a wizard-textfield with a non-empty "inst" value', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            testing_1.expect((_a = inputs.find(function (textField) { return textField.label == 'ldInst'; })) === null || _a === void 0 ? void 0 : _a.value).to.be.equal(ldevice.getAttribute('inst'));
            return [2 /*return*/];
        });
    }); });
    it('contains a wizard-textfield with an empty "desc" value', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            testing_1.expect((_a = inputs.find(function (textField) { return textField.label == 'desc'; })) === null || _a === void 0 ? void 0 : _a.value).to.be.equal('');
            return [2 /*return*/];
        });
    }); });
    it('contains a wizard-textfield with an empty "ldName" value', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            testing_1.expect((_a = inputs.find(function (textField) { return textField.label == 'ldName'; })) === null || _a === void 0 ? void 0 : _a.value).to.be.equal('');
            return [2 /*return*/];
        });
    }); });
    describe('Allowing/Disallowing ldName editing', function () {
        it('ConfLdName should not be present and therefore ldName should be readonly', function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    testing_1.expect(services.querySelector('ConfLdName')).to.not.exist;
                    testing_1.expect(inputs[0]).to.have.attribute('readonly');
                    return [2 /*return*/];
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
        it('ConfLdName should be present in IED1 and therefore ldName should not be readonly', function () {
            return __awaiter(this, void 0, void 0, function () {
                var wizard;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            ied = doc.querySelector('IED[name="IED1"]');
                            services = ied.querySelector('Services');
                            ldevice = ied.querySelectorAll('AccessPoint > Server > LDevice')[0];
                            return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<oscd-wizards .host=", "></oscd-wizards>"], ["<oscd-wizards .host=", "></oscd-wizards>"])), document))];
                        case 1:
                            element = _a.sent();
                            wizard = ldevice_js_1.editLDeviceWizard(ldevice);
                            element.workflow.push(function () { return wizard; });
                            return [4 /*yield*/, element.requestUpdate()];
                        case 2:
                            _a.sent();
                            inputs = Array.from(element.wizardUI.inputs);
                            testing_1.expect(services.querySelector('ConfLdName')).to.exist;
                            testing_1.expect(inputs[0]).to.not.have.attribute('readonly');
                            describe('Modify ldName', function () {
                                it('should be registered as an update action', function () { return __awaiter(_this, void 0, void 0, function () {
                                    var newValue, ldeviceTextField, ldNameVal, simpleAction;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                newValue = 'LDevice1';
                                                ldeviceTextField = inputs.find(function (textField) { return textField.label == 'ldName'; });
                                                testing_1.expect(ldeviceTextField === null || ldeviceTextField === void 0 ? void 0 : ldeviceTextField.value).to.be.equal('');
                                                return [4 /*yield*/, test_support_js_1.setWizardTextFieldValue(ldeviceTextField, newValue)];
                                            case 1:
                                                _a.sent();
                                                ldNameVal = foundation_js_1.getValue(inputs.find(function (i) { return i.label === 'ldName'; }));
                                                testing_1.expect(ldNameVal).to.not.be.equal(ldevice.getAttribute('ldName'));
                                                simpleAction = foundation_js_1.createUpdateAction(ldevice, {
                                                    ldName: ldNameVal
                                                });
                                                test_support_js_1.expectUpdateAction(simpleAction, ldevice.tagName, ldeviceTextField.label, null, newValue);
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                            });
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
});
var templateObject_1, templateObject_2;
