import { fixture, html, expect } from '@open-wc/testing';

import '../../../src/editors/substation/bay-editor.js';
import { BayEditor } from '../../../src/editors/substation/bay-editor.js';

describe('bay-editor', () => {
  let element: BayEditor;
  let validSCL: XMLDocument;

  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    element = <BayEditor>(
      await fixture(
        html`<bay-editor
          .element=${validSCL.querySelector('Bay')}
        ></bay-editor>`
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
});
