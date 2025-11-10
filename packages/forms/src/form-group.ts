import { Form, Validator, FormValue, FormErrors } from "./types/types.js"

export class FormGroup {
  private form: Form;
  private _errors: FormErrors = {};

  public get errors(): FormErrors {
    return this._errors;
  }

  constructor(form: Form) {
    this.form = form;
  }

  public validate(): boolean {
    const formValue = this.getFormValue();
    let hasError = false;

    for (const [fieldKey, fieldDefinition] of Object.entries(this.form)) {
      const validators = this.toArray(fieldDefinition.validators);

      const value = formValue[fieldKey];

      const errors: string[] = validators
        .map(v => v(value, formValue))
        .filter(e => e !== null) as string[];

      this.errors[fieldKey] = errors;

      if (errors.length > 0) {
        fieldDefinition.formField.error = true;
        fieldDefinition.formField.errorText = errors[0];

        hasError = true;
      } else {
        fieldDefinition.formField.error = false;
        fieldDefinition.formField.errorText = null;
      }
    }

    return !hasError;
  }

  private getFormValue(): FormValue {
    const formValue: FormValue = {};

    Object.keys(this.form).forEach(key => formValue[key] = this.form[key].formField.value);

    return formValue;
  }

  private toArray(validators: Validator | Validator[] | undefined): Validator[] {
    if (!validators) {
      return [];
    }

    return Array.isArray(validators) ? validators : [ validators ];
  }

}
