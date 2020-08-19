/** Represents an intended change to some `Element`. */
export type Action = Create | Update | Delete | Move;
export interface Move {
  old: { parent: Element; element: Element };
  new: { parent: Element; element: Element };
  derived?: boolean;
}
export interface Create {
  new: { parent: Element; element: Element };
  derived?: boolean;
}
export interface Delete {
  old: { parent: Element; element: Element };
  derived?: boolean;
}
export interface Update {
  old: { element: Element };
  new: { element: Element };
  derived?: boolean;
}

export function isMove(action: Action): action is Move {
  return (
    (action as Move).old?.parent !== undefined &&
    (action as Move).new?.parent !== undefined
  );
}
export function isCreate(action: Action): action is Create {
  return (
    (action as Create).new?.parent !== undefined &&
    (action as Create).new?.element !== undefined &&
    (action as Update).old === undefined
  );
}
export function isDelete(action: Action): action is Delete {
  return (
    (action as Delete).old?.parent !== undefined &&
    (action as Delete).old?.element !== undefined &&
    (action as Update).new === undefined
  );
}
export function isUpdate(action: Action): action is Update {
  return (
    (action as Update).old?.element !== undefined &&
    (action as Update).new?.element !== undefined &&
    (action as Move).old?.parent === undefined &&
    (action as Move).new?.parent === undefined
  );
}

export function invert(action: Action): Action {
  if (isMove(action) || isUpdate(action))
    return { new: action.old, old: action.new, derived: action.derived };
  else if (isCreate(action))
    return { old: action.new, derived: action.derived };
  else if (isDelete(action))
    return { new: action.old, derived: action.derived };
  else return action;
}

/** Detail type for `'pending-state'` events. */
export interface PendingState {
  promise: Promise<string>;
}

export type ElementConstructor = new (...args: any[]) => HTMLElement;

declare global {
  interface ElementEventMap {
    ['pending-state']: CustomEvent<PendingState>;
    ['action']: CustomEvent<Action>;
    ['create']: CustomEvent<Create>;
    ['update']: CustomEvent<Update>;
  }
  interface HTMLElement {
    connectedCallback?(): void;
    info?(message: string, ...data: any[]): void;
    warn?(message: string, ...data: any[]): void;
  }
}
