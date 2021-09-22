import { expect, fixture, html } from '@open-wc/testing';

import { MockWizardEditor } from '../../mock-wizard-editor.js';
import { FilteredList } from '../../../src/filtered-list.js';
import { WizardTextField } from '../../../src/wizard-textfield.js';

import { Button } from '@material/mwc-button';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

import {
  editReportControlWizard,
  selectReportControlWizard,
} from '../../../src/wizards/reportcontrol.js';

describe('reportcontrol wizarding editing integration', () => {
  let doc: XMLDocument;
  let element: MockWizardEditor;

  beforeEach(async () => {
    element = await fixture(html`<mock-wizard-editor></mock-wizard-editor>`);
    doc = await fetch('/base/test/testfiles/wizards/reportcontrol.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('selectReportControlWizard', () => {
    let reportControlList: FilteredList;

    beforeEach(async () => {
      const wizard = selectReportControlWizard(doc.documentElement);
      element.workflow.push(wizard);
      await element.requestUpdate();
      reportControlList = <FilteredList>(
        element.wizardUI.dialog?.querySelector('filtered-list')
      );
      await reportControlList.updateComplete;
    });
    it('shows all ReportControl within an IED or SCL', () => {
      expect(reportControlList.items.length).to.equal(
        doc.querySelectorAll('ReportControl').length
      );
    });
    it('opens editReportControlWizard on filtered-list item click', async () => {
      const reportControl1 = <ListItemBase>reportControlList.items[0];
      await reportControl1.updateComplete;
      reportControl1.click();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      await element.wizardUI.dialog?.updateComplete;
      const nameField = <WizardTextField>(
        element.wizardUI.dialog?.querySelector('wizard-textfield[label="name"]')
      );
      await nameField.updateComplete;
      expect(nameField.value).to.equal(
        doc.querySelectorAll('ReportControl')[0].getAttribute('name')
      );
    });
  });

  describe('editReportControlWizard', () => {
    let nameField: WizardTextField;
    let primaryAction: HTMLElement;
    let reportControl: Element;

    describe('loading a ReportControl with connected DataSet', () => {
      beforeEach(async () => {
        reportControl = doc.querySelector(
          'LN[lnClass="XSWI"] ReportControl[name="ReportCb"]'
        )!;
        const wizard = editReportControlWizard(reportControl);
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
        const parentLn = reportControl.parentElement;
        const oldName =  reportControl.getAttribute('name');

        nameField.value = 'myNewName';
        await primaryAction.click();

        expect(parentLn?.querySelector(`ReportControl[name="${oldName}"]`)).to.not.exist;
        expect(parentLn?.querySelector(`ReportControl[name="myNewName"]`)).to.exist;
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

        const dataSet = reportControl.parentElement?.querySelector(`DataSet[name="${reportControl.getAttribute('datSet')}"]`);
        expect(dataSet).to.exist;
        expect(nameField.value).to.equal(dataSet?.getAttribute('name'));
      });
      
      it('opens a editOptFieldsWizard on edit OptFields button click', async () => {
        const editOptFieldsButton = <Button>(
          element.wizardUI.dialog!.querySelector(
            'mwc-button[id="editoptfields"]'
          )!
        );
        expect(editOptFieldsButton).to.exist;

        await editOptFieldsButton.updateComplete;
        editOptFieldsButton.click();
        await new Promise(resolve => setTimeout(resolve, 100)); // await animation
        const seqNum = <WizardTextField>(
          element.wizardUI.dialog?.querySelector(
            'wizard-select[label="seqNum"]'
          )
        );
        await seqNum.updateComplete;
        expect(seqNum.value).to.equal(
          doc
            .querySelector('IED[name="IED2"] ReportControl > OptFields')
            ?.getAttribute('seqNum')
        );
      });

      it('opens a editTrgOpsWizard on edit TrgOps button click', async () => {
        const editOptFieldsButton = <Button>(
          element.wizardUI.dialog!.querySelector('mwc-button[id="edittrgops"]')!
        );
        expect(editOptFieldsButton).to.exist;

        await editOptFieldsButton.updateComplete;
        editOptFieldsButton.click();
        await new Promise(resolve => setTimeout(resolve, 100)); // await animation
        const seqNum = <WizardTextField>(
          element.wizardUI.dialog?.querySelector('wizard-select[label="dchg"]')
        );
        await seqNum.updateComplete;
        expect(seqNum.value).to.equal(
          doc
            .querySelector('IED[name="IED2"] ReportControl > TrgOps')
            ?.getAttribute('dchg')
        );
      });

      it('removes the ReportControl and its referenced elements on remove button click', async () => {
        expect(
          doc.querySelector(
            'IED[name="IED2"] LN[lnClass="XSWI"] ReportControl[name="ReportCb"]'
          )
        ).to.exist;
        expect(
          doc.querySelector(
            'IED[name="IED2"] LN[lnClass="XSWI"] DataSet[name="dataSet"]'
          )
        ).to.exist;
        const deleteButton = <Button>(
          element.wizardUI.dialog!.querySelector('mwc-button[icon="delete"]')!
        );
        await deleteButton.updateComplete;
        deleteButton.click();
        expect(
          doc.querySelector(
            'IED[name="IED2"] LN[lnClass="XSWI"][inst="1"] ReportControl[name="ReportCb"]'
          )
        ).to.not.exist;
        expect(
          doc.querySelector(
            'IED[name="IED2"] LN[lnClass="XSWI"][inst="1"] DataSet[name="dataSet"]'
          )
        ).to.not.exist;
      });
    });

    describe('loading a Report with no connected DataSet, OptFields, TrgOps', () => {
      beforeEach(async () => {
        reportControl = doc.querySelector(
          'IED[name="IED2"] LN[lnClass="XSWI"][inst="2"] ReportControl[name="ReportCb"]'
        )!;
        const wizard = editReportControlWizard(reportControl);
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
      it('does not show edit OptFields button', async () => {
        const editGseButton = <Button>(
          element.wizardUI.dialog!.querySelector(
            'mwc-button[id="editoptfields"]'
          )!
        );
        expect(editGseButton).to.not.exist;
      });
      it('does not show edit TrgOps button', async () => {
        const editGseButton = <Button>(
          element.wizardUI.dialog!.querySelector('mwc-button[id="edittrgops"]')!
        );
        expect(editGseButton).to.not.exist;
      });
    });
  });
});
