import { expect } from '@open-wc/testing';
import { dOValidator } from '../../../../src/validators/templates/dosdo.js';

describe('do or sdo validation', () => {
  let typelessDo: Element;
  let referencelessDo: Element;
  let missingNSDref: Element;
  let reference: Element;

  beforeEach(async () => {
    typelessDo = new DOMParser()
      .parseFromString(
        `<LNodeType lnClass="LLN=" id="myID">
            <DO name="Name" bType="Struct"/>
        </LNodeType>`,
        'application/xml'
      )
      .querySelector('DO')!;

    referencelessDo = new DOMParser()
      .parseFromString(
        `<LNodeType lnClass="LLN=" id="myID">
            <DO name="Name" bType="Struct" type="refToNowhere"/>
        </LNodeType>`,
        'application/xml'
      )
      .querySelector('DO')!;

    missingNSDref = new DOMParser()
      .parseFromString(
        `<DataTypeTemplates>
            <LNodeType lnClass="LLN=" id="myID">
                <DO name="Name" bType="Struct" type="refToSomewhere"/>
            </LNodeType>
            <DOType id="refToSomewhere" cdc="someWrongCDC"/>
        <DataTypeTemplates>`,
        'application/xml'
      )
      .querySelector('DO')!;

    reference = new DOMParser()
      .parseFromString(
        `<LNClass>
            <DataObject name="NamPlt" type="LPL"/>
        <LNClass>`,
        'application/xml'
      )
      .querySelector('DataObject')!;
  });

  it('return Issues when type attribute is missing', async () => {
    const errors = await dOValidator(typelessDo);
    expect(errors.length).to.equal(1);
    expect(errors[0].title).to.contain('missingAttribute');
  });

  it('return Issues when type reference is missing', async () => {
    const errors = await dOValidator(referencelessDo);
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
