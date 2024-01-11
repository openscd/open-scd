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
var foundation_js_1 = require("../../../../../src/foundation.js");
require("../../../../mock-wizard.js");
var createAddresses_js_1 = require("../../../../../src/editors/protocol104/wizards/createAddresses.js");
var test_support_js_1 = require("../../../wizards/test-support.js");
describe('Wizards for preparing 104 Address Creation', function () {
    var doc;
    var lnElement;
    var doElement;
    var element;
    var inputs;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_support_js_1.fetchDoc('/test/testfiles/104/valid-empty-addresses.scd')];
                case 1:
                    doc = _a.sent();
                    return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<mock-wizard></mock-wizard>"], ["<mock-wizard></mock-wizard>"]))))];
                case 2:
                    element = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    function prepareWizard(queryLnSelector, doName) {
        return __awaiter(this, void 0, Promise, function () {
            var lnType, wizard;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lnElement = doc.querySelector(queryLnSelector);
                        lnType = lnElement.getAttribute('lnType');
                        doElement = doc.querySelector("LNodeType[id=\"" + lnType + "\"] > DO[name=\"" + doName + "\"]");
                        wizard = createAddresses_js_1.createAddressesWizard(lnElement, doElement);
                        element.workflow.push(function () { return wizard; });
                        return [4 /*yield*/, element.requestUpdate()];
                    case 1:
                        _a.sent();
                        inputs = Array.from(element.wizardUI.inputs);
                        return [2 /*return*/];
                }
            });
        });
    }
    function expectCreateActions(actions, expectedCreateActions) {
        // We always first expect a ComplexAction.
        testing_1.expect(actions).to.have.length(1);
        testing_1.expect(actions[0]).to.not.satisfy(foundation_js_1.isSimple);
        // Next check the number of Actions and if they are all Create Actions.
        var createActions = actions[0].actions;
        testing_1.expect(createActions).to.have.length(expectedCreateActions);
        createActions.forEach(function (createAction) {
            testing_1.expect(createAction).to.satisfy(foundation_js_1.isCreate);
        });
    }
    describe('show prepare 104 Address creation (single monitor TI only)', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prepareWizard('IED[name="B1"] LN0[lnType="SE_LLN0_SET_V001"]', 'MltLev')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('when processing the request, the expected Create Actions are returned', function () {
            var actions = createAddresses_js_1.createAddressesAction(lnElement, doElement, false)(inputs, element.wizardUI);
            expectCreateActions(actions, 1);
        });
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
    describe('show prepare 104 Address creation (multi monitor TI only)', function () {
        var newTiValue = '39';
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prepareWizard('IED[name="B1"] LN[lnType="SE_GAPC_SET_V001"]', 'Op')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('when processing the request, the expected Create Actions are returned', function () { return __awaiter(void 0, void 0, void 0, function () {
            var actions;
            return __generator(this, function (_a) {
                inputs[3].value = newTiValue;
                actions = createAddresses_js_1.createAddressesAction(lnElement, doElement, false)(inputs, element.wizardUI);
                expectCreateActions(actions, 1);
                return [2 /*return*/];
            });
        }); });
        it('TI contains description', function () { return __awaiter(void 0, void 0, void 0, function () {
            var tiDescription;
            var _a;
            return __generator(this, function (_b) {
                tiDescription = element.wizardUI.dialog.querySelector("wizard-select[label=\"monitorTi\"] > mwc-list-item[value='" + newTiValue + "']");
                testing_1.expect((_a = tiDescription.textContent) === null || _a === void 0 ? void 0 : _a.trim()).to.equal(newTiValue + " ([protocol104.values.signalNames.tiNumber" + newTiValue + "])");
                return [2 /*return*/];
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
    describe('show prepare 104 Address creation (single monitor TI with CtlModel)', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prepareWizard('IED[name="B1"] LN[lnType="SE_GGIO_SET_V002"]', 'SPCSO1')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('when processing the request, the expected Create Actions are returned', function () {
            var actions = createAddresses_js_1.createAddressesAction(lnElement, doElement, false)(inputs, element.wizardUI);
            expectCreateActions(actions, 1);
        });
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
    describe('show prepare 104 Address creation (single monitor TI and single control TI with CtlModel)', function () {
        var newMonitorTiValue = '30';
        var newControlTiValue = '58';
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prepareWizard('IED[name="B1"] LN[lnType="SE_GGIO_SET_V002"]', 'SPCSO2')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('when processing the request without Check Selected, the expected Create Actions are returned', function () {
            inputs[3].value = newMonitorTiValue;
            inputs[5].value = newControlTiValue;
            var actions = createAddresses_js_1.createAddressesAction(lnElement, doElement, true)(inputs, element.wizardUI);
            expectCreateActions(actions, 2);
        });
        it('TIs contain descriptions', function () { return __awaiter(void 0, void 0, void 0, function () {
            var monitorTi, controlTi, monitorTiValue, controlTiValue;
            return __generator(this, function (_a) {
                monitorTi = element.wizardUI.dialog.querySelector('wizard-textfield[label="monitorTi"]');
                testing_1.expect(monitorTi).to.exist;
                controlTi = element.wizardUI.dialog.querySelector("wizard-textfield[label=\"controlTi\"]");
                testing_1.expect(controlTi).to.exist;
                monitorTiValue = monitorTi.value;
                controlTiValue = controlTi.value;
                testing_1.expect(monitorTiValue).to.equal(newMonitorTiValue + " ([protocol104.values.signalNames.tiNumber" + newMonitorTiValue + "])");
                testing_1.expect(controlTiValue).to.equal(newControlTiValue + " ([protocol104.values.signalNames.tiNumber" + newControlTiValue + "])");
                return [2 /*return*/];
            });
        }); });
        it('when processing the request with Check Selected, the expected Create Actions are returned', function () { return __awaiter(void 0, void 0, void 0, function () {
            var switchElement;
            return __generator(this, function (_a) {
                switchElement = element.wizardUI.dialog.querySelector('');
                "mwc-switch[id=\"controlCheck\"]";
                return [2 /*return*/];
            });
        }); });
        switchElement.checked = true;
        yield element.requestUpdate();
        var actions = createAddresses_js_1.createAddressesAction(lnElement, doElement, true)(inputs, element.wizardUI);
        expectCreateActions(actions, 3);
    });
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
;
var templateObject_1;
