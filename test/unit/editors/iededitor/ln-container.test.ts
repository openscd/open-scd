import { html, fixture, expect } from '@open-wc/testing';

import '../../../../src/editors/iededitor/ln-container.js';
import { LNContainer } from '../../../../src/editors/iededitor/ln-container.js';

describe('ln-container', () => {
  let element: LNContainer;
  let validSCL: XMLDocument;

  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      // TODO: Need to test both LN and LN0!
    element = await fixture(html`<ln-container
      .element=${validSCL.querySelector(
        'IED[name="IED1"] > AccessPoint[name="P1"] > Server > LDevice[inst="CircuitBreaker_CB1"] > LN0[lnClass="LLN0"]')}
    ></ln-container>`);
  });

  it('looks like the latest snapshot', async () => {
    await expect(element).shadowDom.to.equalSnapshot();
  });

  describe('with readonly property', () => {
    beforeEach(async () => {
      element.readonly = true;
      await element.requestUpdate();
    });
    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });
});
