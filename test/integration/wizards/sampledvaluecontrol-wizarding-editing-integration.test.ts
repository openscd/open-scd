import { expect, fixture, html } from '@open-wc/testing';

import { MockWizardEditor } from '../../mock-wizard-editor.js';
import { FilteredList } from '../../../src/filtered-list.js';
import { WizardTextField } from '../../../src/wizard-textfield.js';

import { Button } from '@material/mwc-button';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

import {
  editSampledValueControlWizard,
  selectSampledValueControlWizard,
} from '../../../src/wizards/sampledvaluecontrol.js';

describe('sampledvaluecontrol wizarding editing integration', () => {
  let doc: XMLDocument;
  let element: MockWizardEditor;

  beforeEach(async () => {
    element = await fixture(html`<mock-wizard-editor></mock-wizard-editor>`);
    doc = await fetch('/base/test/testfiles/wizards/sampledvaluecontrol.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('selectSampledValueControlWizard', () => {
    let reportControlList: FilteredList;

    beforeEach(async () => {
      const wizard = selectSampledValueControlWizard(doc.documentElement);
      element.workflow.push(wizard);
      await element.requestUpdate();
      reportControlList = <FilteredList>(
        element.wizardUI.dialog?.querySelector('filtered-list')
      );
      await reportControlList.updateComplete;
    });
    it('shows all SampledValueControl elements within an IED or SCL', () => {
      expect(reportControlList.items.length).to.equal(
        doc.querySelectorAll('SampledValueControl').length
      );
    });

    it('opens editSampledValueControlWizard on filtered-list item click', async () => {
      const sampledValueControl1 = <ListItemBase>reportControlList.items[0];
      await sampledValueControl1.updateComplete;
      sampledValueControl1.click();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      await element.wizardUI.dialog?.updateComplete;
      const nameField = <WizardTextField>(
        element.wizardUI.dialog?.querySelector('wizard-textfield[label="name"]')
      );
      await nameField.updateComplete;
      expect(nameField.value).to.equal(
        doc.querySelectorAll('SampledValueControl')[0].getAttribute('name')
      );
    });
  });

  describe('editSampledValueControlWizard', () => {
    let nameField: WizardTextField;
    let primaryAction: HTMLElement;
    let sampledValueControl: Element;

    describe('loads a SampledValueControl with connected DataSet', () => {
      beforeEach(async () => {
        sampledValueControl = doc.querySelector(
          'IED[name="IED3"] LDevice[inst="MU01"] LN0 SampledValueControl[name="MSVCB01"]'
        )!;
        const wizard = editSampledValueControlWizard(sampledValueControl);
        element.workflow.push(wizard);
        await element.requestUpdate();
        nameField = element.wizardUI.dialog!.querySelector(
          'wizard-textfield[label="name"]'
        )!;
        primaryAction = <HTMLElement>(
          element.wizardUI.dialog?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        );
        await nameField.updateComplete;
      });

      it('edits name attribute on primary action', async () => {
        nameField.value = 'myNewName';
        await primaryAction.click();
        expect(
          doc.querySelector(
            'IED[name="IED3"] LDevice[inst="MU01"] LN0 SampledValueControl'
          )!
        ).to.have.attribute('name', 'myNewName');
      });

      it('opens editDataSetWizard on edit dataset button click', async () => {
        const editDataSetButton = <Button>(
          element.wizardUI.dialog!.querySelector(
            'mwc-button[id="editdataset"]'
          )!
        );
        await editDataSetButton.updateComplete;
        editDataSetButton.click();
        await new Promise(resolve => setTimeout(resolve, 100)); // await animation
        const nameField = <WizardTextField>(
          element.wizardUI.dialog?.querySelector(
            'wizard-textfield[label="name"]'
          )
        );
        await nameField.updateComplete;
        expect(nameField.value).to.equal(
          doc
            .querySelector('IED[name="IED3"] LN0 DataSet')!
            .getAttribute('name')
        );
      });

      it('opens a editSmvOptsWizard on edit SmvOpts button click', async () => {
        const editOptFieldsButton = <Button>(
          element.wizardUI.dialog!.querySelector(
            'mwc-button[id="editoptfields"]'
          )!
        );
        expect(editOptFieldsButton).to.exist;

        await editOptFieldsButton.updateComplete;
        editOptFieldsButton.click();
        await new Promise(resolve => setTimeout(resolve, 100)); // await animation
        const synchSourceIed = <WizardTextField>(
          element.wizardUI.dialog?.querySelector(
            'wizard-select[label="synchSourceId"]'
          )
        );
        await synchSourceIed.updateComplete;
        expect(synchSourceIed.value).to.equal(
          doc
            .querySelector('IED[name="IED3"] SampledValueControl > SmvOpts')!
            .getAttribute('synchSourceId')
        );
      });

      it('opens a editSmvWizard on edit Communication button click', async () => {
        const editSmvButton = <Button>(
          element.wizardUI.dialog!.querySelector('mwc-button[id="editsmv"]')!
        );
        expect(editSmvButton).to.exist;

        await editSmvButton.updateComplete;
        editSmvButton.click();
        await new Promise(resolve => setTimeout(resolve, 100)); // await animation
        const seqNum = <WizardTextField>(
          element.wizardUI.dialog?.querySelector(
            'wizard-textfield[label="MAC-Address"]'
          )
        );
        await seqNum.updateComplete;
        expect(seqNum.value).to.equal(
          doc
            .querySelector(
              'SMV[ldInst="MU01"][cbName="MSVCB01"] P[type="MAC-Address"]'
            )
            ?.innerHTML.trim()
        );
      });

      it('removes the SampledValueControl element and its referenced elements on remove button click', async () => {
        expect(doc.querySelector('IED[name="IED2"] LN0 SampledValueControl')).to
          .exist;
        expect(doc.querySelector('IED[name="IED3"] LN0 DataSet')).to.exist;
        expect(doc.querySelector('SMV[ldInst="MU01"][cbName="MSVCB01"]')).to
          .exist;

        const deleteButton = <Button>(
          element.wizardUI.dialog!.querySelector('mwc-button[icon="delete"]')!
        );
        await deleteButton.updateComplete;
        deleteButton.click();

        expect(doc.querySelector('IED[name="IED3"] LN0 SampledValueControl')).to
          .not.exist;
        expect(doc.querySelector('IED[name="IED3"] LN0 DataSet')).to.not.exist;
        expect(doc.querySelector('SMV[ldInst="MU01"][cbName="MSVCB01"]')).to.not
          .exist;
      });
    });

    describe('loads a SampledValueControl with no connected DataSet, SmvOpts, SMV', () => {
      beforeEach(async () => {
        sampledValueControl = doc.querySelector(
          'IED[name="IED2"] LN0 SampledValueControl'
        )!;
        const wizard = editSampledValueControlWizard(sampledValueControl);
        element.workflow.push(wizard);
        await element.requestUpdate();
      });

      it('does not show edit DataSet button', async () => {
        const editGseButton = <Button>(
          element.wizardUI.dialog!.querySelector(
            'mwc-button[id="editdataset"]'
          )!
        );
        expect(editGseButton).to.not.exist;
      });
      it('does not show edit SmvOpts button', async () => {
        const editGseButton = <Button>(
          element.wizardUI.dialog!.querySelector(
            'mwc-button[id="editoptfields"]'
          )!
        );
        expect(editGseButton).to.not.exist;
      });
      it('does not show edit Communication button', async () => {
        const editGseButton = <Button>(
          element.wizardUI.dialog!.querySelector('mwc-button[id="editsmv"]')!
        );
        expect(editGseButton).to.not.exist;
      });
    });
  });
});
