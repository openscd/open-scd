import { expect, fixture, html } from '@open-wc/testing';

import '../../mock-wizard-editor.js';
import { MockWizardEditor } from '../../mock-wizard-editor.js';

import '../../../src/editors/substation/zeroline-pane.js';
import { List } from '@material/mwc-list';
import { ZerolinePane } from '../../../src/editors/substation/zeroline-pane.js';

describe('selectExtRefWizard', () => {
  let doc: Document;
  let parent: MockWizardEditor;
  let element: ZerolinePane;
  let commMappings: List;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/comm-map.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    parent = await fixture(
      html`<mock-wizard-editor
        ><zeroline-pane .doc=${doc}></zeroline-pane
      ></mock-wizard-editor>`
    );

    element = <ZerolinePane>parent.querySelector('zeroline-pane')!;
    await element.updateComplete;

    element.commmap.click();
    await parent.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 100)); // await animation
    commMappings = <List>parent.wizardUI.dialog?.querySelector('filtered-list');
  });

  it('looks like the latest snapshot', async () => {
    commMappings.items[3].click();
    await parent.updateComplete;
    await expect(parent.wizardUI.dialog).to.equalSnapshot();
  });

  it('shows all ExtRefs', async () => {
    commMappings.items[3].click();
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
    commMappings.items[3].click();
    await parent.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 100)); // await animation
    (<List>(
      parent.wizardUI.dialog?.querySelector('filtered-list')
    )).items[2].click();
    await parent.updateComplete;
    (<HTMLElement>(
      parent.wizardUI.dialog?.querySelector('mwc-button[slot="primaryAction"]')
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
    commMappings.items[4].click();
    await parent.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 100)); // await animation
    (<List>(
      parent.wizardUI.dialog?.querySelector('filtered-list')
    )).items[0].click();
    await parent.updateComplete;
    (<HTMLElement>(
      parent.wizardUI.dialog?.querySelector('mwc-button[slot="primaryAction"]')
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
    commMappings.items[5].click();
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
      parent.wizardUI.dialog?.querySelector('mwc-button[slot="primaryAction"]')
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
    commMappings.items[5].click();
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
      parent.wizardUI.dialog?.querySelector('mwc-button[slot="primaryAction"]')
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
