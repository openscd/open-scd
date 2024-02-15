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
require("../../../mock-open-scd.js");
require("../../../../src/editors/subscription/fcda-binding-list.js");
var sinon_1 = require("sinon");
describe('fcda-binding-list', function () {
    var parent;
    var element;
    var doc;
    var selectEvent;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            localStorage.clear();
            selectEvent = sinon_1.spy();
            window.addEventListener('fcda-select', selectEvent);
            return [2 /*return*/];
        });
    }); });
    describe('without a doc loaded', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        <mock-open-scd>\n          <fcda-binding-list></fcda-binding-list>\n        </mock-open-scd>\n      "], ["\n        <mock-open-scd>\n          <fcda-binding-list></fcda-binding-list>\n        </mock-open-scd>\n      "]))))];
                    case 1:
                        parent = _a.sent();
                        element = parent.getActivePlugin();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('no event is fired, because no property are changed', function () {
            testing_1.expect(selectEvent).to.not.have.been.called;
        });
        it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<fcda-binding-list></fcda-binding-list>"], ["<fcda-binding-list></fcda-binding-list>"]))))];
                    case 1:
                        element = _a.sent();
                        return [4 /*yield*/, testing_1.expect(element).shadowDom.to.equalSnapshot()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('with a SampledValueControl doc loaded', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        localStorage.clear();
                        return [4 /*yield*/, fetch('/test/testfiles/editors/LaterBindingSMV2007B4.scd')
                                .then(function (response) { return response.text(); })
                                .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        doc = _a.sent();
                        return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n        <mock-open-scd>\n          <fcda-binding-list\n            .doc=", "\n            controlTag=\"SampledValueControl\"\n            .includeLaterBinding=\"", "\"\n          ></fcda-binding-list>\n        </mock-open-scd>\n      "], ["\n        <mock-open-scd>\n          <fcda-binding-list\n            .doc=", "\n            controlTag=\"SampledValueControl\"\n            .includeLaterBinding=\"", "\"\n          ></fcda-binding-list>\n        </mock-open-scd>\n      "])), doc, true))];
                    case 2:
                        parent = _a.sent();
                        element = parent.getActivePlugin();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('the SVC editor is opened', function () { return __awaiter(void 0, void 0, void 0, function () {
            var nameField;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: 
                    // Select the first list item that has an edit button, this should be an SVC Element.
                    return [4 /*yield*/, ((_a = element === null || element === void 0 ? void 0 : element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-list-item > mwc-icon-button[icon="edit"]')).click()];
                    case 1:
                        // Select the first list item that has an edit button, this should be an SVC Element.
                        _c.sent();
                        return [4 /*yield*/, parent.updateComplete];
                    case 2:
                        _c.sent();
                        nameField = ((_b = parent.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('wizard-textfield[label="name"]'));
                        testing_1.expect(nameField.value).to.be.equal('fullSmv');
                        return [2 /*return*/];
                }
            });
        }); });
        it('event is fired, but properties are undefined', function () {
            testing_1.expect(selectEvent).to.have.been.calledOnce;
            testing_1.expect(selectEvent.args[0][0].detail.selectedSvcElement).to.be.undefined;
            testing_1.expect(selectEvent.args[0][0].detail.selectedFcdaElement).to.be.undefined;
        });
        it('event is fired with selected elements', function () { return __awaiter(void 0, void 0, void 0, function () {
            var listItem;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        selectEvent.resetHistory();
                        listItem = Array.from((_b = (_a = element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll('mwc-list-item.subitem')) !== null && _b !== void 0 ? _b : []).filter(function (listItem) {
                            var _a;
                            var value = (_a = listItem.getAttribute('value')) !== null && _a !== void 0 ? _a : '';
                            return (value.includes('currentOnly') && value.includes('AmpSv instMag.i'));
                        })[0];
                        listItem.click();
                        return [4 /*yield*/, element.updateComplete];
                    case 1:
                        _c.sent();
                        testing_1.expect(selectEvent).to.have.been.called;
                        testing_1.expect(selectEvent.args[0][0].detail.control).to.equal(doc.querySelector('IED[name="SMV_Publisher"] LN0 > SampledValueControl[name="currentOnly"]'));
                        testing_1.expect(selectEvent.args[0][0].detail.fcda).to.equal(doc.querySelector('IED[name="SMV_Publisher"] LN0 > DataSet[name="currentOnlysDataSet"] > ' +
                            'FCDA[ldInst="CurrentTransformer"][prefix="L1"][lnClass="TCTR"][lnInst="1"][doName="AmpSv"][daName="instMag.i"][fc="MX"]'));
                        return [2 /*return*/];
                }
            });
        }); });
        it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.expect(element).shadowDom.to.equalSnapshot()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('is initially unfiltered', function () { return __awaiter(void 0, void 0, void 0, function () {
            var displayedElements;
            return __generator(this, function (_a) {
                displayedElements = Array.from(element.shadowRoot.querySelectorAll('mwc-list-item')).filter(function (item) {
                    var displayStyle = getComputedStyle(item).display;
                    return displayStyle !== 'none' || displayStyle === undefined;
                });
                testing_1.expect(displayedElements.length).to.equal(27);
                return [2 /*return*/];
            });
        }); });
        it('allows filtering of only not subscribed control blocks', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fcdaList, displayedElements;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        element.actionsMenuIcon.click();
                        return [4 /*yield*/, element.updateComplete];
                    case 1:
                        _b.sent();
                        (element.actionsMenu.querySelector('.filter-subscribed')).click();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 200); })];
                    case 2:
                        _b.sent(); // await animation
                        return [4 /*yield*/, element.updateComplete];
                    case 3:
                        _b.sent();
                        fcdaList = (_a = element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('filtered-list');
                        displayedElements = Array.from(fcdaList.querySelectorAll('mwc-list-item')).filter(function (item) {
                            var displayStyle = getComputedStyle(item).display;
                            return displayStyle !== 'none' || displayStyle === undefined;
                        });
                        testing_1.expect(displayedElements.length).to.equal(24);
                        return [2 /*return*/];
                }
            });
        }); });
        it('allows filtering of only subscribed control blocks', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fcdaList, displayedElements;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        element.actionsMenuIcon.click();
                        return [4 /*yield*/, element.updateComplete];
                    case 1:
                        _b.sent();
                        (element.actionsMenu.querySelector('.filter-not-subscribed')).click();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 200); })];
                    case 2:
                        _b.sent(); // await animation
                        return [4 /*yield*/, element.updateComplete];
                    case 3:
                        _b.sent();
                        fcdaList = (_a = element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('filtered-list');
                        displayedElements = Array.from(fcdaList.querySelectorAll('mwc-list-item')).filter(function (item) {
                            var displayStyle = getComputedStyle(item).display;
                            return displayStyle !== 'none' || displayStyle === undefined;
                        });
                        testing_1.expect(displayedElements.length).to.equal(5);
                        return [2 /*return*/];
                }
            });
        }); });
        it('allows filtering out of all subscribed control blocks', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fcdaList, displayedElements;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        element.actionsMenuIcon.click();
                        return [4 /*yield*/, element.updateComplete];
                    case 1:
                        _b.sent();
                        (element.actionsMenu.querySelector('.filter-subscribed')).click();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 300); })];
                    case 2:
                        _b.sent(); // await animation
                        return [4 /*yield*/, element.updateComplete];
                    case 3:
                        _b.sent();
                        element.actionsMenuIcon.click();
                        return [4 /*yield*/, element.updateComplete];
                    case 4:
                        _b.sent();
                        (element.actionsMenu.querySelector('.filter-not-subscribed')).click();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 300); })];
                    case 5:
                        _b.sent(); // await animation
                        return [4 /*yield*/, element.updateComplete];
                    case 6:
                        _b.sent();
                        fcdaList = (_a = element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('filtered-list');
                        displayedElements = Array.from(fcdaList.querySelectorAll('mwc-list-item')).filter(function (item) {
                            var displayStyle = getComputedStyle(item).display;
                            return displayStyle !== 'none' || displayStyle === undefined;
                        });
                        testing_1.expect(displayedElements.length).to.equal(0);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('with a GSEControl doc loaded', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        localStorage.clear();
                        return [4 /*yield*/, fetch('/test/testfiles/editors/LaterBindingGOOSE2007B4.scd')
                                .then(function (response) { return response.text(); })
                                .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        doc = _a.sent();
                        return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n        <mock-open-scd>\n          <fcda-binding-list\n            .doc=", "\n            controlTag=\"GSEControl\"\n            .includeLaterBinding=\"", "\"\n          ></fcda-binding-list>\n        </mock-open-scd>\n      "], ["\n        <mock-open-scd>\n          <fcda-binding-list\n            .doc=", "\n            controlTag=\"GSEControl\"\n            .includeLaterBinding=\"", "\"\n          ></fcda-binding-list>\n        </mock-open-scd>\n      "])), doc, true))];
                    case 2:
                        parent = _a.sent();
                        element = parent.getActivePlugin();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('the GOOSE editor is opened', function () { return __awaiter(void 0, void 0, void 0, function () {
            var nameField;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: 
                    // Select the first list item that has an edit button, this should be an GOOSE Element.
                    return [4 /*yield*/, ((_a = element === null || element === void 0 ? void 0 : element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-list-item > mwc-icon-button[icon="edit"]')).click()];
                    case 1:
                        // Select the first list item that has an edit button, this should be an GOOSE Element.
                        _c.sent();
                        return [4 /*yield*/, parent.updateComplete];
                    case 2:
                        _c.sent();
                        nameField = ((_b = parent.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('wizard-textfield[label="name"]'));
                        testing_1.expect(nameField.value).to.be.equal('GOOSE2');
                        return [2 /*return*/];
                }
            });
        }); });
        it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.expect(element).shadowDom.to.equalSnapshot()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('is initially unfiltered', function () { return __awaiter(void 0, void 0, void 0, function () {
            var displayedElements;
            return __generator(this, function (_a) {
                displayedElements = Array.from(element.shadowRoot.querySelectorAll('mwc-list-item')).filter(function (item) {
                    var displayStyle = getComputedStyle(item).display;
                    return displayStyle !== 'none' || displayStyle === undefined;
                });
                testing_1.expect(displayedElements.length).to.equal(9);
                return [2 /*return*/];
            });
        }); });
        it('allows filtering of only not subscribed control blocks', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fcdaList, displayedElements;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        element.actionsMenuIcon.click();
                        return [4 /*yield*/, element.updateComplete];
                    case 1:
                        _b.sent();
                        (element.actionsMenu.querySelector('.filter-subscribed')).click();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 300); })];
                    case 2:
                        _b.sent(); // await animation
                        return [4 /*yield*/, element.updateComplete];
                    case 3:
                        _b.sent();
                        fcdaList = (_a = element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('filtered-list');
                        displayedElements = Array.from(fcdaList.querySelectorAll('mwc-list-item')).filter(function (item) {
                            var displayStyle = getComputedStyle(item).display;
                            return displayStyle !== 'none' || displayStyle === undefined;
                        });
                        testing_1.expect(displayedElements.length).to.equal(3);
                        return [2 /*return*/];
                }
            });
        }); });
        it('allows filtering of only subscribed control blocks', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fcdaList, displayedElements;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        element.actionsMenuIcon.click();
                        return [4 /*yield*/, element.updateComplete];
                    case 1:
                        _b.sent();
                        (element.actionsMenu.querySelector('.filter-not-subscribed')).click();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 300); })];
                    case 2:
                        _b.sent(); // await animation
                        return [4 /*yield*/, element.updateComplete];
                    case 3:
                        _b.sent();
                        fcdaList = (_a = element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('filtered-list');
                        displayedElements = Array.from(fcdaList.querySelectorAll('mwc-list-item')).filter(function (item) {
                            var displayStyle = getComputedStyle(item).display;
                            return displayStyle !== 'none' || displayStyle === undefined;
                        });
                        testing_1.expect(displayedElements.length).to.equal(6);
                        return [2 /*return*/];
                }
            });
        }); });
        it('allows filtering out of all subscribed control blocks', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fcdaList, displayedElements;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        element.actionsMenuIcon.click();
                        return [4 /*yield*/, element.updateComplete];
                    case 1:
                        _b.sent();
                        (element.actionsMenu.querySelector('.filter-subscribed')).click();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 300); })];
                    case 2:
                        _b.sent(); // await animation
                        return [4 /*yield*/, element.updateComplete];
                    case 3:
                        _b.sent();
                        element.actionsMenuIcon.click();
                        return [4 /*yield*/, element.updateComplete];
                    case 4:
                        _b.sent();
                        (element.actionsMenu.querySelector('.filter-not-subscribed')).click();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 300); })];
                    case 5:
                        _b.sent(); // await animation
                        return [4 /*yield*/, element.updateComplete];
                    case 6:
                        _b.sent();
                        fcdaList = (_a = element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('filtered-list');
                        displayedElements = Array.from(fcdaList.querySelectorAll('mwc-list-item')).filter(function (item) {
                            var displayStyle = getComputedStyle(item).display;
                            return displayStyle !== 'none' || displayStyle === undefined;
                        });
                        testing_1.expect(displayedElements.length).to.equal(0);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
