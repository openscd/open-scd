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
require("../../../../src/addons/Wizards.js");
require("../../../mock-wizard-editor.js");
var guess_wizard_js_1 = require("../../../../src/editors/substation/guess-wizard.js");
var foundation_js_1 = require("../../../../src/foundation.js");
describe('guess-wizard-integration', function () {
    var element;
    var validSCL;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var substation, wizard;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('/test/testfiles/valid2007B4.scd')
                        .then(function (response) { return response.text(); })
                        .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                case 1:
                    validSCL = _a.sent();
                    substation = validSCL.querySelector('Substation');
                    substation.innerHTML = '';
                    return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<oscd-wizards .host=", "></oscd-wizards>"], ["<oscd-wizards .host=", "></oscd-wizards>"])), document))];
                case 2:
                    element = _a.sent();
                    wizard = guess_wizard_js_1.guessVoltageLevel(validSCL, substation);
                    element.dispatchEvent(foundation_js_1.newWizardEvent(function () { return wizard; }));
                    return [4 /*yield*/, element.requestUpdate()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('renders one wizard page', function () {
        it('asking which ctlModel the is used for switchgear', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                testing_1.expect(element.wizardUI.dialogs.length).to.equal(1);
                testing_1.expect(element.wizardUI.dialog.querySelectorAll('#ctlModelList > mwc-check-list-item').length).to.equal(5);
                return [2 /*return*/];
            });
        }); });
        it('the first one being status-only', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                testing_1.expect((_a = element.wizardUI.dialog.querySelector('#ctlModelList > mwc-check-list-item:nth-child(1)')) === null || _a === void 0 ? void 0 : _a.innerHTML).to.equal('status-only');
                return [2 /*return*/];
            });
        }); });
        it('the second one being direct-with-normal-security', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                testing_1.expect((_a = element.wizardUI.dialog.querySelector('#ctlModelList > mwc-check-list-item:nth-child(2)')) === null || _a === void 0 ? void 0 : _a.innerHTML).to.equal('direct-with-normal-security');
                return [2 /*return*/];
            });
        }); });
        it('the second one being direct-with-enhanced-security', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                testing_1.expect((_a = element.wizardUI.dialog.querySelector('#ctlModelList > mwc-check-list-item:nth-child(3)')) === null || _a === void 0 ? void 0 : _a.innerHTML).to.equal('direct-with-enhanced-security');
                return [2 /*return*/];
            });
        }); });
        it('the second one being sbo-with-normal-security', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                testing_1.expect((_a = element.wizardUI.dialog.querySelector('#ctlModelList > mwc-check-list-item:nth-child(4)')) === null || _a === void 0 ? void 0 : _a.innerHTML).to.equal('sbo-with-normal-security');
                return [2 /*return*/];
            });
        }); });
        it('the second one being sbo-with-enhanced-security', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                testing_1.expect((_a = element.wizardUI.dialog.querySelector('#ctlModelList > mwc-check-list-item:nth-child(5)')) === null || _a === void 0 ? void 0 : _a.innerHTML).to.equal('sbo-with-enhanced-security');
                return [2 /*return*/];
            });
        }); });
    });
});
describe('guess-wizarding-editing-integration', function () {
    var mockWizardEditor;
    var validSCL;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var substation, wizard;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, fetch('/test/testfiles/valid2007B4.scd')
                        .then(function (response) { return response.text(); })
                        .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                case 1:
                    validSCL = _d.sent();
                    substation = validSCL.querySelector('Substation');
                    substation.innerHTML = '';
                    return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<mock-wizard-editor></mock-wizard-editor>"], ["<mock-wizard-editor></mock-wizard-editor>"]))))];
                case 2:
                    mockWizardEditor = (_d.sent());
                    wizard = guess_wizard_js_1.guessVoltageLevel(validSCL, substation);
                    mockWizardEditor.dispatchEvent(foundation_js_1.newWizardEvent(wizard));
                    return [4 /*yield*/, ((_a = mockWizardEditor.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.updateComplete)];
                case 3:
                    _d.sent();
                    return [4 /*yield*/, mockWizardEditor.requestUpdate()];
                case 4:
                    _d.sent();
                    return [4 /*yield*/, mockWizardEditor.updateComplete];
                case 5:
                    _d.sent();
                    return [4 /*yield*/, mockWizardEditor.wizardUI.requestUpdate()];
                case 6:
                    _d.sent();
                    (mockWizardEditor.wizardUI.dialog.querySelector('#ctlModelList > mwc-check-list-item:nth-child(5)')).selected = true;
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                case 7:
                    _d.sent(); // await animation
                    return [4 /*yield*/, mockWizardEditor.requestUpdate()];
                case 8:
                    _d.sent();
                    return [4 /*yield*/, mockWizardEditor.updateComplete];
                case 9:
                    _d.sent();
                    ((_b = mockWizardEditor.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('mwc-button[slot="primaryAction"]')).click();
                    return [4 /*yield*/, ((_c = mockWizardEditor.wizardUI.dialog) === null || _c === void 0 ? void 0 : _c.requestUpdate())];
                case 10:
                    _d.sent();
                    return [4 /*yield*/, mockWizardEditor.requestUpdate()];
                case 11:
                    _d.sent();
                    return [4 /*yield*/, mockWizardEditor.updateComplete];
                case 12:
                    _d.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('creates only one voltage level with default name', function () {
        var _a, _b;
        testing_1.expect(validSCL.querySelectorAll(':root > Substation > VoltageLevel').length).to.equal(1);
        testing_1.expect((_a = validSCL
            .querySelector(':root > Substation > VoltageLevel')) === null || _a === void 0 ? void 0 : _a.getAttribute('name')).to.equal('E1');
        testing_1.expect((_b = validSCL
            .querySelector(':root > Substation > VoltageLevel')) === null || _b === void 0 ? void 0 : _b.getAttribute('desc')).to.equal('guessed by OpenSCD');
    });
    it('creates as many bays as ieds with lnType CSWI and ctlModel sbo-with-enhanced-security', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            testing_1.expect(validSCL.querySelectorAll(':root > Substation > VoltageLevel > Bay')
                .length).to.equal(1);
            return [2 /*return*/];
        });
    }); });
    it('creates correct number of conducting equipments', function () {
        testing_1.expect(validSCL.querySelectorAll(':root > Substation > VoltageLevel > Bay > ConductingEquipment').length).to.equal(4);
    });
    it('creates only unique conducting equipment names', function () {
        var nameArray = Array.from(validSCL.querySelectorAll(':root > Substation > VoltageLevel > Bay > ConductingEquipment')).map(function (item) { return item.getAttribute('name'); });
        var nameSet = new Set(nameArray);
        testing_1.expect(nameArray.length).to.equal(nameSet.size);
    });
    it('creates unique conducting equipment name, if no prefix is there', function () {
        var _a, _b;
        testing_1.expect((_a = validSCL
            .querySelector(':root > Substation > VoltageLevel > Bay > ConductingEquipment:nth-child(1)')) === null || _a === void 0 ? void 0 : _a.getAttribute('name')).to.equal('QA1');
        testing_1.expect((_b = validSCL
            .querySelector(':root > Substation > VoltageLevel > Bay > ConductingEquipment:nth-child(4)')) === null || _b === void 0 ? void 0 : _b.getAttribute('name')).to.equal('QB1');
    });
    it('uses prefix for conducting equipment name, if prefix is available', function () {
        var _a, _b;
        testing_1.expect((_a = validSCL
            .querySelector(':root > Substation > VoltageLevel > Bay > ConductingEquipment:nth-child(2)')) === null || _a === void 0 ? void 0 : _a.getAttribute('name')).to.equal('CB2');
        testing_1.expect((_b = validSCL
            .querySelector(':root > Substation > VoltageLevel > Bay > ConductingEquipment:nth-child(3)')) === null || _b === void 0 ? void 0 : _b.getAttribute('name')).to.equal('DC1');
    });
    it('automatically adds loginal nodes to the first conducting equipment', function () {
        testing_1.expect(validSCL.querySelectorAll(':root > Substation > VoltageLevel > Bay > ConductingEquipment:nth-child(1) > LNode').length).to.equal(2);
        testing_1.expect(validSCL.querySelector(':root > Substation > VoltageLevel > Bay > ConductingEquipment:nth-child(1) > LNode[iedName="IED1"][ldInst="CircuitBreaker_CB1"][lnClass="XCBR"][lnInst="1"]')).to.exist;
        testing_1.expect(validSCL.querySelector(':root > Substation > VoltageLevel > Bay > ConductingEquipment:nth-child(1) > LNode[iedName="IED1"][ldInst="CircuitBreaker_CB1"][lnClass="CSWI"][lnInst="1"]')).to.exist;
    });
    it('automatically adds loginal nodes to the second conducting equipment', function () {
        testing_1.expect(validSCL.querySelectorAll(':root > Substation > VoltageLevel > Bay > ConductingEquipment:nth-child(2) > LNode').length).to.equal(2);
        testing_1.expect(validSCL.querySelector(':root > Substation > VoltageLevel > Bay > ConductingEquipment:nth-child(2) > LNode[iedName="IED1"][ldInst="CircuitBreaker_CB1"][prefix="CB"][lnClass="XCBR"][lnInst="2"]')).to.exist;
        testing_1.expect(validSCL.querySelector(':root > Substation > VoltageLevel > Bay > ConductingEquipment:nth-child(2) > LNode[iedName="IED1"][ldInst="CircuitBreaker_CB1"][prefix="CB"][lnClass="CSWI"][lnInst="2"]')).to.exist;
    });
    it('automatically adds loginal nodes to the third conducting equipment', function () {
        testing_1.expect(validSCL.querySelectorAll(':root > Substation > VoltageLevel > Bay > ConductingEquipment:nth-child(3) > LNode').length).to.equal(3);
        testing_1.expect(validSCL.querySelector(':root > Substation > VoltageLevel > Bay > ConductingEquipment:nth-child(3) > LNode[iedName="IED1"][ldInst="Disconnectors"][prefix="DC"][lnClass="XSWI"][lnInst="1"]')).to.exist;
        testing_1.expect(validSCL.querySelector(':root > Substation > VoltageLevel > Bay > ConductingEquipment:nth-child(3) > LNode[iedName="IED1"][ldInst="Disconnectors"][prefix="DC"][lnClass="CSWI"][lnInst="1"]')).to.exist;
        testing_1.expect(validSCL.querySelector(':root > Substation > VoltageLevel > Bay > ConductingEquipment:nth-child(3) > LNode[iedName="IED1"][ldInst="Disconnectors"][prefix="DC"][lnClass="CILO"][lnInst="1"]')).to.exist;
    });
    it('automatically adds loginal nodes to the fourth conducting equipment', function () {
        testing_1.expect(validSCL.querySelectorAll(':root > Substation > VoltageLevel > Bay > ConductingEquipment:nth-child(4) > LNode').length).to.equal(3);
        testing_1.expect(validSCL.querySelector(':root > Substation > VoltageLevel > Bay > ConductingEquipment:nth-child(4) > LNode[iedName="IED1"][ldInst="Disconnectors"][lnClass="XSWI"][lnInst="3"]')).to.exist;
        testing_1.expect(validSCL.querySelector(':root > Substation > VoltageLevel > Bay > ConductingEquipment:nth-child(4) > LNode[iedName="IED1"][ldInst="Disconnectors"][lnClass="CSWI"][lnInst="3"]')).to.exist;
        testing_1.expect(validSCL.querySelector(':root > Substation > VoltageLevel > Bay > ConductingEquipment:nth-child(4) > LNode[iedName="IED1"][ldInst="Disconnectors"][lnClass="CILO"][lnInst="3"]')).to.exist;
    });
});
var templateObject_1, templateObject_2;
