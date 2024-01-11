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
require("../../../mock-wizard-editor.js");
require("../../../../src/editors/substation/voltage-level-editor.js");
var openAndCancelMenu = function (parent, element) { return __awaiter(void 0, void 0, Promise, function () {
    var powerTransformerMenuItem, secondaryAction;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                testing_1.expect(parent.wizardUI.dialog).to.be.undefined;
                (_a = element === null || element === void 0 ? void 0 : element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector("mwc-icon-button[icon='playlist_add']").click();
                powerTransformerMenuItem = element.shadowRoot.querySelector("mwc-list-item[value='PowerTransformer']");
                powerTransformerMenuItem.click();
                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
            case 1:
                _c.sent(); // await animation
                testing_1.expect(parent.wizardUI.dialog).to.exist;
                secondaryAction = ((_b = parent.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('mwc-button[slot="secondaryAction"]'));
                secondaryAction.click();
                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
            case 2:
                _c.sent(); // await animation
                testing_1.expect(parent.wizardUI.dialog).to.be.undefined;
                return [2 /*return*/];
        }
    });
}); };
describe('voltage-level-editor wizarding editing integration', function () {
    describe('edit wizard', function () {
        var doc;
        var parent;
        var element;
        var nameField;
        var descField;
        var nomFreqField;
        var numPhasesField;
        var voltageField;
        var secondaryAction;
        var primaryAction;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/valid2007B4.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        doc = _j.sent();
                        return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<mock-wizard-editor\n            ><voltage-level-editor\n              .element=", "\n            ></voltage-level-editor\n          ></mock-wizard-editor>"], ["<mock-wizard-editor\n            ><voltage-level-editor\n              .element=", "\n            ></voltage-level-editor\n          ></mock-wizard-editor>"])), doc.querySelector('VoltageLevel')))];
                    case 2:
                        parent = (_j.sent());
                        element = parent.querySelector('voltage-level-editor');
                        return [4 /*yield*/, ((_a = element === null || element === void 0 ? void 0 : element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-icon-button[icon="edit"]')).click()];
                    case 3:
                        _j.sent();
                        return [4 /*yield*/, parent.updateComplete];
                    case 4:
                        _j.sent();
                        nameField = ((_b = parent.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('wizard-textfield[label="name"]'));
                        descField = ((_c = parent.wizardUI.dialog) === null || _c === void 0 ? void 0 : _c.querySelector('wizard-textfield[label="desc"]'));
                        nomFreqField = ((_d = parent.wizardUI.dialog) === null || _d === void 0 ? void 0 : _d.querySelector('wizard-textfield[label="nomFreq"]'));
                        numPhasesField = ((_e = parent.wizardUI.dialog) === null || _e === void 0 ? void 0 : _e.querySelector('wizard-textfield[label="numPhases"]'));
                        voltageField = ((_f = parent.wizardUI.dialog) === null || _f === void 0 ? void 0 : _f.querySelector('wizard-textfield[label="Voltage"]'));
                        secondaryAction = ((_g = parent.wizardUI.dialog) === null || _g === void 0 ? void 0 : _g.querySelector('mwc-button[slot="secondaryAction"]'));
                        primaryAction = ((_h = parent.wizardUI.dialog) === null || _h === void 0 ? void 0 : _h.querySelector('mwc-button[slot="primaryAction"]'));
                        return [2 /*return*/];
                }
            });
        }); });
        it('closes on secondary action', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        secondaryAction.click();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 1:
                        _a.sent(); // await animation
                        testing_1.expect(parent.wizardUI.dialog).to.not.exist;
                        return [2 /*return*/];
                }
            });
        }); });
        it('does not change name attribute if not unique within parent element', function () { return __awaiter(void 0, void 0, void 0, function () {
            var oldName;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        oldName = nameField.value;
                        nameField.value = 'J1';
                        primaryAction.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _b.sent();
                        testing_1.expect((_a = doc.querySelector('VoltageLevel')) === null || _a === void 0 ? void 0 : _a.getAttribute('name')).to.equal(oldName);
                        return [2 /*return*/];
                }
            });
        }); });
        it('changes name attribute on primary action', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        nameField.value = 'newName';
                        primaryAction.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _b.sent();
                        testing_1.expect((_a = doc.querySelector('VoltageLevel')) === null || _a === void 0 ? void 0 : _a.getAttribute('name')).to.equal('newName');
                        return [2 /*return*/];
                }
            });
        }); });
        it('changes desc attribute on primary action', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        descField.value = 'newDesc';
                        primaryAction.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _b.sent();
                        testing_1.expect((_a = doc.querySelector('VoltageLevel')) === null || _a === void 0 ? void 0 : _a.getAttribute('desc')).to.equal('newDesc');
                        return [2 /*return*/];
                }
            });
        }); });
        it('deletes desc attribute if wizard-textfield is deactivated', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 1:
                        _b.sent(); // await animation
                        descField.nullSwitch.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 2:
                        _b.sent();
                        primaryAction.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 3:
                        _b.sent();
                        testing_1.expect((_a = doc.querySelector('VoltageLevel')) === null || _a === void 0 ? void 0 : _a.getAttribute('desc')).to.be["null"];
                        return [2 /*return*/];
                }
            });
        }); });
        it('changes nomFreq attribute on primary action', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        nomFreqField.value = '30';
                        primaryAction.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _b.sent();
                        testing_1.expect((_a = doc.querySelector('VoltageLevel')) === null || _a === void 0 ? void 0 : _a.getAttribute('nomFreq')).to.equal('30');
                        return [2 /*return*/];
                }
            });
        }); });
        it('deletes nomFreq attribute if wizard-textfield is deactivated', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 1:
                        _b.sent(); // await animation
                        nomFreqField.nullSwitch.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 2:
                        _b.sent();
                        primaryAction.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 3:
                        _b.sent();
                        testing_1.expect((_a = doc.querySelector('VoltageLevel')) === null || _a === void 0 ? void 0 : _a.getAttribute('nomFreq')).to.be["null"];
                        return [2 /*return*/];
                }
            });
        }); });
        it('changes numPhases attribute on primary action', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        numPhasesField.value = '3';
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _b.sent();
                        primaryAction.click();
                        testing_1.expect((_a = doc.querySelector('VoltageLevel')) === null || _a === void 0 ? void 0 : _a.getAttribute('numPhases')).to.equal('3');
                        return [2 /*return*/];
                }
            });
        }); });
        it('deletes numPhases attribute if wizard-textfield is deactivated', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 1:
                        _b.sent(); // await animation
                        numPhasesField.nullSwitch.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 2:
                        _b.sent();
                        primaryAction.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 3:
                        _b.sent();
                        testing_1.expect((_a = doc.querySelector('VoltageLevel')) === null || _a === void 0 ? void 0 : _a.getAttribute('numPhases')).to.be["null"];
                        return [2 /*return*/];
                }
            });
        }); });
        it('changes Voltage value on primary action', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        voltageField.value = '20.0';
                        primaryAction.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _b.sent();
                        testing_1.expect((_a = doc.querySelector('Voltage')) === null || _a === void 0 ? void 0 : _a.innerHTML).to.equal('20.0');
                        return [2 /*return*/];
                }
            });
        }); });
        it('changes Voltage multiplier on primary action', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        voltageField.multiplier = 'M';
                        primaryAction.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _c.sent();
                        testing_1.expect((_a = doc.querySelector('Voltage')) === null || _a === void 0 ? void 0 : _a.getAttribute('multiplier')).to.equal('M');
                        testing_1.expect((_b = doc.querySelector('Voltage')) === null || _b === void 0 ? void 0 : _b.getAttribute('unit')).to.equal('V');
                        return [2 /*return*/];
                }
            });
        }); });
        it('deletes voltage element if voltage wizard-textfield is deactivated', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 1:
                        _b.sent(); // await animation
                        voltageField.nullSwitch.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 2:
                        _b.sent();
                        primaryAction.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 3:
                        _b.sent();
                        testing_1.expect((_a = doc.querySelector('VoltageLevel')) === null || _a === void 0 ? void 0 : _a.querySelector('Voltage')).to.be["null"];
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Open add wizard', function () {
        var doc;
        var parent;
        var element;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/valid2007B4.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        doc = _a.sent();
                        return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<mock-wizard-editor\n            ><voltage-level-editor\n              .element=", "\n            ></voltage-level-editor\n          ></mock-wizard-editor>"], ["<mock-wizard-editor\n            ><voltage-level-editor\n              .element=", "\n            ></voltage-level-editor\n          ></mock-wizard-editor>"])), doc.querySelector('VoltageLevel[name="E1"]')))];
                    case 2:
                        parent = (_a.sent());
                        element = parent.querySelector('voltage-level-editor');
                        return [4 /*yield*/, parent.updateComplete];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('Should open the same wizard for the second time', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, openAndCancelMenu(parent, element)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, openAndCancelMenu(parent, element)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('open add bay wizard', function () {
        var doc;
        var parent;
        var element;
        var nameField;
        var primaryAction;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/valid2007B4.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        doc = _d.sent();
                        return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_3 || (templateObject_3 = __makeTemplateObject(["<mock-wizard-editor\n            ><voltage-level-editor\n              .element=", "\n            ></voltage-level-editor\n          ></mock-wizard-editor>"], ["<mock-wizard-editor\n            ><voltage-level-editor\n              .element=", "\n            ></voltage-level-editor\n          ></mock-wizard-editor>"])), doc.querySelector('VoltageLevel[name="E1"]')))];
                    case 2:
                        parent = (_d.sent());
                        element = parent.querySelector('voltage-level-editor');
                        ((_a = element === null || element === void 0 ? void 0 : element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-list-item[value="Bay"]')).click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 3:
                        _d.sent();
                        nameField = ((_b = parent.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('wizard-textfield[label="name"]'));
                        primaryAction = ((_c = parent.wizardUI.dialog) === null || _c === void 0 ? void 0 : _c.querySelector('mwc-button[slot="primaryAction"]'));
                        return [2 /*return*/];
                }
            });
        }); });
        it('does not add bay if name attribute is not unique', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nameField.value = 'COUPLING_BAY';
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 1:
                        _a.sent(); // update takes some time
                        primaryAction.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 2:
                        _a.sent();
                        testing_1.expect(doc.querySelectorAll('VoltageLevel[name="E1"] > Bay').length).to.equal(2);
                        return [2 /*return*/];
                }
            });
        }); });
        it('does add bay if name attribute is unique', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nameField.value = 'SecondBay';
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 1:
                        _a.sent(); // update takes some time
                        primaryAction.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 2:
                        _a.sent();
                        testing_1.expect(doc.querySelector('VoltageLevel[name="E1"] > Bay[name="SecondBay"]')).to.exist;
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('open lnode wizard', function () {
        var doc;
        var parent;
        var element;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/valid2007B4.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        doc = _b.sent();
                        return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_4 || (templateObject_4 = __makeTemplateObject(["<mock-wizard-editor\n            ><voltage-level-editor\n              .element=", "\n            ></voltage-level-editor\n          ></mock-wizard-editor>"], ["<mock-wizard-editor\n            ><voltage-level-editor\n              .element=", "\n            ></voltage-level-editor\n          ></mock-wizard-editor>"])), doc.querySelector('VoltageLevel[name="E1"]')))];
                    case 2:
                        parent = (_b.sent());
                        element = parent.querySelector('voltage-level-editor');
                        ((_a = element === null || element === void 0 ? void 0 : element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-icon-button[icon="account_tree"]')).click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('opens lnode wizard ', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                testing_1.expect(parent.wizardUI).to.exist;
                return [2 /*return*/];
            });
        }); });
        it('has two wizard pages', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                testing_1.expect(parent.wizardUI.dialogs.length).to.equal(2);
                return [2 /*return*/];
            });
        }); });
    });
    describe('move action', function () {
        var doc;
        var parent;
        var element;
        var element2;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/valid2007B4.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        doc = _b.sent();
                        return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_6 || (templateObject_6 = __makeTemplateObject(["<mock-wizard-editor\n            >", "\n            ></mock-wizard-editor\n          >"], ["<mock-wizard-editor\n            >",
                                "\n            ></mock-wizard-editor\n          >"])), Array.from((_a = doc === null || doc === void 0 ? void 0 : doc.querySelectorAll('VoltageLevel')) !== null && _a !== void 0 ? _a : []).map(function (vLevel) {
                                return testing_1.html(templateObject_5 || (templateObject_5 = __makeTemplateObject(["<voltage-level-editor\n                  .element=", "\n                ></voltage-level-editor>"], ["<voltage-level-editor\n                  .element=", "\n                ></voltage-level-editor>"])), vLevel);
                            })))];
                    case 2:
                        parent = (_b.sent());
                        element = parent.querySelector('voltage-level-editor:nth-child(1)');
                        element2 = parent.querySelector('voltage-level-editor:nth-child(2)');
                        return [2 /*return*/];
                }
            });
        }); });
        it('moves VoltageLevel within Substation', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        testing_1.expect((_a = doc.querySelector('VoltageLevel')) === null || _a === void 0 ? void 0 : _a.getAttribute('name')).to.equal('E1');
                        ((_b = element2 === null || element2 === void 0 ? void 0 : element2.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector('mwc-icon-button[icon="forward"]')).click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _d.sent();
                        element.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 2:
                        _d.sent();
                        testing_1.expect((_c = doc.querySelector('VoltageLevel')) === null || _c === void 0 ? void 0 : _c.getAttribute('name')).to.equal('J1');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('remove action', function () {
        var doc;
        var parent;
        var element;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/valid2007B4.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        doc = _a.sent();
                        return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_7 || (templateObject_7 = __makeTemplateObject(["<mock-wizard-editor\n            ><voltage-level-editor\n              .element=", "\n            ></voltage-level-editor\n          ></mock-wizard-editor>"], ["<mock-wizard-editor\n            ><voltage-level-editor\n              .element=", "\n            ></voltage-level-editor\n          ></mock-wizard-editor>"])), doc.querySelector('VoltageLevel[name="E1"]')))];
                    case 2:
                        parent = (_a.sent());
                        element = parent.querySelector('voltage-level-editor');
                        return [2 /*return*/];
                }
            });
        }); });
        it('removes VoltageLevel on clicking delete button', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        testing_1.expect(doc.querySelector('VoltageLevel[name="E1"]')).to.exist;
                        ((_a = element === null || element === void 0 ? void 0 : element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-icon-button[icon="delete"]')).click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _b.sent();
                        testing_1.expect(doc.querySelector('VoltageLevel[name="E1"]')).to.not.exist;
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('clone action', function () {
        var doc;
        var parent;
        var element;
        var copyContentButton;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/zeroline/clone/noUnusedLNode.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        doc = _b.sent();
                        return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_8 || (templateObject_8 = __makeTemplateObject(["<mock-wizard-editor\n            ><voltage-level-editor\n              .element=", "\n            ></voltage-level-editor\n          ></mock-wizard-editor>"], ["<mock-wizard-editor\n            ><voltage-level-editor\n              .element=", "\n            ></voltage-level-editor\n          ></mock-wizard-editor>"])), doc.querySelector('VoltageLevel[name="E1"]')))];
                    case 2:
                        parent = (_b.sent());
                        element = parent.querySelector('voltage-level-editor');
                        return [4 /*yield*/, parent.updateComplete];
                    case 3:
                        _b.sent();
                        copyContentButton = ((_a = element === null || element === void 0 ? void 0 : element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-icon-button[icon="content_copy"]'));
                        return [2 /*return*/];
                }
            });
        }); });
        it('duplicates VoltageLevel on clicking duplicate button', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        copyContentButton.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _a.sent();
                        testing_1.expect(doc.querySelector('VoltageLevel[name="E2"]')).to.exist;
                        return [2 /*return*/];
                }
            });
        }); });
        it('removes all LNode elements in the copy', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        testing_1.expect((_a = doc.querySelector('VoltageLevel[name="E1"]')) === null || _a === void 0 ? void 0 : _a.querySelector('LNode')).to.exist;
                        copyContentButton.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _c.sent();
                        testing_1.expect((_b = doc.querySelector('VoltageLevel[name="E2"]')) === null || _b === void 0 ? void 0 : _b.querySelector('LNode')).to.not.exist;
                        return [2 /*return*/];
                }
            });
        }); });
        it('removes all Terminal elements except the grounding in the copy', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        testing_1.expect((_a = doc
                            .querySelector('VoltageLevel[name="E1"]')) === null || _a === void 0 ? void 0 : _a.querySelector('Terminal:not([cNodeName="grounded"])')).to.exist;
                        copyContentButton.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _c.sent();
                        testing_1.expect((_b = doc
                            .querySelector('VoltageLevel[name="E2"]')) === null || _b === void 0 ? void 0 : _b.querySelector('Terminal:not([cNodeName="grounded"])')).to.not.exist;
                        return [2 /*return*/];
                }
            });
        }); });
        it('removes all ConnectivityNode elements in the copy', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        testing_1.expect((_a = doc
                            .querySelector('VoltageLevel[name="E1"]')) === null || _a === void 0 ? void 0 : _a.querySelector('ConnectivityNode')).to.exist;
                        copyContentButton.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _c.sent();
                        testing_1.expect((_b = doc
                            .querySelector('VoltageLevel[name="E2"]')) === null || _b === void 0 ? void 0 : _b.querySelector('ConnectivityNode')).to.not.exist;
                        return [2 /*return*/];
                }
            });
        }); });
        it('keeps all Bay elements in the copy', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        copyContentButton.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _c.sent();
                        testing_1.expect((_a = doc.querySelector('VoltageLevel[name="E1"]')) === null || _a === void 0 ? void 0 : _a.querySelectorAll('Bay').length).to.equal((_b = doc.querySelector('VoltageLevel[name="E2"]')) === null || _b === void 0 ? void 0 : _b.querySelectorAll('Bay').length);
                        return [2 /*return*/];
                }
            });
        }); });
        it('keeps all ConductingEquipment elements in the copy', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        copyContentButton.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _c.sent();
                        testing_1.expect((_a = doc
                            .querySelector('VoltageLevel[name="E1"]')) === null || _a === void 0 ? void 0 : _a.querySelectorAll('ConductingEquipment').length).to.equal((_b = doc
                            .querySelector('VoltageLevel[name="E2"]')) === null || _b === void 0 ? void 0 : _b.querySelectorAll('ConductingEquipment').length);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('open create wizard for element Function', function () {
        var doc;
        var parent;
        var element;
        var nameField;
        var primaryAction;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/zeroline/functions.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        doc = _d.sent();
                        return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_9 || (templateObject_9 = __makeTemplateObject(["<mock-wizard-editor\n            ><voltage-level-editor\n              .element=", "\n            ></voltage-level-editor\n          ></mock-wizard-editor>"], ["<mock-wizard-editor\n            ><voltage-level-editor\n              .element=", "\n            ></voltage-level-editor\n          ></mock-wizard-editor>"])), doc.querySelector('VoltageLevel')))];
                    case 2:
                        parent = (_d.sent());
                        element = parent.querySelector('voltage-level-editor');
                        ((_a = element === null || element === void 0 ? void 0 : element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-list-item[value="Function"]')).click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 3:
                        _d.sent();
                        nameField = ((_b = parent.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('wizard-textfield[label="name"]'));
                        primaryAction = ((_c = parent.wizardUI.dialog) === null || _c === void 0 ? void 0 : _c.querySelector('mwc-button[slot="primaryAction"]'));
                        return [2 /*return*/];
                }
            });
        }); });
        it('does not add Function if name attribute is not unique', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testing_1.expect(doc.querySelector('VoltageLevel[name="E1"] > Function[name="voltLvName"]')).to.exist;
                        nameField.value = 'voltLvName';
                        primaryAction.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _a.sent();
                        testing_1.expect(doc.querySelectorAll('VoltageLevel[name="E1"] > Function[name="voltLvName"]').length).to.equal(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('does add Function if name attribute is unique', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testing_1.expect(doc.querySelector('VoltageLevel[name="E1"] > Function[name="someNewFunction"]')).to.not.exist;
                        nameField.value = 'someNewFunction';
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _a.sent();
                        primaryAction.click();
                        testing_1.expect(doc.querySelector('VoltageLevel[name="E1"] > Function[name="someNewFunction"]')).to.exist;
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
