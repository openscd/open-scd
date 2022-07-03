import { expect, fixture, html } from '@open-wc/testing';

import '../../../../src/editors/publisher/gse-control-editor.js';
import { GseControlEditor } from '../../../../src/editors/publisher/gse-control-editor.js';

describe('Editor for GSEControl element', () => {
  let doc: XMLDocument;
  let element: GseControlEditor;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = await fixture(
      html`<gse-control-editor .doc=${doc}></gse-control-editor>`
    );
  });

  it('looks like the latest snapshot', async () =>
    await expect(element).shadowDom.to.equalSnapshot());
});
