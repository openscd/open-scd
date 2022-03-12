import { html, fixture, expect } from '@open-wc/testing';

import { Editing } from '../../../src/Editing.js';
import Cleanup from '../../../src/editors/Cleanup.js';
import { Wizarding } from '../../../src/Wizarding.js';

import { List } from '@material/mwc-list';
import { Button } from '@material/mwc-button';

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

  describe('Unused Datasets', () => {
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

    it('creates correct number of checkboxes for the expected unused datasets', () => {
      const checkBoxes: NodeList | undefined =
        element.shadowRoot?.querySelectorAll(
          '.cleanupUnusedDatasetsList > mwc-check-list-item'
        );
      expect(Array.from(checkBoxes!).length).to.equal(7);
    });

    it('creates two Delete Actions', async () => {
      // select all items and update list
      const itemList = <List>(
        element.shadowRoot!.querySelector('.cleanupUnusedDatasetsList')
      );
      itemList.items.forEach(item => (item.selected = true));
      await itemList.layout();
      const cleanItems = Array.from((<Set<number>>itemList.index).values()).map(
        index => element.gridRowsUnusedDatasets[index]
      );
      const deleteActions = element.cleanDatasets(cleanItems);
      expect(deleteActions.length).to.equal(7);
    });

    it('correctly removes the datasets from the SCL file', async () => {
      // select all items and update list
      const itemList = <List>(
        element.shadowRoot!.querySelector('.cleanupUnusedDatasetsList')
      );
      itemList.items.forEach(item => (item.selected = true));
      await itemList.layout();
      await (<Button>(
        element.shadowRoot!.querySelector('.cleanupUnusedDatasetsDeleteButton')!
      )).click();
      // all datasets should be deleted
      const dataSetCountCheck =
        doc.querySelectorAll(
          ':root > IED > AccessPoint > Server > LDevice > LN0 > DataSet, :root > IED > AccessPoint > Server > LDevice > LN > DataSet'
        ).length
      expect(dataSetCountCheck).to.equal(0);
    });
  });
});
