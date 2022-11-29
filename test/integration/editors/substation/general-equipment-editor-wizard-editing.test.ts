import { expect, fixture, html } from '@open-wc/testing';

import '../../../mock-wizard-editor.js';
import { MockWizardEditor } from '../../../mock-wizard-editor.js';

import '../../../../src/editors/substation/general-equipment-editor.js';
import { GeneralEquipmentEditor } from '../../../../src/editors/substation/general-equipment-editor.js';
import { WizardTextField } from '../../../../src/wizard-textfield.js';

describe('general-equipment-editor wizarding editing integration', () => {
  describe('edit wizard', () => {
    let doc: XMLDocument;
    let parent: MockWizardEditor;
    let element: GeneralEquipmentEditor | null;

    let nameField: WizardTextField;
    let descField: WizardTextField;
    let typeField: WizardTextField;
    let secondaryAction: HTMLElement;
    let primaryAction: HTMLElement;

    beforeEach(async () => {
      doc = await fetch(
        '/test/testfiles/editors/substation/generalequipment.scd'
      )
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
        await fixture(
          html`<mock-wizard-editor
            ><general-equipment-editor
              .element=${doc.querySelector('GeneralEquipment')}
            ></general-equipment-editor
          ></mock-wizard-editor>`
        )
      );

      element = parent.querySelector('general-equipment-editor');
      await (<HTMLElement>(
        element?.shadowRoot?.querySelector('mwc-icon-button[icon="edit"]')
      )).click();
      await parent.updateComplete;

      nameField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-textfield[label="name"]')
      );
      descField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-textfield[label="desc"]')
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
      nameField.value = 'genSub2';
      primaryAction.click();
      await parent.updateComplete;
      expect(
        doc.querySelector('GeneralEquipment')?.getAttribute('name')
      ).to.equal(oldName);
    });
    it('changes name attribute on primary action', async () => {
      parent.wizardUI.inputs[0].value = 'newName';
      primaryAction.click();
      await parent.updateComplete;
      expect(
        doc.querySelector('GeneralEquipment')?.getAttribute('name')
      ).to.equal('newName');
    });
    it('changes type attribute on primary action', async () => {
      parent.wizardUI.inputs[2].value = 'newAXN';
      primaryAction.click();
      await parent.updateComplete;
      expect(
        doc.querySelector('GeneralEquipment')?.getAttribute('type')
      ).to.equal('newAXN');
    });
    it('changes desc attribute on primary action', async () => {
      descField.value = 'newDesc';
      primaryAction.click();
      await parent.updateComplete;
      expect(
        doc.querySelector('GeneralEquipment')?.getAttribute('desc')
      ).to.equal('newDesc');
    });
    it('deletes desc attribute if wizard-textfield is deactivated', async () => {
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      descField.nullSwitch!.click();
      await parent.updateComplete;
      await primaryAction.click();
      await parent.updateComplete;
      expect(doc.querySelector('GeneralEquipment')?.getAttribute('desc')).to.be
        .null;
    });
  });
});
