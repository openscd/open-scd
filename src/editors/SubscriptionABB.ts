import { LitElement, html, TemplateResult, property } from 'lit-element';

import '@material/mwc-fab';

/** An editor [[`plugin`]] for subscribing IEDs to GOOSE messages using the ABB subscription method. */
export default class SubscriptionABBPlugin extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property()
  doc!: XMLDocument;

  render(): TemplateResult {
    return html`<h1>Ding</h1>`;
  }
}
