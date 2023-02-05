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

/** An editor [[`plugin`]] for Subscribe Later Binding (GOOSE). */
export default class GooseSubscribeLaterBindingPlugin extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;

  @query('div.container')
  containerElement!: Element;

  selectedViewIsPublisher = true;

  protected firstUpdated(): void {
    this.addEventListener('change-view', () => {
      this.selectedViewIsPublisher = !this.selectedViewIsPublisher;
      // TODO: using a classmap or changing the class on div.container is not working for me, see below. Why?
      this.containerElement.classList.toggle('publisher');
      this.requestUpdate();
    });
  }

  render(): TemplateResult {
    // TODO: Why didn't this work.
    // Ways I have tried to implement this:
    // const classes = {
    //   container: true,
    //   publisher: this.selectedViewIsPublisher,
    //   subscriber: !this.selectedViewIsPublisher,
    // };

    // ${classMap(classes)}
    // <!-- class="container${this.selectedViewIsPublisher
    // ? ' publisher'
    // : ' subscriber'}" -->
    //  ${classMap(classes)}
    return html`<div>
      <div class="container publisher">
        <fcda-binding-list
          class="column"
          controlTag="GSEControl"
          .publisherView="${this.selectedViewIsPublisher}"
          .includeLaterBinding="${true}"
          .doc="${this.doc}"
        >
        </fcda-binding-list>
        <extref-later-binding-list
          class="column"
          controlTag="GSEControl"
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
      flex: auto;
      flex-direction: row-reverse;
    }

    .container:not(.publisher) extref-later-binding-list.column {
      flex: auto 1 1;
    }

    .container:not(.publisher) fcda-binding-list.column {
      flex: auto 2 1;
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
