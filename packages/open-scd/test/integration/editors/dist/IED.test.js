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
require("../../../src/editors/IED.js");
var nsdoc_js_1 = require("../../../src/foundation/nsdoc.js");
var IED_js_1 = require("../../../src/editors/IED.js");
describe('IED Plugin', function () {
    if (customElements.get('ied-plugin') === undefined)
        customElements.define('ied-plugin', IED_js_1["default"]);
    var element;
    var parent;
    var nsdoc;
    describe('without a doc loaded', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<mock-open-scd><ied-plugin></ied-plugin></mock-open-scd>"], ["<mock-open-scd><ied-plugin></ied-plugin></mock-open-scd>"]))))];
                    case 1:
                        parent = _a.sent();
                        element = parent.getActivePlugin();
                        return [4 /*yield*/, element.requestUpdate()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, element.updateComplete];
                    case 3:
                        _a.sent();
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
    });
    describe('with a doc loaded', function () {
        var doc;
        describe('containing no IEDs', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fetch('/test/testfiles/editors/iedEditorWithoutIEDs.scd')
                                .then(function (response) { return response.text(); })
                                .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                        case 1:
                            doc = _a.sent();
                            return [4 /*yield*/, nsdoc_js_1.initializeNsdoc()];
                        case 2:
                            nsdoc = _a.sent();
                            return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<mock-open-scd\n            ><ied-plugin .doc=\"", "\" .nsdoc=\"", "\"></ied-plugin\n          ></mock-open-scd>"], ["<mock-open-scd\n            ><ied-plugin .doc=\"", "\" .nsdoc=\"", "\"></ied-plugin\n          ></mock-open-scd>"])), doc, nsdoc))];
                        case 3:
                            parent = _a.sent();
                            element = parent.getActivePlugin();
                            return [4 /*yield*/, element.requestUpdate()];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, element.updateComplete];
                        case 5:
                            _a.sent();
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
        });
        describe('Open Services Wizard', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fetch('/test/testfiles/Services.scd')
                                .then(function (response) { return response.text(); })
                                .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                        case 1:
                            doc = _a.sent();
                            return [4 /*yield*/, nsdoc_js_1.initializeNsdoc()];
                        case 2:
                            nsdoc = _a.sent();
                            return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_3 || (templateObject_3 = __makeTemplateObject(["<mock-open-scd\n            ><ied-plugin .doc=", " .nsdoc=", "></ied-plugin\n          ></mock-open-scd>"], ["<mock-open-scd\n            ><ied-plugin .doc=", " .nsdoc=", "></ied-plugin\n          ></mock-open-scd>"])), doc, nsdoc))];
                        case 3:
                            parent = _a.sent();
                            element = parent.getActivePlugin();
                            return [4 /*yield*/, element.requestUpdate()];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, element.updateComplete];
                        case 5:
                            _a.sent();
                            return [4 /*yield*/, selectIed('WithServices')];
                        case 6:
                            _a.sent();
                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                        case 7:
                            _a.sent(); // await animation
                            return [2 /*return*/];
                    }
                });
            }); });
            it('Should open Services wizard', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            element
                                .shadowRoot.querySelector('ied-container')
                                .shadowRoot.querySelector('mwc-icon-button[icon="settings"]')
                                .click();
                            return [4 /*yield*/, element.requestUpdate()];
                        case 1:
                            _a.sent();
                            testing_1.expect(parent.wizardUI).to.exist;
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('containing IEDs', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fetch('/test/testfiles/editors/iedEditorWithIEDs.scd')
                                .then(function (response) { return response.text(); })
                                .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                        case 1:
                            doc = _a.sent();
                            return [4 /*yield*/, nsdoc_js_1.initializeNsdoc()];
                        case 2:
                            nsdoc = _a.sent();
                            return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_4 || (templateObject_4 = __makeTemplateObject(["<mock-open-scd\n            ><ied-plugin .doc=\"", "\" .nsdoc=\"", "\"></ied-plugin\n          ></mock-open-scd>"], ["<mock-open-scd\n            ><ied-plugin .doc=\"", "\" .nsdoc=\"", "\"></ied-plugin\n          ></mock-open-scd>"])), doc, nsdoc))];
                        case 3:
                            parent = _a.sent();
                            element = parent.getActivePlugin();
                            return [4 /*yield*/, element.requestUpdate()];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, element.updateComplete];
                        case 5:
                            _a.sent();
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
            it('then initially the first IED is selected and rendered', function () {
                var _a, _b, _c, _d;
                testing_1.expect((_a = element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll('ied-container').length).to.eql(1);
                testing_1.expect((_d = (_c = (_b = element.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector('ied-container').shadowRoot) === null || _c === void 0 ? void 0 : _c.querySelector('action-pane').shadowRoot) === null || _d === void 0 ? void 0 : _d.innerHTML).to.include('IED1');
            });
            it('when other IED selected then IED Container contains the correct IED', function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, _b, _c, _d, _e, _f;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            testing_1.expect((_a = element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll('ied-container').length).to.eql(1);
                            testing_1.expect((_c = (_b = getIedContainer().shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector('action-pane').shadowRoot) === null || _c === void 0 ? void 0 : _c.innerHTML).to.include('IED1');
                            return [4 /*yield*/, selectIed('IED3')];
                        case 1:
                            _g.sent();
                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                        case 2:
                            _g.sent(); // await animation
                            testing_1.expect((_d = element.shadowRoot) === null || _d === void 0 ? void 0 : _d.querySelectorAll('ied-container').length).to.eql(1);
                            testing_1.expect((_f = (_e = getIedContainer().shadowRoot) === null || _e === void 0 ? void 0 : _e.querySelector('action-pane').shadowRoot) === null || _f === void 0 ? void 0 : _f.innerHTML).to.include('IED3');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('when filtering LN Classes then correct number of LN Containers are rendered', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            testing_1.expect(getLDeviceContainer(getIedContainer()).shadowRoot.querySelectorAll('ln-container').length).to.eql(5);
                            return [4 /*yield*/, selectLNClasses('CSWI')];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                        case 2:
                            _a.sent(); // await animation
                            testing_1.expect(getLDeviceContainer(getIedContainer()).shadowRoot.querySelectorAll('ln-container').length).to.eql(2);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('when other IED selected, all LNs are selected by default', function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, selectLNClasses('XCBR')];
                        case 1:
                            _d.sent();
                            return [4 /*yield*/, selectIed('IED3')];
                        case 2:
                            _d.sent();
                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                        case 3:
                            _d.sent(); // await animation
                            testing_1.expect((_a = element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll('ied-container').length).to.eql(1);
                            testing_1.expect((_c = (_b = getIedContainer().shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector('action-pane').shadowRoot) === null || _c === void 0 ? void 0 : _c.innerHTML).to.include('IED3');
                            testing_1.expect(getLDeviceContainer(getIedContainer()).shadowRoot.querySelectorAll('ln-container').length).to.eql(9);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('when filtering LNs, if none are selected, all are selected', function () { return __awaiter(void 0, void 0, void 0, function () {
                var oscdFilterButton, filterButton, primaryButton;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, selectIed('IED3')];
                        case 1:
                            _a.sent();
                            oscdFilterButton = (element.shadowRoot.querySelector('oscd-filter-button[id="lnClassesFilter"]'));
                            filterButton = (oscdFilterButton.shadowRoot.querySelector('mwc-icon-button'));
                            filterButton.click();
                            return [4 /*yield*/, element.updateComplete];
                        case 2:
                            _a.sent();
                            primaryButton = (oscdFilterButton.shadowRoot.querySelector('mwc-button[slot="primaryAction"]'));
                            primaryButton.click();
                            return [4 /*yield*/, element.updateComplete];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                        case 4:
                            _a.sent(); // await animation
                            testing_1.expect(getLDeviceContainer(getIedContainer()).shadowRoot.querySelectorAll('ln-container').length).to.eql(9);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('then renders the path of elements correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
                var iedContainer, lDeviceContainer;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            iedContainer = getIedContainer();
                            // Initially there won't be a path shown.
                            testing_1.expect(getElementPathValue()).to.be.empty;
                            // After setting the focus on the IED Container
                            iedContainer.dispatchEvent(new Event('focus'));
                            return [4 /*yield*/, element.updateComplete];
                        case 1:
                            _a.sent();
                            testing_1.expect(getElementPathValue()).to.eql('IED1');
                            lDeviceContainer = getLDeviceContainer(iedContainer);
                            lDeviceContainer.dispatchEvent(new Event('focus'));
                            return [4 /*yield*/, element.updateComplete];
                        case 2:
                            _a.sent();
                            testing_1.expect(getElementPathValue()).to.eql('IED1 / P1 / Server / CircuitBreaker_CB1');
                            // After removing the focus on the IED Container, it will be empty again.
                            iedContainer.dispatchEvent(new Event('blur'));
                            return [4 /*yield*/, element.updateComplete];
                        case 3:
                            _a.sent();
                            testing_1.expect(getElementPathValue()).to.be.empty;
                            return [2 /*return*/];
                    }
                });
            }); });
            // Add test for create wizard DAI when clicking add icon in DA Container (see issue #1139)
            describe('when DA allows for multiple Val', function () {
                beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fetch('/test/testfiles/wizards/settingGroups.scd')
                                    .then(function (response) { return response.text(); })
                                    .then(function (str) {
                                    return new DOMParser().parseFromString(str, 'application/xml');
                                })];
                            case 1:
                                doc = _a.sent();
                                return [4 /*yield*/, nsdoc_js_1.initializeNsdoc()];
                            case 2:
                                nsdoc = _a.sent();
                                return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_5 || (templateObject_5 = __makeTemplateObject(["<mock-open-scd\n              ><ied-plugin .doc=\"", "\" .nsdoc=\"", "\"></ied-plugin\n            ></mock-open-scd>"], ["<mock-open-scd\n              ><ied-plugin .doc=\"", "\" .nsdoc=\"", "\"></ied-plugin\n            ></mock-open-scd>"])), doc, nsdoc))];
                            case 3:
                                parent = _a.sent();
                                element = parent.getActivePlugin();
                                return [4 /*yield*/, element.requestUpdate()];
                            case 4:
                                _a.sent();
                                return [4 /*yield*/, element.updateComplete];
                            case 5:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('shows correct wizard when navigating to the DA container that allows for multiple Val and clicking Add', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var lnContainer, doContainer, daContainer;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                lnContainer = getLDeviceContainerByInst(getIedContainer(), 'stage1').shadowRoot.querySelectorAll('ln-container')[1];
                                lnContainer.shadowRoot.querySelector('mwc-icon-button-toggle').on =
                                    true;
                                return [4 /*yield*/, lnContainer.requestUpdate()];
                            case 1:
                                _a.sent();
                                doContainer = lnContainer
                                    .shadowRoot.querySelector('action-pane')
                                    .querySelector('do-container');
                                doContainer.shadowRoot.querySelector('mwc-icon-button-toggle').on =
                                    true;
                                return [4 /*yield*/, doContainer.requestUpdate()];
                            case 2:
                                _a.sent();
                                daContainer = doContainer.shadowRoot.querySelector('da-container');
                                daContainer
                                    .shadowRoot.querySelector('action-pane')
                                    .querySelector('mwc-icon-button-toggle').on = true;
                                return [4 /*yield*/, daContainer.requestUpdate()];
                            case 3:
                                _a.sent();
                                // await new Promise(resolve => setTimeout(resolve, 100)); // await animation
                                daContainer
                                    .shadowRoot.querySelector('da-container')
                                    .shadowRoot.querySelector('mwc-icon-button[icon="add"]').click();
                                return [4 /*yield*/, parent.updateComplete];
                            case 4:
                                _a.sent();
                                testing_1.expect(parent.wizardUI.dialogs.length).to.equal(1);
                                testing_1.expect(parent.wizardUI.dialogs[0].querySelectorAll('wizard-textfield')
                                    .length).to.equal(3);
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            function getIedContainer() {
                return element.shadowRoot.querySelector('ied-container');
            }
            function getLDeviceContainer(iedContainer) {
                return iedContainer
                    .shadowRoot.querySelector('access-point-container')
                    .shadowRoot.querySelector('server-container')
                    .shadowRoot.querySelector('ldevice-container');
            }
            function getLDeviceContainerByInst(iedContainer, instName) {
                return Array.from(iedContainer
                    .shadowRoot.querySelector('access-point-container')
                    .shadowRoot.querySelector('server-container')
                    .shadowRoot.querySelectorAll('ldevice-container')).find(function (lDevice) { return lDevice.element.getAttribute('inst') === instName; });
            }
            function getElementPathValue() {
                var _a, _b, _c, _d, _e;
                return ((_e = (_d = (_c = (_b = (_a = element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('element-path')) === null || _b === void 0 ? void 0 : _b.shadowRoot) === null || _c === void 0 ? void 0 : _c.querySelector('h3')) === null || _d === void 0 ? void 0 : _d.textContent) !== null && _e !== void 0 ? _e : '');
            }
            function selectLNClasses(lnClass) {
                return __awaiter(this, void 0, Promise, function () {
                    var oscdFilterButton, filterButton, primaryButton;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                oscdFilterButton = (element.shadowRoot.querySelector('oscd-filter-button[id="lnClassesFilter"]'));
                                filterButton = (oscdFilterButton.shadowRoot.querySelector('mwc-icon-button'));
                                filterButton.click();
                                return [4 /*yield*/, element.updateComplete];
                            case 1:
                                _a.sent();
                                (oscdFilterButton.querySelector("mwc-check-list-item[value=\"" + lnClass + "\"]")).click();
                                primaryButton = (oscdFilterButton.shadowRoot.querySelector('mwc-button[slot="primaryAction"]'));
                                primaryButton.click();
                                return [4 /*yield*/, element.updateComplete];
                            case 2:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            }
        });
    });
    function selectIed(name) {
        return __awaiter(this, void 0, Promise, function () {
            var oscdFilterButton, filterButton, selectItem, primaryButton;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        oscdFilterButton = element.shadowRoot.querySelector('oscd-filter-button[id="iedFilter"]');
                        filterButton = (oscdFilterButton.shadowRoot.querySelector('mwc-icon-button'));
                        filterButton.click();
                        return [4 /*yield*/, element.updateComplete];
                    case 1:
                        _a.sent();
                        selectItem = (oscdFilterButton.querySelector("mwc-radio-list-item[value=\"" + name + "\"]"));
                        selectItem.click();
                        primaryButton = (oscdFilterButton.shadowRoot.querySelector('mwc-button[slot="primaryAction"]'));
                        primaryButton.click();
                        return [4 /*yield*/, element.updateComplete];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
