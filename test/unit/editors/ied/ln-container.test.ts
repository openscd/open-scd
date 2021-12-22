import { html, fixture, expect } from '@open-wc/testing';

import '../../../../src/editors/ied/ln-container.js';
import { LNContainer } from '../../../../src/editors/ied/ln-container.js';

describe('ln-container', () => {
  let element: LNContainer;
  let validSCL: XMLDocument;

  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  it('looks like the latest snapshot with a LN0 element.', async () => {
    element = await fixture(html`<ln-container
      .element=${validSCL.querySelector(
        'IED[name="IED1"] > AccessPoint[name="P1"] > Server > LDevice[inst="CircuitBreaker_CB1"] > LN0[lnClass="LLN0"]')}
    ></ln-container>`);
    expect(element).shadowDom.to.equalSnapshot();
  });

  it('looks like the latest snapshot with a LN element.', async () => {
    element = await fixture(html`<ln-container
      .element=${validSCL.querySelector(
        'IED[name="IED1"] > AccessPoint[name="P1"] > Server > LDevice[inst="CircuitBreaker_CB1"] > LN[lnClass="XCBR"]')}
    ></ln-container>`);
    expect(element).shadowDom.to.equalSnapshot();
  });

  describe('has a getLNodeType function ', () => {
    it('which return the correct LNodeType for a given LN.', async () => {
      element = await fixture(html`<ln-container
        .element=${validSCL.querySelector(
          'IED[name="IED1"] > AccessPoint[name="P1"] > Server > LDevice[inst="CircuitBreaker_CB1"] > LN[lnClass="XCBR"]')}
      ></ln-container>`);
  
      const lNodeType = element.getLNodeType();
      expect(lNodeType).to.not.be.null;
      expect(lNodeType!.tagName).to.eql('LNodeType');
      expect(lNodeType!.getAttribute('lnClass')).to.eql('XCBR');
    });
  
    it('which returns null if LNodeType cannot be found for a given LN.', async () => {
      element = await fixture(html`<ln-container
        .element=${validSCL.querySelector(
          'IED[name="IED2"] > AccessPoint[name="P1"] > Server > LDevice[inst="CBSW"] > LN[lnClass="THARDE"]')}
      ></ln-container>`);
  
      expect(element.getLNodeType()).to.be.null;
    });
  });

  describe('has a getInstanceElement function ', () => {
    beforeEach(async () => {
      element = await fixture(html`<ln-container
        .element=${validSCL.querySelector(
          'IED[name="IED2"] > AccessPoint[name="P1"] > Server > LDevice[inst="CBSW"] > LN[lnClass="XCBR"]')}
      ></ln-container>`);
    });

    it('which returns a DOI for a LN if it\'s available.', async () => {
        const dO = element.getLNodeType()?.querySelector('DO[name="Pos"]');
        const instance = element.getInstanceElement(dO!)!;
        expect(instance).to.not.be.null;
        expect(instance.tagName).to.eql('DOI');
        expect(instance.getAttribute('name')).to.eql('Pos');
    });
  
    it('which returns null if no DOI is available.', async () => {
        const dO = element.getLNodeType()?.querySelector('DO[name="Beh"]');
        expect(element.getInstanceElement(dO!)!).to.be.null;
    });
  });
});
