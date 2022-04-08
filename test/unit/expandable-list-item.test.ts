import { expect, fixture, html } from '@open-wc/testing';

import '@material/mwc-list/mwc-list-item';

import '../../src/expandable-list-item.js';
import { ExpandableListItem } from '../../src/expandable-list-item.js';

describe('expandable/collapsable list item container', () => {
  let element: ExpandableListItem;

  describe('with missing parent and children slotted', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<expandable-list-item></expandable-list-item>`
      );
    });

    it('looks like the latest snapshot', async () =>
      await expect(element).shadowDom.to.equalSnapshot());
  });

  describe('with only parent item slotted', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<expandable-list-item
          ><mwc-list-item slot="parent"
            >parent</mwc-list-item
          ></expandable-list-item
        >`
      );
    });

    it('looks like the latest snapshot', async () =>
      await expect(element).shadowDom.to.equalSnapshot());

    it('does not render the expand toggle button', () =>
      expect(element.expandButton.classList.contains('hidden')).to.be.true);
  });

  describe('with both parent and childen slotted', () => {
    describe('and defaultExpanded not set', () => {
      beforeEach(async () => {
        element = await fixture(
          html`<expandable-list-item
            ><mwc-list-item slot="parent">parent</mwc-list-item
            ><mwc-list-item slot="child"
              >child1</mwc-list-item
            ></expandable-list-item
          >`
        );
      });

      it('looks like the latest snapshot', async () =>
        await expect(element).shadowDom.to.equalSnapshot());

      it('does render the expand toggle button', () =>
        expect(element.expandButton.classList.contains('hidden')).to.be.false);

      it('is folded', () => {
        expect(element.expandButton.on).to.be.false;
        expect(
          element.shadowRoot?.querySelector('.parent')
        ).to.not.have.attribute('on');
      });

      it('un-foldes on expand button click', async () => {
        await element.expandButton.click();
        expect(element.expandButton.on).to.be.true;
      });
    });

    describe('and defaultExpanded set to true', () => {
      beforeEach(async () => {
        element = await fixture(
          html`<expandable-list-item ?defaultExtended=${true}
            ><mwc-list-item slot="parent">parent</mwc-list-item
            ><mwc-list-item slot="child">child1</mwc-list-item
            ><mwc-list-item slot="child"
              >child2</mwc-list-item
            ></expandable-list-item
          >`
        );
      });

      it('looks like the latest snapshot', async () =>
        await expect(element).shadowDom.to.equalSnapshot());

      it('does render the expand toggle button', () =>
        expect(element.expandButton.classList.contains('hidden')).to.be.false);

      it('is un-folded', () => {
        expect(element.expandButton.on).to.be.true;
        expect(element.shadowRoot?.querySelector('.parent')).to.have.attribute(
          'on',
          ''
        );
      });

      it('foldes on expand button click', async () => {
        await element.expandButton.click();
        expect(element.expandButton.on).to.be.false;
      });
    });
  });
});
