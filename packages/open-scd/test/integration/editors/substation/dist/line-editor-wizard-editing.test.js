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
require("../../../../src/editors/substation/line-editor.js");
var openAndCancelMenu = function (parent, element) { return __awaiter(void 0, void 0, Promise, function () {
    var lnodMenuItem, secondaryAction;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                testing_1.expect(parent.wizardUI.dialog).to.be.undefined;
                (_a = element === null || element === void 0 ? void 0 : element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector("mwc-icon-button[icon='playlist_add']").click();
                lnodMenuItem = element.shadowRoot.querySelector("mwc-list-item[value='LNode']");
                lnodMenuItem.click();
                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
            case 1:
                _c.sent(); // await animation
                testing_1.expect(parent.wizardUI.dialog).to.exist;
                secondaryAction = ((_b = parent.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('mwc-button[slot="secondaryAction"][dialogaction="close"]'));
                secondaryAction.click();
                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
            case 2:
                _c.sent(); // await animation
                testing_1.expect(parent.wizardUI.dialog).to.be.undefined;
                return [2 /*return*/];
        }
    });
}); };
describe('line-editor wizarding editing integration', function () {
    var doc;
    var parent;
    var element;
    describe('edit wizard', function () {
        var nameField;
        var primaryAction;
        var secondaryAction;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/editors/substation/Line.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        doc = _e.sent();
                        return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<mock-wizard-editor\n            ><line-editor\n              .element=", "\n            ></line-editor\n          ></mock-wizard-editor>"], ["<mock-wizard-editor\n            ><line-editor\n              .element=", "\n            ></line-editor\n          ></mock-wizard-editor>"])), doc.querySelector('Line[name="Berlin"]')))];
                    case 2:
                        parent = (_e.sent());
                        element = parent.querySelector('line-editor');
                        return [4 /*yield*/, ((_a = element === null || element === void 0 ? void 0 : element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-icon-button[icon="edit"]')).click()];
                    case 3:
                        _e.sent();
                        return [4 /*yield*/, parent.updateComplete];
                    case 4:
                        _e.sent();
                        nameField = ((_b = parent.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('wizard-textfield[label="name"]'));
                        secondaryAction = ((_c = parent.wizardUI.dialog) === null || _c === void 0 ? void 0 : _c.querySelector('mwc-button[slot="secondaryAction"]'));
                        primaryAction = ((_d = parent.wizardUI.dialog) === null || _d === void 0 ? void 0 : _d.querySelector('mwc-button[slot="primaryAction"]'));
                        return [2 /*return*/];
                }
            });
        }); });
        it('closes on secondary action', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        secondaryAction.click();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 1:
                        _a.sent(); // await animation
                        testing_1.expect(parent.wizardUI.dialog).to.not.exist;
                        return [2 /*return*/];
                }
            });
        }); });
        it('does not change name attribute if not unique within parent element', function () { return __awaiter(void 0, void 0, void 0, function () {
            var oldName;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        oldName = nameField.value;
                        nameField.value = 'Munich';
                        primaryAction.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _b.sent();
                        testing_1.expect((_a = doc.querySelector('Line[name="Berlin"]')) === null || _a === void 0 ? void 0 : _a.getAttribute('name')).to.equal(oldName);
                        return [2 /*return*/];
                }
            });
        }); });
        it('changes desc attribute on primary action', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        parent.wizardUI.inputs[1].value = 'newDesc';
                        primaryAction.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _b.sent();
                        testing_1.expect((_a = doc.querySelector('Line[name="Berlin"]')) === null || _a === void 0 ? void 0 : _a.getAttribute('desc')).to.equal('newDesc');
                        return [2 /*return*/];
                }
            });
        }); });
        it('changes type attribute on primary action', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        parent.wizardUI.inputs[2].value = 'newType';
                        primaryAction.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _b.sent();
                        testing_1.expect((_a = doc.querySelector('Line[name="Berlin"]')) === null || _a === void 0 ? void 0 : _a.getAttribute('type')).to.equal('newType');
                        return [2 /*return*/];
                }
            });
        }); });
        it('changes nomFreq attribute on primary action', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        parent.wizardUI.inputs[3].value = '50';
                        primaryAction.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _b.sent();
                        testing_1.expect((_a = doc.querySelector('Line[name="Berlin"]')) === null || _a === void 0 ? void 0 : _a.getAttribute('nomFreq')).to.equal('50');
                        return [2 /*return*/];
                }
            });
        }); });
        it('changes numPhases attribute on primary action', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        parent.wizardUI.inputs[4].value = '3';
                        primaryAction.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _b.sent();
                        testing_1.expect((_a = doc.querySelector('Line[name="Berlin"]')) === null || _a === void 0 ? void 0 : _a.getAttribute('numPhases')).to.equal('3');
                        return [2 /*return*/];
                }
            });
        }); });
        describe('has a delete icon button that', function () {
            var deleteButton;
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            deleteButton = ((_a = element === null || element === void 0 ? void 0 : element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-icon-button[icon="delete"]'));
                            return [4 /*yield*/, parent.updateComplete];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('removes the Line element from the document', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            testing_1.expect(doc.querySelector('Line[name="Berlin"]')).to.exist;
                            return [4 /*yield*/, deleteButton.click()];
                        case 1:
                            _a.sent();
                            testing_1.expect(doc.querySelector('Line[name="Berlin"]')).to.not.exist;
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe('Open add wizard', function () {
        var doc;
        var parent;
        var element;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/editors/substation/Line.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        doc = _a.sent();
                        return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<mock-wizard-editor\n            ><line-editor\n              .element=", "\n            ></line-editor\n          ></mock-wizard-editor>"], ["<mock-wizard-editor\n            ><line-editor\n              .element=", "\n            ></line-editor\n          ></mock-wizard-editor>"])), doc.querySelector('Line[name="Berlin"]')))];
                    case 2:
                        parent = (_a.sent());
                        element = parent.querySelector('line-editor');
                        return [4 /*yield*/, parent.updateComplete];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('Should open the same wizard for the second time', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, openAndCancelMenu(parent, element)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, openAndCancelMenu(parent, element)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
var templateObject_1, templateObject_2;
