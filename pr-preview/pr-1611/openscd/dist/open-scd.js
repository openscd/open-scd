import { __decorate } from "../../_snowpack/pkg/tslib.js";
//#region import
import { customElement, html, LitElement, property, state, } from '../../_snowpack/pkg/lit-element.js';
import { classMap } from '../../_snowpack/pkg/lit-html/directives/class-map.js';
import '../../_snowpack/pkg/@material/mwc-icon.js';
import '../../_snowpack/pkg/@material/mwc-icon-button.js';
import '../../_snowpack/pkg/@material/mwc-linear-progress.js';
import '../../_snowpack/pkg/@material/mwc-list.js';
import '../../_snowpack/pkg/@material/mwc-list/mwc-list-item.js';
import '../../_snowpack/pkg/@material/mwc-tab.js';
import '../../_snowpack/pkg/@material/mwc-tab-bar.js';
import '../../_snowpack/pkg/@material/mwc-top-app-bar-fixed.js';
import '../../_snowpack/pkg/@material/mwc-drawer.js';
import '../../_snowpack/pkg/@material/mwc-button.js';
import '../../_snowpack/pkg/@material/mwc-dialog.js';
import '../../_snowpack/pkg/@material/mwc-formfield.js';
import '../../_snowpack/pkg/@material/mwc-list/mwc-check-list-item.js';
import '../../_snowpack/pkg/@material/mwc-list/mwc-radio-list-item.js';
import '../../_snowpack/pkg/@material/mwc-select.js';
import '../../_snowpack/pkg/@material/mwc-switch.js';
import '../../_snowpack/pkg/@material/mwc-textfield.js';
import { newOpenDocEvent } from '../../_snowpack/link/packages/core/dist/foundation/deprecated/open-event.js';
import { newPendingStateEvent } from '../../_snowpack/link/packages/core/dist/foundation/deprecated/waiter.js';
import './addons/Settings.js';
import './addons/Waiter.js';
import './addons/Wizards.js';
import './addons/Editor.js';
import './addons/History.js';
import './addons/Layout.js';
import { officialPlugins as builtinPlugins } from './plugins.js';
import { initializeNsdoc } from './foundation/nsdoc.js';
import { historyStateEvent } from './addons/History.js';
import { newConfigurePluginEvent } from './plugin.events.js';
import { newLogEvent } from '../../_snowpack/link/packages/core/dist/foundation/deprecated/history.js';
//#endregion import
/** The `<open-scd>` custom element is the main entry point of the
 * Open Substation Configuration Designer. */
let OpenSCD = class OpenSCD extends LitElement {
    constructor() {
        super(...arguments);
        this.doc = null;
        /** The name of the current [[`doc`]] */
        this.docName = '';
        /** The UUID of the current [[`doc`]] */
        this.docId = '';
        this.historyState = {
            editCount: -1,
            canRedo: false,
            canUndo: false,
        };
        /** Object containing all *.nsdoc files and a function extracting element's label form them*/
        this.nsdoc = initializeNsdoc();
        this.currentSrc = '';
        /**
         * @prop {PluginSet} plugins - Set of plugins that are used by OpenSCD
         */
        this.plugins = { menu: [], editor: [] };
        this.storedPlugins = [];
        this.loadedPlugins = new Set();
        // PLUGGING INTERFACES
        this.pluginTags = new Map();
    }
    render() {
        return html `<oscd-waiter>
      <oscd-settings .host=${this}>
        <oscd-wizards .host=${this}>
          <oscd-history .host=${this} .editCount=${this.historyState.editCount}>
            <oscd-editor
              .doc=${this.doc}
              .docName=${this.docName}
              .docId=${this.docId}
              .host=${this}
              .editCount=${this.historyState.editCount}
            >
              <oscd-layout
                @add-external-plugin=${this.handleAddExternalPlugin}
                @oscd-configure-plugin=${this.handleConfigurationPluginEvent}
                .host=${this}
                .doc=${this.doc}
                .docName=${this.docName}
                .editCount=${this.historyState.editCount}
                .historyState=${this.historyState}
                .plugins=${this.storedPlugins}
              >
              </oscd-layout>
            </oscd-editor>
          </oscd-history>
        </oscd-wizards>
      </oscd-settings>
    </oscd-waiter>`;
    }
    /** The current file's URL. `blob:` URLs are *revoked after parsing*! */
    get src() {
        return this.currentSrc;
    }
    set src(value) {
        this.currentSrc = value;
        this.dispatchEvent(newPendingStateEvent(this.loadDoc(value)));
    }
    /** Loads and parses an `XMLDocument` after [[`src`]] has changed. */
    async loadDoc(src) {
        const response = await fetch(src);
        const text = await response.text();
        if (!text)
            return;
        const doc = new DOMParser().parseFromString(text, 'application/xml');
        const docName = src;
        this.dispatchEvent(newOpenDocEvent(doc, docName));
        if (src.startsWith('blob:'))
            URL.revokeObjectURL(src);
    }
    /**
     *
     * @deprecated Use `handleConfigurationPluginEvent` instead
     */
    handleAddExternalPlugin(e) {
        this.addExternalPlugin(e.detail.plugin);
        const { name, kind } = e.detail.plugin;
        const event = newConfigurePluginEvent(name, kind, e.detail.plugin);
        this.handleConfigurationPluginEvent(event);
    }
    handleConfigurationPluginEvent(e) {
        const { name, kind, config } = e.detail;
        const hasPlugin = this.hasPlugin(name, kind);
        const hasConfig = config !== null;
        const isChangeEvent = hasPlugin && hasConfig;
        const isRemoveEvent = hasPlugin && !hasConfig;
        const isAddEvent = !hasPlugin && hasConfig;
        // the `&& config`is only because typescript
        // cannot infer that `isChangeEvent` and `isAddEvent` implies `config !== null`
        if (isChangeEvent && config) {
            this.changePlugin(config);
        }
        else if (isRemoveEvent) {
            this.removePlugin(name, kind);
        }
        else if (isAddEvent && config) {
            this.addPlugin(config);
        }
        else {
            const event = newLogEvent({
                kind: "error",
                title: "Invalid plugin configuration event",
                message: JSON.stringify({ name, kind, config }),
            });
            this.dispatchEvent(event);
        }
    }
    connectedCallback() {
        super.connectedCallback();
        this.loadPlugins();
        // TODO: let Lit handle the event listeners, move to render()
        this.addEventListener('reset-plugins', this.resetPlugins);
        this.addEventListener('set-plugins', (e) => {
            this.setPlugins(e.detail.indices);
        });
        this.addEventListener(historyStateEvent, (e) => {
            this.historyState = e.detail;
            this.requestUpdate();
        });
    }
    /**
     *
     * @param name
     * @param kind
     * @returns the index of the plugin in the stored plugin list
     */
    findPluginIndex(name, kind) {
        return this.storedPlugins.findIndex(p => p.name === name && p.kind === kind);
    }
    hasPlugin(name, kind) {
        return this.findPluginIndex(name, kind) > -1;
    }
    removePlugin(name, kind) {
        const newPlugins = this.storedPlugins.filter(p => p.name !== name || p.kind !== kind);
        this.storePlugins(newPlugins);
    }
    addPlugin(plugin) {
        const newPlugins = [...this.storedPlugins, plugin];
        this.storePlugins(newPlugins);
    }
    /**
     *
     * @param plugin
     * @throws if the plugin is not found
     */
    changePlugin(plugin) {
        const storedPlugins = this.storedPlugins;
        const { name, kind } = plugin;
        const pluginIndex = this.findPluginIndex(name, kind);
        if (pluginIndex < 0) {
            const event = newLogEvent({
                kind: "error",
                title: "Plugin not found, stopping change process",
                message: JSON.stringify({ name, kind }),
            });
            this.dispatchEvent(event);
            return;
        }
        const pluginToChange = storedPlugins[pluginIndex];
        const changedPlugin = { ...pluginToChange, ...plugin };
        const newPlugins = [...storedPlugins];
        newPlugins.splice(pluginIndex, 1, changedPlugin);
        this.storePlugins(newPlugins);
    }
    resetPlugins() {
        this.storePlugins(builtinPlugins.concat(this.parsedPlugins).map(plugin => {
            return {
                ...plugin,
                installed: plugin.default ?? false,
            };
        }));
    }
    get parsedPlugins() {
        const menuPlugins = this.plugins.menu.map((plugin) => {
            let newPosition = plugin.position;
            if (typeof plugin.position === 'number') {
                newPosition = undefined;
            }
            return {
                ...plugin,
                position: newPosition,
                kind: 'menu',
                installed: plugin.active ?? false,
            };
        });
        const editorPlugins = this.plugins.editor.map((plugin) => ({
            ...plugin,
            position: undefined,
            kind: 'editor',
            installed: plugin.active ?? false,
        }));
        const allPlugnis = [...menuPlugins, ...editorPlugins];
        return allPlugnis;
    }
    updateStoredPlugins(newPlugins) {
        //
        // Generate content of each plugin
        //
        const plugins = newPlugins.map(plugin => {
            const isInstalled = plugin.src && plugin.installed;
            if (!isInstalled) {
                return plugin;
            }
            return this.addContent(plugin);
        });
        //
        // Merge built-in plugins
        //
        const mergedPlugins = plugins.map(plugin => {
            const isBuiltIn = !plugin?.official;
            if (!isBuiltIn) {
                return plugin;
            }
            ;
            const builtInPlugin = [...builtinPlugins, ...this.parsedPlugins]
                .find(p => p.src === plugin.src);
            return {
                ...builtInPlugin,
                ...plugin,
            };
        });
        this.storePlugins(mergedPlugins);
    }
    storePlugins(plugins) {
        this.storedPlugins = plugins;
        const pluginConfigs = JSON.stringify(plugins.map(withoutContent));
        localStorage.setItem('plugins', pluginConfigs);
    }
    getPluginConfigsFromLocalStorage() {
        const pluginsConfigStr = localStorage.getItem('plugins') ?? '[]';
        return JSON.parse(pluginsConfigStr);
    }
    get locale() {
        return navigator.language || 'en-US';
    }
    get docs() {
        const docs = {};
        if (this.doc) {
            docs[this.docName] = this.doc;
        }
        return docs;
    }
    setPlugins(indices) {
        const newPlugins = this.storedPlugins.map((plugin, index) => {
            return {
                ...plugin,
                installed: indices.has(index)
            };
        });
        this.updateStoredPlugins(newPlugins);
    }
    loadPlugins() {
        const localPluginConfigs = this.getPluginConfigsFromLocalStorage();
        const overwritesOfBultInPlugins = localPluginConfigs.filter((p) => {
            return builtinPlugins.some(b => b.src === p.src);
        });
        const userInstalledPlugins = localPluginConfigs.filter((p) => {
            return !builtinPlugins.some(b => b.src === p.src);
        });
        const mergedBuiltInPlugins = builtinPlugins.map((builtInPlugin) => {
            const noopOverwrite = {};
            const overwrite = overwritesOfBultInPlugins
                .find(p => p.src === builtInPlugin.src)
                ?? noopOverwrite;
            return {
                ...builtInPlugin,
                ...overwrite,
                installed: true, // TODO: is this correct? should we decide it based on something?
            };
        });
        const mergedPlugins = [...mergedBuiltInPlugins, ...userInstalledPlugins];
        // TODO: kind is string and enum, figour out later
        // @ts-expect-error
        this.updateStoredPlugins(mergedPlugins);
    }
    async addExternalPlugin(plugin) {
        if (this.storedPlugins.some(p => p.src === plugin.src))
            return;
        const newPlugins = this.storedPlugins;
        newPlugins.push(plugin);
        this.storePlugins(newPlugins);
    }
    addContent(plugin) {
        const tag = this.pluginTag(plugin.src);
        if (!this.loadedPlugins.has(tag)) {
            this.loadedPlugins.add(tag);
            import(plugin.src).then((mod) => {
                customElements.define(tag, mod.default);
            });
        }
        return {
            ...plugin,
            content: () => {
                return staticTagHtml `<${tag}
            .doc=${this.doc}
            .docName=${this.docName}
            .editCount=${this.historyState.editCount}
            .plugins=${this.storedPlugins}
            .docId=${this.docId}
            .pluginId=${plugin.src}
            .nsdoc=${this.nsdoc}
            .docs=${this.docs}
            .locale=${this.locale}
            class="${classMap({
                    plugin: true,
                    menu: plugin.kind === 'menu',
                    validator: plugin.kind === 'validator',
                    editor: plugin.kind === 'editor',
                })}"
          ></${tag}>`;
            },
        };
    }
    /**
     * Hashes `uri` using cyrb64 analogous to
     * https://github.com/bryc/code/blob/master/jshash/experimental/cyrb53.js .
     * @returns a valid customElement tagName containing the URI hash.
     */
    pluginTag(uri) {
        if (!this.pluginTags.has(uri)) {
            let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
            for (let i = 0, ch; i < uri.length; i++) {
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
            this.pluginTags.set(uri, 'oscd-plugin' +
                ((h2 >>> 0).toString(16).padStart(8, '0') +
                    (h1 >>> 0).toString(16).padStart(8, '0')));
        }
        return this.pluginTags.get(uri);
    }
};
__decorate([
    property({ attribute: false })
], OpenSCD.prototype, "doc", void 0);
__decorate([
    property({ type: String })
], OpenSCD.prototype, "docName", void 0);
__decorate([
    property({ type: String })
], OpenSCD.prototype, "docId", void 0);
__decorate([
    state()
], OpenSCD.prototype, "historyState", void 0);
__decorate([
    property({ attribute: false })
], OpenSCD.prototype, "nsdoc", void 0);
__decorate([
    property({ type: String })
], OpenSCD.prototype, "src", null);
__decorate([
    property({ type: Object })
], OpenSCD.prototype, "plugins", void 0);
__decorate([
    state()
], OpenSCD.prototype, "storedPlugins", void 0);
__decorate([
    state()
], OpenSCD.prototype, "loadedPlugins", void 0);
__decorate([
    state()
], OpenSCD.prototype, "pluginTags", void 0);
OpenSCD = __decorate([
    customElement('open-scd')
], OpenSCD);
export { OpenSCD };
export function newResetPluginsEvent() {
    return new CustomEvent('reset-plugins', { bubbles: true, composed: true });
}
export function newAddExternalPluginEvent(plugin) {
    return new CustomEvent('add-external-plugin', {
        bubbles: true,
        composed: true,
        detail: { plugin },
    });
}
export function newSetPluginsEvent(indices) {
    return new CustomEvent('set-plugins', {
        bubbles: true,
        composed: true,
        detail: { indices },
    });
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
function staticTagHtml(oldStrings, ...oldArgs) {
    const args = [...oldArgs];
    const firstArg = args.shift();
    const lastArg = args.pop();
    if (firstArg !== lastArg)
        throw new Error(`Opening tag <${firstArg}> does not match closing tag </${lastArg}>.`);
    const strings = [...oldStrings];
    const firstString = strings.shift();
    const secondString = strings.shift();
    const lastString = strings.pop();
    const penultimateString = strings.pop();
    strings.unshift(`${firstString}${firstArg}${secondString}`);
    strings.push(`${penultimateString}${lastArg}${lastString}`);
    return html(strings, ...args);
}
function withoutContent(plugin) {
    return { ...plugin, content: undefined };
}
export const pluginIcons = {
    editor: 'tab',
    menu: 'play_circle',
    validator: 'rule_folder',
    top: 'play_circle',
    middle: 'play_circle',
    bottom: 'play_circle',
};
const menuOrder = [
    'editor',
    'top',
    'validator',
    'middle',
    'bottom',
];
function menuCompare(a, b) {
    if (a.kind === b.kind && a.position === b.position)
        return 0;
    const earlier = menuOrder.find(kind => [a.kind, b.kind, a.position, b.position].includes(kind));
    return [a.kind, a.position].includes(earlier) ? -1 : 1;
}
function compareNeedsDoc(a, b) {
    if (a.requireDoc === b.requireDoc)
        return 0;
    return a.requireDoc ? 1 : -1;
}
//# sourceMappingURL=open-scd.js.map