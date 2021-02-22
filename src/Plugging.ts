import { html as litHtml, query, TemplateResult } from 'lit-element';
import { get, translate } from 'lit-translate';
import wrapHtml from 'carehtml';
const html = wrapHtml(litHtml);

import { Dialog } from '@material/mwc-dialog';

import { ifImplemented, LitElementConstructor, Mixin } from './foundation.js';
import { EditingElement } from './Editing.js';
import { List } from '@material/mwc-list';
import { ListItem } from '@material/mwc-list/mwc-list-item';

export type Plugin = {
  name: string;
  src: string;
  icon: string;
  kind: 'editor' | 'import' | 'export' | 'transform';
  getContent: () => Promise<TemplateResult>;
};

const defaultPlugins: Promise<(Plugin & { default: boolean })[]> = fetch(
  '/public/json/plugins.json'
).then(res => res.json());

async function storeDefaultPlugins(): Promise<void> {
  localStorage.setItem(
    'plugins',
    JSON.stringify(
      await defaultPlugins.then(plugins =>
        plugins.filter(plugin => plugin.default)
      )
    )
  );
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

    private addContent(plugin: Plugin) {
      return {
        ...plugin,
        getContent: async (): Promise<TemplateResult> => {
          if (!loaded.has(plugin.src))
            loaded.set(
              plugin.src,
              await import(plugin.src).then(mod => mod.default)
            );
          return html`<${loaded.get(plugin.src)} .doc=${
            this.doc
          }></${loaded.get(plugin.src)}>`;
        },
      };
    }

    get editors(): Plugin[] {
      return this.plugins
        .filter(plugin => plugin.kind === 'editor')
        .map(this.addContent);
    }
    get imports(): Plugin[] {
      return this.plugins
        .filter(plugin => plugin.kind === 'import')
        .map(this.addContent);
    }
    get exports(): Plugin[] {
      return this.plugins
        .filter(plugin => plugin.kind === 'export')
        .map(this.addContent);
    }
    get transforms(): Plugin[] {
      return this.plugins
        .filter(plugin => plugin.kind === 'transform')
        .map(this.addContent);
    }

    @query('#pluginmanager')
    pluginUI!: Dialog;
    @query('#pluginlist')
    pluginList!: List;

    constructor(...args: any[]) {
      super(...args);

      if (localStorage.getItem('plugins') === null) storeDefaultPlugins();
      this.addContent = this.addContent.bind(this);
    }

    addPlugin(plugin: Plugin): void {
      if (this.plugins.some(p => p.src === plugin.src)) return;

      const newPlugins = this.plugins;
      newPlugins.push(plugin);
    }

    removePlugin(scr: string): void {
      const newPlugins = this.plugins.filter(plugin => plugin.src !== scr);
      localStorage.setItem('plugins', JSON.stringify(newPlugins));
    }

    render(): TemplateResult {
      return html`${ifImplemented(
        super.render()
      )} <mwc-dialog id="pluginmanager">
      <mwc-textfield
      label="${translate('filter')}"
      iconTrailing="search"
      outlined
    ></mwc-textfield>
    <mwc-list id="pluginlist">
      </mwc-list-item>
      <li divider role="separator"></li>
      ${
        this.editors.length > 0
          ? this.editors.map(
              editor =>
                html`<mwc-list-item value="${editor.src}"
                  >${editor.name}</mwc-list-item
                >`
            )
          : html``
      }</mwc-list>
        <mwc-button icon="delete" @click="${() =>
          this.removePlugin((<ListItem>this.pluginList.selected).value)}">${get(
        'delete'
      )}</mwc-button>
      </mwc-dailog>`;
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
