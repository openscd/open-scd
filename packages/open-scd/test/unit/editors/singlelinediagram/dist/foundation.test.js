"use strict";
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
var foundation_js_1 = require("../../../../src/editors/singlelinediagram/foundation.js");
var foundation_js_2 = require("../../../../src/foundation.js");
describe('Single Line Diagram foundation', function () {
    var doc;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('/test/testfiles/valid2007B4withSubstationXY.scd')
                        .then(function (response) { return response.text(); })
                        .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                case 1:
                    doc = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('defines a getNameAttribute function that', function () {
        it('returns the correct name for an element.', function () {
            var element = doc.querySelector('Bay[desc="Feld A"]');
            testing_1.expect(foundation_js_2.getNameAttribute(element)).to.eql('Bay A');
        });
        it('returns undefined for an element without a name.', function () {
            var element = doc.querySelector('VoltageLevel[name="J1"] > Voltage');
            testing_1.expect(foundation_js_2.getNameAttribute(element)).to.be.undefined;
        });
    });
    describe('defines a getDescriptionAttribute function that', function () {
        it('returns the correct description for an element.', function () {
            var element = doc.querySelector('Bay[name="Bay A"]');
            testing_1.expect(foundation_js_2.getDescriptionAttribute(element)).to.eql('Feld A');
        });
        it('returns undefined for an element without a description.', function () {
            var element = doc.querySelector('VoltageLevel[name="J1"] > Voltage');
            testing_1.expect(foundation_js_2.getDescriptionAttribute(element)).to.be.undefined;
        });
    });
    describe('defines a getPathName function that', function () {
        it('returns the correct path name for an element.', function () {
            var element = doc.querySelector('Bay[name="Bay A"] > ConnectivityNode[name="L1"]');
            testing_1.expect(foundation_js_2.getPathNameAttribute(element)).to.eql('AA1/J1/Bay A/L1');
        });
        it('returns undefined for an element without a pathName.', function () {
            var element = doc.querySelector('VoltageLevel[name="J1"] > Voltage');
            testing_1.expect(foundation_js_2.getPathNameAttribute(element)).to.be.undefined;
        });
    });
    describe('defines a getInstance function that', function () {
        it('returns the correct instance for an element.', function () {
            var element = doc.querySelector('IED[name="IED1"] > AccessPoint[name="P1"] > Server > LDevice[name="LDeviceA"]');
            testing_1.expect(foundation_js_2.getInstanceAttribute(element)).to.eql('CircuitBreaker_CB1');
        });
        it('returns undefined for an element without an instance.', function () {
            var element = doc.querySelector('IED[name="IED1"] > AccessPoint[name="P1"] > Server');
            testing_1.expect(foundation_js_2.getInstanceAttribute(element)).to.be.undefined;
        });
    });
    describe('defines a getRelativeCoordinates function that', function () {
        it('returns the correct x and y coordinates for an element.', function () {
            var element = doc.querySelector('Bay[name="Bay A"] > ConductingEquipment[name="QB1"]');
            testing_1.expect(foundation_js_1.getRelativeCoordinates(element)).to.eql({ x: 2, y: 2 });
        });
        it("returns {x: 0, y: 0} coordinates for an element that hasn't got any coordinates.", function () {
            var element = doc.querySelector('Bay[name="Bay A"] > ConnectivityNode[name="L1"]');
            testing_1.expect(foundation_js_1.getRelativeCoordinates(element)).to.eql({ x: 0, y: 0 });
        });
    });
    describe('defines an isBusBar function that', function () {
        it('returns true if an element is a bus bar.', function () {
            var element = doc.querySelector('Bay[name="BusBar A"]');
            testing_1.expect(foundation_js_1.isBusBar(element)).to.be["true"];
        });
        it('returns false if an element is not a bus bar.', function () {
            var element = doc.querySelector('Bay[name="Bay A"]');
            testing_1.expect(foundation_js_1.isBusBar(element)).to.be["false"];
        });
    });
    describe('defines a getConnectedTerminals function that', function () {
        it('calculates the total number of connected terminals for a single element within the same bay.', function () {
            var element = doc.querySelector('Bay[name="Bay A"] > ConnectivityNode[name="L1"]');
            testing_1.expect(foundation_js_1.getConnectedTerminals(element).length).to.eql(3);
        });
        it('calculates the total number of connected terminals for a single element connected to multiple bays.', function () {
            var element = doc.querySelector('Bay[name="BusBar A"] > ConnectivityNode[name="L1"]');
            testing_1.expect(foundation_js_1.getConnectedTerminals(element).length).to.eql(4);
        });
    });
    describe('defines a calculateConnectivityNodeCoordinates function that', function () {
        it('calculates the x and y coordinates of an element without defined coordinates,' +
            'based on the coordinates of connected elements.', function () {
            var element = doc.querySelector('Bay[name="Bay A"] > ConnectivityNode[name="L1"]');
            testing_1.expect(foundation_js_1.calculateConnectivityNodeCoordinates(element)).to.eql({
                x: Math.round((6 + 10 + 8) / 3),
                y: Math.round((20 + 20 + 24) / 3)
            });
        });
        it("returns a default {x:0, y:0} for elements that aren't Connectivity Nodes", function () {
            var element = doc.querySelector('Bay[name="Bay A"] > ConductingEquipment[name="QB1"]');
            testing_1.expect(foundation_js_1.calculateConnectivityNodeCoordinates(element)).to.eql({
                x: 0,
                y: 0
            });
        });
    });
    describe('defines a getCommonParentElement function that', function () {
        it('common parent between connectivity node and power transformer should be the substation', function () {
            var substation = doc.querySelector('Substation[name="AA1"]');
            var powerTransformer = doc.querySelector('PowerTransformer[name="TA1"]');
            var connectivityNode = doc.querySelector('Bay[name="Bay A"] > ConnectivityNode[name="L1"]');
            testing_1.expect(foundation_js_1.getCommonParentElement(powerTransformer, connectivityNode, null)).to.equal(substation);
        });
        it('common parent between connectivity node and conducting equipment should be the bay', function () {
            var bay = doc.querySelector('Bay[name="Bay A"]');
            var conductingEquipment = doc.querySelector('Bay[name="Bay A"] > ConductingEquipment[name="QB1"]');
            var connectivityNode = doc.querySelector('Bay[name="Bay A"] > ConnectivityNode[name="L1"]');
            testing_1.expect(foundation_js_1.getCommonParentElement(conductingEquipment, connectivityNode, null)).to.equal(bay);
        });
        it('common parent between two unrelated elements will be the root element', function () {
            var powerTransformer = doc.querySelector('PowerTransformer[name="TA1"]');
            var subNetwork = doc.querySelector('SubNetwork[name="StationBus"]');
            testing_1.expect(foundation_js_1.getCommonParentElement(powerTransformer, subNetwork, null)).to.equal(doc.firstElementChild);
        });
        it('when no common parent then the default element returned', function () { return __awaiter(void 0, void 0, void 0, function () {
            var otherDoc, substation, conductingEquipment, connectivityNode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/valid2007B4withSubstationXY.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        otherDoc = _a.sent();
                        substation = doc.querySelector('Substation[name="AA1"]');
                        conductingEquipment = doc.querySelector('Bay[name="Bay A"] > ConductingEquipment[name="QB1"]');
                        connectivityNode = otherDoc.querySelector('Bay[name="Bay A"] > ConnectivityNode[name="L1"]');
                        testing_1.expect(foundation_js_1.getCommonParentElement(conductingEquipment, connectivityNode, substation)).to.equal(substation);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
