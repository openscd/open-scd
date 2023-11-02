import { expect } from '@open-wc/testing';

import {
  get104DetailsLine,
  getCdcValueFromDOIElement,
  getCtlModel,
  getDaElementByDaiElement,
  getDaiElement,
  getDaiValue,
  getDoElement,
  getEnumOrds,
  getEnumVal,
  getFullPath,
  getTypeAttribute,
  isEnumDataAttribute,
} from '../../../../../src/editors/protocol104/foundation/foundation.js';
import { PROTOCOL_104_PRIVATE } from '../../../../../src/editors/protocol104/foundation/private.js';

describe('foundation', () => {
  let doc: XMLDocument;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/104/valid-addresses.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('get104DetailsLine', () => {
    const FIRST_PRIV_ADDRESS_QUERY = `:scope > Private[type="${PROTOCOL_104_PRIVATE}"] > Address`;

    it('returns basic fields', () => {
      const daiElement = doc.querySelector(
        `IED[name="B1"] LN0[lnType="SE_LLN0_SET_V001"] DAI[name="ctlVal"]`
      );
      const addressElement = daiElement!.querySelector(
        FIRST_PRIV_ADDRESS_QUERY
      );
      expect(get104DetailsLine(daiElement!, addressElement!)).to.be.equal(
        'casdu: 100, ioa: 4, ti: 62'
      );
    });

    it('returns expectedValue fields', () => {
      const daiElement = doc.querySelector(
        `IED[name="B1"] LN0[lnType="SE_LLN0_SET_V001"] DOI[name="Health"] DAI[name="stVal"]`
      );
      const addressElement = daiElement!.querySelector(
        FIRST_PRIV_ADDRESS_QUERY
      );
      expect(get104DetailsLine(daiElement!, addressElement!)).to.be.equal(
        'casdu: 101, ioa: 1, ti: 30, expectedValue: 1 (Ok)'
      );
    });

    it('returns check fields', () => {
      const daiElement = doc.querySelector(
        `IED[name="B1"] LN[lnType="SE_GGIO_SET_V002"] DOI[name="DPCSO1"] DAI[name="Check"]`
      );
      const addressElement = daiElement!.querySelector(
        FIRST_PRIV_ADDRESS_QUERY
      );
      expect(get104DetailsLine(daiElement!, addressElement!)).to.be.equal(
        'casdu: 202, ioa: 3, ti: 58, check: interlocking'
      );
    });

    it('returns inverted fields', () => {
      const daiElement = doc.querySelector(
        `IED[name="B1"] LN[lnType="SE_GGIO_SET_V002"] DOI[name="Ind2"] DAI[name="stVal"]`
      );
      const addressElement = daiElement!.querySelector(
        FIRST_PRIV_ADDRESS_QUERY
      );
      expect(get104DetailsLine(daiElement!, addressElement!)).to.be.equal(
        'casdu: 1, ioa: 2, ti: 30, inverted: true'
      );
    });
  });

  describe('getTypeAttribute', () => {
    it('expect the correct value of the type attribute', () => {
      const doElement = doc.querySelector(
        'LNodeType[id="SE_GGIO_SET_V002"] > DO[name="Beh"]'
      )!;
      expect(getTypeAttribute(doElement)).to.be.equal('SE_ENS_V001');
    });
  });

  describe('getFullPath', () => {
    it('returns expected value for DOI Element', () => {
      const doiElement = doc.querySelector(
        'IED[name="B2"] LN0[lnType="SE_LLN0_SET_default_V001"] DOI[name="Beh"]'
      );
      expect(getFullPath(doiElement!, 'IED')).to.be.equal(
        'AP1 / LD0 / LLN0 / Beh'
      );
    });

    it('returns expected value for DAI Element', () => {
      const daiElement = doc.querySelector(
        'IED[name="B1"] LN0[lnType="SE_LLN0_SET_V001"] DAI[name="ctlVal"]'
      );
      expect(getFullPath(daiElement!, 'DOI')).to.be.equal('Oper / ctlVal');
    });
  });

  describe('getCdcValue', () => {
    it('returns expected value for CDC "ENS"', () => {
      // Basic test to see if CDC is retrieved correctly.
      const doiElement = doc.querySelector(
        'IED[name="B2"] LN0[lnType="SE_LLN0_SET_default_V001"] DOI[name="Beh"]'
      );
      expect(getCdcValueFromDOIElement(doiElement!)).to.be.equal('ENS');
    });

    it('returns expected value for CDC "ENC"', () => {
      // Basic test to see if CDC is retrieved correctly.
      const doiElement = doc.querySelector(
        'IED[name="B1"] LN0[lnType="SE_LLN0_SET_V001"] DOI[name="Mod"]'
      );
      expect(getCdcValueFromDOIElement(doiElement!)).to.be.equal('ENC');
    });
  });

  describe('getDaiElement', () => {
    it('returns expected DAI Element', () => {
      const doiElement = doc.querySelector(
        'IED[name="B1"] LN0[lnType="SE_LLN0_SET_V001"] DOI[name="Mod"]'
      );
      const result = getDaiElement(doiElement!, 'ctlModel');
      expect(result).to.be.not.null;
    });

    it('returns null if DAI not found', () => {
      const doiElement = doc.querySelector(
        'IED[name="B1"] LN0[lnType="SE_LLN0_SET_V001"] DOI[name="Mod"]'
      );
      const result = getDaiElement(doiElement!, 'Unknown');
      expect(result).to.be.null;
    });
  });

  describe('getDaiValue', () => {
    it('returns expected DAI Value', () => {
      const doiElement = doc.querySelector(
        'IED[name="B1"] LN0[lnType="SE_LLN0_SET_V001"] DOI[name="Mod"]'
      );
      const result = getDaiValue(doiElement!, 'ctlModel');
      expect(result).to.be.equal('direct-with-normal-security');
    });

    it('returns null if DAI not found', () => {
      const doiElement = doc.querySelector(
        'IED[name="B1"] LN0[lnType="SE_LLN0_SET_V001"] DOI[name="Mod"]'
      );
      const result = getDaiValue(doiElement!, 'Unknown');
      expect(result).to.be.null;
    });
  });

  describe('getCtlModel', () => {
    it('returns expected CtlModel Value', () => {
      const lnElement = doc.querySelector(
        'IED[name="B1"] LN0[lnType="SE_LLN0_SET_V001"]'
      );
      const doElement = getDoElement(lnElement!, 'Mod');
      const result = getCtlModel(lnElement!, doElement!);
      expect(result).to.be.equal('direct-with-normal-security');
    });

    it('returns null if DAI not found', () => {
      const lnElement = doc.querySelector(
        'IED[name="B1"] LN0[lnType="SE_LLN0_SET_V001"]'
      );
      const doElement = getDoElement(lnElement!, 'Beh');
      const result = getCtlModel(lnElement!, doElement!);
      expect(result).to.be.null;
    });
  });

  describe('getDaElementByDaiElement', () => {
    it('returns expected DA Element', () => {
      const daiElement = doc.querySelector(
        'IED[name="B1"] LN0[lnType="SE_LLN0_SET_V001"] > DOI[name="Mod"] DAI[name="ctlVal"]'
      );
      const daElement = getDaElementByDaiElement(daiElement!);
      expect(daElement).to.be.not.null;
      expect(daElement?.getAttribute('type')).to.be.equal('SE_Oper_V003');
    });

    it('returns expected Enum DA Element', () => {
      const daiElement = doc.querySelector(
        'IED[name="B1"] LN[lnType="SE_GGIO_SET_V002"] > DOI[name="ClcRfTyp"] > DAI[name="setVal"]'
      );
      const daElement = getDaElementByDaiElement(daiElement!);
      expect(daElement).to.be.not.null;
      expect(daElement?.getAttribute('bType')).to.be.equal('Enum');
      expect(daElement?.getAttribute('type')).to.be.equal('SE_setVal_V001');
    });
  });

  describe('isEnumDataAttribute', () => {
    it('returns to not be an Enum Type', () => {
      const daiElement = doc.querySelector(
        'IED[name="B1"] LN0[lnType="SE_LLN0_SET_V001"] > DOI[name="Mod"] DAI[name="ctlVal"]'
      );
      const result = isEnumDataAttribute(daiElement!);
      expect(result).to.be.false;
    });

    it('returns to be an Enum Type', () => {
      const daiElement = doc.querySelector(
        'IED[name="B1"] LN[lnType="SE_GGIO_SET_V002"] > DOI[name="ClcRfTyp"] > DAI[name="setVal"]'
      );
      const result = isEnumDataAttribute(daiElement!);
      expect(result).to.be.true;
    });
  });

  describe('getEnumVal', () => {
    it('returns expected Enum Value', () => {
      const daiElement = doc.querySelector(
        'IED[name="B1"] LN[lnType="SE_GGIO_SET_V002"] > DOI[name="ClcRfTyp"] > DAI[name="setVal"]'
      );
      const result = getEnumVal(daiElement!, '1');
      expect(result).to.be.equal('MS');
    });

    it('returns null, because unbknown Ord Value passed', () => {
      const daiElement = doc.querySelector(
        'IED[name="B1"] LN[lnType="SE_GGIO_SET_V002"] > DOI[name="ClcRfTyp"] > DAI[name="setVal"]'
      );
      const result = getEnumVal(daiElement!, '99');
      expect(result).to.be.null;
    });

    it('returns null, because not an Enum Type', () => {
      const daiElement = doc.querySelector(
        'IED[name="B1"] LN0[lnType="SE_LLN0_SET_V001"] > DOI[name="Mod"] DAI[name="ctlVal"]'
      );
      const result = getEnumVal(daiElement!, '1');
      expect(result).to.be.null;
    });
  });

  describe('getEnumOrds', () => {
    it('returns empty list, because no Enum Type', () => {
      const daiElement = doc.querySelector(
        'IED[name="B1"] LN0[lnType="SE_LLN0_SET_V001"] > DOI[name="Mod"] DAI[name="ctlVal"]'
      );
      const result = getEnumOrds(daiElement!);
      expect(result).to.be.empty;
    });

    it('returns correct list of Ord', () => {
      const daiElement = doc.querySelector(
        'IED[name="B1"] LN[lnType="SE_GGIO_SET_V002"] > DOI[name="ClcRfTyp"] > DAI[name="setVal"]'
      );
      const result = getEnumOrds(daiElement!);
      expect(result).to.be.not.empty;
      expect(result.length).to.be.equal(8);
      result.forEach((value, index) =>
        expect(result[index]).to.be.equal('' + (index + 1))
      );
    });
  });
});
