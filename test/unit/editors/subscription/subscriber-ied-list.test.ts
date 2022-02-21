import { html, fixture, expect } from '@open-wc/testing';

import '../../../../src/editors/subscription/subscriber-ied-list.js'
import { SubscriberIEDList } from '../../../../src/editors/subscription/subscriber-ied-list.js';

describe('subscriber-ied-list', () => {
  let element: SubscriberIEDList;
  let validSCL: XMLDocument;

  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = await fixture(html`<subscriber-ied-list
      .doc=${validSCL}
    ></subscriber-ied-list>`);
  });

  it('looks like the latest snapshot', async () => {
    await expect(element).shadowDom.to.equalSnapshot();
  });
});
