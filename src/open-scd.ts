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

export type PendingStateEvent = CustomEvent<Promise<void>>;

declare global {
  interface ElementEventMap {
    ['pending-state']: PendingStateEvent;
  }
}

@customElement('open-scd')
export class OpenScd extends LitElement {
  /** Represents whether the menu drawer is currently open. */
  @property({ type: Boolean }) menuOpen = false;

  /** The `XMLDocument` representation of the current file. */
  @internalProperty() // does not generate an attribute binding
  doc: XMLDocument = document.implementation.createDocument(
    'http://www.iec.ch/61850/2003/SCL',
    'SCL',
    null
  );
  private currentSrc = '';
  /** The name of the current file. */
  @property({ type: String }) srcName = '';
  /** The current file's URL. `blob:` URLs are *revoked after parsing*! */
  @property({ type: String })
  get src(): string {
    return this.currentSrc;
  }
  set src(value: string) {
    this.currentSrc = value;
    const promise = new Promise<void>(
      (resolve: () => void, reject: () => void) => {
        const reader: FileReader = new FileReader();
        reader.addEventListener('load', () => {
          // FIXME: blocking the main thread makes MWC progress bar not move
          this.doc = new DOMParser().parseFromString(
            <string>reader.result,
            'application/xml'
          );
          // free blob memory after parsing
          if (value.startsWith('blob:')) URL.revokeObjectURL(value);
          resolve();
        });
        reader.addEventListener('error', reject);
        reader.addEventListener('abort', reject);
        fetch(value ?? '').then(res =>
          res.blob().then(b => reader.readAsText(b))
        );
      }
    );

    document.querySelector('open-scd')?.dispatchEvent(
      new CustomEvent<Promise<void>>('pending-state', {
        composed: true,
        bubbles: true,
        detail: promise,
      })
    );
  }

  /** Loads the file selected by input `event.target.files[0]`. */
  private loadFile(event: Event): void {
    this.srcName =
      (<HTMLInputElement | null>event.target)?.files?.item(0)?.name ??
      'untitled';
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
        </mwc-top-app-bar-fixed>
      </mwc-drawer>
      <input id="file-input" type="file" @change="${this.loadFile}" />
    `;
  }

  /** Indicates whether the editor is currently waiting for some async work. */
  @property({ type: Boolean }) waiting = false;
  private work: Set<Promise<void>> = new Set();
  /** A promise which resolves once all currently pending work is done. */
  workDone = Promise.allSettled(this.work);
  private pendingCount = 0;
  firstUpdated(): void {
    this.addEventListener('pending-state', async (e: PendingStateEvent) => {
      this.waiting = true;
      this.pendingCount++;
      this.work.add(e.detail);
      this.workDone = Promise.allSettled(this.work);
      await e.detail;
      this.pendingCount--;
      this.waiting = this.pendingCount > 0;
      this.work.delete(e.detail);
    });
  }
}
