var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorate = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
import {
  customElement,
  html,
  LitElement,
  property,
  state,
  query,
  css
} from "../../../_snowpack/pkg/lit-element.js";
import {get} from "../../../_snowpack/pkg/lit-translate.js";
import {newPendingStateEvent} from "../../../_snowpack/link/packages/core/dist/foundation/deprecated/waiter.js";
import {newSettingsUIEvent} from "../../../_snowpack/link/packages/core/dist/foundation/deprecated/settings.js";
import {
  pluginIcons
} from "../open-scd.js";
import {
  HistoryUIKind,
  newEmptyIssuesEvent,
  newHistoryUIEvent,
  newRedoEvent,
  newUndoEvent
} from "./History.js";
import {List} from "../../../_snowpack/pkg/@material/mwc-list.js";
import "../../../_snowpack/pkg/@material/mwc-drawer.js";
import "../../../_snowpack/pkg/@material/mwc-list.js";
import "../../../_snowpack/pkg/@material/mwc-dialog.js";
import "../../../_snowpack/pkg/@material/mwc-switch.js";
import "../../../_snowpack/pkg/@material/mwc-select.js";
import "../../../_snowpack/pkg/@material/mwc-textfield.js";
import {nothing} from "../../../_snowpack/pkg/lit.js";
import "./plugin-manager/plugin-manager.js";
import "./plugin-manager/custom-plugin-dialog.js";
import "./menu-tabs/menu-tabs.js";
export let OscdLayout = class extends LitElement {
  constructor() {
    super(...arguments);
    this.doc = null;
    this.docName = "";
    this.editCount = -1;
    this.activeTab = 0;
    this.plugins = [];
    this.validated = Promise.resolve();
    this.shouldValidate = false;
    this.activeEditor = this.calcActiveEditors()[0];
  }
  render() {
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
  renderPlugging() {
    return html` ${this.renderPluginUI()} ${this.renderDownloadUI()} `;
  }
  renderDownloadUI() {
    return html`
      <oscd-custom-plugin-dialog id="pluginAdd"></oscd-custom-plugin-dialog>
    `;
  }
  renderPluginUI() {
    return html`
      <oscd-plugin-manager id="pluginManager" .plugins=${this.plugins}></oscd-plugin-manager>
    `;
  }
  get validators() {
    return this.plugins.filter((plugin) => plugin.active && plugin.kind === "validator");
  }
  get menuEntries() {
    return this.plugins.filter((plugin) => plugin.active && plugin.kind === "menu");
  }
  get topMenu() {
    return this.menuEntries.filter((plugin) => plugin.position === "top");
  }
  get middleMenu() {
    return this.menuEntries.filter((plugin) => plugin.position === "middle");
  }
  get bottomMenu() {
    return this.menuEntries.filter((plugin) => plugin.position === "bottom");
  }
  get menu() {
    const topMenu = this.generateMenu(this.topMenu, "top");
    const middleMenu = this.generateMenu(this.middleMenu, "middle");
    const bottomMenu = this.generateMenu(this.bottomMenu, "bottom");
    const validators = this.generateValidatorMenus(this.validators);
    if (middleMenu.length > 0)
      middleMenu.push("divider");
    if (bottomMenu.length > 0)
      bottomMenu.push("divider");
    return [
      "divider",
      ...topMenu,
      "divider",
      {
        icon: "undo",
        name: "undo",
        actionItem: true,
        action: () => {
          this.dispatchEvent(newUndoEvent());
        },
        disabled: () => !this.historyState.canUndo,
        kind: "static",
        content: () => html``
      },
      {
        icon: "redo",
        name: "redo",
        actionItem: true,
        action: () => {
          this.dispatchEvent(newRedoEvent());
        },
        disabled: () => !this.historyState.canRedo,
        kind: "static",
        content: () => html``
      },
      ...validators,
      {
        icon: "list",
        name: "menu.viewLog",
        actionItem: true,
        action: () => {
          this.dispatchEvent(newHistoryUIEvent(true, HistoryUIKind.log));
        },
        kind: "static",
        content: () => html``
      },
      {
        icon: "history",
        name: "menu.viewHistory",
        actionItem: true,
        action: () => {
          this.dispatchEvent(newHistoryUIEvent(true, HistoryUIKind.history));
        },
        kind: "static",
        content: () => html``
      },
      {
        icon: "rule",
        name: "menu.viewDiag",
        actionItem: true,
        action: () => {
          this.dispatchEvent(newHistoryUIEvent(true, HistoryUIKind.diagnostic));
        },
        kind: "static",
        content: () => html``
      },
      "divider",
      ...middleMenu,
      {
        icon: "settings",
        name: "settings.title",
        action: () => {
          this.dispatchEvent(newSettingsUIEvent(true));
        },
        kind: "static",
        content: () => html``
      },
      ...bottomMenu,
      {
        icon: "extension",
        name: "plugins.heading",
        action: () => this.pluginUI.show(),
        kind: "static",
        content: () => html``
      }
    ];
  }
  get editors() {
    return this.plugins.filter((plugin) => plugin.active && plugin.kind === "editor");
  }
  handleKeyPress(e) {
    if (!e.ctrlKey) {
      return;
    }
    const keyFunctionMap = {
      m: () => this.menuUI.open = !this.menuUI.open,
      o: () => this.menuUI.querySelector('mwc-list-item[iconid="folder_open"]')?.click(),
      O: () => this.menuUI.querySelector('mwc-list-item[iconid="create_new_folder"]')?.click(),
      s: () => this.menuUI.querySelector('mwc-list-item[iconid="save"]')?.click(),
      P: () => this.pluginUI.show()
    };
    const fn = keyFunctionMap[e.key];
    if (!fn) {
      return;
    }
    e.preventDefault();
    fn();
  }
  connectedCallback() {
    super.connectedCallback();
    this.host.addEventListener("close-drawer", async () => {
      this.menuUI.open = false;
    });
    this.host.addEventListener("validate", async () => {
      this.shouldValidate = true;
      await this.validated;
      if (!this.shouldValidate) {
        return;
      }
      this.shouldValidate = false;
      this.validated = Promise.allSettled(this.menuUI.querySelector("mwc-list").items.filter((item) => item.className === "validator").map((item) => item.nextElementSibling.validate())).then();
      this.dispatchEvent(newPendingStateEvent(this.validated));
    });
    this.handleKeyPress = this.handleKeyPress.bind(this);
    document.onkeydown = this.handleKeyPress;
    document.addEventListener("open-plugin-download", () => {
      this.pluginDownloadUI.show();
    });
  }
  generateMenu(plugins, kind) {
    return plugins.map((plugin) => {
      return {
        icon: plugin.icon || pluginIcons["menu"],
        name: plugin.name,
        action: (ae) => {
          this.dispatchEvent(newPendingStateEvent(ae.target.items[ae.detail.index].nextElementSibling.run()));
        },
        disabled: () => plugin.requireDoc && this.doc === null,
        content: () => {
          if (plugin.content) {
            return plugin.content();
          }
          return html``;
        },
        kind
      };
    });
  }
  generateValidatorMenus(plugins) {
    return plugins.map((plugin) => {
      return {
        icon: plugin.icon || pluginIcons["validator"],
        name: plugin.name,
        action: (ae) => {
          this.dispatchEvent(newEmptyIssuesEvent(plugin.src));
          this.dispatchEvent(newPendingStateEvent(ae.target.items[ae.detail.index].nextElementSibling.validate()));
        },
        disabled: () => this.doc === null,
        content: plugin.content ?? (() => html``),
        kind: "validator"
      };
    });
  }
  renderMenuItem(me) {
    const isDivider = me === "divider";
    const hasActionItem = me !== "divider" && me.actionItem;
    if (isDivider) {
      return html`<li divider padded role="separator"></li>`;
    }
    if (hasActionItem) {
      return html``;
    }
    return html`
      <mwc-list-item
        class="${me.kind}"
        iconid="${me.icon}"
        graphic="icon"
        data-name="${me.name}"
        .disabled=${me.disabled?.() || !me.action}
        ><mwc-icon slot="graphic">${me.icon}</mwc-icon>
        <span>${get(me.name)}</span>
        ${me.hint ? html`<span slot="secondary"><tt>${me.hint}</tt></span>` : ""}
      </mwc-list-item>
      ${me.content ? me.content() : nothing}
    `;
  }
  renderActionItem(me) {
    if (me === "divider" || !me.actionItem) {
      return html``;
    }
    return html`
    <mwc-icon-button
      slot="actionItems"
      icon="${me.icon}"
      label="${me.name}"
      ?disabled=${me.disabled?.() || !me.action}
      @click=${me.action}
    ></mwc-icon-button>`;
  }
  renderEditorTab({name, icon}) {
    return html`<mwc-tab label=${name} icon=${icon || "edit"}> </mwc-tab>`;
  }
  renderHeader() {
    return html`<mwc-top-app-bar-fixed>
      <mwc-icon-button
        icon="menu"
        label="Menu"
        slot="navigationIcon"
        @click=${() => this.menuUI.open = true}
      ></mwc-icon-button>
      <div slot="title" id="title">${this.docName}</div>
      ${this.menu.map(this.renderActionItem)}
    </mwc-top-app-bar-fixed>`;
  }
  renderAside() {
    return html`
      <mwc-drawer class="mdc-theme--surface" hasheader type="modal" id="menu">
        <span slot="title">${get("menu.title")}</span>
          ${renderTitle(this.docName)}
        <mwc-list
          wrapFocus
          @action=${makeListAction(this.menu)}
        >
          ${this.menu.map(this.renderMenuItem)}
        </mwc-list>
      </mwc-drawer>
    `;
    function renderTitle(docName) {
      if (!docName)
        return html``;
      return html`<span slot="subtitle">${docName}</span>`;
    }
    function makeListAction(menuItems) {
      return function listAction(ae) {
        if (ae.target instanceof List)
          menuItems.filter((item) => item !== "divider" && !item.actionItem)[ae.detail.index]?.action?.(ae);
      };
    }
  }
  calcActiveEditors() {
    const hasActiveDoc = Boolean(this.doc);
    return this.editors.filter((editor) => {
      const doesNotRequireDoc = editor.requireDoc === false;
      return doesNotRequireDoc || hasActiveDoc;
    });
  }
  renderContent() {
    const activeEditors = this.calcActiveEditors().map(this.renderEditorTab);
    const hasActiveEditors = activeEditors.length > 0;
    if (!hasActiveEditors) {
      return html``;
    }
    return html`
      <oscd-menu-tabs
        .editors=${this.calcActiveEditors()}
        .activeEditor=${this.activeEditor}
        @oscd-editor-tab-activated=${this.handleEditorTabActivated}
      >
      </oscd-menu-tabs>
      ${renderEditorContent(this.doc, this.activeEditor)}
    `;
    function renderEditorContent(doc, activeEditor) {
      const editor = activeEditor;
      const requireDoc = editor?.requireDoc;
      if (requireDoc && !doc) {
        return html``;
      }
      const content = editor?.content;
      if (!content) {
        return html``;
      }
      return html`${content()}`;
    }
  }
  handleEditorTabActivated(e) {
    this.activeEditor = e.detail.editor;
  }
  handleActivatedEditorTabByUser(e) {
    const tabIndex = e.detail.index;
    this.activateTab(tabIndex);
  }
  handleActivateEditorByEvent(e) {
    const {name, src} = e.detail;
    const editors = this.calcActiveEditors();
    const wantedEditorIndex = editors.findIndex((editor) => editor.name === name || editor.src === src);
    if (wantedEditorIndex < 0) {
      return;
    }
    this.activateTab(wantedEditorIndex);
  }
  activateTab(index) {
    this.activeTab = index;
  }
  handleRunMenuByEvent(e) {
    this.menuUI.open = true;
    const menuEntry = this.menuUI.querySelector(`[data-name="${e.detail.name}"]`);
    const menuElement = menuEntry.nextElementSibling;
    if (!menuElement) {
      return;
    }
    menuElement.run();
  }
  renderLanding() {
    if (this.doc) {
      return html``;
    }
    return html`
      <div class="landing">
        ${renderMenuItems(this.menu, this.menuUI)}
      </div>`;
    function renderMenuItems(menuItemsAndDividers, menuUI) {
      const menuItems = menuItemsAndDividers.filter((mi) => mi !== "divider");
      return menuItems.map((mi, index) => {
        if (mi.kind !== "top" || mi.disabled?.()) {
          return html``;
        }
        return html`
              <mwc-icon-button
                class="landing_icon"
                icon="${mi.icon}"
                @click="${() => clickListItem(index)}"
              >
                <div class="landing_label">${mi.name}</div>
              </mwc-icon-button>
            `;
      });
      function clickListItem(index) {
        const listItem = menuUI.querySelector("mwc-list").items[index];
        listItem.click();
      }
    }
  }
};
OscdLayout.styles = css`
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
  property({attribute: false})
], OscdLayout.prototype, "doc", 2);
__decorate([
  property({type: String})
], OscdLayout.prototype, "docName", 2);
__decorate([
  property({type: Number})
], OscdLayout.prototype, "editCount", 2);
__decorate([
  property({type: Number})
], OscdLayout.prototype, "activeTab", 2);
__decorate([
  property({type: Array})
], OscdLayout.prototype, "plugins", 2);
__decorate([
  property({type: Object})
], OscdLayout.prototype, "host", 2);
__decorate([
  property({type: Object})
], OscdLayout.prototype, "historyState", 2);
__decorate([
  state()
], OscdLayout.prototype, "validated", 2);
__decorate([
  state()
], OscdLayout.prototype, "shouldValidate", 2);
__decorate([
  state()
], OscdLayout.prototype, "activeEditor", 2);
__decorate([
  query("#menu")
], OscdLayout.prototype, "menuUI", 2);
__decorate([
  query("#pluginManager")
], OscdLayout.prototype, "pluginUI", 2);
__decorate([
  query("#pluginList")
], OscdLayout.prototype, "pluginList", 2);
__decorate([
  query("#pluginAdd")
], OscdLayout.prototype, "pluginDownloadUI", 2);
OscdLayout = __decorate([
  customElement("oscd-layout")
], OscdLayout);
