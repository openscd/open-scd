import { html, fixture, expect } from '@open-wc/testing';

import '../../../../src/editors/ied/da-container.js';

import { DAContainer } from '../../../../src/editors/ied/da-container.js';
import { initializeNsdoc } from '../../../../src/foundation/nsdoc.js';
import { TemplateResult } from 'lit-element';

describe('da-container', async () => {
  let element: DAContainer;
  let validSCL: XMLDocument;

  const nsdoc = await initializeNsdoc();

  beforeEach(async () => {
    validSCL = await fetch(
      '/test/testfiles/valid2007B4withIEDModifications.scd'
    )
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('with a DA element', () => {
    beforeEach(async () => {
      element = await fixture(html`<da-container
        .element=${validSCL.querySelector(
          'DataTypeTemplates > DOType[id="Dummy.XCBR1.Pos"] > DA[name="ctlModel"]'
        )}
        .nsdoc=${nsdoc}
      ></da-container>`);
    });

    it('check the values returned for the header', () => {
      const header = element['header']();
      expect(header.values.length).to.be.equals(3);
      expect(header.values[0]).to.be.equals('ctlModel');
      expect(header.values[1]).to.be.equals('Enum');
      expect((<TemplateResult>header.values[2]).values.length).to.be.equals(1);
      expect((<TemplateResult>header.values[2]).values[0]).to.be.equals('CF');
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('with a BDA element', () => {
    beforeEach(async () => {
      element = await fixture(html`<da-container
        .element=${validSCL.querySelector(
          'DataTypeTemplates > DAType[id="Dummy.LPHD1.Sim.SBOw"] > BDA[name="ctlVal"]'
        )}
        .daParent=${validSCL.querySelector(
          'DataTypeTemplates > DOType[id="Dummy.LPHD1.Sim"] > DA[name="SBOw"]'
        )}
        .ancestors=${[
          validSCL.querySelector(
            'DataTypeTemplates > DOType[id="Dummy.LPHD1.Sim"] > DA[name="SBOw"]'
          ),
        ]}
        .nsdoc=${nsdoc}
      ></da-container>`);
    });

    it('check the values returned for the header', () => {
      const header = element['header']();
      expect(header.values.length).to.be.equals(3);
      expect(header.values[0]).to.be.equals('ctlVal');
      expect(header.values[1]).to.be.equals('BOOLEAN');
      expect(header.values[2]).to.be.equals('');
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('with a DA element and child elements are toggled', () => {
    beforeEach(async () => {
      element = await fixture(html`<da-container
        .element=${validSCL.querySelector(
          'DataTypeTemplates > DOType[id="Dummy.LPHD1.Sim"] > DA[name="SBOw"]'
        )}
        .nsdoc=${nsdoc}
      ></da-container>`);

      (<HTMLElement>(
        element.shadowRoot!.querySelector('mwc-icon-button-toggle')
      )).click();
      await element.requestUpdate();
      await element.updateComplete;
    });

    it('when closing the container, no elements found', async () => {
      (<HTMLElement>(
        element.shadowRoot!.querySelector('mwc-icon-button-toggle')
      )).click();
      await element.requestUpdate();
      await element.updateComplete;
      expect(
        element.shadowRoot!.querySelectorAll('do-container').length
      ).to.eql(0);
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  it('looks like the latest snapshot with a DA element containing and a DAI', async () => {
    element = await fixture(html`<da-container
      .element=${validSCL.querySelector(
        'DataTypeTemplates > DOType[id="Dummy.XCBR1.Pos"] > DA[name="ctlModel"]'
      )}
      .instanceElement=${validSCL.querySelector(
        ':root > IED[name="IED2"] > AccessPoint[name="P1"] > Server > LDevice[inst="CircuitBreaker_CB1"] > LN[lnType="Dummy.XCBR1"] > DOI[name="Pos"]> DAI[name="ctlModel"]'
      )}
      .nsdoc=${nsdoc}
    ></da-container>`);
    await expect(element).shadowDom.to.equalSnapshot();
  });

  describe('has a getBDAElements function ', async () => {
    it('which returns BDA elements if available', async () => {
      element = await fixture(html`<da-container
        .element=${validSCL.querySelector(
          'DataTypeTemplates > DOType[id="Dummy.LPHD1.Sim"] > DA[name="SBOw"]'
        )}
        .nsdoc=${nsdoc}
      ></da-container>`);

      const bdaElements = element['getBDAElements']();
      expect(bdaElements.length).to.eql(6);
      expect(bdaElements[4].getAttribute('name')).to.eql('Test');
    });

    it('which returns no BDA elements if they are not available', async () => {
      element = await fixture(html`<da-container
        .element=${validSCL.querySelector(
          'DataTypeTemplates > DOType[id="Dummy.LPHD1.Sim"] > DA[name="SBO"]'
        )}
        .nsdoc=${nsdoc}
      ></da-container>`);

      const bdaElements = element['getBDAElements']();
      expect(bdaElements).to.be.empty;
    });
  });
});
