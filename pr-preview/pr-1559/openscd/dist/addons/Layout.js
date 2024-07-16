import { __decorate } from "../../../_snowpack/pkg/tslib.js";
import { customElement, html, LitElement, property, state, query, css, } from '../../../_snowpack/pkg/lit-element.js';
import { get } from '../../../_snowpack/pkg/lit-translate.js';
import { newPendingStateEvent } from '../../../_snowpack/link/packages/core/dist/foundation/deprecated/waiter.js';
import { newSettingsUIEvent } from '../../../_snowpack/link/packages/core/dist/foundation/deprecated/settings.js';
import { menuPosition, pluginIcons, newResetPluginsEvent, newAddExternalPluginEvent, newSetPluginsEvent, } from '../open-scd.js';
import { HistoryUIKind, newEmptyIssuesEvent, newHistoryUIEvent, newRedoEvent, newUndoEvent, } from './History.js';
import { List } from '../../../_snowpack/pkg/@material/mwc-list.js';
import '../../../_snowpack/pkg/@material/mwc-drawer.js';
import '../../../_snowpack/pkg/@material/mwc-list.js';
import '../../../_snowpack/pkg/@material/mwc-dialog.js';
import '../../../_snowpack/pkg/@material/mwc-switch.js';
import '../../../_snowpack/pkg/@material/mwc-select.js';
import '../../../_snowpack/pkg/@material/mwc-textfield.js';
let OscdLayout = class OscdLayout extends LitElement {
    constructor() {
        super(...arguments);
        /** The `XMLDocument` to be edited */
        this.doc = null;
        /** The name of the current [[`doc`]] */
        this.docName = '';
        /** Index of the last [[`EditorAction`]] applied. */
        this.editCount = -1;
        /** The currently active editor tab. */
        this.activeTab = 0;
        /** The plugins to render the layout. */
        this.plugins = [];
        this.validated = Promise.resolve();
        this.shouldValidate = false;
        this.redoCount = 0;
    }
    get canUndo() {
        return this.editCount >= 0;
    }
    get canRedo() {
        return this.redoCount > 0;
    }
    // Computed properties
    get validators() {
        return this.plugins.filter(plugin => plugin.installed && plugin.kind === 'validator');
    }
    get menuEntries() {
        return this.plugins.filter(plugin => plugin.installed && plugin.kind === 'menu');
    }
    get topMenu() {
        return this.menuEntries.filter(plugin => plugin.position === 'top');
    }
    get middleMenu() {
        return this.menuEntries.filter(plugin => plugin.position === 'middle');
    }
    get bottomMenu() {
        return this.menuEntries.filter(plugin => plugin.position === 'bottom');
    }
    get menu() {
        const topMenu = [];
        const middleMenu = [];
        const bottomMenu = [];
        const validators = [];
        this.topMenu.forEach(plugin => topMenu.push({
            icon: plugin.icon || pluginIcons['menu'],
            name: plugin.name,
            action: ae => {
                this.dispatchEvent(newPendingStateEvent((ae.target.items[ae.detail.index].nextElementSibling).run()));
            },
            disabled: () => plugin.requireDoc && this.doc === null,
            content: plugin.content,
            kind: 'top',
        }));
        this.middleMenu.forEach(plugin => middleMenu.push({
            icon: plugin.icon || pluginIcons['menu'],
            name: plugin.name,
            action: ae => {
                this.dispatchEvent(newPendingStateEvent((ae.target.items[ae.detail.index].nextElementSibling).run()));
            },
            disabled: () => plugin.requireDoc && this.doc === null,
            content: plugin.content,
            kind: 'middle',
        }));
        this.bottomMenu.forEach(plugin => bottomMenu.push({
            icon: plugin.icon || pluginIcons['menu'],
            name: plugin.name,
            action: ae => {
                this.dispatchEvent(newPendingStateEvent((ae.target.items[ae.detail.index].nextElementSibling).run()));
            },
            disabled: () => plugin.requireDoc && this.doc === null,
            content: plugin.content,
            kind: 'middle',
        }));
        this.validators.forEach(plugin => validators.push({
            icon: plugin.icon || pluginIcons['validator'],
            name: plugin.name,
            action: ae => {
                this.dispatchEvent(newEmptyIssuesEvent(plugin.src));
                this.dispatchEvent(newPendingStateEvent((ae.target.items[ae.detail.index].nextElementSibling).validate()));
            },
            disabled: () => this.doc === null,
            content: plugin.content,
            kind: 'validator',
        }));
        if (middleMenu.length > 0)
            middleMenu.push('divider');
        if (bottomMenu.length > 0)
            bottomMenu.push('divider');
        return [
            'divider',
            ...topMenu,
            'divider',
            {
                icon: 'undo',
                name: 'undo',
                actionItem: true,
                action: () => {
                    this.dispatchEvent(newUndoEvent());
                },
                disabled: () => !this.canUndo,
                kind: 'static',
            },
            {
                icon: 'redo',
                name: 'redo',
                actionItem: true,
                action: () => {
                    this.dispatchEvent(newRedoEvent());
                },
                disabled: () => !this.canRedo,
                kind: 'static',
            },
            ...validators,
            {
                icon: 'list',
                name: 'menu.viewLog',
                actionItem: true,
                action: () => {
                    this.dispatchEvent(newHistoryUIEvent(true, HistoryUIKind.log));
                },
                kind: 'static',
            },
            {
                icon: 'history',
                name: 'menu.viewHistory',
                actionItem: true,
                action: () => {
                    this.dispatchEvent(newHistoryUIEvent(true, HistoryUIKind.history));
                },
                kind: 'static',
            },
            {
                icon: 'rule',
                name: 'menu.viewDiag',
                actionItem: true,
                action: () => {
                    this.dispatchEvent(newHistoryUIEvent(true, HistoryUIKind.diagnostic));
                },
                kind: 'static',
            },
            'divider',
            ...middleMenu,
            {
                icon: 'settings',
                name: 'settings.title',
                action: () => {
                    this.dispatchEvent(newSettingsUIEvent(true));
                },
                kind: 'static',
            },
            ...bottomMenu,
            {
                icon: 'extension',
                name: 'plugins.heading',
                action: () => this.pluginUI.show(),
                kind: 'static',
            },
        ];
    }
    get editors() {
        return this.plugins.filter(plugin => plugin.installed && plugin.kind === 'editor');
    }
    // Keyboard Shortcuts
    handleKeyPress(e) {
        let handled = false;
        const ctrlAnd = (key) => e.key === key && e.ctrlKey && (handled = true);
        if (ctrlAnd('m'))
            this.menuUI.open = !this.menuUI.open;
        if (ctrlAnd('o'))
            this.menuUI
                .querySelector('mwc-list-item[iconid="folder_open"]')
                ?.click();
        if (ctrlAnd('O'))
            this.menuUI
                .querySelector('mwc-list-item[iconid="create_new_folder"]')
                ?.click();
        if (ctrlAnd('s'))
            this.menuUI
                .querySelector('mwc-list-item[iconid="save"]')
                ?.click();
        if (ctrlAnd('P'))
            this.pluginUI.show();
        if (handled)
            e.preventDefault();
    }
    handleAddPlugin() {
        const pluginSrcInput = (this.pluginDownloadUI.querySelector('#pluginSrcInput'));
        const pluginNameInput = (this.pluginDownloadUI.querySelector('#pluginNameInput'));
        const pluginKindList = (this.pluginDownloadUI.querySelector('#pluginKindList'));
        const requireDoc = (this.pluginDownloadUI.querySelector('#requireDoc'));
        const positionList = (this.pluginDownloadUI.querySelector('#menuPosition'));
        if (!(pluginSrcInput.checkValidity() &&
            pluginNameInput.checkValidity() &&
            pluginKindList.selected &&
            requireDoc &&
            positionList.selected))
            return;
        this.dispatchEvent(newAddExternalPluginEvent({
            src: pluginSrcInput.value,
            name: pluginNameInput.value,
            kind: pluginKindList.selected.value,
            requireDoc: requireDoc.checked,
            position: positionList.value,
            installed: true,
        }));
        this.requestUpdate();
        this.pluginUI.requestUpdate();
        this.pluginDownloadUI.close();
    }
    connectedCallback() {
        super.connectedCallback();
        this.host.addEventListener('close-drawer', async () => {
            this.menuUI.open = false;
        });
        this.host.addEventListener('validate', async () => {
            this.shouldValidate = true;
            await this.validated;
            if (!this.shouldValidate)
                return;
            this.shouldValidate = false;
            this.validated = Promise.allSettled(this.menuUI
                .querySelector('mwc-list')
                .items.filter(item => item.className === 'validator')
                .map(item => item.nextElementSibling.validate())).then();
            this.dispatchEvent(newPendingStateEvent(this.validated));
        });
        this.handleKeyPress = this.handleKeyPress.bind(this);
        document.onkeydown = this.handleKeyPress;
        this.host.addEventListener('oscd-edit-completed', (evt) => {
            const initiator = evt.detail.initiator;
            if (initiator === 'undo') {
                this.redoCount += 1;
            }
            else if (initiator === 'redo') {
                this.redoCount -= 1;
            }
            this.requestUpdate();
        });
    }
    renderMenuItem(me) {
        if (me === 'divider')
            return html `<li divider padded role="separator"></li>`;
        if (me.actionItem)
            return html ``;
        return html `
      <mwc-list-item
        class="${me.kind}"
        iconid="${me.icon}"
        graphic="icon"
        .disabled=${me.disabled?.() || !me.action}
        ><mwc-icon slot="graphic">${me.icon}</mwc-icon>
        <span>${get(me.name)}</span>
        ${me.hint
            ? html `<span slot="secondary"><tt>${me.hint}</tt></span>`
            : ''}
      </mwc-list-item>
      ${me.content ?? ''}
    `;
    }
    renderActionItem(me) {
        if (me !== 'divider' && me.actionItem)
            return html `<mwc-icon-button
        slot="actionItems"
        icon="${me.icon}"
        label="${me.name}"
        ?disabled=${me.disabled?.() || !me.action}
        @click=${me.action}
      ></mwc-icon-button>`;
        else
            return html ``;
    }
    renderEditorTab({ name, icon }) {
        return html `<mwc-tab label=${get(name)} icon=${icon || 'edit'}> </mwc-tab>`;
    }
    /** Renders top bar which features icon buttons for undo, redo, log, scl history and diagnostics*/
    renderHeader() {
        return html `<mwc-top-app-bar-fixed>
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
    /** Renders a drawer toolbar featuring the scl filename, enabled menu plugins, settings, help, scl history and plug-ins management */
    renderAside() {
        return html `
      <mwc-drawer class="mdc-theme--surface" hasheader type="modal" id="menu">
        <span slot="title">${get('menu.title')}</span>
        ${this.docName
            ? html `<span slot="subtitle">${this.docName}</span>`
            : ''}
        <mwc-list
          wrapFocus
          @action=${(ae) => {
            //FIXME: dirty hack to be fixed in open-scd-core
            //       if clause not necessary when oscd... components in open-scd not list
            if (ae.target instanceof List)
                (this.menu.filter(item => item !== 'divider' && !item.actionItem)[ae.detail.index])?.action?.(ae);
        }}
        >
          ${this.menu.map(this.renderMenuItem)}
        </mwc-list>
      </mwc-drawer>
    `;
    }
    /** Renders the enabled editor plugins and a tab bar to switch between them*/
    renderContent() {
        return html `
      ${this.doc
            ? html `<mwc-tab-bar
              @MDCTabBar:activated=${(e) => (this.activeTab = e.detail.index)}
            >
              ${this.editors.map(this.renderEditorTab)}
            </mwc-tab-bar>
            ${this.editors[this.activeTab]?.content
                ? this.editors[this.activeTab].content
                : ``}`
            : ``}
    `;
    }
    /** Renders the landing buttons (open project and new project)*/
    renderLanding() {
        return html ` ${!this.doc
            ? html `<div class="landing">
          ${this.menu.filter(mi => mi !== 'divider').map((mi, index) => mi.kind === 'top' && !mi.disabled?.()
                ? html `
                    <mwc-icon-button
                      class="landing_icon"
                      icon="${mi.icon}"
                      @click="${() => (this.menuUI.querySelector('mwc-list').items[index]).click()}"
                    >
                      <div class="landing_label">${mi.name}</div>
                    </mwc-icon-button>
                  `
                : html ``)}
        </div>`
            : ``}`;
    }
    /** Renders the "Add Custom Plug-in" UI*/
    renderDownloadUI() {
        return html `
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
                >${Object.values(menuPosition).map(menutype => html `<mwc-list-item value="${menutype}"
                      >${get('plugins.' + menutype)}</mwc-list-item
                    >`)}</mwc-select
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
    renderPluginKind(type, plugins) {
        return html `
      ${plugins.map(plugin => html `<mwc-check-list-item
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
          </mwc-check-list-item>`)}
    `;
    }
    /** Renders the plug-in management UI (turning plug-ins on/off)*/
    renderPluginUI() {
        return html `
      <mwc-dialog
        stacked
        id="pluginManager"
        heading="${get('plugins.heading')}"
      >
        <mwc-list
          id="pluginList"
          multi
          @selected=${(e) => this.dispatchEvent(newSetPluginsEvent(e.detail.index))}
        >
          <mwc-list-item graphic="avatar" noninteractive
            ><strong>${get(`plugins.editor`)}</strong
            ><mwc-icon slot="graphic" class="inverted"
              >${pluginIcons['editor']}</mwc-icon
            ></mwc-list-item
          >
          <li divider role="separator"></li>
          ${this.renderPluginKind('editor', this.plugins.filter(p => p.kind === 'editor'))}
          <mwc-list-item graphic="avatar" noninteractive
            ><strong>${get(`plugins.menu`)}</strong
            ><mwc-icon slot="graphic" class="inverted"
              ><strong>${pluginIcons['menu']}</strong></mwc-icon
            ></mwc-list-item
          >
          <li divider role="separator"></li>
          ${this.renderPluginKind('top', this.plugins.filter(p => p.kind === 'menu' && p.position === 'top'))}
          <li divider role="separator" inset></li>
          ${this.renderPluginKind('validator', this.plugins.filter(p => p.kind === 'validator'))}
          <li divider role="separator" inset></li>
          ${this.renderPluginKind('middle', this.plugins.filter(p => p.kind === 'menu' && p.position === 'middle'))}
          <li divider role="separator" inset></li>
          ${this.renderPluginKind('bottom', this.plugins.filter(p => p.kind === 'menu' && p.position === 'bottom'))}
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
    renderPlugging() {
        return html ` ${this.renderPluginUI()} ${this.renderDownloadUI()} `;
    }
    render() {
        return html `
      <slot></slot>
      ${this.renderHeader()} ${this.renderAside()} ${this.renderContent()}
      ${this.renderLanding()} ${this.renderPlugging()}
    `;
    }
};
OscdLayout.styles = css `
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
__decorate([
    property({ attribute: false })
], OscdLayout.prototype, "doc", void 0);
__decorate([
    property({ type: String })
], OscdLayout.prototype, "docName", void 0);
__decorate([
    property({ type: Number })
], OscdLayout.prototype, "editCount", void 0);
__decorate([
    property({ type: Number })
], OscdLayout.prototype, "activeTab", void 0);
__decorate([
    property({ type: Array })
], OscdLayout.prototype, "plugins", void 0);
__decorate([
    property({ type: Object })
], OscdLayout.prototype, "host", void 0);
__decorate([
    state()
], OscdLayout.prototype, "validated", void 0);
__decorate([
    state()
], OscdLayout.prototype, "shouldValidate", void 0);
__decorate([
    state()
], OscdLayout.prototype, "redoCount", void 0);
__decorate([
    query('#menu')
], OscdLayout.prototype, "menuUI", void 0);
__decorate([
    query('#pluginManager')
], OscdLayout.prototype, "pluginUI", void 0);
__decorate([
    query('#pluginList')
], OscdLayout.prototype, "pluginList", void 0);
__decorate([
    query('#pluginAdd')
], OscdLayout.prototype, "pluginDownloadUI", void 0);
OscdLayout = __decorate([
    customElement('oscd-layout')
], OscdLayout);
export { OscdLayout };
//# sourceMappingURL=Layout.js.map