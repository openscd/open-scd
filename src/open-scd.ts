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
import '@material/mwc-icon-button';
import '@material/mwc-linear-progress';
import '@material/mwc-drawer';

import { validate } from './validate.js';

export type PendingStateEvent = CustomEvent<Promise<string>>;

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
      <mwc-linear-progress .closed=${!this.waiting} indeterminate>
      </mwc-linear-progress>
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
          <div id="content">
            <ul>
              ${this.log.map(item => html`<li>${item}</li>`)}
            </ul>
          </div>
        </mwc-top-app-bar-fixed>
      </mwc-drawer>
      <input id="file-input" type="file" @change="${this.loadFile}" />
    `;
  }

  /** Whether the menu drawer is currently open. */
  @property({ type: Boolean }) menuOpen = false;
  /** Error and warning log */
  @property({ type: Array }) log: Array<string> = [];
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

  private loadDoc(src: string): Promise<string> {
    return new Promise<string>(
      (resolve: (msg: string) => void, reject: (msg: string) => void) => {
        const reader: FileReader = new FileReader();
        reader.addEventListener('load', () => {
          // FIXME: blocking the main thread makes MWC progress bar not move
          this.doc = reader.result
            ? new DOMParser().parseFromString(
                <string>reader.result,
                'application/xml'
              )
            : emptySCD;
          // free blob memory after parsing
          if (src.startsWith('blob:')) URL.revokeObjectURL(src);
          validate(this.doc, this.srcName).then(errors => {
            this.log.push(
              ...(errors ?? [`${this.srcName} validated successfully.`])
            );
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
    this.addEventListener('pending-state', async (e: PendingStateEvent) => {
      this.waiting = true;
      this.work.add(e.detail);
      this.workDone = Promise.allSettled(this.work);
      await e.detail.then(console.error, console.info);
      this.work.delete(e.detail);
      this.waiting = this.work.size > 0;
    });
  }

  static styles = css`
    :host {
      height: 100vh;
      width: 100vw;
      margin: 0;
    }

    #file-input {
      display: none;
    }

    mwc-linear-progress {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      z-index: 100;
    }
  `;
}
