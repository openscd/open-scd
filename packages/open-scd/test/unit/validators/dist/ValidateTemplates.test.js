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
require("../../mock-open-scd.js");
var ValidateTemplates_js_1 = require("../../../src/validators/ValidateTemplates.js");
describe('ValidateTemplates', function () {
    if (customElements.get('validate-templates') === undefined)
        customElements.define('validate-templates', ValidateTemplates_js_1["default"]);
    var logEvent;
    var issueEvent;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            logEvent = sinon_1.spy();
            issueEvent = sinon_1.spy();
            window.addEventListener('log', logEvent);
            window.addEventListener('issue', issueEvent);
            return [2 /*return*/];
        });
    }); });
    describe('dispatch', function () {
        var element;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var doc, parent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/validators/zeroissues.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        doc = _a.sent();
                        return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        <mock-open-scd\n          ><validate-templates\n            .doc=", "\n            .pluginId=\"", "\"\n          ></validate-templates\n        ></mock-open-scd>\n      "], ["\n        <mock-open-scd\n          ><validate-templates\n            .doc=", "\n            .pluginId=\"", "\"\n          ></validate-templates\n        ></mock-open-scd>\n      "])), doc, '/src/validators/ValidateTemplates.js'))];
                    case 2:
                        parent = _a.sent();
                        element = parent.getActivePlugin();
                        return [2 /*return*/];
                }
            });
        }); });
        it('triggers as newIssuesEvent for detail not containing kind', function () {
            var detail = {
                title: 'title',
                message: 'message'
            };
            element.dispatch(detail);
            testing_1.expect(issueEvent).to.have.been.called;
            testing_1.expect(logEvent).to.not.have.been.called;
            testing_1.expect(issueEvent.args[0][0].type).to.equal('issue');
            testing_1.expect(issueEvent.args[0][0].detail.validatorId).to.equal('/src/validators/ValidateTemplates.js');
            testing_1.expect(issueEvent.args[0][0].detail.message).to.equal('message');
            testing_1.expect(issueEvent.args[0][0].detail.title).to.equal('title');
        });
        it('triggers as newLogEvent for detail containing kind info', function () {
            var detail = {
                kind: 'info',
                title: 'title',
                message: 'message'
            };
            element.dispatch(detail);
            testing_1.expect(logEvent).to.have.been.called;
            testing_1.expect(issueEvent).to.not.have.been.called;
            testing_1.expect(logEvent.args[0][0].type).to.equal('log');
            testing_1.expect(logEvent.args[0][0].detail.kind).to.equal('info');
            testing_1.expect(logEvent.args[0][0].detail.message).to.equal('message');
            testing_1.expect(logEvent.args[0][0].detail.title).to.equal('title');
        });
        it('triggers as newLogEvent for detail containing kind warning', function () {
            var detail = {
                kind: 'warning',
                title: 'title',
                message: 'message'
            };
            element.dispatch(detail);
            testing_1.expect(logEvent).to.have.been.called;
            testing_1.expect(issueEvent).to.not.have.been.called;
            testing_1.expect(logEvent.args[0][0].type).to.equal('log');
            testing_1.expect(logEvent.args[0][0].detail.kind).to.equal('warning');
        });
        it('triggers as newLogEvent for detail containing kind error', function () {
            var detail = {
                kind: 'error',
                title: 'title',
                message: 'message'
            };
            element.dispatch(detail);
            testing_1.expect(logEvent).to.have.been.called;
            testing_1.expect(issueEvent).to.not.have.been.called;
            testing_1.expect(logEvent.args[0][0].type).to.equal('log');
            testing_1.expect(logEvent.args[0][0].detail.kind).to.equal('error');
        });
    });
    describe('validate', function () {
        var element;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var doc, parent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/validators/zeroissues.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        doc = _a.sent();
                        return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n        <mock-open-scd\n          ><validate-templates .doc=", "></validate-templates\n        ></mock-open-scd>\n      "], ["\n        <mock-open-scd\n          ><validate-templates .doc=", "></validate-templates\n        ></mock-open-scd>\n      "])), doc))];
                    case 2:
                        parent = _a.sent();
                        element = parent.getActivePlugin();
                        return [2 /*return*/];
                }
            });
        }); });
        it('pushes only diag.zeroissues issue to diagnostics when no issues found', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, element.validate()];
                    case 1:
                        _a.sent();
                        testing_1.expect(issueEvent).to.have.been.calledOnce;
                        testing_1.expect(issueEvent.args[0][0].detail.title).to.contain('[diag.zeroissues]');
                        return [2 /*return*/];
                }
            });
        }); });
        it('pushes only diag.missingnsd issue to diagnostics pane for SCL version < 2007B3', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (_a = element.doc.querySelector('SCL')) === null || _a === void 0 ? void 0 : _a.setAttribute('version', '2003');
                        return [4 /*yield*/, element.validate()];
                    case 1:
                        _b.sent();
                        testing_1.expect(issueEvent).to.have.been.calledOnce;
                        testing_1.expect(issueEvent.args[0][0].detail.title).to.contain('[diag.missingnsd]');
                        return [2 /*return*/];
                }
            });
        }); });
        it('pushes only diag.missingnsd issue to diagnostics pane for SCL not having version information', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        (_a = element.doc.querySelector('SCL')) === null || _a === void 0 ? void 0 : _a.removeAttribute('version');
                        (_b = element.doc.querySelector('SCL')) === null || _b === void 0 ? void 0 : _b.removeAttribute('revision');
                        return [4 /*yield*/, element.validate()];
                    case 1:
                        _c.sent();
                        testing_1.expect(issueEvent).to.have.been.calledOnce;
                        testing_1.expect(issueEvent.args[0][0].detail.title).to.contain('[diag.missingnsd]');
                        return [2 /*return*/];
                }
            });
        }); });
        it('does not trigger anything for SCL missing DataTypeTemplates', function () { return __awaiter(void 0, void 0, void 0, function () {
            var data;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        data = element.doc.querySelector('DataTypeTemplates');
                        (_a = element.doc.querySelector('SCL')) === null || _a === void 0 ? void 0 : _a.removeChild(data);
                        return [4 /*yield*/, element.validate()];
                    case 1:
                        _b.sent();
                        testing_1.expect(issueEvent).to.not.have.been.calledOnce;
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
var templateObject_1, templateObject_2;
