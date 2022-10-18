import { expect, fixture, html } from '@open-wc/testing';

import { updateDocumentInOpenSCD } from '../../../src/compas/foundation.js';

import { OpenSCD } from '../../../src/open-scd.js';
import '../../../src/open-scd.js';
import { newUserInfoEvent } from '../../../src/foundation.js';

describe('compas-foundation', () => {
  let element: OpenSCD;

  beforeEach(async () => {
    element = await fixture(html`<open-scd></open-scd>`);
  });

  it('when loaded the document should be on open-scd component', async () => {
    const doc = await fetch('/test/testfiles/compas/test-scd.cid')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    updateDocumentInOpenSCD(element, doc);
    await element.updateComplete;

    expect(element.doc).to.be.not.undefined;
    expect(element.docId).to.be.equal('380b5e70-4753-4b59-b5b4-d51ceb26a30c');
    expect(element.docName).to.be.equal('ied_utrecht_station235-3.0.0.cid');
  });

  it('when UserInfoEvent event is dispatched, the username is shown in OpenSCD', async () => {
    expect(element.shadowRoot!.querySelector('span[id="userField"]')).to.be
      .null;

    element.dispatchEvent(newUserInfoEvent('Henk'));
    await element.updateComplete;

    expect(
      element.shadowRoot!.querySelector('span[id="userField"]')!.textContent
    ).to.be.equal('Logged in as Henk');
  });
});
