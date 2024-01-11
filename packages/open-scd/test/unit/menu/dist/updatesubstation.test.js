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
var UpdateSubstation_js_1 = require("../../../src/menu/UpdateSubstation.js");
var foundation_js_1 = require("../../../src/foundation.js");
describe('isValidReference', function () {
    var ours;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('/test/testfiles/updatesubstation-ours.scd')
                        .then(function (response) { return response.text(); })
                        .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                case 1:
                    ours = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('returns true for lNodeIdentity pointing to logical node in the IED', function () {
        var lNode = ours.querySelector('LNode[iedName="IED1"][ldInst="Disconnectors"][prefix="DC"][lnClass="XSWI"][lnInst="1"]');
        testing_1.expect(UpdateSubstation_js_1.isValidReference(ours, foundation_js_1.identity(lNode))).to.be["true"];
    });
    it('checks reference for client side logical nodes', function () {
        var lNode = ours.querySelector('LNode[iedName="IED1"][prefix="DC3"][lnClass="XSWI"][lnInst="2"]');
        testing_1.expect(UpdateSubstation_js_1.isValidReference(ours, foundation_js_1.identity(lNode))).to.be["true"];
    });
    it('returns false for NaN identities', function () {
        testing_1.expect(UpdateSubstation_js_1.isValidReference(ours, NaN)).to.be["false"];
    });
    it('returns false for incorrect lNodeIdentities', function () {
        var lNodeMissingIedNAme = ours.querySelector('LNode[iedName="IED1"][prefix="DC"][lnClass="XSWI"][lnInst="2"]');
        lNodeMissingIedNAme === null || lNodeMissingIedNAme === void 0 ? void 0 : lNodeMissingIedNAme.removeAttribute('iedName');
        testing_1.expect(UpdateSubstation_js_1.isValidReference(ours, foundation_js_1.identity(lNodeMissingIedNAme))).to.be["false"];
        var lNodeMissingLnClass = ours.querySelector('LNode[iedName="IED1"][prefix="DC"][lnClass="XSWI"][lnInst="2"]');
        lNodeMissingLnClass === null || lNodeMissingLnClass === void 0 ? void 0 : lNodeMissingLnClass.removeAttribute('iedName');
        testing_1.expect(UpdateSubstation_js_1.isValidReference(ours, foundation_js_1.identity(lNodeMissingLnClass))).to.be["false"];
    });
    it('returns false when reference does not match with logical node', function () {
        var lNode = ours.querySelector('LNode[iedName="IED1"][ldInst="Disconnectors"][prefix="DC"][lnClass="XSWI"][lnInst="1"]');
        lNode === null || lNode === void 0 ? void 0 : lNode.setAttribute('lnClass', 'LPHD');
        testing_1.expect(UpdateSubstation_js_1.isValidReference(ours, foundation_js_1.identity(lNode))).to.be["false"];
    });
});
