import { css, html, LitElement, property, TemplateResult } from 'lit-element';

import { Nsdoc } from '../foundation/nsdoc.js';

import './subscription/fcda-binding-list.js';
import './subscription/later-binding/ext-ref-ln-binding-list.js';

/** An editor [[`plugin`]] for Subscribe Data Binding (SMV). */
export default class SMVSubscribeDataBindingPlugin extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;
  @property({ type: Number })
  editCount = -1;
  @property()
  nsdoc!: Nsdoc;

  render(): TemplateResult {
    return html`<div>
      <div class="container">
        <fcda-binding-list
          class="column"
          controlTag="SampledValueControl"
          .includeLaterBinding="${false}"
          .editCount=${this.editCount}
          .doc="${this.doc}"
        >
        </fcda-binding-list>
        <extref-ln-binding-list
          class="column"
          controlTag="SampledValueControl"
          .editCount=${this.editCount}
          .doc="${this.doc}"
          .nsdoc="${this.nsdoc}"
        >
        </extref-ln-binding-list>
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
}
