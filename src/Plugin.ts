import { html as litHtml, property, query, TemplateResult } from 'lit-element';
import { registerTranslateConfig, translate, use } from 'lit-translate';
import wrapHtml from 'carehtml';
const html = wrapHtml(litHtml);

import { Dialog } from '@material/mwc-dialog';
import { Select } from '@material/mwc-select';
import { Switch } from '@material/mwc-switch';

import { ifImplemented, LitElementConstructor, Mixin } from './foundation.js';
import { Language, languages, loader } from './translations/loader.js';
import { EditingElement } from './Editing.js';
export type Plugin = {
  name: string;
  src: string;
  icon: string;
  default: boolean;
  kind: 'editor' | 'import' | 'export' | 'transform';
  getContent: () => Promise<TemplateResult>;
};

const defaultPlugins = fetch('/public/json/plugins.json').then(res =>
  res.json()
);

async function storeDefaultPlugins(): Promise<void> {
  localStorage.setItem('plugins', JSON.stringify(await defaultPlugins));
}

/** Mixin that saves [[`Plugins`]] to `localStorage`, reflecting them in the
 * `settings` property, setting them through `setPlugin(setting, value)`. */
export type PluggingElement = Mixin<typeof Plugging>;

const loaded = new Map<string, LitElementConstructor>();

export function Plugging<TBase extends new (...args: any[]) => EditingElement>(
  Base: TBase
) {
  class PluginElement extends Base {
    get plugins(): Plugin[] {
      return <Plugin[]>JSON.parse(localStorage.getItem('plugins') ?? '[]');
    }

    get editors(): Plugin[] {
      return this.plugins
        .filter(plugin => plugin.kind === 'editor')
        .map((editor, index) => {
          const tagName = 'editor-' + index;
          return {
            ...editor,
            getContent: async (): Promise<TemplateResult> => {
              if (!loaded.has(editor.src))
                loaded.set(
                  editor.src,
                  await import(editor.src).then(mod => mod.default)
                );
              return html`<${loaded.get(editor.src)} .doc=${
                this.doc
              }></${loaded.get(editor.src)}>`;
            },
          };
        });
    }
    get imports(): Plugin[] {
      return this.plugins.filter(plugin => plugin.kind === 'import');
    }
    get exports(): Plugin[] {
      return this.plugins.filter(plugin => plugin.kind === 'export');
    }
    get transforms(): Plugin[] {
      return this.plugins.filter(plugin => plugin.kind === 'transform');
    }

    constructor(...args: any[]) {
      super(...args);

      if (localStorage.getItem('plugins') === null) storeDefaultPlugins();
    }
  }

  return PluginElement;
}

/** If `tagName` is not yet a custom element, imports the module at `src` and
 * registers its default export as a custom element called `tagName`. */
export async function plugin(src: string, tagName: string): Promise<void> {
  if (customElements.get(tagName) === undefined) {
    const mod = await import(src);
    customElements.define(tagName, mod.default);
  }
}
