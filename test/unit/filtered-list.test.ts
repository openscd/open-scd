import { expect, fixture, html } from '@open-wc/testing';
import { Filterlist } from '../../src/filtered-list.js';

describe('filtered-list', () => {
  let element: Filterlist;
  const listItems = [
    { prim: 'item1', sec: 'item1sec' },
    { prim: 'item2', sec: 'item2sec' },
    { prim: 'item3', sec: 'item3sec' },
    { prim: 'item4', sec: 'item4sec' },
  ];
  beforeEach(async () => {
    element = await fixture(
      html`<filtered-list
        >${Array.from(listItems).map(
          item =>
            html`<mwc-list-item twoline
              ><span>${item.prim}</span
              ><span slot="secondary">${item.sec}</span></mwc-list-item
            >`
        )}</filtered-list
      >`
    );
  });

  it('looks like its latest snapshot', () => {
    expect(element).shadowDom.to.equalSnapshot();
  });

  describe('onFilterInput', () => {
    it('filteres its items', async () => {
      element.searchField.value = 'item1';
      element.onFilterInput();
      element.requestUpdate();
      await element.updateComplete;
      expect(element.items[0].style.display).to.equal('');
      expect(element.items[1].style.display).to.equal('none');
      expect(element.items[2].style.display).to.equal('none');
      expect(element.items[3].style.display).to.equal('none');
    });

    it('filteres within twoline mwc-list-item', async () => {
      element.searchField.value = 'item2sec';
      element.onFilterInput();
      element.requestUpdate();
      await element.updateComplete;
      expect(element.items[0].style.display).to.equal('none');
      expect(element.items[1].style.display).to.equal('');
      expect(element.items[2].style.display).to.equal('none');
      expect(element.items[3].style.display).to.equal('none');
    });

    it('uses space as logic AND ', async () => {
      element.searchField.value = 'item item3sec';
      element.onFilterInput();
      element.requestUpdate();
      await element.updateComplete;
      expect(element.items[0].style.display).to.equal('none');
      expect(element.items[1].style.display).to.equal('none');
      expect(element.items[2].style.display).to.equal('');
      expect(element.items[3].style.display).to.equal('none');
    });
  });
});
