import { expect } from '@open-wc/testing';

import { isEmptyObject } from '../../../src/wizards/services.js';

describe('Wizards for SCL element Services', () => {
  it('Simple empty input object is empty', () => {
    const sut = {
      foo: '',
    };

    expect(isEmptyObject(sut)).to.be.true;
  });
  it('Complex empty input object is empty', () => {
    const sut = {
      foo: {
        bar: '',
      },
    };
    expect(isEmptyObject(sut)).to.be.true;
  });
  it('Simple filled input object is not empty', () => {
    const sut = {
      foo: 'bar',
    };
    expect(isEmptyObject(sut)).to.be.false;
  });
  it('Compled filled input object is not empty', () => {
    const sut = {
      foo: {
        bar: 'qux',
      },
    };
    expect(isEmptyObject(sut)).to.be.false;
  });
});
