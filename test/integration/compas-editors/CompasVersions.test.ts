import {expect, fixtureSync, html, waitUntil} from '@open-wc/testing';
import sinon, {SinonStub} from "sinon";

import {Editing} from '../../../src/Editing.js';
import {Wizarding} from '../../../src/Wizarding.js';
import {
  BASIC_VERSIONS_LIST_RESPONSE,
  stubFetchResponseFunction,
  VERSION_ENTRY_ELEMENT_NAME
} from "../../unit/compas/CompasSclDataServiceResponses.js";
import CompasVersionsPlugin from "../../../src/compas-editors/CompasVersions.js";

describe('compas-versions-plugin', () => {
  const FETCH_FUNCTION = 'fetchData';
  const docId = '380b5e70-4753-4b59-b5b4-d51ceb26a30c';

  customElements.define(
    'compas-versions-plugin',
    Wizarding(Editing(CompasVersionsPlugin))
  );
  let element: CompasVersionsPlugin;
  let stub: SinonStub;

  describe('no-compas-document', () => {
    beforeEach(async () => {
      element = fixtureSync(html`<compas-versions-plugin></compas-versions-plugin>`);

      stub = stubFetchResponseFunction(element, FETCH_FUNCTION, undefined, VERSION_ENTRY_ELEMENT_NAME,
        () => {
          // Should not be called.
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
      sinon.assert.notCalled(stub);
    });
  });

  describe('show-loading', () => {
    beforeEach(async () => {
      element = fixtureSync(html`<compas-versions-plugin></compas-versions-plugin>`);
      element.docId = docId;

      stub = stubFetchResponseFunction(element, FETCH_FUNCTION, undefined, VERSION_ENTRY_ELEMENT_NAME,
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
      element = fixtureSync(html`<compas-versions-plugin></compas-versions-plugin>`);
      element.docId = docId;

      stub = stubFetchResponseFunction(element, FETCH_FUNCTION, undefined, VERSION_ENTRY_ELEMENT_NAME,
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

  describe('items-in-list', () => {
    beforeEach(async () => {
      element = fixtureSync(html`<compas-versions-plugin></compas-versions-plugin>`);
      element.docId = docId;

      stub = stubFetchResponseFunction(element, FETCH_FUNCTION, BASIC_VERSIONS_LIST_RESPONSE, VERSION_ENTRY_ELEMENT_NAME,
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

    it('looks like the latest snapshot', async () => {
      expect(element).shadowDom
        .to.equalSnapshot();
      sinon.assert.calledOnce(stub);
    });
  });
});
