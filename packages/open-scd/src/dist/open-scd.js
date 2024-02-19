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
exports.OpenSCD = exports.pluginIcons = void 0;
var lit_element_1 = require("lit-element");
var class_map_1 = require("lit-html/directives/class-map");
require("@material/mwc-icon");
require("@material/mwc-icon-button");
require("@material/mwc-linear-progress");
require("@material/mwc-list");
require("@material/mwc-list/mwc-list-item");
require("@material/mwc-tab");
require("@material/mwc-tab-bar");
require("@material/mwc-top-app-bar-fixed");
require("@material/mwc-drawer");
require("@material/mwc-button");
require("@material/mwc-dialog");
require("@material/mwc-formfield");
require("@material/mwc-list/mwc-check-list-item");
require("@material/mwc-list/mwc-radio-list-item");
require("@material/mwc-select");
require("@material/mwc-switch");
require("@material/mwc-textfield");
var foundation_js_1 = require("./foundation.js");
var Editing_js_1 = require("./Editing.js");
var Historing_js_1 = require("./Historing.js");
require("./addons/Settings.js");
require("./addons/Waiter.js");
require("./addons/Wizards.js");
var mwc_list_1 = require("@material/mwc-list");
var lit_translate_1 = require("lit-translate");
var plugins_js_1 = require("../public/js/plugins.js");
// PLUGGING INTERFACES
var pluginTags = new Map();
/**
 * Hashes `uri` using cyrb64 analogous to
 * https://github.com/bryc/code/blob/master/jshash/experimental/cyrb53.js .
 * @returns a valid customElement tagName containing the URI hash.
 */
function pluginTag(uri) {
    if (!pluginTags.has(uri)) {
        var h1 = 0xdeadbeef, h2 = 0x41c6ce57;
        for (var i = 0, ch = void 0; i < uri.length; i++) {
            ch = uri.charCodeAt(i);
            h1 = Math.imul(h1 ^ ch, 2654435761);
            h2 = Math.imul(h2 ^ ch, 1597334677);
        }
        h1 =
            Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
                Math.imul(h2 ^ (h2 >>> 13), 3266489909);
        h2 =
            Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
                Math.imul(h1 ^ (h1 >>> 13), 3266489909);
        pluginTags.set(uri, 'oscd-plugin' +
            ((h2 >>> 0).toString(16).padStart(8, '0') +
                (h1 >>> 0).toString(16).padStart(8, '0')));
    }
    return pluginTags.get(uri);
}
/**
 * This is a template literal tag function. See:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates
 *
 * Passes its arguments to LitElement's `html` tag after combining the first and
 * last expressions with the first two and last two static strings.
 * Throws unless the first and last expressions are identical strings.
 *
 * We need this to get around the expression location limitations documented in
 * https://lit.dev/docs/templates/expressions/#expression-locations
 *
 * After upgrading to Lit 2 we can use their static HTML functions instead:
 * https://lit.dev/docs/api/static-html/
 */
function staticTagHtml(oldStrings) {
    var oldArgs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        oldArgs[_i - 1] = arguments[_i];
    }
    var args = __spreadArrays(oldArgs);
    var firstArg = args.shift();
    var lastArg = args.pop();
    if (firstArg !== lastArg)
        throw new Error("Opening tag <" + firstArg + "> does not match closing tag </" + lastArg + ">.");
    var strings = __spreadArrays(oldStrings);
    var firstString = strings.shift();
    var secondString = strings.shift();
    var lastString = strings.pop();
    var penultimateString = strings.pop();
    strings.unshift("" + firstString + firstArg + secondString);
    strings.push("" + penultimateString + lastArg + lastString);
    return lit_element_1.html.apply(void 0, __spreadArrays([strings], args));
}
var menuPosition = ['top', 'middle', 'bottom'];
function withoutContent(plugin) {
    return __assign(__assign({}, plugin), { content: undefined });
}
function storePlugins(plugins) {
    localStorage.setItem('plugins', JSON.stringify(plugins.map(withoutContent)));
}
exports.pluginIcons = {
    editor: 'tab',
    menu: 'play_circle',
    validator: 'rule_folder',
    top: 'play_circle',
    middle: 'play_circle',
    bottom: 'play_circle'
};
function resetPlugins() {
    storePlugins(plugins_js_1.officialPlugins.map(function (plugin) {
        var _a;
        return {
            src: plugin.src,
            installed: (_a = plugin["default"]) !== null && _a !== void 0 ? _a : false,
            official: true
        };
    }));
}
var menuOrder = [
    'editor',
    'top',
    'validator',
    'middle',
    'bottom',
];
function menuCompare(a, b) {
    if (a.kind === b.kind && a.position === b.position)
        return 0;
    var earlier = menuOrder.find(function (kind) {
        return [a.kind, b.kind, a.position, b.position].includes(kind);
    });
    return [a.kind, a.position].includes(earlier) ? -1 : 1;
}
function compareNeedsDoc(a, b) {
    if (a.requireDoc === b.requireDoc)
        return 0;
    return a.requireDoc ? 1 : -1;
}
var loadedPlugins = new Set();
/** The `<open-scd>` custom element is the main entry point of the
 * Open Substation Configuration Designer. */
var OpenSCD = /** @class */ (function (_super) {
    __extends(OpenSCD, _super);
    function OpenSCD() {
        var _this = _super.call(this) || this;
        _this.currentSrc = '';
        // HOSTING
        /** The currently active editor tab. */
        _this.activeTab = 0;
        _this.validated = Promise.resolve();
        _this.shouldValidate = false;
        _this.handleKeyPress = _this.handleKeyPress.bind(_this);
        document.onkeydown = _this.handleKeyPress;
        _this.updatePlugins();
        _this.requestUpdate();
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
    OpenSCD.prototype.connectedCallback = function () {
        var _this = this;
        _super.prototype.connectedCallback.call(this);
        this.addEventListener('validate', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.shouldValidate = true;
                        return [4 /*yield*/, this.validated];
                    case 1:
                        _a.sent();
                        if (!this.shouldValidate)
                            return [2 /*return*/];
                        this.diagnoses.clear();
                        this.shouldValidate = false;
                        this.validated = Promise.allSettled(this.menuUI
                            .querySelector('mwc-list')
                            .items.filter(function (item) { return item.className === 'validator'; })
                            .map(function (item) {
                            return item.nextElementSibling.validate();
                        })).then();
                        this.dispatchEvent(foundation_js_1.newPendingStateEvent(this.validated));
                        return [2 /*return*/];
                }
            });
        }); });
        this.addEventListener('close-drawer', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.menuUI.open = false;
                return [2 /*return*/];
            });
        }); });
    };
    OpenSCD.prototype.renderMain = function () {
        return lit_element_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["", "", "", ""], ["", "", "", ""])), this.renderHosting(), this.renderPlugging(), _super.prototype.render.call(this));
    };
    OpenSCD.prototype.render = function () {
        return lit_element_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<oscd-waiter>\n      <oscd-settings .host=", ">\n        <oscd-wizards .host=", "> ", "</oscd-wizards>\n      </oscd-settings>\n    </oscd-waiter>"], ["<oscd-waiter>\n      <oscd-settings .host=", ">\n        <oscd-wizards .host=", "> ", "</oscd-wizards>\n      </oscd-settings>\n    </oscd-waiter>"])), this, this, this.renderMain());
    };
    Object.defineProperty(OpenSCD.prototype, "menu", {
        get: function () {
            var _this = this;
            var topMenu = [];
            var middleMenu = [];
            var bottomMenu = [];
            var validators = [];
            this.topMenu.forEach(function (plugin) {
                return topMenu.push({
                    icon: plugin.icon || exports.pluginIcons['menu'],
                    name: plugin.name,
                    action: function (ae) {
                        _this.dispatchEvent(foundation_js_1.newPendingStateEvent((ae.target.items[ae.detail.index].nextElementSibling).run()));
                    },
                    disabled: function () { return plugin.requireDoc && _this.doc === null; },
                    content: plugin.content,
                    kind: 'top'
                });
            });
            this.middleMenu.forEach(function (plugin) {
                return middleMenu.push({
                    icon: plugin.icon || exports.pluginIcons['menu'],
                    name: plugin.name,
                    action: function (ae) {
                        _this.dispatchEvent(foundation_js_1.newPendingStateEvent((ae.target.items[ae.detail.index].nextElementSibling).run()));
                    },
                    disabled: function () { return plugin.requireDoc && _this.doc === null; },
                    content: plugin.content,
                    kind: 'middle'
                });
            });
            this.bottomMenu.forEach(function (plugin) {
                return bottomMenu.push({
                    icon: plugin.icon || exports.pluginIcons['menu'],
                    name: plugin.name,
                    action: function (ae) {
                        _this.dispatchEvent(foundation_js_1.newPendingStateEvent((ae.target.items[ae.detail.index].nextElementSibling).run()));
                    },
                    disabled: function () { return plugin.requireDoc && _this.doc === null; },
                    content: plugin.content,
                    kind: 'middle'
                });
            });
            this.validators.forEach(function (plugin) {
                return validators.push({
                    icon: plugin.icon || exports.pluginIcons['validator'],
                    name: plugin.name,
                    action: function (ae) {
                        if (_this.diagnoses.get(plugin.src))
                            _this.diagnoses.get(plugin.src).length = 0;
                        _this.dispatchEvent(foundation_js_1.newPendingStateEvent((ae.target.items[ae.detail.index].nextElementSibling).validate()));
                    },
                    disabled: function () { return _this.doc === null; },
                    content: plugin.content,
                    kind: 'validator'
                });
            });
            if (middleMenu.length > 0)
                middleMenu.push('divider');
            if (bottomMenu.length > 0)
                bottomMenu.push('divider');
            return __spreadArrays([
                'divider'
            ], topMenu, [
                'divider',
                {
                    icon: 'undo',
                    name: 'undo',
                    actionItem: true,
                    action: this.undo,
                    disabled: function () { return !_this.canUndo; },
                    kind: 'static'
                },
                {
                    icon: 'redo',
                    name: 'redo',
                    actionItem: true,
                    action: this.redo,
                    disabled: function () { return !_this.canRedo; },
                    kind: 'static'
                }
            ], validators, [
                {
                    icon: 'list',
                    name: 'menu.viewLog',
                    actionItem: true,
                    action: function () { return _this.logUI.show(); },
                    kind: 'static'
                },
                {
                    icon: 'history',
                    name: 'menu.viewHistory',
                    actionItem: true,
                    action: function () { return _this.historyUI.show(); },
                    kind: 'static'
                },
                {
                    icon: 'rule',
                    name: 'menu.viewDiag',
                    actionItem: true,
                    action: function () { return _this.diagnosticUI.show(); },
                    kind: 'static'
                },
                'divider'
            ], middleMenu, [
                {
                    icon: 'settings',
                    name: 'settings.title',
                    action: function () {
                        _this.dispatchEvent(foundation_js_1.newSettingsUIEvent(true));
                    },
                    kind: 'static'
                }
            ], bottomMenu, [
                {
                    icon: 'extension',
                    name: 'plugins.heading',
                    action: function () { return _this.pluginUI.show(); },
                    kind: 'static'
                },
            ]);
        },
        enumerable: false,
        configurable: true
    });
    OpenSCD.prototype.renderMenuItem = function (me) {
        var _a, _b;
        if (me === 'divider')
            return lit_element_1.html(templateObject_3 || (templateObject_3 = __makeTemplateObject(["<li divider padded role=\"separator\"></li>"], ["<li divider padded role=\"separator\"></li>"])));
        if (me.actionItem)
            return lit_element_1.html(templateObject_4 || (templateObject_4 = __makeTemplateObject([""], [""])));
        return lit_element_1.html(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n      <mwc-list-item\n        class=\"", "\"\n        iconid=\"", "\"\n        graphic=\"icon\"\n        .disabled=", "\n        ><mwc-icon slot=\"graphic\">", "</mwc-icon>\n        <span>", "</span>\n        ", "\n      </mwc-list-item>\n      ", "\n    "], ["\n      <mwc-list-item\n        class=\"", "\"\n        iconid=\"", "\"\n        graphic=\"icon\"\n        .disabled=", "\n        ><mwc-icon slot=\"graphic\">", "</mwc-icon>\n        <span>", "</span>\n        ",
            "\n      </mwc-list-item>\n      ", "\n    "])), me.kind, me.icon, ((_a = me.disabled) === null || _a === void 0 ? void 0 : _a.call(me)) || !me.action, me.icon, lit_translate_1.translate(me.name), me.hint
            ? lit_element_1.html(templateObject_5 || (templateObject_5 = __makeTemplateObject(["<span slot=\"secondary\"><tt>", "</tt></span>"], ["<span slot=\"secondary\"><tt>", "</tt></span>"])), me.hint) : '', (_b = me.content) !== null && _b !== void 0 ? _b : '');
    };
    OpenSCD.prototype.renderActionItem = function (me) {
        var _a;
        if (me !== 'divider' && me.actionItem)
            return lit_element_1.html(templateObject_7 || (templateObject_7 = __makeTemplateObject(["<mwc-icon-button\n        slot=\"actionItems\"\n        icon=\"", "\"\n        label=\"", "\"\n        ?disabled=", "\n        @click=", "\n      ></mwc-icon-button>"], ["<mwc-icon-button\n        slot=\"actionItems\"\n        icon=\"", "\"\n        label=\"", "\"\n        ?disabled=", "\n        @click=", "\n      ></mwc-icon-button>"])), me.icon, me.name, ((_a = me.disabled) === null || _a === void 0 ? void 0 : _a.call(me)) || !me.action, me.action);
        else
            return lit_element_1.html(templateObject_8 || (templateObject_8 = __makeTemplateObject([""], [""])));
    };
    OpenSCD.prototype.renderEditorTab = function (_a) {
        var name = _a.name, icon = _a.icon;
        return lit_element_1.html(templateObject_9 || (templateObject_9 = __makeTemplateObject(["<mwc-tab label=", " icon=", ">\n    </mwc-tab>"], ["<mwc-tab label=", " icon=", ">\n    </mwc-tab>"])), lit_translate_1.translate(name), icon || 'edit');
    };
    OpenSCD.prototype.renderHosting = function () {
        var _this = this;
        var _a;
        return lit_element_1.html(templateObject_15 || (templateObject_15 = __makeTemplateObject([" <mwc-drawer\n        class=\"mdc-theme--surface\"\n        hasheader\n        type=\"modal\"\n        id=\"menu\"\n      >\n        <span slot=\"title\">", "</span>\n        ", "\n        <mwc-list\n          wrapFocus\n          @action=", "\n        >\n          ", "\n        </mwc-list>\n\n        <mwc-top-app-bar-fixed slot=\"appContent\">\n          <mwc-icon-button\n            icon=\"menu\"\n            label=\"Menu\"\n            slot=\"navigationIcon\"\n            @click=", "\n          ></mwc-icon-button>\n          <div slot=\"title\" id=\"title\">", "</div>\n          ", "\n          ", "\n        </mwc-top-app-bar-fixed>\n      </mwc-drawer>\n\n      ", ""], [" <mwc-drawer\n        class=\"mdc-theme--surface\"\n        hasheader\n        type=\"modal\"\n        id=\"menu\"\n      >\n        <span slot=\"title\">", "</span>\n        ",
            "\n        <mwc-list\n          wrapFocus\n          @action=",
            "\n        >\n          ", "\n        </mwc-list>\n\n        <mwc-top-app-bar-fixed slot=\"appContent\">\n          <mwc-icon-button\n            icon=\"menu\"\n            label=\"Menu\"\n            slot=\"navigationIcon\"\n            @click=", "\n          ></mwc-icon-button>\n          <div slot=\"title\" id=\"title\">", "</div>\n          ", "\n          ",
            "\n        </mwc-top-app-bar-fixed>\n      </mwc-drawer>\n\n      ",
            ""])), lit_translate_1.translate('menu.title'), this.docName
            ? lit_element_1.html(templateObject_10 || (templateObject_10 = __makeTemplateObject(["<span slot=\"subtitle\">", "</span>"], ["<span slot=\"subtitle\">", "</span>"])), this.docName) : '', function (ae) {
            var _a, _b;
            //FIXME: dirty hack to be fixed in open-scd-core
            //       if clause not necessary when oscd... components in open-scd not list
            if (ae.target instanceof mwc_list_1.List)
                (_b = (_a = (_this.menu.filter(function (item) { return item !== 'divider' && !item.actionItem; })[ae.detail.index])) === null || _a === void 0 ? void 0 : _a.action) === null || _b === void 0 ? void 0 : _b.call(_a, ae);
        }, this.menu.map(this.renderMenuItem), function () { return (_this.menuUI.open = true); }, this.docName, this.menu.map(this.renderActionItem), this.doc
            ? lit_element_1.html(templateObject_11 || (templateObject_11 = __makeTemplateObject(["<mwc-tab-bar\n                @MDCTabBar:activated=", "\n              >\n                ", "\n              </mwc-tab-bar>"], ["<mwc-tab-bar\n                @MDCTabBar:activated=",
                "\n              >\n                ", "\n              </mwc-tab-bar>"])), function (e) {
                return (_this.activeTab = e.detail.index);
            }, this.editors.map(this.renderEditorTab)) : "", this.doc && ((_a = this.editors[this.activeTab]) === null || _a === void 0 ? void 0 : _a.content)
            ? this.editors[this.activeTab].content
            : lit_element_1.html(templateObject_14 || (templateObject_14 = __makeTemplateObject(["<div class=\"landing\">\n            ", "\n          </div>"], ["<div class=\"landing\">\n            ",
                "\n          </div>"])), this.menu.filter(function (mi) { return mi !== 'divider'; }).map(function (mi, index) {
                var _a;
                return mi.kind === 'top' && !((_a = mi.disabled) === null || _a === void 0 ? void 0 : _a.call(mi))
                    ? lit_element_1.html(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n                      <mwc-icon-button\n                        class=\"landing_icon\"\n                        icon=\"", "\"\n                        @click=\"", "\"\n                      >\n                        <div class=\"landing_label\">", "</div>\n                      </mwc-icon-button>\n                    "], ["\n                      <mwc-icon-button\n                        class=\"landing_icon\"\n                        icon=\"", "\"\n                        @click=\"",
                        "\"\n                      >\n                        <div class=\"landing_label\">", "</div>\n                      </mwc-icon-button>\n                    "])), mi.icon, function () {
                        return (_this.menuUI.querySelector('mwc-list').items[index]).click();
                    }, mi.name) : lit_element_1.html(templateObject_13 || (templateObject_13 = __makeTemplateObject([""], [""])));
            })));
    };
    Object.defineProperty(OpenSCD.prototype, "editors", {
        get: function () {
            return this.plugins.filter(function (plugin) { return plugin.installed && plugin.kind === 'editor'; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OpenSCD.prototype, "validators", {
        get: function () {
            return this.plugins.filter(function (plugin) { return plugin.installed && plugin.kind === 'validator'; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OpenSCD.prototype, "menuEntries", {
        get: function () {
            return this.plugins.filter(function (plugin) { return plugin.installed && plugin.kind === 'menu'; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OpenSCD.prototype, "topMenu", {
        get: function () {
            return this.menuEntries.filter(function (plugin) { return plugin.position === 'top'; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OpenSCD.prototype, "middleMenu", {
        get: function () {
            return this.menuEntries.filter(function (plugin) { return plugin.position === 'middle'; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OpenSCD.prototype, "bottomMenu", {
        get: function () {
            return this.menuEntries.filter(function (plugin) { return plugin.position === 'bottom'; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OpenSCD.prototype, "plugins", {
        get: function () {
            return this.storedPlugins
                .map(function (plugin) {
                if (!plugin.official)
                    return plugin;
                var officialPlugin = plugins_js_1.officialPlugins.find(function (needle) { return needle.src === plugin.src; });
                return __assign(__assign({}, officialPlugin), plugin);
            })
                .sort(compareNeedsDoc)
                .sort(menuCompare);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OpenSCD.prototype, "storedPlugins", {
        get: function () {
            var _this = this;
            var _a;
            return (JSON.parse((_a = localStorage.getItem('plugins')) !== null && _a !== void 0 ? _a : '[]', function (key, value) {
                return value.src && value.installed ? _this.addContent(value) : value;
            }));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OpenSCD.prototype, "locale", {
        get: function () {
            return navigator.language || 'en-US';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OpenSCD.prototype, "docs", {
        get: function () {
            var docs = {};
            if (this.doc) {
                docs[this.docName] = this.doc;
            }
            return docs;
        },
        enumerable: false,
        configurable: true
    });
    OpenSCD.prototype.setPlugins = function (indices) {
        var newPlugins = this.plugins.map(function (plugin, index) {
            return __assign(__assign({}, plugin), { installed: indices.has(index) });
        });
        storePlugins(newPlugins);
        this.requestUpdate();
    };
    OpenSCD.prototype.updatePlugins = function () {
        var stored = this.storedPlugins;
        var officialStored = stored.filter(function (p) { return p.official; });
        var newOfficial = plugins_js_1.officialPlugins
            .filter(function (p) { return !officialStored.find(function (o) { return o.src === p.src; }); })
            .map(function (plugin) {
            var _a;
            return {
                src: plugin.src,
                installed: (_a = plugin["default"]) !== null && _a !== void 0 ? _a : false,
                official: true
            };
        });
        var oldOfficial = officialStored.filter(function (p) { return !plugins_js_1.officialPlugins.find(function (o) { return p.src === o.src; }); });
        var newPlugins = stored.filter(function (p) { return !oldOfficial.find(function (o) { return p.src === o.src; }); });
        newOfficial.map(function (p) { return newPlugins.push(p); });
        storePlugins(newPlugins);
    };
    OpenSCD.prototype.addExternalPlugin = function (plugin) {
        if (this.storedPlugins.some(function (p) { return p.src === plugin.src; }))
            return;
        var newPlugins = this.storedPlugins;
        newPlugins.push(plugin);
        storePlugins(newPlugins);
    };
    OpenSCD.prototype.addContent = function (plugin) {
        var tag = pluginTag(plugin.src);
        if (!loadedPlugins.has(tag)) {
            loadedPlugins.add(tag);
            Promise.resolve().then(function () { return require(plugin.src); }).then(function (mod) { return customElements.define(tag, mod["default"]); });
        }
        return __assign(__assign({}, plugin), { content: staticTagHtml(templateObject_16 || (templateObject_16 = __makeTemplateObject(["<", "\n            .doc=", "\n            .docName=", "\n            .editCount=", "\n            .docId=", "\n            .pluginId=", "\n            .nsdoc=", "\n            .docs=", "\n            .locale=", "\n            class=\"", "\"\n          ></", ">"], ["<", "\n            .doc=", "\n            .docName=", "\n            .editCount=", "\n            .docId=", "\n            .pluginId=", "\n            .nsdoc=", "\n            .docs=", "\n            .locale=", "\n            class=\"",
                "\"\n          ></", ">"])), tag, this.doc, this.docName, this.editCount, this.docId, plugin.src, this.nsdoc, this.docs, this.locale, class_map_1.classMap({
                plugin: true,
                menu: plugin.kind === 'menu',
                validator: plugin.kind === 'validator',
                editor: plugin.kind === 'editor'
            }), tag) });
    };
    OpenSCD.prototype.handleAddPlugin = function () {
        var pluginSrcInput = (this.pluginDownloadUI.querySelector('#pluginSrcInput'));
        var pluginNameInput = (this.pluginDownloadUI.querySelector('#pluginNameInput'));
        var pluginKindList = (this.pluginDownloadUI.querySelector('#pluginKindList'));
        var requireDoc = (this.pluginDownloadUI.querySelector('#requireDoc'));
        var positionList = (this.pluginDownloadUI.querySelector('#menuPosition'));
        if (!(pluginSrcInput.checkValidity() &&
            pluginNameInput.checkValidity() &&
            pluginKindList.selected &&
            requireDoc &&
            positionList.selected))
            return;
        this.addExternalPlugin({
            src: pluginSrcInput.value,
            name: pluginNameInput.value,
            kind: pluginKindList.selected.value,
            requireDoc: requireDoc.checked,
            position: positionList.value,
            installed: true
        });
        this.requestUpdate();
        this.pluginUI.requestUpdate();
        this.pluginDownloadUI.close();
    };
    OpenSCD.prototype.renderDownloadUI = function () {
        var _this = this;
        return lit_element_1.html(templateObject_18 || (templateObject_18 = __makeTemplateObject(["\n      <mwc-dialog id=\"pluginAdd\" heading=\"", "\">\n        <div style=\"display: flex; flex-direction: column; row-gap: 8px;\">\n          <p style=\"color:var(--mdc-theme-error);\">\n            ", "\n          </p>\n          <mwc-textfield\n            label=\"", "\"\n            helper=\"", "\"\n            required\n            id=\"pluginNameInput\"\n          ></mwc-textfield>\n          <mwc-list id=\"pluginKindList\">\n            <mwc-radio-list-item\n              id=\"editor\"\n              value=\"editor\"\n              hasMeta\n              selected\n              left\n              >", "<mwc-icon slot=\"meta\"\n                >", "</mwc-icon\n              ></mwc-radio-list-item\n            >\n            <mwc-radio-list-item id=\"menu\" value=\"menu\" hasMeta left\n              >", "<mwc-icon slot=\"meta\"\n                >", "</mwc-icon\n              ></mwc-radio-list-item\n            >\n            <div id=\"menudetails\">\n              <mwc-formfield\n                id=\"enabledefault\"\n                label=\"", "\"\n              >\n                <mwc-switch id=\"requireDoc\" checked></mwc-switch>\n              </mwc-formfield>\n              <mwc-select id=\"menuPosition\" value=\"middle\" fixedMenuPosition\n                >", "</mwc-select\n              >\n            </div>\n            <style>\n              #menudetails {\n                display: none;\n                padding: 20px;\n                padding-left: 50px;\n              }\n              #menu[selected] ~ #menudetails {\n                display: grid;\n              }\n              #enabledefault {\n                padding-bottom: 20px;\n              }\n              #menuPosition {\n                max-width: 250px;\n              }\n            </style>\n            <mwc-radio-list-item id=\"validator\" value=\"validator\" hasMeta left\n              >", "<mwc-icon slot=\"meta\"\n                >", "</mwc-icon\n              ></mwc-radio-list-item\n            >\n          </mwc-list>\n          <mwc-textfield\n            label=\"", "\"\n            helper=\"", "\"\n            placeholder=\"http://example.com/plugin.js\"\n            type=\"url\"\n            required\n            id=\"pluginSrcInput\"\n          ></mwc-textfield>\n        </div>\n        <mwc-button\n          slot=\"secondaryAction\"\n          dialogAction=\"close\"\n          label=\"", "\"\n        ></mwc-button>\n        <mwc-button\n          slot=\"primaryAction\"\n          icon=\"add\"\n          label=\"", "\"\n          trailingIcon\n          @click=", "\n        ></mwc-button>\n      </mwc-dialog>\n    "], ["\n      <mwc-dialog id=\"pluginAdd\" heading=\"", "\">\n        <div style=\"display: flex; flex-direction: column; row-gap: 8px;\">\n          <p style=\"color:var(--mdc-theme-error);\">\n            ", "\n          </p>\n          <mwc-textfield\n            label=\"", "\"\n            helper=\"", "\"\n            required\n            id=\"pluginNameInput\"\n          ></mwc-textfield>\n          <mwc-list id=\"pluginKindList\">\n            <mwc-radio-list-item\n              id=\"editor\"\n              value=\"editor\"\n              hasMeta\n              selected\n              left\n              >", "<mwc-icon slot=\"meta\"\n                >", "</mwc-icon\n              ></mwc-radio-list-item\n            >\n            <mwc-radio-list-item id=\"menu\" value=\"menu\" hasMeta left\n              >", "<mwc-icon slot=\"meta\"\n                >", "</mwc-icon\n              ></mwc-radio-list-item\n            >\n            <div id=\"menudetails\">\n              <mwc-formfield\n                id=\"enabledefault\"\n                label=\"", "\"\n              >\n                <mwc-switch id=\"requireDoc\" checked></mwc-switch>\n              </mwc-formfield>\n              <mwc-select id=\"menuPosition\" value=\"middle\" fixedMenuPosition\n                >",
            "</mwc-select\n              >\n            </div>\n            <style>\n              #menudetails {\n                display: none;\n                padding: 20px;\n                padding-left: 50px;\n              }\n              #menu[selected] ~ #menudetails {\n                display: grid;\n              }\n              #enabledefault {\n                padding-bottom: 20px;\n              }\n              #menuPosition {\n                max-width: 250px;\n              }\n            </style>\n            <mwc-radio-list-item id=\"validator\" value=\"validator\" hasMeta left\n              >", "<mwc-icon slot=\"meta\"\n                >", "</mwc-icon\n              ></mwc-radio-list-item\n            >\n          </mwc-list>\n          <mwc-textfield\n            label=\"", "\"\n            helper=\"", "\"\n            placeholder=\"http://example.com/plugin.js\"\n            type=\"url\"\n            required\n            id=\"pluginSrcInput\"\n          ></mwc-textfield>\n        </div>\n        <mwc-button\n          slot=\"secondaryAction\"\n          dialogAction=\"close\"\n          label=\"", "\"\n        ></mwc-button>\n        <mwc-button\n          slot=\"primaryAction\"\n          icon=\"add\"\n          label=\"", "\"\n          trailingIcon\n          @click=", "\n        ></mwc-button>\n      </mwc-dialog>\n    "])), lit_translate_1.translate('plugins.add.heading'), lit_translate_1.translate('plugins.add.warning'), lit_translate_1.translate('plugins.add.name'), lit_translate_1.translate('plugins.add.nameHelper'), lit_translate_1.translate('plugins.editor'), exports.pluginIcons['editor'], lit_translate_1.translate('plugins.menu'), exports.pluginIcons['menu'], lit_translate_1.translate('plugins.requireDoc'), Object.values(menuPosition).map(function (menutype) {
            return lit_element_1.html(templateObject_17 || (templateObject_17 = __makeTemplateObject(["<mwc-list-item value=\"", "\"\n                      >", "</mwc-list-item\n                    >"], ["<mwc-list-item value=\"", "\"\n                      >", "</mwc-list-item\n                    >"])), menutype, lit_translate_1.translate('plugins.' + menutype));
        }), lit_translate_1.translate('plugins.validator'), exports.pluginIcons['validator'], lit_translate_1.translate('plugins.add.src'), lit_translate_1.translate('plugins.add.srcHelper'), lit_translate_1.translate('cancel'), lit_translate_1.translate('add'), function () { return _this.handleAddPlugin(); });
    };
    OpenSCD.prototype.renderPluginKind = function (type, plugins) {
        return lit_element_1.html(templateObject_20 || (templateObject_20 = __makeTemplateObject(["\n      ", "\n    "], ["\n      ",
            "\n    "])), plugins.map(function (plugin) {
            return lit_element_1.html(templateObject_19 || (templateObject_19 = __makeTemplateObject(["<mwc-check-list-item\n            class=\"", "\"\n            value=\"", "\"\n            ?selected=", "\n            hasMeta\n            left\n          >\n            <mwc-icon slot=\"meta\"\n              >", "</mwc-icon\n            >\n            ", "\n          </mwc-check-list-item>"], ["<mwc-check-list-item\n            class=\"", "\"\n            value=\"", "\"\n            ?selected=", "\n            hasMeta\n            left\n          >\n            <mwc-icon slot=\"meta\"\n              >", "</mwc-icon\n            >\n            ", "\n          </mwc-check-list-item>"])), plugin.official ? 'official' : 'external', plugin.src, plugin.installed, plugin.icon || exports.pluginIcons[plugin.kind], plugin.name);
        }));
    };
    OpenSCD.prototype.renderPluginUI = function () {
        var _this = this;
        return lit_element_1.html(templateObject_21 || (templateObject_21 = __makeTemplateObject(["\n      <mwc-dialog\n        stacked\n        id=\"pluginManager\"\n        heading=\"", "\"\n      >\n        <mwc-list\n          id=\"pluginList\"\n          multi\n          @selected=", "\n        >\n          <mwc-list-item graphic=\"avatar\" noninteractive\n            ><strong>", "</strong\n            ><mwc-icon slot=\"graphic\" class=\"inverted\"\n              >", "</mwc-icon\n            ></mwc-list-item\n          >\n          <li divider role=\"separator\"></li>\n          ", "\n          <mwc-list-item graphic=\"avatar\" noninteractive\n            ><strong>", "</strong\n            ><mwc-icon slot=\"graphic\" class=\"inverted\"\n              ><strong>", "</strong></mwc-icon\n            ></mwc-list-item\n          >\n          <li divider role=\"separator\"></li>\n          ", "\n          <li divider role=\"separator\" inset></li>\n          ", "\n          <li divider role=\"separator\" inset></li>\n          ", "\n          <li divider role=\"separator\" inset></li>\n          ", "\n        </mwc-list>\n        <mwc-button\n          slot=\"secondaryAction\"\n          icon=\"refresh\"\n          label=\"", "\"\n          @click=", "\n          style=\"--mdc-theme-primary: var(--mdc-theme-error)\"\n        >\n        </mwc-button>\n        <mwc-button\n          slot=\"secondaryAction\"\n          icon=\"\"\n          label=\"", "\"\n          dialogAction=\"close\"\n        ></mwc-button>\n        <mwc-button\n          outlined\n          trailingIcon\n          slot=\"primaryAction\"\n          icon=\"library_add\"\n          label=\"", "&hellip;\"\n          @click=", "\n        >\n        </mwc-button>\n      </mwc-dialog>\n    "], ["\n      <mwc-dialog\n        stacked\n        id=\"pluginManager\"\n        heading=\"", "\"\n      >\n        <mwc-list\n          id=\"pluginList\"\n          multi\n          @selected=",
            "\n        >\n          <mwc-list-item graphic=\"avatar\" noninteractive\n            ><strong>", "</strong\n            ><mwc-icon slot=\"graphic\" class=\"inverted\"\n              >", "</mwc-icon\n            ></mwc-list-item\n          >\n          <li divider role=\"separator\"></li>\n          ",
            "\n          <mwc-list-item graphic=\"avatar\" noninteractive\n            ><strong>", "</strong\n            ><mwc-icon slot=\"graphic\" class=\"inverted\"\n              ><strong>", "</strong></mwc-icon\n            ></mwc-list-item\n          >\n          <li divider role=\"separator\"></li>\n          ",
            "\n          <li divider role=\"separator\" inset></li>\n          ",
            "\n          <li divider role=\"separator\" inset></li>\n          ",
            "\n          <li divider role=\"separator\" inset></li>\n          ",
            "\n        </mwc-list>\n        <mwc-button\n          slot=\"secondaryAction\"\n          icon=\"refresh\"\n          label=\"", "\"\n          @click=",
            "\n          style=\"--mdc-theme-primary: var(--mdc-theme-error)\"\n        >\n        </mwc-button>\n        <mwc-button\n          slot=\"secondaryAction\"\n          icon=\"\"\n          label=\"", "\"\n          dialogAction=\"close\"\n        ></mwc-button>\n        <mwc-button\n          outlined\n          trailingIcon\n          slot=\"primaryAction\"\n          icon=\"library_add\"\n          label=\"", "&hellip;\"\n          @click=", "\n        >\n        </mwc-button>\n      </mwc-dialog>\n    "])), lit_translate_1.translate('plugins.heading'), function (e) {
            return _this.setPlugins(e.detail.index);
        }, lit_translate_1.translate("plugins.editor"), exports.pluginIcons['editor'], this.renderPluginKind('editor', this.plugins.filter(function (p) { return p.kind === 'editor'; })), lit_translate_1.translate("plugins.menu"), exports.pluginIcons['menu'], this.renderPluginKind('top', this.plugins.filter(function (p) { return p.kind === 'menu' && p.position === 'top'; })), this.renderPluginKind('validator', this.plugins.filter(function (p) { return p.kind === 'validator'; })), this.renderPluginKind('middle', this.plugins.filter(function (p) { return p.kind === 'menu' && p.position === 'middle'; })), this.renderPluginKind('bottom', this.plugins.filter(function (p) { return p.kind === 'menu' && p.position === 'bottom'; })), lit_translate_1.translate('reset'), function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                resetPlugins();
                this.requestUpdate();
                return [2 /*return*/];
            });
        }); }, lit_translate_1.translate('close'), lit_translate_1.translate('plugins.add.heading'), function () { return _this.pluginDownloadUI.show(); });
    };
    OpenSCD.prototype.renderPlugging = function () {
        return lit_element_1.html(templateObject_22 || (templateObject_22 = __makeTemplateObject([" ", " ", " "], [" ", " ", " "])), this.renderPluginUI(), this.renderDownloadUI());
    };
    OpenSCD.styles = lit_element_1.css(templateObject_23 || (templateObject_23 = __makeTemplateObject(["\n    mwc-top-app-bar-fixed {\n      --mdc-theme-text-disabled-on-light: rgba(255, 255, 255, 0.38);\n    } /* hack to fix disabled icon buttons rendering black */\n\n    mwc-tab {\n      background-color: var(--primary);\n      --mdc-theme-primary: var(--mdc-theme-on-primary);\n    }\n\n    input[type='file'] {\n      display: none;\n    }\n\n    mwc-dialog {\n      --mdc-dialog-max-width: 98vw;\n    }\n\n    mwc-dialog > form {\n      display: flex;\n      flex-direction: column;\n    }\n\n    mwc-dialog > form > * {\n      display: block;\n      margin-top: 16px;\n    }\n\n    mwc-linear-progress {\n      position: fixed;\n      --mdc-linear-progress-buffer-color: var(--primary);\n      --mdc-theme-primary: var(--secondary);\n      left: 0px;\n      top: 0px;\n      width: 100%;\n      pointer-events: none;\n      z-index: 1000;\n    }\n\n    tt {\n      font-family: 'Roboto Mono', monospace;\n      font-weight: 300;\n    }\n\n    .landing {\n      position: absolute;\n      text-align: center;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n      width: 100%;\n    }\n\n    .landing_icon:hover {\n      box-shadow: 0 12px 17px 2px rgba(0, 0, 0, 0.14),\n        0 5px 22px 4px rgba(0, 0, 0, 0.12), 0 7px 8px -4px rgba(0, 0, 0, 0.2);\n    }\n\n    .landing_icon {\n      margin: 12px;\n      border-radius: 16px;\n      width: 160px;\n      height: 140px;\n      text-align: center;\n      color: var(--mdc-theme-on-secondary);\n      background: var(--secondary);\n      --mdc-icon-button-size: 100px;\n      --mdc-icon-size: 100px;\n      --mdc-ripple-color: rgba(0, 0, 0, 0);\n      box-shadow: rgb(0 0 0 / 14%) 0px 6px 10px 0px,\n        rgb(0 0 0 / 12%) 0px 1px 18px 0px, rgb(0 0 0 / 20%) 0px 3px 5px -1px;\n      transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n    }\n\n    .landing_label {\n      width: 160px;\n      height: 50px;\n      margin-top: 100px;\n      margin-left: -30px;\n      font-family: 'Roboto', sans-serif;\n    }\n\n    .plugin.menu {\n      display: flex;\n    }\n\n    .plugin.validator {\n      display: flex;\n    }\n  "], ["\n    mwc-top-app-bar-fixed {\n      --mdc-theme-text-disabled-on-light: rgba(255, 255, 255, 0.38);\n    } /* hack to fix disabled icon buttons rendering black */\n\n    mwc-tab {\n      background-color: var(--primary);\n      --mdc-theme-primary: var(--mdc-theme-on-primary);\n    }\n\n    input[type='file'] {\n      display: none;\n    }\n\n    mwc-dialog {\n      --mdc-dialog-max-width: 98vw;\n    }\n\n    mwc-dialog > form {\n      display: flex;\n      flex-direction: column;\n    }\n\n    mwc-dialog > form > * {\n      display: block;\n      margin-top: 16px;\n    }\n\n    mwc-linear-progress {\n      position: fixed;\n      --mdc-linear-progress-buffer-color: var(--primary);\n      --mdc-theme-primary: var(--secondary);\n      left: 0px;\n      top: 0px;\n      width: 100%;\n      pointer-events: none;\n      z-index: 1000;\n    }\n\n    tt {\n      font-family: 'Roboto Mono', monospace;\n      font-weight: 300;\n    }\n\n    .landing {\n      position: absolute;\n      text-align: center;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n      width: 100%;\n    }\n\n    .landing_icon:hover {\n      box-shadow: 0 12px 17px 2px rgba(0, 0, 0, 0.14),\n        0 5px 22px 4px rgba(0, 0, 0, 0.12), 0 7px 8px -4px rgba(0, 0, 0, 0.2);\n    }\n\n    .landing_icon {\n      margin: 12px;\n      border-radius: 16px;\n      width: 160px;\n      height: 140px;\n      text-align: center;\n      color: var(--mdc-theme-on-secondary);\n      background: var(--secondary);\n      --mdc-icon-button-size: 100px;\n      --mdc-icon-size: 100px;\n      --mdc-ripple-color: rgba(0, 0, 0, 0);\n      box-shadow: rgb(0 0 0 / 14%) 0px 6px 10px 0px,\n        rgb(0 0 0 / 12%) 0px 1px 18px 0px, rgb(0 0 0 / 20%) 0px 3px 5px -1px;\n      transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n    }\n\n    .landing_label {\n      width: 160px;\n      height: 50px;\n      margin-top: 100px;\n      margin-left: -30px;\n      font-family: 'Roboto', sans-serif;\n    }\n\n    .plugin.menu {\n      display: flex;\n    }\n\n    .plugin.validator {\n      display: flex;\n    }\n  "])));
    __decorate([
        lit_element_1.property({ type: String })
    ], OpenSCD.prototype, "src");
    __decorate([
        lit_element_1.property({ type: Number })
    ], OpenSCD.prototype, "activeTab");
    __decorate([
        lit_element_1.property({ attribute: false })
    ], OpenSCD.prototype, "validated");
    __decorate([
        lit_element_1.query('#menu')
    ], OpenSCD.prototype, "menuUI");
    __decorate([
        lit_element_1.query('#pluginManager')
    ], OpenSCD.prototype, "pluginUI");
    __decorate([
        lit_element_1.query('#pluginList')
    ], OpenSCD.prototype, "pluginList");
    __decorate([
        lit_element_1.query('#pluginAdd')
    ], OpenSCD.prototype, "pluginDownloadUI");
    OpenSCD = __decorate([
        lit_element_1.customElement('open-scd')
    ], OpenSCD);
    return OpenSCD;
}(Editing_js_1.Editing(Historing_js_1.Historing(lit_element_1.LitElement))));
exports.OpenSCD = OpenSCD;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21, templateObject_22, templateObject_23;
