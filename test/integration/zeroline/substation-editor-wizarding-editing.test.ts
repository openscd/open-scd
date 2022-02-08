import { fixture, html, expect } from '@open-wc/testing';

import '../../mock-wizard-editor.js';
import { MockWizardEditor } from '../../mock-wizard-editor.js';

import '../../../src/editors/substation/substation-editor.js';
import { SubstationEditor } from '../../../src/editors/substation/substation-editor.js';
import { WizardTextField } from '../../../src/wizard-textfield.js';

describe('substation-editor wizarding editing integration', () => {
  describe('edit wizard', () => {
    let doc: XMLDocument;
    let parent: MockWizardEditor;
    let element: SubstationEditor | null;

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
            ><substation-editor
              .element=${doc.querySelector('Substation')}
            ></substation-editor
          ></mock-wizard-editor>`
        )
      );
      element = parent.querySelector('substation-editor');
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
    it('changes name attribute on primary action', async () => {
      nameField.value = 'newName';
      primaryAction.click();
      await parent.updateComplete;
      expect(doc.querySelector('Substation')?.getAttribute('name')).to.equal(
        'newName'
      );
    });
    it('changes desc attribute on primary action', async () => {
      descField.value = 'newDesc';
      primaryAction.click();
      await parent.updateComplete;
      expect(doc.querySelector('Substation')?.getAttribute('desc')).to.equal(
        'newDesc'
      );
    });
    it('deletes desc attribute if wizard-textfield is deactivated', async () => {
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      descField.nullSwitch!.click();
      await parent.updateComplete;
      primaryAction.click();
      await parent.updateComplete;
      expect(doc.querySelector('Substation')?.getAttribute('desc')).to.be.null;
    });
  });
  describe('open add voltage level wizard', () => {
    let doc: XMLDocument;
    let parent: MockWizardEditor;
    let element: SubstationEditor | null;

    let nameField: WizardTextField;
    let primaryAction: HTMLElement;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/valid2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
        await fixture(
          html`<mock-wizard-editor
            ><substation-editor
              .element=${doc.querySelector('Substation')}
            ></substation-editor
          ></mock-wizard-editor>`
        )
      );

      element = parent.querySelector('substation-editor');

      (<HTMLElement>(
        element?.shadowRoot?.querySelector(
          'mwc-list-item[value="VoltageLevel"]'
        )
      )).click();
      await parent.updateComplete;

      nameField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-textfield[label="name"]')
      );

      primaryAction = <HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );
    });
    it('opens voltage level wizard ', async () => {
      expect(parent.wizardUI).to.exist;
    });
    it('has five wizard inputs', async () => {
      expect(parent.wizardUI.inputs.length).to.equal(5);
    });
    it('does not add voltage level if name attribute is not unique', async () => {
      nameField.value = 'E1';
      primaryAction.click();
      await parent.updateComplete;
      expect(doc.querySelectorAll('VoltageLevel[name="E1"]').length).to.equal(
        1
      );
    });
    it('does add voltage level if name attribute is unique', async () => {
      nameField.value = 'J1';
      primaryAction.click();
      await parent.updateComplete;
      expect(doc.querySelector('VoltageLevel[name="J1"]')).to.exist;
    });
  });
  describe('open lnode wizard', () => {
    let doc: XMLDocument;
    let parent: MockWizardEditor;
    let element: SubstationEditor | null;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/valid2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
        await fixture(
          html`<mock-wizard-editor
            ><substation-editor
              .element=${doc.querySelector('Substation')}
            ></substation-editor
          ></mock-wizard-editor>`
        )
      );

      element = parent.querySelector('substation-editor');

      (<HTMLElement>(
        element?.shadowRoot?.querySelector(
          'mwc-icon-button[icon="account_tree"]'
        )
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
  describe('remove action', () => {
    let doc: XMLDocument;
    let parent: MockWizardEditor;
    let element: SubstationEditor | null;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/valid2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
        await fixture(
          html`<mock-wizard-editor
            ><substation-editor
              .element=${doc.querySelector('Substation')}
            ></substation-editor
          ></mock-wizard-editor>`
        )
      );
      element = parent.querySelector('substation-editor');
    });
    it('removes Substation on clicking delete button', async () => {
      expect(doc.querySelector('Substation')).to.exist;
      (<HTMLElement>(
        element?.shadowRoot?.querySelector('mwc-icon-button[icon="delete"]')
      )).click();
      await parent.updateComplete;
      expect(doc.querySelector('Substation')).to.not.exist;
    });
  });
});
