import { html, fixture, expect } from '@open-wc/testing';

import '../../../../src/editors/subscription/elements/goose-subscriber-list.js'
import { GooseSubscriberList } from '../../../../src/editors/subscription/elements/goose-subscriber-list.js';

describe('goose-subscriber-list', () => {
  let element: GooseSubscriberList;
  let validSCL: XMLDocument;

  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = await fixture(html`<goose-subscriber-list
      .doc=${validSCL}
    ></goose-subscriber-list>`);
  });

  it('looks like the latest snapshot', async () => {
    await expect(element).shadowDom.to.equalSnapshot();
  });

  it('looks like the latest snapshot without a doc loaded', async () => {
    element = await fixture(html`<goose-subscriber-list></goose-subscriber-list>`);

    await expect(element).shadowDom.to.equalSnapshot();
  });
});
