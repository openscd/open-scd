import { expect, fixture, html } from '@open-wc/testing';

import CompasCompareIEDPlugin from '../../../src/menu/CompasCompareIED.js';

describe('Compas Compare IED Plugin', () => {
  if (customElements.get('compas-compare-ied') === undefined)
    customElements.define('compas-compare-ied', CompasCompareIEDPlugin);

  let plugin: CompasCompareIEDPlugin;
  let doc: XMLDocument;

  beforeEach(async () => {
    plugin = await fixture(html`<compas-compare-ied></compas-compare-ied>`);
    doc = await fetch('/test/testfiles/menu/compare-ied-changed.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('show template project selection dialog', () => {
    beforeEach(async () => {
      plugin.doc = doc;
      plugin.run();
      await plugin.requestUpdate();
    });

    it('after closing the dialog everything stays undefined', async () => {
      expect(plugin.templateDoc).to.be.undefined;
      expect(plugin.selectedProjectIed).to.be.undefined;
      expect(plugin.selectedTemplateIed).to.be.undefined;

      plugin['onClosed']();
      await plugin.requestUpdate();

      expect(plugin.templateDoc).to.be.undefined;
      expect(plugin.selectedProjectIed).to.be.undefined;
      expect(plugin.selectedTemplateIed).to.be.undefined;
    });

    it('looks like its latest snapshot', async () => {
      await expect(plugin.dialog).to.equalSnapshot();
    });
  });
});
