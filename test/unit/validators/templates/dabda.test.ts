import { expect } from '@open-wc/testing';

import { dAValidator } from '../../../../src/validators/templates/dabda.js';

describe('da or bda validator', () => {
  let doc: XMLDocument;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/validators/doandsdotestfile.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  it('return Issues when DA type attribute is missing for Struct type', async () => {
    const element = doc.querySelector('DOType[id="missingType1"] > DA')!;
    const errors = await dAValidator(element);
    expect(errors.length).to.equal(1);
    expect(errors[0].title).to.contain('missingAttribute');
  });

  it('return empty array for correct DA type attribute - Struct type', async () => {
    const element = doc.querySelector('DOType[id="existingType1"] > DA')!;
    const errors = await dAValidator(element);
    expect(errors.length).to.equal(0);
  });

  it('return Issues when DA type attribute is missing for Enum type', async () => {
    const element = doc.querySelector('DOType[id="missingType2"] > DA')!;
    const errors = await dAValidator(element);
    expect(errors.length).to.equal(1);
    expect(errors[0].title).to.contain('missingAttribute');
  });

  it('return empty array for correct DA type attribute - Enum type', async () => {
    const element = doc.querySelector('DOType[id="existingType2"] > DA')!;
    const errors = await dAValidator(element);
    expect(errors.length).to.equal(0);
  });

  it('return Issues when DA type reference is missing - Struct type', async () => {
    const element = doc.querySelector('DOType[id="invalidReference1"] > DA')!;
    const errors = await dAValidator(element);
    expect(errors.length).to.equal(1);
    expect(errors[0].title).to.contain('missingReference');
  });

  it('return Issues when DA type reference is missing - Enum type', async () => {
    const element = doc.querySelector('DOType[id="invalidReference2"] > DA')!;
    const errors = await dAValidator(element);
    expect(errors.length).to.equal(1);
    expect(errors[0].title).to.contain('missingReference');
  });

  it('return Issues when BDA type attribute is missing - Struct type', async () => {
    const element = doc.querySelector('DAType[id="missingType1"] > BDA')!;
    const errors = await dAValidator(element);
    expect(errors.length).to.equal(1);
    expect(errors[0].title).to.contain('missingAttribute');
  });

  it('return empty array for correct BDA type attribute - Struct type', async () => {
    const element = doc.querySelector('DAType[id="existingType1"] > BDA')!;
    const errors = await dAValidator(element);
    expect(errors.length).to.equal(0);
  });

  it('return Issues when BDA type attribute is missing for Enum type', async () => {
    const element = doc.querySelector('DAType[id="missingType2"] > BDA')!;
    const errors = await dAValidator(element);
    expect(errors.length).to.equal(1);
    expect(errors[0].title).to.contain('missingAttribute');
  });

  it('return empty array for correct BDA type attribute - Enum type', async () => {
    const element = doc.querySelector('DAType[id="existingType2"] > BDA')!;
    const errors = await dAValidator(element);
    expect(errors.length).to.equal(0);
  });

  it('return Issues when BDA type reference is missing - Struct type', async () => {
    const element = doc.querySelector('DAType[id="invalidReference1"] > BDA')!;
    const errors = await dAValidator(element);
    expect(errors.length).to.equal(1);
    expect(errors[0].title).to.contain('missingReference');
  });

  it('return Issues when BDA type reference is missing - Enum type', async () => {
    const element = doc.querySelector('DAType[id="invalidReference2"] > BDA')!;
    const errors = await dAValidator(element);
    expect(errors.length).to.equal(1);
    expect(errors[0].title).to.contain('missingReference');
  });
});
