import { expect, fixture, html } from '@open-wc/testing';

import '../../../../../src/editors/subscription/later-binding/ext-ref-later-binding-list-subscriber.js';

import { ExtRefLaterBindingListSubscriber } from '../../../../../src/editors/subscription/later-binding/ext-ref-later-binding-list-subscriber.js';

import { ListItem } from '@material/mwc-list/mwc-list-item.js';

describe('extref-later-binding-list-subscriber', () => {
  let doc: XMLDocument;
  let parent: HTMLElement;
  let element: ExtRefLaterBindingListSubscriber;

  describe('for Sampled Value Control', () => {
    beforeEach(async () => {
      localStorage.clear();
      doc = await fetch('/test/testfiles/editors/LaterBindingSMV2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      parent = await fixture(
        html`<div class="container">
          <extref-later-binding-list-subscriber
            .doc=${doc}
            controlTag="SampledValueControl"
          ></extref-later-binding-list-subscriber>
        </div>`
      );
      element = <ExtRefLaterBindingListSubscriber>(
        parent.querySelector('extref-later-binding-list-subscriber')
      );
      await element.updateComplete;
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });

    describe('the filter button', () => {
      it('is initially unfiltered', async () => {
        const displayedElements = Array.from(
          element.shadowRoot!.querySelectorAll('mwc-list-item')
        ).filter(item => {
          const displayStyle = getComputedStyle(item).display;
          return displayStyle !== 'none' || displayStyle === undefined;
        });
        expect(displayedElements.length).to.equal(15);
      });

      it('allows showing only bound ExtRefs', async () => {
        element.filterMenuIcon.click();
        await element.updateComplete;
        (<ListItem>(
          element.filterMenu!.querySelector('.show-not-bound')
        ))!.click();
        await new Promise(resolve => setTimeout(resolve, 200)); // await animation
        await element.updateComplete;

        const extRefList = element.shadowRoot?.querySelector('filtered-list');
        const displayedElements = Array.from(
          extRefList!.querySelectorAll('mwc-list-item')!
        ).filter(item => {
          const displayStyle = getComputedStyle(item).display;
          return displayStyle !== 'none' || displayStyle === undefined;
        });
        expect(displayedElements.length).to.equal(6);
      });

      it('allows showing only not bound ExtRefs', async () => {
        element.filterMenuIcon.click();
        await element.updateComplete;
        (<ListItem>element.filterMenu!.querySelector('.show-bound'))!.click();
        await new Promise(resolve => setTimeout(resolve, 300)); // await animation
        await element.updateComplete;

        const extRefList = element.shadowRoot?.querySelector('filtered-list');
        const displayedElements = Array.from(
          extRefList!.querySelectorAll('mwc-list-item')!
        ).filter(item => {
          const displayStyle = getComputedStyle(item).display;
          return displayStyle !== 'none' || displayStyle === undefined;
        });
        expect(displayedElements.length).to.equal(10);
      });

      it('allows filtering out of all ExtRefs', async () => {
        element.filterMenuIcon.click();
        await element.updateComplete;
        (<ListItem>element.filterMenu!.querySelector('.show-bound'))!.click();
        await new Promise(resolve => setTimeout(resolve, 200)); // await animation
        await element.updateComplete;

        element.filterMenuIcon.click();
        await element.updateComplete;
        (<ListItem>(
          element.filterMenu!.querySelector('.show-not-bound')
        ))!.click();
        await new Promise(resolve => setTimeout(resolve, 200)); // await animation
        await element.updateComplete;

        const extRefList = element.shadowRoot?.querySelector('filtered-list');
        const displayedElements = Array.from(
          extRefList!.querySelectorAll('mwc-list-item')!
        ).filter(item => {
          const displayStyle = getComputedStyle(item).display;
          return displayStyle !== 'none' || displayStyle === undefined;
        });
        expect(displayedElements.length).to.equal(0);
      });
    });
  });

  describe('for GOOSE Control', () => {
    beforeEach(async () => {
      localStorage.clear();
      doc = await fetch('/test/testfiles/editors/LaterBindingGOOSE2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = await fixture(
        html`<div class="container">
          <extref-later-binding-list-subscriber
            .doc=${doc}
            controlTag="GSEControl"
          ></extref-later-binding-list-subscriber>
        </div>`
      );
      element = <ExtRefLaterBindingListSubscriber>(
        parent.querySelector('extref-later-binding-list-subscriber')
      );
      await element.updateComplete;
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });

    describe('the filter button', () => {
      it('is initially unfiltered', async () => {
        const displayedElements = Array.from(
          element.shadowRoot!.querySelectorAll('mwc-list-item')
        ).filter(item => {
          const displayStyle = getComputedStyle(item).display;
          return displayStyle !== 'none' || displayStyle === undefined;
        });
        expect(displayedElements.length).to.equal(12);
      });

      it('allows showing only bound ExtRefs', async () => {
        element.filterMenuIcon.click();
        await element.updateComplete;
        (<ListItem>(
          element.filterMenu!.querySelector('.show-not-bound')
        ))!.click();
        await new Promise(resolve => setTimeout(resolve, 200)); // await animation
        await element.updateComplete;

        const extRefList = element.shadowRoot?.querySelector('filtered-list');
        const displayedElements = Array.from(
          extRefList!.querySelectorAll('mwc-list-item')!
        ).filter(item => {
          const displayStyle = getComputedStyle(item).display;
          return displayStyle !== 'none' || displayStyle === undefined;
        });
        expect(displayedElements.length).to.equal(9);
      });

      it('allows showing only not bound ExtRefs', async () => {
        element.filterMenuIcon.click();
        await element.updateComplete;
        (<ListItem>element.filterMenu!.querySelector('.show-bound'))!.click();
        await new Promise(resolve => setTimeout(resolve, 200)); // await animation
        await element.updateComplete;

        const extRefList = element.shadowRoot?.querySelector('filtered-list');
        const displayedElements = Array.from(
          extRefList!.querySelectorAll('mwc-list-item')!
        ).filter(item => {
          const displayStyle = getComputedStyle(item).display;
          return displayStyle !== 'none' || displayStyle === undefined;
        });
        expect(displayedElements.length).to.equal(4);
      });

      it('allows filtering out of all ExtRefs', async () => {
        element.filterMenuIcon.click();
        await element.updateComplete;
        (<ListItem>element.filterMenu!.querySelector('.show-bound'))!.click();
        await new Promise(resolve => setTimeout(resolve, 200)); // await animation
        await element.updateComplete;

        element.filterMenuIcon.click();
        await element.updateComplete;
        (<ListItem>(
          element.filterMenu!.querySelector('.show-not-bound')
        ))!.click();
        await new Promise(resolve => setTimeout(resolve, 200)); // await animation
        await element.updateComplete;

        const extRefList = element.shadowRoot?.querySelector('filtered-list');
        const displayedElements = Array.from(
          extRefList!.querySelectorAll('mwc-list-item')!
        ).filter(item => {
          const displayStyle = getComputedStyle(item).display;
          return displayStyle !== 'none' || displayStyle === undefined;
        });
        expect(displayedElements.length).to.equal(0);
      });
    });
  });
});
