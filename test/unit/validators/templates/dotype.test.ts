import { expect } from '@open-wc/testing';

import { dOTypeValidator } from '../../../../src/validators/templates/dotype.js';

describe('dotype validator', () => {
  let doc: XMLDocument;
  beforeEach(async () => {
    doc = await fetch('/test/testfiles/validators/datatypetemplateerrors.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  it('return empty array if element is not DOType', async () => {
    const element = doc.querySelector('LNodeType')!;
    const errors = await dOTypeValidator(element);
    expect(errors.length).to.equal(0);
  });

  it('returns empty array if DOType includes all mandatory DAs', async () => {
    const element = doc.querySelector('DOType[id="Dummy.LPHD1.Sim"]')!;
    const errors = await dOTypeValidator(element);
    expect(errors.length).to.equal(0);
  });

  it('return Issues for missing mandatory DA e.g stVal', async () => {
    const element = doc.querySelector('DOType[id="Dummy.LLN0.Health"]')!;
    const errors = await dOTypeValidator(element);
    expect(errors.length).to.equal(1);
    expect(errors[0].title).to.contain('mandatoryChild');
  });

  it('return Issues for missing mandatory DA e.g another stVal', async () => {
    const element = doc.querySelector('DOType[id="Dummy.XCBR1.Pos"]')!;
    const errors = await dOTypeValidator(element);
    expect(errors.length).to.equal(1);
    expect(errors[0].title).to.contain('mandatoryChild');
  });

  it('return Issues for missing mandatory DA e.g ctlModel', async () => {
    const element = doc.querySelector('DOType[id="Dummy.CSWI.Pos1"]')!;
    const errors = await dOTypeValidator(element);
    expect(errors.length).to.equal(1);
    expect(errors[0].title).to.contain('mandatoryChild');
  });

  it('return Issues for missing cdc attribute within DOType', async () => {
    const element = doc.querySelector('DOType[id="Dummy.MissingCDC"]')!;
    const errors = await dOTypeValidator(element);
    expect(errors.length).to.equal(1);
    expect(errors[0].title).to.contain('missingAttribute');
  });

  it('return Issues if CDC definition does not follow NSD ', async () => {
    const element = doc.querySelector('DOType[id="Dummy.XCBR1.badNamPlt"]')!;
    const errors = await dOTypeValidator(element);
    expect(errors.length).to.equal(1);
  });

  it('does not validate CDC to NSD with missing id', async () => {
    const element = doc.querySelector('DOType[id="Dummy.XCBR1.badNamPlt"]')!;
    element.removeAttribute('id');
    const errors = await dOTypeValidator(element);
    expect(errors.length).to.equal(0);
  });

  it('returns Issues from child validation', async () => {
    const element = doc.querySelector('DOType[id="Dummy.badWYE"]')!;
    const errors = await dOTypeValidator(element);
    expect(errors.length).to.equal(1);
  });

  it('returns empty array for non-controllable data objects', async () => {
    const element = doc.querySelector('DOType[id="Dummy.LPHD1.PhyNam"]')!;
    const errors = await dOTypeValidator(element);
    expect(errors.length).to.equal(0);
  });

  it('returns Issues for missing SBOw', async () => {
    const element = doc.querySelector('DOType[id="Dummy.SPC1"]')!;
    const errors = await dOTypeValidator(element);
    expect(errors.length).to.equal(1);
    expect(errors[0].title).to.contain('mandatoryChild');
  });

  it('returns Issues for missing SBO', async () => {
    const element = doc.querySelector('DOType[id="Dummy.SPC2"]')!;
    const errors = await dOTypeValidator(element);
    expect(errors.length).to.equal(1);
    expect(errors[0].title).to.contain('mandatoryChild');
  });

  it('returns Issues for missing Oper', async () => {
    const element = doc.querySelector('DOType[id="Dummy.SPC3"]')!;
    const errors = await dOTypeValidator(element);
    expect(errors.length).to.equal(1);
    expect(errors[0].title).to.contain('mandatoryChild');
  });

  it('returns Issues for missing Cancel', async () => {
    const element = doc.querySelector('DOType[id="Dummy.SPC3"]')!;
    const errors = await dOTypeValidator(element);
    expect(errors.length).to.equal(1);
    expect(errors[0].title).to.contain('mandatoryChild');
  });

  it('does not indicate false positive for status-only DOs', async () => {
    const element = doc.querySelector('DOType[id="Dummy.SPC4"]')!;
    const errors = await dOTypeValidator(element);
    expect(errors.length).to.equal(0);
  });

  it('does not indicate false positive for empty ctlModel', async () => {
    const element = doc.querySelector('DOType[id="Dummy.XCBR1.Pos1"]')!;
    const errors = await dOTypeValidator(element);
    expect(errors.length).to.equal(0);
  });

  it('does not indicate false positive for wrong ctlModel', async () => {
    const element = doc.querySelector('DOType[id="Dummy.SPC4"]')!;
    const val = element.querySelector('Val')!;
    val.innerHTML = 'invalidCtlModel';
    const errors = await dOTypeValidator(element);
    expect(errors.length).to.equal(0);
  });
});
