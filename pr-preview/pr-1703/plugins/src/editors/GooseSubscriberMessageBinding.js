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
import "../../../_snowpack/pkg/@material/mwc-radio.js";
import "../../../_snowpack/pkg/@material/mwc-formfield.js";
import "./subscription/goose/subscriber-list.js";
import "./subscription/goose/goose-list.js";
import "./subscription/ied-list.js";
import {newViewEvent, View} from "./subscription/foundation.js";
let view = View.PUBLISHER;
export default class GooseSubscriberMessageBindingPlugin extends LitElement {
  constructor() {
    super();
    this.editCount = -1;
    this.addEventListener("view", (evt) => {
      view = evt.detail.view;
      this.requestUpdate();
    });
  }
  firstUpdated() {
    view == View.PUBLISHER ? this.goosePublisherView.setAttribute("checked", "") : this.gooseSubscriberView.setAttribute("checked", "");
  }
  render() {
    return html`<div>
      <mwc-formfield label="${get("subscription.goose.view.publisherView")}">
        <mwc-radio
          id="goosePublisherView"
          name="view"
          value="goose"
          @click=${() => this.listDiv.dispatchEvent(newViewEvent(View.PUBLISHER))}
        ></mwc-radio>
      </mwc-formfield>
      <mwc-formfield label="${get("subscription.goose.view.subscriberView")}">
        <mwc-radio
          id="gooseSubscriberView"
          name="view"
          value="ied"
          @click=${() => this.listDiv.dispatchEvent(newViewEvent(View.SUBSCRIBER))}
        ></mwc-radio>
      </mwc-formfield>
      <div class="container">
        ${view == View.PUBLISHER ? html`<goose-list
              class="row"
              .editCount=${this.editCount}
              .doc=${this.doc}
            ></goose-list>` : html`<ied-list
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
}
GooseSubscriberMessageBindingPlugin.styles = css`
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
__decorate([
  property()
], GooseSubscriberMessageBindingPlugin.prototype, "doc", 2);
__decorate([
  property({type: Number})
], GooseSubscriberMessageBindingPlugin.prototype, "editCount", 2);
__decorate([
  query("#goosePublisherView")
], GooseSubscriberMessageBindingPlugin.prototype, "goosePublisherView", 2);
__decorate([
  query("#gooseSubscriberView")
], GooseSubscriberMessageBindingPlugin.prototype, "gooseSubscriberView", 2);
__decorate([
  query('div[class="container"]')
], GooseSubscriberMessageBindingPlugin.prototype, "listDiv", 2);
