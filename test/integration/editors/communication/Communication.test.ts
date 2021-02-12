import { html, fixture, expect } from '@open-wc/testing';

import Communication from '../../../../src/editors/Communication.js';
import { Editing } from '../../../../src/Editing.js';
import { Wizarding } from '../../../../src/Wizarding.js';

import { getDocument } from '../../../data.js';

describe('Communication Plugin', () => {
  customElements.define(
    'communication-plugin',
    Wizarding(Editing(Communication))
  );
  let element: Communication;
  beforeEach(async () => {
    element = await fixture(
      html`<communication-plugin></communication-plugin>`
    );
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
