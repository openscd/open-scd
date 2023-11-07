import { expect, fixture, html } from '@open-wc/testing';

import '../../../../../src/editors/subscription/later-binding/ext-ref-later-binding-list.js';

import { newFcdaSelectEvent } from '../../../../../src/editors/subscription/foundation.js';
import { ExtRefLaterBindingList } from '../../../../../src/editors/subscription/later-binding/ext-ref-later-binding-list.js';

describe('extref-later-binding-list', () => {
  let doc: XMLDocument;
  let parent: HTMLElement;
  let element: ExtRefLaterBindingList;

  it('looks like the latest snapshot without a doc loaded', async () => {
    parent = await fixture(
      html`<div class="container">
        <extref-later-binding-list></extref-later-binding-list>
      </div>`
    );
    element = <ExtRefLaterBindingList>(
      parent.querySelector('extref-later-binding-list')
    );
    await element.updateComplete;

    await expect(element).shadowDom.to.equalSnapshot();
  });

  describe('for Sampled Value Control', () => {
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/editors/LaterBindingSMV2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      parent = await fixture(
        html`<div class="container">
          <extref-later-binding-list
            .doc=${doc}
            controlTag="SampledValueControl"
          ></extref-later-binding-list>
        </div>`
      );
      element = <ExtRefLaterBindingList>(
        parent.querySelector('extref-later-binding-list')
      );
      await element.updateComplete;
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
        await element.updateComplete;
      });

      it('validate that some ExtRef Element will be disabled', async () => {
        const listItem = element.shadowRoot!.querySelector(
          'mwc-list-item[value="SMV_Subscriber>>Overcurrent> PTRC 1>someRestrictedExtRef[0]"]'
        );
        expect(listItem).to.have.attribute('disabled');
      });

      it('expect the correct number of subscribed elements', () => {
        expect(element['getSubscribedExtRefElements']().length).to.be.equal(0);
      });

      it('expect the correct number of available elements', () => {
        expect(element['getAvailableExtRefElements']().length).to.be.equal(9);
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
        await element.updateComplete;
      });

      it('expect the correct number of subscribed elements', () => {
        expect(element['getSubscribedExtRefElements']().length).to.be.equal(1);
      });

      it('expect the correct number of available elements', () => {
        expect(element['getAvailableExtRefElements']().length).to.be.equal(9);
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
      await element.updateComplete;
    });

    it('expect the correct number of subscribed elements', () => {
      expect(element['getSubscribedExtRefElements']().length).to.be.equal(3);
    });

    it('expect the correct number of available elements', () => {
      expect(element['getAvailableExtRefElements']().length).to.be.equal(9);
    });

    it('looks like the latest snapshot, ', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('for GOOSE Control', () => {
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/editors/LaterBindingGOOSE2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = await fixture(
        html`<div class="container">
          <extref-later-binding-list
            .doc=${doc}
            controlTag="GSEControl"
          ></extref-later-binding-list>
        </div>`
      );
      element = <ExtRefLaterBindingList>(
        parent.querySelector('extref-later-binding-list')
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

      it('validate that some ExtRef Element will be disabled', async () => {
        const listItem = element.shadowRoot!.querySelector(
          'mwc-list-item[value="GOOSE_Subscriber>>Earth_Switch> CSWI 1>someRestrictedExtRef[0]"]'
        );
        expect(listItem).to.have.attribute('disabled');
      });

      it('expect the correct number of subscribed elements', () => {
        expect(element['getSubscribedExtRefElements']().length).to.be.equal(0);
      });

      it('expect the correct number of available elements', () => {
        expect(element['getAvailableExtRefElements']().length).to.be.equal(5);
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
          'IED[name="GOOSE_Publisher"] FCDA[ldInst="QB2_Disconnector"][prefix=""][lnClass="CSWI"][lnInst="1"][doName="Pos"][daName="stVal"]'
        )!;

        element.dispatchEvent(
          newFcdaSelectEvent(gseControlElement, fcdaElement)
        );
        await element.requestUpdate();
        await element.updateComplete;
      });

      it('expect the correct number of subscribed elements', () => {
        expect(element['getSubscribedExtRefElements']().length).to.be.equal(1);
      });

      it('expect the correct number of available elements', () => {
        expect(element['getAvailableExtRefElements']().length).to.be.equal(5);
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
        'IED[name="GOOSE_Publisher"] FCDA[ldInst="QB2_Disconnector"][prefix=""][lnClass="CSWI"][lnInst="1"][doName="Pos"][daName="q"]'
      )!;

      element.dispatchEvent(newFcdaSelectEvent(gseControlElement, fcdaElement));
      await element.requestUpdate();
      await element.updateComplete;
    });

    it('expect the correct number of subscribed elements', () => {
      expect(element['getSubscribedExtRefElements']().length).to.be.equal(2);
    });

    it('expect the correct number of available elements', () => {
      expect(element['getAvailableExtRefElements']().length).to.be.equal(5);
    });

    it('looks like the latest snapshot, ', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });
});
