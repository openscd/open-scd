'use strict';
import { html, fixture, expect } from '@open-wc/testing';

import { Editing } from '../../../../src/Editing.js';
import { Wizarding } from '../../../../src/Wizarding.js';

import { CleanupDataTypes } from '../../../../src/editors/cleanup/datatypes-container.js';

import { ListItem } from '@material/mwc-list/mwc-list-item.js';

describe('Cleanup: DataTypes Container', () => {
  customElements.define(
    'cleanup-plugin-data-types',
    Wizarding(Editing(CleanupDataTypes))
  );
  let element: CleanupDataTypes;

  beforeEach(async () => {
    element = await fixture(
      html`<cleanup-plugin-data-types></cleanup-plugin-data-types>`
    );
  });

  describe('without a doc loaded', () => {
    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('With a test file loaded', () => {
    let doc: Document;
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/cleanup.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      element = await fixture(
        html`<cleanup-plugin-data-types
          .doc="${doc}"
        ></cleanup-plugin-data-types>`
      );
      await element.updateComplete;
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });

    it('creates correct number of checkboxes for the expected unreferenced datatypes', () => {
      expect(Array.from(element.unreferencedDataTypes!).length).to.equal(9);
    });

    it('has the remove button disabled by default', () => {
      expect(element.cleanButton).to.have.property('disabled', true);
    });

    it('has the remove button enabled after selecting an item', async () => {
      const firstCheckListItem = element.cleanupListItems![0];
      await (<ListItem>firstCheckListItem!).click();
      await element.cleanupList!.layout();
      expect(element.cleanButton).to.have.property('disabled', false);
    });
  });
});
