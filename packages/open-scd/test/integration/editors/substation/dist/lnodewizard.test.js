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
require("../../../mock-wizard-editor.js");
var lnode_js_1 = require("../../../../src/wizards/lnode.js");
var foundation_js_1 = require("../../../../src/foundation.js");
describe('lnodewizard', function () {
    var element;
    var doc;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('/test/testfiles/lnodewizard.scd')
                        .then(function (response) { return response.text(); })
                        .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                case 1:
                    doc = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var wizard;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<mock-wizard-editor></mock-wizard-editor>"], ["<mock-wizard-editor></mock-wizard-editor>"]))))];
                case 1:
                    element = (_a.sent());
                    wizard = lnode_js_1.lNodeWizard(doc.querySelector('Bay'));
                    element.dispatchEvent(foundation_js_1.newWizardEvent(function () { return wizard; }));
                    return [4 /*yield*/, element.requestUpdate()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('renders three wizard pages each in a mwc-dialog', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            testing_1.expect((_a = element.wizardUI.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll('mwc-dialog').length).to.equal(2);
            return [2 /*return*/];
        });
    }); });
    describe('the first page', function () {
        it('renders a list of available IEDs in a mwc-list with checked items', function () {
            var _a, _b;
            testing_1.expect((_b = (_a = element.wizardUI.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-dialog')) === null || _b === void 0 ? void 0 : _b.querySelectorAll('mwc-check-list-item').length).to.equal(doc.querySelectorAll('IED').length);
        });
        it('selects the IEDs that are connected', function () {
            testing_1.expect((element.wizardUI.dialogs[0].querySelector('#iedList').selected).length).to.equal(1);
        });
        describe('the second page', function () {
            it('adds logical nodes of the selected IEDs', function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    testing_1.expect((_b = (_a = element.wizardUI.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-dialog:nth-child(2)')) === null || _b === void 0 ? void 0 : _b.querySelectorAll('mwc-check-list-item').length).to.equal(doc.querySelectorAll('IED[name="IED2"] LN0, IED[name="IED2"] LN')
                        .length);
                    return [2 /*return*/];
                });
            }); });
            it('selects logical nodes connected to the substation element', function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    testing_1.expect((_b = (_a = element.wizardUI.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-dialog:nth-child(2)')) === null || _b === void 0 ? void 0 : _b.querySelectorAll('mwc-check-list-item[selected]').length).to.have.equal(3);
                    return [2 /*return*/];
                });
            }); });
            it('disables logical nodes connected to another substation', function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    testing_1.expect((_b = (_a = element.wizardUI.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-dialog:nth-child(2)')) === null || _b === void 0 ? void 0 : _b.querySelectorAll('mwc-check-list-item[disabled]').length).to.have.equal(1);
                    return [2 /*return*/];
                });
            }); });
        });
        describe('lNodeActions', function () {
            it('removes unselected logical nodes', function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            testing_1.expect(doc.querySelector('Bay[name="COUPLING_BAY"]>LNode[lnClass="LLN0"]')).to.exist;
                            ((_b = (_a = element.wizardUI.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-dialog:nth-child(2)')) === null || _b === void 0 ? void 0 : _b.querySelector('filtered-list')).items[0].click();
                            return [4 /*yield*/, element.updateComplete];
                        case 1:
                            _e.sent();
                            ((_d = (_c = element.wizardUI.shadowRoot) === null || _c === void 0 ? void 0 : _c.querySelector('mwc-dialog:nth-child(2)')) === null || _d === void 0 ? void 0 : _d.querySelector('mwc-button[slot="primaryAction"]')).click();
                            return [4 /*yield*/, element.updateComplete];
                        case 2:
                            _e.sent();
                            testing_1.expect(doc.querySelector('Bay[name="COUPLING_BAY"]>LNode[lnClass="LLN0"]')).to.not.exist;
                            return [2 /*return*/];
                    }
                });
            }); });
            it('creates selected logical nodes', function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            testing_1.expect(doc.querySelector('Bay[name="COUPLING_BAY"]>LNode[ldInst="CBSW"][lnClass="XCBR"][lnInst="1"]')).to.not.exist;
                            ((_b = (_a = element.wizardUI.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-dialog:nth-child(2)')) === null || _b === void 0 ? void 0 : _b.querySelector('filtered-list')).items[3].click();
                            return [4 /*yield*/, element.updateComplete];
                        case 1:
                            _e.sent();
                            ((_d = (_c = element.wizardUI.shadowRoot) === null || _c === void 0 ? void 0 : _c.querySelector('mwc-dialog:nth-child(2)')) === null || _d === void 0 ? void 0 : _d.querySelector('mwc-button[slot="primaryAction"]')).click();
                            return [4 /*yield*/, element.requestUpdate()];
                        case 2:
                            _e.sent();
                            return [4 /*yield*/, element.updateComplete];
                        case 3:
                            _e.sent();
                            return [4 /*yield*/, element.wizards.updateComplete];
                        case 4:
                            _e.sent();
                            testing_1.expect(doc.querySelector('Bay[name="COUPLING_BAY"]>LNode[ldInst="CBSW"][lnClass="XCBR"][lnInst="1"]')).to.exist;
                            return [2 /*return*/];
                    }
                });
            }); });
            it('only create and remove its own logical node references', function () { return __awaiter(void 0, void 0, void 0, function () {
                var allLNodesNumber;
                var _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            allLNodesNumber = doc.querySelectorAll('Bay[name="COUPLING_BAY"] LNode').length;
                            ((_b = (_a = element.wizardUI.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-dialog:nth-child(2)')) === null || _b === void 0 ? void 0 : _b.querySelector('filtered-list')).items[3].click();
                            return [4 /*yield*/, element.updateComplete];
                        case 1:
                            _e.sent();
                            return [4 /*yield*/, element.wizards.updateComplete];
                        case 2:
                            _e.sent();
                            ((_d = (_c = element.wizardUI.shadowRoot) === null || _c === void 0 ? void 0 : _c.querySelector('mwc-dialog:nth-child(2)')) === null || _d === void 0 ? void 0 : _d.querySelector('mwc-button[slot="primaryAction"]')).click();
                            return [4 /*yield*/, element.updateComplete];
                        case 3:
                            _e.sent();
                            testing_1.expect(doc.querySelectorAll('Bay[name="COUPLING_BAY"] LNode').length).to.equal(allLNodesNumber + 1);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
});
var templateObject_1;
