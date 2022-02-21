import { html, fixture, expect } from '@open-wc/testing';

import '../../../../src/editors/subscription/publisher-goose-list.js'
import { PublisherGOOSEList } from '../../../../src/editors/subscription/publisher-goose-list.js';

describe('publisher-goose-list', () => {
  let element: PublisherGOOSEList;
  let validSCL: XMLDocument;

  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = await fixture(html`<publisher-goose-list
      .doc=${validSCL}
    ></publisher-goose-list>`);
  });

  it('looks like the latest snapshot', async () => {
    await expect(element).shadowDom.to.equalSnapshot();
  });
});
