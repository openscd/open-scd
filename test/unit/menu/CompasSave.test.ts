import { expect, fixture, html } from '@open-wc/testing';

import CompasSaveMenuPlugin from '../../../src/menu/CompasSave.js';

describe('compas-save-menu', () => {
  if (customElements.get('compare-save-menu') === undefined)
    customElements.define('compare-save-menu', CompasSaveMenuPlugin);

  let plugin: CompasSaveMenuPlugin;

  describe('with no document loaded', () => {
    beforeEach(async () => {
      plugin = await fixture(html`<compare-save-menu></compare-save-menu>`);
      await plugin.updateComplete;
    });

    it('looks like the latest snapshot', async () => {
      await expect(plugin).shadowDom.to.equalSnapshot();
    });
  });

  describe('with document loaded', () => {
    beforeEach(async () => {
      const doc = await fetch(
        '/test/testfiles/compas/compas-scl-private-update-existing.scd'
      )
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      plugin = await fixture(
        html`<compare-save-menu
          .doc="${doc}"
          docName="some.scd"
          docId="some-id"
        ></compare-save-menu>`
      );
      await plugin.updateComplete;
    });

    it('looks like the latest snapshot', async () => {
      await expect(plugin).shadowDom.to.equalSnapshot();
    });
  });
});
