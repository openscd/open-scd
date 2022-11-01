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
var CompareIED_js_1 = require("../../../src/menu/CompareIED.js");
describe('Compare IED Plugin', function () {
    if (customElements.get('compare-ied') === undefined)
        customElements.define('compare-ied', CompareIED_js_1["default"]);
    var plugin;
    var doc;
    var template;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<compare-ied></compare-ied>"], ["<compare-ied></compare-ied>"]))))];
                case 1:
                    plugin = _a.sent();
                    return [4 /*yield*/, fetch('/test/testfiles/menu/compare-ied-changed.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                case 2:
                    doc = _a.sent();
                    return [4 /*yield*/, fetch('/test/testfiles/menu/compare-ied-original.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                case 3:
                    template = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('show template project selection dialog', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        plugin.doc = doc;
                        plugin.run();
                        return [4 /*yield*/, plugin.requestUpdate()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('after closing the dialog everything set to undefined', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testing_1.expect(plugin.templateDoc).to.be.undefined;
                        testing_1.expect(plugin.selectedProjectIed).to.be.undefined;
                        testing_1.expect(plugin.selectedTemplateIed).to.be.undefined;
                        plugin['onClosed']();
                        return [4 /*yield*/, plugin.requestUpdate()];
                    case 1:
                        _a.sent();
                        testing_1.expect(plugin.templateDoc).to.be.undefined;
                        testing_1.expect(plugin.selectedProjectIed).to.be.undefined;
                        testing_1.expect(plugin.selectedTemplateIed).to.be.undefined;
                        return [2 /*return*/];
                }
            });
        }); });
        it('looks like its latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.expect(plugin.dialog).to.equalSnapshot()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('show ied selection lists dialog', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        plugin.doc = doc;
                        plugin.templateDoc = template;
                        plugin.run();
                        return [4 /*yield*/, plugin.requestUpdate()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('expect the correct number of IEDs from project', function () {
            testing_1.expect(plugin.ieds).to.have.length(5);
        });
        it('expect the correct number of IEDs from template project', function () {
            testing_1.expect(plugin.templateIeds).to.have.length(4);
        });
        it('after closing the dialog everything set to undefined', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testing_1.expect(plugin.templateDoc).to.not.be.undefined;
                        testing_1.expect(plugin.selectedProjectIed).to.be.undefined;
                        testing_1.expect(plugin.selectedTemplateIed).to.be.undefined;
                        plugin['onClosed']();
                        return [4 /*yield*/, plugin.requestUpdate()];
                    case 1:
                        _a.sent();
                        // expect(plugin.templateDoc).to.be.undefined;
                        testing_1.expect(plugin.selectedProjectIed).to.be.undefined;
                        testing_1.expect(plugin.selectedTemplateIed).to.be.undefined;
                        return [2 /*return*/];
                }
            });
        }); });
        it('looks like its latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.expect(plugin.dialog).to.equalSnapshot()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('show compare dialog with no differences', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        plugin.doc = doc;
                        plugin.templateDoc = template;
                        plugin.selectedProjectIed = (_a = doc.querySelector('IED[name="FieldC_QA1_QB1_QB2_QC9"]')) !== null && _a !== void 0 ? _a : undefined;
                        plugin.selectedTemplateIed = (_b = template.querySelector('IED[name="FieldC_QA1_QB1_QB2_QC9"]')) !== null && _b !== void 0 ? _b : undefined;
                        plugin.run();
                        return [4 /*yield*/, plugin.requestUpdate()];
                    case 1:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('looks like its latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.expect(plugin.dialog).to.equalSnapshot()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('show compare dialog with differences', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        plugin.doc = doc;
                        plugin.templateDoc = template;
                        plugin.selectedProjectIed = (_a = doc.querySelector('IED[name="FieldA_QA1_QB1_QB2_QC9"]')) !== null && _a !== void 0 ? _a : undefined;
                        plugin.selectedTemplateIed = (_b = template.querySelector('IED[name="FieldA_QA1_QB1_QB2_QC9"]')) !== null && _b !== void 0 ? _b : undefined;
                        plugin.run();
                        return [4 /*yield*/, plugin.requestUpdate()];
                    case 1:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('after closing the dialog everything set to undefined', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testing_1.expect(plugin.templateDoc).to.not.be.undefined;
                        testing_1.expect(plugin.selectedProjectIed).to.not.be.undefined;
                        testing_1.expect(plugin.selectedTemplateIed).to.not.be.undefined;
                        plugin['onClosed']();
                        return [4 /*yield*/, plugin.requestUpdate()];
                    case 1:
                        _a.sent();
                        testing_1.expect(plugin.selectedProjectIed).to.be.undefined;
                        testing_1.expect(plugin.selectedTemplateIed).to.be.undefined;
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
var templateObject_1;
