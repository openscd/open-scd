import {
  css,
  customElement,
  html,
  LitElement,
  property,
  query,
  TemplateResult,
} from 'lit-element';
import { until } from 'lit-html/directives/until.js';
import { translate, get } from 'lit-translate';

import '@material/mwc-button';
import '@material/mwc-checkbox';
import '@material/mwc-dialog';
import '@material/mwc-drawer';
import '@material/mwc-formfield';
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
import { Dialog } from '@material/mwc-dialog';
import { Drawer } from '@material/mwc-drawer';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

import {
  CloseableElement,
  EditorAction,
  newLogEvent,
  newPendingStateEvent,
  newWizardEvent,
  Wizard,
  WizardInput,
  newActionEvent,
  SimpleAction,
} from './foundation.js';
import { getTheme } from './themes.js';
import { plugin } from './plugin.js';
import { zeroLineIcon } from './icons.js';
import { SupportedVersion } from './schemas.js';

import { Editing, newEmptySCD } from './Editing.js';
import { Logging } from './Logging.js';
import { Setting } from './Setting.js';
import { Validating } from './Validating.js';
import { Waiting } from './Waiting.js';
import { Wizarding } from './Wizarding.js';
import { Importing } from './Importing.js';
import { createMissingIEDNameSubscriberInfo } from './transform/SubscriberInfo.js';

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
  Importing(Wizarding(Waiting(Validating(Editing(Logging(LitElement))))))
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
  @property({ type: String })
  set srcIED(value: string) {
    this.dispatchEvent(newPendingStateEvent(this.importIED(value, this.doc!)));
  }

  @query('#menu') menuUI!: Drawer;
  @query('#file-input') fileUI!: HTMLInputElement;
  @query('#ied-import') iedImport!: HTMLInputElement;
  @query('#saveas') saveUI!: Dialog;

  /** Loads the file `event.target.files[0]` into [[`src`]] as a `blob:...`. */
  private async loadIEDFile(event: Event): Promise<void> {
    const file =
      (<HTMLInputElement | null>event.target)?.files?.item(0) ?? false;
    if (file) {
      //this.srcName = file.name;
      const loaded = this.importIED(URL.createObjectURL(file), this.doc!);
      this.dispatchEvent(newPendingStateEvent(loaded));
      await loaded;
    }
  }

  /** Loads and parses an `XMLDocument` after [[`src`]] has changed. */
  private async loadDoc(src: string): Promise<string> {
    this.reset();

    this.dispatchEvent(
      newLogEvent({
        kind: 'info',
        title: get('openSCD.loading', { name: this.srcName }),
      })
    );

    const response = await fetch(src);
    const text = await response.text();
    this.doc = new DOMParser().parseFromString(text, 'application/xml');

    if (src.startsWith('blob:')) URL.revokeObjectURL(src);

    const validated = this.validate(this.doc, { fileName: this.srcName });

    if (this.doc) this.dispatchEvent(newPendingStateEvent(validated));

    await validated;

    return get('openSCD.loaded', { name: this.srcName });
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

  private formatXml(xml: string, tab?: string) {
    let formatted = '',
      indent = '';

    if (!tab) tab = '\t';
    xml.split(/>\s*</).forEach(function (node) {
      if (node.match(/^\/\w/)) indent = indent.substring(tab!.length);
      formatted += indent + '<' + node + '>\r\n';
      if (node.match(/^<?\w[^>]*[^/]$/)) indent += tab;
    });
    return formatted.substring(1, formatted.length - 3);
  }

  private save(): void {
    if (this.doc) {
      const blob = new Blob(
        [this.formatXml(new XMLSerializer().serializeToString(this.doc))],
        {
          type: 'application/xml',
        }
      );

      const a = document.createElement('a');
      a.download = this.srcName;
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

  private createNewProject(
    inputs: WizardInput[],
    wizard: CloseableElement
  ): EditorAction[] {
    this.srcName = inputs[0].value.match(/\.s[sc]d$/i)
      ? inputs[0].value
      : inputs[0].value + '.scd';
    const version = <SupportedVersion>(
      (<ListItemBase>wizard.shadowRoot!.querySelector('mwc-list')!.selected)
        .value
    );

    this.reset();

    this.doc = newEmptySCD(this.srcName.slice(0, -4), version);

    wizard.close();

    return [];
  }

  private newProjectWizard(): Wizard {
    return [
      {
        title: get('menu.new'),
        primary: {
          icon: 'create_new_folder',
          label: get('create'),
          action: (inputs, wizard) => this.createNewProject(inputs, wizard),
        },
        content: [
          html`<wizard-textfield
              id="srcName"
              label="name"
              value="project.scd"
              required
              dialogInitialFocus
            ></wizard-textfield>
            <mwc-list activatable>
              <mwc-radio-list-item left value="2003"
                >Edition 1 (Schema 1.7)</mwc-radio-list-item
              >
              <mwc-radio-list-item left value="2007B1"
                >Edition 2.1 release 1 (2007B1)</mwc-radio-list-item
              >
              <mwc-radio-list-item left selected value="2007B4"
                >Edition 2.1 current (2007B4)</mwc-radio-list-item
              >
            </mwc-list>`,
        ],
      },
    ];
  }

  private openNewProjectWizard() {
    this.dispatchEvent(newWizardEvent(this.newProjectWizard()));
  }

  private updateSubscriberInfo() {
    const actions: SimpleAction[] = createMissingIEDNameSubscriberInfo(
      this.doc!
    );

    if (!actions.length) {
      this.dispatchEvent(
        newLogEvent({
          kind: 'info',
          title:
            get('transform.subscriber.description') +
            get('transform.subscriber.nonewitems'),
        })
      );
      return;
    }

    this.dispatchEvent(
      newActionEvent({
        title:
          get('transform.subscriber.description') +
          get('transform.subscriber.message', {
            updatenumber: actions.length,
          }),
        actions: actions,
      })
    );
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
    {
      icon: 'snippet_folder',
      name: 'menu.importIED',
      action: (): void => this.iedImport.click(),
      disabled: (): boolean => this.doc === null,
    },
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
        this.doc
          ? this.dispatchEvent(
              newPendingStateEvent(
                this.validate(this.doc, { fileName: this.srcName })
              )
            )
          : null,
    },
    {
      icon: 'rule',
      name: 'menu.viewLog',
      actionItem: true,
      action: (): void => this.logUI.show(),
    },
    {
      icon: 'extension',
      name: 'Update subscriber info',
      startsGroup: true,
      action: (): void => this.updateSubscriberInfo(),
      disabled: (): boolean => this.doc === null,
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
      {
        name: 'communication.name',
        id: 'communication',
        icon: 'settings_ethernet',
        getContent: (): Promise<TemplateResult> =>
          plugin('./editors/Communication.js', 'editor-1').then(
            () => html`<editor-1 .doc=${this.doc}></editor-1>`
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
      <input id="ied-import" type="file" accept=".icd,.iid,.cid" @change="${
        this.loadIEDFile
      }"></input>
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

    #ied-import {
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
