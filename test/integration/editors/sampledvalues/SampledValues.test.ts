import { html, fixture, expect } from '@open-wc/testing';

import '../../../mock-wizard.js';

import SampledValues from '../../../../src/editors/SampledValues.js';
import { Editing } from '../../../../src/Editing.js';
import { Wizarding } from '../../../../src/Wizarding.js';
import { ListItem } from '@material/mwc-list/mwc-list-item.js';

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

  describe('in Sampled Values Publisher view', () => {
    describe('initially', () => {
      it('the plugin looks like the latest snapshot', async () => {
        await expect(
          element
        ).shadowDom.to.equalSnapshot();
      });
      
      it('the Sampled Values list looks like the latest snapshot', async () => {
        await expect(
          element.shadowRoot?.querySelector('smv-list')
        ).shadowDom.to.equalSnapshot();
      });
  
      it('the IED list looks like the latest snapshot', async () => {
        await expect(
          getSubscriberList()
        ).shadowDom.to.equalSnapshot();
      });
    });
  
    describe('when selecting a Sampled Values message', () => {
      beforeEach(async () => {
        const smvMsg = element.shadowRoot?.querySelector('smv-list')
        ?.shadowRoot?.querySelectorAll('mwc-list-item')[3];
  
        (<HTMLElement>(smvMsg)).click();
        await element.updateComplete;
      });
  
      it('the list on the right will initially show the subscribed / partially subscribed / not subscribed IEDs', async () => {
        await expect(
          getSubscriberList()
        ).shadowDom.to.equalSnapshot();
      });
  
      describe('and you subscribe a non-subscribed IED', () => {
        it('it looks like the latest snapshot', async () => {
          (<HTMLElement>(
            getItemFromSubscriberList('IED2')
          )).click();
          await element.updateComplete;

          await expect(
            getSubscriberList()
          ).shadowDom.to.equalSnapshot();
        });
      });
  
      describe('and you unsubscribe a subscribed IED', () => {
        it('it looks like the latest snapshot', async () => {
          (<HTMLElement>(
            getItemFromSubscriberList('IED1')
          )).click();
          await element.updateComplete;

          await expect(
            getSubscriberList()
          ).shadowDom.to.equalSnapshot();
        });
      });
  
      describe('and you subscribe a partially subscribed IED', () => {
        it('it looks like the latest snapshot', async () => {
          (<HTMLElement>(
            getItemFromSubscriberList('IED4')
          )).click();
          await element.updateComplete;

          await expect(
            getSubscriberList()
          ).shadowDom.to.equalSnapshot();
        });
      });
    });
  });

  function getSubscriberList() {
    return element.shadowRoot?.querySelector('subscriber-list-smv');
  }

  function getItemFromSubscriberList(textInListItem: string): ListItem | undefined {
    return Array.from(
      getSubscriberList()!.shadowRoot?.querySelectorAll('mwc-list-item') ?? []
    ).filter(listItem =>
      listItem.innerHTML.includes(textInListItem)
    )[0] ?? undefined;
  }
});
