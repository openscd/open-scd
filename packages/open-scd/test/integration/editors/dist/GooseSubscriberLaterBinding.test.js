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
require("../../mock-open-scd.js");
var GooseSubscriberLaterBinding_js_1 = require("../../../src/editors/GooseSubscriberLaterBinding.js");
var test_support_js_1 = require("./test-support.js");
describe('GOOSE Subscribe Later Binding Plugin', function () {
    customElements.define('goose-subscriber-later-binding-plugin', GooseSubscriberLaterBinding_js_1["default"]);
    var element;
    var parent;
    var doc;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('/test/testfiles/editors/LaterBindingGOOSE2007B4.scd')
                        .then(function (response) { return response.text(); })
                        .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                case 1:
                    doc = _a.sent();
                    return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<mock-open-scd\n        ><goose-subscriber-later-binding-plugin\n          .doc=\"", "\"\n        ></goose-subscriber-later-binding-plugin\n      ></mock-open-scd>"], ["<mock-open-scd\n        ><goose-subscriber-later-binding-plugin\n          .doc=\"", "\"\n        ></goose-subscriber-later-binding-plugin\n      ></mock-open-scd>"])), doc))];
                case 2:
                    parent = _a.sent();
                    element = parent.getActivePlugin();
                    return [2 /*return*/];
            }
        });
    }); });
    it('when selecting an FCDA element with subscriptions it looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
        var fcdaListElement, extRefListElement;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, fetch('/test/testfiles/editors/LaterBindingGOOSE-LGOS.scd')
                        .then(function (response) { return response.text(); })
                        .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                case 1:
                    doc = _b.sent();
                    return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<mock-open-scd\n        ><goose-subscriber-later-binding-plugin\n          .doc=\"", "\"\n        ></goose-subscriber-later-binding-plugin\n      ></mock-open-scd>"], ["<mock-open-scd\n        ><goose-subscriber-later-binding-plugin\n          .doc=\"", "\"\n        ></goose-subscriber-later-binding-plugin\n      ></mock-open-scd>"])), doc))];
                case 2:
                    parent = _b.sent();
                    element = parent.getActivePlugin();
                    fcdaListElement = test_support_js_1.getFCDABindingList(element);
                    test_support_js_1.selectFCDAItem(fcdaListElement, 'GOOSE_Publisher>>QB2_Disconnector>GOOSE2', 'GOOSE_Publisher>>QB2_Disconnector>GOOSE2sDataSet>QB2_Disconnector/ CSWI 1.Pos stVal (ST)');
                    return [4 /*yield*/, element.requestUpdate()];
                case 3:
                    _b.sent();
                    extRefListElement = ((_a = element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('extref-later-binding-list'));
                    return [4 /*yield*/, extRefListElement.requestUpdate()];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, testing_1.expect(extRefListElement).shadowDom.to.equalSnapshot()];
                case 5:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('when subscribing an available ExtRef then the lists are changed', function () { return __awaiter(void 0, void 0, void 0, function () {
        var fcdaListElement, extRefListElement;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fcdaListElement = test_support_js_1.getFCDABindingList(element);
                    extRefListElement = test_support_js_1.getExtrefLaterBindingList(element);
                    test_support_js_1.selectFCDAItem(fcdaListElement, 'GOOSE_Publisher>>QB2_Disconnector>GOOSE1', 'GOOSE_Publisher>>QB2_Disconnector>GOOSE1sDataSet>QB1_Disconnector/ CSWI 1.Pos q (ST)');
                    return [4 /*yield*/, element.requestUpdate()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, extRefListElement.requestUpdate()];
                case 2:
                    _a.sent();
                    testing_1.expect(extRefListElement['getSubscribedExtRefElements']().length).to.be.equal(0);
                    testing_1.expect(test_support_js_1.getSelectedSubItemValue(fcdaListElement)).to.be["null"];
                    testing_1.expect(extRefListElement['getAvailableExtRefElements']().length).to.be.equal(5);
                    (extRefListElement.shadowRoot.querySelector('mwc-list-item[value="GOOSE_Subscriber>>Earth_Switch> CILO 1>Pos;CSWI1/Pos/stVal[0]"]')).click();
                    return [4 /*yield*/, element.requestUpdate()];
                case 3:
                    _a.sent();
                    testing_1.expect(extRefListElement['getSubscribedExtRefElements']().length).to.be.equal(1);
                    testing_1.expect(test_support_js_1.getSelectedSubItemValue(fcdaListElement)).to.have.text('1');
                    testing_1.expect(extRefListElement['getAvailableExtRefElements']().length).to.be.equal(4);
                    return [2 /*return*/];
            }
        });
    }); });
    it('when subscribing an available ExtRef then a supervision instance is created', function () { return __awaiter(void 0, void 0, void 0, function () {
        var extRefListElement, fcdaListElement, supervisionInstance;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, fetch('/test/testfiles/editors/LaterBindingGOOSE-LGOS.scd')
                        .then(function (response) { return response.text(); })
                        .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                case 1:
                    doc = _c.sent();
                    return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_3 || (templateObject_3 = __makeTemplateObject(["<mock-open-scd\n        ><goose-subscriber-later-binding-plugin\n          .doc=\"", "\"\n        ></goose-subscriber-later-binding-plugin\n      ></mock-open-scd>"], ["<mock-open-scd\n        ><goose-subscriber-later-binding-plugin\n          .doc=\"", "\"\n        ></goose-subscriber-later-binding-plugin\n      ></mock-open-scd>"])), doc))];
                case 2:
                    parent = _c.sent();
                    element = parent.getActivePlugin();
                    extRefListElement = test_support_js_1.getExtrefLaterBindingList(element);
                    fcdaListElement = test_support_js_1.getFCDABindingList(element);
                    test_support_js_1.selectFCDAItem(fcdaListElement, 'GOOSE_Publisher2>>QB2_Disconnector>GOOSE1', 'GOOSE_Publisher2>>QB2_Disconnector>GOOSE1sDataSet>QB1_Disconnector/ CSWI 1.Pos stVal (ST)');
                    return [4 /*yield*/, element.requestUpdate()];
                case 3:
                    _c.sent();
                    return [4 /*yield*/, extRefListElement.requestUpdate()];
                case 4:
                    _c.sent();
                    (extRefListElement.shadowRoot.querySelector('mwc-list-item[value="GOOSE_Subscriber1>>Earth_Switch> CILO 1>Pos;CSWI1/Pos/stVal[0]"]')).click();
                    return [4 /*yield*/, element.requestUpdate()];
                case 5:
                    _c.sent();
                    supervisionInstance = element.doc.querySelector('IED[name="GOOSE_Subscriber1"] LN[lnClass="LGOS"][inst="4"]');
                    testing_1.expect(supervisionInstance).to.exist;
                    testing_1.expect((_a = supervisionInstance === null || supervisionInstance === void 0 ? void 0 : supervisionInstance.previousElementSibling) === null || _a === void 0 ? void 0 : _a.getAttribute('lnClass')).to.equal('LGOS');
                    testing_1.expect((_b = supervisionInstance === null || supervisionInstance === void 0 ? void 0 : supervisionInstance.previousElementSibling) === null || _b === void 0 ? void 0 : _b.getAttribute('inst')).to.equal('3');
                    return [2 /*return*/];
            }
        });
    }); });
    it('when unsubscribing a subscribed ExtRef then the lists are changed', function () { return __awaiter(void 0, void 0, void 0, function () {
        var fcdaListElement, extRefListElement;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fcdaListElement = test_support_js_1.getFCDABindingList(element);
                    extRefListElement = test_support_js_1.getExtrefLaterBindingList(element);
                    test_support_js_1.selectFCDAItem(fcdaListElement, 'GOOSE_Publisher>>QB2_Disconnector>GOOSE2', 'GOOSE_Publisher>>QB2_Disconnector>GOOSE2sDataSet>QB2_Disconnector/ CSWI 1.Pos q (ST)');
                    return [4 /*yield*/, element.requestUpdate()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, extRefListElement.requestUpdate()];
                case 2:
                    _a.sent();
                    testing_1.expect(extRefListElement['getSubscribedExtRefElements']().length).to.be.equal(2);
                    testing_1.expect(test_support_js_1.getSelectedSubItemValue(fcdaListElement)).to.have.text('2');
                    testing_1.expect(extRefListElement['getAvailableExtRefElements']().length).to.be.equal(5);
                    (extRefListElement.shadowRoot.querySelector('mwc-list-item[value="GOOSE_Subscriber>>Earth_Switch> CSWI 1>Pos;CSWI1/Pos/q[0]"]')).click();
                    return [4 /*yield*/, element.requestUpdate()];
                case 3:
                    _a.sent();
                    testing_1.expect(extRefListElement['getSubscribedExtRefElements']().length).to.be.equal(1);
                    testing_1.expect(test_support_js_1.getSelectedSubItemValue(fcdaListElement)).to.have.text('1');
                    testing_1.expect(extRefListElement['getAvailableExtRefElements']().length).to.be.equal(6);
                    return [2 /*return*/];
            }
        });
    }); });
});
var templateObject_1, templateObject_2, templateObject_3;
