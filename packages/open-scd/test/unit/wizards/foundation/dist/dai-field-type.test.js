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
require("../../../../src/addons/Wizards.js");
var dai_field_type_js_1 = require("../../../../src/wizards/foundation/dai-field-type.js");
describe('dai-field-type', function () { return __awaiter(void 0, void 0, void 0, function () {
    var validSCL;
    return __generator(this, function (_a) {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/valid2007B4ForDAIValidation.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        validSCL = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        describe('getCustomField', function () {
            var customField;
            var element;
            var inputs;
            function getDAElement(doType, doName) {
                return validSCL.querySelector("DOType[id=\"" + doType + "\"] > DA[name=\"" + doName + "\"]");
            }
            function getDAIElement(daiName) {
                return validSCL.querySelector("DAI[name=\"" + daiName + "\"]");
            }
            function wizard(customField, daElement, daiElement) {
                return [
                    {
                        title: 'Custom Field Wizard',
                        content: [testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["", ""], ["", ""])), customField.render(daElement, daiElement))]
                    },
                ];
            }
            describe('BOOLEAN field', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var daElement, daiElement;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    daElement = getDAElement('Dummy.LLN0.Beh', 'booleantest');
                                    daiElement = getDAIElement('booleantest');
                                    customField = dai_field_type_js_1.getCustomField()['BOOLEAN'];
                                    return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<oscd-wizards .host=", "></oscd-wizards>"], ["<oscd-wizards .host=", "></oscd-wizards>"])), document))];
                                case 1:
                                    element = _a.sent();
                                    element.workflow.push(function () { return wizard(customField, daElement, daiElement); });
                                    return [4 /*yield*/, element.requestUpdate()];
                                case 2:
                                    _a.sent();
                                    inputs = Array.from(element.wizardUI.inputs);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it('input fields contain the correct values', function () {
                        testing_1.expect(inputs[0].value).to.be.equal('true');
                    });
                    it('value returns the expected value', function () {
                        testing_1.expect(customField.value(inputs)).to.eql('true');
                    });
                    it('render function returns the correct snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).dom.to.equalSnapshot()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
                });
            }); });
            describe('ENUM field', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var daElement, daiElement;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    daElement = getDAElement('Dummy.LLN0.Beh', 'enumtest');
                                    daiElement = getDAIElement('enumtest');
                                    customField = dai_field_type_js_1.getCustomField()['Enum'];
                                    return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_3 || (templateObject_3 = __makeTemplateObject(["<oscd-wizards .host=", "></oscd-wizards>"], ["<oscd-wizards .host=", "></oscd-wizards>"])), document))];
                                case 1:
                                    element = _a.sent();
                                    element.workflow.push(function () { return wizard(customField, daElement, daiElement); });
                                    return [4 /*yield*/, element.requestUpdate()];
                                case 2:
                                    _a.sent();
                                    inputs = Array.from(element.wizardUI.inputs);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it('input fields contain the correct values', function () {
                        testing_1.expect(inputs[0].value).to.be.equal('blocked');
                    });
                    it('value returns the expected value', function () {
                        testing_1.expect(customField.value(inputs)).to.eql('blocked');
                    });
                    it('render function returns the correct snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).dom.to.equalSnapshot()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
                });
            }); });
            describe('FLOAT32 field', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var daElement, daiElement;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    daElement = getDAElement('Dummy.LLN0.Beh', 'float32test');
                                    daiElement = getDAIElement('float32test');
                                    customField = dai_field_type_js_1.getCustomField()['FLOAT32'];
                                    return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_4 || (templateObject_4 = __makeTemplateObject(["<oscd-wizards .host=", "></oscd-wizards>"], ["<oscd-wizards .host=", "></oscd-wizards>"])), document))];
                                case 1:
                                    element = _a.sent();
                                    element.workflow.push(function () { return wizard(customField, daElement, daiElement); });
                                    return [4 /*yield*/, element.requestUpdate()];
                                case 2:
                                    _a.sent();
                                    inputs = Array.from(element.wizardUI.inputs);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it('input fields contain the correct values', function () {
                        testing_1.expect(inputs[0].value).to.be.equal('659.3');
                    });
                    it('value returns the expected value', function () {
                        testing_1.expect(customField.value(inputs)).to.eql('659.3');
                    });
                    it('render function returns the correct snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).dom.to.equalSnapshot()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
                });
            }); });
            describe('FLOAT64 field', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var daElement, daiElement;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    daElement = getDAElement('Dummy.LLN0.Beh', 'float64test');
                                    daiElement = getDAIElement('float64test');
                                    customField = dai_field_type_js_1.getCustomField()['FLOAT64'];
                                    return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_5 || (templateObject_5 = __makeTemplateObject(["<oscd-wizards .host=", "></oscd-wizards>"], ["<oscd-wizards .host=", "></oscd-wizards>"])), document))];
                                case 1:
                                    element = _a.sent();
                                    element.workflow.push(function () { return wizard(customField, daElement, daiElement); });
                                    return [4 /*yield*/, element.requestUpdate()];
                                case 2:
                                    _a.sent();
                                    inputs = Array.from(element.wizardUI.inputs);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it('input fields contain the correct values', function () {
                        testing_1.expect(inputs[0].value).to.be.equal('1111659.8');
                    });
                    it('value returns the expected value', function () {
                        testing_1.expect(customField.value(inputs)).to.eql('1111659.8');
                    });
                    it('render function returns the correct snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).dom.to.equalSnapshot()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
                });
            }); });
            describe('INT8 field', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var daElement, daiElement;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    daElement = getDAElement('Dummy.LLN0.Beh', 'int8test');
                                    daiElement = getDAIElement('int8test');
                                    customField = dai_field_type_js_1.getCustomField()['INT8'];
                                    return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_6 || (templateObject_6 = __makeTemplateObject(["<oscd-wizards .host=", "></oscd-wizards>"], ["<oscd-wizards .host=", "></oscd-wizards>"])), document))];
                                case 1:
                                    element = _a.sent();
                                    element.workflow.push(function () { return wizard(customField, daElement, daiElement); });
                                    return [4 /*yield*/, element.requestUpdate()];
                                case 2:
                                    _a.sent();
                                    inputs = Array.from(element.wizardUI.inputs);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it('input fields contain the correct values', function () {
                        testing_1.expect(inputs[0].value).to.be.equal('5');
                    });
                    it('value returns the expected value', function () {
                        testing_1.expect(customField.value(inputs)).to.eql('5');
                    });
                    it('render function returns the correct snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).dom.to.equalSnapshot()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
                });
            }); });
            describe('INT16 field', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var daElement, daiElement;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    daElement = getDAElement('Dummy.LLN0.Beh', 'int16test');
                                    daiElement = getDAIElement('int16test');
                                    customField = dai_field_type_js_1.getCustomField()['INT16'];
                                    return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_7 || (templateObject_7 = __makeTemplateObject(["<oscd-wizards .host=", "></oscd-wizards>"], ["<oscd-wizards .host=", "></oscd-wizards>"])), document))];
                                case 1:
                                    element = _a.sent();
                                    element.workflow.push(function () { return wizard(customField, daElement, daiElement); });
                                    return [4 /*yield*/, element.requestUpdate()];
                                case 2:
                                    _a.sent();
                                    inputs = Array.from(element.wizardUI.inputs);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it('input fields contain the correct values', function () {
                        testing_1.expect(inputs[0].value).to.be.equal('500');
                    });
                    it('value returns the expected value', function () {
                        testing_1.expect(customField.value(inputs)).to.eql('500');
                    });
                    it('render function returns the correct snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).dom.to.equalSnapshot()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
                });
            }); });
            describe('INT24 field', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var daElement, daiElement;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    daElement = getDAElement('Dummy.LLN0.Beh', 'int24test');
                                    daiElement = getDAIElement('int24test');
                                    customField = dai_field_type_js_1.getCustomField()['INT24'];
                                    return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_8 || (templateObject_8 = __makeTemplateObject(["<oscd-wizards .host=", "></oscd-wizards>"], ["<oscd-wizards .host=", "></oscd-wizards>"])), document))];
                                case 1:
                                    element = _a.sent();
                                    element.workflow.push(function () { return wizard(customField, daElement, daiElement); });
                                    return [4 /*yield*/, element.requestUpdate()];
                                case 2:
                                    _a.sent();
                                    inputs = Array.from(element.wizardUI.inputs);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it('input fields contain the correct values', function () {
                        testing_1.expect(inputs[0].value).to.be.equal('8321');
                    });
                    it('value returns the expected value', function () {
                        testing_1.expect(customField.value(inputs)).to.eql('8321');
                    });
                    it('render function returns the correct snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).dom.to.equalSnapshot()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
                });
            }); });
            describe('INT32 field', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var daElement, daiElement;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    daElement = getDAElement('Dummy.LLN0.Beh', 'int32test');
                                    daiElement = getDAIElement('int32test');
                                    customField = dai_field_type_js_1.getCustomField()['INT32'];
                                    return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_9 || (templateObject_9 = __makeTemplateObject(["<oscd-wizards .host=", "></oscd-wizards>"], ["<oscd-wizards .host=", "></oscd-wizards>"])), document))];
                                case 1:
                                    element = _a.sent();
                                    element.workflow.push(function () { return wizard(customField, daElement, daiElement); });
                                    return [4 /*yield*/, element.requestUpdate()];
                                case 2:
                                    _a.sent();
                                    inputs = Array.from(element.wizardUI.inputs);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it('input fields contain the correct values', function () {
                        testing_1.expect(inputs[0].value).to.be.equal('83218');
                    });
                    it('value returns the expected value', function () {
                        testing_1.expect(customField.value(inputs)).to.eql('83218');
                    });
                    it('render function returns the correct snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).dom.to.equalSnapshot()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
                });
            }); });
            describe('INT64 field', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var daElement, daiElement;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    daElement = getDAElement('Dummy.LLN0.Beh', 'int64test');
                                    daiElement = getDAIElement('int64test');
                                    customField = dai_field_type_js_1.getCustomField()['INT64'];
                                    return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_10 || (templateObject_10 = __makeTemplateObject(["<oscd-wizards .host=", "></oscd-wizards>"], ["<oscd-wizards .host=", "></oscd-wizards>"])), document))];
                                case 1:
                                    element = _a.sent();
                                    element.workflow.push(function () { return wizard(customField, daElement, daiElement); });
                                    return [4 /*yield*/, element.requestUpdate()];
                                case 2:
                                    _a.sent();
                                    inputs = Array.from(element.wizardUI.inputs);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it('input fields contain the correct values', function () {
                        testing_1.expect(inputs[0].value).to.be.equal('-543923');
                    });
                    it('value returns the expected value', function () {
                        testing_1.expect(customField.value(inputs)).to.eql('-543923');
                    });
                    it('render function returns the correct snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).dom.to.equalSnapshot()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
                });
            }); });
            describe('INT128 field', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var daElement, daiElement;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    daElement = getDAElement('Dummy.LLN0.Beh', 'int128test');
                                    daiElement = getDAIElement('int128test');
                                    customField = dai_field_type_js_1.getCustomField()['INT128'];
                                    return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_11 || (templateObject_11 = __makeTemplateObject(["<oscd-wizards .host=", "></oscd-wizards>"], ["<oscd-wizards .host=", "></oscd-wizards>"])), document))];
                                case 1:
                                    element = _a.sent();
                                    element.workflow.push(function () { return wizard(customField, daElement, daiElement); });
                                    return [4 /*yield*/, element.requestUpdate()];
                                case 2:
                                    _a.sent();
                                    inputs = Array.from(element.wizardUI.inputs);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it('input fields contain the correct values', function () {
                        testing_1.expect(inputs[0].value).to.be.equal('-8');
                    });
                    it('value returns the expected value', function () {
                        testing_1.expect(customField.value(inputs)).to.eql('-8');
                    });
                    it('render function returns the correct snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).dom.to.equalSnapshot()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
                });
            }); });
            describe('INT8U field', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var daElement, daiElement;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    daElement = getDAElement('Dummy.LLN0.Beh', 'int8utest');
                                    daiElement = getDAIElement('int8utest');
                                    customField = dai_field_type_js_1.getCustomField()['INT8U'];
                                    return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_12 || (templateObject_12 = __makeTemplateObject(["<oscd-wizards .host=", "></oscd-wizards>"], ["<oscd-wizards .host=", "></oscd-wizards>"])), document))];
                                case 1:
                                    element = _a.sent();
                                    element.workflow.push(function () { return wizard(customField, daElement, daiElement); });
                                    return [4 /*yield*/, element.requestUpdate()];
                                case 2:
                                    _a.sent();
                                    inputs = Array.from(element.wizardUI.inputs);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it('input fields contain the correct values', function () {
                        testing_1.expect(inputs[0].value).to.be.equal('99');
                    });
                    it('value returns the expected value', function () {
                        testing_1.expect(customField.value(inputs)).to.eql('99');
                    });
                    it('render function returns the correct snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).dom.to.equalSnapshot()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
                });
            }); });
            describe('INT16U field', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var daElement, daiElement;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    daElement = getDAElement('Dummy.LLN0.Beh', 'int16utest');
                                    daiElement = getDAIElement('int16utest');
                                    customField = dai_field_type_js_1.getCustomField()['INT16U'];
                                    return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_13 || (templateObject_13 = __makeTemplateObject(["<oscd-wizards .host=", "></oscd-wizards>"], ["<oscd-wizards .host=", "></oscd-wizards>"])), document))];
                                case 1:
                                    element = _a.sent();
                                    element.workflow.push(function () { return wizard(customField, daElement, daiElement); });
                                    return [4 /*yield*/, element.requestUpdate()];
                                case 2:
                                    _a.sent();
                                    inputs = Array.from(element.wizardUI.inputs);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it('input fields contain the correct values', function () {
                        testing_1.expect(inputs[0].value).to.be.equal('20000');
                    });
                    it('value returns the expected value', function () {
                        testing_1.expect(customField.value(inputs)).to.eql('20000');
                    });
                    it('render function returns the correct snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).dom.to.equalSnapshot()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
                });
            }); });
            describe('INT24U field', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var daElement, daiElement;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    daElement = getDAElement('Dummy.LLN0.Beh', 'int24utest');
                                    daiElement = getDAIElement('int24utest');
                                    customField = dai_field_type_js_1.getCustomField()['INT24U'];
                                    return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_14 || (templateObject_14 = __makeTemplateObject(["<oscd-wizards .host=", "></oscd-wizards>"], ["<oscd-wizards .host=", "></oscd-wizards>"])), document))];
                                case 1:
                                    element = _a.sent();
                                    element.workflow.push(function () { return wizard(customField, daElement, daiElement); });
                                    return [4 /*yield*/, element.requestUpdate()];
                                case 2:
                                    _a.sent();
                                    inputs = Array.from(element.wizardUI.inputs);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it('input fields contain the correct values', function () {
                        testing_1.expect(inputs[0].value).to.be.equal('654321');
                    });
                    it('value returns the expected value', function () {
                        testing_1.expect(customField.value(inputs)).to.eql('654321');
                    });
                    it('render function returns the correct snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).dom.to.equalSnapshot()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
                });
            }); });
            describe('INT32U field', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var daElement, daiElement;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    daElement = getDAElement('Dummy.LLN0.Beh', 'int32utest');
                                    daiElement = getDAIElement('int32utest');
                                    customField = dai_field_type_js_1.getCustomField()['INT32U'];
                                    return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_15 || (templateObject_15 = __makeTemplateObject(["<oscd-wizards .host=", "></oscd-wizards>"], ["<oscd-wizards .host=", "></oscd-wizards>"])), document))];
                                case 1:
                                    element = _a.sent();
                                    element.workflow.push(function () { return wizard(customField, daElement, daiElement); });
                                    return [4 /*yield*/, element.requestUpdate()];
                                case 2:
                                    _a.sent();
                                    inputs = Array.from(element.wizardUI.inputs);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it('input fields contain the correct values', function () {
                        testing_1.expect(inputs[0].value).to.be.equal('2');
                    });
                    it('value returns the expected value', function () {
                        testing_1.expect(customField.value(inputs)).to.eql('2');
                    });
                    it('render function returns the correct snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).dom.to.equalSnapshot()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
                });
            }); });
            describe('Timestamp field', function () { return __awaiter(void 0, void 0, void 0, function () {
                function prepareTimestamp(daElement, daiElement) {
                    return __awaiter(this, void 0, Promise, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    customField = dai_field_type_js_1.getCustomField()['Timestamp'];
                                    return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_16 || (templateObject_16 = __makeTemplateObject([" <oscd-wizards .host=", "></oscd-wizards>"], [" <oscd-wizards .host=", "></oscd-wizards>"])), document))];
                                case 1:
                                    element = _a.sent();
                                    element.workflow.push(function () { return wizard(customField, daElement, daiElement); });
                                    return [4 /*yield*/, element.requestUpdate()];
                                case 2:
                                    _a.sent();
                                    inputs = Array.from(element.wizardUI.inputs);
                                    return [2 /*return*/];
                            }
                        });
                    });
                }
                return __generator(this, function (_a) {
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var daElement, daiElement;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    daElement = getDAElement('Dummy.LLN0.Beh', 'timestamptest');
                                    daiElement = getDAIElement('timestamptest');
                                    return [4 /*yield*/, prepareTimestamp(daElement, daiElement)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it('input fields contain the correct values', function () {
                        testing_1.expect(inputs[0].value).to.be.equal('2022-03-24');
                        testing_1.expect(inputs[1].value).to.be.equal('12:34:56');
                    });
                    it('value returns the expected value', function () {
                        testing_1.expect(customField.value(inputs)).to.eql('2022-03-24T12:34:56.000');
                    });
                    it('render function returns the correct snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).dom.to.equalSnapshot()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    describe('with "null" value', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                                var daElement, daiElement;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            daElement = getDAElement('Dummy.LLN0.Beh', 'nulltimestamptest');
                                            daiElement = getDAIElement('nulltimestamptest');
                                            return [4 /*yield*/, prepareTimestamp(daElement, daiElement)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            it('input fields contain the correct values', function () {
                                testing_1.expect(inputs[0].value).to.be.empty;
                                testing_1.expect(inputs[1].value).to.be.empty;
                            });
                            it('value returns the expected value', function () {
                                testing_1.expect(customField.value(inputs)).to.eql('0000-00-00T00:00:00.000');
                            });
                            return [2 /*return*/];
                        });
                    }); });
                    return [2 /*return*/];
                });
            }); });
            describe('VisString32 field', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var daElement, daiElement;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    daElement = getDAElement('Dummy.LLN0.Beh', 'visstring32test');
                                    daiElement = getDAIElement('visstring32test');
                                    customField = dai_field_type_js_1.getCustomField()['VisString32'];
                                    return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_17 || (templateObject_17 = __makeTemplateObject(["<oscd-wizards .host=", "></oscd-wizards>"], ["<oscd-wizards .host=", "></oscd-wizards>"])), document))];
                                case 1:
                                    element = _a.sent();
                                    element.workflow.push(function () { return wizard(customField, daElement, daiElement); });
                                    return [4 /*yield*/, element.requestUpdate()];
                                case 2:
                                    _a.sent();
                                    inputs = Array.from(element.wizardUI.inputs);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it('input fields contain the correct values', function () {
                        testing_1.expect(inputs[0].value).to.be.equal('pull-ups');
                    });
                    it('value returns the expected value', function () {
                        testing_1.expect(customField.value(inputs)).to.eql('pull-ups');
                    });
                    it('render function returns the correct snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).dom.to.equalSnapshot()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
                });
            }); });
            describe('VisString64 field', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var daElement, daiElement;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    daElement = getDAElement('Dummy.LLN0.Beh', 'visstring64test');
                                    daiElement = getDAIElement('visstring64test');
                                    customField = dai_field_type_js_1.getCustomField()['VisString64'];
                                    return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_18 || (templateObject_18 = __makeTemplateObject(["<oscd-wizards .host=", "></oscd-wizards>"], ["<oscd-wizards .host=", "></oscd-wizards>"])), document))];
                                case 1:
                                    element = _a.sent();
                                    element.workflow.push(function () { return wizard(customField, daElement, daiElement); });
                                    return [4 /*yield*/, element.requestUpdate()];
                                case 2:
                                    _a.sent();
                                    inputs = Array.from(element.wizardUI.inputs);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it('input fields contain the correct values', function () {
                        testing_1.expect(inputs[0].value).to.be.equal('lat pulldown');
                    });
                    it('value returns the expected value', function () {
                        testing_1.expect(customField.value(inputs)).to.eql('lat pulldown');
                    });
                    it('render function returns the correct snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).dom.to.equalSnapshot()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
                });
            }); });
            describe('VisString65 field', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var daElement, daiElement;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    daElement = getDAElement('Dummy.LLN0.Beh', 'visstring65test');
                                    daiElement = getDAIElement('visstring65test');
                                    customField = dai_field_type_js_1.getCustomField()['VisString65'];
                                    return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_19 || (templateObject_19 = __makeTemplateObject(["<oscd-wizards .host=", "></oscd-wizards>"], ["<oscd-wizards .host=", "></oscd-wizards>"])), document))];
                                case 1:
                                    element = _a.sent();
                                    element.workflow.push(function () { return wizard(customField, daElement, daiElement); });
                                    return [4 /*yield*/, element.requestUpdate()];
                                case 2:
                                    _a.sent();
                                    inputs = Array.from(element.wizardUI.inputs);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it('input fields contain the correct values', function () {
                        testing_1.expect(inputs[0].value).to.be.equal('bench press');
                    });
                    it('value returns the expected value', function () {
                        testing_1.expect(customField.value(inputs)).to.eql('bench press');
                    });
                    it('render function returns the correct snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).dom.to.equalSnapshot()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
                });
            }); });
            describe('VisString129 field', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var daElement, daiElement;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    daElement = getDAElement('Dummy.LLN0.Beh', 'visstring129test');
                                    daiElement = getDAIElement('visstring129test');
                                    customField = dai_field_type_js_1.getCustomField()['VisString129'];
                                    return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_20 || (templateObject_20 = __makeTemplateObject(["<oscd-wizards .host=", "></oscd-wizards>"], ["<oscd-wizards .host=", "></oscd-wizards>"])), document))];
                                case 1:
                                    element = _a.sent();
                                    element.workflow.push(function () { return wizard(customField, daElement, daiElement); });
                                    return [4 /*yield*/, element.requestUpdate()];
                                case 2:
                                    _a.sent();
                                    inputs = Array.from(element.wizardUI.inputs);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it('input fields contain the correct values', function () {
                        testing_1.expect(inputs[0].value).to.be.equal('front squat');
                    });
                    it('value returns the expected value', function () {
                        testing_1.expect(customField.value(inputs)).to.eql('front squat');
                    });
                    it('render function returns the correct snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).dom.to.equalSnapshot()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
                });
            }); });
            describe('VisString255 field', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var daElement, daiElement;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    daElement = getDAElement('Dummy.LLN0.Beh', 'visstring255test');
                                    daiElement = getDAIElement('visstring255test');
                                    customField = dai_field_type_js_1.getCustomField()['VisString255'];
                                    return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_21 || (templateObject_21 = __makeTemplateObject(["<oscd-wizards .host=", "></oscd-wizards>"], ["<oscd-wizards .host=", "></oscd-wizards>"])), document))];
                                case 1:
                                    element = _a.sent();
                                    element.workflow.push(function () { return wizard(customField, daElement, daiElement); });
                                    return [4 /*yield*/, element.requestUpdate()];
                                case 2:
                                    _a.sent();
                                    inputs = Array.from(element.wizardUI.inputs);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it('input fields contain the correct values', function () {
                        testing_1.expect(inputs[0].value).to.be.equal('deadlift');
                    });
                    it('value returns the expected value', function () {
                        testing_1.expect(customField.value(inputs)).to.eql('deadlift');
                    });
                    it('render function returns the correct snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).dom.to.equalSnapshot()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
                });
            }); });
        });
        describe('getDateValueFromTimestamp', function () {
            it('when normal timestamp passed then date value is returned', function () {
                var dateValue = dai_field_type_js_1.getDateValueFromTimestamp('2022-03-24T12:34:56.000');
                testing_1.expect(dateValue).to.be.equal('2022-03-24');
            });
            it('when only date part passed then date value is returned', function () {
                var dateValue = dai_field_type_js_1.getDateValueFromTimestamp('2022-03-24');
                testing_1.expect(dateValue).to.be.equal('2022-03-24');
            });
            it('when null timestamp passed then null is returned', function () {
                var dateValue = dai_field_type_js_1.getDateValueFromTimestamp('0000-00-00T00:00:00.000');
                testing_1.expect(dateValue).to.be["null"];
            });
            it('when invalid timestamp passed then null is returned', function () {
                var dateValue = dai_field_type_js_1.getDateValueFromTimestamp('INVA-LI-D2T12:34:56.000');
                testing_1.expect(dateValue).to.be["null"];
            });
            it('when empty string passed then null is returned', function () {
                var dateValue = dai_field_type_js_1.getDateValueFromTimestamp('');
                testing_1.expect(dateValue).to.be["null"];
            });
        });
        describe('getTimeValueFromTimestamp', function () {
            it('when normal timestamp passed then time value is returned', function () {
                var dateValue = dai_field_type_js_1.getTimeValueFromTimestamp('2022-03-24T12:34:56.000');
                testing_1.expect(dateValue).to.be.equal('12:34:56');
            });
            it('when timestamp without milliseconds passed then time value is returned', function () {
                var dateValue = dai_field_type_js_1.getTimeValueFromTimestamp('2022-03-24T12:34:56');
                testing_1.expect(dateValue).to.be.equal('12:34:56');
            });
            it('when null timestamp passed then null is returned', function () {
                var dateValue = dai_field_type_js_1.getTimeValueFromTimestamp('0000-00-00T00:00:00.000');
                testing_1.expect(dateValue).to.be["null"];
            });
            it('when only date part passed then null is returned', function () {
                var dateValue = dai_field_type_js_1.getTimeValueFromTimestamp('2022-03-24');
                testing_1.expect(dateValue).to.be["null"];
            });
            it('when invalid timestamp passed then null is returned', function () {
                var dateValue = dai_field_type_js_1.getTimeValueFromTimestamp('2022-03-24TIN:VA:LI.D00');
                testing_1.expect(dateValue).to.be["null"];
            });
            it('when empty string passed then null is returned', function () {
                var dateValue = dai_field_type_js_1.getTimeValueFromTimestamp('');
                testing_1.expect(dateValue).to.be["null"];
            });
        });
        return [2 /*return*/];
    });
}); });
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21;
