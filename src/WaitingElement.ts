import { property } from 'lit-element';
import { LoggingElement } from './LoggingElement.js';

export interface PendingStateDetail {
  promise: Promise<string>;
}

declare global {
  interface ElementEventMap {
    ['pending-state']: CustomEvent<PendingStateDetail>;
  }
}

export class WaitingElement extends LoggingElement {
  /** Whether the element is currently waiting for some async work. */
  @property({ type: Boolean }) waiting = false;
  protected work: Set<Promise<string>> = new Set();
  /** A promise which resolves once all currently pending work is done. */
  workDone = Promise.allSettled(this.work);
  firstUpdated(): void {
    super.firstUpdated();
    this.addEventListener(
      'pending-state',
      async (e: CustomEvent<PendingStateDetail>) => {
        this.waiting = true;
        this.work.add(e.detail.promise);
        this.workDone = Promise.allSettled(this.work);
        await e.detail.promise.then(this.info, this.warn);
        this.work.delete(e.detail.promise);
        this.waiting = this.work.size > 0;
      }
    );
  }
}
