import { html, fixture, expect } from '@open-wc/testing';

import '../../mock-wizard-editor.js';
import { MockWizardEditor } from '../../mock-wizard-editor.js';

import { ListItem } from '@material/mwc-list/mwc-list-item';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

import { FilteredList } from '../../../src/filtered-list.js';
import { WizardSelect } from '../../../src/wizard-select.js';
import { WizardTextField } from '../../../src/wizard-textfield.js';
import TemplatesPlugin from '../../../src/editors/Templates.js';
import { WizardCheckbox } from '../../../src/wizard-checkbox.js';

describe('BDA wizarding editing integration', () => {
  if (customElements.get('templates-editor') === undefined)
    customElements.define('templates-editor', TemplatesPlugin);
  let doc: Document;
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

    doc = await fetch('/test/testfiles/templates/datypes.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    templates.doc = doc;
    await templates.updateComplete;
    dATypeList = <FilteredList>(
      templates.shadowRoot?.querySelector('filtered-list[id="datypelist"]')
    );
  });

  describe('defines a editBDaWizard to edit an existing BDA', () => {
    let nameField: WizardTextField;
    let primayAction: HTMLElement;
    let deleteButton: HTMLElement;

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
        Array.from(
          parent.wizardUI.dialog!.querySelectorAll<ListItemBase>(
            'mwc-menu > mwc-list-item'
          )
        ).find(item => item.innerHTML.includes('[remove]'))
      );
    });

    it('looks like the latest snapshot', async () => {
      await expect(parent.wizardUI.dialog).to.equalSnapshot();
    });

    it('edits BDA element', async () => {
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
  });

  describe('defines a createBDaWizard to create a new BDA element', () => {
    let nameField: WizardTextField;
    let descField: WizardTextField;
    let sAddrField: WizardTextField;
    let bTypeSelect: WizardSelect;
    let valKindSelect: WizardSelect;
    let valImportSelect: WizardCheckbox;
    let primayAction: HTMLElement;

    beforeEach(async () => {
      (<ListItem>(
        dATypeList.querySelector('mwc-list-item[value="#Dummy.LLN0.Mod.SBOw"]')
      )).click();
      await parent.requestUpdate();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      (<HTMLElement>(
        parent.wizardUI.dialog?.querySelectorAll('mwc-menu > mwc-list-item')[1]
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
      bTypeSelect = <WizardSelect>(
        parent.wizardUI.dialog?.querySelector('wizard-select[label="bType"]')
      );
      valKindSelect = <WizardSelect>(
        parent.wizardUI.dialog?.querySelector('wizard-select[label="valKind"]')
      );
      valImportSelect = <WizardCheckbox>(
        parent.wizardUI.dialog?.querySelector(
          'wizard-checkbox[label="valImport"]'
        )
      );
      primayAction = <HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );
    });

    it('looks like the latest snapshot', async () => {
      await expect(parent.wizardUI.dialog).to.equalSnapshot();
    });
    it('creates a new BDA element', async () => {
      expect(
        doc.querySelector(
          'DAType[id="Dummy.LLN0.Mod.SBOw"] > BDA[name="newBDAElement"]'
        )
      ).to.not.exist;
      nameField.value = 'newBDAElement';
      await parent.requestUpdate();
      bTypeSelect.value = 'BOOLEAN';
      await parent.requestUpdate();
      primayAction.click();
      await parent.requestUpdate();
      expect(
        doc.querySelector(
          'DAType[id="Dummy.LLN0.Mod.SBOw"] > BDA[name="newBDAElement"]:not([desc]):not([sAddr])[bType="BOOLEAN"]:not([valKind]):not([valImport])'
        )
      ).to.exist;
    });
    it('creates yet another new BDA element', async () => {
      const name = 'newBDAElement2';
      const desc = 'newBDAdesc';
      const sAddr = 'myNewAddr';
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
      valKindSelect.nullable = false;
      valKindSelect.value = 'RO';
      valImportSelect.nullable = false;
      valImportSelect.maybeValue = 'true';

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
