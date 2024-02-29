import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
  query,
} from 'lit-element';

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

import {
  newOpenDocEvent,
  newPendingStateEvent,
  newSettingsUIEvent,
} from './foundation.js';

import { Editing } from './Editing.js';
import { Historing } from './Historing.js';
import { Plugging, Plugin, pluginIcons } from './Plugging.js';

<<<<<<< HEAD
import './addons/Settings.js';
import './addons/Waiter.js';
import './addons/Wizards.js';

import { ActionDetail, List } from '@material/mwc-list';
import { Drawer } from '@material/mwc-drawer';
import { translate } from 'lit-translate';

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
=======
import { Wizarding } from './Wizarding.js';
>>>>>>> main

import './addons/Settings.js';
import './addons/Waiter.js';
import { initializeNsdoc, Nsdoc } from './foundation/nsdoc.js';

import { ActionDetail, List } from '@material/mwc-list';
import { Drawer } from '@material/mwc-drawer';
import { translate } from 'lit-translate';

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

/** The `<open-scd>` custom element is the main entry point of the
 * Open Substation Configuration Designer. */
@customElement('open-scd')
<<<<<<< HEAD
export class OpenSCD extends Plugging(Editing(Historing(LitElement))) {
=======
export class OpenSCD extends Wizarding(
  Plugging(Editing(Historing(LitElement)))
) {
  /** Object containing all *.nsdoc files and a function extracting element's label form them*/
  @property({ attribute: false })
  nsdoc: Nsdoc = initializeNsdoc();

>>>>>>> main
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
    return html`${this.renderHosting()}${super.render()}`;
  }

  render(): TemplateResult {
    return html`<oscd-waiter>
<<<<<<< HEAD
      <oscd-settings .host=${this}>
        <oscd-wizards .host=${this}> ${this.renderMain()}</oscd-wizards>
=======
      <oscd-settings .host=${this} .nsdoc=${this.nsdoc}>
        ${this.renderMain()}
>>>>>>> main
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
}
