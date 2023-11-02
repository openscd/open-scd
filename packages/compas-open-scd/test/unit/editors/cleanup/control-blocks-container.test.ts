'use strict';
import { html, fixture, expect } from '@open-wc/testing';

import { Editing } from '../../../../src/Editing.js';
import { Wizarding } from '../../../../src/Wizarding.js';

import { CleanupControlBlocks } from '../../../../src/editors/cleanup/control-blocks-container.js';

import { ListItem } from '@material/mwc-list/mwc-list-item.js';

describe('Cleanup: Control Blocks Container', () => {
  customElements.define(
    'cleanup-plugin-controlblocks',
    Wizarding(Editing(CleanupControlBlocks))
  );
  let element: CleanupControlBlocks;

  beforeEach(async () => {
    element = await fixture(
      html`<cleanup-plugin-controlblocks></cleanup-plugin-controlblocks>`
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
        html`<cleanup-plugin-controlblocks
          .doc="${doc}"
        ></cleanup-plugin-controlblocks>`
      );
      await element.updateComplete;
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });

    it('creates correct number of checkboxes for the expected unreferenced control blocks', () => {
      expect(Array.from(element.unreferencedControls!).length).to.equal(5);
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

    it('after selecting and deselecting an item the remove button is disabled', async () => {
      const firstCheckListItem = element.cleanupListItems![0];
      await (<ListItem>firstCheckListItem!).click();
      await element.cleanupList!.layout();
      await (<ListItem>firstCheckListItem!).click();
      await element.cleanupList!.layout();
      expect(element.cleanButton).to.have.property('disabled', true);
    });

    it('after clicking select all the button is not disabled', async () => {
      const checkbox = element
        .shadowRoot!.querySelector('.cleanupList')!
        .shadowRoot!.querySelector('.checkall')!
        .querySelector('mwc-checkbox')!;
      await checkbox.click();
      await element.cleanupList?.layout();
      expect(element.cleanButton).to.have.property('disabled', false);
    });

    /* This test is currently failing and has been commented out 
    TODO: Investigate further. It appears that a filtered list will not
    unselect all if there are hidden items. */
    // it('after clicking select all twice the button is disabled', async () => {
    //   const checkbox = element
    //     .shadowRoot!.querySelector('.cleanupList')!
    //     .shadowRoot!.querySelector('.checkall')!
    //     .querySelector('mwc-checkbox')!;
    //   await checkbox.click();
    //   await element.cleanupList?.layout();
    //   await checkbox.click();
    //   await element.cleanupList?.layout();
    //   expect(element.cleanButton).to.have.property('disabled', true);
    // });
  });
});
