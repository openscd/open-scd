import { expect, fixture, html } from '@open-wc/testing';

import '../../../../src/editors/publisher/sampled-value-control-editor.js';
import { SampledValueControlEditor } from '../../../../src/editors/publisher/sampled-value-control-editor.js';
import { cloneTestDoc } from './foundation.test.js';

describe('Editor for SampledValueControl element', () => {
  let doc: XMLDocument;
  let otherDoc: XMLDocument;
  let element: SampledValueControlEditor;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    otherDoc = await fetch('/test/testfiles/history.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = await fixture(
      html`<sampled-value-control-editor
        .doc=${doc}
      ></sampled-value-control-editor>`
    );
  });

  it('initially looks like the latest snapshot', async () =>
    await expect(element).shadowDom.to.equalSnapshot());

  describe('with a selected SampledValueControl', () => {
    let newDoc: XMLDocument;

    beforeEach(async () => {
      (
        element.shadowRoot?.querySelector(
          '.selectionlist > mwc-list-item:not([noninteractive])'
        ) as HTMLElement
      ).click();

      await element.updateComplete;
    });

    it('looks like the latest snapshot', async () =>
      await expect(element).shadowDom.to.equalSnapshot());

    describe('on selected element update', () => {
      beforeEach(async () => {
        newDoc = cloneTestDoc(doc);
        element.doc = newDoc;
        await element.updateComplete;

        await element.selectionList.requestUpdate();
      });

      it('does not reset selected Element', async () =>
        expect(element.selectedSampledValueControl).to.equal(
          newDoc.querySelector('SampledValueControl')
        ));

      it('does not reset selection', async () =>
        expect(element.selectionList.selected).to.not.be.null);
    });

    describe('on selected element remove', () => {
      beforeEach(async () => {
        element.selectedSampledValueControl?.parentElement?.removeChild(
          element.selectedSampledValueControl
        );
        element.doc = cloneTestDoc(doc);
        await element.updateComplete;

        await element.selectionList.requestUpdate();
      });

      it('resets selected Element', async () =>
        expect(element.selectedSampledValueControl).to.be.undefined);

      it('reset selection', async () =>
        expect(element.selectionList.selected).to.be.null);
    });

    describe('and other doc property update', () => {
      beforeEach(async () => {
        element.doc = otherDoc;
        await element.requestUpdate();

        await element.selectionList.requestUpdate();
      });

      it('does not reset selected Element', async () =>
        expect(element.selectedSampledValueControl).to.be.undefined);

      it('does not reset selection', async () =>
        expect(element.selectionList.selected).to.be.null);
    });
  });
});
