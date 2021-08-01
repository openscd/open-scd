import { expect, fixture, html } from '@open-wc/testing';
import {
  isUpdate,
  Update,
  Wizard,
  WizardInput,
} from '../../../src/foundation.js';
import { WizardTextField } from '../../../src/wizard-textfield.js';
import {
  editDataSetWizard,
  updateDataSetAction,
} from '../../../src/wizards/dataset.js';
import { MockWizard } from '../../mock-wizard.js';

describe('dataset wizards', () => {
  let doc: XMLDocument;
  let element: MockWizard;

  beforeEach(async () => {
    element = await fixture(html`<mock-wizard></mock-wizard>`);
    doc = await fetch('/base/test/testfiles/wizards/gsecontrol.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('editDataSetWizard', () => {
    beforeEach(async () => {
      const wizard = editDataSetWizard(
        doc.querySelector('IED[name="IED2"] DataSet[name="GooseDataSet1"]')!
      );
      element.workflow.push(wizard);
      await element.requestUpdate();
    });
    it('looks like the latest snapshot', async () => {
      expect(element.wizardUI.dialog).to.equalSnapshot();
    }).timeout(5000);
  });

  describe('updateDataSetAction', () => {
    let dataSet: Element;
    let inputs: WizardInput[];
    let wizard: Wizard;

    const noOp = () => {
      return;
    };
    const newWizard = (done = noOp) => {
      const element = document.createElement('mwc-dialog');
      element.close = done;
      return element;
    };

    beforeEach(async () => {
      dataSet = doc.querySelector(
        'IED[name="IED2"] DataSet[name="GooseDataSet1"]'
      )!;
      wizard = editDataSetWizard(
        doc.querySelector('IED[name="IED2"] DataSet[name="GooseDataSet1"]')!
      );
      element.workflow.push(wizard);
      await element.requestUpdate();
      inputs = Array.from(element.wizardUI.inputs);
      await element.requestUpdate();
    });

    it('does not update a DataSet element when no attribute has changed', () => {
      const editorAction = updateDataSetAction(dataSet);
      expect(editorAction(inputs, newWizard())).to.be.empty;
    });
    it('update a DataSet element when only name attribute changed', async () => {
      const input = <WizardTextField>inputs[0];
      input.value = 'myNewDataSetName';
      await input.requestUpdate();
      const editorAction = updateDataSetAction(dataSet);
      const updateActions = editorAction(inputs, newWizard());
      expect(updateActions[0]).to.satisfy(isUpdate);
      const updateAction = <Update>updateActions[0];
      expect(updateAction.old.element).to.have.attribute(
        'name',
        'GooseDataSet1'
      );
      expect(updateAction.new.element).to.have.attribute(
        'name',
        'myNewDataSetName'
      );
    });
    it('update a datSet of the referenced control blocks', async () => {
      const input = <WizardTextField>inputs[0];
      input.value = 'myNewDataSetName';
      await input.requestUpdate();
      const editorAction = updateDataSetAction(dataSet);
      const updateActions = editorAction(inputs, newWizard());
      for (const updateAction of updateActions) {
        if (updateActions[0] !== updateAction) {
          expect(updateAction).to.satisfy(isUpdate);
          expect((<Update>updateAction).old.element).to.have.attribute(
            'datSet',
            'GooseDataSet1'
          );
          expect((<Update>updateAction).new.element).to.have.attribute(
            'datSet',
            'myNewDataSetName'
          );
        }
      }
    });
    it('update a GSEControl element when only desc attribute changed', async () => {
      const input = <WizardTextField>inputs[1];
      input.nullSwitch?.click();
      input.value = 'myDesc';
      await input.requestUpdate();
      const editorAction = updateDataSetAction(dataSet);
      const updateActions = editorAction(inputs, newWizard());
      expect(updateActions.length).to.equal(1);
      expect(updateActions[0]).to.satisfy(isUpdate);
      const updateAction = <Update>updateActions[0];
      expect(updateAction.old.element).to.not.have.attribute('desc');
      expect(updateAction.new.element).to.have.attribute('desc', 'myDesc');
    });
  });
});
