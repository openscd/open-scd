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
require("open-scd/test/unit/mock-editor.js");
require("../../../src/compas-editors/autogen-substation.js");
var autogen_substation_js_1 = require("../../../src/compas-editors/autogen-substation.js");
describe('autogen-substation-integration', function () {
    if (customElements.get('') === undefined)
        customElements.define('autogen-substation', autogen_substation_js_1["default"]);
    var parent;
    var element;
    var validSCL;
    before(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      <mock-editor><autogen-substation></autogen-substation></mock-editor>\n    "], ["\n      <mock-editor><autogen-substation></autogen-substation></mock-editor>\n    "]))))];
                case 1:
                    parent = _a.sent();
                    return [4 /*yield*/, fetch('/test/testfiles/menu/autogen-substation/autogen-substation-demo.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                case 2:
                    validSCL = _a.sent();
                    element = (parent.querySelector('autogen-substation'));
                    element.doc = validSCL;
                    return [4 /*yield*/, element.updateComplete];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, element.run()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, element.requestUpdate()];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('creates 2 voltage level with default description', function () {
        var _a, _b, _c, _d;
        testing_1.expect(element.doc.querySelectorAll(':root > Substation > VoltageLevel').length).to.equal(2);
        testing_1.expect((_a = validSCL
            .querySelectorAll(':root > Substation > VoltageLevel')[0]) === null || _a === void 0 ? void 0 : _a.getAttribute('name')).to.equal('E01');
        testing_1.expect((_b = validSCL
            .querySelector(':root > Substation > VoltageLevel')) === null || _b === void 0 ? void 0 : _b.getAttribute('desc')).to.equal('Voltage Level generated by CoMPAS');
        testing_1.expect((_c = validSCL
            .querySelectorAll(':root > Substation > VoltageLevel')[1]) === null || _c === void 0 ? void 0 : _c.getAttribute('name')).to.equal('E02');
        testing_1.expect((_d = validSCL
            .querySelector(':root > Substation > VoltageLevel')) === null || _d === void 0 ? void 0 : _d.getAttribute('desc')).to.equal('Voltage Level generated by CoMPAS');
    });
    it('creates bays inside the voltageLevels based on the name convention', function () {
        testing_1.expect(validSCL
            .querySelectorAll(':root > Substation > VoltageLevel')[0]
            .querySelectorAll('Bay').length).to.equal(4);
        testing_1.expect(validSCL
            .querySelectorAll(':root > Substation > VoltageLevel')[1]
            .querySelectorAll('Bay').length).to.equal(3);
    });
    it('creates correct number of conducting equipments', function () {
        testing_1.expect(validSCL.querySelectorAll(':root > Substation > VoltageLevel > Bay > ConductingEquipment').length).to.equal(17);
    });
    it('creates only unique conducting equipment names', function () {
        var nameArray = Array.from(validSCL.querySelectorAll(':root > Substation > VoltageLevel > Bay > ConductingEquipment')).map(function (item) { return item.getAttribute('name'); });
        var nameSet = new Set(nameArray);
        testing_1.expect(nameArray.length).to.equal(nameSet.size);
    });
    it('creates unique conducting equipment name, if no prefix is there', function () {
        var _a, _b;
        testing_1.expect((_a = validSCL
            .querySelector(':root > Substation > VoltageLevel > Bay > ConductingEquipment:nth-child(1)')) === null || _a === void 0 ? void 0 : _a.getAttribute('name')).to.equal('QA1');
        testing_1.expect((_b = validSCL
            .querySelector(':root > Substation > VoltageLevel > Bay > ConductingEquipment:nth-child(4)')) === null || _b === void 0 ? void 0 : _b.getAttribute('name')).to.equal('QB3');
    });
    it('uses prefix for conducting equipment name, if prefix is available', function () {
        var _a, _b;
        testing_1.expect((_a = validSCL
            .querySelector(':root > Substation > VoltageLevel > Bay > ConductingEquipment:nth-child(2)')) === null || _a === void 0 ? void 0 : _a.getAttribute('name')).to.equal('QB1');
        testing_1.expect((_b = validSCL
            .querySelector(':root > Substation > VoltageLevel > Bay > ConductingEquipment:nth-child(3)')) === null || _b === void 0 ? void 0 : _b.getAttribute('name')).to.equal('QB2');
    });
});
var templateObject_1;
