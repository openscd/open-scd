import { html, fixture, expect } from '@open-wc/testing';

import '../../../../src/editors/ied/server-container.js'
import { ServerContainer } from '../../../../src/editors/ied/server-container.js';

describe('server-container', () => {
  let element: ServerContainer;
  let validSCL: XMLDocument;

  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = await fixture(html`<server-container
      .element=${validSCL.querySelector('IED[name="IED1"] > AccessPoint[name="P1"] > Server')}
    ></server-container>`);
  });

  it('looks like the latest snapshot', async () => {
    await expect(element).shadowDom.to.equalSnapshot();
  });
});
