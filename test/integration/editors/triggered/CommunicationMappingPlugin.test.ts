import { expect, fixture, html } from '@open-wc/testing';

import CommunicationMappingPlugin from '../../../../src/triggered/CommunicationMapping.js';
import { List } from '@material/mwc-list';
import { MockWizardEditor } from '../../../mock-wizard-editor.js';

describe('CommunicationMappingPlugin', () => {
  let doc: Document;
  customElements.define(
    'communication-mapping-plugin',
    CommunicationMappingPlugin
  );
  let parent: MockWizardEditor;
  let element: CommunicationMappingPlugin;

  beforeEach(async () => {
    parent = await fixture(
      html`<mock-wizard-editor
        ><communication-mapping-plugin></communication-mapping-plugin
      ></mock-wizard-editor>`
    );

    element = <CommunicationMappingPlugin>(
      parent.querySelector('communication-mapping-plugin')!
    );

    doc = await fetch('public/xml/testfiles/comm-map.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    element.doc = doc;
    await element.updateComplete;
  });

  describe('communication mapping wizard', () => {
    beforeEach(async () => {
      await element.trigger();
      await parent.updateComplete;
    });

    it('opens the communication mapping wizard on trigger', async () => {
      expect(parent.wizardUI.dialogs.length).to.equal(1);
    }); /* 

    it('closes on secondary action', async () => {
      (<HTMLElement>(
        parent.wizardUI.dialog!.querySelector(
          'mwc-button[slot="secondaryAction"]'
        )
      )).click();
      await parent.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      expect(parent.wizardUI.dialogs.length).to.equal(0);
    }); */

    it('groups connections to unique pair of source ied, sink ied and control block', () => {
      expect(
        parent.wizardUI.dialog?.querySelectorAll('mwc-list-item').length
      ).to.equal(4);
    });

    it('indicates the control block type with mwc-list graphic slot', () => {
      expect(
        parent.wizardUI.dialog!.querySelectorAll('mwc-list-item > mwc-icon')
          .length
      ).to.equal(4);
    });

    it('show the source ied, sink ied and control block', () => {
      expect(
        parent.wizardUI.dialog!.querySelectorAll('mwc-list-item > mwc-icon')
          .length
      ).to.equal(4);
    });
  });

  describe('control block connection wizard', () => {
    let commMappings: List;
    beforeEach(async () => {
      await element.trigger();
      await parent.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      commMappings = <List>(
        parent.wizardUI.dialog?.querySelector('filtered-list')
      );
    });

    it('opens on Connection item click', async () => {
      commMappings.items[0].click();
      await parent.updateComplete;
      expect(parent.wizardUI.dialogs.length).to.equal(1);
      expect(parent.wizardUI.dialog?.heading).to.equal(
        'IED2>>CBSW> XSWI 2>ReportCb - IED1'
      );
    });

    it('shows all ClientLNs', async () => {
      commMappings.items[0].click();
      await parent.updateComplete;
      expect(
        parent.wizardUI.dialog?.querySelectorAll('mwc-check-list-item').length
      ).to.equal(2);
    });

    it('removes selected ClientLNs', async () => {
      expect(
        doc.querySelector(
          'ClientLN[iedName="IED1"][ldInst="CircuitBreaker_CB1"][lnClass="CSWI"]'
        )
      ).to.exist;
      commMappings.items[0].click();
      await parent.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      (<List>(
        parent.wizardUI.dialog?.querySelector('filtered-list')
      )).items[1].click();
      await parent.updateComplete;
      (<HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      )).click();
      await parent.updateComplete;
      expect(
        doc.querySelector(
          'ClientLN[iedName="IED1"][ldInst="CircuitBreaker_CB1"][lnClass="CSWI"]'
        )
      ).to.be.null;
    });

    it('shows all ExtRefs', async () => {
      commMappings.items[1].click();
      await parent.updateComplete;
      expect(
        parent.wizardUI.dialog?.querySelectorAll('mwc-check-list-item').length
      ).to.equal(14);
    });

    it('removes selected ExtRefs in case no intAddr is present', async () => {
      expect(
        doc.querySelector(
          ':root > IED[name="IED2"] ExtRef[iedName="IED1"][ldInst="Disconnectors"][lnClass="XSWI"][doName="Pos"][daName="stVal"]'
        )
      ).to.exist;
      commMappings.items[1].click();
      await parent.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      (<List>(
        parent.wizardUI.dialog?.querySelector('filtered-list')
      )).items[2].click();
      await parent.updateComplete;
      (<HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      )).click();
      await parent.updateComplete;
      expect(
        doc.querySelector(
          ':root > IED[name="IED2"] ExtREf[iedName="IED1"][ldInst="Disconnectors"][lnClass="XSWI"][doName="Pos"][daName="stVal"]'
        )
      ).to.not.exist;
    });

    it('updates selected ExtRefs in case intAddr is present', async () => {
      expect(
        doc.querySelector(
          ':root > IED[name="IED1"] ExtRef[iedName="IED2"][ldInst="CBSW"][lnClass="XSWI"]' +
            '[doName="Pos"][daName="stVal"][intAddr="./stVal"][serviceType="GOOSE"][desc="testDesc"]' +
            '[pServT="GOOSE"][pLN="XSWI"][pDO="Pos"][pDA="stVal"]'
        )
      ).to.exist;
      commMappings.items[2].click();
      await parent.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      (<List>(
        parent.wizardUI.dialog?.querySelector('filtered-list')
      )).items[0].click();
      await parent.updateComplete;
      (<HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      )).click();
      await parent.updateComplete;
      expect(
        doc.querySelector(
          ':root > IED[name="IED1"] ExtRef:not([iedName]):not([ldInst]):not([lnClass]):not([doName]):not([daName])' +
            '[intAddr="./stVal"][serviceType="GOOSE"][desc="testDesc"]' +
            '[pServT="GOOSE"][pLN="XSWI"][pDO="Pos"][pDA="stVal"]'
        )
      ).to.exist;
    });
    it('removes IEDName if all linked ExtRefs are removed/disconnected', async () => {
      expect(
        doc.querySelector(
          ':root > IED[name="IED1"] > AccessPoint > Server > ' +
            'LDevice[inst="CircuitBreaker_CB1"] > LN0 > GSEControl > ' +
            'IEDName[apRef="P1"][ldInst="CircuitBreaker_CB1"][lnClass="CSWI"]'
        )
      ).to.exist;
      commMappings.items[3].click();
      await parent.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      (<List>(
        parent.wizardUI.dialog?.querySelector('filtered-list')
      )).items[0].click();
      await parent.updateComplete;
      (<List>(
        parent.wizardUI.dialog?.querySelector('filtered-list')
      )).items[1].click();
      await parent.updateComplete;
      (<List>(
        parent.wizardUI.dialog?.querySelector('filtered-list')
      )).items[2].click();
      await parent.updateComplete;
      (<List>(
        parent.wizardUI.dialog?.querySelector('filtered-list')
      )).items[3].click();
      await parent.updateComplete;
      (<HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      )).click();
      await parent.updateComplete;
      expect(
        doc.querySelector(
          ':root > IED[name="IED1"] > AccessPoint > Server > ' +
            'LDevice[inst="CircuitBreaker_CB1"] > LN0 > GSEControl > ' +
            'IEDName[apRef="P1"][ldInst="CircuitBreaker_CB1"][lnClass="CSWI"]'
        )
      ).to.not.exist;
    });
    it('does not removes IEDName if linked ExtRefs`not completely removed/disconnected', async () => {
      expect(
        doc.querySelector(
          ':root > IED[name="IED1"] > AccessPoint > Server > ' +
            'LDevice[inst="CircuitBreaker_CB1"] > LN0 > GSEControl > ' +
            'IEDName[apRef="P1"][ldInst="CircuitBreaker_CB1"][lnClass="CSWI"]'
        )
      ).to.exist;
      commMappings.items[3].click();
      await parent.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      (<List>(
        parent.wizardUI.dialog?.querySelector('filtered-list')
      )).items[0].click();
      await parent.updateComplete;
      (<List>(
        parent.wizardUI.dialog?.querySelector('filtered-list')
      )).items[1].click();
      await parent.updateComplete;
      (<HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      )).click();
      await parent.updateComplete;
      expect(
        doc.querySelector(
          ':root > IED[name="IED1"] > AccessPoint > Server > ' +
            'LDevice[inst="CircuitBreaker_CB1"] > LN0 > GSEControl > ' +
            'IEDName[apRef="P1"][ldInst="CircuitBreaker_CB1"][lnClass="CSWI"]'
        )
      ).to.exist;
    });
  });
});
