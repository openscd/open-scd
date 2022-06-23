import { LitElement, html, TemplateResult, property, css, query } from 'lit-element';

import '@material/mwc-fab';

import './subscription/sampledvalues/subscriber-list.js';
import './subscription/sampledvalues/smv-list.js';
import './subscription/sampledvalues/ied-list.js';

import { RadioListItem } from '@material/mwc-list/mwc-radio-list-item.js';
import { newViewEvent, View, ViewEvent } from './subscription/foundation.js';
import { translate } from 'lit-translate';

/** Defining view outside the class, which makes it persistent. */
let view: View = View.PUBLISHER;

/** An editor [[`plugin`]] for subscribing IEDs to Sampled Values. */
export default class SampledValuesPlugin extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property()
  doc!: XMLDocument;

  @query('#bySmvRadio')
  bySmvRadio!: RadioListItem;

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
      ? this.bySmvRadio.setAttribute('checked', '')
      : this.byIedRadio.setAttribute('checked', '')
  }

  render(): TemplateResult {
    return html`<div>
      <mwc-formfield label="${translate('sampledValues.view.publisherView')}">
        <mwc-radio
          id="bySmvRadio"
          name="view"
          value="goose"
          @checked=${() => this.listDiv.dispatchEvent(newViewEvent(View.PUBLISHER))}
        ></mwc-radio>
      </mwc-formfield>
      <mwc-formfield label="${translate('sampledValues.view.publisherView')}">
        <mwc-radio
          id="byIedRadio"
          name="view"
          value="ied"
          @checked=${() => this.listDiv.dispatchEvent(newViewEvent(View.SUBSCRIBER))}
        ></mwc-radio>
      </mwc-formfield>
      <div class="container">
        ${view == View.PUBLISHER
          ? html`<smv-list class="row" .doc=${this.doc}></smv-list>`
          : html`<ied-list-smv class="row" .doc=${this.doc}></ied-list-smv>`
        }
        <subscriber-list-smv
          class="row"
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
