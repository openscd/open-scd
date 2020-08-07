import {
  LitElement,
  customElement,
  html,
  css,
  property,
  internalProperty,
} from 'lit-element';
import { TemplateResult } from 'lit-html';
import '@material/mwc-top-app-bar-fixed';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-icon-button';
import '@material/mwc-circular-progress-four-color';
import '@material/mwc-drawer';
import '@material/mwc-dialog';
import '@material/mwc-button';
import '@material/mwc-icon';

import { validate } from './validate.js';

export type PendingStateEvent = CustomEvent<Promise<string>>;

interface LogEntry {
  time: Date;
  title: string;
  message?: string;
  icon?: string;
}

declare global {
  interface ElementEventMap {
    ['pending-state']: PendingStateEvent;
  }
}

export const emptySCD = document.implementation.createDocument(
  'http://www.iec.ch/61850/2003/SCL',
  'SCL',
  null
);

@customElement('open-scd')
export class OpenSCD extends LitElement {
  render(): TemplateResult {
    return html`
      <mwc-circular-progress-four-color .closed=${!this.waiting} indeterminate>
      </mwc-circular-progress-four-color>
      <mwc-drawer hasheader type="dismissible" .open=${this.menuOpen}>
        <span slot="title">Menu</span>
        <span slot="subtitle">${this.srcName}</span>
        <mwc-top-app-bar-fixed slot="appContent">
          <mwc-icon-button
            icon="menu"
            slot="navigationIcon"
            @click=${() => (this.menuOpen = !this.menuOpen)}
          ></mwc-icon-button>
          <div slot="title" id="title">
            ${this.srcName}
          </div>
          <mwc-icon-button
            icon="folder_open"
            slot="actionItems"
            @click="${this.selectFile}"
          ></mwc-icon-button>
          <mwc-icon-button
            icon="toc"
            slot="actionItems"
            @click="${() =>
              this.shadowRoot!.getElementById('log')!.setAttribute('open', '')}"
          ></mwc-icon-button>
        </mwc-top-app-bar-fixed>
      </mwc-drawer>
      <mwc-dialog id="log" heading="Log">
        <mwc-list id="content" activatable>
          ${this.history.map(
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

  /** Whether the menu drawer is currently open. */
  @property({ type: Boolean }) menuOpen = false;
  /** Error and warning log, and edit history */
  @property({ type: Array }) history: Array<LogEntry> = [];
  /** The `XMLDocument` representation of the current file. */
  @internalProperty() // does not generate an attribute binding
  doc: XMLDocument = emptySCD;
  /** The name of the current file. */
  @property({ type: String }) srcName = 'untitled.scd';
  /** Whether the editor is currently waiting for some async work. */
  @property({ type: Boolean }) waiting = false;
  private work: Set<Promise<string>> = new Set();
  /** A promise which resolves once all currently pending work is done. */
  workDone = Promise.allSettled(this.work);

  log(title: string, message?: string, icon?: string): void {
    this.history.push({ time: new Date(), title, message, icon });
  }

  info(title: string, ...detail: string[]): void {
    this.log(title, detail.join(' | '), 'info');
  }
  warn(title: string, ...detail: string[]): void {
    this.log(title, detail.join(' | '), 'warning');
  }
  error(title: string, ...detail: string[]): void {
    this.log(title, detail.join(' | '), 'error');
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
            : emptySCD;
          // free blob memory after parsing
          if (src.startsWith('blob:')) URL.revokeObjectURL(src);
          this.info(`${this.srcName} loaded.`);
          validate(this.doc, this.srcName).then(errors => {
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

  private currentSrc = '';
  /** The current file's URL. `blob:` URLs are *revoked after parsing*! */
  @property({ type: String })
  get src(): string {
    return this.currentSrc;
  }
  set src(value: string) {
    this.currentSrc = value;
    document.querySelector('open-scd')?.dispatchEvent(
      new CustomEvent<Promise<string>>('pending-state', {
        composed: true,
        bubbles: true,
        detail: this.loadDoc(value),
      })
    );
  }

  /** Loads the file selected by input `event.target.files[0]`. */
  private loadFile(event: Event): void {
    this.srcName =
      (<HTMLInputElement | null>event.target)?.files?.item(0)?.name ??
      'untitled.scd';
    this.setAttribute(
      'src',
      URL.createObjectURL(
        (<HTMLInputElement | null>event.target)?.files?.item(0) ?? new Blob([])
      )
    );
  }

  /** Opens the browser's "open file" dialog for selecting a file to edit. */
  selectFile = (): void =>
    (<HTMLElement | null>(
      this.shadowRoot!.querySelector('#file-input')
    ))?.click();

  firstUpdated(): void {
    this.log = this.log.bind(this);
    this.info = this.info.bind(this);
    this.warn = this.warn.bind(this);
    this.error = this.error.bind(this);
    this.addEventListener('pending-state', async (e: PendingStateEvent) => {
      this.waiting = true;
      this.work.add(e.detail);
      this.workDone = Promise.allSettled(this.work);
      await e.detail.then(this.info, this.error);
      this.work.delete(e.detail);
      this.waiting = this.work.size > 0;
    });
  }

  static styles = css`
    :host {
      height: 100vh;
      width: 100vw;
      margin: 0;
      --mdc-theme-secondary: #d20a11;
      --mdc-theme-primary: #005496;
      --mdc-theme-background: #ffdd00;
    }

    #file-input {
      display: none;
    }

    #log {
      --mdc-dialog-max-width: 92vw;
    }

    mwc-circular-progress-four-color {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 100;
      --mdc-circular-progress-bar-color-1: #005496;
      --mdc-circular-progress-bar-color-2: #d20a11;
      --mdc-circular-progress-bar-color-3: #005496;
      --mdc-circular-progress-bar-color-4: #ffdd00;
    }

    tt {
      font-family: 'Roboto Mono';
      font-weight: 300;
    }
  `;
}
