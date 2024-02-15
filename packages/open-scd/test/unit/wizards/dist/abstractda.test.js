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
var foundation_js_1 = require("../../../src/foundation.js");
var abstractda_js_1 = require("../../../src/wizards/abstractda.js");
var foundation_js_2 = require("../../foundation.js");
describe('abstractda wizards', function () {
    describe('getValAction', function () {
        var abstractda = new DOMParser().parseFromString("<DA name=\"ctlModel\" bType=\"Enum\" type=\"\"></DA>", 'application/xml').documentElement;
        var oldVal = new DOMParser().parseFromString("<Val>oldVal</Val>", 'application/xml').documentElement;
        it('updates a Val child element when changed', function () {
            var editorAction = abstractda_js_1.getValAction(oldVal, 'newVal', abstractda);
            testing_1.expect(editorAction).to.satisfy(foundation_js_1.isReplace);
        });
        it('properly updates an new Val', function () {
            var _a;
            var editorAction = abstractda_js_1.getValAction(oldVal, 'newVal', abstractda);
            testing_1.expect((_a = editorAction["new"].element.textContent) === null || _a === void 0 ? void 0 : _a.trim()).to.equal('newVal');
        });
        it('creates a Val child element when missing', function () {
            var editorAction = abstractda_js_1.getValAction(null, 'newVal', abstractda);
            testing_1.expect(editorAction).to.satisfy(foundation_js_1.isCreate);
        });
        it('properly creates new Val', function () {
            var _a;
            var editorAction = abstractda_js_1.getValAction(null, 'newVal', abstractda);
            testing_1.expect((_a = editorAction["new"].element.textContent) === null || _a === void 0 ? void 0 : _a.trim()).to.equal('newVal');
        });
        it('remove a Val child element if present', function () {
            var editorAction = abstractda_js_1.getValAction(oldVal, null, abstractda);
            testing_1.expect(editorAction).to.satisfy(foundation_js_1.isDelete);
        });
    });
    describe('renderWizard', function () {
        var doc;
        var data;
        var element;
        var enumTypes;
        var daTypes;
        var nameTextField;
        var valSelect;
        var valTextField;
        var bTypeSelect;
        var typeSelect;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var types, wizard;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<oscd-wizards .host=", "></oscd-wizards>"], ["<oscd-wizards .host=", "></oscd-wizards>"])), document))];
                    case 1:
                        element = _a.sent();
                        return [4 /*yield*/, fetch('/test/testfiles/wizards/abstractda.scd')
                                .then(function (response) { return response.text(); })
                                .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 2:
                        doc = _a.sent();
                        data = doc.querySelector('DataTypeTemplates');
                        types = Array.from(data.querySelectorAll('DAType,EnumType'));
                        enumTypes = Array.from(data.querySelectorAll('EnumType')).map(function (enumtype) { return enumtype.getAttribute('id'); });
                        daTypes = Array.from(data.querySelectorAll('DAType')).map(function (enumtype) { return enumtype.getAttribute('id'); });
                        wizard = [
                            {
                                title: 'title',
                                content: abstractda_js_1.wizardContent('', null, 'Enum', types, 'Dummy_ctlModel', null, null, null, 'status-only', data)
                            },
                        ];
                        element.workflow.push(function () { return wizard; });
                        return [4 /*yield*/, element.requestUpdate()];
                    case 3:
                        _a.sent();
                        nameTextField = element.wizardUI.dialog.querySelector('wizard-textfield[label="name"]');
                        bTypeSelect = element.wizardUI.dialog.querySelector('wizard-select[label="bType"]');
                        valSelect = element.wizardUI.dialog.querySelector('wizard-select[label="Val"]');
                        valTextField = element.wizardUI.dialog.querySelector('wizard-textfield[label="Val"]');
                        typeSelect = element.wizardUI.dialog.querySelector('wizard-select[label="type"]');
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
        }); });
        it('edits name attribute only for valid inputs', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_2.regexString(foundation_js_2.regExp.abstractDataAttributeName, 1, 32), function (name) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        nameTextField.value = name;
                                        return [4 /*yield*/, nameTextField.requestUpdate()];
                                    case 1:
                                        _a.sent();
                                        testing_1.expect(nameTextField.checkValidity()).to.be["true"];
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
        it('rejects name attribute starting with decimals', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fast_check_1["default"].assert(fast_check_1["default"].asyncProperty(foundation_js_2.regexString(foundation_js_2.regExp.decimal, 1, 1), function (name) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        nameTextField.value = name;
                                        return [4 /*yield*/, nameTextField.requestUpdate()];
                                    case 1:
                                        _a.sent();
                                        testing_1.expect(nameTextField.checkValidity()).to.be["false"];
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
        it('disables the type field in case bType is not Enum nor Struct', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bTypeSelect.value = 'BOOLEAN';
                        return [4 /*yield*/, typeSelect.requestUpdate()];
                    case 1:
                        _a.sent();
                        testing_1.expect(typeSelect.disabled).to.be["true"];
                        return [2 /*return*/];
                }
            });
        }); });
        it('pre-selects the type in the type field in case bType is Enum or Struct', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeSelect.requestUpdate()];
                    case 1:
                        _a.sent();
                        testing_1.expect(typeSelect.value).to.be.equal('Dummy_ctlModel');
                        return [2 /*return*/];
                }
            });
        }); });
        it('pre-selects the type in the type field bType has re-selected to the initial bType', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bTypeSelect.value = 'BOOLEAN';
                        return [4 /*yield*/, typeSelect.requestUpdate()];
                    case 1:
                        _a.sent();
                        testing_1.expect(typeSelect.value).to.not.be.equal('Dummy_ctlModel');
                        bTypeSelect.value = 'Enum';
                        return [4 /*yield*/, typeSelect.requestUpdate()];
                    case 2:
                        _a.sent();
                        testing_1.expect(typeSelect.value).to.be.equal('Dummy_ctlModel');
                        return [2 /*return*/];
                }
            });
        }); });
        it('filters EnumType in the type field if bType is Enum ', function () { return __awaiter(void 0, void 0, void 0, function () {
            var typeList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bTypeSelect.value = 'Enum';
                        return [4 /*yield*/, typeSelect.requestUpdate()];
                    case 1:
                        _a.sent();
                        typeList = typeSelect.items
                            .filter(function (item) { return !item.noninteractive; })
                            .map(function (item) { return item.value; });
                        testing_1.expect(typeList.length).to.equal(enumTypes.length);
                        return [2 /*return*/];
                }
            });
        }); });
        it('filters DAType in the type field if bType is Struct ', function () { return __awaiter(void 0, void 0, void 0, function () {
            var typeList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bTypeSelect.value = 'Struct';
                        return [4 /*yield*/, typeSelect.requestUpdate()];
                    case 1:
                        _a.sent();
                        typeList = typeSelect.items
                            .filter(function (item) { return !item.noninteractive; })
                            .map(function (item) { return item.value; });
                        testing_1.expect(typeList.length).to.equal(daTypes.length);
                        return [2 /*return*/];
                }
            });
        }); });
        it('selects first DAType item when bType changes from enum to Struct', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bTypeSelect.value = 'Enum';
                        return [4 /*yield*/, typeSelect.requestUpdate()];
                    case 1:
                        _a.sent();
                        bTypeSelect.value = 'Struct';
                        return [4 /*yield*/, typeSelect.requestUpdate()];
                    case 2:
                        _a.sent();
                        testing_1.expect(typeSelect.value).to.equal(daTypes[0]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('renders the Val field as wizard-select when bType is Enum', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bTypeSelect.value = 'Enum';
                        return [4 /*yield*/, valSelect.requestUpdate()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, valTextField.requestUpdate()];
                    case 2:
                        _a.sent();
                        testing_1.expect(valSelect.style.display).to.equal('');
                        testing_1.expect(valTextField.style.display).to.equal('none');
                        return [2 /*return*/];
                }
            });
        }); });
        it('does not render the Val field when bType is Struct', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bTypeSelect.value = 'Struct';
                        return [4 /*yield*/, valSelect.requestUpdate()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, valTextField.requestUpdate()];
                    case 2:
                        _a.sent();
                        testing_1.expect(valSelect.style.display).to.equal('none');
                        testing_1.expect(valTextField.style.display).to.equal('none');
                        return [2 /*return*/];
                }
            });
        }); });
        it('renders the Val field as wizard-textfield in all other cases', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bTypeSelect.value = 'Struct';
                        return [4 /*yield*/, valSelect.requestUpdate()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, valTextField.requestUpdate()];
                    case 2:
                        _a.sent();
                        testing_1.expect(valSelect.style.display).to.equal('none');
                        testing_1.expect(valTextField.style.display).to.equal('none');
                        return [2 /*return*/];
                }
            });
        }); });
        it('shows Val form the file in the Val fields', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, valSelect.requestUpdate()];
                    case 1:
                        _a.sent();
                        testing_1.expect(valSelect.value).to.equal('status-only');
                        return [2 /*return*/];
                }
            });
        }); });
        it('filters Val selection for the initially loaded Enum', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, valSelect.requestUpdate()];
                    case 1:
                        _a.sent();
                        testing_1.expect(valSelect.items.length).to.equal(data.querySelectorAll("EnumType[id=\"" + typeSelect.value + "\"] > EnumVal")
                            .length);
                        return [2 /*return*/];
                }
            });
        }); });
        it('filters Val selection for bType Enum and ctlModelKind', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bTypeSelect.value = 'Enum';
                        return [4 /*yield*/, valSelect.requestUpdate()];
                    case 1:
                        _a.sent();
                        testing_1.expect(valSelect.items.length).to.equal(data.querySelectorAll("EnumType[id=\"" + typeSelect.value + "\"] > EnumVal")
                            .length);
                        return [2 /*return*/];
                }
            });
        }); });
        it('filters Val selection for bType Enum and HealthKind', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bTypeSelect.value = 'Enum';
                        typeSelect.value = 'Dummy_Health';
                        return [4 /*yield*/, valSelect.requestUpdate()];
                    case 1:
                        _a.sent();
                        testing_1.expect(valSelect.items.length).to.equal(data.querySelectorAll("EnumType[id=\"" + typeSelect.value + "\"] > EnumVal")
                            .length);
                        return [2 /*return*/];
                }
            });
        }); });
        it('does not filters Val selection it bType is not Enum', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bTypeSelect.value = 'Struct';
                        typeSelect.value = 'Dummy_origin';
                        return [4 /*yield*/, valSelect.requestUpdate()];
                    case 1:
                        _a.sent();
                        testing_1.expect(valSelect.items.length).to.equal(0);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
var templateObject_1;
