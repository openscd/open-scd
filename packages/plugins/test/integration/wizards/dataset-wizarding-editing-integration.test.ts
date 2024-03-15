import { expect, fixture, html } from '@open-wc/testing';

import '@openscd/open-scd/test/mock-wizard-editor.js';
import { MockWizardEditor } from '@openscd/open-scd/test/mock-wizard-editor.js';

import { WizardTextField } from '@openscd/open-scd/src/wizard-textfield.js';
import { editDataSetWizard } from '../../../src/wizards/dataset.js';
import { newWizardEvent } from '@openscd/open-scd/src/foundation.js';

describe('dataset wizards', () => {
  let doc: XMLDocument;
  let element: MockWizardEditor;

  beforeEach(async () => {
    element = await fixture(html`<mock-wizard-editor></mock-wizard-editor>`);
    doc = await fetch('/test/testfiles/wizards/gsecontrol.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('editDataSetWizard', () => {
    let primaryAction: HTMLElement;
    let nameField: WizardTextField;

    beforeEach(async () => {
      const wizard = editDataSetWizard(
        doc.querySelector('IED[name="IED2"] DataSet[name="GooseDataSet1"]')!
      );
      element.dispatchEvent(newWizardEvent(wizard));
      await element.requestUpdate();
      primaryAction = <HTMLElement>(
        element.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );
      nameField = element.wizardUI.dialog!.querySelector(
        'wizard-textfield[label="name"]'
      )!;
      await nameField.updateComplete;
    });

    it('allows to change data set attributes', () => {
      expect(
        doc.querySelector('IED[name="IED2"] DataSet[name="myNewDataSet"]')
      );
      nameField.value = 'myNewDataSetName';
      primaryAction.click();
      expect(
        doc.querySelector('IED[name="IED2"] DataSet[name="myNewDataSetName"]')
      );
    });
  });
});
