import { css, html, LitElement, property, TemplateResult } from 'lit-element';

import './subscription/smv-laterbinding/svc-laterbinding-list.js';

/** An editor [[`plugin`]] for Subscribe Later Binding (SMV). */
export default class SMVSubscribeLaterBindingPlugin extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;

  render(): TemplateResult {
    return html`<div>
      <div class="container">
        <svc-later-binding-list
          class="column"
          .doc=${this.doc}
        ></svc-later-binding-list>
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

    .column {
      flex: 50%;
      margin: 0px 6px 0px;
      min-width: 300px;
      height: 100%;
      overflow-y: scroll;
    }
  `;
}
