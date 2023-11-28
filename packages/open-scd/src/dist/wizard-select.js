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
exports.WizardSelect = void 0;
var lit_element_1 = require("lit-element");
require("@material/mwc-switch");
var mwc_select_1 = require("@material/mwc-select");
/** A potentially `nullable` `Select`.
 *
 * NB: Use `maybeValue: string | null` instead of `value` if `nullable`!*/
var WizardSelect = /** @class */ (function (_super) {
    __extends(WizardSelect, _super);
    function WizardSelect() {
        var _this = _super.call(this) || this;
        /** Whether [[`maybeValue`]] may be `null` */
        _this.nullable = false;
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
    Object.defineProperty(WizardSelect.prototype, "null", {
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
    Object.defineProperty(WizardSelect.prototype, "maybeValue", {
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
    WizardSelect.prototype.enable = function () {
        if (this.nulled === null)
            return;
        this.value = this.nulled;
        this.nulled = null;
        this.disabled = false;
    };
    WizardSelect.prototype.disable = function () {
        if (this.nulled !== null)
            return;
        this.nulled = this.value;
        this.value = this.defaultValue;
        this.disabled = true;
    };
    WizardSelect.prototype.firstUpdated = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.firstUpdated.call(this)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WizardSelect.prototype.checkValidity = function () {
        var _a;
        if (this.nullable && !((_a = this.nullSwitch) === null || _a === void 0 ? void 0 : _a.checked))
            return true;
        return _super.prototype.checkValidity.call(this);
    };
    WizardSelect.prototype.renderSwitch = function () {
        var _this = this;
        if (this.nullable) {
            return lit_element_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<mwc-switch\n        style=\"margin-left: 12px;\"\n        ?checked=", "\n        ?disabled=", "\n        @change=", "\n      ></mwc-switch>"], ["<mwc-switch\n        style=\"margin-left: 12px;\"\n        ?checked=", "\n        ?disabled=", "\n        @change=",
                "\n      ></mwc-switch>"])), !this["null"], this.disabledSwitch, function () {
                _this["null"] = !_this.nullSwitch.checked;
            });
        }
        return lit_element_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject([""], [""])));
    };
    WizardSelect.prototype.render = function () {
        return lit_element_1.html(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      <div style=\"display: flex; flex-direction: row;\">\n        <div style=\"flex: auto;\">", "</div>\n        <div style=\"display: flex; align-items: center; height: 56px;\">\n          ", "\n        </div>\n      </div>\n    "], ["\n      <div style=\"display: flex; flex-direction: row;\">\n        <div style=\"flex: auto;\">", "</div>\n        <div style=\"display: flex; align-items: center; height: 56px;\">\n          ", "\n        </div>\n      </div>\n    "])), _super.prototype.render.call(this), this.renderSwitch());
    };
    __decorate([
        lit_element_1.property({ type: Boolean })
    ], WizardSelect.prototype, "nullable");
    __decorate([
        lit_element_1.state()
    ], WizardSelect.prototype, "null");
    __decorate([
        lit_element_1.property({ type: String })
    ], WizardSelect.prototype, "maybeValue");
    __decorate([
        lit_element_1.property({ type: String })
    ], WizardSelect.prototype, "defaultValue");
    __decorate([
        lit_element_1.property({ type: Array })
    ], WizardSelect.prototype, "reservedValues");
    __decorate([
        lit_element_1.query('mwc-switch')
    ], WizardSelect.prototype, "nullSwitch");
    WizardSelect = __decorate([
        lit_element_1.customElement('wizard-select')
    ], WizardSelect);
    return WizardSelect;
}(mwc_select_1.Select));
exports.WizardSelect = WizardSelect;
var templateObject_1, templateObject_2, templateObject_3;
