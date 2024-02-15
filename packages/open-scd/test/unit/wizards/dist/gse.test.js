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
var foundation_js_1 = require("../../../src/foundation.js");
var gse_js_1 = require("../../../src/wizards/gse.js");
describe('gse wizards', function () {
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
    describe('editGseWizard', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var wizard;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wizard = gse_js_1.editGseWizard(doc.querySelector('GSE[ldInst="CircuitBreaker_CB1"][cbName="GCB"]'));
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
    describe('updateGSEAction', function () {
        var gse;
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
                        gse = doc.querySelector('GSE[ldInst="CircuitBreaker_CB1"][cbName="GCB"]');
                        wizard = gse_js_1.editGseWizard(doc.querySelector('GSE[ldInst="CircuitBreaker_CB1"][cbName="GCB"]'));
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
        it('does not update a GSE element when no attribute has changed', function () {
            var editorAction = gse_js_1.updateGSEAction(gse);
            var actions = editorAction(inputs, element.wizardUI)[0]
                .actions;
            testing_1.expect(actions).to.be.empty;
        });
        it('update a GSE element when only MAC-Address attribute changed', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input, editorAction, complexAction, actions, oldElement, newElement;
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        input = inputs[0];
                        input.value = '01-0C-CD-01-00-11';
                        return [4 /*yield*/, input.requestUpdate()];
                    case 1:
                        _e.sent();
                        editorAction = gse_js_1.updateGSEAction(gse);
                        complexAction = editorAction(inputs, newWizard());
                        testing_1.expect(complexAction[0]).to.not.satisfy(foundation_js_1.isSimple);
                        actions = complexAction[0].actions;
                        testing_1.expect(actions.length).to.equal(2);
                        testing_1.expect(actions[0]).to.satisfy(foundation_js_1.isDelete);
                        testing_1.expect(actions[1]).to.satisfy(foundation_js_1.isCreate);
                        oldElement = actions[0].old.element;
                        newElement = actions[1]["new"].element;
                        testing_1.expect((_b = (_a = oldElement.querySelector('P[type="MAC-Address"]')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim()).to.equal('01-0C-CD-01-00-10');
                        testing_1.expect((_d = (_c = newElement.querySelector('P[type="MAC-Address"]')) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.trim()).to.equal('01-0C-CD-01-00-11');
                        return [2 /*return*/];
                }
            });
        }); });
        it('update a GSE element when only APPID attribute changed', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input, editorAction, complexAction, actions, oldElement, newElement;
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        input = inputs[1];
                        input.value = '014';
                        return [4 /*yield*/, input.requestUpdate()];
                    case 1:
                        _e.sent();
                        editorAction = gse_js_1.updateGSEAction(gse);
                        complexAction = editorAction(inputs, newWizard());
                        testing_1.expect(complexAction[0]).to.not.satisfy(foundation_js_1.isSimple);
                        actions = complexAction[0].actions;
                        testing_1.expect(actions.length).to.equal(2);
                        testing_1.expect(actions[0]).to.satisfy(foundation_js_1.isDelete);
                        testing_1.expect(actions[1]).to.satisfy(foundation_js_1.isCreate);
                        oldElement = actions[0].old.element;
                        newElement = actions[1]["new"].element;
                        testing_1.expect((_b = (_a = oldElement.querySelector('P[type="APPID"]')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim()).to.equal('0010');
                        testing_1.expect((_d = (_c = newElement.querySelector('P[type="APPID"]')) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.trim()).to.equal('014');
                        return [2 /*return*/];
                }
            });
        }); });
        it('update a GSE element when only VLAN-ID attribute changed', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input, editorAction, complexAction, actions, oldElement, newElement;
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        input = inputs[2];
                        input.maybeValue = '0F1';
                        return [4 /*yield*/, input.requestUpdate()];
                    case 1:
                        _e.sent();
                        editorAction = gse_js_1.updateGSEAction(gse);
                        complexAction = editorAction(inputs, newWizard());
                        testing_1.expect(complexAction[0]).to.not.satisfy(foundation_js_1.isSimple);
                        actions = complexAction[0].actions;
                        testing_1.expect(actions.length).to.equal(2);
                        testing_1.expect(actions[0]).to.satisfy(foundation_js_1.isDelete);
                        testing_1.expect(actions[1]).to.satisfy(foundation_js_1.isCreate);
                        oldElement = actions[0].old.element;
                        newElement = actions[1]["new"].element;
                        testing_1.expect((_b = (_a = oldElement.querySelector('P[type="VLAN-ID"]')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim())
                            .to.be.undefined;
                        testing_1.expect((_d = (_c = newElement.querySelector('P[type="VLAN-ID"]')) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.trim()).to.equal('0F1');
                        return [2 /*return*/];
                }
            });
        }); });
        it('update a GSE element when only VLAN-PRIORITY attribute changed', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input, editorAction, complexAction, actions, oldElement, newElement;
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        input = inputs[3];
                        input.value = '7';
                        return [4 /*yield*/, input.requestUpdate()];
                    case 1:
                        _e.sent();
                        editorAction = gse_js_1.updateGSEAction(gse);
                        complexAction = editorAction(inputs, newWizard());
                        testing_1.expect(complexAction[0]).to.not.satisfy(foundation_js_1.isSimple);
                        actions = complexAction[0].actions;
                        testing_1.expect(actions.length).to.equal(2);
                        testing_1.expect(actions[0]).to.satisfy(foundation_js_1.isDelete);
                        testing_1.expect(actions[1]).to.satisfy(foundation_js_1.isCreate);
                        oldElement = actions[0].old.element;
                        newElement = actions[1]["new"].element;
                        testing_1.expect((_b = (_a = oldElement.querySelector('P[type="VLAN-PRIORITY"]')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim()).to.equal('4');
                        testing_1.expect((_d = (_c = newElement.querySelector('P[type="VLAN-PRIORITY"]')) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.trim()).to.equal('7');
                        return [2 /*return*/];
                }
            });
        }); });
        it('update a GSE element when only MinTime attribute changed', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input, editorAction, complexAction, actions, updateAction;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        input = inputs[4];
                        input.value = '15';
                        return [4 /*yield*/, input.requestUpdate()];
                    case 1:
                        _c.sent();
                        editorAction = gse_js_1.updateGSEAction(gse);
                        complexAction = editorAction(inputs, newWizard());
                        testing_1.expect(complexAction[0]).to.not.satisfy(foundation_js_1.isSimple);
                        actions = complexAction[0].actions;
                        testing_1.expect(actions.length).to.equal(1);
                        testing_1.expect(actions[0]).to.satisfy(foundation_js_1.isReplace);
                        updateAction = actions[0];
                        testing_1.expect((_a = updateAction.old.element.textContent) === null || _a === void 0 ? void 0 : _a.trim()).to.equal('10');
                        testing_1.expect((_b = updateAction["new"].element.textContent) === null || _b === void 0 ? void 0 : _b.trim()).to.equal('15');
                        return [2 /*return*/];
                }
            });
        }); });
        it('update a GSE element when only MaxTime attribute changed', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input, editorAction, complexAction, actions, updateAction;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        input = inputs[5];
                        input.value = '65';
                        return [4 /*yield*/, input.requestUpdate()];
                    case 1:
                        _c.sent();
                        editorAction = gse_js_1.updateGSEAction(gse);
                        complexAction = editorAction(inputs, newWizard());
                        testing_1.expect(complexAction[0]).to.not.satisfy(foundation_js_1.isSimple);
                        actions = complexAction[0].actions;
                        testing_1.expect(actions.length).to.equal(1);
                        testing_1.expect(actions[0]).to.satisfy(foundation_js_1.isReplace);
                        updateAction = actions[0];
                        testing_1.expect((_a = updateAction.old.element.textContent) === null || _a === void 0 ? void 0 : _a.trim()).to.equal('10000');
                        testing_1.expect((_b = updateAction["new"].element.textContent) === null || _b === void 0 ? void 0 : _b.trim()).to.equal('65');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('getMTimeAction', function () {
        var gse = new DOMParser().parseFromString("<GSE ldInst=\"myLdInst\" cbName=\"cbName\"></GSE>", 'application/xml').documentElement;
        var oldMinTime = new DOMParser().parseFromString("<MinTime unit=\"s\" multiplier=\"m\">10</MinTime>", 'application/xml').documentElement;
        var oldMaxTime = new DOMParser().parseFromString("<MaxTime unit=\"s\" multiplier=\"m\">10000</MaxTime>", 'application/xml').documentElement;
        it('updates a MinTime child element when chenged', function () {
            var _a;
            var editorAction = gse_js_1.getMTimeAction('MinTime', oldMinTime, '654', gse);
            testing_1.expect(editorAction).to.satisfy(foundation_js_1.isReplace);
            testing_1.expect((_a = editorAction["new"].element.textContent) === null || _a === void 0 ? void 0 : _a.trim()).to.equal('654');
        });
        it('creates a MimTime child element when missing', function () {
            var _a;
            var editorAction = gse_js_1.getMTimeAction('MinTime', null, '654', gse);
            testing_1.expect(editorAction).to.satisfy(foundation_js_1.isCreate);
            testing_1.expect((_a = editorAction["new"].element.textContent) === null || _a === void 0 ? void 0 : _a.trim()).to.equal('654');
        });
        it('remove a Val child element if present', function () {
            var editorAction = gse_js_1.getMTimeAction('MinTime', oldMinTime, null, gse);
            testing_1.expect(editorAction).to.satisfy(foundation_js_1.isDelete);
        });
        it('updates a MaxTime child element when chenged', function () {
            var _a;
            var editorAction = gse_js_1.getMTimeAction('MaxTime', oldMaxTime, '1234123', gse);
            testing_1.expect(editorAction).to.satisfy(foundation_js_1.isReplace);
            testing_1.expect((_a = editorAction["new"].element.textContent) === null || _a === void 0 ? void 0 : _a.trim()).to.equal('1234123');
        });
        it('creates a MaxTime child element when missing', function () {
            var _a;
            var editorAction = gse_js_1.getMTimeAction('MaxTime', null, '1234123', gse);
            testing_1.expect(editorAction).to.satisfy(foundation_js_1.isCreate);
            testing_1.expect((_a = editorAction["new"].element.textContent) === null || _a === void 0 ? void 0 : _a.trim()).to.equal('1234123');
        });
        it('remove a MaxTime child element if present', function () {
            var editorAction = gse_js_1.getMTimeAction('MaxTime', oldMaxTime, null, gse);
            testing_1.expect(editorAction).to.satisfy(foundation_js_1.isDelete);
        });
    });
});
var templateObject_1;
