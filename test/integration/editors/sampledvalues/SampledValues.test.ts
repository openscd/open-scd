import { html, fixture, expect } from '@open-wc/testing';

import '../../../mock-wizard.js';

import SampledValues from '../../../../src/editors/SampledValues.js';
import { Editing } from '../../../../src/Editing.js';
import { Wizarding } from '../../../../src/Wizarding.js';

describe('Sampled Values Plugin', () => {
  customElements.define('smv-plugin', Wizarding(Editing(SampledValues)));
  let element: SampledValues;
  let doc: XMLDocument;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/valid2007B4ForSampledValues.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = await fixture(html`<smv-plugin .doc=${doc} ></smv-plugin>`);
  });

  describe('initially', () => {
    it('the Sampled Values list looks like the latest snapshot', async () => {
      await expect(element.shadowRoot?.querySelector('sampled-values-list')).shadowDom.to.equalSnapshot();
    });

    it('the IED list looks like the latest snapshot', async () => {
      await expect(element.shadowRoot?.querySelector('subscriber-ied-list-smv')).shadowDom.to.equalSnapshot();
    });
  });

  describe('when selecting a Sampled Values message', () => {
    beforeEach(async () => {
      const smvMsg = element.shadowRoot?.querySelector('sampled-values-list')
      ?.shadowRoot?.querySelectorAll('mwc-list-item')[1];

      (<HTMLElement>(smvMsg)).click();
      await element.updateComplete;
    });

    it('the list on the right will initially show the subscribed / partially subscribed / not subscribed IEDs', async () => {
      await expect(element.shadowRoot?.querySelector('subscriber-ied-list-smv')).shadowDom.to.equalSnapshot();
    });

    describe('and you subscribe a non-subscribed IED', () => {
      it('it looks like the latest snapshot', async () => {
        const ied = element.shadowRoot?.querySelector('subscriber-ied-list-smv')
          ?.shadowRoot?.querySelectorAll('ied-element-smv')[2].shadowRoot?.querySelector('mwc-list-item');

        (<HTMLElement>(ied)).click();
        await element.updateComplete;
        await expect(element.shadowRoot?.querySelector('subscriber-ied-list-smv')).shadowDom.to.equalSnapshot();
      });
    });

    describe('and you unsubscribe a subscribed IED', () => {
      it('it looks like the latest snapshot', async () => {
        const ied = element.shadowRoot?.querySelector('subscriber-ied-list-smv')
          ?.shadowRoot?.querySelectorAll('ied-element-smv')[0].shadowRoot?.querySelector('mwc-list-item');

        (<HTMLElement>(ied)).click();
        await element.updateComplete;
        await expect(element.shadowRoot?.querySelector('subscriber-ied-list-smv')).shadowDom.to.equalSnapshot();
      });
    });

    describe('and you subscribe a partially subscribed IED', () => {
      it('it looks like the latest snapshot', async () => {
        const ied = element.shadowRoot?.querySelector('subscriber-ied-list-smv')
          ?.shadowRoot?.querySelectorAll('ied-element-smv')[1].shadowRoot?.querySelector('mwc-list-item');

        (<HTMLElement>(ied)).click();
        await element.updateComplete;
        await expect(element.shadowRoot?.querySelector('subscriber-ied-list-smv')).shadowDom.to.equalSnapshot();
      });
    });
  });
});
