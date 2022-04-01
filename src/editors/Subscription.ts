import { LitElement, html, TemplateResult, property, css } from 'lit-element';

import '@material/mwc-fab';

import './subscription/subscriber-ied-list-goose.js';
import './subscription/publisher-goose-list.js';
import { styles } from './subscription/foundation.js';

/** An editor [[`plugin`]] for subscribing IEDs to GOOSE messages using the ABB subscription method. */
export default class SubscriptionABBPlugin extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property()
  doc!: XMLDocument;

  render(): TemplateResult {
    return html` <div class="container">
      <publisher-goose-list class="row" .doc=${this.doc}></publisher-goose-list>
      <subscriber-ied-list-goose
        class="row"
        .doc=${this.doc}
      ></subscriber-ied-list-goose>
    </div>`;
  }

  static styles = css`
    :host {
      width: 100vw;
    }

    .container {
      display: flex;
      padding: 8px 6px 16px;
      height: 86vh;
    }

    .row {
      flex: 50%;
      margin: 0px 6px 0px;
      min-width: 300px;
      height: 100%;
      overflow-y: scroll;
    }
  `;
}
