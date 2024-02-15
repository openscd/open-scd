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
var NewProject_js_1 = require("../../../src/menu/NewProject.js");
describe('NewProject loader', function () {
    customElements.define('new-project-plugin', NewProject_js_1["default"]);
    var parent;
    var element;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      <mock-open-scd><new-project-plugin></new-project-plugin></mock-open-scd>\n    "], ["\n      <mock-open-scd><new-project-plugin></new-project-plugin></mock-open-scd>\n    "]))))];
                case 1:
                    parent = _a.sent();
                    element = parent.getActivePlugin();
                    return [2 /*return*/];
            }
        });
    }); });
    it('creates an empty Edition 2.1 project on wizard primary button click', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        return __generator(this, function (_m) {
            switch (_m.label) {
                case 0:
                    element.run();
                    return [4 /*yield*/, element.updateComplete];
                case 1:
                    _m.sent();
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                case 2:
                    _m.sent(); // await animation
                    (parent.wizardUI.shadowRoot.querySelector('mwc-button[slot="primaryAction"]')).click();
                    testing_1.expect((_a = parent.doc) === null || _a === void 0 ? void 0 : _a.querySelector('Header')).to.exist;
                    testing_1.expect((_c = (_b = parent.doc) === null || _b === void 0 ? void 0 : _b.querySelector('Header')) === null || _c === void 0 ? void 0 : _c.getAttribute('id')).to.equal(parent.docName.slice(0, -4));
                    testing_1.expect((_e = (_d = parent.doc) === null || _d === void 0 ? void 0 : _d.querySelector('SCL')) === null || _e === void 0 ? void 0 : _e.getAttribute('xmlns')).to.equal('http://www.iec.ch/61850/2003/SCL');
                    testing_1.expect((_g = (_f = parent.doc) === null || _f === void 0 ? void 0 : _f.querySelector('SCL')) === null || _g === void 0 ? void 0 : _g.getAttribute('version')).to.equal('2007');
                    testing_1.expect((_j = (_h = parent.doc) === null || _h === void 0 ? void 0 : _h.querySelector('SCL')) === null || _j === void 0 ? void 0 : _j.getAttribute('revision')).to.equal('B');
                    testing_1.expect((_l = (_k = parent.doc) === null || _k === void 0 ? void 0 : _k.querySelector('SCL')) === null || _l === void 0 ? void 0 : _l.getAttribute('release')).to.equal('4');
                    return [2 /*return*/];
            }
        });
    }); });
    it('creates an empty Edition 2 project on wizard primary button click', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        return __generator(this, function (_m) {
            switch (_m.label) {
                case 0:
                    element.run();
                    return [4 /*yield*/, parent.updateComplete];
                case 1:
                    _m.sent();
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                case 2:
                    _m.sent(); // await animation
                    (parent.wizardUI.dialog.querySelector('mwc-radio-list-item:nth-child(2)')).click();
                    return [4 /*yield*/, element.updateComplete];
                case 3:
                    _m.sent();
                    (parent.wizardUI.shadowRoot.querySelector('mwc-button[slot="primaryAction"]')).click();
                    testing_1.expect((_a = parent.doc) === null || _a === void 0 ? void 0 : _a.querySelector('Header')).to.exist;
                    testing_1.expect((_c = (_b = parent.doc) === null || _b === void 0 ? void 0 : _b.querySelector('Header')) === null || _c === void 0 ? void 0 : _c.getAttribute('id')).to.equal(parent.docName.slice(0, -4));
                    testing_1.expect((_e = (_d = parent.doc) === null || _d === void 0 ? void 0 : _d.querySelector('SCL')) === null || _e === void 0 ? void 0 : _e.getAttribute('xmlns')).to.equal('http://www.iec.ch/61850/2003/SCL');
                    testing_1.expect((_g = (_f = parent.doc) === null || _f === void 0 ? void 0 : _f.querySelector('SCL')) === null || _g === void 0 ? void 0 : _g.getAttribute('version')).to.equal('2007');
                    testing_1.expect((_j = (_h = parent.doc) === null || _h === void 0 ? void 0 : _h.querySelector('SCL')) === null || _j === void 0 ? void 0 : _j.getAttribute('revision')).to.equal('B');
                    testing_1.expect((_l = (_k = parent.doc) === null || _k === void 0 ? void 0 : _k.querySelector('SCL')) === null || _l === void 0 ? void 0 : _l.getAttribute('release')).to.be["null"];
                    return [2 /*return*/];
            }
        });
    }); });
    it('creates an empty Edition 1 project on wizard primary button click', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        return __generator(this, function (_m) {
            switch (_m.label) {
                case 0:
                    element.run();
                    return [4 /*yield*/, parent.updateComplete];
                case 1:
                    _m.sent();
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                case 2:
                    _m.sent(); // await animation
                    (parent.wizardUI.dialog.querySelector('mwc-radio-list-item:nth-child(1)')).click();
                    return [4 /*yield*/, parent.updateComplete];
                case 3:
                    _m.sent();
                    (parent.wizardUI.shadowRoot.querySelector('mwc-button[slot="primaryAction"]')).click();
                    testing_1.expect((_a = parent.doc) === null || _a === void 0 ? void 0 : _a.querySelector('Header')).to.exist;
                    testing_1.expect((_c = (_b = parent.doc) === null || _b === void 0 ? void 0 : _b.querySelector('Header')) === null || _c === void 0 ? void 0 : _c.getAttribute('id')).to.equal(parent.docName.slice(0, -4));
                    testing_1.expect((_e = (_d = parent.doc) === null || _d === void 0 ? void 0 : _d.querySelector('SCL')) === null || _e === void 0 ? void 0 : _e.getAttribute('xmlns')).to.equal('http://www.iec.ch/61850/2003/SCL');
                    testing_1.expect((_g = (_f = parent.doc) === null || _f === void 0 ? void 0 : _f.querySelector('SCL')) === null || _g === void 0 ? void 0 : _g.getAttribute('version')).to.be["null"];
                    testing_1.expect((_j = (_h = parent.doc) === null || _h === void 0 ? void 0 : _h.querySelector('SCL')) === null || _j === void 0 ? void 0 : _j.getAttribute('revision')).to.be["null"];
                    testing_1.expect((_l = (_k = parent.doc) === null || _k === void 0 ? void 0 : _k.querySelector('SCL')) === null || _l === void 0 ? void 0 : _l.getAttribute('release')).to.be["null"];
                    return [2 /*return*/];
            }
        });
    }); });
});
var templateObject_1;
