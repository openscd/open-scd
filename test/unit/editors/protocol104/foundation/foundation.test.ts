import { expect } from "@open-wc/testing";

import {
  getCdcValue,
  getFullPath,
  hasExpectedValueField,
  hasScaleFields,
  hasUnitMultiplierField
} from "../../../../../src/editors/protocol104/foundation/foundation.js";

describe('foundation', () => {
  let document: XMLDocument;

  beforeEach(async () => {
    document = await fetch('/test/testfiles/104/valid-addresses-case1.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  it('getFullPath returns expected value', () => {
    // Basic test to see if path is created correctly.
    let daiElement = document.querySelector('IED[name="B2"] LN0[lnType="SE_LLN0_SET_default_V001"] DOI[name="Beh"]');
    expect(getFullPath(daiElement!, 'IED')).to.be.equals('AP1 / LD0 / LLN0 / Beh');

    // Test with an LN Element which has a prefix and inst set.
    daiElement = document.querySelector('IED[name="B1"] LN0[lnType="SE_LLN0_SET_V001"] DAI[name="ctlVal"]');
    expect(getFullPath(daiElement!, 'DOI')).to.be.equals('Oper / ctlVal');
  });

  it('getCdcValue returns expected value', () => {
    // Basic test to see if CDC is retrieved correctly.
    let daiElement = document.querySelector('IED[name="B2"] LN0[lnType="SE_LLN0_SET_default_V001"] DOI[name="Beh"]');
    expect(getCdcValue(daiElement!)).to.be.equals('ENS');

    daiElement = document.querySelector('IED[name="B1"] LN0[lnType="SE_LLN0_SET_V001"] DOI[name="Mod"]');
    expect(getCdcValue(daiElement!)).to.be.equals('ENC');
  });

  it('hasExpectedValueField should return expected boolean', () => {
    expect(hasExpectedValueField('ENC', '45')).to.be.true;
    expect(hasExpectedValueField('ENG', '45')).to.be.true;
    expect(hasExpectedValueField('ENS', '30')).to.be.true;
    expect(hasExpectedValueField('INS', '30')).to.be.true;

    expect(hasExpectedValueField('ENG', '49')).to.be.false;
    expect(hasExpectedValueField('ENG', '49')).to.be.false;
    expect(hasExpectedValueField('ENS', '35')).to.be.false;
    expect(hasExpectedValueField('INS', '35')).to.be.false;
    expect(hasExpectedValueField('MV', '35')).to.be.false;
  });

  it('hasUnitMultiplierField should return expected boolean', () => {
    expect(hasUnitMultiplierField('INS', '35')).to.be.true;
    expect(hasUnitMultiplierField('MV', '35')).to.be.true;

    expect(hasUnitMultiplierField('INS', '30')).to.be.false;
  });

  it('hasScaleFields should return expected boolean', () => {
    expect(hasScaleFields('MV', '35')).to.be.true;

    expect(hasScaleFields('INS', '35')).to.be.false;
    expect(hasScaleFields('INS', '30')).to.be.false;
  });
});
