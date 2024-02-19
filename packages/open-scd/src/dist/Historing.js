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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.Historing = void 0;
var lit_element_1 = require("lit-element");
var if_defined_1 = require("lit-html/directives/if-defined");
var lit_translate_1 = require("lit-translate");
require("@material/mwc-button");
require("@material/mwc-dialog");
require("@material/mwc-icon");
require("@material/mwc-icon-button");
require("@material/mwc-icon-button-toggle");
require("@material/mwc-list");
require("@material/mwc-list/mwc-list-item");
require("@material/mwc-snackbar");
require("./filtered-list.js");
var foundation_js_1 = require("./foundation.js");
var icons_js_1 = require("./icons/icons.js");
var icons = {
    info: 'info',
    warning: 'warning',
    error: 'report'
};
function getPluginName(src) {
    var _a;
    var plugin = (JSON.parse((_a = localStorage.getItem('plugins')) !== null && _a !== void 0 ? _a : '[]').find(function (p) { return p.src === src; }));
    if (!plugin)
        return src;
    var name = plugin.name;
    return name || src;
}
function Historing(Base) {
    var HistoringElement = /** @class */ (function (_super) {
        __extends(HistoringElement, _super);
        function HistoringElement() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            /** All [[`LogEntry`]]s received so far through [[`LogEvent`]]s. */
            _this.log = [];
            /** All [[`CommitEntry`]]s received so far through [[`LogEvent`]]s */
            _this.history = [];
            /** Index of the last [[`EditorAction`]] applied. */
            _this.editCount = -1;
            _this.diagnoses = new Map();
            _this.undo = _this.undo.bind(_this);
            _this.redo = _this.redo.bind(_this);
            _this.onLog = _this.onLog.bind(_this);
            _this.addEventListener('log', _this.onLog);
            _this.addEventListener('issue', _this.onIssue);
            return _this;
        }
        Object.defineProperty(HistoringElement.prototype, "canUndo", {
            get: function () {
                return this.editCount >= 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(HistoringElement.prototype, "canRedo", {
            get: function () {
                return this.nextAction >= 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(HistoringElement.prototype, "previousAction", {
            get: function () {
                if (!this.canUndo)
                    return -1;
                return this.history
                    .slice(0, this.editCount)
                    .map(function (entry) { return (entry.kind == 'action' ? true : false); })
                    .lastIndexOf(true);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(HistoringElement.prototype, "nextAction", {
            get: function () {
                var index = this.history
                    .slice(this.editCount + 1)
                    .findIndex(function (entry) { return entry.kind == 'action'; });
                if (index >= 0)
                    index += this.editCount + 1;
                return index;
            },
            enumerable: false,
            configurable: true
        });
        HistoringElement.prototype.onIssue = function (de) {
            var issues = this.diagnoses.get(de.detail.validatorId);
            if (!issues)
                this.diagnoses.set(de.detail.validatorId, [de.detail]);
            else
                issues === null || issues === void 0 ? void 0 : issues.push(de.detail);
            this.latestIssue = de.detail;
            this.issueUI.close();
            this.issueUI.show();
        };
        HistoringElement.prototype.undo = function () {
            if (!this.canUndo)
                return false;
            this.dispatchEvent(foundation_js_1.newActionEvent(foundation_js_1.invert(this.history[this.editCount].action)));
            this.editCount = this.previousAction;
            return true;
        };
        HistoringElement.prototype.redo = function () {
            if (!this.canRedo)
                return false;
            this.dispatchEvent(foundation_js_1.newActionEvent(this.history[this.nextAction].action));
            this.editCount = this.nextAction;
            return true;
        };
        HistoringElement.prototype.onHistory = function (detail) {
            var entry = __assign({ time: new Date() }, detail);
            if (entry.kind === 'action') {
                if (entry.action.derived)
                    return;
                entry.action.derived = true;
                if (this.nextAction !== -1)
                    this.history.splice(this.nextAction);
                this.editCount = this.history.length;
            }
            this.history.push(entry);
            this.requestUpdate('history', []);
        };
        HistoringElement.prototype.onReset = function () {
            this.log = [];
            this.history = [];
            this.editCount = -1;
        };
        HistoringElement.prototype.onInfo = function (detail) {
            var entry = __assign({ time: new Date() }, detail);
            this.log.push(entry);
            if (!this.logUI.open) {
                var ui = {
                    error: this.errorUI,
                    warning: this.warningUI,
                    info: this.infoUI
                }[detail.kind];
                ui.close();
                ui.show();
            }
            if (detail.kind == 'error') {
                this.errorUI.close(); // hack to reset timeout
                this.errorUI.show();
            }
            this.requestUpdate('log', []);
        };
        HistoringElement.prototype.onLog = function (le) {
            switch (le.detail.kind) {
                case 'reset':
                    this.onReset();
                    break;
                case 'action':
                    this.onHistory(le.detail);
                    break;
                default:
                    this.onInfo(le.detail);
                    break;
            }
        };
        HistoringElement.prototype.performUpdate = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, new Promise(function (resolve) {
                                return requestAnimationFrame(function () { return resolve(); });
                            })];
                        case 1:
                            _a.sent();
                            _super.prototype.performUpdate.call(this);
                            return [2 /*return*/];
                    }
                });
            });
        };
        HistoringElement.prototype.renderLogEntry = function (entry, index, log) {
            var _a;
            return lit_element_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject([" <abbr title=\"", "\">\n        <mwc-list-item\n          class=\"", "\"\n          graphic=\"icon\"\n          ?twoline=", "\n          ?activated=", "\n        >\n          <span>\n            <!-- FIXME: replace tt with mwc-chip asap -->\n            <tt>", "</tt>\n            ", "</span\n          >\n          <span slot=\"secondary\">", "</span>\n          <mwc-icon\n            slot=\"graphic\"\n            style=\"--mdc-theme-text-icon-on-background:var(", ")\"\n            >", "</mwc-icon\n          >\n        </mwc-list-item></abbr\n      >"], [" <abbr title=\"", "\">\n        <mwc-list-item\n          class=\"", "\"\n          graphic=\"icon\"\n          ?twoline=", "\n          ?activated=", "\n        >\n          <span>\n            <!-- FIXME: replace tt with mwc-chip asap -->\n            <tt>", "</tt>\n            ", "</span\n          >\n          <span slot=\"secondary\">", "</span>\n          <mwc-icon\n            slot=\"graphic\"\n            style=\"--mdc-theme-text-icon-on-background:var(",
                ")\"\n            >", "</mwc-icon\n          >\n        </mwc-list-item></abbr\n      >"])), entry.title, entry.kind, !!entry.message, this.editCount == log.length - index - 1, (_a = entry.time) === null || _a === void 0 ? void 0 : _a.toLocaleString(), entry.title, entry.message, if_defined_1.ifDefined(icons_js_1.iconColors[entry.kind]), icons[entry.kind]);
        };
        HistoringElement.prototype.renderHistoryEntry = function (entry, index, history) {
            var _a;
            return lit_element_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject([" <abbr title=\"", "\">\n        <mwc-list-item\n          class=\"", "\"\n          graphic=\"icon\"\n          ?twoline=", "\n          ?activated=", "\n        >\n          <span>\n            <!-- FIXME: replace tt with mwc-chip asap -->\n            <tt>", "</tt>\n            ", "</span\n          >\n          <span slot=\"secondary\">", "</span>\n          <mwc-icon\n            slot=\"graphic\"\n            style=\"--mdc-theme-text-icon-on-background:var(", ")\"\n            >history</mwc-icon\n          >\n        </mwc-list-item></abbr\n      >"], [" <abbr title=\"", "\">\n        <mwc-list-item\n          class=\"", "\"\n          graphic=\"icon\"\n          ?twoline=", "\n          ?activated=", "\n        >\n          <span>\n            <!-- FIXME: replace tt with mwc-chip asap -->\n            <tt>", "</tt>\n            ", "</span\n          >\n          <span slot=\"secondary\">", "</span>\n          <mwc-icon\n            slot=\"graphic\"\n            style=\"--mdc-theme-text-icon-on-background:var(",
                ")\"\n            >history</mwc-icon\n          >\n        </mwc-list-item></abbr\n      >"])), entry.title, entry.kind, !!entry.message, this.editCount == history.length - index - 1, (_a = entry.time) === null || _a === void 0 ? void 0 : _a.toLocaleString(), entry.title, entry.message, if_defined_1.ifDefined(icons_js_1.iconColors[entry.kind]));
        };
        HistoringElement.prototype.renderLog = function () {
            if (this.log.length > 0)
                return this.log.slice().reverse().map(this.renderLogEntry, this);
            else
                return lit_element_1.html(templateObject_3 || (templateObject_3 = __makeTemplateObject(["<mwc-list-item disabled graphic=\"icon\">\n          <span>", "</span>\n          <mwc-icon slot=\"graphic\">info</mwc-icon>\n        </mwc-list-item>"], ["<mwc-list-item disabled graphic=\"icon\">\n          <span>", "</span>\n          <mwc-icon slot=\"graphic\">info</mwc-icon>\n        </mwc-list-item>"])), lit_translate_1.translate('log.placeholder'));
        };
        HistoringElement.prototype.renderHistory = function () {
            if (this.history.length > 0)
                return this.history
                    .slice()
                    .reverse()
                    .map(this.renderHistoryEntry, this);
            else
                return lit_element_1.html(templateObject_4 || (templateObject_4 = __makeTemplateObject(["<mwc-list-item disabled graphic=\"icon\">\n          <span>", "</span>\n          <mwc-icon slot=\"graphic\">info</mwc-icon>\n        </mwc-list-item>"], ["<mwc-list-item disabled graphic=\"icon\">\n          <span>", "</span>\n          <mwc-icon slot=\"graphic\">info</mwc-icon>\n        </mwc-list-item>"])), lit_translate_1.translate('history.placeholder'));
        };
        HistoringElement.prototype.renderIssueEntry = function (issue) {
            return lit_element_1.html(templateObject_5 || (templateObject_5 = __makeTemplateObject([" <abbr title=\"", "\"\n        ><mwc-list-item ?twoline=", ">\n          <span> ", "</span>\n          <span slot=\"secondary\">", "</span>\n        </mwc-list-item></abbr\n      >"], [" <abbr title=\"", "\"\n        ><mwc-list-item ?twoline=", ">\n          <span> ", "</span>\n          <span slot=\"secondary\">", "</span>\n        </mwc-list-item></abbr\n      >"])), issue.title + '\n' + issue.message, !!issue.message, issue.title, issue.message);
        };
        HistoringElement.prototype.renderValidatorsIssues = function (issues) {
            var _this = this;
            if (issues.length === 0)
                return [lit_element_1.html(templateObject_6 || (templateObject_6 = __makeTemplateObject([""], [""])))];
            return __spreadArrays([
                lit_element_1.html(templateObject_7 || (templateObject_7 = __makeTemplateObject(["<mwc-list-item noninteractive\n          >", "</mwc-list-item\n        >"], ["<mwc-list-item noninteractive\n          >", "</mwc-list-item\n        >"])), getPluginName(issues[0].validatorId)),
                lit_element_1.html(templateObject_8 || (templateObject_8 = __makeTemplateObject(["<li divider padded role=\"separator\"></li>"], ["<li divider padded role=\"separator\"></li>"])))
            ], issues.map(function (issue) { return _this.renderIssueEntry(issue); }));
        };
        HistoringElement.prototype.renderIssues = function () {
            var _this = this;
            var issueItems = [];
            this.diagnoses.forEach(function (issues) {
                _this.renderValidatorsIssues(issues).forEach(function (issueItem) {
                    return issueItems.push(issueItem);
                });
            });
            return issueItems.length
                ? issueItems
                : lit_element_1.html(templateObject_9 || (templateObject_9 = __makeTemplateObject(["<mwc-list-item disabled graphic=\"icon\">\n            <span>", "</span>\n            <mwc-icon slot=\"graphic\">info</mwc-icon>\n          </mwc-list-item>"], ["<mwc-list-item disabled graphic=\"icon\">\n            <span>", "</span>\n            <mwc-icon slot=\"graphic\">info</mwc-icon>\n          </mwc-list-item>"])), lit_translate_1.translate('diag.placeholder'));
        };
        HistoringElement.prototype.renderFilterButtons = function () {
            return Object.keys(icons).map(function (kind) { return lit_element_1.html(templateObject_10 || (templateObject_10 = __makeTemplateObject(["<mwc-icon-button-toggle id=\"", "filter\" on\n          >", "\n          ", "</mwc-icon-button-toggle\n        >"], ["<mwc-icon-button-toggle id=\"", "filter\" on\n          >", "\n          ", "</mwc-icon-button-toggle\n        >"])), kind, icons_js_1.getFilterIcon(kind, false), icons_js_1.getFilterIcon(kind, true)); });
        };
        HistoringElement.prototype.renderLogDialog = function () {
            return lit_element_1.html(templateObject_11 || (templateObject_11 = __makeTemplateObject([" <mwc-dialog id=\"log\" heading=\"", "\">\n        ", "\n        <mwc-list id=\"content\" wrapFocus>", "</mwc-list>\n        <mwc-button slot=\"primaryAction\" dialogaction=\"close\"\n          >", "</mwc-button\n        >\n      </mwc-dialog>"], [" <mwc-dialog id=\"log\" heading=\"", "\">\n        ", "\n        <mwc-list id=\"content\" wrapFocus>", "</mwc-list>\n        <mwc-button slot=\"primaryAction\" dialogaction=\"close\"\n          >", "</mwc-button\n        >\n      </mwc-dialog>"])), lit_translate_1.translate('log.name'), this.renderFilterButtons(), this.renderLog(), lit_translate_1.translate('close'));
        };
        HistoringElement.prototype.renderHistoryDialog = function () {
            return lit_element_1.html(templateObject_12 || (templateObject_12 = __makeTemplateObject([" <mwc-dialog\n        id=\"history\"\n        heading=\"", "\"\n      >\n        <mwc-list id=\"content\" wrapFocus>", "</mwc-list>\n        <mwc-button\n          icon=\"undo\"\n          label=\"", "\"\n          ?disabled=", "\n          @click=", "\n          slot=\"secondaryAction\"\n        ></mwc-button>\n        <mwc-button\n          icon=\"redo\"\n          label=\"", "\"\n          ?disabled=", "\n          @click=", "\n          slot=\"secondaryAction\"\n        ></mwc-button>\n        <mwc-button slot=\"primaryAction\" dialogaction=\"close\"\n          >", "</mwc-button\n        >\n      </mwc-dialog>"], [" <mwc-dialog\n        id=\"history\"\n        heading=\"", "\"\n      >\n        <mwc-list id=\"content\" wrapFocus>", "</mwc-list>\n        <mwc-button\n          icon=\"undo\"\n          label=\"", "\"\n          ?disabled=", "\n          @click=", "\n          slot=\"secondaryAction\"\n        ></mwc-button>\n        <mwc-button\n          icon=\"redo\"\n          label=\"", "\"\n          ?disabled=", "\n          @click=", "\n          slot=\"secondaryAction\"\n        ></mwc-button>\n        <mwc-button slot=\"primaryAction\" dialogaction=\"close\"\n          >", "</mwc-button\n        >\n      </mwc-dialog>"])), lit_translate_1.translate('history.name'), this.renderHistory(), lit_translate_1.translate('undo'), !this.canUndo, this.undo, lit_translate_1.translate('redo'), !this.canRedo, this.redo, lit_translate_1.translate('close'));
        };
        HistoringElement.prototype.render = function () {
            var _this = this;
            var _a, _b, _c, _d, _e, _f, _g, _h;
            return lit_element_1.html(templateObject_13 || (templateObject_13 = __makeTemplateObject(["", "\n        <style>\n          #log > mwc-icon-button-toggle {\n            position: absolute;\n            top: 8px;\n            right: 14px;\n          }\n          #log > mwc-icon-button-toggle:nth-child(2) {\n            right: 62px;\n          }\n          #log > mwc-icon-button-toggle:nth-child(3) {\n            right: 110px;\n          }\n          #log > mwc-icon-button-toggle:nth-child(4) {\n            right: 158px;\n          }\n          #content mwc-list-item.info,\n          #content mwc-list-item.warning,\n          #content mwc-list-item.error {\n            display: none;\n          }\n          #infofilter[on] ~ #content mwc-list-item.info {\n            display: flex;\n          }\n          #warningfilter[on] ~ #content mwc-list-item.warning {\n            display: flex;\n          }\n          #errorfilter[on] ~ #content mwc-list-item.error {\n            display: flex;\n          }\n\n          #infofilter[on] {\n            color: var(--cyan);\n          }\n\n          #warningfilter[on] {\n            color: var(--yellow);\n          }\n\n          #errorfilter[on] {\n            color: var(--red);\n          }\n\n          #actionfilter[on] {\n            color: var(--blue);\n          }\n\n          #log,\n          #history {\n            --mdc-dialog-min-width: 92vw;\n          }\n\n          #log > #filterContainer {\n            position: absolute;\n            top: 14px;\n            right: 14px;\n          }\n        </style>\n        ", " ", "\n        <mwc-dialog id=\"diagnostic\" heading=\"", "\">\n          <filtered-list id=\"content\" wrapFocus\n            >", "</filtered-list\n          >\n          <mwc-button slot=\"primaryAction\" dialogaction=\"close\"\n            >", "</mwc-button\n          >\n        </mwc-dialog>\n\n        <mwc-snackbar\n          id=\"info\"\n          timeoutMs=\"4000\"\n          labelText=\"", "\"\n        >\n          <mwc-icon-button icon=\"close\" slot=\"dismiss\"></mwc-icon-button>\n        </mwc-snackbar>\n        <mwc-snackbar\n          id=\"warning\"\n          timeoutMs=\"6000\"\n          labelText=\"", "\"\n        >\n          <mwc-button\n            slot=\"action\"\n            icon=\"history\"\n            @click=", "\n            >", "</mwc-button\n          >\n          <mwc-icon-button icon=\"close\" slot=\"dismiss\"></mwc-icon-button>\n        </mwc-snackbar>\n        <mwc-snackbar\n          id=\"error\"\n          timeoutMs=\"10000\"\n          labelText=\"", "\"\n        >\n          <mwc-button\n            slot=\"action\"\n            icon=\"history\"\n            @click=", "\n            >", "</mwc-button\n          >\n          <mwc-icon-button icon=\"close\" slot=\"dismiss\"></mwc-icon-button>\n        </mwc-snackbar>\n        <mwc-snackbar\n          id=\"issue\"\n          timeoutMs=\"10000\"\n          labelText=\"", "\"\n        >\n          <mwc-button\n            slot=\"action\"\n            icon=\"rule\"\n            @click=", "\n            >", "</mwc-button\n          >\n          <mwc-icon-button icon=\"close\" slot=\"dismiss\"></mwc-icon-button>\n        </mwc-snackbar>"], ["", "\n        <style>\n          #log > mwc-icon-button-toggle {\n            position: absolute;\n            top: 8px;\n            right: 14px;\n          }\n          #log > mwc-icon-button-toggle:nth-child(2) {\n            right: 62px;\n          }\n          #log > mwc-icon-button-toggle:nth-child(3) {\n            right: 110px;\n          }\n          #log > mwc-icon-button-toggle:nth-child(4) {\n            right: 158px;\n          }\n          #content mwc-list-item.info,\n          #content mwc-list-item.warning,\n          #content mwc-list-item.error {\n            display: none;\n          }\n          #infofilter[on] ~ #content mwc-list-item.info {\n            display: flex;\n          }\n          #warningfilter[on] ~ #content mwc-list-item.warning {\n            display: flex;\n          }\n          #errorfilter[on] ~ #content mwc-list-item.error {\n            display: flex;\n          }\n\n          #infofilter[on] {\n            color: var(--cyan);\n          }\n\n          #warningfilter[on] {\n            color: var(--yellow);\n          }\n\n          #errorfilter[on] {\n            color: var(--red);\n          }\n\n          #actionfilter[on] {\n            color: var(--blue);\n          }\n\n          #log,\n          #history {\n            --mdc-dialog-min-width: 92vw;\n          }\n\n          #log > #filterContainer {\n            position: absolute;\n            top: 14px;\n            right: 14px;\n          }\n        </style>\n        ", " ", "\n        <mwc-dialog id=\"diagnostic\" heading=\"", "\">\n          <filtered-list id=\"content\" wrapFocus\n            >", "</filtered-list\n          >\n          <mwc-button slot=\"primaryAction\" dialogaction=\"close\"\n            >", "</mwc-button\n          >\n        </mwc-dialog>\n\n        <mwc-snackbar\n          id=\"info\"\n          timeoutMs=\"4000\"\n          labelText=\"",
                "\"\n        >\n          <mwc-icon-button icon=\"close\" slot=\"dismiss\"></mwc-icon-button>\n        </mwc-snackbar>\n        <mwc-snackbar\n          id=\"warning\"\n          timeoutMs=\"6000\"\n          labelText=\"",
                "\"\n        >\n          <mwc-button\n            slot=\"action\"\n            icon=\"history\"\n            @click=", "\n            >", "</mwc-button\n          >\n          <mwc-icon-button icon=\"close\" slot=\"dismiss\"></mwc-icon-button>\n        </mwc-snackbar>\n        <mwc-snackbar\n          id=\"error\"\n          timeoutMs=\"10000\"\n          labelText=\"",
                "\"\n        >\n          <mwc-button\n            slot=\"action\"\n            icon=\"history\"\n            @click=", "\n            >", "</mwc-button\n          >\n          <mwc-icon-button icon=\"close\" slot=\"dismiss\"></mwc-icon-button>\n        </mwc-snackbar>\n        <mwc-snackbar\n          id=\"issue\"\n          timeoutMs=\"10000\"\n          labelText=\"",
                "\"\n        >\n          <mwc-button\n            slot=\"action\"\n            icon=\"rule\"\n            @click=", "\n            >", "</mwc-button\n          >\n          <mwc-icon-button icon=\"close\" slot=\"dismiss\"></mwc-icon-button>\n        </mwc-snackbar>"])), foundation_js_1.ifImplemented(_super.prototype.render.call(this)), this.renderLogDialog(), this.renderHistoryDialog(), lit_translate_1.translate('diag.name'), this.renderIssues(), lit_translate_1.translate('close'), (_b = (_a = this.log
                .slice()
                .reverse()
                .find(function (le) { return le.kind === 'info'; })) === null || _a === void 0 ? void 0 : _a.title) !== null && _b !== void 0 ? _b : lit_translate_1.get('log.snackbar.placeholder'), (_d = (_c = this.log
                .slice()
                .reverse()
                .find(function (le) { return le.kind === 'warning'; })) === null || _c === void 0 ? void 0 : _c.title) !== null && _d !== void 0 ? _d : lit_translate_1.get('log.snackbar.placeholder'), function () { return _this.logUI.show(); }, lit_translate_1.translate('log.snackbar.show'), (_f = (_e = this.log
                .slice()
                .reverse()
                .find(function (le) { return le.kind === 'error'; })) === null || _e === void 0 ? void 0 : _e.title) !== null && _f !== void 0 ? _f : lit_translate_1.get('log.snackbar.placeholder'), function () { return _this.logUI.show(); }, lit_translate_1.translate('log.snackbar.show'), (_h = (_g = this.latestIssue) === null || _g === void 0 ? void 0 : _g.title) !== null && _h !== void 0 ? _h : lit_translate_1.get('log.snackbar.placeholder'), function () { return _this.diagnosticUI.show(); }, lit_translate_1.translate('log.snackbar.show'));
        };
        __decorate([
            lit_element_1.property({ type: Array })
        ], HistoringElement.prototype, "log");
        __decorate([
            lit_element_1.property({ type: Array })
        ], HistoringElement.prototype, "history");
        __decorate([
            lit_element_1.property({ type: Number })
        ], HistoringElement.prototype, "editCount");
        __decorate([
            lit_element_1.property()
        ], HistoringElement.prototype, "diagnoses");
        __decorate([
            lit_element_1.state()
        ], HistoringElement.prototype, "latestIssue");
        __decorate([
            lit_element_1.query('#log')
        ], HistoringElement.prototype, "logUI");
        __decorate([
            lit_element_1.query('#history')
        ], HistoringElement.prototype, "historyUI");
        __decorate([
            lit_element_1.query('#diagnostic')
        ], HistoringElement.prototype, "diagnosticUI");
        __decorate([
            lit_element_1.query('#error')
        ], HistoringElement.prototype, "errorUI");
        __decorate([
            lit_element_1.query('#warning')
        ], HistoringElement.prototype, "warningUI");
        __decorate([
            lit_element_1.query('#info')
        ], HistoringElement.prototype, "infoUI");
        __decorate([
            lit_element_1.query('#issue')
        ], HistoringElement.prototype, "issueUI");
        return HistoringElement;
    }(Base));
    return HistoringElement;
}
exports.Historing = Historing;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13;
