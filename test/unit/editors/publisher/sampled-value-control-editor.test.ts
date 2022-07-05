import { expect, fixture, html } from '@open-wc/testing';

import '../../../../src/editors/publisher/sampled-value-control-editor.js';
import { SampledValueControlEditor } from '../../../../src/editors/publisher/sampled-value-control-editor.js';

describe('Editor for SampledValueControl element', () => {
  let doc: XMLDocument;
  let element: SampledValueControlEditor;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = await fixture(
      html`<sampled-value-control-editor
        .doc=${doc}
      ></sampled-value-control-editor>`
    );
  });

  it('looks like the latest snapshot', async () =>
    await expect(element).shadowDom.to.equalSnapshot());
});
