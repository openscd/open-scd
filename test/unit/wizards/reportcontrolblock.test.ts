import { expect, fixture, html } from '@open-wc/testing';

import { List } from '@material/mwc-list';
import { MockWizardEditor } from '../../mock-wizard-editor.js';
import { ZerolinePane } from '../../../src/zeroline-pane.js';

describe('report control block connection wizard', () => {
  let doc: Document;
  let parent: MockWizardEditor;
  let element: ZerolinePane;
  let commMappings: List;

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
    commMappings = <List>parent.wizardUI.dialog?.querySelector('filtered-list');

    commMappings.items[0].click();
    await parent.updateComplete;
  });

  it('looks like the latest snapshot', () => {
    expect(parent.wizardUI.dialog).to.equalSnapshot();
  });

  it('opens on Connection item click', async () => {
    expect(parent.wizardUI.dialogs.length).to.equal(1);
    expect(parent.wizardUI.dialog?.heading).to.equal(
      'IED2>>CBSW> XSWI 2>ReportCb - IED1'
    );
  });

  it('shows all ClientLNs', async () => {
    expect(
      parent.wizardUI.dialog?.querySelectorAll('mwc-check-list-item').length
    ).to.equal(
      doc.querySelectorAll('IED[name="IED2"] ReportControl ClientLN').length
    );
  });

  it('removes selected ClientLNs', async () => {
    await new Promise(resolve => setTimeout(resolve, 100)); // await animation
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
        'ClientLN[iedName="IED1"][ldInst="CircuitBreaker_CB1"][lnClass="CSWI"]'
      )
    ).to.be.null;
  });
});
