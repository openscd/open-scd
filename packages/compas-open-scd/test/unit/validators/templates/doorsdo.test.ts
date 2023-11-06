import { expect } from '@open-wc/testing';

import { dOValidator } from '../../../../src/validators/templates/dosdo.js';

describe('do or sdo validator', () => {
  let doc: XMLDocument;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/validators/doandsdotestfile.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  it('return Issues when DO type attribute is missing', async () => {
    const typelessDo = doc.querySelector('LNodeType[id="typelessDo"] > DO')!;
    const errors = await dOValidator(typelessDo);
    expect(errors.length).to.equal(1);
    expect(errors[0].title).to.contain('missingAttribute');
  });

  it('return Issues when DO type reference is missing', async () => {
    const referencelessDo = doc.querySelector('LNodeType[id="relessDo"] > DO')!;
    const errors = await dOValidator(referencelessDo);
    expect(errors.length).to.equal(1);
    expect(errors[0].title).to.contain('missingReference');
  });

  it('return Issues when SDO type attribute is missing', async () => {
    const typelessSDo = doc.querySelector('LNodeType[id="typelessSDo"] > SDO')!;
    const errors = await dOValidator(typelessSDo);
    expect(errors.length).to.equal(1);
    expect(errors[0].title).to.contain('missingAttribute');
  });

  it('return Issues when SDO type reference is missing', async () => {
    const reflessSDo = doc.querySelector('LNodeType[id="relessSDo"] > SDO')!;
    const errors = await dOValidator(reflessSDo);
    expect(errors.length).to.equal(1);
    expect(errors[0].title).to.contain('missingReference');
  });

  it('return empty array for valid DO or SDO', async () => {
    const correctDo = doc.querySelector('LNodeType[id="correctDo"] > DO')!;
    const errors = await dOValidator(correctDo);
    expect(errors.length).to.equal(0);
  });
});
