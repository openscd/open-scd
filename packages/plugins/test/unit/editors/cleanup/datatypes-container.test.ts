'use strict';
import { html, fixture, expect } from '@open-wc/testing';

import '@openscd/open-scd/test/mock-open-scd.js';
import { MockOpenSCD } from '@openscd/open-scd/test/mock-open-scd.js';

import '../../../../src/editors/cleanup/datatypes-container.js';
import { CleanupDataTypes } from '../../../../src/editors/cleanup/datatypes-container.js';

import { ListItem } from '@material/mwc-list/mwc-list-item.js';

describe('Cleanup: DataTypes Container', () => {
  let element: CleanupDataTypes;
  let parent: MockOpenSCD;

  beforeEach(async () => {
    parent = await fixture(
      html`<mock-open-scd
        ><cleanup-data-types></cleanup-data-types
      ></mock-open-scd>`
    );
    element = parent.getActivePlugin();
    await parent.updateComplete;
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
      parent = await fixture(
        html`<mock-open-scd
          ><cleanup-data-types .doc="${doc}"></cleanup-data-types
        ></mock-open-scd>`
      );
      element = parent.getActivePlugin();
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
