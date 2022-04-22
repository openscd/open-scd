import { fixture, html, expect } from '@open-wc/testing';

import '../../../src/zeroline/voltage-level-editor.js';
import { VoltageLevelEditor } from '../../../src/zeroline/voltage-level-editor.js';

describe('voltage-level-editor', () => {
  let element: VoltageLevelEditor;
  let doc: XMLDocument;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    element = <VoltageLevelEditor>(
      await fixture(
        html`<voltage-level-editor
          .element=${doc.querySelector('VoltageLevel')}
        ></voltage-level-editor>`
      )
    );
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

  describe('with function filter deactivated shows connected Function`s in the Substation', () => {
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/zeroline/functions.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      element.element = doc.querySelector('VoltageLevel')!;
      localStorage.setItem('showfunctions', 'on');
      await element.requestUpdate();
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });
});
