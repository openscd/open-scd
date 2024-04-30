import { __classPrivateFieldGet, __classPrivateFieldSet, __decorate } from "tslib";
import { property, state } from 'lit/decorators.js';
import { cyrb64 } from '../foundation.js';
const pluginTags = new Map();
/** @returns a valid customElement tagName containing the URI hash. */
export function pluginTag(uri) {
    if (!pluginTags.has(uri))
        pluginTags.set(uri, `oscd-p${cyrb64(uri)}`);
    return pluginTags.get(uri);
}
export function Plugging(Base) {
    var _PluggingElement_loadedPlugins, _PluggingElement_plugins;
    class PluggingElement extends Base {
        constructor() {
            super(...arguments);
            _PluggingElement_loadedPlugins.set(this, new Map());
            _PluggingElement_plugins.set(this, { menu: [], editor: [] });
        }
        get loadedPlugins() {
            return __classPrivateFieldGet(this, _PluggingElement_loadedPlugins, "f");
        }
        /**
         * @prop {PluginSet} plugins - Set of plugins that are used by OpenSCD
         */
        get plugins() {
            return __classPrivateFieldGet(this, _PluggingElement_plugins, "f");
        }
        set plugins(plugins) {
            Object.values(plugins).forEach(kind => kind.forEach(plugin => {
                const tagName = pluginTag(plugin.src);
                if (this.loadedPlugins.has(tagName))
                    return;
                __classPrivateFieldGet(this, _PluggingElement_loadedPlugins, "f").set(tagName, plugin);
                if (customElements.get(tagName))
                    return;
                const url = new URL(plugin.src, window.location.href).toString();
                import(url).then(mod => customElements.define(tagName, mod.default));
            }));
            __classPrivateFieldSet(this, _PluggingElement_plugins, { menu: [], editor: [], ...plugins }, "f");
            this.requestUpdate();
        }
    }
    _PluggingElement_loadedPlugins = new WeakMap(), _PluggingElement_plugins = new WeakMap();
    __decorate([
        state()
    ], PluggingElement.prototype, "loadedPlugins", null);
    __decorate([
        property({ type: Object })
    ], PluggingElement.prototype, "plugins", null);
    return PluggingElement;
}
//# sourceMappingURL=Plugging.js.map