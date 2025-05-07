import { expect, fixture, html } from '@open-wc/testing';

import '@openscd/open-scd/test/mock-wizard-editor.js';
import { MockWizardEditor } from '@openscd/open-scd/test/mock-wizard-editor.js';

import { List } from '@material/mwc-list';
import { ListItem } from '@material/mwc-list/mwc-list-item';

import '../../../src/editors/substation/zeroline-pane.js';
import { IedEditor } from '../../../src/editors/substation/ied-editor.js';
import { ZerolinePane } from '../../../src/editors/substation/zeroline-pane.js';

describe('clientln wizards', () => {
  let doc: Document;
  let parent: MockWizardEditor;
  let element: ZerolinePane;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/comm-map.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    parent = await fixture(
      html`<mock-wizard-editor .doc=${doc}
        ><zeroline-pane .doc=${doc}></zeroline-pane
      ></mock-wizard-editor>`
    );

    await parent.updateComplete;
    element = <ZerolinePane>parent.querySelector('zeroline-pane')!;
    await element.updateComplete;
    element.showieds.click();
    await element.requestUpdate();
  });

  describe('createClientLnWizard', () => {
    let ied1: IedEditor;
    let primaryAction: HTMLElement;
    let reportCbs: ListItem[];
    let logicalnodes: ListItem[];

    beforeEach(async () => {
      if (!element.showieds.on) element.showieds.click();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation

      ied1 = element.shadowRoot!.querySelector('ied-editor')!;
      ied1.connectReport.click();
      await parent.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation

      primaryAction = parent.wizardUI.dialog!.querySelector<HTMLElement>(
        'mwc-button[slot="primaryAction"]'
      )!;
      reportCbs =
        parent.wizardUI.dialog!.querySelector<List>('#sourcelist')!.items;

      logicalnodes =
        parent.wizardUI.dialog!.querySelector<List>('#sinklist')!.items;
    });

    it('looks like the latest snapshot', async () => {
      await expect(parent.wizardUI.dialog).to.equalSnapshot();
    }).timeout(5000);

    it('add ClientLN referencing to logical nodes in AccessPoint', async () => {
      expect(
        doc.querySelector(
          'IED[name="IED2"] ReportControl[name="ReportEmpty"] ClientLN'
        )
      )?.to.not.exist;
      reportCbs[2].click();
      logicalnodes[0].click();
      await parent.updateComplete;
      primaryAction.click();
      await parent.updateComplete;
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
      reportCbs[0].click();
      logicalnodes[0].click();
      await parent.updateComplete;
      primaryAction.click();
      await parent.updateComplete;
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
      reportCbs[2].click();
      logicalnodes[14].click();
      await parent.updateComplete;
      primaryAction.click();
      await parent.updateComplete;
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
      reportCbs[0].click();
      logicalnodes[14].click();
      await parent.updateComplete;
      primaryAction.click();
      await parent.updateComplete;
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
      reportCbs[2].click();
      logicalnodes[5].click();
      await parent.updateComplete;
      primaryAction.click();
      await parent.updateComplete;
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
      reportCbs[0].click();
      logicalnodes[0].click();
      await parent.updateComplete;
      primaryAction.click();
      await parent.updateComplete;
      expect(
        doc.querySelectorAll(
          'IED[name="IED2"] ReportControl[name="ReportCb"] ClientLN[iedName="IED1"][apRef="P1"][ldInst="CircuitBreaker_CB1"][lnClass="XCBR"][lnInst="1"]'
        ).length
      )?.to.equal(1);
    });
    it('disabled report control blocks when the number of ClientLns reach the max attribute', async () => {
      expect(reportCbs[1]).to.have.attribute('disabled');
    });
  }).timeout(5000);
  });