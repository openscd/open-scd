import { expect, fixture, html } from '@open-wc/testing';

import '@material/mwc-list/mwc-check-list-item';
import '@material/mwc-list/mwc-list';
import { List } from '@material/mwc-list';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

import { editlNode } from '../../../../src/editors/substation/lnodewizard.js';

import '../../../mock-wizard.js';
import { MockWizardEditor } from '../../../mock-wizard-editor.js';

describe('lnodewizard', () => {
  let element: MockWizardEditor;
  let doc: Document;
  beforeEach(async () => {
    doc = await fetch('/base/test/testfiles/lnodewizard.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  beforeEach(async () => {
    element = <MockWizardEditor>(
      await fixture(html`<mock-wizard-editor></mock-wizard-editor>>`)
    );
    element.workflow.push(editlNode(doc.querySelector('Bay')!));
    await element.requestUpdate();
  });

  it('renders three wizard pages each in a mwc-dialog', async () => {
    expect(
      element.wizardUI.shadowRoot?.querySelectorAll('mwc-dialog').length
    ).to.equal(2);
  });

  describe('on the first wizard page', () => {
    it('render a list of available IEDs in a mwc-list with checked items', () => {
      expect(
        element.wizardUI.shadowRoot
          ?.querySelector('mwc-dialog')
          ?.querySelectorAll('mwc-check-list-item').length
      ).to.equal(doc.querySelectorAll('IED').length);
    });

    it('select the IEDs that are connected', () => {
      expect(
        (<ListItemBase[]>(
          (<List>element.wizardUI.dialog!.querySelector('#iedList')).selected
        )).length
      ).to.equal(1);
    });

    describe('on the second page', () => {
      it('add logical nodes of the selected IEDs', async () => {
        expect(
          element.wizardUI.shadowRoot
            ?.querySelector('mwc-dialog:nth-child(2)')
            ?.querySelectorAll('mwc-check-list-item').length
        ).to.equal(
          doc.querySelectorAll('IED[name="IED2"] LN0, IED[name="IED2"] LN')
            .length
        );
      });

      it('select logical nodes connected to the substation element', async () => {
        expect(
          element.wizardUI.shadowRoot
            ?.querySelector('mwc-dialog:nth-child(2)')
            ?.querySelectorAll('mwc-check-list-item[selected]').length
        ).to.have.equal(3);
      });

      it('disable logical nodes connected to another substation', async () => {
        expect(
          element.wizardUI.shadowRoot
            ?.querySelector('mwc-dialog:nth-child(2)')
            ?.querySelectorAll('mwc-check-list-item[disabled]').length
        ).to.have.equal(1);
      });
    });

    describe('has a lNodeActions that', () => {
      it('removes unselected logical nodes from the parent element', async () => {
        expect(
          doc.querySelector('Bay[name="COUPLING_BAY"]>LNode[lnClass="LLN0"]')
        ).to.exist;
        (<List>(
          element.wizardUI.shadowRoot
            ?.querySelector('mwc-dialog:nth-child(2)')
            ?.querySelector('filtered-list')
        )).items[0].click();
        await element.updateComplete;
        (<HTMLElement>(
          element.wizardUI.shadowRoot
            ?.querySelector('mwc-dialog:nth-child(2)')
            ?.querySelector('mwc-button[slot="primaryAction"]')
        )).click();
        await element.updateComplete;
        expect(
          doc.querySelector('Bay[name="COUPLING_BAY"]>LNode[lnClass="LLN0"]')
        ).to.not.exist;
      });

      it('creates selected logical nodes to parent element ', async () => {
        expect(
          doc.querySelector(
            'Bay[name="COUPLING_BAY"]>LNode[ldInst="CBSW"][lnClass="XCBR"][lnInst="1"]'
          )
        ).to.not.exist;
        (<List>(
          element.wizardUI.shadowRoot
            ?.querySelector('mwc-dialog:nth-child(2)')
            ?.querySelector('filtered-list')
        )).items[4].click();
        await element.updateComplete;
        (<HTMLElement>(
          element.wizardUI.shadowRoot
            ?.querySelector('mwc-dialog:nth-child(2)')
            ?.querySelector('mwc-button[slot="primaryAction"]')
        )).click();
        await element.updateComplete;
        expect(
          doc.querySelector(
            'Bay[name="COUPLING_BAY"]>LNode[ldInst="CBSW"][lnClass="XCBR"][lnInst="1"]'
          )
        ).to.exist;
      });

      it('leaves logical node references that has not been changed by user', async () => {
        expect(
          doc.querySelector(
            'Bay[name="COUPLING_BAY"]>LNode[ldInst="CBSW"][lnClass="XSWI"][lnInst="3"]'
          )
        ).to.exist;
        (<List>(
          element.wizardUI.shadowRoot
            ?.querySelector('mwc-dialog:nth-child(2)')
            ?.querySelector('filtered-list')
        )).items[2].click();
        await element.updateComplete;
        (<HTMLElement>(
          element.wizardUI.shadowRoot
            ?.querySelector('mwc-dialog:nth-child(2)')
            ?.querySelector('mwc-button[slot="primaryAction"]')
        )).click();
        await element.updateComplete;
        expect(
          doc.querySelector(
            'Bay[name="COUPLING_BAY"]>LNode[ldInst="CBSW"][lnClass="XSWI"][lnInst="3"]'
          )
        ).to.exist;
      });
    });
  });
});
