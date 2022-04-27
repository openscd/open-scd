import { LitElement, html, TemplateResult, property, css, state } from 'lit-element';

import '@material/mwc-fab';
import '@material/mwc-radio';
import '@material/mwc-formfield';

import './subscription/subscriber-ied-list-goose.js';
import './subscription/elements/publisher-goose-list.js';
import './subscription/elements/publisher-ied-list.js';
import { translate } from 'lit-translate';

enum View {
  GOOSE,
  IED
}

/** An editor [[`plugin`]] for subscribing IEDs to GOOSE messages using the ABB subscription method. */
export default class SubscriptionABBPlugin extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property()
  doc!: XMLDocument;

  @state()
  view: View = View.GOOSE;

  private setView(view: View) {
    this.view = view;
  }

  render(): TemplateResult {
    return html`<div>
      <mwc-formfield label="${translate('subscription.view.byGooseView')}">
        <mwc-radio
          id="byGooseRadio"
          checked
          name="view"
          value="goose"
          @checked=${() => this.setView(View.GOOSE)}
        ></mwc-radio>
      </mwc-formfield>
      <mwc-formfield label="${translate('subscription.view.byIedView')}">
        <mwc-radio
          id="byIedRadio"
          name="view"
          value="ied"
          @checked=${() => this.setView(View.IED)}
        ></mwc-radio>
      </mwc-formfield>
      <div class="container">
        ${this.view == View.GOOSE
          ? html`<publisher-goose-list class="row" .doc=${this.doc}></publisher-goose-list>`
          : html`<publisher-ied-list class="row" .doc=${this.doc}></publisher-ied-list>`
        }
        <subscriber-ied-list-goose
          class="row"
          .doc=${this.doc}
        ></subscriber-ied-list-goose>
      </div>
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

    mwc-formfield {
      display: block;
    }
  `;
}
