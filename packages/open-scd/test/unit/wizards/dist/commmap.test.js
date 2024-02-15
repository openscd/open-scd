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
require("../../../src/addons/Wizards.js");
require("../../../src/editors/substation/zeroline-pane.js");
var commmap_wizards_js_1 = require("../../../src/wizards/commmap-wizards.js");
describe('communication mapping wizard', function () {
    var doc;
    var parent;
    var element;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('/test/testfiles/comm-map.scd')
                        .then(function (response) { return response.text(); })
                        .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                case 1:
                    doc = _a.sent();
                    return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<oscd-wizards .host=", "\n        ><zeroline-pane .doc=", "></zeroline-pane\n      ></oscd-wizards>"], ["<oscd-wizards .host=", "\n        ><zeroline-pane .doc=", "></zeroline-pane\n      ></oscd-wizards>"])), document, doc))];
                case 2:
                    parent = _a.sent();
                    element = parent.querySelector('zeroline-pane');
                    element.commmap.click();
                    return [4 /*yield*/, element.updateComplete];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, parent.updateComplete];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.expect(parent.wizardUI.dialog).to.equalSnapshot()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('closes wizard on secondary action', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                case 1:
                    _a.sent(); // await animation
                    (parent.wizardUI.dialog.querySelector('mwc-button[slot="secondaryAction"]')).click();
                    return [4 /*yield*/, parent.updateComplete];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                case 3:
                    _a.sent(); // await animation
                    testing_1.expect(parent.wizardUI.dialogs.length).to.equal(0);
                    return [2 /*return*/];
            }
        });
    }); });
    describe('getSinkReferences', function () {
        it('returns an array of all ClientLN`s for doc as input', function () {
            var _a;
            var clientlns = commmap_wizards_js_1.getSinkReferences(doc);
            testing_1.expect(clientlns).to.have.length(6);
            (_a = testing_1.expect(clientlns[0].isEqualNode(doc.querySelector('ReportControl[name="ReportCb"] ClientLN')))) === null || _a === void 0 ? void 0 : _a.to.be["true"];
        });
        it('returns an array all ClientLN`s connected to an IED - send and receive', function () {
            var _a;
            var clientlns = commmap_wizards_js_1.getSinkReferences(doc.querySelector('IED[name="IED1"]'));
            testing_1.expect(clientlns).to.have.length(5);
            (_a = testing_1.expect(clientlns[0].isEqualNode(doc.querySelector('ReportControl[name="ReportCb"] ClientLN')))) === null || _a === void 0 ? void 0 : _a.to.be["true"];
        });
    });
    describe('getSourceReferences', function () {
        it('returns an array of all ExtRef`s with doc as inputs', function () {
            var extRefs = commmap_wizards_js_1.getSourceReferences(doc);
            testing_1.expect(extRefs).to.have.length(20);
            testing_1.expect(extRefs[0].isEqualNode(doc.querySelector('ExtRef'))).to.be["true"];
        });
        it('returns an array of all ExtRef`s connected to an IED - send and receive', function () {
            var extRefs = commmap_wizards_js_1.getSourceReferences(doc.querySelector('IED[name="IED2"]'));
            testing_1.expect(extRefs).to.have.length(6);
            testing_1.expect(extRefs[2].isEqualNode(doc.querySelector('IED[name="IED2"] ExtRef'))).to.be["true"];
        });
    });
});
var templateObject_1;
