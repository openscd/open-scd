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
var Templates_js_1 = require("../../../src/editors/Templates.js");
describe('BDA wizarding editing integration', function () {
    if (customElements.get('templates-editor') === undefined)
        customElements.define('templates-editor', Templates_js_1["default"]);
    var doc;
    var parent;
    var templates;
    var dATypeList;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<mock-open-scd><templates-editor></templates-editor></mock-open-scd>"], ["<mock-open-scd><templates-editor></templates-editor></mock-open-scd>"]))))];
                case 1:
                    parent = _b.sent();
                    templates = parent.getActivePlugin();
                    return [4 /*yield*/, fetch('/test/testfiles/templates/datypes.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                case 2:
                    doc = _b.sent();
                    templates.doc = doc;
                    return [4 /*yield*/, templates.updateComplete];
                case 3:
                    _b.sent();
                    dATypeList = ((_a = templates.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('filtered-list[id="datypelist"]'));
                    return [2 /*return*/];
            }
        });
    }); });
    describe('defines a editBDaWizard to edit an existing BDA', function () {
        var nameField;
        var primayAction;
        var deleteButton;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        (dATypeList.querySelector('mwc-list-item[value="#Dummy.LLN0.Mod.SBOw"]')).click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _e.sent();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 2:
                        _e.sent(); // await animation
                        ((_b = (_a = parent.wizardUI) === null || _a === void 0 ? void 0 : _a.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('mwc-list-item[value="#Dummy.LLN0.Mod.SBOw>ctlVal"]')).click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 3:
                        _e.sent();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 4:
                        _e.sent(); // await animation
                        nameField = ((_c = parent.wizardUI.dialog) === null || _c === void 0 ? void 0 : _c.querySelector('wizard-textfield[label="name"]'));
                        primayAction = ((_d = parent.wizardUI.dialog) === null || _d === void 0 ? void 0 : _d.querySelector('mwc-button[slot="primaryAction"]'));
                        deleteButton = (Array.from(parent.wizardUI.dialog.querySelectorAll('mwc-menu > mwc-list-item')).find(function (item) { return item.innerHTML.includes('Remove'); }));
                        return [2 /*return*/];
                }
            });
        }); });
        it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.expect(parent.wizardUI.dialog).to.equalSnapshot()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('edits BDA element', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testing_1.expect(doc.querySelector('DAType[id="Dummy.LLN0.Mod.SBOw"] > BDA[name="ctlVal"]')).to.exist;
                        nameField.value = 'newCtlVal';
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _a.sent();
                        primayAction.click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 2:
                        _a.sent();
                        testing_1.expect(doc.querySelector('DAType[id="Dummy.LLN0.Mod.SBOw"] > BDA[name="ctlVal"]')).to.not.exist;
                        testing_1.expect(doc.querySelector('DAType[id="Dummy.LLN0.Mod.SBOw"] > BDA[name="newCtlVal"]')).to.exist;
                        return [2 /*return*/];
                }
            });
        }); });
        it('deletes the BDA element on delete button click', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testing_1.expect(doc.querySelector('DAType[id="Dummy.LLN0.Mod.SBOw"] > BDA[name="ctlVal"]')).to.exist;
                        testing_1.expect(doc.querySelectorAll('DAType[id="Dummy.LLN0.Mod.SBOw"] > BDA').length).to.equal(6);
                        deleteButton.click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _a.sent();
                        testing_1.expect(doc.querySelector('DAType[id="Dummy.LLN0.Mod.SBOw"] > BDA[name="ctlVal"]')).to.not.exist;
                        testing_1.expect(doc.querySelectorAll('DAType[id="Dummy.LLN0.Mod.SBOw"] > BDA').length).to.equal(5);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('defines a createBDaWizard to create a new BDA element', function () {
        var nameField;
        var descField;
        var sAddrField;
        var bTypeSelect;
        var valKindSelect;
        var valImportSelect;
        var primayAction;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        (dATypeList.querySelector('mwc-list-item[value="#Dummy.LLN0.Mod.SBOw"]')).click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _j.sent();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 2:
                        _j.sent(); // await animation
                        ((_a = parent.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelectorAll('mwc-menu > mwc-list-item')[1]).click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 3:
                        _j.sent();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 4:
                        _j.sent(); // await animation
                        nameField = ((_b = parent.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('wizard-textfield[label="name"]'));
                        descField = ((_c = parent.wizardUI.dialog) === null || _c === void 0 ? void 0 : _c.querySelector('wizard-textfield[label="desc"]'));
                        sAddrField = ((_d = parent.wizardUI.dialog) === null || _d === void 0 ? void 0 : _d.querySelector('wizard-textfield[label="sAddr"]'));
                        bTypeSelect = ((_e = parent.wizardUI.dialog) === null || _e === void 0 ? void 0 : _e.querySelector('wizard-select[label="bType"]'));
                        valKindSelect = ((_f = parent.wizardUI.dialog) === null || _f === void 0 ? void 0 : _f.querySelector('wizard-select[label="valKind"]'));
                        valImportSelect = ((_g = parent.wizardUI.dialog) === null || _g === void 0 ? void 0 : _g.querySelector('wizard-checkbox[label="valImport"]'));
                        primayAction = ((_h = parent.wizardUI.dialog) === null || _h === void 0 ? void 0 : _h.querySelector('mwc-button[slot="primaryAction"]'));
                        return [2 /*return*/];
                }
            });
        }); });
        it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.expect(parent.wizardUI.dialog).to.equalSnapshot()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('creates a new BDA element', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testing_1.expect(doc.querySelector('DAType[id="Dummy.LLN0.Mod.SBOw"] > BDA[name="newBDAElement"]')).to.not.exist;
                        nameField.value = 'newBDAElement';
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _a.sent();
                        bTypeSelect.value = 'BOOLEAN';
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 2:
                        _a.sent();
                        primayAction.click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 3:
                        _a.sent();
                        testing_1.expect(doc.querySelector('DAType[id="Dummy.LLN0.Mod.SBOw"] > BDA[name="newBDAElement"]:not([desc]):not([sAddr])[bType="BOOLEAN"]:not([valKind]):not([valImport])')).to.exist;
                        return [2 /*return*/];
                }
            });
        }); });
        it('creates yet another new BDA element', function () { return __awaiter(void 0, void 0, void 0, function () {
            var name, desc, sAddr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = 'newBDAElement2';
                        desc = 'newBDAdesc';
                        sAddr = 'myNewAddr';
                        testing_1.expect(doc.querySelector('DAType[id="Dummy.LLN0.Mod.SBOw"] > BDA[name="newBDAElement2"]')).to.not.exist;
                        nameField.value = name;
                        descField.nullable = false;
                        descField.value = desc;
                        sAddrField.nullable = false;
                        sAddrField.value = sAddr;
                        bTypeSelect.value = 'BOOLEAN';
                        valKindSelect.nullable = false;
                        valKindSelect.value = 'RO';
                        valImportSelect.nullable = false;
                        valImportSelect.maybeValue = 'true';
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _a.sent();
                        primayAction.click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 2:
                        _a.sent();
                        testing_1.expect(doc.querySelector("DAType[id=\"Dummy.LLN0.Mod.SBOw\"] >" +
                            ("BDA[name=\"" + name + "\"][desc=\"" + desc + "\"][sAddr=\"" + sAddr + "\"][bType=\"BOOLEAN\"]:not([type])[valKind=\"RO\"][valImport=\"true\"]"))).to.exist;
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
var templateObject_1;
