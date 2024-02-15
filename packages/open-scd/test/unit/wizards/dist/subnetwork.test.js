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
require("../../../src/addons/Wizards.js");
var foundation_js_1 = require("../../../src/foundation.js");
var subnetwork_js_1 = require("../../../src/wizards/subnetwork.js");
describe('Wizards for SCL element SubNetwork', function () {
    var doc;
    var element;
    var inputs;
    var input;
    var primaryAction;
    var actionEvent;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<oscd-wizards .host=", "></oscd-wizards>"], ["<oscd-wizards .host=", "></oscd-wizards>"])), document))];
                case 1:
                    element = _a.sent();
                    actionEvent = sinon_1.spy();
                    window.addEventListener('editor-action', actionEvent);
                    return [2 /*return*/];
            }
        });
    }); });
    describe('include an edit wizard that', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/valid2003.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        doc = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        describe('with existing BitRate child element', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var wizard;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            wizard = subnetwork_js_1.editSubNetworkWizard(doc.querySelector('SubNetwork'));
                            element.workflow.push(function () { return wizard; });
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _b.sent();
                            inputs = Array.from(element.wizardUI.inputs);
                            primaryAction = ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-button[slot="primaryAction"]'));
                            return [2 /*return*/];
                    }
                });
            }); });
            it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).dom.to.equalSnapshot({
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
                return __generator(this, function (_a) {
                    testing_1.expect(element.wizardUI.dialog.querySelectorAll('wizard-textfield[pattern]').length).to.equal(2);
                    testing_1.expect(element.wizardUI
                        .dialog.querySelectorAll('wizard-textfield[pattern]')[0]
                        .getAttribute('pattern')).to.equal(foundation_js_1.patterns.normalizedString);
                    testing_1.expect(element.wizardUI
                        .dialog.querySelectorAll('wizard-textfield[pattern]')[1]
                        .getAttribute('pattern')).to.equal(foundation_js_1.patterns.decimal);
                    return [2 /*return*/];
                });
            }); });
            it('does not edit any attributes with unchanged wizard inputs', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            primaryAction.click();
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _a.sent();
                            testing_1.expect(actionEvent).to.not.have.been.called;
                            return [2 /*return*/];
                    }
                });
            }); });
            it('triggers an editor action to update name attribute', function () { return __awaiter(void 0, void 0, void 0, function () {
                var updateAction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            input = inputs.find(function (input) { return input.label === 'name'; });
                            input.value = 'newSubNetName';
                            return [4 /*yield*/, input.requestUpdate()];
                        case 1:
                            _a.sent();
                            primaryAction.click();
                            return [4 /*yield*/, element.requestUpdate()];
                        case 2:
                            _a.sent();
                            testing_1.expect(actionEvent).to.be.calledOnce;
                            testing_1.expect(actionEvent.args[0][0].detail.action).to.satisfy(foundation_js_1.isReplace);
                            updateAction = actionEvent.args[0][0].detail.action;
                            testing_1.expect(updateAction.old.element).to.have.a.attribute('name', 'StationBus');
                            testing_1.expect(updateAction["new"].element).to.have.a.attribute('name', 'newSubNetName');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('triggers an editor action to update desc attribute', function () { return __awaiter(void 0, void 0, void 0, function () {
                var updateAction;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            input = inputs.find(function (input) { return input.label === 'desc'; });
                            return [4 /*yield*/, input.requestUpdate()];
                        case 1:
                            _b.sent();
                            (_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click();
                            input.value = 'myNewSubNetworkDesc';
                            return [4 /*yield*/, input.requestUpdate()];
                        case 2:
                            _b.sent();
                            primaryAction.click();
                            return [4 /*yield*/, element.requestUpdate()];
                        case 3:
                            _b.sent();
                            testing_1.expect(actionEvent).to.be.calledOnce;
                            testing_1.expect(actionEvent.args[0][0].detail.action).to.satisfy(foundation_js_1.isReplace);
                            updateAction = actionEvent.args[0][0].detail.action;
                            testing_1.expect(updateAction.old.element).to.not.have.a.attribute('desc');
                            testing_1.expect(updateAction["new"].element).to.have.a.attribute('desc', 'myNewSubNetworkDesc');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('triggers an editor action to update type attribute', function () { return __awaiter(void 0, void 0, void 0, function () {
                var updateAction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            input = inputs.find(function (input) { return input.label === 'type'; });
                            input.value = 'myNewSubNetType';
                            return [4 /*yield*/, input.requestUpdate()];
                        case 1:
                            _a.sent();
                            primaryAction.click();
                            return [4 /*yield*/, element.requestUpdate()];
                        case 2:
                            _a.sent();
                            testing_1.expect(actionEvent).to.be.calledOnce;
                            testing_1.expect(actionEvent.args[0][0].detail.action).to.satisfy(foundation_js_1.isReplace);
                            updateAction = actionEvent.args[0][0].detail.action;
                            testing_1.expect(updateAction.old.element).to.have.a.attribute('type', '8-MMS');
                            testing_1.expect(updateAction["new"].element).to.have.a.attribute('type', 'myNewSubNetType');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('triggers an editor action to update BitRate element', function () { return __awaiter(void 0, void 0, void 0, function () {
                var updateAction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            input = (inputs.find(function (input) { return input.label === 'BitRate'; }));
                            input.value = '200.';
                            input.multiplier = 'M';
                            return [4 /*yield*/, input.requestUpdate()];
                        case 1:
                            _a.sent();
                            primaryAction.click();
                            return [4 /*yield*/, element.requestUpdate()];
                        case 2:
                            _a.sent();
                            testing_1.expect(actionEvent).to.be.calledOnce;
                            testing_1.expect(actionEvent.args[0][0].detail.action).to.satisfy(foundation_js_1.isReplace);
                            updateAction = actionEvent.args[0][0].detail.action;
                            testing_1.expect(updateAction.old.element.innerHTML.trim()).to.equal('100.0');
                            testing_1.expect(updateAction.old.element).to.not.have.attribute('multiplier');
                            testing_1.expect(updateAction["new"].element.innerHTML.trim()).to.equal('200.');
                            testing_1.expect(updateAction["new"].element).to.have.attribute('multiplier', 'M');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('triggers an editor action to remove BitRate element', function () { return __awaiter(void 0, void 0, void 0, function () {
                var updateAction;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            input = (inputs.find(function (input) { return input.label === 'BitRate'; }));
                            return [4 /*yield*/, input.requestUpdate()];
                        case 1:
                            _c.sent();
                            (_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click();
                            return [4 /*yield*/, input.requestUpdate()];
                        case 2:
                            _c.sent();
                            primaryAction.click();
                            return [4 /*yield*/, element.requestUpdate()];
                        case 3:
                            _c.sent();
                            testing_1.expect(actionEvent).to.be.calledOnce;
                            testing_1.expect(actionEvent.args[0][0].detail.action).to.satisfy(foundation_js_1.isDelete);
                            updateAction = actionEvent.args[0][0].detail.action;
                            testing_1.expect((_b = updateAction.old.element.textContent) === null || _b === void 0 ? void 0 : _b.trim()).to.equal('100.0');
                            testing_1.expect(updateAction.old.element).to.not.have.attribute('multiplier');
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('with missing BitRate child element', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var wizard;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            wizard = subnetwork_js_1.editSubNetworkWizard(doc.querySelector('SubNetwork[name="ProcessBus"]'));
                            element.workflow.push(function () { return wizard; });
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _b.sent();
                            inputs = Array.from(element.wizardUI.inputs);
                            primaryAction = ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-button[slot="primaryAction"]'));
                            return [2 /*return*/];
                    }
                });
            }); });
            it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).dom.to.equalSnapshot({
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
                return __generator(this, function (_a) {
                    testing_1.expect(element.wizardUI.dialog.querySelectorAll('wizard-textfield[pattern]').length).to.equal(2);
                    testing_1.expect(element.wizardUI
                        .dialog.querySelectorAll('wizard-textfield[pattern]')[0]
                        .getAttribute('pattern')).to.equal(foundation_js_1.patterns.normalizedString);
                    testing_1.expect(element.wizardUI
                        .dialog.querySelectorAll('wizard-textfield[pattern]')[1]
                        .getAttribute('pattern')).to.equal(foundation_js_1.patterns.decimal);
                    return [2 /*return*/];
                });
            }); });
            it('triggers an editor action to create a complete BitRate element', function () { return __awaiter(void 0, void 0, void 0, function () {
                var updateAction;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            input = (inputs.find(function (input) { return input.label === 'BitRate'; }));
                            return [4 /*yield*/, input.requestUpdate()];
                        case 1:
                            _c.sent();
                            (_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click();
                            input.value = '100.0';
                            input.multiplier = 'M';
                            primaryAction.click();
                            return [4 /*yield*/, element.requestUpdate()];
                        case 2:
                            _c.sent();
                            testing_1.expect(actionEvent).to.be.calledOnce;
                            testing_1.expect(actionEvent.args[0][0].detail.action).to.satisfy(foundation_js_1.isCreate);
                            updateAction = actionEvent.args[0][0].detail.action;
                            testing_1.expect((_b = updateAction["new"].element.textContent) === null || _b === void 0 ? void 0 : _b.trim()).to.equal('100.0');
                            testing_1.expect(updateAction["new"].element).to.have.attribute('multiplier', 'M');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('triggers an editor action to create BitRate element with multiplier only', function () { return __awaiter(void 0, void 0, void 0, function () {
                var updateAction;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            input = (inputs.find(function (input) { return input.label === 'BitRate'; }));
                            return [4 /*yield*/, input.requestUpdate()];
                        case 1:
                            _c.sent();
                            (_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click();
                            input.multiplier = 'M';
                            primaryAction.click();
                            return [4 /*yield*/, element.requestUpdate()];
                        case 2:
                            _c.sent();
                            testing_1.expect(actionEvent).to.be.calledOnce;
                            testing_1.expect(actionEvent.args[0][0].detail.action).to.satisfy(foundation_js_1.isCreate);
                            updateAction = actionEvent.args[0][0].detail.action;
                            testing_1.expect((_b = updateAction["new"].element.textContent) === null || _b === void 0 ? void 0 : _b.trim()).to.equal('');
                            testing_1.expect(updateAction["new"].element).to.have.attribute('multiplier');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('triggers an editor action to create BitRate element with bit rate only', function () { return __awaiter(void 0, void 0, void 0, function () {
                var updateAction;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            input = (inputs.find(function (input) { return input.label === 'BitRate'; }));
                            return [4 /*yield*/, input.requestUpdate()];
                        case 1:
                            _c.sent();
                            (_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click();
                            input.value = '100.0';
                            primaryAction.click();
                            return [4 /*yield*/, element.requestUpdate()];
                        case 2:
                            _c.sent();
                            testing_1.expect(actionEvent).to.be.calledOnce;
                            testing_1.expect(actionEvent.args[0][0].detail.action).to.satisfy(foundation_js_1.isCreate);
                            updateAction = actionEvent.args[0][0].detail.action;
                            testing_1.expect((_b = updateAction["new"].element.textContent) === null || _b === void 0 ? void 0 : _b.trim()).to.equal('100.0');
                            testing_1.expect(updateAction["new"].element).to.not.have.attribute('multiplier');
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe('include an create wizard that', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var wizard;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/valid2003.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        doc = _b.sent();
                        wizard = subnetwork_js_1.createSubNetworkWizard(doc.querySelector('Communication'));
                        element.workflow.push(function () { return wizard; });
                        return [4 /*yield*/, element.requestUpdate()];
                    case 2:
                        _b.sent();
                        inputs = Array.from(element.wizardUI.inputs);
                        primaryAction = ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-button[slot="primaryAction"]'));
                        return [2 /*return*/];
                }
            });
        }); });
        it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).dom.to.equalSnapshot({
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
            return __generator(this, function (_a) {
                testing_1.expect(element.wizardUI.dialog.querySelectorAll('wizard-textfield[pattern]')
                    .length).to.equal(2);
                testing_1.expect(element.wizardUI
                    .dialog.querySelectorAll('wizard-textfield[pattern]')[0]
                    .getAttribute('pattern')).to.equal(foundation_js_1.patterns.normalizedString);
                testing_1.expect(element.wizardUI
                    .dialog.querySelectorAll('wizard-textfield[pattern]')[1]
                    .getAttribute('pattern')).to.equal(foundation_js_1.patterns.decimal);
                return [2 /*return*/];
            });
        }); });
        it('does not allow creating SubNetwork with empty name attribute', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        input = inputs.find(function (input) { return input.label === 'name'; });
                        input.value = '';
                        return [4 /*yield*/, input.requestUpdate()];
                    case 1:
                        _a.sent();
                        primaryAction.click();
                        return [4 /*yield*/, element.requestUpdate()];
                    case 2:
                        _a.sent();
                        testing_1.expect(actionEvent).to.not.be.called;
                        return [2 /*return*/];
                }
            });
        }); });
        it('triggers an editor action to create SubNetwork element including BitRate', function () { return __awaiter(void 0, void 0, void 0, function () {
            var updateAction;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        input = inputs.find(function (input) { return input.label === 'name'; });
                        input.value = 'myNewSubNetworkName';
                        return [4 /*yield*/, input.requestUpdate()];
                    case 1:
                        _c.sent();
                        primaryAction.click();
                        return [4 /*yield*/, element.requestUpdate()];
                    case 2:
                        _c.sent();
                        testing_1.expect(actionEvent).to.be.calledOnce;
                        testing_1.expect(actionEvent.args[0][0].detail.action).to.satisfy(foundation_js_1.isCreate);
                        updateAction = actionEvent.args[0][0].detail.action;
                        testing_1.expect(updateAction["new"].element).to.have.a.attribute('name', 'myNewSubNetworkName');
                        testing_1.expect(updateAction["new"].element).to.have.a.attribute('desc', '');
                        testing_1.expect(updateAction["new"].element).to.have.a.attribute('type', '8-MMS');
                        testing_1.expect(updateAction["new"].element.querySelector('BitRate')).to
                            .exist;
                        testing_1.expect(updateAction["new"].element.querySelector('BitRate')).to.have.attribute('multiplier', 'M');
                        testing_1.expect((_b = (_a = updateAction["new"].element
                            .querySelector('BitRate')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim()).to.equal('100');
                        return [2 /*return*/];
                }
            });
        }); });
        it('triggers an editor action to create SubNetwork element excluding non required /BitRate', function () { return __awaiter(void 0, void 0, void 0, function () {
            var name, desc, type, bitrate, updateAction;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        name = (inputs.find(function (input) { return input.label === 'name'; }));
                        desc = (inputs.find(function (input) { return input.label === 'desc'; }));
                        type = (inputs.find(function (input) { return input.label === 'type'; }));
                        bitrate = (inputs.find(function (input) { return input.label === 'BitRate'; }));
                        return [4 /*yield*/, element.requestUpdate()];
                    case 1:
                        _d.sent();
                        (_a = desc.nullSwitch) === null || _a === void 0 ? void 0 : _a.click();
                        (_b = type.nullSwitch) === null || _b === void 0 ? void 0 : _b.click();
                        (_c = bitrate.nullSwitch) === null || _c === void 0 ? void 0 : _c.click();
                        name.value = 'myNewSubNetworkName';
                        return [4 /*yield*/, name.requestUpdate()];
                    case 2:
                        _d.sent();
                        primaryAction.click();
                        return [4 /*yield*/, element.requestUpdate()];
                    case 3:
                        _d.sent();
                        testing_1.expect(actionEvent).to.be.calledOnce;
                        testing_1.expect(actionEvent.args[0][0].detail.action).to.satisfy(foundation_js_1.isCreate);
                        updateAction = actionEvent.args[0][0].detail.action;
                        testing_1.expect(updateAction["new"].element).to.have.a.attribute('name', 'myNewSubNetworkName');
                        testing_1.expect(updateAction["new"].element).to.not.have.a.attribute('desc');
                        testing_1.expect(updateAction["new"].element).to.not.have.a.attribute('type');
                        testing_1.expect(updateAction["new"].element.querySelector('BitRate')).to
                            .not.exist;
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
var templateObject_1;
