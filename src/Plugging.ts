import { html as litHtml, query, TemplateResult } from 'lit-element';
import { translate } from 'lit-translate';
import wrapHtml from './carehtml/wrap.js';

const html = wrapHtml(litHtml);

import { TextField } from '@material/mwc-textfield';
import { Dialog } from '@material/mwc-dialog';

import { ifImplemented, LitElementConstructor, Mixin } from './foundation.js';
import { EditingElement } from './Editing.js';
import { List } from '@material/mwc-list';
import { MultiSelectedEvent } from '@material/mwc-list/mwc-list-foundation';
import { ListItem } from '@material/mwc-list/mwc-list-item';

type PluginKind = 'editor' | 'triggered';

type AvailablePlugin = {
  name: string;
  src: string;
  icon?: string;
  kind: PluginKind;
  installed: boolean;
};

export type InstalledPlugin = AvailablePlugin & {
  content: () => Promise<TemplateResult>;
  installed: true;
};

export const pluginIcons: Record<PluginKind, string> = {
  editor: 'tab',
  triggered: 'play_circle',
};

const officialPlugins: Promise<(AvailablePlugin & { default?: boolean })[]> = fetch(
  '/public/json/plugins.json'
).then(res => res.json());

async function storeDefaultPlugins(): Promise<void> {
  localStorage.setItem(
    'plugins',
    JSON.stringify(
      await officialPlugins.then(plugins =>
        plugins.map(plugin => {
          return { ...plugin, installed: plugin.default ?? false };
        })
      )
    )
  );
}

/** Mixin that manages Plugins in `localStorage` */
export type PluggingElement = Mixin<typeof Plugging>;

const loadedPlugins = new Map<string, LitElementConstructor>();

export function Plugging<TBase extends new (...args: any[]) => EditingElement>(
  Base: TBase
) {
  class PluggingElement extends Base {
    get editors(): InstalledPlugin[] {
      return this.plugins
        .filter(plugin => plugin.installed && plugin.kind === 'editor')
        .map(plugin => this.addContent(plugin));
    }
    get items(): InstalledPlugin[] {
      return this.plugins
        .filter(plugin => plugin.installed && plugin.kind === 'triggered')
        .map(plugin => this.addContent(plugin));
    }

    @query('#pluginManager')
    pluginUI!: Dialog;
    @query('#pluginList')
    pluginList!: List;
    @query('#pluginAdd')
    pluginDownloadUI!: Dialog;

    private setPlugins(indices: Set<number>): void {
      const newPlugins = this.plugins.map((plugin, index) => {
        return { ...plugin, installed: indices.has(index) };
      });
      localStorage.setItem('plugins', JSON.stringify(newPlugins));
      this.requestUpdate();
    }

    private addPlugin(plugin: AvailablePlugin): void {
      if (this.plugins.some(p => p.src === plugin.src)) return;

      const newPlugins = this.plugins;
      newPlugins.push(plugin);
      localStorage.setItem('plugins', JSON.stringify(newPlugins));
    }

    private get plugins(): AvailablePlugin[] {
      return <InstalledPlugin[]>(
        JSON.parse(localStorage.getItem('plugins') ?? '[]')
      );
    }

    private addContent(plugin: AvailablePlugin): InstalledPlugin {
      return {
        ...plugin,
        installed: true,
        content: async (): Promise<TemplateResult> => {
          if (!loadedPlugins.has(plugin.src))
            loadedPlugins.set(
              plugin.src,
              await import(plugin.src).then(mod => mod.default)
            );
          return html`<${loadedPlugins.get(plugin.src)}
            .doc=${this.doc}
            .docName=${this.docName}
          ></${loadedPlugins.get(plugin.src)}>`;
        },
      };
    }

    private handleAddPlugin() {
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
        kind: <PluginKind>(<ListItem>pluginKindList.selected).value,
        installed: true,
      });

      this.requestUpdate();
      this.pluginUI.requestUpdate();
      this.pluginDownloadUI.close();
    }

    constructor(...args: any[]) {
      super(...args);

      if (localStorage.getItem('plugins') === null)
        storeDefaultPlugins().then(() => this.requestUpdate());
    }

    render(): TemplateResult {
      return html`
        ${ifImplemented(super.render())}
        <mwc-dialog
          stacked
          id="pluginManager"
          heading="${translate('plugins.heading')}"
        >
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
          <mwc-button
            slot="secondaryAction"
            icon="refresh"
            label="${translate('reset')}"
            @click=${async () => {
              storeDefaultPlugins();
              this.requestUpdate();
            }}
            style="--mdc-theme-primary: var(--mdc-theme-error)"
          >
          </mwc-button>
          <mwc-button
            raised
            trailingIcon
            slot="primaryAction"
            icon="library_add"
            label="${translate('add')}&hellip;"
            @click=${() => this.pluginDownloadUI.show()}
          >
          </mwc-button>
        </mwc-dialog>
        <mwc-dialog
          id="pluginAdd"
          heading="${translate('plugins.add.heading')}"
        >
          <div style="display: flex; flex-direction: column; row-gap: 8px;">
            <p style="color:var(--mdc-theme-error);">
              ${translate('plugins.add.warning')}
            </p>
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
              <mwc-radio-list-item value="triggered" hasMeta left
                >${translate('plugins.triggered')}<mwc-icon slot="meta"
                  >${pluginIcons['triggered']}</mwc-icon
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
  }

  return PluggingElement;
}
