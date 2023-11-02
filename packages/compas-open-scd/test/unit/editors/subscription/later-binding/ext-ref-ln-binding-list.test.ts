import { expect, fixture, html } from '@open-wc/testing';

import { initializeNsdoc } from '../../../../../src/foundation/nsdoc.js';

import '../../../../../src/editors/subscription/later-binding/ext-ref-ln-binding-list.js';

import { newFcdaSelectEvent } from '../../../../../src/editors/subscription/foundation.js';
import { ExtRefLnBindingList } from '../../../../../src/editors/subscription/later-binding/ext-ref-ln-binding-list.js';

describe('extref-ln-binding-list', async () => {
  let doc: XMLDocument;
  let parent: HTMLElement;
  let element: ExtRefLnBindingList;

  const nsdoc = await initializeNsdoc();

  it('looks like the latest snapshot without a doc loaded', async () => {
    parent = await fixture(
      html` <div class="container">
        <extref-ln-binding-list></extref-ln-binding-list>
      </div>`
    );
    element = <ExtRefLnBindingList>(
      parent.querySelector('extref-ln-binding-list')
    );
    await element.updateComplete;

    await expect(element).shadowDom.to.equalSnapshot();
  });

  describe('for Sampled Value Control', () => {
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/editors/DataBindingSMV2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      parent = await fixture(
        html` <div class="container">
          <extref-ln-binding-list
            .doc=${doc}
            .nsdoc=${nsdoc}
            controlTag="SampledValueControl"
          ></extref-ln-binding-list>
        </div>`
      );
      element = <ExtRefLnBindingList>(
        parent.querySelector('extref-ln-binding-list')
      );
      await element.updateComplete;
    });

    it('looks like the latest snapshot, but no event fired', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });

    describe('when SVC has no subscriptions', () => {
      beforeEach(async () => {
        const svcElement = doc.querySelector(
          'IED[name="SMV_Publisher"] SampledValueControl[name="fullSmv"]'
        )!;
        const fcdaElement = doc.querySelector(
          'IED[name="SMV_Publisher"] FCDA[ldInst="CurrentTransformer"][prefix="L2"][lnClass="TCTR"][lnInst="1"][doName="AmpSv"][daName="instMag.i"]'
        )!;

        element.dispatchEvent(newFcdaSelectEvent(svcElement, fcdaElement));
        await element.requestUpdate();
        await element.updateComplete;
      });

      it('expect the correct number of subscribed elements', () => {
        expect(element['getSubscribedLNElements']().length).to.be.equal(0);
      });

      it('expect the correct number of available elements', () => {
        expect(element['getAvailableLNElements']().length).to.be.equal(8);
      });

      it('looks like the latest snapshot, when SVC has no subscriptions', async () => {
        await expect(element).shadowDom.to.equalSnapshot();
      });
    });

    describe('when SVC has a single subscriptions', () => {
      beforeEach(async () => {
        const svcElement = doc.querySelector(
          'IED[name="SMV_Publisher"] SampledValueControl[name="fullSmv"]'
        )!;
        const fcdaElement = doc.querySelector(
          'IED[name="SMV_Publisher"] FCDA[ldInst="CurrentTransformer"][prefix="L2"][lnClass="TCTR"][lnInst="1"][doName="AmpSv"][daName="q"]'
        )!;

        element.dispatchEvent(newFcdaSelectEvent(svcElement, fcdaElement));
        await element.requestUpdate();
        await element.updateComplete;
      });

      it('expect the correct number of subscribed elements', () => {
        expect(element['getSubscribedLNElements']().length).to.be.equal(1);
      });

      it('expect the correct number of available elements', () => {
        expect(element['getAvailableLNElements']().length).to.be.equal(7);
      });

      it('looks like the latest snapshot, ', async () => {
        await expect(element).shadowDom.to.equalSnapshot();
      });
    });
  });

  describe('when SVC has a multiple subscriptions', () => {
    beforeEach(async () => {
      const svcElement = doc.querySelector(
        'IED[name="SMV_Publisher"] SampledValueControl[name="fullSmv"]'
      )!;
      const fcdaElement = doc.querySelector(
        'IED[name="SMV_Publisher"] FCDA[ldInst="CurrentTransformer"][prefix="L3"][lnClass="TCTR"][lnInst="1"][doName="AmpSv"][daName="instMag.i"]'
      )!;

      element.dispatchEvent(newFcdaSelectEvent(svcElement, fcdaElement));
      await element.requestUpdate();
      await element.updateComplete;
    });

    it('validate that some subscribed ExtRef Element will be disabled', async () => {
      const listItem = element.shadowRoot!.querySelector(
        'mwc-list-item[value="SMV_Subscriber2>>Overvoltage"]'
      );
      expect(listItem).to.have.attribute('disabled');
    });

    it('validate that some available ExtRef Element will be disabled', async () => {
      const listItem = element.shadowRoot!.querySelector(
        'mwc-list-item[value="SMV_Subscriber2>>Overcurrent"]'
      );
      expect(listItem).to.have.attribute('disabled');
    });

    it('expect the correct number of subscribed elements', () => {
      expect(element['getSubscribedLNElements']().length).to.be.equal(2);
    });

    it('expect the correct number of available elements', () => {
      expect(element['getAvailableLNElements']().length).to.be.equal(6);
    });

    it('looks like the latest snapshot, ', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('for GOOSE Control', () => {
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/editors/DataBindingGOOSE2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = await fixture(
        html`<div class="container">
          <extref-ln-binding-list
            .doc=${doc}
            .nsdoc=${nsdoc}
            controlTag="GSEControl"
          ></extref-ln-binding-list>
        </div>`
      );
      element = <ExtRefLnBindingList>(
        parent.querySelector('extref-ln-binding-list')
      );
      await element.updateComplete;
    });

    it('looks like the latest snapshot, but no event fired', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });

    describe('when GSEControl has no subscriptions', () => {
      beforeEach(async () => {
        const gseControlElement = doc.querySelector(
          'IED[name="GOOSE_Publisher"] GSEControl[name="GOOSE1"]'
        )!;
        const fcdaElement = doc.querySelector(
          'IED[name="GOOSE_Publisher"] FCDA[ldInst="QB1_Disconnector"][prefix=""][lnClass="CSWI"][lnInst="1"][doName="Pos"][daName="stVal"]'
        )!;

        element.dispatchEvent(
          newFcdaSelectEvent(gseControlElement, fcdaElement)
        );
        await element.requestUpdate();
        await element.updateComplete;
      });

      it('expect the correct number of subscribed elements', () => {
        expect(element['getSubscribedLNElements']().length).to.be.equal(0);
      });

      it('expect the correct number of available elements', () => {
        expect(element['getAvailableLNElements']().length).to.be.equal(8);
      });

      it('looks like the latest snapshot, when GSEControl has no subscriptions', async () => {
        await expect(element).shadowDom.to.equalSnapshot();
      });
    });

    describe('when GSEControl has a single subscription', () => {
      beforeEach(async () => {
        const gseControlElement = doc.querySelector(
          'IED[name="GOOSE_Publisher"] GSEControl[name="GOOSE2"]'
        )!;
        const fcdaElement = doc.querySelector(
          'IED[name="GOOSE_Publisher"] FCDA[ldInst="QB2_Disconnector"][prefix=""][lnClass="CSWI"][lnInst="1"][doName="Pos"][daName="q"]'
        )!;

        element.dispatchEvent(
          newFcdaSelectEvent(gseControlElement, fcdaElement)
        );
        await element.requestUpdate();
        await element.updateComplete;
      });

      it('expect the correct number of subscribed elements', () => {
        expect(element['getSubscribedLNElements']().length).to.be.equal(1);
      });

      it('expect the correct number of available elements', () => {
        expect(element['getAvailableLNElements']().length).to.be.equal(7);
      });

      it('looks like the latest snapshot, ', async () => {
        await expect(element).shadowDom.to.equalSnapshot();
      });
    });
  });

  describe('when GSEControl has a multiple subscriptions', () => {
    beforeEach(async () => {
      const gseControlElement = doc.querySelector(
        'IED[name="GOOSE_Publisher"] GSEControl[name="GOOSE2"]'
      )!;
      const fcdaElement = doc.querySelector(
        'IED[name="GOOSE_Publisher"] FCDA[ldInst="QB2_Disconnector"][prefix=""][lnClass="CSWI"][lnInst="1"][doName="Pos"][daName="stVal"]'
      )!;

      element.dispatchEvent(newFcdaSelectEvent(gseControlElement, fcdaElement));
      await element.requestUpdate();
      await element.updateComplete;
    });

    it('validate that some subscribed ExtRef Element will be disabled', async () => {
      const listItem = element.shadowRoot!.querySelector(
        'mwc-list-item[value="GOOSE_Subscriber1>>Earth_Switch"]'
      );
      expect(listItem).to.have.attribute('disabled');
    });

    it('validate that some available ExtRef Element will be disabled', async () => {
      const listItem = element.shadowRoot!.querySelector(
        'mwc-list-item[value="GOOSE_Subscriber1>>Earth_Switch> XSWI 1"]'
      );
      expect(listItem).to.have.attribute('disabled');
    });

    it('expect the correct number of subscribed elements', () => {
      expect(element['getSubscribedLNElements']().length).to.be.equal(3);
    });

    it('expect the correct number of available elements', () => {
      expect(element['getAvailableLNElements']().length).to.be.equal(5);
    });

    it('looks like the latest snapshot, ', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });
});
