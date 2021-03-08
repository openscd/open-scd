import { css, html, LitElement, property, TemplateResult } from 'lit-element';
import { styles } from './ied/foundation.js';

export default class IedPlugin extends LitElement {
  @property()
  doc!: XMLDocument;

  render(): TemplateResult {
    return html`<mwc-fab
      extended
      icon="import_export"
      label="trans: Communication Mapping"
    ></mwc-fab>`;
  }

  static styles = css`
    ${styles}
    /* #mapping {
      --mdc-dialog-max-width: 92vw;
    } */
    /* mwc-list {
      display: inline-block;
    } */
    mwc-fab {
      position: fixed;
      bottom: 32px;
      right: 32px;
    }
    :host {
      width: 100vw;
    }
  `;
}
