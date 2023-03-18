import { expect, fixture, html } from '@open-wc/testing';

import { Wizarding } from '../../../src/Wizarding.js';
import { Editing } from '../../../src/Editing.js';

import SMVSubscribeLaterBindingPlugin from '../../../src/editors/SMVSubscriberLaterBinding.js';
import {
  getExtrefLaterBindingList,
  getExtrefLaterBindingListSubscriber,
  getFCDABindingList,
  getSelectedSubItemValue,
  getSubscribedExtRefsCount,
  selectExtRefItem,
  selectFCDAItem,
} from './test-support.js';
import { ExtRefLaterBindingList } from '../../../src/editors/subscription/later-binding/ext-ref-later-binding-list.js';
import { ExtRefLaterBindingListSubscriber } from '../../../src/editors/subscription/later-binding/ext-ref-later-binding-list-subscriber.js';
import { FcdaBindingList } from '../../../src/editors/subscription/fcda-binding-list.js';
import { Icon } from '@material/mwc-icon';
import { List } from '@material/mwc-list';
import { ListItem } from '@material/mwc-list/mwc-list-item.js';

describe('SMV Subscribe Later Binding plugin', () => {
  customElements.define(
    'smv-subscribe-later-binding-plugin',
    Wizarding(Editing(SMVSubscribeLaterBindingPlugin))
  );
  let element: SMVSubscribeLaterBindingPlugin;
  let doc: XMLDocument;

  describe('when in the Publisher view', () => {
    beforeEach(async () => {
      localStorage.clear();
      doc = await fetch('/test/testfiles/editors/LaterBindingSMV2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      element = await fixture(
        html` <smv-subscribe-later-binding-plugin
          .doc=${doc}
        ></smv-subscribe-later-binding-plugin>`
      );
      await element.requestUpdate();
    });

    it('when selecting an FCDA element with subscriptions it looks like the latest snapshot', async () => {
      doc = await fetch('/test/testfiles/editors/LaterBindingSMV-LSVS.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      element = await fixture(
        html`<smv-subscribe-later-binding-plugin
          .doc="${doc}"
        ></smv-subscribe-later-binding-plugin>`
      );

      const fcdaListElement = getFCDABindingList(element);
      selectFCDAItem(
        fcdaListElement,
        'SMV_Publisher>>CurrentTransformer>currrentOnly',
        'SMV_Publisher>>CurrentTransformer>currrentOnlysDataSet>CurrentTransformer/L1 TCTR 1.AmpSv instMag.i (MX)'
      );
      await element.requestUpdate();

      const extRefListElement = <ExtRefLaterBindingList>(
        element.shadowRoot?.querySelector('extref-later-binding-list')
      );
      await extRefListElement.requestUpdate();

      await expect(extRefListElement).shadowDom.to.equalSnapshot();
    });

    it('when subscribing an available ExtRef then the lists are changed', async () => {
      const fcdaListElement = getFCDABindingList(element);
      const extRefListElement = getExtrefLaterBindingList(element);

      selectFCDAItem(
        fcdaListElement,
        'SMV_Publisher>>CurrentTransformer>currentOnly',
        'SMV_Publisher>>CurrentTransformer>currentOnlysDataSet>CurrentTransformer/L2 TCTR 1.AmpSv instMag.i (MX)'
      );
      await element.requestUpdate();
      await extRefListElement.requestUpdate();

      expect(
        extRefListElement['getSubscribedExtRefElements']().length
      ).to.be.equal(0);
      expect(getSelectedSubItemValue(fcdaListElement)).to.be.null;
      expect(
        extRefListElement['getAvailableExtRefElements']().length
      ).to.be.equal(9);

      (<HTMLElement>(
        extRefListElement.shadowRoot!.querySelector(
          'mwc-list-item[value="SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR2/AmpSv/instMag.i[0]"]'
        )
      )).click();
      await element.requestUpdate();

      expect(
        extRefListElement['getSubscribedExtRefElements']().length
      ).to.be.equal(1);
      expect(getSelectedSubItemValue(fcdaListElement)).to.have.text('1');
      expect(
        extRefListElement['getAvailableExtRefElements']().length
      ).to.be.equal(8);
    });

    it('when subscribing an available ExtRef then a supervision instance is created', async () => {
      doc = await fetch('/test/testfiles/editors/LaterBindingSMV-LSVS.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      element = await fixture(
        html`<smv-subscribe-later-binding-plugin
          .doc="${doc}"
        ></smv-subscribe-later-binding-plugin>`
      );

      const fcdaListElement = getFCDABindingList(element);
      const extRefListElement = getExtrefLaterBindingList(element);

      selectFCDAItem(
        fcdaListElement,
        'SMV_Publisher>>CurrentTransformer>fullSmv',
        'SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>CurrentTransformer/L2 TCTR 2.AmpSv instMag.i (MX)'
      );
      await element.requestUpdate();
      await extRefListElement.requestUpdate();

      (<HTMLElement>(
        extRefListElement.shadowRoot!.querySelector(
          'mwc-list-item[value="SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR1/AmpSv/instMag.i[0]"]'
        )
      )).click();
      await element.requestUpdate();

      const supervisionInstance = element.doc.querySelector(
        'IED[name="SMV_Subscriber"] LN[lnClass="LSVS"][inst="3"]'
      );
      expect(supervisionInstance).to.exist;
      expect(
        supervisionInstance?.previousElementSibling?.getAttribute('lnClass')
      ).to.equal('LSVS');
      expect(
        supervisionInstance?.previousElementSibling?.getAttribute('inst')
      ).to.equal('2');
    });

    it('when unsubscribing a subscribed ExtRef then the lists are changed', async () => {
      const fcdaListElement = getFCDABindingList(element);
      const extRefListElement = getExtrefLaterBindingList(element);

      selectFCDAItem(
        fcdaListElement,
        'SMV_Publisher>>CurrentTransformer>currentOnly',
        'SMV_Publisher>>CurrentTransformer>currentOnlysDataSet>CurrentTransformer/L1 TCTR 1.AmpSv q (MX)'
      );
      await element.requestUpdate();
      await extRefListElement.requestUpdate();

      expect(
        extRefListElement['getSubscribedExtRefElements']().length
      ).to.be.equal(3);
      expect(getSelectedSubItemValue(fcdaListElement)).to.have.text('3');
      expect(
        extRefListElement['getAvailableExtRefElements']().length
      ).to.be.equal(9);

      (<HTMLElement>(
        extRefListElement.shadowRoot!.querySelector(
          'mwc-list-item[value="SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR1/AmpSv/q[0]"]'
        )
      )).click();
      await fcdaListElement.requestUpdate();
      await element.requestUpdate();

      expect(
        extRefListElement['getSubscribedExtRefElements']().length
      ).to.be.equal(2);
      expect(getSelectedSubItemValue(fcdaListElement)).to.have.text('2');
      expect(
        extRefListElement['getAvailableExtRefElements']().length
      ).to.be.equal(10);
    });

    it('can be selected to the subscriber view', async () => {
      const fcdaElement = getFCDABindingList(element);

      (<Icon>fcdaElement.shadowRoot!.querySelector('.switch-view'))!.click();
      await new Promise(resolve => setTimeout(resolve, 150)); // await animation

      await element.requestUpdate();

      const extRefElement = getExtrefLaterBindingListSubscriber(element);
      expect(extRefElement).shadowDom.to.equalSnapshot();
    });
  });

  describe('when in the subscriber view', () => {
    let fcdaElement: FcdaBindingList;
    let extRefElement: ExtRefLaterBindingListSubscriber;

    beforeEach(async () => {
      localStorage.clear();
      doc = await fetch('/test/testfiles/editors/LaterBindingSMV2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      element = await fixture(
        html` <smv-subscribe-later-binding-plugin
          .doc=${doc}
          ?subscriberview="${true}"
        ></smv-subscribe-later-binding-plugin>`
      );
      await element.requestUpdate();

      fcdaElement = getFCDABindingList(element);
      extRefElement = getExtrefLaterBindingListSubscriber(element);
    });

    it('the FCDA list looks like the latest snapshot', async () => {
      expect(fcdaElement).shadowDom.to.equalSnapshot();
    });

    describe('when subscribing', async () => {
      it('an available ExtRef then a subscription is made and the next ExtRef is selected', async () => {
        expect(
          getSubscribedExtRefsCount(extRefElement, 'SMV_Subscriber')
        ).to.be.equal(5); // subscriptions unchanged

        selectExtRefItem(
          extRefElement,
          'SMV_Subscriber>>Overcurrent> PTRC 1>someRestrictedExtRef[0]'
        );
        await element.updateComplete;

        expect(
          getSubscribedExtRefsCount(extRefElement, 'SMV_Subscriber')
        ).to.be.equal(5); // subscriptions unchanged

        selectFCDAItem(
          fcdaElement,
          'SMV_Publisher>>CurrentTransformer>fullSmv',
          'SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>CurrentTransformer/L2 TCTR 1.AmpSv instMag.i (MX)'
        );
        await element.updateComplete;

        expect(
          getSubscribedExtRefsCount(extRefElement, 'SMV_Subscriber')
        ).to.be.equal(6);

        const selectedExtRef = Array.from(
          (<List>(
            extRefElement.shadowRoot!.querySelector('filtered-list')!
          )).items.filter(item => item.attributes.getNamedItem('selected'))
        )[0];

        expect(selectedExtRef.value).to.equal(
          'SMV_Subscriber>>Overcurrent> PTRC 1>someRestrictedExtRef[1]'
        ); // new subscription

        // check counts and disabled items in FCDA list via snapshot
        expect(fcdaElement).shadowDom.to.equalSnapshot();
      });

      it('an available ExtRef a subscription is made and if auto-increment is disabled, the next ExtRef is not selected', async () => {
        extRefElement.settingsMenuIcon.click();
        await element.updateComplete;
        (<ListItem>(
          extRefElement.settingsMenu!.querySelector('.auto-increment')
        ))!.click();
        await new Promise(resolve => setTimeout(resolve, 150)); // await animation
        await element.updateComplete;

        expect(
          getSubscribedExtRefsCount(extRefElement, 'SMV_Subscriber')
        ).to.be.equal(5); // subscriptions unchanged

        selectExtRefItem(
          extRefElement,
          'SMV_Subscriber>>Overcurrent> PTRC 1>someRestrictedExtRef[0]'
        );
        await element.updateComplete;

        expect(
          getSubscribedExtRefsCount(extRefElement, 'SMV_Subscriber')
        ).to.be.equal(5); // subscriptions unchanged

        selectFCDAItem(
          fcdaElement,
          'SMV_Publisher>>CurrentTransformer>fullSmv',
          'SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>CurrentTransformer/L2 TCTR 1.AmpSv instMag.i (MX)'
        );
        await element.updateComplete;

        expect(
          getSubscribedExtRefsCount(extRefElement, 'SMV_Subscriber')
        ).to.be.equal(6);

        const selectedExtRef = Array.from(
          (<List>(
            extRefElement.shadowRoot!.querySelector('filtered-list')!
          )).items.filter(item => item.attributes.getNamedItem('selected'))
        )[0];

        expect(selectedExtRef.value).to.equal(
          'SMV_Subscriber>>Overcurrent> PTRC 1>someRestrictedExtRef[0]'
        );
      });

      it('an available ExtRef then a supervision instance is created', async () => {
        doc = await fetch('/test/testfiles/editors/LaterBindingSMV-LSVS.scd')
          .then(response => response.text())
          .then(str => new DOMParser().parseFromString(str, 'application/xml'));

        element = await fixture(
          html`<smv-subscribe-later-binding-plugin
            .doc="${doc}"
            ?subscriberview="${true}"
          ></smv-subscribe-later-binding-plugin>`
        );

        const fcdaElement = getFCDABindingList(element);
        const extRefElement = getExtrefLaterBindingListSubscriber(element);

        expect(
          getSubscribedExtRefsCount(extRefElement, 'SMV_Subscriber')
        ).to.be.equal(5);

        selectExtRefItem(
          extRefElement,
          'SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR1/AmpSv/instMag.i[0]'
        );
        await element.updateComplete;

        selectFCDAItem(
          fcdaElement,
          'SMV_Publisher>>CurrentTransformer>fullSmv',
          'SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>CurrentTransformer/L2 TCTR 2.AmpSv instMag.i (MX)'
        );
        await element.updateComplete;

        expect(
          getSubscribedExtRefsCount(extRefElement, 'SMV_Subscriber')
        ).to.be.equal(6);

        const supervisionInstance = element.doc.querySelector(
          'IED[name="SMV_Subscriber"] LN[lnClass="LSVS"][inst="3"]'
        );
        expect(supervisionInstance).to.exist;
        expect(
          supervisionInstance?.previousElementSibling?.getAttribute('lnClass')
        ).to.equal('LSVS');
        expect(
          supervisionInstance?.previousElementSibling?.getAttribute('inst')
        ).to.equal('2');
      });
    });

    describe('when unsubscribing', async () => {
      it('a subscribed ExtRef then the lists are changed', async () => {
        expect(
          getSubscribedExtRefsCount(extRefElement, 'SMV_Subscriber')
        ).to.be.equal(5); // subscriptions unchanged

        selectExtRefItem(
          extRefElement,
          'SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR1/VolSv/instMag.i[0]'
        );
        await element.updateComplete;

        expect(
          getSubscribedExtRefsCount(extRefElement, 'SMV_Subscriber')
        ).to.be.equal(4); // subscriptions changed

        // check counts and disabled items in FCDA list via snapshot
        expect(fcdaElement).shadowDom.to.equalSnapshot();
      });
    });

    it('Shows correct items disabled in the FCDA list', async () => {
      selectExtRefItem(
        extRefElement,
        'SMV_Subscriber>>Overcurrent> PTRC 1>someRestrictedExtRef[0]'
      );
      await element.updateComplete;

      const listItems = fcdaElement!
        .shadowRoot!.querySelector('filtered-list')!
        .querySelectorAll('mwc-list-item');

      expect(listItems[1].disabled).to.equal(true);
      expect(listItems[3].disabled).to.equal(true);
      expect(listItems[5].disabled).to.equal(true);
    });

    it('the ExtRef list looks like the latest snapshot', async () => {
      expect(extRefElement).shadowDom.to.equalSnapshot();
    });

    it('can be selected to the publisher view', async () => {
      (<Icon>extRefElement.shadowRoot!.querySelector('.switch-view'))!.click();
      await new Promise(resolve => setTimeout(resolve, 300)); // await animation
      await element.requestUpdate();

      const extRefElementPublisher = getExtrefLaterBindingList(element);
      expect(extRefElementPublisher).shadowDom.to.equalSnapshot();
    });
  });
});
