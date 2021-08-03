import { expect, fixture, html } from '@open-wc/testing';

import { WizardTextField } from '../../../src/wizard-textfield.js';
import { editDataSetWizard } from '../../../src/wizards/dataset.js';

import { MockWizard } from '../../mock-wizard.js';

describe('dataset wizards', () => {
  let doc: XMLDocument;
  let element: MockWizard;
  let nameField: WizardTextField;

  beforeEach(async () => {
    element = await fixture(html`<mock-wizard></mock-wizard>`);
    doc = await fetch('/base/test/testfiles/wizards/gsecontrol.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('editDataSetWizard', () => {
    beforeEach(async () => {
      const wizard = editDataSetWizard(
        doc.querySelector('IED[name="IED2"] DataSet[name="GooseDataSet1"]')!
      );
      element.workflow.push(wizard);
      await element.requestUpdate();
      nameField = element.wizardUI.dialog!.querySelector(
        'wizard-textfield[label="name"]'
      )!;
      await nameField.updateComplete;
    });
    it('allows to change data set attributes', () => {
      nameField.value = 'myNewDataSetName';
      expect(
        doc.querySelector('IED[name="IED2"] DataSet[name="myNewDataSet"]')
      );
    });
  });
});
