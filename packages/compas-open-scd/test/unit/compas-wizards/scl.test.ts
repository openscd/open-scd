import { expect, fixture, html } from '@open-wc/testing';

import '@openscd/open-scd/test/mock-wizard-editor.js';
import {MockWizardEditor} from "@openscd/open-scd/test/mock-wizard-editor.js";
import { newWizardEvent } from '@openscd/open-scd/src/foundation.js';

import {WizardTextField} from "@openscd/open-scd/src/wizard-textfield.js";
import {
  Create,
  isCreate,
  isDelete,
  isReplace,
  Replace,
} from "@openscd/core/foundation/deprecated/editor.js";

import {
  Wizard,
  WizardInputElement,
} from "@openscd/open-scd/src/foundation.js";

import {
  fetchDoc,
  setWizardTextFieldValue,
} from "@openscd/plugins/test/unit/wizards/test-support.js";
import { executeWizardComplexAction } from '../wizards/compas-test-support.js';
import {
  editCompasSCLWizard,
  updateSCL,
} from '../../../src/compas-wizards/scl.js';

describe('Wizards for SCL element (CoMPAS)', () => {
  let doc: XMLDocument;
  let scl: Element;
  let element: MockWizardEditor;
  let wizard: Wizard;
  let inputs: WizardInputElement[];

  async function createWizard(scl: Element): Promise<void> {
    element = await fixture(html` <mock-wizard-editor></mock-wizard-editor>`);
    wizard = editCompasSCLWizard(scl);
    element.dispatchEvent(newWizardEvent(wizard));
    await element.requestUpdate();
    inputs = Array.from(element.wizardUI.inputs);
  }

  describe('edit scl', () => {
    beforeEach(async () => {
      doc = await fetchDoc(
        '/test/testfiles/compas/compas-scl-private-update-existing.scd'
      );
      scl = doc.querySelector('SCL')!;

      await createWizard(scl);
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });
  });

  describe('edit scl with existing SCL Name Element', () => {
    beforeEach(async () => {
      doc = await fetchDoc(
        '/test/testfiles/compas/compas-scl-private-update-existing.scd'
      );
      scl = doc.querySelector('SCL')!;

      await createWizard(scl);
    });

    it('update SCL Name should be updated in document', async function () {
      await setWizardTextFieldValue(<WizardTextField>inputs[0], 'updated');

      const complexAction = executeWizardComplexAction(
        updateSCL(scl),
        element.wizardUI,
        inputs
      );

      expect(complexAction.actions.length).to.be.equal(3);
      expect(complexAction.actions[0]).to.satisfy(isReplace);

      const replaceAction = <Replace>complexAction.actions[0];
      expect(replaceAction.old.element.tagName).to.be.equal('compas:SclName');
      expect(replaceAction.old.element.textContent).to.be.equal('existing');
      expect(replaceAction.new.element.textContent).to.be.equal('updated');

      expect(complexAction.actions[1]).to.satisfy(isDelete);
      expect(complexAction.actions[2]).to.satisfy(isCreate);
    });

    it('when no fields changed there will only be a Labels change', async function () {
      const complexAction = executeWizardComplexAction(
        updateSCL(scl),
        element.wizardUI,
        inputs
      );

      expect(complexAction.actions.length).to.be.equal(2);
      expect(complexAction.actions[0]).to.satisfy(isDelete);
      expect(complexAction.actions[1]).to.satisfy(isCreate);
    });
  });

  describe('edit scl with missing SCL Name Element', () => {
    beforeEach(async () => {
      doc = await fetchDoc(
        '/test/testfiles/compas/compas-scl-private-missing-compas-elements.scd'
      );
      scl = doc.querySelector('SCL')!;

      await createWizard(scl);
    });

    it('update SCL Name should be updated in document', async function () {
      await setWizardTextFieldValue(<WizardTextField>inputs[0], 'updated');

      const complexAction = executeWizardComplexAction(
        updateSCL(scl),
        element.wizardUI,
        inputs
      );

      expect(complexAction.actions.length).to.be.equal(2);
      expect(complexAction.actions[0]).to.satisfy(isCreate);

      const createAction = <Create>complexAction.actions[0];
      expect((<Element>createAction.new.parent).tagName).to.be.equal('Private');
      expect((<Element>createAction.new.element).tagName).to.be.equal(
        'compas:SclName'
      );
      expect(createAction.new.element).to.have.text('updated');
    });
  });

  describe('edit scl with missing Private Element', () => {
    beforeEach(async () => {
      doc = await fetchDoc(
        '/test/testfiles/compas/compas-scl-private-missing-private.scd'
      );
      scl = doc.querySelector('SCL')!;

      await createWizard(scl);
    });

    it('update SCL Name should be updated in document', async function () {
      await setWizardTextFieldValue(<WizardTextField>inputs[0], 'updated');

      const complexAction = executeWizardComplexAction(
        updateSCL(scl),
        element.wizardUI,
        inputs
      );

      expect(complexAction.actions.length).to.be.equal(2);
      expect(complexAction.actions[0]).to.satisfy(isCreate);

      // Because the private is created for the Labels outside the Actions it will be the same
      // Create Action being returned, but the Private Element is added directly to the SCL Element.
      const createAction = <Create>complexAction.actions[0];
      expect((<Element>createAction.new.parent).tagName).to.be.equal('Private');
      expect((<Element>createAction.new.element).tagName).to.be.equal(
        'compas:SclName'
      );
      expect(createAction.new.element).to.have.text('updated');
    });
  });
});
