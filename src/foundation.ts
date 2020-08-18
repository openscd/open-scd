/** Represents an intended change to an `Element`. */
export type Change = Create | Update | Delete | Move;
export interface Move {
  old: { parent: Element; element: Element };
  new: { parent: Element };
}
export interface Create {
  new: { parent: Element; element: Element };
}
export interface Delete {
  old: { parent: Element; element: Element };
}
export interface Update {
  old: { element: Element };
  new: { element: Element };
}

/** Detail type for `'pending-state'` events. */
export interface PendingState {
  promise: Promise<string>;
}

export type ElementConstructor = new (...args: any[]) => HTMLElement;

declare global {
  interface ElementEventMap {
    ['pending-state']: CustomEvent<PendingState>;
    ['create']: CustomEvent<Create>;
    ['update']: CustomEvent<Update>;
  }
  interface HTMLElement {
    connectedCallback?(): void;
    info?(message: string, ...data: any[]): void;
    warn?(message: string, ...data: any[]): void;
  }
}
