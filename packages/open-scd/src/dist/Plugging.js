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
exports.Plugging = exports.pluginIcons = void 0;
var lit_element_1 = require("lit-element");
var class_map_1 = require("lit-html/directives/class-map");
var lit_translate_1 = require("lit-translate");
require("@material/mwc-button");
require("@material/mwc-dialog");
require("@material/mwc-formfield");
require("@material/mwc-icon");
require("@material/mwc-list");
require("@material/mwc-list/mwc-check-list-item");
require("@material/mwc-list/mwc-list-item");
require("@material/mwc-list/mwc-radio-list-item");
require("@material/mwc-select");
require("@material/mwc-switch");
require("@material/mwc-textfield");
var foundation_js_1 = require("./foundation.js");
var plugins_js_1 = require("../public/js/plugins.js");
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
function Plugging(Base) {
    var PluggingElement = /** @class */ (function (_super) {
        __extends(PluggingElement, _super);
        function PluggingElement() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            _this.updatePlugins();
            _this.requestUpdate();
            return _this;
        }
        Object.defineProperty(PluggingElement.prototype, "editors", {
            get: function () {
                return this.plugins.filter(function (plugin) { return plugin.installed && plugin.kind === 'editor'; });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PluggingElement.prototype, "validators", {
            get: function () {
                return this.plugins.filter(function (plugin) { return plugin.installed && plugin.kind === 'validator'; });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PluggingElement.prototype, "menuEntries", {
            get: function () {
                return this.plugins.filter(function (plugin) { return plugin.installed && plugin.kind === 'menu'; });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PluggingElement.prototype, "topMenu", {
            get: function () {
                return this.menuEntries.filter(function (plugin) { return plugin.position === 'top'; });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PluggingElement.prototype, "middleMenu", {
            get: function () {
                return this.menuEntries.filter(function (plugin) { return plugin.position === 'middle'; });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PluggingElement.prototype, "bottomMenu", {
            get: function () {
                return this.menuEntries.filter(function (plugin) { return plugin.position === 'bottom'; });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PluggingElement.prototype, "plugins", {
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
        Object.defineProperty(PluggingElement.prototype, "storedPlugins", {
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
        Object.defineProperty(PluggingElement.prototype, "locale", {
            get: function () {
                return navigator.language || 'en-US';
            },
            enumerable: false,
            configurable: true
        });
        PluggingElement.prototype.setPlugins = function (indices) {
            var newPlugins = this.plugins.map(function (plugin, index) {
                return __assign(__assign({}, plugin), { installed: indices.has(index) });
            });
            storePlugins(newPlugins);
            this.requestUpdate();
        };
        PluggingElement.prototype.updatePlugins = function () {
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
        PluggingElement.prototype.addExternalPlugin = function (plugin) {
            if (this.storedPlugins.some(function (p) { return p.src === plugin.src; }))
                return;
            var newPlugins = this.storedPlugins;
            newPlugins.push(plugin);
            storePlugins(newPlugins);
        };
        PluggingElement.prototype.addContent = function (plugin) {
            var tag = pluginTag(plugin.src);
            if (!loadedPlugins.has(tag)) {
                loadedPlugins.add(tag);
                Promise.resolve().then(function () { return require(plugin.src); }).then(function (mod) { return customElements.define(tag, mod["default"]); });
            }
            return __assign(__assign({}, plugin), { content: staticTagHtml(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<", "\n            .doc=", "\n            .docName=", "\n            .editCount=", "\n            .docId=", "\n            .pluginId=", "\n            .nsdoc=", "\n            .docs=", "\n            .locale=", "\n            class=\"", "\"\n          ></", ">"], ["<", "\n            .doc=", "\n            .docName=", "\n            .editCount=", "\n            .docId=", "\n            .pluginId=", "\n            .nsdoc=", "\n            .docs=", "\n            .locale=", "\n            class=\"",
                    "\"\n          ></", ">"])), tag, this.doc, this.docName, this.editCount, this.docId, plugin.src, this.nsdoc, this.docs, this.locale, class_map_1.classMap({
                    plugin: true,
                    menu: plugin.kind === 'menu',
                    validator: plugin.kind === 'validator',
                    editor: plugin.kind === 'editor'
                }), tag) });
        };
        PluggingElement.prototype.handleAddPlugin = function () {
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
        PluggingElement.prototype.renderDownloadUI = function () {
            var _this = this;
            return lit_element_1.html(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n        <mwc-dialog\n          id=\"pluginAdd\"\n          heading=\"", "\"\n        >\n          <div style=\"display: flex; flex-direction: column; row-gap: 8px;\">\n            <p style=\"color:var(--mdc-theme-error);\">\n              ", "\n            </p>\n            <mwc-textfield\n              label=\"", "\"\n              helper=\"", "\"\n              required\n              id=\"pluginNameInput\"\n            ></mwc-textfield>\n            <mwc-list id=\"pluginKindList\">\n              <mwc-radio-list-item\n                id=\"editor\"\n                value=\"editor\"\n                hasMeta\n                selected\n                left\n                >", "<mwc-icon slot=\"meta\"\n                  >", "</mwc-icon\n                ></mwc-radio-list-item\n              >\n              <mwc-radio-list-item id=\"menu\" value=\"menu\" hasMeta left\n                >", "<mwc-icon slot=\"meta\"\n                  >", "</mwc-icon\n                ></mwc-radio-list-item\n              >\n              <div id=\"menudetails\">\n                <mwc-formfield\n                  id=\"enabledefault\"\n                  label=\"", "\"\n                >\n                  <mwc-switch id=\"requireDoc\" checked></mwc-switch>\n                </mwc-formfield>\n                <mwc-select id=\"menuPosition\" value=\"middle\" fixedMenuPosition\n                  >", "</mwc-select\n                >\n              </div>\n              <style>\n                #menudetails {\n                  display: none;\n                  padding: 20px;\n                  padding-left: 50px;\n                }\n                #menu[selected] ~ #menudetails {\n                  display: grid;\n                }\n                #enabledefault {\n                  padding-bottom: 20px;\n                }\n                #menuPosition {\n                  max-width: 250px;\n                }\n              </style>\n              <mwc-radio-list-item id=\"validator\" value=\"validator\" hasMeta left\n                >", "<mwc-icon slot=\"meta\"\n                  >", "</mwc-icon\n                ></mwc-radio-list-item\n              >\n            </mwc-list>\n            <mwc-textfield\n              label=\"", "\"\n              helper=\"", "\"\n              placeholder=\"http://example.com/plugin.js\"\n              type=\"url\"\n              required\n              id=\"pluginSrcInput\"\n            ></mwc-textfield>\n          </div>\n          <mwc-button\n            slot=\"secondaryAction\"\n            dialogAction=\"close\"\n            label=\"", "\"\n          ></mwc-button>\n          <mwc-button\n            slot=\"primaryAction\"\n            icon=\"add\"\n            label=\"", "\"\n            trailingIcon\n            @click=", "\n          ></mwc-button>\n        </mwc-dialog>\n      "], ["\n        <mwc-dialog\n          id=\"pluginAdd\"\n          heading=\"", "\"\n        >\n          <div style=\"display: flex; flex-direction: column; row-gap: 8px;\">\n            <p style=\"color:var(--mdc-theme-error);\">\n              ", "\n            </p>\n            <mwc-textfield\n              label=\"", "\"\n              helper=\"", "\"\n              required\n              id=\"pluginNameInput\"\n            ></mwc-textfield>\n            <mwc-list id=\"pluginKindList\">\n              <mwc-radio-list-item\n                id=\"editor\"\n                value=\"editor\"\n                hasMeta\n                selected\n                left\n                >", "<mwc-icon slot=\"meta\"\n                  >", "</mwc-icon\n                ></mwc-radio-list-item\n              >\n              <mwc-radio-list-item id=\"menu\" value=\"menu\" hasMeta left\n                >", "<mwc-icon slot=\"meta\"\n                  >", "</mwc-icon\n                ></mwc-radio-list-item\n              >\n              <div id=\"menudetails\">\n                <mwc-formfield\n                  id=\"enabledefault\"\n                  label=\"", "\"\n                >\n                  <mwc-switch id=\"requireDoc\" checked></mwc-switch>\n                </mwc-formfield>\n                <mwc-select id=\"menuPosition\" value=\"middle\" fixedMenuPosition\n                  >",
                "</mwc-select\n                >\n              </div>\n              <style>\n                #menudetails {\n                  display: none;\n                  padding: 20px;\n                  padding-left: 50px;\n                }\n                #menu[selected] ~ #menudetails {\n                  display: grid;\n                }\n                #enabledefault {\n                  padding-bottom: 20px;\n                }\n                #menuPosition {\n                  max-width: 250px;\n                }\n              </style>\n              <mwc-radio-list-item id=\"validator\" value=\"validator\" hasMeta left\n                >", "<mwc-icon slot=\"meta\"\n                  >", "</mwc-icon\n                ></mwc-radio-list-item\n              >\n            </mwc-list>\n            <mwc-textfield\n              label=\"", "\"\n              helper=\"", "\"\n              placeholder=\"http://example.com/plugin.js\"\n              type=\"url\"\n              required\n              id=\"pluginSrcInput\"\n            ></mwc-textfield>\n          </div>\n          <mwc-button\n            slot=\"secondaryAction\"\n            dialogAction=\"close\"\n            label=\"", "\"\n          ></mwc-button>\n          <mwc-button\n            slot=\"primaryAction\"\n            icon=\"add\"\n            label=\"", "\"\n            trailingIcon\n            @click=", "\n          ></mwc-button>\n        </mwc-dialog>\n      "])), lit_translate_1.translate('plugins.add.heading'), lit_translate_1.translate('plugins.add.warning'), lit_translate_1.translate('plugins.add.name'), lit_translate_1.translate('plugins.add.nameHelper'), lit_translate_1.translate('plugins.editor'), exports.pluginIcons['editor'], lit_translate_1.translate('plugins.menu'), exports.pluginIcons['menu'], lit_translate_1.translate('plugins.requireDoc'), Object.values(menuPosition).map(function (menutype) {
                return lit_element_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<mwc-list-item value=\"", "\"\n                        >", "</mwc-list-item\n                      >"], ["<mwc-list-item value=\"", "\"\n                        >", "</mwc-list-item\n                      >"])), menutype, lit_translate_1.translate('plugins.' + menutype));
            }), lit_translate_1.translate('plugins.validator'), exports.pluginIcons['validator'], lit_translate_1.translate('plugins.add.src'), lit_translate_1.translate('plugins.add.srcHelper'), lit_translate_1.translate('cancel'), lit_translate_1.translate('add'), function () { return _this.handleAddPlugin(); });
        };
        PluggingElement.prototype.renderPluginKind = function (type, plugins) {
            return lit_element_1.html(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n        ", "\n      "], ["\n        ",
                "\n      "])), plugins.map(function (plugin) {
                return lit_element_1.html(templateObject_4 || (templateObject_4 = __makeTemplateObject(["<mwc-check-list-item\n              class=\"", "\"\n              value=\"", "\"\n              ?selected=", "\n              hasMeta\n              left\n            >\n              <mwc-icon slot=\"meta\"\n                >", "</mwc-icon\n              >\n              ", "\n            </mwc-check-list-item>"], ["<mwc-check-list-item\n              class=\"", "\"\n              value=\"", "\"\n              ?selected=", "\n              hasMeta\n              left\n            >\n              <mwc-icon slot=\"meta\"\n                >", "</mwc-icon\n              >\n              ", "\n            </mwc-check-list-item>"])), plugin.official ? 'official' : 'external', plugin.src, plugin.installed, plugin.icon || exports.pluginIcons[plugin.kind], plugin.name);
            }));
        };
        PluggingElement.prototype.renderPluginUI = function () {
            var _this = this;
            return lit_element_1.html(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n        <mwc-dialog\n          stacked\n          id=\"pluginManager\"\n          heading=\"", "\"\n        >\n          <mwc-list\n            id=\"pluginList\"\n            multi\n            @selected=", "\n          >\n            <mwc-list-item graphic=\"avatar\" noninteractive\n              ><strong>", "</strong\n              ><mwc-icon slot=\"graphic\" class=\"inverted\"\n                >", "</mwc-icon\n              ></mwc-list-item\n            >\n            <li divider role=\"separator\"></li>\n            ", "\n            <mwc-list-item graphic=\"avatar\" noninteractive\n              ><strong>", "</strong\n              ><mwc-icon slot=\"graphic\" class=\"inverted\"\n                ><strong>", "</strong></mwc-icon\n              ></mwc-list-item\n            >\n            <li divider role=\"separator\"></li>\n            ", "\n            <li divider role=\"separator\" inset></li>\n            ", "\n            <li divider role=\"separator\" inset></li>\n            ", "\n            <li divider role=\"separator\" inset></li>\n            ", "\n          </mwc-list>\n          <mwc-button\n            slot=\"secondaryAction\"\n            icon=\"refresh\"\n            label=\"", "\"\n            @click=", "\n            style=\"--mdc-theme-primary: var(--mdc-theme-error)\"\n          >\n          </mwc-button>\n          <mwc-button\n            slot=\"secondaryAction\"\n            icon=\"\"\n            label=\"", "\"\n            dialogAction=\"close\"\n          ></mwc-button>\n          <mwc-button\n            outlined\n            trailingIcon\n            slot=\"primaryAction\"\n            icon=\"library_add\"\n            label=\"", "&hellip;\"\n            @click=", "\n          >\n          </mwc-button>\n        </mwc-dialog>\n      "], ["\n        <mwc-dialog\n          stacked\n          id=\"pluginManager\"\n          heading=\"", "\"\n        >\n          <mwc-list\n            id=\"pluginList\"\n            multi\n            @selected=",
                "\n          >\n            <mwc-list-item graphic=\"avatar\" noninteractive\n              ><strong>", "</strong\n              ><mwc-icon slot=\"graphic\" class=\"inverted\"\n                >", "</mwc-icon\n              ></mwc-list-item\n            >\n            <li divider role=\"separator\"></li>\n            ",
                "\n            <mwc-list-item graphic=\"avatar\" noninteractive\n              ><strong>", "</strong\n              ><mwc-icon slot=\"graphic\" class=\"inverted\"\n                ><strong>", "</strong></mwc-icon\n              ></mwc-list-item\n            >\n            <li divider role=\"separator\"></li>\n            ",
                "\n            <li divider role=\"separator\" inset></li>\n            ",
                "\n            <li divider role=\"separator\" inset></li>\n            ",
                "\n            <li divider role=\"separator\" inset></li>\n            ",
                "\n          </mwc-list>\n          <mwc-button\n            slot=\"secondaryAction\"\n            icon=\"refresh\"\n            label=\"", "\"\n            @click=",
                "\n            style=\"--mdc-theme-primary: var(--mdc-theme-error)\"\n          >\n          </mwc-button>\n          <mwc-button\n            slot=\"secondaryAction\"\n            icon=\"\"\n            label=\"", "\"\n            dialogAction=\"close\"\n          ></mwc-button>\n          <mwc-button\n            outlined\n            trailingIcon\n            slot=\"primaryAction\"\n            icon=\"library_add\"\n            label=\"", "&hellip;\"\n            @click=", "\n          >\n          </mwc-button>\n        </mwc-dialog>\n      "])), lit_translate_1.translate('plugins.heading'), function (e) {
                return _this.setPlugins(e.detail.index);
            }, lit_translate_1.translate("plugins.editor"), exports.pluginIcons['editor'], this.renderPluginKind('editor', this.plugins.filter(function (p) { return p.kind === 'editor'; })), lit_translate_1.translate("plugins.menu"), exports.pluginIcons['menu'], this.renderPluginKind('top', this.plugins.filter(function (p) { return p.kind === 'menu' && p.position === 'top'; })), this.renderPluginKind('validator', this.plugins.filter(function (p) { return p.kind === 'validator'; })), this.renderPluginKind('middle', this.plugins.filter(function (p) { return p.kind === 'menu' && p.position === 'middle'; })), this.renderPluginKind('bottom', this.plugins.filter(function (p) { return p.kind === 'menu' && p.position === 'bottom'; })), lit_translate_1.translate('reset'), function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    resetPlugins();
                    this.requestUpdate();
                    return [2 /*return*/];
                });
            }); }, lit_translate_1.translate('close'), lit_translate_1.translate('plugins.add.heading'), function () { return _this.pluginDownloadUI.show(); });
        };
        PluggingElement.prototype.render = function () {
            return lit_element_1.html(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n        ", " ", "\n        ", "\n      "], ["\n        ", " ", "\n        ", "\n      "])), foundation_js_1.ifImplemented(_super.prototype.render.call(this)), this.renderPluginUI(), this.renderDownloadUI());
        };
        __decorate([
            lit_element_1.query('#pluginManager')
        ], PluggingElement.prototype, "pluginUI");
        __decorate([
            lit_element_1.query('#pluginList')
        ], PluggingElement.prototype, "pluginList");
        __decorate([
            lit_element_1.query('#pluginAdd')
        ], PluggingElement.prototype, "pluginDownloadUI");
        return PluggingElement;
    }(Base));
    return PluggingElement;
}
exports.Plugging = Plugging;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
