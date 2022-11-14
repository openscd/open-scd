import { property, state } from 'lit/decorators.js';

import { cyrb64, LitElementConstructor } from '../foundation.js';
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

/** @returns a valid customElement tagName containing the URI hash. */
export function pluginTag(uri: string): string {
  if (!pluginTags.has(uri)) pluginTags.set(uri, `oscd-p${cyrb64(uri)}`);
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
          const url = new URL(plugin.src, window.location.href).toString();
          import(url).then(mod => customElements.define(tagName, mod.default));
        })
      );

      this.#plugins = { menu: [], editor: [], ...plugins };
      this.requestUpdate();
    }
  }
  return PluggingElement;
}
