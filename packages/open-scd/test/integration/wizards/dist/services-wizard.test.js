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
var foundation_js_1 = require("../../../src/foundation.js");
var services_js_1 = require("../../../src/wizards/services.js");
require("../../mock-wizard-editor.js");
describe('Wizards for SCL element Services', function () {
    var doc;
    var element;
    var wizard;
    ['WithServices', 'WithServices2'].forEach(function (ied) {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<mock-wizard-editor></mock-wizard-editor>"], ["<mock-wizard-editor></mock-wizard-editor>"]))))];
                    case 1:
                        element = _a.sent();
                        return [4 /*yield*/, fetch('/test/testfiles/Services.scd')
                                .then(function (response) { return response.text(); })
                                .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 2:
                        doc = _a.sent();
                        wizard = services_js_1.editServicesWizard(doc.querySelector('IED[name="WithServices"] Services'));
                        element.dispatchEvent(foundation_js_1.newWizardEvent(wizard));
                        return [4 /*yield*/, element.requestUpdate()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, element.updateComplete];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        describe("IED [" + ied + "]: define a Services wizards", function () {
            it('Services wizard to have 6 pages', function () {
                testing_1.expect(element.wizardUI.wizard.length).to.equal(6);
            });
            it('Services wizard to have 130 inputs', function () {
                testing_1.expect(element.wizardUI.wizard.flatMap(function (p) { return p.content; }).length).to.equal(134);
            });
            [17, 22, 22, 23, 28, 22].forEach(function (inputs, idx) {
                it("Services wizard " + (idx + 1) + " to have " + inputs + " inputs", function () {
                    testing_1.expect(element.wizardUI.wizard[idx].content.length).to.equal(inputs);
                });
            });
            [0, 1, 2, 3, 4, 5].forEach(function (idx) {
                it("Wizard " + (idx + 1) + " should look like snapshot", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialogs[idx]).to.equalSnapshot()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
        describe('> when pro mode is enabled', function () {
            var elm;
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            elm =
                                element.wizards.shadowRoot.querySelector('wizard-dialog');
                            localStorage.setItem('mode', 'pro');
                            elm.requestUpdate();
                            return [4 /*yield*/, elm.updateComplete];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            [0, 1, 2, 3, 4, 5].forEach(function (idx) {
                it("Wizard " + (idx + 1) + " should contain the code icon button", function () {
                    testing_1.expect(element.wizardUI.dialogs[idx].querySelector('mwc-icon-button-toggle')).to.have.attribute('onicon', 'code');
                });
            });
        });
        after(function () { return localStorage.removeItem('mode'); });
        ['AP2', 'AP3', 'AP4', 'AP5', 'AP6'].forEach(function (accessPointName) {
            describe("IED [" + ied + "]: AccessPoint wizards for Scl element Services", function () {
                beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<mock-wizard-editor></mock-wizard-editor>"], ["<mock-wizard-editor></mock-wizard-editor>"]))))];
                            case 1:
                                element = _a.sent();
                                return [4 /*yield*/, fetch('/test/testfiles/Services.scd')
                                        .then(function (response) { return response.text(); })
                                        .then(function (str) {
                                        return new DOMParser().parseFromString(str, 'application/xml');
                                    })];
                            case 2:
                                doc = _a.sent();
                                wizard = services_js_1.editServicesWizard(doc.querySelector("AccessPoint[name=\"" + accessPointName + "\"] Services"));
                                element.dispatchEvent(foundation_js_1.newWizardEvent(function () { return wizard; }));
                                return [4 /*yield*/, element.requestUpdate()];
                            case 3:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('should look like snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).to.equalSnapshot()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
    });
});
var templateObject_1, templateObject_2;
