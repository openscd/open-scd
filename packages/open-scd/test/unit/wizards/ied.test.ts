import { expect, fixture, html } from '@open-wc/testing';

import '../../mock-wizard.js';
import { MockWizard } from '../../mock-wizard.js';

import { WizardTextField } from '../../../src/wizard-textfield.js';
import {
  ComplexAction,
  isSimple,
  WizardInputElement,
} from '../../../src/foundation.js';
import {
  editIEDWizard,
  removeIEDAndReferences,
  removeIEDWizard,
} from '../../../src/wizards/ied.js';

import {
  expectDeleteAction,
  expectReplaceAction,
  expectUpdateAction,
  expectWizardNoUpdateAction,
  fetchDoc,
  setWizardTextFieldValue,
} from './test-support.js';
import { updateNamingAttributeWithReferencesAction } from '../../../src/wizards/foundation/actions.js';

describe('Wizards for SCL element IED', () => {
  let doc: XMLDocument;
  let ied: Element;
  let element: MockWizard;
  let inputs: WizardInputElement[];

  beforeEach(async () => {
    doc = await fetchDoc('/test/testfiles/wizards/ied.scd');
  });

  describe('edit IED', () => {
    beforeEach(async () => {
      ied = doc.querySelector('IED[name="IED3"]')!;

      element = await fixture(html`<mock-wizard></mock-wizard>`);
      const wizard = editIEDWizard(ied);
      element.workflow.push(() => wizard);
      await element.requestUpdate();
      inputs = Array.from(element.wizardUI.inputs);
    });
    it('contains a wizard-textfield with a non-empty "type" value', async () => {
      expect(
        (<WizardTextField[]>inputs).find(textField => textField.label == 'type')
          ?.value
      ).to.be.equal(ied.getAttribute('type') || '-');
    });
    it('contains a wizard-textfield with a non-empty "manufacturer" value', async () => {
      expect(
        (<WizardTextField[]>inputs).find(
          textField => textField.label == 'manufacturer'
        )?.value
      ).to.be.equal(ied.getAttribute('manufacturer') || '-');
    });
    it('contains a wizard-textfield with a non-empty "configVersion" value', async () => {
      expect(
        (<WizardTextField[]>inputs).find(
          textField => textField.label == 'configVersion'
        )?.value
      ).to.be.equal(ied.getAttribute('configVersion') || '-');
    });
    it('contains a wizard-textfield with a non-empty "originalSclVersion" value', async () => {
      expect(
        (<WizardTextField[]>inputs).find(
          textField => textField.label == 'originalSclVersion'
        )?.value
      ).to.contain(ied.getAttribute('originalSclVersion') || '-');
    });
    it('contains a wizard-textfield with an empty "engRight" value', async () => {
      expect(
        (<WizardTextField[]>inputs).find(
          textField => textField.label == 'engRight'
        )?.value
      ).to.be.equal(ied.getAttribute('engRight') || '-');
    });
    it('contains a wizard-textfield with a non-empty "owner" value', async () => {
      expect(
        (<WizardTextField[]>inputs).find(
          textField => textField.label == 'owner'
        )?.value
      ).to.be.equal(ied.getAttribute('owner') || '-');
    });
    it('update name should be updated in document', async function () {
      await setWizardTextFieldValue(<WizardTextField>inputs[0], 'OtherIED3');

      const complexAction = updateNamingAttributeWithReferencesAction(
        ied,
        'ied.action.updateied'
      )(inputs, element.wizardUI);
      expect(complexAction.length).to.equal(1);
      expect(complexAction[0]).to.not.satisfy(isSimple);

      const simpleActions = (<ComplexAction>complexAction[0]).actions;
      expect(simpleActions.length).to.equal(2);

      expectUpdateAction(simpleActions[0], 'IED', 'name', 'IED3', 'OtherIED3');
      expectReplaceAction(
        simpleActions[1],
        'ConnectedAP',
        'iedName',
        'IED3',
        'OtherIED3'
      );
    });

    it('update name should be unique in document', async function () {
      await setWizardTextFieldValue(<WizardTextField>inputs[0], 'IED2');
      expect(inputs[0].checkValidity()).to.be.false;
    });

    it('update description should be updated in document', async function () {
      await setWizardTextFieldValue(
        <WizardTextField>inputs[1],
        'Some description'
      );

      const complexAction = updateNamingAttributeWithReferencesAction(
        ied,
        'ied.action.updateied'
      )(inputs, element.wizardUI);
      expect(complexAction.length).to.equal(1);
      expect(complexAction[0]).to.not.satisfy(isSimple);

      const simpleActions = (<ComplexAction>complexAction[0]).actions;
      expect(simpleActions.length).to.equal(1);

      expectUpdateAction(
        simpleActions[0],
        'IED',
        'desc',
        null,
        'Some description'
      );
    });

    it('when no fields changed there will be no update action', async function () {
      expectWizardNoUpdateAction(
        updateNamingAttributeWithReferencesAction(ied, 'ied.action.updateied'),
        element.wizardUI,
        inputs
      );
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });
  });

  describe('remove IED', () => {
    beforeEach(async () => {
      ied = doc.querySelector('IED[name="IED1"]')!;

      element = await fixture(html`<mock-wizard></mock-wizard>`);
      const wizard = removeIEDWizard(ied);
      element.workflow.push(() => wizard!);
      await element.requestUpdate();
      inputs = Array.from(element.wizardUI.inputs);
    });

    it('remove IED should return expected actions', async function () {
      const complexAction = removeIEDAndReferences(ied)(
        inputs,
        element.wizardUI
      );

      expect(complexAction.length).to.equal(1);
      expect(complexAction[0]).to.not.satisfy(isSimple);

      const simpleActions = (<ComplexAction>complexAction[0]).actions;
      expect(simpleActions.length).to.equal(12);

      expectDeleteAction(simpleActions[0], 'IED');
      expectDeleteAction(simpleActions[1], 'Association');
      expectDeleteAction(simpleActions[2], 'ClientLN');
      expectDeleteAction(simpleActions[11], 'Inputs');
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });
  });
});
