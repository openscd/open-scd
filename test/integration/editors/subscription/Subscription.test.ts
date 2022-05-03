import { html, fixture, expect } from '@open-wc/testing';

import '../../../mock-wizard.js';

import Subscription from '../../../../src/editors/Subscription.js';
import { Editing } from '../../../../src/Editing.js';
import { Wizarding } from '../../../../src/Wizarding.js';

describe('Subscription Plugin', () => {
  customElements.define(
    'subscription-plugin',
    Wizarding(Editing(Subscription))
  );
  let element: Subscription;
  let doc: XMLDocument;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/valid2007B4ForSubscription.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = await fixture(
      html`<subscription-plugin .doc=${doc}></subscription-plugin>`
    );
  });

  describe('in GOOSE Publisher view', () => {
    describe('initially', () => {
      it('the plugin looks like the latest snapshot', async () => {
        await expect(element).shadowDom.to.equalSnapshot();
      });

      it('the GOOSE list looks like the latest snapshot', async () => {
        await expect(
          element.shadowRoot?.querySelector('goose-publisher-list')
        ).shadowDom.to.equalSnapshot();
      });

      it('the IED list looks like the latest snapshot', async () => {
        await expect(
          element.shadowRoot?.querySelector('subscriber-list')
        ).shadowDom.to.equalSnapshot();
      });
    });

    describe('when selecting a GOOSE message', () => {
      let goose: HTMLElement;

      beforeEach(async () => {
        goose = Array.from(
          element.shadowRoot
            ?.querySelector('goose-publisher-list')
            ?.shadowRoot?.querySelectorAll('mwc-list-item') ?? []
        ).filter(item => !item.noninteractive)[2];

        (<HTMLElement>goose).click();
        await element.updateComplete;
      });

      it('the list on the right will initially show the subscribed / partially subscribed / not subscribed IEDs', async () => {
        await expect(
          element.shadowRoot?.querySelector('subscriber-list')
        ).shadowDom.to.equalSnapshot();
      });

      describe('and subscribing an unsubscribed IED', () => {
        it('initially no ExtRefs are available in the subscriber IED', async () => {
          const extRefs = doc.querySelectorAll('IED[name="IED3"] > AccessPoint > Server > LDevice > LN0 > Inputs > ExtRef[iedName="IED2"], ' +
            'IED[name="IED3"] > AccessPoint > Server > LDevice > LN > Inputs > ExtRef[iedName="IED2"]');
          expect(extRefs.length).to.eql(0);
        });

        it('it looks like the latest snapshot', async () => {
          const ied = Array.from(
            element.shadowRoot
              ?.querySelector('subscriber-list')
              ?.shadowRoot?.querySelectorAll('mwc-list-item') ?? []
          ).filter(item => !item.noninteractive)[2];

          (<HTMLElement>ied).click();
          await element.updateComplete;

          // Re select the GOOSE
          (<HTMLElement>goose).click();
          await element.updateComplete;

          await expect(
            element.shadowRoot?.querySelector('subscriber-list')
          ).shadowDom.to.equalSnapshot();
        });

        it('adds the required ExtRefs to the subscriber IED', async () => {
          const ied = Array.from(
            element.shadowRoot
              ?.querySelector('subscriber-list')
              ?.shadowRoot?.querySelectorAll('mwc-list-item') ?? []
          ).filter(item => !item.noninteractive)[2];

          (<HTMLElement>ied).click();
          await element.updateComplete;

          const extRefs = doc.querySelectorAll('IED[name="IED3"] > AccessPoint > Server > LDevice > LN0 > Inputs > ExtRef[iedName="IED2"], ' +
            'IED[name="IED3"] > AccessPoint > Server > LDevice > LN > Inputs > ExtRef[iedName="IED2"]');
          expect(extRefs.length).to.eql(3);
        });
      });

      describe('and unsubscribing a subscribed IED', () => {
        it('initially all the ExtRefs are available in the subscriber IED', async () => {
          const extRefs = doc.querySelectorAll('IED[name="IED1"] > AccessPoint > Server > LDevice > LN0 > Inputs > ExtRef[iedName="IED2"], ' +
            'IED[name="IED1"] > AccessPoint > Server > LDevice > LN > Inputs > ExtRef[iedName="IED2"]');
          expect(extRefs.length).to.eql(3);
        });

        it('it looks like the latest snapshot', async () => {
          const ied = Array.from(
            element.shadowRoot
              ?.querySelector('subscriber-list')
              ?.shadowRoot?.querySelectorAll('mwc-list-item') ?? []
          ).filter(item => !item.noninteractive)[0];

          (<HTMLElement>ied).click();
          await element.updateComplete;

          // Re select the GOOSE
          (<HTMLElement>goose).click();
          await element.updateComplete;

          await expect(
            element.shadowRoot?.querySelector('subscriber-list')
          ).shadowDom.to.equalSnapshot();
        });

        it('removes the required ExtRefs from the subscriber IED', async () => {
          const ied = Array.from(
            element.shadowRoot
              ?.querySelector('subscriber-list')
              ?.shadowRoot?.querySelectorAll('mwc-list-item') ?? []
          ).filter(item => !item.noninteractive)[0];

          (<HTMLElement>ied).click();
          await element.updateComplete;

          const extRefs = doc.querySelectorAll('IED[name="IED1"] > AccessPoint > Server > LDevice > LN0 > Inputs > ExtRef[iedName="IED2"], ' +
            'IED[name="IED1"] > AccessPoint > Server > LDevice > LN > Inputs > ExtRef[iedName="IED2"]');
          expect(extRefs.length).to.eql(0);
        });
      });

      describe('and subscribing a partially subscribed IED', () => {
        it('initially only 2 ExtRefs are available in the subscriber IED', async () => {
          const extRefs = doc.querySelectorAll('IED[name="IED4"] > AccessPoint > Server > LDevice > LN0 > Inputs > ExtRef[iedName="IED2"],' +
            'IED[name="IED4"] > AccessPoint > Server > LDevice > LN > Inputs > ExtRef[iedName="IED2"]');
          expect(extRefs.length).to.eql(2);
        });

        it('it looks like the latest snapshot', async () => {
          const ied = Array.from(
            element.shadowRoot
              ?.querySelector('subscriber-list')
              ?.shadowRoot?.querySelectorAll('mwc-list-item') ?? []
          ).filter(item => !item.noninteractive)[1];

          (<HTMLElement>ied).click();
          await element.updateComplete;

          // Re select the GOOSE
          (<HTMLElement>goose).click();
          await element.updateComplete;

          await expect(
            element.shadowRoot?.querySelector('subscriber-list')
          ).shadowDom.to.equalSnapshot();
        });

        it('adds the required ExtRefs to the subscriber IED', async () => {
          const ied = Array.from(
            element.shadowRoot
              ?.querySelector('subscriber-list')
              ?.shadowRoot?.querySelectorAll('mwc-list-item') ?? []
          ).filter(item => !item.noninteractive)[1];

          (<HTMLElement>ied).click();
          await element.updateComplete;

          const extRefs = doc.querySelectorAll('IED[name="IED4"] > AccessPoint > Server > LDevice > LN0 > Inputs > ExtRef[iedName="IED2"],' +
            'IED[name="IED4"] > AccessPoint > Server > LDevice > LN > Inputs > ExtRef[iedName="IED2"]');
          expect(extRefs.length).to.eql(5);
        });
      });
    });
  });

  describe('in GOOSE Subscriber view', () => {
    beforeEach(async () => {
      const radioButton = element.shadowRoot?.querySelector('#byIedRadio');
      (<HTMLElement>radioButton).click();
      await element.updateComplete;
    });
    
    describe('initially', () => {
      it('the plugin looks like the latest snapshot', async () => {
        await expect(element).shadowDom.to.equalSnapshot();
      });
    });

    describe('when selecting an IED', () => {
      let ied: HTMLElement;

      beforeEach(async () => {
        // Selecting one of the IEDs
        ied = Array.from(
          element.shadowRoot
            ?.querySelector('goose-subscriber-list')
            ?.shadowRoot?.querySelectorAll('mwc-list-item') ?? []
        ).filter(item => !item.noninteractive)[1];

        (<HTMLElement>ied).click();
        await element.updateComplete;
      });

      it('the list on the right will initially show the subscribed / partially subscribed / not subscribed IEDs', async () => {
        await expect(
          element.shadowRoot?.querySelector('subscriber-list')
        ).shadowDom.to.equalSnapshot();
      });

      describe('and subscribing a unsubscribed GOOSE message', () => {
        it('initially no ExtRefs are available in the subscriber IED', async () => {
          const extRefs = doc.querySelectorAll('IED[name="IED2"] > AccessPoint > Server > LDevice > LN0 > Inputs > ExtRef[iedName="IED4"], ' +
            'IED[name="IED2"] > AccessPoint > Server > LDevice > LN > Inputs > ExtRef[iedName="IED4"]');
          expect(extRefs.length).to.eql(0);
        });

        it('it looks like the latest snapshot', async () => {
          const goose = Array.from(
            element.shadowRoot
              ?.querySelector('subscriber-list')
              ?.shadowRoot?.querySelectorAll('mwc-list-item') ?? []
          ).filter(item => !item.noninteractive)[1];

          (<HTMLElement>goose).click();
          await element.updateComplete;

          // Re select the IED
          (<HTMLElement>ied).click();
          await element.updateComplete;

          await expect(
            element.shadowRoot?.querySelector('subscriber-list')
          ).shadowDom.to.equalSnapshot();
        });

        it('adds the required ExtRefs to the subscriber IED', async () => {
          const goose = Array.from(
            element.shadowRoot
              ?.querySelector('subscriber-list')
              ?.shadowRoot?.querySelectorAll('mwc-list-item') ?? []
          ).filter(item => !item.noninteractive)[1];

          (<HTMLElement>goose).click();
          await element.updateComplete;

          const extRefs = doc.querySelectorAll('IED[name="IED2"] > AccessPoint > Server > LDevice > LN0 > Inputs > ExtRef[iedName="IED4"], ' +
            'IED[name="IED2"] > AccessPoint > Server > LDevice > LN > Inputs > ExtRef[iedName="IED4"]');
          expect(extRefs.length).to.eql(5);
        });
      });

      describe('and unsubscribing a subscribed GOOSE message', () => {
        beforeEach(async () => {
          // Subscribing a GOOSE message
          const goose = Array.from(
            element.shadowRoot
              ?.querySelector('subscriber-list')
              ?.shadowRoot?.querySelectorAll('mwc-list-item') ?? []
          ).filter(item => !item.noninteractive)[1];

          (<HTMLElement>goose).click();
          await element.updateComplete;

        });
        it('initially all ExtRefs are available in the subscriber IED', async () => {
          const extRefs = doc.querySelectorAll('IED[name="IED2"] > AccessPoint > Server > LDevice > LN0 > Inputs > ExtRef[iedName="IED4"], ' +
            'IED[name="IED2"] > AccessPoint > Server > LDevice > LN > Inputs > ExtRef[iedName="IED4"]');
          expect(extRefs.length).to.eql(5);
        });

        it('it looks like the latest snapshot', async () => {
          // Re select the IED
          (<HTMLElement>ied).click();
          await element.updateComplete;

          const goose = Array.from(
            element.shadowRoot
              ?.querySelector('subscriber-list')
              ?.shadowRoot?.querySelectorAll('mwc-list-item') ?? []
          ).filter(item => !item.noninteractive)[0];

          (<HTMLElement>goose).click();
          await element.updateComplete;

          // Re select the IED
          (<HTMLElement>ied).click();
          await element.updateComplete;

          await expect(
            element.shadowRoot?.querySelector('subscriber-list')
          ).shadowDom.to.equalSnapshot();
        });

        it('removes the required ExtRefs to the subscriber IED', async () => {
          // Re select the IED
          (<HTMLElement>ied).click();
          await element.updateComplete;

          const goose = Array.from(
            element.shadowRoot
              ?.querySelector('subscriber-list')
              ?.shadowRoot?.querySelectorAll('mwc-list-item') ?? []
          ).filter(item => !item.noninteractive)[0];

          (<HTMLElement>goose).click();
          await element.updateComplete;

          const extRefs = doc.querySelectorAll('IED[name="IED2"] > AccessPoint > Server > LDevice > LN0 > Inputs > ExtRef[iedName="IED4"], ' +
            'IED[name="IED2"] > AccessPoint > Server > LDevice > LN > Inputs > ExtRef[iedName="IED4"]');
          expect(extRefs.length).to.eql(0);
        });
      });

      describe('and subscribing a partially subscribed GOOSE message', () => {
        it('initially some ExtRefs are available in the subscriber IED', async () => {
          const extRefs = doc.querySelectorAll('IED[name="IED2"] > AccessPoint > Server > LDevice > LN0 > Inputs > ExtRef[iedName="IED1"], ' +
            'IED[name="IED2"] > AccessPoint > Server > LDevice > LN > Inputs > ExtRef[iedName="IED1"]');
          expect(extRefs.length).to.eql(4);
        });

        it('it looks like the latest snapshot', async () => {
          const goose = Array.from(
            element.shadowRoot
              ?.querySelector('subscriber-list')
              ?.shadowRoot?.querySelectorAll('mwc-list-item') ?? []
          ).filter(item => !item.noninteractive)[0];

          (<HTMLElement>goose).click();
          await element.updateComplete;

          // Re select the IED
          (<HTMLElement>ied).click();
          await element.updateComplete;

          await expect(
            element.shadowRoot?.querySelector('subscriber-list')
          ).shadowDom.to.equalSnapshot();
        });

        it('adds the required ExtRefs to the subscriber IED', async () => {
          const goose = Array.from(
            element.shadowRoot
              ?.querySelector('subscriber-list')
              ?.shadowRoot?.querySelectorAll('mwc-list-item') ?? []
          ).filter(item => !item.noninteractive)[0];

          (<HTMLElement>goose).click();
          await element.updateComplete;

          const extRefs = doc.querySelectorAll('IED[name="IED2"] > AccessPoint > Server > LDevice > LN0 > Inputs > ExtRef[iedName="IED1"], ' +
            'IED[name="IED2"] > AccessPoint > Server > LDevice > LN > Inputs > ExtRef[iedName="IED1"]');
          expect(extRefs.length).to.eql(9);
        });
      });
    });
  });
});
