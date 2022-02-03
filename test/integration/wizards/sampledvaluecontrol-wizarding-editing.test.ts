import { expect, fixture, html } from '@open-wc/testing';

import '../../mock-wizard-editor.js';
import { MockWizardEditor } from '../../mock-wizard-editor.js';

import { Button } from '@material/mwc-button';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

import { FilteredList } from '../../../src/filtered-list.js';
import { WizardTextField } from '../../../src/wizard-textfield.js';
import { selectSampledValueControlWizard } from '../../../src/wizards/sampledvaluecontrol.js';

describe('Wizards for SCL element SampledValueControl', () => {
  let doc: XMLDocument;
  let element: MockWizardEditor;

  beforeEach(async () => {
    element = await fixture(html`<mock-wizard-editor></mock-wizard-editor>`);
    doc = await fetch('/test/testfiles/wizards/sampledvaluecontrol.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('define a select wizards that ', () => {
    let sampledValueControlList: FilteredList;

    beforeEach(async () => {
      const wizard = selectSampledValueControlWizard(doc.documentElement);
      element.workflow.push(() => wizard);
      await element.requestUpdate();

      sampledValueControlList = <FilteredList>(
        element.wizardUI.dialog?.querySelector('filtered-list')
      );
      await sampledValueControlList.updateComplete;
    });

    it('shows all SampledValueControl elements within a project', () =>
      expect(sampledValueControlList.items.length).to.equal(
        doc.querySelectorAll('SampledValueControl').length
      ));

    it('allows to filter SampledValueControl elements per IED', async () => {
      const wizard = selectSampledValueControlWizard(doc.querySelector('IED')!);
      element.workflow.pop();
      element.workflow.push(() => wizard);
      await element.requestUpdate();

      sampledValueControlList = <FilteredList>(
        element.wizardUI.dialog?.querySelector('filtered-list')
      );
      await sampledValueControlList.updateComplete;

      expect(sampledValueControlList.items.length).to.equal(
        doc.querySelector('IED')!.querySelectorAll('SampledValueControl').length
      );
    });

    it('opens edit wizard for selected SampledValueControl element on click', async () => {
      const reportItem = <ListItemBase>sampledValueControlList.items[0];
      reportItem.click();
      await new Promise(resolve => setTimeout(resolve, 20)); // await animation

      const nameField = <WizardTextField>(
        element.wizardUI.dialog?.querySelector('wizard-textfield[label="name"]')
      );
      await nameField.requestUpdate();

      expect(nameField.value).to.equal(
        doc.querySelectorAll('SampledValueControl')[0].getAttribute('name')
      );
    });
  });

  describe('defines an edit wizard that', () => {
    let nameField: WizardTextField;
    let secondaryAction: HTMLElement;
    let primaryAction: HTMLElement;
    let parentIED: Element;

    describe('loaded without SMV element reference', () => {
      beforeEach(async () => {
        element.workflow.length = 0; // remove all wizard from FIFO queue
        parentIED = doc.querySelectorAll('IED')[1];
        element.workflow.push(() => selectSampledValueControlWizard(parentIED));
        await element.requestUpdate();
        await new Promise(resolve => setTimeout(resolve, 20)); // await animation

        const sampledValueControlBlock = <ListItemBase>(
          (<FilteredList>(
            element.wizardUI.dialog?.querySelector('filtered-list')
          )).items[0]
        );
        sampledValueControlBlock.click();
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
          parentIED
            .querySelectorAll('SampledValueControl')[0]
            ?.getAttribute('name')
        ).to.not.equal('4adsasd');

        nameField.value = '4adsasd';
        await element.requestUpdate();
        primaryAction.click();

        expect(
          parentIED
            .querySelectorAll('SampledValueControl')[0]
            ?.getAttribute('name')
        ).to.not.equal('4adsasd');
      });

      it('edits name attribute on primary action', async () => {
        expect(
          parentIED
            .querySelectorAll('SampledValueControl')[0]
            ?.getAttribute('name')
        ).to.not.equal('myNewName');

        nameField.value = 'myNewName';
        await element.requestUpdate();
        primaryAction.click();

        expect(
          parentIED
            .querySelectorAll('SampledValueControl')[0]
            ?.getAttribute('name')
        ).to.equal('myNewName');
      });

      it('dynamically updates wizards after attribute change', async () => {
        nameField.value = 'myNewName';
        primaryAction.click();

        await new Promise(resolve => setTimeout(resolve, 20)); // await animation

        const sampledValueControlBlock = <ListItemBase>(
          (<FilteredList>(
            element.wizardUI.dialog?.querySelector('filtered-list')
          )).items[0]
        );

        expect(sampledValueControlBlock.innerHTML).to.contain('myNewName');
      });

      it('returns back to its starting wizard on secondary action', async () => {
        secondaryAction.click();

        await new Promise(resolve => setTimeout(resolve, 100)); // await animation

        const sampledValueControlBlock = <ListItemBase>(
          (<FilteredList>(
            element.wizardUI.dialog?.querySelector('filtered-list')
          )).items[0]
        );

        expect(sampledValueControlBlock.innerHTML).to.contain('MSVCB01');
      });

      it('does not render SMV edit button', async () => {
        const editSMvButton = <Button>(
          element.wizardUI.dialog!.querySelector('mwc-button[id="editsmv"]')!
        );
        expect(editSMvButton).not.to.exist;
      });
    });

    describe('loaded with SMV element reference', () => {
      beforeEach(async () => {
        element.workflow.length = 0; // remove all wizard from FIFO queue
        parentIED = doc.querySelectorAll('IED')[2];
        element.workflow.push(() => selectSampledValueControlWizard(parentIED));
        await element.requestUpdate();
        await new Promise(resolve => setTimeout(resolve, 20)); // await animation

        const sampledValueControlBlock = <ListItemBase>(
          (<FilteredList>(
            element.wizardUI.dialog?.querySelector('filtered-list')
          )).items[0]
        );
        sampledValueControlBlock.click();
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

      it('opens a edit wizard for SMV on edit SMV button click', async () => {
        const editSMvButton = <Button>(
          element.wizardUI.dialog!.querySelector('mwc-button[id="editsmv"]')!
        );
        expect(editSMvButton).to.exist;

        await editSMvButton.updateComplete;
        editSMvButton.click();
        await new Promise(resolve => setTimeout(resolve, 100)); // await animation

        const macField = <WizardTextField>(
          element.wizardUI.dialog?.querySelector(
            'wizard-textfield[label="MAC-Address"]'
          )
        );
        await macField.updateComplete;

        expect(macField.value).to.equal(
          doc
            .querySelector('SMV > Address > P[type="MAC-Address"]')
            ?.textContent?.trim()
        );
      });
    });
  });
});
