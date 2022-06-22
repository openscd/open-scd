import { LitElement, html, TemplateResult, property, css, query } from 'lit-element';

import '@material/mwc-fab';
import '@material/mwc-radio';
import '@material/mwc-formfield';

import './subscription/goose/subscriber-list.js';
import './subscription/goose/goose-list.js';
import './subscription/goose/ied-list.js';

import { translate } from 'lit-translate';
import { RadioListItem } from '@material/mwc-list/mwc-radio-list-item';
import { newViewEvent, View, ViewEvent } from './subscription/foundation.js';

/** Defining view outside the class, which makes it persistent. */
let view: View = View.PUBLISHER;

/** An editor [[`plugin`]] for subscribing IEDs to GOOSE messages using the ABB subscription method. */
export default class SubscriptionABBPlugin extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property()
  doc!: XMLDocument;

  @query('#byGooseRadio')
  byGooseRadio!: RadioListItem;

  @query('#byIedRadio')
  byIedRadio!: RadioListItem;

  @query('div[class="container"]')
  listDiv!: Element;

  constructor() {
    super();
    this.addEventListener('view', (evt: ViewEvent) => {
      view = evt.detail.view;
      this.requestUpdate();
    });
  }

  firstUpdated(): void {
    view == View.PUBLISHER
      ? this.byGooseRadio.setAttribute('checked', '')
      : this.byIedRadio.setAttribute('checked', '')
  }

  render(): TemplateResult {
    return html`<div>
      <mwc-formfield label="${translate('subscription.view.publisherView')}">
        <mwc-radio
          id="byGooseRadio"
          name="view"
          value="goose"
          @checked=${() => this.listDiv.dispatchEvent(newViewEvent(View.PUBLISHER))}
        ></mwc-radio>
      </mwc-formfield>
      <mwc-formfield label="${translate('subscription.view.subscriberView')}">
        <mwc-radio
          id="byIedRadio"
          name="view"
          value="ied"
          @checked=${() => this.listDiv.dispatchEvent(newViewEvent(View.SUBSCRIBER))}
        ></mwc-radio>
      </mwc-formfield>
      <div class="container">
        ${view == View.PUBLISHER
          ? html`<goose-list class="row" .doc=${this.doc}></goose-list>`
          : html`<ied-list-goose class="row" .doc=${this.doc}></ied-list-goose>`
        }
        <subscriber-list
          class="row"
          .doc=${this.doc}
        ></subscriber-list>
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
  `;
}
