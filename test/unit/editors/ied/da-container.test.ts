import { html, fixture, expect } from '@open-wc/testing';

import '../../../../src/editors/ied/da-container.js';
import { DAContainer } from '../../../../src/editors/ied/da-container.js';

describe('da-container', () => {
  let element: DAContainer;
  let validSCL: XMLDocument;

  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/valid2007B4withIEDModifications.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  it('looks like the latest snapshot with a DA element', async () => {
    element = await fixture(html`<da-container
      .element=${validSCL.querySelector(
        'DataTypeTemplates > DOType[id="Dummy.XCBR1.Pos"] > DA[name="ctlModel"]')}
    ></da-container>`);
    expect(element).shadowDom.to.equalSnapshot();
  });

  it('looks like the latest snapshot with a DA element and child elements are toggled.', async () => {
    element = await fixture(html`<da-container
      .element=${validSCL.querySelector(
        'DataTypeTemplates > DOType[id="Dummy.LPHD1.Sim"] > DA[name="SBOw"]')}
    ></da-container>`);

    (<HTMLElement>(
      element.shadowRoot!.querySelector('mwc-icon-button-toggle')
    )).click();
    await element.requestUpdate();
    await element.updateComplete;
    expect(element).shadowDom.to.equalSnapshot();
    
    (<HTMLElement>(
      element.shadowRoot!.querySelector('mwc-icon-button-toggle')
    )).click();
    await element.requestUpdate();
    await element.updateComplete;
    expect(element.shadowRoot!.querySelectorAll('do-container').length).to.eql(0);
  });

  it('looks like the latest snapshot with a DA element containing and a DAI.', async () => {
    element = await fixture(html`<da-container
      .element=${validSCL.querySelector(
        'DataTypeTemplates > DOType[id="Dummy.XCBR1.Pos"] > DA[name="ctlModel"]')}
      .instanceElement=${validSCL.querySelector(
        ':root > IED[name="IED2"] > AccessPoint[name="P1"] > Server > LDevice[inst="CircuitBreaker_CB1"] > LN[lnType="Dummy.XCBR1"] > DOI[name="Pos"]> DAI[name="ctlModel"]')}
    ></da-container>`);
    expect(element).shadowDom.to.equalSnapshot();
  });

  describe('has a getBDAElements function ', () => {
    it('which returns BDA elements if available', async () => {
      element = await fixture(html`<da-container
        .element=${validSCL.querySelector(
          'DataTypeTemplates > DOType[id="Dummy.LPHD1.Sim"] > DA[name="SBOw"]')}
      ></da-container>`);

      const bdaElements = element['getBDAElements']();
      expect(bdaElements.length).to.eql(6);
      expect(bdaElements[4].getAttribute('name')).to.eql('Test');
    });

    it('which returns no BDA elements if they are not available', async () => {
      element = await fixture(html`<da-container
        .element=${validSCL.querySelector(
          'DataTypeTemplates > DOType[id="Dummy.LPHD1.Sim"] > DA[name="SBO"]')}
      ></da-container>`);

      const bdaElements = element['getBDAElements']();
      expect(bdaElements).to.be.empty;
    });
  });
});
