import { expect, fixture, html } from '@open-wc/testing';

import '../../../../src/editors/publisher/report-control-element-editor.js';
import { ReportControlElementEditor } from '../../../../src/editors/publisher/report-control-element-editor.js';

describe('Editor for ReportControl element and its direct children', () => {
  let doc: XMLDocument;
  let element: ReportControlElementEditor;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('with valid ReportControl', () => {
    beforeEach(async () => {
      const reportControl = doc.querySelector('ReportControl')!;

      element = await fixture(
        html`<report-control-element-editor
          .element=${reportControl}
        ></report-control-element-editor>`
      );
    });

    it('looks like the latest snapshot', async () =>
      await expect(element).shadowDom.to.equalSnapshot());
  });
});
