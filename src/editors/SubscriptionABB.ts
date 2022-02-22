import { LitElement, html, TemplateResult, property, css } from 'lit-element';

import '@material/mwc-fab';

import './subscription/subscriber-ied-list.js';
import './subscription/publisher-goose-list.js';

/** An editor [[`plugin`]] for subscribing IEDs to GOOSE messages using the ABB subscription method. */
export default class SubscriptionABBPlugin extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property()
  doc!: XMLDocument;

  render(): TemplateResult {
    return html`
    <div id="containerTemplates">
      <section>
        <publisher-goose-list .doc=${this.doc}></publisher-goose-list>
      </section>
      <section>
        <subscriber-ied-list .doc=${this.doc}></subscriber-ied-list>
      </section>
    </div>`;
  }

  static styles = css`
    :host {
      width: 100vw;
    }

    section {
      width: 49vw;
    }

    #containerTemplates {
      display: grid;
      grid-gap: 12px;
      padding: 8px 12px 16px;
      box-sizing: border-box;
      grid-template-columns: repeat(auto-fit, minmax(316px, auto));
    }

    @media (max-width: 387px) {
      #containerTemplates {
        grid-template-columns: repeat(auto-fit, minmax(196px, auto));
      }
    }
  `;
}
