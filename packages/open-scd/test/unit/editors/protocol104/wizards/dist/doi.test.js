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
require("../../../../../src/addons/Wizards.js");
var foundation_js_1 = require("../../../../../src/foundation.js");
var doi_js_1 = require("../../../../../src/editors/protocol104/wizards/doi.js");
var test_support_js_1 = require("../../../wizards/test-support.js");
describe('Wizards for 104 DOI Element', function () {
    var doc;
    var doiElement;
    var element;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_support_js_1.fetchDoc('/test/testfiles/104/valid-addresses.scd')];
                case 1:
                    doc = _a.sent();
                    return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<oscd-wizards .host=", "></oscd-wizards>"], ["<oscd-wizards .host=", "></oscd-wizards>"])), document))];
                case 2:
                    element = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('show 104 DOI Basic Info (Known CDC Monitor Only)', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var wizard;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        doiElement = doc.querySelector('IED[name="B1"] LN[lnType="SE_GAPC_SET_V001"] DOI[name="Op"]');
                        wizard = doi_js_1.showDOIInfoWizard(doiElement);
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
                    case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).dom.to.equalSnapshot()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('show 104 DOI Basic Info with ctlModel (Known CDC Monitor and Control)', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var wizard;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        doiElement = doc.querySelector('IED[name="B1"] LN[lnType="SE_GGIO_SET_V002"] DOI[name="CmdBlk"]');
                        wizard = doi_js_1.showDOIInfoWizard(doiElement);
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
                    case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).dom.to.equalSnapshot()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('show 104 DOI Basic Info for CDC=ACD', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var doElement, doType, wizard;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        doiElement = doc.querySelector('IED[name="B1"] LN[lnType="SE_GAPC_SET_V001"] DOI[name="Str"]');
                        doElement = (_a = doc
                            .querySelector('LNodeType[id="SE_GAPC_SET_V001"] > DO[name="Str"]')) === null || _a === void 0 ? void 0 : _a.getAttribute('type');
                        testing_1.expect(doElement).to.be.equal('SE_ACD_V001');
                        doType = doc.querySelector("DOType[id=\"" + doElement + "\"]");
                        testing_1.expect(doType.getAttribute('cdc')).to.be.equal('ACD');
                        wizard = doi_js_1.showDOIInfoWizard(doiElement);
                        element.workflow.push(function () { return wizard; });
                        return [4 /*yield*/, element.requestUpdate()];
                    case 1:
                        _b.sent();
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
        }); });
    });
    describe('show 104 DOI Basic Info for CDC=DEL', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var doElement, doType;
            var _a;
            return __generator(this, function (_b) {
                doiElement = doc.querySelector('IED[name="B1"] LN[lnType="SE_MMXU_SET_V001"] DOI[name="PPV"]');
                doElement = (_a = doc
                    .querySelector('LNodeType[id="SE_MMXU_SET_V001"] > DO[name="PPV"]')) === null || _a === void 0 ? void 0 : _a.getAttribute('type');
                testing_1.expect(doElement).to.be.equal('SE_DEL_V001');
                doType = doc.querySelector("DOType[id=\"" + doElement + "\"]");
                testing_1.expect(doType.getAttribute('cdc')).to.be.equal('DEL');
                return [2 /*return*/];
            });
        }); });
    });
    describe('remove104Private', function () {
        var wizard;
        var actionEvent;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // We just need some element as Wizard for dispatching.
                wizard = document.firstElementChild;
                actionEvent = sinon_1.spy();
                wizard.addEventListener('editor-action', actionEvent);
                return [2 /*return*/];
            });
        }); });
        function expectComplexAction(expectedActions) {
            testing_1.expect(actionEvent).to.be.calledOnce;
            var action = actionEvent.args[0][0].detail.action;
            testing_1.expect(action).to.not.satisfy(foundation_js_1.isSimple);
            var complexAction = action;
            testing_1.expect(complexAction.actions.length).to.be.equal(expectedActions);
        }
        it('expected one Private Element to be removed', function () {
            doiElement = doc.querySelector('IED[name="B1"] LN[lnType="SE_GGIO_SET_V002"] DOI[name="SPCSO1"]');
            doi_js_1.remove104Private(doiElement)(wizard);
            expectComplexAction(1);
        });
        it('expected multiple Private Elements to be removed', function () {
            doiElement = doc.querySelector('IED[name="B1"] LN[lnType="SE_GGIO_SET_V002"] DOI[name="Mod"]');
            doi_js_1.remove104Private(doiElement)(wizard);
            expectComplexAction(6);
        });
    });
});
var templateObject_1;
