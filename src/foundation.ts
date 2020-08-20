/** Represents a change to some `Element`. */
export type Action = Create | Update | Delete | Move;
/** Represents prepending `create.new.element` to `create.new.parent`. */
export interface Create {
  new: { parent: Element; element: Element };
  derived?: boolean;
}
/** Represents removal of `delete.old.element`. */
export interface Delete {
  old: { parent: Element; element: Element };
  derived?: boolean;
}
/** Represents reparenting of `move.old.element` to `move.new.parent`. */
export interface Move {
  old: { parent: Element; element: Element };
  new: { parent: Element };
  derived?: boolean;
}
/** Represents replacement of `update.old.element` by `update.new.element`. */
export interface Update {
  old: { element: Element };
  new: { element: Element };
  derived?: boolean;
}

export function isCreate(action: Action): action is Create {
  return (
    (action as Update).old === undefined &&
    (action as Create).new?.parent !== undefined &&
    (action as Create).new?.element !== undefined
  );
}
export function isDelete(action: Action): action is Delete {
  return (
    (action as Delete).old?.parent !== undefined &&
    (action as Delete).old?.element !== undefined &&
    (action as Update).new === undefined
  );
}
export function isMove(action: Action): action is Move {
  return (
    (action as Move).old?.parent !== undefined &&
    (action as Move).old?.element !== undefined &&
    (action as Move).new?.parent !== undefined &&
    (action as Update).new?.element == undefined
  );
}
export function isUpdate(action: Action): action is Update {
  return (
    (action as Move).old?.parent === undefined &&
    (action as Update).old?.element !== undefined &&
    (action as Move).new?.parent === undefined &&
    (action as Update).new?.element !== undefined
  );
}

export function unreachable(message: string): never {
  throw new Error(message);
}

/** Returns the inverse of `action`, i.e. an `Action` with opposite effect. */
export function invert(action: Action): Action {
  if (isCreate(action)) return { old: action.new, derived: action.derived };
  else if (isDelete(action))
    return { new: action.old, derived: action.derived };
  else if (isMove(action))
    return {
      old: { parent: action.new.parent, element: action.old.element },
      new: { parent: action.old.parent },
    };
  else if (isUpdate(action))
    return { new: action.old, old: action.new, derived: action.derived };
  else return unreachable('Unknown Action type in invert.');
}

export interface ActionDetail<T extends Action> {
  action: T;
}
export type ActionEvent<T extends Action> = CustomEvent<ActionDetail<T>>;

export function newActionEvent<T extends Action>(
  action: T,
  eventInitDict?: CustomEventInit<ActionDetail<T>>
): ActionEvent<T> {
  return new CustomEvent<ActionDetail<T>>('action', {
    bubbles: true,
    composed: true,
    detail: { action },
    ...eventInitDict,
  });
}

/** Represents some work pending completion, upon which `promise` resolves. */
export interface PendingStateDetail {
  promise: Promise<string>;
}

export type PendingStateEvent = CustomEvent<PendingStateDetail>;

export function newPendingStateEvent(
  promise: Promise<string>,
  eventInitDict?: CustomEventInit<PendingStateDetail>
): PendingStateEvent {
  return new CustomEvent<PendingStateDetail>('pending-state', {
    bubbles: true,
    composed: true,
    detail: { promise },
    ...eventInitDict,
  });
}

/** Constructor type for defining `HTMLElement` mixins */
export type ElementConstructor = new (...args: any[]) => HTMLElement;

declare global {
  interface ElementEventMap {
    ['pending-state']: CustomEvent<PendingStateDetail>;
    ['action']: ActionEvent<Action>;
  }
  interface HTMLElement {
    connectedCallback?(): void;
    info?(message: string, ...data: any[]): void;
    warn?(message: string, ...data: any[]): void;
  }
}
