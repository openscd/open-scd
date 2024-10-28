import { fixture, html, expect } from '@open-wc/testing';

import '../../../../src/editors/substation/tapchanger-editor.js';
import { TapChangerEditor } from '../../../../src/editors/substation/tapchanger-editor.js';

describe('web component rendering TapChanger element', () => {
  let element: TapChangerEditor;
  let doc: XMLDocument;

  describe('rendering LNode and EqFunction children', () => {
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/editors/substation/TapChanger.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      element = <TapChangerEditor>(
        await fixture(
          html`<tapchanger-editor
            .element=${doc.querySelector('TapChanger[name="tapChComplet"]')}
          ></tapchanger-editor>`
        )
      );
      element.showfunctions = true;
      await element.updateComplete;
    });
    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('rendering SubEquipment', () => {
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/editors/substation/TapChanger.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      element = <TapChangerEditor>(
        await fixture(
          html`<tapchanger-editor
            .element=${doc.querySelector('TapChanger[name="tapChangerHalf"]')}
          ></tapchanger-editor>`
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
