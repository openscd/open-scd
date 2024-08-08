'use strict';
import { html, fixture, expect } from '@open-wc/testing';

import '@openscd/open-scd/test/mock-open-scd.js';
import { MockOpenSCD } from '@openscd/open-scd/test/mock-open-scd.js';

import '../../../../src/editors/cleanup/datasets-container.js';
import { CleanupDatasets } from '../../../../src/editors/cleanup/datasets-container.js';

describe('Cleanup: Datasets Container', () => {
  let element: CleanupDatasets;
  let parent: MockOpenSCD;
  beforeEach(async () => {
    parent = await fixture(
      html`<mock-open-scd><cleanup-datasets></cleanup-datasets></mock-open-scd>`
    );

    element = parent.getActivePlugin();

    await parent.updateComplete;
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
      parent = await fixture(
        html`<mock-open-scd
          ><cleanup-datasets .doc="${doc}"></cleanup-datasets
        ></mock-open-scd>`
      );
      element = parent.getActivePlugin();
      await parent.updateComplete;
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
