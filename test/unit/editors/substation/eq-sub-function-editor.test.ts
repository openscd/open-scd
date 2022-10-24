import { fixture, html, expect } from '@open-wc/testing';

import '../../../../src/editors/substation/eq-sub-function-editor.js';
import { EqSubFunctionEditor } from '../../../../src/editors/substation/eq-sub-function-editor.js';

describe('web component rendering EqSubFunction element', () => {
  let element: EqSubFunctionEditor;
  let doc: XMLDocument;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/zeroline/functions.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('with complete attribute set and existing children', () => {
    beforeEach(async () => {
      element = <EqSubFunctionEditor>(
        await fixture(
          html`<eq-sub-function-editor
            .element=${doc.querySelector('EqSubFunction > EqSubFunction')}
          ></eq-sub-function-editor>`
        )
      );
    });

    it('looks like the latest snapshot', async () =>
      await expect(element).shadowDom.to.equalSnapshot());
  });

  describe('with missing desc and type attribute', () => {
    beforeEach(async () => {
      element = <EqSubFunctionEditor>(
        await fixture(
          html`<eq-sub-function-editor
            .element=${doc.querySelector('ConductingEquipment EqSubFunction')}
          ></eq-sub-function-editor>`
        )
      );
    });

    it('looks like the latest snapshot', async () =>
      await expect(element).shadowDom.to.equalSnapshot());
  });

  describe('with existing LNode children', () => {
    beforeEach(async () => {
      element = <EqSubFunctionEditor>(
        await fixture(
          html`<eq-sub-function-editor
            .element=${doc.querySelector(
              'ConductingEquipment[name="QB1"] EqSubFunction'
            )}
          ></eq-sub-function-editor>`
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

      element.element = doc.querySelector('EqSubFunction')!;
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
