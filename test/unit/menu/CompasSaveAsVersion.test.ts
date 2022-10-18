import { expect, fixture, html } from '@open-wc/testing';

import CompasSaveAsVersionMenuPlugin from '../../../src/menu/CompasSaveAsVersion.js';
import {
  COMPAS_SCL_PRIVATE_TYPE,
  getCompasSclFileType,
  getCompasSclName,
  getLabels,
  getPrivate,
} from '../../../src/compas/private';

describe('compas-save-menu', () => {
  if (customElements.get('compare-save-as-version-menu') === undefined)
    customElements.define(
      'compare-save-as-version-menu',
      CompasSaveAsVersionMenuPlugin
    );

  let plugin: CompasSaveAsVersionMenuPlugin;

  describe('with no document loaded', () => {
    beforeEach(async () => {
      plugin = await fixture(
        html`<compare-save-as-version-menu></compare-save-as-version-menu>`
      );
      await plugin.updateComplete;
    });

    it('looks like the latest snapshot', async () => {
      await expect(plugin).shadowDom.to.equalSnapshot();
    });
  });

  describe('with document loaded and no destination selected', () => {
    beforeEach(async () => {
      const doc = await fetch(
        '/test/testfiles/compas/save-compas-as-version.scd'
      )
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      plugin = await fixture(
        html`<compare-save-as-version-menu
          .doc="${doc}"
          docName="some.scd"
          docId="some-id"
        ></compare-save-as-version-menu>`
      );
      await plugin.updateComplete;
    });

    it('looks like the latest snapshot', async () => {
      await expect(plugin).shadowDom.to.equalSnapshot();
    });
  });

  describe('with document loaded and destination selected', () => {
    beforeEach(async () => {
      const doc = await fetch(
        '/test/testfiles/compas/save-compas-as-version.scd'
      )
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      const selectedDoc = await fetch('/test/testfiles/compas/save-compas.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      plugin = await fixture(
        html`<compare-save-as-version-menu
          .doc="${doc}"
          docName="some.scd"
          docId="some-id"
        ></compare-save-as-version-menu>`
      );
      plugin['saveToDoc'] = selectedDoc;
      plugin['saveToDocName'] = 'save-compas.scd';
      plugin['saveToDocId'] = 'some-id';
      await plugin.updateComplete;
    });

    it('when calling fixCompasPrivates then CoMPAS Privates are updated', () => {
      const privateElement = getPrivate(
        plugin.doc.documentElement,
        COMPAS_SCL_PRIVATE_TYPE
      );
      expect(getCompasSclName(privateElement)).to.be.text('AmsterdamCS');
      expect(getCompasSclFileType(privateElement)).to.be.text('SCD');
      expectLabels(privateElement!, 'Amsterdam');

      plugin['copyCompasPrivates']();

      expect(getCompasSclName(privateElement)).to.be.text('UtrechtCS');
      expect(getCompasSclFileType(privateElement)).to.be.text('CID');
      expectLabels(privateElement!, 'Utrecht');
    });

    it('looks like the latest snapshot', async () => {
      await expect(plugin).shadowDom.to.equalSnapshot();
    });
  });

  function expectLabels(privateElement: Element, label: string): void {
    const labelsElement = getLabels(privateElement);
    const labelElements = labelsElement?.querySelectorAll('Label') ?? [];

    expect(labelElements.length).to.be.equal(1);
    expect(labelElements[0]).to.be.text(label);
  }
});
