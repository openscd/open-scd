import { expect, fixture, html } from '@open-wc/testing';

import CompasOpenMenuPlugin from '../../../src/menu/CompasOpen.js';

describe('compas-open-menu', () => {
  if (customElements.get('compare-open-menu') === undefined)
    customElements.define('compare-open-menu', CompasOpenMenuPlugin);

  let plugin: CompasOpenMenuPlugin;

  beforeEach(async () => {
    plugin = await fixture(html`<compare-open-menu></compare-open-menu>`);
    await plugin.updateComplete;
  });

  it('looks like the latest snapshot', async () => {
    await expect(plugin).shadowDom.to.equalSnapshot();
  });
});
