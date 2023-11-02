import { expect, fixtureSync, html, waitUntil } from '@open-wc/testing';
import sinon, { SinonStub } from 'sinon';
import { ListItem } from '@material/mwc-list/mwc-list-item';

import {
  BASIC_ITEM_LIST_RESPONSE,
  ITEM_ENTRY_ELEMENT_NAME,
  ITEM_LIST_WITH_LABELS_RESPONSE,
  stubFetchResponseFunction,
} from './CompasSclDataServiceResponses.js';
import { CompasSclList } from '../../../src/compas/CompasSclList.js';

import '../../../src/compas/CompasSclList.js';

describe('compas-scl-list', () => {
  const FETCH_FUNCTION = 'fetchData';

  let element: CompasSclList;
  let stub: SinonStub;

  describe('when list still needs to be loaded', () => {
    beforeEach(async () => {
      element = fixtureSync(
        html`<compas-scl-list .type="IID"></compas-scl-list>`
      );

      stub = stubFetchResponseFunction(
        element,
        FETCH_FUNCTION,
        undefined,
        ITEM_ENTRY_ELEMENT_NAME,
        () => {
          // Do nothing, so loading... will be displayed.
        }
      );

      await element;
    });

    afterEach(() => {
      sinon.restore();
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('when there are no items found in CoMPAS', () => {
    beforeEach(async () => {
      element = fixtureSync(
        html`<compas-scl-list .type="IID"></compas-scl-list>`
      );

      stub = stubFetchResponseFunction(
        element,
        FETCH_FUNCTION,
        undefined,
        ITEM_ENTRY_ELEMENT_NAME,
        (result: Element[]) => {
          element['items'] = result;
        }
      );

      await element;
      await waitUntil(() => element['items'] !== undefined);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
      sinon.assert.calledOnce(stub);
    });
  });

  describe('when there are items without labels', () => {
    beforeEach(async () => {
      element = fixtureSync(
        html`<compas-scl-list .type="IID"></compas-scl-list>`
      );

      stub = stubFetchResponseFunction(
        element,
        FETCH_FUNCTION,
        BASIC_ITEM_LIST_RESPONSE,
        ITEM_ENTRY_ELEMENT_NAME,
        (result: Element[]) => {
          element['items'] = result;
        }
      );

      await element;
      await waitUntil(() => element['items'] !== undefined);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('has 2 item entries', () => {
      expect(
        element.shadowRoot!.querySelectorAll('filtered-list > mwc-list-item')
      ).to.have.length(2);
    });

    it('filter button for labels is disabled', () => {
      expect(
        element.shadowRoot!.querySelector('oscd-filter-button#labelsFilter')
      ).to.have.attribute('disabled');
    });

    it('selecting the first row will cause open scl method to be called', async () => {
      const eventSpy = sinon.spy();
      element.addEventListener('scl-selected', eventSpy);

      (<ListItem>(
        element.shadowRoot!.querySelectorAll('filtered-list > mwc-list-item')[0]
      )).click();
      await element.updateComplete;

      sinon.assert.calledOnce(eventSpy);
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
      sinon.assert.calledOnce(stub);
    });
  });

  describe('when there are items with labels', () => {
    beforeEach(async () => {
      element = fixtureSync(
        html`<compas-scl-list .type="IID"></compas-scl-list>`
      );

      stub = stubFetchResponseFunction(
        element,
        FETCH_FUNCTION,
        ITEM_LIST_WITH_LABELS_RESPONSE,
        ITEM_ENTRY_ELEMENT_NAME,
        (result: Element[]) => {
          element['items'] = result;

          const labels = Array.from(
            new Set(
              result
                .map(item => Array.from(item.querySelectorAll('Label')))
                .flatMap(label => label)
                .filter(label => !!label)
                .map(label => label!.textContent)
                .filter(labelValue => !!labelValue)
                .sort((label1, label2) =>
                  label1!.localeCompare(label2!)
                ) as string[]
            )
          );
          if (labels) {
            element['labels'] = labels;
            element['selectedLabels'] = labels;
          }
        }
      );

      await element;
      await waitUntil(() => element['items'] !== undefined);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('has 3 labels found', () => {
      expect(element['labels']).to.have.length(3);
      expect(element['selectedLabels']).to.have.length(3);
    });

    it('filter button for labels is enabled', () => {
      expect(
        element.shadowRoot!.querySelector('oscd-filter-button#labelsFilter')
      ).to.have.not.attribute('disabled');
    });

    it('has 2 item entries', () => {
      expect(
        element.shadowRoot!.querySelectorAll('filtered-list > mwc-list-item')
      ).to.have.length(2);
    });

    it('when filtering on labels only 1 item is shown', async () => {
      const filterButton = <HTMLElement>(
        element.shadowRoot!.querySelector('oscd-filter-button#labelsFilter')
      );
      (<HTMLElement>(
        filterButton.shadowRoot!.querySelector('mwc-icon-button')
      )).click();
      await element.updateComplete;

      Array.from(
        element.shadowRoot!.querySelectorAll(
          'oscd-filter-button#labelsFilter > mwc-check-list-item'
        )
      )
        .filter(element => element.getAttribute('value') !== 'Amsterdam')
        .forEach(element => (<HTMLElement>element).click());
      (<HTMLElement>(
        filterButton.shadowRoot!.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      )).click();
      await element.updateComplete;

      expect(
        element.shadowRoot!.querySelectorAll('filtered-list > mwc-list-item')
      ).to.have.length(1);
      await expect(element).shadowDom.to.equalSnapshot();
    });

    it('when filtering on labels and all items are hidden', async () => {
      const filterButton = <HTMLElement>(
        element.shadowRoot!.querySelector('oscd-filter-button#labelsFilter')
      );
      (<HTMLElement>(
        filterButton.shadowRoot!.querySelector('mwc-icon-button')
      )).click();
      await element.updateComplete;

      Array.from(
        element.shadowRoot!.querySelectorAll(
          'oscd-filter-button#labelsFilter > mwc-check-list-item'
        )
      ).forEach(element => (<HTMLElement>element).click());
      (<HTMLElement>(
        filterButton.shadowRoot!.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      )).click();
      await element.updateComplete;

      await expect(element).shadowDom.to.equalSnapshot();
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
      sinon.assert.calledOnce(stub);
    });
  });
});
