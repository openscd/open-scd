import { html, property, TemplateResult } from 'lit-element';

import '@material/mwc-circular-progress-four-color';

import {
  LitElementConstructor,
  Mixin,
  PendingStateDetail,
  ifImplemented,
  newLogEvent,
} from './foundation.js';

export type WaitingElement = Mixin<typeof Waiting>;

export function Waiting<TBase extends LitElementConstructor>(Base: TBase) {
  class WaitingElement extends Base {
    /** Whether the element is currently waiting for some async work. */
    @property({ type: Boolean })
    waiting = false;

    work: Set<Promise<string>> = new Set();
    /** A promise which resolves once all currently pending work is done. */
    workDone = Promise.allSettled(this.work);

    async onPendingState(e: CustomEvent<PendingStateDetail>) {
      this.waiting = true;
      this.work.add(e.detail.promise);
      this.workDone = Promise.allSettled(this.work);
      await e.detail.promise.then(
        msg => this.dispatchEvent(newLogEvent({ kind: 'info', title: msg })),
        msg => this.dispatchEvent(newLogEvent({ kind: 'warning', title: msg }))
      );
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
        <mwc-circular-progress-four-color
          .closed=${!this.waiting}
          indeterminate
        ></mwc-circular-progress-four-color>`;
    }
  }

  return WaitingElement;
}
