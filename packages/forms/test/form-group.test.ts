import { expect } from '@open-wc/testing';

import { FormGroup, Validator, Validators } from '../src/index.js';
import { MockFormField } from './mocks/mock-form-fields.js';


describe('FormGroup', () => {
  it('should validate if there are no validators', () => {
    const formField = new MockFormField();
    const formGroup = new FormGroup({
      name: { formField }
    });

    const isValid = formGroup.validate();
    
    expect(isValid).to.be.true;
  });

  it('should validate and set error and errorMessage on the appropriate form field', () => {
    const nameField = new MockFormField();
    const townField = new MockFormField();
    const formGroup = new FormGroup({
      name: { formField: nameField },
      town: { formField: townField, validators: Validators.required('Town required') }
    });

    const isValid = formGroup.validate();
    
    expect(isValid).to.be.false;
    expect(nameField.error).to.be.false;
    expect(nameField.errorText).to.be.null;
    expect(townField.error).to.be.true;
    expect(townField.errorText).to.equal('Town required');
  });

  it('should validate default and custom validators', () => {
    const nameField = new MockFormField();
    const startsWithB: Validator = (v) => {
      const isValid = typeof v === 'string' && v.startsWith('B');
      return isValid ? null : 'Must start with B';
    }

    const formGroup = new FormGroup({
      name: { formField: nameField, validators: [ Validators.required('Name required'), startsWithB ] }
    });

    let isValid = formGroup.validate();
    expect(isValid).to.be.false;
    expect(nameField.errorText).to.equal('Name required');

    nameField.value = 'A invalid value';

    isValid = formGroup.validate();
    expect(isValid).to.be.false;
    expect(nameField.errorText).to.equal('Must start with B');

    nameField.value = 'B is a valid value';

    isValid = formGroup.validate();
    expect(isValid).to.be.true;
    expect(nameField.errorText).to.be.null;
  });
});
