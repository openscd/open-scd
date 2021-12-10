import { html, fixture, expect } from '@open-wc/testing';
import { DOContainer } from '../../../../src/editors/iededitor/do-container.js';

describe('server-container', () => {
  let element: DOContainer;
  let validSCL: XMLDocument;

  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      // TODO: Need to test all DO types!
    element = await fixture(html`<do-container
      .element=${validSCL.querySelector('DO')}
    ></do-container>`);
  });

  // it('looks like the latest snapshot', async () => {
  //   await expect(element).shadowDom.to.equalSnapshot();
  // });
});
