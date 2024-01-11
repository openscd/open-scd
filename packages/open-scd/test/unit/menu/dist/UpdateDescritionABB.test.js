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
require("../../mock-wizard.js");
var foundation_js_1 = require("../../../src/foundation.js");
var UpdateDescriptionABB_js_1 = require("../../../src/menu/UpdateDescriptionABB.js");
describe('Update method for desc attributes in ABB IEDs', function () {
    if (customElements.get('update-description-abb') === undefined)
        customElements.define('update-description-abb', UpdateDescriptionABB_js_1["default"]);
    var parent;
    var element;
    var editorAction;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      <mock-wizard\n        ><update-description-abb></update-description-abb\n      ></mock-wizard>\n    "], ["\n      <mock-wizard\n        ><update-description-abb></update-description-abb\n      ></mock-wizard>\n    "]))))];
                case 1:
                    parent = _a.sent();
                    element = (parent.querySelector('update-description-abb'));
                    editorAction = sinon_1.spy();
                    window.addEventListener('editor-action', editorAction);
                    return [2 /*return*/];
            }
        });
    }); });
    describe('working on SCL files without manufacturer ABB', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var doc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/validators/zeroissues.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        doc = _a.sent();
                        element.doc = doc;
                        element.run();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('creates an empty wizard indicating not found desc updates', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.expect(parent.wizardUI.dialog).to.equalSnapshot()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('working on SCL files containing manufacturer ABB', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var doc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/updatedesc/updatedescABB.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        doc = _a.sent();
                        element.doc = doc;
                        element.run();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('creates a wizard with all valid desc update possibilities', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.expect(parent.wizardUI.dialog).to.equalSnapshot()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('creates wizard that on save triggers a complex action containing selected desc updates', function () { return __awaiter(void 0, void 0, void 0, function () {
            var complexAction, _i, _a, action;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        (_c = (_b = parent.wizardUI) === null || _b === void 0 ? void 0 : _b.dialog) === null || _c === void 0 ? void 0 : _c.querySelector('mwc-button[slot="primaryAction"]').click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _d.sent();
                        testing_1.expect(editorAction).to.have.been.calledOnce;
                        testing_1.expect(editorAction.args[0][0].detail.action).to.not.satisfy(foundation_js_1.isSimple);
                        complexAction = (editorAction.args[0][0].detail.action);
                        testing_1.expect(complexAction.actions.length).to.equal(2);
                        for (_i = 0, _a = complexAction.actions; _i < _a.length; _i++) {
                            action = _a[_i];
                            testing_1.expect(action).to.satisfy(foundation_js_1.isReplace);
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
var templateObject_1;
