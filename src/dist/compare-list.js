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
var compare_1 = require("./foundation/compare");
var PlainCompareList = /** @class */ (function (_super) {
    __extends(PlainCompareList, _super);
    function PlainCompareList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.leftHandTitle = '';
        _this.rightHandTitle = '';
        return _this;
    }
    PlainCompareList.prototype.render = function () {
        return lit_element_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject([" <div class=\"container\">\n                        <div class=\"list__container\">\n                            <h3 class=\"mdc-dialog__title\">\n                                ", "\n                            </h3>\n                        </div>\n                        <div class=\"list__container\">\n                            <h3 class=\"mdc-dialog__title\">\n                                ", "\n                            </h3>\n                        </div>\n                    </div>\n                ", "\n        "], [" <div class=\"container\">\n                        <div class=\"list__container\">\n                            <h3 class=\"mdc-dialog__title\">\n                                ", "\n                            </h3>\n                        </div>\n                        <div class=\"list__container\">\n                            <h3 class=\"mdc-dialog__title\">\n                                ", "\n                            </h3>\n                        </div>\n                    </div>\n                ",
            "\n        "])), this.leftHandTitle, this.rightHandTitle, compare_1.renderDiff(this.leftHandObject, this.rightHandObject, this.filterToIgnore));
    };
    PlainCompareList.styles = lit_element_1.css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n        .container {\n            display: flex;\n        }\n\n        .list__container {\n            flex: 50;\n        }\n  "], ["\n        .container {\n            display: flex;\n        }\n\n        .list__container {\n            flex: 50;\n        }\n  "])));
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
    PlainCompareList = __decorate([
        lit_element_1.customElement('plain-compare-list')
    ], PlainCompareList);
    return PlainCompareList;
}(lit_element_1.LitElement));
exports.PlainCompareList = PlainCompareList;
var templateObject_1, templateObject_2;
