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
require("../../mock-wizard-editor.js");
var connectedap_js_1 = require("../../../src/wizards/connectedap.js");
var foundation_js_1 = require("../../../src/foundation.js");
function isAllMacUnique(parent, serviceType) {
    var allMacs = Array.from(parent.ownerDocument.querySelectorAll(serviceType + " > Address > P[type=\"MAC-Address\"]")).map(function (pType) { return pType.textContent; });
    var set = new Set(allMacs);
    return allMacs.length === set.size;
}
function isAllAppIdUnique(parent, serviceType) {
    var allMacs = Array.from(parent.ownerDocument.querySelectorAll(serviceType + " > Address > P[type=\"APPID\"]")).map(function (pType) { return pType.textContent; });
    var set = new Set(allMacs);
    return allMacs.length === set.size;
}
function clickListItem(element, values) {
    var _a;
    return __awaiter(this, void 0, Promise, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    Array.from(values).forEach(function (value) {
                        var _a;
                        (_a = element.wizardUI
                            .dialog.querySelector("mwc-check-list-item[value=\"" + value + "\"]")) === null || _a === void 0 ? void 0 : _a.click();
                    });
                    return [4 /*yield*/, element.updateComplete];
                case 1:
                    _b.sent();
                    ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-button[slot="primaryAction"]')).click();
                    return [4 /*yield*/, element.updateComplete];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
describe('create wizard for ConnectedAP element', function () {
    var doc;
    var element;
    var parent;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var wizard;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<mock-wizard-editor></mock-wizard-editor>"], ["<mock-wizard-editor></mock-wizard-editor>"]))))];
                case 1:
                    element = (_a.sent());
                    return [4 /*yield*/, fetch('/test/testfiles/wizards/communication.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                case 2:
                    doc = _a.sent();
                    parent = doc.querySelector('SubNetwork');
                    wizard = connectedap_js_1.createConnectedApWizard(parent);
                    element.dispatchEvent(foundation_js_1.newWizardEvent(wizard));
                    return [4 /*yield*/, element.requestUpdate()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).dom.to.equalSnapshot()];
            case 1: return [2 /*return*/, _a.sent()];
        }
    }); }); });
    it('it does not allow to add already connected access points', function () {
        var disabledItems = Array.from(element.wizardUI.dialog.querySelectorAll('mwc-check-list-item')).filter(function (item) { return item.disabled; });
        for (var _i = 0, disabledItems_1 = disabledItems; _i < disabledItems_1.length; _i++) {
            var item = disabledItems_1[_i];
            var _a = item.value.split('>'), iedName = _a[0], apName = _a[1];
            testing_1.expect(doc.querySelector("ConnectedAP[iedName=\"" + iedName + "\"][apName=\"" + apName + "\"]")).to.exist;
        }
    });
    describe('on connecting one new access point', function () {
        it('adds a new ConnectedAP element', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, clickListItem(element, ['GOOSE_Publisher>AP2'])];
                    case 1:
                        _a.sent();
                        testing_1.expect(parent.querySelector('ConnectedAP[iedName="GOOSE_Publisher"][apName="AP2"]')).to.exist;
                        return [2 /*return*/];
                }
            });
        }); });
        describe('with publishing GSEControl or SampledValueControl', function () {
            it('create unique GSE for each GSEControl', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, clickListItem(element, ['GOOSE_Publisher>AP2'])];
                        case 1:
                            _a.sent();
                            testing_1.expect(parent.querySelectorAll('ConnectedAP[iedName="GOOSE_Publisher"][apName="AP2"] ' + '> GSE')).to.have.length(2);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('adds uniques GSE MAC-Address and APPID', function () { return __awaiter(void 0, void 0, void 0, function () {
                var value;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            value = 'GOOSE_Publisher>AP2';
                            return [4 /*yield*/, clickListItem(element, [value])];
                        case 1:
                            _a.sent();
                            testing_1.expect(isAllMacUnique(parent, 'GSE')).to.be["true"];
                            testing_1.expect(isAllAppIdUnique(parent, 'GSE')).to.be["true"];
                            return [2 /*return*/];
                    }
                });
            }); });
            it('create unique SMV for each SampledValueControl', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, clickListItem(element, ['SMV_Publisher>AP1'])];
                        case 1:
                            _a.sent();
                            testing_1.expect(parent.querySelectorAll('ConnectedAP[iedName="SMV_Publisher"][apName="AP1"] ' + '> SMV')).to.have.length(2);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('adds uniques SMV MAC-Address and APPID', function () { return __awaiter(void 0, void 0, void 0, function () {
                var value;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            value = 'SMV_Publisher>AP1';
                            return [4 /*yield*/, clickListItem(element, [value])];
                        case 1:
                            _a.sent();
                            testing_1.expect(isAllMacUnique(parent, 'SMV')).to.be["true"];
                            testing_1.expect(isAllAppIdUnique(parent, 'SMV')).to.be["true"];
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe('on connecting multiple new access point', function () {
        it('adds new ConnectedAP element for each selected acc p', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, clickListItem(element, [
                            'GOOSE_Publisher>AP2',
                            'GOOSE_Publisher>AP3',
                        ])];
                    case 1:
                        _a.sent();
                        testing_1.expect(parent.querySelector('ConnectedAP[iedName="GOOSE_Publisher"][apName="AP2"]')).to.exist;
                        testing_1.expect(parent.querySelector('ConnectedAP[iedName="GOOSE_Publisher"][apName="AP3"]')).to.exist;
                        return [2 /*return*/];
                }
            });
        }); });
        describe('with publishing GSEControl or SampledValueControl', function () {
            it('create unique GSE for each GSEControl', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, clickListItem(element, [
                                'GOOSE_Publisher>AP2',
                                'GOOSE_Publisher>AP3',
                            ])];
                        case 1:
                            _a.sent();
                            testing_1.expect(parent.ownerDocument.querySelectorAll('ConnectedAP[iedName="GOOSE_Publisher"]' + '> GSE')).to.have.length(3);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('adds uniques GSE MAC-Address and APPID', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, clickListItem(element, [
                                'GOOSE_Publisher>AP2',
                                'GOOSE_Publisher2>AP1',
                            ])];
                        case 1:
                            _a.sent();
                            testing_1.expect(isAllMacUnique(parent, 'GSE')).to.be["true"];
                            testing_1.expect(isAllMacUnique(parent, 'GSE')).to.be["true"];
                            return [2 /*return*/];
                    }
                });
            }); });
            it('create unique SMV for each SampledValueControl', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, clickListItem(element, [
                                'SMV_Publisher>AP1',
                                'SMV_Publisher>AP4',
                            ])];
                        case 1:
                            _a.sent();
                            testing_1.expect(parent.ownerDocument.querySelectorAll('ConnectedAP[iedName="SMV_Publisher"] ' + '> SMV')).to.have.length(3);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('adds uniques MAC-Address and APPID', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log('test fails');
                            return [4 /*yield*/, clickListItem(element, [
                                    'SMV_Publisher>AP1',
                                    'SMV_Publisher2>AP1',
                                ])];
                        case 1:
                            _a.sent();
                            testing_1.expect(isAllMacUnique(parent, 'SMV')).to.be["true"];
                            testing_1.expect(isAllAppIdUnique(parent, 'SMV')).to.be["true"];
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
});
var templateObject_1;
