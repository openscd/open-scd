import { property } from 'lit-element';
import { LoggingElement } from './LoggingElement.js';

export type PendingStateEvent = CustomEvent<Promise<string>>;
declare global {
  interface ElementEventMap {
    ['pending-state']: PendingStateEvent;
  }
}

export class WaitingElement extends LoggingElement {
  /** Whether the element is currently waiting for some async work. */
  @property({ type: Boolean }) waiting = false;
  protected work: Set<Promise<string>> = new Set();
  /** A promise which resolves once all currently pending work is done. */
  workDone = Promise.allSettled(this.work);
  firstUpdated(): void {
    this.addEventListener('pending-state', async (e: PendingStateEvent) => {
      this.waiting = true;
      this.work.add(e.detail);
      this.workDone = Promise.allSettled(this.work);
      await e.detail.then(this.info, this.warn);
      this.work.delete(e.detail);
      this.waiting = this.work.size > 0;
    });
  }
}
