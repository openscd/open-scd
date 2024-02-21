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
require("../mock-open-scd.js");
describe('OpenSCD-Plugin', function () {
    var element;
    var doc;
    var docName = 'testDoc';
    afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 50); })];
                case 1:
                    _a.sent(); // await animation
                    localStorage.clear();
                    return [2 /*return*/];
            }
        });
    }); });
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('/test/testfiles/valid2007B4.scd')
                        .then(function (response) { return response.text(); })
                        .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                case 1:
                    doc = _a.sent();
                    return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<mock-open-scd .doc=", " .docName=", "></mock-open-scd>"], ["<mock-open-scd .doc=", " .docName=", "></mock-open-scd>"])), doc, docName))];
                case 2:
                    element = (_a.sent());
                    return [4 /*yield*/, element.updateComplete];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('stores default plugins on load', function () {
        return testing_1.expect(element).property('editors').to.have.lengthOf(6);
    });
    it('has Locale property', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            testing_1.expect(element).to.have.property('locale');
            return [2 /*return*/];
        });
    }); });
    it('has docs property', function () {
        testing_1.expect(element).to.have.property("docs").that.is.a('Object');
        testing_1.expect(element.docs[docName]).to.equal(doc);
    });
    describe('plugin manager dialog', function () {
        var firstEditorPlugin;
        var resetAction;
        var primaryAction;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        element.pluginUI.show();
                        return [4 /*yield*/, element.pluginUI.updateComplete];
                    case 1:
                        _a.sent();
                        firstEditorPlugin = (element.pluginList.querySelector('mwc-check-list-item:not([noninteractive])'));
                        resetAction = (element.pluginUI.querySelector('mwc-button[slot="secondaryAction"]'));
                        primaryAction = (element.pluginUI.querySelector('mwc-button[slot="primaryAction"]'));
                        return [2 /*return*/];
                }
            });
        }); });
        it('disables deselected plugins', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        firstEditorPlugin.click();
                        return [4 /*yield*/, element.updateComplete];
                    case 1:
                        _a.sent();
                        testing_1.expect(element).property('editors').to.have.lengthOf(5);
                        return [2 /*return*/];
                }
            });
        }); });
        it('enables selected plugins', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        element.pluginList.firstElementChild.click();
                        return [4 /*yield*/, element.updateComplete];
                    case 1:
                        _a.sent();
                        element.pluginList.firstElementChild.click();
                        return [4 /*yield*/, element.updateComplete];
                    case 2:
                        _a.sent();
                        testing_1.expect(element).property('editors').to.have.lengthOf(6);
                        return [2 /*return*/];
                }
            });
        }); });
        it('resets plugins to default on reset button click', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        element.pluginList.firstElementChild.click();
                        return [4 /*yield*/, element.updateComplete];
                    case 1:
                        _a.sent();
                        resetAction.click();
                        return [4 /*yield*/, element.updateComplete];
                    case 2:
                        _a.sent();
                        testing_1.expect(element).property('editors').to.have.lengthOf(6);
                        return [2 /*return*/];
                }
            });
        }); });
        it('opens the custom plugin dialog on add button click', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        primaryAction.click();
                        return [4 /*yield*/, element.updateComplete];
                    case 1:
                        _a.sent();
                        testing_1.expect(element)
                            .property('pluginDownloadUI')
                            .to.have.property('open', true);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('add custom plugin dialog', function () {
        var src;
        var name;
        var primaryAction;
        var menuKindOption;
        var validatorKindOption;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        src = (element.pluginDownloadUI.querySelector('#pluginSrcInput'));
                        name = (element.pluginDownloadUI.querySelector('#pluginNameInput'));
                        primaryAction = (element.pluginDownloadUI.querySelector('mwc-button[slot="primaryAction"]'));
                        element.pluginDownloadUI.show();
                        return [4 /*yield*/, element.pluginDownloadUI.updateComplete];
                    case 1:
                        _a.sent();
                        menuKindOption = (element.pluginDownloadUI.querySelector('#pluginKindList > mwc-radio-list-item[id="menu"]'));
                        validatorKindOption = (element.pluginDownloadUI.querySelector('#pluginKindList > mwc-radio-list-item[id="validator"]'));
                        return [2 /*return*/];
                }
            });
        }); });
        it('requires a name and a valid URL to add a plugin', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        primaryAction.click();
                        testing_1.expect(element.pluginDownloadUI).to.have.property('open', true);
                        src.value = 'http://example.com/plugin.js';
                        return [4 /*yield*/, src.updateComplete];
                    case 1:
                        _a.sent();
                        primaryAction.click();
                        testing_1.expect(element.pluginDownloadUI).to.have.property('open', true);
                        src.value = 'notaURL';
                        name.value = 'testName';
                        return [4 /*yield*/, src.updateComplete];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, name.updateComplete];
                    case 3:
                        _a.sent();
                        primaryAction.click();
                        testing_1.expect(element.pluginDownloadUI).to.have.property('open', true);
                        src.value = 'http://example.com/plugin.js';
                        return [4 /*yield*/, src.updateComplete];
                    case 4:
                        _a.sent();
                        primaryAction.click();
                        testing_1.expect(element.pluginDownloadUI).to.have.property('open', false);
                        return [2 /*return*/];
                }
            });
        }); });
        it('adds a new editor kind plugin on add button click', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        src.value = 'http://example.com/plugin.js';
                        name.value = 'testName';
                        return [4 /*yield*/, src.updateComplete];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, name.updateComplete];
                    case 2:
                        _a.sent();
                        primaryAction.click();
                        return [4 /*yield*/, element.requestUpdate()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, element.updateComplete];
                    case 4:
                        _a.sent();
                        testing_1.expect(element.editors).to.have.lengthOf(7);
                        return [2 /*return*/];
                }
            });
        }); });
        it('adds a new menu kind plugin on add button click', function () { return __awaiter(void 0, void 0, void 0, function () {
            var lengthMenuKindPlugins;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lengthMenuKindPlugins = element.menuEntries.length;
                        src.value = 'http://example.com/plugin.js';
                        name.value = 'testName';
                        menuKindOption.click();
                        return [4 /*yield*/, src.updateComplete];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, name.updateComplete];
                    case 2:
                        _a.sent();
                        primaryAction.click();
                        return [4 /*yield*/, element.updateComplete];
                    case 3:
                        _a.sent();
                        testing_1.expect(element.menuEntries).to.have.lengthOf(lengthMenuKindPlugins + 1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('sets requireDoc and position for new menu kind plugin', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        src.value = 'http://example.com/plugin.js';
                        name.value = 'testName';
                        menuKindOption.click();
                        return [4 /*yield*/, src.updateComplete];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, name.updateComplete];
                    case 2:
                        _a.sent();
                        primaryAction.click();
                        return [4 /*yield*/, element.updateComplete];
                    case 3:
                        _a.sent();
                        testing_1.expect(element.menuEntries[element.menuEntries.length - 1]).to.have.property('requireDoc');
                        testing_1.expect(element.menuEntries[element.menuEntries.length - 1]).to.have.property('position');
                        return [2 /*return*/];
                }
            });
        }); });
        it('adds a new validator kind plugin on add button click', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testing_1.expect(element.validators).to.have.lengthOf(2);
                        src.value = 'http://example.com/plugin.js';
                        name.value = 'testName';
                        validatorKindOption.click();
                        return [4 /*yield*/, src.updateComplete];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, name.updateComplete];
                    case 2:
                        _a.sent();
                        primaryAction.click();
                        return [4 /*yield*/, element.updateComplete];
                    case 3:
                        _a.sent();
                        testing_1.expect(element.validators).to.have.lengthOf(3);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
var templateObject_1;
