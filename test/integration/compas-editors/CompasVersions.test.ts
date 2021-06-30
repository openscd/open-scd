import {expect, fixture, fixtureSync, html, waitUntil} from '@open-wc/testing';
import sinon, {SinonStub} from "sinon";

import {Editing} from '../../../src/Editing.js';
import {Wizarding} from '../../../src/Wizarding.js';
import CompasVersionsPlugin from "../../../src/compas-editors/CompasVersions.js";

describe('compas-versions-plugin', () => {
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

      stub = sinon.stub(element, 'fetchData').callsFake(() => {
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

      stub = sinon.stub(element, 'fetchData').callsFake(() => {
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

      stub = sinon.stub(element, 'fetchData').callsFake(() => {
        element.scls = [];
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

      stub = sinon.stub(element, 'fetchData').callsFake(() => {
        const response = `
             <ListResponse xmlns="https://www.lfenergy.org/compas/SclDataService">
                <Item>
                    <Id>3b572a56-51cc-479b-97fd-e404ebf9ae67</Id>
                    <Name>demo_station1</Name>
                    <Version>1.0.0</Version>
                </Item>
                <Item>
                    <Id>3b572a56-51cc-479b-97fd-e404ebf9ae67</Id>
                    <Name>demo_station1</Name>
                    <Version>2.0.0</Version>
                </Item>
             </ListResponse>`;
        const parser = new DOMParser();
        const document = parser.parseFromString(response, "text/xml");
        element.scls = Array.from(document.querySelectorAll('*|Item') ?? [])
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
