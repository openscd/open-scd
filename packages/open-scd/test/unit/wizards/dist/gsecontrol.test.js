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
var sinon_1 = require("sinon");
var fast_check_1 = require("fast-check");
require("../../../src/addons/Wizards.js");
var foundation_js_1 = require("../../../src/foundation.js");
var gsecontrol_js_1 = require("../../../src/wizards/gsecontrol.js");
var foundation_js_2 = require("../../foundation.js");
describe('gsecontrol wizards', function () {
    var doc;
    var element;
    var primaryAction;
    var actionEvent;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<oscd-wizards .host=", "></oscd-wizards>"], ["<oscd-wizards .host=", "></oscd-wizards>"])), document))];
                case 1:
                    element = _a.sent();
                    return [4 /*yield*/, fetch('/test/testfiles/wizards/gsecontrol.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                case 2:
                    doc = _a.sent();
                    actionEvent = sinon_1.spy();
                    window.addEventListener('editor-action', actionEvent);
                    return [2 /*return*/];
            }
        });
    }); });
    describe('selectGseControlWizard', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var wizard;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wizard = gsecontrol_js_1.selectGseControlWizard(doc.documentElement);
                        element.workflow.push(function () { return wizard; });
                        return [4 /*yield*/, element.requestUpdate()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).to.equalSnapshot()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }).timeout(5000);
    });
    describe('renderGseAttribute', function () {
        var nameTextField;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var wizard;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wizard = [
                            {
                                title: 'title',
                                content: gsecontrol_js_1.contentGseControlWizard({
                                    name: 'GSEcontrol',
                                    desc: null,
                                    type: 'GOOSE',
                                    appID: 'myIED/myAP/myLD/myLN0/myGSE',
                                    fixedOffs: null,
                                    securityEnabled: null
                                })
                            },
                        ];
                        element.workflow.push(function () { return wizard; });
                        return [4 /*yield*/, element.requestUpdate()];
                    case 1:
                        _a.sent();
                        nameTextField = element.wizardUI.dialog.querySelector('wizard-textfield[label="name"]');
                        return [2 /*return*/];
                }
            });
        }); });
        it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).to.equalSnapshot()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }).timeout(5000);
        it('edits name attribute only for valid inputs', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_2.regexString(foundation_js_2.regExp.tAsciName, 1, 32), function (name) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        nameTextField.value = name;
                                        return [4 /*yield*/, nameTextField.requestUpdate()];
                                    case 1:
                                        _a.sent();
                                        testing_1.expect(nameTextField.checkValidity()).to.be["true"];
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
                                        nameTextField.value = name;
                                        return [4 /*yield*/, nameTextField.requestUpdate()];
                                    case 1:
                                        _a.sent();
                                        testing_1.expect(nameTextField.checkValidity()).to.be["false"];
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
    });
    describe('editGseControlWizard', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var wizard;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wizard = gsecontrol_js_1.editGseControlWizard(doc.querySelector('GSEControl'));
                        element.workflow.push(function () { return wizard; });
                        return [4 /*yield*/, element.requestUpdate()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).to.equalSnapshot()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }).timeout(5000);
    });
    describe('removeGseControl', function () {
        var ln01gse = new DOMParser().parseFromString("<LN0 lnClass=\"LLN0\" lnType=\"myType\">\n            <DataSet name=\"myDataSet\"/>\n            <DataSet name=\"myDataSet2\"/>\n            <GSEControl name=\"myName\" datSet=\"myDataSet\"/>\n            <GSEControl name=\"myName2\" datSet=\"myDataSet2\"/>\n        </LN0>", 'application/xml').documentElement;
        var ln02gse = new DOMParser().parseFromString("<LN0 lnClass=\"LLN0\" lnType=\"myType\">\n              <DataSet name=\"myDataSet\"/>\n              <GSEControl name=\"myName\" datSet=\"myDataSet\"/>\n              <GSEControl name=\"myName2\" datSet=\"myDataSet\"/>\n          </LN0>", 'application/xml').documentElement;
        var ln02rp = new DOMParser().parseFromString("<LN0 lnClass=\"LLN0\" lnType=\"myType\">\n                <DataSet name=\"myDataSet\"/>\n                <GSEControl name=\"myName\" datSet=\"myDataSet\"/>\n                <ReportControl name=\"myName2\" datSet=\"myDataSet\"/>\n            </LN0>", 'application/xml').documentElement;
        var ln02smv = new DOMParser().parseFromString("<LN0 lnClass=\"LLN0\" lnType=\"myType\">\n            <DataSet name=\"myDataSet\"/>\n            <GSEControl name=\"myName\" datSet=\"myDataSet\"/>\n            <SampledValueControl name=\"myName2\" datSet=\"myDataSet\"/>\n        </LN0>", 'application/xml').documentElement;
        var missingparent = (new DOMParser().parseFromString("<GSEControl name=\"myName\" datSet=\"myDataSet\"/>", 'application/xml').documentElement);
        it('removes GSEControl and its refereced DataSet if no other GSEControl are aasinged', function () {
            var gseControl = ln01gse.querySelector('GSEControl');
            var actions = gsecontrol_js_1.removeGseControlAction(gseControl).actions;
            testing_1.expect(actions.length).to.equal(2);
            testing_1.expect(actions[0]).to.satisfy(foundation_js_1.isDelete);
            testing_1.expect(actions[0].old.element).to.equal(gseControl);
            testing_1.expect(actions[1]).to.satisfy(foundation_js_1.isDelete);
            testing_1.expect(actions[1].old.element).to.equal(ln01gse.querySelector('DataSet'));
        });
        it('removes GSEControl only if other GSEControl is assinged to the same DataSet', function () {
            var gseControl = ln02gse.querySelector('GSEControl');
            var actions = gsecontrol_js_1.removeGseControlAction(gseControl).actions;
            testing_1.expect(actions.length).to.equal(1);
            testing_1.expect(actions[0]).to.satisfy(foundation_js_1.isDelete);
            testing_1.expect(actions[0].old.element).to.equal(gseControl);
        });
        it('removes GSEControl only if other ReportControlBlock is assinged to the same DataSet', function () {
            var gseControl = ln02rp.querySelector('GSEControl');
            var actions = gsecontrol_js_1.removeGseControlAction(gseControl).actions;
            testing_1.expect(actions.length).to.equal(1);
            testing_1.expect(actions[0]).to.satisfy(foundation_js_1.isDelete);
            testing_1.expect(actions[0].old.element).to.equal(gseControl);
        });
        it('removes GSEControl only if other SMV is assinged to the same DataSet', function () {
            var gseControl = ln02smv.querySelector('GSEControl');
            var actions = gsecontrol_js_1.removeGseControlAction(gseControl).actions;
            testing_1.expect(actions.length).to.equal(1);
            testing_1.expect(actions[0]).to.satisfy(foundation_js_1.isDelete);
            testing_1.expect(actions[0].old.element).to.equal(gseControl);
        });
        it('does not remove with missing parent element', function () {
            var action = gsecontrol_js_1.removeGseControlAction(missingparent);
            testing_1.expect(action).to.be["null"];
        });
        it('removes GSE element if present in the Communication section', function () {
            var gseControl = doc.querySelector('IED[name="IED1"] GSEControl');
            var actions = gsecontrol_js_1.removeGseControlAction(gseControl).actions;
            testing_1.expect(actions.length).to.equal(3);
            testing_1.expect(actions[0]).to.satisfy(foundation_js_1.isDelete);
            testing_1.expect(actions[0].old.element).to.equal(gseControl);
            testing_1.expect(actions[1]).to.satisfy(foundation_js_1.isDelete);
            testing_1.expect(actions[2]).to.satisfy(foundation_js_1.isDelete);
            testing_1.expect(actions[2].old.element).to.equal(doc.querySelector('Communication GSE[ldInst="CircuitBreaker_CB1"][cbName="GCB"]'));
        });
    });
    describe('updateGseControlAction', function () {
        var gseControl = (new DOMParser().parseFromString("<GSEControl name=\"myCbName\" type=\"GOOSE\" datSet=\"myDataSet\" appID=\"myAPP/ID\"></GSEControl>", 'application/xml').documentElement);
        var inputs;
        var wizard;
        var noOp = function () {
            return;
        };
        var newWizard = function (done) {
            if (done === void 0) { done = noOp; }
            var element = document.createElement('mwc-dialog');
            element.close = done;
            return element;
        };
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wizard = [
                            {
                                title: 'title',
                                content: gsecontrol_js_1.contentGseControlWizard({
                                    name: 'myCbName',
                                    desc: null,
                                    type: 'GOOSE',
                                    appID: 'myAPP/ID',
                                    fixedOffs: null,
                                    securityEnabled: null
                                })
                            },
                        ];
                        element.workflow.push(function () { return wizard; });
                        return [4 /*yield*/, element.requestUpdate()];
                    case 1:
                        _a.sent();
                        inputs = Array.from(element.wizardUI.inputs);
                        return [4 /*yield*/, element.requestUpdate()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('does not update a GSEControl element when no attribute nor Val has changed', function () {
            var editorAction = gsecontrol_js_1.updateGseControlAction(gseControl);
            testing_1.expect(editorAction(inputs, newWizard())).to.be.empty;
        });
        it('update a GSEControl element when only name attribute changed', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input, editorAction, updateActions, updateAction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        input = inputs[0];
                        input.value = 'myNewCbName';
                        return [4 /*yield*/, input.requestUpdate()];
                    case 1:
                        _a.sent();
                        editorAction = gsecontrol_js_1.updateGseControlAction(gseControl);
                        updateActions = editorAction(inputs, newWizard());
                        testing_1.expect(updateActions.length).to.equal(1);
                        testing_1.expect(updateActions[0]).to.satisfy(foundation_js_1.isReplace);
                        updateAction = updateActions[0];
                        testing_1.expect(updateAction.old.element).to.have.attribute('name', 'myCbName');
                        testing_1.expect(updateAction["new"].element).to.have.attribute('name', 'myNewCbName');
                        return [2 /*return*/];
                }
            });
        }); });
        it('update a GSEControl element when only desc attribute changed', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input, editorAction, updateActions, updateAction;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        input = inputs[1];
                        (_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click();
                        input.value = 'myDesc';
                        return [4 /*yield*/, input.requestUpdate()];
                    case 1:
                        _b.sent();
                        editorAction = gsecontrol_js_1.updateGseControlAction(gseControl);
                        updateActions = editorAction(inputs, newWizard());
                        testing_1.expect(updateActions.length).to.equal(1);
                        testing_1.expect(updateActions[0]).to.satisfy(foundation_js_1.isReplace);
                        updateAction = updateActions[0];
                        testing_1.expect(updateAction.old.element).to.not.have.attribute('desc');
                        testing_1.expect(updateAction["new"].element).to.have.attribute('desc', 'myDesc');
                        return [2 /*return*/];
                }
            });
        }); });
        it('update a GSEControl element when only type attribute changed', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input, editorAction, updateActions, updateAction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        input = inputs[2];
                        input.value = 'GSSE';
                        return [4 /*yield*/, input.requestUpdate()];
                    case 1:
                        _a.sent();
                        editorAction = gsecontrol_js_1.updateGseControlAction(gseControl);
                        updateActions = editorAction(inputs, newWizard());
                        testing_1.expect(updateActions.length).to.equal(1);
                        testing_1.expect(updateActions[0]).to.satisfy(foundation_js_1.isReplace);
                        updateAction = updateActions[0];
                        testing_1.expect(updateAction.old.element).to.have.attribute('type', 'GOOSE');
                        testing_1.expect(updateAction["new"].element).to.have.attribute('type', 'GSSE');
                        return [2 /*return*/];
                }
            });
        }); });
        it('update a GSEControl element when type is changed to null', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input, editorAction, updateActions, updateAction;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        input = inputs[2];
                        (_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click();
                        return [4 /*yield*/, input.requestUpdate()];
                    case 1:
                        _b.sent();
                        editorAction = gsecontrol_js_1.updateGseControlAction(gseControl);
                        updateActions = editorAction(inputs, newWizard());
                        testing_1.expect(updateActions.length).to.equal(1);
                        testing_1.expect(updateActions[0]).to.satisfy(foundation_js_1.isReplace);
                        updateAction = updateActions[0];
                        testing_1.expect(updateAction.old.element).to.have.attribute('type', 'GOOSE');
                        testing_1.expect(updateAction["new"].element).to.not.have.attribute('type');
                        return [2 /*return*/];
                }
            });
        }); });
        it('update a GSEControl element when appID attribute changed', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input, editorAction, updateActions, updateAction;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        input = inputs[3];
                        (_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click();
                        input.value = 'myNewType/ID';
                        return [4 /*yield*/, input.requestUpdate()];
                    case 1:
                        _b.sent();
                        editorAction = gsecontrol_js_1.updateGseControlAction(gseControl);
                        updateActions = editorAction(inputs, newWizard());
                        testing_1.expect(updateActions.length).to.equal(1);
                        testing_1.expect(updateActions[0]).to.satisfy(foundation_js_1.isReplace);
                        updateAction = updateActions[0];
                        testing_1.expect(updateAction.old.element).to.have.attribute('appID', 'myAPP/ID');
                        testing_1.expect(updateAction["new"].element).to.have.attribute('appID', 'myNewType/ID');
                        return [2 /*return*/];
                }
            });
        }); });
        it('update a GSEControl element when fixedOffs attribute changed', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input, editorAction, updateActions, updateAction;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        input = inputs[4];
                        (_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click();
                        input.maybeValue = 'true';
                        return [4 /*yield*/, input.requestUpdate()];
                    case 1:
                        _b.sent();
                        editorAction = gsecontrol_js_1.updateGseControlAction(gseControl);
                        updateActions = editorAction(inputs, newWizard());
                        testing_1.expect(updateActions.length).to.equal(1);
                        testing_1.expect(updateActions[0]).to.satisfy(foundation_js_1.isReplace);
                        updateAction = updateActions[0];
                        testing_1.expect(updateAction.old.element).to.not.have.attribute('fixedOffs');
                        testing_1.expect(updateAction["new"].element).to.have.attribute('fixedOffs', 'true');
                        return [2 /*return*/];
                }
            });
        }); });
        it('update a GSEControl element when securityEnabled attribute changed', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input, editorAction, updateActions, updateAction;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        input = inputs[5];
                        (_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click();
                        input.value = 'SignatureAndEncryption';
                        return [4 /*yield*/, input.requestUpdate()];
                    case 1:
                        _b.sent();
                        editorAction = gsecontrol_js_1.updateGseControlAction(gseControl);
                        updateActions = editorAction(inputs, newWizard());
                        testing_1.expect(updateActions.length).to.equal(1);
                        testing_1.expect(updateActions[0]).to.satisfy(foundation_js_1.isReplace);
                        updateAction = updateActions[0];
                        testing_1.expect(updateAction.old.element).to.not.have.attribute('securityEnabled');
                        testing_1.expect(updateAction["new"].element).to.have.attribute('securityEnabled', 'SignatureAndEncryption');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('define an create wizard that', function () {
        var dataPicker;
        describe('with existing ConnectedAP element in the Communication section', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var wizard;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            wizard = gsecontrol_js_1.createGseControlWizard(doc.querySelector('LN0'));
                            element.workflow.push(function () { return wizard; });
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _c.sent();
                            (element.wizardUI.dialogs[0].querySelector('wizard-textfield[label="appID"]')).maybeValue = 'wer';
                            primaryAction = ((_a = element.wizardUI.dialogs[2]) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-button[slot="primaryAction"]'));
                            dataPicker = ((_b = element.wizardUI.dialogs[2]) === null || _b === void 0 ? void 0 : _b.querySelector('finder-list'));
                            return [4 /*yield*/, element.wizardUI.requestUpdate()];
                        case 2:
                            _c.sent(); // make sure wizard is rendered
                            return [2 /*return*/];
                    }
                });
            }); });
            it('has three pages', function () {
                return testing_1.expect(element.wizardUI.dialogs.length).to.equal(3);
            });
            it('the first page looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialogs[0]).dom.to.equalSnapshot()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); }).timeout(5000);
            it('the second page looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialogs[1]).dom.to.equalSnapshot()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); }).timeout(5000);
            it('the third page looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialogs[2]).dom.to.equalSnapshot()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); }).timeout(5000);
            it('triggers complex action on primary action click', function () { return __awaiter(void 0, void 0, void 0, function () {
                var action;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, primaryAction.click()];
                        case 1:
                            _a.sent();
                            testing_1.expect(actionEvent).to.be.calledOnce;
                            action = actionEvent.args[0][0].detail.action;
                            testing_1.expect(action).to.not.satisfy(foundation_js_1.isSimple);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('complex action carries GSEControl element', function () { return __awaiter(void 0, void 0, void 0, function () {
                var actions, action, createAction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, primaryAction.click()];
                        case 1:
                            _a.sent();
                            actions = actionEvent.args[0][0].detail.action
                                .actions;
                            testing_1.expect(actions.length).to.equal(6);
                            action = actions[0];
                            testing_1.expect(action).to.satisfy(foundation_js_1.isCreate);
                            createAction = action;
                            testing_1.expect(createAction["new"].element.tagName).to.equal('GSEControl');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('add default confRev to the GSEControl element', function () { return __awaiter(void 0, void 0, void 0, function () {
                var actions, action, createAction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, primaryAction.click()];
                        case 1:
                            _a.sent();
                            actions = actionEvent.args[0][0].detail.action
                                .actions;
                            testing_1.expect(actions.length).to.equal(6);
                            action = actions[0];
                            testing_1.expect(action).to.satisfy(foundation_js_1.isCreate);
                            createAction = action;
                            testing_1.expect(createAction["new"].element).has.attribute('confRev', '1');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('complex action carries referenced DataSet element', function () { return __awaiter(void 0, void 0, void 0, function () {
                var actions, action, createAction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, primaryAction.click()];
                        case 1:
                            _a.sent();
                            actions = actionEvent.args[0][0].detail.action
                                .actions;
                            testing_1.expect(actions.length).to.equal(6);
                            action = actions[5];
                            testing_1.expect(action).to.satisfy(foundation_js_1.isCreate);
                            createAction = action;
                            testing_1.expect(createAction["new"].element.tagName).to.equal('DataSet');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('referenced DataSet element not having any FCDA per default', function () { return __awaiter(void 0, void 0, void 0, function () {
                var actions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, primaryAction.click()];
                        case 1:
                            _a.sent();
                            actions = actionEvent.args[0][0].detail.action
                                .actions;
                            testing_1.expect(actions.length).to.equal(6);
                            actions.forEach(function (action) {
                                testing_1.expect(action).to.satisfy(foundation_js_1.isCreate);
                                var createAction = action;
                                testing_1.expect(createAction["new"].element.tagName).to.not.equal('FCDA');
                            });
                            return [2 /*return*/];
                    }
                });
            }); });
            it('referenced DataSet element saving selected FCDA', function () { return __awaiter(void 0, void 0, void 0, function () {
                var path, actions, action, createAction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            path = [
                                'Server: IED2>P1',
                                'LDevice: IED2>>CircuitBreaker_CB1',
                                'LN0: IED2>>CircuitBreaker_CB1',
                                'DO: #Dummy.LLN0>Beh',
                                'DA: #Dummy.LLN0.Beh>stVal',
                            ];
                            dataPicker.paths = [path];
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, primaryAction.click()];
                        case 2:
                            _a.sent();
                            actions = actionEvent.args[0][0].detail.action
                                .actions;
                            testing_1.expect(actions.length).to.equal(7);
                            action = actions[6];
                            testing_1.expect(action).to.satisfy(foundation_js_1.isCreate);
                            createAction = action;
                            testing_1.expect(createAction["new"].element.tagName).to.equal('FCDA');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('complex action adding GSE element in the Communication section', function () { return __awaiter(void 0, void 0, void 0, function () {
                var actions, action, createAction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, primaryAction.click()];
                        case 1:
                            _a.sent();
                            actions = actionEvent.args[0][0].detail.action
                                .actions;
                            testing_1.expect(actions.length).to.equal(6);
                            action = actions[1];
                            testing_1.expect(action).to.satisfy(foundation_js_1.isCreate);
                            createAction = action;
                            testing_1.expect(createAction["new"].element.tagName).to.equal('GSE');
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('with missing ConnectedAP element in the Communication section', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var wizard;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            wizard = gsecontrol_js_1.createGseControlWizard(doc.querySelector('IED[name="IED4"] LN0'));
                            element.workflow.push(function () { return wizard; });
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _c.sent();
                            (element.wizardUI.dialogs[0].querySelector('wizard-textfield[label="appID"]')).maybeValue = 'wer';
                            primaryAction = ((_a = element.wizardUI.dialogs[2]) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-button[slot="primaryAction"]'));
                            dataPicker = ((_b = element.wizardUI.dialogs[2]) === null || _b === void 0 ? void 0 : _b.querySelector('finder-list'));
                            return [4 /*yield*/, element.wizardUI.requestUpdate()];
                        case 2:
                            _c.sent(); // make sure wizard is rendered
                            return [2 /*return*/];
                    }
                });
            }); });
            it('has three pages', function () {
                return testing_1.expect(element.wizardUI.dialogs.length).to.equal(3);
            });
            it('the second page having a warning message ', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialogs[1]).dom.to.equalSnapshot()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); }).timeout(5000);
            it('triggers complex action on primary action click', function () { return __awaiter(void 0, void 0, void 0, function () {
                var action;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, primaryAction.click()];
                        case 1:
                            _a.sent();
                            testing_1.expect(actionEvent).to.be.calledOnce;
                            action = actionEvent.args[0][0].detail.action;
                            testing_1.expect(action).to.not.satisfy(foundation_js_1.isSimple);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('referenced DataSet element not having any FCDA per default', function () { return __awaiter(void 0, void 0, void 0, function () {
                var actions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, primaryAction.click()];
                        case 1:
                            _a.sent();
                            actions = actionEvent.args[0][0].detail.action
                                .actions;
                            testing_1.expect(actions.length).to.equal(2);
                            actions.forEach(function (action) {
                                testing_1.expect(action).to.satisfy(foundation_js_1.isCreate);
                                var createAction = action;
                                testing_1.expect(createAction["new"].element.tagName).to.not.equal('FCDA');
                            });
                            return [2 /*return*/];
                    }
                });
            }); });
            it('referenced DataSet element saving selected FCDA', function () { return __awaiter(void 0, void 0, void 0, function () {
                var path, actions, action, createAction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            path = [
                                'Server: IED4>P1',
                                'LDevice: IED4>>MU01',
                                'LN0: IED4>>MU01',
                                'DO: #Dummy.LLN0.two>Beh',
                                'DA: #Dummy.LLN0.Beh>stVal',
                            ];
                            dataPicker.paths = [path];
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, primaryAction.click()];
                        case 2:
                            _a.sent();
                            actions = actionEvent.args[0][0].detail.action
                                .actions;
                            testing_1.expect(actions.length).to.equal(3);
                            action = actions[2];
                            testing_1.expect(action).to.satisfy(foundation_js_1.isCreate);
                            createAction = action;
                            testing_1.expect(createAction["new"].element.tagName).to.equal('FCDA');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('complex action NOT adding GSE element in the Communication section', function () { return __awaiter(void 0, void 0, void 0, function () {
                var actions, action, createAction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, primaryAction.click()];
                        case 1:
                            _a.sent();
                            actions = actionEvent.args[0][0].detail.action
                                .actions;
                            testing_1.expect(actions.length).to.equal(2);
                            action = actions[1];
                            testing_1.expect(action).to.satisfy(foundation_js_1.isCreate);
                            createAction = action;
                            testing_1.expect(createAction["new"].element.tagName).to.equal('DataSet');
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe('define a wizard to select the control block reference', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var wizard;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wizard = gsecontrol_js_1.gseControlParentSelector(doc);
                        element.workflow.push(function () { return wizard; });
                        return [4 /*yield*/, element.requestUpdate()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, element.wizardUI.requestUpdate()];
                    case 2:
                        _a.sent(); // make sure wizard is rendered
                        return [2 /*return*/];
                }
            });
        }); });
        it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).dom.to.equalSnapshot()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }).timeout(5000);
    });
});
var templateObject_1;
