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

/** An editor [[`plugin`]] for editing the `IED` section. */
export default class Communication104Plugin extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property()
  doc!: XMLDocument;

  @query('#byValuesRadio')
  byValuesRadio!: RadioListItem;

  @query('#byNetworkRadio')
  byNetworkRadio!: RadioListItem;

  @query('div[class="container"]')
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
    return html`<div>
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
      <div class="container">
        ${selectedViewCommunication104Plugin == View.VALUES
            ? html`<values-104-container class="row" .doc=${this.doc}></values-104-container>`
            : html`<network-104-container class="row" .doc=${this.doc}></network-104-container>`
        }
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
