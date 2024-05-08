import {
  CSSResult,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
  css,
} from 'lit-element';

import '@material/mwc-linear-progress';

import { PendingStateDetail } from '@openscd/core/foundation/deprecated/waiter.js';

@customElement('charging-waiter')
export class ChargingWaiter extends LitElement {
  /** Whether the element is currently waiting for some async work. */
  @property({ type: Boolean })
  waiting = false;

  private work: Set<Promise<void>> = new Set();
  /** A promise which resolves once all currently pending work is done. */
  workDone = Promise.allSettled(this.work);

  private async onPendingState(e: CustomEvent<PendingStateDetail>) {
    this.waiting = true;
    this.work.add(e.detail.promise);
    this.workDone = Promise.allSettled(this.work);
    await e.detail.promise.catch(reason => console.warn(reason));
    this.work.delete(e.detail.promise);
    this.waiting = this.work.size > 0;
  }

  constructor() {
    super();
    this.onPendingState = this.onPendingState.bind(this);
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('pending-state', this.onPendingState);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('pending-state', this.onPendingState);
  }

  render(): TemplateResult {
    return html`<slot></slot>
      ${this.waiting ? html`<div class="charging-container"></div>` : ``} `;
  }

  static styles: CSSResult = css`
    .charging-container {
      max-width: 150px;
      width: 100%;
      height: 60px;
      border: 4px solid rgb(236, 39, 72);
      border-radius: 5px;
      position: relative;
      cursor: pointer;
    }

    .charging-container::before {
      content: '';
      position: absolute;
      width: 8px;
      height: 16px;
      background: rgb(236, 39, 72);
      right: -9px;
      top: 50%;
      margin-top: -8px;
      border-radius: 2px;
    }

    .charging-container::after {
      content: '';
      position: absolute;
      top: 5px;
      bottom: 5px;
      left: 5px;
      /* right: 10px; */
      background: rgb(236, 39, 72);
      transition: all 0.3s;
      -webkit-animation: charging 2s steps(5) infinite;
      -moz-animation: charging 2s steps(5) infinite;
      animation: charging 2s steps(5) infinite;
      animation: charging 2s steps(5) infinite;
    }

    .charging-container:hover::after {
      animation-play-state: paused;
    }
    @-webkit-keyframes charging {
      from {
        width: 20%;
      }
      to {
        width: 100%;
      }
    }

    @-moz-keyframes charging {
      from {
        width: 20%;
      }
      to {
        width: 100%;
      }
    }
    @keyframes charging {
      from {
        width: 20%;
      }
      to {
        width: 100%;
      }
    }
  `;
}
