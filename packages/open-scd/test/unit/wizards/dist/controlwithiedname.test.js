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
require("../../mock-wizard-editor.js");
require("../../../src/editors/substation/zeroline-pane.js");
describe('selectExtRefWizard', function () {
    var doc;
    var parent;
    var element;
    var commMappings;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, fetch('/test/testfiles/comm-map.scd')
                        .then(function (response) { return response.text(); })
                        .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                case 1:
                    doc = _b.sent();
                    return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<mock-wizard-editor\n        ><zeroline-pane .doc=", "></zeroline-pane\n      ></mock-wizard-editor>"], ["<mock-wizard-editor\n        ><zeroline-pane .doc=", "></zeroline-pane\n      ></mock-wizard-editor>"])), doc))];
                case 2:
                    parent = _b.sent();
                    element = parent.querySelector('zeroline-pane');
                    return [4 /*yield*/, element.updateComplete];
                case 3:
                    _b.sent();
                    element.commmap.click();
                    return [4 /*yield*/, parent.updateComplete];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                case 5:
                    _b.sent(); // await animation
                    commMappings = (_a = parent.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('filtered-list');
                    return [2 /*return*/];
            }
        });
    }); });
    it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    commMappings.items[3].click();
                    return [4 /*yield*/, parent.updateComplete];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, parent.wizardUI.updateComplete];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, testing_1.expect(parent.wizardUI.dialog).to.equalSnapshot()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('shows all ExtRefs', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    commMappings.items[3].click();
                    return [4 /*yield*/, parent.updateComplete];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, parent.wizardUI.updateComplete];
                case 2:
                    _b.sent();
                    testing_1.expect((_a = parent.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelectorAll('mwc-check-list-item').length).to.equal(14);
                    return [2 /*return*/];
            }
        });
    }); });
    it('removes selected ExtRefs in case no intAddr is present', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    testing_1.expect(doc.querySelector(':root > IED[name="IED2"] ExtRef[iedName="IED1"][ldInst="Disconnectors"][lnClass="XSWI"][doName="Pos"][daName="stVal"]')).to.exist;
                    commMappings.items[3].click();
                    return [4 /*yield*/, parent.updateComplete];
                case 1:
                    _c.sent();
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                case 2:
                    _c.sent(); // await animation
                    ((_a = parent.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('filtered-list')).items[2].click();
                    return [4 /*yield*/, parent.updateComplete];
                case 3:
                    _c.sent();
                    ((_b = parent.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('mwc-button[slot="primaryAction"]')).click();
                    return [4 /*yield*/, parent.updateComplete];
                case 4:
                    _c.sent();
                    testing_1.expect(doc.querySelector(':root > IED[name="IED2"] ExtREf[iedName="IED1"][ldInst="Disconnectors"][lnClass="XSWI"][doName="Pos"][daName="stVal"]')).to.not.exist;
                    return [2 /*return*/];
            }
        });
    }); });
    it('updates selected ExtRefs in case intAddr is present', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    testing_1.expect(doc.querySelector(':root > IED[name="IED1"] ExtRef[iedName="IED2"][ldInst="CBSW"][lnClass="XSWI"]' +
                        '[doName="Pos"][daName="stVal"][intAddr="./stVal"][serviceType="GOOSE"][desc="testDesc"]' +
                        '[pServT="GOOSE"][pLN="XSWI"][pDO="Pos"][pDA="stVal"]')).to.exist;
                    commMappings.items[4].click();
                    return [4 /*yield*/, parent.updateComplete];
                case 1:
                    _c.sent();
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                case 2:
                    _c.sent(); // await animation
                    ((_a = parent.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('filtered-list')).items[0].click();
                    return [4 /*yield*/, parent.updateComplete];
                case 3:
                    _c.sent();
                    ((_b = parent.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('mwc-button[slot="primaryAction"]')).click();
                    return [4 /*yield*/, parent.updateComplete];
                case 4:
                    _c.sent();
                    testing_1.expect(doc.querySelector(':root > IED[name="IED1"] ExtRef:not([iedName]):not([ldInst]):not([lnClass]):not([doName]):not([daName])' +
                        '[intAddr="./stVal"][serviceType="GOOSE"][desc="testDesc"]' +
                        '[pServT="GOOSE"][pLN="XSWI"][pDO="Pos"][pDA="stVal"]')).to.exist;
                    return [2 /*return*/];
            }
        });
    }); });
    it('removes IEDName if all linked ExtRefs are removed/disconnected', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    testing_1.expect(doc.querySelector(':root > IED[name="IED1"] > AccessPoint > Server > ' +
                        'LDevice[inst="CircuitBreaker_CB1"] > LN0 > GSEControl > ' +
                        'IEDName[apRef="P1"][ldInst="CircuitBreaker_CB1"][lnClass="CSWI"]')).to.exist;
                    commMappings.items[5].click();
                    return [4 /*yield*/, parent.updateComplete];
                case 1:
                    _f.sent();
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                case 2:
                    _f.sent(); // await animation
                    ((_a = parent.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('filtered-list')).items[0].click();
                    return [4 /*yield*/, parent.updateComplete];
                case 3:
                    _f.sent();
                    ((_b = parent.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('filtered-list')).items[1].click();
                    return [4 /*yield*/, parent.updateComplete];
                case 4:
                    _f.sent();
                    ((_c = parent.wizardUI.dialog) === null || _c === void 0 ? void 0 : _c.querySelector('filtered-list')).items[2].click();
                    return [4 /*yield*/, parent.updateComplete];
                case 5:
                    _f.sent();
                    ((_d = parent.wizardUI.dialog) === null || _d === void 0 ? void 0 : _d.querySelector('filtered-list')).items[3].click();
                    return [4 /*yield*/, parent.updateComplete];
                case 6:
                    _f.sent();
                    ((_e = parent.wizardUI.dialog) === null || _e === void 0 ? void 0 : _e.querySelector('mwc-button[slot="primaryAction"]')).click();
                    return [4 /*yield*/, parent.updateComplete];
                case 7:
                    _f.sent();
                    testing_1.expect(doc.querySelector(':root > IED[name="IED1"] > AccessPoint > Server > ' +
                        'LDevice[inst="CircuitBreaker_CB1"] > LN0 > GSEControl > ' +
                        'IEDName[apRef="P1"][ldInst="CircuitBreaker_CB1"][lnClass="CSWI"]')).to.not.exist;
                    return [2 /*return*/];
            }
        });
    }); });
    it('does not removes IEDName if linked ExtRefs`not completely removed/disconnected', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    testing_1.expect(doc.querySelector(':root > IED[name="IED1"] > AccessPoint > Server > ' +
                        'LDevice[inst="CircuitBreaker_CB1"] > LN0 > GSEControl > ' +
                        'IEDName[apRef="P1"][ldInst="CircuitBreaker_CB1"][lnClass="CSWI"]')).to.exist;
                    commMappings.items[5].click();
                    return [4 /*yield*/, parent.updateComplete];
                case 1:
                    _d.sent();
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                case 2:
                    _d.sent(); // await animation
                    ((_a = parent.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('filtered-list')).items[0].click();
                    return [4 /*yield*/, parent.updateComplete];
                case 3:
                    _d.sent();
                    ((_b = parent.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('filtered-list')).items[1].click();
                    return [4 /*yield*/, parent.updateComplete];
                case 4:
                    _d.sent();
                    ((_c = parent.wizardUI.dialog) === null || _c === void 0 ? void 0 : _c.querySelector('mwc-button[slot="primaryAction"]')).click();
                    return [4 /*yield*/, parent.updateComplete];
                case 5:
                    _d.sent();
                    testing_1.expect(doc.querySelector(':root > IED[name="IED1"] > AccessPoint > Server > ' +
                        'LDevice[inst="CircuitBreaker_CB1"] > LN0 > GSEControl > ' +
                        'IEDName[apRef="P1"][ldInst="CircuitBreaker_CB1"][lnClass="CSWI"]')).to.exist;
                    return [2 /*return*/];
            }
        });
    }); });
});
var templateObject_1;
