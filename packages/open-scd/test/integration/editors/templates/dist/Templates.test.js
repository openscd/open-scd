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
require("../../../mock-open-scd.js");
var Templates_js_1 = require("../../../../src/editors/Templates.js");
var foundation_js_1 = require("../../../../src/foundation.js");
describe('Templates Plugin', function () {
    customElements.define('templates-plugin', Templates_js_1["default"]);
    var element;
    var parent;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<mock-open-scd><templates-plugin></templates-plugin></mock-open-scd>"], ["<mock-open-scd><templates-plugin></templates-plugin></mock-open-scd>"]))))];
                case 1:
                    parent = _a.sent();
                    element = parent.getActivePlugin();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('without a doc loaded', function () {
        it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.expect(element).shadowDom.to.equalSnapshot()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('with a doc loaded', function () {
        var doc;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/templates/datypes.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        doc = _a.sent();
                        element.doc = doc;
                        return [4 /*yield*/, element.requestUpdate()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.expect(element).shadowDom.to.equalSnapshot()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        describe('having a LNodeType element list that', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            parent.workflow.length = 0;
                            ((_a = element === null || element === void 0 ? void 0 : element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll('filtered-list')[0].querySelector('mwc-list-item')).click();
                            return [4 /*yield*/, parent.requestUpdate()];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('opens a LNodeType edit wizard on list element click', function () {
                var _a;
                return testing_1.expect((_a = parent.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('wizard-textfield[label="lnClass"]')).to.exist;
            });
            it('allows to reopen the LNodeType edit wizard for the same element', function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            parent.dispatchEvent(foundation_js_1.newWizardEvent());
                            return [4 /*yield*/, parent.requestUpdate()];
                        case 1:
                            _c.sent();
                            ((_a = element === null || element === void 0 ? void 0 : element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('filtered-list:nth-of-type(1) > mwc-list-item')).click();
                            return [4 /*yield*/, parent.requestUpdate()];
                        case 2:
                            _c.sent();
                            testing_1.expect((_b = parent.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('wizard-textfield[label="lnClass"]')).to.exist;
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('having a DOType element list that', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            parent.workflow.length = 0;
                            ((_a = element === null || element === void 0 ? void 0 : element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll('filtered-list')[1].querySelector('mwc-list-item')).click();
                            return [4 /*yield*/, parent.requestUpdate()];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('opens a DOType edit wizard on list element click', function () {
                var _a;
                return testing_1.expect((_a = parent.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('wizard-textfield[label="CDC"]')).to.exist;
            });
            it('allows to reopen the DOType edit wizard for the same element', function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            parent.dispatchEvent(foundation_js_1.newWizardEvent());
                            return [4 /*yield*/, parent.requestUpdate()];
                        case 1:
                            _c.sent();
                            ((_a = element === null || element === void 0 ? void 0 : element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll('filtered-list')[1].querySelector('mwc-list-item')).click();
                            return [4 /*yield*/, parent.requestUpdate()];
                        case 2:
                            _c.sent();
                            testing_1.expect((_b = parent.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('wizard-textfield[label="CDC"]')).to.exist;
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('having a DAType element list that', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            parent.workflow.length = 0;
                            ((_a = element === null || element === void 0 ? void 0 : element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll('filtered-list')[2].querySelector('mwc-list-item')).click();
                            return [4 /*yield*/, parent.requestUpdate()];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('opens a DAType edit wizard on list element click', function () {
                return testing_1.expect(parent.wizardUI.dialog).to.exist;
            });
            it('allows to reopen the DAType edit wizard for the same element', function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            parent.dispatchEvent(foundation_js_1.newWizardEvent());
                            return [4 /*yield*/, parent.requestUpdate()];
                        case 1:
                            _b.sent();
                            ((_a = element === null || element === void 0 ? void 0 : element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll('filtered-list')[3].querySelector('mwc-list-item')).click();
                            return [4 /*yield*/, parent.requestUpdate()];
                        case 2:
                            _b.sent();
                            testing_1.expect(parent.wizardUI.dialog).to.exist;
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('having a EnumType element list that', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            parent.workflow.length = 0;
                            ((_a = element === null || element === void 0 ? void 0 : element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll('filtered-list')[3].querySelector('mwc-list-item')).click();
                            return [4 /*yield*/, parent.requestUpdate()];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('opens a EnumType edit wizard on list element click', function () {
                return testing_1.expect(parent.wizardUI.dialog).to.exist;
            });
            it('allows to reopen the EnumType edit wizard for the same element', function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            parent.dispatchEvent(foundation_js_1.newWizardEvent());
                            return [4 /*yield*/, parent.requestUpdate()];
                        case 1:
                            _b.sent();
                            ((_a = element === null || element === void 0 ? void 0 : element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll('filtered-list')[3].querySelector('mwc-list-item')).click();
                            return [4 /*yield*/, parent.requestUpdate()];
                        case 2:
                            _b.sent();
                            testing_1.expect(parent.wizardUI.dialog).to.exist;
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe('with a doc loaded missing a datatypetemplates section', function () {
        var doc;
        var parent;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/templates/missingdatatypes.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        doc = _a.sent();
                        return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<mock-open-scd\n          ><templates-plugin .doc=", "></templates-plugin\n        ></mock-open-scd>"], ["<mock-open-scd\n          ><templates-plugin .doc=", "></templates-plugin\n        ></mock-open-scd>"])), doc))];
                    case 2:
                        parent = _a.sent();
                        element = parent.getActivePlugin();
                        return [4 /*yield*/, element.updateComplete];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('has a mwc-fab', function () {
            var _a;
            testing_1.expect((_a = element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-fab')).to.exist;
        });
        it('adds a DataTypeTemplates on floating action button click', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        testing_1.expect(doc.querySelector('DataTypeTemplates')).to.not.exist;
                        ((_b = (_a = parent === null || parent === void 0 ? void 0 : parent.querySelector('templates-plugin')) === null || _a === void 0 ? void 0 : _a.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector('mwc-fab')).click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _c.sent();
                        testing_1.expect(parent
                            .querySelector('templates-plugin')
                            .doc.querySelector('DataTypeTemplates')).to.exist;
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('with a doc loaded having a datatypetemplates section', function () {
        var doc;
        var parent;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/templates/datypes.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        doc = _a.sent();
                        return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_3 || (templateObject_3 = __makeTemplateObject(["<mock-open-scd\n          ><templates-plugin .doc=", "></templates-plugin\n        ></mock-open-scd>"], ["<mock-open-scd\n          ><templates-plugin .doc=", "></templates-plugin\n        ></mock-open-scd>"])), doc))];
                    case 2:
                        parent = _a.sent();
                        element = parent.getActivePlugin();
                        return [4 /*yield*/, element.updateComplete];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('opens an add enumtype wizard', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        testing_1.expect(parent.wizardUI.dialogs.length).to.equal(0);
                        ((_b = (_a = parent === null || parent === void 0 ? void 0 : parent.querySelector('templates-plugin')) === null || _a === void 0 ? void 0 : _a.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelectorAll('mwc-icon-button[icon="playlist_add"]')[2]).click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 2:
                        _c.sent(); // await animation
                        testing_1.expect(parent.wizardUI.dialogs.length).to.equal(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('adding an EnumType with the enumtype wizard', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        testing_1.expect(doc.querySelectorAll('EnumType').length).to.equal(4);
                        ((_b = (_a = parent === null || parent === void 0 ? void 0 : parent.querySelector('templates-plugin')) === null || _a === void 0 ? void 0 : _a.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector('section:last-child mwc-icon-button[icon="playlist_add"]')).click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _d.sent();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 2:
                        _d.sent(); // await animation
                        parent.wizardUI.inputs[1].value = 'myID';
                        return [4 /*yield*/, parent.updateComplete];
                    case 3:
                        _d.sent();
                        ((_c = parent.wizardUI.dialog) === null || _c === void 0 ? void 0 : _c.querySelector('mwc-button[slot="primaryAction"]')).click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 4:
                        _d.sent();
                        testing_1.expect(doc.querySelectorAll('EnumType').length).to.equal(5);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
var templateObject_1, templateObject_2, templateObject_3;
