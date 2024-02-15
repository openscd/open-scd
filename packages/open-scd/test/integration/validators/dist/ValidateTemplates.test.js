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
var ValidateTemplates_js_1 = require("../../../src/validators/ValidateTemplates.js");
describe('ValidateTemplates OpenSCD integration test ', function () {
    if (customElements.get('validate-templates') === undefined)
        customElements.define('validate-templates', ValidateTemplates_js_1["default"]);
    var parent;
    var element;
    var doc;
    describe('with a valid DataTypeTemplates section', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/validators/zeroissues.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        doc = _a.sent();
                        return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        <mock-open-scd .doc=", "\n          ><validate-templates .doc=", "></validate-templates\n        ></mock-open-scd>\n\n        <link href=\"public/google/fonts/roboto-v27.css\" rel=\"stylesheet\" />\n        <link href=\"public/google/fonts/roboto-mono-v13.css\" rel=\"stylesheet\" />\n        <link\n          href=\"public/google/icons/material-icons-outlined.css\"\n          rel=\"stylesheet\"\n        />\n      "], ["\n        <mock-open-scd .doc=", "\n          ><validate-templates .doc=", "></validate-templates\n        ></mock-open-scd>\n\n        <link href=\"public/google/fonts/roboto-v27.css\" rel=\"stylesheet\" />\n        <link href=\"public/google/fonts/roboto-mono-v13.css\" rel=\"stylesheet\" />\n        <link\n          href=\"public/google/icons/material-icons-outlined.css\"\n          rel=\"stylesheet\"\n        />\n      "])), doc, doc))];
                    case 2:
                        parent = _a.sent();
                        element = parent.getActivePlugin();
                        element.pluginId = '/src/validators/ValidateTemplates.js';
                        return [4 /*yield*/, element.validate()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, parent.updateComplete];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('shows a "No errors" message in the diagnostics pane', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _a.sent();
                        testing_1.expect(parent.diagnosticUI).to.contain.text('No errors');
                        return [4 /*yield*/, testing_1.expect(parent.diagnosticUI).to.equalSnapshot()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('with issues in the DataTypeTemplates section', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/validators/datatypetemplateerrors.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        doc = _a.sent();
                        return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n        <mock-open-scd .doc=", "\n          ><validate-templates .doc=", "></validate-templates\n        ></mock-open-scd>\n\n        <link href=\"public/google/fonts/roboto-v27.css\" rel=\"stylesheet\" />\n        <link href=\"public/google/fonts/roboto-mono-v13.css\" rel=\"stylesheet\" />\n        <link\n          href=\"public/google/icons/material-icons-outlined.css\"\n          rel=\"stylesheet\"\n        />\n      "], ["\n        <mock-open-scd .doc=", "\n          ><validate-templates .doc=", "></validate-templates\n        ></mock-open-scd>\n\n        <link href=\"public/google/fonts/roboto-v27.css\" rel=\"stylesheet\" />\n        <link href=\"public/google/fonts/roboto-mono-v13.css\" rel=\"stylesheet\" />\n        <link\n          href=\"public/google/icons/material-icons-outlined.css\"\n          rel=\"stylesheet\"\n        />\n      "])), doc, doc))];
                    case 2:
                        parent = _a.sent();
                        element = parent.getActivePlugin();
                        element.pluginId = '/src/validators/ValidateTemplates.js';
                        return [4 /*yield*/, element.validate()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, parent.updateComplete];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('generates issues in the diagnistics pane', function () { return __awaiter(void 0, void 0, void 0, function () {
            var issues;
            return __generator(this, function (_a) {
                issues = parent.diagnoses.get('/src/validators/ValidateTemplates.js');
                testing_1.expect(issues === null || issues === void 0 ? void 0 : issues.length).to.equal(28);
                return [2 /*return*/];
            });
        }); }).timeout(1000);
        it('pushes issues to the diagnostics pane that look like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, testing_1.expect(parent.diagnosticUI).to.equalSnapshot()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('with schema version smaller "2007B3"', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/valid2007B.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        doc = _a.sent();
                        return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n        <mock-open-scd .doc=", "\n          ><validate-templates .doc=", "></validate-templates\n        ></mock-open-scd>\n\n        <link href=\"public/google/fonts/roboto-v27.css\" rel=\"stylesheet\" />\n        <link href=\"public/google/fonts/roboto-mono-v13.css\" rel=\"stylesheet\" />\n        <link\n          href=\"public/google/icons/material-icons-outlined.css\"\n          rel=\"stylesheet\"\n        />\n      "], ["\n        <mock-open-scd .doc=", "\n          ><validate-templates .doc=", "></validate-templates\n        ></mock-open-scd>\n\n        <link href=\"public/google/fonts/roboto-v27.css\" rel=\"stylesheet\" />\n        <link href=\"public/google/fonts/roboto-mono-v13.css\" rel=\"stylesheet\" />\n        <link\n          href=\"public/google/icons/material-icons-outlined.css\"\n          rel=\"stylesheet\"\n        />\n      "])), doc, doc))];
                    case 2:
                        parent = _a.sent();
                        element = parent.getActivePlugin();
                        element.pluginId = '/src/validators/ValidateTemplates.js';
                        return [4 /*yield*/, element.validate()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, parent.updateComplete];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('shows only one message in the diagnostics pane', function () { return __awaiter(void 0, void 0, void 0, function () {
            var issues;
            return __generator(this, function (_a) {
                issues = parent.diagnoses.get('/src/validators/ValidateTemplates.js');
                testing_1.expect(issues === null || issues === void 0 ? void 0 : issues.length).to.equal(1);
                return [2 /*return*/];
            });
        }); }).timeout(1000);
        it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, testing_1.expect(parent.diagnosticUI).to.equalSnapshot()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
var templateObject_1, templateObject_2, templateObject_3;
