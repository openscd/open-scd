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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
exports.__esModule = true;
exports.Plugging = exports.pluginTag = void 0;
var decorators_js_1 = require("lit/decorators.js");
var foundation_js_1 = require("../foundation.js");
var pluginTags = new Map();
/** @returns a valid customElement tagName containing the URI hash. */
function pluginTag(uri) {
    if (!pluginTags.has(uri))
        pluginTags.set(uri, "oscd-p" + foundation_js_1.cyrb64(uri));
    return pluginTags.get(uri);
}
exports.pluginTag = pluginTag;
function Plugging(Base) {
    var PluggingElement = /** @class */ (function (_super) {
        __extends(PluggingElement, _super);
        function PluggingElement() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _loadedPlugins.set(_this, new Map());
            _plugins.set(_this, { menu: [], editor: [] });
            return _this;
        }
        Object.defineProperty(PluggingElement.prototype, "loadedPlugins", {
            get: function () {
                return __classPrivateFieldGet(this, _loadedPlugins);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PluggingElement.prototype, "plugins", {
            /**
             * @prop {PluginSet} plugins - Set of plugins that are used by OpenSCD
             */
            get: function () {
                return __classPrivateFieldGet(this, _plugins);
            },
            set: function (plugins) {
                var _this = this;
                Object.values(plugins).forEach(function (kind) {
                    return kind.forEach(function (plugin) {
                        var tagName = pluginTag(plugin.src);
                        if (_this.loadedPlugins.has(tagName))
                            return;
                        __classPrivateFieldGet(_this, _loadedPlugins).set(tagName, plugin);
                        if (customElements.get(tagName))
                            return;
                        var url = new URL(plugin.src, window.location.href).toString();
                        Promise.resolve().then(function () { return require(url); }).then(function (mod) { return customElements.define(tagName, mod["default"]); });
                    });
                });
                __classPrivateFieldSet(this, _plugins, __assign({ menu: [], editor: [] }, plugins));
                this.requestUpdate();
            },
            enumerable: false,
            configurable: true
        });
        var _loadedPlugins, _plugins;
        _loadedPlugins = new WeakMap(), _plugins = new WeakMap();
        __decorate([
            decorators_js_1.state()
        ], PluggingElement.prototype, "loadedPlugins");
        __decorate([
            decorators_js_1.property({ type: Object })
        ], PluggingElement.prototype, "plugins");
        return PluggingElement;
    }(Base));
    return PluggingElement;
}
exports.Plugging = Plugging;
