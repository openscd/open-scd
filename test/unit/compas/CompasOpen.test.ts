import { expect, fixtureSync, html } from '@open-wc/testing';

import CompasOpenElement from '../../../src/compas/CompasOpen.js';

import '../../../src/compas/CompasOpen.js';
import { Button } from '@material/mwc-button';

describe('compas-open', () => {
  let element: CompasOpenElement;

  describe('When type needs to be selected', () => {
    beforeEach(async () => {
      element = fixtureSync(html`<compas-open></compas-open>`);
      await element;
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('When no local file can be selected', () => {
    beforeEach(async () => {
      element = fixtureSync(
        html`<compas-open .allowLocalFile="${false}"></compas-open>`
      );
      await element;
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('When project needs to be selected', () => {
    beforeEach(async () => {
      element = fixtureSync(html`<compas-open></compas-open>`);
      element.selectedType = 'SCD';
      await element;
    });

    it('when other type selected then selectedType set to undefined', async () => {
      const button = <Button>(
        element.shadowRoot!.querySelector('mwc-button[id="reselect-type"]')
      );
      button.click();
      await element;

      expect(element.selectedType).to.be.undefined;
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });
});
