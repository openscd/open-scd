import { fixture, html, expect } from '@open-wc/testing';

import '../../../../src/editors/substation/transformer-winding-editor.js';
import { TransformerWindingEditor } from '../../../../src/editors/substation/transformer-winding-editor.js';

describe('transformer-winding-editor', () => {
  let element: TransformerWindingEditor;
  let doc: XMLDocument;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/TransformerWinding.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  it('looks like the latest snapshot', async () => {
    element = <TransformerWindingEditor>(
      await fixture(
        html`<transformer-winding-editor
          .element=${doc.querySelector('TransformerWinding')}
        ></transformer-winding-editor>`
      )
    );
    await expect(element).shadowDom.to.equalSnapshot();
  });

  describe('with children', () => {
    it('looks like the latest snapshot', async () => {
      element = <TransformerWindingEditor>(
        await fixture(
          html`<transformer-winding-editor
            .element=${doc.querySelector('TransformerWinding[name="some"]')}
          ></transformer-winding-editor>`
        )
      );
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('without children', () => {
    it('looks like the latest snapshot', async () => {
      element = <TransformerWindingEditor>(
        await fixture(
          html`<transformer-winding-editor
            .element=${doc.querySelector('TransformerWinding[name="empty"]')}
          ></transformer-winding-editor>`
        )
      );
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });
});
