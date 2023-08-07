import { Select } from '@material/mwc-select';
import { TextField } from '@material/mwc-textfield';
import AceEditor from 'ace-custom-element';
import { EditorAction } from '../editing/index.js';
import { WizardSelect } from '../wizard-select.js';
import { WizardTextField } from '../wizard-textfield.js';
import { WizardFactory } from './wizard.js';

export const wizardInputSelector =
  'wizard-textfield, mwc-textfield, ace-editor, mwc-select, wizard-select, wizard-checkbox';

export type WizardInputElement =
  | WizardTextField
  | TextField
  | (AceEditor & {
      checkValidity: () => boolean;
      label: string;
      requestUpdate(name?: PropertyKey, oldValue?: unknown): Promise<unknown>;
    })
  // TODO(c-dinkel): extend component
  | Select
  | WizardSelect;


export type WizardAction = EditorAction | WizardFactory;


/** @returns [[`WizardAction`]]s to dispatch on [[`WizardDialog`]] menu action. */
export type WizardMenuActor = (wizard: Element) => void;


/** User interactions rendered in the wizard-dialog menu */
export interface MenuAction {
  label: string;
  icon?: string;
  action: WizardMenuActor;
}


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

/** Inputs as `TextField`, `Select` or `Checkbox `used in`wizard-dialog` */
export type WizardInput =
  | WizardInputTextField
  | WizardInputSelect
  | WizardInputCheckbox;
