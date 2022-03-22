import { html, fixture, expect } from '@open-wc/testing';

import '../../../mock-wizard.js';

import Subscription from '../../../../src/editors/Subscription.js';
import { Editing } from '../../../../src/Editing.js';
import { Wizarding } from '../../../../src/Wizarding.js';

describe('Subscription Plugin', () => {
  customElements.define('subscription-plugin', Wizarding(Editing(Subscription)));
  let element: Subscription;
  let doc: XMLDocument;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/valid2007B4ForSubscription.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = await fixture(html`<subscription-plugin .doc=${doc} ></subscription-plugin>`);
  });

  describe('initially', () => {
    it('the GOOSE list looks like the latest snapshot', async () => {
      await expect(element.shadowRoot?.querySelector('publisher-goose-list')).shadowDom.to.equalSnapshot();
    });

    it('the IED list looks like the latest snapshot', async () => {
      await expect(element.shadowRoot?.querySelector('subscriber-ied-list-goose')).shadowDom.to.equalSnapshot();
    });
  });

  describe('when selecting a GOOSE message', () => {
    beforeEach(async () => {
      const gseMsg = element.shadowRoot?.querySelector('publisher-goose-list')
        ?.shadowRoot?.querySelectorAll('goose-message')[2].shadowRoot?.querySelector('mwc-list-item');

      (<HTMLElement>(gseMsg)).click();
    });

    it('the list on the right will initially show the subscribed / partially subscribed / not subscribed IEDs', async () => {
      await element.updateComplete;
      expect(element.shadowRoot?.querySelector('subscriber-ied-list-goose')).shadowDom.to.equalSnapshot();
    });

    describe('and you subscribe a non-subscribed IED', () => {
      it('it looks like the latest snapshot', async () => {
        const ied = element.shadowRoot?.querySelector('subscriber-ied-list-goose')
          ?.shadowRoot?.querySelectorAll('ied-element-goose')[2].shadowRoot?.querySelector('mwc-list-item');

        (<HTMLElement>(ied)).click();
        await element.updateComplete;
        expect(element.shadowRoot?.querySelector('subscriber-ied-list-goose')).shadowDom.to.equalSnapshot();
      });
    });

    describe('and you unsubscribe a subscribed IED', () => {
      it('it looks like the latest snapshot', async () => {
        const ied = element.shadowRoot?.querySelector('subscriber-ied-list-goose')
          ?.shadowRoot?.querySelectorAll('ied-element-goose')[0].shadowRoot?.querySelector('mwc-list-item');

        (<HTMLElement>(ied)).click();
        await element.updateComplete;
        expect(element.shadowRoot?.querySelector('subscriber-ied-list-goose')).shadowDom.to.equalSnapshot();
      });
    });

    describe('and you subscribe a partially subscribed IED', () => {
      it('it looks like the latest snapshot', async () => {
        const ied = element.shadowRoot?.querySelector('subscriber-ied-list-goose')
          ?.shadowRoot?.querySelectorAll('ied-element-goose')[1].shadowRoot?.querySelector('mwc-list-item');

        (<HTMLElement>(ied)).click();
        await element.updateComplete;
        expect(element.shadowRoot?.querySelector('subscriber-ied-list-goose')).shadowDom.to.equalSnapshot();
      });
    });
  });
});
