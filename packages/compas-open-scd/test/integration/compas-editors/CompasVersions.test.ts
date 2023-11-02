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
  let doc: Document;
  let element: CompasVersionsPlugin;
  let stub: SinonStub;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/compas/test-scd.cid')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  })

  describe('no-compas-document', () => {
    beforeEach(async () => {
      element = fixtureSync(html`
        <compas-versions-plugin .doc="${doc}">
        </compas-versions-plugin>`);

      stub = stubFetchResponseFunction(element, FETCH_FUNCTION, undefined, VERSION_ENTRY_ELEMENT_NAME,
        () => {
          // Should not be called.
        });

      await element.updateComplete;
      await waitUntil(() => element.historyItem !== undefined);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
      sinon.assert.notCalled(stub);
    });
  });

  describe('show-loading', () => {
    beforeEach(async () => {
      element = fixtureSync(html`
        <compas-versions-plugin .doc="${doc}" .docId="${docId}">
        </compas-versions-plugin>`);

      stub = stubFetchResponseFunction(element, FETCH_FUNCTION, undefined, VERSION_ENTRY_ELEMENT_NAME,
        () => {
          // Do nothing, so loading... will be displayed.
        });

      await element.updateComplete;
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
      element = fixtureSync(html`
        <compas-versions-plugin .doc="${doc}" .docId="${docId}">
        </compas-versions-plugin>`);

      stub = stubFetchResponseFunction(element, FETCH_FUNCTION, undefined, VERSION_ENTRY_ELEMENT_NAME,
        (result: Element[]) => {
          element.historyItem = result;
        });

      await element.updateComplete;
      await waitUntil(() => element.historyItem !== undefined);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
      sinon.assert.calledOnce(stub);
    });
  });

  describe('items-in-list', () => {
    beforeEach(async () => {
      element = fixtureSync(html`
        <compas-versions-plugin .doc="${doc}" .docId="${docId}">
        </compas-versions-plugin>`);

      stub = stubFetchResponseFunction(element, FETCH_FUNCTION, BASIC_VERSIONS_LIST_RESPONSE, VERSION_ENTRY_ELEMENT_NAME,
        (result: Element[]) => {
          element.historyItem = result;
        });

      await element.updateComplete;
      await waitUntil(() => element.historyItem !== undefined);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('has 3 item entries', () => {
      expect(element.shadowRoot!.querySelectorAll('mwc-list > mwc-check-list-item'))
        .to.have.length(3);
    });

    it('first entry has correct buttons', () => {
      expect(element.shadowRoot!.querySelectorAll('mwc-list > mwc-check-list-item').length)
        .to.be.greaterThan(1);
      // Retrieve the first item after checking that there are items.
      const item = element.shadowRoot!.querySelectorAll('mwc-list > mwc-check-list-item')[0];
      // There should be 2 buttons, first the restore, second the delete.
      expect(item.querySelectorAll('span > mwc-icon')).to.have.length(2);
      expect(item.querySelectorAll('span > mwc-icon')[0].textContent).to.be.equal('restore');
      expect(item.querySelectorAll('span > mwc-icon')[1].textContent).to.be.equal('delete');
    });

    it('last entry has one buttons', () => {
      expect(element.shadowRoot!.querySelectorAll('mwc-list > mwc-check-list-item'))
        .to.have.length(3);
      // Retrieve the last item after checking that there are 3 items.
      const item = element.shadowRoot!.querySelectorAll('mwc-list > mwc-check-list-item')[2];
      // There should be 1 buttons, the restore button.
      expect(item.querySelectorAll('span > mwc-icon')).to.have.length(1);
      expect(item.querySelectorAll('span > mwc-icon')[0].textContent).to.be.equal('restore');
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
      sinon.assert.calledOnce(stub);
    });
  });
});
