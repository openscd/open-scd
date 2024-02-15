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
exports.Wizards = void 0;
var lit_element_1 = require("lit-element");
require("../wizard-dialog.js");
/** `LitElement` mixin that adds a `workflow` property which [[`Wizard`]]s are
 * queued onto on incoming [[`WizardEvent`]]s, first come first displayed. */
var Wizards = /** @class */ (function (_super) {
    __extends(Wizards, _super);
    function Wizards() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** FIFO queue of [[`Wizard`]]s to display. */
        _this.workflow = [];
        return _this;
    }
    Wizards.prototype.onWizard = function (we) {
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
    Wizards.prototype.connectedCallback = function () {
        var _this = this;
        _super.prototype.connectedCallback.call(this);
        this.host.addEventListener('wizard', this.onWizard.bind(this));
        this.host.addEventListener('editor-action', function () {
            return _this.wizardUI.requestUpdate();
        });
    };
    Wizards.prototype.render = function () {
        var _a, _b, _c;
        return lit_element_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<slot></slot>\n      <wizard-dialog .wizard=", "></wizard-dialog>"], ["<slot></slot>\n      <wizard-dialog .wizard=", "></wizard-dialog>"])), (_c = (_b = (_a = this.workflow)[0]) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : []);
    };
    __decorate([
        lit_element_1.property({
            type: Object
        })
    ], Wizards.prototype, "host");
    __decorate([
        lit_element_1.state()
    ], Wizards.prototype, "workflow");
    __decorate([
        lit_element_1.query('wizard-dialog')
    ], Wizards.prototype, "wizardUI");
    Wizards = __decorate([
        lit_element_1.customElement('oscd-wizards')
    ], Wizards);
    return Wizards;
}(lit_element_1.LitElement));
exports.Wizards = Wizards;
var templateObject_1;
