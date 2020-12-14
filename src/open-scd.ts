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
import { newLogEvent, newPendingStateEvent } from './foundation.js';
import { plugin } from './plugin.js';
import { zeroLineIcon } from './icons.js';
import { selectors } from './editors/substation/foundation.js';
import { Dialog } from '@material/mwc-dialog';

interface MenuEntry {
  icon: string;
  name: string;
  hint?: string;
  startsGroup?: boolean;
  actionItem?: boolean;
  action?: () => void;
  disabled?: () => boolean;
}

async function* tagIterator(fileURL: string) {
  const none = {
    value: undefined,
    done: true,
  };
  const utf8Decoder = new TextDecoder('utf-8');
  const response = await fetch(fileURL);
  const reader = response.body?.getReader();
  let { value, done } = (await reader?.read()) ?? none;
  let content = value ? utf8Decoder.decode(value) : '';
  let sclOpen = '<SCL>';
  const sclClose = '</SCL>';

  const re = /<(SCL|Header|IED|Substation|Line|Process|Communication|DataTypeTemplates)\b[^>]*>/gm;
  let startIndex = 0;
  let result;
  let tag = '';

  for (;;) {
    result = re.exec(content);
    if (!result) {
      if (done) {
        break;
      }
      const remainder = content.substr(startIndex);
      ({ value, done } = (await reader?.read()) ?? none);
      content = remainder + (value ? utf8Decoder.decode(value) : '');
      startIndex = re.lastIndex = 0;
      continue;
    }
    if (result[1] === 'SCL') sclOpen = result[0];
    else {
      yield sclOpen +
        tag +
        content.substring(startIndex, result.index) +
        sclClose;
      tag = result[0];
    }
    startIndex = re.lastIndex;
  }
  if (startIndex < content.length) {
    // last tag ends in sclClose
    yield sclOpen + tag + content.substr(startIndex);
  }
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
  @query('#saveas') saveUI!: Dialog;

  /** Loads and parses an `XMLDocument` after [[`src`]] has changed. */
  private async loadDoc(src: string): Promise<string> {
    let doc: Document | null = null;
    const parts: string[] = [];
    this.reset();

    this.dispatchEvent(
      newLogEvent({
        kind: 'info',
        title: get('openSCD.loading', { name: this.srcName }),
      })
    );

    for await (const tag of tagIterator(src)) {
      if (doc === null)
        doc = new DOMParser().parseFromString(tag, 'application/xml');
      else
        Array.from(
          new DOMParser().parseFromString(tag, 'application/xml')
            .documentElement.children
        ).forEach(node => {
          doc?.documentElement.append(node);
        });
      if (tag.length < 1) console.error('empty tag!');
      parts.push(tag);
    }

    this.doc = doc!;

    if (src.startsWith('blob:')) URL.revokeObjectURL(src);

    return get('openSCD.loaded', { name: this.srcName });
  }

  /** Loads the file `event.target.files[0]` into [[`src`]] as a `blob:...`. */
  private async loadFile(event: Event): Promise<void> {
    const file =
      (<HTMLInputElement | null>event.target)?.files?.item(0) ?? false;
    if (file) {
      this.srcName = file.name;
      // this.setAttribute('src', URL.createObjectURL(file));
      const loaded = this.loadDoc(URL.createObjectURL(file));
      this.dispatchEvent(newPendingStateEvent(loaded));
      await loaded;
      // TODO(ch): enable validation of large files
      if (file.size < 500000000) this.validate(this.doc);
      else console.warn('skipping validation due to size');
    }
  }

  private saveAs(): void {
    this.srcName =
      this.saveUI.querySelector('mwc-textfield')?.value || this.srcName;
    this.save();
    this.saveUI.close();
  }

  private save(): void {
    const blob = new Blob([new XMLSerializer().serializeToString(this.doc)], {
      type: 'application/xml',
    });

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
    { icon: 'save_alt', name: 'save', action: (): void => this.save() },
    { icon: 'save', name: 'saveAs', action: (): void => this.saveUI.show() },
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

      ${until(
        this.plugins.editors[this.activeTab].getContent(),
        html`<mwc-linear-progress indeterminate></mwc-linear-progress>`
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
