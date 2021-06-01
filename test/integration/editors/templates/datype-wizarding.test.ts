import { html, fixture, expect } from '@open-wc/testing';

import TemplatesPlugin from '../../../../src/editors/Templates.js';
import { MockWizardEditor } from '../../../mock-wizard-editor.js';

import { Select } from '@material/mwc-select';
import { WizardTextField } from '../../../../src/wizard-textfield.js';
import { FilteredList } from '../../../../src/filtered-list.js';
import { ListItem } from '@material/mwc-list/mwc-list-item';

describe('DAType wizards', () => {
  let doc: Document;
  customElements.define('templates-editor', TemplatesPlugin);
  let parent: MockWizardEditor;
  let templates: TemplatesPlugin;
  let dATypeList: FilteredList;

  beforeEach(async () => {
    parent = await fixture(
      html`<mock-wizard-editor
        ><templates-editor></templates-editor
      ></mock-wizard-editor>`
    );

    templates = <TemplatesPlugin>parent.querySelector('templates-editor')!;

    doc = await fetch('/base/test/testfiles/datypes.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    templates.doc = doc;
    await templates.updateComplete;
    dATypeList = <FilteredList>(
      templates.shadowRoot?.querySelector('filtered-list[id="datypelist"]')
    );
  });

  describe('defines a createDATypeWizard', () => {
    let selector: Select;
    let idField: WizardTextField;
    let primayAction: HTMLElement;
    beforeEach(async () => {
      const button = <HTMLElement>(
        templates?.shadowRoot?.querySelector(
          'mwc-icon-button[icon="playlist_add"]'
        )
      );
      button.click();
      await parent.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      selector = <Select>(
        parent.wizardUI.dialog?.querySelector('mwc-select[label="values"]')
      );
      idField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-textfield[label="id"]')
      );
      primayAction = <HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );
    });

    it('looks like the latest snapshot', () => {
      expect(parent.wizardUI.dialog).to.equalSnapshot();
    });

    it('allows to add empty DATypes to the project', async () => {
      expect(doc.querySelector('DAType[id="myGeneralDAType"]')).to.not.exist;
      idField.maybeValue = 'myGeneralDAType';
      await parent.requestUpdate();
      primayAction.click();
      await parent.updateComplete;
      expect(doc.querySelector('DAType[id="myGeneralDAType"]')).to.exist;
    });
    it('respects the sequence defined in the standard', async () => {
      idField.maybeValue = 'myGeneralDAType';
      await parent.requestUpdate();
      primayAction.click();
      await parent.updateComplete;
      const element = doc.querySelector('DAType[id="myGeneralDAType"]');
      expect(element?.nextElementSibling?.tagName).to.equal('DAType');
      expect(element?.previousElementSibling?.tagName).to.equal('DOType');
    });
    it('recursevly add missing! subsequent EnumType elements', async () => {
      expect(doc.querySelector('DAType[id="myOriginator"]')).to.not.exist;
      selector.value = 'OpenSCD_Originator';
      idField.maybeValue = 'myOriginator';
      await parent.requestUpdate();
      primayAction.click();
      await parent.updateComplete;
      expect(doc.querySelector('DAType[id="myOriginator"]')).to.exist;
      expect(doc.querySelector('EnumType[id="OriginatorCategoryKind"]')).to
        .exist;
      expect(
        doc.querySelectorAll('EnumType[id="OriginatorCategoryKind"]').length
      ).to.equal(1);
    });
    it('recursevly add missing! subsequent DAType elements', async () => {
      expect(doc.querySelector('DAType[id="OpenSCD_AnalogueValueFloat32"]')).to
        .not.exist;
      selector.value = 'OpenSCD_RangeConfig';
      idField.maybeValue = 'myOriginator';
      await parent.requestUpdate();
      primayAction.click();
      await parent.updateComplete;
      expect(doc.querySelector('DAType[id="OpenSCD_AnalogueValueFloat32"]')).to
        .exist;
      expect(
        doc.querySelectorAll('DAType[id="OpenSCD_AnalogueValueFloat32"]').length
      ).to.equal(1);
    });
  });

  describe('defines a dATypeWizard', () => {
    let idField: WizardTextField;
    let primayAction: HTMLElement;
    let deleteButton: HTMLElement;

    beforeEach(async () => {
      (<ListItem>(
        dATypeList.querySelector('mwc-list-item[value="#Dummy.LLN0.Mod.SBOw"]')
      )).click();
      await parent.requestUpdate();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      idField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-textfield[label="id"]')
      );
      primayAction = <HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );
      deleteButton = <HTMLElement>(
        parent.wizardUI.dialog?.querySelector('mwc-button[icon="delete"]')
      );
    });

    it('looks like the latest snapshot', () => {
      expect(parent.wizardUI.dialog).to.equalSnapshot();
    });
    it('edits DAType attributes id', async () => {
      expect(doc.querySelector('DAType[id="Dummy.LLN0.Mod.SBOw"]')).to.exist;
      idField.value = 'changedDAType';
      await parent.requestUpdate();
      primayAction.click();
      await parent.requestUpdate();
      expect(doc.querySelector('DAType[id="Dummy.LLN0.Mod.SBOw"]')).to.not
        .exist;
      expect(doc.querySelector('DAType[id="changedDAType"]')).to.exist;
    });
    it('deletes the DAType attribute on delete button click', async () => {
      expect(doc.querySelector('DAType[id="Dummy.LLN0.Mod.SBOw"]')).to.exist;
      expect(doc.querySelectorAll('DAType').length).to.equal(5);
      deleteButton.click();
      await parent.requestUpdate();
      expect(doc.querySelector('DAType[id="Dummy.LLN0.Mod.SBOw"]')).to.not
        .exist;
      expect(doc.querySelectorAll('DAType').length).to.equal(4);
    });
    it('does not edit DAType element without changes', async () => {
      const originData = (<Element>(
        doc.querySelector('DAType[id="Dummy.LLN0.Mod.SBOw"]')
      )).cloneNode(true);
      primayAction.click();
      await parent.requestUpdate();
      expect(
        originData.isEqualNode(
          doc.querySelector('DAType[id="Dummy.LLN0.Mod.SBOw"]')
        )
      ).to.be.true;
    });
  });

  describe('defines a bDAWizard to edit an existing BDA', () => {
    let nameField: WizardTextField;
    let primayAction: HTMLElement;
    let deleteButton: HTMLElement;
    let bTypeSelect: Select;
    let typeSelect: Select;

    beforeEach(async () => {
      (<ListItem>(
        dATypeList.querySelector('mwc-list-item[value="#Dummy.LLN0.Mod.SBOw"]')
      )).click();
      await parent.requestUpdate();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      (<HTMLElement>(
        parent.wizardUI?.dialog?.querySelector(
          'mwc-list-item[value="#Dummy.LLN0.Mod.SBOw>ctlVal"]'
        )
      )).click();
      await parent.requestUpdate();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation

      nameField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-textfield[label="name"]')
      );
      primayAction = <HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );
      deleteButton = <HTMLElement>(
        parent.wizardUI.dialog?.querySelector('mwc-button[icon="delete"]')
      );
      bTypeSelect = <Select>(
        parent.wizardUI.dialog?.querySelector('mwc-select[label="bType"]')
      );
      typeSelect = <Select>(
        parent.wizardUI.dialog?.querySelector('mwc-select[label="type"]')
      );
    });

    it('looks like the latest snapshot', () => {
      expect(parent.wizardUI.dialog).to.equalSnapshot();
    });
    it('edits BDA attributes name', async () => {
      expect(
        doc.querySelector(
          'DAType[id="Dummy.LLN0.Mod.SBOw"] > BDA[name="ctlVal"]'
        )
      ).to.exist;
      nameField.value = 'newCtlVal';
      await parent.requestUpdate();
      primayAction.click();
      await parent.requestUpdate();
      expect(
        doc.querySelector(
          'DAType[id="Dummy.LLN0.Mod.SBOw"] > BDA[name="ctlVal"]'
        )
      ).to.not.exist;
      expect(
        doc.querySelector(
          'DAType[id="Dummy.LLN0.Mod.SBOw"] > BDA[name="newCtlVal"]'
        )
      ).to.exist;
    });
    it('deletes the BDA element on delete button click', async () => {
      expect(
        doc.querySelector(
          'DAType[id="Dummy.LLN0.Mod.SBOw"] > BDA[name="ctlVal"]'
        )
      ).to.exist;
      expect(
        doc.querySelectorAll('DAType[id="Dummy.LLN0.Mod.SBOw"] > BDA').length
      ).to.equal(6);
      deleteButton.click();
      await parent.requestUpdate();
      expect(
        doc.querySelector(
          'DAType[id="Dummy.LLN0.Mod.SBOw"] > BDA[name="ctlVal"]'
        )
      ).to.not.exist;
      expect(
        doc.querySelectorAll('DAType[id="Dummy.LLN0.Mod.SBOw"] > BDA').length
      ).to.equal(5);
    });
    it('does not edit BDA element without changes', async () => {
      const originData = (<Element>(
        doc.querySelector(
          'DAType[id="Dummy.LLN0.Mod.SBOw"] > BDA[name="ctlVal"]'
        )
      )).cloneNode(true);
      primayAction.click();
      await parent.requestUpdate();
      expect(
        originData.isEqualNode(
          doc.querySelector(
            'DAType[id="Dummy.LLN0.Mod.SBOw"] > BDA[name="ctlVal"]'
          )
        )
      ).to.be.true;
    });
    it('filters the type selector to EnumTypes if bType is Enum', () => {
      expect(
        Array.from(typeSelect!.querySelectorAll('mwc-list-item')).find(
          item =>
            (<ListItem>item).className === 'Enum' &&
            (<ListItem>item).style.display === 'none'
        )
      ).to.be.undefined;
    });
    it('filters the type selector to DATypes if bType is Struct', async () => {
      bTypeSelect.value = 'Struct';
      await parent.requestUpdate();
      expect(
        Array.from(typeSelect!.querySelectorAll('mwc-list-item')).find(
          item =>
            (<ListItem>item).className === 'Struct' &&
            (<ListItem>item).style.display === 'none'
        )
      ).to.be.undefined;
    });
    it('disables the type selector if bType is not Enum nor Struct', async () => {
      expect(typeSelect.disabled).to.be.false;
      bTypeSelect.value = 'BOOLEAN';
      await parent.requestUpdate();
      expect(typeSelect.disabled).to.be.true;
    });
  });

  describe('defines a bDAWizard to create a new BDA element', () => {
    let nameField: WizardTextField;
    let descField: WizardTextField;
    let sAddrField: WizardTextField;
    let bTypeSelect: Select;
    let typeSelect: Select;
    let valKindSelect: Select;
    let valImportSelect: Select;
    let primayAction: HTMLElement;

    beforeEach(async () => {
      (<ListItem>(
        dATypeList.querySelector('mwc-list-item[value="#Dummy.LLN0.Mod.SBOw"]')
      )).click();
      await parent.requestUpdate();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      (<HTMLElement>(
        parent.wizardUI.dialog?.querySelector('mwc-button[icon="playlist_add"]')
      )).click();
      await parent.requestUpdate();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation

      nameField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-textfield[label="name"]')
      );
      descField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-textfield[label="desc"]')
      );
      sAddrField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-textfield[label="sAddr"]')
      );
      bTypeSelect = <Select>(
        parent.wizardUI.dialog?.querySelector('mwc-select[label="bType"]')
      );
      typeSelect = <Select>(
        parent.wizardUI.dialog?.querySelector('mwc-select[label="type"]')
      );
      valKindSelect = <Select>(
        parent.wizardUI.dialog?.querySelector('mwc-select[label="valKind"]')
      );
      valImportSelect = <Select>(
        parent.wizardUI.dialog?.querySelector('mwc-select[label="valImport"]')
      );
      primayAction = <HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );
    });

    it('looks like the latest snapshot', () => {
      expect(parent.wizardUI.dialog).to.equalSnapshot();
    });
    it('creates a new BDA element', async () => {
      expect(
        doc.querySelector(
          'DAType[id="Dummy.LLN0.Mod.SBOw"] > BDA[name="newBDAElement"]'
        )
      ).to.not.exist;
      nameField.value = 'newBDAElement';
      await parent.requestUpdate();
      primayAction.click();
      await parent.requestUpdate();
      expect(
        doc.querySelector(
          'DAType[id="Dummy.LLN0.Mod.SBOw"] > BDA[name="newBDAElement"]:not([desc]):not([sAddr])[bType="Struct"][type="Dummy.LPHD1.Sim.Cancel"]:not([valKind]):not([valImport])'
        )
      ).to.exist;
    });
    it('creates yet another new BDA element', async () => {
      const name = 'newBDAElement2';
      const desc = 'newBDAdesc';
      const sAddr = 'myNewAddr';
      const valKind = 'RO';
      const valImport = 'true';
      expect(
        doc.querySelector(
          'DAType[id="Dummy.LLN0.Mod.SBOw"] > BDA[name="newBDAElement2"]'
        )
      ).to.not.exist;
      nameField.value = name;
      descField.nullable = false;
      descField.value = desc;
      sAddrField.nullable = false;
      sAddrField.value = sAddr;
      bTypeSelect.value = 'BOOLEAN';
      valKindSelect.value = 'RO';
      valImportSelect.value = 'true';

      await parent.requestUpdate();
      primayAction.click();
      await parent.requestUpdate();
      expect(
        doc.querySelector(
          `DAType[id="Dummy.LLN0.Mod.SBOw"] >` +
            `BDA[name="${name}"][desc="${desc}"][sAddr="${sAddr}"][bType="BOOLEAN"]:not([type])[valKind="RO"][valImport="true"]`
        )
      ).to.exist;
    });
  });
});
