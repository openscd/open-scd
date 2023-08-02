import { html, fixture, expect } from '@open-wc/testing';

import '../../../mock-wizard-editor.js';
import { MockWizardEditor } from '../../../mock-wizard-editor.js';

import { ListItem } from '@material/mwc-list/mwc-list-item';
import { Select } from '@material/mwc-select';

import { FilteredList } from '../../../../src/filtered-list.js';
import { WizardTextField } from '../../../../src/wizard-textfield.js';
import TemplatesPlugin from '../../../../src/editors/Templates.js';
import { patterns } from '../../../../src/foundation.js';

describe('DAType wizards', () => {
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

  describe('defines a createDATypeWizard', () => {
    let selector: Select;
    let idField: WizardTextField;
    let primayAction: HTMLElement;
    beforeEach(async () => {
      const button = <HTMLElement>(
        templates?.shadowRoot?.querySelectorAll(
          'mwc-icon-button[icon="playlist_add"]'
        )[2]
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

    it('looks like the latest snapshot', async () => {
      await expect(parent.wizardUI.dialog).to.equalSnapshot({
        ignoreAttributes: [
          {
            tags: ['wizard-textfield'],
            attributes: ['pattern'],
          },
        ],
      });
    });

    //work around, because the escapes get removed in snapshot
    it('should have correct pattern', async () => {
      const pattern =
        '([:_A-Za-z]|[\u00C0-\u00D6]|[\u00D8-\u00F6]|[\u00F8-\u02FF]|[\u0370-\u037D]' +
        '|[\u037F-\u1FFF]|[\u200C-\u200D]|[\u2070-\u218F]|[\u2C00-\u2FEF]' +
        '|[\u3001-\uD7FF]|[\uF900-\uFDCF]|[\uFDF0-\uFFFD]|[.0-9\\-]|\u00B7|[\u0300-\u036F]|[\u203F-\u2040])+';
      expect(
        parent.wizardUI.dialog!.querySelectorAll('wizard-textfield[pattern]')!
          .length
      ).to.equal(2);

      expect(
        parent.wizardUI
          .dialog!.querySelectorAll('wizard-textfield[pattern]')[0]
          .getAttribute('pattern')
      ).to.equal(pattern);

      expect(
        parent.wizardUI
          .dialog!.querySelectorAll('wizard-textfield[pattern]')[1]
          .getAttribute('pattern')
      ).to.equal(patterns.normalizedString);
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
    it('recursively add missing! subsequent EnumType elements', async () => {
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
    it('recursively add missing! subsequent DAType elements', async () => {
      expect(doc.querySelector('DAType[id="OpenSCD_AnalogueValue_FLOAT32"]')).to
        .not.exist;
      selector.value = 'OpenSCD_RangeConfig';
      idField.maybeValue = 'myOriginator';
      await parent.requestUpdate();
      primayAction.click();
      await parent.updateComplete;
      expect(doc.querySelector('DAType[id="OpenSCD_AnalogueValue_FLOAT32"]')).to
        .exist;
      expect(
        doc.querySelectorAll('DAType[id="OpenSCD_AnalogueValue_FLOAT32"]')
          .length
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
        parent.wizardUI.dialog?.querySelector('mwc-menu > mwc-list-item')
      );
    });

    it('looks like the latest snapshot', async () => {
      await expect(parent.wizardUI.dialog).to.equalSnapshot({
        ignoreAttributes: [
          {
            tags: ['wizard-textfield'],
            attributes: ['pattern'],
          },
        ],
      });
    });

    //work around, because the escapes get removed in snapshot
    it('should have correct pattern', async () => {
      const pattern =
        '([:_A-Za-z]|[\u00C0-\u00D6]|[\u00D8-\u00F6]|[\u00F8-\u02FF]|[\u0370-\u037D]' +
        '|[\u037F-\u1FFF]|[\u200C-\u200D]|[\u2070-\u218F]|[\u2C00-\u2FEF]' +
        '|[\u3001-\uD7FF]|[\uF900-\uFDCF]|[\uFDF0-\uFFFD]|[.0-9\\-]|\u00B7|[\u0300-\u036F]|[\u203F-\u2040])+';
      expect(
        parent.wizardUI.dialog!.querySelectorAll('wizard-textfield[pattern]')!
          .length
      ).to.equal(2);

      expect(
        parent.wizardUI
          .dialog!.querySelectorAll('wizard-textfield[pattern]')[0]
          .getAttribute('pattern')
      ).to.equal(pattern);

      expect(
        parent.wizardUI
          .dialog!.querySelectorAll('wizard-textfield[pattern]')[1]
          .getAttribute('pattern')
      ).to.equal(patterns.normalizedString);
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
});
