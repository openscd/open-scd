import {
  css,
  html,
  LitElement,
  property,
  query,
  TemplateResult,
} from 'lit-element';

import './subscription/fcda-binding-list.js';
import './subscription/later-binding/ext-ref-later-binding-list.js';

/** An editor [[`plugin`]] for Subscribe Later Binding (SMV). */
export default class SMVSubscribeLaterBindingPlugin extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;

  @query('div.container')
  containerElement!: Element;

  selectedViewIsPublisher = true;

  protected firstUpdated(): void {
    this.addEventListener('change-view', () => {
      this.selectedViewIsPublisher = !this.selectedViewIsPublisher;
      this.containerElement.classList.toggle('publisher');
      this.requestUpdate();
    });
  }

  render(): TemplateResult {
    return html`<div>
      <div class="container publisher">
        <fcda-binding-list
          class="column"
          controlTag="SampledValueControl"
          .publisherView="${this.selectedViewIsPublisher}"
          .includeLaterBinding="${true}"
          .doc="${this.doc}"
        >
        </fcda-binding-list>
        <extref-later-binding-list
          class="column"
          controlTag="SampledValueControl"
          .publisherView="${this.selectedViewIsPublisher}"
          .includeLaterBinding="${true}"
          .doc="${this.doc}"
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

    .container:not(.publisher) {
      flex-direction: row-reverse;
    }

    .container:not(.publisher) extref-later-binding-list.column {
      flex: 3 1 90%;
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
