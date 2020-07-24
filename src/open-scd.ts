import { LitElement, customElement, html, css, property } from 'lit-element';
import '@material/mwc-top-app-bar-fixed';
import '@material/mwc-icon-button';

@customElement('open-scd')
export class OpenScd extends LitElement {
  @property({ type: XMLDocument })
  doc: XMLDocument = document.implementation.createDocument(
    'http://www.iec.ch/61850/2003/SCL',
    'SCL',
    null
  );

  @property({ type: String }) docName = '';

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
      <mwc-top-app-bar-fixed>
        <mwc-icon-button icon="menu" slot="navigationIcon"></mwc-icon-button>
        <div slot="title" id="title">${this.docName}</div>
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
        resolve(true);
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
      new CustomEvent('pending-state', {
        composed: true,
        bubbles: true,
        detail: { promise: new Promise(executor) },
      })
    );
  }

  handleClick() {
    (<HTMLElement | null>(
      this.shadowRoot?.querySelector('#file-input')
    ))?.click();
  }
}
