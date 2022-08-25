import { LitElement, property, html, TemplateResult, css } from 'lit-element';

import './subscription/later-binding/fcda-later-binding-list.js';

export default class GooseSubscribeLaterBindingPlugin extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;

  render(): TemplateResult {
    return html`<div>
      <div class="container">
        <fcda-later-binding-list .doc=${this.doc} controlTag="GSEControl">
        </fcda-later-binding-list>
      </div>
    </div>`;
  }

  static styles = css`
    :host {
      width: 100vw;
    }

    .container {
      padding: 8px 6px 16px;
    }
  `;
}
