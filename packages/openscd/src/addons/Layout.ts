import {
  customElement,
  html,
  LitElement,
  property,
  state,
  TemplateResult,
  query,
  css,
} from 'lit-element';
import { get } from 'lit-translate';
import { newPendingStateEvent } from '@openscd/core/foundation/deprecated/waiter.js';
import { newSettingsUIEvent } from '@openscd/core/foundation/deprecated/settings.js';
import {
  MenuItem,
  Validator,
  MenuPlugin,
  pluginIcons,
  newResetPluginsEvent,
  newAddExternalPluginEvent,
  newSetPluginsEvent,
} from '../open-scd.js';

import {
  MenuPosition,
  Plugin,
  menuPosition,
  PluginKind,
} from "../plugin.js"

import {
  HistoryState,
  HistoryUIKind,
  newEmptyIssuesEvent,
  newHistoryUIEvent,
  newRedoEvent,
  newUndoEvent,
} from './History.js';
import type { Drawer } from '@material/mwc-drawer';
import type { ActionDetail } from '@material/mwc-list';
import { List } from '@material/mwc-list';
import type { ListItem } from '@material/mwc-list/mwc-list-item';
import type { Dialog } from '@material/mwc-dialog';
import type { MultiSelectedEvent } from '@material/mwc-list/mwc-list-foundation.js';
import type { Select } from '@material/mwc-select';
import type { Switch } from '@material/mwc-switch';
import type { TextField } from '@material/mwc-textfield';

import '@material/mwc-drawer';
import '@material/mwc-list';
import '@material/mwc-dialog';
import '@material/mwc-switch';
import '@material/mwc-select';
import '@material/mwc-textfield';
import { nothing } from 'lit';

import {OscdPluginManager} from "./plugin-manager/plugin-manager.js";
import "./plugin-manager/plugin-manager.js";
import {OscdCustomPluginDialog} from "./plugin-manager/custom-plugin-dialog.js";
import "./plugin-manager/custom-plugin-dialog.js";
import "./menu-tabs/menu-tabs.js";
import { TabActivatedEvent } from "./menu-tabs/menu-tabs.js";


@customElement('oscd-layout')
export class OscdLayout extends LitElement {

  /** The `XMLDocument` to be edited */
  @property({ attribute: false }) doc: XMLDocument | null = null;
  /** The name of the current [[`doc`]] */
  @property({ type: String }) docName = '';
  /** Index of the last [[`EditorAction`]] applied. */
  @property({ type: Number }) editCount = -1;
  /** The currently active editor tab. */
  @property({ type: Number }) activeTab = 0;

  /** The plugins to render the layout. */
  @property({ type: Array }) plugins: Plugin[] = [];

  /** The open-scd host element */
  @property({ type: Object }) host!: HTMLElement;

  @property({ type: Object }) historyState!: HistoryState;

  @state() validated: Promise<void> = Promise.resolve();
  @state() shouldValidate = false;
  @state() activeEditor: Plugin | undefined = this.calcActiveEditors()[0];

  @query('#menu') menuUI!: Drawer;
  @query('#pluginManager') pluginUI!: OscdPluginManager;
  @query('#pluginList') pluginList!: List;
  @query('#pluginAdd') pluginDownloadUI!: OscdCustomPluginDialog;


  render(): TemplateResult {
    return html`
      <div
        @open-plugin-download=${() => this.pluginDownloadUI.show()}
        @oscd-activate-editor=${this.handleActivateEditorByEvent}
        @oscd-run-menu=${this.handleRunMenuByEvent}
      >
        <slot></slot>
        ${this.renderHeader()} ${this.renderAside()} ${this.renderContent()}
        ${this.renderLanding()} ${this.renderPlugging()}
      </div>
    `;
  }


  private renderPlugging(): TemplateResult {
    return html` ${this.renderPluginUI()} ${this.renderDownloadUI()} `;
  }

  /** Renders the "Add Custom Plug-in" UI*/
  protected renderDownloadUI(): TemplateResult {
    return html`
      <oscd-custom-plugin-dialog id="pluginAdd"></oscd-custom-plugin-dialog>
    `
  }

  /**
   * Renders the plug-in management UI (turning plug-ins on/off)
   */
  protected renderPluginUI(): TemplateResult {
    return html`
      <oscd-plugin-manager id="pluginManager" .plugins=${this.plugins}></oscd-plugin-manager>
    `
  }

  // Computed properties

  get validators(): Plugin[] {
    return this.plugins.filter(
      plugin => plugin.active && plugin.kind === 'validator'
    );
  }
  get menuEntries(): Plugin[] {
    return this.plugins.filter(
      plugin => plugin.active && plugin.kind === 'menu'
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


  get menu(): (MenuItem | 'divider')[] {

    const topMenu = this.generateMenu(this.topMenu, 'top');
    const middleMenu = this.generateMenu(this.middleMenu, 'middle');
    const bottomMenu = this.generateMenu(this.bottomMenu, 'bottom');
    const validators = this.generateValidatorMenus(this.validators);

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
        action: (): void => {
          this.dispatchEvent(newUndoEvent());
        },
        disabled: (): boolean => !this.historyState.canUndo,
        kind: 'static',
        content: () => html``,
      },
      {
        icon: 'redo',
        name: 'redo',
        actionItem: true,
        action: (): void => {
          this.dispatchEvent(newRedoEvent());
        },
        disabled: (): boolean => !this.historyState.canRedo,
        kind: 'static',
        content: () => html``,
      },
      ...validators,
      {
        icon: 'list',
        name: 'menu.viewLog',
        actionItem: true,
        action: (): void => {
          this.dispatchEvent(newHistoryUIEvent(true, HistoryUIKind.log));
        },
        kind: 'static',
        content: () => html``,
      },
      {
        icon: 'history',
        name: 'menu.viewHistory',
        actionItem: true,
        action: (): void => {
          this.dispatchEvent(newHistoryUIEvent(true, HistoryUIKind.history));
        },
        kind: 'static',
        content: () => html``,
      },
      {
        icon: 'rule',
        name: 'menu.viewDiag',
        actionItem: true,
        action: (): void => {
          this.dispatchEvent(newHistoryUIEvent(true, HistoryUIKind.diagnostic));
        },
        kind: 'static',
        content: () => html``,
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
        content: () => html``,
      },
      ...bottomMenu,
      {
        icon: 'extension',
        name: 'plugins.heading',
        action: (): void => this.pluginUI.show(),
        kind: 'static',
        content: () => html``,
      },
    ];
  }

  get editors(): Plugin[] {
    return this.plugins.filter(
      plugin => plugin.active && plugin.kind === 'editor'
    );
  }

  // Keyboard Shortcuts
  private handleKeyPress(e: KeyboardEvent): void {
    // currently we only handley key shortcuts when users press ctrl
    if(!e.ctrlKey){ return }

    const keyFunctionMap: {[key:string]: () => void} = {
      'm': () => this.menuUI.open = !this.menuUI.open,
      'o': () => this.menuUI.querySelector<ListItem>('mwc-list-item[iconid="folder_open"]')?.click(),
      'O': () => this.menuUI.querySelector<ListItem>('mwc-list-item[iconid="create_new_folder"]')?.click(),
      's': () => this.menuUI.querySelector<ListItem>('mwc-list-item[iconid="save"]')?.click(),
      'P': () => this.pluginUI.show(),
    }

    const fn = keyFunctionMap[e.key];
    if(!fn){ return; }

    e.preventDefault();
    fn();
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.host.addEventListener('close-drawer', async () => {
      this.menuUI.open = false;
    });
    this.host.addEventListener('validate', async () => {
      this.shouldValidate = true;
      await this.validated;

      if (!this.shouldValidate){ return; }

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
    this.handleKeyPress = this.handleKeyPress.bind(this);
    document.onkeydown = this.handleKeyPress;

    document.addEventListener("open-plugin-download", () => {
      this.pluginDownloadUI.show();
    });
  }


  private generateMenu(plugins:Plugin[], kind: 'top' | 'middle' | 'bottom'): (MenuItem | 'divider')[]{
    return plugins.map(plugin => {
      return {
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
        content: () => {
          if(plugin.content){ return plugin.content(); }
          return html``;
        },
        kind: kind,
      }
    })
  }

  private generateValidatorMenus(plugins: Plugin[]): (MenuItem | 'divider')[] {
    return plugins.map(plugin =>{
      return {
        icon: plugin.icon || pluginIcons['validator'],
        name: plugin.name,
        action: ae => {
          this.dispatchEvent(newEmptyIssuesEvent(plugin.src));

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
        content: plugin.content ?? (() => html``),
        kind: 'validator',
      }
    });
  }

  private renderMenuItem(me: MenuItem | 'divider'): TemplateResult {
    const isDivider = me === 'divider';
    const hasActionItem = me !== 'divider' && me.actionItem;

    if (isDivider) { return html`<li divider padded role="separator"></li>`; }
    if (hasActionItem){ return html``; }
    return html`
      <mwc-list-item
        class="${me.kind}"
        iconid="${me.icon}"
        graphic="icon"
        data-name="${me.name}"
        .disabled=${me.disabled?.() || !me.action}
        ><mwc-icon slot="graphic">${me.icon}</mwc-icon>
        <span>${get(me.name)}</span>
        ${me.hint
          ? html`<span slot="secondary"><tt>${me.hint}</tt></span>`
          : ''}
      </mwc-list-item>
      ${me.content ? me.content() : nothing}
    `;
  }

  private renderActionItem(me: MenuItem | 'divider'): TemplateResult {
    if(me === 'divider' || !me.actionItem){ return html`` }

    return html`
    <mwc-icon-button
      slot="actionItems"
      icon="${me.icon}"
      label="${me.name}"
      ?disabled=${me.disabled?.() || !me.action}
      @click=${me.action}
    ></mwc-icon-button>`;
  }

  private renderEditorTab({ name, icon }: Plugin): TemplateResult {
    return html`<mwc-tab label=${name} icon=${icon || 'edit'}> </mwc-tab>`;
  }

  /** Renders top bar which features icon buttons for undo, redo, log, scl history and diagnostics*/
  protected renderHeader(): TemplateResult {
    return html`<mwc-top-app-bar-fixed>
      <mwc-icon-button
        icon="menu"
        label="Menu"
        slot="navigationIcon"
        @click=${() => (this.menuUI.open = true)}
      ></mwc-icon-button>
      <div slot="title" id="title">${this.docName}</div>
      ${this.menu.map(this.renderActionItem)}
    </mwc-top-app-bar-fixed>`;
  }

  /**
   * Renders a drawer toolbar featuring the scl filename, enabled menu plugins,
   * settings, help, scl history and plug-ins management
   */
  protected renderAside(): TemplateResult {

    return html`
      <mwc-drawer class="mdc-theme--surface" hasheader type="modal" id="menu">
        <span slot="title">${get('menu.title')}</span>
          ${renderTitle(this.docName)}
        <mwc-list
          wrapFocus
          @action=${makeListAction(this.menu)}
        >
          ${this.menu.map(this.renderMenuItem)}
        </mwc-list>
      </mwc-drawer>
    `;

    function renderTitle(docName?: string){
      if(!docName) return html``;

      return html`<span slot="subtitle">${docName}</span>`;
    }

    function makeListAction(menuItems : (MenuItem|'divider')[]){
      return function listAction(ae: CustomEvent<ActionDetail>){
        //FIXME: dirty hack to be fixed in open-scd-core
        //       if clause not necessary when oscd... components in open-scd not list
        if (ae.target instanceof List)
          (<MenuItem>(
            menuItems.filter(
              item => item !== 'divider' && !item.actionItem
            )[ae.detail.index]
          ))?.action?.(ae);
      }
    }


  }

  private calcActiveEditors(){
    const hasActiveDoc = Boolean(this.doc);

    return this.editors
      .filter(editor => {
        // this is necessary because `requireDoc` can be undefined
        // and that is not the same as false
        const doesNotRequireDoc = editor.requireDoc === false
        return doesNotRequireDoc || hasActiveDoc
      })
  }

  /** Renders the enabled editor plugins and a tab bar to switch between them*/
  protected renderContent(): TemplateResult {

    const activeEditors = this.calcActiveEditors()
      .map(this.renderEditorTab)

    const hasActiveEditors = activeEditors.length > 0;
    if(!hasActiveEditors){ return html``; }

    return html`
      <oscd-menu-tabs
        .editors=${this.calcActiveEditors()}
        .activeEditor=${this.activeEditor}
        @oscd-editor-tab-activated=${this.handleEditorTabActivated}
      >
      </oscd-menu-tabs>
      ${renderEditorContent(this.doc, this.activeEditor, )}
    `;

    function renderEditorContent(doc: XMLDocument | null, activeEditor?: Plugin){
      const editor = activeEditor;
      const requireDoc = editor?.requireDoc
      if(requireDoc && !doc) { return html`` }

      const content = editor?.content;
      if(!content) { return html`` }

      return html`${content()}`;
    }
  }

  private handleEditorTabActivated(e: TabActivatedEvent){
    this.activeEditor = e.detail.editor
  }

  private handleActivatedEditorTabByUser(e: CustomEvent): void {
    const tabIndex = e.detail.index;
    this.activateTab(tabIndex);
  }

  private handleActivateEditorByEvent(e: CustomEvent<{name: string, src: string}>): void {
    const {name, src} = e.detail;
    const editors = this.calcActiveEditors()
    const wantedEditorIndex = editors.findIndex(editor => editor.name === name || editor.src === src)
    if(wantedEditorIndex < 0){ return; } // TODO: log error

    this.activateTab(wantedEditorIndex);
  }

  private activateTab(index: number){
    this.activeTab = index;
  }

  private handleRunMenuByEvent(e: CustomEvent<{name: string}>): void {

    // TODO: this is a workaround, fix it
    this.menuUI.open = true;
    const menuEntry = this.menuUI.querySelector(`[data-name="${e.detail.name}"]`) as HTMLElement
    const menuElement = menuEntry.nextElementSibling
    if(!menuElement){ return; } // TODO: log error

    (menuElement as unknown as MenuPlugin).run()
  }

  /**
   * Renders the landing buttons (open project and new project)
   * it no document loaded we display the menu item that are in the position
   * 'top' and are not disabled
   *
   * To enable replacement of this part we have to convert it to either an addon
   * or a plugin
   */
  protected renderLanding(): TemplateResult {
    if(this.doc){ return html``; }

    return html`
      <div class="landing">
        ${renderMenuItems(this.menu, this.menuUI)}
      </div>`

      function renderMenuItems(menuItemsAndDividers: (MenuItem | 'divider')[], menuUI: Drawer){

        const menuItems = menuItemsAndDividers.filter(mi => mi !== 'divider') as MenuItem[];

        return menuItems.map((mi: MenuItem, index) => {
            if(mi.kind !== 'top' || mi.disabled?.()) { return html``; }

            return html`
              <mwc-icon-button
                class="landing_icon"
                icon="${mi.icon}"
                @click="${() => clickListItem(index)}"
              >
                <div class="landing_label">${mi.name}</div>
              </mwc-icon-button>
            `
          })

          function clickListItem(index:number) {
            const listItem = menuUI.querySelector('mwc-list')!.items[index];
            listItem.click();
          }

      }
    }




  static styles = css`
    mwc-drawer {
      position: absolute;
      top: 0;
    }

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
}
