import { expect } from "@open-wc/testing";

import {
  getCdcValue,
  getFullPath
} from "../../../../../src/editors/protocol104/foundation/foundation.js";

describe('foundation', () => {
  let document: XMLDocument;

  beforeEach(async () => {
    document = await fetch('/test/testfiles/104-protocol.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  it('getFullPath returns expected value', () => {
    // Basic test to see if path is created correctly.
    let daiElement = document.querySelector('IED[name="B2"] LN0[lnType="SE_LLN0_SET_default_V001"] DAI[name="stVal"]');
    expect(getFullPath(daiElement!)).to.be.equals('AP1 / LD0 / LLN0 / Beh / stVal');

    // Test with an LN Element which has a prefix and inst set.
    daiElement = document.querySelector('IED[name="B2"] LN[lnType="SE_GGIO_SET_default_V001"] DAI[name="stVal"]');
    expect(getFullPath(daiElement!)).to.be.equals('AP1 / LD0 / PPRE-GGIO-2 / Beh / stVal');
  });

  it('getCdcValue returns expected value', () => {
    // Basic test to see if CDC is retrieved correctly.
    let daiElement = document.querySelector('IED[name="B2"] LN0[lnType="SE_LLN0_SET_default_V001"] DAI[name="stVal"]');
    expect(getCdcValue(daiElement!)).to.be.equals('ENS');

    daiElement = document.querySelector('IED[name="B1"] LN0[lnType="SE_LLN0_SET_V001"] DAI[name="ctlVal"]');
    expect(getCdcValue(daiElement!)).to.be.equals('ENC');
  });
});
