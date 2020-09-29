import { Select } from '@material/mwc-select';
import { TextField } from '@material/mwc-textfield';
import { TemplateResult } from 'lit-element';
import { NullableTextFieldWithUnit } from './nullable-textfield-with-unit.js';

/** Represents a change to some `Element`. */
export type Action = Create | Update | Delete | Move;
/** Represents prepending `create.new.element` to `create.new.parent`. */
export interface Create {
  new: { parent: Element; element: Element; reference: Node | null };
  derived?: boolean;
}
/** Represents removal of `delete.old.element`. */
export interface Delete {
  old: { parent: Element; element: Element; reference: Node | null };
  derived?: boolean;
}
/** Represents reparenting of `move.old.element` to `move.new.parent`. */
export interface Move {
  old: { parent: Element; element: Element; reference: Node | null };
  new: { parent: Element; reference: Node | null };
  derived?: boolean;
}
/** Represents replacement of `update.old.element` by `update.new.element`. */
export interface Update {
  old: { element: Element };
  new: { element: Element };
  derived?: boolean;
}

// typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards
export function isCreate(action: Action): action is Create {
  return (
    (action as Update).old === undefined &&
    (action as Create).new?.parent !== undefined &&
    (action as Create).new?.element !== undefined &&
    (action as Create).new?.reference !== undefined
  );
}
export function isDelete(action: Action): action is Delete {
  return (
    (action as Delete).old?.parent !== undefined &&
    (action as Delete).old?.element !== undefined &&
    (action as Delete).old?.reference !== undefined &&
    (action as Update).new === undefined
  );
}
export function isMove(action: Action): action is Move {
  return (
    (action as Move).old?.parent !== undefined &&
    (action as Move).old?.element !== undefined &&
    (action as Move).old?.reference !== undefined &&
    (action as Move).new?.parent !== undefined &&
    (action as Update).new?.element == undefined &&
    (action as Move).new?.reference !== undefined
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

/** Returns the inverse of `action`, i.e. an `Action` with opposite effect. */
export function invert(action: Action): Action {
  if (isCreate(action)) return { old: action.new, derived: action.derived };
  else if (isDelete(action))
    return { new: action.old, derived: action.derived };
  else if (isMove(action))
    return {
      old: {
        parent: action.new.parent,
        element: action.old.element,
        reference: action.new.reference,
      },
      new: { parent: action.old.parent, reference: action.old.reference },
    };
  else if (isUpdate(action))
    return { new: action.old, old: action.new, derived: action.derived };
  else return unreachable('Unknown Action type in invert.');
}

/** Represents some modification of a `Document` being edited. */
export interface ActionDetail<T extends Action> {
  action: T;
}
export type ActionEvent<T extends Action> = CustomEvent<ActionDetail<T>>;
export function newActionEvent<T extends Action>(
  action: T,
  eventInitDict?: CustomEventInit<ActionDetail<T>>
): ActionEvent<T> {
  return new CustomEvent<ActionDetail<T>>('editor-action', {
    bubbles: true,
    composed: true,
    detail: { action },
    ...eventInitDict,
  });
}

export type WizardInput = TextField | NullableTextFieldWithUnit | Select;

/** Represents a page of a wizard dialog */
export interface WizardPage {
  title: string;
  content?: TemplateResult[];
  primary?: {
    icon: string;
    label: string;
    action: (inputs: WizardInput[]) => Action[];
  };
  secondary?: {
    icon: string;
    label: string;
    action: (inputs: WizardInput[]) => Action[];
  };
}

export type Wizard = WizardPage[];

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

/** Throws an error bearing `message`, never returning. */
export function unreachable(message: string): never {
  throw new Error(message);
}

/** Constructor type for defining `HTMLElement` mixins. */
export type ElementConstructor = new (...args: any[]) => HTMLElement;

/** The type returned by `MyMixin(...)` is `Mixin<typeof MyMixin>`. */
export type Mixin<T extends (...args: any[]) => any> = InstanceType<
  ReturnType<T>
>;

declare global {
  interface ElementEventMap {
    ['pending-state']: PendingStateEvent;
    ['editor-action']: ActionEvent<Action>;
    ['wizard']: CustomEvent<{ wizard: Wizard | null }>;
  }
  interface HTMLElement {
    // Extended for other mixins to be able to use `Logging` mixin.
    info?(message: string, ...data: any[]): void;
    warn?(message: string, ...data: any[]): void;
  }
}
