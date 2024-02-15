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
require("../../../../../src/addons/Wizards.js");
var test_support_js_1 = require("../../../wizards/test-support.js");
var address_js_1 = require("../../../../../src/editors/protocol104/wizards/address.js");
describe('Wizards for 104 Address Element', function () {
    var doc;
    var address;
    var dai;
    var doi;
    var ied;
    var element;
    var inputs;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_support_js_1.fetchDoc('/test/testfiles/104/valid-addresses.scd')];
                case 1:
                    doc = _a.sent();
                    return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<oscd-wizards .host=", "></oscd-wizards>"], ["<oscd-wizards .host=", "></oscd-wizards>"])), document))];
                case 2:
                    element = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    function prepareWizard(daiQuery) {
        return __awaiter(this, void 0, Promise, function () {
            var wizard;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        address = doc.querySelector(daiQuery);
                        dai = address.closest('DAI');
                        doi = dai.closest('DOI');
                        ied = dai.closest('IED');
                        wizard = address_js_1.editAddressWizard(ied, doi, dai, address);
                        element.workflow.push(function () { return wizard; });
                        return [4 /*yield*/, element.requestUpdate()];
                    case 1:
                        _a.sent();
                        inputs = Array.from(element.wizardUI.inputs);
                        return [2 /*return*/];
                }
            });
        });
    }
    describe('when adding a 104 Address', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prepareWizard('IED[name="B1"] LN[lnType="SE_GGIO_SET_V002"] DOI[name="Mod"] DAI[name="ctlVal"] Address')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('shows a validation error message if the combination of casdu and ioa is already in use', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, test_support_js_1.setWizardTextFieldValue(inputs[2], '208')];
                    case 1:
                        _a.sent(); // Casdu Field
                        return [4 /*yield*/, test_support_js_1.setWizardTextFieldValue(inputs[3], '2')];
                    case 2:
                        _a.sent(); // IOA Field
                        return [4 /*yield*/, element.updateComplete];
                    case 3:
                        _a.sent();
                        testing_1.expect(inputs[3].checkValidity()).to.be["false"];
                        testing_1.expect(inputs[3].validity.customError).to.be["true"];
                        testing_1.expect(inputs[3].validationMessage).to.include('ioaConflict');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('edit basic 104 Address', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prepareWizard('IED[name="B2"] LN0[lnClass="LLN0"] DAI[name="stVal"] Address')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('update basic fields should be updated in document', function () {
            return __awaiter(this, void 0, void 0, function () {
                var updateAction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, test_support_js_1.setWizardTextFieldValue(inputs[2], '11')];
                        case 1:
                            _a.sent(); // Casdu Field
                            return [4 /*yield*/, test_support_js_1.setWizardTextFieldValue(inputs[3], '21')];
                        case 2:
                            _a.sent(); // IOA Field
                            updateAction = test_support_js_1.executeWizardReplaceAction(address_js_1.updateAddressValue(doi, dai, address), element.wizardUI, inputs);
                            testing_1.expect(updateAction.old.element).to.have.attribute('casdu', '1');
                            testing_1.expect(updateAction["new"].element).to.have.attribute('casdu', '11');
                            testing_1.expect(updateAction.old.element).to.have.attribute('ioa', '2');
                            testing_1.expect(updateAction["new"].element).to.have.attribute('ioa', '21');
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('when no fields changed there will be no update action', function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    test_support_js_1.expectWizardNoUpdateAction(address_js_1.updateAddressValue(doi, dai, address), element.wizardUI, inputs);
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
    });
    describe('edit 104 Address with expected value', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prepareWizard('IED[name="B1"] LN[lnType="SE_GGIO_SET_V002"] DOI[name="Mod"] DAI[name="ctlVal"] Address[ioa="2"]')];
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
        }); });
    });
    describe('edit 104 Address with unit multiplier', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prepareWizard('IED[name="B1"] LN[lnType="SE_GGIO_SET_V002"] DOI[name="IntIn1"] DAI[name="stVal"] Address')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('update unit multiplier field should be updated in document', function () {
            return __awaiter(this, void 0, void 0, function () {
                var updateAction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, test_support_js_1.setWizardSelectValue(inputs[5], 'k')];
                        case 1:
                            _a.sent(); // Unit Multiplier Field
                            updateAction = test_support_js_1.executeWizardReplaceAction(address_js_1.updateAddressValue(doi, dai, address), element.wizardUI, inputs);
                            testing_1.expect(updateAction.old.element).to.not.have.attribute('unitMultiplier');
                            testing_1.expect(updateAction["new"].element).to.have.attribute('unitMultiplier', 'k');
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
    describe('edit 104 Address with scale fields', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prepareWizard('IED[name="B1"] LN[lnType="SE_MMXU_SET_V001"] DOI[name="Hz"] DAI[name="f"] Address')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('update scale fields should be updated in document', function () {
            return __awaiter(this, void 0, void 0, function () {
                var updateAction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, test_support_js_1.setWizardTextFieldValue(inputs[6], '1.234')];
                        case 1:
                            _a.sent(); // Scale Multiplier Field
                            return [4 /*yield*/, test_support_js_1.setWizardTextFieldValue(inputs[7], '2.345')];
                        case 2:
                            _a.sent(); // Scale Offset Field
                            updateAction = test_support_js_1.executeWizardReplaceAction(address_js_1.updateAddressValue(doi, dai, address), element.wizardUI, inputs);
                            testing_1.expect(updateAction.old.element).to.not.have.attribute('scaleMultiplier');
                            testing_1.expect(updateAction["new"].element).to.have.attribute('scaleMultiplier', '1.234');
                            testing_1.expect(updateAction.old.element).to.not.have.attribute('scaleOffset');
                            testing_1.expect(updateAction["new"].element).to.have.attribute('scaleOffset', '2.345');
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).dom.to.equalSnapshot({
                            ignoreAttributes: [
                                {
                                    tags: ['wizard-textfield'],
                                    attributes: ['pattern']
                                },
                            ]
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        //work around, because the escapes get removed in snapshot
        it('should have correct pattern', function () { return __awaiter(void 0, void 0, void 0, function () {
            var decimal_pattern;
            return __generator(this, function (_a) {
                decimal_pattern = '[+\\-]?[0-9]+(([.][0-9]*)?|([.][0-9]+))';
                testing_1.expect(element.wizardUI.dialog.querySelectorAll('wizard-textfield[pattern]')
                    .length).to.equal(2);
                testing_1.expect(element.wizardUI
                    .dialog.querySelectorAll('wizard-textfield[pattern]')[0]
                    .getAttribute('pattern')).to.equal(decimal_pattern);
                testing_1.expect(element.wizardUI
                    .dialog.querySelectorAll('wizard-textfield[pattern]')[1]
                    .getAttribute('pattern')).to.equal(decimal_pattern);
                return [2 /*return*/];
            });
        }); });
    });
    describe('edit 104 Address with mapped cdc value', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prepareWizard('IED[name="B1"] LN[lnType="SE_MMXU_SET_V001"] DOI[name="PPV"] DAI[name="f"] Address')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should have mappedCmv translation value in helper field', function () { return __awaiter(void 0, void 0, void 0, function () {
            var cdc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cdc = element.wizardUI.dialog.querySelector('wizard-textfield[label="cdc"]');
                        testing_1.expect(cdc).to.exist;
                        return [4 /*yield*/, testing_1.expect(cdc.helper).to.equal('[protocol104.mappedCmv]')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('edit 104 Address with inverted value', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prepareWizard('IED[name="B1"] LN[lnType="SE_GGIO_SET_V002"] DOI[name="Ind2"] DAI[name="stVal"] Address[inverted="true"]')];
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
        }); });
    });
    describe('edit 104 Address with check value', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prepareWizard('IED[name="B1"] LN[lnType="SE_GGIO_SET_V002"] DOI[name="DPCSO1"] DAI[name="Check"] Address[check="interlocking"]')];
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
        }); });
    });
});
var templateObject_1;
