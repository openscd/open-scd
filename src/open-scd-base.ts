import { LitElement, html, property, query, TemplateResult } from 'lit-element';
import { until } from 'lit-html/directives/until.js';

import '@material/mwc-button';
import '@material/mwc-drawer';
import '@material/mwc-icon';
import '@material/mwc-icon-button';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-tab';
import '@material/mwc-tab-bar';
import '@material/mwc-top-app-bar-fixed';
import { ActionDetail } from '@material/mwc-list/mwc-list-foundation';
import { Drawer } from '@material/mwc-drawer';

import { Editing, newEmptySCD } from './editing.js';
import { Logging } from './logging.js';
import { Waiting } from './waiting.js';
import { Wizarding } from './wizarding.js';
import { newLogEvent, newPendingStateEvent } from './foundation.js';
import { plugin } from './plugin.js';
import { validateSCL } from './validate.js';
import { zeroLineIcon } from './icons.js';

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
  disabled?: () => boolean;
}

export class OpenSCDBase extends Wizarding(
  Waiting(Editing(Logging(LitElement)))
) {
  /** The currently active editor tab. */
  @property({ type: Number })
  activeTab = 0;
  @property()
  get name(): string | null {
    return this.doc.querySelector('Substation')?.getAttribute('name') ?? null;
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

  private loadDoc(src: string): Promise<string> {
    return new Promise<string>(
      (resolve: (msg: string) => void, reject: (msg: string) => void) => {
        this.dispatchEvent(
          newLogEvent({
            kind: 'info',
            title: `Loading project ${this.srcName}.`,
          })
        );
        const reader: FileReader = new FileReader();
        reader.addEventListener('load', () => {
          this.doc = reader.result
            ? new DOMParser().parseFromString(
                <string>reader.result,
                'application/xml'
              )
            : newEmptySCD();
          // free blob memory after parsing
          if (src.startsWith('blob:')) URL.revokeObjectURL(src);
          this.dispatchEvent(
            newLogEvent({
              kind: 'info',
              title: `${this.srcName} loaded.`,
            })
          );
          validateSCL(this.doc, this.srcName).then(errors => {
            errors.map(id => {
              this.dispatchEvent(newLogEvent(id));
            }) ??
              this.dispatchEvent(
                newLogEvent({
                  kind: 'info',
                  title: `${this.srcName} validated successfully.`,
                })
              );
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
      disabled: (): boolean => !this.canUndo,
    },
    {
      icon: 'redo',
      name: 'Redo',
      hint: 'CTRL+Y',
      actionItem: true,
      action: this.redo,
      disabled: (): boolean => !this.canRedo,
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
        getContent: (): Promise<TemplateResult> =>
          plugin('./editors/SubstationEditor.js', 'editor-0').then(
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
        <span>${me.name}</span>
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

  renderEditorTab(editor: Tab): TemplateResult {
    return html`<mwc-tab
      label=${editor.label}
      icon=${editor.icon instanceof TemplateResult ? '' : editor.icon}
      id=${editor.id}
      hasimageicon
    >
      ${editor.icon instanceof TemplateResult ? editor.icon : ''}
    </mwc-tab>`;
  }

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
          <div slot="title" id="title">${this.name ?? this.srcName}</div>
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

      <input id="file-input" type="file" @change="${this.loadFile}"></input>
      <!--EOopenscd-->
      ${super.render()}
    `;
  }
}
