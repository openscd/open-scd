import { html, query, TemplateResult } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { translate } from 'lit-translate';

import '@material/mwc-button';
import '@material/mwc-dialog';
import '@material/mwc-formfield';
import '@material/mwc-icon';
import '@material/mwc-list';
import '@material/mwc-list/mwc-check-list-item';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-list/mwc-radio-list-item';
import '@material/mwc-select';
import '@material/mwc-switch';
import '@material/mwc-textfield';
import { Dialog } from '@material/mwc-dialog';
import { List } from '@material/mwc-list';
import { ListItem } from '@material/mwc-list/mwc-list-item';
import { MultiSelectedEvent } from '@material/mwc-list/mwc-list-foundation';
import { Select } from '@material/mwc-select';
import { Switch } from '@material/mwc-switch';
import { TextField } from '@material/mwc-textfield';

import { ifImplemented, Mixin } from './foundation.js';
import { EditingElement } from './Editing.js';
import { officialPlugins } from '../public/js/plugins.js';
import { Nsdoc } from './foundation/nsdoc.js';
import { LoggingElement } from './Logging.js';
const pluginTags = new Map<string, string>();
/**
 * Hashes `uri` using cyrb64 analogous to
 * https://github.com/bryc/code/blob/master/jshash/experimental/cyrb53.js .
 * @returns a valid customElement tagName containing the URI hash.
 */
function pluginTag(uri: string): string {
  if (!pluginTags.has(uri)) {
    let h1 = 0xdeadbeef,
      h2 = 0x41c6ce57;
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
      'oscd-plugin' +
        ((h2 >>> 0).toString(16).padStart(8, '0') +
          (h1 >>> 0).toString(16).padStart(8, '0'))
    );
  }
  return pluginTags.get(uri)!;
}

/**
 * This is a template literal tag function. See:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates
 *
 * Passes its arguments to LitElement's `html` tag after combining the first and
 * last expressions with the first two and last two static strings.
 * Throws unless the first and last expressions are identical strings.
 *
 * We need this to get around the expression location limitations documented in
 * https://lit.dev/docs/templates/expressions/#expression-locations
 *
 * After upgrading to Lit 2 we can use their static HTML functions instead:
 * https://lit.dev/docs/api/static-html/
 */
function staticTagHtml(
  oldStrings: ReadonlyArray<string>,
  ...oldArgs: unknown[]
): TemplateResult {
  const args = [...oldArgs];
  const firstArg = args.shift();
  const lastArg = args.pop();

  if (firstArg !== lastArg)
    throw new Error(
      `Opening tag <${firstArg}> does not match closing tag </${lastArg}>.`
    );

  const strings = [...oldStrings] as string[] & { raw: string[] };
  const firstString = strings.shift();
  const secondString = strings.shift();

  const lastString = strings.pop();
  const penultimateString = strings.pop();

  strings.unshift(`${firstString}${firstArg}${secondString}`);
  strings.push(`${penultimateString}${lastArg}${lastString}`);

  return html(<TemplateStringsArray>strings, ...args);
}

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
  content?: TemplateResult;
};

type InstalledOfficialPlugin = {
  src: string;
  official: true;
  installed: boolean;
};

function withoutContent<P extends Plugin | InstalledOfficialPlugin>(
  plugin: P
): P {
  return { ...plugin, content: undefined };
}

function storePlugins(plugins: Array<Plugin | InstalledOfficialPlugin>) {
  localStorage.setItem('plugins', JSON.stringify(plugins.map(withoutContent)));
}

export const pluginIcons: Record<PluginKind | MenuPosition, string> = {
  editor: 'tab',
  menu: 'play_circle',
  validator: 'rule_folder',
  top: 'play_circle',
  middle: 'play_circle',
  bottom: 'play_circle',
};

function resetPlugins(): void {
  storePlugins(
    officialPlugins.map(plugin => {
      return {
        src: plugin.src,
        installed: plugin.default ?? false,
        official: true,
      };
    })
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

const loadedPlugins = new Set<string>();

/** Mixin that manages Plugins in `localStorage` */
export type PluggingElement = Mixin<typeof Plugging>;

export function Plugging<
  TBase extends new (...args: any[]) => EditingElement & LoggingElement
>(Base: TBase) {
  class PluggingElement extends Base {
    // DIRTY HACK: will refactored with open-scd-core
    nsdoc!: Nsdoc;

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
          value.src && value.installed ? this.addContent(value) : value
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
        return { ...plugin, installed: indices.has(index) };
      });
      storePlugins(newPlugins);
      this.requestUpdate();
    }

    private updatePlugins() {
      const stored: Plugin[] = this.storedPlugins;
      const officialStored = stored.filter(p => p.official);
      const newOfficial: Array<Plugin | InstalledOfficialPlugin> =
        officialPlugins
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
      const newPlugins: Array<Plugin | InstalledOfficialPlugin> = stored.filter(
        p => !oldOfficial.find(o => p.src === o.src)
      );
      newOfficial.map(p => newPlugins.push(p));
      storePlugins(newPlugins);
    }

    private addExternalPlugin(plugin: Omit<Plugin, 'content'>): void {
      if (this.storedPlugins.some(p => p.src === plugin.src)) return;

      const newPlugins: Omit<Plugin, 'content'>[] = this.storedPlugins;
      newPlugins.push(plugin);
      storePlugins(newPlugins);
    }

    private addContent(plugin: Omit<Plugin, 'content'>): Plugin {
      const tag = pluginTag(plugin.src);
      if (!loadedPlugins.has(tag)) {
        loadedPlugins.add(tag);
        import(plugin.src).then(mod => customElements.define(tag, mod.default));
      }
      return {
        ...plugin,
        content: staticTagHtml`<${tag}
            .doc=${this.doc}
            .docName=${this.docName}
            .editCount=${this.editCount}
            .docId=${this.docId}
            .pluginId=${plugin.src}
            .nsdoc=${this.nsdoc}
            class="${classMap({
              plugin: true,
              menu: plugin.kind === 'menu',
              validator: plugin.kind === 'validator',
              editor: plugin.kind === 'editor',
            })}"
          ></${tag}>`,
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
              <mwc-radio-list-item id="menu" value="menu" hasMeta left
                >${translate('plugins.menu')}<mwc-icon slot="meta"
                  >${pluginIcons['menu']}</mwc-icon
                ></mwc-radio-list-item
              >
              <div id="menudetails">
                <mwc-formfield
                  id="enabledefault"
                  label="${translate('plugins.requireDoc')}"
                >
                  <mwc-switch id="requireDoc" checked></mwc-switch>
                </mwc-formfield>
                <mwc-select id="menuPosition" value="middle" fixedMenuPosition
                  >${Object.values(menuPosition).map(
                    menutype =>
                      html`<mwc-list-item value="${menutype}"
                        >${translate('plugins.' + menutype)}</mwc-list-item
                      >`
                  )}</mwc-select
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
              ?disabled=${plugin.name.startsWith('[WIP]')}
              left
            >
              <mwc-icon slot="meta"
                >${plugin.icon || pluginIcons[plugin.kind]}</mwc-icon
              >
              ${plugin.name.startsWith('[WIP]')
                ? html`[WIP] <strike>${plugin.name.substring(6)}</strike>`
                : plugin.name}
            </mwc-check-list-item>`
        )}
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
            id="pluginList"
            multi
            @selected=${(e: MultiSelectedEvent) =>
              this.setPlugins(e.detail.index)}
          >
            <mwc-list-item graphic="avatar" noninteractive
              ><strong>${translate(`plugins.editor`)}</strong
              ><mwc-icon slot="graphic" class="inverted"
                >${pluginIcons['editor']}</mwc-icon
              ></mwc-list-item
            >
            <li divider role="separator"></li>
            ${this.renderPluginKind(
              'editor',
              this.plugins.filter(p => p.kind === 'editor')
            )}
            <mwc-list-item graphic="avatar" noninteractive
              ><strong>${translate(`plugins.menu`)}</strong
              ><mwc-icon slot="graphic" class="inverted"
                ><strong>${pluginIcons['menu']}</strong></mwc-icon
              ></mwc-list-item
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
          <mwc-button
            slot="secondaryAction"
            icon="refresh"
            label="${translate('reset')}"
            @click=${async () => {
              resetPlugins();
              this.requestUpdate();
            }}
            style="--mdc-theme-primary: var(--mdc-theme-error)"
          >
          </mwc-button>
          <mwc-button
            slot="secondaryAction"
            icon=""
            label="${translate('close')}"
            dialogAction="close"
          ></mwc-button>
          <mwc-button
            outlined
            trailingIcon
            slot="primaryAction"
            icon="library_add"
            label="${translate('plugins.add.heading')}&hellip;"
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
