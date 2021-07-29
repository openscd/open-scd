import { expect, fixture, html } from '@open-wc/testing';

import { List } from '@material/mwc-list';
import { MockWizardEditor } from '../../mock-wizard-editor.js';
import { ZerolinePane } from '../../../src/zeroline-pane.js';

describe('clientln wizards', () => {
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

    await element.commmap.click();
    await parent.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 100)); // await animation
  });

  describe('selectClientLnWizard', () => {
    let commMappings: List;

    beforeEach(async () => {
      commMappings = <List>(
        parent.wizardUI.dialog?.querySelector('filtered-list')
      );

      commMappings.items[1].click();
      await parent.updateComplete;
    });

    it('looks like the latest snapshot', () => {
      expect(parent.wizardUI.dialog).to.equalSnapshot();
    });

    it('filteres ClientLNs to one receiving IED', async () => {
      expect(
        parent.wizardUI.dialog?.querySelectorAll('mwc-check-list-item').length
      ).to.equal(
        doc.querySelectorAll(
          'IED[name="IED2"] ReportControl ClientLN[iedName="IED1"]'
        ).length
      );
    });

    it('allowes to remove ClientLNs', async () => {
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
          'ClientLN[iedName="IED1"][ldInst="CircuitBreaker_CB1"][lnClass="CSWI"]'
        )
      ).to.be.null;
    });
  });

  describe('selectIedsWizard', () => {
    beforeEach(async () => {
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
  }).timeout(5000);

  describe('createClientLnWizard', () => {
    beforeEach(async () => {
      (<HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      )).click();
      await parent.updateComplete;
    });
    describe('for a report control blocks below max attribute', () => {
      beforeEach(async () => {
        await new Promise(resolve => setTimeout(resolve, 100)); // await animation
        (<List>(
          parent.wizardUI.dialog?.querySelector('#sourcelist')
        )).items[1].click();
        (<List>(
          parent.wizardUI.dialog?.querySelector('#sinklist')
        )).items[0].click();
        await parent.updateComplete;
        await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      });

      it('looks like the latest snapshot', async () => {
        expect(parent.wizardUI.dialog).to.equalSnapshot();
      }).timeout(5000);

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
            'IED[name="IED2"] ReportControl[name="ReportCb"] ' +
              'ClientLN[iedName="IED3"][apRef="P1"][ldInst="Disconnectors"][lnClass="LLN0"]'
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
            'IED[name="IED2"] ReportControl[name="ReportCb"] ClientLN[iedName="IED3"][apRef="P1"][ldInst="Disconnectors"][lnClass="LLN0"]'
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
    });
    describe('for a report control blocks below max attribute', () => {
      beforeEach(async () => {
        await new Promise(resolve => setTimeout(resolve, 100)); // await animation
        (<List>(
          parent.wizardUI.dialog?.querySelector('#sourcelist')
        )).items[0].click();
        (<List>(
          parent.wizardUI.dialog?.querySelector('#sinklist')
        )).items[1].click();
        await parent.updateComplete;
        await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      });

      it('looks like the latest snapshot', async () => {
        expect(parent.wizardUI.dialog).to.equalSnapshot();
      }).timeout(5000);

      it('disabled report control blocks when the number of ClientLns reach the max attribute', async () => {
        const reportCb = (<List>(
          parent.wizardUI.dialog?.querySelector('#sourcelist')
        )).items[0];
        expect(reportCb).to.have.attribute('disabled');
      });
    });
  }).timeout(5000);
}).timeout(5000);
