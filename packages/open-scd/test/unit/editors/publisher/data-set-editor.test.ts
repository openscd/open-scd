import { expect, fixture, html } from '@open-wc/testing';

import '../../../../src/editors/publisher/data-set-editor.js';
import { DataSetEditor } from '../../../../src/editors/publisher/data-set-editor.js';
import { cloneTestDoc } from './foundation.test.js';

describe('Editor for DataSet element', () => {
  let doc: XMLDocument;
  let otherDoc: XMLDocument;
  let element: DataSetEditor;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    otherDoc = await fetch('/test/testfiles/history.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = await fixture(
      html`<data-set-editor .doc=${doc}></data-set-editor>`
    );
  });

  it('initially looks like the latest snapshot', async () =>
    await expect(element).shadowDom.to.equalSnapshot());

  describe('with a selected DataSet', () => {
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
        expect(element.selectedDataSet).to.equal(
          newDoc.querySelector('DataSet')
        ));

      it('does not reset selection', async () =>
        expect(element.selectionList.selected).to.not.be.null);
    });

    describe('on selected element remove', () => {
      beforeEach(async () => {
        element.selectedDataSet?.parentElement?.removeChild(
          element.selectedDataSet
        );
        element.doc = cloneTestDoc(doc);
        await element.updateComplete;

        await element.selectionList.requestUpdate();
      });

      it('resets selected Element', async () =>
        expect(element.selectedDataSet).to.be.undefined);

      it('reset selection', async () =>
        expect(element.selectionList.selected).to.be.null);
    });

    describe('on new doc loaded', () => {
      beforeEach(async () => {
        element.doc = otherDoc;
        await element.updateComplete;

        await element.selectionList.requestUpdate();
      });

      it('does not reset selected Element', async () =>
        expect(element.selectedDataSet).to.be.undefined);

      it('does not reset selection', async () =>
        expect(element.selectionList.selected).to.be.null);
    });
  });
});
