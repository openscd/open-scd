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
require("../../../../src/addons/Wizards.js");
var foundation_js_1 = require("../../../../src/foundation.js");
var dotype_wizards_js_1 = require("../../../../src/editors/templates/dotype-wizards.js");
describe('wizards for DOType element', function () {
    var doc;
    var element;
    var inputs;
    var input;
    var primaryAction;
    var actionEvent;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<oscd-wizards .host=", "></oscd-wizards>"], ["<oscd-wizards .host=", "></oscd-wizards>"])), document))];
                case 1:
                    element = _a.sent();
                    actionEvent = sinon_1.spy();
                    window.addEventListener('editor-action', actionEvent);
                    return [2 /*return*/];
            }
        });
    }); });
    describe('include an edit wizard that', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var wizard;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/valid2003.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        doc = _b.sent();
                        wizard = dotype_wizards_js_1.dOTypeWizard(foundation_js_1.identity(doc.querySelector('DOType')), doc);
                        element.workflow.push(function () { return wizard; });
                        return [4 /*yield*/, element.requestUpdate()];
                    case 2:
                        _b.sent();
                        inputs = Array.from(element.wizardUI.inputs);
                        primaryAction = ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-button[slot="primaryAction"]'));
                        return [2 /*return*/];
                }
            });
        }); });
        describe('allows to edit id attribute', function () {
            beforeEach(function () {
                input = inputs.find(function (input) { return input.label === 'id'; });
            });
            it('as wizard input', function () { return testing_1.expect(input).to.exist; });
            it('triggers a complex action', function () {
                input.value = 'someTestId';
                primaryAction.click();
                testing_1.expect(actionEvent).to.be.calledOnce;
                var action = actionEvent.args[0][0].detail.action;
                testing_1.expect(action).to.not.satisfy(foundation_js_1.isSimple);
            });
            it('that edits the id attribute of DOType', function () {
                input.value = 'someTestId';
                primaryAction.click();
                var complexAction = (actionEvent.args[0][0].detail.action);
                var actions = complexAction.actions;
                testing_1.expect(actions[0]["new"].element).to.have.attribute('id', 'someTestId');
            });
            it('that edits all referenced lnType attribute as well', function () {
                var oldId = input === null || input === void 0 ? void 0 : input.value;
                var numReferences = doc.querySelectorAll("LNodeType > DO[type=\"" + oldId + "\"], DOType > SDO[type=\"" + oldId + "\"]").length;
                input.value = 'someTestId';
                primaryAction.click();
                var complexAction = (actionEvent.args[0][0].detail.action);
                var actions = complexAction.actions;
                testing_1.expect(actions).to.have.lengthOf(numReferences + 1);
                actions.shift(); //the first updates the DOType itself and has no 'id'
                for (var _i = 0, actions_1 = actions; _i < actions_1.length; _i++) {
                    var action = actions_1[_i];
                    testing_1.expect(action["new"].element).to.have.attribute('type', 'someTestId');
                }
            });
        });
    });
});
var templateObject_1;
