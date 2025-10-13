var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorate = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
import {
  css,
  html,
  LitElement,
  property,
  query
} from "../../../_snowpack/pkg/lit-element.js";
import {get} from "../../../_snowpack/pkg/lit-translate.js";
import "../../../_snowpack/pkg/@material/mwc-fab.js";
import "../../../_snowpack/pkg/@material/mwc-radio.js";
import "../../../_snowpack/pkg/@material/mwc-formfield.js";
import "./protocol104/network-container.js";
import "./protocol104/values-container.js";
import {
  newViewEvent,
  View,
  VIEW_EVENT_NAME
} from "./protocol104/foundation/foundation.js";
let selectedViewProtocol104Plugin = View.VALUES;
export default class Communication104Plugin extends LitElement {
  constructor() {
    super();
    this.editCount = -1;
    this.addEventListener(VIEW_EVENT_NAME, (evt) => {
      selectedViewProtocol104Plugin = evt.detail.view;
      this.requestUpdate();
    });
  }
  firstUpdated() {
    selectedViewProtocol104Plugin == View.VALUES ? this.byValuesRadio.setAttribute("checked", "") : this.byNetworkRadio.setAttribute("checked", "");
  }
  render() {
    return html` <section>
      <div>
        <mwc-formfield label="${get("protocol104.view.valuesView")}">
          <mwc-radio
            id="byValuesRadio"
            name="view"
            value="values"
            @checked=${() => this.listDiv.dispatchEvent(newViewEvent(View.VALUES))}
          ></mwc-radio>
        </mwc-formfield>
        <mwc-formfield label="${get("protocol104.view.networkView")}">
          <mwc-radio
            id="byNetworkRadio"
            name="view"
            value="network"
            @checked=${() => this.listDiv.dispatchEvent(newViewEvent(View.NETWORK))}
          ></mwc-radio>
        </mwc-formfield>
        <div id="containers">
          ${selectedViewProtocol104Plugin == View.VALUES ? html`<values-104-container
                .editCount=${this.editCount}
                .doc=${this.doc}
              ></values-104-container>` : html`<network-104-container
                .editCount=${this.editCount}
                .doc=${this.doc}
              ></network-104-container>`}
        </div>
      </div>
    </section>`;
  }
}
Communication104Plugin.styles = css`
    :host {
      width: 100vw;
    }

    section {
      padding: 8px 12px 16px;
    }
  `;
__decorate([
  property()
], Communication104Plugin.prototype, "doc", 2);
__decorate([
  property({type: Number})
], Communication104Plugin.prototype, "editCount", 2);
__decorate([
  query("#byValuesRadio")
], Communication104Plugin.prototype, "byValuesRadio", 2);
__decorate([
  query("#byNetworkRadio")
], Communication104Plugin.prototype, "byNetworkRadio", 2);
__decorate([
  query("div#containers")
], Communication104Plugin.prototype, "listDiv", 2);
