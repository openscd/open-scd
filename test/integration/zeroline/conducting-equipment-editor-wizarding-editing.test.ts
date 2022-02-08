import { fixture, html, expect } from '@open-wc/testing';

import '../../mock-wizard-editor.js';
import { MockWizardEditor } from '../../mock-wizard-editor.js';

import '../../../src/editors/substation/conducting-equipment-editor.js';
import { ConductingEquipmentEditor } from '../../../src/editors/substation/conducting-equipment-editor.js';
import { WizardTextField } from '../../../src/wizard-textfield.js';

describe('conducting-equipment-editor wizarding editing integration', () => {
  describe('edit wizard', () => {
    let doc: XMLDocument;
    let parent: MockWizardEditor;
    let element: ConductingEquipmentEditor | null;

    let nameField: WizardTextField;
    let descField: WizardTextField;
    let secondaryAction: HTMLElement;
    let primaryAction: HTMLElement;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/valid2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
        await fixture(
          html`<mock-wizard-editor
            ><conducting-equipment-editor
              .element=${doc.querySelector('ConductingEquipment')}
            ></conducting-equipment-editor
          ></mock-wizard-editor>`
        )
      );
      element = parent.querySelector('conducting-equipment-editor');
      await (<HTMLElement>(
        element?.shadowRoot?.querySelector('*[icon="edit"]')
      )).click();
      await parent.updateComplete;

      nameField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-textfield[label="name"]')
      );
      descField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-textfield[label="desc"]')
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
      nameField.value = 'QA1';
      primaryAction.click();
      await parent.updateComplete;
      expect(
        doc.querySelector('ConductingEquipment')?.getAttribute('name')
      ).to.equal(oldName);
    });
    it('changes name attribute on primary action', async () => {
      nameField.value = 'newName';
      primaryAction.click();
      await parent.updateComplete;
      expect(
        doc.querySelector('ConductingEquipment')?.getAttribute('name')
      ).to.equal('newName');
    });
    it('changes desc attribute on primary action', async () => {
      descField.value = 'newDesc';
      primaryAction.click();
      await parent.updateComplete;
      expect(
        doc.querySelector('ConductingEquipment')?.getAttribute('desc')
      ).to.equal('newDesc');
    });
    it('deletes desc attribute if wizard-textfield is deactivated', async () => {
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      descField.nullSwitch!.click();
      await parent.updateComplete;
      primaryAction.click();
      await parent.updateComplete;
      expect(doc.querySelector('ConductingEquipment')?.getAttribute('desc')).to
        .be.null;
    });
  });
  describe('open lnode wizard', () => {
    let doc: XMLDocument;
    let parent: MockWizardEditor;
    let element: ConductingEquipmentEditor | null;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/valid2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
        await fixture(
          html`<mock-wizard-editor
            ><conducting-equipment-editor
              .element=${doc.querySelector('ConductingEquipment')}
            ></conducting-equipment-editor
          ></mock-wizard-editor>`
        )
      );

      element = parent.querySelector('conducting-equipment-editor');

      (<HTMLElement>(
        element?.shadowRoot?.querySelector('*[icon="account_tree"]')
      )).click();
      await parent.updateComplete;
    });
    it('opens lnode wizard ', async () => {
      expect(parent.wizardUI).to.exist;
    });
    it('has two wizard pages', async () => {
      expect(parent.wizardUI.dialogs.length).to.equal(2);
    });
  });
  describe('move action', () => {
    let doc: XMLDocument;
    let parent: MockWizardEditor;
    let element: ConductingEquipmentEditor | null;
    let element2: ConductingEquipmentEditor | null;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/valid2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
        await fixture(
          html`<mock-wizard-editor
            >${Array.from(
              doc?.querySelectorAll(
                'Bay[name="COUPLING_BAY"] > ConductingEquipment'
              ) ?? []
            ).map(
              condEq =>
                html`<conducting-equipment-editor
                  .element=${condEq}
                ></conducting-equipment-editor>`
            )}
            ></mock-wizard-editor
          >`
        )
      );
      element = parent.querySelector(
        'conducting-equipment-editor:nth-child(1)'
      );
      element2 = parent.querySelector(
        'conducting-equipment-editor:nth-child(2)'
      );
    });
    it('moves ConductingEquipment within Bay', async () => {
      expect(
        doc.querySelector('ConductingEquipment')?.getAttribute('name')
      ).to.equal('QA1');
      (<HTMLElement>(
        element2?.shadowRoot?.querySelector('*[icon="forward"]')
      )).click();
      await parent.updateComplete;
      (<HTMLElement>element).click();
      await parent.updateComplete;
      expect(
        doc.querySelector('ConductingEquipment')?.getAttribute('name')
      ).to.equal('QB1');
    });
  });
  describe('remove action', () => {
    let doc: XMLDocument;
    let parent: MockWizardEditor;
    let element: ConductingEquipmentEditor | null;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/valid2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
        await fixture(
          html`<mock-wizard-editor
            ><conducting-equipment-editor
              .element=${doc.querySelector('ConductingEquipment')}
            ></conducting-equipment-editor
          ></mock-wizard-editor>`
        )
      );
      element = parent.querySelector('conducting-equipment-editor');
    });
    it('removes ConductingEquipment on clicking delete button', async () => {
      expect(doc.querySelector('ConductingEquipment[name="QA1"]')).to.exist;
      (<HTMLElement>(
        element?.shadowRoot?.querySelector('*[icon="delete"]')
      )).click();
      await parent.updateComplete;
      expect(doc.querySelector('ConductingEquipment[name="QA1"]')).to.not.exist;
    });
  });
});
