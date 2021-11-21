import { query, TemplateResult } from 'lit-element';
import { translate } from 'lit-translate';

import { List } from '@material/mwc-list';
import { Switch } from '@material/mwc-switch';
import { TextField } from '@material/mwc-textfield';


import {
  Button,
  Dialog,
  Formfield,
  html,
  ifImplemented,
  ListItem,
  LitElementConstructor,
  Mixin,
  Select,
} from './foundation.js';
import { EditingElement } from './Editing.js';
import { MultiSelectedEvent } from '@material/mwc-list/mwc-list-foundation';
import { officialPlugins } from '../public/js/plugins.js';

type PluginKind = 'editor' | 'menu' | 'validator';
const menuPosition = ['top', 'middle', 'bottom'] as const;
type MenuPosition = typeof menuPosition[number];

export type Plugin = {
  name: string;
  src: string;
  icon?: string;
  kind: PluginKind;
  requireDoc?: boolean;
  position?: MenuPosition;
  installed: boolean;
  official?: boolean;
  content: () => Promise<TemplateResult>;
};

export const pluginIcons: Record<PluginKind | MenuPosition, string> = {
  editor: 'tab',
  menu: 'play_circle',
  validator: 'rule_folder',
  top: 'play_circle',
  middle: 'play_circle',
  bottom: 'play_circle',
};

function resetPlugins(): void {
  localStorage.setItem(
    'plugins',
    JSON.stringify(
      officialPlugins.map(plugin => {
        return {
          src: plugin.src,
          installed: plugin.default ?? false,
          official: true,
        };
      })
    )
  );
}

const menuOrder: (PluginKind | MenuPosition)[] = [
  'editor',
  'top',
  'validator',
  'middle',
  'bottom',
];

function menuCompare(a: Plugin, b: Plugin): -1 | 0 | 1 {
  if (a.kind === b.kind && a.position === b.position) return 0;
  const earlier = menuOrder.find(kind =>
    [a.kind, b.kind, a.position, b.position].includes(kind)
  );
  return [a.kind, a.position].includes(earlier) ? -1 : 1;
}

function compareNeedsDoc(a: Plugin, b: Plugin): -1 | 0 | 1 {
  if (a.requireDoc === b.requireDoc) return 0;
  return a.requireDoc ? 1 : -1;
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
      return this.storedPlugins
        .map(plugin => {
          if (!plugin.official) return plugin;
          const officialPlugin = officialPlugins.find(
            needle => needle.src === plugin.src
          );
          return <Plugin>{
            ...officialPlugin,
            ...plugin,
          };
        })
        .sort(compareNeedsDoc)
        .sort(menuCompare);
    }

    private get storedPlugins(): Plugin[] {
      return <Plugin[]>(
        JSON.parse(localStorage.getItem('plugins') ?? '[]', (key, value) =>
          value.src ? this.addContent(value) : value
        )
      );
    }

    @query('#pluginManager')
    pluginUI!: Dialog;
    @query('#pluginList')
    pluginList!: List;
    @query('#pluginAdd')
    pluginDownloadUI!: Dialog;

    private setPlugins(indices: Set<number>) {
      const newPlugins = this.plugins.map((plugin, index) => {
        return { ...plugin, installed: indices.has(index), content: undefined };
      });
      localStorage.setItem('plugins', JSON.stringify(newPlugins));
      this.requestUpdate();
    }

    private updatePlugins() {
      const stored: (
        | Plugin
        | { src: string; installed: boolean; official: true }
      )[] = this.storedPlugins;
      const officialStored = stored.filter(p => p.official);
      const newOfficial = officialPlugins
        .filter(p => !officialStored.find(o => o.src === p.src))
        .map(plugin => {
          return {
            src: plugin.src,
            installed: plugin.default ?? false,
            official: true as const,
          };
        });
      const oldOfficial = officialStored.filter(
        p => !officialPlugins.find(o => p.src === o.src)
      );
      const newPlugins = stored.filter(
        p => !oldOfficial.find(o => p.src === o.src)
      );
      newOfficial.map(p => newPlugins.push(p));
      localStorage.setItem('plugins', JSON.stringify(newPlugins));
    }

    private addExternalPlugin(plugin: Omit<Plugin, 'content'>): void {
      if (this.storedPlugins.some(p => p.src === plugin.src)) return;

      const newPlugins: Omit<Plugin, 'content'>[] = this.storedPlugins;
      newPlugins.push(plugin);
      localStorage.setItem('plugins', JSON.stringify(newPlugins));
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
            .pluginId=${plugin.src}
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
      const requireDoc = <Switch>(
        this.pluginDownloadUI.querySelector('#requireDoc')
      );
      const positionList = <Select>(
        this.pluginDownloadUI.querySelector('#menuPosition')
      );

      if (
        !(
          pluginSrcInput.checkValidity() &&
          pluginNameInput.checkValidity() &&
          pluginKindList.selected &&
          requireDoc &&
          positionList.selected
        )
      )
        return;

      this.addExternalPlugin({
        src: pluginSrcInput.value,
        name: pluginNameInput.value,
        kind: <PluginKind>(<ListItem>pluginKindList.selected).value,
        requireDoc: requireDoc.checked,
        position: <MenuPosition>positionList.value,
        installed: true,
      });

      this.requestUpdate();
      this.pluginUI.requestUpdate();
      this.pluginDownloadUI.close();
    }

    constructor(...args: any[]) {
      super(...args);

      this.updatePlugins();
      this.requestUpdate();
    }

    renderDownloadUI(): TemplateResult {
      return html`
        <${Dialog}
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
              <mwc-radio-list-item id="menu" value="menu" hasMeta left
                >${translate('plugins.menu')}<mwc-icon slot="meta"
                  >${pluginIcons['menu']}</mwc-icon
                ></mwc-radio-list-item
              >
              <div id="menudetails">
                <${Formfield}
                  id="enabledefault"
                  label="${translate('plugins.requireDoc')}"
                >
                  <mwc-switch id="requireDoc" checked></mwc-switch>
                </${Formfield}>
                <${Select} id="menuPosition" value="middle" fixedMenuPosition
                  >${Object.values(menuPosition).map(
                    menutype =>
                      html`<${ListItem} value="${menutype}"
                        >${translate('plugins.' + menutype)}</${ListItem}
                      >`
                  )}</${Select}
                >
              </div>
              <style>
                #menudetails {
                  display: none;
                  padding: 20px;
                  padding-left: 50px;
                }
                #menu[selected] ~ #menudetails {
                  display: grid;
                }
                #enabledefault {
                  padding-bottom: 20px;
                }
                #menuPosition {
                  max-width: 250px;
                }
              </style>
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
          <${Button}
            slot="secondaryAction"
            dialogAction="close"
            label="${translate('cancel')}"
          ></${Button}>
          <${Button}
            slot="primaryAction"
            icon="add"
            label="${translate('add')}"
            trailingIcon
            @click=${() => this.handleAddPlugin()}
          ></${Button}>
        </${Dialog}>
      `;
    }

    renderPluginKind(
      type: PluginKind | MenuPosition,
      plugins: Plugin[]
    ): TemplateResult {
      return html`
        ${plugins.map(
          plugin =>
            html`<mwc-check-list-item
              class="${plugin.official ? 'official' : 'external'}"
              value="${plugin.src}"
              ?selected=${plugin.installed}
              hasMeta
              left
            >
              <mwc-icon slot="meta"
                >${plugin.icon || pluginIcons[plugin.kind]}</mwc-icon
              >
              ${plugin.name}
            </mwc-check-list-item>`
        )}
      `;
    }

    renderPluginUI(): TemplateResult {
      return html`
        <${Dialog}
          stacked
          id="pluginManager"
          heading="${translate('plugins.heading')}"
        >
          <mwc-list
            id="pluginList"
            multi
            @selected=${(e: MultiSelectedEvent) =>
              this.setPlugins(e.detail.index)}
          >
            <${ListItem} graphic="avatar" noninteractive
              ><strong>${translate(`plugins.editor`)}</strong
              ><mwc-icon slot="graphic" class="inverted"
                >${pluginIcons['editor']}</mwc-icon
              ></${ListItem}
            >
            <li divider role="separator"></li>
            ${this.renderPluginKind(
              'editor',
              this.plugins.filter(p => p.kind === 'editor')
            )}
            <${ListItem} graphic="avatar" noninteractive
              ><strong>${translate(`plugins.menu`)}</strong
              ><mwc-icon slot="graphic" class="inverted"
                ><strong>${pluginIcons['menu']}</strong></mwc-icon
              ></${ListItem}
            >
            <li divider role="separator"></li>
            ${this.renderPluginKind(
              'top',
              this.plugins.filter(
                p => p.kind === 'menu' && p.position === 'top'
              )
            )}
            <li divider role="separator" inset></li>
            ${this.renderPluginKind(
              'validator',
              this.plugins.filter(p => p.kind === 'validator')
            )}
            <li divider role="separator" inset></li>
            ${this.renderPluginKind(
              'middle',
              this.plugins.filter(
                p => p.kind === 'menu' && p.position === 'middle'
              )
            )}
            <li divider role="separator" inset></li>
            ${this.renderPluginKind(
              'bottom',
              this.plugins.filter(
                p => p.kind === 'menu' && p.position === 'bottom'
              )
            )}
          </mwc-list>
          <${Button}
            slot="secondaryAction"
            icon="refresh"
            label="${translate('reset')}"
            @click=${async () => {
              resetPlugins();
              this.requestUpdate();
            }}
            style="--mdc-theme-primary: var(--mdc-theme-error)"
          >
          </${Button}>
          <${Button}
            raised
            trailingIcon
            slot="primaryAction"
            icon="library_add"
            label="${translate('add')}&hellip;"
            @click=${() => this.pluginDownloadUI.show()}
          >
          </${Button}>
        </${Dialog}>
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
