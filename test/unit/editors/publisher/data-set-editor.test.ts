import { expect, fixture, html } from '@open-wc/testing';

import '../../../../src/editors/publisher/data-set-editor.js';
import { DataSetEditor } from '../../../../src/editors/publisher/data-set-editor.js';

describe('Editor for DataSet element', () => {
  let doc: XMLDocument;
  let element: DataSetEditor;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = await fixture(
      html`<data-set-editor .doc=${doc}></data-set-editor>`
    );
  });

  it('looks like the latest snapshot', async () =>
    await expect(element).shadowDom.to.equalSnapshot());
});
