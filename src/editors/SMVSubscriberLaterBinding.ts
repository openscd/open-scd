import { css, html, LitElement, property, TemplateResult } from 'lit-element';

import './subscription/later-binding/fcda-later-binding-list.js';
import './subscription/later-binding/ext-ref-later-binding-list.js';

/** An editor [[`plugin`]] for Subscribe Later Binding (SMV). */
export default class SMVSubscribeLaterBindingPlugin extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;

  render(): TemplateResult {
    return html`<div>
      <div class="container">
        <fcda-later-binding-list
          class="column"
          .doc=${this.doc}
          controlTag="SampledValueControl"
        >
        </fcda-later-binding-list>
        <extref-later-binding-list
          class="column"
          .doc=${this.doc}
          controlTag="SampledValueControl"
        >
        </extref-later-binding-list>
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
