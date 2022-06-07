import { expect } from "@open-wc/testing";

import {
  get104DetailsLine,
  getCdcValue,
  getCtlModel,
  getDaiElement,
  getDaiValue,
  getFullPath,
  hasExpectedValueField,
  hasScaleFields,
  hasUnitMultiplierField,
  PRIVATE_TYPE_104
} from "../../../../../src/editors/protocol104/foundation/foundation.js";

describe('foundation', () => {
  let document: XMLDocument;

  beforeEach(async () => {
    document = await fetch('/test/testfiles/104/valid-addresses.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('get104DetailsLine', () => {
    const FIRST_PRIV_ADDRESS_QUERY = `> Private[type="${PRIVATE_TYPE_104}"] > Address`;

    it('returns basic fields', () => {
      const daiElement = document.querySelector(
        `IED[name="B1"] LN0[lnType="SE_LLN0_SET_V001"] DAI[name="ctlVal"] ${FIRST_PRIV_ADDRESS_QUERY}`);
      expect(get104DetailsLine(daiElement!)).to.be.equals('casdu: 100, ioa: 4, ti: 62');
    });

    it('returns expectedValue fields', () => {
      const daiElement = document.querySelector(
        `IED[name="B1"] LN0[lnType="SE_LLN0_SET_V001"] DOI[name="Health"] DAI[name="stVal"] ${FIRST_PRIV_ADDRESS_QUERY}`);
      expect(get104DetailsLine(daiElement!)).to.be.equals('casdu: 101, ioa: 1, ti: 30, expectedValue: 1');
    });

    it('returns check fields', () => {
      const daiElement = document.querySelector(
        `IED[name="B1"] LN[lnType="SE_GGIO_SET_V002"] DOI[name="DPCSO1"] DAI[name="Check"] ${FIRST_PRIV_ADDRESS_QUERY}`);
      expect(get104DetailsLine(daiElement!)).to.be.equals('casdu: 202, ioa: 3, ti: 58, check: interlocking');
    });

    it('returns inverted fields', () => {
      const daiElement = document.querySelector(
        `IED[name="B1"] LN[lnType="SE_GGIO_SET_V002"] DOI[name="Ind2"] DAI[name="stVal"] ${FIRST_PRIV_ADDRESS_QUERY}`);
      expect(get104DetailsLine(daiElement!)).to.be.equals('casdu: 1, ioa: 2, ti: 30, inverted: true');
    });
  });

  describe('getFullPath', () => {
    it('returns expected value for DOI Element', () => {
      const doiElement = document.querySelector('IED[name="B2"] LN0[lnType="SE_LLN0_SET_default_V001"] DOI[name="Beh"]');
      expect(getFullPath(doiElement!, 'IED')).to.be.equals('AP1 / LD0 / LLN0 / Beh');
    });

    it('returns expected value for DAI Element', () => {
      const daiElement = document.querySelector('IED[name="B1"] LN0[lnType="SE_LLN0_SET_V001"] DAI[name="ctlVal"]');
      expect(getFullPath(daiElement!, 'DOI')).to.be.equals('Oper / ctlVal');
    });
  });

  describe('getCdcValue', () => {
    it('returns expected value for CDC "ENS"', () => {
      // Basic test to see if CDC is retrieved correctly.
      const doiElement = document.querySelector('IED[name="B2"] LN0[lnType="SE_LLN0_SET_default_V001"] DOI[name="Beh"]');
      expect(getCdcValue(doiElement!)).to.be.equals('ENS');
    });
    it('returns expected value for CDC "ENC"', () => {
      // Basic test to see if CDC is retrieved correctly.
      const doiElement = document.querySelector('IED[name="B1"] LN0[lnType="SE_LLN0_SET_V001"] DOI[name="Mod"]');
      expect(getCdcValue(doiElement!)).to.be.equals('ENC');
    });
  });

  describe('getDaiElement', () => {
    it('returns expected DAI Element', () => {
      const doiElement = document.querySelector('IED[name="B1"] LN0[lnType="SE_LLN0_SET_V001"] DOI[name="Mod"]');
      const result = getDaiElement(doiElement!, 'ctlModel');
      expect(result).to.be.not.null;
    });
    it('returns null if DAI not found', () => {
      const doiElement = document.querySelector('IED[name="B1"] LN0[lnType="SE_LLN0_SET_V001"] DOI[name="Mod"]');
      const result = getDaiElement(doiElement!, 'Unknown');
      expect(result).to.be.null;
    });
  });

  describe('getDaiValue', () => {
    it('returns expected DAI Value', () => {
      const doiElement = document.querySelector('IED[name="B1"] LN0[lnType="SE_LLN0_SET_V001"] DOI[name="Mod"]');
      const result = getDaiValue(doiElement!, 'ctlModel');
      expect(result).to.be.equal('direct-with-normal-security');
    });
    it('returns null if DAI not found', () => {
      const doiElement = document.querySelector('IED[name="B1"] LN0[lnType="SE_LLN0_SET_V001"] DOI[name="Mod"]');
      const result = getDaiValue(doiElement!, 'Unknown');
      expect(result).to.be.null;
    });
  });

  describe('getCtlModel', () => {
    it('returns expected CtlModel Value', () => {
      const doiElement = document.querySelector('IED[name="B1"] LN0[lnType="SE_LLN0_SET_V001"] DOI[name="Mod"]');
      const result = getCtlModel(doiElement!);
      expect(result).to.be.equal('direct-with-normal-security');
    });
    it('returns null if DAI not found', () => {
      const doiElement = document.querySelector('IED[name="B1"] LN0[lnType="SE_LLN0_SET_V001"] DOI[name="Beh"]');
      const result = getCtlModel(doiElement!);
      expect(result).to.be.null;
    });
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
