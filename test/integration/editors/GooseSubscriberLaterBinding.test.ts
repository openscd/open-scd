import { expect, fixture, html } from '@open-wc/testing';
import { Wizarding } from '../../../src/Wizarding.js';
import { Editing } from '../../../src/Editing.js';

import GooseSubscriberLaterBinding from '../../../src/editors/GooseSubscriberLaterBinding.js';
import {
  getExtrefLaterBindingList,
  getExtrefLaterBindingListSubscriber,
  getFCDABindingList,
  getFCDAItemCount,
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

describe('GOOSE Subscribe Later Binding Plugin', () => {
  customElements.define(
    'goose-subscriber-later-binding-plugin',
    Wizarding(Editing(GooseSubscriberLaterBinding))
  );

  let element: GooseSubscriberLaterBinding;
  let doc: XMLDocument;

  describe('when in the Publisher view', () => {
    beforeEach(async () => {
      localStorage.clear();
      doc = await fetch('/test/testfiles/editors/LaterBindingGOOSE2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      element = await fixture(
        html`<goose-subscriber-later-binding-plugin
          .doc="${doc}"
        ></goose-subscriber-later-binding-plugin>`
      );
    });

    it('when selecting an FCDA element with subscriptions it looks like the latest snapshot', async () => {
      doc = await fetch('/test/testfiles/editors/LaterBindingGOOSE-LGOS.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      element = await fixture(
        html`<goose-subscriber-later-binding-plugin
          .doc="${doc}"
        ></goose-subscriber-later-binding-plugin>`
      );

      const fcdaListElement = getFCDABindingList(element);
      selectFCDAItem(
        fcdaListElement,
        'GOOSE_Publisher>>QB2_Disconnector>GOOSE2',
        'GOOSE_Publisher>>QB2_Disconnector>GOOSE2sDataSet>QB2_Disconnector/ CSWI 1.Pos stVal (ST)'
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
        'GOOSE_Publisher>>QB2_Disconnector>GOOSE1',
        'GOOSE_Publisher>>QB2_Disconnector>GOOSE1sDataSet>QB1_Disconnector/ CSWI 1.Pos q (ST)'
      );
      await element.requestUpdate();
      await extRefListElement.requestUpdate();

      expect(
        extRefListElement['getSubscribedExtRefElements']().length
      ).to.be.equal(0);
      expect(getSelectedSubItemValue(fcdaListElement)).to.be.null;
      expect(
        extRefListElement['getAvailableExtRefElements']().length
      ).to.be.equal(3);

      (<HTMLElement>(
        extRefListElement.shadowRoot!.querySelector(
          'mwc-list-item[value="GOOSE_Subscriber>>Earth_Switch> CILO 1>Pos;CSWI1/Pos/stVal[0]"]'
        )
      )).click();
      await element.requestUpdate();

      expect(
        extRefListElement['getSubscribedExtRefElements']().length
      ).to.be.equal(1);
      expect(getSelectedSubItemValue(fcdaListElement)).to.have.text('1');
      expect(
        extRefListElement['getAvailableExtRefElements']().length
      ).to.be.equal(2);
    });

    it('when subscribing an available ExtRef then a supervision instance is created', async () => {
      doc = await fetch('/test/testfiles/editors/LaterBindingGOOSE-LGOS.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      element = await fixture(
        html`<goose-subscriber-later-binding-plugin
          .doc="${doc}"
        ></goose-subscriber-later-binding-plugin>`
      );

      const extRefListElement = getExtrefLaterBindingList(element);

      const fcdaListElement = getFCDABindingList(element);
      selectFCDAItem(
        fcdaListElement,
        'GOOSE_Publisher2>>QB2_Disconnector>GOOSE1',
        'GOOSE_Publisher2>>QB2_Disconnector>GOOSE1sDataSet>QB1_Disconnector/ CSWI 1.Pos stVal (ST)'
      );
      await element.requestUpdate();
      await extRefListElement.requestUpdate();

      (<HTMLElement>(
        extRefListElement.shadowRoot!.querySelector(
          'mwc-list-item[value="GOOSE_Subscriber1>>Earth_Switch> CILO 1>Pos;CSWI1/Pos/stVal[0]"]'
        )
      )).click();
      await element.requestUpdate();

      const supervisionInstance = element.doc.querySelector(
        'IED[name="GOOSE_Subscriber1"] LN[lnClass="LGOS"][inst="4"]'
      );
      expect(supervisionInstance).to.exist;
      expect(
        supervisionInstance?.previousElementSibling?.getAttribute('lnClass')
      ).to.equal('LGOS');
      expect(
        supervisionInstance?.previousElementSibling?.getAttribute('inst')
      ).to.equal('3');
    });

    it('when unsubscribing a subscribed ExtRef then the lists are changed', async () => {
      const fcdaListElement = getFCDABindingList(element);
      const extRefListElement = getExtrefLaterBindingList(element);

      selectFCDAItem(
        fcdaListElement,
        'GOOSE_Publisher>>QB2_Disconnector>GOOSE2',
        'GOOSE_Publisher>>QB2_Disconnector>GOOSE2sDataSet>QB2_Disconnector/ CSWI 1.Pos q (ST)'
      );
      await element.requestUpdate();
      await extRefListElement.requestUpdate();

      expect(
        extRefListElement['getSubscribedExtRefElements']().length
      ).to.be.equal(2);
      expect(getSelectedSubItemValue(fcdaListElement)).to.have.text('2');
      expect(
        extRefListElement['getAvailableExtRefElements']().length
      ).to.be.equal(3);

      (<HTMLElement>(
        extRefListElement.shadowRoot!.querySelector(
          'mwc-list-item[value="GOOSE_Subscriber>>Earth_Switch> CSWI 1>Pos;CSWI1/Pos/q[0]"]'
        )
      )).click();
      await fcdaListElement.requestUpdate();
      await element.requestUpdate();

      expect(
        extRefListElement['getSubscribedExtRefElements']().length
      ).to.be.equal(1);
      expect(getSelectedSubItemValue(fcdaListElement)).to.have.text('1');
      expect(
        extRefListElement['getAvailableExtRefElements']().length
      ).to.be.equal(4);
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
      doc = await fetch('/test/testfiles/editors/LaterBindingGOOSE2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      element = await fixture(
        html` <goose-subscriber-later-binding-plugin
          .doc=${doc}
          ?subscriberview="${true}"
        ></goose-subscriber-later-binding-plugin>`
      );
      await element.requestUpdate();

      fcdaElement = getFCDABindingList(element);
      extRefElement = getExtrefLaterBindingListSubscriber(element);
    });

    it('the FCDA list looks like the latest snapshot', async () => {
      expect(fcdaElement).shadowDom.to.equalSnapshot();
    });

    it('the ExtRef list looks like the latest snapshot', async () => {
      expect(extRefElement).shadowDom.to.equalSnapshot();
    });

    describe('when subscribing', async () => {
      it('an available ExtRef then a subscription is made and the next ExtRef is selected', async () => {
        expect(
          getSubscribedExtRefsCount(extRefElement, 'GOOSE_Subscriber')
        ).to.be.equal(8); // subscriptions unchanged

        selectExtRefItem(
          extRefElement,
          'GOOSE_Subscriber>>Earth_Switch> CSWI 1>someRestrictedExtRef[0]'
        );
        await element.updateComplete;

        expect(
          getSubscribedExtRefsCount(extRefElement, 'GOOSE_Subscriber')
        ).to.be.equal(8); // subscriptions unchanged

        let itemCount = getFCDAItemCount(
          fcdaElement,
          'GOOSE_Publisher>>QB2_Disconnector>GOOSE1',
          'GOOSE_Publisher>>QB2_Disconnector>GOOSE1sDataSet>QB1_Disconnector/ CSWI 1.Pos q (ST)'
        );
        expect(itemCount).to.equal(undefined); // no items

        selectFCDAItem(
          fcdaElement,
          'GOOSE_Publisher>>QB2_Disconnector>GOOSE1',
          'GOOSE_Publisher>>QB2_Disconnector>GOOSE1sDataSet>QB1_Disconnector/ CSWI 1.Pos q (ST)'
        );
        await element.updateComplete;

        expect(
          getSubscribedExtRefsCount(extRefElement, 'GOOSE_Subscriber')
        ).to.be.equal(9);

        itemCount = getFCDAItemCount(
          fcdaElement,
          'GOOSE_Publisher>>QB2_Disconnector>GOOSE1',
          'GOOSE_Publisher>>QB2_Disconnector>GOOSE1sDataSet>QB1_Disconnector/ CSWI 1.Pos q (ST)'
        );
        expect(itemCount).to.equal('1'); // item count increased

        const selectedExtRef = Array.from(
          (<List>(
            extRefElement.shadowRoot!.querySelector('filtered-list')!
          )).items.filter(item => item.attributes.getNamedItem('selected'))
        )[0];

        expect(selectedExtRef.value).to.equal(
          'GOOSE_Subscriber>>Earth_Switch> CSWI 1>someRestrictedExtRef[1]'
        ); // next ExtRef

        // // check counts and disabled items in FCDA list via snapshot
        // expect(fcdaElement).shadowDom.to.equalSnapshot();
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
          getSubscribedExtRefsCount(extRefElement, 'GOOSE_Subscriber')
        ).to.be.equal(8); // subscriptions unchanged

        selectExtRefItem(
          extRefElement,
          'GOOSE_Subscriber>>Earth_Switch> CILO 1>Pos;CSWI1/Pos/stVal[0]'
        );
        await element.updateComplete;

        expect(
          getSubscribedExtRefsCount(extRefElement, 'GOOSE_Subscriber')
        ).to.be.equal(8); // subscriptions unchanged

        selectFCDAItem(
          fcdaElement,
          'GOOSE_Publisher>>QB2_Disconnector>GOOSE1',
          'GOOSE_Publisher>>QB2_Disconnector>GOOSE1sDataSet>QB1_Disconnector/ CSWI 1.Pos q (ST)'
        );
        await element.updateComplete;

        expect(
          getSubscribedExtRefsCount(extRefElement, 'GOOSE_Subscriber')
        ).to.be.equal(9);

        const selectedExtRef = Array.from(
          (<List>(
            extRefElement.shadowRoot!.querySelector('filtered-list')!
          )).items.filter(item => item.attributes.getNamedItem('selected'))
        )[0];

        expect(selectedExtRef.value).to.equal(
          'GOOSE_Subscriber>>Earth_Switch> CILO 1>Pos;CSWI1/Pos/stVal[0]'
        ); // selection unchanged
      });

      it('an available ExtRef then a supervision instance is created', async () => {
        doc = await fetch('/test/testfiles/editors/LaterBindingGOOSE-LGOS.scd')
          .then(response => response.text())
          .then(str => new DOMParser().parseFromString(str, 'application/xml'));

        element = await fixture(
          html`<goose-subscriber-later-binding-plugin
            .doc="${doc}"
            ?subscriberview="${true}"
          ></goose-subscriber-later-binding-plugin>`
        );

        const fcdaElement = getFCDABindingList(element);
        const extRefElement = getExtrefLaterBindingListSubscriber(element);

        expect(
          getSubscribedExtRefsCount(extRefElement, 'GOOSE_Subscriber1')
        ).to.be.equal(6);

        selectExtRefItem(
          extRefElement,
          'GOOSE_Subscriber1>>Earth_Switch> CILO 1>Pos;CSWI1/Pos/stVal[0]'
        );
        await element.updateComplete;

        selectFCDAItem(
          fcdaElement,
          'GOOSE_Publisher2>>QB2_Disconnector>GOOSE1',
          'GOOSE_Publisher2>>QB2_Disconnector>GOOSE1sDataSet>QB1_Disconnector/ CSWI 1.Pos stVal (ST)'
        );
        await element.updateComplete;

        expect(
          getSubscribedExtRefsCount(extRefElement, 'GOOSE_Subscriber1')
        ).to.be.equal(7);

        const supervisionInstance = element.doc.querySelector(
          'IED[name="GOOSE_Subscriber1"] LN[lnClass="LGOS"][inst="4"]'
        );
        expect(supervisionInstance).to.exist;
        expect(
          supervisionInstance?.previousElementSibling?.getAttribute('lnClass')
        ).to.equal('LGOS');
        expect(
          supervisionInstance?.previousElementSibling?.getAttribute('inst')
        ).to.equal('3');
      });

      describe('when unsubscribing', async () => {
        it('a subscribed ExtRef then the lists are changed', async () => {
          expect(
            getSubscribedExtRefsCount(extRefElement, 'GOOSE_Subscriber')
          ).to.be.equal(8); // subscriptions unchanged

          let itemCount = getFCDAItemCount(
            fcdaElement,
            'GOOSE_Publisher>>QB2_Disconnector>GOOSE2',
            'GOOSE_Publisher>>QB2_Disconnector>GOOSE2sDataSet>QB2_Disconnector/ CSWI 1.Pos q (ST)'
          );
          expect(itemCount).to.equal('2'); // item count

          selectExtRefItem(
            extRefElement,
            'GOOSE_Subscriber>>Earth_Switch> CSWI 1>Pos;CSWI1/Pos/q[0]'
          );
          await element.updateComplete;

          expect(
            getSubscribedExtRefsCount(extRefElement, 'GOOSE_Subscriber')
          ).to.be.equal(7); // subscriptions changed

          itemCount = getFCDAItemCount(
            fcdaElement,
            'GOOSE_Publisher>>QB2_Disconnector>GOOSE2',
            'GOOSE_Publisher>>QB2_Disconnector>GOOSE2sDataSet>QB2_Disconnector/ CSWI 1.Pos q (ST)'
          );
          expect(itemCount).to.equal('1'); // item count decreased
        });
      });

      it('Shows correct items disabled in the FCDA list', async () => {
        selectExtRefItem(
          extRefElement,
          'GOOSE_Subscriber>>Earth_Switch> CSWI 1>someRestrictedExtRef[0]'
        );
        await element.updateComplete;

        const listItems = fcdaElement!
          .shadowRoot!.querySelector('filtered-list')!
          .querySelectorAll('mwc-list-item');

        expect(listItems[1].disabled).to.equal(true);
        expect(listItems[3].disabled).to.equal(true);
        expect(listItems[4].disabled).to.equal(true);
        expect(listItems[5].disabled).to.equal(true);
      });

      it('can be selected to the publisher view', async () => {
        (<Icon>(
          extRefElement.shadowRoot!.querySelector('.switch-view')
        ))!.click();
        await new Promise(resolve => setTimeout(resolve, 300)); // await animation
        await element.requestUpdate();

        const extRefElementPublisher = getExtrefLaterBindingList(element);
        expect(extRefElementPublisher).shadowDom.to.equalSnapshot();
      });
    });
  });
});
