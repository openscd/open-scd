import {
  LitElement,
  TemplateResult,
  css,
  customElement,
  html,
  property,
  query,
} from 'lit-element';
import { translate, get } from 'lit-translate';
import { until } from 'lit-html/directives/until.js';
import { cache } from 'lit-html/directives/cache.js';

import '@material/mwc-button';
import '@material/mwc-drawer';
import '@material/mwc-icon';
import '@material/mwc-icon-button';
import '@material/mwc-linear-progress';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-tab';
import '@material/mwc-tab-bar';
import '@material/mwc-top-app-bar-fixed';
import { ActionDetail } from '@material/mwc-list/mwc-list-foundation';
import { Drawer } from '@material/mwc-drawer';

import { Editing, newEmptySCD } from './Editing.js';
import { Logging } from './Logging.js';
import { Waiting } from './Waiting.js';
import { Wizarding } from './Wizarding.js';
import { Validating } from './Validating.js';
import { getTheme } from './themes.js';
import { Setting } from './Setting.js';
import { newLogEvent, newPendingStateEvent } from './foundation.js';
import { plugin } from './plugin.js';
import { zeroLineIcon } from './icons.js';
import { selectors } from './editors/substation/foundation.js';
interface MenuEntry {
  icon: string;
  name: string;
  hint?: string;
  startsGroup?: boolean;
  actionItem?: boolean;
  action?: () => void;
  disabled?: () => boolean;
}

/** The `<open-scd>` custom element is the main entry point of the
 * Open Substation Configuration Designer. */
@customElement('open-scd')
export class OpenSCD extends Setting(
  Wizarding(Waiting(Validating(Editing(Logging(LitElement)))))
) {
  /** The currently active editor tab. */
  @property({ type: Number })
  activeTab = 0;
  /** The name of the first `Substation` in the current [[`doc`]]. */
  @property()
  get name(): string | null {
    return (
      this.doc.querySelector(selectors.Substation)?.getAttribute('name') ?? null
    );
  }
  /** The name of the current file. */
  @property({ type: String }) srcName = 'untitled.scd';
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

  @query('#menu') menuUI!: Drawer;
  @query('#file-input') fileUI!: HTMLInputElement;

  /** Loads and parses an `XMLDocument` after [[`src`]] has changed. */
  private loadDoc(src: string): Promise<string> {
    return new Promise<string>(
      (resolve: (msg: string) => void, reject: (msg: string) => void) => {
        this.reset();
        this.dispatchEvent(
          newLogEvent({
            kind: 'info',
            title: get('openSCD.loading', { name: this.srcName }),
          })
        );

        const reader: FileReader = new FileReader();
        reader.addEventListener('error', () =>
          reject(get('openSCD.readError', { name: this.srcName }))
        );
        reader.addEventListener('abort', () =>
          reject(get('openSCD.readAbort', { name: this.srcName }))
        );
        reader.addEventListener('load', () => {
          this.doc = reader.result
            ? new DOMParser().parseFromString(
                <string>reader.result,
                'application/xml'
              )
            : newEmptySCD();
          // free blob memory after parsing
          if (src.startsWith('blob:')) URL.revokeObjectURL(src);
          this.validate(this.doc, { fileName: this.srcName });
          resolve(get('openSCD.loaded', { name: this.srcName }));
        });

        fetch(src ?? '').then(res =>
          res.blob().then(b => reader.readAsText(b))
        );
      }
    );
  }

  /** Loads the file `event.target.files[0]` into [[`src`]] as a `blob:...`. */
  private loadFile(event: Event): void {
    const file =
      (<HTMLInputElement | null>event.target)?.files?.item(0) ?? false;
    if (file) {
      this.srcName = file.name;
      this.setAttribute('src', URL.createObjectURL(file));
    }
  }

  private handleKeyPress(e: KeyboardEvent): void {
    let handled = false;
    const ctrlAnd = (key: string) =>
      e.key === key && e.ctrlKey && (handled = true);

    if (ctrlAnd('y')) this.redo();
    if (ctrlAnd('z')) this.undo();
    if (ctrlAnd('l')) this.logUI.open ? this.logUI.close() : this.logUI.show();
    if (ctrlAnd('m')) this.menuUI.open = !this.menuUI.open;
    if (ctrlAnd('o')) this.fileUI.click();

    if (handled) e.preventDefault();
  }

  menu: MenuEntry[] = [
    {
      icon: 'folder_open',
      name: 'menu.open',
      startsGroup: true,
      actionItem: true,
      action: (): void => this.fileUI.click(),
    },
    { icon: 'create_new_folder', name: 'menu.new' },
    { icon: 'snippet_folder', name: 'menu.importIED' },
    { icon: 'save', name: 'save' },
    {
      icon: 'undo',
      name: 'undo',
      startsGroup: true,
      actionItem: true,
      action: this.undo,
      disabled: (): boolean => !this.canUndo,
    },
    {
      icon: 'redo',
      name: 'redo',
      actionItem: true,
      action: this.redo,
      disabled: (): boolean => !this.canRedo,
    },
    { icon: 'rule_folder', name: 'menu.validate', startsGroup: true },
    {
      icon: 'rule',
      name: 'menu.viewLog',
      actionItem: true,
      action: (): void => this.logUI.show(),
    },
    {
      icon: 'settings',
      name: 'settings.name',
      startsGroup: true,
      action: (): void => this.settingsUI.show(),
    },
  ];

  plugins = {
    editors: [
      {
        name: 'substation.name',
        id: 'substation',
        icon: zeroLineIcon,
        getContent: (): Promise<TemplateResult> =>
          plugin('./editors/Substation.js', 'editor-0').then(
            () => html`<editor-0 .doc=${this.doc}></editor-0>`
          ),
      },
    ],
  };

  constructor() {
    super();

    this.handleKeyPress = this.handleKeyPress.bind(this);
    document.onkeydown = this.handleKeyPress;
  }

  renderMenuEntry(me: MenuEntry): TemplateResult {
    return html`
      ${me.startsGroup ? html`<li divider padded role="separator"></li>` : ''}
      <mwc-list-item
        iconid="${me.icon}"
        graphic="icon"
        .disabled=${me.disabled?.() || (me.action ? false : true)}
        ?twoline=${me.hint}
        ><mwc-icon slot="graphic"> ${me.icon} </mwc-icon>
        <span>${translate(me.name)}</span>
        ${me.hint
          ? html`<span slot="secondary"><tt>${me.hint}</tt></span>`
          : ''}
      </mwc-list-item>
    `;
  }

  renderActionItem(me: MenuEntry): TemplateResult {
    if (me.actionItem)
      return html`<mwc-icon-button
        slot="actionItems"
        icon="${me.icon}"
        label="${me.name}"
        ?disabled=${me.disabled?.() || !me.action}
        @click=${me.action}
      ></mwc-icon-button>`;
    else return html``;
  }

  renderEditorTab({
    name,
    id,
    icon,
  }: {
    name: string;
    id: string;
    icon: string | TemplateResult;
  }): TemplateResult {
    return html`<mwc-tab
      label=${translate(name)}
      icon=${icon instanceof TemplateResult ? '' : icon}
      id=${id}
      hasimageicon
    >
      ${icon instanceof TemplateResult ? icon : ''}
    </mwc-tab>`;
  }

  render(): TemplateResult {
    return html`
      <mwc-drawer class="mdc-theme--surface" hasheader type="modal" id="menu">
        <span slot="title">${
          this.name ?? html`${translate('menu.name')}`
        }</span>
        ${this.name ? html`<span slot="subtitle">${this.srcName}</span>` : ''}
        <mwc-list
          wrapFocus
          @action=${(ae: CustomEvent<ActionDetail>) =>
            this.menu[ae.detail.index]?.action!()}
        > ${this.menu.map(this.renderMenuEntry)}
        </mwc-list>

        <mwc-top-app-bar-fixed slot="appContent">
          <mwc-icon-button
            icon="menu"
            label="Menu"
            slot="navigationIcon"
            @click=${() => (this.menuUI.open = true)}
          ></mwc-icon-button>
          <div slot="title" id="title">${this.name ?? this.srcName}</div>
          ${this.menu.map(this.renderActionItem)}
          <mwc-tab-bar
            @MDCTabBar:activated=${(e: CustomEvent) =>
              (this.activeTab = e.detail.index)}
          > ${this.plugins.editors.map(this.renderEditorTab)}
          </mwc-tab-bar>
        </mwc-top-app-bar-fixed>
      </mwc-drawer>

      ${cache(
        until(
          this.plugins.editors[this.activeTab].getContent(),
          html`<mwc-linear-progress indeterminate></mwc-linear-progress>`
        )
      )}

      <input id="file-input" type="file" @change="${this.loadFile}"></input>
      ${super.render()}
      ${getTheme(this.settings.theme)}
    `;
  }

  static styles = css`
    mwc-top-app-bar-fixed {
      --mdc-theme-text-disabled-on-light: rgba(255, 255, 255, 0.38);
    } /* hack to fix disabled icon buttons rendering black */

    mwc-tab {
      background-color: var(--primary);
      --mdc-theme-primary: var(--mdc-theme-on-primary);
    }

    #file-input {
      display: none;
    }

    mwc-dialog {
      --mdc-dialog-max-width: 92vw;
    }

    mwc-dialog > form {
      display: flex;
      flex-direction: column;
    }

    mwc-dialog > form > * {
      display: block;
      margin-top: 16px;
    }

    mwc-circular-progress-four-color {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
      pointer-events: none;
    }

    tt {
      font-family: 'Roboto Mono', monospace;
      font-weight: 300;
    }
  `;
}
