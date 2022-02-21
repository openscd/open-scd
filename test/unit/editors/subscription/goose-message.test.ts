import { html, fixture, expect } from '@open-wc/testing';

import '../../../../src/editors/subscription/goose-message.js'
import { GOOSEMessage } from '../../../../src/editors/subscription/goose-message.js';

describe('goose-message', () => {
  let element: GOOSEMessage;
  let validSCL: XMLDocument;

  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = await fixture(html`<goose-message
      .element=${validSCL.querySelector('GSEControl[name="GCB"]')}
    ></goose-message>`);
  });

  it('looks like the latest snapshot', async () => {
    await expect(element).shadowDom.to.equalSnapshot();
  });
});
