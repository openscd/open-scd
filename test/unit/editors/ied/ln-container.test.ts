import { html, fixture, expect } from '@open-wc/testing';

import '../../../../src/editors/ied/ln-container.js';
import { LNContainer } from '../../../../src/editors/ied/ln-container.js';

describe('ln-container', () => {
  let element: LNContainer;
  let validSCL: XMLDocument;

  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/valid2007B4withIEDModifications.scd')
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

  it('looks like the latest snapshot with a LN0 element and child elements are toggled.', async () => {
    element = await fixture(html`<ln-container
      .element=${validSCL.querySelector(
        'IED[name="IED1"] > AccessPoint[name="P1"] > Server > LDevice[inst="CircuitBreaker_CB1"] > LN0[lnClass="LLN0"]')}
    ></ln-container>`);
    
    expect(element.shadowRoot!.querySelector('mwc-icon-button[id="toggleButton"]')?.getAttribute('icon')).to.eql('keyboard_arrow_down');
    
    (<HTMLElement>(
      element.shadowRoot!.querySelector('mwc-icon-button[id="toggleButton"]')
    )).click();
    
    expect(element.shadowRoot!.querySelector('mwc-icon-button[id="toggleButton"]')?.getAttribute('icon')).to.eql('keyboard_arrow_up');
    expect(element.shadowRoot!.querySelectorAll('do-container[hidden=""]').length).to.eql(0);
    expect(element).shadowDom.to.equalSnapshot();
    
    (<HTMLElement>(
      element.shadowRoot!.querySelector('mwc-icon-button[id="toggleButton"]')
    )).click();

    expect(element.shadowRoot!.querySelectorAll('do-container[hidden=""]').length).to.eql(6);
  });

  it('looks like the latest snapshot with a LN element.', async () => {
    element = await fixture(html`<ln-container
      .element=${validSCL.querySelector(
        'IED[name="IED1"] > AccessPoint[name="P1"] > Server > LDevice[inst="CircuitBreaker_CB1"] > LN[lnClass="XCBR"]')}
    ></ln-container>`);
    expect(element).shadowDom.to.equalSnapshot();
  });

  it('looks like the latest snapshot with a LN element and child elements are toggled.', async () => {
    element = await fixture(html`<ln-container
      .element=${validSCL.querySelector(
        'IED[name="IED1"] > AccessPoint[name="P1"] > Server > LDevice[inst="CircuitBreaker_CB1"] > LN[lnClass="XCBR"]')}
    ></ln-container>`);
    
    expect(element.shadowRoot!.querySelector('mwc-icon-button[id="toggleButton"]')?.getAttribute('icon')).to.eql('keyboard_arrow_down');
    
    /**
     * Click the toggle button.
     */
    (<HTMLElement>(
      element.shadowRoot!.querySelector('mwc-icon-button[id="toggleButton"]')
    )).click();
    
    expect(element.shadowRoot!.querySelector('mwc-icon-button[id="toggleButton"]')?.getAttribute('icon')).to.eql('keyboard_arrow_up');
    expect(element.shadowRoot!.querySelectorAll('do-container[hidden=""]').length).to.eql(0);
    expect(element).shadowDom.to.equalSnapshot();
    
    (<HTMLElement>(
      element.shadowRoot!.querySelector('mwc-icon-button[id="toggleButton"]')
    )).click();
    
    expect(element.shadowRoot!.querySelectorAll('do-container[hidden=""]').length).to.eql(7);
  });

  describe('has a getDOElements function ', () => {
    it('which return the DO containers underneath a given LN.', async () => {
      element = await fixture(html`<ln-container
        .element=${validSCL.querySelector(
          'IED[name="IED1"] > AccessPoint[name="P1"] > Server > LDevice[inst="Disconnectors"] > LN[lnClass="CILO"]')}
      ></ln-container>`);
  
      const nestedDOs = element['getDOElements']();
      expect(nestedDOs).to.not.be.empty;
      expect(nestedDOs!.length).to.eql(4);
      expect(nestedDOs![1].getAttribute('name')).to.eql('NamPlt');
    });

    it('which return the DO containers underneath a given LN0.', async () => {
      element = await fixture(html`<ln-container
        .element=${validSCL.querySelector(
          'IED[name="IED2"] > AccessPoint[name="P1"] > Server > LDevice[inst="CircuitBreaker_CB1"] > LN0[lnClass="LLN0"]')}
      ></ln-container>`);
  
      const nestedDOs = element['getDOElements']();
      expect(nestedDOs).to.not.be.empty;
      expect(nestedDOs!.length).to.eql(6);
      expect(nestedDOs![4].getAttribute('name')).to.eql('Health');
    });
    
    it('which return an empty array if a LN doesn\t have child DO\'s.', async () => {
      element = await fixture(html`<ln-container
        .element=${validSCL.querySelector(
          'IED[name="IED2"] > AccessPoint[name="P1"] > Server > LDevice[inst="CircuitBreaker_CB1"] > LN[lnClass="tHarde"]')}
      ></ln-container>`);

      const nestedDOs = element['getDOElements']();
      expect(nestedDOs).to.be.empty;
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
      const dO = validSCL.querySelector(
        'DataTypeTemplates > LNodeType[id="Dummy.XCBR1"] > DO[name="Pos"]')
        const instance = element['getInstanceElement'](dO!)!;
        expect(instance).to.not.be.null;
        expect(instance.tagName).to.eql('DOI');
        expect(instance.getAttribute('name')).to.eql('Pos');
    });
  
    it('which returns null if no DOI is available.', async () => {
      const dO = validSCL.querySelector(
        'DataTypeTemplates > LNodeType[id="Dummy.XCBR1"] > DO[name="Loc"]')
        expect(element['getInstanceElement'](dO!)!).to.be.null;
    });
  });
});
