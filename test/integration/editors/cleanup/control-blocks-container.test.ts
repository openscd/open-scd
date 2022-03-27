'use strict';
import { html, fixture, expect } from '@open-wc/testing';

import { Editing } from '../../../../src/Editing.js';
import { Wizarding } from '../../../../src/Wizarding.js';

import { CleanupControlBlocks } from '../../../../src/editors/cleanup/control-blocks-container.js';

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

  describe('Unreferenced Control Blocks', () => {
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

    it('looks like the latest snapshot with a test file loaded', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });

    it('creates 4 Delete Actions for GSEControl x 2, LogControl and SampledValueControl', async () => {
      // select all items and update list
      const checkbox = element
        .shadowRoot!.querySelector('.cleanupList')!
        .shadowRoot!.querySelector('mwc-formfield')!
        .querySelector('mwc-checkbox')!;
      await checkbox.click();
      element._cleanupList?.layout();
      const cleanItems = Array.from(
        (<Set<number>>element._cleanupList!.index).values()
      ).map(index => element._unreferencedControls[index]);
      const deleteActions = element.cleanSCLItems(cleanItems);
      expect(deleteActions.length).to.equal(4);
    });

    it('creates 5 Delete Actions if the ReportControl Filter is enabled for ReportControl x 1, GSEControl x 2, LogControl and SampledValueControl', async () => {
      await element._cleanupReportControlFilter.click();
      // select all items and update list
      const checkbox = element
        .shadowRoot!.querySelector('.cleanupList')!
        .shadowRoot!.querySelector('mwc-formfield')!
        .querySelector('mwc-checkbox')!;
      await checkbox.click();
      element._cleanupList?.layout();
      const cleanItems = Array.from(
        (<Set<number>>element._cleanupList!.index).values()
      ).map(index => element._unreferencedControls[index]);
      const deleteActions = element.cleanSCLItems(cleanItems);
      expect(deleteActions.length).to.equal(5);
    });

    it('creates 3 Delete Actions if the LogControl Filter is disabled for GSEControl x 2 and SampledValueControl', async () => {
      await element._cleanupLogControlFilter.click();
      // select all items and update list
      const checkbox = element
        .shadowRoot!.querySelector('.cleanupList')!
        .shadowRoot!.querySelector('mwc-formfield')!
        .querySelector('mwc-checkbox')!;
      await checkbox.click();
      element._cleanupList?.layout();
      const cleanItems = Array.from(
        (<Set<number>>element._cleanupList!.index).values()
      ).map(index => element._unreferencedControls[index]);
      const deleteActions = element.cleanSCLItems(cleanItems);
      expect(deleteActions.length).to.equal(3);
    });

    it('creates 2 Delete Actions if the GSEControl Filter is disabled for LogControl and SampledValueControl', async () => {
      await element._cleanupGSEControlFilter.click();
      // select all items and update list
      const checkbox = element
        .shadowRoot!.querySelector('.cleanupList')!
        .shadowRoot!.querySelector('mwc-formfield')!
        .querySelector('mwc-checkbox')!;
      await checkbox.click();
      element._cleanupList?.layout();
      const cleanItems = Array.from(
        (<Set<number>>element._cleanupList!.index).values()
      ).map(index => element._unreferencedControls[index]);
      const deleteActions = element.cleanSCLItems(cleanItems);
      expect(deleteActions.length).to.equal(2);
    });

    it('creates 3 Delete Actions if the SampledValueControl Filter is disabled for GSEControl x 2 and LogControl', async () => {
      await element._cleanupSampledValueControlFilter.click();
      // select all items and update list
      const checkbox = element
        .shadowRoot!.querySelector('.cleanupList')!
        .shadowRoot!.querySelector('mwc-formfield')!
        .querySelector('mwc-checkbox')!;
      await checkbox.click();
      element._cleanupList?.layout();
      const cleanItems = Array.from(
        (<Set<number>>element._cleanupList!.index).values()
      ).map(index => element._unreferencedControls[index]);
      const deleteActions = element.cleanSCLItems(cleanItems);
      expect(deleteActions.length).to.equal(3);
    });

    it('correctly removes all LogControl entries from the SCL file', async () => {
      await element._cleanupGSEControlFilter.click();
      await element._cleanupSampledValueControlFilter.click();
      // select all items and update list
      const checkbox = element
        .shadowRoot!.querySelector('.cleanupList')!
        .shadowRoot!.querySelector('mwc-formfield')!
        .querySelector('mwc-checkbox')!;
      await checkbox.click();
      await element._cleanupList?.layout();
      
      await element._cleanButton.click();

      // the correct number of LogControls should remain
      expect(doc.querySelectorAll('LogControl')).to.have.length(1);
      expect(doc.querySelectorAll('LogControl[name="LogNP"]')).to.have.length(
        0
      );
    });

    it('correctly removes all GSEControl entries and Address entries from the SCL file', async () => {
      await element._cleanupLogControlFilter.click();
      await element._cleanupSampledValueControlFilter.click();
      // select all items and update list
      const checkbox = element
        .shadowRoot!.querySelector('.cleanupList')!
        .shadowRoot!.querySelector('mwc-formfield')!
        .querySelector('mwc-checkbox')!;
      await checkbox.click();
      await element._cleanupList?.layout();

      await element._cleanButton.click();

      // the correct number of GSEControl should remain
      expect(doc.querySelectorAll('GSEControl')).to.have.lengthOf(2);
      expect(
        doc.querySelectorAll(
          'GSEControl[name="GCB_NP"], GSEControl[name="GCB2_NP"]'
        )
      ).to.have.lengthOf(0);
      // Addresses removed
      expect(doc.querySelectorAll('GSE[cbName="GCB_NP"]')).to.have.lengthOf(0);
      expect(doc.querySelectorAll('GSE')).to.have.lengthOf(1);
    });

    it('correctly removes all GSEControl entries but not Address entries if it is unchecked', async () => {
      await element._cleanupLogControlFilter.click();
      await element._cleanupSampledValueControlFilter.click();
      // select all items and update list
      const checkbox = element
        .shadowRoot!.querySelector('.cleanupList')!
        .shadowRoot!.querySelector('mwc-formfield')!
        .querySelector('mwc-checkbox')!;
      await checkbox.click();
      await element._cleanupList?.layout();

      element._cleanupAddressCheckbox!.checked = false;
      await element._cleanupAddressCheckbox!.requestUpdate();

      await element._cleanButton.click();

      // the correct number of GSEControl should remain
      expect(doc.querySelectorAll('GSEControl')).to.have.lengthOf(2);
      expect(
        doc.querySelectorAll(
          'GSEControl[name="GCB_NP"], GSEControl[name="GCB2_NP"]'
        )
      ).to.have.lengthOf(0);
      // Addresses unchanged
      expect(doc.querySelectorAll('GSE[cbName="GCB_NP"]')).to.have.lengthOf(1);
      expect(doc.querySelectorAll('GSE')).to.have.lengthOf(2);
    });

    it('correctly removes all SampledValueControl and Address entries from the SCL file', async () => {
      await element._cleanupLogControlFilter.click();
      await element._cleanupGSEControlFilter.click();
      // select all items and update list
      const checkbox = element
        .shadowRoot!.querySelector('.cleanupList')!
        .shadowRoot!.querySelector('mwc-formfield')!
        .querySelector('mwc-checkbox')!;
      await checkbox.click();
      await element._cleanupList?.layout();

      await element._cleanButton.click();

      // the correct number of SampledValueControls should remain
      expect(doc.querySelectorAll('SampledValueControl')).to.have.lengthOf(1);
      expect(
        doc.querySelectorAll('SampledValueControl[name="MSVCB01_A"]')
      ).to.have.lengthOf(0);
      // Addresses removed
      expect(doc.querySelectorAll('SMV[cbName="MSVCB01_A"]')).to.have.lengthOf(
        0
      );
      expect(doc.querySelectorAll('SMV')).to.have.lengthOf(1);
    });

    it('correctly removes all SampledValueControl and Address entries from the SCL file but not Address entries if it is unchecked', async () => {
      await element._cleanupLogControlFilter.click();
      await element._cleanupGSEControlFilter.click();
      // select all items and update list
      const checkbox = element
        .shadowRoot!.querySelector('.cleanupList')!
        .shadowRoot!.querySelector('mwc-formfield')!
        .querySelector('mwc-checkbox')!;
      await checkbox.click();
      await element._cleanupList?.layout();

      element._cleanupAddressCheckbox!.checked = false;
      await element._cleanupAddressCheckbox!.requestUpdate();

      await element._cleanButton.click();

      // the correct number of SampledValueControls should remain
      expect(doc.querySelectorAll('SampledValueControl')).to.have.lengthOf(1);
      expect(
        doc.querySelectorAll('SampledValueControl[name="MSVCB01_A"]')
      ).to.have.lengthOf(0);
      // Addresses unchanged
      expect(doc.querySelectorAll('SMV[cbName="MSVCB01_A"]')).to.have.lengthOf(
        1
      );
      expect(doc.querySelectorAll('SMV')).to.have.lengthOf(2);
    });
  });
});
