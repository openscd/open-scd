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
    await expect(element).shadowDom.to.equalSnapshot();
  });

  it('looks like the latest snapshot with a LN element.', async () => {
    element = await fixture(html`<ln-container
      .element=${validSCL.querySelector(
        'IED[name="IED1"] > AccessPoint[name="P1"] > Server > LDevice[inst="CircuitBreaker_CB1"] > LN[lnClass="XCBR"]')}
    ></ln-container>`);
    await expect(element).shadowDom.to.equalSnapshot();
  });
});
