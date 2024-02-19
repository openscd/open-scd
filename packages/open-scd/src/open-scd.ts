import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
  query,
} from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

import { ListItem } from '@material/mwc-list/mwc-list-item';

import '@material/mwc-icon';
import '@material/mwc-icon-button';
import '@material/mwc-linear-progress';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-tab';
import '@material/mwc-tab-bar';
import '@material/mwc-top-app-bar-fixed';
import '@material/mwc-drawer';
import '@material/mwc-button';
import '@material/mwc-dialog';
import '@material/mwc-formfield';
import '@material/mwc-list/mwc-check-list-item';
import '@material/mwc-list/mwc-radio-list-item';
import '@material/mwc-select';
import '@material/mwc-switch';
import '@material/mwc-textfield';

import {
  newOpenDocEvent,
  newPendingStateEvent,
  newSettingsUIEvent,
} from './foundation.js';

import { Editing } from './Editing.js';
import { Historing } from './Historing.js';

import './addons/Settings.js';
import './addons/Waiter.js';
import './addons/Wizards.js';

import { ActionDetail, List } from '@material/mwc-list';
import { Drawer } from '@material/mwc-drawer';
import { translate } from 'lit-translate';

import { officialPlugins } from '../public/js/plugins.js';
import { Nsdoc } from './foundation/nsdoc.js';
import { MultiSelectedEvent } from '@material/mwc-list/mwc-list-foundation.js';
import { Select } from '@material/mwc-select';
import { Switch } from '@material/mwc-switch';
import { TextField } from '@material/mwc-textfield';
import { Dialog } from '@material/mwc-dialog';

// HOSTING INTERFACES

interface MenuItem {
  icon: string;
  name: string;
  hint?: string;
  actionItem?: boolean;
  action?: (event: CustomEvent<ActionDetail>) => void;
  disabled?: () => boolean;
  content?: TemplateResult;
  kind: string;
}

interface Validator {
  validate: () => Promise<void>;
}

interface MenuPlugin {
  run: () => Promise<void>;
}

// PLUGGING INTERFACES
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
type MenuPosition = (typeof menuPosition)[number];

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

/** The `<open-scd>` custom element is the main entry point of the
 * Open Substation Configuration Designer. */
@customElement('open-scd')
export class OpenSCD extends Editing(Historing(LitElement)) {
  private currentSrc = '';
  /** The current file's URL. `blob:` URLs are *revoked after parsing*! */
  @property({ type: String })
  get src(): string {
    return this.currentSrc;
  }
  set src(value: string) {
    this.currentSrc = value;
    this.dispatchEvent(newPendingStateEvent(this.loadDoc(value)));
  }

  /** Loads and parses an `XMLDocument` after [[`src`]] has changed. */
  private async loadDoc(src: string): Promise<void> {
    const response = await fetch(src);
    const text = await response.text();
    if (!text) return;

    const doc = new DOMParser().parseFromString(text, 'application/xml');
    const docName = src;
    this.dispatchEvent(newOpenDocEvent(doc, docName));

    if (src.startsWith('blob:')) URL.revokeObjectURL(src);
  }

  private handleKeyPress(e: KeyboardEvent): void {
    let handled = false;
    const ctrlAnd = (key: string) =>
      e.key === key && e.ctrlKey && (handled = true);

    if (ctrlAnd('y')) this.redo();
    if (ctrlAnd('z')) this.undo();
    if (ctrlAnd('l')) this.logUI.open ? this.logUI.close() : this.logUI.show();
    if (ctrlAnd('d'))
      this.diagnosticUI.open
        ? this.diagnosticUI.close()
        : this.diagnosticUI.show();
    if (ctrlAnd('m')) this.menuUI.open = !this.menuUI.open;
    if (ctrlAnd('o'))
      this.menuUI
        .querySelector<ListItem>('mwc-list-item[iconid="folder_open"]')
        ?.click();
    if (ctrlAnd('O'))
      this.menuUI
        .querySelector<ListItem>('mwc-list-item[iconid="create_new_folder"]')
        ?.click();
    if (ctrlAnd('s'))
      this.menuUI
        .querySelector<ListItem>('mwc-list-item[iconid="save"]')
        ?.click();
    if (ctrlAnd('P')) this.pluginUI.show();

    if (handled) e.preventDefault();
  }

  constructor() {
    super();

    this.handleKeyPress = this.handleKeyPress.bind(this);
    document.onkeydown = this.handleKeyPress;

    this.updatePlugins();
    this.requestUpdate();
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('validate', async () => {
      this.shouldValidate = true;
      await this.validated;

      if (!this.shouldValidate) return;

      this.diagnoses.clear();
      this.shouldValidate = false;

      this.validated = Promise.allSettled(
        this.menuUI
          .querySelector('mwc-list')!
          .items.filter(item => item.className === 'validator')
          .map(item =>
            (<Validator>(<unknown>item.nextElementSibling)).validate()
          )
      ).then();
      this.dispatchEvent(newPendingStateEvent(this.validated));
    });
    this.addEventListener('close-drawer', async () => {
      this.menuUI.open = false;
    });
  }

  protected renderMain(): TemplateResult {
    return html`${this.renderHosting()}${this.renderPlugging()}${super.render()}`;
  }

  render(): TemplateResult {
    return html`<oscd-waiter>
      <oscd-settings .host=${this}>
        <oscd-wizards .host=${this}> ${this.renderMain()}</oscd-wizards>
      </oscd-settings>
    </oscd-waiter>`;
  }

  static styles = css`
    mwc-top-app-bar-fixed {
      --mdc-theme-text-disabled-on-light: rgba(255, 255, 255, 0.38);
    } /* hack to fix disabled icon buttons rendering black */

    mwc-tab {
      background-color: var(--primary);
      --mdc-theme-primary: var(--mdc-theme-on-primary);
    }

    input[type='file'] {
      display: none;
    }

    mwc-dialog {
      --mdc-dialog-max-width: 98vw;
    }

    mwc-dialog > form {
      display: flex;
      flex-direction: column;
    }

    mwc-dialog > form > * {
      display: block;
      margin-top: 16px;
    }

    mwc-linear-progress {
      position: fixed;
      --mdc-linear-progress-buffer-color: var(--primary);
      --mdc-theme-primary: var(--secondary);
      left: 0px;
      top: 0px;
      width: 100%;
      pointer-events: none;
      z-index: 1000;
    }

    tt {
      font-family: 'Roboto Mono', monospace;
      font-weight: 300;
    }

    .landing {
      position: absolute;
      text-align: center;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
    }

    .landing_icon:hover {
      box-shadow: 0 12px 17px 2px rgba(0, 0, 0, 0.14),
        0 5px 22px 4px rgba(0, 0, 0, 0.12), 0 7px 8px -4px rgba(0, 0, 0, 0.2);
    }

    .landing_icon {
      margin: 12px;
      border-radius: 16px;
      width: 160px;
      height: 140px;
      text-align: center;
      color: var(--mdc-theme-on-secondary);
      background: var(--secondary);
      --mdc-icon-button-size: 100px;
      --mdc-icon-size: 100px;
      --mdc-ripple-color: rgba(0, 0, 0, 0);
      box-shadow: rgb(0 0 0 / 14%) 0px 6px 10px 0px,
        rgb(0 0 0 / 12%) 0px 1px 18px 0px, rgb(0 0 0 / 20%) 0px 3px 5px -1px;
      transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .landing_label {
      width: 160px;
      height: 50px;
      margin-top: 100px;
      margin-left: -30px;
      font-family: 'Roboto', sans-serif;
    }

    .plugin.menu {
      display: flex;
    }

    .plugin.validator {
      display: flex;
    }
  `;

  // HOSTING
  /** The currently active editor tab. */
  @property({ type: Number })
  activeTab = 0;
  @property({ attribute: false })
  validated: Promise<void> = Promise.resolve();

  private shouldValidate = false;

  @query('#menu') menuUI!: Drawer;

  get menu(): (MenuItem | 'divider')[] {
    const topMenu: (MenuItem | 'divider')[] = [];
    const middleMenu: (MenuItem | 'divider')[] = [];
    const bottomMenu: (MenuItem | 'divider')[] = [];
    const validators: (MenuItem | 'divider')[] = [];

    this.topMenu.forEach(plugin =>
      topMenu.push({
        icon: plugin.icon || pluginIcons['menu'],
        name: plugin.name,
        action: ae => {
          this.dispatchEvent(
            newPendingStateEvent(
              (<MenuPlugin>(
                (<unknown>(
                  (<List>ae.target).items[ae.detail.index].nextElementSibling
                ))
              )).run()
            )
          );
        },
        disabled: (): boolean => plugin.requireDoc! && this.doc === null,
        content: plugin.content,
        kind: 'top',
      })
    );

    this.middleMenu.forEach(plugin =>
      middleMenu.push({
        icon: plugin.icon || pluginIcons['menu'],
        name: plugin.name,
        action: ae => {
          this.dispatchEvent(
            newPendingStateEvent(
              (<MenuPlugin>(
                (<unknown>(
                  (<List>ae.target).items[ae.detail.index].nextElementSibling
                ))
              )).run()
            )
          );
        },
        disabled: (): boolean => plugin.requireDoc! && this.doc === null,
        content: plugin.content,
        kind: 'middle',
      })
    );

    this.bottomMenu.forEach(plugin =>
      bottomMenu.push({
        icon: plugin.icon || pluginIcons['menu'],
        name: plugin.name,
        action: ae => {
          this.dispatchEvent(
            newPendingStateEvent(
              (<MenuPlugin>(
                (<unknown>(
                  (<List>ae.target).items[ae.detail.index].nextElementSibling
                ))
              )).run()
            )
          );
        },
        disabled: (): boolean => plugin.requireDoc! && this.doc === null,
        content: plugin.content,
        kind: 'middle',
      })
    );

    this.validators.forEach(plugin =>
      validators.push({
        icon: plugin.icon || pluginIcons['validator'],
        name: plugin.name,
        action: ae => {
          if (this.diagnoses.get(plugin.src))
            this.diagnoses.get(plugin.src)!.length = 0;

          this.dispatchEvent(
            newPendingStateEvent(
              (<Validator>(
                (<unknown>(
                  (<List>ae.target).items[ae.detail.index].nextElementSibling
                ))
              )).validate()
            )
          );
        },
        disabled: (): boolean => this.doc === null,
        content: plugin.content,
        kind: 'validator',
      })
    );

    if (middleMenu.length > 0) middleMenu.push('divider');
    if (bottomMenu.length > 0) bottomMenu.push('divider');

    return [
      'divider',
      ...topMenu,
      'divider',
      {
        icon: 'undo',
        name: 'undo',
        actionItem: true,
        action: this.undo,
        disabled: (): boolean => !this.canUndo,
        kind: 'static',
      },
      {
        icon: 'redo',
        name: 'redo',
        actionItem: true,
        action: this.redo,
        disabled: (): boolean => !this.canRedo,
        kind: 'static',
      },
      ...validators,
      {
        icon: 'list',
        name: 'menu.viewLog',
        actionItem: true,
        action: (): void => this.logUI.show(),
        kind: 'static',
      },
      {
        icon: 'history',
        name: 'menu.viewHistory',
        actionItem: true,
        action: (): void => this.historyUI.show(),
        kind: 'static',
      },
      {
        icon: 'rule',
        name: 'menu.viewDiag',
        actionItem: true,
        action: (): void => this.diagnosticUI.show(),
        kind: 'static',
      },
      'divider',
      ...middleMenu,
      {
        icon: 'settings',
        name: 'settings.title',
        action: (): void => {
          this.dispatchEvent(newSettingsUIEvent(true));
        },
        kind: 'static',
      },
      ...bottomMenu,
      {
        icon: 'extension',
        name: 'plugins.heading',
        action: (): void => this.pluginUI.show(),
        kind: 'static',
      },
    ];
  }

  renderMenuItem(me: MenuItem | 'divider'): TemplateResult {
    if (me === 'divider')
      return html`<li divider padded role="separator"></li>`;
    if (me.actionItem) return html``;
    return html`
      <mwc-list-item
        class="${me.kind}"
        iconid="${me.icon}"
        graphic="icon"
        .disabled=${me.disabled?.() || !me.action}
        ><mwc-icon slot="graphic">${me.icon}</mwc-icon>
        <span>${translate(me.name)}</span>
        ${me.hint
          ? html`<span slot="secondary"><tt>${me.hint}</tt></span>`
          : ''}
      </mwc-list-item>
      ${me.content ?? ''}
    `;
  }

  renderActionItem(me: MenuItem | 'divider'): TemplateResult {
    if (me !== 'divider' && me.actionItem)
      return html`<mwc-icon-button
        slot="actionItems"
        icon="${me.icon}"
        label="${me.name}"
        ?disabled=${me.disabled?.() || !me.action}
        @click=${me.action}
      ></mwc-icon-button>`;
    else return html``;
  }

  renderEditorTab({ name, icon }: Plugin): TemplateResult {
    return html`<mwc-tab label=${translate(name)} icon=${icon || 'edit'}>
    </mwc-tab>`;
  }

  renderHosting(): TemplateResult {
    return html` <mwc-drawer
        class="mdc-theme--surface"
        hasheader
        type="modal"
        id="menu"
      >
        <span slot="title">${translate('menu.title')}</span>
        ${this.docName
          ? html`<span slot="subtitle">${this.docName}</span>`
          : ''}
        <mwc-list
          wrapFocus
          @action=${(ae: CustomEvent<ActionDetail>) => {
            //FIXME: dirty hack to be fixed in open-scd-core
            //       if clause not necessary when oscd... components in open-scd not list
            if (ae.target instanceof List)
              (<MenuItem>(
                this.menu.filter(
                  item => item !== 'divider' && !item.actionItem
                )[ae.detail.index]
              ))?.action?.(ae);
          }}
        >
          ${this.menu.map(this.renderMenuItem)}
        </mwc-list>

        <mwc-top-app-bar-fixed slot="appContent">
          <mwc-icon-button
            icon="menu"
            label="Menu"
            slot="navigationIcon"
            @click=${() => (this.menuUI.open = true)}
          ></mwc-icon-button>
          <div slot="title" id="title">${this.docName}</div>
          ${this.menu.map(this.renderActionItem)}
          ${this.doc
            ? html`<mwc-tab-bar
                @MDCTabBar:activated=${(e: CustomEvent) =>
                  (this.activeTab = e.detail.index)}
              >
                ${this.editors.map(this.renderEditorTab)}
              </mwc-tab-bar>`
            : ``}
        </mwc-top-app-bar-fixed>
      </mwc-drawer>

      ${this.doc && this.editors[this.activeTab]?.content
        ? this.editors[this.activeTab].content
        : html`<div class="landing">
            ${(<MenuItem[]>this.menu.filter(mi => mi !== 'divider')).map(
              (mi: MenuItem, index) =>
                mi.kind === 'top' && !mi.disabled?.()
                  ? html`
                      <mwc-icon-button
                        class="landing_icon"
                        icon="${mi.icon}"
                        @click="${() =>
                          (<ListItem>(
                            this.menuUI.querySelector('mwc-list')!.items[index]
                          )).click()}"
                      >
                        <div class="landing_label">${mi.name}</div>
                      </mwc-icon-button>
                    `
                  : html``
            )}
          </div>`}`;
  }

  // PLUGGING
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

  protected get locale(): string {
    return navigator.language || 'en-US';
  }

  get docs(): Record<string, XMLDocument> {
    const docs: Record<string, XMLDocument> = {};

    if (this.doc) {
      docs[this.docName] = this.doc;
    }

    return docs;
  }

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
    const newOfficial: Array<Plugin | InstalledOfficialPlugin> = officialPlugins
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
            .docs=${this.docs}
            .locale=${this.locale}
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

  renderDownloadUI(): TemplateResult {
    return html`
      <mwc-dialog id="pluginAdd" heading="${translate('plugins.add.heading')}">
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
            this.plugins.filter(p => p.kind === 'menu' && p.position === 'top')
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

  renderPlugging(): TemplateResult {
    return html` ${this.renderPluginUI()} ${this.renderDownloadUI()} `;
  }
}
