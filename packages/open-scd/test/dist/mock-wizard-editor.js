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
exports.MockWizardEditor = void 0;
var Editing_js_1 = require("../src/Editing.js");
var lit_element_1 = require("lit-element");
require("../src/addons/Wizards.js");
var MockWizardEditor = /** @class */ (function (_super) {
    __extends(MockWizardEditor, _super);
    function MockWizardEditor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MockWizardEditor.prototype.render = function () {
        return lit_element_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<oscd-wizards .host=", "><slot></slot></oscd-wizards>"], ["<oscd-wizards .host=", "><slot></slot></oscd-wizards>"])), this);
    };
    Object.defineProperty(MockWizardEditor.prototype, "wizardUI", {
        get: function () {
            return this.wizards.wizardUI;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MockWizardEditor.prototype, "dialog", {
        get: function () {
            return this.wizardUI.dialog;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MockWizardEditor.prototype, "dialogs", {
        get: function () {
            return this.wizardUI.dialogs;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MockWizardEditor.prototype, "workflow", {
        get: function () {
            return this.wizards.workflow;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        lit_element_1.query('oscd-wizards')
    ], MockWizardEditor.prototype, "wizards");
    MockWizardEditor = __decorate([
        lit_element_1.customElement('mock-wizard-editor')
    ], MockWizardEditor);
    return MockWizardEditor;
}(Editing_js_1.Editing(lit_element_1.LitElement)));
exports.MockWizardEditor = MockWizardEditor;
var templateObject_1;
