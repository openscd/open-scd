import { LitElement, TemplateResult } from 'lit-element';
import { directive, Part } from 'lit-html';

import { Select } from '@material/mwc-select';

import { WizardTextField } from './wizard-textfield.js';

export type SimpleAction = Create | Update | Delete | Move;
export type ComplexAction = {
  actions: SimpleAction[];
  title: string;
  derived?: boolean;
};
/** Represents an intended or committed change to some `Element`. */
export type EditorAction = SimpleAction | ComplexAction;
/** Inserts `new.element` to `new.parent` before `new.reference`. */
export interface Create {
  new: { parent: Element; element: Element; reference: Element | null };
  derived?: boolean;
  checkValidity?: () => boolean;
}
/** Removes `old.element` from `old.parent` before `old.reference`. */
export interface Delete {
  old: { parent: Element; element: Element; reference: Element | null };
  derived?: boolean;
  checkValidity?: () => boolean;
}
/** Reparents of `old.element` to `new.parent` before `new.reference`. */
export interface Move {
  old: { parent: Element; element: Element; reference: Element | null };
  new: { parent: Element; reference: Element | null };
  derived?: boolean;
  checkValidity?: () => boolean;
}
/** Replaces `old.element` with `new.element`, keeping element children. */
export interface Update {
  old: { element: Element };
  new: { element: Element };
  derived?: boolean;
  checkValidity?: () => boolean;
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
export function isSimple(action: EditorAction): action is SimpleAction {
  return !((<ComplexAction>action).actions instanceof Array);
}

/** @returns an [[`EditorAction`]] with opposite effect of `action`. */
export function invert(action: EditorAction): EditorAction {
  if (!isSimple(action)) {
    const inverse: ComplexAction = {
      title: action.title,
      derived: action.derived,
      actions: [],
    };
    action.actions.forEach(element =>
      inverse.actions.unshift(<SimpleAction>invert(element))
    );
    return inverse;
  }

  const metaData = {
    derived: action.derived,
    checkValidity: action.checkValidity,
  };
  if (isCreate(action)) return { old: action.new, ...metaData };
  else if (isDelete(action)) return { new: action.old, ...metaData };
  else if (isMove(action))
    return {
      old: {
        parent: action.new.parent,
        element: action.old.element,
        reference: action.new.reference,
      },
      new: { parent: action.old.parent, reference: action.old.reference },
      ...metaData,
    };
  else if (isUpdate(action))
    return { new: action.old, old: action.new, ...metaData };
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

/** @returns a reference to `element` with segments delimited by '/'. */
export function referencePath(element: Element): string {
  let path = '';
  let nextParent: Element | null = element.parentElement;
  while (nextParent?.getAttribute('name')) {
    path = '/' + nextParent.getAttribute('name') + path;
    nextParent = nextParent.parentElement;
  }
  return path;
}

/** @returns a new [[`tag`]] element owned by [[`doc`]]. */
export function createElement(
  doc: Document,
  tag: string,
  attrs: Record<string, string | null>
): Element {
  const element = doc.createElementNS(doc.documentElement.namespaceURI, tag);
  Object.entries(attrs)
    .filter(([_, value]) => value !== null)
    .forEach(([name, value]) => element.setAttribute(name, value!));
  return element;
}

/** A directive rendering its argument `rendered` only if `rendered !== {}`. */
export const ifImplemented = directive(rendered => (part: Part) => {
  if (Object.keys(rendered).length) part.setValue(rendered);
  else part.setValue('');
});

/** Constructor type for defining `LitElement` mixins. */
export type LitElementConstructor = new (...args: any[]) => LitElement;

/** The type returned by `MyMixin(...)` is `Mixin<typeof MyMixin>`. */
export type Mixin<T extends (...args: any[]) => any> = InstanceType<
  ReturnType<T>
>;

const nameStartChar =
  '[:_A-Za-z]|[\u00C0-\u00D6]|[\u00D8-\u00F6]|[\u00F8-\u02FF]|[\u0370-\u037D]' +
  '|[\u037F-\u1FFF]|[\u200C-\u200D]|[\u2070-\u218F]|[\u2C00-\u2FEF]' +
  '|[\u3001-\uD7FF]|[\uF900-\uFDCF]|[\uFDF0-\uFFFD]|[\u{10000}\\-\u{EFFFF}]';
const nameChar =
  nameStartChar + '|[.0-9-]|\u00B7|[\u0300-\u036F]|[\u203F-\u2040]';
const name = nameStartChar + '(' + nameChar + ')*';
const nmToken = '(' + nameChar + ')+';

export const restrictions = {
  string:
    '([\u0009-\u000A]|[\u000D]|[\u0020-\u007E]|[\u0085]|[\u00A0-\uD7FF]' +
    '|[\uE000-\uFFFD]|[\u{10000}\\-\u{10FFFF}])*',
  normalizedString:
    '([\u0020-\u007E]|[\u0085]|[\u00A0-\uD7FF]|[\uE000-\uFFFD]' +
    '|[\u{10000}\\-\u{10FFFF}])*',
  name,
  nmToken,
  names: name + '( ' + name + ')*',
  nmTokens: nmToken + '( ' + nmToken + ')*',
  decimal: '((-|\\+)?([0-9]+(\\.[0-9]*)?|\\.[0-9]+))',
  unsigned: '\\+?([0-9]+(\\.[0-9]*)?|\\.[0-9]+)',
};

/** Sorts selected `ListItem`s to the top and disabled ones to the bottom. */
export function compareNames(a: Element | string, b: Element | string): number {
  if (typeof a === 'string' && typeof b === 'string') return a.localeCompare(b);

  if (typeof a === 'object' && typeof b === 'string')
    return a.getAttribute('name')!.localeCompare(b);

  if (typeof a === 'string' && typeof b === 'object')
    return a.localeCompare(b.getAttribute('name')!);

  if (typeof a === 'object' && typeof b === 'object')
    return a.getAttribute('name')!.localeCompare(b.getAttribute('name')!);

  return 0;
}

/** Throws an error bearing `message`, never returning. */
export function unreachable(message: string): never {
  throw new Error(message);
}

/** @returns the cartesian product of `arrays` */
export function crossProduct<T>(...arrays: T[][]): T[][] {
  return arrays.reduce<T[][]>(
    (a, b) => <T[][]>a.flatMap(d => b.map(e => [d, e].flat())),
    [[]]
  );
}

declare global {
  interface ElementEventMap {
    ['pending-state']: PendingStateEvent;
    ['editor-action']: EditorActionEvent<EditorAction>;
    ['wizard']: WizardEvent;
    ['log']: LogEvent;
  }
}
