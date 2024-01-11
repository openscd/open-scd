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
exports.EqFunctionEditor = void 0;
var lit_element_1 = require("lit-element");
var lit_translate_1 = require("lit-translate");
require("@material/mwc-icon-button");
require("@material/mwc-list/mwc-list-item");
require("@material/mwc-menu");
require("../../action-pane.js");
require("./eq-sub-function-editor.js");
require("./general-equipment-editor.js");
var foundation_js_1 = require("../../foundation.js");
var wizard_library_js_1 = require("../../wizards/wizard-library.js");
var foundation_js_2 = require("./foundation.js");
function childTags(element) {
    if (!element)
        return [];
    return foundation_js_1.tags[element.tagName].children.filter(function (child) { return wizard_library_js_1.wizards[child].create !== wizard_library_js_1.emptyWizard; });
}
/** Pane rendering `EqFunction` element with its children */
var EqFunctionEditor = /** @class */ (function (_super) {
    __extends(EqFunctionEditor, _super);
    function EqFunctionEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.editCount = -1;
        _this.showfunctions = false;
        return _this;
    }
    Object.defineProperty(EqFunctionEditor.prototype, "header", {
        get: function () {
            var name = this.element.getAttribute('name');
            var desc = this.element.getAttribute('desc');
            var type = this.element.getAttribute('type');
            return "" + name + (desc ? " - " + desc : '') + (type ? " (" + type + ")" : '');
        },
        enumerable: false,
        configurable: true
    });
    EqFunctionEditor.prototype.openEditWizard = function () {
        var wizard = wizard_library_js_1.wizards['EqFunction'].edit(this.element);
        if (wizard)
            this.dispatchEvent(foundation_js_1.newWizardEvent(wizard));
    };
    EqFunctionEditor.prototype.remove = function () {
        if (this.element.parentElement)
            this.dispatchEvent(foundation_js_1.newActionEvent({
                old: {
                    parent: this.element.parentElement,
                    element: this.element
                }
            }));
    };
    EqFunctionEditor.prototype.openCreateWizard = function (tagName) {
        var wizard = wizard_library_js_1.wizards[tagName].create(this.element);
        if (wizard)
            this.dispatchEvent(foundation_js_1.newWizardEvent(wizard));
    };
    EqFunctionEditor.prototype.updated = function () {
        this.addMenu.anchor = this.addButton;
    };
    EqFunctionEditor.prototype.renderLNodes = function () {
        var _this = this;
        var lNodes = foundation_js_1.getChildElementsByTagName(this.element, 'LNode');
        return lNodes.length
            ? lit_element_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<div class=\"container lnode\">\n          ", "\n        </div>"], ["<div class=\"container lnode\">\n          ",
                "\n        </div>"])), lNodes.map(function (lNode) {
                return lit_element_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<l-node-editor\n                .editCount=", "\n                .doc=", "\n                .element=", "\n              ></l-node-editor>"], ["<l-node-editor\n                .editCount=", "\n                .doc=", "\n                .element=", "\n              ></l-node-editor>"])), _this.editCount, _this.doc, lNode);
            })) : lit_element_1.html(templateObject_3 || (templateObject_3 = __makeTemplateObject([""], [""])));
    };
    EqFunctionEditor.prototype.renderEqSubFunctions = function () {
        var _this = this;
        var eqSubFunctions = foundation_js_1.getChildElementsByTagName(this.element, 'EqSubFunction');
        return lit_element_1.html(templateObject_5 || (templateObject_5 = __makeTemplateObject([" ", ""], [" ",
            ""])), eqSubFunctions.map(function (eqSubFunction) {
            return lit_element_1.html(templateObject_4 || (templateObject_4 = __makeTemplateObject(["<eq-sub-function-editor\n          .editCount=", "\n          .doc=", "\n          .element=", "\n          ?showfunctions=", "\n        ></eq-sub-function-editor>"], ["<eq-sub-function-editor\n          .editCount=", "\n          .doc=", "\n          .element=", "\n          ?showfunctions=", "\n        ></eq-sub-function-editor>"])), _this.editCount, _this.doc, eqSubFunction, _this.showfunctions);
        }));
    };
    EqFunctionEditor.prototype.renderAddButtons = function () {
        return childTags(this.element).map(function (child) {
            return lit_element_1.html(templateObject_6 || (templateObject_6 = __makeTemplateObject(["<mwc-list-item value=\"", "\"\n          ><span>", "</span></mwc-list-item\n        >"], ["<mwc-list-item value=\"", "\"\n          ><span>", "</span></mwc-list-item\n        >"])), child, child);
        });
    };
    EqFunctionEditor.prototype.render = function () {
        var _this = this;
        return lit_element_1.html(templateObject_7 || (templateObject_7 = __makeTemplateObject(["<action-pane\n      label=\"", "\"\n      icon=\"functions\"\n      secondary\n      highlighted\n      ><abbr slot=\"action\" title=\"", "\">\n        <mwc-icon-button\n          icon=\"edit\"\n          @click=", "\n        ></mwc-icon-button> </abbr\n      ><abbr slot=\"action\" title=\"", "\">\n        <mwc-icon-button\n          icon=\"delete\"\n          @click=", "\n        ></mwc-icon-button> </abbr\n      ><abbr\n        slot=\"action\"\n        style=\"position:relative;\"\n        title=\"", "\"\n      >\n        <mwc-icon-button\n          icon=\"playlist_add\"\n          @click=", "\n        ></mwc-icon-button\n        ><mwc-menu\n          corner=\"BOTTOM_RIGHT\"\n          menuCorner=\"END\"\n          @action=", "\n          >", "</mwc-menu\n        ></abbr\n      >\n      ", "\n      ", "", "</action-pane\n    >"], ["<action-pane\n      label=\"", "\"\n      icon=\"functions\"\n      secondary\n      highlighted\n      ><abbr slot=\"action\" title=\"", "\">\n        <mwc-icon-button\n          icon=\"edit\"\n          @click=", "\n        ></mwc-icon-button> </abbr\n      ><abbr slot=\"action\" title=\"", "\">\n        <mwc-icon-button\n          icon=\"delete\"\n          @click=", "\n        ></mwc-icon-button> </abbr\n      ><abbr\n        slot=\"action\"\n        style=\"position:relative;\"\n        title=\"", "\"\n      >\n        <mwc-icon-button\n          icon=\"playlist_add\"\n          @click=", "\n        ></mwc-icon-button\n        ><mwc-menu\n          corner=\"BOTTOM_RIGHT\"\n          menuCorner=\"END\"\n          @action=",
            "\n          >", "</mwc-menu\n        ></abbr\n      >\n      ", "\n      ", "", "</action-pane\n    >"])), this.header, lit_translate_1.translate('edit'), function () { return _this.openEditWizard(); }, lit_translate_1.translate('remove'), function () { return _this.remove(); }, lit_translate_1.translate('add'), function () { return (_this.addMenu.open = true); }, function (e) {
            var tagName = e.target.selected.value;
            _this.openCreateWizard(tagName);
        }, this.renderAddButtons(), foundation_js_2.renderGeneralEquipment(this.doc, this.element, this.showfunctions), this.renderLNodes(), this.renderEqSubFunctions());
    };
    EqFunctionEditor.styles = lit_element_1.css(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n    abbr {\n      text-decoration: none;\n      border-bottom: none;\n    }\n\n    .container.lnode {\n      display: grid;\n      grid-gap: 12px;\n      padding: 8px 12px 16px;\n      box-sizing: border-box;\n      grid-template-columns: repeat(auto-fit, minmax(64px, auto));\n    }\n  "], ["\n    abbr {\n      text-decoration: none;\n      border-bottom: none;\n    }\n\n    .container.lnode {\n      display: grid;\n      grid-gap: 12px;\n      padding: 8px 12px 16px;\n      box-sizing: border-box;\n      grid-template-columns: repeat(auto-fit, minmax(64px, auto));\n    }\n  "])));
    __decorate([
        lit_element_1.property({ attribute: false })
    ], EqFunctionEditor.prototype, "doc");
    __decorate([
        lit_element_1.property({ type: Number })
    ], EqFunctionEditor.prototype, "editCount");
    __decorate([
        lit_element_1.property({ attribute: false })
    ], EqFunctionEditor.prototype, "element");
    __decorate([
        lit_element_1.property({ type: Boolean })
    ], EqFunctionEditor.prototype, "showfunctions");
    __decorate([
        lit_element_1.state()
    ], EqFunctionEditor.prototype, "header");
    __decorate([
        lit_element_1.query('mwc-menu')
    ], EqFunctionEditor.prototype, "addMenu");
    __decorate([
        lit_element_1.query('mwc-icon-button[icon="playlist_add"]')
    ], EqFunctionEditor.prototype, "addButton");
    EqFunctionEditor = __decorate([
        lit_element_1.customElement('eq-function-editor')
    ], EqFunctionEditor);
    return EqFunctionEditor;
}(lit_element_1.LitElement));
exports.EqFunctionEditor = EqFunctionEditor;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;
