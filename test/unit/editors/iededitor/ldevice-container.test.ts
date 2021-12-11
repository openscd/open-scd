import { html, fixture, expect } from '@open-wc/testing';

import '../../../../src/editors/iededitor/ldevice-container.js'
import { LDeviceContainer } from '../../../../src/editors/iededitor/ldevice-container.js';

describe('server-container', () => {
  let element: LDeviceContainer;
  let validSCL: XMLDocument;

  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = await fixture(html`<ldevice-container
      .element=${validSCL.querySelector('LDevice')}
    ></ldevice-container>`);
  });

  it('looks like the latest snapshot', async () => {
    await expect(element).shadowDom.to.equalSnapshot();
  });
});
