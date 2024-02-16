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
require("../../../../src/editors/substation/l-node-editor.js");
describe('l-node-editor wizarding editing integration', function () {
    var doc;
    var parent;
    var element;
    var primaryAction;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('/test/testfiles/zeroline/functions.scd')
                        .then(function (response) { return response.text(); })
                        .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                case 1:
                    doc = _a.sent();
                    return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<mock-wizard-editor\n          ><l-node-editor\n            .element=", "\n          ></l-node-editor\n        ></mock-wizard-editor>"], ["<mock-wizard-editor\n          ><l-node-editor\n            .element=", "\n          ></l-node-editor\n        ></mock-wizard-editor>"])), doc.querySelector('Substation > LNode[lnClass="CSWI"]')))];
                case 2:
                    parent = (_a.sent());
                    element = parent.querySelector('l-node-editor');
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
                        deleteButton = ((_a = element === null || element === void 0 ? void 0 : element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-fab[icon="delete"]'));
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('removes the attached LNode element from the document', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testing_1.expect(doc.querySelector('Substation > LNode[lnClass="CSWI"]')).to.exist;
                        return [4 /*yield*/, deleteButton.click()];
                    case 1:
                        _a.sent();
                        testing_1.expect(doc.querySelector('Substation > LNode[lnClass="CSWI"]')).to.not
                            .exist;
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('has a edit icon button that', function () {
        var prefixField;
        var lnInstField;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        element.element = doc.querySelector('SubFunction[name="myBaySubFunc"] > LNode[lnClass="XSWI"]');
                        ((_a = element === null || element === void 0 ? void 0 : element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-fab[icon="edit"]')).click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _e.sent();
                        return [4 /*yield*/, parent.wizardUI.updateComplete];
                    case 2:
                        _e.sent();
                        prefixField = ((_b = parent.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('wizard-textfield[label="prefix"]'));
                        lnInstField = ((_c = parent.wizardUI.dialog) === null || _c === void 0 ? void 0 : _c.querySelector('wizard-textfield[label="lnInst"]'));
                        primaryAction = ((_d = parent.wizardUI.dialog) === null || _d === void 0 ? void 0 : _d.querySelector('mwc-button[slot="primaryAction"]'));
                        return [4 /*yield*/, parent.updateComplete];
                    case 3:
                        _e.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('changes prefix attribute on primary action', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prefixField.value = 'newPref';
                        primaryAction.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _a.sent();
                        testing_1.expect(doc.querySelector('SubFunction[name="myBaySubFunc"] > LNode[lnClass="XSWI"]')).to.have.attribute('prefix', 'newPref');
                        return [2 /*return*/];
                }
            });
        }); });
        it('changes lnInst attribute on primary action', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lnInstField.value = '31';
                        primaryAction.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _a.sent();
                        testing_1.expect(doc.querySelector('SubFunction[name="myBaySubFunc"] > LNode[lnClass="XSWI"]')).to.have.attribute('lnInst', '31');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('has a copy content icon button that', function () {
        var contentCopyButton;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        element.element = doc.querySelector('SubFunction[name="mySubFunc2"] > LNode[lnClass="XSWI"]');
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _b.sent();
                        contentCopyButton = ((_a = element === null || element === void 0 ? void 0 : element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-fab[icon="content_copy"]'));
                        return [4 /*yield*/, parent.updateComplete];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('adds new LNode element', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contentCopyButton.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _a.sent();
                        testing_1.expect(doc.querySelectorAll('SubFunction[name="mySubFunc2"] > LNode[lnClass="XSWI"]')).to.have.lengthOf(3);
                        return [2 /*return*/];
                }
            });
        }); });
        it('makes sure the lnInst is always unique', function () { return __awaiter(void 0, void 0, void 0, function () {
            var lnInsts, duplicates;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contentCopyButton.click();
                        contentCopyButton.click();
                        contentCopyButton.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _a.sent();
                        testing_1.expect(doc.querySelectorAll('SubFunction[name="mySubFunc2"] > LNode[lnClass="XSWI"]')).to.have.lengthOf(5);
                        lnInsts = Array.from(doc.querySelectorAll('SubFunction[name="mySubFunc2"] > LNode[lnClass="XSWI"]')).map(function (lNode) { return lNode.getAttribute('lnInst'); });
                        duplicates = lnInsts.filter(function (item, index) { return lnInsts.indexOf(item) !== index; });
                        testing_1.expect(duplicates).to.lengthOf(0);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
var templateObject_1;
