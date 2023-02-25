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
import './subscription/later-binding/ext-ref-later-binding-list-subscriber.js';

/** An editor [[`plugin`]] for Subscribe Later Binding (GOOSE). */
export default class GooseSubscribeLaterBindingPlugin extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;

  @query('div.container')
  containerElement!: Element;

  @property({ attribute: false })
  subscriberView =
    localStorage.getItem('subscriber-later-binding-goose$change-view') ===
      'true' ?? false;

  protected firstUpdated(): void {
    this.addEventListener('change-view', () => {
      this.subscriberView = !this.subscriberView;
      localStorage.setItem(
        'subscriber-later-binding-goose$change-view',
        `${this.subscriberView}`
      );
    });
  }

  render(): TemplateResult {
    const controlTag = 'GSEControl';
    if (this.subscriberView) {
      console.log('We are the subscriber view');
      return html`<div class="container" ?subscriberview=${this.subscriberView}>
        <fcda-binding-list
          class="column"
          controlTag="${controlTag}"
          .subscriberview="${this.subscriberView}"
          .includeLaterBinding="${true}"
          .doc="${this.doc}"
        >
        </fcda-binding-list>
        <extref-later-binding-list-subscriber
          class="column"
          controlTag="${controlTag}"
          .doc="${this.doc}"
        ></extref-later-binding-list-subscriber>
      </div>`;
    }
    console.log('we are the publisher view');
    return html`<div class="container" ?subscriberview=${this.subscriberView}>
      <fcda-binding-list
        class="column"
        controlTag="${controlTag}"
        .subscriberview="${this.subscriberView}"
        .includeLaterBinding="${true}"
        .doc="${this.doc}"
      >
      </fcda-binding-list>
      <extref-later-binding-list
        class="column"
        controlTag="${controlTag}"
        .includeLaterBinding="${true}"
        .doc="${this.doc}"
      ></extref-later-binding-list>
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

    .container:not(subscriberview) {
      flex-direction: row;
    }

    .container[subscriberview] {
      flex-direction: row-reverse;
    }

    .container[subscriberview] fcda-binding-list.column {
      flex: 0 1 35%;
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
