import { html, fixture, expect } from '@open-wc/testing';

import '../../../../../src/editors/subscription/goose/subscriber-list.js';
import { SubscriberList } from '../../../../../src/editors/subscription/goose/subscriber-list.js';

describe('subscriber-list-goose', () => {
  let element: SubscriberList;
  let validSCL: XMLDocument;

  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = await fixture(html`<subscriber-list-goose
      .doc=${validSCL}
    ></subscriber-list-goose>`);
  });

  it('initially looks like the latest snapshot', async () => {
    await expect(element).shadowDom.to.equalSnapshot();
  });
});
