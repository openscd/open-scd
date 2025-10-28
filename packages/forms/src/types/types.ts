export type Value = null | string | number | boolean;

// Interface to be usable with material form fields such as MdTextField, MdSelect etc
export interface FormField {
  value: Value;
  error: boolean;
  errorText: string | null;
}

export interface Validator {
  (value: Value, formValue: { [key: string]: Value }): null | string;
}

export interface FormFieldDefinition {
  formField: FormField,
  validators?: Validator | Validator[]
}

export interface Form {
  [key: string]: FormFieldDefinition
}

export interface FormValue {
  [key: string]: Value;
}

export interface FormErrors {
  [key: string]: string[];
}
