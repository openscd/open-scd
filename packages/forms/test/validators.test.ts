import { expect } from '@open-wc/testing';

import { Validators } from '../src/index.js';

describe('Validators', () => {
  it('should validate required', () => {
    const errorMessage = 'Value is required';
    const requiredValidator = Validators.required(errorMessage);

    // Valid values
    expect(requiredValidator(0, {})).to.be.null;
    expect(requiredValidator(-17, {})).to.be.null;
    expect(requiredValidator(10e23, {})).to.be.null;
    expect(requiredValidator('Abc', {})).to.be.null;
    expect(requiredValidator(' ', {})).to.be.null;
    expect(requiredValidator(true, {})).to.be.null;

    // Invalid values
    expect(requiredValidator(null, {})).to.equal(errorMessage);
    expect(requiredValidator('', {})).to.equal(errorMessage);
    expect(requiredValidator(NaN, {})).to.equal(errorMessage);
    expect(requiredValidator(false, {})).to.equal(errorMessage);
  });

  it('should validate requiredIf', () => {
    const requireCondition = { required: true };
    const errorMessage = 'Value is required';
    const requiredValidator = Validators.requiredIf(() => requireCondition.required, errorMessage);

    // Required if is triggered
    expect(requiredValidator(null, {})).to.equal(errorMessage);
    expect(requiredValidator('', {})).to.equal(errorMessage);
    expect(requiredValidator(NaN, {})).to.equal(errorMessage);
    expect(requiredValidator(false, {})).to.equal(errorMessage);

    expect(requiredValidator(true, {})).to.be.null;
    expect(requiredValidator(0, {})).to.be.null;
    expect(requiredValidator('Abc', {})).to.be.null;

    // Required if is disabled
    requireCondition.required = false;

    expect(requiredValidator(null, {})).to.be.null;
    expect(requiredValidator('', {})).to.be.null;
    expect(requiredValidator(NaN, {})).to.be.null;
    expect(requiredValidator(false, {})).to.be.null;
    expect(requiredValidator(true, {})).to.be.null;
    expect(requiredValidator(0, {})).to.be.null;
    expect(requiredValidator('Abc', {})).to.be.null;
  });
});
