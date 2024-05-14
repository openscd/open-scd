import { expect, fixture, html } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';

import '@material/mwc-list/mwc-check-list-item';
import '@material/mwc-list/mwc-radio-list-item';

import { getIcon } from '../../src/icons/icons.js';

import '../../src/oscd-filter-button.js';

import { FilterButton } from '../../src/oscd-filter-button.js';

describe('oscd-filter-button', () => {
  let element: FilterButton;
  let primaryButton: HTMLElement;
  const listItems = [
    { prim: 'item1', defaultSelected: true },
    { prim: 'item2', defaultSelected: false },
    { prim: 'item3', defaultSelected: false },
    { prim: 'item4', defaultSelected: false },
  ];

  let selectedItemsChangedEvent: SinonSpy;

  beforeEach(() => {
    selectedItemsChangedEvent = spy();
    window.addEventListener(
      'selected-items-changed',
      selectedItemsChangedEvent
    );
  });

  describe('multi selection with custom header and standard icon', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<oscd-filter-button
          id="filter"
          icon="developer_board"
          header="Filter Header"
          multi
        >
          ${Array.from(listItems).map(
            item =>
              html` <mwc-check-list-item
                value="${item.prim}"
                ?selected="${item.defaultSelected}"
              >
                <span>${item.prim}</span>
              </mwc-check-list-item>`
          )}
        </oscd-filter-button>`
      );
      await element.requestUpdate();
      await element.updateComplete;

      primaryButton = <HTMLElement>(
        element.shadowRoot!.querySelector('mwc-button[slot="primaryAction"]')
      );
    });

    it('when closing dialog then event fired with selected items', async () => {
      const filterButton = <HTMLElement>(
        element.shadowRoot!.querySelector('mwc-icon-button')
      );
      filterButton.click();
      await element.requestUpdate();
      await element.updateComplete;

      (<HTMLElement>(
        element.querySelector(`mwc-check-list-item[value="item2"]`)
      )).click();
      (<HTMLElement>(
        element.querySelector(`mwc-check-list-item[value="item3"]`)
      )).click();
      primaryButton.click();

      expect(selectedItemsChangedEvent).to.be.calledOnce;
      expect(
        selectedItemsChangedEvent.args[0][0].detail.selectedItems.length
      ).to.be.equal(3);
      expect(
        selectedItemsChangedEvent.args[0][0].detail.selectedItems[0]
      ).to.be.equal('item1');
      expect(
        selectedItemsChangedEvent.args[0][0].detail.selectedItems[1]
      ).to.be.equal('item2');
      expect(
        selectedItemsChangedEvent.args[0][0].detail.selectedItems[2]
      ).to.be.equal('item3');
    });

    it('looks like its latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('single selection with default header and custom icon', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<oscd-filter-button id="filter">
          <span slot="icon">${getIcon('lNIcon')}</span>
          ${Array.from(listItems).map(
            item =>
              html` <mwc-radio-list-item value="${item.prim}">
                <span>${item.prim}</span>
              </mwc-radio-list-item>`
          )}
        </oscd-filter-button>`
      );
      await element.requestUpdate();
      await element.updateComplete;

      primaryButton = <HTMLElement>(
        element.shadowRoot!.querySelector('mwc-button[slot="primaryAction"]')
      );
    });

    it('when closing dialog then event fired with selected item', async () => {
      const filterButton = <HTMLElement>(
        element.shadowRoot!.querySelector('mwc-icon-button')
      );
      filterButton.click();
      await element.requestUpdate();
      await element.updateComplete;

      (<HTMLElement>(
        element.querySelector(`mwc-radio-list-item[value="item2"]`)
      )).click();
      primaryButton.click();

      expect(selectedItemsChangedEvent).to.be.calledOnce;
      expect(
        selectedItemsChangedEvent.args[0][0].detail.selectedItems.length
      ).to.be.equal(1);
      expect(
        selectedItemsChangedEvent.args[0][0].detail.selectedItems[0]
      ).to.be.equal('item2');
    });

    it('looks like its latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('is disabled', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<oscd-filter-button
          id="filter"
          icon="developer_board"
          header="Filter Header"
          disabled="true"
        >
          ${Array.from(listItems).map(
            item =>
              html` <mwc-check-list-item
                value="${item.prim}"
                ?selected="${item.defaultSelected}"
              >
                <span>${item.prim}</span>
              </mwc-check-list-item>`
          )}
        </oscd-filter-button>`
      );
      await element.requestUpdate();
      await element.updateComplete;
    });

    it('looks like its latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });
});
