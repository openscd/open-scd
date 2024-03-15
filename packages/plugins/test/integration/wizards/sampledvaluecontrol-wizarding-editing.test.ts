import { expect, fixture, html } from '@open-wc/testing';

import '@openscd/open-scd/test/mock-wizard-editor.js';
import { MockWizardEditor } from '@openscd/open-scd/test/mock-wizard-editor.js';

import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

import { FilteredList } from '@openscd/open-scd/src/filtered-list.js';
import { WizardTextField } from '@openscd/open-scd/src/wizard-textfield.js';
import {
  createSampledValueControlWizard,
  selectSampledValueControlWizard,
} from '../../../src/wizards/sampledvaluecontrol.js';
import { WizardCheckbox } from '@openscd/open-scd/src/wizard-checkbox.js';
import { FinderList } from '@openscd/open-scd/src/finder-list.js';
import { newWizardEvent } from '@openscd/open-scd/src/foundation.js';

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

    describe('with the document element as input', () => {
      beforeEach(async () => {
        const wizard = selectSampledValueControlWizard(doc.documentElement);
        element.dispatchEvent(newWizardEvent(() => wizard));
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

      it('opens edit wizard for selected SampledValueControl element on click', async () => {
        const reportItem = <ListItemBase>sampledValueControlList.items[0];
        reportItem.click();
        await new Promise(resolve => setTimeout(resolve, 20)); // await animation

        const nameField = <WizardTextField>(
          element.wizardUI.dialog?.querySelector(
            'wizard-textfield[label="name"]'
          )
        );
        await nameField.requestUpdate();

        expect(nameField.value).to.equal(
          doc.querySelectorAll('SampledValueControl')[0].getAttribute('name')
        );
      });

      describe('has an add SampledValueControl primary button that', () => {
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

        it('opens a potential list of host IEDs for the SampledValueControl element', async () =>
          expect(iEDPicker).to.exist);
      });
    });

    describe('with a specific IED as input', () => {
      beforeEach(async () => {
        const wizard = selectSampledValueControlWizard(
          doc.querySelector('IED[name="IED3"]')!
        );
        element.dispatchEvent(newWizardEvent(() => wizard));
        await element.requestUpdate();

        sampledValueControlList = <FilteredList>(
          element.wizardUI.dialog?.querySelector('filtered-list')
        );
        await sampledValueControlList.updateComplete;
      });

      it('shows all SampledValueControl elements within an IED', () =>
        expect(sampledValueControlList.items.length).to.equal(
          doc.querySelectorAll('IED[name="IED3"] SampledValueControl').length
        ));

      it('opens edit wizard for selected SampledValueControl element on click', async () => {
        const reportItem = <ListItemBase>sampledValueControlList.items[0];
        reportItem.click();
        await new Promise(resolve => setTimeout(resolve, 20)); // await animation

        const nameField = <WizardTextField>(
          element.wizardUI.dialog?.querySelector(
            'wizard-textfield[label="name"]'
          )
        );
        await nameField.requestUpdate();

        expect(nameField.value).to.equal(
          doc.querySelectorAll('SampledValueControl')[0].getAttribute('name')
        );
      });

      describe('has an add SampledValueControl primary button that', () => {
        let nameField: WizardTextField;
        beforeEach(async () => {
          const primaryAction = <HTMLElement>(
            element.wizardUI.dialog?.querySelector(
              'mwc-button[slot="primaryAction"]'
            )
          );

          primaryAction.click();
          await new Promise(resolve => setTimeout(resolve, 20)); // await animation

          nameField = <WizardTextField>(
            element.wizardUI.dialog?.querySelector(
              'wizard-textfield[label="name"]'
            )
          );
        });

        it('opens the create wizard for the SampledValueControl element', async () =>
          expect(nameField).to.exist);
      });
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
        element.dispatchEvent(
          newWizardEvent(() => selectSampledValueControlWizard(parentIED))
        );

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
        const editSMvButton = <HTMLElement>(
          Array.from(
            element.wizardUI.dialog!.querySelectorAll<ListItemBase>(
              'mwc-menu > mwc-list-item'
            )
          ).find(item => item.innerHTML.includes(`[scl.Communication]`))
        );

        await element.wizardUI.dialog?.requestUpdate();
        expect(editSMvButton).not.to.exist;
      });
    });

    describe('loaded with SMV element reference', () => {
      beforeEach(async () => {
        element.workflow.length = 0; // remove all wizard from FIFO queue
        parentIED = doc.querySelectorAll('IED')[2];
        element.dispatchEvent(
          newWizardEvent(() => selectSampledValueControlWizard(parentIED))
        );
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
        const editSMvButton = <HTMLElement>(
          Array.from(
            element.wizardUI.dialog!.querySelectorAll<ListItemBase>(
              'mwc-menu > mwc-list-item'
            )
          ).find(item => item.innerHTML.includes(`[scl.Communication]`))
        );

        await element.wizardUI.dialog?.requestUpdate();
        expect(editSMvButton).to.exist;

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

      it('opens a edit wizard for SMV on edit SMV button click', async () => {
        const editSmvOptsButton = <HTMLElement>(
          Array.from(
            element.wizardUI.dialog!.querySelectorAll<ListItemBase>(
              'mwc-menu > mwc-list-item'
            )
          ).find(item => item.innerHTML.includes(`[scl.SmvOpts]`))
        );

        await element.wizardUI.dialog?.requestUpdate();
        expect(editSmvOptsButton).to.exist;

        editSmvOptsButton.click();
        await new Promise(resolve => setTimeout(resolve, 100)); // await animation

        const macField = <WizardCheckbox>(
          element.wizardUI.dialog?.querySelector(
            'wizard-checkbox[label="refreshTime"]'
          )
        );
        await macField.updateComplete;

        expect(macField).to.exist;
      });

      it('removes the SampledValueControl element and its referenced elements on remove button click', async () => {
        expect(
          doc.querySelector(
            'IED[name="IED3"] SampledValueControl[name="MSVCB01"]'
          )
        ).to.exist;
        expect(doc.querySelector('IED[name="IED3"] DataSet[name="PhsMeas1"]'))
          .to.exist;
        expect(doc.querySelector('SMV[cbName="MSVCB01"]')).to.exist;

        const deleteButton = <HTMLElement>(
          Array.from(
            element.wizardUI.dialog!.querySelectorAll<ListItemBase>(
              'mwc-menu > mwc-list-item'
            )
          ).find(item => item.innerHTML.includes(`[remove]`))
        );

        await element.wizardUI.dialog?.requestUpdate();
        deleteButton.click();

        expect(
          doc.querySelector(
            'IED[name="IED3"] SampledValueControl[name="MSVCB01"]'
          )
        ).to.not.exist;
        expect(doc.querySelector('IED[name="IED3"] DataSet[name="PhsMeas1"]'))
          .to.not.exist;
        expect(doc.querySelector('SMV[cbName="MSVCB01"]')).to.not.exist;
      });
    });
  });

  describe('defines a create wizards that', () => {
    let primaryAction: HTMLElement;

    beforeEach(async () => {
      const wizard = createSampledValueControlWizard(
        doc.querySelector('IED[name="IED3"] LN0')!
      );
      element.dispatchEvent(newWizardEvent(() => wizard));
      await element.requestUpdate();

      (<WizardTextField>(
        element.wizardUI.dialogs[0].querySelector(
          'wizard-textfield[label="smvID"]'
        )
      )).maybeValue = 'wer'; // is empty string per default that must be non empty

      primaryAction = <HTMLElement>(
        element.wizardUI.dialogs[3]?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );
    });

    it('creates a new instance of a SampledValueControl element', () => {
      expect(
        doc.querySelectorAll('IED[name="IED3"] LN0 > SampledValueControl')
      ).to.have.lengthOf(1);

      primaryAction.click();

      expect(
        doc.querySelectorAll('IED[name="IED3"] LN0 > SampledValueControl')
      ).to.have.lengthOf(2);
    });

    it('creates a new instance of a DataSet element referenced from SampledValueControl', () => {
      expect(
        doc.querySelectorAll('IED[name="IED3"] LN0 > DataSet')
      ).to.have.lengthOf(1);

      primaryAction.click();

      expect(
        doc.querySelectorAll('IED[name="IED3"] LN0 > DataSet')
      ).to.have.lengthOf(2);
    });

    it('creates a new instance of a SMV element', () => {
      expect(
        doc.querySelectorAll('ConnectedAP[iedName="IED3"][apName="P1"] SMV')
      ).to.have.lengthOf(1);

      primaryAction.click();

      expect(
        doc.querySelectorAll('ConnectedAP[iedName="IED3"][apName="P1"] SMV')
      ).to.have.lengthOf(2);
    });
  });
});
