'use strict';
import { html, fixture, expect } from '@open-wc/testing';

import '@openscd/open-scd/test/mock-open-scd.js';
import { MockOpenSCD } from '@openscd/open-scd/test/mock-open-scd.js';

import '../../../../src/editors/cleanup/datasets-container.js';
import { CleanupDatasets } from '../../../../src/editors/cleanup/datasets-container.js';
import { cleanSCLItems } from '../../../../src/editors/cleanup/foundation.js';

describe('cleanup-editor integration: dataset removal', () => {
  let element: CleanupDatasets;
  let parent: MockOpenSCD;

  describe('without a doc loaded', () => {
    beforeEach(async () => {
      const doc = null;
      parent = await fixture(
        html`<mock-open-scd
          ><cleanup-datasets .doc=${doc}></cleanup-datasets
        ></mock-open-scd>`
      );
      element = parent.getActivePlugin();
      await parent.updateComplete;
    });

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
          ><cleanup-datasets .doc=${doc}></cleanup-datasets
        ></mock-open-scd>`
      );
      element = parent.getActivePlugin();
      await parent.updateComplete;
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });

    it('creates two delete actions', async () => {
      // select all items and update list
      const checkbox = element
        .shadowRoot!.querySelector('.dataSetList')!
        .shadowRoot!.querySelector('mwc-formfield')!
        .querySelector('mwc-checkbox')!;
      await checkbox.click();
      element.dataSetList?.layout();
      const cleanItems = Array.from(
        (<Set<number>>element.dataSetList!.index).values()
      ).map(index => element.unreferencedDataSets[index]);
      const deleteActions = cleanSCLItems(cleanItems);
      expect(deleteActions.length).to.equal(2);
    });

    it('correctly removes the datasets from the SCL file', async () => {
      // select all items and update list
      const checkbox = element
        .shadowRoot!.querySelector('.dataSetList')!
        .shadowRoot!.querySelector('mwc-formfield')!
        .querySelector('mwc-checkbox')!;
      await checkbox.click();
      element.dataSetList?.layout();
      await element.cleanupButton!.click();
      // the correct number of DataSets should remain
      const remainingDataSetCountCheck =
        element.doc.querySelectorAll(
          ':root > IED > AccessPoint > Server > LDevice > LN0 > DataSet, :root > IED > AccessPoint > Server > LDevice > LN > DataSet'
        ).length === 6;
      // those DataSets selected had best be gone
      const datasetsCorrectlyRemoved =
        element.doc.querySelectorAll(
          'DataSet[name="GooseDataSet2"], DataSet[name="PhsMeas2"]'
        ).length === 0;
      expect(remainingDataSetCountCheck && datasetsCorrectlyRemoved).to.equal(
        true
      );
    });
  });
});
