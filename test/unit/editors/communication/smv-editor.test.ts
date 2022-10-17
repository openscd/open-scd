import { expect, fixture, html } from '@open-wc/testing';

import '../../../../src/editors/communication/smv-editor.js';
import { SmvEditor } from '../../../../src/editors/communication/smv-editor.js';

describe('Editor web component for SMV element', () => {
  let element: SmvEditor;

  beforeEach(async () => {
    const doc = await fetch('/test/testfiles/communication/communication.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    const smv = doc.querySelector('SMV')!;

    element = await fixture(
      html`<smv-editor .doc=${doc} .element=${smv}></smv-editor>`
    );
  });

  it('looks like its latest snapshot', async () =>
    await expect(element).shadowDom.to.equalSnapshot());
});
