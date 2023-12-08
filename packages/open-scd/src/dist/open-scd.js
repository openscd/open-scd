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
exports.OpenSCD = void 0;
var lit_element_1 = require("lit-element");
var foundation_js_1 = require("./foundation.js");
var themes_js_1 = require("./themes.js");
var Editing_js_1 = require("./Editing.js");
var Hosting_js_1 = require("./Hosting.js");
var Historing_js_1 = require("./Historing.js");
var Plugging_js_1 = require("./Plugging.js");
var Setting_js_1 = require("./Setting.js");
var Waiting_js_1 = require("./Waiting.js");
var Wizarding_js_1 = require("./Wizarding.js");
/** The `<open-scd>` custom element is the main entry point of the
 * Open Substation Configuration Designer. */
var OpenSCD = /** @class */ (function (_super) {
    __extends(OpenSCD, _super);
    function OpenSCD() {
        var _this = _super.call(this) || this;
        _this.currentSrc = '';
        _this.handleKeyPress = _this.handleKeyPress.bind(_this);
        document.onkeydown = _this.handleKeyPress;
        return _this;
    }
    Object.defineProperty(OpenSCD.prototype, "src", {
        /** The current file's URL. `blob:` URLs are *revoked after parsing*! */
        get: function () {
            return this.currentSrc;
        },
        set: function (value) {
            this.currentSrc = value;
            this.dispatchEvent(foundation_js_1.newPendingStateEvent(this.loadDoc(value)));
        },
        enumerable: false,
        configurable: true
    });
    /** Loads and parses an `XMLDocument` after [[`src`]] has changed. */
    OpenSCD.prototype.loadDoc = function (src) {
        return __awaiter(this, void 0, Promise, function () {
            var response, text, doc, docName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(src)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.text()];
                    case 2:
                        text = _a.sent();
                        if (!text)
                            return [2 /*return*/];
                        doc = new DOMParser().parseFromString(text, 'application/xml');
                        docName = src;
                        this.dispatchEvent(foundation_js_1.newOpenDocEvent(doc, docName));
                        if (src.startsWith('blob:'))
                            URL.revokeObjectURL(src);
                        return [2 /*return*/];
                }
            });
        });
    };
    OpenSCD.prototype.handleKeyPress = function (e) {
        var _a, _b, _c;
        var handled = false;
        var ctrlAnd = function (key) {
            return e.key === key && e.ctrlKey && (handled = true);
        };
        if (ctrlAnd('y'))
            this.redo();
        if (ctrlAnd('z'))
            this.undo();
        if (ctrlAnd('l'))
            this.logUI.open ? this.logUI.close() : this.logUI.show();
        if (ctrlAnd('d'))
            this.diagnosticUI.open
                ? this.diagnosticUI.close()
                : this.diagnosticUI.show();
        if (ctrlAnd('m'))
            this.menuUI.open = !this.menuUI.open;
        if (ctrlAnd('o'))
            (_a = this.menuUI
                .querySelector('mwc-list-item[iconid="folder_open"]')) === null || _a === void 0 ? void 0 : _a.click();
        if (ctrlAnd('O'))
            (_b = this.menuUI
                .querySelector('mwc-list-item[iconid="create_new_folder"]')) === null || _b === void 0 ? void 0 : _b.click();
        if (ctrlAnd('s'))
            (_c = this.menuUI
                .querySelector('mwc-list-item[iconid="save"]')) === null || _c === void 0 ? void 0 : _c.click();
        if (ctrlAnd('P'))
            this.pluginUI.show();
        if (handled)
            e.preventDefault();
    };
    OpenSCD.prototype.render = function () {
        return lit_element_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject([" ", " ", " "], [" ", " ", " "])), _super.prototype.render.call(this), themes_js_1.getTheme(this.settings.theme));
    };
    OpenSCD.styles = lit_element_1.css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    mwc-top-app-bar-fixed {\n      --mdc-theme-text-disabled-on-light: rgba(255, 255, 255, 0.38);\n    } /* hack to fix disabled icon buttons rendering black */\n\n    mwc-tab {\n      background-color: var(--primary);\n      --mdc-theme-primary: var(--mdc-theme-on-primary);\n    }\n\n    input[type='file'] {\n      display: none;\n    }\n\n    mwc-dialog {\n      --mdc-dialog-max-width: 98vw;\n    }\n\n    mwc-dialog > form {\n      display: flex;\n      flex-direction: column;\n    }\n\n    mwc-dialog > form > * {\n      display: block;\n      margin-top: 16px;\n    }\n\n    mwc-linear-progress {\n      position: fixed;\n      --mdc-linear-progress-buffer-color: var(--primary);\n      --mdc-theme-primary: var(--secondary);\n      left: 0px;\n      top: 0px;\n      width: 100%;\n      pointer-events: none;\n      z-index: 1000;\n    }\n\n    tt {\n      font-family: 'Roboto Mono', monospace;\n      font-weight: 300;\n    }\n\n    .landing {\n      position: absolute;\n      text-align: center;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n      width: 100%;\n    }\n\n    .landing_icon:hover {\n      box-shadow: 0 12px 17px 2px rgba(0, 0, 0, 0.14),\n        0 5px 22px 4px rgba(0, 0, 0, 0.12), 0 7px 8px -4px rgba(0, 0, 0, 0.2);\n    }\n\n    .landing_icon {\n      margin: 12px;\n      border-radius: 16px;\n      width: 160px;\n      height: 140px;\n      text-align: center;\n      color: var(--mdc-theme-on-secondary);\n      background: var(--secondary);\n      --mdc-icon-button-size: 100px;\n      --mdc-icon-size: 100px;\n      --mdc-ripple-color: rgba(0, 0, 0, 0);\n      box-shadow: rgb(0 0 0 / 14%) 0px 6px 10px 0px,\n        rgb(0 0 0 / 12%) 0px 1px 18px 0px, rgb(0 0 0 / 20%) 0px 3px 5px -1px;\n      transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n    }\n\n    .landing_label {\n      width: 160px;\n      height: 50px;\n      margin-top: 100px;\n      margin-left: -30px;\n      font-family: 'Roboto', sans-serif;\n    }\n\n    .plugin.menu {\n      display: flex;\n    }\n\n    .plugin.validator {\n      display: flex;\n    }\n  "], ["\n    mwc-top-app-bar-fixed {\n      --mdc-theme-text-disabled-on-light: rgba(255, 255, 255, 0.38);\n    } /* hack to fix disabled icon buttons rendering black */\n\n    mwc-tab {\n      background-color: var(--primary);\n      --mdc-theme-primary: var(--mdc-theme-on-primary);\n    }\n\n    input[type='file'] {\n      display: none;\n    }\n\n    mwc-dialog {\n      --mdc-dialog-max-width: 98vw;\n    }\n\n    mwc-dialog > form {\n      display: flex;\n      flex-direction: column;\n    }\n\n    mwc-dialog > form > * {\n      display: block;\n      margin-top: 16px;\n    }\n\n    mwc-linear-progress {\n      position: fixed;\n      --mdc-linear-progress-buffer-color: var(--primary);\n      --mdc-theme-primary: var(--secondary);\n      left: 0px;\n      top: 0px;\n      width: 100%;\n      pointer-events: none;\n      z-index: 1000;\n    }\n\n    tt {\n      font-family: 'Roboto Mono', monospace;\n      font-weight: 300;\n    }\n\n    .landing {\n      position: absolute;\n      text-align: center;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n      width: 100%;\n    }\n\n    .landing_icon:hover {\n      box-shadow: 0 12px 17px 2px rgba(0, 0, 0, 0.14),\n        0 5px 22px 4px rgba(0, 0, 0, 0.12), 0 7px 8px -4px rgba(0, 0, 0, 0.2);\n    }\n\n    .landing_icon {\n      margin: 12px;\n      border-radius: 16px;\n      width: 160px;\n      height: 140px;\n      text-align: center;\n      color: var(--mdc-theme-on-secondary);\n      background: var(--secondary);\n      --mdc-icon-button-size: 100px;\n      --mdc-icon-size: 100px;\n      --mdc-ripple-color: rgba(0, 0, 0, 0);\n      box-shadow: rgb(0 0 0 / 14%) 0px 6px 10px 0px,\n        rgb(0 0 0 / 12%) 0px 1px 18px 0px, rgb(0 0 0 / 20%) 0px 3px 5px -1px;\n      transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n    }\n\n    .landing_label {\n      width: 160px;\n      height: 50px;\n      margin-top: 100px;\n      margin-left: -30px;\n      font-family: 'Roboto', sans-serif;\n    }\n\n    .plugin.menu {\n      display: flex;\n    }\n\n    .plugin.validator {\n      display: flex;\n    }\n  "])));
    __decorate([
        lit_element_1.property({ type: String })
    ], OpenSCD.prototype, "src");
    OpenSCD = __decorate([
        lit_element_1.customElement('open-scd')
    ], OpenSCD);
    return OpenSCD;
}(Waiting_js_1.Waiting(Hosting_js_1.Hosting(Setting_js_1.Setting(Wizarding_js_1.Wizarding(Plugging_js_1.Plugging(Editing_js_1.Editing(Historing_js_1.Historing(lit_element_1.LitElement)))))))));
exports.OpenSCD = OpenSCD;
var templateObject_1, templateObject_2;
