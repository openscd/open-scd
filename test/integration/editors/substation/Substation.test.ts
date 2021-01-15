import { html, fixture, expect } from '@open-wc/testing';

import Substation from '../../../../src/editors/Substation.js';
import { Editing } from '../../../../src/Editing.js';
import { Wizarding } from '../../../../src/Wizarding.js';

import { getDocument } from '../../../data.js';

describe('Substation Plugin', () => {
  customElements.define('substation-plugin', Wizarding(Editing(Substation)));
  let element: Substation;
  beforeEach(async () => {
    element = await fixture(html`<substation-plugin></substation-plugin>`);
  });

  describe('without a doc loaded', () => {
    it('looks like the latest snapshot', () => {
      expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('with a doc loaded', () => {
    beforeEach(async () => {
      element.doc = getDocument();
      await element.updateComplete;
    });
  });
});
