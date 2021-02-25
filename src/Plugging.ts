import { html as litHtml, query, TemplateResult } from 'lit-element';
import { translate } from 'lit-translate';
import wrapHtml from './carehtml/wrap.js';

const html = wrapHtml(litHtml);

import { TextField } from '@material/mwc-textfield';
import { Dialog } from '@material/mwc-dialog';

import { ifImplemented, LitElementConstructor, Mixin } from './foundation.js';
import { EditingElement, newEmptySCD } from './Editing.js';
import { List } from '@material/mwc-list';
import { MultiSelectedEvent } from '@material/mwc-list/mwc-list-foundation';
import { ListItem } from '@material/mwc-list/mwc-list-item';
const placeholderDoc = newEmptySCD('OpenSCDPlaceholder.scd', '2007B4');

type EditorPluginKind = 'editor' | 'import' | 'export' | 'transform';

export type EditorPlugin = {
  name: string;
  src: string;
  icon?: string;
  kind: EditorPluginKind;
  content: () => Promise<TemplateResult>;
  installed: boolean;
};

export const pluginIcons: Record<EditorPluginKind, string> = {
  editor: 'edit',
  import: 'snippet_folder',
  export: 'text_snippet',
  transform: 'folder_special',
};

const pluginRepo: Promise<(EditorPlugin & { default?: boolean })[]> = fetch(
  '/public/json/plugins.json'
).then(res => res.json());

async function storeDefaultPlugins(): Promise<void> {
  localStorage.setItem(
    'plugins',
    JSON.stringify(
      await pluginRepo.then(plugins =>
        plugins.map(plugin => {
          return { ...plugin, installed: plugin.default ?? false };
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
    get plugins(): Omit<EditorPlugin, 'content'>[] {
      return <EditorPlugin[]>(
        JSON.parse(localStorage.getItem('plugins') ?? '[]')
      );
    }

    private addContent(plugin: Omit<EditorPlugin, 'content'>) {
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

    @query('#pluginManager')
    pluginUI!: Dialog;
    @query('#pluginList')
    pluginList!: List;
    @query('#pluginAdd')
    pluginDownloadUI!: Dialog;

    setPlugins(indices: Set<number>): void {
      const newPlugins = this.plugins.map((plugin, index) => {
        return { ...plugin, installed: indices.has(index) };
      });
      localStorage.setItem('plugins', JSON.stringify(newPlugins));
      this.requestUpdate();
    }

    addPlugin(plugin: Omit<EditorPlugin, 'content'>): void {
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
    }

    render(): TemplateResult {
      return html`
        ${ifImplemented(super.render())}
        <mwc-dialog
          hideActions
          id="pluginManager"
          heading="${translate('plugins.heading')}"
        >
          <div style="display: flex; flex-direction: column; row-gap: 8px;">
            <mwc-list
              @selected=${(e: MultiSelectedEvent) =>
                this.setPlugins(e.detail.index)}
              id="pluginList"
              activatable
              multi
            >
              ${this.plugins.map(
                plugin =>
                  html`<mwc-list-item
                    value="${plugin.src}"
                    hasMeta
                    graphic="icon"
                    ?activated=${plugin.installed}
                    ?selected=${plugin.installed}
                  >
                    <mwc-icon slot="graphic"
                      >${plugin.icon || pluginIcons[plugin.kind]}</mwc-icon
                    >
                    ${plugin.name}
                    <mwc-icon slot="meta"
                      >${pluginIcons[plugin.kind]}</mwc-icon
                    ></mwc-list-item
                  >`
              )}
            </mwc-list>
            <mwc-fab
              extended
              iconTrailing
              raised
              icon="library_add"
              label="${translate('add')}"
              style="align-self: center;"
              @click=${() => this.pluginDownloadUI.show()}
            >
            </mwc-fab>
          </div>
        </mwc-dialog>
        <mwc-dialog
          id="pluginAdd"
          heading="${translate('plugins.add.heading')}"
        >
          <div style="display: flex; flex-direction: column; row-gap: 8px;">
            <mwc-textfield
              label="${translate('plugins.add.name')}"
              helper="${translate('plugins.add.nameHelper')}"
              required
              id="pluginNameInput"
            ></mwc-textfield>
            <mwc-list id="pluginKindList">
              <mwc-radio-list-item value="editor" hasMeta selected left
                >${translate('plugins.editor')}<mwc-icon slot="meta"
                  >${pluginIcons['editor']}</mwc-icon
                ></mwc-radio-list-item
              >
              <mwc-radio-list-item value="import" hasMeta left
                >${translate('plugins.import')}<mwc-icon slot="meta"
                  >${pluginIcons['import']}</mwc-icon
                ></mwc-radio-list-item
              >
              <mwc-radio-list-item value="export" hasMeta left
                >${translate('plugins.export')}<mwc-icon slot="meta"
                  >${pluginIcons['export']}</mwc-icon
                ></mwc-radio-list-item
              >
              <mwc-radio-list-item value="transform" hasMeta left
                >${translate('plugins.transform')}<mwc-icon slot="meta"
                  >${pluginIcons['transform']}</mwc-icon
                ></mwc-radio-list-item
              >
            </mwc-list>
            <mwc-textfield
              label="${translate('plugins.add.src')}"
              helper="${translate('plugins.add.srcHelper')}"
              placeholder="http://example.com/plugin.js"
              type="url"
              required
              id="pluginSrcInput"
            ></mwc-textfield>
          </div>
          <mwc-button
            slot="secondaryAction"
            dialogAction="close"
            label="${translate('cancel')}"
          ></mwc-button>
          <mwc-button
            slot="primaryAction"
            icon="add"
            label="${translate('add')}"
            trailingIcon
            @click=${() => this.handleAddPlugin()}
          ></mwc-button>
        </mwc-dialog>
      `;
    }
    handleAddPlugin() {
      const pluginSrcInput = <TextField>(
        this.pluginDownloadUI.querySelector('#pluginSrcInput')
      );
      const pluginNameInput = <TextField>(
        this.pluginDownloadUI.querySelector('#pluginNameInput')
      );
      const pluginKindList = <List>(
        this.pluginDownloadUI.querySelector('#pluginKindList')
      );

      if (
        !(
          pluginSrcInput.checkValidity() &&
          pluginNameInput.checkValidity() &&
          pluginKindList.selected
        )
      )
        return;

      this.addPlugin({
        src: pluginSrcInput.value,
        name: pluginNameInput.value,
        kind: <EditorPluginKind>(<ListItem>pluginKindList.selected).value,
        installed: true,
      });

      this.requestUpdate();
      this.pluginUI.requestUpdate();
      this.pluginDownloadUI.close();
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
