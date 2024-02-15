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
describe('LNodeType wizards', function () {
    if (customElements.get('templates-editor') === undefined)
        customElements.define('templates-editor', Templates_js_1["default"]);
    var doc;
    var parent;
    var templates;
    var lNodeTypeList;
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
                    lNodeTypeList = ((_a = templates.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('filtered-list[id="lnodetypelist"]'));
                    return [2 /*return*/];
            }
        });
    }); });
    describe('defines a lNodeTypeHelperWizard', function () {
        var idField;
        var primayAction;
        var deleteButton;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        (lNodeTypeList.querySelector('mwc-list-item[value="#Dummy.CSWI"]')).click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _d.sent();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 2:
                        _d.sent(); //recursive call takes time
                        idField = ((_a = parent.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('wizard-textfield[label="id"]'));
                        primayAction = ((_b = parent.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('mwc-button[slot="primaryAction"]'));
                        deleteButton = ((_c = parent.wizardUI.dialog) === null || _c === void 0 ? void 0 : _c.querySelector('mwc-menu > mwc-list-item'));
                        return [2 /*return*/];
                }
            });
        }); });
        it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.expect(parent.wizardUI.dialog).to.equalSnapshot({
                            ignoreAttributes: [
                                {
                                    tags: ['wizard-textfield'],
                                    attributes: ['pattern']
                                },
                            ]
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        //work around, because the escapes get removed in snapshot
        it('should have correct pattern', function () { return __awaiter(void 0, void 0, void 0, function () {
            var pattern;
            return __generator(this, function (_a) {
                pattern = '([:_A-Za-z]|[\u00C0-\u00D6]|[\u00D8-\u00F6]|[\u00F8-\u02FF]|[\u0370-\u037D]' +
                    '|[\u037F-\u1FFF]|[\u200C-\u200D]|[\u2070-\u218F]|[\u2C00-\u2FEF]' +
                    '|[\u3001-\uD7FF]|[\uF900-\uFDCF]|[\uFDF0-\uFFFD]|[.0-9\\-]|\u00B7|[\u0300-\u036F]|[\u203F-\u2040])+';
                testing_1.expect(parent.wizardUI.dialog.querySelectorAll('wizard-textfield[pattern]')
                    .length).to.equal(3);
                testing_1.expect(parent.wizardUI
                    .dialog.querySelectorAll('wizard-textfield[pattern]')[0]
                    .getAttribute('pattern')).to.equal(pattern);
                testing_1.expect(parent.wizardUI
                    .dialog.querySelectorAll('wizard-textfield[pattern]')[1]
                    .getAttribute('pattern')).to.equal(foundation_js_1.patterns.normalizedString);
                testing_1.expect(parent.wizardUI
                    .dialog.querySelectorAll('wizard-textfield[pattern]')[2]
                    .getAttribute('pattern')).to.equal(foundation_js_1.patterns.lnClass);
                return [2 /*return*/];
            });
        }); });
        it('edits LNodeType attributes id', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testing_1.expect(doc.querySelector('LNodeType[id="Dummy.CSWI"]')).to.exist;
                        idField.value = 'changedLNodeType';
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _a.sent();
                        primayAction.click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 2:
                        _a.sent();
                        testing_1.expect(doc.querySelector('LNodeType[id="Dummy.CSWI"]')).to.not.exist;
                        testing_1.expect(doc.querySelector('LNodeType[id="changedLNodeType"]')).to.exist;
                        return [2 /*return*/];
                }
            });
        }); });
        it('deletes the LNodeType attribute on delete button click', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testing_1.expect(doc.querySelector('LNodeType[id="Dummy.CSWI"]')).to.exist;
                        testing_1.expect(doc.querySelectorAll('LNodeType').length).to.equal(8);
                        deleteButton.click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _a.sent();
                        testing_1.expect(doc.querySelector('LNodeType[id="Dummy.CSWI"]')).to.not.exist;
                        testing_1.expect(doc.querySelectorAll('LNodeType').length).to.equal(7);
                        return [2 /*return*/];
                }
            });
        }); });
        it('does not edit LNodeType element without changes', function () { return __awaiter(void 0, void 0, void 0, function () {
            var originData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        originData = (doc.querySelector('LNodeType[id="Dummy.CSWI"]')).cloneNode(true);
                        primayAction.click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _a.sent();
                        testing_1.expect(originData.isEqualNode(doc.querySelector('LNodeType[id="Dummy.CSWI"]'))).to.be["true"];
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('defines a createLNodeTypeWizard', function () {
        var selector;
        var idField;
        var primayAction;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var button;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        button = ((_a = templates === null || templates === void 0 ? void 0 : templates.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll('mwc-icon-button[icon="playlist_add"]')[0]);
                        button.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 2:
                        _c.sent(); // await animation
                        selector = parent.wizardUI.dialog.querySelector('mwc-select[label="lnClass"]');
                        idField = parent.wizardUI.dialog.querySelector('wizard-textfield[label="id"]');
                        primayAction = ((_b = parent.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('mwc-button[slot="primaryAction"]'));
                        return [2 /*return*/];
                }
            });
        }); });
        it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.expect(parent.wizardUI.dialog).to.equalSnapshot({
                            ignoreAttributes: [
                                {
                                    tags: ['wizard-textfield'],
                                    attributes: ['pattern']
                                },
                            ]
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        //work around, because the escapes get removed in snapshot
        it('should have correct pattern', function () { return __awaiter(void 0, void 0, void 0, function () {
            var pattern;
            return __generator(this, function (_a) {
                pattern = '([:_A-Za-z]|[\u00C0-\u00D6]|[\u00D8-\u00F6]|[\u00F8-\u02FF]|[\u0370-\u037D]' +
                    '|[\u037F-\u1FFF]|[\u200C-\u200D]|[\u2070-\u218F]|[\u2C00-\u2FEF]' +
                    '|[\u3001-\uD7FF]|[\uF900-\uFDCF]|[\uFDF0-\uFFFD]|[.0-9\\-]|\u00B7|[\u0300-\u036F]|[\u203F-\u2040])+';
                testing_1.expect(parent.wizardUI.dialog.querySelectorAll('wizard-textfield[pattern]')
                    .length).to.equal(2);
                testing_1.expect(parent.wizardUI
                    .dialog.querySelectorAll('wizard-textfield[pattern]')[0]
                    .getAttribute('pattern')).to.equal(pattern);
                testing_1.expect(parent.wizardUI
                    .dialog.querySelectorAll('wizard-textfield[pattern]')[1]
                    .getAttribute('pattern')).to.equal(foundation_js_1.patterns.normalizedString);
                return [2 /*return*/];
            });
        }); });
        it('uses -7-4 and -7-420 namespace for lnClass suggestion', function () {
            return testing_1.expect(selector.items.filter(function (item) { return !item.noninteractive && !item.twoline; })).to.have.lengthOf(215);
        });
        it('recursively add missing! subsequent DOType elements', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testing_1.expect(doc.querySelector('LNodeType[id="myCSWI"]')).to.not.exist;
                        testing_1.expect(doc.querySelector('DOType[id="OpenSCD_ENC_Mod"]')).to.not.exist;
                        testing_1.expect(doc.querySelector('DOType[id="OpenSCD_ENS_Beh"]')).to.not.exist;
                        testing_1.expect(doc.querySelector('DOType[id="OpenSCD_ENS_Health"]')).to.not.exist;
                        testing_1.expect(doc.querySelector('DOType[id="OpenSCD_LPL_noLD"]')).to.not.exist;
                        testing_1.expect(doc.querySelector('DOType[id="OpenSCD_SPS_simple"]')).to.not.exist;
                        testing_1.expect(doc.querySelector('DOType[id="OpenSCD_DPC"]')).to.not.exist;
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 1:
                        _a.sent(); //recursive call takes time
                        selector.value = '#OpenSCD_CSWI_noPB';
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 2:
                        _a.sent(); // selector updates autoimport
                        idField.maybeValue = 'myCSWI';
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 3:
                        _a.sent();
                        primayAction.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 4:
                        _a.sent();
                        testing_1.expect(doc.querySelector('LNodeType[id="myCSWI"]')).to.exist;
                        testing_1.expect(doc.querySelectorAll('DOType[id="OpenSCD_ENC_Mod"]').length).to.equal(1);
                        testing_1.expect(doc.querySelectorAll('DOType[id="OpenSCD_ENS_Beh"]').length).to.equal(1);
                        testing_1.expect(doc.querySelectorAll('DOType[id="OpenSCD_ENS_Health"]').length).to.equal(1);
                        testing_1.expect(doc.querySelectorAll('DOType[id="OpenSCD_LPL_noLD"]').length).to.equal(1);
                        testing_1.expect(doc.querySelectorAll('DOType[id="OpenSCD_SPS_simple"]').length).to.equal(1);
                        testing_1.expect(doc.querySelectorAll('DOType[id="OpenSCD_DPC"]').length).to.equal(1);
                        return [2 /*return*/];
                }
            });
        }); }).timeout(5000);
        it('recursively add missing! subsequent DAType elements', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testing_1.expect(doc.querySelector('LNodeType[id="myCSWI"]')).to.not.exist;
                        testing_1.expect(doc.querySelector('DAType[id="OpenSCD_Originator"]')).to.not.exist;
                        testing_1.expect(doc.querySelector('DAType[id="OpenSCD_OperSBOw_Dbpos"]')).to.not
                            .exist;
                        testing_1.expect(doc.querySelector('DAType[id="OpenSCD_Cancel_Dbpos"]')).to.not
                            .exist;
                        testing_1.expect(doc.querySelector('DAType[id="OpenSCD_OperSBOw_BehaviourModeKind"]')).to.not.exist;
                        testing_1.expect(doc.querySelector('DAType[id="OpenSCD_Cancel_BehaviourModeKind"]'))
                            .to.not.exist;
                        testing_1.expect(doc.querySelector('DAType[id="OpenSCD_PulseConfig"]')).to.not
                            .exist;
                        selector.value = '#OpenSCD_CSWI_noPB';
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _a.sent(); // selector updates autoimport
                        idField.maybeValue = 'myCSWI';
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 2:
                        _a.sent();
                        primayAction.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 3:
                        _a.sent();
                        testing_1.expect(doc.querySelector('LNodeType[id="myCSWI"]')).to.exist;
                        testing_1.expect(doc.querySelectorAll('DAType[id="OpenSCD_Originator"]').length).to.equal(1);
                        testing_1.expect(doc.querySelectorAll('DAType[id="OpenSCD_OperSBOw_Dbpos"]').length).to.equal(1);
                        testing_1.expect(doc.querySelectorAll('DAType[id="OpenSCD_Cancel_Dbpos"]').length).to.equal(1);
                        testing_1.expect(doc.querySelectorAll('DAType[id="OpenSCD_OperSBOw_BehaviourModeKind"]')
                            .length).to.equal(1);
                        testing_1.expect(doc.querySelectorAll('DAType[id="OpenSCD_Cancel_BehaviourModeKind"]')
                            .length).to.equal(1);
                        testing_1.expect(doc.querySelectorAll('DAType[id="OpenSCD_PulseConfig"]').length).to.equal(1);
                        return [2 /*return*/];
                }
            });
        }); }).timeout(5000);
        it('recursively add missing! subsequent EnumType elements', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testing_1.expect(doc.querySelector('LNodeType[id="myCSWI"]')).to.not.exist;
                        testing_1.expect(doc.querySelector('EnumType[id="OriginatorCategoryKind"]')).to.not
                            .exist;
                        testing_1.expect(doc.querySelector('EnumType[id="BehaviourModeKind"]')).to.not
                            .exist;
                        testing_1.expect(doc.querySelector('EnumType[id="CtlModelKind"]')).to.not.exist;
                        testing_1.expect(doc.querySelector('EnumType[id="HealthKind"]')).to.not.exist;
                        testing_1.expect(doc.querySelector('EnumType[id="OutputSignalKind"]')).to.not.exist;
                        selector.value = '#OpenSCD_CSWI_noPB';
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _a.sent(); // selector updates autoimport
                        idField.maybeValue = 'myCSWI';
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 2:
                        _a.sent();
                        primayAction.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 3:
                        _a.sent();
                        testing_1.expect(doc.querySelector('LNodeType[id="myCSWI"]')).to.exist;
                        testing_1.expect(doc.querySelectorAll('EnumType[id="OriginatorCategoryKind"]').length).to.equal(1);
                        testing_1.expect(doc.querySelectorAll('EnumType[id="BehaviourModeKind"]').length).to.equal(1);
                        testing_1.expect(doc.querySelectorAll('EnumType[id="CtlModelKind"]').length).to.equal(1);
                        testing_1.expect(doc.querySelectorAll('EnumType[id="HealthKind"]').length).to.equal(1);
                        testing_1.expect(doc.querySelectorAll('EnumType[id="OutputSignalKind"]').length).to.equal(1);
                        return [2 /*return*/];
                }
            });
        }); }).timeout(5000);
        it('respects the sequence defined in the standard', function () { return __awaiter(void 0, void 0, void 0, function () {
            var element;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        selector.value = '#OpenSCD_CSWI_noPB';
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _b.sent(); // selector updates autoimport
                        idField.maybeValue = 'myGeneralLNodeType';
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 2:
                        _b.sent();
                        primayAction.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 3:
                        _b.sent();
                        element = doc.querySelector('LNodeType[id="myGeneralLNodeType"]');
                        testing_1.expect((_a = element === null || element === void 0 ? void 0 : element.nextElementSibling) === null || _a === void 0 ? void 0 : _a.tagName).to.equal('LNodeType');
                        testing_1.expect(element === null || element === void 0 ? void 0 : element.previousElementSibling).to.be["null"];
                        return [2 /*return*/];
                }
            });
        }); }).timeout(5000);
        describe('opens a createLNodeTypeHelperWizard', function () {
            var saveButton;
            var beh;
            var enaOpn;
            var enaCls;
            var ens;
            var sps;
            var ensId;
            var spsId;
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            selector.value = 'CILO';
                            idField.maybeValue = 'myGeneralLNodeType';
                            return [4 /*yield*/, parent.updateComplete];
                        case 1:
                            _d.sent();
                            ((_a = parent.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-button[slot="primaryAction"]')).click();
                            return [4 /*yield*/, parent.updateComplete];
                        case 2:
                            _d.sent();
                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                        case 3:
                            _d.sent(); // await animation
                            saveButton = parent.wizardUI.shadowRoot.querySelector('mwc-button[slot="primaryAction"]');
                            beh = parent.wizardUI.shadowRoot.querySelector('wizard-select:nth-child(2)');
                            enaOpn = parent.wizardUI.shadowRoot.querySelector('wizard-select:nth-child(21)');
                            enaCls = parent.wizardUI.shadowRoot.querySelector('wizard-select:nth-child(22)');
                            ens = doc.querySelector('DOType[cdc="ENS"]');
                            sps = doc.querySelector('DOType[cdc="SPS"]');
                            ensId = (_b = ens === null || ens === void 0 ? void 0 : ens.getAttribute('id')) !== null && _b !== void 0 ? _b : '';
                            spsId = (_c = sps === null || sps === void 0 ? void 0 : sps.getAttribute('id')) !== null && _c !== void 0 ? _c : '';
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
            it('filters the type selection for each DO to fit the cdc', function () {
                testing_1.expect(beh.querySelectorAll('mwc-list-item').length).to.equal(doc.querySelectorAll('DOType[cdc="ENS"]').length);
            });
            it('requires all mandatory DOs to be defined', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            beh.value = ensId;
                            return [4 /*yield*/, parent.updateComplete];
                        case 1:
                            _a.sent();
                            saveButton.click();
                            return [4 /*yield*/, parent.updateComplete];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                        case 3:
                            _a.sent(); // await animation
                            testing_1.expect(parent.wizardUI.dialog).to.exist;
                            testing_1.expect(doc.querySelector('LNodeType[id="myGeneralLNodeType"][lnClass="CILO"]')).to.not.exist;
                            return [2 /*return*/];
                    }
                });
            }); });
            it('adds new LNodeType with correct id and lnClass', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            beh.value = ensId;
                            enaOpn.value = spsId;
                            enaCls.value = spsId;
                            return [4 /*yield*/, parent.updateComplete];
                        case 1:
                            _a.sent();
                            saveButton.click();
                            return [4 /*yield*/, parent.updateComplete];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                        case 3:
                            _a.sent(); // await animation
                            testing_1.expect(parent.wizardUI.dialog).to.not.exist;
                            testing_1.expect(doc.querySelector('LNodeType[id="myGeneralLNodeType"][lnClass="CILO"]')).to.exist;
                            return [2 /*return*/];
                    }
                });
            }); });
            it('adds selected DOs to new LNodeType', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            beh.value = ensId;
                            enaOpn.value = spsId;
                            enaCls.value = spsId;
                            return [4 /*yield*/, parent.updateComplete];
                        case 1:
                            _a.sent();
                            saveButton.click();
                            return [4 /*yield*/, parent.updateComplete];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                        case 3:
                            _a.sent(); // await animation
                            testing_1.expect(doc.querySelector("LNodeType[id=\"myGeneralLNodeType\"][lnClass=\"CILO\"] > DO[name=\"Beh\"]:not([bType])[type=\"" + ensId + "\"]")).to.exist;
                            testing_1.expect(doc.querySelector("LNodeType[id=\"myGeneralLNodeType\"][lnClass=\"CILO\"] > DO[name=\"EnaOpn\"]:not([bType])[type=\"" + spsId + "\"]")).to.exist;
                            testing_1.expect(doc.querySelector("LNodeType[id=\"myGeneralLNodeType\"][lnClass=\"CILO\"] > DO[name=\"EnaCls\"]:not([bType])[type=\"" + spsId + "\"]")).to.exist;
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe('defines a dOWizard to edit an existing DO', function () {
        var nameField;
        var descField;
        var typeSelect;
        var accessControlField;
        var transientSelect;
        var primaryAction;
        var deleteButton;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        (lNodeTypeList.querySelector('mwc-list-item[value="#Dummy.LLN0"]')).click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _k.sent();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 2:
                        _k.sent(); // await animation
                        ((_b = (_a = parent.wizardUI) === null || _a === void 0 ? void 0 : _a.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('mwc-list-item[value="#Dummy.LLN0>Mod"]')).click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 3:
                        _k.sent();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 4:
                        _k.sent(); // await animation
                        nameField = ((_c = parent.wizardUI.dialog) === null || _c === void 0 ? void 0 : _c.querySelector('wizard-textfield[label="name"]'));
                        descField = ((_d = parent.wizardUI.dialog) === null || _d === void 0 ? void 0 : _d.querySelector('wizard-textfield[label="desc"]'));
                        accessControlField = ((_e = parent.wizardUI.dialog) === null || _e === void 0 ? void 0 : _e.querySelector('wizard-textfield[label="accessControl"]'));
                        typeSelect = ((_f = parent.wizardUI.dialog) === null || _f === void 0 ? void 0 : _f.querySelector('mwc-select[label="type"]'));
                        transientSelect = ((_g = parent.wizardUI.dialog) === null || _g === void 0 ? void 0 : _g.querySelector('wizard-checkbox[label="transient"]'));
                        primaryAction = ((_h = parent.wizardUI.dialog) === null || _h === void 0 ? void 0 : _h.querySelector('mwc-button[slot="primaryAction"]'));
                        deleteButton = ((_j = parent.wizardUI.dialog) === null || _j === void 0 ? void 0 : _j.querySelector('mwc-menu > mwc-list-item'));
                        return [2 /*return*/];
                }
            });
        }); });
        it('looks like the latest snapshot', function () {
            testing_1.expect(parent.wizardUI.dialog).to;
        });
        it('edits DO attributes name', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testing_1.expect(doc.querySelector('LNodeType[id="Dummy.LLN0"] > DO[name="Mod"]'))
                            .to.exist;
                        nameField.value = 'NewMod';
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _a.sent();
                        primaryAction.click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 2:
                        _a.sent();
                        testing_1.expect(doc.querySelector('LNodeType[id="Dummy.LLN0"] > DO[name="Mod"]'))
                            .to.not.exist;
                        testing_1.expect(doc.querySelector('LNodeType[id="Dummy.LLN0"] > DO[name="NewMod"]')).to.exist;
                        return [2 /*return*/];
                }
            });
        }); });
        it('edits yet another attribute of the DO element', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testing_1.expect(doc.querySelector('LNodeType[id="Dummy.LLN0"] > DO[name="NewMod"]')).to.not.exist;
                        nameField.value = 'NewMod';
                        descField.nullable = false;
                        descField.value = 'myDesc';
                        typeSelect.value = 'Dummy.CMV';
                        accessControlField.nullable = false;
                        accessControlField.maybeValue = 'myAccessControl';
                        transientSelect.maybeValue = 'true';
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _a.sent();
                        primaryAction.click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 2:
                        _a.sent();
                        testing_1.expect(doc.querySelector("LNodeType[id=\"Dummy.LLN0\"] >" +
                            "DO[name=\"NewMod\"][desc=\"myDesc\"][type=\"Dummy.CMV\"][accessControl=\"myAccessControl\"][transient=\"true\"]")).to.exist;
                        return [2 /*return*/];
                }
            });
        }); });
        it('deletes the DO element on delete button click', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testing_1.expect(doc.querySelector('LNodeType[id="Dummy.LLN0"] > DO[name="Mod"]'))
                            .to.exist;
                        testing_1.expect(doc.querySelectorAll('LNodeType[id="Dummy.LLN0"] > DO').length).to.equal(4);
                        deleteButton.click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _a.sent();
                        testing_1.expect(doc.querySelector('LNodeType[id="Dummy.LLN0"] > DO[name="Mod"]'))
                            .to.not.exist;
                        testing_1.expect(doc.querySelectorAll('LNodeType[id="Dummy.LLN0"] > DO').length).to.equal(3);
                        return [2 /*return*/];
                }
            });
        }); });
        it('does not edit DO element without changes', function () { return __awaiter(void 0, void 0, void 0, function () {
            var originData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        originData = (doc.querySelector('LNodeType[id="Dummy.LLN0"] > DO[name="Mod"]')).cloneNode(true);
                        primaryAction.click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _a.sent();
                        testing_1.expect(originData.isEqualNode(doc.querySelector('LNodeType[id="Dummy.LLN0"] > DO[name="Mod"]'))).to.be["true"];
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
    describe('defines a dOWizard to create a new DO element', function () {
        var nameField;
        var descField;
        var typeSelect;
        var accessControlField;
        var transientSelect;
        var primaryAction;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f, _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        (lNodeTypeList.querySelector('mwc-list-item[value="#Dummy.LLN0"]')).click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _h.sent();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 2:
                        _h.sent(); // await animation
                        ((_a = parent.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelectorAll('mwc-menu > mwc-list-item')[1]).click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 3:
                        _h.sent();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 4:
                        _h.sent(); // await animation
                        nameField = ((_b = parent.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('wizard-textfield[label="name"]'));
                        descField = ((_c = parent.wizardUI.dialog) === null || _c === void 0 ? void 0 : _c.querySelector('wizard-textfield[label="desc"]'));
                        accessControlField = ((_d = parent.wizardUI.dialog) === null || _d === void 0 ? void 0 : _d.querySelector('wizard-textfield[label="accessControl"]'));
                        typeSelect = ((_e = parent.wizardUI.dialog) === null || _e === void 0 ? void 0 : _e.querySelector('mwc-select[label="type"]'));
                        transientSelect = ((_f = parent.wizardUI.dialog) === null || _f === void 0 ? void 0 : _f.querySelector('wizard-checkbox[label="transient"]'));
                        primaryAction = ((_g = parent.wizardUI.dialog) === null || _g === void 0 ? void 0 : _g.querySelector('mwc-button[slot="primaryAction"]'));
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
        it('creates a new DO element', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testing_1.expect(doc.querySelector('LNodeType[id="Dummy.LLN0"] > DO[name="NewMod"]')).to.not.exist;
                        nameField.value = 'NewMod';
                        typeSelect.value = 'Dummy.CMV';
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _a.sent();
                        primaryAction.click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 2:
                        _a.sent();
                        testing_1.expect(doc.querySelector('LNodeType[id="Dummy.LLN0"] > DO[name="NewMod"]:not([desc])[type="Dummy.CMV"]:not([accessControl]):not([transient])')).to.exist;
                        return [2 /*return*/];
                }
            });
        }); });
        it('creates yet another new DO element', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testing_1.expect(doc.querySelector('LNodeType[id="Dummy.LLN0"] > DO[name="NewMod"]')).to.not.exist;
                        nameField.value = 'NewMod';
                        descField.nullable = false;
                        descField.value = 'myDesc';
                        typeSelect.value = 'Dummy.CMV';
                        accessControlField.nullable = false;
                        accessControlField.maybeValue = 'myAccessControl';
                        transientSelect.maybeValue = 'true';
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _a.sent();
                        primaryAction.click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 2:
                        _a.sent();
                        testing_1.expect(doc.querySelector("LNodeType[id=\"Dummy.LLN0\"] >" +
                            "DO[name=\"NewMod\"][desc=\"myDesc\"][type=\"Dummy.CMV\"][accessControl=\"myAccessControl\"][transient=\"true\"]")).to.exist;
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
var templateObject_1;
