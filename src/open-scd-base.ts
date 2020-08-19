import { html, property, query, LitElement } from 'lit-element';
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
import { Dialog } from '@material/mwc-dialog';
import { Drawer } from '@material/mwc-drawer';
import { ActionDetail } from '@material/mwc-list/mwc-list-foundation';
import { Snackbar } from '@material/mwc-snackbar';

import {
  Action,
  Create,
  Delete,
  Move,
  PendingState,
  Update,
  isCreate,
  isDelete,
  isMove,
  isUpdate,
} from './foundation.js';
import { Logging, LogOptions, LogEntry } from './logging.js';
import { Waiting } from './waiting.js';
import { iedIcon, networkConfigIcon, zeroLineIcon } from './icons.js';
import { plugin } from './plugin.js';
import { validateSCL } from './validate.js';

interface Tab {
  label: string;
  id: string;
  icon: string | TemplateResult;
}

interface MenuEntry {
  icon: string;
  name: string;
  startsGroup?: boolean;
  actionItem?: boolean;
  action?: () => void;
}

export class OpenSCDBase extends Waiting(Logging(LitElement)) {
  render(): TemplateResult {
    return html`
      <mwc-drawer hasheader type="modal" id="menu">
        <span slot="title">${this.name ?? 'Menu'}</span>
        <span slot="subtitle">${this.srcName}</span>
        <mwc-list
          wrapFocus
          @action=${(ae: CustomEvent<ActionDetail>) =>
            this.menu[ae.detail.index]?.action!()}
        >
          ${this.menu.map(this.renderMenuEntry)}
        </mwc-list>

        <mwc-top-app-bar-fixed slot="appContent">
          <mwc-icon-button
            icon="menu"
            label="Menu"
            slot="navigationIcon"
            @click=${() => (this.menuUI.open = true)}
          ></mwc-icon-button>
          <div slot="title" id="title">
            ${this.name ?? this.srcName}
          </div>
          ${this.menu.map(this.renderActionItem)}
          <mwc-tab-bar
            @MDCTabBar:activated=${(e: CustomEvent) =>
              (this.activeTab = e.detail.index)}
          >
            ${this.plugins.editors.map(this.renderEditorTab)}
          </mwc-tab-bar>
        </mwc-top-app-bar-fixed>
      </mwc-drawer>

      ${this.plugins.editors[this.activeTab].getContent()}

      <mwc-dialog id="log" heading="Log">
        <mwc-list id="content" wrapFocus>
          ${this.renderHistory(this.history)}
        </mwc-list>
        <mwc-button slot="primaryAction" dialogaction="close">Close</mwc-button>
      </mwc-dialog>

      <mwc-snackbar
        id="message"
        timeoutMs="-1"
        labelText="${this.history
          .slice()
          .reverse()
          .find(le => le.icon == 'error_outline')?.title ?? 'No errors'}"
      >
        <mwc-button slot="action" icon="rule" @click=${() => this.logUI.show()}
          >Show</mwc-button
        >
        <mwc-icon-button icon="close" slot="dismiss"></mwc-icon-button>
      </mwc-snackbar>

      <mwc-circular-progress-four-color .closed=${!this.waiting} indeterminate>
      </mwc-circular-progress-four-color>

      <input id="file-input" type="file" @change="${this.loadFile}" />
    `;
  }

  renderMenuEntry(me: MenuEntry): TemplateResult {
    return html`
      ${me.startsGroup
        ? html`<li divider padded role="separator"></li>`
        : nothing}
      <mwc-list-item graphic="icon" .disabled=${me.action ? false : true}
        ><mwc-icon slot="graphic">
          ${me.icon}
        </mwc-icon>
        ${me.name}
      </mwc-list-item>
    `;
  }

  renderActionItem(me: MenuEntry): TemplateResult {
    if (me.actionItem)
      return html`<mwc-icon-button
        slot="actionItems"
        icon="${me.icon}"
        label="${me.name}"
        .disabled=${me.action ? false : true}
        @click=${me.action}
      ></mwc-icon-button>`;
    else return html``;
  }

  renderEditorTab(editor: Tab): TemplateResult {
    return html`<mwc-tab
      label=${editor.label}
      icon=${editor.icon instanceof TemplateResult ? '' : editor.icon}
      id=${editor.id}
      hasimageicon
    >
      ${editor.icon instanceof TemplateResult ? editor.icon : nothing}
    </mwc-tab>`;
  }

  renderHistory(history: LogEntry[]): TemplateResult[] {
    if (history.length > 0)
      return history.slice().reverse().map(this.renderLogEntry, this);
    else
      return [
        html`<mwc-list-item disabled hasmeta>
          <span>Edits, errors, and other notifications will show up here.</span>
          <mwc-icon slot="meta">info</mwc-icon>
        </mwc-list-item>`,
      ];
  }

  renderLogEntry(
    entry: LogEntry,
    index: number,
    history: LogEntry[]
  ): TemplateResult {
    return html`<mwc-list-item
      ?twoline=${entry.message}
      ?hasmeta=${entry.icon}
      ?activated=${this.currentAction == history.length - index - 1}
    >
      <span>
        <!-- FIXME: replace tt by mwc-chip asap -->
        <tt>${entry.time.toLocaleTimeString()}</tt>
        ${entry.title}</span
      >
      <span slot="secondary">${entry.message}</span>
      <mwc-icon slot="meta">${entry.icon}</mwc-icon>
    </mwc-list-item>`;
  }

  static emptySCD = document.implementation.createDocument(
    'http://www.iec.ch/61850/2003/SCL',
    'SCL',
    null
  );

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
        icon: zeroLineIcon,
        getContent: (): ((part: NodePart) => void) =>
          plugin(
            './editors/substation-editor.js',
            html`<substation-editor
              .node=${this.doc.querySelector('Substation')}
              .doc=${this.doc}
            ></substation-editor>`
          ),
      },
      {
        label: 'Communication',
        id: 'communication',
        icon: 'mediation',
        getContent: (): TemplateResult => html`<tt>Communication mappings</tt>`,
      },
      {
        label: 'Network',
        id: 'network',
        icon: networkConfigIcon,
        getContent: (): TemplateResult => html`<tt>Network configuration</tt>`,
      },
      {
        label: 'IED',
        id: 'ied',
        icon: iedIcon,
        getContent: (): TemplateResult => html`<tt>IED configuration</tt>`,
      },
    ],
  };

  @property()
  history: LogEntry[] = [];
  /** Whether the editor is currently waiting for some async work. */
  @property({ type: Boolean })
  waiting = false;
  /** The currently active editor tab. */
  @property({ type: Number })
  activeTab = 0;
  /** The `XMLDocument` representation of the current file. */
  @property()
  doc: XMLDocument = OpenSCDBase.emptySCD;
  /** The `Node` this editor is responsible for editing */
  @property()
  get node(): Element {
    return this.doc.documentElement;
  }
  @property()
  get name(): string | null {
    return this.doc.querySelector('Substation')?.getAttribute('name') ?? null;
  }
  /** The tag name this editor is responsible for editing */
  tag = 'SCL';
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
      new CustomEvent<PendingState>('pending-state', {
        composed: true,
        bubbles: true,
        detail: { promise: this.loadDoc(value) },
      })
    );
  }

  @query('#menu') menuUI!: Drawer;
  @query('#log') logUI!: Dialog;
  @query('#message') messageUI!: Snackbar;
  @query('#file-input') fileUI!: HTMLInputElement;

  showLog(): void {
    this.logUI.show();
    if (this.currentAction >= 0)
      this.logUI
        .querySelector('mwc-list')
        ?.focusItemAtIndex(this.currentAction);
  }

  error(title: string, options?: LogOptions): LogEntry {
    this.messageUI.show();
    return super.error(title, options);
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
            errors.map(le => {
              this.error(le.title, le);
            }) ?? this.info(`${this.srcName} validated successfully.`);
            if (errors.length == 0)
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

  private onMove(event: CustomEvent<Move>) {
    event.detail.new.parent.prepend(event.detail.old.element);
    this.commit(`Move ${event.detail.old.element.tagName}`, event.detail);

    (<LitElement>event.composedPath()[0]).requestUpdate('node');
    this.requestUpdate('doc');
  }

  private onCreate(event: CustomEvent<Create>) {
    event.detail.new.parent.prepend(event.detail.new.element);
    this.commit(`Create ${event.detail.new.element.tagName}`, event.detail);

    (<LitElement>event.composedPath()[0]).requestUpdate('node');
    this.requestUpdate('doc');
  }

  private onDelete(event: CustomEvent<Delete>) {
    event.detail.old.element.remove();
    this.commit(`Delete ${event.detail.old.element.tagName}`, event.detail);

    (<LitElement>event.composedPath()[0]).requestUpdate('node');
    this.requestUpdate('doc');
  }

  private onUpdate(event: CustomEvent<Update>) {
    event.detail.new.element.append(
      ...Array.from(event.detail.old.element.childNodes)
    );
    event.detail.old.element.replaceWith(event.detail.new.element);
    this.commit(`Update ${event.detail.new.element.tagName}`, event.detail);

    (<LitElement>event.composedPath()[0]).requestUpdate('node');
    this.requestUpdate('doc');
  }

  private onAction(event: CustomEvent<Action>) {
    if (isMove(event.detail)) this.onMove(event as CustomEvent<Move>);
    else if (isCreate(event.detail))
      this.onCreate(event as CustomEvent<Create>);
    else if (isDelete(event.detail))
      this.onDelete(event as CustomEvent<Delete>);
    else if (isUpdate(event.detail))
      this.onUpdate(event as CustomEvent<Update>);
  }

  private handleKeyPress(event: KeyboardEvent): void {
    if (event.keyCode == 89 /* y */ && event.ctrlKey) this.redo();
    if (event.keyCode == 90 /* z */ && event.ctrlKey) this.undo();
  }

  constructor() {
    super();
    this.addEventListener('action', this.onAction);

    this.handleKeyPress = this.handleKeyPress.bind(this);
    document.onkeydown = this.handleKeyPress;
  }
}
