import { LitElement, TemplateResult } from 'lit-element';
import { directive, Part } from 'lit-html';

import { WizardTextField } from './wizard-textfield.js';
import { Select } from '@material/mwc-select';

/** Represents a change to some `Element`. */
export type EditorAction = Create | Update | Delete | Move;
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
export function isCreate(action: EditorAction): action is Create {
  return (
    (action as Update).old === undefined &&
    (action as Create).new?.parent !== undefined &&
    (action as Create).new?.element !== undefined &&
    (action as Create).new?.reference !== undefined
  );
}
export function isDelete(action: EditorAction): action is Delete {
  return (
    (action as Delete).old?.parent !== undefined &&
    (action as Delete).old?.element !== undefined &&
    (action as Delete).old?.reference !== undefined &&
    (action as Update).new === undefined
  );
}
export function isMove(action: EditorAction): action is Move {
  return (
    (action as Move).old?.parent !== undefined &&
    (action as Move).old?.element !== undefined &&
    (action as Move).old?.reference !== undefined &&
    (action as Move).new?.parent !== undefined &&
    (action as Update).new?.element == undefined &&
    (action as Move).new?.reference !== undefined
  );
}
export function isUpdate(action: EditorAction): action is Update {
  return (
    (action as Move).old?.parent === undefined &&
    (action as Update).old?.element !== undefined &&
    (action as Move).new?.parent === undefined &&
    (action as Update).new?.element !== undefined
  );
}

/** Returns the inverse of `action`, i.e. an `EditorAction` with opposite effect. */
export function invert(action: EditorAction): EditorAction {
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
  else return unreachable('Unknown EditorAction type in invert.');
}

/** Represents some modification of a `Document` being edited. */
export interface EditorActionDetail<T extends EditorAction> {
  action: T;
}
export type EditorActionEvent<T extends EditorAction> = CustomEvent<
  EditorActionDetail<T>
>;
export function newActionEvent<T extends EditorAction>(
  action: T,
  eventInitDict?: CustomEventInit<EditorActionDetail<T>>
): EditorActionEvent<T> {
  return new CustomEvent<EditorActionDetail<T>>('editor-action', {
    bubbles: true,
    composed: true,
    detail: { action },
    ...eventInitDict,
  });
}

export type CloseableElement = HTMLElement & { close: () => void };

export const wizardInputSelector = 'wizard-textfield, mwc-select';

export type WizardInput = WizardTextField | Select;
export type WizardAction = (
  inputs: WizardInput[],
  wizard: CloseableElement
) => EditorAction[];

export function getValue(input: WizardInput): string | null {
  if (input instanceof WizardTextField) return input.maybeValue;
  else return input.value;
}

export function getMultiplier(input: WizardInput): string | null {
  if (input instanceof WizardTextField) return input.multiplier;
  else return null;
}

/** Represents a page of a wizard dialog */
export interface WizardPage {
  title: string;
  content?: TemplateResult[];
  primary?: {
    icon: string;
    label: string;
    action: WizardAction;
  };
  secondary?: {
    icon: string;
    label: string;
    action: WizardAction;
  };
}
export type Wizard = WizardPage[];

export interface WizardDetail {
  wizard: Wizard | null;
}
export type WizardEvent = CustomEvent<WizardDetail>;
export function newWizardEvent(
  wizard: Wizard | null = null,
  eventInitDict?: CustomEventInit<WizardDetail>
): WizardEvent {
  return new CustomEvent<WizardDetail>('wizard', {
    bubbles: true,
    composed: true,
    detail: { wizard },
    ...eventInitDict,
  });
}

type InfoEntryKind = 'info' | 'warning' | 'error';
interface LogDetailBase {
  title: string;
  message?: string;
}
export interface CommitDetail extends LogDetailBase {
  kind: 'action';
  action: EditorAction;
}
export interface InfoDetail extends LogDetailBase {
  kind: InfoEntryKind;
  cause?: LogEntry;
}

export type LogDetail = InfoDetail | CommitDetail;
export type LogEvent = CustomEvent<LogDetail>;
export function newLogEvent(
  detail: LogDetail,
  eventInitDict?: CustomEventInit<LogDetail>
): LogEvent {
  return new CustomEvent<LogDetail>('log', {
    bubbles: true,
    composed: true,
    detail: detail,
    ...eventInitDict,
  });
}

interface Timestamped {
  time: Date;
}

export type CommitEntry = Timestamped & CommitDetail;
export type InfoEntry = Timestamped & InfoDetail;

export type LogEntry = InfoEntry | CommitEntry;

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

/** Useful `lit-html` directives */
export const ifImplemented = directive(rendered => (part: Part) => {
  if (Object.keys(rendered).length) part.setValue(rendered);
  else part.setValue('');
});

/** Throws an error bearing `message`, never returning. */
export function unreachable(message: string): never {
  throw new Error(message);
}

/** Constructor type for defining `HTMLElement` mixins. */
export type LitElementConstructor = new (...args: any[]) => LitElement;

/** The type returned by `MyMixin(...)` is `Mixin<typeof MyMixin>`. */
export type Mixin<T extends (...args: any[]) => any> = InstanceType<
  ReturnType<T>
>;

declare global {
  interface ElementEventMap {
    ['pending-state']: PendingStateEvent;
    ['editor-action']: EditorActionEvent<EditorAction>;
    ['wizard']: WizardEvent;
    ['log']: LogEvent;
  }
  interface HTMLElement {
    // Extended for other mixins to be able to use `Logging` mixin.
    info?(message: string, ...data: any[]): void;
    warn?(message: string, ...data: any[]): void;
  }
}
