import { html, fixture, expect } from '@open-wc/testing';

import '../../../../src/editors/ied/access-point-container.js'
import { AccessPointContainer } from '../../../../src/editors/ied/access-point-container.js';

describe('access-point-container', () => {
  let element: AccessPointContainer;
  let validSCL: XMLDocument;

  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = await fixture(html`<access-point-container
      .element=${validSCL.querySelector('AccessPoint[name="P1"]')}
    ></access-point-container>`);
  });

  it('looks like the latest snapshot', async () => {
    await expect(element).shadowDom.to.equalSnapshot();
  });
});
