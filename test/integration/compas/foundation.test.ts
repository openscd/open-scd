import {expect, fixture, html} from '@open-wc/testing';

import {updateDocumentInOpenSCD} from "../../../src/compas/foundation.js";

import {OpenSCD} from "../../../src/open-scd.js";
import '../../../src/open-scd.js';

describe('compas-foundation', () => {
  let doc: XMLDocument;
  let element: OpenSCD;

  beforeEach(async () => {
    element = await fixture(
        html`<open-scd></open-scd>`
    );

    doc = await fetch('/base/test/testfiles/compas/test-scd.cid')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  it('when loaded the document should be on open-scd component', async () => {
    updateDocumentInOpenSCD(doc);
    await element.updateComplete;

    expect(element.doc).to.be.not.undefined;
    expect(element.docId).to.be.equal('380b5e70-4753-4b59-b5b4-d51ceb26a30c');
    expect(element.docName).to.be.equal('ied_utrecht_station235-3.0.0.cid');
  });
});
