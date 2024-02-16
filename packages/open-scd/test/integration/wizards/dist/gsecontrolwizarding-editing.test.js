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
var gsecontrol_js_1 = require("../../../src/wizards/gsecontrol.js");
var foundation_js_1 = require("../../../src/foundation.js");
describe('Wizards for SCL element GSEControl', function () {
    var doc;
    var element;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<mock-wizard-editor></mock-wizard-editor>"], ["<mock-wizard-editor></mock-wizard-editor>"]))))];
                case 1:
                    element = _a.sent();
                    return [4 /*yield*/, fetch('/test/testfiles/wizards/gsecontrol.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                case 2:
                    doc = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('define a select wizards that', function () {
        var gseControlList;
        describe('with the document element as input', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var wizard;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            wizard = gsecontrol_js_1.selectGseControlWizard(doc.documentElement);
                            element.dispatchEvent(foundation_js_1.newWizardEvent(wizard));
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _b.sent();
                            gseControlList = ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('filtered-list'));
                            return [4 /*yield*/, gseControlList.updateComplete];
                        case 2:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('shows all GSEControl within the SCL', function () {
                return testing_1.expect(gseControlList.items.length).to.equal(doc.querySelectorAll('GSEControl').length);
            });
            it('opens edit wizard for selected GSEControl on filtered-list item click', function () { return __awaiter(void 0, void 0, void 0, function () {
                var gse2, nameField;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            gse2 = gseControlList.items[1];
                            return [4 /*yield*/, gse2.updateComplete];
                        case 1:
                            _c.sent();
                            gse2.click();
                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                        case 2:
                            _c.sent(); // await animation
                            return [4 /*yield*/, ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.updateComplete)];
                        case 3:
                            _c.sent();
                            nameField = ((_b = element.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('wizard-textfield[label="name"]'));
                            return [4 /*yield*/, nameField.updateComplete];
                        case 4:
                            _c.sent();
                            testing_1.expect(nameField.value).to.equal(doc.querySelectorAll('GSEControl')[1].getAttribute('name'));
                            return [2 /*return*/];
                    }
                });
            }); });
            describe('has an add GSEControl primary button that', function () {
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
                it('opens a potential list of host IEDs for the ReportControl element', function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
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
                            wizard = gsecontrol_js_1.selectGseControlWizard(doc.querySelector('IED'));
                            element.dispatchEvent(foundation_js_1.newWizardEvent(wizard));
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _b.sent();
                            gseControlList = ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('filtered-list'));
                            return [4 /*yield*/, gseControlList.updateComplete];
                        case 2:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('allows to filter ReportControl elements per IED', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, testing_1.expect(gseControlList.items.length).to.equal(doc.querySelector('IED').querySelectorAll('GSEControl').length)];
                });
            }); });
            it('opens edit wizard for selected ReportControl element on click', function () { return __awaiter(void 0, void 0, void 0, function () {
                var reportItem, nameField;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            reportItem = gseControlList.items[1];
                            reportItem.click();
                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 20); })];
                        case 1:
                            _b.sent(); // await animation
                            nameField = ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('wizard-textfield[label="name"]'));
                            return [4 /*yield*/, nameField.requestUpdate()];
                        case 2:
                            _b.sent();
                            testing_1.expect(nameField.value).to.equal(doc.querySelectorAll('GSEControl')[1].getAttribute('name'));
                            return [2 /*return*/];
                    }
                });
            }); });
            describe('has an add Report primary button that', function () {
                it('opens the create wizard for the ReportControl element', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var primaryAction, nameField;
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                primaryAction = ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-button[slot="primaryAction"]'));
                                return [4 /*yield*/, primaryAction.click()];
                            case 1:
                                _c.sent();
                                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 20); })];
                            case 2:
                                _c.sent(); // await animation
                                nameField = ((_b = element.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('wizard-textfield[label="name"]'));
                                return [4 /*yield*/, nameField.requestUpdate()];
                            case 3:
                                _c.sent();
                                testing_1.expect(nameField).to.exist;
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
    });
    describe('define an edit wizard that', function () {
        var nameField;
        var primaryAction;
        var secondaryAction;
        var gseControl;
        var parentIED;
        describe('loading a GSEControl with connected DataSet and GSE element', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var gsecontrol;
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            element.workflow.length = 0; // remove all wizard from FIFO queue
                            parentIED = doc.querySelector('IED');
                            element.dispatchEvent(foundation_js_1.newWizardEvent(function () { return gsecontrol_js_1.selectGseControlWizard(parentIED); }));
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _d.sent();
                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 20); })];
                        case 2:
                            _d.sent(); // await animation
                            gsecontrol = (((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('filtered-list')).items[0]);
                            gsecontrol.click();
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
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            testing_1.expect(doc.querySelector('GSEControl[name="4adsasd"]')).to.not.exist;
                            nameField.value = '4adsasd';
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _a.sent();
                            primaryAction.click();
                            testing_1.expect(doc.querySelector('GSEControl[name="4adsasd"]')).to.not.exist;
                            return [2 /*return*/];
                    }
                });
            }); });
            it('edits name attribute on primary action', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            testing_1.expect(doc.querySelector('GSEControl[name="myNewName"]')).to.not.exist;
                            nameField.value = 'myNewName';
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _a.sent();
                            primaryAction.click();
                            testing_1.expect(doc.querySelector('GSEControl[name="myNewName"]')).to.exist;
                            return [2 /*return*/];
                    }
                });
            }); });
            it('dynamically updates wizards after attribute change', function () { return __awaiter(void 0, void 0, void 0, function () {
                var gsecontrol;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            nameField.value = 'myNewName';
                            primaryAction.click();
                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                        case 1:
                            _b.sent(); // await animation
                            gsecontrol = (((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('filtered-list')).items[0]);
                            testing_1.expect(gsecontrol.innerHTML).to.contain('myNewName');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('returns back to its starting wizard on secondary action', function () { return __awaiter(void 0, void 0, void 0, function () {
                var report;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            secondaryAction.click();
                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                        case 1:
                            _b.sent(); // await animation
                            report = (((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('filtered-list')).items[0]);
                            testing_1.expect(report.innerHTML).to.contain('GCB');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('opens edit wizard for DataSet element on edit dataset button click', function () { return __awaiter(void 0, void 0, void 0, function () {
                var editDataSetButton, nameField;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            editDataSetButton = (Array.from(element.wizardUI.dialog.querySelectorAll('mwc-menu > mwc-list-item')).find(function (item) { return item.innerHTML.includes("[scl.DataSet]"); }));
                            return [4 /*yield*/, ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.requestUpdate())];
                        case 1:
                            _c.sent();
                            editDataSetButton.click();
                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                        case 2:
                            _c.sent(); // await animation
                            nameField = ((_b = element.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('wizard-textfield[label="name"]'));
                            return [4 /*yield*/, nameField.updateComplete];
                        case 3:
                            _c.sent();
                            testing_1.expect(nameField.value).to.equal(doc.querySelectorAll('DataSet')[1].getAttribute('name'));
                            return [2 /*return*/];
                    }
                });
            }); });
            it('opens a editGseWizard on edit GSE button click', function () { return __awaiter(void 0, void 0, void 0, function () {
                var editGseButton, macField;
                var _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            editGseButton = (Array.from(element.wizardUI.dialog.querySelectorAll('mwc-menu > mwc-list-item')).find(function (item) { return item.innerHTML.includes("[scl.Communication]"); }));
                            return [4 /*yield*/, ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.requestUpdate())];
                        case 1:
                            _e.sent();
                            editGseButton.click();
                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                        case 2:
                            _e.sent(); // await animation
                            macField = ((_b = element.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('wizard-textfield[label="MAC-Address"]'));
                            return [4 /*yield*/, macField.updateComplete];
                        case 3:
                            _e.sent();
                            testing_1.expect(macField.value).to.equal((_d = (_c = doc
                                .querySelector('GSE > Address > P[type="MAC-Address"]')) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.trim());
                            return [2 /*return*/];
                    }
                });
            }); });
            it('removes the GSEControl and its referenced elements on remove button click', function () { return __awaiter(void 0, void 0, void 0, function () {
                var deleteButton;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            testing_1.expect(doc.querySelector('IED[name="IED1"] GSEControl[name="GCB"]')).to
                                .exist;
                            testing_1.expect(doc.querySelector('IED[name="IED1"] DataSet[name="GooseDataSet1"]')).to.exist;
                            testing_1.expect(doc.querySelector('GSE[cbName="GCB"]')).to.exist;
                            deleteButton = (Array.from(element.wizardUI.dialog.querySelectorAll('mwc-menu > mwc-list-item')).find(function (item) { return item.innerHTML.includes("[remove]"); }));
                            return [4 /*yield*/, ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.requestUpdate())];
                        case 1:
                            _b.sent();
                            deleteButton.click();
                            testing_1.expect(doc.querySelector('IED[name="IED1"] GSEControl[name="GCB"]')).to
                                .not.exist;
                            testing_1.expect(doc.querySelector('IED[name="IED1"] DataSet[name="GooseDataSet1"]')).to.not.exist;
                            testing_1.expect(doc.querySelector('GSE[cbName="GCB"]')).to.not.exist;
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('loading a GSEControl with no connected DataSet', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var wizard;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            gseControl = doc.querySelector('GSEControl[name="GCB2"]');
                            wizard = gsecontrol_js_1.editGseControlWizard(gseControl);
                            element.dispatchEvent(foundation_js_1.newWizardEvent(function () { return wizard; }));
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('does not show edit DataSet button', function () { return __awaiter(void 0, void 0, void 0, function () {
                var editGseButton;
                return __generator(this, function (_a) {
                    editGseButton = (Array.from(element.wizardUI.dialog.querySelectorAll('mwc-menu > mwc-list-item')).find(function (item) { return item.innerHTML.includes("[scl.DataSet]"); }));
                    testing_1.expect(editGseButton).to.not.exist;
                    return [2 /*return*/];
                });
            }); });
        });
        describe('loading a GSEControl with no connected GSE', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var wizard;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            gseControl = doc.querySelector('IED[name="IED2"] GSEControl[name="GCB"]');
                            wizard = gsecontrol_js_1.editGseControlWizard(gseControl);
                            element.dispatchEvent(foundation_js_1.newWizardEvent(function () { return wizard; }));
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('does not show edit DataSet button', function () { return __awaiter(void 0, void 0, void 0, function () {
                var editGseButton;
                return __generator(this, function (_a) {
                    editGseButton = (Array.from(element.wizardUI.dialog.querySelectorAll('mwc-menu > mwc-list-item')).find(function (item) { return item.innerHTML.includes("[scl.Communication]"); }));
                    testing_1.expect(editGseButton).to.not.exist;
                    return [2 /*return*/];
                });
            }); });
        });
    });
});
var templateObject_1;
