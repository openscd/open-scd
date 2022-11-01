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
exports.SubEquipmentEditor = void 0;
var lit_element_1 = require("lit-element");
require("@material/mwc-fab");
require("@material/mwc-icon");
require("@material/mwc-icon-button");
require("@material/mwc-menu");
require("../../action-icon.js");
require("../../action-pane.js");
var foundation_js_1 = require("./foundation.js");
var foundation_js_2 = require("../../foundation.js");
/** [[`SubstationEditor`]] subeditor for a child-less `SubEquipment` element. */
var SubEquipmentEditor = /** @class */ (function (_super) {
    __extends(SubEquipmentEditor, _super);
    function SubEquipmentEditor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SubEquipmentEditor.prototype, "label", {
        /** SubEquipment name attribute */
        get: function () {
            var name = "" + (this.element.hasAttribute('name')
                ? "" + this.element.getAttribute('name')
                : '');
            var description = "" + (this.element.hasAttribute('desc')
                ? " - " + this.element.getAttribute('desc')
                : '');
            var phase = "" + (this.element.hasAttribute('phase')
                ? " (" + this.element.getAttribute('phase') + ")"
                : '');
            return "" + name + description + phase;
        },
        enumerable: false,
        configurable: true
    });
    SubEquipmentEditor.prototype.renderLNodes = function () {
        var _this = this;
        var lNodes = foundation_js_2.getChildElementsByTagName(this.element, 'LNode');
        return lNodes.length
            ? lit_element_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<div class=\"container lnode\">\n          ", "\n        </div>"], ["<div class=\"container lnode\">\n          ",
                "\n        </div>"])), lNodes.map(function (lNode) {
                return lit_element_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<l-node-editor\n                .doc=", "\n                .element=", "\n              ></l-node-editor>"], ["<l-node-editor\n                .doc=", "\n                .element=", "\n              ></l-node-editor>"])), _this.doc, lNode);
            })) : lit_element_1.html(templateObject_3 || (templateObject_3 = __makeTemplateObject([""], [""])));
    };
    SubEquipmentEditor.prototype.renderEqFunctions = function () {
        var _this = this;
        var eqFunctions = foundation_js_2.getChildElementsByTagName(this.element, 'EqFunction');
        return eqFunctions.length
            ? lit_element_1.html(templateObject_5 || (templateObject_5 = __makeTemplateObject([" ", ""], [" ",
                ""])), eqFunctions.map(function (eqFunction) {
                return lit_element_1.html(templateObject_4 || (templateObject_4 = __makeTemplateObject(["<eq-function-editor\n              .doc=", "\n              .element=", "\n            ></eq-function-editor>"], ["<eq-function-editor\n              .doc=", "\n              .element=", "\n            ></eq-function-editor>"])), _this.doc, eqFunction);
            })) : lit_element_1.html(templateObject_6 || (templateObject_6 = __makeTemplateObject([""], [""])));
    };
    SubEquipmentEditor.prototype.render = function () {
        return lit_element_1.html(templateObject_7 || (templateObject_7 = __makeTemplateObject(["<action-pane label=\"", "\">\n      ", " ", "\n    </action-pane> "], ["<action-pane label=\"", "\">\n      ", " ", "\n    </action-pane> "])), this.label, this.renderLNodes(), this.renderEqFunctions());
    };
    SubEquipmentEditor.styles = lit_element_1.css(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n    ", "\n\n    :host(.moving) {\n      opacity: 0.3;\n    }\n\n    abbr {\n      text-decoration: none;\n      border-bottom: none;\n    }\n  "], ["\n    ", "\n\n    :host(.moving) {\n      opacity: 0.3;\n    }\n\n    abbr {\n      text-decoration: none;\n      border-bottom: none;\n    }\n  "])), foundation_js_1.styles);
    __decorate([
        lit_element_1.property({ attribute: false })
    ], SubEquipmentEditor.prototype, "doc");
    __decorate([
        lit_element_1.property({ attribute: false })
    ], SubEquipmentEditor.prototype, "element");
    __decorate([
        lit_element_1.property({ type: String })
    ], SubEquipmentEditor.prototype, "label");
    SubEquipmentEditor = __decorate([
        lit_element_1.customElement('sub-equipment-editor')
    ], SubEquipmentEditor);
    return SubEquipmentEditor;
}(lit_element_1.LitElement));
exports.SubEquipmentEditor = SubEquipmentEditor;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;
