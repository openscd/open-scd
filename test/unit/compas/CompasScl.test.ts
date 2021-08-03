import {expect, fixtureSync, html, waitUntil} from '@open-wc/testing';

import sinon, {SinonStub} from "sinon";
import {ListItem} from "@material/mwc-list/mwc-list-item";
import {
  BASIC_ITEM_LIST_RESPONSE,
  ITEM_ENTRY_ELEMENT_NAME,
  stubFetchResponseFunction
} from "./CompasSclDataServiceResponses.js";
import "../../../src/compas/CompasScl.js";
import {CompasScl} from "../../../src/compas/CompasScl.js";

describe('compas-scl-list', () => {
  const FETCH_FUNCTION = 'fetchData';

  let element: CompasScl;
  let stub: SinonStub;

  describe('show-loading', () => {
    beforeEach(async () => {
      element = fixtureSync(html`<compas-scl-list .type="IID"></compas-scl-list>`);

      stub = stubFetchResponseFunction(element, FETCH_FUNCTION, undefined, ITEM_ENTRY_ELEMENT_NAME,
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
      element = fixtureSync(html`<compas-scl-list .type="IID"></compas-scl-list>`);

      stub = stubFetchResponseFunction(element, FETCH_FUNCTION, undefined, ITEM_ENTRY_ELEMENT_NAME,
        (result: Element[]) => {
          element.scls = result;
        });

      await element;
      await waitUntil(() => element.scls !== undefined);
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
      element = fixtureSync(html`<compas-scl-list .type="IID"></compas-scl-list>`);

      stub = stubFetchResponseFunction(element, FETCH_FUNCTION, BASIC_ITEM_LIST_RESPONSE, ITEM_ENTRY_ELEMENT_NAME,
        (result: Element[]) => {
          element.scls = result;
        });

      await element;
      await waitUntil(() => element.scls !== undefined);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('has 2 item entries', () => {
      expect(element.shadowRoot!.querySelectorAll('mwc-list > mwc-list-item'))
        .to.have.length(2)
    });

    it('selecting the first row will cause open scl method to be called', async () => {
      const stubListSclMethod = sinon.stub(element, 'openScl').callsFake(() => {
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
