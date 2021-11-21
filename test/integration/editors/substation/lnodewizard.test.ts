import { expect, fixture } from '@open-wc/testing';

import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

import { lNodeWizard } from '../../../../src/wizards/lnode.js';

import '../../../mock-wizard.js';
import { MockWizardEditor } from '../../../mock-wizard-editor.js';
import { html, List } from '../../../../src/foundation.js';

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
      await fixture(html`<mock-wizard-editor></mock-wizard-editor>`)
    );
    element.workflow.push(lNodeWizard(doc.querySelector('Bay')!));
    await element.requestUpdate();
  });

  it('renders three wizard pages each in a c-dialog', async () => {
    expect(
      element.wizardUI.shadowRoot?.querySelectorAll('c-dialog').length
    ).to.equal(2);
  });

  describe('the first page', () => {
    it('renders a list of available IEDs in a c-list with checked items', () => {
      expect(
        element.wizardUI.shadowRoot
          ?.querySelector('c-dialog')
          ?.querySelectorAll('check-list-item').length
      ).to.equal(doc.querySelectorAll('IED').length);
    });

    it('selects the IEDs that are connected', () => {
      expect(
        (<ListItemBase[]>(
          (<List>element.wizardUI.dialogs[0].querySelector('#iedList')).selected
        )).length
      ).to.equal(1);
    });

    describe('the second page', () => {
      it('adds logical nodes of the selected IEDs', async () => {
        expect(
          element.wizardUI.shadowRoot
            ?.querySelector('c-dialog:nth-child(2)')
            ?.querySelectorAll('check-list-item').length
        ).to.equal(
          doc.querySelectorAll('IED[name="IED2"] LN0, IED[name="IED2"] LN')
            .length
        );
      });

      it('selects logical nodes connected to the substation element', async () => {
        expect(
          element.wizardUI.shadowRoot
            ?.querySelector('c-dialog:nth-child(2)')
            ?.querySelectorAll('check-list-item[selected]').length
        ).to.have.equal(3);
      });

      it('disables logical nodes connected to another substation', async () => {
        expect(
          element.wizardUI.shadowRoot
            ?.querySelector('c-dialog:nth-child(2)')
            ?.querySelectorAll('check-list-item[disabled]').length
        ).to.have.equal(1);
      });
    });

    describe('lNodeActions', () => {
      it('removes unselected logical nodes', async () => {
        expect(
          doc.querySelector('Bay[name="COUPLING_BAY"]>LNode[lnClass="LLN0"]')
        ).to.exist;
        (<List>(
          element.wizardUI.shadowRoot
            ?.querySelector('c-dialog:nth-child(2)')
            ?.querySelector('filtered-list')
        )).items[0].click();
        await element.updateComplete;
        (<HTMLElement>(
          element.wizardUI.shadowRoot
            ?.querySelector('c-dialog:nth-child(2)')
            ?.querySelector('c-button[slot="primaryAction"]')
        )).click();
        await element.updateComplete;
        expect(
          doc.querySelector('Bay[name="COUPLING_BAY"]>LNode[lnClass="LLN0"]')
        ).to.not.exist;
      });

      it('creates selected logical nodes', async () => {
        expect(
          doc.querySelector(
            'Bay[name="COUPLING_BAY"]>LNode[ldInst="CBSW"][lnClass="XCBR"][lnInst="1"]'
          )
        ).to.not.exist;
        (<List>(
          element.wizardUI.shadowRoot
            ?.querySelector('c-dialog:nth-child(2)')
            ?.querySelector('filtered-list')
        )).items[3].click();
        await element.updateComplete;
        (<HTMLElement>(
          element.wizardUI.shadowRoot
            ?.querySelector('c-dialog:nth-child(2)')
            ?.querySelector('c-button[slot="primaryAction"]')
        )).click();
        await element.updateComplete;
        expect(
          doc.querySelector(
            'Bay[name="COUPLING_BAY"]>LNode[ldInst="CBSW"][lnClass="XCBR"][lnInst="1"]'
          )
        ).to.exist;
      });
      it('only create and remove its own logical node references', async () => {
        const allLNodesNumber = doc.querySelectorAll(
          'Bay[name="COUPLING_BAY"] LNode'
        ).length;
        (<List>(
          element.wizardUI.shadowRoot
            ?.querySelector('c-dialog:nth-child(2)')
            ?.querySelector('filtered-list')
        )).items[3].click();
        await element.updateComplete;
        (<HTMLElement>(
          element.wizardUI.shadowRoot
            ?.querySelector('c-dialog:nth-child(2)')
            ?.querySelector('c-button[slot="primaryAction"]')
        )).click();
        await element.updateComplete;
        expect(
          doc.querySelectorAll('Bay[name="COUPLING_BAY"] LNode').length
        ).to.equal(allLNodesNumber + 1);
      });
    });
  });
});
