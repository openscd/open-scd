import { __decorate } from "tslib";
import { css, html, LitElement, property } from 'lit-element';
import './subscription/fcda-binding-list.js';
import './subscription/later-binding/ext-ref-later-binding-list.js';
/** An editor [[`plugin`]] for Subscribe Later Binding (SMV). */
export default class SMVSubscribeLaterBindingPlugin extends LitElement {
    constructor() {
        super(...arguments);
        this.editCount = -1;
    }
    render() {
        return html `<div>
      <div class="container">
        <fcda-binding-list
          class="column"
          controlTag="SampledValueControl"
          .includeLaterBinding="${true}"
          .editCount=${this.editCount} .doc="${this.doc}"
        >
        </fcda-binding-list>
        <extref-later-binding-list
          class="column"
          controlTag="SampledValueControl"
          .editCount=${this.editCount} .doc="${this.doc}"
        >
        </extref-later-binding-list>
      </div>
    </div>`;
    }
}
SMVSubscribeLaterBindingPlugin.styles = css `
    :host {
      width: 100vw;
    }

    .container {
      display: flex;
      padding: 8px 6px 16px;
      height: calc(100vh - 136px);
    }

    .column {
      flex: 50%;
      margin: 0px 6px 0px;
      min-width: 300px;
      height: 100%;
      overflow-y: auto;
    }
  `;
__decorate([
    property({ attribute: false })
], SMVSubscribeLaterBindingPlugin.prototype, "doc", void 0);
__decorate([
    property({ type: Number })
], SMVSubscribeLaterBindingPlugin.prototype, "editCount", void 0);
//# sourceMappingURL=SMVSubscriberLaterBinding.js.map