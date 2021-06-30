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

type PluginKind = 'editor' | 'menu' | 'validator';
type MenuPosition = 'top' | 'middle' | 'bottom';
const menuPosition = ['top', 'middle', 'bottom'];

export type Plugin = {
  name: string;
  src: string;
  icon?: string;
  kind: PluginKind;
  needsDoc?: boolean;
  position?: MenuPosition;
  installed: boolean;
  content: () => Promise<TemplateResult>;
};

export const pluginIcons: Record<PluginKind, string> = {
  editor: 'tab',
  menu: 'play_circle',
  validator: 'rule_folder',
};

function storeDefaultPlugins(): void {
  localStorage.setItem('externalPlugins', JSON.stringify([]));
  localStorage.setItem(
    'officialPlugins',
    JSON.stringify(
      officialPlugins.map(plugin => {
        return { ...plugin, installed: plugin.default ?? false };
      })
    )
  );
}

function isNew(src: string): boolean {
  const installedOfficialPlugins = <Plugin[]>(
    JSON.parse(localStorage.getItem('officialPlugins') ?? '[]')
  );

  return !installedOfficialPlugins.some(
    installedOfficialPlugin => installedOfficialPlugin.src === src
  );
}

function isInstalled(src: string): boolean {
  const installedOfficialPlugins = <Plugin[]>(
    JSON.parse(localStorage.getItem('officialPlugins') ?? '[]')
  );

  return installedOfficialPlugins.some(
    installedOfficialPlugin =>
      installedOfficialPlugin.src === src && installedOfficialPlugin.installed
  );
}

function compareNeedsDoc(a: Plugin, b: Plugin): -1 | 0 | 1 {
  if (a.needsDoc === b.needsDoc) return 0;
  return a.needsDoc ? 1 : -1;
}

const loadedPlugins = new Map<string, LitElementConstructor>();

/** Mixin that manages Plugins in `localStorage` */
export type PluggingElement = Mixin<typeof Plugging>;

export function Plugging<TBase extends new (...args: any[]) => EditingElement>(
  Base: TBase
) {
  class PluggingElement extends Base {
    get editors(): Plugin[] {
      return this.plugins.filter(
        plugin => plugin.installed && plugin.kind === 'editor'
      );
    }
    get validators(): Plugin[] {
      return this.plugins.filter(
        plugin => plugin.installed && plugin.kind === 'validator'
      );
    }
    get menuEntries(): Plugin[] {
      return this.plugins.filter(
        plugin => plugin.installed && plugin.kind === 'menu'
      );
    }
    get topMenu(): Plugin[] {
      return this.menuEntries.filter(plugin => plugin.position === 'top');
    }
    get middleMenu(): Plugin[] {
      return this.menuEntries.filter(plugin => plugin.position === 'middle');
    }
    get bottomMenu(): Plugin[] {
      return this.menuEntries.filter(plugin => plugin.position === 'bottom');
    }

    private get plugins(): Plugin[] {
      return this.officialPlugins
        .concat(this.externalPlugins)
        .map(plugin => this.addContent(plugin))
        .sort(compareNeedsDoc);
    }

    private get officialPlugins(): Omit<Plugin, 'content'>[] {
      return <Omit<Plugin, 'content'>[]>(<unknown>officialPlugins.map(
        plugin => {
          return {
            ...plugin,
            installed: isNew(plugin.src) || isInstalled(plugin.src),
          };
        }
      ));
    }

    private get externalPlugins(): Omit<Plugin, 'content'>[] {
      return <Omit<Plugin, 'content'>[]>(
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

    private addExternalPlugin(plugin: Omit<Plugin, 'content'>): void {
      if (this.externalPlugins.some(p => p.src === plugin.src)) return;

      const newPlugins = this.externalPlugins;
      newPlugins.push(plugin);
      localStorage.setItem('externalPlugins', JSON.stringify(newPlugins));
    }

    private addContent(plugin: Omit<Plugin, 'content'>): Plugin {
      return {
        ...plugin,
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
        storeDefaultPlugins();
      this.requestUpdate();
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
              <mwc-radio-list-item
                id="editor"
                value="editor"
                hasMeta
                selected
                left
                >${translate('plugins.editor')}<mwc-icon slot="meta"
                  >${pluginIcons['editor']}</mwc-icon
                ></mwc-radio-list-item
              >
              <mwc-radio-list-item id="triggered" value="triggered" hasMeta left
                >${translate('plugins.triggered')}<mwc-icon slot="meta"
                  >${pluginIcons['menu']}</mwc-icon
                ></mwc-radio-list-item
              >
              <div id="triggerdetails">
                <mwc-formfield
                  id="enabledefault"
                  label="${translate('plugins.enablewithdoc')}"
                >
                  <mwc-switch></mwc-switch>
                </mwc-formfield>
                <mwc-select id="menutypes" naturalMenuWidth
                  >${Object.values(menuPosition).map(
                    menutype => html`<mwc-list-item>${menutype}</mwc-list-item>`
                  )}</mwc-select
                >
              </div>
              <mwc-radio-list-item id="validator" value="validator" hasMeta left
                >${translate('plugins.validator')}<mwc-icon slot="meta"
                  >${pluginIcons['validator']}</mwc-icon
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

    renderPluginKind(type: PluginKind, plugins: Plugin[]): TemplateResult {
      return html`<mwc-list multi>
        <mwc-list-item graphic="avatar" noninteractive
          >${translate(`plugins.${type}`)}<mwc-icon
            slot="graphic"
            class="inverted"
            >${pluginIcons[type]}</mwc-icon
          ></mwc-list-item
        >
        <li divider role="separator">
          </li>
          ${plugins.map(
            plugin =>
              html`<mwc-check-list-item
                value="${plugin.src}"
                graphic="icon"
                ?selected=${plugin.installed}
              >
                <mwc-icon slot="graphic"
                  >${plugin.icon || pluginIcons[plugin.kind]}</mwc-icon
                >
                ${plugin.name}
              </mwc-check-list-item>`
          )}
        </li></mwc-list
      >`;
    }

    renderPluginUI(): TemplateResult {
      return html`
        <mwc-dialog
          stacked
          id="pluginManager"
          heading="${translate('plugins.heading')}"
        >
          ${this.renderPluginKind('editor', this.editors)}
          ${this.renderPluginKind('validator', this.validators)}
          ${this.renderPluginKind('menu', this.menuEntries)}
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
        <style>
          #enabledefault {
            padding-bottom: 20px;
          }

          #menutypes {
            max-width: 250px;
          }

          #triggerdetails {
            display: none;
            padding: 20px;
            padding-left: 50px;
          }
          #triggered[selected] ~ #triggerdetails {
            display: grid;
          }
        </style>
      `;
    }

    //static style = css``;
  }

  return PluggingElement;
}
