import {expect, fixture, fixtureSync, html, waitUntil} from '@open-wc/testing';
import sinon, {SinonStub} from 'sinon';

import {ListItemBase} from "@material/mwc-list/mwc-list-item-base";

import {CompasScltypeRadiogroup} from "../../../src/compas/CompasScltypeRadiogroup.js";
import "../../../src/compas/CompasScltypeRadiogroup.js";
import {SDS_NAMESPACE} from "../../../src/compas/CompasSclDataService";

describe('compas-scltype-radiogroup', () => {
  let element: CompasScltypeRadiogroup;
  let stub: SinonStub;

  describe('show-loading', () => {
    beforeEach(async () => {
      element = fixtureSync(
          html`
          <compas-scltype-radiogroup></compas-scltype-radiogroup>`
      );

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
      element = fixtureSync(
          html`
          <compas-scltype-radiogroup></compas-scltype-radiogroup>`
      );

      stub = sinon.stub(element, 'fetchData').callsFake(() => {
        element.sclTypes = [];
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
      element = fixtureSync(
          html`
          <compas-scltype-radiogroup></compas-scltype-radiogroup>`
      );

      stub = sinon.stub(element, 'fetchData').callsFake(() => {
        const response = `
             <TypeListResponse xmlns="${SDS_NAMESPACE}">
                  <Type>
                      <Code>SED</Code>
                      <Description>System Exchange Description</Description>
                  </Type>
                  <Type>
                      <Code>SSD</Code>
                      <Description>Substation Specification Description</Description>
                  </Type>
             </TypeListResponse>`;
        const parser = new DOMParser();
        const document = parser.parseFromString(response, "text/xml");
        element.sclTypes = Array.from(document.querySelectorAll('Type') ?? [])
      });

      await element;
      await waitUntil(() => element.sclTypes !== undefined);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('has 2 item entries', () => {
      expect(element.shadowRoot!.querySelectorAll('mwc-list > mwc-radio-list-item'))
        .to.have.length(2)
    });

    it('will be invalid when no selection made', () => {
      expect(element.valid())
        .to.be.false
      sinon.assert.calledOnce(stub);
    });

    it('will be valid when a selection is made', () => {
      const item = <ListItemBase>element.shadowRoot!.querySelectorAll('mwc-list > mwc-radio-list-item').item(0);
      item.click();

      expect(element.valid())
        .to.be.true
      sinon.assert.calledOnce(stub);
    });

    it('will not have a selected value', () => {
      expect(element.getSelectedValue())
        .to.be.null
      sinon.assert.calledOnce(stub);
    });

    it('will have a selected value of SED', () => {
      const item = <ListItemBase>element.shadowRoot!.querySelectorAll('mwc-list > mwc-radio-list-item').item(0);
      item.click();

      expect(element.getSelectedValue())
        .to.be.equal('SED')
      sinon.assert.calledOnce(stub);
    });

    it('looks like the latest snapshot', async () => {
      expect(element).shadowDom
        .to.equalSnapshot();
      sinon.assert.calledOnce(stub);
    });
  });
});
