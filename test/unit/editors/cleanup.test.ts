'use strict';
import { html, fixture, expect } from '@open-wc/testing';

import { Editing } from '../../../src/Editing.js';
import Cleanup from '../../../src/editors/Cleanup.js';
import { Wizarding } from '../../../src/Wizarding.js';

describe('Cleanup', () => {
  customElements.define('cleanup-plugin', Wizarding(Editing(Cleanup)));
  let element: Cleanup;

  beforeEach(async () => {
    element = await fixture(html`<cleanup-plugin></cleanup-plugin>`);
  });

  describe('without a doc loaded', () => {
    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('Unreferenced DataSets', () => {
    let doc: Document;
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/cleanup.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      element = await fixture(
        html`<cleanup-plugin .doc="${doc}"></cleanup-plugin>`
      );
      await element.updateComplete;
    });

    it('creates correct number of checkboxes for the expected unreferenced datasets', () => {
      expect(
        Array.from(element._cleanUnreferencedDataSetItems!).length
      ).to.equal(2);
    });

    it('has the remove button disabled by default', () => {
      expect(element._cleanUnreferencedDataSetsButton).to.have.property(
        'disabled',
        true
      );
    });

    it('has the remove button enabled after selecting an item', async () => {
      const firstCheckListItem: HTMLElement =
        element._cleanUnreferencedDataSetItems![0];
      await firstCheckListItem.click();
      expect(element._cleanUnreferencedDataSetsButton).to.have.property(
        'disabled',
        false
      );
    });

    it('after selecting and deselecting an item the remove button is disabled', async () => {
      const firstCheckListItem: HTMLElement =
        element._cleanUnreferencedDataSetItems![0];
      await firstCheckListItem.click();
      await firstCheckListItem.click();
      expect(element._cleanUnreferencedDataSetsButton).to.have.property(
        'disabled',
        true
      );
    });

    it('after clicking select all the button is not disabled', async () => {
      // TODO: What is a more effective way to select this?
      const checkbox = element
        .shadowRoot!.querySelector('.cleanupUnreferencedDataSetsList')!
        .shadowRoot!.querySelector('mwc-formfield')!
        .querySelector('mwc-checkbox')!;
      await checkbox.click();
      await element._cleanUnreferencedDataSetsList?.layout();
      expect(element._cleanUnreferencedDataSetsButton).to.have.property(
        'disabled',
        false
      );
    });

    it('after clicking select all twice the button is disabled', async () => {
      const checkbox = element
        .shadowRoot!.querySelector('.cleanupUnreferencedDataSetsList')!
        .shadowRoot!.querySelector('mwc-formfield')!
        .querySelector('mwc-checkbox')!;
      await checkbox.click();
      await checkbox.click();
      await element._cleanUnreferencedDataSetsList?.layout();
      expect(element._cleanUnreferencedDataSetsButton).to.have.property(
        'disabled',
        true
      );
    });
  });
});
