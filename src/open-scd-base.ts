import { html, property, internalProperty, query } from 'lit-element';
import { TemplateResult, NodePart, nothing } from 'lit-html';

import '@material/mwc-button';
import '@material/mwc-circular-progress-four-color';
import '@material/mwc-dialog';
import '@material/mwc-drawer';
import '@material/mwc-icon';
import '@material/mwc-icon-button';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-snackbar';
import '@material/mwc-tab';
import '@material/mwc-tab-bar';
import '@material/mwc-top-app-bar-fixed';
import { DialogBase } from '@material/mwc-dialog/mwc-dialog-base';
import { DrawerBase } from '@material/mwc-drawer/mwc-drawer-base';
import { SnackbarBase } from '@material/mwc-snackbar/mwc-snackbar-base';

import { WaitingElement, PendingStateDetail } from './WaitingElement.js';
import { validateSCL } from './validate.js';
import { plugin } from './plugin.js';
import { ActionDetail } from '@material/mwc-list/mwc-list-foundation';

interface MenuEntry {
  icon: string;
  name: string;
  startsGroup?: boolean;
  actionItem?: boolean;
  action?: () => void;
}

export class OpenSCDBase extends WaitingElement {
  render(): TemplateResult {
    return html`
      <mwc-drawer hasheader type="modal">
        <span slot="title"
          >${this.doc.querySelector('Substation')?.getAttribute('name') ??
          'Menu'}</span
        >
        <span slot="subtitle">${this.srcName}</span>
        <mwc-list
          @action=${(ae: CustomEvent<ActionDetail>) =>
            this.menu[ae.detail.index]?.action!()}
        >
          ${this.menu.map(
            me => html`
              ${me.startsGroup
                ? html`<li divider padded role="separator"></li>`
                : nothing}
              <mwc-list-item
                graphic="icon"
                .disabled=${me.action ? false : true}
                ><mwc-icon slot="graphic">
                  ${me.icon}
                </mwc-icon>
                ${me.name}
              </mwc-list-item>
            `
          )}
        </mwc-list>
        <mwc-top-app-bar-fixed slot="appContent">
          <mwc-icon-button
            icon="menu"
            slot="navigationIcon"
            @click=${() => (this.menuUI.open = true)}
          ></mwc-icon-button>
          <div slot="title" id="title">
            ${this.srcName}
          </div>
          ${this.menu.map(me =>
            me.actionItem
              ? html`<mwc-icon-button
                  slot="actionItems"
                  icon="${me.icon}"
                  @click=${me.action}
                ></mwc-icon-button>`
              : nothing
          )}
          <mwc-tab-bar
            @MDCTabBar:activated=${(e: CustomEvent) =>
              (this.activeTab = e.detail.index)}
          >
            ${this.plugins.editors.map(
              editor =>
                html`<mwc-tab
                  label=${editor.label}
                  icon=${editor.icon}
                  id=${editor.id}
                ></mwc-tab>`
            )}
          </mwc-tab-bar>
        </mwc-top-app-bar-fixed>
      </mwc-drawer>

      ${this.plugins.editors[this.activeTab].getContent()}

      <mwc-circular-progress-four-color .closed=${!this.waiting} indeterminate>
      </mwc-circular-progress-four-color>

      <mwc-snackbar
        id="errorSnackbar"
        timeoutMs="-1"
        labelText="${this.history.find(le => le.icon == 'error_outline')
          ?.title ?? 'No errors'}"
      >
        <mwc-button slot="action" icon="rule" @click=${() => this.logUI.show()}
          >Show</mwc-button
        >
        <mwc-icon-button icon="close" slot="dismiss"></mwc-icon-button>
      </mwc-snackbar>

      <mwc-dialog id="log" heading="Log">
        <mwc-list id="content" activatable>
          ${this.history.length < 1
            ? html`<mwc-list-item disabled hasmeta>
                <span
                  >Errors, warnings, and notifications will show up here.</span
                >
                <mwc-icon slot="meta">info</mwc-icon>
              </mwc-list-item>`
            : this.history.map(
                item => html`<mwc-list-item
                  ?twoline=${item.message}
                  ?hasmeta=${item.icon}
                >
                  <span>
                    <!-- FIXME: replace tt by mwc-chip asap -->
                    <tt>${item.time.toLocaleTimeString()}</tt>
                    ${item.title}</span
                  >
                  <span slot="secondary">${item.message}</span>
                  <mwc-icon slot="meta">${item.icon}</mwc-icon>
                </mwc-list-item>`
              )}
        </mwc-list>
        <mwc-button slot="primaryAction" dialogaction="close">Close</mwc-button>
      </mwc-dialog>

      <input id="file-input" type="file" @change="${this.loadFile}" />
    `;
  }

  static emptySCD = document.implementation.createDocument(
    'http://www.iec.ch/61850/2003/SCL',
    'SCL',
    null
  );

  /** The currently active editor tab. */
  @property({ type: Number })
  activeTab = 0;
  /** The `XMLDocument` representation of the current file. */
  @internalProperty() // does not generate an attribute binding
  doc: XMLDocument = OpenSCDBase.emptySCD;
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
    this.dispatchEvent(
      new CustomEvent<PendingStateDetail>('pending-state', {
        composed: true,
        bubbles: true,
        detail: { promise: this.loadDoc(value) },
      })
    );
  }

  @query('mwc-drawer') menuUI!: DrawerBase;
  @query('mwc-dialog') logUI!: DialogBase;
  @query('mwc-snackbar') messageUI!: SnackbarBase;
  @query('#file-input') fileUI!: HTMLInputElement;

  menu: MenuEntry[] = [
    {
      icon: 'folder_open',
      name: 'Open project',
      startsGroup: true,
      actionItem: true,
      action: (): void => this.fileUI.click(),
    },
    { icon: 'create_new_folder', name: 'New project' },
    { icon: 'snippet_folder', name: 'Import IED' },
    { icon: 'save', name: 'Save project' },
    { icon: 'rule_folder', name: 'Validate project', startsGroup: true },
    {
      icon: 'rule',
      name: 'View log',
      actionItem: true,
      action: (): void => this.logUI.show(),
    },
  ];

  plugins = {
    editors: [
      {
        label: 'Substation',
        id: 'substation',
        icon: 'design_services', //alt: 'developer_board', //alt: 'engineering',
        getContent: (): ((part: NodePart) => void) =>
          plugin(
            './substation-editor.js',
            html`<substation-editor
              .doc=${this.doc.querySelector('Substation')}
            ></substation-editor>`
          ),
      },
      {
        label: 'Communication',
        id: 'communication',
        icon: 'quickreply', //alt: 'sync_alt', //alt: 'message',
        getContent: (): TemplateResult => html`<tt>Communication mappings</tt>`,
      },
      {
        label: 'Network',
        id: 'network',
        icon: 'settings_ethernet', //alt: 'settings_input_composite', //alt: 'device_hub',
        getContent: (): TemplateResult => html`<tt>Network configuration</tt>`,
      },
      {
        label: 'IED',
        id: 'ied',
        icon: 'router', //alt: 'dynamic_form', //alt: 'online_prediction',
        getContent: (): TemplateResult => html`<tt>IED configuration</tt>`,
      },
    ],
  };

  error(title: string, ...detail: string[]): void {
    super.error(title, ...detail);
    this.messageUI.show();
  }

  private loadDoc(src: string): Promise<string> {
    return new Promise<string>(
      (resolve: (msg: string) => void, reject: (msg: string) => void) => {
        this.info(`Loading project ${this.srcName}.`);
        const reader: FileReader = new FileReader();
        reader.addEventListener('load', () => {
          this.doc = reader.result
            ? new DOMParser().parseFromString(
                <string>reader.result,
                'application/xml'
              )
            : OpenSCDBase.emptySCD;
          // free blob memory after parsing
          if (src.startsWith('blob:')) URL.revokeObjectURL(src);
          this.info(`${this.srcName} loaded.`);
          validateSCL(this.doc, this.srcName).then(errors => {
            errors
              ?.map(e => e.split(': ').map(s => s.trim()))
              .map(a => {
                if (a[4]) [a[0], a[4]] = [a[4], a[0]];
                this.error(a[0], ...a.slice(1).reverse());
              }) ?? this.info(`${this.srcName} validated successfully.`);
            if (errors === null)
              resolve(`${this.srcName} validation succesful.`);
            else reject(`${this.srcName} validation failed.`);
          });
        });
        reader.addEventListener('error', () =>
          reject(`${this.srcName} read error.`)
        );
        reader.addEventListener('abort', () =>
          reject(`${this.srcName} read aborted.`)
        );
        fetch(src ?? '').then(res =>
          res.blob().then(b => reader.readAsText(b))
        );
      }
    );
  }

  /** Loads the file selected by input `event.target.files[0]`. */
  private loadFile(event: Event): void {
    const file =
      (<HTMLInputElement | null>event.target)?.files?.item(0) ?? false;
    if (file) {
      this.srcName = file.name;
      this.setAttribute('src', URL.createObjectURL(file));
    }
  }
}
