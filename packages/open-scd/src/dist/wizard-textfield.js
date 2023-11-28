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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.WizardTextField = void 0;
var lit_element_1 = require("lit-element");
var lit_translate_1 = require("lit-translate");
require("@material/mwc-icon-button");
require("@material/mwc-list/mwc-list-item");
require("@material/mwc-menu");
require("@material/mwc-switch");
var mwc_textfield_1 = require("@material/mwc-textfield");
/** A potentially `nullable` `TextField` that allows for selection of an SI
 * `multiplier` if an SI `unit` is given.
 *
 * NB: Use `maybeValue: string | null` instead of `value` if `nullable`!*/
var WizardTextField = /** @class */ (function (_super) {
    __extends(WizardTextField, _super);
    function WizardTextField() {
        var _this = _super.call(this) || this;
        /** Whether [[`maybeValue`]] may be `null` */
        _this.nullable = false;
        /** Selectable SI multipliers for a non-empty [[`unit`]]. */
        _this.multipliers = [null, ''];
        _this.multiplierIndex = 0;
        /** SI Unit, must be non-empty to allow for selecting a [[`multiplier`]].
         * Overrides `suffix`. */
        _this.unit = '';
        _this.isNull = false;
        /** The default `value` displayed if [[`maybeValue`]] is `null`. */
        _this.defaultValue = '';
        /** Additional values that cause validation to fail. */
        _this.reservedValues = [];
        // FIXME: workaround to allow disable of the whole component - need basic refactor
        _this.disabledSwitch = false;
        _this.nulled = null;
        _this.disabledSwitch = _this.hasAttribute('disabled');
        return _this;
    }
    Object.defineProperty(WizardTextField.prototype, "multiplier", {
        get: function () {
            var _a, _b;
            if (this.unit == '')
                return null;
            return ((_b = (_a = this.multipliers[this.multiplierIndex]) !== null && _a !== void 0 ? _a : this.multipliers[0]) !== null && _b !== void 0 ? _b : null);
        },
        set: function (value) {
            var _a;
            var index = this.multipliers.indexOf(value);
            if (index >= 0)
                this.multiplierIndex = index;
            this.suffix = ((_a = this.multiplier) !== null && _a !== void 0 ? _a : '') + this.unit;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WizardTextField.prototype, "null", {
        get: function () {
            return this.nullable && this.isNull;
        },
        set: function (value) {
            if (!this.nullable || value === this.isNull)
                return;
            this.isNull = value;
            if (this["null"])
                this.disable();
            else
                this.enable();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WizardTextField.prototype, "maybeValue", {
        /** Replacement for `value`, can only be `null` if [[`nullable`]]. */
        get: function () {
            return this["null"] ? null : this.value;
        },
        set: function (value) {
            if (value === null)
                this["null"] = true;
            else {
                this["null"] = false;
                this.value = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    WizardTextField.prototype.selectMultiplier = function (se) {
        this.multiplier = this.multipliers[se.detail.index];
    };
    WizardTextField.prototype.enable = function () {
        if (this.nulled === null)
            return;
        this.value = this.nulled;
        this.nulled = null;
        this.helperPersistent = false;
        this.disabled = false;
    };
    WizardTextField.prototype.disable = function () {
        if (this.nulled !== null)
            return;
        this.nulled = this.value;
        this.value = this.defaultValue;
        this.helperPersistent = true;
        this.disabled = true;
    };
    WizardTextField.prototype.firstUpdated = function () {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _super.prototype.firstUpdated.call(this)];
                    case 1:
                        _b.sent();
                        if (this.multiplierMenu)
                            this.multiplierMenu.anchor = (_a = this.multiplierButton) !== null && _a !== void 0 ? _a : null;
                        return [2 /*return*/];
                }
            });
        });
    };
    WizardTextField.prototype.checkValidity = function () {
        var _this = this;
        if (this.reservedValues &&
            this.reservedValues.some(function (array) { return array === _this.value; })) {
            this.setCustomValidity(lit_translate_1.get('textfield.unique'));
            return false;
        }
        this.setCustomValidity(''); //Reset. Otherwise super.checkValidity always falseM
        return _super.prototype.checkValidity.call(this);
    };
    WizardTextField.prototype.renderUnitSelector = function () {
        var _this = this;
        var _a;
        if (this.multipliers.length && this.unit)
            return lit_element_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<div style=\"position:relative;\">\n        <mwc-icon-button\n          style=\"margin:5px;\"\n          icon=\"more\"\n          ?disabled=", "\n          @click=", "\n        ></mwc-icon-button>\n        <mwc-menu\n          @selected=", "\n          fixed\n          .anchor=", "\n          >", "</mwc-menu\n        >\n      </div>"], ["<div style=\"position:relative;\">\n        <mwc-icon-button\n          style=\"margin:5px;\"\n          icon=\"more\"\n          ?disabled=", "\n          @click=", "\n        ></mwc-icon-button>\n        <mwc-menu\n          @selected=", "\n          fixed\n          .anchor=", "\n          >", "</mwc-menu\n        >\n      </div>"])), this["null"] || this.disabledSwitch, function () { var _a; return (_a = _this.multiplierMenu) === null || _a === void 0 ? void 0 : _a.show(); }, this.selectMultiplier, (_a = this.multiplierButton) !== null && _a !== void 0 ? _a : null, this.renderMulplierList());
        else
            return lit_element_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject([""], [""])));
    };
    WizardTextField.prototype.renderMulplierList = function () {
        var _this = this;
        return lit_element_1.html(templateObject_4 || (templateObject_4 = __makeTemplateObject(["", ""], ["",
            ""])), this.multipliers.map(function (multiplier) {
            return lit_element_1.html(templateObject_3 || (templateObject_3 = __makeTemplateObject(["<mwc-list-item ?selected=", "\n          >", "</mwc-list-item\n        >"], ["<mwc-list-item ?selected=", "\n          >",
                "</mwc-list-item\n        >"])), multiplier === _this.multiplier, multiplier === null
                ? lit_translate_1.translate('textfield.noMultiplier')
                : multiplier);
        }));
    };
    WizardTextField.prototype.renderSwitch = function () {
        var _this = this;
        if (this.nullable) {
            return lit_element_1.html(templateObject_5 || (templateObject_5 = __makeTemplateObject(["<mwc-switch\n        style=\"margin-left: 12px;\"\n        ?checked=", "\n        ?disabled=", "\n        @change=", "\n      ></mwc-switch>"], ["<mwc-switch\n        style=\"margin-left: 12px;\"\n        ?checked=", "\n        ?disabled=", "\n        @change=",
                "\n      ></mwc-switch>"])), !this["null"], this.disabledSwitch, function () {
                _this["null"] = !_this.nullSwitch.checked;
            });
        }
        return lit_element_1.html(templateObject_6 || (templateObject_6 = __makeTemplateObject([""], [""])));
    };
    WizardTextField.prototype.render = function () {
        return lit_element_1.html(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n      <div style=\"display: flex; flex-direction: row;\">\n        <div style=\"flex: auto;\">", "</div>\n        ", "\n        <div style=\"display: flex; align-items: center; height: 56px;\">\n          ", "\n        </div>\n      </div>\n    "], ["\n      <div style=\"display: flex; flex-direction: row;\">\n        <div style=\"flex: auto;\">", "</div>\n        ", "\n        <div style=\"display: flex; align-items: center; height: 56px;\">\n          ", "\n        </div>\n      </div>\n    "])), _super.prototype.render.call(this), this.renderUnitSelector(), this.renderSwitch());
    };
    __decorate([
        lit_element_1.property({ type: Boolean })
    ], WizardTextField.prototype, "nullable");
    __decorate([
        lit_element_1.property({ type: Array })
    ], WizardTextField.prototype, "multipliers");
    __decorate([
        lit_element_1.property({ type: String })
    ], WizardTextField.prototype, "multiplier");
    __decorate([
        lit_element_1.property({ type: String })
    ], WizardTextField.prototype, "unit");
    __decorate([
        lit_element_1.state()
    ], WizardTextField.prototype, "null");
    __decorate([
        lit_element_1.property({ type: String })
    ], WizardTextField.prototype, "maybeValue");
    __decorate([
        lit_element_1.property({ type: String })
    ], WizardTextField.prototype, "defaultValue");
    __decorate([
        lit_element_1.property({ type: Array })
    ], WizardTextField.prototype, "reservedValues");
    __decorate([
        lit_element_1.query('mwc-switch')
    ], WizardTextField.prototype, "nullSwitch");
    __decorate([
        lit_element_1.query('mwc-menu')
    ], WizardTextField.prototype, "multiplierMenu");
    __decorate([
        lit_element_1.query('mwc-icon-button')
    ], WizardTextField.prototype, "multiplierButton");
    WizardTextField = __decorate([
        lit_element_1.customElement('wizard-textfield')
    ], WizardTextField);
    return WizardTextField;
}(mwc_textfield_1.TextField));
exports.WizardTextField = WizardTextField;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
