import { html, fixture, expect } from '@open-wc/testing';

import { ValidatingElement } from '../../src/Validating.js';

import { getDocument } from '../data.js';
import './mock-validator.js';

describe('ValidatingElement', () => {
  let element: ValidatingElement;
  beforeEach(async () => {
    element = <ValidatingElement>(
      await fixture(html`<mock-validator></mock-validator>`)
    );
  });

  it('starts out in a validated state', async () => {
    expect(element).property('validated').to.be.a('Promise');
    expect(await element.validated).to.have.property('valid', true);
  });

  it('validates a valid SCL document', async () => {
    element.validate(getDocument(), { fileName: 'valid.scd' });
    expect(await element.validated).to.have.property('valid', true);
  });

  it('does not validate an invalid SCL document', async () => {
    element.validate(getDocument(false), { fileName: 'invalid.scd' });
    expect(await element.validated).to.have.property('valid', false);
  });
});
