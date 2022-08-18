import { expect, fixture, html } from '@open-wc/testing';

import '../../../../../src/editors/subscription/smv-laterbinding/ext-ref-laterbinding-list.js';

import { newFcdaSelectEvent } from '../../../../../src/editors/subscription/smv-laterbinding/foundation.js';
import { ExtRefLaterBindingList } from '../../../../../src/editors/subscription/smv-laterbinding/ext-ref-laterbinding-list.js';

describe('smv-list', () => {
  let parent: Element;
  let element: ExtRefLaterBindingList;
  let doc: XMLDocument;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/editors/LaterBindingSMV2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  it('looks like the latest snapshot without a doc loaded', async () => {
    parent = await fixture(
      html`<div class="container">
        <extref-later-binding-list></extref-later-binding-list>
      </div>`
    );
    element = <ExtRefLaterBindingList>(
      parent.querySelector('extref-later-binding-list')
    );

    await expect(element).shadowDom.to.equalSnapshot();
  });

  describe('with document loaded', () => {
    beforeEach(async () => {
      parent = await fixture(
        html`<div class="container">
          <extref-later-binding-list .doc=${doc}></extref-later-binding-list>
        </div>`
      );
      element = <ExtRefLaterBindingList>(
        parent.querySelector('extref-later-binding-list')
      );
    });

    it('looks like the latest snapshot, but no event fired', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });

    describe('when SVC has no subscriptions', () => {
      beforeEach(async () => {
        const svcElement = doc.querySelector(
          'IED[name="SMV_Publisher"] SampledValueControl[name="currentOnly"]'
        )!;
        const fcdaElement = doc.querySelector(
          'IED[name="SMV_Publisher"] FCDA[ldInst="CurrentTransformer"][prefix="L2"][lnClass="TCTR"][lnInst="1"][doName="AmpSv"][daName="instMag.i"]'
        )!;

        element.dispatchEvent(newFcdaSelectEvent(svcElement, fcdaElement));
        await element.requestUpdate();
      });

      it('validate that some ExtRef Element will be disabled', async () => {
        const listItem = element.shadowRoot!.querySelector(
          'mwc-list-item[value="SMV_Subscriber>>Overcurrent> PTRC 1>someRestrictedExtRef[0]"]'
        );
        expect(listItem).to.have.attribute('disabled');
        expect(listItem).to.have.attribute('aria-disabled', 'true');
      });

      it('expect the correct number of subscribed elements', () => {
        expect(element['getSubscribedExtRefElements']().length).to.be.equal(0);
      });

      it('expect the correct number of available elements', () => {
        expect(element['getAvailableExtRefElements']().length).to.be.equal(8);
      });

      it('looks like the latest snapshot, when SVC has no subscriptions', async () => {
        await expect(element).shadowDom.to.equalSnapshot();
      });
    });

    describe('when SVC has a single subscriptions', () => {
      beforeEach(async () => {
        const svcElement = doc.querySelector(
          'IED[name="SMV_Publisher"] SampledValueControl[name="currentOnly"]'
        )!;
        const fcdaElement = doc.querySelector(
          'IED[name="SMV_Publisher"] FCDA[ldInst="CurrentTransformer"][prefix="L1"][lnClass="TCTR"][lnInst="1"][doName="AmpSv"][daName="instMag.i"]'
        )!;

        element.dispatchEvent(newFcdaSelectEvent(svcElement, fcdaElement));
        await element.requestUpdate();
      });

      it('expect the correct number of subscribed elements', () => {
        expect(element['getSubscribedExtRefElements']().length).to.be.equal(1);
      });

      it('expect the correct number of available elements', () => {
        expect(element['getAvailableExtRefElements']().length).to.be.equal(8);
      });

      it('looks like the latest snapshot, ', async () => {
        await expect(element).shadowDom.to.equalSnapshot();
      });
    });
  });

  describe('when SVC has a multiple subscriptions', () => {
    beforeEach(async () => {
      const svcElement = doc.querySelector(
        'IED[name="SMV_Publisher"] SampledValueControl[name="currentOnly"]'
      )!;
      const fcdaElement = doc.querySelector(
        'IED[name="SMV_Publisher"] FCDA[ldInst="CurrentTransformer"][prefix="L1"][lnClass="TCTR"][lnInst="1"][doName="AmpSv"][daName="q"]'
      )!;

      element.dispatchEvent(newFcdaSelectEvent(svcElement, fcdaElement));
      await element.requestUpdate();
    });

    it('expect the correct number of subscribed elements', () => {
      expect(element['getSubscribedExtRefElements']().length).to.be.equal(3);
    });

    it('expect the correct number of available elements', () => {
      expect(element['getAvailableExtRefElements']().length).to.be.equal(8);
    });

    it('looks like the latest snapshot, ', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });
});
