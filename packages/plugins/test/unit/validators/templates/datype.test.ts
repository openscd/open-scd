import { expect } from '@open-wc/testing';

import { dATypeValidator } from '../../../../src/validators/templates/datype.js';

describe('datype validator', () => {
  let doc: XMLDocument;
  beforeEach(async () => {
    doc = await fetch('/test/testfiles/validators/datatypetemplateerrors.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  it('return empty array if element is not DAType', async () => {
    const element = doc.querySelector('DOType')!;
    const errors = await dATypeValidator(element);
    expect(errors.length).to.equal(0);
  });
  it('returns empty array if DAType includes all mandatory BDAs', async () => {
    const element = doc.querySelector('DAType[id="Dummy.RangeConfig"]')!;
    const errors = await dATypeValidator(element);
    expect(errors.length).to.equal(0);
  });
  it('return Issues for missing mandatory BDA e.g scaledOffset', async () => {
    const element = doc.querySelector('DAType[id="Dummy.ScaledValueConfig"]')!;
    const errors = await dATypeValidator(element);
    expect(errors.length).to.equal(1);
  });

  it('returns Issues for missing DA within Oper structure', async () => {
    const element = doc.querySelector('DAType[id="Dummy.Operfalse"]')!;
    const errors = await dATypeValidator(element);
    expect(errors.length).to.equal(1);
  });

  it('returns empty array for correct Oper structure', async () => {
    const element = doc.querySelector('DAType[id="Dummy.Oper"]')!;
    const errors = await dATypeValidator(element);
    expect(errors.length).to.equal(0);
  });

  it('returns Issue array for missing DA within SBOw structure', async () => {
    const element = doc.querySelector('DAType[id="Dummy.SBOwfalse"]')!;
    const errors = await dATypeValidator(element);
    expect(errors.length).to.equal(1);
  });

  it('returns empty array for correct SBOw structure', async () => {
    const element = doc.querySelector('DAType[id="Dummy.SBOw"]')!;
    const errors = await dATypeValidator(element);
    expect(errors.length).to.equal(0);
  });

  it('returns Issue array for missing DA within Cancel structure', async () => {
    const element = doc.querySelector('DAType[id="Dummy.Cancelfalse"]')!;
    const errors = await dATypeValidator(element);
    expect(errors.length).to.equal(1);
  });

  it('returns empty array for correct Cancel structure', async () => {
    const element = doc.querySelector('DAType[id="Dummy.Cancel"]')!;
    const errors = await dATypeValidator(element);
    expect(errors.length).to.equal(0);
  });

  it('returns empty array id less DAType', async () => {
    const element = doc.querySelector('DAType[id="Dummy.Cancelfalse"]')!;
    element.removeAttribute('id');
    const errors = await dATypeValidator(element);
    expect(errors.length).to.equal(0);
  });
});
