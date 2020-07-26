import { LitElement, customElement, html, css, property } from 'lit-element';
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
  @property({ type: XMLDocument })
  doc: XMLDocument = document.implementation.createDocument(
    'http://www.iec.ch/61850/2003/SCL',
    'SCL',
    null
  );
  @property({ type: String }) docName = '';

  @property({ type: String }) drawerOpen = false;

  @property({ type: Boolean }) hasPendingChildren = false;
  @property({ type: Number }) _pendingCount = 0;

  firstUpdated(): void {
    this.addEventListener('pending-state', async (e: PendingStateEvent) => {
      this.hasPendingChildren = true;
      this._pendingCount++;
      await e.detail;
      this._pendingCount--;
      this.hasPendingChildren = this._pendingCount > 0;
    });
  }

  openFile(changeEvent: Event): void {
    const executor = (resolve: () => void, reject: () => void) => {
      const reader: FileReader = new FileReader();
      reader.addEventListener('load', () => {
        // FIXME: blocking the main thread makes progress bar not move
        //        but DOMParser is not available in WebWorkers
        this.doc = new DOMParser().parseFromString(
          <string>reader.result,
          'application/xml'
        );
        console.log(this.doc);
        resolve();
      });
      reader.addEventListener('error', reject);
      reader.addEventListener('abort', reject);
      reader.readAsText(
        (<HTMLInputElement | null>changeEvent.target)?.files?.item(0) ??
          new Blob([])
      );
      this.docName =
        (<HTMLInputElement | null>changeEvent.target)?.files?.item(0)?.name ??
        'Oops...';
    };

    this.dispatchEvent(
      new CustomEvent<Promise<void>>('pending-state', {
        composed: true,
        bubbles: true,
        detail: new Promise(executor),
      })
    );
  }

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
      margin: auto;
      z-index: 100;
    }
  `;

  render(): TemplateResult {
    return html`
      <mwc-linear-progress .closed=${!this.hasPendingChildren} indeterminate>
      </mwc-linear-progress>
      <mwc-drawer hasheader type="modal" .open=${this.drawerOpen}>
        <span slot="title">Menu</span>
        <span slot="subtitle">${this.docName}</span>
        <mwc-top-app-bar-fixed slot="appContent">
          <mwc-icon-button
            icon="menu"
            slot="navigationIcon"
            @click=${() =>
              (this.shadowRoot!.querySelector('mwc-drawer')!.open = true)}
          ></mwc-icon-button>
          <div slot="title" id="title">
            ${this.docName}
          </div>
          <mwc-icon-button
            icon="folder_open"
            slot="actionItems"
            @click="${this.selectFile}"
          ></mwc-icon-button>
        </mwc-top-app-bar-fixed>
      </mwc-drawer>
      <input id="file-input" type="file" @change="${this.openFile}" />
    `;
  }
}
