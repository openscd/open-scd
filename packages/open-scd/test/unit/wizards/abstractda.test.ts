import { expect, fixture, html } from '@open-wc/testing';
import fc from 'fast-check';

import '../../mock-wizard.js';
import { MockWizard } from '../../mock-wizard.js';

import { WizardSelect } from '../../../src/wizard-select.js';
import { WizardTextField } from '../../../src/wizard-textfield.js';
import {
  Create,
  isCreate,
  isDelete,
  isReplace,
  Replace,
} from '../../../src/foundation.js';
import {
  getValAction,
  wizardContent,
} from '../../../src/wizards/abstractda.js';
import { regExp, regexString } from '../../foundation.js';

describe('abstractda wizards', () => {
  describe('getValAction', () => {
    const abstractda = new DOMParser().parseFromString(
      `<DA name="ctlModel" bType="Enum" type=""></DA>`,
      'application/xml'
    ).documentElement;
    const oldVal = new DOMParser().parseFromString(
      `<Val>oldVal</Val>`,
      'application/xml'
    ).documentElement;

    it('updates a Val child element when changed', () => {
      const editorAction = getValAction(oldVal, 'newVal', abstractda);
      expect(editorAction).to.satisfy(isReplace);
    });

    it('properly updates an new Val', () => {
      const editorAction = <Replace>getValAction(oldVal, 'newVal', abstractda);
      expect(editorAction.new.element.textContent?.trim()).to.equal('newVal');
    });

    it('creates a Val child element when missing', () => {
      const editorAction = getValAction(null, 'newVal', abstractda);
      expect(editorAction).to.satisfy(isCreate);
    });

    it('properly creates new Val', () => {
      const editorAction = <Create>getValAction(null, 'newVal', abstractda);
      expect(editorAction.new.element.textContent?.trim()).to.equal('newVal');
    });

    it('remove a Val child element if present', () => {
      const editorAction = getValAction(oldVal, null, abstractda);
      expect(editorAction).to.satisfy(isDelete);
    });
  });

  describe('renderWizard', () => {
    let doc: XMLDocument;
    let data: Element;
    let element: MockWizard;
    let enumTypes: string[];
    let daTypes: string[];
    let nameTextField: WizardTextField;
    let valSelect: WizardSelect;
    let valTextField: WizardTextField;
    let bTypeSelect: WizardSelect;
    let typeSelect: WizardSelect;

    beforeEach(async () => {
      element = await fixture(html`<mock-wizard></mock-wizard>`);
      doc = await fetch('/test/testfiles/wizards/abstractda.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      data = doc.querySelector('DataTypeTemplates')!;
      const types = Array.from(data.querySelectorAll('DAType,EnumType'));
      enumTypes = Array.from(data.querySelectorAll('EnumType')).map(
        enumtype => enumtype.getAttribute('id')!
      );
      daTypes = Array.from(data.querySelectorAll('DAType')).map(
        enumtype => enumtype.getAttribute('id')!
      );
      const wizard = [
        {
          title: 'title',
          content: wizardContent(
            '',
            null,
            'Enum',
            types,
            'Dummy_ctlModel',
            null,
            null,
            null,
            'status-only',
            data
          ),
        },
      ];
      element.workflow.push(() => wizard);
      await element.requestUpdate();
      nameTextField = element.wizardUI.dialog!.querySelector<WizardTextField>(
        'wizard-textfield[label="name"]'
      )!;
      bTypeSelect = element.wizardUI.dialog!.querySelector<WizardSelect>(
        'wizard-select[label="bType"]'
      )!;
      valSelect = element.wizardUI.dialog!.querySelector<WizardSelect>(
        'wizard-select[label="Val"]'
      )!;
      valTextField = element.wizardUI.dialog!.querySelector<WizardTextField>(
        'wizard-textfield[label="Val"]'
      )!;
      typeSelect = element.wizardUI.dialog!.querySelector<WizardSelect>(
        'wizard-select[label="type"]'
      )!;
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).to.equalSnapshot();
    });

    it('edits name attribute only for valid inputs', async () => {
      await fc.assert(
        fc.asyncProperty(
          regexString(regExp.abstractDataAttributeName, 1, 32),
          async name => {
            nameTextField.value = name;
            await nameTextField.requestUpdate();
            expect(nameTextField.checkValidity()).to.be.true;
          }
        )
      );
    });

    it('rejects name attribute starting with decimals', async () => {
      await fc.assert(
        fc.asyncProperty(regexString(regExp.decimal, 1, 1), async name => {
          nameTextField.value = name;
          await nameTextField.requestUpdate();
          expect(nameTextField.checkValidity()).to.be.false;
        })
      );
    });

    it('disables the type field in case bType is not Enum nor Struct', async () => {
      bTypeSelect.value = 'BOOLEAN';
      await typeSelect.requestUpdate();
      expect(typeSelect.disabled).to.be.true;
    });

    it('pre-selects the type in the type field in case bType is Enum or Struct', async () => {
      await typeSelect.requestUpdate();
      expect(typeSelect.value).to.be.equal('Dummy_ctlModel');
    });

    it('pre-selects the type in the type field bType has re-selected to the initial bType', async () => {
      bTypeSelect.value = 'BOOLEAN';
      await typeSelect.requestUpdate();
      expect(typeSelect.value).to.not.be.equal('Dummy_ctlModel');
      bTypeSelect.value = 'Enum';
      await typeSelect.requestUpdate();
      expect(typeSelect.value).to.be.equal('Dummy_ctlModel');
    });

    it('filters EnumType in the type field if bType is Enum ', async () => {
      bTypeSelect.value = 'Enum';
      await typeSelect.requestUpdate();
      const typeList = typeSelect.items
        .filter(item => !item.noninteractive)
        .map(item => item.value);
      expect(typeList.length).to.equal(enumTypes.length);
    });

    it('filters DAType in the type field if bType is Struct ', async () => {
      bTypeSelect.value = 'Struct';
      await typeSelect.requestUpdate();
      const typeList = typeSelect.items
        .filter(item => !item.noninteractive)
        .map(item => item.value);
      expect(typeList.length).to.equal(daTypes.length);
    });

    it('selects first DAType item when bType changes from enum to Struct', async () => {
      bTypeSelect.value = 'Enum';
      await typeSelect.requestUpdate();
      bTypeSelect.value = 'Struct';
      await typeSelect.requestUpdate();
      expect(typeSelect.value).to.equal(daTypes[0]);
    });

    it('renders the Val field as wizard-select when bType is Enum', async () => {
      bTypeSelect.value = 'Enum';
      await valSelect.requestUpdate();
      await valTextField.requestUpdate();
      expect(valSelect.style.display).to.equal('');
      expect(valTextField.style.display).to.equal('none');
    });

    it('does not render the Val field when bType is Struct', async () => {
      bTypeSelect.value = 'Struct';
      await valSelect.requestUpdate();
      await valTextField.requestUpdate();
      expect(valSelect.style.display).to.equal('none');
      expect(valTextField.style.display).to.equal('none');
    });

    it('renders the Val field as wizard-textfield in all other cases', async () => {
      bTypeSelect.value = 'Struct';
      await valSelect.requestUpdate();
      await valTextField.requestUpdate();
      expect(valSelect.style.display).to.equal('none');
      expect(valTextField.style.display).to.equal('none');
    });

    it('shows Val form the file in the Val fields', async () => {
      await valSelect.requestUpdate();
      expect(valSelect.value).to.equal('status-only');
    });

    it('filters Val selection for the initially loaded Enum', async () => {
      await valSelect.requestUpdate();
      expect(valSelect.items.length).to.equal(
        data.querySelectorAll(`EnumType[id="${typeSelect.value}"] > EnumVal`)
          .length
      );
    });

    it('filters Val selection for bType Enum and ctlModelKind', async () => {
      bTypeSelect.value = 'Enum';
      await valSelect.requestUpdate();
      expect(valSelect.items.length).to.equal(
        data.querySelectorAll(`EnumType[id="${typeSelect.value}"] > EnumVal`)
          .length
      );
    });

    it('filters Val selection for bType Enum and HealthKind', async () => {
      bTypeSelect.value = 'Enum';
      typeSelect.value = 'Dummy_Health';
      await valSelect.requestUpdate();
      expect(valSelect.items.length).to.equal(
        data.querySelectorAll(`EnumType[id="${typeSelect.value}"] > EnumVal`)
          .length
      );
    });

    it('does not filters Val selection it bType is not Enum', async () => {
      bTypeSelect.value = 'Struct';
      typeSelect.value = 'Dummy_origin';
      await valSelect.requestUpdate();
      expect(valSelect.items.length).to.equal(0);
    });
  });
});
