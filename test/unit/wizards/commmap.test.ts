import { expect, fixture, html } from '@open-wc/testing';
import {
  getSinkReferences,
  getSourceReferences,
} from '../../../src/wizards/commmap-wizards.js';
import { ZerolinePane } from '../../../src/zeroline-pane.js';
import { MockWizardEditor } from '../../mock-wizard-editor.js';

describe('communication-mapping wizard', () => {
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
    await element.commmap.click();
    await element.updateComplete;
  });

  it('looks like the latest snapshot', () => {
    expect(parent.wizardUI.dialog).to.equalSnapshot();
  });

  it('closes on secondary action', async () => {
    (<HTMLElement>(
      parent.wizardUI.dialog!.querySelector(
        'mwc-button[slot="secondaryAction"]'
      )
    )).click();
    await parent.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 100)); // await animation
    expect(parent.wizardUI.dialogs.length).to.equal(0);
  });

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

  describe('getSinkReferences', () => {
    it('retruns an array of ClientLN`s for ReportControl blocks', () => {
      expect(
        getSinkReferences(doc.querySelector('ReportControl[name="ReportCb"]')!)
      ).to.have.length(4);
      expect(
        getSinkReferences(
          doc.querySelector('ReportControl[name="ReportCb"]')!
        )[0].isEqualNode(
          doc.querySelector('ReportControl[name="ReportCb"] ClientLN')
        )
      )?.to.be.true;
    });
  });

  describe('getSourceReferences', () => {
    it('retruns an array of child ExtRef`s', () => {
      expect(getSourceReferences(doc)).to.have.length(20);
      expect(
        getSourceReferences(doc)[0].isEqualNode(doc.querySelector('ExtRef'))
      ).to.be.true;
    });
  });
});
