import { expect, fixture, html } from '@open-wc/testing';
import { FilteredList } from '../../src/filtered-list.js';

describe('filtered-list', () => {
  let element: FilteredList;
  const listItems = [
    { prim: 'item1', sec: 'item1sec', disabled: false },
    { prim: 'item2', sec: 'item2sec', disabled: false },
    { prim: 'item3', sec: 'item3sec', disabled: false },
    { prim: 'item4', sec: 'item4sec', disabled: true },
  ];
  beforeEach(async () => {
    element = await fixture(
      html`<filtered-list multi
        >${Array.from(listItems).map(
          item =>
            html`<mwc-check-list-item twoline ?disabled=${item.disabled}
              ><span>${item.prim}</span
              ><span slot="secondary">${item.sec}</span></mwc-check-list-item
            >`
        )}</filtered-list
      >`
    );
  });

  it('looks like its latest snapshot', () => {
    expect(element).shadowDom.to.equalSnapshot();
  });

  describe('has a check all checkbox that', () => {
    it('is indeterminate if one but not all check-list-items are selected', async () => {
      expect(
        element.shadowRoot!.querySelector('mwc-formfield>mwc-checkbox')
      ).to.not.have.attribute('indeterminate');

      element.items[0].click();
      await element.updateComplete;

      expect(
        element.shadowRoot!.querySelector('mwc-formfield>mwc-checkbox')
      ).to.have.attribute('indeterminate');
    });
    it('is selected if all check-list-items are selected', async () => {
      expect(
        element.shadowRoot!.querySelector('mwc-formfield>mwc-checkbox')
      ).to.not.have.attribute('checked');
      element.items
        .filter(item => !item.disabled)
        .forEach(item => {
          item.click();
        });
      await element.updateComplete;

      expect(
        element.shadowRoot!.querySelector('mwc-formfield>mwc-checkbox')
      ).to.have.attribute('checked');
    });
    it('is none of the above if no check-list-item is selected', () => {
      expect(
        element.shadowRoot!.querySelector('mwc-formfield>mwc-checkbox')
      ).to.not.have.attribute('checked');
      expect(
        element.shadowRoot!.querySelector('mwc-formfield>mwc-checkbox')
      ).to.not.have.attribute('indeterminate');
    });
    it('can be disabled with disableCheckAll property', async () => {
      expect(element.shadowRoot!.querySelector('mwc-formfield>mwc-checkbox')).to
        .not.be.null;
      element.disableCheckAll = true;
      await element.requestUpdate();
      expect(element.shadowRoot!.querySelector('mwc-formfield>mwc-checkbox')).to
        .be.null;
    });
    it('selects all check-list-items on checkAll click', async () => {
      (<HTMLElement>(
        element.shadowRoot!.querySelector('mwc-formfield>mwc-checkbox')
      )).click();
      await element.updateComplete;
      element.items
        .filter(item => !item.disabled)
        .forEach(item => {
          expect(item).to.have.attribute('selected');
        });
    });
    it('does not select disabled check-list-items on checkAll click', async () => {
      (<HTMLElement>(
        element.shadowRoot!.querySelector('mwc-formfield>mwc-checkbox')
      )).click();
      await element.updateComplete;
      expect(element.items[3]).to.not.have.attribute('selected');
    });
    it('unselects all check-list-items on checkAll click', async () => {
      (<HTMLElement>(
        element.shadowRoot!.querySelector('mwc-formfield>mwc-checkbox')
      )).click();
      (<HTMLElement>(
        element.shadowRoot!.querySelector('mwc-formfield>mwc-checkbox')
      )).click();
      await element.updateComplete;
      element.items
        .filter(item => !item.disabled)
        .forEach(item => {
          expect(item).to.not.have.attribute('selected');
        });
    });
  });

  describe('onFilterInput', () => {
    it('filteres its items', async () => {
      element.searchField.value = 'item1';
      element.onFilterInput();
      element.requestUpdate();
      await element.updateComplete;
      expect(element.items[0].classList.contains('hidden')).to.be.false;
      expect(element.items[1].classList.contains('hidden')).to.be.true;
      expect(element.items[2].classList.contains('hidden')).to.be.true;
      expect(element.items[3].classList.contains('hidden')).to.be.true;
    });

    it('filteres within twoline mwc-list-item', async () => {
      element.searchField.value = 'item2sec';
      element.onFilterInput();
      element.requestUpdate();
      await element.updateComplete;
      expect(element.items[0].classList.contains('hidden')).to.be.true;
      expect(element.items[1].classList.contains('hidden')).to.be.false;
      expect(element.items[2].classList.contains('hidden')).to.be.true;
      expect(element.items[3].classList.contains('hidden')).to.be.true;
    });

    it('uses space as logic AND ', async () => {
      element.searchField.value = 'item item3sec';
      element.onFilterInput();
      element.requestUpdate();
      await element.updateComplete;
      expect(element.items[0].classList.contains('hidden')).to.be.true;
      expect(element.items[1].classList.contains('hidden')).to.be.true;
      expect(element.items[2].classList.contains('hidden')).to.be.false;
      expect(element.items[3].classList.contains('hidden')).to.be.true;
    });
  });
});
