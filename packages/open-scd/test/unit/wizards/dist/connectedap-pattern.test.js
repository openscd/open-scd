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
require("../../../src/addons/Wizards.js");
require("../../../src/editors/communication/connectedap-editor.js");
var foundation_js_1 = require("../../foundation.js");
var connectedap_js_1 = require("../../../src/wizards/connectedap.js");
describe('Edit wizard for SCL element ConnectedAP', function () {
    var doc;
    var element;
    var inputs;
    var input;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<oscd-wizards .host=", "></oscd-wizards>"], ["<oscd-wizards .host=", "></oscd-wizards>"])), document))];
                case 1:
                    element = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('include an edit wizard that', function () {
        describe('for Edition 1 projects', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var wizard;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fetch('/test/testfiles/valid2003.scd')
                                .then(function (response) { return response.text(); })
                                .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                        case 1:
                            doc = _a.sent();
                            wizard = connectedap_js_1.editConnectedApWizard(doc.querySelector('ConnectedAP'));
                            element.workflow.push(function () { return wizard; });
                            return [4 /*yield*/, element.requestUpdate()];
                        case 2:
                            _a.sent();
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
            describe('contains an input to edit P element of type IP', function () {
                beforeEach(function () {
                    input = inputs.find(function (input) { return input.label === 'IP'; });
                });
                it('is always rendered', function () { return testing_1.expect(input).to.exist; });
                it('allow to edit for valid input', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(fast_check_1.ipV4(), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.invertedRegex(foundation_js_1.regExp.IPv4), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
            describe('contains an input to edit P element of type IP-SUBNET', function () {
                beforeEach(function () {
                    input = inputs.find(function (input) { return input.label === 'IP-SUBNET'; });
                });
                it('is always rendered', function () { return testing_1.expect(input).to.exist; });
                it('allow to edit for valid input', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(fast_check_1.ipV4(), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.invertedRegex(foundation_js_1.regExp.IPv4), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
            describe('contains an input to edit P element of type IP-GATEWAY', function () {
                beforeEach(function () {
                    input = inputs.find(function (input) { return input.label === 'IP-GATEWAY'; });
                });
                it('is always rendered', function () { return testing_1.expect(input).to.exist; });
                it('allow to edit for valid input', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(fast_check_1.ipV4(), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.invertedRegex(foundation_js_1.regExp.IPv4), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
            describe('contains an input to edit P element of type OSI-TSEL', function () {
                beforeEach(function () {
                    input = inputs.find(function (input) { return input.label === 'OSI-TSEL'; });
                });
                it('is always rendered', function () { return testing_1.expect(input).to.exist; });
                it('allow to edit for valid input', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.regexString(foundation_js_1.regExp.OSI, 1, 8), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.invertedRegex(foundation_js_1.regExp.OSI), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
            describe('contains an input to edit P element of type OSI-SSEL', function () {
                beforeEach(function () {
                    input = inputs.find(function (input) { return input.label === 'OSI-SSEL'; });
                });
                it('is always rendered', function () { return testing_1.expect(input).to.exist; });
                it('allow to edit for valid input', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.regexString(foundation_js_1.regExp.OSI, 1, 16), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.invertedRegex(foundation_js_1.regExp.OSI), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
            describe('contains an input to edit P element of type OSI-PSEL', function () {
                beforeEach(function () {
                    input = inputs.find(function (input) { return input.label === 'OSI-PSEL'; });
                });
                it('is always rendered', function () { return testing_1.expect(input).to.exist; });
                it('allow to edit for valid input', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.regexString(foundation_js_1.regExp.OSI, 1, 16), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.invertedRegex(foundation_js_1.regExp.OSI), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
            describe('contains an input to edit P element of type OSI-AP-Title', function () {
                beforeEach(function () {
                    input = inputs.find(function (input) { return input.label === 'OSI-AP-Title'; });
                });
                it('is always rendered', function () { return testing_1.expect(input).to.exist; });
                it('allow to edit for valid input', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.regexString(foundation_js_1.regExp.OSIAPi, 1), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.invertedRegex(foundation_js_1.regExp.OSIAPi), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
            describe('contains an input to edit P element of type OSI-AP-Invoke', function () {
                beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                input = inputs.find(function (input) { return input.label === 'OSI-AP-Invoke'; });
                                if (!(input && input.maybeValue === null)) return [3 /*break*/, 2];
                                return [4 /*yield*/, ((_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click())];
                            case 1:
                                _b.sent();
                                _b.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); });
                it('is always rendered', function () { return testing_1.expect(input).to.exist; });
                it('allow to edit for valid input', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.regexString(foundation_js_1.regExp.OSIid, 1, 5), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.invertedRegex(foundation_js_1.regExp.OSIid), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
            describe('contains an input to edit P element of type OSI-AE-Qualifier', function () {
                beforeEach(function () {
                    input = inputs.find(function (input) { return input.label === 'OSI-AE-Qualifier'; });
                });
                it('is always rendered', function () { return testing_1.expect(input).to.exist; });
                it('allow to edit for valid input', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.regexString(foundation_js_1.regExp.OSIid, 1, 5), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.invertedRegex(foundation_js_1.regExp.OSIid), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
            describe('contains an input to edit P element of type OSI-AE-Invoke', function () {
                beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                input = inputs.find(function (input) { return input.label === 'OSI-AE-Invoke'; });
                                if (!(input && input.maybeValue === null)) return [3 /*break*/, 2];
                                return [4 /*yield*/, ((_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click())];
                            case 1:
                                _b.sent();
                                _b.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); });
                it('is always rendered', function () { return testing_1.expect(input).to.exist; });
                it('allow to edit for valid input', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.regexString(foundation_js_1.regExp.OSIid, 1, 5), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.invertedRegex(foundation_js_1.regExp.OSIid), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
            describe('contains an input to edit P element of type OSI-NSAP', function () {
                beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                input = inputs.find(function (input) { return input.label === 'OSI-NSAP'; });
                                if (!(input && input.maybeValue === null)) return [3 /*break*/, 2];
                                return [4 /*yield*/, ((_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click())];
                            case 1:
                                _b.sent();
                                _b.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); });
                it('is always rendered', function () { return testing_1.expect(input).to.exist; });
                it('allow to edit for valid input', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.regexString(foundation_js_1.regExp.OSI, 1, 40), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.invertedRegex(foundation_js_1.regExp.OSI), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
            describe('contains an input to edit P element of type VLAN-ID', function () {
                beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                input = inputs.find(function (input) { return input.label === 'VLAN-ID'; });
                                if (!(input && input.maybeValue === null)) return [3 /*break*/, 2];
                                return [4 /*yield*/, ((_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click())];
                            case 1:
                                _b.sent();
                                _b.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); });
                it('is always rendered', function () { return testing_1.expect(input).to.exist; });
                it('allow to edit for valid input', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.regexString(foundation_js_1.regExp.OSI, 3, 3), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.invertedRegex(foundation_js_1.regExp.OSI), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
            describe('contains an input to edit P element of type VLAN-PRIORITY', function () {
                beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                input = inputs.find(function (input) { return input.label === 'VLAN-PRIORITY'; });
                                if (!(input && input.maybeValue === null)) return [3 /*break*/, 2];
                                return [4 /*yield*/, ((_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click())];
                            case 1:
                                _b.sent();
                                _b.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); });
                it('is always rendered', function () { return testing_1.expect(input).to.exist; });
                it('allow to edit for valid input', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.regexString(/^[0-7]$/), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.invertedRegex(/^[0-7]$/), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
        });
        describe('for Edition 2 projects', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var wizard;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fetch('/test/testfiles/valid2007B.scd')
                                .then(function (response) { return response.text(); })
                                .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                        case 1:
                            doc = _a.sent();
                            wizard = connectedap_js_1.editConnectedApWizard(doc.querySelector('ConnectedAP'));
                            element.workflow.push(function () { return wizard; });
                            return [4 /*yield*/, element.requestUpdate()];
                        case 2:
                            _a.sent();
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
            describe('contains an input to edit P element of type SNTP-Port', function () {
                beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                input = inputs.find(function (input) { return input.label === 'SNTP-Port'; });
                                if (!(input && input.maybeValue === null)) return [3 /*break*/, 2];
                                return [4 /*yield*/, ((_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click())];
                            case 1:
                                _b.sent();
                                _b.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); });
                it('is always rendered', function () { return testing_1.expect(input).to.exist; });
                it('allow to edit for valid input', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(fast_check_1.nat({ max: 65535 }).map(function (num) { return "" + num; }), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.invertedRegex(/^[0-9]*$/), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
            describe('contains an input to edit P element of type MMS-Port', function () {
                beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                input = inputs.find(function (input) { return input.label === 'MMS-Port'; });
                                if (!(input && input.maybeValue === null)) return [3 /*break*/, 2];
                                return [4 /*yield*/, ((_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click())];
                            case 1:
                                _b.sent();
                                _b.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); });
                it('is always rendered', function () { return testing_1.expect(input).to.exist; });
                it('allow to edit for valid input', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(fast_check_1.nat({ max: 65535 }).map(function (num) { return "" + num; }), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.invertedRegex(/^[0-9]*$/), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
            describe('contains an input to edit P element of type DNSName', function () {
                beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                input = inputs.find(function (input) { return input.label === 'DNSName'; });
                                if (!(input && input.maybeValue === null)) return [3 /*break*/, 2];
                                return [4 /*yield*/, ((_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click())];
                            case 1:
                                _b.sent();
                                _b.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); });
                it('is always rendered', function () { return testing_1.expect(input).to.exist; });
                it('allow to edit for valid input', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.regexString(/^\S*$/, 1), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
            });
            describe('contains an input to edit P element of type UDP-Port', function () {
                beforeEach(function () {
                    var _a;
                    input = inputs.find(function (input) { return input.label === 'UDP-Port'; });
                    if (input && input.maybeValue === null) {
                        (_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click();
                    }
                });
                it('is always rendered', function () { return testing_1.expect(input).to.exist; });
                it('allow to edit for valid input', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(fast_check_1.nat({ max: 65535 }).map(function (num) { return "" + num; }), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.invertedRegex(/^[0-9]*$/), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
            describe('contains an input to edit P element of type TCP-Port', function () {
                beforeEach(function () {
                    var _a;
                    input = inputs.find(function (input) { return input.label === 'TCP-Port'; });
                    if (input && input.maybeValue === null) {
                        (_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click();
                    }
                });
                it('is always rendered', function () { return testing_1.expect(input).to.exist; });
                it('allow to edit for valid input', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(fast_check_1.nat({ max: 65535 }).map(function (num) { return "" + num; }), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.invertedRegex(/^[0-9]*$/), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
            describe('contains an input to edit P element of type C37-118-IP-Port', function () {
                beforeEach(function () {
                    var _a;
                    input = inputs.find(function (input) { return input.label === 'C37-118-IP-Port'; });
                    if (input && input.maybeValue === null) {
                        (_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click();
                    }
                });
                it('is always rendered', function () { return testing_1.expect(input).to.exist; });
                it('allow to edit for valid input', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(fast_check_1.integer({ min: 1025, max: 65535 }).map(function (num) { return "" + num; }), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.invertedRegex(/^[0-9]*$/), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
        });
        describe('for Edition 2.1 projects', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var wizard;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fetch('/test/testfiles/valid2007B4.scd')
                                .then(function (response) { return response.text(); })
                                .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                        case 1:
                            doc = _a.sent();
                            wizard = connectedap_js_1.editConnectedApWizard(doc.querySelector('ConnectedAP'));
                            element.workflow.push(function () { return wizard; });
                            return [4 /*yield*/, element.requestUpdate()];
                        case 2:
                            _a.sent();
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
            describe('contains an input to edit P element of type IPv6', function () {
                beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                input = inputs.find(function (input) { return input.label === 'IPv6'; });
                                if (!(input && input.maybeValue === null)) return [3 /*break*/, 2];
                                return [4 /*yield*/, ((_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click())];
                            case 1:
                                _b.sent();
                                _b.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); });
                it('is always rendered', function () { return testing_1.expect(input).to.exist; });
                it('allow to edit for valid input', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.ipV6(), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.invertedRegex(foundation_js_1.regExp.IPv6), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
            describe('contains an input to edit P element of type IPv6-SUBNET', function () {
                beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                input = inputs.find(function (input) { return input.label === 'IPv6-SUBNET'; });
                                if (!(input && input.maybeValue === null)) return [3 /*break*/, 2];
                                return [4 /*yield*/, ((_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click())];
                            case 1:
                                _b.sent();
                                _b.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); });
                it('is always rendered', function () { return testing_1.expect(input).to.exist; });
                it('allow to edit for valid input', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.ipV6SubNet(), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.invertedRegex(/^[0-9/]*$/), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
            describe('contains an input to edit P element of type IPv6-GATEWAY', function () {
                beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                input = inputs.find(function (input) { return input.label === 'IPv6-GATEWAY'; });
                                if (!(input && input.maybeValue === null)) return [3 /*break*/, 2];
                                return [4 /*yield*/, ((_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click())];
                            case 1:
                                _b.sent();
                                _b.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); });
                it('is always rendered', function () { return testing_1.expect(input).to.exist; });
                it('allow to edit for valid input', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.ipV6(), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.invertedRegex(foundation_js_1.regExp.IPv6), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
            describe('contains an input to edit P element of type IPv6FlowLabel', function () {
                beforeEach(function () {
                    var _a;
                    input = inputs.find(function (input) { return input.label === 'IPv6FlowLabel'; });
                    if (input && input.maybeValue === null) {
                        (_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click();
                    }
                });
                it('is always rendered', function () { return testing_1.expect(input).to.exist; });
                it('allow to edit for valid input', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(fast_check_1["default"].hexaString({ minLength: 1, maxLength: 5 }), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.invertedRegex(/^[0-9a-fA-F]{1,5}$/), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
            describe('contains an input to edit P element of type IPv6ClassOfTraffic', function () {
                beforeEach(function () {
                    var _a;
                    input = inputs.find(function (input) { return input.label === 'IPv6ClassOfTraffic'; });
                    if (input && input.maybeValue === null) {
                        (_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click();
                    }
                });
                it('is always rendered', function () { return testing_1.expect(input).to.exist; });
                it('allow to edit for valid input', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(fast_check_1.nat({ max: 255 }).map(function (num) { return "" + num; }), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.invertedRegex(/^[0-9]*$/), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
            describe('contains an input to edit P element of type IPv6-IGMPv3Src', function () {
                beforeEach(function () {
                    var _a;
                    input = inputs.find(function (input) { return input.label === 'IPv6-IGMPv3Src'; });
                    if (input && input.maybeValue === null) {
                        (_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click();
                    }
                });
                it('is always rendered', function () { return testing_1.expect(input).to.exist; });
                it('allow to edit for valid input', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.ipV6(), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.invertedRegex(foundation_js_1.regExp.IPv6), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
            describe('contains an input to edit P element of type IP-IGMPv3Sr', function () {
                beforeEach(function () {
                    var _a;
                    input = inputs.find(function (input) { return input.label === 'IP-IGMPv3Sr'; });
                    if (input && input.maybeValue === null) {
                        (_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click();
                    }
                });
                it('is always rendered', function () { return testing_1.expect(input).to.exist; });
                it('allow to edit for valid input', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(fast_check_1.ipV4(), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.invertedRegex(foundation_js_1.regExp.IPv4), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
            describe('contains an input to edit P element of type IP-ClassOfTraffic', function () {
                beforeEach(function () {
                    var _a;
                    input = inputs.find(function (input) { return input.label === 'IP-ClassOfTraffic'; });
                    if (input && input.maybeValue === null) {
                        (_a = input.nullSwitch) === null || _a === void 0 ? void 0 : _a.click();
                    }
                });
                it('is always rendered', function () { return testing_1.expect(input).to.exist; });
                it('allow to edit for valid input', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.regexString(foundation_js_1.regExp.OSI, 1, 2), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
                            case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.invertedRegex(foundation_js_1.regExp.OSI), function (testValue) { return __awaiter(void 0, void 0, void 0, function () {
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
        });
    });
});
var templateObject_1;
