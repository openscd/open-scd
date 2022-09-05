import { expect, fixture, html } from '@open-wc/testing';

import '../../../../mock-wizard-editor.js';
import { MockWizardEditor } from '../../../../mock-wizard-editor.js';

import { WizardTextField } from '../../../../../src/wizard-textfield.js';

import '../../../../../src/editors/subscription/later-binding/fcda-later-binding-list.js';
import { FCDALaterBindingList } from '../../../../../src/editors/subscription/later-binding/fcda-later-binding-list.js';
import { SinonSpy, spy } from 'sinon';

describe('fcda-list', () => {
  let parent: MockWizardEditor;
  let element: FCDALaterBindingList;
  let doc: XMLDocument;

  let selectEvent: SinonSpy;

  beforeEach(async () => {
    selectEvent = spy();
    window.addEventListener('fcda-select', selectEvent);
  });

  describe('without a doc loaded', () => {
    beforeEach(async () => {
      parent = await fixture(html`
        <mock-wizard-editor>
          <fcda-later-binding-list></fcda-later-binding-list>
        </mock-wizard-editor>
      `);

      element = <FCDALaterBindingList>(
        parent.querySelector('fcda-later-binding-list')!
      );
      await element.requestUpdate();
    });

    it('no event is fired, because no property are changed', () => {
      expect(selectEvent).to.not.have.been.called;
    });

    it('looks like the latest snapshot', async () => {
      element = await fixture(
        html`<fcda-later-binding-list></fcda-later-binding-list>`
      );

      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('with a SampledValueControl doc loaded', () => {
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/editors/LaterBindingSMV2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = await fixture(html`
        <mock-wizard-editor>
          <fcda-later-binding-list
            .doc=${doc}
            controlTag="SampledValueControl"
          ></fcda-later-binding-list>
        </mock-wizard-editor>
      `);

      element = <FCDALaterBindingList>(
        parent.querySelector('fcda-later-binding-list')!
      );
      await element.requestUpdate();
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
      expect(nameField.value).to.be.equal('currentOnly');
    });

    it('event is fired, but properties are undefined', () => {
      expect(selectEvent).to.have.been.calledOnce;
      expect(selectEvent.args[0][0].detail.selectedSvcElement).to.be.undefined;
      expect(selectEvent.args[0][0].detail.selectedFcdaElement).to.be.undefined;
    });

    it('event is fired with selected elements', async () => {
      selectEvent.resetHistory();

      const listItem = Array.from(
        element.shadowRoot?.querySelectorAll(
          'mwc-list-item[class="subitem"]'
        ) ?? []
      ).filter(listItem => {
        const value = listItem.getAttribute('value') ?? '';
        return (
          value.includes('currentOnly') && value.includes('AmpSv instMag.i')
        );
      })[0];
      (<HTMLElement>listItem).click();
      await element.updateComplete;

      expect(selectEvent).to.have.been.called;
      expect(selectEvent.args[0][0].detail.svc).to.equal(
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
  });

  describe('with a GSEControl doc loaded', () => {
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/valid2007B4ForSubscription.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = await fixture(html`
        <mock-wizard-editor>
          <fcda-later-binding-list
            .doc=${doc}
            controlTag="GSEControl"
          ></fcda-later-binding-list>
        </mock-wizard-editor>
      `);

      element = <FCDALaterBindingList>(
        parent.querySelector('fcda-later-binding-list')!
      );
      await element.requestUpdate();
    });

    it('the GOOSE editor is opened', async () => {
      // Select the first list item that has an edit button, this should be an SVC Element.
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
      expect(nameField.value).to.be.equal('GCB');
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });
});
