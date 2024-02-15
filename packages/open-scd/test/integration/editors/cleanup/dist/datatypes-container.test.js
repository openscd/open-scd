'use strict';
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
var datatypes_container_js_1 = require("../../../../src/editors/cleanup/datatypes-container.js");
var foundation_js_1 = require("../../../../src/editors/cleanup/foundation.js");
describe('cleanup-editor integration: unreferenced control blocks', function () {
    customElements.define('cleanup-plugin-data-types', datatypes_container_js_1.CleanupDataTypes);
    var element;
    var parent;
    describe('without a doc loaded', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<mock-open-scd\n          ><cleanup-plugin-data-types .doc=\"", "\"></cleanup-plugin-data-types\n        ></mock-open-scd>"], ["<mock-open-scd\n          ><cleanup-plugin-data-types .doc=\"", "\"></cleanup-plugin-data-types\n        ></mock-open-scd>"])), null))];
                    case 1:
                        parent = _a.sent();
                        element = parent.getActivePlugin();
                        return [4 /*yield*/, parent.updateComplete];
                    case 2:
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
    describe('with a test file loaded', function () {
        var doc;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/cleanup.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        doc = _a.sent();
                        return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<mock-open-scd\n          ><cleanup-plugin-data-types .doc=\"", "\"></cleanup-plugin-data-types\n        ></mock-open-scd>"], ["<mock-open-scd\n          ><cleanup-plugin-data-types .doc=\"", "\"></cleanup-plugin-data-types\n        ></mock-open-scd>"])), doc))];
                    case 2:
                        parent = _a.sent();
                        element = parent.getActivePlugin();
                        return [4 /*yield*/, parent.updateComplete];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('correctly removes a LNodeType entry from the SCL', function () { return __awaiter(void 0, void 0, void 0, function () {
            var checkbox;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, element.cleanupDOTypeFilter.click()];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, element.cleanupDATypeFilter.click()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, element.cleanupEnumTypeFilter.click()];
                    case 3:
                        _b.sent();
                        checkbox = element
                            .shadowRoot.querySelector('.cleanup-list')
                            .shadowRoot.querySelector('mwc-formfield')
                            .querySelector('mwc-checkbox');
                        return [4 /*yield*/, checkbox.click()];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, ((_a = element.cleanupList) === null || _a === void 0 ? void 0 : _a.layout())];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, element.cleanButton.click()];
                    case 6:
                        _b.sent();
                        // the correct number of LNodeTypes should remain
                        testing_1.expect(element.doc.querySelectorAll('LNodeType')).to.have.length(12);
                        testing_1.expect(element.doc.querySelectorAll('LNodeType[id="NotUsedTVTR"]')).to.have.length(0);
                        return [2 /*return*/];
                }
            });
        }); });
        it('correctly removes DOTypes and SDOs from the SCL', function () { return __awaiter(void 0, void 0, void 0, function () {
            var checkbox;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, element.cleanupLNodeTypeFilter.click()];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, element.cleanupDATypeFilter.click()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, element.cleanupEnumTypeFilter.click()];
                    case 3:
                        _b.sent();
                        checkbox = element
                            .shadowRoot.querySelector('.cleanup-list')
                            .shadowRoot.querySelector('mwc-formfield')
                            .querySelector('mwc-checkbox');
                        return [4 /*yield*/, checkbox.click()];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, ((_a = element.cleanupList) === null || _a === void 0 ? void 0 : _a.layout())];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, element.cleanButton.click()];
                    case 6:
                        _b.sent();
                        // the correct number of DOTypes should remain
                        testing_1.expect(element.doc.querySelectorAll('DOType')).to.have.lengthOf(32);
                        testing_1.expect(element.doc.querySelectorAll('DOType[id="NotUsedDummy.SPS"], DOType[name="WYE_2_3"], DOType[id="CMV_1"]')).to.have.lengthOf(0);
                        return [2 /*return*/];
                }
            });
        }); });
        it('correctly removes DATypes and those referenced via BDAs from the SCL', function () { return __awaiter(void 0, void 0, void 0, function () {
            var checkbox;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, element.cleanupLNodeTypeFilter.click()];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, element.cleanupDOTypeFilter.click()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, element.cleanupEnumTypeFilter.click()];
                    case 3:
                        _b.sent();
                        checkbox = element
                            .shadowRoot.querySelector('.cleanup-list')
                            .shadowRoot.querySelector('mwc-formfield')
                            .querySelector('mwc-checkbox');
                        return [4 /*yield*/, checkbox.click()];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, ((_a = element.cleanupList) === null || _a === void 0 ? void 0 : _a.layout())];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, element.cleanButton.click()];
                    case 6:
                        _b.sent();
                        testing_1.expect(element.doc.querySelectorAll('DAType')).to.have.lengthOf(15);
                        testing_1.expect(element.doc.querySelectorAll('DAType[id="NotUsedDummy.LPHD1.Sim.Cancel"], DAType[id="OnlySubUsedVector_0"], DAType[id="AnalogValue_0"]')).to.have.lengthOf(0);
                        return [2 /*return*/];
                }
            });
        }); });
        it('correctly removes EnumTypes', function () { return __awaiter(void 0, void 0, void 0, function () {
            var checkbox;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, element.cleanupLNodeTypeFilter.click()];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, element.cleanupDOTypeFilter.click()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, element.cleanupDATypeFilter.click()];
                    case 3:
                        _b.sent();
                        checkbox = element
                            .shadowRoot.querySelector('.cleanup-list')
                            .shadowRoot.querySelector('mwc-formfield')
                            .querySelector('mwc-checkbox');
                        return [4 /*yield*/, checkbox.click()];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, ((_a = element.cleanupList) === null || _a === void 0 ? void 0 : _a.layout())];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, element.cleanButton.click()];
                    case 6:
                        _b.sent();
                        testing_1.expect(element.doc.querySelectorAll('EnumType')).to.have.lengthOf(11);
                        testing_1.expect(element.doc.querySelectorAll('EnumType[id="NotUsedDir"]')).to.have.lengthOf(0);
                        return [2 /*return*/];
                }
            });
        }); });
        describe('if the Remove subtypes checkbox is unchecked', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            element.cleanSubTypesCheckbox.checked = false;
                            return [4 /*yield*/, element.cleanSubTypesCheckbox.requestUpdate()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('correctly removes two DOTypes and not those referenced via an SDO from the SCL', function () { return __awaiter(void 0, void 0, void 0, function () {
                var checkbox;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, element.cleanupLNodeTypeFilter.click()];
                        case 1:
                            _b.sent();
                            return [4 /*yield*/, element.cleanupDATypeFilter.click()];
                        case 2:
                            _b.sent();
                            return [4 /*yield*/, element.cleanupEnumTypeFilter.click()];
                        case 3:
                            _b.sent();
                            checkbox = element
                                .shadowRoot.querySelector('.cleanup-list')
                                .shadowRoot.querySelector('mwc-formfield')
                                .querySelector('mwc-checkbox');
                            return [4 /*yield*/, checkbox.click()];
                        case 4:
                            _b.sent();
                            return [4 /*yield*/, ((_a = element.cleanupList) === null || _a === void 0 ? void 0 : _a.layout())];
                        case 5:
                            _b.sent();
                            return [4 /*yield*/, element.cleanButton.click()];
                        case 6:
                            _b.sent();
                            // the correct number of DOTypes should remain
                            testing_1.expect(element.doc.querySelectorAll('DOType')).to.have.lengthOf(33);
                            testing_1.expect(element.doc.querySelectorAll('DOType[id="NotUsedDummy.SPS"], DOType[id="WYE_2_3"], DOType[id="Dummy.LLN0.Health.Unused]')).to.have.lengthOf(0);
                            testing_1.expect(element.doc.querySelectorAll('DOType[id="CMV_1"]')).to.have.lengthOf(1);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('correctly removes DATypes and _not_ those referenced via a BDA from the SCL', function () { return __awaiter(void 0, void 0, void 0, function () {
                var checkbox;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, element.cleanupLNodeTypeFilter.click()];
                        case 1:
                            _b.sent();
                            return [4 /*yield*/, element.cleanupDOTypeFilter.click()];
                        case 2:
                            _b.sent();
                            return [4 /*yield*/, element.cleanupEnumTypeFilter.click()];
                        case 3:
                            _b.sent();
                            checkbox = element
                                .shadowRoot.querySelector('.cleanup-list')
                                .shadowRoot.querySelector('mwc-formfield')
                                .querySelector('mwc-checkbox');
                            return [4 /*yield*/, checkbox.click()];
                        case 4:
                            _b.sent();
                            return [4 /*yield*/, ((_a = element.cleanupList) === null || _a === void 0 ? void 0 : _a.layout())];
                        case 5:
                            _b.sent();
                            return [4 /*yield*/, element.cleanButton.click()];
                        case 6:
                            _b.sent();
                            // the correct number of DATypes should remain
                            testing_1.expect(element.doc.querySelectorAll('DAType')).to.have.lengthOf(16);
                            testing_1.expect(element.doc.querySelectorAll('DAType[id="NotUsedDummy.LPHD1.Sim.Cancel"], DAType[id="OnlySubUsedVector_0"]')).to.have.lengthOf(0);
                            testing_1.expect(element.doc.querySelectorAll('DAType[id="AnalogValue_0"]')).to.have.lengthOf(1);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('if the LN filter is disabled', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var checkbox;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, element.cleanupLNodeTypeFilter.click()];
                            case 1:
                                _b.sent();
                                checkbox = element
                                    .shadowRoot.querySelector('.cleanup-list')
                                    .shadowRoot.querySelector('mwc-formfield')
                                    .querySelector('mwc-checkbox');
                                return [4 /*yield*/, checkbox.click()];
                            case 2:
                                _b.sent();
                                return [4 /*yield*/, ((_a = element.cleanupList) === null || _a === void 0 ? void 0 : _a.layout())];
                            case 3:
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('creates the correct number of Delete actions', function () {
                    var deleteActions = foundation_js_1.cleanSCLItems(element.getCleanItems());
                    testing_1.expect(deleteActions.length).to.equal(14);
                });
                return [2 /*return*/];
            });
        }); });
        describe('if the DO filter is disabled', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var checkbox;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, element.cleanupDOTypeFilter.click()];
                            case 1:
                                _b.sent();
                                checkbox = element
                                    .shadowRoot.querySelector('.cleanup-list')
                                    .shadowRoot.querySelector('mwc-formfield')
                                    .querySelector('mwc-checkbox');
                                return [4 /*yield*/, checkbox.click()];
                            case 2:
                                _b.sent();
                                (_a = element.cleanupList) === null || _a === void 0 ? void 0 : _a.layout();
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('creates the correct number of Delete actions (LNx1, DAx3, ENx1)', function () {
                    var deleteActions = foundation_js_1.cleanSCLItems(element.getCleanItems());
                    testing_1.expect(deleteActions.length).to.equal(26);
                });
                return [2 /*return*/];
            });
        }); });
        describe('if the DA filter is disabled', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var checkbox;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, element.cleanupDATypeFilter.click()];
                            case 1:
                                _b.sent();
                                checkbox = element
                                    .shadowRoot.querySelector('.cleanup-list')
                                    .shadowRoot.querySelector('mwc-formfield')
                                    .querySelector('mwc-checkbox');
                                return [4 /*yield*/, checkbox.click()];
                            case 2:
                                _b.sent();
                                (_a = element.cleanupList) === null || _a === void 0 ? void 0 : _a.layout();
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('creates the correct number of Delete Actions', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var deleteActions;
                    return __generator(this, function (_a) {
                        deleteActions = foundation_js_1.cleanSCLItems(element.getCleanItems());
                        testing_1.expect(deleteActions.length).to.equal(29);
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
            });
        }); });
        describe('if the EN filter is disabled', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var checkbox;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, element.cleanupEnumTypeFilter.click()];
                            case 1:
                                _b.sent();
                                checkbox = element
                                    .shadowRoot.querySelector('.cleanup-list')
                                    .shadowRoot.querySelector('mwc-formfield')
                                    .querySelector('mwc-checkbox');
                                return [4 /*yield*/, checkbox.click()];
                            case 2:
                                _b.sent();
                                (_a = element.cleanupList) === null || _a === void 0 ? void 0 : _a.layout();
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('creates the correct number of Delete Actions', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var deleteActions;
                    return __generator(this, function (_a) {
                        deleteActions = foundation_js_1.cleanSCLItems(element.getCleanItems());
                        testing_1.expect(deleteActions.length).to.equal(33);
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
            });
        }); });
    });
});
var templateObject_1, templateObject_2;
