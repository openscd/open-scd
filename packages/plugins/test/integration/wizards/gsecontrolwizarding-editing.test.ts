import { expect, fixture, html } from '@open-wc/testing';

import '@openscd/open-scd/test/mock-wizard-editor.js';
import { MockWizardEditor } from '@openscd/open-scd/test/mock-wizard-editor.js';

import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

import {
  editGseControlWizard,
  selectGseControlWizard,
} from '../../../src/wizards/gsecontrol.js';
import { FilteredList } from '@openscd/open-scd/src/filtered-list.js';
import { WizardTextField } from '@openscd/open-scd/src/wizard-textfield.js';
import { FinderList } from '@openscd/open-scd/src/finder-list.js';
import { newWizardEvent } from '@openscd/open-scd/src/foundation.js';

describe('Wizards for SCL element GSEControl', () => {
  let doc: XMLDocument;
  let element: MockWizardEditor;

  beforeEach(async () => {
    element = await fixture(html`<mock-wizard-editor></mock-wizard-editor>`);
    doc = await fetch('/test/testfiles/wizards/gsecontrol.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('define a select wizards that', () => {
    let gseControlList: FilteredList;

    describe('with the document element as input', () => {
      beforeEach(async () => {
        const wizard = selectGseControlWizard(doc.documentElement);
        element.dispatchEvent(newWizardEvent(wizard));
        await element.requestUpdate();
        gseControlList = <FilteredList>(
          element.wizardUI.dialog?.querySelector('filtered-list')
        );
        await gseControlList.updateComplete;
      });

      it('shows all GSEControl within the SCL', () =>
        expect(gseControlList.items.length).to.equal(
          doc.querySelectorAll('GSEControl').length
        ));

      it('opens edit wizard for selected GSEControl on filtered-list item click', async () => {
        const gse2 = <ListItemBase>gseControlList.items[1];
        await gse2.updateComplete;
        gse2.click();
        await new Promise(resolve => setTimeout(resolve, 100)); // await animation
        await element.wizardUI.dialog?.updateComplete;

        const nameField = <WizardTextField>(
          element.wizardUI.dialog?.querySelector(
            'wizard-textfield[label="name"]'
          )
        );
        await nameField.updateComplete;

        expect(nameField.value).to.equal(
          doc.querySelectorAll('GSEControl')[1].getAttribute('name')
        );
      });

      describe('has an add GSEControl primary button that', () => {
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
        const wizard = selectGseControlWizard(doc.querySelector('IED')!);
        element.dispatchEvent(newWizardEvent(wizard));
        await element.requestUpdate();

        gseControlList = <FilteredList>(
          element.wizardUI.dialog?.querySelector('filtered-list')
        );
        await gseControlList.updateComplete;
      });

      it('allows to filter ReportControl elements per IED', async () =>
        expect(gseControlList.items.length).to.equal(
          doc.querySelector('IED')!.querySelectorAll('GSEControl').length
        ));

      it('opens edit wizard for selected ReportControl element on click', async () => {
        const reportItem = <ListItemBase>gseControlList.items[1];
        reportItem.click();
        await new Promise(resolve => setTimeout(resolve, 20)); // await animation

        const nameField = <WizardTextField>(
          element.wizardUI.dialog?.querySelector(
            'wizard-textfield[label="name"]'
          )
        );
        await nameField.requestUpdate();

        expect(nameField.value).to.equal(
          doc.querySelectorAll('GSEControl')[1].getAttribute('name')
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

  describe('define an edit wizard that', () => {
    let nameField: WizardTextField;
    let primaryAction: HTMLElement;
    let secondaryAction: HTMLElement;
    let gseControl: Element;
    let parentIED: Element;

    describe('loading a GSEControl with connected DataSet and GSE element', () => {
      beforeEach(async () => {
        element.workflow.length = 0; // remove all wizard from FIFO queue

        parentIED = doc.querySelector('IED')!;
        element.dispatchEvent(
          newWizardEvent(() => selectGseControlWizard(parentIED))
        );

        await element.requestUpdate();
        await new Promise(resolve => setTimeout(resolve, 20)); // await animation

        const gsecontrol = <ListItemBase>(
          (<FilteredList>(
            element.wizardUI.dialog?.querySelector('filtered-list')
          )).items[0]
        );
        gsecontrol.click();
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
        expect(doc.querySelector('GSEControl[name="4adsasd"]')).to.not.exist;

        nameField.value = '4adsasd';
        await element.requestUpdate();
        primaryAction.click();

        expect(doc.querySelector('GSEControl[name="4adsasd"]')).to.not.exist;
      });

      it('edits name attribute on primary action', async () => {
        expect(doc.querySelector('GSEControl[name="myNewName"]')!).to.not.exist;

        nameField.value = 'myNewName';
        await element.requestUpdate();
        primaryAction.click();

        expect(doc.querySelector('GSEControl[name="myNewName"]')!).to.exist;
      });

      it('dynamically updates wizards after attribute change', async () => {
        nameField.value = 'myNewName';
        primaryAction.click();

        await new Promise(resolve => setTimeout(resolve, 100)); // await animation

        const gsecontrol = <ListItemBase>(
          (<FilteredList>(
            element.wizardUI.dialog?.querySelector('filtered-list')
          )).items[0]
        );

        expect(gsecontrol.innerHTML).to.contain('myNewName');
      });

      it('returns back to its starting wizard on secondary action', async () => {
        secondaryAction.click();

        await new Promise(resolve => setTimeout(resolve, 100)); // await animation

        const report = <ListItemBase>(
          (<FilteredList>(
            element.wizardUI.dialog?.querySelector('filtered-list')
          )).items[0]
        );

        expect(report.innerHTML).to.contain('GCB');
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
          element.wizardUI.dialog?.querySelector(
            'wizard-textfield[label="name"]'
          )
        );

        await nameField.updateComplete;
        expect(nameField.value).to.equal(
          doc.querySelectorAll('DataSet')[1].getAttribute('name')
        );
      });

      it('opens a editGseWizard on edit GSE button click', async () => {
        const editGseButton = <HTMLElement>(
          Array.from(
            element.wizardUI.dialog!.querySelectorAll<ListItemBase>(
              'mwc-menu > mwc-list-item'
            )
          ).find(item => item.innerHTML.includes(`[scl.Communication]`))
        );

        await element.wizardUI.dialog?.requestUpdate();
        editGseButton.click();
        await new Promise(resolve => setTimeout(resolve, 100)); // await animation
        const macField = <WizardTextField>(
          element.wizardUI.dialog?.querySelector(
            'wizard-textfield[label="MAC-Address"]'
          )
        );
        await macField.updateComplete;
        expect(macField.value).to.equal(
          doc
            .querySelector('GSE > Address > P[type="MAC-Address"]')
            ?.textContent?.trim()
        );
      });

      it('removes the GSEControl and its referenced elements on remove button click', async () => {
        expect(doc.querySelector('IED[name="IED1"] GSEControl[name="GCB"]')).to
          .exist;
        expect(
          doc.querySelector('IED[name="IED1"] DataSet[name="GooseDataSet1"]')
        ).to.exist;
        expect(doc.querySelector('GSE[cbName="GCB"]')).to.exist;

        const deleteButton = <HTMLElement>(
          Array.from(
            element.wizardUI.dialog!.querySelectorAll<ListItemBase>(
              'mwc-menu > mwc-list-item'
            )
          ).find(item => item.innerHTML.includes(`[remove]`))
        );
        await element.wizardUI.dialog?.requestUpdate();
        deleteButton.click();

        expect(doc.querySelector('IED[name="IED1"] GSEControl[name="GCB"]')).to
          .not.exist;
        expect(
          doc.querySelector('IED[name="IED1"] DataSet[name="GooseDataSet1"]')
        ).to.not.exist;
        expect(doc.querySelector('GSE[cbName="GCB"]')).to.not.exist;
      });
    });

    describe('loading a GSEControl with no connected DataSet', () => {
      beforeEach(async () => {
        gseControl = doc.querySelector('GSEControl[name="GCB2"]')!;
        const wizard = editGseControlWizard(gseControl);
        element.dispatchEvent(newWizardEvent(() => wizard));
        await element.requestUpdate();
      });

      it('does not show edit DataSet button', async () => {
        const editGseButton = <HTMLElement>(
          Array.from(
            element.wizardUI.dialog!.querySelectorAll<ListItemBase>(
              'mwc-menu > mwc-list-item'
            )
          ).find(item => item.innerHTML.includes(`[scl.DataSet]`))
        );

        expect(editGseButton).to.not.exist;
      });
    });

    describe('loading a GSEControl with no connected GSE', () => {
      beforeEach(async () => {
        gseControl = doc.querySelector(
          'IED[name="IED2"] GSEControl[name="GCB"]'
        )!;
        const wizard = editGseControlWizard(gseControl);
        element.dispatchEvent(newWizardEvent(() => wizard));
        await element.requestUpdate();
      });

      it('does not show edit DataSet button', async () => {
        const editGseButton = <HTMLElement>(
          Array.from(
            element.wizardUI.dialog!.querySelectorAll<ListItemBase>(
              'mwc-menu > mwc-list-item'
            )
          ).find(item => item.innerHTML.includes(`[scl.Communication]`))
        );

        expect(editGseButton).to.not.exist;
      });
    });
  });
});
