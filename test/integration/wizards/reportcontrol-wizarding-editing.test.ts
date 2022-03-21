import { expect, fixture, html } from '@open-wc/testing';

import '../../mock-wizard-editor.js';
import { MockWizardEditor } from '../../mock-wizard-editor.js';

import { Button } from '@material/mwc-button';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

import { FilteredList } from '../../../src/filtered-list.js';
import { WizardTextField } from '../../../src/wizard-textfield.js';
import {
  createReportControlWizard,
  reportControlParentSelector,
  selectReportControlWizard,
} from '../../../src/wizards/reportcontrol.js';
import { FinderList } from '../../../src/finder-list.js';

describe('Wizards for SCL element ReportControl', () => {
  let doc: XMLDocument;
  let element: MockWizardEditor;

  let primaryAction: HTMLElement;

  beforeEach(async () => {
    element = await fixture(html`<mock-wizard-editor></mock-wizard-editor>`);
    doc = await fetch('/test/testfiles/wizards/reportcontrol.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('define a select wizards that ', () => {
    let reportControlList: FilteredList;

    describe('with the document element as input', () => {
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

      it('opens edit wizard for selected ReportControl element on click', async () => {
        const reportItem = <ListItemBase>reportControlList.items[1];
        reportItem.click();
        await new Promise(resolve => setTimeout(resolve, 20)); // await animation

        const nameField = <WizardTextField>(
          element.wizardUI.dialog?.querySelector(
            'wizard-textfield[label="name"]'
          )
        );
        await nameField.requestUpdate();

        expect(nameField.value).to.equal(
          doc.querySelectorAll('ReportControl')[1].getAttribute('name')
        );
      });

      describe('has an add Report primary button that', () => {
        let iEDPicker: FinderList;

        beforeEach(async () => {
          (<HTMLElement>(
            element.wizardUI.dialog?.querySelector(
              'mwc-button[slot="primaryAction"]'
            )
          )).click();
          await new Promise(resolve => setTimeout(resolve, 50)); // await animation

          iEDPicker = <FinderList>(
            element.wizardUI.dialog?.querySelector('finder-list')
          );
        });

        it('opens a potential list of host IEDs for the ReportControl element', async () =>
          expect(iEDPicker).to.exist);
      });
    });

    describe('with a specific IED as input', () => {
      beforeEach(async () => {
        const wizard = selectReportControlWizard(doc.querySelector('IED')!);
        element.workflow.push(() => wizard);
        await element.requestUpdate();

        reportControlList = <FilteredList>(
          element.wizardUI.dialog?.querySelector('filtered-list')
        );
        await reportControlList.updateComplete;
      });

      it('allows to filter ReportControl elements per IED', async () =>
        expect(reportControlList.items.length).to.equal(
          doc.querySelector('IED')!.querySelectorAll('ReportControl').length
        ));

      it('opens edit wizard for selected ReportControl element on click', async () => {
        const reportItem = <ListItemBase>reportControlList.items[1];
        reportItem.click();
        await new Promise(resolve => setTimeout(resolve, 20)); // await animation

        const nameField = <WizardTextField>(
          element.wizardUI.dialog?.querySelector(
            'wizard-textfield[label="name"]'
          )
        );
        await nameField.requestUpdate();

        expect(nameField.value).to.equal(
          doc.querySelectorAll('ReportControl')[1].getAttribute('name')
        );
      });

      describe('has an add Report primary button that', () => {
        it('opens the create wizard for the ReportControl element', async () => {
          const primaryAction = <HTMLElement>(
            element.wizardUI.dialog?.querySelector(
              'mwc-button[slot="primaryAction"]'
            )
          );

          await primaryAction.click();
          await new Promise(resolve => setTimeout(resolve, 20)); // await animation

          const nameField = <WizardTextField>(
            element.wizardUI.dialog?.querySelector(
              'wizard-textfield[label="name"]'
            )
          );
          await nameField.requestUpdate();

          expect(nameField).to.exist;
        });
      });
    });
  });

  describe('defines an edit wizard that', () => {
    let nameField: WizardTextField;
    let secondaryAction: HTMLElement;
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
      const editDataSetButton = <HTMLElement>(
        Array.from(
          element.wizardUI.dialog!.querySelectorAll<ListItemBase>(
            'mwc-menu > mwc-list-item'
          )
        ).find(item => item.innerHTML.includes(`[scl.DataSet]`))
      );

      await element.wizardUI.dialog?.requestUpdate();
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
      const editTrgOpsButton = <HTMLElement>(
        Array.from(
          element.wizardUI.dialog!.querySelectorAll<ListItemBase>(
            'mwc-menu > mwc-list-item'
          )
        ).find(item => item.innerHTML.includes(`[scl.TrgOps]`))
      );

      await element.wizardUI.dialog?.requestUpdate();
      editTrgOpsButton.click();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation

      const dchgSelect = <WizardTextField>(
        element.wizardUI.dialog?.querySelector('wizard-checkbox[label="dchg"]')
      );
      await dchgSelect.updateComplete;

      expect(dchgSelect).to.exist;
    });

    it('opens edit wizard for OptFields element on edit optional fields button click', async () => {
      const editOptFieldsButton = <HTMLElement>(
        Array.from(
          element.wizardUI.dialog!.querySelectorAll<ListItemBase>(
            'mwc-menu > mwc-list-item'
          )
        ).find(item => item.innerHTML.includes(`[scl.OptFields]`))
      );

      await element.wizardUI.dialog?.requestUpdate();
      editOptFieldsButton.click();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation

      const seqNumSelect = <WizardTextField>(
        element.wizardUI.dialog?.querySelector(
          'wizard-checkbox[label="seqNum"]'
        )
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

      const deleteElement = <HTMLElement>(
        Array.from(
          element.wizardUI.dialog!.querySelectorAll<ListItemBase>(
            'mwc-menu > mwc-list-item'
          )
        ).find(item => item.innerHTML.includes(`[remove]`))
      );
      await element.wizardUI.dialog?.requestUpdate();
      deleteElement.click();

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

  describe('defines a selector wizard to select ReportControl parent', () => {
    let iEDPicker: FinderList;

    beforeEach(async () => {
      const wizard = reportControlParentSelector(doc);
      element.workflow.push(() => wizard);
      await element.requestUpdate();

      iEDPicker = <FinderList>(
        element.wizardUI.dialog?.querySelector('finder-list')
      );

      primaryAction = <HTMLElement>(
        element.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );
    });

    it('opens a potential list of host IEDs for the ReportControl element', () =>
      expect(iEDPicker).to.exist);

    it('is not of type multi', () => expect(iEDPicker.multi).to.be.false);

    it('forwards LN0/LN as parent to ReportControl create wizard', async () => {
      expect(
        doc
          .querySelector('IED[name="IED3"]')
          ?.querySelectorAll('LN0 > ReportControl')
      ).to.have.lengthOf(1);

      iEDPicker.path = ['IED: IED3'];
      primaryAction.click();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation

      const nameField = <WizardTextField>(
        element.wizardUI.dialog?.querySelector('wizard-textfield[label="name"]')
      );
      expect(nameField).to.exist;

      (<HTMLElement>(
        element.wizardUI.dialogs[3]?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      )).click();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation

      expect(
        doc
          .querySelector('IED[name="IED3"]')
          ?.querySelectorAll('LN0 > ReportControl')
      ).to.have.lengthOf(2);
    });
  });

  describe('defines a create wizards that', () => {
    let primaryAction: HTMLElement;

    beforeEach(async () => {
      const wizard = createReportControlWizard(doc.querySelector('LN0')!);
      element.workflow.push(() => wizard);
      await element.requestUpdate();

      primaryAction = <HTMLElement>(
        element.wizardUI.dialogs[3]?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );
    });

    it('creates a new instance of a ReportControl element', () => {
      expect(
        doc
          .querySelector<Element>('IED[name="IED2"]')
          ?.querySelectorAll('LN0 > ReportControl')
      ).to.have.lengthOf(1);

      primaryAction.click();

      expect(
        doc
          .querySelector<Element>('IED[name="IED2"]')
          ?.querySelectorAll('LN0 > ReportControl')
      ).to.have.lengthOf(2);
    });

    it('creates a new instance of a DataSet element referenced from ReportControl', () => {
      expect(
        doc
          .querySelector<Element>('IED[name="IED2"]')
          ?.querySelectorAll('LN0 > DataSet')
      ).to.have.lengthOf(1);

      primaryAction.click();

      expect(
        doc
          .querySelector<Element>('IED[name="IED2"]')
          ?.querySelectorAll('LN0 > DataSet')
      ).to.have.lengthOf(2);
    });
  });
});
