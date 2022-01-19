import { expect, fixture, html } from '@open-wc/testing';

import '../../mock-wizard-editor.js';
import { MockWizardEditor } from '../../mock-wizard-editor.js';

import { Button } from '@material/mwc-button';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

import { FilteredList } from '../../../src/filtered-list.js';
import { WizardTextField } from '../../../src/wizard-textfield.js';
import { selectReportControlWizard } from '../../../src/wizards/reportcontrol.js';

describe('Wizards for SCL element ReportControl', () => {
  let doc: XMLDocument;
  let element: MockWizardEditor;

  beforeEach(async () => {
    element = await fixture(html`<mock-wizard-editor></mock-wizard-editor>`);
    doc = await fetch('/test/testfiles/wizards/reportcontrol.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('define a select wizards that ', () => {
    let reportControlList: FilteredList;

    beforeEach(async () => {
      const wizard = selectReportControlWizard(doc.documentElement);
      element.workflow.push(() => wizard);
      await element.requestUpdate();

      reportControlList = <FilteredList>(
        element.wizardUI.dialog?.querySelector('filtered-list')
      );
      await reportControlList.updateComplete;
    });

    it('shows all ReportControl elements within a project', () =>
      expect(reportControlList.items.length).to.equal(
        doc.querySelectorAll('ReportControl').length
      ));

    it('allows to filter ReportControl elements per IED', async () => {
      const wizard = selectReportControlWizard(doc.querySelector('IED')!);
      element.workflow.pop();
      element.workflow.push(() => wizard);
      await element.requestUpdate();

      reportControlList = <FilteredList>(
        element.wizardUI.dialog?.querySelector('filtered-list')
      );
      await reportControlList.updateComplete;

      expect(reportControlList.items.length).to.equal(
        doc.querySelector('IED')!.querySelectorAll('ReportControl').length
      );
    });

    it('opens edit wizard for selected ReportControl element on click', async () => {
      const reportItem = <ListItemBase>reportControlList.items[1];
      reportItem.click();
      await new Promise(resolve => setTimeout(resolve, 20)); // await animation

      const nameField = <WizardTextField>(
        element.wizardUI.dialog?.querySelector('wizard-textfield[label="name"]')
      );
      await nameField.requestUpdate();

      expect(nameField.value).to.equal(
        doc.querySelectorAll('ReportControl')[1].getAttribute('name')
      );
    });
  });

  describe('defines an edit wizard that', () => {
    let nameField: WizardTextField;
    let secondaryAction: HTMLElement;
    let primaryAction: HTMLElement;
    let parentIED: Element;

    beforeEach(async () => {
      element.workflow.length = 0; // remove all wizard from FIFO queue
      parentIED = doc.querySelector('IED')!;
      element.workflow.push(() => selectReportControlWizard(parentIED));
      await element.requestUpdate();
      await new Promise(resolve => setTimeout(resolve, 20)); // await animation

      const report = <ListItemBase>(
        (<FilteredList>element.wizardUI.dialog?.querySelector('filtered-list'))
          .items[1]
      );
      report.click();
      await new Promise(resolve => setTimeout(resolve, 20)); // await animation

      nameField = element.wizardUI.dialog!.querySelector(
        'wizard-textfield[label="name"]'
      )!;
      primaryAction = <HTMLElement>(
        element.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );
      secondaryAction = <HTMLElement>(
        element.wizardUI.dialog?.querySelector(
          'mwc-button[slot="secondaryAction"]'
        )
      );
      await nameField.updateComplete;
    });

    it('rejects name attribute starting with decimals', async () => {
      expect(
        parentIED.querySelectorAll('ReportControl')[1]?.getAttribute('name')
      ).to.not.equal('4adsasd');

      nameField.value = '4adsasd';
      await element.requestUpdate();
      primaryAction.click();

      expect(
        parentIED.querySelectorAll('ReportControl')[1]?.getAttribute('name')
      ).to.not.equal('4adsasd');
    });

    it('edits name attribute on primary action', async () => {
      expect(
        parentIED.querySelectorAll('ReportControl')[1]?.getAttribute('name')
      ).to.not.equal('myNewName');

      nameField.value = 'myNewName';
      await element.requestUpdate();
      primaryAction.click();

      expect(
        parentIED.querySelectorAll('ReportControl')[1]?.getAttribute('name')
      ).to.equal('myNewName');
    });

    it('dynamically updates wizards after attribute change', async () => {
      nameField.value = 'myNewName';
      primaryAction.click();

      await new Promise(resolve => setTimeout(resolve, 100)); // await animation

      const report = <ListItemBase>(
        (<FilteredList>element.wizardUI.dialog?.querySelector('filtered-list'))
          .items[1]
      );

      expect(report.innerHTML).to.contain('myNewName');
    });

    it('returns back to its starting wizard on secondary action', async () => {
      secondaryAction.click();

      await new Promise(resolve => setTimeout(resolve, 100)); // await animation

      const report = <ListItemBase>(
        (<FilteredList>element.wizardUI.dialog?.querySelector('filtered-list'))
          .items[0]
      );

      expect(report.innerHTML).to.contain('ReportCb');
    });

    it('opens edit wizard for DataSet element on edit dataset button click', async () => {
      const editDataSetButton = <Button>(
        element.wizardUI.dialog!.querySelector('mwc-button[id="editdataset"]')!
      );

      await editDataSetButton.updateComplete;
      editDataSetButton.click();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation

      const nameField = <WizardTextField>(
        element.wizardUI.dialog?.querySelector('wizard-textfield[label="name"]')
      );
      await nameField.updateComplete;

      expect(nameField.value).to.equal(
        doc.querySelectorAll('DataSet')[1].getAttribute('name')
      );
    });

    it('opens edit wizard for TrgOps element on edit trigger options button click', async () => {
      const editTrgOpsButton = <Button>(
        element.wizardUI.dialog!.querySelector('mwc-button[id="edittrgops"]')!
      );

      await editTrgOpsButton.updateComplete;
      editTrgOpsButton.click();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation

      const dchgSelect = <WizardTextField>(
        element.wizardUI.dialog?.querySelector('wizard-select[label="dchg"]')
      );
      await dchgSelect.updateComplete;

      expect(dchgSelect).to.exist;
    });

    it('opens edit wizard for OptFields element on edit optional fields button click', async () => {
      const editOptFieldsButton = <Button>(
        element.wizardUI.dialog!.querySelector(
          'mwc-button[id="editoptfields"]'
        )!
      );

      await editOptFieldsButton.updateComplete;
      editOptFieldsButton.click();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation

      const seqNumSelect = <WizardTextField>(
        element.wizardUI.dialog?.querySelector('wizard-select[label="seqNum"]')
      );
      await seqNumSelect.updateComplete;

      expect(seqNumSelect).to.exist;
    });

    it('removes the ReportControl element and its referenced elements on remove button click', async () => {
      expect(
        doc.querySelector(
          'IED[name="IED2"] LN[lnClass="XSWI"] ReportControl[name="ReportCb2"]'
        )
      ).to.exist;
      expect(
        doc.querySelector(
          'IED[name="IED2"] LN[lnClass="XSWI"][inst="1"] DataSet[name="dataSet"]'
        )
      ).to.exist;
      const deleteButton = <Button>(
        element.wizardUI.dialog!.querySelector('mwc-button[icon="delete"]')!
      );
      await deleteButton.updateComplete;
      deleteButton.click();
      expect(
        doc.querySelector(
          'IED[name="IED2"] LN[lnClass="XSWI"][inst="1"] ReportControl[name="ReportCb2"]'
        )
      ).to.not.exist;
      expect(
        doc.querySelector(
          'IED[name="IED2"] LN[lnClass="XSWI"][inst="1"] DataSet[name="dataSet"]'
        )
      ).to.not.exist;
    });
  });
});
