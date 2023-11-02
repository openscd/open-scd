import { expect, fixture, html } from '@open-wc/testing';

import '../../src/plain-compare-list.js';

import { PlainCompareList } from '../../src/plain-compare-list.js';

describe('Plain Compare List', () => {
  let element: PlainCompareList;

  beforeEach(async () => {
    element = await fixture(html`<plain-compare-list></plain-compare-list>`);
    await element.updateComplete;
  });

  describe('Empty list', () => {
    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('Basic List', () => {
    let doc: XMLDocument;
    let template: XMLDocument;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/menu/compare-ied-changed.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      template = await fetch('/test/testfiles/menu/compare-ied-original.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      element.leftHandObject = doc.querySelector(
        'IED[name="FieldC_QA1_QB1_QB2_QC9"]'
      )!;
      element.rightHandObject = template.querySelector(
        'IED[name="FieldC_QA1_QB1_QB2_QC9"]'
      )!;

      element.leftHandTitle = 'Project doc';
      element.rightHandTitle = 'Template doc';

      await element.requestUpdate();
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });

    it('Has a subtitlte, so looks like the latest snapshot', async () => {
      element.leftHandSubtitle = 'subtitle';
      element.rightHandSubtitle = 'right subtitle';

      await element.requestUpdate();

      await expect(element).shadowDom.to.equalSnapshot();
    });
  });
});
