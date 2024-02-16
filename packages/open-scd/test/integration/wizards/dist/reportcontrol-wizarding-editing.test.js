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
var reportcontrol_js_1 = require("../../../src/wizards/reportcontrol.js");
var foundation_js_1 = require("../../../src/foundation.js");
describe('Wizards for SCL element ReportControl', function () {
    var doc;
    var element;
    var primaryAction;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<mock-wizard-editor></mock-wizard-editor>"], ["<mock-wizard-editor></mock-wizard-editor>"]))))];
                case 1:
                    element = _a.sent();
                    return [4 /*yield*/, fetch('/test/testfiles/wizards/reportcontrol.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                case 2:
                    doc = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('define a select wizards that ', function () {
        var reportControlList;
        describe('with the document element as input', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var wizard;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            wizard = reportcontrol_js_1.selectReportControlWizard(doc.documentElement);
                            element.dispatchEvent(foundation_js_1.newWizardEvent(function () { return wizard; }));
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _b.sent();
                            reportControlList = ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('filtered-list'));
                            return [4 /*yield*/, reportControlList.updateComplete];
                        case 2:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('shows all ReportControl elements within a project', function () {
                return testing_1.expect(reportControlList.items.length).to.equal(doc.querySelectorAll('ReportControl').length);
            });
            it('opens edit wizard for selected ReportControl element on click', function () { return __awaiter(void 0, void 0, void 0, function () {
                var reportItem, nameField;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            reportItem = reportControlList.items[1];
                            reportItem.click();
                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 20); })];
                        case 1:
                            _b.sent(); // await animation
                            nameField = ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('wizard-textfield[label="name"]'));
                            return [4 /*yield*/, nameField.requestUpdate()];
                        case 2:
                            _b.sent();
                            testing_1.expect(nameField.value).to.equal(doc.querySelectorAll('ReportControl')[1].getAttribute('name'));
                            return [2 /*return*/];
                    }
                });
            }); });
            describe('has an add Report primary button that', function () {
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
                            wizard = reportcontrol_js_1.selectReportControlWizard(doc.querySelector('IED'));
                            element.dispatchEvent(foundation_js_1.newWizardEvent(function () { return wizard; }));
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _b.sent();
                            reportControlList = ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('filtered-list'));
                            return [4 /*yield*/, reportControlList.updateComplete];
                        case 2:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('allows to filter ReportControl elements per IED', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, testing_1.expect(reportControlList.items.length).to.equal(doc.querySelector('IED').querySelectorAll('ReportControl').length)];
                });
            }); });
            it('opens edit wizard for selected ReportControl element on click', function () { return __awaiter(void 0, void 0, void 0, function () {
                var reportItem, nameField;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            reportItem = reportControlList.items[1];
                            reportItem.click();
                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 20); })];
                        case 1:
                            _b.sent(); // await animation
                            nameField = ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('wizard-textfield[label="name"]'));
                            return [4 /*yield*/, nameField.requestUpdate()];
                        case 2:
                            _b.sent();
                            testing_1.expect(nameField.value).to.equal(doc.querySelectorAll('ReportControl')[1].getAttribute('name'));
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
    describe('defines an edit wizard that', function () {
        var nameField;
        var secondaryAction;
        var parentIED;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var report;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        element.workflow.length = 0; // remove all wizard from FIFO queue
                        parentIED = doc.querySelector('IED');
                        element.dispatchEvent(foundation_js_1.newWizardEvent(function () { return reportcontrol_js_1.selectReportControlWizard(parentIED); }));
                        return [4 /*yield*/, element.requestUpdate()];
                    case 1:
                        _d.sent();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 20); })];
                    case 2:
                        _d.sent(); // await animation
                        report = (((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('filtered-list'))
                            .items[1]);
                        report.click();
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
                        testing_1.expect((_a = parentIED.querySelectorAll('ReportControl')[1]) === null || _a === void 0 ? void 0 : _a.getAttribute('name')).to.not.equal('4adsasd');
                        nameField.value = '4adsasd';
                        return [4 /*yield*/, element.requestUpdate()];
                    case 1:
                        _c.sent();
                        primaryAction.click();
                        testing_1.expect((_b = parentIED.querySelectorAll('ReportControl')[1]) === null || _b === void 0 ? void 0 : _b.getAttribute('name')).to.not.equal('4adsasd');
                        return [2 /*return*/];
                }
            });
        }); });
        it('edits name attribute on primary action', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        testing_1.expect((_a = parentIED.querySelectorAll('ReportControl')[1]) === null || _a === void 0 ? void 0 : _a.getAttribute('name')).to.not.equal('myNewName');
                        nameField.value = 'myNewName';
                        return [4 /*yield*/, element.requestUpdate()];
                    case 1:
                        _c.sent();
                        primaryAction.click();
                        testing_1.expect((_b = parentIED.querySelectorAll('ReportControl')[1]) === null || _b === void 0 ? void 0 : _b.getAttribute('name')).to.equal('myNewName');
                        return [2 /*return*/];
                }
            });
        }); });
        it('dynamically updates wizards after attribute change', function () { return __awaiter(void 0, void 0, void 0, function () {
            var report;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        nameField.value = 'myNewName';
                        primaryAction.click();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 1:
                        _b.sent(); // await animation
                        report = (((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('filtered-list'))
                            .items[1]);
                        testing_1.expect(report.innerHTML).to.contain('myNewName');
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
                        report = (((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('filtered-list'))
                            .items[0]);
                        testing_1.expect(report.innerHTML).to.contain('ReportCb');
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
        it('opens edit wizard for TrgOps element on edit trigger options button click', function () { return __awaiter(void 0, void 0, void 0, function () {
            var editTrgOpsButton, dchgSelect;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        editTrgOpsButton = (Array.from(element.wizardUI.dialog.querySelectorAll('mwc-menu > mwc-list-item')).find(function (item) { return item.innerHTML.includes("[scl.TrgOps]"); }));
                        return [4 /*yield*/, ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.requestUpdate())];
                    case 1:
                        _c.sent();
                        editTrgOpsButton.click();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 2:
                        _c.sent(); // await animation
                        dchgSelect = ((_b = element.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('wizard-checkbox[label="dchg"]'));
                        return [4 /*yield*/, dchgSelect.updateComplete];
                    case 3:
                        _c.sent();
                        testing_1.expect(dchgSelect).to.exist;
                        return [2 /*return*/];
                }
            });
        }); });
        it('opens edit wizard for OptFields element on edit optional fields button click', function () { return __awaiter(void 0, void 0, void 0, function () {
            var editOptFieldsButton, seqNumSelect;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        editOptFieldsButton = (Array.from(element.wizardUI.dialog.querySelectorAll('mwc-menu > mwc-list-item')).find(function (item) { return item.innerHTML.includes("[scl.OptFields]"); }));
                        return [4 /*yield*/, ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.requestUpdate())];
                    case 1:
                        _c.sent();
                        editOptFieldsButton.click();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 2:
                        _c.sent(); // await animation
                        seqNumSelect = ((_b = element.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('wizard-checkbox[label="seqNum"]'));
                        return [4 /*yield*/, seqNumSelect.updateComplete];
                    case 3:
                        _c.sent();
                        testing_1.expect(seqNumSelect).to.exist;
                        return [2 /*return*/];
                }
            });
        }); });
        it('removes the ReportControl element and its referenced elements on remove button click', function () { return __awaiter(void 0, void 0, void 0, function () {
            var deleteElement;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        testing_1.expect(doc.querySelector('IED[name="IED2"] LN[lnClass="XSWI"] ReportControl[name="ReportCb2"]')).to.exist;
                        testing_1.expect(doc.querySelector('IED[name="IED2"] LN[lnClass="XSWI"][inst="1"] DataSet[name="dataSet"]')).to.exist;
                        deleteElement = (Array.from(element.wizardUI.dialog.querySelectorAll('mwc-menu > mwc-list-item')).find(function (item) { return item.innerHTML.includes("[remove]"); }));
                        return [4 /*yield*/, ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.requestUpdate())];
                    case 1:
                        _b.sent();
                        deleteElement.click();
                        testing_1.expect(doc.querySelector('IED[name="IED2"] LN[lnClass="XSWI"][inst="1"] ReportControl[name="ReportCb2"]')).to.not.exist;
                        testing_1.expect(doc.querySelector('IED[name="IED2"] LN[lnClass="XSWI"][inst="1"] DataSet[name="dataSet"]')).to.not.exist;
                        return [2 /*return*/];
                }
            });
        }); });
        it('opens a IEDs selector wizard on copy to other IEDs meu action', function () { return __awaiter(void 0, void 0, void 0, function () {
            var copyMenuAction, iedsPicker;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        copyMenuAction = (Array.from(element.wizardUI.dialog.querySelectorAll('mwc-menu > mwc-list-item')).find(function (item) { return item.innerHTML.includes("[controlblock.label.copy]"); }));
                        return [4 /*yield*/, ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.requestUpdate())];
                    case 1:
                        _c.sent();
                        copyMenuAction.click();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 2:
                        _c.sent(); // await animation
                        iedsPicker = (_b = element.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('filtered-list');
                        testing_1.expect(iedsPicker).to.exist;
                        testing_1.expect(iedsPicker.multi).to.be["true"];
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('defines a selector wizard to select ReportControl parent', function () {
        var iEDPicker;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var wizard;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        wizard = reportcontrol_js_1.reportControlParentSelector(doc);
                        element.dispatchEvent(foundation_js_1.newWizardEvent(function () { return wizard; }));
                        return [4 /*yield*/, element.requestUpdate()];
                    case 1:
                        _c.sent();
                        iEDPicker = ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('finder-list'));
                        primaryAction = ((_b = element.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('mwc-button[slot="primaryAction"]'));
                        return [2 /*return*/];
                }
            });
        }); });
        it('opens a potential list of host IEDs for the ReportControl element', function () {
            return testing_1.expect(iEDPicker).to.exist;
        });
        it('is not of type multi', function () { return testing_1.expect(iEDPicker.multi).to.be["false"]; });
        it('forwards LN0/LN as parent to ReportControl create wizard', function () { return __awaiter(void 0, void 0, void 0, function () {
            var nameField;
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        testing_1.expect((_a = doc
                            .querySelector('IED[name="IED3"]')) === null || _a === void 0 ? void 0 : _a.querySelectorAll('LN0 > ReportControl')).to.have.lengthOf(1);
                        iEDPicker.path = ['IED: IED3'];
                        primaryAction.click();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 1:
                        _e.sent(); // await animation
                        nameField = ((_b = element.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('wizard-textfield[label="name"]'));
                        testing_1.expect(nameField).to.exist;
                        ((_c = element.wizardUI.dialogs[3]) === null || _c === void 0 ? void 0 : _c.querySelector('mwc-button[slot="primaryAction"]')).click();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 2:
                        _e.sent(); // await animation
                        testing_1.expect((_d = doc
                            .querySelector('IED[name="IED3"]')) === null || _d === void 0 ? void 0 : _d.querySelectorAll('LN0 > ReportControl')).to.have.lengthOf(2);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('defines a selector wizard to select ReportControl copy to sink', function () {
        var iedsPicker;
        var listItem;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var sourceReportControl, wizard;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        sourceReportControl = doc.querySelector('IED[name="IED2"] ReportControl[name="ReportCb"]');
                        wizard = reportcontrol_js_1.reportControlCopyToIedSelector(sourceReportControl);
                        element.dispatchEvent(foundation_js_1.newWizardEvent(function () { return wizard; }));
                        return [4 /*yield*/, element.requestUpdate()];
                    case 1:
                        _c.sent();
                        iedsPicker = ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('filtered-list'));
                        primaryAction = ((_b = element.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('mwc-button[slot="primaryAction"]'));
                        return [2 /*return*/];
                }
            });
        }); });
        it('opens a potential list of sink IEDs for the copy operation', function () {
            return testing_1.expect(iedsPicker).to.exist;
        });
        describe('with a sink IED not meeting any of the data references', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            listItem = (iedsPicker.items.find(function (item) { return item.value.includes('IED4'); }));
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('disables the list item', function () { return testing_1.expect(listItem.disabled).to.be["true"]; });
            it('does not copy the control block ', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            listItem.selected = true;
                            return [4 /*yield*/, listItem.requestUpdate()];
                        case 1:
                            _a.sent();
                            primaryAction.click();
                            testing_1.expect(doc.querySelector('IED[name="IED4"] ReportControl')).to.not
                                .exist;
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('with a sink IED meeting partially the data references', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            listItem = (iedsPicker.items.find(function (item) { return item.value.includes('IED5'); }));
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, listItem.requestUpdate()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('list item is selectable', function () {
                return testing_1.expect(listItem.disabled).to.be["false"];
            });
            it('does copy the control block ', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            listItem.selected = true;
                            return [4 /*yield*/, listItem.requestUpdate()];
                        case 1:
                            _a.sent();
                            primaryAction.click();
                            testing_1.expect(doc.querySelector('IED[name="IED5"] ReportControl')).to.exist;
                            return [2 /*return*/];
                    }
                });
            }); });
            it('removes non referenced data from the DataSet the control block ', function () { return __awaiter(void 0, void 0, void 0, function () {
                var rpControl, dataSet;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            listItem.selected = true;
                            return [4 /*yield*/, listItem.requestUpdate()];
                        case 1:
                            _a.sent();
                            primaryAction.click();
                            rpControl = doc.querySelector('IED[name="IED5"] ReportControl');
                            dataSet = doc.querySelector("IED[name=\"IED5\"] DataSet[name=\"" + rpControl.getAttribute('datSet') + "\"]");
                            testing_1.expect(dataSet).to.exist;
                            testing_1.expect(dataSet.children).to.have.lengthOf(3);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('with a sink IED already containing ReportControl', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            listItem = (iedsPicker.items.find(function (item) { return item.value.includes('IED4'); }));
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('list item is disabled', function () { return testing_1.expect(listItem.disabled).to.be["true"]; });
            it('does not copy report control block nor DataSet ', function () { return __awaiter(void 0, void 0, void 0, function () {
                var rpControl, dataSet;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            listItem.selected = true;
                            return [4 /*yield*/, listItem.requestUpdate()];
                        case 1:
                            _a.sent();
                            primaryAction.click();
                            rpControl = doc.querySelector('IED[name="IED6"] ReportControl');
                            testing_1.expect(rpControl.getAttribute('datSet')).to.not.exist;
                            dataSet = doc.querySelector("IED[name=\"IED6\"] DataSet");
                            testing_1.expect(dataSet).to.not.exist;
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('with a sink IED already containing DataSet', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            listItem = (iedsPicker.items.find(function (item) { return item.value.includes('IED7'); }));
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('does not copy report control block nor DataSet ', function () { return __awaiter(void 0, void 0, void 0, function () {
                var rpControl, dataSet;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            listItem.selected = true;
                            return [4 /*yield*/, listItem.requestUpdate()];
                        case 1:
                            _a.sent();
                            primaryAction.click();
                            rpControl = doc.querySelector('IED[name="IED7"] ReportControl');
                            testing_1.expect(rpControl).to.not.exist;
                            dataSet = doc.querySelector("IED[name=\"IED7\"] DataSet");
                            testing_1.expect(dataSet === null || dataSet === void 0 ? void 0 : dataSet.children).to.have.lengthOf(3);
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
                        wizard = reportcontrol_js_1.createReportControlWizard(doc.querySelector('LN0'));
                        element.dispatchEvent(foundation_js_1.newWizardEvent(function () { return wizard; }));
                        return [4 /*yield*/, element.requestUpdate()];
                    case 1:
                        _b.sent();
                        primaryAction = ((_a = element.wizardUI.dialogs[3]) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-button[slot="primaryAction"]'));
                        return [2 /*return*/];
                }
            });
        }); });
        it('creates a new instance of a ReportControl element', function () {
            var _a, _b;
            testing_1.expect((_a = doc
                .querySelector('IED[name="IED2"]')) === null || _a === void 0 ? void 0 : _a.querySelectorAll('LN0 > ReportControl')).to.have.lengthOf(1);
            primaryAction.click();
            testing_1.expect((_b = doc
                .querySelector('IED[name="IED2"]')) === null || _b === void 0 ? void 0 : _b.querySelectorAll('LN0 > ReportControl')).to.have.lengthOf(2);
        });
        it('creates a new instance of a DataSet element referenced from ReportControl', function () {
            var _a, _b;
            testing_1.expect((_a = doc
                .querySelector('IED[name="IED2"]')) === null || _a === void 0 ? void 0 : _a.querySelectorAll('LN0 > DataSet')).to.have.lengthOf(1);
            primaryAction.click();
            testing_1.expect((_b = doc
                .querySelector('IED[name="IED2"]')) === null || _b === void 0 ? void 0 : _b.querySelectorAll('LN0 > DataSet')).to.have.lengthOf(2);
        });
    });
});
var templateObject_1;
