import { html, fixture, expect } from '@open-wc/testing';

import SingleLineDiagram from '../../../../src/editors/SingleLineDiagram.js';
import { Editing } from '../../../../src/Editing.js';
import { Wizarding } from '../../../../src/Wizarding.js';

describe('Single Line Diagram Plugin', () => {
  customElements.define(
    'sld-plugin',
    Wizarding(Editing(SingleLineDiagram))
  );
  let element: SingleLineDiagram;
  beforeEach(async () => {
    element = await fixture(
      html`<sld-plugin></sld-plugin>`
    );
  });

  describe('without a doc loaded', () => {
    it('looks like the latest snapshot', () => {
      expect(element).shadowDom.to.equalSnapshot();
    });
  });
});
