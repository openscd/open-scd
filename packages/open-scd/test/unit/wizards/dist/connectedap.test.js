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
var connectedap_js_1 = require("../../../src/wizards/connectedap.js");
describe('Wizards for SCL element ConnectedAP', function () {
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
            var wizard;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/valid2003.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        doc = _b.sent();
                        wizard = connectedap_js_1.editConnectedApWizard(doc.querySelector('ConnectedAP'));
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
        it('does not edit any P element with unchanged wizard inputs', function () { return __awaiter(void 0, void 0, void 0, function () {
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
        it('triggers a complex editor action to update P elements(s)', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        input = inputs.find(function (input) { return input.label === 'IP'; });
                        input.value = '192.168.210.158';
                        return [4 /*yield*/, input.requestUpdate()];
                    case 1:
                        _a.sent();
                        primaryAction.click();
                        return [4 /*yield*/, element.requestUpdate()];
                    case 2:
                        _a.sent();
                        testing_1.expect(actionEvent).to.be.calledOnce;
                        testing_1.expect(actionEvent.args[0][0].detail.action).to.not.satisfy(foundation_js_1.isSimple);
                        return [2 /*return*/];
                }
            });
        }); });
        it('triggers a complex action as combination of delete and create with prior existing Address field', function () { return __awaiter(void 0, void 0, void 0, function () {
            var complexAction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        input = inputs.find(function (input) { return input.label === 'IP'; });
                        input.value = '192.168.210.158';
                        return [4 /*yield*/, input.requestUpdate()];
                    case 1:
                        _a.sent();
                        primaryAction.click();
                        return [4 /*yield*/, element.requestUpdate()];
                    case 2:
                        _a.sent();
                        complexAction = actionEvent.args[0][0].detail.action;
                        testing_1.expect(complexAction.actions).to.have.lengthOf(2);
                        testing_1.expect(complexAction.actions[0]).to.satisfy(foundation_js_1.isDelete);
                        testing_1.expect(complexAction.actions[1]).to.satisfy(foundation_js_1.isCreate);
                        return [2 /*return*/];
                }
            });
        }); });
        it('triggers a complex action being a pure create with prior missing Address field', function () { return __awaiter(void 0, void 0, void 0, function () {
            var complexAction;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (_a = doc
                            .querySelector('ConnectedAP')) === null || _a === void 0 ? void 0 : _a.removeChild(doc.querySelector('ConnectedAP > Address'));
                        input = inputs.find(function (input) { return input.label === 'IP'; });
                        input.value = '192.168.210.158';
                        return [4 /*yield*/, input.requestUpdate()];
                    case 1:
                        _b.sent();
                        primaryAction.click();
                        return [4 /*yield*/, element.requestUpdate()];
                    case 2:
                        _b.sent();
                        complexAction = actionEvent.args[0][0].detail.action;
                        testing_1.expect(complexAction.actions).to.have.lengthOf(1);
                        testing_1.expect(complexAction.actions[0]).to.satisfy(foundation_js_1.isCreate);
                        return [2 /*return*/];
                }
            });
        }); });
        it('properly updates a P element of type IP', function () { return __awaiter(void 0, void 0, void 0, function () {
            var complexAction, oldAddress, newAddress;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        input = inputs.find(function (input) { return input.label === 'IP'; });
                        input.value = '192.168.210.158';
                        return [4 /*yield*/, input.requestUpdate()];
                    case 1:
                        _c.sent();
                        primaryAction.click();
                        return [4 /*yield*/, element.requestUpdate()];
                    case 2:
                        _c.sent();
                        complexAction = actionEvent.args[0][0].detail.action;
                        oldAddress = (complexAction.actions[0].old.element);
                        newAddress = (complexAction.actions[1]["new"].element);
                        testing_1.expect((_a = oldAddress.querySelector('P[type="IP"]')) === null || _a === void 0 ? void 0 : _a.textContent).to.equal('192.168.210.111');
                        testing_1.expect((_b = newAddress.querySelector('P[type="IP"]')) === null || _b === void 0 ? void 0 : _b.textContent).to.equal('192.168.210.158');
                        return [2 /*return*/];
                }
            });
        }); });
        it('adds type restrictions with selected option type restriction', function () { return __awaiter(void 0, void 0, void 0, function () {
            var complexAction, oldAddress, newAddress, oldIP, newIP;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ((_a = element.wizardUI.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('#typeRestriction')).checked = true;
                        return [4 /*yield*/, element.requestUpdate()];
                    case 1:
                        _b.sent();
                        primaryAction.click();
                        return [4 /*yield*/, element.requestUpdate()];
                    case 2:
                        _b.sent();
                        complexAction = actionEvent.args[0][0].detail.action;
                        oldAddress = (complexAction.actions[0].old.element);
                        newAddress = (complexAction.actions[1]["new"].element);
                        oldIP = oldAddress.querySelector('P[type="IP"]');
                        newIP = newAddress.querySelector('P[type="IP"]');
                        testing_1.expect(oldIP === null || oldIP === void 0 ? void 0 : oldIP.getAttributeNS('http://www.w3.org/2001/XMLSchema-instance', 'type')).to.not.exist;
                        testing_1.expect(newIP === null || newIP === void 0 ? void 0 : newIP.getAttributeNS('http://www.w3.org/2001/XMLSchema-instance', 'type')).to.exist;
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
var templateObject_1;
