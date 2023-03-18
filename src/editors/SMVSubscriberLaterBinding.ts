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

/** An editor [[`plugin`]] for Subscribe Later Binding (SMV). */
export default class SMVSubscribeLaterBindingPlugin extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;

  @query('div.container')
  containerElement!: Element;

  @property({ type: Boolean })
  get subscriberView(): boolean {
    return (
      localStorage.getItem(`subscriber-later-binding-smv$change-view`) ===
        'true' ?? false
    );
  }

  set subscriberView(value: boolean) {
    const oldValue = this.subscriberView;
    localStorage.setItem(
      `subscriber-later-binding-smv$change-view`,
      `${value}`
    );
    this.requestUpdate('subscriberView', oldValue);
  }

  /**
   * Add events to allow resizing via mouse or touch input
   */
  // addResizerEvents(): void {
  //   const resizer = <HTMLElement>this.shadowRoot!.querySelector('.resizer');
  //   if (!resizer) return;

  //   const left = <HTMLElement>resizer.previousElementSibling!;
  //   const right = <HTMLElement>resizer.nextElementSibling!;

  //   const inputDownHandler = function (ev: MouseEvent | TouchEvent) {
  //     // How far the mouse/touch input has been moved
  //     let inputX: number;
  //     if ('clientX' in ev) {
  //       inputX = ev.clientX;
  //     } else {
  //       inputX = (<TouchEvent>ev).touches[0].clientX;
  //     }

  //     const leftWidth = left.getBoundingClientRect().width;

  //     const inputMoveHandler = function (evMove: MouseEvent | TouchEvent) {
  //       // How far the mouse/touch input has been moved
  //       let deltaX;
  //       if ('clientX' in evMove) {
  //         deltaX = evMove.clientX - inputX;
  //       } else {
  //         deltaX = (<TouchEvent>evMove).touches[0].clientX - inputX;
  //       }
  //       console.log(deltaX);

  //       const newLeftWidth =
  //         ((leftWidth + deltaX) * 100) /
  //         (<HTMLElement>resizer!.parentNode!).getBoundingClientRect().width;
  //       left.style.width = `${newLeftWidth}%`;

  //       resizer.style.cursor = 'col-resize';
  //       document.body.style.cursor = 'col-resize';

  //       left.style.userSelect = 'none';
  //       left.style.pointerEvents = 'none';

  //       right.style.userSelect = 'none';
  //       right.style.pointerEvents = 'none';
  //     };

  //     const inputUpHandler = function () {
  //       resizer.style.removeProperty('cursor');
  //       document.body.style.removeProperty('cursor');

  //       left.style.removeProperty('user-select');
  //       left.style.removeProperty('pointer-events');

  //       right.style.removeProperty('user-select');
  //       right.style.removeProperty('pointer-events');

  //       // Remove handlers at end
  //       document.removeEventListener('mousemove', inputMoveHandler);
  //       document.removeEventListener('touchmove', inputMoveHandler);

  //       document.removeEventListener('mouseup', inputUpHandler);
  //       document.removeEventListener('touchend', inputUpHandler);
  //     };

  //     // Attach handlers
  //     document.addEventListener('mousemove', inputMoveHandler);
  //     document.addEventListener('mouseup', inputUpHandler);
  //   };

  //   // Attach the handler
  //   resizer.addEventListener('mousedown', inputDownHandler);
  //   resizer.addEventListener('touchstart', inputDownHandler);
  // }

  protected firstUpdated(): void {
    this.addEventListener('change-view', () => {
      this.subscriberView = !this.subscriberView;
      localStorage.setItem(
        'subscriber-later-binding-smv$change-view',
        `${this.subscriberView}`
      );
    });

    // allow resizing of the width of the two elements
    // this.addResizerEvents();
  }

  render(): TemplateResult {
    const controlTag = 'SampledValueControl';
    return this.subscriberView
      ? html`<div class="container" ?subscriberview=${this.subscriberView}>
          <fcda-binding-list
            class="column"
            controlTag="${controlTag}"
            .subscriberview="${this.subscriberView}"
            .includeLaterBinding="${true}"
            .doc="${this.doc}"
          >
          </fcda-binding-list>
          <div class="resizer"></div>
          <extref-later-binding-list-subscriber
            class="column"
            controlTag="${controlTag}"
            .doc="${this.doc}"
          ></extref-later-binding-list-subscriber>
        </div>`
      : html`<div class="container" ?subscriberview=${this.subscriberView}>
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
      width: 100%;
      flex: none;
      /* flex: auto; */
      flex-direction: row-reverse;
    }

    .container[subscriberview] extref-later-binding-list-subscriber.column {
      resize: horizontal;
      /* width: 60%; */
    }

    .container[subscriberview] fcda-binding-list.column {
      flex: none;
      /* flex: 0 1 35%; */
      /* width: 25%; */
      /* flex: 1; */
    }

    .column {
      flex: 50%;
      margin: 0px 6px 0px;
      min-width: 300px;
      height: 100%;
      overflow-y: auto;
    }

    .resizer {
      background-color: var(--mdc-theme-secondary);
      cursor: ew-resize;
      height: 100%;
      width: 2px;
    }
  `;
}
