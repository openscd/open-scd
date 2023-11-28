"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
exports.WizardDialog = void 0;
var lit_element_1 = require("lit-element");
var if_defined_1 = require("lit-html/directives/if-defined");
var lit_translate_1 = require("lit-translate");
require("@material/mwc-button");
require("@material/mwc-dialog");
require("@material/mwc-icon-button");
require("@material/mwc-icon-button-toggle");
require("@material/mwc-menu");
var mwc_dialog_1 = require("@material/mwc-dialog");
require("ace-custom-element");
require("./wizard-checkbox.js");
require("./wizard-textfield.js");
require("./wizard-select.js");
var foundation_js_1 = require("./foundation.js");
function renderWizardInput(input) {
    var _a, _b;
    if (input instanceof lit_element_1.TemplateResult)
        return input;
    if (input.kind === 'Checkbox')
        return lit_element_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<wizard-checkbox\n      ?nullable=", "\n      ?defaultChecked=", "\n      ?dialogInitialFocus=", "\n      label=\"", "\"\n      helper=\"", "\"\n      .maybeValue=", "\n    ></wizard-checkbox>"], ["<wizard-checkbox\n      ?nullable=", "\n      ?defaultChecked=", "\n      ?dialogInitialFocus=", "\n      label=\"", "\"\n      helper=\"", "\"\n      .maybeValue=", "\n    ></wizard-checkbox>"])), input.nullable, input["default"], input.dialogInitialFocus, input.label, if_defined_1.ifDefined(input.helper), input.maybeValue);
    if (input.kind === 'Select')
        return lit_element_1.html(templateObject_3 || (templateObject_3 = __makeTemplateObject(["<wizard-select\n      ?nullable=", "\n      ?dialogInitialFocus=", "\n      label=\"", "\"\n      helper=\"", "\"\n      defaultValue=\"", "\"\n      validationMessage=\"", "\"\n      .maybeValue=", "\n      >", "</wizard-select\n    >"], ["<wizard-select\n      ?nullable=", "\n      ?dialogInitialFocus=", "\n      label=\"", "\"\n      helper=\"", "\"\n      defaultValue=\"", "\"\n      validationMessage=\"", "\"\n      .maybeValue=", "\n      >",
            "</wizard-select\n    >"])), input.nullable, input.dialogInitialFocus, input.label, if_defined_1.ifDefined(input.helper), if_defined_1.ifDefined(input["default"]), if_defined_1.ifDefined(input.valadationMessage), input.maybeValue, input.values.map(function (value) { return lit_element_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<mwc-list-item value=\"", "\">", "</mwc-list-item>"], ["<mwc-list-item value=\"", "\">", "</mwc-list-item>"])), value, value); }));
    return lit_element_1.html(templateObject_4 || (templateObject_4 = __makeTemplateObject(["<wizard-textfield\n    ?nullable=", "\n    ?required=", "\n    ?disabled=", "\n    ?dialogInitialFocus=", "\n    label=\"", "\"\n    defaultValue=\"", "\"\n    helper=\"", "\"\n    validationMessage=\"", "\"\n    unit=\"", "\"\n    .multipliers=", "\n    .multiplier=", "\n    suffix=\"", "\"\n    .maybeValue=", "\n    pattern=\"", "\"\n    minLength=\"", "\"\n    maxLength=\"", "\"\n    type=\"", "\"\n    min=\"", "\"\n    max=\"", "\"\n  ></wizard-textfield>"], ["<wizard-textfield\n    ?nullable=", "\n    ?required=", "\n    ?disabled=", "\n    ?dialogInitialFocus=", "\n    label=\"", "\"\n    defaultValue=\"", "\"\n    helper=\"", "\"\n    validationMessage=\"", "\"\n    unit=\"", "\"\n    .multipliers=", "\n    .multiplier=", "\n    suffix=\"", "\"\n    .maybeValue=", "\n    pattern=\"", "\"\n    minLength=\"", "\"\n    maxLength=\"", "\"\n    type=\"", "\"\n    min=\"", "\"\n    max=\"", "\"\n  ></wizard-textfield>"])), input.nullable, input.required, input.disabled, input.dialogInitialFocus, input.label, if_defined_1.ifDefined(input["default"]), if_defined_1.ifDefined(input.helper), if_defined_1.ifDefined(input.helper), if_defined_1.ifDefined(input.unit), (_a = input.multipliers) !== null && _a !== void 0 ? _a : [], (_b = input.multiplier) !== null && _b !== void 0 ? _b : null, if_defined_1.ifDefined(input.suffix), input.maybeValue, if_defined_1.ifDefined(input.pattern), if_defined_1.ifDefined(input.minLength), if_defined_1.ifDefined(input.maxLength), if_defined_1.ifDefined(input.type), if_defined_1.ifDefined(input.min), if_defined_1.ifDefined(input.max));
}
function dialogInputs(dialog) {
    var _a;
    return Array.from((_a = dialog === null || dialog === void 0 ? void 0 : dialog.querySelectorAll(foundation_js_1.wizardInputSelector)) !== null && _a !== void 0 ? _a : []);
}
function dialogValid(dialog) {
    return dialogInputs(dialog).every(foundation_js_1.checkValidity);
}
function codeAction(element) {
    return function (inputs) {
        var text = inputs[0].value;
        if (!text || !element.parentElement)
            return [];
        var desc = {
            parent: element.parentElement,
            reference: element.nextSibling,
            element: element
        };
        var del = {
            old: desc,
            checkValidity: function () { return true; }
        };
        var cre = {
            "new": __assign(__assign({}, desc), { element: new DOMParser().parseFromString(text, 'application/xml')
                    .documentElement }),
            checkValidity: function () { return true; }
        };
        return [
            {
                actions: [del, cre],
                title: lit_translate_1.get('code.log', {
                    id: foundation_js_1.identity(element)
                })
            },
        ];
    };
}
/** A wizard style dialog consisting of several pages commiting some
 * [[`EditorAction`]] on completion and aborting on dismissal. */
var WizardDialog = /** @class */ (function (_super) {
    __extends(WizardDialog, _super);
    function WizardDialog() {
        var _this = _super.call(this) || this;
        /** The [[`Wizard`]] implemented by this dialog. */
        _this.wizard = [];
        /** Index of the currently active [[`WizardPage`]] */
        _this.pageIndex = 0;
        _this.act = _this.act.bind(_this);
        _this.renderPage = _this.renderPage.bind(_this);
        return _this;
    }
    Object.defineProperty(WizardDialog.prototype, "dialog", {
        /** The `Dialog` showing the active [[`WizardPage`]]. */
        get: function () {
            return this.dialogs[this.pageIndex];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WizardDialog.prototype, "code", {
        get: function () {
            var _a, _b, _c;
            return (((_c = (_b = (_a = this.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-icon-button-toggle')) === null || _b === void 0 ? void 0 : _b.on) !== null && _c !== void 0 ? _c : false) &&
                localStorage.getItem('mode') === 'pro');
        },
        enumerable: false,
        configurable: true
    });
    /** Checks the inputs of all [[`WizardPage`]]s for validity. */
    WizardDialog.prototype.checkValidity = function () {
        return Array.from(this.inputs).every(foundation_js_1.checkValidity);
    };
    Object.defineProperty(WizardDialog.prototype, "firstInvalidPage", {
        get: function () {
            return Array.from(this.dialogs).findIndex(function (dialog) { return !dialogValid(dialog); });
        },
        enumerable: false,
        configurable: true
    });
    WizardDialog.prototype.prev = function () {
        var _a;
        if (this.pageIndex <= 0)
            return;
        this.pageIndex--;
        (_a = this.dialog) === null || _a === void 0 ? void 0 : _a.show();
    };
    WizardDialog.prototype.next = function () {
        var _a, _b, _c;
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!dialogValid(this.dialog)) return [3 /*break*/, 1];
                        if (this.wizard.length > this.pageIndex + 1)
                            this.pageIndex++;
                        (_a = this.dialog) === null || _a === void 0 ? void 0 : _a.show();
                        return [3 /*break*/, 3];
                    case 1:
                        (_b = this.dialog) === null || _b === void 0 ? void 0 : _b.show();
                        return [4 /*yield*/, ((_c = this.dialog) === null || _c === void 0 ? void 0 : _c.updateComplete)];
                    case 2:
                        _d.sent();
                        dialogInputs(this.dialog).map(foundation_js_1.reportValidity);
                        _d.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /** Commits `action` if all inputs are valid, reports validity otherwise. */
    WizardDialog.prototype.act = function (action, primary) {
        var _a;
        if (primary === void 0) { primary = true; }
        return __awaiter(this, void 0, Promise, function () {
            var wizardInputs, wizardList, wizardActions;
            var _this = this;
            return __generator(this, function (_b) {
                if (action === undefined)
                    return [2 /*return*/, false];
                wizardInputs = Array.from(this.inputs);
                wizardList = ((_a = this.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('filtered-list,mwc-list'));
                if (!this.checkValidity()) {
                    this.pageIndex = this.firstInvalidPage;
                    wizardInputs.map(foundation_js_1.reportValidity);
                    return [2 /*return*/, false];
                }
                wizardActions = action(wizardInputs, this, wizardList);
                if (wizardActions.length > 0) {
                    if (primary)
                        this.wizard[this.pageIndex].primary = undefined;
                    else
                        this.wizard[this.pageIndex].secondary = undefined;
                    this.dispatchEvent(foundation_js_1.newWizardEvent());
                }
                wizardActions.forEach(function (wa) {
                    return foundation_js_1.isWizardFactory(wa)
                        ? _this.dispatchEvent(foundation_js_1.newWizardEvent(wa))
                        : _this.dispatchEvent(foundation_js_1.newActionEvent(wa));
                });
                return [2 /*return*/, true];
            });
        });
    };
    /** Triggers menu action callback */
    WizardDialog.prototype.menuAct = function (action) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                if (!action)
                    return [2 /*return*/];
                action(this);
                return [2 /*return*/];
            });
        });
    };
    WizardDialog.prototype.onClosed = function (ae) {
        var _a;
        if (!(ae.target instanceof mwc_dialog_1.Dialog && ((_a = ae.detail) === null || _a === void 0 ? void 0 : _a.action)))
            return;
        if (ae.detail.action === 'close')
            this.dispatchEvent(foundation_js_1.newWizardEvent());
        else if (ae.detail.action === 'prev')
            this.prev();
        else if (ae.detail.action === 'next')
            this.next();
    };
    WizardDialog.prototype.updated = function (changedProperties) {
        var _this = this;
        var _a, _b, _c, _d;
        if (changedProperties.has('wizard')) {
            this.pageIndex = 0;
            while (this.wizard.findIndex(function (page) { return page.initial; }) > this.pageIndex &&
                dialogValid(this.dialog)) {
                (_a = this.dialog) === null || _a === void 0 ? void 0 : _a.close();
                this.next();
            }
            (_b = this.dialog) === null || _b === void 0 ? void 0 : _b.show();
        }
        if ((_d = (_c = this.wizard[this.pageIndex]) === null || _c === void 0 ? void 0 : _c.primary) === null || _d === void 0 ? void 0 : _d.auto) {
            this.updateComplete.then(function () {
                return _this.act(_this.wizard[_this.pageIndex].primary.action);
            });
        }
        if (this.actionsMenu)
            this.actionsMenu.anchor = this.menuButton;
    };
    WizardDialog.prototype.renderMenu = function (page) {
        var _this = this;
        var _a;
        var someIconsDefined = (_a = page.menuActions) === null || _a === void 0 ? void 0 : _a.some(function (menuAction) { return menuAction.icon; });
        return lit_element_1.html(templateObject_8 || (templateObject_8 = __makeTemplateObject([" <mwc-icon-button\n        icon=\"more_vert\"\n        @click=", "\n      ></mwc-icon-button>\n      <mwc-menu class=\"actions-menu\" corner=\"BOTTOM_RIGHT\" menuCorner=\"END\">\n        ", "\n      </mwc-menu>"], [" <mwc-icon-button\n        icon=\"more_vert\"\n        @click=",
            "\n      ></mwc-icon-button>\n      <mwc-menu class=\"actions-menu\" corner=\"BOTTOM_RIGHT\" menuCorner=\"END\">\n        ",
            "\n      </mwc-menu>"])), function () {
            if (!_this.actionsMenu.open)
                _this.actionsMenu.show();
            else
                _this.actionsMenu.close();
        }, page.menuActions.map(function (menuAction) {
            return lit_element_1.html(templateObject_7 || (templateObject_7 = __makeTemplateObject(["<mwc-list-item\n              .graphic=", "\n              @click=", "\n            >\n              <span>", "</span>\n              ", "\n            </mwc-list-item>"], ["<mwc-list-item\n              .graphic=", "\n              @click=", "\n            >\n              <span>", "</span>\n              ",
                "\n            </mwc-list-item>"])), someIconsDefined ? 'icon' : null, function () { return _this.menuAct(menuAction.action); }, menuAction.label, menuAction.icon
                ? lit_element_1.html(templateObject_5 || (templateObject_5 = __makeTemplateObject(["<mwc-icon slot=\"graphic\">", "</mwc-icon>"], ["<mwc-icon slot=\"graphic\">", "</mwc-icon>"])), menuAction.icon) : lit_element_1.html(templateObject_6 || (templateObject_6 = __makeTemplateObject([""], [""]))));
        }));
    };
    WizardDialog.prototype.renderPage = function (page, index) {
        var _this = this;
        var _a, _b, _c, _d, _e;
        var showCodeToggleButton = page.element && localStorage.getItem('mode') === 'pro';
        var extraWidth = showCodeToggleButton && page.menuActions
            ? 96
            : showCodeToggleButton || page.menuActions
                ? 48
                : 0;
        return lit_element_1.html(templateObject_20 || (templateObject_20 = __makeTemplateObject(["<mwc-dialog\n      defaultAction=\"next\"\n      heading=", "\n      @closed=", "\n      style=\"--mdc-dialog-min-width:calc(100% + ", "px)\"\n    >\n      ", "\n      <div id=\"wizard-content\">\n        ", "\n      </div>\n      ", "\n      ", "\n      ", "\n    </mwc-dialog>"], ["<mwc-dialog\n      defaultAction=\"next\"\n      heading=", "\n      @closed=", "\n      style=\"--mdc-dialog-min-width:calc(100% + ", "px)\"\n    >\n      ",
            "\n      <div id=\"wizard-content\">\n        ",
            "\n      </div>\n      ",
            "\n      ",
            "\n      ",
            "\n    </mwc-dialog>"])), page.title, this.onClosed, extraWidth, showCodeToggleButton || page.menuActions
            ? lit_element_1.html(templateObject_10 || (templateObject_10 = __makeTemplateObject(["<nav>\n            ", "\n            ", "\n          </nav>"], ["<nav>\n            ",
                "\n            ", "\n          </nav>"])), showCodeToggleButton
                ? lit_element_1.html(templateObject_9 || (templateObject_9 = __makeTemplateObject(["<mwc-icon-button-toggle\n                  onicon=\"code\"\n                  officon=\"code_off\"\n                  @click=", "\n                ></mwc-icon-button-toggle>"], ["<mwc-icon-button-toggle\n                  onicon=\"code\"\n                  officon=\"code_off\"\n                  @click=", "\n                ></mwc-icon-button-toggle>"])), function () { return _this.requestUpdate(); }) : '', page.menuActions ? this.renderMenu(page) : '') : '', this.code && page.element
            ? lit_element_1.html(templateObject_11 || (templateObject_11 = __makeTemplateObject(["<ace-editor\n              base-path=\"/public/ace\"\n              wrap\n              soft-tabs\n              style=\"width: 80vw; height: calc(100vh - 240px);\"\n              theme=\"ace/theme/solarized_", "\"\n              mode=\"ace/mode/xml\"\n              value=\"", "\"\n            ></ace-editor>"], ["<ace-editor\n              base-path=\"/public/ace\"\n              wrap\n              soft-tabs\n              style=\"width: 80vw; height: calc(100vh - 240px);\"\n              theme=\"ace/theme/solarized_", "\"\n              mode=\"ace/mode/xml\"\n              value=\"",
                "\"\n            ></ace-editor>"])), localStorage.getItem('theme'), foundation_js_1.formatXml(new XMLSerializer().serializeToString(page.element))) : (_a = page.content) === null || _a === void 0 ? void 0 : _a.map(renderWizardInput), index > 0
            ? lit_element_1.html(templateObject_12 || (templateObject_12 = __makeTemplateObject(["<mwc-button\n            slot=\"secondaryAction\"\n            dialogAction=\"prev\"\n            icon=\"navigate_before\"\n            label=", "\n          ></mwc-button>"], ["<mwc-button\n            slot=\"secondaryAction\"\n            dialogAction=\"prev\"\n            icon=\"navigate_before\"\n            label=", "\n          ></mwc-button>"])), (_b = this.wizard) === null || _b === void 0 ? void 0 : _b[index - 1].title) : lit_element_1.html(templateObject_13 || (templateObject_13 = __makeTemplateObject([""], [""]))), page.secondary
            ? lit_element_1.html(templateObject_14 || (templateObject_14 = __makeTemplateObject(["<mwc-button\n            slot=\"secondaryAction\"\n            @click=", "\n            icon=\"", "\"\n            label=\"", "\"\n          ></mwc-button>"], ["<mwc-button\n            slot=\"secondaryAction\"\n            @click=", "\n            icon=\"", "\"\n            label=\"", "\"\n          ></mwc-button>"])), function () { var _a; return _this.act((_a = page.secondary) === null || _a === void 0 ? void 0 : _a.action, false); }, page.secondary.icon, page.secondary.label) : lit_element_1.html(templateObject_15 || (templateObject_15 = __makeTemplateObject(["<mwc-button\n            slot=\"secondaryAction\"\n            dialogAction=\"close\"\n            label=\"", "\"\n            style=\"--mdc-theme-primary: var(--mdc-theme-error)\"\n          ></mwc-button>"], ["<mwc-button\n            slot=\"secondaryAction\"\n            dialogAction=\"close\"\n            label=\"", "\"\n            style=\"--mdc-theme-primary: var(--mdc-theme-error)\"\n          ></mwc-button>"])), lit_translate_1.translate('close')), this.code && page.element
            ? lit_element_1.html(templateObject_16 || (templateObject_16 = __makeTemplateObject(["<mwc-button\n            slot=\"primaryAction\"\n            @click=", "\n            icon=\"code\"\n            label=\"", "\"\n            trailingIcon\n          ></mwc-button>"], ["<mwc-button\n            slot=\"primaryAction\"\n            @click=", "\n            icon=\"code\"\n            label=\"", "\"\n            trailingIcon\n          ></mwc-button>"])), function () { return _this.act(codeAction(page.element)); }, lit_translate_1.translate('save')) : page.primary
            ? lit_element_1.html(templateObject_17 || (templateObject_17 = __makeTemplateObject(["<mwc-button\n            slot=\"primaryAction\"\n            @click=", "\n            icon=\"", "\"\n            label=\"", "\"\n            trailingIcon\n          ></mwc-button>"], ["<mwc-button\n            slot=\"primaryAction\"\n            @click=", "\n            icon=\"", "\"\n            label=\"", "\"\n            trailingIcon\n          ></mwc-button>"])), function () { var _a; return _this.act((_a = page.primary) === null || _a === void 0 ? void 0 : _a.action); }, page.primary.icon, page.primary.label) : index + 1 < ((_d = (_c = this.wizard) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0)
            ? lit_element_1.html(templateObject_18 || (templateObject_18 = __makeTemplateObject(["<mwc-button\n            slot=\"primaryAction\"\n            dialogAction=\"next\"\n            icon=\"navigate_next\"\n            label=", "\n            trailingicon\n          ></mwc-button>"], ["<mwc-button\n            slot=\"primaryAction\"\n            dialogAction=\"next\"\n            icon=\"navigate_next\"\n            label=", "\n            trailingicon\n          ></mwc-button>"])), (_e = this.wizard) === null || _e === void 0 ? void 0 : _e[index + 1].title) : lit_element_1.html(templateObject_19 || (templateObject_19 = __makeTemplateObject([""], [""]))));
    };
    WizardDialog.prototype.render = function () {
        return lit_element_1.html(templateObject_21 || (templateObject_21 = __makeTemplateObject(["", ""], ["", ""])), this.wizard.map(this.renderPage));
    };
    WizardDialog.styles = lit_element_1.css(templateObject_22 || (templateObject_22 = __makeTemplateObject(["\n    mwc-dialog {\n      --mdc-dialog-max-width: 92vw;\n    }\n\n    mwc-dialog > nav {\n      position: absolute;\n      top: 8px;\n      right: 14px;\n      color: var(--base00);\n    }\n\n    mwc-dialog > nav > mwc-icon-button-toggle[on] {\n      color: var(--mdc-theme-primary);\n    }\n\n    #wizard-content {\n      display: flex;\n      flex-direction: column;\n    }\n\n    #wizard-content > * {\n      display: block;\n      margin-top: 16px;\n    }\n\n    *[iconTrailing='search'] {\n      --mdc-shape-small: 28px;\n    }\n  "], ["\n    mwc-dialog {\n      --mdc-dialog-max-width: 92vw;\n    }\n\n    mwc-dialog > nav {\n      position: absolute;\n      top: 8px;\n      right: 14px;\n      color: var(--base00);\n    }\n\n    mwc-dialog > nav > mwc-icon-button-toggle[on] {\n      color: var(--mdc-theme-primary);\n    }\n\n    #wizard-content {\n      display: flex;\n      flex-direction: column;\n    }\n\n    #wizard-content > * {\n      display: block;\n      margin-top: 16px;\n    }\n\n    *[iconTrailing='search'] {\n      --mdc-shape-small: 28px;\n    }\n  "])));
    __decorate([
        lit_element_1.property({ type: Array })
    ], WizardDialog.prototype, "wizard");
    __decorate([
        lit_element_1.state()
    ], WizardDialog.prototype, "pageIndex");
    __decorate([
        lit_element_1.queryAll('mwc-dialog')
    ], WizardDialog.prototype, "dialogs");
    __decorate([
        lit_element_1.queryAll(foundation_js_1.wizardInputSelector)
    ], WizardDialog.prototype, "inputs");
    __decorate([
        lit_element_1.query('.actions-menu')
    ], WizardDialog.prototype, "actionsMenu");
    __decorate([
        lit_element_1.query('mwc-icon-button[icon="more_vert"]')
    ], WizardDialog.prototype, "menuButton");
    WizardDialog = __decorate([
        lit_element_1.customElement('wizard-dialog')
    ], WizardDialog);
    return WizardDialog;
}(lit_element_1.LitElement));
exports.WizardDialog = WizardDialog;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21, templateObject_22;
