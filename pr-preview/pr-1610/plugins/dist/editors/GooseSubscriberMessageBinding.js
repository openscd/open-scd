import { __decorate } from "../../../_snowpack/pkg/tslib.js";
import { css, html, LitElement, property, query, } from '../../../_snowpack/pkg/lit-element.js';
import { get } from '../../../_snowpack/pkg/lit-translate.js';
import '../../../_snowpack/pkg/@material/mwc-radio.js';
import '../../../_snowpack/pkg/@material/mwc-formfield.js';
import './subscription/goose/subscriber-list.js';
import './subscription/goose/goose-list.js';
import './subscription/ied-list.js';
import { newViewEvent, View } from './subscription/foundation.js';
/** Defining view outside the class, which makes it persistent. */
let view = View.PUBLISHER;
/** An editor [[`plugin`]] for subscribing IEDs to GOOSE messages. */
export default class GooseSubscriberMessageBindingPlugin extends LitElement {
    constructor() {
        super();
        this.editCount = -1;
        this.addEventListener('view', (evt) => {
            view = evt.detail.view;
            this.requestUpdate();
        });
    }
    firstUpdated() {
        view == View.PUBLISHER
            ? this.goosePublisherView.setAttribute('checked', '')
            : this.gooseSubscriberView.setAttribute('checked', '');
    }
    render() {
        return html `<div>
      <mwc-formfield label="${get('subscription.goose.view.publisherView')}">
        <mwc-radio
          id="goosePublisherView"
          name="view"
          value="goose"
          @click=${() => this.listDiv.dispatchEvent(newViewEvent(View.PUBLISHER))}
        ></mwc-radio>
      </mwc-formfield>
      <mwc-formfield label="${get('subscription.goose.view.subscriberView')}">
        <mwc-radio
          id="gooseSubscriberView"
          name="view"
          value="ied"
          @click=${() => this.listDiv.dispatchEvent(newViewEvent(View.SUBSCRIBER))}
        ></mwc-radio>
      </mwc-formfield>
      <div class="container">
        ${view == View.PUBLISHER
            ? html `<goose-list
              class="row"
              .editCount=${this.editCount}
              .doc=${this.doc}
            ></goose-list>`
            : html `<ied-list
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
GooseSubscriberMessageBindingPlugin.styles = css `
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
], GooseSubscriberMessageBindingPlugin.prototype, "doc", void 0);
__decorate([
    property({ type: Number })
], GooseSubscriberMessageBindingPlugin.prototype, "editCount", void 0);
__decorate([
    query('#goosePublisherView')
], GooseSubscriberMessageBindingPlugin.prototype, "goosePublisherView", void 0);
__decorate([
    query('#gooseSubscriberView')
], GooseSubscriberMessageBindingPlugin.prototype, "gooseSubscriberView", void 0);
__decorate([
    query('div[class="container"]')
], GooseSubscriberMessageBindingPlugin.prototype, "listDiv", void 0);
//# sourceMappingURL=GooseSubscriberMessageBinding.js.map