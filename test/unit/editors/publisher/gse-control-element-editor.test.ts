import { expect, fixture, html } from '@open-wc/testing';

import '../../../../src/editors/publisher/gse-control-element-editor.js';
import { GseControlElementEditor } from '../../../../src/editors/publisher/gse-control-element-editor.js';

describe('Editor for GSEControl element and its direct children', () => {
  let doc: XMLDocument;
  let element: GseControlElementEditor;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/wizards/gsecontrol.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('with valid GSEControl', () => {
    beforeEach(async () => {
      const gseControl = doc.querySelector('GSEControl')!;

      element = await fixture(
        html`<gse-control-element-editor
          .element=${gseControl}
        ></gse-control-element-editor>`
      );
    });

    it('looks like the latest snapshot', async () =>
      await expect(element).shadowDom.to.equalSnapshot());
  });
});
