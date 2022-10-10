import { css, html, LitElement, property, TemplateResult } from 'lit-element';

import './subscription/fcda-binding-list.js';
import './subscription/later-binding/ext-ref-later-binding-list.js';

export default class GooseSubscribeLaterBindingPlugin extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;

  render(): TemplateResult {
    return html`<div>
      <div class="container">
        <fcda-binding-list
          class="column"
          .doc=${this.doc}
          controlTag="GSEControl"
        >
        </fcda-binding-list>
        <extref-later-binding-list
          class="column"
          controlTag="GSEControl"
          .doc=${this.doc}
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
