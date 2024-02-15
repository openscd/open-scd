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
require("../../../src/addons/Wizards.js");
var wizard_textfield_js_1 = require("../../../src/wizard-textfield.js");
var foundation_js_1 = require("../../../src/foundation.js");
var address_js_1 = require("../../../src/wizards/address.js");
function addressContent(inputs) {
    var addressContent = {};
    addressContent['MAC-Address'] = foundation_js_1.getValue(inputs.find(function (i) { return i.label === 'MAC-Address'; }));
    addressContent['APPID'] = foundation_js_1.getValue(inputs.find(function (i) { return i.label === 'APPID'; }));
    addressContent['VLAN-ID'] = foundation_js_1.getValue(inputs.find(function (i) { return i.label === 'VLAN-ID'; }));
    addressContent['VLAN-PRIORITY'] = foundation_js_1.getValue(inputs.find(function (i) { return i.label === 'VLAN-PRIORITY'; }));
    return addressContent;
}
describe('address', function () {
    var doc;
    var element;
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
                    return [2 /*return*/];
            }
        });
    }); });
    describe('renderGseSmvAddress', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var gse, hasInstType, attributes, wizard;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        gse = doc.querySelector('GSE[ldInst="CircuitBreaker_CB1"][cbName="GCB"]');
                        hasInstType = Array.from(gse.querySelectorAll('Address > P')).some(function (pType) { return pType.getAttribute('xsi:type'); });
                        attributes = {};
                        ['MAC-Address', 'APPID', 'VLAN-ID', 'VLAN-PRIORITY'].forEach(function (key) {
                            var _a, _b;
                            if (!attributes[key])
                                attributes[key] = (_b = (_a = gse.querySelector("Address > P[type=\"" + key + "\"]")) === null || _a === void 0 ? void 0 : _a.innerHTML.trim()) !== null && _b !== void 0 ? _b : null;
                        });
                        wizard = [
                            {
                                title: 'title',
                                content: address_js_1.contentGseOrSmvWizard({ hasInstType: hasInstType, attributes: attributes })
                            },
                        ];
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
    describe('updateAddress', function () {
        var gse;
        var inputs;
        var wizard;
        describe('with exiting address element', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var hasInstType, attributes;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            gse = doc.querySelector('GSE[ldInst="CircuitBreaker_CB1"][cbName="GCB"]');
                            hasInstType = Array.from(gse.querySelectorAll('Address > P')).some(function (pType) { return pType.getAttribute('xsi:type'); });
                            attributes = {};
                            ['MAC-Address', 'APPID', 'VLAN-ID', 'VLAN-PRIORITY'].forEach(function (key) {
                                var _a, _b;
                                if (!attributes[key])
                                    attributes[key] = (_b = (_a = gse
                                        .querySelector("Address > P[type=\"" + key + "\"]")) === null || _a === void 0 ? void 0 : _a.innerHTML.trim()) !== null && _b !== void 0 ? _b : null;
                            });
                            wizard = [
                                {
                                    title: 'asdas',
                                    content: address_js_1.contentGseOrSmvWizard({ hasInstType: hasInstType, attributes: attributes })
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
            it('does not update a Address element when no attribute has changed', function () {
                var actions = address_js_1.updateAddress(gse, addressContent(inputs), false);
                testing_1.expect(actions).to.be.empty;
            });
            it('update a Address element when VLAN ID gets created', function () { return __awaiter(void 0, void 0, void 0, function () {
                var input, type, newValue, actions, oldElement, newElement;
                var _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            input = inputs[2];
                            type = input.label;
                            newValue = 'newValue';
                            input.maybeValue = newValue;
                            return [4 /*yield*/, input.requestUpdate()];
                        case 1:
                            _e.sent();
                            actions = address_js_1.updateAddress(gse, addressContent(inputs), false);
                            testing_1.expect(actions.length).to.equal(2);
                            testing_1.expect(actions[0]).to.satisfy(foundation_js_1.isDelete);
                            testing_1.expect(actions[1]).to.satisfy(foundation_js_1.isCreate);
                            oldElement = actions[0].old.element;
                            newElement = actions[1]["new"].element;
                            testing_1.expect((_b = (_a = oldElement.querySelector("P[type=\"" + type + "\"]")) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim()).to.be.undefined;
                            testing_1.expect((_d = (_c = newElement.querySelector("P[type=\"" + type + "\"]")) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.trim()).to.equal(newValue);
                            testing_1.expect(newElement.querySelector("P[type=\"" + type + "\"]")).to.not.have.attribute('xsi:type', "tP_" + type);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('update a Address element when at least one attribute changes', function () { return __awaiter(void 0, void 0, void 0, function () {
                var _i, inputs_1, rawInput, input, type, newValue, oldValue, actions, oldElement, newElement;
                var _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            _i = 0, inputs_1 = inputs;
                            _e.label = 1;
                        case 1:
                            if (!(_i < inputs_1.length)) return [3 /*break*/, 4];
                            rawInput = inputs_1[_i];
                            input = rawInput instanceof wizard_textfield_js_1.WizardTextField
                                ? rawInput
                                : rawInput;
                            type = input.label;
                            newValue = 'newValue';
                            oldValue = input.value || undefined;
                            input.maybeValue = newValue;
                            return [4 /*yield*/, input.requestUpdate()];
                        case 2:
                            _e.sent();
                            actions = address_js_1.updateAddress(gse, addressContent(inputs), false);
                            testing_1.expect(actions.length).to.equal(2);
                            testing_1.expect(actions[0]).to.satisfy(foundation_js_1.isDelete);
                            testing_1.expect(actions[1]).to.satisfy(foundation_js_1.isCreate);
                            oldElement = actions[0].old.element;
                            newElement = actions[1]["new"].element;
                            testing_1.expect((_b = (_a = oldElement.querySelector("P[type=\"" + type + "\"]")) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim()).to.equal(oldValue);
                            testing_1.expect((_d = (_c = newElement.querySelector("P[type=\"" + type + "\"]")) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.trim()).to.equal(newValue);
                            testing_1.expect(newElement.querySelector("P[type=\"" + type + "\"]")).to.not.have.attribute('xsi:type', "tP_" + type);
                            _e.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            it('update a Address element when status of instType has changed', function () { return __awaiter(void 0, void 0, void 0, function () {
                var _i, inputs_2, rawInput, input, type, newValue, oldValue, actions, oldElement, newElement;
                var _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            _i = 0, inputs_2 = inputs;
                            _e.label = 1;
                        case 1:
                            if (!(_i < inputs_2.length)) return [3 /*break*/, 4];
                            rawInput = inputs_2[_i];
                            input = rawInput instanceof wizard_textfield_js_1.WizardTextField
                                ? rawInput
                                : rawInput;
                            type = input.label;
                            newValue = input.value;
                            oldValue = input.value || undefined;
                            input.maybeValue = newValue;
                            return [4 /*yield*/, input.requestUpdate()];
                        case 2:
                            _e.sent();
                            actions = address_js_1.updateAddress(gse, addressContent(inputs), true);
                            testing_1.expect(actions.length).to.equal(2);
                            testing_1.expect(actions[0]).to.satisfy(foundation_js_1.isDelete);
                            testing_1.expect(actions[1]).to.satisfy(foundation_js_1.isCreate);
                            oldElement = actions[0].old.element;
                            newElement = actions[1]["new"].element;
                            testing_1.expect((_b = (_a = oldElement.querySelector("P[type=\"" + type + "\"]")) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim()).to.equal(oldValue);
                            testing_1.expect((_d = (_c = newElement.querySelector("P[type=\"" + type + "\"]")) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.trim()).to.equal(newValue);
                            testing_1.expect(newElement.querySelector("P[type=\"" + type + "\"]")).to.have.attribute('xsi:type', "tP_" + type);
                            _e.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('with missing address element', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var hasInstType, attributes;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            gse = doc.querySelector('GSE[ldInst="CircuitBreaker_CB1"][cbName="GCB2"]');
                            hasInstType = Array.from(gse.querySelectorAll('Address > P')).some(function (pType) { return pType.getAttribute('xsi:type'); });
                            attributes = {};
                            ['MAC-Address', 'APPID', 'VLAN-ID', 'VLAN-PRIORITY'].forEach(function (key) {
                                var _a, _b;
                                if (!attributes[key])
                                    attributes[key] = (_b = (_a = gse
                                        .querySelector("Address > P[type=\"" + key + "\"]")) === null || _a === void 0 ? void 0 : _a.innerHTML.trim()) !== null && _b !== void 0 ? _b : null;
                            });
                            wizard = [
                                {
                                    title: 'asdas',
                                    content: address_js_1.contentGseOrSmvWizard({ hasInstType: hasInstType, attributes: attributes })
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
            it('creates a Address element when at least one attribute changes', function () { return __awaiter(void 0, void 0, void 0, function () {
                var _i, inputs_3, rawInput, input, type, newValue, actions, newElement;
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _i = 0, inputs_3 = inputs;
                            _d.label = 1;
                        case 1:
                            if (!(_i < inputs_3.length)) return [3 /*break*/, 6];
                            rawInput = inputs_3[_i];
                            input = rawInput instanceof wizard_textfield_js_1.WizardTextField
                                ? rawInput
                                : rawInput;
                            if (!(input.maybeValue === null)) return [3 /*break*/, 3];
                            (_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click();
                            return [4 /*yield*/, input.requestUpdate()];
                        case 2:
                            _d.sent();
                            _d.label = 3;
                        case 3:
                            type = input.label;
                            newValue = 'newValue';
                            input.value = newValue;
                            return [4 /*yield*/, input.requestUpdate()];
                        case 4:
                            _d.sent();
                            actions = address_js_1.updateAddress(gse, addressContent(inputs), false);
                            testing_1.expect(actions.length).to.equal(1);
                            testing_1.expect(actions[0]).to.satisfy(foundation_js_1.isCreate);
                            newElement = actions[0]["new"].element;
                            testing_1.expect((_c = (_b = newElement.querySelector("P[type=\"" + type + "\"]")) === null || _b === void 0 ? void 0 : _b.textContent) === null || _c === void 0 ? void 0 : _c.trim()).to.equal(newValue);
                            testing_1.expect(newElement.querySelector("P[type=\"" + type + "\"]")).to.not.have.attribute('xsi:type', "tP_" + type);
                            _d.label = 5;
                        case 5:
                            _i++;
                            return [3 /*break*/, 1];
                        case 6: return [2 /*return*/];
                    }
                });
            }); });
            it('update a Address element when status of instType has changed', function () { return __awaiter(void 0, void 0, void 0, function () {
                var _i, inputs_4, rawInput, input, type, newValue, actions, newElement;
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _i = 0, inputs_4 = inputs;
                            _d.label = 1;
                        case 1:
                            if (!(_i < inputs_4.length)) return [3 /*break*/, 6];
                            rawInput = inputs_4[_i];
                            input = rawInput instanceof wizard_textfield_js_1.WizardTextField
                                ? rawInput
                                : rawInput;
                            if (!(input.maybeValue === null)) return [3 /*break*/, 3];
                            (_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click();
                            return [4 /*yield*/, input.requestUpdate()];
                        case 2:
                            _d.sent();
                            _d.label = 3;
                        case 3:
                            type = input.label;
                            newValue = input.value;
                            input.value = newValue;
                            return [4 /*yield*/, input.requestUpdate()];
                        case 4:
                            _d.sent();
                            actions = address_js_1.updateAddress(gse, addressContent(inputs), true);
                            testing_1.expect(actions.length).to.equal(1);
                            testing_1.expect(actions[0]).to.satisfy(foundation_js_1.isCreate);
                            newElement = actions[0]["new"].element;
                            testing_1.expect((_c = (_b = newElement.querySelector("P[type=\"" + type + "\"]")) === null || _b === void 0 ? void 0 : _b.textContent) === null || _c === void 0 ? void 0 : _c.trim()).to.equal(newValue);
                            testing_1.expect(newElement.querySelector("P[type=\"" + type + "\"]")).to.have.attribute('xsi:type', "tP_" + type);
                            _d.label = 5;
                        case 5:
                            _i++;
                            return [3 /*break*/, 1];
                        case 6: return [2 /*return*/];
                    }
                });
            }); });
        });
    });
});
var templateObject_1;
