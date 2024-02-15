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
var fcda_js_1 = require("../../../src/wizards/fcda.js");
var foundation_js_1 = require("../../../src/foundation.js");
describe('create wizard for FCDA element', function () {
    var doc;
    var element;
    var finder;
    var primaryAction;
    var actionEvent;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<oscd-wizards .host=", "></oscd-wizards>"], ["<oscd-wizards .host=", "></oscd-wizards>"])), document))];
                case 1:
                    element = _a.sent();
                    return [4 /*yield*/, fetch('/test/testfiles/wizards/fcda.scd')
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
    describe('with a valid SCL file', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var wizard;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        wizard = fcda_js_1.createFCDAsWizard(doc.querySelector('DataSet'));
                        element.workflow.push(function () { return wizard; });
                        return [4 /*yield*/, element.requestUpdate()];
                    case 1:
                        _b.sent();
                        finder =
                            element.wizardUI.dialog.querySelector('finder-list');
                        primaryAction = ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-button[slot="primaryAction"]'));
                        return [2 /*return*/];
                }
            });
        }); });
        it('looks like the last snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).to.equalSnapshot()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('indicates error in case children cannot be determined', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        finder.paths = [['some wrong path']];
                        return [4 /*yield*/, element.requestUpdate()];
                    case 1:
                        _e.sent();
                        return [4 /*yield*/, finder.loaded];
                    case 2:
                        _e.sent();
                        testing_1.expect((_d = (_c = (_b = (_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('finder-list')) === null || _b === void 0 ? void 0 : _b.shadowRoot) === null || _c === void 0 ? void 0 : _c.querySelector('p')) === null || _d === void 0 ? void 0 : _d.innerText).to.equal('[error]');
                        return [2 /*return*/];
                }
            });
        }); });
        describe('with a specific path', function () {
            var path = [
                'Server: IED1>P1',
                'LDevice: IED1>>CircuitBreaker_CB1',
                'LN0: IED1>>CircuitBreaker_CB1',
                'DO: #Dummy.LLN0>Beh',
                'DA: #Dummy.LLN0.Beh>stVal',
            ];
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            finder.paths = [path];
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, primaryAction.click()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('returns a non empty create action on primary action click', function () {
                testing_1.expect(actionEvent).to.have.been.called;
                testing_1.expect(actionEvent.args[0][0].detail.action).to.satisfy(foundation_js_1.isCreate);
            });
            it('returns a create action that follows the definition of a FCDA', function () {
                var newElement = (actionEvent.args[0][0].detail.action["new"].element);
                testing_1.expect(newElement).to.have.attribute('ldInst', 'CircuitBreaker_CB1');
                testing_1.expect(newElement).to.have.attribute('prefix', '');
                testing_1.expect(newElement).to.have.attribute('lnClass', 'LLN0');
                testing_1.expect(newElement).to.not.have.attribute('lnInst');
                testing_1.expect(newElement).to.have.attribute('doName', 'Beh');
                testing_1.expect(newElement).to.have.attribute('daName', 'stVal');
                testing_1.expect(newElement).to.have.attribute('fc', 'ST');
            });
        });
        describe('with a more complex path including SDOs and BDAs', function () {
            var path = [
                'Server: IED1>P1',
                'LDevice: IED1>>Meas',
                'LN: IED1>>Meas>My MMXU 1',
                'DO: #Dummy.MMXU>A',
                'SDO: #OpenSCD_WYE_phases>phsA',
                'DA: #OpenSCD_CMV_db_i_MagAndAng>cVal',
                'BDA: #OpenSCD_Vector_I_w_Ang>mag',
                'BDA: #OpenSCD_AnalogueValue_INT32>i',
            ];
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            finder.paths = [path];
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, primaryAction.click()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('returns a non empty create action on primary action click', function () {
                testing_1.expect(actionEvent).to.have.been.called;
                testing_1.expect(actionEvent.args[0][0].detail.action).to.satisfy(foundation_js_1.isCreate);
            });
            it('returns a create action that follows the definition of a FCDA', function () {
                var newElement = (actionEvent.args[0][0].detail.action["new"].element);
                testing_1.expect(newElement).to.have.attribute('ldInst', 'Meas');
                testing_1.expect(newElement).to.have.attribute('prefix', 'My');
                testing_1.expect(newElement).to.have.attribute('lnClass', 'MMXU');
                testing_1.expect(newElement).to.have.attribute('lnInst', '1');
                testing_1.expect(newElement).to.have.attribute('doName', 'A.phsA');
                testing_1.expect(newElement).to.have.attribute('daName', 'cVal.mag.i');
                testing_1.expect(newElement).to.have.attribute('fc', 'MX');
            });
        });
        describe('with path being non leaf node', function () {
            var path = [
                'Server: IED1>P1',
                'LDevice: IED1>>Meas',
                'LN: IED1>>Meas>My MMXU 1',
                'DO: #Dummy.MMXU>A',
                'SDO: #OpenSCD_WYE_phases>phsA',
                'DA: #OpenSCD_CMV_db_i_MagAndAng>cVal',
                'BDA: #OpenSCD_Vector_I_w_Ang>mag',
            ];
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            finder.paths = [path];
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, primaryAction.click()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('returns a non empty create action on primary action click', function () {
                return testing_1.expect(actionEvent).to.not.have.been.called;
            });
        });
        describe('with a incorrect logical node definition in the path', function () {
            var path = [
                'Server: IED1>P1',
                'LDevice: IED1>>Meas',
                'Ln: IED1>>Meas>My MMXU 1',
                'DO: #Dummy.LLN0>Beh',
                'DA: #Dummy.LLN0.Beh>stVal',
            ];
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            finder.paths = [path];
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, primaryAction.click()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('does not return a empty action on primary action click', function () {
                return testing_1.expect(actionEvent).to.not.have.been.called;
            });
        });
        describe('with a incorrect logical node identity in the path', function () {
            var path = [
                'Server: IED1>P1',
                'LDevice: IED1>>CircuitBreaker_CB1',
                'LN0: some wrong identity',
                'DO: #Dummy.LLN0>Beh',
                'DA: #Dummy.LLN0.Beh>stVal',
            ];
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            finder.paths = [path];
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, primaryAction.click()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('does not return a empty action on primary action click', function () {
                return testing_1.expect(actionEvent).to.not.have.been.called;
            });
        });
        describe('with a incorrect DO definition in the path', function () {
            var path = [
                'Server: IED1>P1',
                'LDevice: IED1>>CircuitBreaker_CB1',
                'LN0: IED1>>CircuitBreaker_CB1',
                'DO: some wrong identity',
                'DA: #Dummy.LLN0.Beh>stVal',
            ];
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            finder.paths = [path];
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, primaryAction.click()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('does not return a empty action on primary action click', function () {
                return testing_1.expect(actionEvent).to.not.have.been.called;
            });
        });
        describe('with a missing fc definition in the DA in the SCL file', function () {
            var path = [
                'Server: IED1>P1',
                'LDevice: IED1>>CircuitBreaker_CB1',
                'LN: IED1>>CircuitBreaker_CB1> XCBR 1',
                'DO: #Dummy.XCBR1>Pos',
                'DA: #Dummy.XCBR1.Pos>stVal',
            ];
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            finder.paths = [path];
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, primaryAction.click()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('does not return a empty action on primary action click', function () {
                return testing_1.expect(actionEvent).to.not.have.been.called;
            });
        });
    });
});
var templateObject_1;
