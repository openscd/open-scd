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

import '@material/mwc-button';
import '@material/mwc-dialog';
import '@material/mwc-drawer';
import '@material/mwc-icon';
import '@material/mwc-icon-button';
import '@material/mwc-linear-progress';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-list/mwc-radio-list-item';
import '@material/mwc-tab';
import '@material/mwc-tab-bar';
import '@material/mwc-textfield';
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
import {
  newLogEvent,
  newPendingStateEvent,
  versionSupport,
  newWizardEvent,
  Wizard,
  EditorAction,
  WizardAction,
  WizardInput,
  CloseableElement,
  SchemaVersion,
} from './foundation.js';
import { plugin } from './plugin.js';
import { zeroLineIcon } from './icons.js';
import { styles } from './editors/substation/foundation.js';
import { Dialog } from '@material/mwc-dialog';
import { List } from '@material/mwc-list';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';
import { guessSubstation } from './editors/substation/guess-wizard.js';
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
  /** The name of the current file. */
  @property({ type: String }) srcName = '';
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
  @query('#saveas') saveUI!: Dialog;

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
            : null;
          // free blob memory after parsing
          if (src.startsWith('blob:')) URL.revokeObjectURL(src);
          if (this.doc) this.validate(this.doc, { fileName: this.srcName });
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

  private saveAs(): void {
    this.srcName =
      this.saveUI.querySelector('mwc-textfield')?.value || this.srcName;
    this.save();
    this.saveUI.close();
  }

  private save(): void {
    if (this.doc) {
      const blob = new Blob([new XMLSerializer().serializeToString(this.doc)], {
        type: 'application/xml',
      });

      const a = document.createElement('a');
      a.download = this.srcName + '.scd';
      a.href = URL.createObjectURL(blob);
      a.dataset.downloadurl = ['application/xml', a.download, a.href].join(':');
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function () {
        URL.revokeObjectURL(a.href);
      }, 1500);
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
    if (ctrlAnd('s')) this.save();
    if (ctrlAnd('S')) this.saveUI.show();

    if (handled) e.preventDefault();
  }

  private createNewProject(): WizardAction {
    return (
      inputs: WizardInput[],
      wizard: CloseableElement
    ): EditorAction[] => {
      this.srcName = inputs[0].value;
      const schema: SchemaVersion = JSON.parse(
        (<ListItemBase>(
          (<List>wizard.shadowRoot!.querySelector('mwc-list')).selected
        )).value
      );

      this.doc = newEmptySCD(
        this.srcName,
        schema.version,
        schema.revision,
        schema.release
      );

      wizard.close();

      return [];
    };
  }

  private newProjectWizard(): Wizard {
    return [
      {
        title: get('menu.new'),
        primary: {
          icon: 'add',
          label: get('add'),
          action: this.createNewProject(),
        },
        content: [
          html`<wizard-textfield
              id="srcName"
              label="name"
              maybeValue="NewProject"
              required
              validationMessage="${translate('textfield.required')}"
              dialogInitialFocus
            ></wizard-textfield>
            <mwc-list activatable>
              <mwc-radio-list-item
                left
                value="${JSON.stringify(versionSupport.edition1)}"
                >Edition 1 (Schema 1.7)</mwc-radio-list-item
              >
              <mwc-radio-list-item
                left
                value="${JSON.stringify(versionSupport.edition2)}"
                >Edition 2 (2007A)</mwc-radio-list-item
              >
              <mwc-radio-list-item
                left
                selected
                value="${JSON.stringify(versionSupport.edition21)}"
                >Edition 2.1 (2007B4)</mwc-radio-list-item
              >
            </mwc-list>`,
        ],
      },
    ];
  }

  private openNewProjectWizard() {
    this.dispatchEvent(newWizardEvent(this.newProjectWizard()));
  }

  private openGuessWizard(): void {
    if (this.doc) this.dispatchEvent(newWizardEvent(guessSubstation(this.doc)));
  }

  menu: MenuEntry[] = [
    {
      icon: 'folder_open',
      name: 'menu.open',
      startsGroup: true,
      action: (): void => this.fileUI.click(),
    },
    {
      icon: 'create_new_folder',
      name: 'menu.new',
      action: (): void => this.openNewProjectWizard(),
    },
    { icon: 'snippet_folder', name: 'menu.importIED' },
    {
      icon: 'save_alt',
      name: 'save',
      action: (): void => this.save(),
      disabled: (): boolean => this.doc === null,
    },
    {
      icon: 'save',
      name: 'saveAs',
      action: (): void => this.saveUI.show(),
      disabled: (): boolean => this.doc === null,
    },
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
    {
      icon: 'rule_folder',
      name: 'menu.validate',
      startsGroup: true,
      action: () =>
        this.doc ? this.validate(this.doc, { fileName: this.srcName }) : null,
    },
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

    if ('serviceWorker' in navigator)
      navigator.serviceWorker.register('/sw.js');

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
        <span slot="title">${translate('menu.name')}</span>
        ${
          this.srcName ? html`<span slot="subtitle">${this.srcName}</span>` : ''
        }
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
          <div slot="title" id="title">${this.srcName}</div>
          ${this.menu.map(this.renderActionItem)}
          ${
            this.doc
              ? html`<mwc-tab-bar
                  @MDCTabBar:activated=${(e: CustomEvent) =>
                    (this.activeTab = e.detail.index)}
                >
                  ${this.plugins.editors.map(this.renderEditorTab)}
                </mwc-tab-bar>`
              : ``
          }
        </mwc-top-app-bar-fixed>
      </mwc-drawer>

      <mwc-dialog heading="${translate('saveAs')}" id="saveas">
        <mwc-textfield dialogInitialFocus label="${translate(
          'filename'
        )}" value="${this.srcName}">
        </mwc-textfield>
        <mwc-button
          @click=${() => this.saveAs()}
          icon="save"
          slot="primaryAction">
          ${translate('save')}
        </mwc-button>
        <mwc-button
          dialogAction="cancel"
          style="--mdc-theme-primary: var(--mdc-theme-error)"
          slot="secondaryAction">
          ${translate('cancel')}
        </mwc-button>
      </mwc-dialog>
        
      ${
        this.doc
          ? until(
              this.plugins.editors[this.activeTab].getContent(),
              html`<mwc-linear-progress indeterminate></mwc-linear-progress>`
            )
          : html`<div class="landing">
          <mwc-icon-button 
            class="landing_icon"
            icon="create_new_folder"
            @click=${() => this.openNewProjectWizard()}>
          <div class="landing_label">${translate('menu.new')}</div>
          </mwc-icon-button>
          <mwc-icon-button 
            class="landing_icon"
            icon="folder_open" 
            @click=${() => this.fileUI.click()}>
            <div class="landing_label">${translate('menu.open')}</div>
          </mwc-button>
        </div>`
      }

      <input id="file-input" type="file" accept=".scd,.ssd" @change="${
        this.loadFile
      }"></input>
      ${super.render()}
      ${getTheme(this.settings.theme)}
    `;
  }

  static styles = css`
    ${styles}

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

    .landing {
      display: flex;
      flex-direction: row;
      justify-content: center;
      position: absolute;
      top: calc(50vh - 82px);
      left: calc(50vw - 184px);
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
  `;
}
