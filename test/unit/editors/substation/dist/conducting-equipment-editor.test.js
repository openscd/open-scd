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
var sinon_1 = require("sinon");
require("../../../../src/editors/substation/conducting-equipment-editor.js");
var foundation_js_1 = require("../../../../src/foundation.js");
describe('conducting-equipment-editor', function () {
    var element;
    var validSCL;
    var wizardEvent;
    var actionEvent;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('/test/testfiles/valid2007B4.scd')
                        .then(function (response) { return response.text(); })
                        .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                case 1:
                    validSCL = _a.sent();
                    return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<conducting-equipment-editor\n          .element=", "\n        ></conducting-equipment-editor>"], ["<conducting-equipment-editor\n          .element=", "\n        ></conducting-equipment-editor>"])), validSCL.querySelector('ConductingEquipment')))];
                case 2:
                    element = (_a.sent());
                    wizardEvent = sinon_1.spy();
                    window.addEventListener('wizard', wizardEvent);
                    actionEvent = sinon_1.spy();
                    window.addEventListener('editor-action', actionEvent);
                    return [2 /*return*/];
            }
        });
    }); });
    describe('rendered as action icon', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        element.showfunctions = false;
                        return [4 /*yield*/, element.requestUpdate()];
                    case 1:
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
        it('renders empty string in case ConductingEquipment name attribute is missing', function () { return __awaiter(void 0, void 0, void 0, function () {
            var condEq;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        condEq = validSCL.querySelector('ConductingEquipment');
                        condEq === null || condEq === void 0 ? void 0 : condEq.removeAttribute('name');
                        return [4 /*yield*/, element.requestUpdate()];
                    case 1:
                        _a.sent();
                        testing_1.expect(element).to.have.property('name', '');
                        return [2 /*return*/];
                }
            });
        }); });
        it('triggers edit wizard for LNode element on action button click', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ((_a = element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-fab[icon="account_tree"]')).click();
                        return [4 /*yield*/, element.requestUpdate()];
                    case 1:
                        _b.sent();
                        testing_1.expect(wizardEvent).to.have.be.calledOnce;
                        testing_1.expect(wizardEvent.args[0][0].detail.wizard()[0].title).to.contain('lnode');
                        return [2 /*return*/];
                }
            });
        }); });
        it('triggers edit wizard for ConductingEquipment element on action button click', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ((_a = element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-fab[icon="edit"]')).click();
                        return [4 /*yield*/, element.requestUpdate()];
                    case 1:
                        _b.sent();
                        testing_1.expect(wizardEvent).to.have.be.calledOnce;
                        testing_1.expect(wizardEvent.args[0][0].detail.wizard()[0].title).to.contain('edit');
                        return [2 /*return*/];
                }
            });
        }); });
        it('triggers remove action on action button click', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ((_a = element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-fab[icon="delete"]')).click();
                        return [4 /*yield*/, element.requestUpdate()];
                    case 1:
                        _b.sent();
                        testing_1.expect(wizardEvent).to.not.have.been.called;
                        testing_1.expect(actionEvent).to.have.been.calledOnce;
                        testing_1.expect(actionEvent.args[0][0].detail.action).to.satisfy(foundation_js_1.isDelete);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('rendered as action pane', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        element.showfunctions = true;
                        return [4 /*yield*/, element.requestUpdate()];
                    case 1:
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
        describe('with EqFunction children', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var doc;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fetch('/test/testfiles/zeroline/functions.scd')
                                .then(function (response) { return response.text(); })
                                .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                        case 1:
                            doc = _a.sent();
                            element.element = doc.querySelector('Bay[name="COUPLING_BAY"] > ConductingEquipment[name="QA1"]');
                            return [4 /*yield*/, element.requestUpdate()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.expect(element).shadowDom.to.equalSnapshot()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); });
        });
        describe('with LNode children', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var doc;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fetch('/test/testfiles/zeroline/functions.scd')
                                .then(function (response) { return response.text(); })
                                .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                        case 1:
                            doc = _a.sent();
                            element.element = doc.querySelector('Bay[name="COUPLING_BAY"] > ConductingEquipment[name="QC9"]');
                            return [4 /*yield*/, element.requestUpdate()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.expect(element).shadowDom.to.equalSnapshot()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); });
        });
        describe('with SubEquipment children', function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var doc;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fetch('/test/testfiles/SubEquipment.scd')
                                .then(function (response) { return response.text(); })
                                .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                        case 1:
                            doc = _a.sent();
                            element.element = doc.querySelector('ConductingEquipment[name="QA1"]');
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
                        case 0: return [4 /*yield*/, testing_1.expect(element).shadowDom.to.equalSnapshot()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        it('renders empty string in case ConductingEquipment name attribute is missing', function () { return __awaiter(void 0, void 0, void 0, function () {
            var condEq;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        condEq = validSCL.querySelector('ConductingEquipment');
                        condEq === null || condEq === void 0 ? void 0 : condEq.removeAttribute('name');
                        return [4 /*yield*/, element.requestUpdate()];
                    case 1:
                        _a.sent();
                        testing_1.expect(element).to.have.property('name', '');
                        return [2 /*return*/];
                }
            });
        }); });
        it('triggers edit wizard for LNode element on action button click', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ((_a = element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-icon-button[icon="account_tree"]')).click();
                        return [4 /*yield*/, element.requestUpdate()];
                    case 1:
                        _b.sent();
                        testing_1.expect(wizardEvent).to.have.be.calledOnce;
                        testing_1.expect(wizardEvent.args[0][0].detail.wizard()[0].title).to.contain('lnode');
                        return [2 /*return*/];
                }
            });
        }); });
        it('triggers edit wizard for ConductingEquipment element on action button click', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ((_a = element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-icon-button[icon="edit"]')).click();
                        return [4 /*yield*/, element.requestUpdate()];
                    case 1:
                        _b.sent();
                        testing_1.expect(wizardEvent).to.have.be.calledOnce;
                        testing_1.expect(wizardEvent.args[0][0].detail.wizard()[0].title).to.contain('edit');
                        return [2 /*return*/];
                }
            });
        }); });
        it('triggers remove action on action button click', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ((_a = element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-icon-button[icon="delete"]')).click();
                        return [4 /*yield*/, element.requestUpdate()];
                    case 1:
                        _b.sent();
                        testing_1.expect(wizardEvent).to.not.have.been.called;
                        testing_1.expect(actionEvent).to.have.been.calledOnce;
                        testing_1.expect(actionEvent.args[0][0].detail.action).to.satisfy(foundation_js_1.isDelete);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
var templateObject_1;
