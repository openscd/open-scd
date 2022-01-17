import { expect, fixture, html } from '@open-wc/testing';

import '../../mock-wizard-editor.js';
import { MockWizardEditor } from '../../mock-wizard-editor.js';

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
      element.workflow.unshift();
      element.workflow.push(() => wizard);
      await element.requestUpdate();

      expect(reportControlList.items.length).to.equal(
        doc.querySelector('IED')!.querySelectorAll('ReportControl').length
      );
    });

    it('opens edit wizard for selected ReportControl element on click', async () => {
      const gse2 = <ListItemBase>reportControlList.items[1];
      gse2.click();
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
    let reportControl: Element;

    beforeEach(async () => {
      reportControl = doc.querySelector('IED')!;
      element.workflow.push(() => selectReportControlWizard(reportControl));
      await element.requestUpdate();
      await new Promise(resolve => setTimeout(resolve, 20)); // await animation

      const report = <ListItemBase>(
        (<FilteredList>element.wizardUI.dialog?.querySelector('filtered-list'))
          .items[0]
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
      nameField.value = '4adsasd';
      primaryAction.click();
      expect(reportControl.getAttribute('name')).to.not.equal('4adsasd');
    });

    it('edits name attribute on primary action', async () => {
      nameField.value = 'myNewName';
      primaryAction.click();
      expect(reportControl.getAttribute('name')).to.not.equal('myNewName');
    });

    it('dynamically updates wizards after attribute change', async () => {
      nameField.value = 'myNewName';
      primaryAction.click();

      await new Promise(resolve => setTimeout(resolve, 100)); // await animation

      const report = <ListItemBase>(
        (<FilteredList>element.wizardUI.dialog?.querySelector('filtered-list'))
          .items[0]
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
  });
});
