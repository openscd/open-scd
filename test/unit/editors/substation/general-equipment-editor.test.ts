import { expect, fixture, html } from '@open-wc/testing';

import '../../../../src/editors/substation/general-equipment-editor.js';
import { GeneralEquipmentEditor } from '../../../../src/editors/substation/general-equipment-editor.js';

describe('Editor web component for GeneralEquipment SCL element', () => {
  let element: GeneralEquipmentEditor;
  let doc: XMLDocument;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/editors/substation/generalequipment.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    const generalEquipment = doc.querySelector('GeneralEquipment');
    element = await fixture(
      html`<general-equipment-editor
        .doc=${doc}
        .element=${generalEquipment}
      ></general-equipment-editor>`
    );
  });

  describe('rendered as action icon', () => {
    beforeEach(async () => {
      element.showfunctions = false;
      await element.updateComplete;
    });

    it('looks like the latest snapshot', async () =>
      await expect(element).shadowDom.to.equalSnapshot());
  });

  describe('rendered as action pane', () => {
    beforeEach(async () => {
      element.showfunctions = true;
      await element.updateComplete;
    });

    it('look like the latest snapshot', async () =>
      await expect(element).shadowDom.to.equalSnapshot());
  });
});
