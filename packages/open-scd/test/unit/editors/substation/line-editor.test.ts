import { fixture, html, expect } from '@open-wc/testing';

import '../../../../src/editors/substation/line-editor.js';
import { LineEditor } from '../../../../src/editors/substation/line-editor.js';

describe('web component rendering Line element', () => {
  let element: LineEditor;
  let doc: XMLDocument;

  describe('rendering LNode and Function children', () => {
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/editors/substation/Line.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      element = <LineEditor>(
        await fixture(
          html`<line-editor
            .element=${doc.querySelector('Line[name="Berlin"]')}
          ></line-editor>`
        )
      );
      element.showfunctions = true;
      await element.updateComplete;
    });
    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('rendering ConductingEquipment', () => {
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/editors/substation/Line.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      element = <LineEditor>(
        await fixture(
          html`<line-editor
            .element=${doc.querySelector('Line[name="Berlin"]')}
          ></line-editor>`
        )
      );
      element.showfunctions = true;
      await element.updateComplete;
    });
    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });
  describe('rendering GeneralEquipment', () => {
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/editors/substation/Line.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      element = <LineEditor>(
        await fixture(
          html`<line-editor
            .element=${doc.querySelector('Line[name="Munich"]')}
          ></line-editor>`
        )
      );
      element.showfunctions = true;
      await element.updateComplete;
    });
    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });
});
