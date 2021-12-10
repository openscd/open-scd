import { html, fixture, expect } from '@open-wc/testing';
import { LNContainer } from '../../../../src/editors/iededitor/ln-container.js';

describe('server-container', () => {
  let element: LNContainer;
  let validSCL: XMLDocument;

  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      // TODO: Need to test both LN and LN0!
    element = await fixture(html`<ln-container
      .element=${validSCL.querySelector('LN')}
    ></ln-container>`);
  });

  // it('looks like the latest snapshot', async () => {
  //   await expect(element).shadowDom.to.equalSnapshot();
  // });
});
