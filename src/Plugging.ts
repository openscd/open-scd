import { html as litHtml, query, TemplateResult } from 'lit-element';
import { translate } from 'lit-translate';
import wrapHtml from 'carehtml';

const html = wrapHtml(litHtml);

import { Dialog } from '@material/mwc-dialog';
import { List } from '@material/mwc-list';
import { TextField } from '@material/mwc-textfield';

import { ifImplemented, LitElementConstructor, Mixin } from './foundation.js';
import { EditingElement } from './Editing.js';
import { MultiSelectedEvent } from '@material/mwc-list/mwc-list-foundation';
import { ListItem } from '@material/mwc-list/mwc-list-item';
import { officialPlugins } from '../public/js/plugins.js';

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

async function storeDefaultPlugins(): Promise<void> {
  localStorage.setItem('externalPlugins', JSON.stringify([]));
  localStorage.setItem(
    'officialPlugins',
    JSON.stringify(
      await officialPlugins.map(plugin => {
        return { ...plugin, installed: plugin.default ?? false };
      })
    )
  );
}

function isNew(src: string): boolean {
  const installedOfficialPlugins = <AvailablePlugin[]>(
    JSON.parse(localStorage.getItem('officialPlugins') ?? '[]')
  );

  return !installedOfficialPlugins.some(
    installedOfficialPlugin => installedOfficialPlugin.src === src
  );
}

function isInstalled(src: string): boolean {
  const installedOfficialPlugins = <AvailablePlugin[]>(
    JSON.parse(localStorage.getItem('officialPlugins') ?? '[]')
  );

  return installedOfficialPlugins.some(
    installedOfficialPlugin =>
      installedOfficialPlugin.src === src && installedOfficialPlugin.installed
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
    get triggered(): InstalledPlugin[] {
      return this.plugins
        .filter(plugin => plugin.installed && plugin.kind === 'triggered')
        .map(plugin => this.addContent(plugin));
    }

    private get plugins(): AvailablePlugin[] {
      return this.officialPlugins.concat(this.externalPlugins);
    }

    private get officialPlugins(): AvailablePlugin[] {
      return <InstalledPlugin[]>(<unknown>officialPlugins.map(plugin => {
        return {
          ...plugin,
          installed: isNew(plugin.src) || isInstalled(plugin.src),
        };
      }));
    }

    private get externalPlugins(): AvailablePlugin[] {
      return <InstalledPlugin[]>(
        JSON.parse(localStorage.getItem('externalPlugins') ?? '[]')
      );
    }

    @query('#pluginManager')
    pluginUI!: Dialog;
    @query('#officialPluginList')
    officialPluginList!: List;
    @query('#pluginAdd')
    pluginDownloadUI!: Dialog;

    private setOfficialPlugins(indices: Set<number>): void {
      const newPlugins = this.officialPlugins.map((plugin, index) => {
        return { ...plugin, installed: indices.has(index) };
      });
      localStorage.setItem('officialPlugins', JSON.stringify(newPlugins));
      this.requestUpdate();
    }

    private setExternalPlugins(indices: Set<number>): void {
      const newPlugins = this.externalPlugins.map((plugin, index) => {
        return { ...plugin, installed: indices.has(index) };
      });
      localStorage.setItem('externalPlugins', JSON.stringify(newPlugins));
      this.requestUpdate();
    }

    private addExternalPlugin(plugin: AvailablePlugin): void {
      if (this.externalPlugins.some(p => p.src === plugin.src)) return;

      const newPlugins = this.externalPlugins;
      newPlugins.push(plugin);
      localStorage.setItem('externalPlugins', JSON.stringify(newPlugins));
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
            .docId=${this.docId}
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

      this.addExternalPlugin({
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

      if (localStorage.getItem('officialPlugins') === null)
        storeDefaultPlugins().then(() => this.requestUpdate());
    }

    renderDownloadUI(): TemplateResult {
      return html`
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

    renderPluginUI(): TemplateResult {
      return html`
        <mwc-dialog
          stacked
          id="pluginManager"
          heading="${translate('plugins.heading')}"
        >
          <mwc-list
            @selected=${(e: MultiSelectedEvent) =>
              this.setOfficialPlugins(e.detail.index)}
            id="officialPluginList"
            activatable
            multi
          >
            ${this.officialPlugins.map(
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
          <mwc-list
            @selected=${(e: MultiSelectedEvent) =>
              this.setExternalPlugins(e.detail.index)}
            id="externalPluginList"
            activatable
            multi
          >
            ${this.externalPlugins.map(
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
      `;
    }

    render(): TemplateResult {
      return html`
        ${ifImplemented(super.render())} ${this.renderPluginUI()}
        ${this.renderDownloadUI()}
      `;
    }
  }

  return PluggingElement;
}
