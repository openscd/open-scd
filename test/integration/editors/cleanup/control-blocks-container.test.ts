'use strict';
import { html, fixture, expect } from '@open-wc/testing';

import { Editing } from '../../../../src/Editing.js';
import { Wizarding } from '../../../../src/Wizarding.js';

import { CleanupControlBlocks } from '../../../../src/editors/cleanup/control-blocks-container.js';
import { cleanSCLItems } from '../../../../src/editors/cleanup/foundation.js';

describe('cleanup-editor integration: unreferenced control blocks', () => {
  customElements.define(
    'cleanup-plugin-controlblocks',
    Wizarding(Editing(CleanupControlBlocks))
  );
  let element: CleanupControlBlocks;

  describe('without a doc loaded', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<cleanup-plugin-controlblocks
          .doc="${null}"
        ></cleanup-plugin-controlblocks>`
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
        html`<cleanup-plugin-controlblocks
          .doc="${doc}"
        ></cleanup-plugin-controlblocks>`
      );
      await element.updateComplete;
    });

    it('correctly removes all LogControl entries from the SCL', async () => {
      await element.cleanupGSEControlFilter.click();
      await element.cleanupSampledValueControlFilter.click();
      // select all items and update list
      const checkbox = element
        .shadowRoot!.querySelector('.cleanupList')!
        .shadowRoot!.querySelector('mwc-formfield')!
        .querySelector('mwc-checkbox')!;
      await checkbox.click();
      await element.cleanupList?.layout();

      await element.cleanButton.click();

      // the correct number of LogControls should remain
      expect(element.doc.querySelectorAll('LogControl')).to.have.length(1);
      expect(
        element.doc.querySelectorAll('LogControl[name="LogNP"]')
      ).to.have.length(0);
    });

    it('correctly removes all GSEControl entries and Address entries from the SCL', async () => {
      await element.cleanupLogControlFilter.click();
      await element.cleanupSampledValueControlFilter.click();
      // select all items and update list
      const checkbox = element
        .shadowRoot!.querySelector('.cleanupList')!
        .shadowRoot!.querySelector('mwc-formfield')!
        .querySelector('mwc-checkbox')!;
      await checkbox.click();
      await element.cleanupList?.layout();

      await element.cleanButton.click();

      // the correct number of GSEControl should remain
      expect(element.doc.querySelectorAll('GSEControl')).to.have.lengthOf(2);
      expect(
        element.doc.querySelectorAll(
          'GSEControl[name="GCB_NP"], GSEControl[name="GCB2_NP"]'
        )
      ).to.have.lengthOf(0);
      // Addresses removed
      expect(
        element.doc.querySelectorAll('GSE[cbName="GCB_NP"]')
      ).to.have.lengthOf(0);
      expect(element.doc.querySelectorAll('GSE')).to.have.lengthOf(1);
    });

    it('correctly removes all SampledValueControl and Address entries from the SCL', async () => {
      await element.cleanupLogControlFilter.click();
      await element.cleanupGSEControlFilter.click();
      // select all items and update list
      const checkbox = element
        .shadowRoot!.querySelector('.cleanupList')!
        .shadowRoot!.querySelector('mwc-formfield')!
        .querySelector('mwc-checkbox')!;
      await checkbox.click();
      await element.cleanupList?.layout();

      await element.cleanButton.click();

      // the correct number of SampledValueControls should remain
      expect(
        element.doc.querySelectorAll('SampledValueControl')
      ).to.have.lengthOf(1);
      expect(
        element.doc.querySelectorAll('SampledValueControl[name="MSVCB01_A"]')
      ).to.have.lengthOf(0);
      // Addresses removed
      expect(
        element.doc.querySelectorAll('SMV[cbName="MSVCB01_A"]')
      ).to.have.lengthOf(0);
      expect(element.doc.querySelectorAll('SMV')).to.have.lengthOf(1);
    });

    describe('if the Address checkbox is unchecked', () => {
      beforeEach(async () => {
        element.cleanupAddressCheckbox!.checked = false;
        await element.cleanupAddressCheckbox!.requestUpdate();
      });

      it('correctly removes all SampledValueControl but not Address entries from the SCL', async () => {
        await element.cleanupLogControlFilter.click();
        await element.cleanupGSEControlFilter.click();
        // select all items and update list
        const checkbox = element
          .shadowRoot!.querySelector('.cleanupList')!
          .shadowRoot!.querySelector('mwc-formfield')!
          .querySelector('mwc-checkbox')!;
        await checkbox.click();
        await element.cleanupList?.layout();
        await element.cleanButton.click();

        // the correct number of SampledValueControls should remain
        expect(
          element.doc.querySelectorAll('SampledValueControl')
        ).to.have.lengthOf(1);
        expect(
          element.doc.querySelectorAll('SampledValueControl[name="MSVCB01_A"]')
        ).to.have.lengthOf(0);
        // Addresses unchanged
        expect(
          element.doc.querySelectorAll('SMV[cbName="MSVCB01_A"]')
        ).to.have.lengthOf(1);
        expect(element.doc.querySelectorAll('SMV')).to.have.lengthOf(2);
      });

      it('correctly removes all GSEControl entries but not Address entries from the SCL', async () => {
        await element.cleanupLogControlFilter.click();
        await element.cleanupSampledValueControlFilter.click();
        // select all items and update list
        const checkbox = element
          .shadowRoot!.querySelector('.cleanupList')!
          .shadowRoot!.querySelector('mwc-formfield')!
          .querySelector('mwc-checkbox')!;
        await checkbox.click();
        await element.cleanupList?.layout();

        element.cleanupAddressCheckbox!.checked = false;
        await element.cleanupAddressCheckbox!.requestUpdate();

        await element.cleanButton.click();

        // the correct number of GSEControl should remain
        expect(element.doc.querySelectorAll('GSEControl')).to.have.lengthOf(2);
        expect(
          doc.querySelectorAll(
            'GSEControl[name="GCB_NP"], GSEControl[name="GCB2_NP"]'
          )
        ).to.have.lengthOf(0);
        // Addresses unchanged
        expect(
          element.doc.querySelectorAll('GSE[cbName="GCB_NP"]')
        ).to.have.lengthOf(1);
        expect(element.doc.querySelectorAll('GSE')).to.have.lengthOf(2);
      });
    });

    describe('if the ReportControl filter is enabled', async () => {
      beforeEach(async () => {
        await element.cleanupReportControlFilter.click();
        // select all items and update list
        const checkbox = element
          .shadowRoot!.querySelector('.cleanupList')!
          .shadowRoot!.querySelector('mwc-formfield')!
          .querySelector('mwc-checkbox')!;
        await checkbox.click();
        element.cleanupList?.layout();
      });

      it('creates 5 delete actions (ReportControl, GSEControl x 2, LogControl, SampledValueControl)', () => {
        const cleanItems = Array.from(
          (<Set<number>>element.cleanupList!.index).values()
        ).map(index => element.unreferencedControls[index]);
        const deleteActions = cleanSCLItems(cleanItems);
        expect(deleteActions.length).to.equal(5);
      });
    });

    describe('if the LogControl filter is disabled', async () => {
      beforeEach(async () => {
        await element.cleanupLogControlFilter.click();
        // select all items and update list
        const checkbox = element
          .shadowRoot!.querySelector('.cleanupList')!
          .shadowRoot!.querySelector('mwc-formfield')!
          .querySelector('mwc-checkbox')!;
        await checkbox.click();
        element.cleanupList?.layout();
      });

      it('creates 3 Delete Actions (GSEControl x 2, SampledValueControl)', async () => {
        const cleanItems = Array.from(
          (<Set<number>>element.cleanupList!.index).values()
        ).map(index => element.unreferencedControls[index]);
        const deleteActions = cleanSCLItems(cleanItems);
        expect(deleteActions.length).to.equal(3);
      });
    });

    describe('if the GSEControl filter is disabled', async () => {
      beforeEach(async () => {
        await element.cleanupGSEControlFilter.click();
        // select all items and update list
        const checkbox = element
          .shadowRoot!.querySelector('.cleanupList')!
          .shadowRoot!.querySelector('mwc-formfield')!
          .querySelector('mwc-checkbox')!;
        await checkbox.click();
        element.cleanupList?.layout();
      });

      it('creates 2 Delete Actions (LogControl, SampledValueControl)', async () => {
        const cleanItems = Array.from(
          (<Set<number>>element.cleanupList!.index).values()
        ).map(index => element.unreferencedControls[index]);
        const deleteActions = cleanSCLItems(cleanItems);
        expect(deleteActions.length).to.equal(2);
      });
    });

    describe('if the SampledValueControl filter is disabled', async () => {
      beforeEach(async () => {
        await element.cleanupSampledValueControlFilter.click();
        // select all items and update list
        const checkbox = element
          .shadowRoot!.querySelector('.cleanupList')!
          .shadowRoot!.querySelector('mwc-formfield')!
          .querySelector('mwc-checkbox')!;
        await checkbox.click();
        element.cleanupList?.layout();
      });

      it('creates 3 Delete Actions (GSEControl x 2, LogControl)', async () => {
        const cleanItems = Array.from(
          (<Set<number>>element.cleanupList!.index).values()
        ).map(index => element.unreferencedControls[index]);
        const deleteActions = cleanSCLItems(cleanItems);
        expect(deleteActions.length).to.equal(3);
      });
    });
  });
});
