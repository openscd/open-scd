'use strict';
import { html, fixture, expect } from '@open-wc/testing';

import { Editing } from '../../../../src/Editing.js';
import { Wizarding } from '../../../../src/Wizarding.js';

import { CleanupDataTypes } from '../../../../src/editors/cleanup/datatypes-container.js';
import { cleanSCLItems } from '../../../../src/editors/cleanup/foundation.js';

describe('cleanup-editor integration: unreferenced control blocks', () => {
  customElements.define(
    'cleanup-plugin-data-types',
    Wizarding(Editing(CleanupDataTypes))
  );
  let element: CleanupDataTypes;

  describe('without a doc loaded', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<cleanup-plugin-data-types
          .doc="${null}"
        ></cleanup-plugin-data-types>`
      );
      await element.updateComplete;
    });

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
        html`<cleanup-plugin-data-types
          .doc="${doc}"
        ></cleanup-plugin-data-types>`
      );
      await element.updateComplete;
    });

    it('correctly removes a LNodeType entry from the SCL', async () => {
      await element.cleanupDOTypeFilter.click();
      await element.cleanupDATypeFilter.click();
      await element.cleanupEnumTypeFilter.click();
      // select all items and update list
      const checkbox = element
        .shadowRoot!.querySelector('.cleanup-list')!
        .shadowRoot!.querySelector('mwc-formfield')!
        .querySelector('mwc-checkbox')!;
      await checkbox.click();
      await element.cleanupList?.layout();

      await element.cleanButton.click();

      // the correct number of LNodeTypes should remain
      expect(element.doc.querySelectorAll('LNodeType')).to.have.length(12);
      expect(
        element.doc.querySelectorAll('LNodeType[id="NotUsedTVTR"]')
      ).to.have.length(0);
    });

    it('correctly removes two DOTypes and an SDO from the SCL', async () => {
      await element.cleanupLNodeTypeFilter.click();
      await element.cleanupDATypeFilter.click();
      await element.cleanupEnumTypeFilter.click();
      // select all items and update list
      const checkbox = element
        .shadowRoot!.querySelector('.cleanup-list')!
        .shadowRoot!.querySelector('mwc-formfield')!
        .querySelector('mwc-checkbox')!;
      await checkbox.click();
      await element.cleanupList?.layout();

      await element.cleanButton.click();

      // the correct number of DOTypes should remain (we actually remove 3 here)
      expect(element.doc.querySelectorAll('DOType')).to.have.lengthOf(23);
      expect(
        element.doc.querySelectorAll(
          'DOType[id="NotUsedDummy.SPS"], DOType[name="WYE_2_3"], DOType[id="CMV_1"]'
        )
      ).to.have.lengthOf(0);
    });

    it('correctly removes two DATypes and one referenced via a BDA from the SCL', async () => {
      await element.cleanupLNodeTypeFilter.click();
      await element.cleanupDOTypeFilter.click();
      await element.cleanupEnumTypeFilter.click();
      // select all items and update list
      const checkbox = element
        .shadowRoot!.querySelector('.cleanup-list')!
        .shadowRoot!.querySelector('mwc-formfield')!
        .querySelector('mwc-checkbox')!;
      await checkbox.click();
      await element.cleanupList?.layout();

      await element.cleanButton.click();

      // the correct number of DATypes should remain (we actually remove 3 here)
      expect(element.doc.querySelectorAll('DAType')).to.have.lengthOf(13);
      expect(
        element.doc.querySelectorAll(
          'DAType[id="NotUsedDummy.LPHD1.Sim.Cancel"], DAType[id="OnlySubUsedVector_0"], DAType[id="AnalogValue_0"]'
        )
      ).to.have.lengthOf(0);
    });

    it('correctly removes two EnumTypes', async () => {
      await element.cleanupLNodeTypeFilter.click();
      await element.cleanupDOTypeFilter.click();
      await element.cleanupDATypeFilter.click();
      // select all items and update list
      const checkbox = element
        .shadowRoot!.querySelector('.cleanup-list')!
        .shadowRoot!.querySelector('mwc-formfield')!
        .querySelector('mwc-checkbox')!;
      await checkbox.click();
      await element.cleanupList?.layout();

      await element.cleanButton.click();

      // the correct number of EnumTypes should remain (we remove 2 here)
      expect(element.doc.querySelectorAll('EnumType')).to.have.lengthOf(8);
      expect(
        element.doc.querySelectorAll(
          'EnumType[id="NotUsedDir"]'
        )
      ).to.have.lengthOf(0);
    });


    describe('if the Remove subtypes checkbox is unchecked', () => {
      beforeEach(async () => {
        element.cleanSubTypesCheckbox!.checked = false;
        await element.cleanSubTypesCheckbox!.requestUpdate();
      });

      it('correctly removes two DOTypes and _not_ one referenced via an SDO from the SCL', async () => {
        await element.cleanupLNodeTypeFilter.click();
        await element.cleanupDATypeFilter.click();
        await element.cleanupEnumTypeFilter.click();
        // select all items and update list
        const checkbox = element
          .shadowRoot!.querySelector('.cleanup-list')!
          .shadowRoot!.querySelector('mwc-formfield')!
          .querySelector('mwc-checkbox')!;
        await checkbox.click();
        await element.cleanupList?.layout();

        await element.cleanButton.click();

        // the correct number of DOTypes should remain (we remove 2 here)
        expect(element.doc.querySelectorAll('DOType')).to.have.lengthOf(24);
        expect(
          element.doc.querySelectorAll(
            'DOType[id="NotUsedDummy.SPS"], DOType[id="WYE_2_3"]'
          )
        ).to.have.lengthOf(0);
        expect(element.doc.querySelectorAll('DOType[id="CMV_1"]')).to.have.lengthOf(1);
      });

      it('correctly removes two DATypes and _not_ one referenced via a BDA from the SCL', async () => {
        await element.cleanupLNodeTypeFilter.click();
        await element.cleanupDOTypeFilter.click();
        await element.cleanupEnumTypeFilter.click();
        // select all items and update list
        const checkbox = element
          .shadowRoot!.querySelector('.cleanup-list')!
          .shadowRoot!.querySelector('mwc-formfield')!
          .querySelector('mwc-checkbox')!;
        await checkbox.click();
        await element.cleanupList?.layout();

        await element.cleanButton.click();

        // the correct number of DATypes should remain (we remove 2 here)
        expect(element.doc.querySelectorAll('DAType')).to.have.lengthOf(14);
        expect(
          element.doc.querySelectorAll(
            'DAType[id="NotUsedDummy.LPHD1.Sim.Cancel"], DAType[id="OnlySubUsedVector_0"]'
          )
        ).to.have.lengthOf(0);
        expect(
          element.doc.querySelectorAll('DAType[id="AnalogValue_0"]')
        ).to.have.lengthOf(1);
      });
    });

    describe('if the LN filter is disabled', async () => {
      beforeEach(async () => {
        await element.cleanupLNodeTypeFilter.click();
        // select all items and update list
        const checkbox = element
          .shadowRoot!.querySelector('.cleanup-list')!
          .shadowRoot!.querySelector('mwc-formfield')!
          .querySelector('mwc-checkbox')!;
        await checkbox.click();
        await element.cleanupList?.layout();
      });

      it('creates 9 delete actions (DOx4, DAx3, ENx2)', () => {
        const deleteActions = cleanSCLItems(element.getCleanItems());
        expect(deleteActions.length).to.equal(9);
      });
    });

    describe('if the DO filter is disabled', async () => {
      beforeEach(async () => {
        await element.cleanupDOTypeFilter.click();
        // select all items and update list
        const checkbox = element
          .shadowRoot!.querySelector('.cleanup-list')!
          .shadowRoot!.querySelector('mwc-formfield')!
          .querySelector('mwc-checkbox')!;
        await checkbox.click();
        element.cleanupList?.layout();
      });

      it('creates 5 delete actions (LNx1, DAx3, ENx1)', () => {
        const deleteActions = cleanSCLItems(element.getCleanItems());
        expect(deleteActions.length).to.equal(5);
      });
    });

    describe('if the DA filter is disabled', async () => {
      beforeEach(async () => {
        await element.cleanupDATypeFilter.click();
        // select all items and update list
        const checkbox = element
          .shadowRoot!.querySelector('.cleanup-list')!
          .shadowRoot!.querySelector('mwc-formfield')!
          .querySelector('mwc-checkbox')!;
        await checkbox.click();
        element.cleanupList?.layout();
      });

      it('creates 7 Delete Actions (LNx1, DOx4, ENx2)', async () => {
        const deleteActions = cleanSCLItems(element.getCleanItems());
        expect(deleteActions.length).to.equal(7);
      });
    });

    describe('if the EN filter is disabled', async () => {
      beforeEach(async () => {
        await element.cleanupEnumTypeFilter.click();
        // select all items and update list
        const checkbox = element
          .shadowRoot!.querySelector('.cleanup-list')!
          .shadowRoot!.querySelector('mwc-formfield')!
          .querySelector('mwc-checkbox')!;
        await checkbox.click();
        element.cleanupList?.layout();
      });

      it('creates 9 Delete Actions (LNx1, DOx4, DAx3, ENx1)', async () => {
        const deleteActions = cleanSCLItems(element.getCleanItems());
        expect(deleteActions.length).to.equal(9);
      });
    });
  });
});
