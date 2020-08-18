type ElementConstructor = new (...args: any[]) => HTMLElement;

export interface PendingState {
  promise: Promise<string>;
}

declare global {
  interface ElementEventMap {
    ['pending-state']: CustomEvent<PendingState>;
  }
  interface HTMLElement {
    connectedCallback?(): void;
    info?(message: string, ...data: any[]): void;
    warn?(message: string, ...data: any[]): void;
  }
}

export function Waiting<TBase extends ElementConstructor>(Base: TBase) {
  return class WaitingElement extends Base {
    waiting = false;
    protected work: Set<Promise<string>> = new Set();
    /** A promise which resolves once all currently pending work is done. */
    workDone = Promise.allSettled(this.work);
    constructor(...args: any[]) {
      super(...args);
      this.addEventListener(
        'pending-state',
        async (e: CustomEvent<PendingState>) => {
          this.waiting = true;
          this.work.add(e.detail.promise);
          this.workDone = Promise.allSettled(this.work);
          await e.detail.promise.then(
            this.info ?? console.info,
            this.warn ?? console.warn
          );
          this.work.delete(e.detail.promise);
          this.waiting = this.work.size > 0;
        }
      );
    }
  };
}
