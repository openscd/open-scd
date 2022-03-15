import { expect } from '@open-wc/testing';

import { getDataModelChildren } from '../../../../src/wizards/foundation/finder.js';

describe('data model nodes child getter', () => {
  let doc: XMLDocument;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/wizards/fcda.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  it('returns empty array for invalid tag', () => {
    const parent = doc.querySelector('IED')!;
    expect(getDataModelChildren(parent)).to.be.empty;
  });

  it('returns direct children for a Server', () => {
    const parent = doc.querySelector('Server')!;
    expect(getDataModelChildren(parent)).to.not.be.empty;
    expect(getDataModelChildren(parent)[0]).to.have.attribute(
      'inst',
      'CircuitBreaker_CB1'
    );
    expect(getDataModelChildren(parent)[1]).to.have.attribute('inst', 'Meas');
  });

  it('returns direct children for a LDevice', () => {
    const parent = doc.querySelector('LDevice')!;
    expect(getDataModelChildren(parent)).to.not.be.empty;
    expect(getDataModelChildren(parent)[0]).to.have.attribute(
      'lnClass',
      'LLN0'
    );
    expect(getDataModelChildren(parent)[1]).to.have.attribute(
      'lnClass',
      'XCBR'
    );
  });

  it('returns referenced children for LN/LN0', () => {
    const parent = doc.querySelector('LN')!;
    expect(getDataModelChildren(parent).length).to.equal(1);
    expect(getDataModelChildren(parent)[0]).to.have.attribute('name', 'Pos');
  });

  it('returns referenced children for DO', () => {
    const parent = doc.querySelector('DO')!;
    expect(getDataModelChildren(parent).length).to.equal(3);
    expect(getDataModelChildren(parent)[0]).to.have.attribute('name', 'stVal');
    expect(getDataModelChildren(parent)[1]).to.have.attribute('name', 'q');
    expect(getDataModelChildren(parent)[2]).to.have.attribute('name', 't');
  });

  it('returns referenced children for SDO', () => {
    const parent = doc.querySelector('SDO')!;
    expect(getDataModelChildren(parent).length).to.equal(1);
    expect(getDataModelChildren(parent)[0]).to.have.attribute('name', 'cVal');
  });

  it('returns referenced children for DA', () => {
    const parent = doc.querySelector(
      'DOType[id="OpenSCD_CMV_db_i_MagAndAng"]>DA'
    )!;
    expect(getDataModelChildren(parent).length).to.equal(1);
    expect(getDataModelChildren(parent)[0]).to.have.attribute('name', 'mag');
  });

  it('returns referenced children for BDA', () => {
    const parent = doc.querySelector(
      'DAType[id="OpenSCD_Vector_I_w_Ang"]>BDA'
    )!;
    expect(getDataModelChildren(parent).length).to.equal(1);
    expect(getDataModelChildren(parent)[0]).to.have.attribute('name', 'i');
  });

  it('returns empty array for leaf node', () => {
    const parent = doc.querySelector('DOType[id="Dummy.XCBR1.Pos"]>DA')!;
    expect(getDataModelChildren(parent)).to.be.empty;
  });
});
