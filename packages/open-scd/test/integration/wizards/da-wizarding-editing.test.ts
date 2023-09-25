import { html, fixture, expect } from '@open-wc/testing';

import '../../mock-wizard-editor.js';
import { MockWizardEditor } from '../../mock-wizard-editor.js';

import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

import { FilteredList } from '../../../src/filtered-list.js';
import { ListItem } from '@material/mwc-list/mwc-list-item';
import TemplatesPlugin from '../../../src/editors/Templates.js';
import { WizardSelect } from '../../../src/wizard-select.js';
import { WizardTextField } from '../../../src/wizard-textfield.js';
import { WizardCheckbox } from '../../../src/wizard-checkbox.js';

describe('DA wizarding editing integration', () => {
  if (customElements.get('templates-editor') === undefined)
    customElements.define('templates-editor', TemplatesPlugin);
  let doc: Document;
  let parent: MockWizardEditor;
  let templates: TemplatesPlugin;
  let dOTypeList: FilteredList;

  beforeEach(async () => {
    parent = await fixture(
      html`<mock-wizard-editor
        ><templates-editor></templates-editor
      ></mock-wizard-editor>`
    );

    templates = <TemplatesPlugin>parent.querySelector('templates-editor')!;

    doc = await fetch('/test/testfiles/templates/dotypes.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    templates.doc = doc;
    await templates.updateComplete;
    dOTypeList = <FilteredList>(
      templates.shadowRoot?.querySelector('filtered-list[id="dotypelist"]')
    );
  });

  describe('defines a editDaWizard to edit an existing DA', () => {
    let nameField: WizardTextField;
    let primayAction: HTMLElement;
    let deleteButton: HTMLElement;

    beforeEach(async () => {
      (<ListItem>(
        dOTypeList.querySelector('mwc-list-item[value="#Dummy.LLN0.Mod"]')
      )).click();
      await parent.requestUpdate();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      (<HTMLElement>(
        parent.wizardUI?.dialog?.querySelector(
          'mwc-list-item[value="#Dummy.LLN0.Mod>stVal"]'
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

    it('edits DA attributes name', async () => {
      expect(
        doc.querySelector('DOType[id="Dummy.LLN0.Mod"] > DA[name="stVal"]')
      ).to.exist;
      nameField.value = 'newCtlVal';

      await parent.requestUpdate();
      primayAction.click();
      await parent.requestUpdate();

      expect(
        doc.querySelector('DOType[id="Dummy.LLN0.Mod"] > DA[name="stVal"]')
      ).to.not.exist;
      expect(
        doc.querySelector('DOType[id="Dummy.LLN0.Mod"] > DA[name="newCtlVal"]')
      ).to.exist;
    });

    it('deletes the DA element on delete button click', async () => {
      expect(
        doc.querySelector('DOType[id="Dummy.LLN0.Mod"] > DA[name="stVal"]')
      ).to.exist;
      expect(
        doc.querySelectorAll('DOType[id="Dummy.LLN0.Mod"] > DA').length
      ).to.equal(14);

      deleteButton.click();
      await parent.requestUpdate();

      expect(
        doc.querySelector('DOType[id="Dummy.LLN0.Mod"] > DA[name="stVal"]')
      ).to.not.exist;
      expect(
        doc.querySelectorAll('DOType[id="Dummy.LLN0.Mod"] > DA').length
      ).to.equal(13);
    });

    it('does not edit DA element without changes', async () => {
      const originData = (<Element>(
        doc.querySelector('DOType[id="Dummy.LLN0.Mod"] > DA[name="stVal"]')
      )).cloneNode(true);

      primayAction.click();
      await parent.requestUpdate();

      expect(
        originData.isEqualNode(
          doc.querySelector('DOType[id="Dummy.LLN0.Mod"] > DA[name="stVal"]')
        )
      ).to.be.true;
    });
  });

  describe('defines a createDaWizard to create a new DA element', () => {
    let nameField: WizardTextField;
    let descField: WizardTextField;
    let sAddrField: WizardTextField;
    let bTypeSelect: WizardSelect;
    let valKindSelect: WizardSelect;
    let valImportSelect: WizardCheckbox;
    let fcSelect: WizardSelect;
    let primayAction: HTMLElement;

    beforeEach(async () => {
      (<ListItem>(
        dOTypeList.querySelector('mwc-list-item[value="#Dummy.LLN0.Mod"]')
      )).click();
      await parent.requestUpdate();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation

      (<HTMLElement>(
        Array.from(
          parent.wizardUI.dialog!.querySelectorAll<ListItemBase>(
            'mwc-menu > mwc-list-item'
          )
        ).find(item => item.innerHTML.includes('[scl.DA]'))
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
      fcSelect = <WizardSelect>(
        parent.wizardUI.dialog?.querySelector('wizard-select[label="fc"]')
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
    it('creates a new DA element', async () => {
      expect(
        doc.querySelector(
          'DOType[id="Dummy.LLN0.Mod"] > DA[name="newDAElement"]'
        )
      ).to.not.exist;
      nameField.value = 'newDAElement';
      fcSelect.value = 'ST';
      bTypeSelect.value = 'Struct';

      await parent.requestUpdate();
      primayAction.click();
      await parent.requestUpdate();
      expect(
        doc.querySelector(
          'DOType[id="Dummy.LLN0.Mod"] > ' +
            'DA[name="newDAElement"]:not([desc]):not([sAddr])[bType="Struct"]' +
            '[type="Dummy_origin"]:not([valKind]):not([valImport])'
        )
      ).to.exist;
    });
    it('creates yet another new DA element', async () => {
      const name = 'newDAElement2';
      const desc = 'newDAdesc';
      const sAddr = 'myNewAddr';

      expect(
        doc.querySelector(
          'DAType[id="#Dummy.LLN0.Mod"] > DA[name="newDAElement2"]'
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
      fcSelect.value = 'ST';

      await parent.requestUpdate();
      primayAction.click();
      await parent.requestUpdate();
      expect(
        doc.querySelector(
          `DOType[id="Dummy.LLN0.Mod"] >` +
            `DA[name="${name}"][desc="${desc}"][sAddr="${sAddr}"][bType="BOOLEAN"]` +
            `:not([type])[valKind="RO"][valImport="true"]`
        )
      ).to.exist;
    });
  });
});
