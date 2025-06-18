import { expect, fixture, html } from '@open-wc/testing';

import '../../../../src/editors/publisher/data-set-element-editor.js';
import { DataSetElementEditor } from '../../../../src/editors/publisher/data-set-element-editor.js';

describe('Editor for DataSet element', () => {
  let doc: XMLDocument;
  let element: DataSetElementEditor;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/wizards/reportcontrol.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('with valid DataSet', () => {
    beforeEach(async () => {
      const dataSet = doc.querySelector('DataSet')!;

      element = await fixture(
        html`<data-set-element-editor
          .element=${dataSet}
        ></data-set-element-editor>`
      );
    });

    it('looks like the latest snapshot', async () =>
      await expect(element).shadowDom.to.equalSnapshot());
  });

  describe('with nulled DataSet', () => {
    beforeEach(async () => {
      const dataSet = null;

      element = await fixture(
        html`<data-set-element-editor
          .element=${dataSet}
        ></data-set-element-editor>`
      );
    });

    it('looks like the latest snapshot', async () =>
      await expect(element).shadowDom.to.equalSnapshot());
  });
});
