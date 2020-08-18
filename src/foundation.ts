/** Represents an intended change to an `Element`. */
export type Change = Create | Update | Delete | Move;
export interface Move {
  old: { parent: Element; element: Element };
  new: { parent: Element; element: Element };
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

export function isMove(change: Change): change is Move {
  return (
    (change as Move).old?.parent !== undefined &&
    (change as Move).new?.parent !== undefined
  );
}
export function isCreate(change: Change): change is Create {
  return (
    (change as Create).new?.parent !== undefined &&
    (change as Create).new?.element !== undefined &&
    (change as Update).old === undefined
  );
}
export function isDelete(change: Change): change is Delete {
  return (
    (change as Delete).old?.parent !== undefined &&
    (change as Delete).old?.element !== undefined &&
    (change as Update).new === undefined
  );
}
export function isUpdate(change: Change): change is Update {
  return (
    (change as Update).old?.element !== undefined &&
    (change as Update).new?.element !== undefined &&
    (change as Move).old?.parent === undefined &&
    (change as Move).new?.parent === undefined
  );
}

export function invert(change: Change): Change {
  if (isMove(change) || isUpdate(change))
    return { new: change.old, old: change.new };
  else if (isCreate(change)) return { old: change.new };
  else if (isDelete(change)) return { new: change.old };
  else return change;
}

/** Detail type for `'pending-state'` events. */
export interface PendingState {
  promise: Promise<string>;
}

export type ElementConstructor = new (...args: any[]) => HTMLElement;

declare global {
  interface ElementEventMap {
    ['pending-state']: CustomEvent<PendingState>;
    ['action']: CustomEvent<Change>;
    ['create']: CustomEvent<Create>;
    ['update']: CustomEvent<Update>;
  }
  interface HTMLElement {
    connectedCallback?(): void;
    info?(message: string, ...data: any[]): void;
    warn?(message: string, ...data: any[]): void;
  }
}
