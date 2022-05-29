'use strict';
import { html, fixture, expect } from '@open-wc/testing';

import { Editing } from '../../../../src/Editing.js';
import { Wizarding } from '../../../../src/Wizarding.js';

import { CleanupDataTypes } from '../../../../src/editors/cleanup/datatypes-container.js';
import { cleanSCLItems } from '../../../../src/editors/cleanup/foundation.js';

describe('cleanup-editor integration: unreferenced control blocks', () => {
  customElements.define(
    'cleanup-plugin-datatypes',
    Wizarding(Editing(CleanupDataTypes))
  );
  let element: CleanupDataTypes;

  describe('without a doc loaded', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<cleanup-plugin-datatypes
          .doc="${null}"
        ></cleanup-plugin-datatypes>`
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
        html`<cleanup-plugin-datatypes
          .doc="${doc}"
        ></cleanup-plugin-datatypes>`
      );
      await element.updateComplete;
    });

    it('correctly removes a LNodeType entry from the SCL', async () => {
      await element.cleanupDOTypeFilter.click();
      await element.cleanupDATypeFilter.click();
      await element.cleanupEnumTypeFilter.click();
      // select all items and update list
      const checkbox = element
        .shadowRoot!.querySelector('.cleanupList')!
        .shadowRoot!.querySelector('mwc-formfield')!
        .querySelector('mwc-checkbox')!;
      await checkbox.click();
      await element.cleanupList?.layout();

      await element.cleanButton.click();

      // the correct number of LNodeTypes should remain
      expect(doc.querySelectorAll('LNodeType')).to.have.length(12);
      expect(
        doc.querySelectorAll('LNodeType[id="NotUsedTVTR"]')
      ).to.have.length(0);
    });

    it('correctly removes two DOTypes and an SDO from the SCL', async () => {
      await element.cleanupLNodeTypeFilter.click();
      await element.cleanupDATypeFilter.click();
      await element.cleanupEnumTypeFilter.click();
      // select all items and update list
      const checkbox = element
        .shadowRoot!.querySelector('.cleanupList')!
        .shadowRoot!.querySelector('mwc-formfield')!
        .querySelector('mwc-checkbox')!;
      await checkbox.click();
      await element.cleanupList?.layout();

      await element.cleanButton.click();

      // the correct number of DOTypes should remain (we actually remove 3 here)
      expect(doc.querySelectorAll('DOType')).to.have.lengthOf(23);
      expect(
        doc.querySelectorAll(
          'DOType[id="NotUsedDummy.SPS"], DOType[name="WYE_2_3"], DOType[id="CMV_1"]'
        )
      ).to.have.lengthOf(0);
    });

    // it('correctly removes two DOTypes and one referenced via an SDO from the SCL', async () => {
    //   await element.cleanupLNodeTypeFilter.click();
    //   await element.cleanupDATypeFilter.click();
    //   await element.cleanupEnumTypeFilter.click();
    //   // select all items and update list
    //   const checkbox = element
    //     .shadowRoot!.querySelector('.cleanupList')!
    //     .shadowRoot!.querySelector('mwc-formfield')!
    //     .querySelector('mwc-checkbox')!;
    //   await checkbox.click();
    //   await element.cleanupList?.layout();

    //   await element.cleanButton.click();

    //   // the correct number of DOTypes should remain (we actually remove 3 here)
    //   expect(doc.querySelectorAll('DOType')).to.have.lengthOf(24);
    //   expect(
    //     doc.querySelectorAll(
    //       'DOType[id="NotUsedDummy.SPS"], DOType[id="WYE_2_3"], DOType[id="CMV_1"]'
    //     )
    //   ).to.have.lengthOf(0);
    // });

    it('correctly removes two DATypes and one referenced via a BDA from the SCL', async () => {
      await element.cleanupLNodeTypeFilter.click();
      await element.cleanupDOTypeFilter.click();
      await element.cleanupEnumTypeFilter.click();
      // select all items and update list
      const checkbox = element
        .shadowRoot!.querySelector('.cleanupList')!
        .shadowRoot!.querySelector('mwc-formfield')!
        .querySelector('mwc-checkbox')!;
      await checkbox.click();
      await element.cleanupList?.layout();

      await element.cleanButton.click();

      // the correct number of DATypes should remain (we actually remove 3 here)
      expect(doc.querySelectorAll('DAType')).to.have.lengthOf(13);
      expect(
        doc.querySelectorAll(
          'DAType[id="NotUsedDummy.LPHD1.Sim.Cancel"], DAType[id="OnlySubUsedVector_0"], DAType[id="AnalogValue_0"]'
        )
      ).to.have.lengthOf(0);
    });

    it('correctly removes one EnumType', async () => {
      await element.cleanupLNodeTypeFilter.click();
      await element.cleanupDOTypeFilter.click();
      await element.cleanupDATypeFilter.click();
      // select all items and update list
      const checkbox = element
        .shadowRoot!.querySelector('.cleanupList')!
        .shadowRoot!.querySelector('mwc-formfield')!
        .querySelector('mwc-checkbox')!;
      await checkbox.click();
      await element.cleanupList?.layout();

      await element.cleanButton.click();

      // the correct number of EnumTypes should remain (we remove 1 here)
      expect(doc.querySelectorAll('EnumType')).to.have.lengthOf(7);
      expect(
        doc.querySelectorAll(
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
          .shadowRoot!.querySelector('.cleanupList')!
          .shadowRoot!.querySelector('mwc-formfield')!
          .querySelector('mwc-checkbox')!;
        await checkbox.click();
        await element.cleanupList?.layout();

        await element.cleanButton.click();

        // the correct number of DOTypes should remain (we remove 2 here)
        expect(doc.querySelectorAll('DOType')).to.have.lengthOf(24);
        expect(
          doc.querySelectorAll(
            'DOType[id="NotUsedDummy.SPS"], DOType[id="WYE_2_3"]'
          )
        ).to.have.lengthOf(0);
        expect(doc.querySelectorAll('DOType[id="CMV_1"]')).to.have.lengthOf(1);
      });

      it('correctly removes two DATypes and _not_ one referenced via a BDA from the SCL', async () => {
        await element.cleanupLNodeTypeFilter.click();
        await element.cleanupDOTypeFilter.click();
        await element.cleanupEnumTypeFilter.click();
        // select all items and update list
        const checkbox = element
          .shadowRoot!.querySelector('.cleanupList')!
          .shadowRoot!.querySelector('mwc-formfield')!
          .querySelector('mwc-checkbox')!;
        await checkbox.click();
        await element.cleanupList?.layout();

        await element.cleanButton.click();

        // the correct number of DATypes should remain (we remove 2 here)
        expect(doc.querySelectorAll('DAType')).to.have.lengthOf(14);
        expect(
          doc.querySelectorAll(
            'DAType[id="NotUsedDummy.LPHD1.Sim.Cancel"], DAType[id="OnlySubUsedVector_0"]'
          )
        ).to.have.lengthOf(0);
        expect(
          doc.querySelectorAll('DAType[id="AnalogValue_0"]')
        ).to.have.lengthOf(1);
      });
    });

    describe('if the LN filter is disabled', async () => {
      beforeEach(async () => {
        await element.cleanupLNodeTypeFilter.click();
        // select all items and update list
        const checkbox = element
          .shadowRoot!.querySelector('.cleanupList')!
          .shadowRoot!.querySelector('mwc-formfield')!
          .querySelector('mwc-checkbox')!;
        await checkbox.click();
        await element.cleanupList?.layout();
      });

      it('creates 7 delete actions (DOx3, DAx3, ENx1)', () => {
        const deleteActions = cleanSCLItems(element.getCleanItems());
        expect(deleteActions.length).to.equal(7);
      });
    });

    describe('if the DO filter is disabled', async () => {
      beforeEach(async () => {
        await element.cleanupDOTypeFilter.click();
        // select all items and update list
        const checkbox = element
          .shadowRoot!.querySelector('.cleanupList')!
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
          .shadowRoot!.querySelector('.cleanupList')!
          .shadowRoot!.querySelector('mwc-formfield')!
          .querySelector('mwc-checkbox')!;
        await checkbox.click();
        element.cleanupList?.layout();
      });

      it('creates 5 Delete Actions (LNx1, DOx3, ENx1)', async () => {
        const deleteActions = cleanSCLItems(element.getCleanItems());
        expect(deleteActions.length).to.equal(5);
      });
    });

    describe('if the EN filter is disabled', async () => {
      beforeEach(async () => {
        await element.cleanupEnumTypeFilter.click();
        // select all items and update list
        const checkbox = element
          .shadowRoot!.querySelector('.cleanupList')!
          .shadowRoot!.querySelector('mwc-formfield')!
          .querySelector('mwc-checkbox')!;
        await checkbox.click();
        element.cleanupList?.layout();
      });

      it('creates 7 Delete Actions (LNx1, DOx3, DAx3)', async () => {
        const deleteActions = cleanSCLItems(element.getCleanItems());
        expect(deleteActions.length).to.equal(7);
      });
    });
  });
});
