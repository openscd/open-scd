import { __decorate } from "../../_snowpack/pkg/tslib.js";
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
import { officialPlugins } from './plugins.js';
import { initializeNsdoc } from './foundation/nsdoc.js';
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
// PLUGGING INTERFACES
const pluginTags = new Map();
/**
 * Hashes `uri` using cyrb64 analogous to
 * https://github.com/bryc/code/blob/master/jshash/experimental/cyrb53.js .
 * @returns a valid customElement tagName containing the URI hash.
 */
function pluginTag(uri) {
    if (!pluginTags.has(uri)) {
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
export const menuPosition = ['top', 'middle', 'bottom'];
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
const loadedPlugins = new Set();
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
        /** Index of the last [[`EditorAction`]] applied. */
        this.editCount = -1;
        /** Object containing all *.nsdoc files and a function extracting element's label form them*/
        this.nsdoc = initializeNsdoc();
        this.currentSrc = '';
        /**
         * @prop {PluginSet} plugins - Set of plugins that are used by OpenSCD
         */
        this.plugins = { menu: [], editor: [] };
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
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('reset-plugins', this.resetPlugins);
        this.addEventListener('add-external-plugin', (e) => {
            this.addExternalPlugin(e.detail.plugin);
        });
        this.addEventListener('set-plugins', (e) => {
            this.setPlugins(e.detail.indices);
        });
        this.updatePlugins();
        this.requestUpdate();
        this.addEventListener('oscd-edit-completed', (evt) => {
            const initiator = evt.detail.initiator;
            if (initiator === 'undo') {
                this.editCount -= 1;
            }
            else {
                this.editCount += 1;
            }
            this.requestUpdate();
        });
    }
    render() {
        return html `<oscd-waiter>
      <oscd-settings .host=${this}>
        <oscd-wizards .host=${this}>
          <oscd-history .host=${this} .editCount=${this.editCount}>
            <oscd-editor
              .doc=${this.doc}
              .docName=${this.docName}
              .docId=${this.docId}
              .host=${this}
              .editCount=${this.editCount}
            >
              <oscd-layout
                .host=${this}
                .doc=${this.doc}
                .docName=${this.docName}
                .editCount=${this.editCount}
                .plugins=${this.sortedStoredPlugins}
              >
              </oscd-layout>
            </oscd-editor>
          </oscd-history>
        </oscd-wizards>
      </oscd-settings>
    </oscd-waiter>`;
    }
    storePlugins(plugins) {
        localStorage.setItem('plugins', JSON.stringify(plugins.map(withoutContent)));
        this.requestUpdate();
    }
    resetPlugins() {
        this.storePlugins(officialPlugins.concat(this.parsedPlugins).map(plugin => {
            return {
                src: plugin.src,
                installed: plugin.default ?? false,
                official: true,
            };
        }));
    }
    get parsedPlugins() {
        return this.plugins.menu
            .map((p) => ({
            ...p,
            position: typeof p.position !== 'number'
                ? p.position
                : undefined,
            kind: 'menu',
            installed: p.active ?? false,
        }))
            .concat(this.plugins.editor.map((p) => ({
            ...p,
            position: undefined,
            kind: 'editor',
            installed: p.active ?? false,
        })));
    }
    get sortedStoredPlugins() {
        return this.storedPlugins
            .map(plugin => {
            if (!plugin.official)
                return plugin;
            const officialPlugin = officialPlugins
                .concat(this.parsedPlugins)
                .find(needle => needle.src === plugin.src);
            return {
                ...officialPlugin,
                ...plugin,
            };
        })
            .sort(compareNeedsDoc)
            .sort(menuCompare);
    }
    get storedPlugins() {
        return (JSON.parse(localStorage.getItem('plugins') ?? '[]', (key, value) => value.src && value.installed ? this.addContent(value) : value));
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
        const newPlugins = this.sortedStoredPlugins.map((plugin, index) => {
            return { ...plugin, installed: indices.has(index) };
        });
        this.storePlugins(newPlugins);
    }
    updatePlugins() {
        const stored = this.storedPlugins;
        const officialStored = stored.filter(p => p.official);
        const newOfficial = officialPlugins
            .concat(this.parsedPlugins)
            .filter(p => !officialStored.find(o => o.src === p.src))
            .map(plugin => {
            return {
                src: plugin.src,
                installed: plugin.default ?? false,
                official: true,
            };
        });
        const oldOfficial = officialStored.filter(p => !officialPlugins
            .concat(this.parsedPlugins)
            .find(o => p.src === o.src));
        const newPlugins = stored.filter(p => !oldOfficial.find(o => p.src === o.src));
        newOfficial.map(p => newPlugins.push(p));
        this.storePlugins(newPlugins);
    }
    async addExternalPlugin(plugin) {
        if (this.storedPlugins.some(p => p.src === plugin.src))
            return;
        const newPlugins = this.storedPlugins;
        newPlugins.push(plugin);
        this.storePlugins(newPlugins);
    }
    addContent(plugin) {
        const tag = pluginTag(plugin.src);
        if (!loadedPlugins.has(tag)) {
            loadedPlugins.add(tag);
            import(plugin.src).then(mod => customElements.define(tag, mod.default));
        }
        return {
            ...plugin,
            content: staticTagHtml `<${tag}
            .doc=${this.doc}
            .docName=${this.docName}
            .editCount=${this.editCount}
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
          ></${tag}>`,
        };
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
], OpenSCD.prototype, "editCount", void 0);
__decorate([
    property({ attribute: false })
], OpenSCD.prototype, "nsdoc", void 0);
__decorate([
    property({ type: String })
], OpenSCD.prototype, "src", null);
__decorate([
    property({ type: Object })
], OpenSCD.prototype, "plugins", void 0);
OpenSCD = __decorate([
    customElement('open-scd')
], OpenSCD);
export { OpenSCD };
//# sourceMappingURL=open-scd.js.map