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
    doc = await fetch('/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = await fixture(html`<subscription-plugin .doc=${doc} ></subscription-plugin>`);
  });

  describe('initially', () => {
    it('the GOOSE list looks like the latest snapshot', async () => {
      await expect(element.shadowRoot?.querySelector('publisher-goose-list')).shadowDom.to.equalSnapshot();
    });

    it('the IED list looks like the latest snapshot', async () => {
      await expect(element.shadowRoot?.querySelector('subscriber-ied-list')).shadowDom.to.equalSnapshot();
    });
  });

  describe('when selecting a GOOSE message', () => {
    it('the list on the right will initially show the subscribed / partially subscribed / not subscribed IEDs', async () => {
      const gseMsg = element.shadowRoot?.querySelector('publisher-goose-list')
        ?.shadowRoot?.querySelector('goose-message')?.shadowRoot?.querySelector('mwc-list-item');

      (<HTMLElement>(gseMsg)).click();
      await element.updateComplete;
      expect(element.shadowRoot?.querySelector('subscriber-ied-list')).shadowDom.to.equalSnapshot();
    });
  });
});
