import { expect, fixture, html } from '@open-wc/testing';

import {
  ComplexAction,
  isSimple,
} from '@openscd/core/foundation/deprecated/editor.js';
import '@openscd/open-scd/src/addons/Wizards.js';
import { OscdWizards } from '@openscd/open-scd/src/addons/Wizards.js';
import { WizardInputElement } from '@openscd/open-scd/src/foundation.js';
import { WizardTextField } from '@openscd/open-scd/src/wizard-textfield.js';

import {
  editAccessPointWizard,
  removeAccessPointAndReferences,
  removeAccessPointWizard,
} from '../../../src/wizards/accesspoint.js';
import { updateNamingAttributeWithReferencesAction } from '../../../src/wizards/foundation/actions.js';
import {
  expectDeleteAction,
  expectUpdateAction,
  expectWizardNoUpdateAction,
  fetchDoc,
  setWizardTextFieldValue,
} from './test-support.js';

describe('Wizards for SCL element AccessPoint', () => {
  let doc: XMLDocument;
  let accessPoint: Element;
  let element: OscdWizards;
  let inputs: WizardInputElement[];

  describe('edit AccessPoint', () => {
    beforeEach(async () => {
      doc = await fetchDoc('/test/testfiles/wizards/ied.scd');
      accessPoint = doc.querySelector(
        'IED[name="IED3"] > AccessPoint[name="P1"]'
      )!;

      element = await fixture(
        html`<oscd-wizards .host=${document}></oscd-wizards>`
      );
      const wizard = editAccessPointWizard(accessPoint);
      element.workflow.push(() => wizard);
      await element.requestUpdate();
      inputs = Array.from(element.wizardUI.inputs);
    });

    it('contains a wizard-textfield with the current "name" value', async () => {
      expect(
        (<WizardTextField[]>inputs).find(textField => textField.label == 'name')
          ?.value
      ).to.be.equal(accessPoint.getAttribute('name'));
    });

    it('contains a wizard-textfield with the current "desc" value', async () => {
      expect(
        (<WizardTextField[]>inputs).find(textField => textField.label == 'desc')
          ?.value
      ).to.be.equal(accessPoint.getAttribute('desc') || '');
    });

    it('update name should be updated in document', async function () {
      await setWizardTextFieldValue(<WizardTextField>inputs[0], 'P2');

      const complexAction = updateNamingAttributeWithReferencesAction(
        accessPoint,
        'accesspoint.action.updateAccessPoint'
      )(inputs, element.wizardUI);
      expect(complexAction.length).to.equal(1);
      expect(complexAction[0]).to.not.satisfy(isSimple);

      const simpleActions = (<ComplexAction>complexAction[0]).actions;
      expect(simpleActions.length).to.equal(1);

      expectUpdateAction(simpleActions[0], 'AccessPoint', 'name', 'P1', 'P2');
    });

    it('update name should be unique within IED', async function () {
      accessPoint = doc.querySelector(
        'IED[name="IED3"] > AccessPoint[name="P2"]'
      )!;

      element = await fixture(
        html`<oscd-wizards .host=${document}></oscd-wizards>`
      );
      const wizard = editAccessPointWizard(accessPoint);
      element.workflow.push(() => wizard);
      await element.requestUpdate();
      inputs = Array.from(element.wizardUI.inputs);

      await setWizardTextFieldValue(<WizardTextField>inputs[0], 'P1');
      expect(inputs[0].checkValidity()).to.be.false;
    });

    it('update description should be updated in document', async function () {
      await setWizardTextFieldValue(
        <WizardTextField>inputs[1],
        'New description'
      );

      const complexAction = updateNamingAttributeWithReferencesAction(
        accessPoint,
        'accesspoint.action.updateAccessPoint'
      )(inputs, element.wizardUI);
      expect(complexAction.length).to.equal(1);
      expect(complexAction[0]).to.not.satisfy(isSimple);

      const simpleActions = (<ComplexAction>complexAction[0]).actions;
      expect(simpleActions.length).to.equal(1);

      expectUpdateAction(
        simpleActions[0],
        'AccessPoint',
        'desc',
        null,
        'New description'
      );
    });

    it('when no fields changed there will be no update action', async function () {
      expectWizardNoUpdateAction(
        updateNamingAttributeWithReferencesAction(
          accessPoint,
          'accesspoint.action.updateAccessPoint'
        ),
        element.wizardUI,
        inputs
      );
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });
  });

  describe('remove AccessPoint', () => {
    beforeEach(async () => {
      doc = await fetchDoc('/test/testfiles/editors/minimalVirtualIED.scd');
    });
    describe('with references', () => {
      beforeEach(async () => {
        accessPoint = doc.querySelector(
          'IED[name="test"] > AccessPoint[name="AP1"]'
        )!;

        element = await fixture(
          html`<oscd-wizards .host=${document}></oscd-wizards>`
        );
        const wizard = removeAccessPointWizard(accessPoint);
        element.workflow.push(() => wizard!);
        await element.requestUpdate();
        inputs = Array.from(element.wizardUI.inputs);
      });

      it('should return a wizard when AccessPoint has references', async function () {
        const wizard = removeAccessPointWizard(accessPoint);
        expect(wizard!.length).to.eq(1);
        expect(wizard![0]?.title).to.eq('[accesspoint.wizard.title.delete]');
      });

      it('remove AccessPoint should return expected actions including references', async function () {
        const complexAction = removeAccessPointAndReferences(accessPoint)(
          inputs,
          element.wizardUI
        );

        expect(complexAction.length).to.equal(1);
        expect(complexAction[0]).to.not.satisfy(isSimple);

        const simpleActions = (<ComplexAction>complexAction[0]).actions;
        expect(simpleActions.length).to.be.greaterThan(1);

        expectDeleteAction(simpleActions[0], 'AccessPoint');
        expectDeleteAction(simpleActions[1], 'ServerAt');
      });

      it('looks like the latest snapshot', async () => {
        await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
      });
    });

    describe('without references', () => {
      beforeEach(async () => {
        accessPoint = doc.querySelector(
          'IED[name="test"] > AccessPoint[name="AP2"]'
        )!;
      });

      it('should return null when AccessPoint has no references', async function () {
        const wizard = removeAccessPointWizard(accessPoint);
        expect(wizard).to.be.null;
      });
    });
  });
});
