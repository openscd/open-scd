import { property, state } from 'lit/decorators.js';

import { LitElementConstructor } from '../foundation.js';
import { targetLocales } from '../locales.js';

export type Plugin = {
  name: string;
  translations?: Record<typeof targetLocales[number], string>;
  src: string;
  icon: string;
  requireDoc?: boolean;
  active?: boolean;
};
export type PluginSet = { menu: Plugin[]; editor: Plugin[] };

const pluginTags = new Map<string, string>();
/**
 * Hashes `uri` using cyrb64 analogous to
 * https://github.com/bryc/code/blob/master/jshash/experimental/cyrb53.js .
 * @returns a valid customElement tagName containing the URI hash.
 */
export function pluginTag(uri: string): string {
  if (!pluginTags.has(uri)) {
    /* eslint-disable no-bitwise */
    let h1 = 0xdeadbeef;
    let h2 = 0x41c6ce57;
    /* eslint-disable-next-line no-plusplus */
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
    pluginTags.set(
      uri,
      `oscd-p${
        (h2 >>> 0).toString(16).padStart(8, '0') +
        (h1 >>> 0).toString(16).padStart(8, '0')
      }`
    );
    /* eslint-enable no-bitwise */
  }
  return pluginTags.get(uri)!;
}

export function Plugging<TBase extends LitElementConstructor>(Base: TBase) {
  class PluggingElement extends Base {
    #loadedPlugins = new Map<string, Plugin>();

    @state()
    get loadedPlugins(): Map<string, Plugin> {
      return this.#loadedPlugins;
    }

    #plugins: PluginSet = { menu: [], editor: [] };

    @property({ type: Object })
    get plugins(): PluginSet {
      return this.#plugins;
    }

    set plugins(plugins: Partial<PluginSet>) {
      Object.values(plugins).forEach(kind =>
        kind.forEach(plugin => {
          const tagName = pluginTag(plugin.src);
          if (this.loadedPlugins.has(tagName)) return;
          this.#loadedPlugins.set(tagName, plugin);
          if (customElements.get(tagName)) return;
          import(plugin.src).then(mod =>
            customElements.define(tagName, mod.default)
          );
        })
      );

      this.#plugins = { menu: [], editor: [], ...plugins };
      this.requestUpdate();
    }
  }
  return PluggingElement;
}
