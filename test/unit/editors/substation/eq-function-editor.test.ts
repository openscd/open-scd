import { fixture, html, expect } from '@open-wc/testing';

import '../../../../src/editors/substation/eq-function-editor.js';
import { EqFunctionEditor } from '../../../../src/editors/substation/eq-function-editor.js';

describe('web component rendering EqFunction element', () => {
  let element: EqFunctionEditor;
  let doc: XMLDocument;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/zeroline/functions.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('with complete attribute set and existing children', () => {
    beforeEach(async () => {
      element = <EqFunctionEditor>(
        await fixture(
          html`<eq-function-editor
            .element=${doc.querySelector('ConductingEquipment EqFunction')}
          ></eq-function-editor>`
        )
      );
    });

    it('looks like the latest snapshot', async () =>
      await expect(element).shadowDom.to.equalSnapshot());
  });

  describe('with missing desc and type attribute', () => {
    beforeEach(async () => {
      element = <EqFunctionEditor>(
        await fixture(
          html`<eq-function-editor
            .element=${doc.querySelector('EqFunction')}
          ></eq-function-editor>`
        )
      );
    });

    it('looks like the latest snapshot', async () =>
      await expect(element).shadowDom.to.equalSnapshot());
  });

  describe('with existing LNode children', () => {
    beforeEach(async () => {
      element = <EqFunctionEditor>(
        await fixture(
          html`<eq-function-editor
            .element=${doc.querySelector(
              'ConductingEquipment[name="QB2"] EqFunction'
            )}
          ></eq-function-editor>`
        )
      );
    });

    it('looks like the latest snapshot', async () =>
      await expect(element).shadowDom.to.equalSnapshot());
  });

  describe('with general-equipment children', () => {
    beforeEach(async () => {
      doc = await fetch(
        '/test/testfiles/editors/substation/generalequipment.scd'
      )
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      element.element = doc.querySelector('EqFunction')!;
      element.showfunctions = false;
      await element.updateComplete;
    });

    it('with showfunctions false looks like the latest snapshot', async () =>
      await expect(element).shadowDom.to.equalSnapshot());

    it('with showfunctions true looks like the latest snapshot', async () => {
      element.showfunctions = true;
      await element.updateComplete;

      await expect(element).shadowDom.to.equalSnapshot();
    });
  });
});
