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
require("../../mock-wizard-editor.js");
var sampledvaluecontrol_js_1 = require("../../../src/wizards/sampledvaluecontrol.js");
var foundation_js_1 = require("../../../src/foundation.js");
describe('Wizards for SCL element SampledValueControl', function () {
    var doc;
    var element;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<mock-wizard-editor></mock-wizard-editor>"], ["<mock-wizard-editor></mock-wizard-editor>"]))))];
                case 1:
                    element = _a.sent();
                    return [4 /*yield*/, fetch('/test/testfiles/wizards/sampledvaluecontrol.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                case 2:
                    doc = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('define a select wizards that ', function () {
        var sampledValueControlList;
        describe('with the document element as input', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var wizard;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            wizard = sampledvaluecontrol_js_1.selectSampledValueControlWizard(doc.documentElement);
                            element.dispatchEvent(foundation_js_1.newWizardEvent(function () { return wizard; }));
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _b.sent();
                            sampledValueControlList = ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('filtered-list'));
                            return [4 /*yield*/, sampledValueControlList.updateComplete];
                        case 2:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('shows all SampledValueControl elements within a project', function () {
                return testing_1.expect(sampledValueControlList.items.length).to.equal(doc.querySelectorAll('SampledValueControl').length);
            });
            it('opens edit wizard for selected SampledValueControl element on click', function () { return __awaiter(void 0, void 0, void 0, function () {
                var reportItem, nameField;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            reportItem = sampledValueControlList.items[0];
                            reportItem.click();
                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 20); })];
                        case 1:
                            _b.sent(); // await animation
                            nameField = ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('wizard-textfield[label="name"]'));
                            return [4 /*yield*/, nameField.requestUpdate()];
                        case 2:
                            _b.sent();
                            testing_1.expect(nameField.value).to.equal(doc.querySelectorAll('SampledValueControl')[0].getAttribute('name'));
                            return [2 /*return*/];
                    }
                });
            }); });
            describe('has an add SampledValueControl primary button that', function () {
                var iEDPicker;
                beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-button[slot="primaryAction"]')).click();
                                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 50); })];
                            case 1:
                                _c.sent(); // await animation
                                iEDPicker = ((_b = element.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('finder-list'));
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('opens a potential list of host IEDs for the SampledValueControl element', function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/, testing_1.expect(iEDPicker).to.exist];
                }); }); });
            });
        });
        describe('with a specific IED as input', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var wizard;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            wizard = sampledvaluecontrol_js_1.selectSampledValueControlWizard(doc.querySelector('IED[name="IED3"]'));
                            element.dispatchEvent(foundation_js_1.newWizardEvent(function () { return wizard; }));
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _b.sent();
                            sampledValueControlList = ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('filtered-list'));
                            return [4 /*yield*/, sampledValueControlList.updateComplete];
                        case 2:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('shows all SampledValueControl elements within an IED', function () {
                return testing_1.expect(sampledValueControlList.items.length).to.equal(doc.querySelectorAll('IED[name="IED3"] SampledValueControl').length);
            });
            it('opens edit wizard for selected SampledValueControl element on click', function () { return __awaiter(void 0, void 0, void 0, function () {
                var reportItem, nameField;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            reportItem = sampledValueControlList.items[0];
                            reportItem.click();
                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 20); })];
                        case 1:
                            _b.sent(); // await animation
                            nameField = ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('wizard-textfield[label="name"]'));
                            return [4 /*yield*/, nameField.requestUpdate()];
                        case 2:
                            _b.sent();
                            testing_1.expect(nameField.value).to.equal(doc.querySelectorAll('SampledValueControl')[0].getAttribute('name'));
                            return [2 /*return*/];
                    }
                });
            }); });
            describe('has an add SampledValueControl primary button that', function () {
                var nameField;
                beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var primaryAction;
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                primaryAction = ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-button[slot="primaryAction"]'));
                                primaryAction.click();
                                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 20); })];
                            case 1:
                                _c.sent(); // await animation
                                nameField = ((_b = element.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('wizard-textfield[label="name"]'));
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('opens the create wizard for the SampledValueControl element', function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/, testing_1.expect(nameField).to.exist];
                }); }); });
            });
        });
    });
    describe('defines an edit wizard that', function () {
        var nameField;
        var secondaryAction;
        var primaryAction;
        var parentIED;
        describe('loaded without SMV element reference', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var sampledValueControlBlock;
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            element.workflow.length = 0; // remove all wizard from FIFO queue
                            parentIED = doc.querySelectorAll('IED')[1];
                            element.dispatchEvent(foundation_js_1.newWizardEvent(function () { return sampledvaluecontrol_js_1.selectSampledValueControlWizard(parentIED); }));
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _d.sent();
                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 20); })];
                        case 2:
                            _d.sent(); // await animation
                            sampledValueControlBlock = (((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('filtered-list')).items[0]);
                            sampledValueControlBlock.click();
                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 20); })];
                        case 3:
                            _d.sent(); // await animation
                            nameField = element.wizardUI.dialog.querySelector('wizard-textfield[label="name"]');
                            primaryAction = ((_b = element.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('mwc-button[slot="primaryAction"]'));
                            secondaryAction = ((_c = element.wizardUI.dialog) === null || _c === void 0 ? void 0 : _c.querySelector('mwc-button[slot="secondaryAction"]'));
                            return [4 /*yield*/, nameField.updateComplete];
                        case 4:
                            _d.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('rejects name attribute starting with decimals', function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            testing_1.expect((_a = parentIED
                                .querySelectorAll('SampledValueControl')[0]) === null || _a === void 0 ? void 0 : _a.getAttribute('name')).to.not.equal('4adsasd');
                            nameField.value = '4adsasd';
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _c.sent();
                            primaryAction.click();
                            testing_1.expect((_b = parentIED
                                .querySelectorAll('SampledValueControl')[0]) === null || _b === void 0 ? void 0 : _b.getAttribute('name')).to.not.equal('4adsasd');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('edits name attribute on primary action', function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            testing_1.expect((_a = parentIED
                                .querySelectorAll('SampledValueControl')[0]) === null || _a === void 0 ? void 0 : _a.getAttribute('name')).to.not.equal('myNewName');
                            nameField.value = 'myNewName';
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _c.sent();
                            primaryAction.click();
                            testing_1.expect((_b = parentIED
                                .querySelectorAll('SampledValueControl')[0]) === null || _b === void 0 ? void 0 : _b.getAttribute('name')).to.equal('myNewName');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('dynamically updates wizards after attribute change', function () { return __awaiter(void 0, void 0, void 0, function () {
                var sampledValueControlBlock;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            nameField.value = 'myNewName';
                            primaryAction.click();
                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 20); })];
                        case 1:
                            _b.sent(); // await animation
                            sampledValueControlBlock = (((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('filtered-list')).items[0]);
                            testing_1.expect(sampledValueControlBlock.innerHTML).to.contain('myNewName');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('returns back to its starting wizard on secondary action', function () { return __awaiter(void 0, void 0, void 0, function () {
                var sampledValueControlBlock;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            secondaryAction.click();
                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                        case 1:
                            _b.sent(); // await animation
                            sampledValueControlBlock = (((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('filtered-list')).items[0]);
                            testing_1.expect(sampledValueControlBlock.innerHTML).to.contain('MSVCB01');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('does not render SMV edit button', function () { return __awaiter(void 0, void 0, void 0, function () {
                var editSMvButton;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            editSMvButton = (Array.from(element.wizardUI.dialog.querySelectorAll('mwc-menu > mwc-list-item')).find(function (item) { return item.innerHTML.includes("[scl.Communication]"); }));
                            return [4 /*yield*/, ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.requestUpdate())];
                        case 1:
                            _b.sent();
                            testing_1.expect(editSMvButton).not.to.exist;
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('loaded with SMV element reference', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var sampledValueControlBlock;
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            element.workflow.length = 0; // remove all wizard from FIFO queue
                            parentIED = doc.querySelectorAll('IED')[2];
                            element.dispatchEvent(foundation_js_1.newWizardEvent(function () { return sampledvaluecontrol_js_1.selectSampledValueControlWizard(parentIED); }));
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _d.sent();
                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 20); })];
                        case 2:
                            _d.sent(); // await animation
                            sampledValueControlBlock = (((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('filtered-list')).items[0]);
                            sampledValueControlBlock.click();
                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 20); })];
                        case 3:
                            _d.sent(); // await animation
                            nameField = element.wizardUI.dialog.querySelector('wizard-textfield[label="name"]');
                            primaryAction = ((_b = element.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('mwc-button[slot="primaryAction"]'));
                            secondaryAction = ((_c = element.wizardUI.dialog) === null || _c === void 0 ? void 0 : _c.querySelector('mwc-button[slot="secondaryAction"]'));
                            return [4 /*yield*/, nameField.updateComplete];
                        case 4:
                            _d.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('opens a edit wizard for SMV on edit SMV button click', function () { return __awaiter(void 0, void 0, void 0, function () {
                var editSMvButton, macField;
                var _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            editSMvButton = (Array.from(element.wizardUI.dialog.querySelectorAll('mwc-menu > mwc-list-item')).find(function (item) { return item.innerHTML.includes("[scl.Communication]"); }));
                            return [4 /*yield*/, ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.requestUpdate())];
                        case 1:
                            _e.sent();
                            testing_1.expect(editSMvButton).to.exist;
                            editSMvButton.click();
                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                        case 2:
                            _e.sent(); // await animation
                            macField = ((_b = element.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('wizard-textfield[label="MAC-Address"]'));
                            return [4 /*yield*/, macField.updateComplete];
                        case 3:
                            _e.sent();
                            testing_1.expect(macField.value).to.equal((_d = (_c = doc
                                .querySelector('SMV > Address > P[type="MAC-Address"]')) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.trim());
                            return [2 /*return*/];
                    }
                });
            }); });
            it('opens a edit wizard for SMV on edit SMV button click', function () { return __awaiter(void 0, void 0, void 0, function () {
                var editSmvOptsButton, macField;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            editSmvOptsButton = (Array.from(element.wizardUI.dialog.querySelectorAll('mwc-menu > mwc-list-item')).find(function (item) { return item.innerHTML.includes("[scl.SmvOpts]"); }));
                            return [4 /*yield*/, ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.requestUpdate())];
                        case 1:
                            _c.sent();
                            testing_1.expect(editSmvOptsButton).to.exist;
                            editSmvOptsButton.click();
                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                        case 2:
                            _c.sent(); // await animation
                            macField = ((_b = element.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('wizard-checkbox[label="refreshTime"]'));
                            return [4 /*yield*/, macField.updateComplete];
                        case 3:
                            _c.sent();
                            testing_1.expect(macField).to.exist;
                            return [2 /*return*/];
                    }
                });
            }); });
            it('removes the SampledValueControl element and its referenced elements on remove button click', function () { return __awaiter(void 0, void 0, void 0, function () {
                var deleteButton;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            testing_1.expect(doc.querySelector('IED[name="IED3"] SampledValueControl[name="MSVCB01"]')).to.exist;
                            testing_1.expect(doc.querySelector('IED[name="IED3"] DataSet[name="PhsMeas1"]'))
                                .to.exist;
                            testing_1.expect(doc.querySelector('SMV[cbName="MSVCB01"]')).to.exist;
                            deleteButton = (Array.from(element.wizardUI.dialog.querySelectorAll('mwc-menu > mwc-list-item')).find(function (item) { return item.innerHTML.includes("[remove]"); }));
                            return [4 /*yield*/, ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.requestUpdate())];
                        case 1:
                            _b.sent();
                            deleteButton.click();
                            testing_1.expect(doc.querySelector('IED[name="IED3"] SampledValueControl[name="MSVCB01"]')).to.not.exist;
                            testing_1.expect(doc.querySelector('IED[name="IED3"] DataSet[name="PhsMeas1"]'))
                                .to.not.exist;
                            testing_1.expect(doc.querySelector('SMV[cbName="MSVCB01"]')).to.not.exist;
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe('defines a create wizards that', function () {
        var primaryAction;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var wizard;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        wizard = sampledvaluecontrol_js_1.createSampledValueControlWizard(doc.querySelector('IED[name="IED3"] LN0'));
                        element.dispatchEvent(foundation_js_1.newWizardEvent(function () { return wizard; }));
                        return [4 /*yield*/, element.requestUpdate()];
                    case 1:
                        _b.sent();
                        (element.wizardUI.dialogs[0].querySelector('wizard-textfield[label="smvID"]')).maybeValue = 'wer'; // is empty string per default that must be non empty
                        primaryAction = ((_a = element.wizardUI.dialogs[3]) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-button[slot="primaryAction"]'));
                        return [2 /*return*/];
                }
            });
        }); });
        it('creates a new instance of a SampledValueControl element', function () {
            testing_1.expect(doc.querySelectorAll('IED[name="IED3"] LN0 > SampledValueControl')).to.have.lengthOf(1);
            primaryAction.click();
            testing_1.expect(doc.querySelectorAll('IED[name="IED3"] LN0 > SampledValueControl')).to.have.lengthOf(2);
        });
        it('creates a new instance of a DataSet element referenced from SampledValueControl', function () {
            testing_1.expect(doc.querySelectorAll('IED[name="IED3"] LN0 > DataSet')).to.have.lengthOf(1);
            primaryAction.click();
            testing_1.expect(doc.querySelectorAll('IED[name="IED3"] LN0 > DataSet')).to.have.lengthOf(2);
        });
        it('creates a new instance of a SMV element', function () {
            testing_1.expect(doc.querySelectorAll('ConnectedAP[iedName="IED3"][apName="P1"] SMV')).to.have.lengthOf(1);
            primaryAction.click();
            testing_1.expect(doc.querySelectorAll('ConnectedAP[iedName="IED3"][apName="P1"] SMV')).to.have.lengthOf(2);
        });
    });
});
var templateObject_1;
