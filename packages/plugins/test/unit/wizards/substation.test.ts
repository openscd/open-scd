import { expect, fixture, html } from '@open-wc/testing';

import '@openscd/open-scd/src/addons/Wizards.js';
import { OscdWizards } from '@openscd/open-scd/src/addons/Wizards.js';

import { WizardTextField } from '@openscd/open-scd/src/wizard-textfield.js';
import {
  WizardInputElement,
} from '@openscd/open-scd/src/foundation.js';
import { isSimple, ComplexAction } from '@openscd/core/foundation/deprecated/editor.js';

import {
  executeWizardCreateAction,
  expectReplaceAction,
  expectUpdateAction,
  expectWizardNoUpdateAction,
  fetchDoc,
  setWizardTextFieldValue,
} from './test-support.js';
import { updateNamingAttributeWithReferencesAction } from '../../../src/wizards/foundation/actions.js';
import {
  createAction,
  createSubstationWizard,
  substationEditWizard,
} from '../../../src/wizards/substation.js';

describe('Wizards for SCL element Substation', () => {
  let doc: XMLDocument;
  let substation: Element;
  let element: OscdWizards;
  let inputs: WizardInputElement[];

  describe('edit existing Substation', () => {
    beforeEach(async () => {
      doc = await fetchDoc('/test/testfiles/wizards/substation.scd');
      substation = doc.querySelector('Substation[name="Sub1"]')!;

      element = await fixture(
        html`<oscd-wizards .host=${document}></oscd-wizards>`
      );
      const wizard = substationEditWizard(substation);
      element.workflow.push(() => wizard);
      await element.requestUpdate();
      inputs = Array.from(element.wizardUI.inputs);
    });

    it('update name should be updated in document', async function () {
      await setWizardTextFieldValue(<WizardTextField>inputs[0], 'OtherSub1');

      const complexAction = updateNamingAttributeWithReferencesAction(
        substation,
        'substation.action.updatesubstation'
      )(inputs, element.wizardUI);
      expect(complexAction.length).to.equal(1);
      expect(complexAction[0]).to.not.satisfy(isSimple);

      const simpleActions = (<ComplexAction>complexAction[0]).actions;
      expect(simpleActions.length).to.equal(7);

      expectUpdateAction(
        simpleActions[0],
        'Substation',
        'name',
        'Sub1',
        'OtherSub1'
      );
      expectReplaceAction(
        simpleActions[1],
        'Terminal',
        'substationName',
        'Sub1',
        'OtherSub1'
      );
    });

    it('update description should be updated in document', async function () {
      await setWizardTextFieldValue(
        <WizardTextField>inputs[1],
        'Some description'
      );

      const complexAction = updateNamingAttributeWithReferencesAction(
        substation,
        'substation.action.updatesubstation'
      )(inputs, element.wizardUI);
      expect(complexAction.length).to.equal(1);
      expect(complexAction[0]).to.not.satisfy(isSimple);

      const simpleActions = (<ComplexAction>complexAction[0]).actions;
      expect(simpleActions.length).to.equal(1);

      expectUpdateAction(
        simpleActions[0],
        'Substation',
        'desc',
        'Substation 1',
        'Some description'
      );
    });

    it('when no fields changed there will be no update action', async function () {
      expectWizardNoUpdateAction(
        updateNamingAttributeWithReferencesAction(
          substation,
          'substation.action.updatesubstation'
        ),
        element.wizardUI,
        inputs
      );
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });
  });

  describe('add new Substation', () => {
    let parent: Element;

    beforeEach(async () => {
      doc = await fetchDoc('/test/testfiles/wizards/substation.scd');
      parent = doc.querySelector('SCL')!;

      element = await fixture(
        html`<oscd-wizards .host=${document}></oscd-wizards>`
      );
      const wizard = createSubstationWizard(parent);
      element.workflow.push(() => wizard);
      await element.requestUpdate();
      inputs = Array.from(element.wizardUI.inputs);
    });

    it('create new Substation', async function () {
      await setWizardTextFieldValue(<WizardTextField>inputs[0], 'NewSub');

      const createAC = executeWizardCreateAction(
        createAction(parent),
        element.wizardUI,
        inputs
      );
      expect(createAC.new.element).to.have.attribute('name', 'NewSub');
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });
  });
});
