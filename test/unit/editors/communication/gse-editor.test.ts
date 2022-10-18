import { expect, fixture, html } from '@open-wc/testing';

import '../../../../src/editors/communication/gse-editor.js';
import { GseEditor } from '../../../../src/editors/communication/gse-editor.js';

describe('Editor web component for GSE element', () => {
  let element: GseEditor;

  beforeEach(async () => {
    const doc = await fetch('/test/testfiles/communication/communication.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    const gse = doc.querySelector('GSE')!;

    element = await fixture(
      html`<gse-editor .doc=${doc} .element=${gse}></gse-editor>`
    );
  });

  it('looks like its latest snapshot', async () =>
    await expect(element).shadowDom.to.equalSnapshot());
});
