import {
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';

import '@material/mwc-linear-progress';

import { PendingStateDetail } from '../foundation.js';

@customElement('oscd-waiter')
export class OscdWaiter extends LitElement {
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
    this.addEventListener('pending-state', this.onPendingState);
  }

  render(): TemplateResult {
    return html` <slot></slot>
      <mwc-linear-progress .closed=${!this.waiting} indeterminate>
      </mwc-linear-progress>`;
  }
}
