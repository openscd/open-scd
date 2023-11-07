import {
  css,
  html,
  LitElement,
  property,
  query,
  TemplateResult,
} from 'lit-element';
import { translate } from 'lit-translate';

import { RadioListItem } from '@material/mwc-list/mwc-radio-list-item.js';

import './subscription/sampledvalues/subscriber-list.js';
import './subscription/sampledvalues/smv-list.js';
import './subscription/ied-list.js';
import { newViewEvent, View, ViewEvent } from './subscription/foundation.js';

/** Defining view outside the class, which makes it persistent. */
let view: View = View.PUBLISHER;

/** An editor [[`plugin`]] for subscribing IEDs to Sampled Values. */
export default class SMVSubscriberMessageBindingPlugin extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property()
  doc!: XMLDocument;
  @property({ type: Number })
  editCount = -1;

  @query('#smvPublisherView')
  smvPublisherView!: RadioListItem;

  @query('#smvSubscriberView')
  smvSubscriberView!: RadioListItem;

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
      ? this.smvPublisherView.setAttribute('checked', '')
      : this.smvSubscriberView.setAttribute('checked', '');
  }

  render(): TemplateResult {
    return html`<div>
      <mwc-formfield
        label="${translate('subscription.smv.view.publisherView')}"
      >
        <mwc-radio
          id="smvPublisherView"
          name="view"
          value="smv"
          @click=${() =>
            this.listDiv.dispatchEvent(newViewEvent(View.PUBLISHER))}
        ></mwc-radio>
      </mwc-formfield>
      <mwc-formfield
        label="${translate('subscription.smv.view.subscriberView')}"
      >
        <mwc-radio
          id="smvSubscriberView"
          name="view"
          value="ied"
          @click=${() =>
            this.listDiv.dispatchEvent(newViewEvent(View.SUBSCRIBER))}
        ></mwc-radio>
      </mwc-formfield>
      <div class="container">
        ${view == View.PUBLISHER
          ? html`<smv-list
              class="row"
              .editCount=${this.editCount}
              .doc=${this.doc}
            ></smv-list>`
          : html`<ied-list
              class="row"
              .editCount=${this.editCount}
              .doc=${this.doc}
              serviceType="smv"
            ></ied-list>`}
        <subscriber-list-smv
          class="row"
          .editCount=${this.editCount}
          .doc=${this.doc}
        ></subscriber-list-smv>
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
