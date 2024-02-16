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
var limits_js_1 = require("../../../../src/wizards/foundation/limits.js");
describe('DOType wizards', function () {
    if (customElements.get('templates-editor') === undefined)
        customElements.define('templates-editor', Templates_js_1["default"]);
    var doc;
    var parent;
    var templates;
    var dOTypeList;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, fetch('/test/testfiles/templates/dotypes.scd')
                        .then(function (response) { return response.text(); })
                        .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                case 1:
                    doc = _b.sent();
                    return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<mock-open-scd\n        ><templates-editor .doc=", "></templates-editor\n      ></mock-open-scd>"], ["<mock-open-scd\n        ><templates-editor .doc=", "></templates-editor\n      ></mock-open-scd>"])), doc))];
                case 2:
                    parent = _b.sent();
                    templates = parent.getActivePlugin();
                    return [4 /*yield*/, parent.updateComplete];
                case 3:
                    _b.sent();
                    dOTypeList = ((_a = templates.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('filtered-list[id="dotypelist"]'));
                    return [2 /*return*/];
            }
        });
    }); });
    describe('defines a createDOTypeWizard', function () {
        var selector;
        var idField;
        var cdcField;
        var primayAction;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var button;
            var _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        button = ((_a = templates === null || templates === void 0 ? void 0 : templates.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll('mwc-icon-button[icon="playlist_add"]')[1]);
                        button.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _f.sent();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 2:
                        _f.sent(); // await animation
                        selector = ((_b = parent.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('mwc-select[label="values"]'));
                        idField = ((_c = parent.wizardUI.dialog) === null || _c === void 0 ? void 0 : _c.querySelector('wizard-textfield[label="id"]'));
                        cdcField = ((_d = parent.wizardUI.dialog) === null || _d === void 0 ? void 0 : _d.querySelector('wizard-textfield[label="cdc"]'));
                        primayAction = ((_e = parent.wizardUI.dialog) === null || _e === void 0 ? void 0 : _e.querySelector('mwc-button[slot="primaryAction"]'));
                        return [2 /*return*/];
                }
            });
        }); });
        it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // prettier does not support escaping in regexes of the /v flag
                    return [4 /*yield*/, testing_1.expect(parent.wizardUI.dialog).dom.to.equalSnapshot({
                            ignoreAttributes: [
                                {
                                    tags: ['wizard-textfield'],
                                    attributes: ['pattern']
                                },
                            ]
                        })];
                    case 1:
                        // prettier does not support escaping in regexes of the /v flag
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        // work around, because the escapes get removed in snapshot by prettier
        it('should have correct pattern', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                testing_1.expect(parent.wizardUI.dialog.querySelectorAll('wizard-textfield[pattern]')
                    .length).to.equal(3);
                testing_1.expect(parent.wizardUI
                    .dialog.querySelectorAll('wizard-textfield[pattern]')[0]
                    .getAttribute('pattern')).to.equal(limits_js_1.patterns.nmToken);
                testing_1.expect(parent.wizardUI
                    .dialog.querySelectorAll('wizard-textfield[pattern]')[1]
                    .getAttribute('pattern')).to.equal(limits_js_1.patterns.normalizedString);
                testing_1.expect(parent.wizardUI
                    .dialog.querySelectorAll('wizard-textfield[pattern]')[2]
                    .getAttribute('pattern')).to.equal(limits_js_1.patterns.cdc);
                return [2 /*return*/];
            });
        }); });
        it('allows to add empty DOTypes to the project', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testing_1.expect(doc.querySelector('DOType[id="myGeneralDOType"]')).to.not.exist;
                        idField.maybeValue = 'myGeneralDOType';
                        cdcField.maybeValue = 'SPS';
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _a.sent();
                        primayAction.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 2:
                        _a.sent();
                        testing_1.expect(doc.querySelector('DOType[id="myGeneralDOType"]')).to.exist;
                        return [2 /*return*/];
                }
            });
        }); });
        it('allows to define CDC only for empty DOType creation', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, cdcField.updateComplete];
                    case 1:
                        _a.sent();
                        testing_1.expect(cdcField.disabled).to.not.be["true"];
                        selector.value = 'OpenSCD_ENS_Health';
                        return [4 /*yield*/, cdcField.requestUpdate()];
                    case 2:
                        _a.sent();
                        testing_1.expect(cdcField.disabled).to.be["true"];
                        return [2 /*return*/];
                }
            });
        }); });
        it('requires CDC definition for empty DOTypes', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testing_1.expect(doc.querySelector('DOType[id="myGeneralDOType"]')).to.not.exist;
                        idField.maybeValue = 'myGeneralDOType';
                        cdcField.maybeValue = null;
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _a.sent();
                        primayAction.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 2:
                        _a.sent();
                        testing_1.expect(doc.querySelector('DOType[id="myGeneralDOType"]')).to.not.exist;
                        return [2 /*return*/];
                }
            });
        }); });
        it('respects the sequence defined in the standard', function () { return __awaiter(void 0, void 0, void 0, function () {
            var element;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        idField.maybeValue = 'myGeneralDOType';
                        cdcField.maybeValue = 'SPS';
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _c.sent();
                        primayAction.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 2:
                        _c.sent();
                        element = doc.querySelector('DOType[id="myGeneralDOType"]');
                        testing_1.expect((_a = element === null || element === void 0 ? void 0 : element.nextElementSibling) === null || _a === void 0 ? void 0 : _a.tagName).to.equal('DOType');
                        testing_1.expect((_b = element === null || element === void 0 ? void 0 : element.previousElementSibling) === null || _b === void 0 ? void 0 : _b.tagName).to.equal('LNodeType');
                        return [2 /*return*/];
                }
            });
        }); });
        it('recursively add missing! subsequent EnumType elements', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testing_1.expect(doc.querySelector('DOType[id="myENSHealth"]')).to.not.exist;
                        testing_1.expect(doc.querySelector('EnumType[id="HealthKind"]')).to.not.exist;
                        selector.value = 'OpenSCD_ENS_Health';
                        idField.maybeValue = 'myENSHealth';
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _a.sent();
                        primayAction.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 2:
                        _a.sent();
                        testing_1.expect(doc.querySelector('DOType[id="myENSHealth"]')).to.exist;
                        testing_1.expect(doc.querySelector('EnumType[id="HealthKind"]')).to.exist;
                        testing_1.expect(doc.querySelectorAll('EnumType[id="HealthKind"]').length).to.equal(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('recursively add missing! subsequent DAType elements', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testing_1.expect(doc.querySelector('DAType[id="OpenSCD_AnalogueValue_INT32"]')).to
                            .not.exist;
                        selector.value = 'OpenSCD_MV_int';
                        idField.maybeValue = 'myMV';
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _a.sent();
                        primayAction.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 2:
                        _a.sent();
                        testing_1.expect(doc.querySelector('DAType[id="OpenSCD_AnalogueValue_INT32"]')).to
                            .exist;
                        testing_1.expect(doc.querySelectorAll('DAType[id="OpenSCD_AnalogueValue_INT32"]').length).to.equal(1);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('defines a dOTypeWizard', function () {
        var idField;
        var primayAction;
        var deleteButton;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        (dOTypeList.querySelector('mwc-list-item[value="#Dummy.LLN0.Mod"]')).click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 2:
                        _c.sent(); //recursive call takes time
                        idField = ((_a = parent.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('wizard-textfield[label="id"]'));
                        primayAction = ((_b = parent.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('mwc-button[slot="primaryAction"]'));
                        deleteButton = (Array.from(parent.wizardUI.dialog.querySelectorAll('mwc-menu > mwc-list-item')).find(function (item) { return item.innerHTML.includes("Remove"); }));
                        return [2 /*return*/];
                }
            });
        }); });
        it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // prettier does not support escaping in regexes of the /v flag
                    return [4 /*yield*/, testing_1.expect(parent.wizardUI.dialog).dom.to.equalSnapshot({
                            ignoreAttributes: [
                                {
                                    tags: ['wizard-textfield'],
                                    attributes: ['pattern']
                                },
                            ]
                        })];
                    case 1:
                        // prettier does not support escaping in regexes of the /v flag
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        // work around, because the escapes get removed in snapshot by prettier
        it('should have correct pattern', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                testing_1.expect(parent.wizardUI.dialog.querySelectorAll('wizard-textfield[pattern]')
                    .length).to.equal(3);
                testing_1.expect(parent.wizardUI
                    .dialog.querySelectorAll('wizard-textfield[pattern]')[0]
                    .getAttribute('pattern')).to.equal(limits_js_1.patterns.nmToken);
                testing_1.expect(parent.wizardUI
                    .dialog.querySelectorAll('wizard-textfield[pattern]')[1]
                    .getAttribute('pattern')).to.equal(limits_js_1.patterns.normalizedString);
                testing_1.expect(parent.wizardUI
                    .dialog.querySelectorAll('wizard-textfield[pattern]')[2]
                    .getAttribute('pattern')).to.equal(limits_js_1.patterns.normalizedString);
                return [2 /*return*/];
            });
        }); });
        it('edits DOType attributes id', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testing_1.expect(doc.querySelector('DOType[id="Dummy.LLN0.Mod"]')).to.exist;
                        idField.value = 'changedDOType';
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _a.sent();
                        primayAction.click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 2:
                        _a.sent();
                        testing_1.expect(doc.querySelector('DOType[id="Dummy.LLN0.Mod"]')).to.not.exist;
                        testing_1.expect(doc.querySelector('DOType[id="changedDOType"]')).to.exist;
                        return [2 /*return*/];
                }
            });
        }); });
        it('deletes the DOType attribute on delete button click', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testing_1.expect(doc.querySelector('DOType[id="Dummy.LLN0.Mod"]')).to.exist;
                        testing_1.expect(doc.querySelectorAll('DOType').length).to.equal(15);
                        deleteButton.click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _a.sent();
                        testing_1.expect(doc.querySelector('DAType[id="Dummy.LLN0.Mod"]')).to.not.exist;
                        testing_1.expect(doc.querySelectorAll('DOType').length).to.equal(14);
                        return [2 /*return*/];
                }
            });
        }); });
        it('does not edit DOType element without changes', function () { return __awaiter(void 0, void 0, void 0, function () {
            var originData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        originData = (doc.querySelector('DOType[id="Dummy.LLN0.Mod"]')).cloneNode(true);
                        primayAction.click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _a.sent();
                        testing_1.expect(originData.isEqualNode(doc.querySelector('DOType[id="Dummy.LLN0.Mod"]'))).to.be["true"];
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('defines a sDOWizard to edit an existing SDO', function () {
        var nameField;
        var primayAction;
        var deleteButton;
        var typeSelect;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        (dOTypeList.querySelector('mwc-list-item[value="#Dummy.WYE"]')).click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _g.sent();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 2:
                        _g.sent(); // await animation
                        ((_b = (_a = parent.wizardUI) === null || _a === void 0 ? void 0 : _a.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('mwc-list-item[value="#Dummy.WYE>phsA"]')).click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 3:
                        _g.sent();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 4:
                        _g.sent(); // await animation
                        nameField = ((_c = parent.wizardUI.dialog) === null || _c === void 0 ? void 0 : _c.querySelector('wizard-textfield[label="name"]'));
                        primayAction = ((_d = parent.wizardUI.dialog) === null || _d === void 0 ? void 0 : _d.querySelector('mwc-button[slot="primaryAction"]'));
                        deleteButton = ((_e = parent.wizardUI.dialog) === null || _e === void 0 ? void 0 : _e.querySelector('mwc-menu > mwc-list-item'));
                        typeSelect = ((_f = parent.wizardUI.dialog) === null || _f === void 0 ? void 0 : _f.querySelector('mwc-select[label="type"]'));
                        return [2 /*return*/];
                }
            });
        }); });
        it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // prettier does not support escaping in regexes of the /v flag
                    return [4 /*yield*/, testing_1.expect(parent.wizardUI.dialog).dom.to.equalSnapshot({
                            ignoreAttributes: [
                                {
                                    tags: ['wizard-textfield'],
                                    attributes: ['pattern']
                                },
                            ]
                        })];
                    case 1:
                        // prettier does not support escaping in regexes of the /v flag
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        // work around, because the escapes get removed in snapshot by prettier
        it('should have correct pattern', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                testing_1.expect(parent.wizardUI.dialog.querySelectorAll('wizard-textfield[pattern]')
                    .length).to.equal(2);
                testing_1.expect(parent.wizardUI
                    .dialog.querySelectorAll('wizard-textfield[pattern]')[0]
                    .getAttribute('pattern')).to.equal(limits_js_1.patterns.tRestrName1stL);
                testing_1.expect(parent.wizardUI
                    .dialog.querySelectorAll('wizard-textfield[pattern]')[1]
                    .getAttribute('pattern')).to.equal(limits_js_1.patterns.normalizedString);
                return [2 /*return*/];
            });
        }); });
        it('edits SDO attributes name', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testing_1.expect(doc.querySelector('DOType[id="Dummy.WYE"] > SDO[name="phsA"]')).to
                            .exist;
                        nameField.value = 'newPhsA';
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _a.sent();
                        primayAction.click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 2:
                        _a.sent();
                        testing_1.expect(doc.querySelector('DOType[id="Dummy.WYE"] > SDO[name="phsA"]')).to
                            .not.exist;
                        testing_1.expect(doc.querySelector('DOType[id="Dummy.WYE"] > SDO[name="newPhsA"]'))
                            .to.exist;
                        return [2 /*return*/];
                }
            });
        }); });
        it('deletes the SDO element on delete button click', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testing_1.expect(doc.querySelector('DOType[id="Dummy.WYE"] > SDO[name="phsA"]')).to
                            .exist;
                        testing_1.expect(doc.querySelectorAll('DOType[id="Dummy.WYE"] > SDO').length).to.equal(3);
                        deleteButton.click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _a.sent();
                        testing_1.expect(doc.querySelector('DOType[id="Dummy.WYE"] > SDO[name="phsA"]')).to
                            .not.exist;
                        testing_1.expect(doc.querySelectorAll('DOType[id="Dummy.WYE"] > SDO').length).to.equal(2);
                        return [2 /*return*/];
                }
            });
        }); });
        it('does not edit SDO element without changes', function () { return __awaiter(void 0, void 0, void 0, function () {
            var originData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        originData = (doc.querySelector('DOType[id="Dummy.WYE"] > SDO[name="phsA"]')).cloneNode(true);
                        primayAction.click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _a.sent();
                        testing_1.expect(originData.isEqualNode(doc.querySelector('DOType[id="Dummy.WYE"] > SDO[name="phsA"]'))).to.be["true"];
                        return [2 /*return*/];
                }
            });
        }); });
        it('filters the type selector to DOTypes', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                testing_1.expect(typeSelect.querySelectorAll('mwc-list-item').length).to.equal(doc.querySelectorAll('DOType').length);
                return [2 /*return*/];
            });
        }); });
    });
    describe('defines a sDOWizard to create a new SDO element', function () {
        var nameField;
        var descField;
        var typeSelect;
        var primaryAction;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        (dOTypeList.querySelector('mwc-list-item[value="#Dummy.LLN0.Mod"]')).click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _f.sent();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 2:
                        _f.sent(); // await animation
                        (Array.from(parent.wizardUI.dialog.querySelectorAll('mwc-menu > mwc-list-item')).find(function (item) { return item.innerHTML.includes("Data object"); })).click();
                        return [4 /*yield*/, ((_a = parent.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.requestUpdate())];
                    case 3:
                        _f.sent();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 4:
                        _f.sent(); // await animation
                        nameField = ((_b = parent.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('wizard-textfield[label="name"]'));
                        descField = ((_c = parent.wizardUI.dialog) === null || _c === void 0 ? void 0 : _c.querySelector('wizard-textfield[label="desc"]'));
                        typeSelect = ((_d = parent.wizardUI.dialog) === null || _d === void 0 ? void 0 : _d.querySelector('mwc-select[label="type"]'));
                        primaryAction = ((_e = parent.wizardUI.dialog) === null || _e === void 0 ? void 0 : _e.querySelector('mwc-button[slot="primaryAction"]'));
                        return [2 /*return*/];
                }
            });
        }); });
        it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // prettier does not support escaping in regexes of the /v flag
                    return [4 /*yield*/, testing_1.expect(parent.wizardUI.dialog).dom.to.equalSnapshot({
                            ignoreAttributes: [
                                {
                                    tags: ['wizard-textfield'],
                                    attributes: ['pattern']
                                },
                            ]
                        })];
                    case 1:
                        // prettier does not support escaping in regexes of the /v flag
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        // work around, because the escapes get removed in snapshot by prettier
        it('should have correct pattern', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                testing_1.expect(parent.wizardUI.dialog.querySelectorAll('wizard-textfield[pattern]')
                    .length).to.equal(2);
                testing_1.expect(parent.wizardUI
                    .dialog.querySelectorAll('wizard-textfield[pattern]')[0]
                    .getAttribute('pattern')).to.equal(limits_js_1.patterns.tRestrName1stL);
                testing_1.expect(parent.wizardUI
                    .dialog.querySelectorAll('wizard-textfield[pattern]')[1]
                    .getAttribute('pattern')).to.equal(limits_js_1.patterns.normalizedString);
                return [2 /*return*/];
            });
        }); });
        it('creates a new SDO element', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testing_1.expect(doc.querySelector('DOType[id="Dummy.LLN0.Mod"] > SDO[name="newSDOElement"]')).to.not.exist;
                        nameField.value = 'newSDOElement';
                        typeSelect.value = 'Dummy.CMV';
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _a.sent();
                        primaryAction.click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 2:
                        _a.sent();
                        testing_1.expect(doc.querySelector('DOType[id="Dummy.LLN0.Mod"] > SDO[name="newSDOElement"]:not([desc])[type="Dummy.CMV"]')).to.exist;
                        return [2 /*return*/];
                }
            });
        }); });
        it('creates yet another new SDO element', function () { return __awaiter(void 0, void 0, void 0, function () {
            var name, desc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = 'newSDOElement2';
                        desc = 'newSDOdesc';
                        testing_1.expect(doc.querySelector('DOType[id="#Dummy.LLN0.Mod"] > SDO[name="newSDOElement2"]')).to.not.exist;
                        nameField.value = name;
                        descField.nullable = false;
                        descField.value = desc;
                        typeSelect.value = 'Dummy.CMV';
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _a.sent();
                        primaryAction.click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 2:
                        _a.sent();
                        testing_1.expect(doc.querySelector("DOType[id=\"Dummy.LLN0.Mod\"] >" +
                            ("SDO[name=\"" + name + "\"][desc=\"" + desc + "\"][type=\"Dummy.CMV\"]"))).to.exist;
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
var templateObject_1;
