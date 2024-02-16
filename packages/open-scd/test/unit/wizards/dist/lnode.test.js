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
var fast_check_1 = require("fast-check");
var sinon_1 = require("sinon");
require("../../mock-wizard-editor.js");
var foundation_js_1 = require("../../../src/foundation.js");
var foundation_js_2 = require("../../foundation.js");
var lnode_js_1 = require("../../../src/wizards/lnode.js");
describe('Wizards for LNode element', function () {
    var element;
    var doc;
    var primaryAction;
    var actionEvent;
    var logEvent;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('/test/testfiles/lnodewizard.scd')
                        .then(function (response) { return response.text(); })
                        .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                case 1:
                    doc = _a.sent();
                    return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<mock-wizard-editor></mock-wizard-editor>"], ["<mock-wizard-editor></mock-wizard-editor>"]))))];
                case 2:
                    element = (_a.sent());
                    actionEvent = sinon_1.spy();
                    window.addEventListener('editor-action', actionEvent);
                    logEvent = sinon_1.spy();
                    window.addEventListener('log', logEvent);
                    return [2 /*return*/];
            }
        });
    }); });
    describe('contain a LNode instantiate wizard that', function () {
        describe('with existing LLN0 and LPHD instances', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var wizard;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            wizard = lnode_js_1.lNodeWizard(doc.querySelector('Function[name="parentFunction"]'));
                            element.dispatchEvent(foundation_js_1.newWizardEvent(wizard));
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).to.equalSnapshot()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); });
            describe('has a primary action that', function () {
                var primaryAction;
                var listItems;
                beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var wizard;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                wizard = lnode_js_1.lNodeWizard(doc.querySelector('SubFunction[name="disconnector"]'));
                                element.dispatchEvent(foundation_js_1.newWizardEvent(wizard));
                                return [4 /*yield*/, element.requestUpdate()];
                            case 1:
                                _b.sent();
                                primaryAction = ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-button[slot="primaryAction"]'));
                                listItems = Array.from(element.wizardUI.dialog.querySelectorAll('mwc-check-list-item'));
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('triggers error log massage when duplicate LLN0 classes are added', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        listItems[0].selected = true;
                        primaryAction.click();
                        testing_1.expect(logEvent).to.have.be.calledOnce;
                        testing_1.expect(logEvent.args[0][0].detail.message).to.contain('lnode.log.uniqueln0');
                        return [2 /*return*/];
                    });
                }); });
                it('triggers error log massage when duplicate LPHD classes are added', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        listItems[1].selected = true;
                        primaryAction.click();
                        testing_1.expect(logEvent).to.have.be.calledOnce;
                        testing_1.expect(logEvent.args[0][0].detail.message).to.contain('lnode.log.uniqueln0');
                        return [2 /*return*/];
                    });
                }); });
                it('trigger error log message when not unique lnInst can be find', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var parent, i, element_1;
                    return __generator(this, function (_a) {
                        parent = doc.querySelector('SubFunction[name="disconnector"]')
                            .parentElement;
                        for (i = 1; i <= 99; i++) {
                            element_1 = (doc.createElementNS(doc.documentElement.namespaceURI, 'LNode'));
                            element_1.setAttribute('lnClass', 'CILO');
                            element_1.setAttribute('lnInst', "" + i);
                            parent.appendChild(element_1);
                        }
                        listItems[4].selected = true;
                        primaryAction.click();
                        testing_1.expect(logEvent).to.have.be.calledOnce;
                        testing_1.expect(logEvent.args[0][0].detail.message).to.contain('lnode.log.nonuniquelninst');
                        return [2 /*return*/];
                    });
                }); });
            });
        });
        describe('with existing LLN0 but missing LPHD instances', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var wizard;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            wizard = lnode_js_1.lNodeWizard(doc.querySelector('SubFunction[name="circuitBreaker"]'));
                            element.dispatchEvent(foundation_js_1.newWizardEvent(wizard));
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).to.equalSnapshot()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); });
        });
        describe('with missing LLN0 and LPHD instances', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var wizard;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            wizard = lnode_js_1.lNodeWizard(doc.querySelector('SubFunction[name="disconnector"]'));
                            element.dispatchEvent(foundation_js_1.newWizardEvent(wizard));
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).to.equalSnapshot()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); });
        });
        describe('has a primary action that', function () {
            var primaryAction;
            var listItems;
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var wizard;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            wizard = lnode_js_1.lNodeWizard(doc.querySelector('SubFunction[name="disconnector"]'));
                            element.dispatchEvent(foundation_js_1.newWizardEvent(wizard));
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _b.sent();
                            primaryAction = ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-button[slot="primaryAction"]'));
                            listItems = Array.from(element.wizardUI.dialog.querySelectorAll('mwc-check-list-item'));
                            return [2 /*return*/];
                    }
                });
            }); });
            it('triggers Create action for all selected LNodeType', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            listItems[1].selected = true;
                            listItems[2].selected = true;
                            listItems[3].selected = true;
                            return [4 /*yield*/, primaryAction.click()];
                        case 1:
                            _a.sent();
                            testing_1.expect(actionEvent).to.have.be.calledThrice;
                            testing_1.expect(actionEvent.args[0][0].detail.action).to.satisfy(foundation_js_1.isCreate);
                            testing_1.expect(actionEvent.args[1][0].detail.action).to.satisfy(foundation_js_1.isCreate);
                            testing_1.expect(actionEvent.args[2][0].detail.action).to.satisfy(foundation_js_1.isCreate);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('does set iedName, lnCalss, lnInst and lnType', function () { return __awaiter(void 0, void 0, void 0, function () {
                var action;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            listItems[2].selected = true;
                            return [4 /*yield*/, primaryAction.click()];
                        case 1:
                            _a.sent();
                            testing_1.expect(actionEvent).to.have.be.calledOnce;
                            action = actionEvent.args[0][0].detail.action;
                            testing_1.expect(action["new"].element).to.have.attribute('iedName', 'None');
                            testing_1.expect(action["new"].element).to.have.attribute('lnClass', 'XCBR');
                            testing_1.expect(action["new"].element).to.have.attribute('lnInst', '1');
                            testing_1.expect(action["new"].element).to.have.attribute('lnType', 'Dummy.XCBR1');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('does not set ldInst and prefix', function () { return __awaiter(void 0, void 0, void 0, function () {
                var action;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            listItems[4].selected = true;
                            return [4 /*yield*/, primaryAction.click()];
                        case 1:
                            _a.sent();
                            testing_1.expect(actionEvent).to.have.be.calledOnce;
                            action = actionEvent.args[0][0].detail.action;
                            testing_1.expect(action["new"].element).to.not.have.attribute('ldInst');
                            testing_1.expect(action["new"].element).to.not.have.attribute('prefix');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('makes sure that lnInst is unique in case lnClass is existing already', function () { return __awaiter(void 0, void 0, void 0, function () {
                var action;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            listItems[4].selected = true;
                            return [4 /*yield*/, primaryAction.click()];
                        case 1:
                            _a.sent();
                            testing_1.expect(actionEvent).to.have.be.calledOnce;
                            action = actionEvent.args[0][0].detail.action;
                            testing_1.expect(action["new"].element).to.have.attribute('lnInst', '2');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('makes sure that lnInst is unique if several LNodeType with same lnClass are selected', function () { return __awaiter(void 0, void 0, void 0, function () {
                var action1, action2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            listItems[3].selected = true;
                            listItems[5].selected = true;
                            return [4 /*yield*/, primaryAction.click()];
                        case 1:
                            _a.sent();
                            testing_1.expect(actionEvent).to.have.be.calledTwice;
                            action1 = actionEvent.args[0][0].detail.action;
                            action2 = actionEvent.args[1][0].detail.action;
                            testing_1.expect(action1["new"].element).to.have.attribute('lnInst', '2');
                            testing_1.expect(action2["new"].element).to.have.attribute('lnInst', '4');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('does add empty string to LNode with lnClass LLN0', function () { return __awaiter(void 0, void 0, void 0, function () {
                var action;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            listItems[0].selected = true;
                            return [4 /*yield*/, primaryAction.click()];
                        case 1:
                            _a.sent();
                            testing_1.expect(actionEvent).to.have.be.calledOnce;
                            action = actionEvent.args[0][0].detail.action;
                            testing_1.expect(action["new"].element).to.have.attribute('lnInst', '');
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe('contain a LNode reference create wizard that', function () {
        describe('with references to existing logical nodes', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var wizard;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            wizard = lnode_js_1.lNodeWizard(doc.querySelector('ConductingEquipment[name="QB1"]'));
                            element.dispatchEvent(foundation_js_1.newWizardEvent(wizard));
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).to.equalSnapshot()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); });
        });
        describe('with missing references to existing logical nodes', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var wizard;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            wizard = lnode_js_1.lNodeWizard(doc.querySelector('Substation'));
                            element.dispatchEvent(foundation_js_1.newWizardEvent(wizard));
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).to.equalSnapshot()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); });
        });
    });
    describe('contain a edit wizard that', function () {
        var inputs;
        describe('for a type reference', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var wizard;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            wizard = lnode_js_1.editLNodeWizard(doc.querySelector('SubFunction[name="disconnector"] > LNode'));
                            element.dispatchEvent(foundation_js_1.newWizardEvent(wizard));
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _b.sent();
                            inputs = Array.from(element.wizardUI.inputs);
                            primaryAction = ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-button[slot="primaryAction"]'));
                            return [4 /*yield*/, element.updateComplete];
                        case 2:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).to.equalSnapshot()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); });
            it('edits prefix attribute only for valid inputs', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_2.regexString(foundation_js_2.regExp.tAsciName, 1, 11), function (name) { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            inputs[2].value = name;
                                            return [4 /*yield*/, inputs[2].requestUpdate()];
                                        case 1:
                                            _a.sent();
                                            testing_1.expect(inputs[2].checkValidity()).to.be["true"];
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('rejects name attribute starting with decimals', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_2.regexString(foundation_js_2.regExp.decimal, 1, 1), function (name) { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            inputs[2].value = name;
                                            return [4 /*yield*/, inputs[2].requestUpdate()];
                                        case 1:
                                            _a.sent();
                                            testing_1.expect(inputs[2].checkValidity()).to.be["false"];
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('rejects negative integrers for lnInst attribute', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            inputs[4].value = '-1';
                            return [4 /*yield*/, inputs[4].requestUpdate()];
                        case 1:
                            _a.sent();
                            testing_1.expect(inputs[4].checkValidity()).to.be["false"];
                            return [2 /*return*/];
                    }
                });
            }); });
            it('rejects 0 for lnInst attribute', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            inputs[4].value = '0';
                            return [4 /*yield*/, inputs[4].requestUpdate()];
                        case 1:
                            _a.sent();
                            testing_1.expect(inputs[4].checkValidity()).to.be["false"];
                            return [2 /*return*/];
                    }
                });
            }); });
            it('rejects positve integrers bigger 100 for lnInst attribute', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            inputs[4].value = '100';
                            return [4 /*yield*/, inputs[4].requestUpdate()];
                        case 1:
                            _a.sent();
                            testing_1.expect(inputs[4].checkValidity()).to.be["false"];
                            return [2 /*return*/];
                    }
                });
            }); });
            it('rejects non unique lnInst attribute', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            inputs[4].value = '3';
                            return [4 /*yield*/, inputs[4].requestUpdate()];
                        case 1:
                            _a.sent();
                            testing_1.expect(inputs[4].checkValidity()).to.be["false"];
                            return [2 /*return*/];
                    }
                });
            }); });
            it('does not update the LNode element when no attribute has changed', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            primaryAction.click();
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _a.sent();
                            testing_1.expect(actionEvent.notCalled).to.be["true"];
                            return [2 /*return*/];
                    }
                });
            }); });
            it('update a LNode element on prefix attribute changed', function () { return __awaiter(void 0, void 0, void 0, function () {
                var input, action;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            input = inputs[2];
                            (_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click();
                            input.value = 'somepref';
                            primaryAction.click();
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _b.sent();
                            testing_1.expect(actionEvent).to.be.calledOnce;
                            action = actionEvent.args[0][0].detail.action;
                            testing_1.expect(action.old.element).to.not.have.attribute('prefix');
                            testing_1.expect(action["new"].element).to.have.attribute('prefix', 'somepref');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('update a ReportControl element when only desc attribute changed', function () { return __awaiter(void 0, void 0, void 0, function () {
                var input, action;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            input = inputs[4];
                            input.value = '34';
                            return [4 /*yield*/, input.requestUpdate()];
                        case 1:
                            _a.sent();
                            primaryAction.click();
                            return [4 /*yield*/, element.requestUpdate()];
                        case 2:
                            _a.sent();
                            testing_1.expect(actionEvent).to.be.calledOnce;
                            action = actionEvent.args[0][0].detail.action;
                            testing_1.expect(action.old.element).to.have.attribute('lnInst', '1');
                            testing_1.expect(action["new"].element).to.have.attribute('lnInst', '34');
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('for a IED reference', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var wizard;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            wizard = lnode_js_1.editLNodeWizard(doc.querySelector('Bay[name="COUPLING_BAY"] > LNode'));
                            element.dispatchEvent(foundation_js_1.newWizardEvent(wizard));
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).to.equalSnapshot()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); });
        });
    });
});
var templateObject_1;
