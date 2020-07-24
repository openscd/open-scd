import { LitElement, customElement, html, css, property } from 'lit-element';
import '@material/mwc-top-app-bar-fixed';
import '@material/mwc-icon-button';
import '@material/mwc-linear-progress';

declare global {
  interface ElementEventMap {
    ['pending-state']: CustomEvent<Promise<void>>;
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
  @property() __hasPendingChildren = false;
  @property() __pendingCount = 0;

  firstUpdated(changedProperties: any) {
    this.addEventListener(
      'pending-state',
      async (e: CustomEvent<Promise<void>>) => {
        this.__hasPendingChildren = true;
        this.__pendingCount++;
        await e.detail;
        this.__pendingCount--;
        this.__hasPendingChildren = this.__pendingCount > 0;
      }
    );
  }

  static styles = css`
    :host {
      height: 100vh;
      width: 100%;
      margin: 0;
    }

    #file-input {
      display: none;
    }
  `;

  render() {
    return html`
      <mwc-linear-progress indeterminate .closed=${!this.__hasPendingChildren}>
      </mwc-linear-progress>
      <mwc-top-app-bar-fixed>
        <mwc-icon-button icon="menu" slot="navigationIcon"></mwc-icon-button>
        <div slot="title" id="title">
          ${this.docName} - ${this.__pendingCount}
        </div>
        <mwc-icon-button
          icon="folder_open"
          slot="actionItems"
          @click="${this.handleClick}"
        ></mwc-icon-button>
      </mwc-top-app-bar-fixed>
      <input id="file-input" type="file" @change="${this.openFile}" />
    `;
  }

  openFile(changeEvent: Event) {
    const executor = (resolve: (v: any) => void, reject: (v: any) => void) => {
      const reader: FileReader = new FileReader();
      reader.addEventListener('load', (e: Event) => {
        this.doc = new DOMParser().parseFromString(
          <string>reader.result,
          'application/xml'
        );
        console.log(this.doc);
        resolve(undefined);
      });
      reader.readAsText(
        (<HTMLInputElement | null>changeEvent.target)?.files?.item(0) ??
          new Blob([])
      );
      this.docName =
        (<HTMLInputElement | null>changeEvent.target)?.files?.item(0)?.name ??
        'Ups!';
    };

    this.dispatchEvent(
      new CustomEvent<Promise<void>>('pending-state', {
        composed: true,
        bubbles: true,
        detail: new Promise(executor),
      })
    );
  }

  handleClick() {
    (<HTMLElement | null>(
      this.shadowRoot?.querySelector('#file-input')
    ))?.click();
  }
}
