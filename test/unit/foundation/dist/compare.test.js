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
var lit_element_1 = require("lit-element");
var compare_js_1 = require("../../../src/foundation/compare.js");
describe('compas-compare-dialog', function () {
    var oldSclElement;
    var newSclElement;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('/test/testfiles/foundation/compare-original.cid')
                        .then(function (response) { return response.text(); })
                        .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })
                        .then(function (document) { return document.documentElement; })];
                case 1:
                    oldSclElement = _a.sent();
                    return [4 /*yield*/, fetch('/test/testfiles/foundation/compare-changed.cid')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })
                            .then(function (document) { return document.documentElement; })];
                case 2:
                    newSclElement = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('identityForCompare', function () {
        it('will return the identity of the sub element, not the full identity', function () {
            var voltageLevel = oldSclElement.querySelector('VoltageLevel[name="S1 30kV"]');
            var result = compare_js_1.identityForCompare(voltageLevel);
            testing_1.expect(result).to.be.equal('S1 30kV');
        });
        it('will return the identity of the main element, meaning the full identity', function () {
            var substation = oldSclElement.querySelector('Substation[name="Substation 1"]');
            var result = compare_js_1.identityForCompare(substation);
            testing_1.expect(result).to.be.equal('Substation 1');
        });
        it('will return the NaN of the root element', function () {
            var substation = oldSclElement.querySelector('SCL');
            var result = compare_js_1.identityForCompare(substation);
            testing_1.expect(result).to.be.NaN;
        });
    });
    describe('isSame', function () {
        it('will return true when the same elements are passed', function () {
            var voltageLevel = oldSclElement.querySelector('VoltageLevel[name="S1 30kV"]');
            var same = compare_js_1.isSame(voltageLevel, voltageLevel);
            testing_1.expect(same).to.be["true"];
        });
        it('will return true when the same elements from different sources are passed', function () {
            var newVoltageLevel = newSclElement.querySelector('VoltageLevel[name="S1 30kV"]');
            var oldVoltageLevel = oldSclElement.querySelector('VoltageLevel[name="S1 30kV"]');
            var same = compare_js_1.isSame(newVoltageLevel, oldVoltageLevel);
            testing_1.expect(same).to.be["true"];
        });
        it('will return false when the different type of elements are passed', function () {
            var voltageLevel = oldSclElement.querySelector('VoltageLevel[name="S1 30kV"]');
            var substation = oldSclElement.querySelector('Substation[name="Substation 1"]');
            var same = compare_js_1.isSame(voltageLevel, substation);
            testing_1.expect(same).to.be["false"];
        });
        it('will return false when the different elements of the same type are passed', function () {
            var voltageLevel = oldSclElement.querySelector('VoltageLevel[name="S1 30kV"]');
            var differentVoltageLevel = oldSclElement.querySelector('VoltageLevel[name="S1 380kV"]');
            var same = compare_js_1.isSame(differentVoltageLevel, voltageLevel);
            testing_1.expect(same).to.be["false"];
        });
    });
    describe('diffSclAttributes', function () {
        it('no attributes changed', function () {
            var newVoltageLevel = newSclElement.querySelector('VoltageLevel[name="S1 30kV"]');
            var oldVoltageLevel = oldSclElement.querySelector('VoltageLevel[name="S1 30kV"]');
            var diffAttributes = compare_js_1.diffSclAttributes(newVoltageLevel, oldVoltageLevel, {}, newVoltageLevel);
            testing_1.expect(diffAttributes).to.have.length(0);
        });
        it('one attribute has changed', function () {
            var newVoltageLevel = newSclElement.querySelector('VoltageLevel[name="S1 110kV"]');
            var oldVoltageLevel = oldSclElement.querySelector('VoltageLevel[name="S1 110kV"]');
            var diffAttributes = compare_js_1.diffSclAttributes(newVoltageLevel, oldVoltageLevel, {}, newVoltageLevel);
            testing_1.expect(diffAttributes).to.have.length(1);
            testing_1.expect(diffAttributes[0][0]).to.be.equal('desc');
            testing_1.expect(diffAttributes[0][1].oldValue).to.be["null"];
            testing_1.expect(diffAttributes[0][1].newValue).to.be.equal('Extra Voltage Level');
        });
        it('only name changed on copied element', function () {
            var newSubstation = newSclElement.querySelector('Substation[name="Substation 1 (Copy)"]');
            var oldSubstation = oldSclElement.querySelector('Substation[name="Substation 1"]');
            var diffAttributes = compare_js_1.diffSclAttributes(newSubstation, oldSubstation, {}, newSubstation);
            testing_1.expect(diffAttributes).to.have.length(1);
            testing_1.expect(diffAttributes[0][0]).to.be.equal('name');
            testing_1.expect(diffAttributes[0][1].oldValue).to.be.equal('Substation 1');
            testing_1.expect(diffAttributes[0][1].newValue).to.be.equal('Substation 1 (Copy)');
        });
    });
    describe('diffSclChilds', function () {
        it('all children can be updated', function () {
            var newVoltageLevel = newSclElement.querySelector('VoltageLevel[name="S1 380kV"]');
            var oldVoltageLevel = oldSclElement.querySelector('VoltageLevel[name="S1 380kV"]');
            var diffChilds = compare_js_1.diffSclChilds(newVoltageLevel, oldVoltageLevel, {}, newVoltageLevel, oldVoltageLevel);
            testing_1.expect(diffChilds).to.have.length(5);
            var updatedChilds = diffChilds.filter(function (diff) { return diff.newValue !== null && diff.oldValue !== null; });
            testing_1.expect(updatedChilds).to.have.length(5);
        });
        it('all children can be updated of a copied element', function () {
            var newSubstation = newSclElement.querySelector('Substation[name="Substation 1 (Copy)"]');
            var oldSubstation = oldSclElement.querySelector('Substation[name="Substation 1"]');
            var diffChilds = compare_js_1.diffSclChilds(newSubstation, oldSubstation, {}, newSclElement, oldSclElement);
            testing_1.expect(diffChilds).to.have.length(3);
            var updatedChilds = diffChilds.filter(function (diff) { return diff.newValue !== null && diff.oldValue !== null; });
            testing_1.expect(updatedChilds).to.have.length(3);
        });
        it('one child is added', function () {
            var _a;
            var newVoltageLevel = newSclElement.querySelector('VoltageLevel[name="S1 30kV"]');
            var oldVoltageLevel = oldSclElement.querySelector('VoltageLevel[name="S1 30kV"]');
            var diffChilds = compare_js_1.diffSclChilds(newVoltageLevel, oldVoltageLevel, {}, newSclElement, oldSclElement);
            testing_1.expect(diffChilds).to.have.length(5);
            var addedBay = diffChilds.filter(function (diff) { return diff.oldValue === null; });
            testing_1.expect(addedBay).to.have.length(1);
            testing_1.expect((_a = addedBay[0].newValue) === null || _a === void 0 ? void 0 : _a.tagName).to.be.equal('Bay');
        });
        it('one child is removed', function () {
            var _a;
            var newVoltageLevel = newSclElement.querySelector('VoltageLevel[name="S1 110kV"]');
            var oldVoltageLevel = oldSclElement.querySelector('VoltageLevel[name="S1 110kV"]');
            var diffChilds = compare_js_1.diffSclChilds(newVoltageLevel, oldVoltageLevel, {}, newVoltageLevel, oldVoltageLevel);
            testing_1.expect(diffChilds).to.have.length(7);
            var removedBay = diffChilds.filter(function (diff) { return diff.newValue === null; });
            testing_1.expect(removedBay).to.have.length(1);
            testing_1.expect((_a = removedBay[0].oldValue) === null || _a === void 0 ? void 0 : _a.tagName).to.be.equal('Bay');
        });
    });
    describe('renderDiff', function () {
        it('no changes, so no template is returned', function () { return __awaiter(void 0, void 0, void 0, function () {
            var newVoltageLevel, oldVoltageLevel, templateResult;
            return __generator(this, function (_a) {
                newVoltageLevel = newSclElement.querySelector('VoltageLevel[name="S1 380kV"]');
                oldVoltageLevel = oldSclElement.querySelector('VoltageLevel[name="S1 380kV"]');
                templateResult = compare_js_1.renderDiff(newVoltageLevel, oldVoltageLevel);
                testing_1.expect(templateResult).to.be["null"];
                return [2 /*return*/];
            });
        }); });
        it('child is added, so check latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
            var newVoltageLevel, oldVoltageLevel, templateResult, element;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newVoltageLevel = newSclElement.querySelector('VoltageLevel[name="S1 30kV"]');
                        oldVoltageLevel = oldSclElement.querySelector('VoltageLevel[name="S1 30kV"]');
                        templateResult = compare_js_1.renderDiff(newVoltageLevel, oldVoltageLevel);
                        testing_1.expect(templateResult).to.be.not["null"];
                        element = testing_1.fixtureSync(lit_element_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<div>", "</div>"], ["<div>", "</div>"])), templateResult));
                        return [4 /*yield*/, element];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, testing_1.expect(element).to.equalSnapshot()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('child is removed and attribute added/removed/updated, so check latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
            var newVoltageLevel, oldVoltageLevel, templateResult, element;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newVoltageLevel = newSclElement.querySelector('VoltageLevel[name="S1 110kV"]');
                        oldVoltageLevel = oldSclElement.querySelector('VoltageLevel[name="S1 110kV"]');
                        templateResult = compare_js_1.renderDiff(newVoltageLevel, oldVoltageLevel);
                        testing_1.expect(templateResult).to.be.not["null"];
                        element = testing_1.fixtureSync(lit_element_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<div>", "</div>"], ["<div>", "</div>"])), templateResult));
                        return [4 /*yield*/, element];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, testing_1.expect(element).to.equalSnapshot()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('child is added, but is ignored', function () { return __awaiter(void 0, void 0, void 0, function () {
            var newVoltageLevel, oldVoltageLevel, ignoreDiffs, templateResult;
            return __generator(this, function (_a) {
                newVoltageLevel = newSclElement.querySelector('VoltageLevel[name="S1 30kV"]');
                oldVoltageLevel = oldSclElement.querySelector('VoltageLevel[name="S1 30kV"]');
                ignoreDiffs = {
                    'Bay': {
                        full: true
                    }
                };
                templateResult = compare_js_1.renderDiff(newVoltageLevel, oldVoltageLevel, ignoreDiffs);
                testing_1.expect(templateResult).to.be["null"];
                return [2 /*return*/];
            });
        }); });
        it('attribute is updated, but is ignored, so check latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
            var newVoltageLevel, oldVoltageLevel, ignoreDiffs, templateResult, element;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newVoltageLevel = newSclElement.querySelector('VoltageLevel[name="S1 110kV"]');
                        oldVoltageLevel = oldSclElement.querySelector('VoltageLevel[name="S1 110kV"]');
                        ignoreDiffs = {
                            'Bay': {
                                full: false,
                                attributes: {
                                    'desc': true
                                }
                            }
                        };
                        templateResult = compare_js_1.renderDiff(newVoltageLevel, oldVoltageLevel, ignoreDiffs);
                        testing_1.expect(templateResult).to.be.not["null"];
                        element = testing_1.fixtureSync(lit_element_1.html(templateObject_3 || (templateObject_3 = __makeTemplateObject(["<div>", "</div>"], ["<div>", "</div>"])), templateResult));
                        return [4 /*yield*/, element];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, testing_1.expect(element).to.equalSnapshot()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
var templateObject_1, templateObject_2, templateObject_3;
