import {
  css,
  html,
  LitElement,
  property,
  query,
  TemplateResult
} from "lit-element";
import {translate} from "lit-translate";

import '@material/mwc-fab';
import '@material/mwc-radio';
import '@material/mwc-formfield';

import {RadioListItem} from "@material/mwc-list/mwc-radio-list-item";

import './communication104/network-container.js'
import './communication104/values-container.js'

import {
  newViewEvent,
  View,
  VIEW_EVENT_NAME,
  ViewEvent
} from "./communication104/foundation/foundation.js";

/** Defining view outside the class, which makes it persistent. */
let selectedViewCommunication104Plugin: View = View.VALUES;

export default class Communication104Plugin extends LitElement {
  @property()
  doc!: XMLDocument;

  @query('#byValuesRadio')
  byValuesRadio!: RadioListItem;

  @query('#byNetworkRadio')
  byNetworkRadio!: RadioListItem;

  @query('div#containers')
  listDiv!: Element;

  constructor() {
    super();

    this.addEventListener(VIEW_EVENT_NAME, (evt: ViewEvent) => {
      selectedViewCommunication104Plugin = evt.detail.view;
      this.requestUpdate();
    });
  }

  firstUpdated(): void {
    selectedViewCommunication104Plugin == View.VALUES
      ? this.byValuesRadio.setAttribute('checked', '')
      : this.byNetworkRadio.setAttribute('checked', '')
  }

  render(): TemplateResult {
    return html `
      <section>
        <div>
          <mwc-formfield label="${translate('communication104.view.valuesView')}">
            <mwc-radio
              id="byValuesRadio"
              name="view"
              value="values"
              @checked=${() => this.listDiv.dispatchEvent(newViewEvent(View.VALUES))}
            ></mwc-radio>
          </mwc-formfield>
          <mwc-formfield label="${translate('communication104.view.networkView')}">
            <mwc-radio
              id="byNetworkRadio"
              name="view"
              value="network"
              @checked=${() => this.listDiv.dispatchEvent(newViewEvent(View.NETWORK))}
            ></mwc-radio>
          </mwc-formfield>
          <div id="containers">
            ${selectedViewCommunication104Plugin == View.VALUES
                ? html`<values-104-container .doc=${this.doc}></values-104-container>`
                : html`<network-104-container .doc=${this.doc}></network-104-container>`
            }
          </div>
        </div>
      </section>`;
  }

  static styles = css`
    :host {
      width: 100vw;
    }

    section {
      padding: 8px 12px 16px;
    }
 `;
}
