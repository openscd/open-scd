import { expect, fixture, html } from '@open-wc/testing';

import CompasSaveAsMenuPlugin from '../../../src/menu/CompasSaveAs.js';

describe('compas-save-menu', () => {
  if (customElements.get('compare-save-as-menu') === undefined)
    customElements.define('compare-save-as-menu', CompasSaveAsMenuPlugin);

  let plugin: CompasSaveAsMenuPlugin;

  describe('with no document loaded', () => {
    beforeEach(async () => {
      plugin = await fixture(
        html`<compare-save-as-menu></compare-save-as-menu>`
      );
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
        html`<compare-save-as-menu
          .doc="${doc}"
          docName="some.scd"
          docId="some-id"
        ></compare-save-as-menu>`
      );
      await plugin.updateComplete;
    });

    it('looks like the latest snapshot', async () => {
      await expect(plugin).shadowDom.to.equalSnapshot();
    });
  });
});
