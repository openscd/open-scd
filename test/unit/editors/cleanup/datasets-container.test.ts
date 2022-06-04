'use strict';
import { html, fixture, expect } from '@open-wc/testing';

import { Editing } from '../../../../src/Editing.js';
import { Wizarding } from '../../../../src/Wizarding.js';

import { CleanupDatasets } from '../../../../src/editors/cleanup/datasets-container.js';

describe('Cleanup: Datasets Container', () => {
  customElements.define(
    'cleanup-plugin-datasets',
    Wizarding(Editing(CleanupDatasets))
  );
  let element: CleanupDatasets;

  beforeEach(async () => {
    element = await fixture(
      html`<cleanup-plugin-datasets></cleanup-plugin-datasets>`
    );
  });

  describe('without a doc loaded', () => {
    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('with a test file loaded', () => {
    let doc: Document;
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/cleanup.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      element = await fixture(
        html`<cleanup-plugin-datasets .doc="${doc}"></cleanup-plugin-datasets>`
      );
      await element.updateComplete;
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });

    it('creates correct number of checkboxes for the expected unreferenced datasets', () => {
      expect(Array.from(element.dataSetItems!).length).to.equal(2);
    });

    it('has the remove button disabled by default', () => {
      expect(element.cleanupButton).to.have.property('disabled', true);
    });

    it('has the remove button enabled after selecting an item', async () => {
      const firstCheckListItem: HTMLElement = element.dataSetItems![0];
      await firstCheckListItem.click();
      expect(element.cleanupButton).to.have.property('disabled', false);
    });

    it('after selecting and deselecting an item the remove button is disabled', async () => {
      const firstCheckListItem: HTMLElement = element.dataSetItems![0];
      await firstCheckListItem.click();
      await firstCheckListItem.click();
      expect(element.cleanupButton).to.have.property('disabled', true);
    });

    it('after clicking select all the button is not disabled', async () => {
      // TODO: What is a more effective way to select this?
      const checkbox = element
        .shadowRoot!.querySelector('.dataSetList')!
        .shadowRoot!.querySelector('.checkall')!
        .querySelector('mwc-checkbox')!;
      await checkbox.click();
      await element.dataSetList?.layout();
      expect(element.cleanupButton).to.have.property('disabled', false);
    });

    it('after clicking select all twice the button is disabled', async () => {
      const checkbox = element
        .shadowRoot!.querySelector('.dataSetList')!
        .shadowRoot!.querySelector('.checkall')!
        .querySelector('mwc-checkbox')!;
      await checkbox.click();
      await checkbox.click();
      await element.dataSetList?.layout();
      expect(element.cleanupButton).to.have.property('disabled', true);
    });
  });
});
