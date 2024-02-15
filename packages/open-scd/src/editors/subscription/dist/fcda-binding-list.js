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
exports.FcdaBindingList = void 0;
var lit_element_1 = require("lit-element");
var lit_html_1 = require("lit-html");
var class_map_js_1 = require("lit-html/directives/class-map.js");
var lit_translate_1 = require("lit-translate");
require("@material/mwc-icon");
require("@material/mwc-list");
require("@material/mwc-list/mwc-list-item");
require("@material/mwc-list/mwc-check-list-item");
require("@material/mwc-menu");
require("@material/mwc-icon-button");
var foundation_js_1 = require("../../foundation.js");
var icons_js_1 = require("../../icons/icons.js");
var wizard_library_js_1 = require("../../wizards/wizard-library.js");
var foundation_js_2 = require("./foundation.js");
var foundation_js_3 = require("./later-binding/foundation.js");
/**
 * A sub element for showing all Goose/Sampled Value Controls.
 * A control can be edited using the standard wizard.
 * And when selecting a FCDA Element a custom event is fired, so other list can be updated.
 */
var FcdaBindingList = /** @class */ (function (_super) {
    __extends(FcdaBindingList, _super);
    function FcdaBindingList() {
        var _this = _super.call(this) || this;
        _this.editCount = -1;
        _this.extRefCounters = new Map();
        _this.iconControlLookup = {
            SampledValueControl: icons_js_1.smvIcon,
            GSEControl: icons_js_1.gooseIcon
        };
        _this.resetSelection = _this.resetSelection.bind(_this);
        parent.addEventListener('open-doc', _this.resetSelection);
        var parentDiv = _this.closest('.container');
        if (parentDiv) {
            _this.resetExtRefCount = _this.resetExtRefCount.bind(_this);
            parentDiv.addEventListener('subscription-changed', _this.resetExtRefCount);
        }
        return _this;
    }
    Object.defineProperty(FcdaBindingList.prototype, "hideSubscribed", {
        get: function () {
            var _a;
            return ((_a = localStorage.getItem("fcda-binding-list-" + (this.includeLaterBinding ? 'later-binding' : 'data-binding') + "-" + this.controlTag + "$hideSubscribed") === 'true') !== null && _a !== void 0 ? _a : false);
        },
        set: function (value) {
            var oldValue = this.hideSubscribed;
            localStorage.setItem("fcda-binding-list-" + (this.includeLaterBinding ? 'later-binding' : 'data-binding') + "-" + this.controlTag + "$hideSubscribed", "" + value);
            this.requestUpdate('hideSubscribed', oldValue);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FcdaBindingList.prototype, "hideNotSubscribed", {
        get: function () {
            var _a;
            return ((_a = localStorage.getItem("fcda-binding-list-" + (this.includeLaterBinding ? 'later-binding' : 'data-binding') + "-" + this.controlTag + "$hideNotSubscribed") === 'true') !== null && _a !== void 0 ? _a : false);
        },
        set: function (value) {
            var oldValue = this.hideNotSubscribed;
            localStorage.setItem("fcda-binding-list-" + (this.includeLaterBinding ? 'later-binding' : 'data-binding') + "-" + this.controlTag + "$hideNotSubscribed", "" + value);
            this.requestUpdate('hideNotSubscribed', oldValue);
        },
        enumerable: false,
        configurable: true
    });
    FcdaBindingList.prototype.getControlElements = function () {
        if (this.doc) {
            return Array.from(this.doc.querySelectorAll("LN0 > " + this.controlTag));
        }
        return [];
    };
    FcdaBindingList.prototype.getFcdaElements = function (controlElement) {
        var lnElement = controlElement.parentElement;
        if (lnElement) {
            return Array.from(lnElement.querySelectorAll(":scope > DataSet[name=" + controlElement.getAttribute('datSet') + "] > FCDA"));
        }
        return [];
    };
    FcdaBindingList.prototype.resetExtRefCount = function (event) {
        if (event.detail.control && event.detail.fcda) {
            var controlBlockFcdaId = foundation_js_1.identity(event.detail.control) + " " + foundation_js_1.identity(event.detail.fcda);
            this.extRefCounters["delete"](controlBlockFcdaId);
        }
    };
    FcdaBindingList.prototype.getExtRefCount = function (fcdaElement, controlElement) {
        var controlBlockFcdaId = foundation_js_1.identity(controlElement) + " " + foundation_js_1.identity(fcdaElement);
        if (!this.extRefCounters.has(controlBlockFcdaId)) {
            var extRefCount = foundation_js_3.getSubscribedExtRefElements(this.doc.getRootNode(), this.controlTag, fcdaElement, controlElement, this.includeLaterBinding).length;
            this.extRefCounters.set(controlBlockFcdaId, extRefCount);
        }
        return this.extRefCounters.get(controlBlockFcdaId);
    };
    FcdaBindingList.prototype.openEditWizard = function (controlElement) {
        var wizard = wizard_library_js_1.wizards[this.controlTag].edit(controlElement);
        if (wizard)
            this.dispatchEvent(foundation_js_1.newWizardEvent(wizard));
    };
    FcdaBindingList.prototype.resetSelection = function () {
        this.selectedControlElement = undefined;
        this.selectedFcdaElement = undefined;
    };
    FcdaBindingList.prototype.onFcdaSelect = function (controlElement, fcdaElement) {
        this.resetSelection();
        this.selectedControlElement = controlElement;
        this.selectedFcdaElement = fcdaElement;
    };
    FcdaBindingList.prototype.updated = function (_changedProperties) {
        _super.prototype.updated.call(this, _changedProperties);
        // When a new document is loaded or the selection is changed
        // we will fire the FCDA Select Event.
        if (_changedProperties.has('doc') ||
            _changedProperties.has('selectedControlElement') ||
            _changedProperties.has('selectedFcdaElement')) {
            this.dispatchEvent(foundation_js_2.newFcdaSelectEvent(this.selectedControlElement, this.selectedFcdaElement));
        }
        // When a new document is loaded we will reset the Map to clear old entries.
        if (_changedProperties.has('doc')) {
            this.extRefCounters = new Map();
        }
    };
    FcdaBindingList.prototype.renderFCDA = function (controlElement, fcdaElement) {
        var _this = this;
        var fcdaCount = this.getExtRefCount(fcdaElement, controlElement);
        var filterClasses = {
            subitem: true,
            'show-subscribed': fcdaCount !== 0,
            'show-not-subscribed': fcdaCount === 0
        };
        return lit_element_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<mwc-list-item\n      graphic=\"large\"\n      ?hasMeta=", "\n      twoline\n      class=\"", "\"\n      @click=", "\n      value=\"", "\n             ", "\"\n    >\n      <span>", "</span>\n      <span slot=\"secondary\">", "</span>\n      <mwc-icon slot=\"graphic\">subdirectory_arrow_right</mwc-icon>\n      ", "\n    </mwc-list-item>"], ["<mwc-list-item\n      graphic=\"large\"\n      ?hasMeta=", "\n      twoline\n      class=\"", "\"\n      @click=", "\n      value=\"", "\n             ", "\"\n    >\n      <span>", "</span>\n      <span slot=\"secondary\">", "</span>\n      <mwc-icon slot=\"graphic\">subdirectory_arrow_right</mwc-icon>\n      ", "\n    </mwc-list-item>"])), fcdaCount !== 0, class_map_js_1.classMap(filterClasses), function () { return _this.onFcdaSelect(controlElement, fcdaElement); }, foundation_js_1.identity(controlElement), foundation_js_1.identity(fcdaElement), foundation_js_2.getFcdaTitleValue(fcdaElement), foundation_js_2.getFcdaSubtitleValue(fcdaElement), fcdaCount !== 0 ? lit_element_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<span slot=\"meta\">", "</span>"], ["<span slot=\"meta\">", "</span>"])), fcdaCount) : lit_html_1.nothing);
    };
    FcdaBindingList.prototype.updateBaseFilterState = function () {
        !this.hideSubscribed
            ? this.controlBlockList.classList.add('show-subscribed')
            : this.controlBlockList.classList.remove('show-subscribed');
        !this.hideNotSubscribed
            ? this.controlBlockList.classList.add('show-not-subscribed')
            : this.controlBlockList.classList.remove('show-not-subscribed');
    };
    FcdaBindingList.prototype.firstUpdated = function () {
        var _this = this;
        this.actionsMenu.anchor = this.actionsMenuIcon;
        this.actionsMenu.addEventListener('closed', function () {
            _this.hideSubscribed = !_this.actionsMenu.index.has(0);
            _this.hideNotSubscribed = !_this.actionsMenu.index.has(1);
            _this.updateBaseFilterState();
        });
        this.updateBaseFilterState();
    };
    FcdaBindingList.prototype.renderTitle = function () {
        var _this = this;
        var menuClasses = {
            'filter-off': this.hideSubscribed || this.hideNotSubscribed
        };
        return lit_element_1.html(templateObject_3 || (templateObject_3 = __makeTemplateObject(["<h1>\n      ", "\n      <mwc-icon-button\n        class=\"actions-menu-icon ", "\"\n        icon=\"filter_list\"\n        @click=", "\n      ></mwc-icon-button>\n      <mwc-menu\n        multi\n        class=\"actions-menu\"\n        corner=\"BOTTOM_RIGHT\"\n        menuCorner=\"END\"\n      >\n        <mwc-check-list-item\n          class=\"filter-subscribed\"\n          left\n          ?selected=", "\n        >\n          <span>", "</span>\n        </mwc-check-list-item>\n        <mwc-check-list-item\n          class=\"filter-not-subscribed\"\n          left\n          ?selected=", "\n        >\n          <span>", "</span>\n        </mwc-check-list-item>\n      </mwc-menu>\n    </h1> "], ["<h1>\n      ", "\n      <mwc-icon-button\n        class=\"actions-menu-icon ", "\"\n        icon=\"filter_list\"\n        @click=",
            "\n      ></mwc-icon-button>\n      <mwc-menu\n        multi\n        class=\"actions-menu\"\n        corner=\"BOTTOM_RIGHT\"\n        menuCorner=\"END\"\n      >\n        <mwc-check-list-item\n          class=\"filter-subscribed\"\n          left\n          ?selected=", "\n        >\n          <span>", "</span>\n        </mwc-check-list-item>\n        <mwc-check-list-item\n          class=\"filter-not-subscribed\"\n          left\n          ?selected=", "\n        >\n          <span>", "</span>\n        </mwc-check-list-item>\n      </mwc-menu>\n    </h1> "])), lit_translate_1.translate("subscription." + this.controlTag + ".controlBlockList.title"), class_map_js_1.classMap(menuClasses), function () {
            if (!_this.actionsMenu.open)
                _this.actionsMenu.show();
            else
                _this.actionsMenu.close();
        }, !this.hideSubscribed, lit_translate_1.translate('subscription.subscriber.subscribed'), !this.hideNotSubscribed, lit_translate_1.translate('subscription.subscriber.notSubscribed'));
    };
    FcdaBindingList.prototype.renderControls = function (controlElements) {
        var _this = this;
        return lit_element_1.html(templateObject_6 || (templateObject_6 = __makeTemplateObject(["<filtered-list class=\"control-block-list\" activatable>\n      ", "\n    </filtered-list>"], ["<filtered-list class=\"control-block-list\" activatable>\n      ",
            "\n    </filtered-list>"])), controlElements
            .filter(function (controlElement) { return _this.getFcdaElements(controlElement).length; })
            .map(function (controlElement) {
            var fcdaElements = _this.getFcdaElements(controlElement);
            var showSubscribed = fcdaElements.some(function (fcda) { return _this.getExtRefCount(fcda, controlElement) !== 0; });
            var showNotSubscribed = fcdaElements.some(function (fcda) { return _this.getExtRefCount(fcda, controlElement) === 0; });
            var filterClasses = {
                control: true,
                'show-subscribed': showSubscribed,
                'show-not-subscribed': showNotSubscribed
            };
            return lit_element_1.html(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n            <mwc-list-item\n              noninteractive\n              class=\"", "\"\n              graphic=\"icon\"\n              twoline\n              hasMeta\n              value=\"", "", "\"\n            >\n              <mwc-icon-button\n                slot=\"meta\"\n                icon=\"edit\"\n                class=\"interactive\"\n                @click=", "\n              ></mwc-icon-button>\n              <span\n                >", "\n                ", "</span\n              >\n              <span slot=\"secondary\">", "</span>\n              <mwc-icon slot=\"graphic\"\n                >", "</mwc-icon\n              >\n            </mwc-list-item>\n            <li divider role=\"separator\"></li>\n            ", "\n          "], ["\n            <mwc-list-item\n              noninteractive\n              class=\"", "\"\n              graphic=\"icon\"\n              twoline\n              hasMeta\n              value=\"", "",
                "\"\n            >\n              <mwc-icon-button\n                slot=\"meta\"\n                icon=\"edit\"\n                class=\"interactive\"\n                @click=", "\n              ></mwc-icon-button>\n              <span\n                >", "\n                ",
                "</span\n              >\n              <span slot=\"secondary\">", "</span>\n              <mwc-icon slot=\"graphic\"\n                >", "</mwc-icon\n              >\n            </mwc-list-item>\n            <li divider role=\"separator\"></li>\n            ",
                "\n          "])), class_map_js_1.classMap(filterClasses), foundation_js_1.identity(controlElement), fcdaElements
                .map(function (fcdaElement) { return "\n                        " + foundation_js_2.getFcdaTitleValue(fcdaElement) + "\n                        " + foundation_js_2.getFcdaSubtitleValue(fcdaElement) + "\n                        " + foundation_js_1.identity(fcdaElement); })
                .join(''), function () { return _this.openEditWizard(controlElement); }, foundation_js_1.getNameAttribute(controlElement), foundation_js_1.getDescriptionAttribute(controlElement)
                ? lit_element_1.html(templateObject_4 || (templateObject_4 = __makeTemplateObject(["", ""], ["", ""])), foundation_js_1.getDescriptionAttribute(controlElement)) : lit_html_1.nothing, foundation_js_1.identity(controlElement), _this.iconControlLookup[_this.controlTag], fcdaElements.map(function (fcdaElement) {
                return _this.renderFCDA(controlElement, fcdaElement);
            }));
        }));
    };
    FcdaBindingList.prototype.render = function () {
        var controlElements = this.getControlElements();
        return lit_element_1.html(templateObject_8 || (templateObject_8 = __makeTemplateObject(["<section tabindex=\"0\">\n      ", "\n      ", "\n    </section>"], ["<section tabindex=\"0\">\n      ", "\n      ",
            "\n    </section>"])), this.renderTitle(), controlElements
            ? this.renderControls(controlElements)
            : lit_element_1.html(templateObject_7 || (templateObject_7 = __makeTemplateObject(["<h4>", "</h4> "], ["<h4>", "</h4> "])), lit_translate_1.translate('subscription.subscriber.notSubscribed')));
    };
    FcdaBindingList.styles = lit_element_1.css(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n    ", "\n\n    mwc-list-item.hidden[noninteractive] + li[divider] {\n      display: none;\n    }\n\n    mwc-list-item {\n      --mdc-list-item-meta-size: 48px;\n    }\n\n    section {\n      position: relative;\n    }\n\n    .actions-menu-icon {\n      float: right;\n    }\n\n    .actions-menu-icon.filter-off {\n      color: var(--secondary);\n      background-color: var(--mdc-theme-background);\n    }\n\n    /* Filtering rules for control blocks end up implementing logic to allow\n    very fast CSS response. The following rules appear to be minimal but can be\n    hard to understand intuitively for the multiple conditions. If modifying,\n    it is suggested to create a truth-table to check for side-effects */\n\n    /* remove all control blocks if no filters */\n    filtered-list.control-block-list:not(.show-subscribed, .show-not-subscribed)\n      mwc-list-item {\n      display: none;\n    }\n\n    /* remove control blocks taking care to respect multiple conditions */\n    filtered-list.control-block-list.show-not-subscribed:not(.show-subscribed)\n      mwc-list-item.control.show-subscribed:not(.show-not-subscribed) {\n      display: none;\n    }\n\n    filtered-list.control-block-list.show-subscribed:not(.show-not-subscribed)\n      mwc-list-item.control.show-not-subscribed:not(.show-subscribed) {\n      display: none;\n    }\n\n    /* remove fcdas if not part of filter */\n    filtered-list.control-block-list:not(.show-not-subscribed)\n      mwc-list-item.subitem.show-not-subscribed {\n      display: none;\n    }\n\n    filtered-list.control-block-list:not(.show-subscribed)\n      mwc-list-item.subitem.show-subscribed {\n      display: none;\n    }\n\n    .interactive {\n      pointer-events: all;\n    }\n\n    .subitem {\n      padding-left: var(--mdc-list-side-padding, 16px);\n    }\n  "], ["\n    ", "\n\n    mwc-list-item.hidden[noninteractive] + li[divider] {\n      display: none;\n    }\n\n    mwc-list-item {\n      --mdc-list-item-meta-size: 48px;\n    }\n\n    section {\n      position: relative;\n    }\n\n    .actions-menu-icon {\n      float: right;\n    }\n\n    .actions-menu-icon.filter-off {\n      color: var(--secondary);\n      background-color: var(--mdc-theme-background);\n    }\n\n    /* Filtering rules for control blocks end up implementing logic to allow\n    very fast CSS response. The following rules appear to be minimal but can be\n    hard to understand intuitively for the multiple conditions. If modifying,\n    it is suggested to create a truth-table to check for side-effects */\n\n    /* remove all control blocks if no filters */\n    filtered-list.control-block-list:not(.show-subscribed, .show-not-subscribed)\n      mwc-list-item {\n      display: none;\n    }\n\n    /* remove control blocks taking care to respect multiple conditions */\n    filtered-list.control-block-list.show-not-subscribed:not(.show-subscribed)\n      mwc-list-item.control.show-subscribed:not(.show-not-subscribed) {\n      display: none;\n    }\n\n    filtered-list.control-block-list.show-subscribed:not(.show-not-subscribed)\n      mwc-list-item.control.show-not-subscribed:not(.show-subscribed) {\n      display: none;\n    }\n\n    /* remove fcdas if not part of filter */\n    filtered-list.control-block-list:not(.show-not-subscribed)\n      mwc-list-item.subitem.show-not-subscribed {\n      display: none;\n    }\n\n    filtered-list.control-block-list:not(.show-subscribed)\n      mwc-list-item.subitem.show-subscribed {\n      display: none;\n    }\n\n    .interactive {\n      pointer-events: all;\n    }\n\n    .subitem {\n      padding-left: var(--mdc-list-side-padding, 16px);\n    }\n  "])), foundation_js_2.styles);
    __decorate([
        lit_element_1.property({ attribute: false })
    ], FcdaBindingList.prototype, "doc");
    __decorate([
        lit_element_1.property({ type: Number })
    ], FcdaBindingList.prototype, "editCount");
    __decorate([
        lit_element_1.property()
    ], FcdaBindingList.prototype, "controlTag");
    __decorate([
        lit_element_1.property()
    ], FcdaBindingList.prototype, "includeLaterBinding");
    __decorate([
        lit_element_1.state()
    ], FcdaBindingList.prototype, "selectedControlElement");
    __decorate([
        lit_element_1.state()
    ], FcdaBindingList.prototype, "selectedFcdaElement");
    __decorate([
        lit_element_1.state()
    ], FcdaBindingList.prototype, "extRefCounters");
    __decorate([
        lit_element_1.property({
            type: Boolean,
            hasChanged: function () {
                return false;
            }
        })
    ], FcdaBindingList.prototype, "hideSubscribed");
    __decorate([
        lit_element_1.property({
            type: Boolean,
            hasChanged: function () {
                return false;
            }
        })
    ], FcdaBindingList.prototype, "hideNotSubscribed");
    __decorate([
        lit_element_1.query('.actions-menu')
    ], FcdaBindingList.prototype, "actionsMenu");
    __decorate([
        lit_element_1.query('.actions-menu-icon')
    ], FcdaBindingList.prototype, "actionsMenuIcon");
    __decorate([
        lit_element_1.query('.control-block-list')
    ], FcdaBindingList.prototype, "controlBlockList");
    FcdaBindingList = __decorate([
        lit_element_1.customElement('fcda-binding-list')
    ], FcdaBindingList);
    return FcdaBindingList;
}(lit_element_1.LitElement));
exports.FcdaBindingList = FcdaBindingList;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
