import { html, fixture, expect } from '@open-wc/testing';

import { ValidatingElement } from '../../src/Validating.js';
import './mock-validator.js';

describe('ValidatingElement', () => {
  let element: ValidatingElement;
  let validSCL: XMLDocument;
  let invalidSCL: XMLDocument;
  beforeEach(async () => {
    validSCL = await fetch('/base/test/testfiles/valid.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    invalidSCL = await fetch('/base/test/testfiles/invalidSCL.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    element = <ValidatingElement>(
      await fixture(html`<mock-validator></mock-validator>`)
    );
  });

  it('starts out in a validated state', async () => {
    expect(element).property('validated').to.be.a('Promise');
    expect(await element.validated).to.have.property('valid', true);
  });

  it('validates a valid SCL document', async () => {
    element.validate(validSCL, { fileName: 'valid.scd' });
    expect(await element.validated).to.have.property('valid', true);
  });

  it('does not validate an invalid SCL document', async () => {
    element.validate(invalidSCL, { fileName: 'invalid.scd' });
    expect(await element.validated).to.have.property('valid', false);
  });
});
