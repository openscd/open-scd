import { html, fixture, expect } from '@open-wc/testing';

import '../../../../src/editors/substation/substation-editor.js';
import { SubstationEditor } from '../../../../src/editors/substation/substation-editor.js';

describe('substation-editor', () => {
  let element: SubstationEditor;
  let doc: XMLDocument;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    element = await fixture(html`<substation-editor
      .element=${doc.querySelector('Substation')}
    ></substation-editor>`);
  });

  it('looks like the latest snapshot', async () => {
    await expect(element).shadowDom.to.equalSnapshot();
  });

  describe('with readonly property', () => {
    beforeEach(async () => {
      element.readonly = true;
      await element.requestUpdate();
    });
    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('with function filter deactivated', () => {
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/zeroline/functions.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      element.element = doc.querySelector('Substation')!;
      element.showfunctions = true;
      await element.requestUpdate();
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('with general-equipment children', () => {
    beforeEach(async () => {
      doc = await fetch(
        '/test/testfiles/editors/substation/generalequipment.scd'
      )
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      element.element = doc.querySelector('Substation')!;
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
