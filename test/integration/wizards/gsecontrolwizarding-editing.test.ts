import { expect, fixture, html } from '@open-wc/testing';

import '../../mock-wizard-editor.js';
import { MockWizardEditor } from '../../mock-wizard-editor.js';

import { Button } from '@material/mwc-button';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

import {
  editGseControlWizard,
  selectGseControlWizard,
} from '../../../src/wizards/gsecontrol.js';
import { FilteredList } from '../../../src/filtered-list.js';
import { WizardTextField } from '../../../src/wizard-textfield.js';

describe('gsecontrol wizarding editing integration', () => {
  let doc: XMLDocument;
  let element: MockWizardEditor;

  beforeEach(async () => {
    element = await fixture(html`<mock-wizard-editor></mock-wizard-editor>`);
    doc = await fetch('/base/test/testfiles/wizards/gsecontrol.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('selectGseControlWizard', () => {
    let gseControlList: FilteredList;

    beforeEach(async () => {
      const wizard = selectGseControlWizard(doc.documentElement);
      element.workflow.push(wizard);
      await element.requestUpdate();
      gseControlList = <FilteredList>(
        element.wizardUI.dialog?.querySelector('filtered-list')
      );
      await gseControlList.updateComplete;
    });
    it('shows all GSEControl within an IED or SCL', () => {
      expect(gseControlList.items.length).to.equal(
        doc.querySelectorAll('GSEControl').length
      );
    });
    it('opens editGseControlWizard on filtered-list item click', async () => {
      const gse2 = <ListItemBase>gseControlList.items[1];
      await gse2.updateComplete;
      gse2.click();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      await element.wizardUI.dialog?.updateComplete;
      const nameField = <WizardTextField>(
        element.wizardUI.dialog?.querySelector('wizard-textfield[label="name"]')
      );
      await nameField.updateComplete;
      expect(nameField.value).to.equal(
        doc.querySelectorAll('GSEControl')[1].getAttribute('name')
      );
    });
  });

  describe('editGseControlWizard', () => {
    let nameField: WizardTextField;
    let primaryAction: HTMLElement;
    let gseControl: Element;

    describe('loading a GSEControl with connected DataSet and GSE element', () => {
      beforeEach(async () => {
        gseControl = doc.querySelector('GSEControl[name="GCB"]')!;
        const wizard = editGseControlWizard(gseControl);
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

      it('rejects name attribute starting with decimals', async () => {
        nameField.value = '4adsasd';
        primaryAction.click();
        expect(gseControl.getAttribute('name')).to.not.equal('4adsasd');
      });

      it('edits name attribute on primary action', async () => {
        nameField.value = 'myNewName';
        primaryAction.click();
        expect(gseControl.getAttribute('name')).to.not.equal('myNewName');
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
          doc.querySelectorAll('DataSet')[1].getAttribute('name')
        );
      });

      it('opens a editGseWizard on edit GSE button click', async () => {
        const editGseButton = <Button>(
          element.wizardUI.dialog!.querySelector('mwc-button[id="editgse"]')!
        );
        expect(editGseButton).to.exist;

        await editGseButton.updateComplete;
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
        const deleteButton = <Button>(
          element.wizardUI.dialog!.querySelector('mwc-button[icon="delete"]')!
        );
        await deleteButton.updateComplete;
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
    });

    describe('loading a GSEControl with no connected GSE', () => {
      beforeEach(async () => {
        gseControl = doc.querySelector(
          'IED[name="IED2"] GSEControl[name="GCB"]'
        )!;
        const wizard = editGseControlWizard(gseControl);
        element.workflow.push(wizard);
        await element.requestUpdate();
      });

      it('does not show edit DataSet button', async () => {
        const editGseButton = <Button>(
          element.wizardUI.dialog!.querySelector('mwc-button[id="editgse"]')!
        );
        expect(editGseButton).to.not.exist;
      });
    });
  });
});
