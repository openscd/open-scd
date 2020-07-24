import { LitElement, customElement, html, css, property } from 'lit-element';
import '@material/mwc-top-app-bar-fixed';
import '@material/mwc-icon-button';

@customElement('open-scd')
export class OpenScd extends LitElement {
  @property({ type: String }) page = 'main';

  @property({ type: String }) title = '';

  @property({ type: XMLDocument }) doc = document.implementation.createDocument(
    'http://www.iec.ch/61850/2003/SCL',
    'SCL',
    null
  );

  static styles = css`
    :host {
      height: 100vh;
      width: 100%;
      margin: 0;
    }
  `;

  render() {
    return html`
      <mwc-top-app-bar-fixed>
        <mwc-icon-button icon="menu" slot="navigationIcon"></mwc-icon-button>
        <mwc-icon-button
          icon="folder_open"
          slot="actionItems"
        ></mwc-icon-button>
      </mwc-top-app-bar-fixed>
    `;
  }
}
