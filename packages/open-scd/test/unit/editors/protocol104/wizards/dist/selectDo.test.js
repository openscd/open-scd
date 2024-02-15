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
require("../../../../../src/addons/Wizards.js");
var selectDo_js_1 = require("../../../../../src/editors/protocol104/wizards/selectDo.js");
describe('data model nodes child getter', function () {
    var doc;
    var element;
    describe('getDataChildren', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/104/valid-empty-addresses.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        doc = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('returns empty array for invalid tag', function () {
            var parent = doc.querySelector('Substation');
            testing_1.expect(selectDo_js_1.getDataChildren(parent)).to.be.empty;
        });
        it('returns direct children for a SCL', function () {
            var parent = doc.querySelector('SCL');
            testing_1.expect(selectDo_js_1.getDataChildren(parent)).to.not.be.empty;
            testing_1.expect(selectDo_js_1.getDataChildren(parent).length).to.be.equal(3);
            testing_1.expect(selectDo_js_1.getDataChildren(parent)[0].tagName).to.be.equal('IED');
            testing_1.expect(selectDo_js_1.getDataChildren(parent)[1].tagName).to.be.equal('IED');
            testing_1.expect(selectDo_js_1.getDataChildren(parent)[2].tagName).to.be.equal('IED');
            testing_1.expect(selectDo_js_1.getDataChildren(parent)[0]).to.have.attribute('name', 'B1');
            testing_1.expect(selectDo_js_1.getDataChildren(parent)[1]).to.have.attribute('name', 'B2');
            testing_1.expect(selectDo_js_1.getDataChildren(parent)[2]).to.have.attribute('name', 'B3');
        });
        it('returns direct children for a IED', function () {
            var parent = doc.querySelector('IED[name="B1"]');
            testing_1.expect(selectDo_js_1.getDataChildren(parent)).to.not.be.empty;
            testing_1.expect(selectDo_js_1.getDataChildren(parent).length).to.be.equal(1);
            testing_1.expect(selectDo_js_1.getDataChildren(parent)[0].tagName).to.be.equal('AccessPoint');
            testing_1.expect(selectDo_js_1.getDataChildren(parent)[0]).to.have.attribute('name', 'AP1');
        });
        it('returns direct children for a AccessPoint', function () {
            var parent = doc.querySelector('IED[name="B1"] > AccessPoint[name="AP1"]');
            testing_1.expect(selectDo_js_1.getDataChildren(parent)).to.not.be.empty;
            testing_1.expect(selectDo_js_1.getDataChildren(parent).length).to.be.equal(1);
            testing_1.expect(selectDo_js_1.getDataChildren(parent)[0].tagName).to.be.equal('LDevice');
            testing_1.expect(selectDo_js_1.getDataChildren(parent)[0]).to.have.attribute('inst', 'LD0');
        });
        it('returns direct children for a LDevice', function () {
            var parent = doc.querySelector('IED[name="B1"] LDevice[inst="LD0"]');
            testing_1.expect(selectDo_js_1.getDataChildren(parent)).to.not.be.empty;
            testing_1.expect(selectDo_js_1.getDataChildren(parent).length).to.be.equal(10);
            testing_1.expect(selectDo_js_1.getDataChildren(parent)[0].tagName).to.be.equal('LN0');
            testing_1.expect(selectDo_js_1.getDataChildren(parent)[0]).to.have.attribute('lnClass', 'LLN0');
            testing_1.expect(selectDo_js_1.getDataChildren(parent)[1].tagName).to.be.equal('LN');
            testing_1.expect(selectDo_js_1.getDataChildren(parent)[1]).to.have.attribute('lnClass', 'GAPC');
        });
        it('returns referenced children for LN', function () {
            var parent = doc.querySelector('IED[name="B1"] LDevice[inst="LD0"] > LN0[lnClass="LLN0"]');
            testing_1.expect(selectDo_js_1.getDataChildren(parent)).to.not.be.empty;
            testing_1.expect(selectDo_js_1.getDataChildren(parent).length).to.equal(4);
            testing_1.expect(selectDo_js_1.getDataChildren(parent)[0].tagName).to.be.equal('DO');
            testing_1.expect(selectDo_js_1.getDataChildren(parent)[0]).to.have.attribute('name', 'Beh');
            testing_1.expect(selectDo_js_1.getDataChildren(parent)[1].tagName).to.be.equal('DO');
            testing_1.expect(selectDo_js_1.getDataChildren(parent)[1]).to.have.attribute('name', 'Health');
            testing_1.expect(selectDo_js_1.getDataChildren(parent)[2].tagName).to.be.equal('DO');
            testing_1.expect(selectDo_js_1.getDataChildren(parent)[2]).to.have.attribute('name', 'MltLev');
            testing_1.expect(selectDo_js_1.getDataChildren(parent)[3].tagName).to.be.equal('DO');
            testing_1.expect(selectDo_js_1.getDataChildren(parent)[3]).to.have.attribute('name', 'Mod');
        });
    });
    describe('show DO Picker', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var wizard;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<oscd-wizards .host=", "></oscd-wizards>"], ["<oscd-wizards .host=", "></oscd-wizards>"])), document))];
                    case 1:
                        element = _a.sent();
                        wizard = selectDo_js_1.selectDoWizard(doc);
                        element.workflow.push(function () { return wizard; });
                        return [4 /*yield*/, element.requestUpdate()];
                    case 2:
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
});
var templateObject_1;
