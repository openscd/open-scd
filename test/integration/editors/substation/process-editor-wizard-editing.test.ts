import { expect, fixture, html } from '@open-wc/testing';

import '../../../mock-wizard-editor.js';
import { MockWizardEditor } from '../../../mock-wizard-editor.js';

import '../../../../src/editors/substation/process-editor.js';
import { ProcessEditor } from '../../../../src/editors/substation/process-editor.js';
import { WizardTextField } from '../../../../src/wizard-textfield.js';

describe('process-editor wizarding editing integration', () => {
  let doc: XMLDocument;
  let parent: MockWizardEditor;
  let element: ProcessEditor | null;

  describe('edit wizard', () => {
    let nameField: WizardTextField;
    let descField: WizardTextField;
    let typeField: WizardTextField;

    let primaryAction: HTMLElement;
    let secondaryAction: HTMLElement;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/editors/substation/Process.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
        await fixture(
          html`<mock-wizard-editor
            ><process-editor
              .element=${doc.querySelector('Process[name="ProcessGenConduct"]')}
            ></process-editor
          ></mock-wizard-editor>`
        )
      );
      element = parent.querySelector('process-editor');
      await (<HTMLElement>(
        element?.shadowRoot?.querySelector('mwc-icon-button[icon="edit"]')
      )).click();
      await parent.updateComplete;

      nameField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-textfield[label="name"]')
      );

      typeField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-textfield[label="type"]')
      );

      secondaryAction = <HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="secondaryAction"]'
        )
      );
      primaryAction = <HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );
    });
    it('closes on secondary action', async () => {
      secondaryAction.click();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      expect(parent.wizardUI.dialog).to.not.exist;
    });

    it('does not change name attribute if not unique within parent element', async () => {
      const oldName = nameField.value;
      nameField.value = 'ProcProcSubAA1';
      primaryAction.click();
      await parent.updateComplete;
      expect(
        doc
          .querySelector('Process[name="ProcessGenConduct"]')
          ?.getAttribute('name')
      ).to.equal(oldName);
    });

    it('changes name attribute on primary action', async () => {
      nameField.value = 'newName';
      primaryAction.click();
      await parent.updateComplete;
      expect(doc.querySelector('Process')?.getAttribute('name')).to.equal(
        'newName'
      );
    });

    it('changes desc attribute on primary action', async () => {
      descField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-textfield[label="desc"]')
      );
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      descField.nullSwitch!.click();
      await parent.updateComplete;
      descField.value = 'newDesc';
      console.log(descField.value);
      primaryAction.click();
      await parent.updateComplete;
      expect(
        doc
          .querySelector('Process[name="ProcessGenConduct"]')
          ?.getAttribute('desc')
      ).to.equal('newDesc');
    });

    it('deletes desc attribute if wizard-textfield is deactivated', async () => {
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      descField.nullSwitch!.click();
      await parent.updateComplete;
      await primaryAction.click();
      await parent.updateComplete;
      expect(
        doc
          .querySelector('Process[name="ProcessGenConduct"]')
          ?.getAttribute('desc')
      ).to.be.null;
    });

    it('changes type attribute on primary action', async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
      typeField.nullSwitch!.click();
      await parent.updateComplete;
      typeField.value = 'newType';
      primaryAction.click();
      await parent.updateComplete;
      expect(
        doc
          .querySelector('Process[name="ProcessGenConduct"]')
          ?.getAttribute('type')
      ).to.equal('newType');
    });
  });
});
