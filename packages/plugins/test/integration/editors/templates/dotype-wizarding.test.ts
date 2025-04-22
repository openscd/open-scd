import { html, fixture, expect } from '@open-wc/testing';

import '@openscd/open-scd/test/mock-open-scd.js';
import { MockOpenSCD } from '@openscd/open-scd/test/mock-open-scd.js';

import { ListItem } from '@material/mwc-list/mwc-list-item';
import { Select } from '@material/mwc-select';

import { FilteredList } from '@openscd/open-scd/src/filtered-list.js';
import TemplatesPlugin from '../../../../src/editors/Templates.js';
import { WizardTextField } from '@openscd/open-scd/src/wizard-textfield.js';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

import { patterns } from '../../../../src/wizards/foundation/limits.js';

describe('DOType wizards', () => {
  if (customElements.get('templates-editor') === undefined)
    customElements.define('templates-editor', TemplatesPlugin);
  let doc: Document;
  let parent: MockOpenSCD;
  let templates: TemplatesPlugin;
  let dOTypeList: FilteredList;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/templates/dotypes.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    parent = await fixture(
      html`<mock-open-scd
        ><templates-editor .doc=${doc}></templates-editor
      ></mock-open-scd>`
    );

    templates = parent.getActivePlugin();

    await parent.updateComplete;
    dOTypeList = <FilteredList>(
      templates.shadowRoot?.querySelector('filtered-list[id="dotypelist"]')
    );
  });

  describe('defines a createDOTypeWizard', () => {
    let selector: Select;
    let idField: WizardTextField;
    let cdcField: WizardTextField;
    let primayAction: HTMLElement;
    beforeEach(async () => {
      const button = <HTMLElement>(
        templates?.shadowRoot?.querySelectorAll(
          'mwc-icon-button[icon="playlist_add"]'
        )[1]
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
      cdcField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-textfield[label="cdc"]')
      );
      primayAction = <HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );
    });

    it('looks like the latest snapshot', async () => {
      // prettier does not support escaping in regexes of the /v flag
      await expect(parent.wizardUI.dialog).dom.to.equalSnapshot({
        ignoreAttributes: [
          {
            tags: ['wizard-textfield'],
            attributes: ['pattern'],
          },
        ],
      });
    });

    it('should have correct pattern', async () => {
      expect(
        parent.wizardUI.dialog!.querySelectorAll('wizard-textfield[pattern]')!
          .length
      ).to.equal(3);

      expect(
        parent.wizardUI
          .dialog!.querySelectorAll('wizard-textfield[pattern]')[0]
          .getAttribute('pattern')
      ).to.equal(patterns.nmToken);

      expect(
        parent.wizardUI
          .dialog!.querySelectorAll('wizard-textfield[pattern]')[1]
          .getAttribute('pattern')
      ).to.equal(patterns.normalizedString);

      expect(
        parent.wizardUI
          .dialog!.querySelectorAll('wizard-textfield[pattern]')[2]
          .getAttribute('pattern')
      ).to.equal(patterns.cdc);
    });

    it('allows to add empty DOTypes to the project', async () => {
      expect(doc.querySelector('DOType[id="myGeneralDOType"]')).to.not.exist;
      idField.maybeValue = 'myGeneralDOType';
      cdcField.maybeValue = 'SPS';
      await parent.requestUpdate();
      primayAction.click();
      await parent.updateComplete;
      expect(doc.querySelector('DOType[id="myGeneralDOType"]')).to.exist;
    });

    it('allows to define CDC only for empty DOType creation', async () => {
      await cdcField.updateComplete;
      expect(cdcField.disabled).to.not.be.true;
      selector.value = 'OpenSCD_ENS_Health';
      await cdcField.requestUpdate();
      expect(cdcField.disabled).to.be.true;
    });

    it('requires CDC definition for empty DOTypes', async () => {
      expect(doc.querySelector('DOType[id="myGeneralDOType"]')).to.not.exist;
      idField.maybeValue = 'myGeneralDOType';
      cdcField.maybeValue = null;
      await parent.requestUpdate();
      primayAction.click();
      await parent.updateComplete;
      expect(doc.querySelector('DOType[id="myGeneralDOType"]')).to.not.exist;
    });

    it('respects the sequence defined in the standard', async () => {
      idField.maybeValue = 'myGeneralDOType';
      cdcField.maybeValue = 'SPS';
      await parent.requestUpdate();
      primayAction.click();
      await parent.updateComplete;
      const element = doc.querySelector('DOType[id="myGeneralDOType"]');
      expect(element?.nextElementSibling?.tagName).to.equal('DOType');
      expect(element?.previousElementSibling?.tagName).to.equal('LNodeType');
    });

    it('recursively add missing! subsequent EnumType elements', async () => {
      expect(doc.querySelector('DOType[id="myENSHealth"]')).to.not.exist;
      expect(doc.querySelector('EnumType[id="HealthKind"]')).to.not.exist;
      selector.value = 'OpenSCD_ENS_Health';
      idField.maybeValue = 'myENSHealth';
      await parent.requestUpdate();
      primayAction.click();
      await parent.updateComplete;
      expect(doc.querySelector('DOType[id="myENSHealth"]')).to.exist;
      expect(doc.querySelector('EnumType[id="HealthKind"]')).to.exist;
      expect(doc.querySelectorAll('EnumType[id="HealthKind"]').length).to.equal(
        1
      );
    });

    it('recursively add missing! subsequent DAType elements', async () => {
      expect(doc.querySelector('DAType[id="OpenSCD_AnalogueValue_INT32"]')).to
        .not.exist;
      selector.value = 'OpenSCD_MV_int';
      idField.maybeValue = 'myMV';
      await parent.requestUpdate();
      primayAction.click();
      await parent.updateComplete;
      expect(doc.querySelector('DAType[id="OpenSCD_AnalogueValue_INT32"]')).to
        .exist;
      expect(
        doc.querySelectorAll('DAType[id="OpenSCD_AnalogueValue_INT32"]').length
      ).to.equal(1);
    });
  });

  describe('defines a dOTypeWizard', () => {
    let idField: WizardTextField;
    let primayAction: HTMLElement;
    let deleteButton: HTMLElement;

    beforeEach(async () => {
      (<ListItem>(
        dOTypeList.querySelector('mwc-list-item[value="#Dummy.LLN0.Mod"]')
      )).click();
      await parent.requestUpdate();
      await new Promise(resolve => setTimeout(resolve, 100)); //recursive call takes time
      idField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-textfield[label="id"]')
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
        ).find(item => item.innerHTML.includes(`Remove`))
      );
    });

    it('looks like the latest snapshot', async () => {
      // prettier does not support escaping in regexes of the /v flag
      await expect(parent.wizardUI.dialog).dom.to.equalSnapshot({
        ignoreAttributes: [
          {
            tags: ['wizard-textfield'],
            attributes: ['pattern'],
          },
        ],
      });
    });

    it('should have correct pattern', async () => {
      expect(
        parent.wizardUI.dialog!.querySelectorAll('wizard-textfield[pattern]')!
          .length
      ).to.equal(3);

      expect(
        parent.wizardUI
          .dialog!.querySelectorAll('wizard-textfield[pattern]')[0]
          .getAttribute('pattern')
      ).to.equal(patterns.nmToken);

      expect(
        parent.wizardUI
          .dialog!.querySelectorAll('wizard-textfield[pattern]')[1]
          .getAttribute('pattern')
      ).to.equal(patterns.normalizedString);

      expect(
        parent.wizardUI
          .dialog!.querySelectorAll('wizard-textfield[pattern]')[2]
          .getAttribute('pattern')
      ).to.equal(patterns.normalizedString);
    });

    it('edits DOType attributes id', async () => {
      expect(doc.querySelector('DOType[id="Dummy.LLN0.Mod"]')).to.exist;
      idField.value = 'changedDOType';
      await parent.requestUpdate();
      primayAction.click();
      await parent.requestUpdate();
      expect(doc.querySelector('DOType[id="Dummy.LLN0.Mod"]')).to.not.exist;
      expect(doc.querySelector('DOType[id="changedDOType"]')).to.exist;
    });

    it('deletes the DOType attribute on delete button click', async () => {
      expect(doc.querySelector('DOType[id="Dummy.LLN0.Mod"]')).to.exist;
      expect(doc.querySelectorAll('DOType').length).to.equal(15);
      deleteButton.click();
      await parent.requestUpdate();
      expect(doc.querySelector('DAType[id="Dummy.LLN0.Mod"]')).to.not.exist;
      expect(doc.querySelectorAll('DOType').length).to.equal(14);
    });

    it('does not edit DOType element without changes', async () => {
      const originData = (<Element>(
        doc.querySelector('DOType[id="Dummy.LLN0.Mod"]')
      )).cloneNode(true);
      primayAction.click();
      await parent.requestUpdate();
      expect(
        originData.isEqualNode(doc.querySelector('DOType[id="Dummy.LLN0.Mod"]'))
      ).to.be.true;
    });
  });

  describe('defines a sDOWizard to edit an existing SDO', () => {
    let nameField: WizardTextField;
    let primayAction: HTMLElement;
    let deleteButton: HTMLElement;
    let typeSelect: Select;

    beforeEach(async () => {
      (<ListItem>(
        dOTypeList.querySelector('mwc-list-item[value="#Dummy.WYE"]')
      )).click();
      await parent.requestUpdate();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      (<HTMLElement>(
        parent.wizardUI?.dialog?.querySelector(
          'mwc-list-item[value="#Dummy.WYE>phsA"]'
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
        parent.wizardUI.dialog?.querySelector('mwc-menu > mwc-list-item')
      );
      typeSelect = <Select>(
        parent.wizardUI.dialog?.querySelector('mwc-select[label="type"]')
      );
    });

    it('looks like the latest snapshot', async () => {
      // prettier does not support escaping in regexes of the /v flag
      await expect(parent.wizardUI.dialog).dom.to.equalSnapshot({
        ignoreAttributes: [
          {
            tags: ['wizard-textfield'],
            attributes: ['pattern'],
          },
        ],
      });
    });

    it('should have correct pattern', async () => {
      expect(
        parent.wizardUI.dialog!.querySelectorAll('wizard-textfield[pattern]')!
          .length
      ).to.equal(2);

      expect(
        parent.wizardUI
          .dialog!.querySelectorAll('wizard-textfield[pattern]')[0]
          .getAttribute('pattern')
      ).to.equal(patterns.tRestrName1stL);

      expect(
        parent.wizardUI
          .dialog!.querySelectorAll('wizard-textfield[pattern]')[1]
          .getAttribute('pattern')
      ).to.equal(patterns.normalizedString);
    });

    it('edits SDO attributes name', async () => {
      expect(doc.querySelector('DOType[id="Dummy.WYE"] > SDO[name="phsA"]')).to
        .exist;
      nameField.value = 'newPhsA';
      await parent.requestUpdate();
      primayAction.click();
      await parent.requestUpdate();
      expect(doc.querySelector('DOType[id="Dummy.WYE"] > SDO[name="phsA"]')).to
        .not.exist;
      expect(doc.querySelector('DOType[id="Dummy.WYE"] > SDO[name="newPhsA"]'))
        .to.exist;
    });
    it('deletes the SDO element on delete button click', async () => {
      expect(doc.querySelector('DOType[id="Dummy.WYE"] > SDO[name="phsA"]')).to
        .exist;
      expect(
        doc.querySelectorAll('DOType[id="Dummy.WYE"] > SDO').length
      ).to.equal(3);
      deleteButton.click();
      await parent.requestUpdate();
      expect(doc.querySelector('DOType[id="Dummy.WYE"] > SDO[name="phsA"]')).to
        .not.exist;
      expect(
        doc.querySelectorAll('DOType[id="Dummy.WYE"] > SDO').length
      ).to.equal(2);
    });
    it('does not edit SDO element without changes', async () => {
      const originData = (<Element>(
        doc.querySelector('DOType[id="Dummy.WYE"] > SDO[name="phsA"]')
      )).cloneNode(true);
      primayAction.click();
      await parent.requestUpdate();
      expect(
        originData.isEqualNode(
          doc.querySelector('DOType[id="Dummy.WYE"] > SDO[name="phsA"]')
        )
      ).to.be.true;
    });
    it('filters the type selector to DOTypes', async () => {
      expect(typeSelect!.querySelectorAll('mwc-list-item').length).to.equal(
        doc.querySelectorAll('DOType').length
      );
    });
  });

  describe('defines a sDOWizard to create a new SDO element', () => {
    let nameField: WizardTextField;
    let descField: WizardTextField;
    let typeSelect: Select;
    let primaryAction: HTMLElement;

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
        ).find(item => item.innerHTML.includes(`Data object`))
      )).click();
      await parent.wizardUI.dialog?.requestUpdate();

      await new Promise(resolve => setTimeout(resolve, 100)); // await animation

      nameField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-textfield[label="name"]')
      );
      descField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-textfield[label="desc"]')
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

    it('looks like the latest snapshot', async () => {
      // prettier does not support escaping in regexes of the /v flag
      await expect(parent.wizardUI.dialog).dom.to.equalSnapshot({
        ignoreAttributes: [
          {
            tags: ['wizard-textfield'],
            attributes: ['pattern'],
          },
        ],
      });
    });

    it('should have correct pattern', async () => {
      expect(
        parent.wizardUI.dialog!.querySelectorAll('wizard-textfield[pattern]')!
          .length
      ).to.equal(2);

      expect(
        parent.wizardUI
          .dialog!.querySelectorAll('wizard-textfield[pattern]')[0]
          .getAttribute('pattern')
      ).to.equal(patterns.tRestrName1stL);

      expect(
        parent.wizardUI
          .dialog!.querySelectorAll('wizard-textfield[pattern]')[1]
          .getAttribute('pattern')
      ).to.equal(patterns.normalizedString);
    });

    it('creates a new SDO element', async () => {
      expect(
        doc.querySelector(
          'DOType[id="Dummy.LLN0.Mod"] > SDO[name="newSDOElement"]'
        )
      ).to.not.exist;
      nameField.value = 'newSDOElement';
      typeSelect.value = 'Dummy.CMV';
      await parent.requestUpdate();
      primaryAction.click();
      await parent.requestUpdate();
      expect(
        doc.querySelector(
          'DOType[id="Dummy.LLN0.Mod"] > SDO[name="newSDOElement"]:not([desc])[type="Dummy.CMV"]'
        )
      ).to.exist;
    });

    it('creates yet another new SDO element', async () => {
      const name = 'newSDOElement2';
      const desc = 'newSDOdesc';

      expect(
        doc.querySelector(
          'DOType[id="#Dummy.LLN0.Mod"] > SDO[name="newSDOElement2"]'
        )
      ).to.not.exist;
      nameField.value = name;
      descField.nullable = false;
      descField.value = desc;
      typeSelect.value = 'Dummy.CMV';

      await parent.requestUpdate();
      primaryAction.click();
      await parent.requestUpdate();
      expect(
        doc.querySelector(
          `DOType[id="Dummy.LLN0.Mod"] >` +
            `SDO[name="${name}"][desc="${desc}"][type="Dummy.CMV"]`
        )
      ).to.exist;
    });
  });
});
