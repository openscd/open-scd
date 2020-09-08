import { html, property, query, LitElement } from 'lit-element';
import { TemplateResult, nothing } from 'lit-html';
import { until } from 'lit-html/directives/until.js';

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
  ActionEvent,
  Create,
  Delete,
  Move,
  PendingStateDetail,
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
  hint?: string;
  startsGroup?: boolean;
  actionItem?: boolean;
  action?: () => void;
  isDisabled?: () => boolean;
}

export class OpenSCDBase extends Waiting(Logging(LitElement)) {
  render(): TemplateResult {
    return html`
      <mwc-drawer hasheader type="modal" id="menu">
        <span slot="title">${this.name ?? 'Menu'}</span>
        <span slot="subtitle"
          >${this.name ? this.srcName : html`<tt>CTRL+M</tt>`}</span
        >
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

      ${until(
        this.plugins.editors[this.activeTab].getContent(),
        html`<span>Loading...</span>`
      )}

      <mwc-dialog id="log" heading="Log">
        <mwc-list id="content" wrapFocus>
          ${this.renderHistory(this.history)}
        </mwc-list>
        <mwc-button
          icon="undo"
          label="Undo"
          ?disabled=${!this.canUndo}
          @click=${this.undo}
          slot="secondaryAction"
        ></mwc-button>
        <mwc-button
          icon="redo"
          label="Redo"
          ?disabled=${!this.canRedo}
          @click=${this.redo}
          slot="secondaryAction"
        ></mwc-button>
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
      <mwc-list-item
        graphic="icon"
        .disabled=${me.isDisabled?.() || (me.action ? false : true)}
        ?twoline=${me.hint}
        ><mwc-icon slot="graphic">
          ${me.icon}
        </mwc-icon>
        <span>${me.name}</span>
        ${me.hint
          ? html`<span slot="secondary"><tt>${me.hint}</tt></span>`
          : nothing}
      </mwc-list-item>
    `;
  }

  renderActionItem(me: MenuEntry): TemplateResult {
    if (me.actionItem)
      return html`<mwc-icon-button
        slot="actionItems"
        icon="${me.icon}"
        label="${me.name}"
        ?disabled=${me.isDisabled?.() || !me.action}
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
      ?activated=${this.lastAction == history.length - index - 1}
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
    {
      icon: 'undo',
      name: 'Undo',
      hint: 'CTRL+Z',
      startsGroup: true,
      actionItem: true,
      action: this.undo,
      isDisabled: (): boolean => !this.canUndo,
    },
    {
      icon: 'redo',
      name: 'Redo',
      hint: 'CTRL+Y',
      actionItem: true,
      action: this.redo,
      isDisabled: (): boolean => !this.canRedo,
    },
    { icon: 'rule_folder', name: 'Validate project', startsGroup: true },
    {
      icon: 'rule',
      name: 'View log',
      hint: 'CTRL+L',
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
        getContent: async (): Promise<TemplateResult> => {
          await plugin('./editors/substation-editor.js', 'editor-0');
          return html`<editor-0 .doc=${this.doc!}></editor-0>`;
        },
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
      new CustomEvent<PendingStateDetail>('pending-state', {
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
    if (this.canUndo)
      this.logUI
        .querySelector('mwc-list')
        ?.focusItemAtIndex(this.history.length - this.lastAction - 1);
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

  private onCreate(event: ActionEvent<Create>) {
    if (event.detail.action.new.reference)
      event.detail.action.new.parent.insertBefore(
        event.detail.action.new.element,
        event.detail.action.new.reference
      );
    else event.detail.action.new.parent.append(event.detail.action.new.element);
    this.commit(
      `Create ${event.detail.action.new.element.tagName}`,
      event.detail.action
    );
  }

  private onDelete(event: ActionEvent<Delete>) {
    event.detail.action.old.element.remove();
    this.commit(
      `Delete ${event.detail.action.old.element.tagName}`,
      event.detail.action
    );
  }

  private onMove(event: ActionEvent<Move>) {
    event.detail.action.new.parent.prepend(event.detail.action.old.element);
    this.commit(
      `Move ${event.detail.action.old.element.tagName}`,
      event.detail.action
    );
  }

  private onUpdate(event: ActionEvent<Update>) {
    event.detail.action.new.element.append(
      ...Array.from(event.detail.action.old.element.childNodes)
    );
    event.detail.action.old.element.replaceWith(
      event.detail.action.new.element
    );
    this.commit(
      `Update ${event.detail.action.new.element.tagName}`,
      event.detail.action
    );
  }

  private onAction(event: ActionEvent<Action>) {
    if (isMove(event.detail.action)) this.onMove(event as ActionEvent<Move>);
    else if (isCreate(event.detail.action))
      this.onCreate(event as ActionEvent<Create>);
    else if (isDelete(event.detail.action))
      this.onDelete(event as ActionEvent<Delete>);
    else if (isUpdate(event.detail.action))
      this.onUpdate(event as ActionEvent<Update>);

    for (const element of event.composedPath())
      if (element instanceof LitElement) element.requestUpdate();
  }

  private handleKeyPress(e: KeyboardEvent): void {
    let handled = false;
    if (e.keyCode == 89 /* y */ && e.ctrlKey && (handled = true)) this.redo();
    if (e.keyCode == 90 /* z */ && e.ctrlKey && (handled = true)) this.undo();
    if (e.keyCode == 76 /* l */ && e.ctrlKey && (handled = true))
      this.logUI.open ? this.logUI.close() : this.logUI.show();
    if (e.keyCode == 77 /* m */ && e.ctrlKey && (handled = true))
      this.menuUI.open = !this.menuUI.open;
    if (handled) e.preventDefault();
  }

  constructor() {
    super();

    this.addEventListener('editor-action', this.onAction);

    this.handleKeyPress = this.handleKeyPress.bind(this);
    document.onkeydown = this.handleKeyPress;
  }
}
