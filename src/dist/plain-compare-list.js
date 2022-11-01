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
exports.PlainCompareList = void 0;
var lit_element_1 = require("lit-element");
var lit_translate_1 = require("lit-translate");
var compare_js_1 = require("./foundation/compare.js");
var PlainCompareList = /** @class */ (function (_super) {
    __extends(PlainCompareList, _super);
    function PlainCompareList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * The title of the left list
         */
        _this.leftHandTitle = '';
        /**
         * The title of the right list
         */
        _this.rightHandTitle = '';
        /**
         * The subtitle of the left list (optional)
         */
        _this.leftHandSubtitle = '';
        /**
         * The subtitle of the right list (optional)
         */
        _this.rightHandSubtitle = '';
        _this.filterMutables = true;
        return _this;
    }
    PlainCompareList.prototype.render = function () {
        return lit_element_1.html(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      <div class=\"container\">\n        <div class=\"flex\"></div>\n        ", "\n      </div>\n      <div class=\"container container--alt\">\n        <div class=\"list__container list__container--left\">\n          <h3 class=\"mdc-dialog__title\">", "</h3>\n          ", "\n        </div>\n        <div class=\"list__container\">\n          <h3 class=\"mdc-dialog__title\">", "</h3>\n          ", "\n        </div>\n      </div>\n      ", "\n    "], ["\n      <div class=\"container\">\n        <div class=\"flex\"></div>\n        ", "\n      </div>\n      <div class=\"container container--alt\">\n        <div class=\"list__container list__container--left\">\n          <h3 class=\"mdc-dialog__title\">", "</h3>\n          ",
            "\n        </div>\n        <div class=\"list__container\">\n          <h3 class=\"mdc-dialog__title\">", "</h3>\n          ",
            "\n        </div>\n      </div>\n      ",
            "\n    "])), this.renderFilterCheckbox(), this.leftHandTitle, this.leftHandSubtitle && this.leftHandSubtitle.length > 0
            ? lit_element_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<h5 class=\"mdc-dialog__title\">", "</h5> "], ["<h5 class=\"mdc-dialog__title\">", "</h5> "])), this.leftHandSubtitle) : '', this.rightHandTitle, this.rightHandSubtitle && this.rightHandSubtitle.length > 0
            ? lit_element_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<h5 class=\"mdc-dialog__title\">\n                ", "\n              </h5> "], ["<h5 class=\"mdc-dialog__title\">\n                ", "\n              </h5> "])), this.rightHandSubtitle) : '', this.leftHandObject && this.rightHandObject
            ? lit_element_1.html(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n            ", "\n          "], ["\n            ",
                "\n          "])), compare_js_1.renderDiff(this.leftHandObject, this.rightHandObject, this.filterMutables ? this.filterToIgnore : {})) : '');
    };
    PlainCompareList.prototype.renderFilterCheckbox = function () {
        var _this = this;
        return lit_element_1.html(templateObject_5 || (templateObject_5 = __makeTemplateObject(["<mwc-formfield label=\"", "\">\n      <mwc-checkbox\n        ?checked=", "\n        @change=", "\n      >\n      </mwc-checkbox>\n    </mwc-formfield> "], ["<mwc-formfield label=\"", "\">\n      <mwc-checkbox\n        ?checked=", "\n        @change=", "\n      >\n      </mwc-checkbox>\n    </mwc-formfield> "])), lit_translate_1.translate('compare.filterMutables'), this.filterMutables, function () { return (_this.filterMutables = !_this.filterMutables); });
    };
    PlainCompareList.styles = lit_element_1.css(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    mwc-list-item {\n      --mdc-list-item-graphic-margin: 0;\n    }\n\n    .mdc-dialog__title {\n      padding: 0 16px;\n    }\n\n    .container {\n      display: flex;\n      gap: 4px;\n    }\n\n    .container--alt {\n      background: var(--base2);\n    }\n\n    .list__container {\n      width: 50%;\n      background: var(--base3);\n    }\n    .list__container--left {\n      text-align: right;\n    }\n    .flex {\n      flex: 1;\n    }\n\n    mwc-list-item[right] {\n      text-align: right;\n      direction: rtl;\n    }\n  "], ["\n    mwc-list-item {\n      --mdc-list-item-graphic-margin: 0;\n    }\n\n    .mdc-dialog__title {\n      padding: 0 16px;\n    }\n\n    .container {\n      display: flex;\n      gap: 4px;\n    }\n\n    .container--alt {\n      background: var(--base2);\n    }\n\n    .list__container {\n      width: 50%;\n      background: var(--base3);\n    }\n    .list__container--left {\n      text-align: right;\n    }\n    .flex {\n      flex: 1;\n    }\n\n    mwc-list-item[right] {\n      text-align: right;\n      direction: rtl;\n    }\n  "])));
    __decorate([
        lit_element_1.property({ type: String })
    ], PlainCompareList.prototype, "leftHandTitle");
    __decorate([
        lit_element_1.property({ type: String })
    ], PlainCompareList.prototype, "rightHandTitle");
    __decorate([
        lit_element_1.property({ type: Object })
    ], PlainCompareList.prototype, "leftHandObject");
    __decorate([
        lit_element_1.property({ type: Object })
    ], PlainCompareList.prototype, "rightHandObject");
    __decorate([
        lit_element_1.property({ type: Object })
    ], PlainCompareList.prototype, "filterToIgnore");
    __decorate([
        lit_element_1.property({ type: String })
    ], PlainCompareList.prototype, "leftHandSubtitle");
    __decorate([
        lit_element_1.property({ type: String })
    ], PlainCompareList.prototype, "rightHandSubtitle");
    __decorate([
        lit_element_1.state()
    ], PlainCompareList.prototype, "filterMutables");
    PlainCompareList = __decorate([
        lit_element_1.customElement('plain-compare-list')
    ], PlainCompareList);
    return PlainCompareList;
}(lit_element_1.LitElement));
exports.PlainCompareList = PlainCompareList;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
