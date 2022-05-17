import { expect, fixture, html } from '@open-wc/testing';

import '../../mock-wizard.js';
import { MockWizard } from '../../mock-wizard.js';

import { WizardTextField } from '../../../src/wizard-textfield.js';
import { WizardInputElement } from '../../../src/foundation.js';

import {
  executeWizardCreateAction,
  executeWizardReplaceAction,
  expectWizardNoUpdateAction,
  fetchDoc,
  setWizardTextFieldValue,
} from '../wizards/test-support.js';
import {
  editCompasSCLWizard,
  updateSCL
} from "../../../src/compas-wizards/scl.js";

describe('Wizards for SCL element (CoMPAS)', () => {
  let doc: XMLDocument;
  let scl: Element;
  let element: MockWizard;
  let inputs: WizardInputElement[];

  async function createWizard(scl: Element): Promise<void> {
    element = await fixture(html`
      <mock-wizard></mock-wizard>`);
    const wizard = editCompasSCLWizard(scl);
    element.workflow.push(() => wizard);
    await element.requestUpdate();
    inputs = Array.from(element.wizardUI.inputs);
  }

  describe('edit scl', () => {
    beforeEach(async () => {
      doc = await fetchDoc('/test/testfiles/compas/compas-scl-private-update-existing.scd');
      scl = doc.querySelector('SCL')!;

      await createWizard(scl);
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });
  });

  describe('edit scl with existing SCL Name Element', () => {
    beforeEach(async () => {
      doc = await fetchDoc('/test/testfiles/compas/compas-scl-private-update-existing.scd');
      scl = doc.querySelector('SCL')!;

      await createWizard(scl);
    });

    it('update SCL Name should be updated in document', async function () {
      await setWizardTextFieldValue(<WizardTextField>inputs[0], 'updated');

      const replaceAction = executeWizardReplaceAction(updateSCL(scl), inputs);
      expect(replaceAction.old.element.tagName).to.be.equal('compas:SclName');
      expect(replaceAction.old.element).to.have.text('existing');
      expect(replaceAction.new.element.tagName).to.be.equal('compas:SclName');
      expect(replaceAction.new.element).to.have.text('updated');
    });

    it('when no fields changed there will be no update action', async function () {
      expectWizardNoUpdateAction(updateSCL(scl), inputs);
    });
  });

  describe('edit scl with missing SCL Name Element', () => {
    beforeEach(async () => {
      doc = await fetchDoc('/test/testfiles/compas/compas-scl-private-missing-scl-name.scd');
      scl = doc.querySelector('SCL')!;

      await createWizard(scl);
    });

    it('update SCL Name should be updated in document', async function () {
      await setWizardTextFieldValue(<WizardTextField>inputs[0], 'updated');

      const createAction = executeWizardCreateAction(updateSCL(scl), inputs);
      expect((<Element>createAction.new.parent).tagName).to.be.equal('Private');
      expect((<Element>createAction.new.element).tagName).to.be.equal('compas:SclName');
      expect(createAction.new.element).to.have.text('updated');
    });
  });

  describe('edit scl with missing Private Element', () => {
    beforeEach(async () => {
      doc = await fetchDoc('/test/testfiles/compas/compas-scl-private-missing-private.scd');
      scl = doc.querySelector('SCL')!;

      await createWizard(scl);
    });

    it('update SCL Name should be updated in document', async function () {
      await setWizardTextFieldValue(<WizardTextField>inputs[0], 'updated');

      const createAction = executeWizardCreateAction(updateSCL(scl), inputs);
      expect((<Element>createAction.new.parent).tagName).to.be.equal('SCL');
      expect((<Element>createAction.new.element).tagName).to.be.equal('Private');

      const newSclNameElement = (<Element>createAction.new.element).querySelector('SclName');
      expect(newSclNameElement).to.not.be.null;
      expect(newSclNameElement!.tagName).to.be.equal('compas:SclName');
      expect(newSclNameElement).to.have.text('updated');
    });
  });
});
