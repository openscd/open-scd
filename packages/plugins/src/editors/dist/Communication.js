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
var lit_element_1 = require("lit-element");
var lit_translate_1 = require("lit-translate");
require("@material/mwc-fab");
require("./communication/subnetwork-editor.js");
var foundation_js_1 = require("@openscd/open-scd/src/foundation.js");
var subnetwork_js_1 = require("../wizards/subnetwork.js");
/** An editor [[`plugin`]] for editing the `Communication` section. */
var CommunicationPlugin = /** @class */ (function (_super) {
    __extends(CommunicationPlugin, _super);
    function CommunicationPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.editCount = -1;
        return _this;
    }
    /**
     * Creates the Communication Element and returns the created Element
     * @returns {Element} Communication `Element`
     */
    CommunicationPlugin.prototype.createCommunication = function () {
        var element = foundation_js_1.createElement(this.doc, 'Communication', {});
        this.dispatchEvent(foundation_js_1.newActionEvent({
            "new": {
                parent: this.doc.documentElement,
                element: element
            }
        }));
        return element;
    };
    /** Opens a [[`WizardDialog`]] for creating a new `SubNetwork` element. */
    CommunicationPlugin.prototype.openCreateSubNetworkWizard = function () {
        var parent = this.doc.querySelector(':root > Communication') ||
            this.createCommunication();
        this.dispatchEvent(foundation_js_1.newWizardEvent(subnetwork_js_1.createSubNetworkWizard(parent)));
    };
    CommunicationPlugin.prototype.render = function () {
        var _this = this;
        var _a, _b;
        if (!((_a = this.doc) === null || _a === void 0 ? void 0 : _a.querySelector(':root > Communication >SubNetwork')))
            return lit_element_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<h1>\n        <span style=\"color: var(--base1)\"\n          >", "</span\n        ><mwc-fab\n          extended\n          icon=\"add\"\n          label=\"", "\"\n          @click=", "\n        ></mwc-fab>\n      </h1>"], ["<h1>\n        <span style=\"color: var(--base1)\"\n          >", "</span\n        ><mwc-fab\n          extended\n          icon=\"add\"\n          label=\"", "\"\n          @click=", "\n        ></mwc-fab>\n      </h1>"])), lit_translate_1.translate('communication.missing'), lit_translate_1.get('subnetwork.wizard.title.add'), function () { return _this.openCreateSubNetworkWizard(); });
        return lit_element_1.html(templateObject_3 || (templateObject_3 = __makeTemplateObject(["<mwc-fab\n        extended\n        icon=\"add\"\n        label=\"", "\"\n        @click=", "\n      ></mwc-fab>\n      <section>\n        ", "\n      </section> "], ["<mwc-fab\n        extended\n        icon=\"add\"\n        label=\"", "\"\n        @click=", "\n      ></mwc-fab>\n      <section>\n        ",
            "\n      </section> "])), lit_translate_1.get('subnetwork.wizard.title.add'), function () { return _this.openCreateSubNetworkWizard(); }, Array.from((_b = this.doc.querySelectorAll('SubNetwork')) !== null && _b !== void 0 ? _b : [])
            .filter(foundation_js_1.isPublic)
            .map(function (subnetwork) {
            return lit_element_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<subnetwork-editor\n                .editCount=", "\n                .doc=", "\n                .element=", "\n              ></subnetwork-editor>"], ["<subnetwork-editor\n                .editCount=", "\n                .doc=", "\n                .element=", "\n              ></subnetwork-editor>"])), _this.editCount, _this.doc, subnetwork);
        }));
    };
    CommunicationPlugin.styles = lit_element_1.css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    :host {\n      width: 100vw;\n    }\n\n    h1 {\n      color: var(--mdc-theme-on-surface);\n      font-family: 'Roboto', sans-serif;\n      font-weight: 300;\n      overflow: hidden;\n      white-space: nowrap;\n      text-overflow: ellipsis;\n      margin: 0px;\n      line-height: 48px;\n      padding-left: 0.3em;\n      transition: background-color 150ms linear;\n    }\n\n    section {\n      outline: none;\n      padding: 8px 12px 16px;\n    }\n\n    subnetwork-editor {\n      margin: 8px 12px 16px;\n    }\n\n    mwc-fab {\n      position: fixed;\n      bottom: 32px;\n      right: 32px;\n    }\n  "], ["\n    :host {\n      width: 100vw;\n    }\n\n    h1 {\n      color: var(--mdc-theme-on-surface);\n      font-family: 'Roboto', sans-serif;\n      font-weight: 300;\n      overflow: hidden;\n      white-space: nowrap;\n      text-overflow: ellipsis;\n      margin: 0px;\n      line-height: 48px;\n      padding-left: 0.3em;\n      transition: background-color 150ms linear;\n    }\n\n    section {\n      outline: none;\n      padding: 8px 12px 16px;\n    }\n\n    subnetwork-editor {\n      margin: 8px 12px 16px;\n    }\n\n    mwc-fab {\n      position: fixed;\n      bottom: 32px;\n      right: 32px;\n    }\n  "])));
    __decorate([
        lit_element_1.property()
    ], CommunicationPlugin.prototype, "doc");
    __decorate([
        lit_element_1.property({ type: Number })
    ], CommunicationPlugin.prototype, "editCount");
    return CommunicationPlugin;
}(lit_element_1.LitElement));
exports["default"] = CommunicationPlugin;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
