import { __decorate } from "../../../_snowpack/pkg/tslib.js";
import { css, html, LitElement, property, query, } from '../../../_snowpack/pkg/lit-element.js';
import { get } from '../../../_snowpack/pkg/lit-translate.js';
import './subscription/sampledvalues/subscriber-list.js';
import './subscription/sampledvalues/smv-list.js';
import './subscription/ied-list.js';
import { newViewEvent, View } from './subscription/foundation.js';
/** Defining view outside the class, which makes it persistent. */
let view = View.PUBLISHER;
/** An editor [[`plugin`]] for subscribing IEDs to Sampled Values. */
export default class SMVSubscriberMessageBindingPlugin extends LitElement {
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
            ? this.smvPublisherView.setAttribute('checked', '')
            : this.smvSubscriberView.setAttribute('checked', '');
    }
    render() {
        return html `<div>
      <mwc-formfield label="${get('subscription.smv.view.publisherView')}">
        <mwc-radio
          id="smvPublisherView"
          name="view"
          value="smv"
          @click=${() => this.listDiv.dispatchEvent(newViewEvent(View.PUBLISHER))}
        ></mwc-radio>
      </mwc-formfield>
      <mwc-formfield label="${get('subscription.smv.view.subscriberView')}">
        <mwc-radio
          id="smvSubscriberView"
          name="view"
          value="ied"
          @click=${() => this.listDiv.dispatchEvent(newViewEvent(View.SUBSCRIBER))}
        ></mwc-radio>
      </mwc-formfield>
      <div class="container">
        ${view == View.PUBLISHER
            ? html `<smv-list
              class="row"
              .editCount=${this.editCount}
              .doc=${this.doc}
            ></smv-list>`
            : html `<ied-list
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
}
SMVSubscriberMessageBindingPlugin.styles = css `
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
], SMVSubscriberMessageBindingPlugin.prototype, "doc", void 0);
__decorate([
    property({ type: Number })
], SMVSubscriberMessageBindingPlugin.prototype, "editCount", void 0);
__decorate([
    query('#smvPublisherView')
], SMVSubscriberMessageBindingPlugin.prototype, "smvPublisherView", void 0);
__decorate([
    query('#smvSubscriberView')
], SMVSubscriberMessageBindingPlugin.prototype, "smvSubscriberView", void 0);
__decorate([
    query('div[class="container"]')
], SMVSubscriberMessageBindingPlugin.prototype, "listDiv", void 0);
//# sourceMappingURL=SMVSubscriberMessageBinding.js.map