import { LitElement, TemplateResult } from 'lit-element';
import { directive, Part } from 'lit-html';

import { List } from '@material/mwc-list';
import { Select } from '@material/mwc-select';
import { TextField } from '@material/mwc-textfield';
import AceEditor from 'ace-custom-element';

import { WizardTextField } from './wizard-textfield.js';
import { WizardSelect } from './wizard-select.js';
import { WizardCheckbox } from './wizard-checkbox.js';

import { EditorAction } from '@openscd/core/foundation/deprecated/editor.js';

export const wizardInputSelector =
  'wizard-textfield, mwc-textfield, ace-editor, mwc-select, wizard-select, wizard-checkbox';
export type WizardInputElement =
  | WizardTextField
  | TextField
  | (AceEditor & {
      checkValidity: () => boolean;
      validityTransform: (
        newValue: string,
        nativeValidity: ValidityState
      ) => ValidityState;
      validationMessage: string;
      validity: ValidityState;
      label: string;
      requestUpdate(name?: PropertyKey, oldValue?: unknown): Promise<unknown>;
    })
  // TODO(c-dinkel): extend component
  | Select
  | WizardSelect;

export type WizardAction = EditorAction | WizardFactory;

/** @returns [[`EditorAction`]]s to dispatch on [[`WizardDialog`]] commit. */
export type WizardActor = (
  inputs: WizardInputElement[],
  wizard: Element,
  list?: List | null
) => WizardAction[];

export function isWizardFactory(
  maybeFactory: WizardAction | Wizard | null
): maybeFactory is WizardFactory {
  return typeof maybeFactory === 'function';
}

/** @returns the validity of `input` depending on type. */
export function checkValidity(input: WizardInputElement): boolean {
  if (input instanceof WizardTextField || input instanceof Select)
    return input.checkValidity();
  else return true;
}

/** reports the validity of `input` depending on type. */
export function reportValidity(input: WizardInputElement): boolean {
  if (input instanceof WizardTextField || input instanceof Select)
    return input.reportValidity();
  else return true;
}

/** @returns the `value` or `maybeValue` of `input` depending on type. */
export function getValue(input: WizardInputElement): string | null {
  if (
    input instanceof WizardTextField ||
    input instanceof WizardSelect ||
    input instanceof WizardCheckbox
  )
    return input.maybeValue;
  else return input.value ?? null;
}

/** @returns the `multiplier` of `input` if available. */
export function getMultiplier(input: WizardInputElement): string | null {
  if (input instanceof WizardTextField) return input.multiplier;
  else return null;
}

/** Inputs as `TextField`, `Select` or `Checkbox `used in`wizard-dialog` */
export type WizardInput =
  | WizardInputTextField
  | WizardInputSelect
  | WizardInputCheckbox;

interface WizardInputBase {
  /** maps attribute key */
  label: string;
  /** maps attribute value */
  maybeValue: string | null;
  /** whether attribute is optional */
  nullable?: boolean;
  /** whether the input shall be disabled */
  disabled?: boolean;
  /** helper text */
  helper?: string;
  /** initial focused element in `wizard-dialog` (once per dialog) */
  dialogInitialFocus?: boolean;
}

interface WizardInputTextField extends WizardInputBase {
  kind: 'TextField';
  /** wether the input might be empty string */
  required?: boolean;
  /** pattern definition from schema */
  pattern?: string;
  /** minimal characters allowed */
  minLength?: number;
  /** maximal characters allowed */
  maxLength?: number;
  /** message text explaining invalid inputs */
  validationMessage?: string;
  /** suffix definition - overwrites unit multiplier definition */
  suffix?: string;
  /** SI unit for specific suffix definition */
  unit?: string;
  /** in comibination with unit defines specific suffix */
  multiplier?: string | null;
  /** array of multipliers allowed for the input */
  multipliers?: (string | null)[];
  /** used for specific input type e.g. number */
  type?: string;
  /** minimal valid number in combination with type number */
  min?: number;
  /** maximal valid number in combination with type number */
  max?: number;
  /** value displaxed when input is nulled */
  default?: string;
}

interface WizardInputSelect extends WizardInputBase {
  kind: 'Select';
  /** selectabled values */
  values: string[];
  /** value displayed with input is nulled */
  default?: string;
  /** message explaining invalid inputs */
  valadationMessage?: string;
}

interface WizardInputCheckbox extends WizardInputBase {
  kind: 'Checkbox';
  /** wether checkbox is checked with nulled input */
  default?: boolean;
}

/** @returns [[`WizardAction`]]s to dispatch on [[`WizardDialog`]] menu action. */
export type WizardMenuActor = (wizard: Element) => void;

/** User interactions rendered in the wizard-dialog menu */
export interface MenuAction {
  label: string;
  icon?: string;
  action: WizardMenuActor;
}

/** Represents a page of a wizard dialog */
export interface WizardPage {
  title: string;
  content?: (TemplateResult | WizardInput)[];
  primary?: {
    icon: string;
    label: string;
    action: WizardActor;
    auto?: boolean;
  };
  secondary?: {
    icon: string;
    label: string;
    action: WizardActor;
  };
  initial?: boolean;
  element?: Element;
  menuActions?: MenuAction[];
}
export type Wizard = WizardPage[];
export type WizardFactory = () => Wizard;

/** If `wizard === null`, close the current wizard, else queue `wizard`. */
export interface WizardDetail {
  wizard: WizardFactory | null;
  subwizard?: boolean;
}
export type WizardEvent = CustomEvent<WizardDetail>;
export function newWizardEvent(
  wizardOrFactory?: Wizard | WizardFactory,
  eventInitDict?: CustomEventInit<Partial<WizardDetail>>
): WizardEvent {
  if (!wizardOrFactory)
    return new CustomEvent<WizardDetail>('wizard', {
      bubbles: true,
      composed: true,
      ...eventInitDict,
      detail: { wizard: null, ...eventInitDict?.detail },
    });

  const wizard = isWizardFactory(wizardOrFactory)
    ? wizardOrFactory
    : () => wizardOrFactory;

  return new CustomEvent<WizardDetail>('wizard', {
    bubbles: true,
    composed: true,
    ...eventInitDict,
    detail: { wizard, ...eventInitDict?.detail },
  });
}

export function newSubWizardEvent(
  wizardOrFactory?: Wizard | WizardFactory
): WizardEvent {
  return newWizardEvent(wizardOrFactory, { detail: { subwizard: true } });
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

declare global {
  interface ElementEventMap {
    ['wizard']: WizardEvent;
  }
}
