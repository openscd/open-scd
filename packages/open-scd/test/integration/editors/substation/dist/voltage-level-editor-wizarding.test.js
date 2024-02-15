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
require("../../../../src/addons/Wizards.js");
require("../../../../src/editors/substation/voltage-level-editor.js");
var foundation_js_1 = require("../../../foundation.js");
var foundation_js_2 = require("../../../../src/foundation.js");
describe('voltage-level-editor wizarding integration', function () {
    var doc;
    var parent;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, fetch('/test/testfiles/valid2007B4.scd')
                        .then(function (response) { return response.text(); })
                        .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                case 1:
                    doc = _c.sent();
                    return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<oscd-wizards .host=", "\n        ><voltage-level-editor\n          .element=", "\n        ></voltage-level-editor\n      ></oscd-wizards>"], ["<oscd-wizards .host=", "\n        ><voltage-level-editor\n          .element=", "\n        ></voltage-level-editor\n      ></oscd-wizards>"])), document, doc.querySelector('VoltageLevel')))];
                case 2:
                    parent = _c.sent();
                    ((_b = (_a = parent === null || parent === void 0 ? void 0 : parent.querySelector('voltage-level-editor')) === null || _a === void 0 ? void 0 : _a.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector('mwc-icon-button[icon="edit"]')).click();
                    return [4 /*yield*/, parent.updateComplete];
                case 3:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.expect(parent.wizardUI.dialog).to.equalSnapshot({
                        ignoreAttributes: [
                            { tags: ['wizard-textfield'], attributes: ['pattern'] },
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
            testing_1.expect(parent.wizardUI.dialog.querySelectorAll('wizard-textfield[pattern]')
                .length).to.equal(2);
            testing_1.expect(parent.wizardUI
                .dialog.querySelectorAll('wizard-textfield[pattern]')[0]
                .getAttribute('pattern')).to.equal(foundation_js_2.patterns.unsigned);
            testing_1.expect(parent.wizardUI
                .dialog.querySelectorAll('wizard-textfield[pattern]')[1]
                .getAttribute('pattern')).to.equal(foundation_js_2.patterns.decimal);
            return [2 /*return*/];
        });
    }); });
    describe('the first input element', function () {
        it('edits the attribute name', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                testing_1.expect(parent.wizardUI.inputs[0].label).to.equal('name');
                return [2 /*return*/];
            });
        }); });
        it('edits only for valid inputs', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.regexString(foundation_js_1.regExp.tName, 1), function (name) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        parent.wizardUI.inputs[0].value = name;
                                        return [4 /*yield*/, parent.updateComplete];
                                    case 1:
                                        _a.sent();
                                        testing_1.expect(parent.wizardUI.inputs[0].checkValidity()).to.be["true"];
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
    describe('the second input element', function () {
        it('edits the attribute desc', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                testing_1.expect(parent.wizardUI.inputs[1].label).to.equal('desc');
                return [2 /*return*/];
            });
        }); });
        it('edits only for valid inputs', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.regexString(foundation_js_1.regExp.desc), function (desc) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        parent.wizardUI.inputs[1].value = desc;
                                        return [4 /*yield*/, parent.updateComplete];
                                    case 1:
                                        _a.sent();
                                        testing_1.expect(parent.wizardUI.inputs[1].checkValidity()).to.be["true"];
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
    describe('the third input element', function () {
        it('edits the attribute nomFreq', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                testing_1.expect(parent.wizardUI.inputs[2].label).to.equal('nomFreq');
                return [2 /*return*/];
            });
        }); });
        it('edits only for valid inputs', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.regexString(foundation_js_1.regExp.unsigned, 1), function (nomFreq) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        parent.wizardUI.inputs[2].value = nomFreq;
                                        return [4 /*yield*/, parent.updateComplete];
                                    case 1:
                                        _a.sent();
                                        testing_1.expect(parent.wizardUI.inputs[2].checkValidity()).to.be["true"];
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
        it('requires a nonnegative value', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parent.wizardUI.inputs[2].value = '';
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _a.sent();
                        testing_1.expect(parent.wizardUI.inputs[2].checkValidity()).to.be["false"];
                        parent.wizardUI.inputs[2].value = '-50.';
                        return [4 /*yield*/, parent.updateComplete];
                    case 2:
                        _a.sent();
                        testing_1.expect(parent.wizardUI.inputs[2].checkValidity()).to.be["false"];
                        parent.wizardUI.inputs[2].value = '+50.';
                        return [4 /*yield*/, parent.updateComplete];
                    case 3:
                        _a.sent();
                        testing_1.expect(parent.wizardUI.inputs[2].checkValidity()).to.be["true"];
                        return [2 /*return*/];
                }
            });
        }); });
        it('rejects action for invalid inputs', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.regexString(foundation_js_1.inverseRegExp.unsigned, 1), function (nomFreq) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        parent.wizardUI.inputs[2].value = nomFreq;
                                        return [4 /*yield*/, parent.updateComplete];
                                    case 1:
                                        _a.sent();
                                        testing_1.expect(parent.wizardUI.inputs[2].checkValidity()).to.be["false"];
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
    describe('the fourth input element', function () {
        it('edits the attribute ', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                testing_1.expect(parent.wizardUI.inputs[3].label).to.equal('numPhases');
                return [2 /*return*/];
            });
        }); });
        it('edits only for valid inputs', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(fast_check_1["default"].integer(1, 255), function (numPhases) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        parent.wizardUI.inputs[3].value = String(numPhases);
                                        return [4 /*yield*/, parent.updateComplete];
                                    case 1:
                                        _a.sent();
                                        testing_1.expect(parent.wizardUI.inputs[3].checkValidity()).to.be["true"];
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
        it('is of the type unsingedByte', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parent.wizardUI.inputs[3].value = '0';
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _a.sent();
                        testing_1.expect(parent.wizardUI.inputs[3].checkValidity()).to.be["false"];
                        parent.wizardUI.inputs[3].value = '256';
                        return [4 /*yield*/, parent.updateComplete];
                    case 2:
                        _a.sent();
                        testing_1.expect(parent.wizardUI.inputs[3].checkValidity()).to.be["false"];
                        parent.wizardUI.inputs[3].value = '-65';
                        return [4 /*yield*/, parent.updateComplete];
                    case 3:
                        _a.sent();
                        testing_1.expect(parent.wizardUI.inputs[3].checkValidity()).to.be["false"];
                        return [2 /*return*/];
                }
            });
        }); });
        it('rejects edition for invalid inputs', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.regexString(foundation_js_1.inverseRegExp.integer, 1), function (nomFreq) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        parent.wizardUI.inputs[3].value = nomFreq;
                                        return [4 /*yield*/, parent.updateComplete];
                                    case 1:
                                        _a.sent();
                                        testing_1.expect(parent.wizardUI.inputs[3].checkValidity()).to.be["false"];
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
    describe('the fifth input element', function () {
        it('edits the attribute ', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                testing_1.expect(parent.wizardUI.inputs[4].label).to.equal('Voltage');
                return [2 /*return*/];
            });
        }); });
        it('edits only for valid inputs', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.regexString(foundation_js_1.regExp.decimal), function (nomFreq) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        parent.wizardUI.inputs[4].value = nomFreq;
                                        return [4 /*yield*/, parent.updateComplete];
                                    case 1:
                                        _a.sent();
                                        testing_1.expect(parent.wizardUI.inputs[4].checkValidity()).to.be["true"];
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
        it('rejects edition for invalid inputs', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_1.regexString(foundation_js_1.inverseRegExp.decimal, 1), function (voltage) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        parent.wizardUI.inputs[4].value = voltage;
                                        return [4 /*yield*/, parent.updateComplete];
                                    case 1:
                                        _a.sent();
                                        testing_1.expect(parent.wizardUI.inputs[4].checkValidity()).to.be["false"];
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
});
var templateObject_1;
