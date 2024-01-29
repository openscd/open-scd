import { html, fixture, expect } from '@open-wc/testing';

import '../../../mock-wizard-editor.js';
import { MockWizardEditor } from '../../../mock-wizard-editor.js';

import Communication from '../../../../src/editors/Communication.js';
import { Dialog } from '@material/mwc-dialog';
import { WizardTextField } from '../../../../src/wizard-textfield.js';

describe('Communication Plugin', () => {
  customElements.define('communication-plugin', Communication);
  let element: Communication;
  beforeEach(async () => {
    element = await fixture(
      html`<communication-plugin></communication-plugin>`
    );
  });

  describe('without a doc loaded', () => {
    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('with a doc loaded including communication section', () => {
    let doc: XMLDocument;
    let element: Communication;
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/valid2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      element = await fixture(
        html`<communication-plugin .doc="${doc}"></communication-plugin>`
      );
    });
    it('constains a subnetwork-editor rendering the communication section', () => {
      expect(element.shadowRoot?.querySelector('subnetwork-editor')).to.exist;
    });
  });

  describe('with a doc loaded missing a communication section', () => {
    let doc: XMLDocument;
    let parent: MockWizardEditor;
    let fab: HTMLElement;
    let element: Communication;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/missingCommunication.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      element = await fixture(
        html`<communication-plugin .doc="${doc}"></communication-plugin>`
      );

      parent = <MockWizardEditor>(
        await fixture(
          html`<mock-wizard-editor
            >${element}/mock-wizard-editor></mock-wizard-editor
          >`
        )
      );
      await element.updateComplete;
      fab = <HTMLElement>(
        parent
          ?.querySelector('communication-plugin')
          ?.shadowRoot?.querySelector('mwc-fab')
      );
    });
    it('has a mwc-fab', () => {
      expect(element.shadowRoot?.querySelector('mwc-fab')).to.exist;
    });
    it('that opens a add subnetwork wizard on mwc-fab click', async () => {
      expect(parent.wizardUI.dialogs.length).to.equal(0);
      fab.click();
      await parent.updateComplete;
      expect(parent.wizardUI.dialogs.length).to.equal(1);
    });

    it('Should create a Communication Element', async () => {
      expect(parent.wizardUI.dialogs.length).to.equal(0);
      expect(element.doc.querySelector('Communication')).is.null;

      await fab.click();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      await parent.updateComplete;

      const dialog: Dialog = parent.wizardUI.dialog!;
      expect(dialog).to.not.be.undefined;

      const nameInput: WizardTextField = dialog.querySelector<WizardTextField>(
        'wizard-textfield[label="name"]'
      )!;
      nameInput.value = 'Test';
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation

      const saveButton: HTMLElement = dialog.querySelector(
        'mwc-button[slot="primaryAction"]'
      )!;
      await saveButton.click();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation

      expect(element.doc.querySelector('Communication')).not.is.null;
      expect(
        element.doc.querySelector('Communication > SubNetwork[name="Test"]')
      ).to.exist;
    });
  });
});
