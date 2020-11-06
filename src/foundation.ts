import { LitElement, TemplateResult } from 'lit-element';
import { directive, Part } from 'lit-html';

import { WizardTextField } from './wizard-textfield.js';
import { Select } from '@material/mwc-select';

/** Represents an intended or committed change to some `Element`. */
export type EditorAction = Create | Update | Delete | Move;
/** Inserts `new.element` to `new.parent` before `new.reference`. */
export interface Create {
  new: { parent: Element; element: Element; reference: Element | null };
  derived?: boolean;
}
/** Removes `old.element` from `old.parent` before `old.reference`. */
export interface Delete {
  old: { parent: Element; element: Element; reference: Element | null };
  derived?: boolean;
}
/** Reparents of `old.element` to `new.parent` before `new.reference`. */
export interface Move {
  old: { parent: Element; element: Element; reference: Element | null };
  new: { parent: Element; reference: Element | null };
  derived?: boolean;
}
/** Replaces `old.element` with `new.element`, keeping element children. */
export interface Update {
  old: { element: Element };
  new: { element: Element };
  derived?: boolean;
}

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

/** @returns an [[`EditorAction`]] with opposite effect of `action`. */
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

/** Represents some intended modification of a `Document` being edited. */
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

/** `HTMLElement` with a `close()` method. */
export type CloseableElement = HTMLElement & { close: () => void };

export const wizardInputSelector = 'wizard-textfield, mwc-select';
export type WizardInput = WizardTextField | Select;

/** @returns [[`EditorAction`]]s to dispatch on [[`WizardDialog`]] commit. */
export type WizardAction = (
  inputs: WizardInput[],
  wizard: CloseableElement
) => EditorAction[];

/** @returns the `value` or `maybeValue` of `input` depending on type. */
export function getValue(input: WizardInput): string | null {
  if (input instanceof WizardTextField) return input.maybeValue;
  else return input.value;
}

/** @returns the `multiplier` of `input` if available. */
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

/** If `wizard === null`, close the current wizard, else queue `wizard`. */
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
/** The basic information contained in each [[`LogEntry`]]. */
interface LogDetailBase {
  title: string;
  message?: string;
}
/** The [[`LogEntry`]] for a committed [[`EditorAction`]]. */
export interface CommitDetail extends LogDetailBase {
  kind: 'action';
  action: EditorAction;
}
/** A [[`LogEntry`]] for notifying the user. */
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

/** [[`LogEntry`]]s are timestamped upon being committed to the `history`. */
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

/** A directive rendering its argument `rendered` only if `rendered !== {}`. */
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
