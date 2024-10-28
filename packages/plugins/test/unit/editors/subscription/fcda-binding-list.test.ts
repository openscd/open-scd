import { expect, fixture, html } from '@open-wc/testing';

import '@openscd/open-scd/test/mock-open-scd.js';
import { MockOpenSCD } from '@openscd/open-scd/test/mock-open-scd.js';

import { WizardTextField } from '@openscd/open-scd/src/wizard-textfield.js';

import '../../../../src/editors/subscription/fcda-binding-list.js';
import { FcdaBindingList } from '../../../../src/editors/subscription/fcda-binding-list.js';

import { SinonSpy, spy } from 'sinon';
import { ListItem } from '@material/mwc-list/mwc-list-item.js';

describe('fcda-binding-list', () => {
  let parent: MockOpenSCD;
  let element: FcdaBindingList;
  let doc: XMLDocument;

  let selectEvent: SinonSpy;

  beforeEach(async () => {
    localStorage.clear();
    selectEvent = spy();
    window.addEventListener('fcda-select', selectEvent);
  });

  describe('without a doc loaded', () => {
    beforeEach(async () => {
      parent = await fixture(html`
        <mock-open-scd><fcda-binding-list></fcda-binding-list></mock-open-scd>
      `);

      element = parent.getActivePlugin();
      await parent.requestUpdate();
    });

    it('no event is fired, because no property are changed', () => {
      expect(selectEvent).to.not.have.been.called;
    });

    it('looks like the latest snapshot', async () => {
      element = await fixture(html`<fcda-binding-list></fcda-binding-list>`);

      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('with a SampledValueControl doc loaded', () => {
    beforeEach(async () => {
      localStorage.clear();
      doc = await fetch('/test/testfiles/editors/LaterBindingSMV2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = await fixture(html`
        <mock-open-scd
          ><fcda-binding-list
            .doc=${doc}
            controlTag="SampledValueControl"
            .includeLaterBinding="${true}"
          ></fcda-binding-list
        ></mock-open-scd>
      `);

      element = parent.getPlugin<FcdaBindingList>('fcda-binding-list')!;
      await parent.requestUpdate();
    });

    it('the SVC editor is opened', async () => {
      // Select the first list item that has an edit button, this should be an SVC Element.
      await (<HTMLElement>(
        element?.shadowRoot?.querySelector(
          'mwc-list-item > mwc-icon-button[icon="edit"]'
        )
      )).click();
      await parent.updateComplete;

      // Select the name input field, this should have the same value as the first SampledValueControl in the IED.
      const nameField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-textfield[label="name"]')
      );
      expect(nameField.value).to.be.equal('fullSmv');
    });

    it('event is fired, but properties are undefined', () => {
      expect(selectEvent).to.have.been.calledOnce;
      expect(selectEvent.args[0][0].detail.selectedSvcElement).to.be.undefined;
      expect(selectEvent.args[0][0].detail.selectedFcdaElement).to.be.undefined;
    });

    it('event is fired with selected elements', async () => {
      selectEvent.resetHistory();

      const listItem = Array.from(
        element.shadowRoot?.querySelectorAll('mwc-list-item.subitem') ?? []
      ).filter(listItem => {
        const value = listItem.getAttribute('value') ?? '';
        return (
          value.includes('currentOnly') && value.includes('AmpSv instMag.i')
        );
      })[0];
      (<HTMLElement>listItem).click();
      await element.updateComplete;

      expect(selectEvent).to.have.been.called;
      expect(selectEvent.args[0][0].detail.control).to.equal(
        doc.querySelector(
          'IED[name="SMV_Publisher"] LN0 > SampledValueControl[name="currentOnly"]'
        )
      );
      expect(selectEvent.args[0][0].detail.fcda).to.equal(
        doc.querySelector(
          'IED[name="SMV_Publisher"] LN0 > DataSet[name="currentOnlysDataSet"] > ' +
            'FCDA[ldInst="CurrentTransformer"][prefix="L1"][lnClass="TCTR"][lnInst="1"][doName="AmpSv"][daName="instMag.i"][fc="MX"]'
        )
      );
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });

    it('is initially unfiltered', async () => {
      const displayedElements = Array.from(
        element.shadowRoot!.querySelectorAll('mwc-list-item')
      ).filter(item => {
        const displayStyle = getComputedStyle(item).display;
        return displayStyle !== 'none' || displayStyle === undefined;
      });
      expect(displayedElements.length).to.equal(27);
    });

    it('allows filtering of only not subscribed control blocks', async () => {
      element.actionsMenuIcon.click();
      await element.updateComplete;
      (<ListItem>(
        element.actionsMenu!.querySelector('.filter-subscribed')
      ))!.click();
      await new Promise(resolve => setTimeout(resolve, 200)); // await animation
      await element.updateComplete;

      const fcdaList = element.shadowRoot?.querySelector('filtered-list');
      const displayedElements = Array.from(
        fcdaList!.querySelectorAll('mwc-list-item')!
      ).filter(item => {
        const displayStyle = getComputedStyle(item).display;
        return displayStyle !== 'none' || displayStyle === undefined;
      });
      expect(displayedElements.length).to.equal(24);
    });

    it('allows filtering of only subscribed control blocks', async () => {
      element.actionsMenuIcon.click();
      await element.updateComplete;
      (<ListItem>(
        element.actionsMenu!.querySelector('.filter-not-subscribed')
      ))!.click();
      await new Promise(resolve => setTimeout(resolve, 200)); // await animation
      await element.updateComplete;

      const fcdaList = element.shadowRoot?.querySelector('filtered-list');
      const displayedElements = Array.from(
        fcdaList!.querySelectorAll('mwc-list-item')!
      ).filter(item => {
        const displayStyle = getComputedStyle(item).display;
        return displayStyle !== 'none' || displayStyle === undefined;
      });
      expect(displayedElements.length).to.equal(5);
    });

    it('allows filtering out of all subscribed control blocks', async () => {
      element.actionsMenuIcon.click();
      await element.updateComplete;
      (<ListItem>(
        element.actionsMenu!.querySelector('.filter-subscribed')
      ))!.click();
      await new Promise(resolve => setTimeout(resolve, 300)); // await animation
      await element.updateComplete;

      element.actionsMenuIcon.click();
      await element.updateComplete;
      (<ListItem>(
        element.actionsMenu!.querySelector('.filter-not-subscribed')
      ))!.click();
      await new Promise(resolve => setTimeout(resolve, 300)); // await animation
      await element.updateComplete;

      const fcdaList = element.shadowRoot?.querySelector('filtered-list');
      const displayedElements = Array.from(
        fcdaList!.querySelectorAll('mwc-list-item')!
      ).filter(item => {
        const displayStyle = getComputedStyle(item).display;
        return displayStyle !== 'none' || displayStyle === undefined;
      });
      expect(displayedElements.length).to.equal(0);
    });
  });

  describe('with a GSEControl doc loaded', () => {
    beforeEach(async () => {
      localStorage.clear();
      doc = await fetch('/test/testfiles/editors/LaterBindingGOOSE2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = await fixture(html`
        <mock-open-scd
          ><fcda-binding-list
            .doc=${doc}
            controlTag="GSEControl"
            .includeLaterBinding="${true}"
          ></fcda-binding-list
        ></mock-open-scd>
      `);

      element = parent.getPlugin<FcdaBindingList>('fcda-binding-list')!;
      await parent.updateComplete;
    });

    it('the GOOSE editor is opened', async () => {
      // Select the first list item that has an edit button, this should be an GOOSE Element.
      await (<HTMLElement>(
        element?.shadowRoot?.querySelector(
          'mwc-list-item > mwc-icon-button[icon="edit"]'
        )
      )).click();
      await parent.updateComplete;

      // Select the name input field, this should have the same value as the first GSEControl in the IED.
      const nameField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-textfield[label="name"]')
      );
      expect(nameField.value).to.be.equal('GOOSE2');
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });

    it('is initially unfiltered', async () => {
      const displayedElements = Array.from(
        element.shadowRoot!.querySelectorAll('mwc-list-item')
      ).filter(item => {
        const displayStyle = getComputedStyle(item).display;
        return displayStyle !== 'none' || displayStyle === undefined;
      });
      expect(displayedElements.length).to.equal(9);
    });

    it('allows filtering of only not subscribed control blocks', async () => {
      element.actionsMenuIcon.click();
      await element.updateComplete;
      (<ListItem>(
        element.actionsMenu!.querySelector('.filter-subscribed')
      ))!.click();
      await new Promise(resolve => setTimeout(resolve, 300)); // await animation
      await element.updateComplete;

      const fcdaList = element.shadowRoot?.querySelector('filtered-list');
      const displayedElements = Array.from(
        fcdaList!.querySelectorAll('mwc-list-item')!
      ).filter(item => {
        const displayStyle = getComputedStyle(item).display;
        return displayStyle !== 'none' || displayStyle === undefined;
      });
      expect(displayedElements.length).to.equal(3);
    });

    it('allows filtering of only subscribed control blocks', async () => {
      element.actionsMenuIcon.click();
      await element.updateComplete;
      (<ListItem>(
        element.actionsMenu!.querySelector('.filter-not-subscribed')
      ))!.click();
      await new Promise(resolve => setTimeout(resolve, 300)); // await animation
      await element.updateComplete;

      const fcdaList = element.shadowRoot?.querySelector('filtered-list');
      const displayedElements = Array.from(
        fcdaList!.querySelectorAll('mwc-list-item')!
      ).filter(item => {
        const displayStyle = getComputedStyle(item).display;
        return displayStyle !== 'none' || displayStyle === undefined;
      });
      expect(displayedElements.length).to.equal(6);
    });

    it('allows filtering out of all subscribed control blocks', async () => {
      element.actionsMenuIcon.click();
      await element.updateComplete;
      (<ListItem>(
        element.actionsMenu!.querySelector('.filter-subscribed')
      ))!.click();
      await new Promise(resolve => setTimeout(resolve, 300)); // await animation
      await element.updateComplete;

      element.actionsMenuIcon.click();
      await element.updateComplete;
      (<ListItem>(
        element.actionsMenu!.querySelector('.filter-not-subscribed')
      ))!.click();
      await new Promise(resolve => setTimeout(resolve, 300)); // await animation
      await element.updateComplete;

      const fcdaList = element.shadowRoot?.querySelector('filtered-list');
      const displayedElements = Array.from(
        fcdaList!.querySelectorAll('mwc-list-item')!
      ).filter(item => {
        const displayStyle = getComputedStyle(item).display;
        return displayStyle !== 'none' || displayStyle === undefined;
      });
      expect(displayedElements.length).to.equal(0);
    });
  });
});
