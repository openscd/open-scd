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
import { EditCompletedEvent } from '@openscd/core';

@customElement('oscd-layout')
export class OscdLayout extends LitElement {

  render(): TemplateResult {
    return html`
      <slot></slot>
      ${this.renderHeader()} ${this.renderAside()} ${this.renderContent()}
      ${this.renderLanding()} ${this.renderPlugging()}
    `;
  }


  /** The `XMLDocument` to be edited */
  @property({ attribute: false })
  doc: XMLDocument | null = null;
  /** The name of the current [[`doc`]] */
  @property({ type: String })
  docName = '';
  /** Index of the last [[`EditorAction`]] applied. */
  @property({ type: Number })
  editCount = -1;
  /** The currently active editor tab. */
  @property({ type: Number })
  activeTab = 0;

  /** The plugins to render the layout. */
  @property({ type: Array })
  plugins: Plugin[] = [];

  /** The open-scd host element */
  @property({ type: Object })
  host!: HTMLElement;

  @property({ type: Object })
  historyState!: HistoryState;

  @state()
  validated: Promise<void> = Promise.resolve();

  @state()
  shouldValidate = false;

  @query('#menu')
  menuUI!: Drawer;
  @query('#pluginManager')
  pluginUI!: Dialog;
  @query('#pluginList')
  pluginList!: List;
  @query('#pluginAdd')
  pluginDownloadUI!: Dialog;

  // Computed properties

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
      },
      {
        icon: 'history',
        name: 'menu.viewHistory',
        actionItem: true,
        action: (): void => {
          this.dispatchEvent(newHistoryUIEvent(true, HistoryUIKind.history));
        },
        kind: 'static',
      },
      {
        icon: 'rule',
        name: 'menu.viewDiag',
        actionItem: true,
        action: (): void => {
          this.dispatchEvent(newHistoryUIEvent(true, HistoryUIKind.diagnostic));
        },
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

  get editors(): Plugin[] {
    return this.plugins.filter(
      plugin => plugin.installed && plugin.kind === 'editor'
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

    this.dispatchEvent(
      newAddExternalPluginEvent({
        src: pluginSrcInput.value,
        name: pluginNameInput.value,
        kind: <PluginKind>(<ListItem>pluginKindList.selected).value,
        requireDoc: requireDoc.checked,
        position: <MenuPosition>positionList.value,
        installed: true,
      })
    );

    this.requestUpdate();
    this.pluginUI.requestUpdate();
    this.pluginDownloadUI.close();
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
        content: plugin.content,
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
        content: plugin.content,
        kind: 'validator',
      }
    });
  }

  private renderMenuItem(me: MenuItem | 'divider'): TemplateResult {
    if (me === 'divider') { return html`<li divider padded role="separator"></li>`; }
    if (me.actionItem){ return html``; }

    return html`
      <mwc-list-item
        class="${me.kind}"
        iconid="${me.icon}"
        graphic="icon"
        .disabled=${me.disabled?.() || !me.action}
        ><mwc-icon slot="graphic">${me.icon}</mwc-icon>
        <span>${get(me.name)}</span>
        ${me.hint
          ? html`<span slot="secondary"><tt>${me.hint}</tt></span>`
          : ''}
      </mwc-list-item>
      ${me.content ?? ''}
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
    return html`<mwc-tab label=${get(name)} icon=${icon || 'edit'}> </mwc-tab>`;
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

  /** Renders the enabled editor plugins and a tab bar to switch between them*/
  protected renderContent(): TemplateResult {
    const hasActiveDoc = Boolean(this.doc);

    const activeEditors = this.editors
    .filter(editor => {
      // this is necessary because `requireDoc` can be undefined
      // and that is not the same as false
      const doesNotRequireDoc = editor.requireDoc === false
      return doesNotRequireDoc || hasActiveDoc
    })
    .map(this.renderEditorTab)

    const hasActiveEditors = activeEditors.length > 0;
    if(!hasActiveEditors){ return html``; }

    return html`
      <mwc-tab-bar @MDCTabBar:activated=${(e: CustomEvent) => (this.activeTab = e.detail.index)}>
        ${activeEditors}
      </mwc-tab-bar>
      ${renderEditorContent(this.editors, this.activeTab, this.doc)}
    `;

    function renderEditorContent(editors: Plugin[], activeTab: number, doc: XMLDocument | null){
      const editor = editors[activeTab];
      const requireDoc = editor?.requireDoc
      if(requireDoc && !doc) { return html`` }

      const content = editor?.content;
      if(!content) { return html`` }

      return html`${content}`;
    }
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

  /** Renders the "Add Custom Plug-in" UI*/
  // TODO: this should be its own isolated element
  protected renderDownloadUI(): TemplateResult {
    return html`
      <mwc-dialog id="pluginAdd" heading="${get('plugins.add.heading')}">
        <div style="display: flex; flex-direction: column; row-gap: 8px;">
          <p style="color:var(--mdc-theme-error);">
            ${get('plugins.add.warning')}
          </p>
          <mwc-textfield
            label="${get('plugins.add.name')}"
            helper="${get('plugins.add.nameHelper')}"
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
              >${get('plugins.editor')}<mwc-icon slot="meta"
                >${pluginIcons['editor']}</mwc-icon
              ></mwc-radio-list-item
            >
            <mwc-radio-list-item value="menu" hasMeta left
              >${get('plugins.menu')}<mwc-icon slot="meta"
                >${pluginIcons['menu']}</mwc-icon
              ></mwc-radio-list-item
            >
            <div id="menudetails">
              <mwc-formfield
                id="enabledefault"
                label="${get('plugins.requireDoc')}"
              >
                <mwc-switch id="requireDoc" checked></mwc-switch>
              </mwc-formfield>
              <mwc-select id="menuPosition" value="middle" fixedMenuPosition
                >${Object.values(menuPosition).map(
                  menutype =>
                    html`<mwc-list-item value="${menutype}"
                      >${get('plugins.' + menutype)}</mwc-list-item
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
              #pluginKindList [value="menu"][selected] ~ #menudetails {
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
              >${get('plugins.validator')}<mwc-icon slot="meta"
                >${pluginIcons['validator']}</mwc-icon
              ></mwc-radio-list-item
            >
          </mwc-list>
          <mwc-textfield
            label="${get('plugins.add.src')}"
            helper="${get('plugins.add.srcHelper')}"
            placeholder="http://example.com/plugin.js"
            type="url"
            required
            id="pluginSrcInput"
          ></mwc-textfield>
        </div>
        <mwc-button
          slot="secondaryAction"
          dialogAction="close"
          label="${get('cancel')}"
        ></mwc-button>
        <mwc-button
          slot="primaryAction"
          icon="add"
          label="${get('add')}"
          trailingIcon
          @click=${() => this.handleAddPlugin()}
        ></mwc-button>
      </mwc-dialog>
    `;
  }

  // Note: why is the type here if note used?
  private renderPluginKind(
    type: PluginKind | MenuPosition,
    plugins: Plugin[]
  ): TemplateResult {
    return html`
      ${plugins.map( plugin => html`
        <mwc-check-list-item
            class="${plugin.official ? 'official' : 'external'}"
            value="${plugin.src}"
            ?selected=${plugin.installed}
            @request-selected=${(e: CustomEvent<{source: string}>) => {
              if(e.detail.source !== 'interaction'){
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                return false;
              }
            }}
            hasMeta
            left
          >
            <mwc-icon slot="meta">
              ${plugin.icon || pluginIcons[plugin.kind]}
            </mwc-icon>
            ${plugin.name}
          </mwc-check-list-item>
        `
      )}
    `;
  }

  /**
   * Renders the plug-in management UI (turning plug-ins on/off)
   * TODO: this is big enough to be its own isolated element
   */
  protected renderPluginUI(): TemplateResult {
    return html`
      <mwc-dialog
        stacked
        id="pluginManager"
        heading="${get('plugins.heading')}"
      >
        <mwc-list
          id="pluginList"
          multi
          @selected=${(e: MultiSelectedEvent) =>
            this.dispatchEvent(newSetPluginsEvent(e.detail.index))}
        >
          <mwc-list-item graphic="avatar" noninteractive
            ><strong>${get(`plugins.editor`)}</strong
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
            ><strong>${get(`plugins.menu`)}</strong
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
          label="${get('reset')}"
          @click=${async () => {
            this.dispatchEvent(newResetPluginsEvent());
            this.requestUpdate();
          }}
          style="--mdc-theme-primary: var(--mdc-theme-error)"
        >
        </mwc-button>
        <mwc-button
          slot="secondaryAction"
          icon=""
          label="${get('close')}"
          dialogAction="close"
        ></mwc-button>
        <mwc-button
          outlined
          trailingIcon
          slot="primaryAction"
          icon="library_add"
          label="${get('plugins.add.heading')}&hellip;"
          @click=${() => this.pluginDownloadUI.show()}
        >
        </mwc-button>
      </mwc-dialog>
    `;
  }

  private renderPlugging(): TemplateResult {
    return html` ${this.renderPluginUI()} ${this.renderDownloadUI()} `;
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
