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
var smv_js_1 = require("../../../src/wizards/smv.js");
var foundation_js_1 = require("../../foundation.js");
describe('Wizards for SCL element SMV', function () {
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
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/wizards/sampledvaluecontrol.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        doc = _b.sent();
                        wizard = smv_js_1.editSMvWizard(doc.querySelector('SMV'));
                        element.workflow.push(function () { return wizard; });
                        return [4 /*yield*/, element.requestUpdate()];
                    case 2:
                        _b.sent();
                        primaryAction = ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-button[slot="primaryAction"]'));
                        inputs = Array.from(element.wizardUI.inputs);
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
        describe('contains an input to edit P element of type MAC-Address', function () {
            beforeEach(function () {
                input = inputs.find(function (input) { return input.label === 'MAC-Address'; });
            });
            it('is always rendered', function () { return testing_1.expect(input).to.exist; });
            it('allow to edit for valid input', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.MAC(), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            input.value = testValue.toUpperCase();
                                            return [4 /*yield*/, element.requestUpdate()];
                                        case 1:
                                            _a.sent();
                                            testing_1.expect(input.checkValidity()).to.be["true"];
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); });
            it('does not allow to edit for invalid input', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.invertedRegex(foundation_js_1.regExp.MAC), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            input.value = testValue;
                                            return [4 /*yield*/, element.requestUpdate()];
                                        case 1:
                                            _a.sent();
                                            testing_1.expect(input.checkValidity()).to.be["false"];
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); });
        });
        describe('contains an input to edit P element of type APPID', function () {
            beforeEach(function () {
                input = inputs.find(function (input) { return input.label === 'APPID'; });
            });
            it('is always rendered', function () { return testing_1.expect(input).to.exist; });
            it('allow to edit for valid input', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(fast_check_1.hexaString({ minLength: 4, maxLength: 4 }), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            input.value = testValue.toUpperCase();
                                            return [4 /*yield*/, element.requestUpdate()];
                                        case 1:
                                            _a.sent();
                                            testing_1.expect(input.checkValidity()).to.be["true"];
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); });
            it('does not allow to edit for invalid input', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(fast_check_1.hexaString({ minLength: 5 }), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            input.value = testValue.toUpperCase();
                                            return [4 /*yield*/, element.requestUpdate()];
                                        case 1:
                                            _a.sent();
                                            testing_1.expect(input.checkValidity()).to.be["false"];
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); });
            it('does not allow to edit characters < 4', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(fast_check_1.hexaString({ minLength: 0, maxLength: 3 }), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            input.value = testValue.toUpperCase();
                                            return [4 /*yield*/, element.requestUpdate()];
                                        case 1:
                                            _a.sent();
                                            testing_1.expect(input.checkValidity()).to.be["false"];
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); });
        });
        describe('contains an input to edit P element of type VLAN-ID', function () {
            beforeEach(function () {
                input = inputs.find(function (input) { return input.label === 'VLAN-ID'; });
            });
            it('is always rendered', function () { return testing_1.expect(input).to.exist; });
            it('allow to edit for valid input', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(fast_check_1.hexaString({ minLength: 3, maxLength: 3 }), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            input.value = testValue.toUpperCase();
                                            return [4 /*yield*/, element.requestUpdate()];
                                        case 1:
                                            _a.sent();
                                            testing_1.expect(input.checkValidity()).to.be["true"];
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); });
            it('does not allow to edit for invalid input', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(fast_check_1.hexaString({ minLength: 4 }), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            input.value = testValue.toUpperCase();
                                            return [4 /*yield*/, element.requestUpdate()];
                                        case 1:
                                            _a.sent();
                                            testing_1.expect(input.checkValidity()).to.be["false"];
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); });
            it('does not allow to edit characters < 3', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(fast_check_1.hexaString({ minLength: 0, maxLength: 2 }), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            input.value = testValue.toUpperCase();
                                            return [4 /*yield*/, element.requestUpdate()];
                                        case 1:
                                            _a.sent();
                                            testing_1.expect(input.checkValidity()).to.be["false"];
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); });
        });
        describe('contains an input to edit P element of type VLAN-PRIORITY', function () {
            beforeEach(function () {
                input = inputs.find(function (input) { return input.label === 'VLAN-PRIORITY'; });
            });
            it('is always rendered', function () { return testing_1.expect(input).to.exist; });
            it('allow to edit for valid input', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(fast_check_1.integer({ min: 0, max: 7 }).map(function (num) { return "" + num; }), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            input.value = testValue;
                                            return [4 /*yield*/, element.requestUpdate()];
                                        case 1:
                                            _a.sent();
                                            testing_1.expect(input.checkValidity()).to.be["true"];
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); });
            it('does not allow to edit for invalid input', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(fast_check_1.integer({ min: 8 }).map(function (num) { return "" + num; }), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            input.value = testValue;
                                            return [4 /*yield*/, element.requestUpdate()];
                                        case 1:
                                            _a.sent();
                                            testing_1.expect(input.checkValidity()).to.be["false"];
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); });
        });
        it('does not update SMV element when no P element has changed', function () { return __awaiter(void 0, void 0, void 0, function () {
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
        it('properly updates a P element of type MAC-Address', function () { return __awaiter(void 0, void 0, void 0, function () {
            var complexAction, oldAddress, newAddress;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        input = (inputs.find(function (input) { return input.label === 'MAC-Address'; }));
                        input.value = '01-0C-CD-01-01-00';
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
                        testing_1.expect((_a = oldAddress.querySelector('P[type="MAC-Address"]')) === null || _a === void 0 ? void 0 : _a.textContent).to.equal('01-0C-CD-04-00-20');
                        testing_1.expect((_b = newAddress.querySelector('P[type="MAC-Address"]')) === null || _b === void 0 ? void 0 : _b.textContent).to.equal('01-0C-CD-01-01-00');
                        return [2 /*return*/];
                }
            });
        }); });
        it('properly updates a P element of type APPID', function () { return __awaiter(void 0, void 0, void 0, function () {
            var complexAction, oldAddress, newAddress;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        input = inputs.find(function (input) { return input.label === 'APPID'; });
                        input.value = '001A';
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
                        testing_1.expect((_a = oldAddress.querySelector('P[type="APPID"]')) === null || _a === void 0 ? void 0 : _a.textContent).to.equal('4002');
                        testing_1.expect((_b = newAddress.querySelector('P[type="APPID"]')) === null || _b === void 0 ? void 0 : _b.textContent).to.equal('001A');
                        return [2 /*return*/];
                }
            });
        }); });
        it('properly updates a P element of type VLAN-ID', function () { return __awaiter(void 0, void 0, void 0, function () {
            var complexAction, oldAddress, newAddress;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        input = inputs.find(function (input) { return input.label === 'VLAN-ID'; });
                        input.value = '07D';
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
                        testing_1.expect((_a = oldAddress.querySelector('P[type="VLAN-ID"]')) === null || _a === void 0 ? void 0 : _a.textContent).to.equal('007');
                        testing_1.expect((_b = newAddress.querySelector('P[type="VLAN-ID"]')) === null || _b === void 0 ? void 0 : _b.textContent).to.equal('07D');
                        return [2 /*return*/];
                }
            });
        }); });
        it('properly updates a P element of type VLAN-PRIORITY', function () { return __awaiter(void 0, void 0, void 0, function () {
            var complexAction, oldAddress, newAddress;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        input = (inputs.find(function (input) { return input.label === 'VLAN-PRIORITY'; }));
                        input.value = '3';
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
                        testing_1.expect((_a = oldAddress.querySelector('P[type="VLAN-PRIORITY"]')) === null || _a === void 0 ? void 0 : _a.textContent).to.equal('4');
                        testing_1.expect((_b = newAddress.querySelector('P[type="VLAN-PRIORITY"]')) === null || _b === void 0 ? void 0 : _b.textContent).to.equal('3');
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
var templateObject_1;
