import { expect, fixture, html } from '@open-wc/testing';

import { List } from '@material/mwc-list';
import { MockWizardEditor } from '../../mock-wizard-editor.js';
import { ZerolinePane } from '../../../src/zeroline-pane.js';

describe('clientln connection wizards', () => {
  let doc: Document;
  let parent: MockWizardEditor;
  let element: ZerolinePane;

  beforeEach(async () => {
    doc = await fetch('/base/test/testfiles/comm-map.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    parent = await fixture(
      html`<mock-wizard-editor
        ><zeroline-pane .doc=${doc}></zeroline-pane
      ></mock-wizard-editor>`
    );

    element = <ZerolinePane>parent.querySelector('zeroline-pane')!;
    await element.updateComplete;
  });

  describe('connection wizard', () => {
    beforeEach(async () => {
      await element.commmap.click();
      await parent.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      (<HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      )).click();
      await parent.updateComplete;
    });

    it('looks like the latest snapshot', async () => {
      expect(parent.wizardUI.dialog).to.equalSnapshot();
    }).timeout(5000);

    it('is displaying source IEDs with mwc-check-list-item', () => {
      expect(
        parent.wizardUI.dialog?.querySelectorAll(
          '#sourcelist>mwc-check-list-item'
        ).length
      ).to.equal(doc.querySelectorAll('IED').length);
    });
    it('is displaying source IEDs with mwc-list-item', () => {
      expect(
        parent.wizardUI.dialog?.querySelectorAll('#sinklist>mwc-list-item')
          .length
      ).to.equal(doc.querySelectorAll('IED').length);
    });
  }).timeout(5000);

  describe('client wizard', () => {
    beforeEach(async () => {
      await element.commmap.click();
      await parent.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      (<HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      )).click();
      await parent.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      (<List>(
        parent.wizardUI.dialog?.querySelector('#sourcelist')
      )).items[1].click();
      await parent.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      (<List>(
        parent.wizardUI.dialog?.querySelector('#sinklist')
      )).items[0].click();
      await parent.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
    });

    it('looks like the latest snapshot', async () => {
      expect(parent.wizardUI.dialog).to.equalSnapshot();
    }).timeout(5000);
    it('is displaying source IEDs report control blocks with mwc-check-list-item', () => {
      expect(
        parent.wizardUI.dialog?.querySelectorAll(
          '#sourcelist>mwc-check-list-item'
        ).length
      ).to.equal(doc.querySelectorAll('IED[name="IED2"] ReportControl').length);
    });
    it('is displaying source IEDs logical nodes in mwc-check-list-item', () => {
      expect(
        parent.wizardUI.dialog?.querySelectorAll(
          '#sinklist>mwc-check-list-item'
        ).length
      ).to.equal(
        doc.querySelectorAll('IED[name="IED1"] LN,IED[name="IED1"] LN0').length
      );
    });
    it('add ClientLN referencing to logical nodes in AccessPoint', async () => {
      expect(
        doc.querySelector(
          'IED[name="IED2"] ReportControl[name="ReportEmpty"] ClientLN'
        )
      )?.to.not.exist;
      (<List>(
        parent.wizardUI.dialog?.querySelector('#sourcelist')
      )).items[1].click();
      await parent.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      (<List>(
        parent.wizardUI.dialog?.querySelector('#sinklist')
      )).items[0].click();
      await parent.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      (<HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      )).click();
      await parent.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      expect(
        doc.querySelector(
          'IED[name="IED2"] ReportControl[name="ReportEmpty"] ClientLN[iedName="IED1"][apRef="P1"][prefix="DC"][lnClass="CILO"][lnInst="1"]'
        )
      )?.to.exist;
    });
    it('does not add an already existing ClientLN referencing to logical nodes in AccessPoint', async () => {
      expect(
        doc.querySelectorAll(
          'IED[name="IED2"] ReportControl[name="ReportCb"] ClientLN[iedName="IED1"][apRef="P1"][prefix="DC"][lnClass="CILO"][lnInst="1"]'
        ).length
      )?.to.equal(1);
      (<List>(
        parent.wizardUI.dialog?.querySelector('#sourcelist')
      )).items[0].click();
      await parent.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      (<List>(
        parent.wizardUI.dialog?.querySelector('#sinklist')
      )).items[0].click();
      await parent.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      (<HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      )).click();
      await parent.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      expect(
        doc.querySelectorAll(
          'IED[name="IED2"] ReportControl[name="ReportCb"] ClientLN[iedName="IED1"][apRef="P1"][prefix="DC"][lnClass="CILO"][lnInst="1"]'
        ).length
      )?.to.equal(1);
    });
    it('add ClientLN referencing to LN0', async () => {
      expect(
        doc.querySelector(
          'IED[name="IED2"] ReportControl[name="ReportEmpty"] ClientLN'
        )
      )?.to.not.exist;
      (<List>(
        parent.wizardUI.dialog?.querySelector('#sourcelist')
      )).items[1].click();
      await parent.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      (<List>(
        parent.wizardUI.dialog?.querySelector('#sinklist')
      )).items[14].click();
      await parent.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      (<HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      )).click();
      await parent.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      expect(
        doc.querySelector(
          'IED[name="IED2"] ReportControl[name="ReportEmpty"] ClientLN[iedName="IED1"][apRef="P1"][ldInst="Disconnectors"][lnClass="LLN0"]'
        )
      )?.to.exist;
    });
    it('does not add an already existing ClientLN referencing to LN0', async () => {
      expect(
        doc.querySelectorAll(
          'IED[name="IED2"] ReportControl[name="ReportCb"] ClientLN[iedName="IED1"][apRef="P1"][ldInst="Disconnectors"][lnClass="LLN0"]'
        ).length
      )?.to.equal(1);
      (<List>(
        parent.wizardUI.dialog?.querySelector('#sourcelist')
      )).items[0].click();
      await parent.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      (<List>(
        parent.wizardUI.dialog?.querySelector('#sinklist')
      )).items[0].click();
      await parent.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      (<HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      )).click();
      await parent.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      expect(
        doc.querySelectorAll(
          'IED[name="IED2"] ReportControl[name="ReportCb"] ClientLN[iedName="IED1"][apRef="P1"][ldInst="Disconnectors"][lnClass="LLN0"]'
        ).length
      )?.to.equal(1);
    });
    it('add ClientLN referencing to logical nodes located in logical devices', async () => {
      expect(
        doc.querySelector(
          'IED[name="IED2"] ReportControl[name="ReportEmpty"] ClientLN'
        )
      )?.to.not.exist;
      (<List>(
        parent.wizardUI.dialog?.querySelector('#sourcelist')
      )).items[1].click();
      await parent.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      (<List>(
        parent.wizardUI.dialog?.querySelector('#sinklist')
      )).items[5].click();
      await parent.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      (<HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      )).click();
      await parent.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      expect(
        doc.querySelector(
          'IED[name="IED2"] ReportControl[name="ReportEmpty"] ClientLN[iedName="IED1"][apRef="P1"][ldInst="Disconnectors"][prefix="DC"][lnClass="XSWI"][lnInst="1"]'
        )
      )?.to.exist;
    });
    it('does not add an already existing ClientLN referencing to to logical nodes located in logical devices', async () => {
      expect(
        doc.querySelectorAll(
          'IED[name="IED2"] ReportControl[name="ReportCb"] ClientLN[iedName="IED1"][apRef="P1"][ldInst="CircuitBreaker_CB1"][lnClass="XCBR"][lnInst="1"]'
        ).length
      )?.to.equal(1);
      (<List>(
        parent.wizardUI.dialog?.querySelector('#sourcelist')
      )).items[0].click();
      await parent.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      (<List>(
        parent.wizardUI.dialog?.querySelector('#sinklist')
      )).items[0].click();
      await parent.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      (<HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      )).click();
      await parent.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      expect(
        doc.querySelectorAll(
          'IED[name="IED2"] ReportControl[name="ReportCb"] ClientLN[iedName="IED1"][apRef="P1"][ldInst="CircuitBreaker_CB1"][lnClass="XCBR"][lnInst="1"]'
        ).length
      )?.to.equal(1);
    });
  }).timeout(5000);
}).timeout(5000);
