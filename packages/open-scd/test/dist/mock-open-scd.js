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
exports.MockOpenSCD = void 0;
var lit_element_1 = require("lit-element");
var open_scd_js_1 = require("../src/open-scd.js");
var MockOpenSCD = /** @class */ (function (_super) {
    __extends(MockOpenSCD, _super);
    function MockOpenSCD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MockOpenSCD.prototype.renderHosting = function () {
        return lit_element_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<slot></slot>"], ["<slot></slot>"])));
    };
    MockOpenSCD.prototype.getPlugin = function (name) {
        return this._plugins.find(function (p) { return p.tagName.toLowerCase() === name.toLowerCase(); });
    };
    MockOpenSCD.prototype.getActivePlugin = function () {
        return this._plugins[0];
    };
    Object.defineProperty(MockOpenSCD.prototype, "wizardUI", {
        get: function () {
            return this.wizards.wizardUI;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MockOpenSCD.prototype, "workflow", {
        get: function () {
            return this.wizards.workflow;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        lit_element_1.queryAssignedNodes()
    ], MockOpenSCD.prototype, "_plugins");
    __decorate([
        lit_element_1.query('oscd-wizards')
    ], MockOpenSCD.prototype, "wizards");
    MockOpenSCD = __decorate([
        lit_element_1.customElement('mock-open-scd')
    ], MockOpenSCD);
    return MockOpenSCD;
}(open_scd_js_1.OpenSCD));
exports.MockOpenSCD = MockOpenSCD;
var templateObject_1;
