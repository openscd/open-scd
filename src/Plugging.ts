import { html as litHtml, query, TemplateResult } from 'lit-element';
import { translate } from 'lit-translate';
import wrapHtml from 'carehtml';
const html = wrapHtml(litHtml);

import { Dialog } from '@material/mwc-dialog';

import { ifImplemented, LitElementConstructor, Mixin } from './foundation.js';
import { EditingElement, newEmptySCD } from './Editing.js';
import { List } from '@material/mwc-list';
import { MultiSelectedEvent } from '@material/mwc-list/mwc-list-foundation';
const placeholderDoc = newEmptySCD('OpenSCDPlaceholder.scd', '2007B4');

type EditorPluginKind = 'editor' | 'import' | 'export' | 'transform';

export type EditorPlugin = {
  name: string;
  src: string;
  icon?: string;
  kind: EditorPluginKind;
  content: () => Promise<TemplateResult>;
  installed: boolean;
  ordinal: number;
};

export const pluginIcons: Record<EditorPluginKind, string> = {
  editor: 'edit',
  import: 'snippet_folder',
  export: 'text_snippet',
  transform: 'folder_special',
};

const pluginRepo: Promise<(EditorPlugin & { default: boolean })[]> = fetch(
  '/public/json/plugins.json'
).then(res => res.json());

async function storeDefaultPlugins(): Promise<void> {
  localStorage.setItem(
    'plugins',
    JSON.stringify(
      await pluginRepo.then(plugins =>
        plugins.map((plugin, index) => {
          return { ...plugin, installed: plugin.default, ordinal: index };
        })
      )
    )
  );
}

/** Mixin that saves [[`Plugins`]] to `localStorage`, reflecting them in the
 * `plugins` property. */
export type PluggingElement = Mixin<typeof Plugging>;

const loaded = new Map<string, LitElementConstructor>();

export function Plugging<TBase extends new (...args: any[]) => EditingElement>(
  Base: TBase
) {
  class PluggingElement extends Base {
    get plugins(): EditorPlugin[] {
      return <EditorPlugin[]>(
        JSON.parse(localStorage.getItem('plugins') ?? '[]')
      );
    }

    private addContent(plugin: EditorPlugin) {
      return {
        ...plugin,
        content: async (): Promise<TemplateResult> => {
          if (!loaded.has(plugin.src))
            loaded.set(
              plugin.src,
              await import(plugin.src).then(mod => mod.default)
            );
          return html`<${loaded.get(plugin.src)} .doc=${
            this.doc ?? placeholderDoc
          }></${loaded.get(plugin.src)}>`;
        },
      };
    }

    get editors(): EditorPlugin[] {
      return this.plugins
        .filter(plugin => plugin.installed && plugin.kind === 'editor')
        .map(this.addContent);
    }
    get imports(): EditorPlugin[] {
      return this.plugins
        .filter(plugin => plugin.installed && plugin.kind === 'import')
        .map(this.addContent);
    }
    get exports(): EditorPlugin[] {
      return this.plugins
        .filter(plugin => plugin.installed && plugin.kind === 'export')
        .map(this.addContent);
    }
    get transforms(): EditorPlugin[] {
      return this.plugins
        .filter(plugin => plugin.installed && plugin.kind === 'transform')
        .map(this.addContent);
    }

    @query('#pluginmanager')
    pluginUI!: Dialog;
    @query('#pluginlist')
    pluginList!: List;

    addPlugin(index: number): void {
      const newPlugins = this.plugins;
      newPlugins[index].installed = true;
      localStorage.setItem('plugins', JSON.stringify(newPlugins));
    }

    removePlugin(index: number): void {
      const newPlugins = this.plugins;
      newPlugins[index].installed = false;
      localStorage.setItem('plugins', JSON.stringify(newPlugins));
    }

    setPlugins(indices: Set<number>): void {
      const newPlugins = this.plugins.map((plugin, index) => {
        return { ...plugin, installed: indices.has(index) };
      });
      localStorage.setItem('plugins', JSON.stringify(newPlugins));
      this.requestUpdate();
    }

    old_removePlugin(scr: string): void {
      const newPlugins = this.plugins.filter(plugin => plugin.src !== scr);
      localStorage.setItem('plugins', JSON.stringify(newPlugins));
    }

    old_addPlugin(plugin: EditorPlugin): void {
      if (this.plugins.some(p => p.src === plugin.src)) return;

      const newPlugins = this.plugins;
      newPlugins.push(plugin);
      localStorage.setItem('plugins', JSON.stringify(newPlugins));
    }

    constructor(...args: any[]) {
      super(...args);

      if (localStorage.getItem('plugins') === null)
        storeDefaultPlugins().then(() => this.requestUpdate());
      this.addContent = this.addContent.bind(this);
      this.addPlugin = this.addPlugin.bind(this);
      this.setPlugins = this.setPlugins.bind(this);
      this.removePlugin = this.removePlugin.bind(this);
    }

    render(): TemplateResult {
      return html`
        ${ifImplemented(super.render())}
        <mwc-dialog
          hideActions
          id="pluginmanager"
          heading="${translate('plugins.name')}"
        >
          <mwc-textfield
            label="${translate('filter')}"
            iconTrailing="search"
            outlined
          ></mwc-textfield>
          <mwc-list
            @selected=${(e: MultiSelectedEvent) =>
              this.setPlugins(e.detail.index)}
            id="pluginlist"
            activatable
            multi
          >
            ${this.plugins.map(
              plugin =>
                html`<mwc-list-item
                  value="${plugin.src || ''}"
                  hasMeta
                  graphic="icon"
                  ?activated=${plugin.installed || false}
                  ?selected=${plugin.installed || false}
                >
                  <mwc-icon slot="graphic"
                    >${plugin.icon ||
                    pluginIcons[plugin.kind] ||
                    'error'}</mwc-icon
                  >
                  ${plugin.name || ''}
                  <mwc-icon slot="meta"
                    >${pluginIcons[plugin.kind] || 'error'}</mwc-icon
                  ></mwc-list-item
                >`
            ) || ''}
          </mwc-list>
        </mwc-dialog>
      `;
    }
  }

  return PluggingElement;
}

/** If `tagName` is not yet a custom element, imports the module at `src` and
 * registers its default export as a custom element called `tagName`. */
export async function plugin(src: string, tagName: string): Promise<void> {
  if (customElements.get(tagName) === undefined) {
    const mod = await import(src);
    customElements.define(tagName, mod.default);
  }
}
