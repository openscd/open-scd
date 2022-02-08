import { fixture, html, expect } from '@open-wc/testing';

import '../../mock-wizard-editor.js';
import { MockWizardEditor } from '../../mock-wizard-editor.js';

import '../../../src/editors/substation/bay-editor.js';
import { BayEditor } from '../../../src/editors/substation/bay-editor.js';
import { Select } from '@material/mwc-select';
import { WizardTextField } from '../../../src/wizard-textfield.js';

describe('bay-editor wizarding editing integration', () => {
  describe('edit wizard', () => {
    let doc: XMLDocument;
    let parent: MockWizardEditor;
    let element: BayEditor | null;

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
            ><bay-editor .element=${doc.querySelector('Bay')}></bay-editor
          ></mock-wizard-editor>`
        )
      );
      element = parent.querySelector('bay-editor');
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
    it('does not change name attribute if not unique within parent element', async () => {
      const oldName = nameField.value;
      nameField.value = 'Bay2';
      primaryAction.click();
      await parent.updateComplete;
      expect(doc.querySelector('Bay')?.getAttribute('name')).to.equal(oldName);
    });
    it('changes name attribute on primary action', async () => {
      parent.wizardUI.inputs[0].value = 'newName';
      primaryAction.click();
      await parent.updateComplete;
      expect(doc.querySelector('Bay')?.getAttribute('name')).to.equal(
        'newName'
      );
    });
    it('changes desc attribute on primary action', async () => {
      descField.value = 'newDesc';
      primaryAction.click();
      await parent.updateComplete;
      expect(doc.querySelector('Bay')?.getAttribute('desc')).to.equal(
        'newDesc'
      );
    });
    it('deletes desc attribute if wizard-textfield is deactivated', async () => {
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      descField.nullSwitch!.click();
      await parent.updateComplete;
      await primaryAction.click();
      await parent.updateComplete;
      expect(doc.querySelector('Bay')?.getAttribute('desc')).to.be.null;
    });
  });

  describe('open add conducting equipment wizard', () => {
    let doc: XMLDocument;
    let parent: MockWizardEditor;
    let element: BayEditor | null;

    let nameField: WizardTextField;
    let typeSelect: Select;
    let primaryAction: HTMLElement;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/valid2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
        await fixture(
          html`<mock-wizard-editor
            ><bay-editor .element=${doc.querySelector('Bay')}></bay-editor
          ></mock-wizard-editor>`
        )
      );

      element = parent.querySelector('bay-editor');

      (<HTMLElement>(
        element?.shadowRoot?.querySelector(
          'mwc-list-item[value="ConductingEquipment"]'
        )
      )).click();
      await parent.updateComplete;

      nameField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-textfield[label="name"]')
      );
      typeSelect = <Select>(
        parent.wizardUI.dialog?.querySelector('mwc-select[label="type"]')
      );
      primaryAction = <HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );
    });

    it('does not add conducting equipment if name attribute is not unique', async () => {
      typeSelect.value = 'CBR';
      nameField.value = 'QA1';
      primaryAction.click();
      await parent.updateComplete;
      expect(
        doc.querySelectorAll(
          'VoltageLevel[name="E1"] > Bay[name="COUPLING_BAY"] > ConductingEquipment[name="QA1"]'
        ).length
      ).to.equal(1);
    });
    it('does add conducting equipment if name attribute is unique', async () => {
      typeSelect.value = 'CBR';
      nameField.value = 'QA2';
      await parent.updateComplete;
      primaryAction.click();
      expect(
        doc.querySelector(
          'VoltageLevel[name="E1"] > Bay[name="COUPLING_BAY"] > ConductingEquipment[name="QA2"]'
        )
      ).to.exist;
    });
  });
  describe('open lnode wizard', () => {
    let doc: XMLDocument;
    let parent: MockWizardEditor;
    let element: BayEditor | null;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/valid2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
        await fixture(
          html`<mock-wizard-editor
            ><bay-editor .element=${doc.querySelector('Bay')}></bay-editor
          ></mock-wizard-editor>`
        )
      );

      element = parent.querySelector('bay-editor');

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
  describe('move action', () => {
    let doc: XMLDocument;
    let parent: MockWizardEditor;
    let element: BayEditor | null;
    let element2: BayEditor | null;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/valid2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
        await fixture(
          html`<mock-wizard-editor
            >${Array.from(doc?.querySelectorAll('Bay') ?? []).map(
              bay => html`<bay-editor .element=${bay}></bay-editor>`
            )}
            ></mock-wizard-editor
          >`
        )
      );
      element = parent.querySelector('bay-editor:nth-child(1)');
      element2 = parent.querySelector('bay-editor:nth-child(2)');
    });
    it('moves Bay within VoltageLevel', async () => {
      expect(doc.querySelector('Bay')?.getAttribute('name')).to.equal(
        'COUPLING_BAY'
      );
      (<HTMLElement>(
        element2?.shadowRoot?.querySelector('mwc-icon-button[icon="forward"]')
      )).click();
      await parent.updateComplete;
      (<HTMLElement>element).click();
      await parent.updateComplete;
      expect(doc.querySelector('Bay')?.getAttribute('name')).to.equal('Bay2');
    });
  });
  describe('remove action', () => {
    let doc: XMLDocument;
    let parent: MockWizardEditor;
    let element: BayEditor | null;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/valid2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
        await fixture(
          html`<mock-wizard-editor
            ><bay-editor
              .element=${doc.querySelector('Bay[name="COUPLING_BAY"]')}
            ></bay-editor
          ></mock-wizard-editor>`
        )
      );
      element = parent.querySelector('bay-editor');
    });
    it('removes Bay on clicking delete button', async () => {
      expect(doc.querySelector('Bay[name="COUPLING_BAY"]')).to.exist;
      (<HTMLElement>(
        element?.shadowRoot?.querySelector('mwc-icon-button[icon="delete"]')
      )).click();
      await parent.updateComplete;
      expect(doc.querySelector('Bay[name="COUPLING_BAY"]')).to.not.exist;
    });
  });
  describe('clone action', () => {
    let doc: XMLDocument;
    let parent: MockWizardEditor;
    let element: BayEditor | null;
    let copyContentButton: HTMLElement;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/valid2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
        await fixture(
          html`<mock-wizard-editor
            ><bay-editor
              .element=${doc.querySelector('Bay[name="COUPLING_BAY"]')}
            ></bay-editor
          ></mock-wizard-editor>`
        )
      );
      element = parent.querySelector('bay-editor');
      await parent.updateComplete;

      copyContentButton = <HTMLElement>(
        element?.shadowRoot?.querySelector(
          'mwc-icon-button[icon="content_copy"]'
        )
      );
    });
    it('duplicates Bay on clicking duplicate button', async () => {
      copyContentButton.click();
      await parent.updateComplete;
      expect(doc.querySelector('Bay[name="COUPLING_BAY1')).to.exist;
    });
    it('removes all LNode elements in the copy', async () => {
      expect(
        doc.querySelector('Bay[name="COUPLING_BAY"]')?.querySelector('LNode')
      ).to.exist;
      copyContentButton.click();
      await parent.updateComplete;
      expect(
        doc
          .querySelector('Bay[name="COUPLING_BAY - copy"]')
          ?.querySelector('LNode')
      ).to.not.exist;
    });
    it('removes all Terminal elements exepct the grounding in the copy', async () => {
      expect(
        doc
          .querySelector('Bay[name="COUPLING_BAY"]')
          ?.querySelector('Terminal:not([cNodeName="grounded"])')
      ).to.exist;
      copyContentButton.click();
      await parent.updateComplete;
      expect(
        doc
          .querySelector('Bay[name="COUPLING_BAY - copy"]')
          ?.querySelector('Terminal:not([cNodeName="grounded"])')
      ).to.not.exist;
    });
    it('removes all ConnectivityNode elements in the copy', async () => {
      expect(
        doc
          .querySelector('Bay[name="COUPLING_BAY"]')
          ?.querySelector('ConnectivityNode')
      ).to.exist;
      copyContentButton.click();
      await parent.updateComplete;
      expect(
        doc
          .querySelector('Bay[name="COUPLING_BAY - copy"]')
          ?.querySelector('ConnectivityNode')
      ).to.not.exist;
    });
    it('keeps all ConductingEquipment elements in the copy', async () => {
      copyContentButton.click();
      await parent.updateComplete;
      expect(
        doc
          .querySelector('Bay[name="COUPLING_BAY1"]')
          ?.querySelectorAll('ConductingEquipment').length
      ).to.equal(
        doc
          .querySelector('Bay[name="COUPLING_BAY"]')
          ?.querySelectorAll('ConductingEquipment').length
      );
    });
  });
});
