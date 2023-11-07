import { html, property, TemplateResult } from 'lit-element';

import '@material/mwc-linear-progress';

import {
  LitElementConstructor,
  Mixin,
  PendingStateDetail,
  ifImplemented,
} from './foundation.js';

/** Mixin implementing
 * [Pending State](https://github.com/justinfagnani/pending-state-protocol) */
export type WaitingElement = Mixin<typeof Waiting>;

export function Waiting<TBase extends LitElementConstructor>(Base: TBase) {
  class WaitingElement extends Base {
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

    constructor(...args: any[]) {
      super(...args);

      this.onPendingState = this.onPendingState.bind(this);
      this.addEventListener('pending-state', this.onPendingState);
    }

    render(): TemplateResult {
      return html`${ifImplemented(super.render())}
        <mwc-linear-progress
          .closed=${!this.waiting}
          indeterminate
        ></mwc-linear-progress>`;
    }
  }

  return WaitingElement;
}
