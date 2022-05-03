import { html, fixture, expect } from '@open-wc/testing';

import '../../../../src/editors/subscription/goose-publisher-list.js'
import { GoosePublisherList } from '../../../../src/editors/subscription/goose-publisher-list.js';

describe('goose-publisher-list', () => {
  let element: GoosePublisherList;
  let validSCL: XMLDocument;

  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = await fixture(html`<goose-publisher-list
      .doc=${validSCL}
    ></goose-publisher-list>`);
  });

  it('looks like the latest snapshot', async () => {
    await expect(element).shadowDom.to.equalSnapshot();
  });

  it('looks like the latest snapshot without a doc loaded', async () => {
    element = await fixture(html`<goose-publisher-list></goose-publisher-list>`);

    await expect(element).shadowDom.to.equalSnapshot();
  });
});
