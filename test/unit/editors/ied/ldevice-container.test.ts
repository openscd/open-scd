import { html, fixture, expect } from '@open-wc/testing';

import '../../../../src/editors/ied/ldevice-container.js'
import { LDeviceContainer } from '../../../../src/editors/ied/ldevice-container.js';

describe('ldevice-container', () => {
  let element: LDeviceContainer;
  let validSCL: XMLDocument;

  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/valid2007B4withIEDModifications.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  it('looks like the latest snapshot', async () => {
    element = await fixture(html`<ldevice-container
      .element=${validSCL.querySelector('LDevice[inst="Disconnectors"]')}
    ></ldevice-container>`);
    await expect(element).shadowDom.to.equalSnapshot();
  });

  it('looks like the latest snapshot with a LDevice without LN elements', async () => {
    element = await fixture(html`<ldevice-container
      .element=${validSCL.querySelector('LDevice[inst="EmptyLDevice"]')}
    ></ldevice-container>`);
    await expect(element).shadowDom.to.equalSnapshot();
  });
});
