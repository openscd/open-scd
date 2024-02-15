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
require("../../mock-open-scd.js");
var UpdateDescriptionABB_js_1 = require("../../../src/menu/UpdateDescriptionABB.js");
describe('Update method for desc attributes in ABB IEDs', function () {
    if (customElements.get('update-description-abb') === undefined)
        customElements.define('update-description-abb', UpdateDescriptionABB_js_1["default"]);
    var parent;
    var element;
    var doc;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('/test/testfiles/updatedesc/updatedescABB.scd')
                        .then(function (response) { return response.text(); })
                        .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                case 1:
                    doc = _a.sent();
                    return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      <mock-open-scd\n        ><update-description-abb></update-description-abb\n      ></mock-open-scd>\n    "], ["\n      <mock-open-scd\n        ><update-description-abb></update-description-abb\n      ></mock-open-scd>\n    "]))))];
                case 2:
                    parent = _a.sent();
                    element = parent.getActivePlugin();
                    element.doc = doc;
                    element.run();
                    return [4 /*yield*/, parent.requestUpdate()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('creates desc attributes for ExtRef elements with existing intAddr attribute', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    testing_1.expect(doc.querySelector('IED[name="IED1"] LN[lnClass="CSWI"][inst="1"] ExtRef:not([desc])')).to.exist;
                    (_b = (_a = parent.wizardUI) === null || _a === void 0 ? void 0 : _a.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('mwc-button[slot="primaryAction"]').click();
                    return [4 /*yield*/, parent.updateComplete];
                case 1:
                    _c.sent();
                    testing_1.expect(doc.querySelector('IED[name="IED1"] LN[lnClass="CSWI"][inst="1"] ExtRef[desc="GOOSERCV_BIN.3.I1"]')).to.exist;
                    return [2 /*return*/];
            }
        });
    }); });
    it('does not create desc attributes for ExtRef elements with missing intAddr attribute', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    testing_1.expect(doc.querySelector('IED[name="IED1"] LN[lnClass="CSWI"][inst="2"] ExtRef:not([desc])')).to.exist;
                    (_b = (_a = parent.wizardUI) === null || _a === void 0 ? void 0 : _a.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('mwc-button[slot="primaryAction"]').click();
                    return [4 /*yield*/, parent.updateComplete];
                case 1:
                    _c.sent();
                    testing_1.expect(doc.querySelector('IED[name="IED1"] LN[lnClass="CSWI"][inst="2"] ExtRef:not([desc])')).to.exist;
                    return [2 /*return*/];
            }
        });
    }); });
});
var templateObject_1;
