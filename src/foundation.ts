/** Represents a change to some `Element`. */
export type Action = Create | Update | Delete | Move;
/** Represents reparenting of `move.old.element` to `move.new.parent`. */
export interface Move {
  old: { parent: Element; element: Element };
  new: { parent: Element };
  derived?: boolean;
}
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
/** Represents replacement of `update.old.element` by `update.new.element`. */
export interface Update {
  old: { element: Element };
  new: { element: Element };
  derived?: boolean;
}

export function isMove(action: Action): action is Move {
  return (
    (action as Move).old?.parent !== undefined &&
    (action as Move).new?.parent !== undefined &&
    (action as Update).new?.element == undefined
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

/** Returns the inverse of `action`, i.e. an `Action` with opposite effect. */
export function invert(action: Action): Action {
  if (isMove(action))
    return {
      old: { parent: action.new.parent, element: action.old.element },
      new: { parent: action.old.parent },
    };
  else if (isCreate(action))
    return { old: action.new, derived: action.derived };
  else if (isDelete(action))
    return { new: action.old, derived: action.derived };
  else if (isUpdate(action))
    return { new: action.old, old: action.new, derived: action.derived };
  else return action;
}

export type ActionEvent = CustomEvent<Action>;

export function newActionEvent(
  action: Action,
  eventInitDict?: CustomEventInit<Action>
): ActionEvent {
  return new CustomEvent<Action>('action', {
    bubbles: true,
    composed: true,
    detail: action,
    ...eventInitDict,
  });
}

/** Represents some work pending completion, upon which `promise` resolves. */
export interface PendingState {
  promise: Promise<string>;
}

export type PendingStateEvent = CustomEvent<PendingState>;

export function newPendingStateEvent(
  promise: Promise<string>,
  eventInitDict?: CustomEventInit<PendingState>
): PendingStateEvent {
  return new CustomEvent<PendingState>('pending-state', {
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
    ['pending-state']: CustomEvent<PendingState>;
    ['action']: ActionEvent;
  }
  interface HTMLElement {
    connectedCallback?(): void;
    info?(message: string, ...data: any[]): void;
    warn?(message: string, ...data: any[]): void;
  }
}
