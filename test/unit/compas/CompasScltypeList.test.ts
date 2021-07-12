import {expect, fixtureSync, html, waitUntil} from '@open-wc/testing';

import sinon, {SinonStub} from "sinon";
import {ListItem} from "@material/mwc-list/mwc-list-item";
import {BASIC_TYPE_LIST_RESPONSE, stubFetchResponseFunction} from "./CompasSclDataServiceResponses.js";
import {CompasScltypeList} from "../../../src/compas/CompasScltypeList.js";
import "../../../src/compas/CompasScltypeList.js";

describe('compas-scltype-list', () => {
  const FETCH_FUNCTION = 'fetchData';

  let element: CompasScltypeList;
  let stub: SinonStub;

  describe('show-loading', () => {
    beforeEach(async () => {
      element = fixtureSync(html`<compas-scltype-list></compas-scltype-list>`);

      stub = stubFetchResponseFunction(element, FETCH_FUNCTION, undefined,
        () => {
          // Do nothing, so loading... will be displayed.
        });

      await element;
    });

    afterEach(() => {
      sinon.restore();
    });

    it('looks like the latest snapshot', async () => {
      expect(element).shadowDom
        .to.equalSnapshot();
    });
  });

  describe('no-items-in-list', () => {
    beforeEach(async () => {
      element = fixtureSync(html`<compas-scltype-list></compas-scltype-list>`);

      stub = stubFetchResponseFunction(element, FETCH_FUNCTION, undefined,
        (result: Element[]) => {
          element.sclTypes = result;
        });

      await element;
      await waitUntil(() => element.sclTypes !== undefined);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('looks like the latest snapshot', async () => {
      expect(element).shadowDom
        .to.equalSnapshot();
      sinon.assert.calledOnce(stub);
    });
  });

  describe('after-list-loaded', () => {
    beforeEach(async () => {
      element = fixtureSync(html`<compas-scltype-list></compas-scltype-list>`);

      stub = stubFetchResponseFunction(element, FETCH_FUNCTION, BASIC_TYPE_LIST_RESPONSE,
        (result: Element[]) => {
          element.sclTypes = result;
        });

      await element;
      await waitUntil(() => element.sclTypes !== undefined);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('has 2 item entries', () => {
      expect(element.shadowRoot!.querySelectorAll('mwc-list > mwc-list-item'))
        .to.have.length(2)
    });

    it('selecting the first row will cause list scl method to be called', async () => {
      const stubListSclMethod = sinon.stub(element, 'listScls').callsFake(() => {
        // Do nothing, just to see the method is called.
      });

      (<ListItem>(
        element.shadowRoot!.querySelectorAll('mwc-list > mwc-list-item')[0]
      )).click();
      await element.updateComplete;

      sinon.assert.calledOnce(stubListSclMethod);
    });

    it('looks like the latest snapshot', async () => {
      expect(element).shadowDom
        .to.equalSnapshot();
      sinon.assert.calledOnce(stub);
    });
  });
});
