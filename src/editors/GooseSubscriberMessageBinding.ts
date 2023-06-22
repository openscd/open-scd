import {
  css,
  html,
  LitElement,
  property,
  query,
  TemplateResult,
} from 'lit-element';
import { translate } from 'lit-translate';

import '@material/mwc-radio';
import '@material/mwc-formfield';
import { RadioListItem } from '@material/mwc-list/mwc-radio-list-item';

import './subscription/goose/subscriber-list.js';
import './subscription/goose/goose-list.js';
import './subscription/ied-list.js';
import { newViewEvent, View, ViewEvent } from './subscription/foundation.js';

/** Defining view outside the class, which makes it persistent. */
let view: View = View.PUBLISHER;

/** An editor [[`plugin`]] for subscribing IEDs to GOOSE messages. */
export default class GooseSubscriberMessageBindingPlugin extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property()
  doc!: XMLDocument;
  @property({ type: Number })
  editCount = -1;

  @query('#goosePublisherView')
  goosePublisherView!: RadioListItem;

  @query('#gooseSubscriberView')
  gooseSubscriberView!: RadioListItem;

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
      ? this.goosePublisherView.setAttribute('checked', '')
      : this.gooseSubscriberView.setAttribute('checked', '');
  }

  render(): TemplateResult {
    return html`<div>
      <mwc-formfield
        label="${translate('subscription.goose.view.publisherView')}"
      >
        <mwc-radio
          id="goosePublisherView"
          name="view"
          value="goose"
          @click=${() =>
            this.listDiv.dispatchEvent(newViewEvent(View.PUBLISHER))}
        ></mwc-radio>
      </mwc-formfield>
      <mwc-formfield
        label="${translate('subscription.goose.view.subscriberView')}"
      >
        <mwc-radio
          id="gooseSubscriberView"
          name="view"
          value="ied"
          @click=${() =>
            this.listDiv.dispatchEvent(newViewEvent(View.SUBSCRIBER))}
        ></mwc-radio>
      </mwc-formfield>
      <div class="container">
        ${view == View.PUBLISHER
          ? html`<goose-list
              class="row"
              .editCount=${this.editCount}
              .doc=${this.doc}
            ></goose-list>`
          : html`<ied-list
              class="row"
              .editCount=${this.editCount}
              .doc=${this.doc}
              serviceType="goose"
            ></ied-list>`}
        <subscriber-list-goose
          class="row"
          .editCount=${this.editCount}
          .doc=${this.doc}
        ></subscriber-list-goose>
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
