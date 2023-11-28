"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Wizarding = void 0;
var lit_element_1 = require("lit-element");
var foundation_js_1 = require("./foundation.js");
require("./wizard-dialog.js");
function Wizarding(Base) {
    var WizardingElement = /** @class */ (function (_super) {
        __extends(WizardingElement, _super);
        function WizardingElement() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            /** FIFO queue of [[`Wizard`]]s to display. */
            _this.workflow = [];
            _this.addEventListener('wizard', _this.onWizard);
            _this.addEventListener('editor-action', function () {
                return _this.wizardUI.requestUpdate();
            });
            return _this;
        }
        WizardingElement.prototype.onWizard = function (we) {
            var _this = this;
            var wizard = we.detail.wizard;
            if (wizard === null)
                this.workflow.shift();
            else if (we.detail.subwizard)
                this.workflow.unshift(wizard);
            else
                this.workflow.push(wizard);
            this.requestUpdate('workflow');
            this.updateComplete.then(function () {
                return _this.wizardUI.updateComplete.then(function () { var _a; return (_a = _this.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.updateComplete.then(function () { var _a; return (_a = _this.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.focus(); }); });
            });
        };
        WizardingElement.prototype.render = function () {
            var _a, _b, _c;
            return lit_element_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["", "\n        <wizard-dialog .wizard=", "></wizard-dialog>"], ["", "\n        <wizard-dialog .wizard=", "></wizard-dialog>"])), foundation_js_1.ifImplemented(_super.prototype.render.call(this)), (_c = (_b = (_a = this.workflow)[0]) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : []);
        };
        __decorate([
            lit_element_1.state()
        ], WizardingElement.prototype, "workflow");
        __decorate([
            lit_element_1.query('wizard-dialog')
        ], WizardingElement.prototype, "wizardUI");
        return WizardingElement;
    }(Base));
    return WizardingElement;
}
exports.Wizarding = Wizarding;
var templateObject_1;
