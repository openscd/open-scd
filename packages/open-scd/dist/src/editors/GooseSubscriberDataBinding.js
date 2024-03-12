import { __decorate } from "tslib";
import { css, html, LitElement, property } from 'lit-element';
import './subscription/fcda-binding-list.js';
import './subscription/later-binding/ext-ref-ln-binding-list.js';
/** An editor [[`plugin`]] for Subscribe Data Binding (GOOSE). */
export default class GooseSubscribeDataBindingPlugin extends LitElement {
    constructor() {
        super(...arguments);
        this.editCount = -1;
    }
    render() {
        return html `<div>
      <div class="container">
        <fcda-binding-list
          class="column"
          controlTag="GSEControl"
          .includeLaterBinding="${false}"
          .editCount=${this.editCount}
          .doc="${this.doc}"
        >
        </fcda-binding-list>
        <extref-ln-binding-list
          class="column"
          controlTag="GSEControl"
          .editCount=${this.editCount}
          .doc="${this.doc}"
          .nsdoc="${this.nsdoc}"
        >
        </extref-ln-binding-list>
      </div>
    </div>`;
    }
}
GooseSubscribeDataBindingPlugin.styles = css `
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
], GooseSubscribeDataBindingPlugin.prototype, "doc", void 0);
__decorate([
    property({ type: Number })
], GooseSubscribeDataBindingPlugin.prototype, "editCount", void 0);
__decorate([
    property()
], GooseSubscribeDataBindingPlugin.prototype, "nsdoc", void 0);
//# sourceMappingURL=GooseSubscriberDataBinding.js.map