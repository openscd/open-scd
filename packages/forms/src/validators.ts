import { FormValue, Validator, Value } from "./types/types.js"

const required: (errorMessage: string) => Validator = (errorMessage: string) => (value, formValue) => {
  if (typeof value === 'number') {
    return isNaN(value) ? errorMessage : null;
  }

  return value ? null : errorMessage;
}

const requiredIf: (predicate: (value: Value, formValue: FormValue) => boolean, errorMessage: string) => Validator = (predicate, errorMessage) => (value, formValue) => {
  const isRequired = predicate(value, formValue);

  if (isRequired) {
    return required(errorMessage)(value, formValue);
  }

  return null;
}

export const Validators = {
  required,
  requiredIf
}
