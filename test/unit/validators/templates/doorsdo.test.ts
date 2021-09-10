import { expect } from '@open-wc/testing';
import { dOValidator } from '../../../../src/validators/templates/dosdo.js';

describe('do or sdo validation', () => {
  let doc: XMLDocument;
  let missingNSDref: Element;
  let reference: Element;

  beforeEach(async () => {
    doc = await fetch('/base/test/testfiles/validators/doandsdotestfile.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    missingNSDref = doc.querySelector('LNodeType[id="missNSDref"] > DO')!;

    reference = new DOMParser()
      .parseFromString(
        `<LNClass>
            <DataObject name="NamPlt" type="LPL"/>
        <LNClass>`,
        'application/xml'
      )
      .querySelector('DataObject')!;
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

  it('does not check for CDC validity with missing NSD reference', async () => {
    const errors = await dOValidator(missingNSDref);
    expect(errors.length).to.equal(0);
  });

  it('return if cdc definition of referenced element does not fit NSD', async () => {
    const errors = await dOValidator(missingNSDref, reference);
    expect(errors.length).to.equal(1);
    expect(errors[0].title).to.contain('mandatoryChild');
  });

  it('return empty array for valid DO or SDO', async () => {
    missingNSDref
      .closest('DataTypeTemplates')
      ?.querySelector('DOType')
      ?.setAttribute('cdc', 'LPL');
    const errors = await dOValidator(missingNSDref, reference);
    expect(errors.length).to.equal(0);
  });
});
