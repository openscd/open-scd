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
var lit_translate_1 = require("lit-translate");
var testing_1 = require("@open-wc/testing");
require("../../src/addons/Settings.js");
var Settings_js_1 = require("../../src/addons/Settings.js");
describe('OSCD-Settings', function () {
    var element;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    localStorage.clear();
                    return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<oscd-settings .host=", "></oscd-settings>"], ["<oscd-settings .host=", "></oscd-settings>"])), document))];
                case 1:
                    element = (_a.sent());
                    return [2 /*return*/];
            }
        });
    }); });
    it('initially has default settings', function () {
        return testing_1.expect(element).to.have.deep.property('settings', Settings_js_1.defaults);
    });
    it('stores settings to localStorage', function () {
        element.setSetting('theme', 'dark');
        testing_1.expect(localStorage.getItem('theme')).to.equal('dark');
    });
    it('retrieves settings from localStorage', function () {
        localStorage.setItem('language', 'de');
        testing_1.expect(element.settings).to.have.property('language', 'de');
    });
    it('saves chosen settings on save button click', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    element.settingsUI.show();
                    element.darkThemeUI.checked = true;
                    return [4 /*yield*/, element.darkThemeUI.updateComplete];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (element.settingsUI.querySelector('mwc-button[dialogAction="save"]')).click()];
                case 2:
                    _a.sent();
                    testing_1.expect(element.settings).to.have.property('theme', 'dark');
                    return [2 /*return*/];
            }
        });
    }); });
    it('resets settings to default on reset button click', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    element.settingsUI.show();
                    return [4 /*yield*/, element.settingsUI.updateComplete];
                case 1:
                    _a.sent();
                    element.setSetting('language', 'de');
                    testing_1.expect(element).to.not.have.deep.property('settings', Settings_js_1.defaults);
                    (element.settingsUI.querySelector('mwc-button[dialogAction="reset"]')).click();
                    testing_1.expect(element).to.have.deep.property('settings', Settings_js_1.defaults);
                    return [2 /*return*/];
            }
        });
    }); });
    it('saves chosen .nsdoc file and looks like latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
        var nsdocFile;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    element.settingsUI.show();
                    return [4 /*yield*/, element.settingsUI.updateComplete];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, fetch('/test/testfiles/nsdoc/IEC_61850-7-2.nsdoc').then(function (response) { return response.text(); })];
                case 2:
                    nsdocFile = _a.sent();
                    element.setSetting('IEC 61850-7-2', nsdocFile);
                    return [4 /*yield*/, element.requestUpdate()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, element.updateComplete];
                case 4:
                    _a.sent();
                    testing_1.expect(localStorage.getItem('IEC 61850-7-2')).to.eql(nsdocFile);
                    return [4 /*yield*/, testing_1.expect(element).shadowDom.to.equalSnapshot()];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('deletes a chosen .nsdoc file and looks like latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
        var nsdocFile;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    element.settingsUI.show();
                    return [4 /*yield*/, element.settingsUI.updateComplete];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, fetch('/test/testfiles/nsdoc/IEC_61850-7-2.nsdoc').then(function (response) { return response.text(); })];
                case 2:
                    nsdocFile = _a.sent();
                    element.setSetting('IEC 61850-7-2', nsdocFile);
                    return [4 /*yield*/, element.requestUpdate()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, element.updateComplete];
                case 4:
                    _a.sent();
                    (element.settingsUI.querySelector('mwc-icon[id="deleteNsdocItem"]')).click();
                    return [4 /*yield*/, element.requestUpdate()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, element.updateComplete];
                case 6:
                    _a.sent();
                    testing_1.expect(localStorage.getItem('IEC 61850-7-2')).to.equal(null);
                    return [4 /*yield*/, testing_1.expect(element).shadowDom.to.equalSnapshot()];
                case 7:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
}).afterAll(function () {
    lit_translate_1.registerTranslateConfig({ empty: function (key) { return "[" + key + "]"; } });
    // dirty hack to let other tests pass which rely on untranslated text
    lit_translate_1.use('test');
});
var templateObject_1;
