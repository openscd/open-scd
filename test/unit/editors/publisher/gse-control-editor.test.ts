import { expect, fixture, html } from '@open-wc/testing';

import '../../../../src/editors/publisher/gse-control-editor.js';
import { GseControlEditor } from '../../../../src/editors/publisher/gse-control-editor.js';
import { cloneTestDoc } from './foundation.test.js';

describe('Editor for GSEControl element', () => {
  let doc: XMLDocument;
  let otherDoc: XMLDocument;
  let element: GseControlEditor;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    otherDoc = await fetch('/test/testfiles/history.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = await fixture(
      html`<gse-control-editor .doc=${doc}></gse-control-editor>`
    );
  });

  it('initially looks like the latest snapshot', async () =>
    await expect(element).shadowDom.to.equalSnapshot());

  describe('with a selected GSEControl', () => {
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
        expect(element.selectedGseControl).to.equal(
          newDoc.querySelector('GSEControl')
        ));

      it('does not reset selection', async () =>
        expect(element.selectionList.selected).to.not.be.null);
    });

    describe('on selected element remove', () => {
      beforeEach(async () => {
        element.selectedGseControl?.parentElement?.removeChild(
          element.selectedGseControl
        );
        element.doc = cloneTestDoc(doc);
        await element.updateComplete;

        await element.selectionList.requestUpdate();
      });

      it('resets selected Element', async () =>
        expect(element.selectedGseControl).to.be.undefined);

      it('resets selected Elements DataSet', async () =>
        expect(element.selectedDataSet).to.be.undefined);

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
        expect(element.selectedGseControl).to.be.undefined);

      it('does not reset selection', async () =>
        expect(element.selectionList.selected).to.be.null);
    });
  });
});
