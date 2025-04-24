import { html, fixture, expect } from '@open-wc/testing';

import '@openscd/open-scd/test/mock-open-scd.js';
import { MockOpenSCD } from '@openscd/open-scd/test/mock-open-scd.js';

import { ListItem } from '@material/mwc-list/mwc-list-item';
import { Select } from '@material/mwc-select';

import { FilteredList } from '@openscd/open-scd/src/filtered-list.js';
import TemplatesPlugin from '../../../../src/editors/Templates.js';
import { WizardTextField } from '@openscd/open-scd/src/wizard-textfield.js';
import { patterns } from '@openscd/open-scd/src/foundation.js';

describe('EnumType wizards', () => {
  if (customElements.get('templates-editor') === undefined)
    customElements.define('templates-editor', TemplatesPlugin);
  let doc: Document;
  let parent: MockOpenSCD;
  let templates: TemplatesPlugin;
  let eNumTypeList: FilteredList;

  beforeEach(async () => {
    parent = await fixture(
      html`<mock-open-scd><templates-editor></templates-editor></mock-open-scd>`
    );

    templates = parent.getActivePlugin();

    doc = await fetch('/test/testfiles/templates/datypes.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    templates.doc = doc;
    await templates.updateComplete;
    eNumTypeList = <FilteredList>(
      templates.shadowRoot?.querySelector('filtered-list[id="enumtypelist"]')
    );
  });

  describe('defines a createEnumTypeWizard', () => {
    let selector: Select;
    let idField: WizardTextField;
    let primayAction: HTMLElement;
    beforeEach(async () => {
      const button = <HTMLElement>(
        templates?.shadowRoot?.querySelectorAll(
          'mwc-icon-button[icon="playlist_add"]'
        )[3]
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

    it('should have correct pattern', async () => {
      expect(
        parent.wizardUI.dialog!.querySelectorAll('wizard-textfield[pattern]')!
          .length
      ).to.equal(2);

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
    });

    it('allows to add empty EnumType to the project', async () => {
      expect(doc.querySelector('EnumType[id="myGeneralEnumType"]')).to.not
        .exist;
      idField.maybeValue = 'myGeneralEnumType';
      await parent.requestUpdate();
      primayAction.click();
      await parent.updateComplete;
      expect(doc.querySelector('EnumType[id="myGeneralEnumType"]')).to.exist;
    });
    it('respects the sequence defined in the standard', async () => {
      idField.maybeValue = 'myGeneralEnumType';
      await parent.requestUpdate();
      primayAction.click();
      await parent.updateComplete;
      const element = doc.querySelector('EnumType[id="myGeneralEnumType"]');
      expect(element?.nextElementSibling?.tagName).to.equal('EnumType');
      expect(element?.previousElementSibling?.tagName).to.equal('DAType');
    });
    it('allows to add a predefined EnumType', async () => {
      expect(doc.querySelector('EnumType[id="myGeneralEnumType"]')).to.not
        .exist;
      selector.value = 'AdjustmentKind';
      idField.maybeValue = 'myGeneralEnumType';
      await parent.requestUpdate();
      primayAction.click();
      await parent.updateComplete;
      expect(doc.querySelector('EnumType[id="myGeneralEnumType"]')).to.exist;
      expect(
        doc.querySelectorAll('EnumType[id="myGeneralEnumType"] > EnumVal')
          .length
      ).to.equal(4);
    });
  });

  describe('defines an eNumTypeEditWizard', () => {
    let idField: WizardTextField;
    let primayAction: HTMLElement;
    let deleteButton: HTMLElement;

    beforeEach(async () => {
      (<ListItem>(
        eNumTypeList.querySelector('mwc-list-item[value="#Dummy_ctlModel"]')
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
        parent.wizardUI.dialog?.querySelectorAll('mwc-menu > mwc-list-item')[0]
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

    it('should have correct pattern', async () => {
      expect(
        parent.wizardUI.dialog!.querySelectorAll('wizard-textfield[pattern]')!
          .length
      ).to.equal(2);

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
    });

    it('edits EnumType attributes id', async () => {
      expect(doc.querySelector('EnumType[id="Dummy_ctlModel"]')).to.exist;
      idField.value = 'changedEnumType';
      await parent.requestUpdate();
      primayAction.click();
      await parent.requestUpdate();
      expect(doc.querySelector('EnumType[id="Dummy_ctlModel"]')).to.not.exist;
      expect(doc.querySelector('EnumType[id="changedEnumType"]')).to.exist;
    });

    it('deletes the EnumVal element on delete button click', async () => {
      expect(doc.querySelector('EnumType[id="Dummy_ctlModel"]')).to.exist;
      expect(doc.querySelectorAll('EnumType').length).to.equal(4);
      deleteButton.click();
      await parent.requestUpdate();
      expect(doc.querySelector('EnumType[id="Dummy_ctlModel"]')).to.not.exist;
      expect(doc.querySelectorAll('EnumType').length).to.equal(3);
    });

    it('does not edit EnumType element without changes', async () => {
      const originData = (<Element>(
        doc.querySelector('EnumType[id="Dummy_ctlModel"]')
      )).cloneNode(true);
      primayAction.click();
      await parent.requestUpdate();
      expect(
        originData.isEqualNode(
          doc.querySelector('EnumType[id="Dummy_ctlModel"]')
        )
      ).to.be.true;
    });
  });

  describe('defines a eNumValWizard to edit an existing EnumVal', () => {
    let ordField: WizardTextField;
    let valueField: WizardTextField;
    let descField: WizardTextField;
    let primayAction: HTMLElement;
    let deleteButton: HTMLElement;

    beforeEach(async () => {
      (<ListItem>(
        eNumTypeList.querySelector('mwc-list-item[value="#Dummy_ctlModel"]')
      )).click();
      await parent.requestUpdate();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      (<HTMLElement>(
        parent.wizardUI?.dialog?.querySelector(
          'mwc-list-item[value="#Dummy_ctlModel>1"]'
        )
      )).click();
      await parent.requestUpdate();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation

      ordField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-textfield[label="ord"]')
      );
      valueField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-textfield[label="value"]')
      );
      descField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-textfield[label="desc"]')
      );
      primayAction = <HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );
      deleteButton = <HTMLElement>(
        parent.wizardUI.dialog?.querySelectorAll('mwc-menu > mwc-list-item')[0]
      );
    });

    it('looks like the latest snapshot', async () => {
      await expect(parent.wizardUI.dialog).to.equalSnapshot();
    });

    it('edits EnumVal attributes ord', async () => {
      expect(
        doc.querySelector('EnumType[id="Dummy_ctlModel"] > EnumVal[ord="1"]')
      ).to.exist;
      ordField.value = '10';
      await parent.requestUpdate();
      primayAction.click();
      await parent.requestUpdate();
      expect(
        doc.querySelector('EnumType[id="Dummy_ctlModel"] > EnumVal[ord="1"]')
      ).to.not.exist;
      expect(
        doc.querySelector('EnumType[id="Dummy_ctlModel"] > EnumVal[ord="10"]')
      ).to.exist;
    });

    it('edits EnumVal attributes value', async () => {
      expect(
        doc.querySelector('EnumType[id="Dummy_ctlModel"] > EnumVal[ord="1"]')
          ?.textContent
      ).to.equal('direct-with-normal-security');
      valueField.value = 'direct-with-normal-security-test';
      descField.nullable = false;
      descField.maybeValue = 'myDesc';
      await parent.requestUpdate();
      primayAction.click();
      await parent.requestUpdate();
      expect(
        doc.querySelector(
          'EnumType[id="Dummy_ctlModel"] > EnumVal[ord="1"][desc="myDesc"]'
        )?.textContent
      ).to.equal('direct-with-normal-security-test');
    });

    it('deletes the EnumVal element on delete button click', async () => {
      expect(
        doc.querySelector('EnumType[id="Dummy_ctlModel"] > EnumVal[ord="1"]')
      ).to.exist;
      expect(
        doc.querySelectorAll('EnumType[id="Dummy_ctlModel"] > EnumVal').length
      ).to.equal(5);
      deleteButton.click();
      await parent.requestUpdate();
      expect(
        doc.querySelector('EnumType[id="Dummy_ctlModel"] > EnumVal[name="1"]')
      ).to.not.exist;
      expect(
        doc.querySelectorAll('EnumType[id="Dummy_ctlModel"] > EnumVal').length
      ).to.equal(4);
    });

    it('does not edit EnumVal element without changes', async () => {
      const originData = (<Element>(
        doc.querySelector('EnumType[id="Dummy_ctlModel"] > EnumVal[ord="1"]')
      )).cloneNode(true);
      primayAction.click();
      await parent.requestUpdate();
      expect(
        originData.isEqualNode(
          doc.querySelector('EnumType[id="Dummy_ctlModel"] > EnumVal[ord="1"]')
        )
      ).to.be.true;
    });
  });

  describe('defines a eNumValWizard to create a new EnumVal element', () => {
    let ordField: WizardTextField;
    let valueField: WizardTextField;
    let descField: WizardTextField;
    let primayAction: HTMLElement;

    beforeEach(async () => {
      (<ListItem>(
        eNumTypeList.querySelector('mwc-list-item[value="#Dummy_ctlModel"]')
      )).click();
      await parent.requestUpdate();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      (<HTMLElement>(
        parent.wizardUI.dialog?.querySelectorAll('mwc-menu > mwc-list-item')[1]
      )).click();
      await parent.requestUpdate();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation

      ordField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-textfield[label="ord"]')
      );
      descField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-textfield[label="desc"]')
      );
      valueField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-textfield[label="value"]')
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
    it('creates a new EnumVal element', async () => {
      expect(
        doc.querySelector('EnumType[id="Dummy_ctlModel"] > EnumVal[ord="9"]')
      ).to.not.exist;
      ordField.value = '9';
      valueField.value = 'newValue';
      await parent.requestUpdate();
      primayAction.click();
      await parent.requestUpdate();
      expect(
        doc.querySelector(
          'EnumType[id="Dummy_ctlModel"] > EnumVal[ord="9"]:not([desc])'
        )?.textContent
      ).to.equal('newValue');
    });
    it('creates yet another new EnumVal element', async () => {
      expect(
        doc.querySelector('EnumType[id="Dummy_ctlModel"] > EnumVal[ord="9"]')
      ).to.not.exist;
      ordField.value = '9';
      valueField.value = 'newValue';
      descField.nullable = false;
      descField.maybeValue = 'myDesc';
      await parent.requestUpdate();
      primayAction.click();
      await parent.requestUpdate();
      expect(
        doc.querySelector(
          'EnumType[id="Dummy_ctlModel"] > EnumVal[ord="9"][desc="myDesc"]'
        )?.textContent
      ).to.equal('newValue');
    });
  });
});
