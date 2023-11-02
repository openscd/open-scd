import { expect, fixture, html } from '@open-wc/testing';

import CompareIEDPlugin from '../../../src/menu/CompareIED.js';
import { PlainCompareList } from '../../../src/plain-compare-list.js';

describe('Compare IED Plugin', () => {
  if (customElements.get('compare-ied') === undefined)
    customElements.define('compare-ied', CompareIEDPlugin);

  let plugin: CompareIEDPlugin;
  let doc: XMLDocument;
  let template: XMLDocument;

  beforeEach(async () => {
    plugin = await fixture(html`<compare-ied></compare-ied>`);
    doc = await fetch('/test/testfiles/menu/compare-ied-changed.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    template = await fetch('/test/testfiles/menu/compare-ied-original.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('show template project selection dialog', () => {
    beforeEach(async () => {
      plugin.doc = doc;
      plugin.run();
      await plugin.requestUpdate();
    });

    it('after closing the dialog everything set to undefined', async () => {
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

  describe('show ied selection lists dialog', () => {
    beforeEach(async () => {
      plugin.doc = doc;
      plugin.templateDoc = template;
      plugin.run();
      await plugin.requestUpdate();
    });

    it('expect the correct number of IEDs from project', () => {
      expect(plugin.ieds).to.have.length(5);
    });

    it('expect the correct number of IEDs from template project', () => {
      expect(plugin.templateIeds).to.have.length(4);
    });

    it('after closing the dialog everything set to undefined', async () => {
      expect(plugin.templateDoc).to.not.be.undefined;
      expect(plugin.selectedProjectIed).to.be.undefined;
      expect(plugin.selectedTemplateIed).to.be.undefined;

      plugin['onClosed']();
      await plugin.requestUpdate();

      // expect(plugin.templateDoc).to.be.undefined;
      expect(plugin.selectedProjectIed).to.be.undefined;
      expect(plugin.selectedTemplateIed).to.be.undefined;
    });

    it('looks like its latest snapshot', async () => {
      await expect(plugin.dialog).to.equalSnapshot();
    });
  });

  describe('show compare dialog with no differences', () => {
    beforeEach(async () => {
      plugin.doc = doc;
      plugin.templateDoc = template;
      plugin.selectedProjectIed =
        doc.querySelector('IED[name="FieldC_QA1_QB1_QB2_QC9"]') ?? undefined;
      plugin.selectedTemplateIed =
        template.querySelector('IED[name="FieldC_QA1_QB1_QB2_QC9"]') ??
        undefined;
      plugin.run();
      await plugin.requestUpdate();
    });

    it('looks like its latest snapshot', async () => {
      await expect(plugin.dialog).to.equalSnapshot();
    });
  });

  describe('show compare dialog with differences', () => {
    beforeEach(async () => {
      plugin.doc = doc;
      plugin.templateDoc = template;
      plugin.selectedProjectIed =
        doc.querySelector('IED[name="FieldA_QA1_QB1_QB2_QC9"]') ?? undefined;
      plugin.selectedTemplateIed =
        template.querySelector('IED[name="FieldA_QA1_QB1_QB2_QC9"]') ??
        undefined;
      plugin.run();
      await plugin.requestUpdate();
    });

    it('after closing the dialog everything set to undefined', async () => {
      expect(plugin.templateDoc).to.not.be.undefined;
      expect(plugin.selectedProjectIed).to.not.be.undefined;
      expect(plugin.selectedTemplateIed).to.not.be.undefined;

      plugin['onClosed']();
      await plugin.requestUpdate();

      expect(plugin.selectedProjectIed).to.be.undefined;
      expect(plugin.selectedTemplateIed).to.be.undefined;
    });

  });

});
