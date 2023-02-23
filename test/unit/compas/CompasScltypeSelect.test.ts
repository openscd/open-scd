import { expect, fixtureSync, html, waitUntil } from '@open-wc/testing';
import sinon, { SinonStub } from 'sinon';

import { Select } from '@material/mwc-select';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

import '../../../src/compas/CompasSclTypeSelect.js';

import { CompasSclTypeSelect } from '../../../src/compas/CompasSclTypeSelect.js';

import {
  BASIC_TYPE_LIST_RESPONSE,
  stubFetchResponseFunction,
  TYPE_ENTRY_ELEMENT_NAME,
} from './CompasSclDataServiceResponses.js';

describe('compas-scltype-select', () => {
  const FETCH_FUNCTION = 'fetchData';

  let element: CompasSclTypeSelect;
  let stub: SinonStub;

  describe('show-loading', () => {
    beforeEach(async () => {
      element = fixtureSync(
        html`<compas-scltype-select></compas-scltype-select>`
      );

      stub = stubFetchResponseFunction(
        element,
        FETCH_FUNCTION,
        undefined,
        TYPE_ENTRY_ELEMENT_NAME,
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

  describe('no-items-in-list', () => {
    beforeEach(async () => {
      element = fixtureSync(
        html`<compas-scltype-select></compas-scltype-select>`
      );

      stub = stubFetchResponseFunction(
        element,
        FETCH_FUNCTION,
        undefined,
        TYPE_ENTRY_ELEMENT_NAME,
        (result: Element[]) => {
          element.sclTypes = result;
        }
      );

      await element;
      await waitUntil(() => element.sclTypes !== undefined);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
      sinon.assert.calledOnce(stub);
    });
  });

  describe('after-list-loaded', () => {
    let select: Select;

    beforeEach(async () => {
      element = fixtureSync(
        html`<compas-scltype-select></compas-scltype-select>`
      );

      stub = stubFetchResponseFunction(
        element,
        FETCH_FUNCTION,
        BASIC_TYPE_LIST_RESPONSE,
        TYPE_ENTRY_ELEMENT_NAME,
        (result: Element[]) => {
          element.sclTypes = result;
        }
      );

      await element;
      await waitUntil(() => element.sclTypes !== undefined);

      select = <Select>element.shadowRoot!.querySelector('mwc-select');
      await select.updateComplete;
    });

    afterEach(() => {
      sinon.restore();
    });

    it('has 2 item entries', async () => {
      expect(
        element.shadowRoot!.querySelectorAll('mwc-select > mwc-list-item')
      ).to.have.length(2);
    });

    it('will be invalid when no selection made', async () => {
      expect(element.valid()).to.be.false;
      sinon.assert.calledOnce(stub);
    });

    it('will be valid when a selection is made', async () => {
      const item = <ListItemBase>(
        select.querySelector('mwc-list-item[value="SED"]')
      );
      item.selected = true;
      await item.updateComplete;

      expect(element.valid()).to.be.true;
      sinon.assert.calledOnce(stub);
    });

    it('will not have a selected value', async () => {
      expect(element.getSelectedValue()).to.be.null;
      sinon.assert.calledOnce(stub);
    });

    it('will have a selected value of SED', async () => {
      const item = <ListItemBase>(
        select.querySelector('mwc-list-item[value="SED"]')
      );
      item.selected = true;
      await item.updateComplete;

      expect(element.getSelectedValue()).to.be.equal('SED');
      sinon.assert.calledOnce(stub);
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
      sinon.assert.calledOnce(stub);
    });
  });
});
