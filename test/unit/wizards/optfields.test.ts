import { expect, fixture, html } from '@open-wc/testing';

import {
  isUpdate,
  Update,
  Wizard,
  WizardInput,
} from '../../../src/foundation.js';
import { WizardSelect } from '../../../src/wizard-select.js';
import {
  editOptFieldsWizard,
  updateOptFieldsAction,
} from '../../../src/wizards/optfields.js';
import { MockWizard } from '../../mock-wizard.js';

describe('optfields wizards', () => {
  let element: MockWizard;

  beforeEach(async () => {
    element = await fixture(html`<mock-wizard></mock-wizard>`);
  });

  describe('updateOptFieldsWizard', () => {
    beforeEach(async () => {
      const optFields = <Element>(
        new DOMParser().parseFromString(
          `<OptFields dataSet="true" bufOvfl="true"></OptFields>`,
          'application/xml'
        ).documentElement
      );
      const wizard = editOptFieldsWizard(optFields);
      element.workflow.push(wizard);
      await element.requestUpdate();
    });
    it('looks like the latest snapshot', async () => {
      expect(element.wizardUI.dialog).to.equalSnapshot();
    }).timeout(5000);
  });

  describe('updateOptFieldsAction', () => {
    let optFields: Element;
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
      optFields = <Element>(
        new DOMParser().parseFromString(
          `<OptFields dataSet="true" bufOvfl="true"></OptFields>`,
          'application/xml'
        ).documentElement
      );

      wizard = editOptFieldsWizard(optFields);
      element.workflow.push(wizard);
      await element.requestUpdate();
      inputs = Array.from(element.wizardUI.inputs);
      await element.requestUpdate();
    });

    it('does not update a OptFields element when no attribute has changed', () => {
      const editorAction = updateOptFieldsAction(optFields);
      const actions = editorAction(inputs, element.wizardUI);
      expect(actions).to.be.empty;
    });
    it('update a OptFields element when only dataSet attribute changed', async () => {
      const input = <WizardSelect>inputs[2];
      input.value = 'false';
      await input.requestUpdate();
      const editorAction = updateOptFieldsAction(optFields);
      const actions = editorAction(inputs, newWizard());
      expect(actions.length).to.equal(1);
      expect(actions[0]).to.satisfy(isUpdate);
      const oldElement = (<Update>actions[0]).old.element;
      const newElement = (<Update>actions[0]).new.element;
      expect(oldElement).to.have.attribute('dataSet', 'true');
      expect(newElement).to.have.attribute('dataSet', 'false');
    });
    it('remove a OptFields attribute dataSet with nulled select', async () => {
      const input = <WizardSelect>inputs[2];
      input.nullSwitch?.click();
      await input.requestUpdate();
      const editorAction = updateOptFieldsAction(optFields);
      const actions = editorAction(inputs, newWizard());
      expect(actions.length).to.equal(1);
      expect(actions[0]).to.satisfy(isUpdate);
      const oldElement = (<Update>actions[0]).old.element;
      const newElement = (<Update>actions[0]).new.element;
      expect(oldElement).to.have.attribute('dataSet', 'true');
      expect(newElement).to.not.have.attribute('dataSet');
    });
    it('update a OptFields element when only seqNum attribute changed', async () => {
      const input = <WizardSelect>inputs[0];
      input.nullSwitch?.click();
      input.value = 'true';
      await input.requestUpdate();
      const editorAction = updateOptFieldsAction(optFields);
      const actions = editorAction(inputs, newWizard());
      expect(actions.length).to.equal(1);
      expect(actions[0]).to.satisfy(isUpdate);
      const oldElement = (<Update>actions[0]).old.element;
      const newElement = (<Update>actions[0]).new.element;
      expect(oldElement).to.not.have.attribute('seqNum');
      expect(newElement).to.have.attribute('seqNum', 'true');
    });
    it('update a OptFields element when only timeStamp attribute changed', async () => {
      const input = <WizardSelect>inputs[1];
      input.nullSwitch?.click();
      input.value = 'true';
      await input.requestUpdate();
      const editorAction = updateOptFieldsAction(optFields);
      const actions = editorAction(inputs, newWizard());
      expect(actions.length).to.equal(1);
      expect(actions[0]).to.satisfy(isUpdate);
      const oldElement = (<Update>actions[0]).old.element;
      const newElement = (<Update>actions[0]).new.element;
      expect(oldElement).to.not.have.attribute('timeStamp');
      expect(newElement).to.have.attribute('timeStamp', 'true');
    });
    it('update a OptFields element when only reasonCode attribute changed', async () => {
      const input = <WizardSelect>inputs[3];
      input.nullSwitch?.click();
      input.value = 'true';
      await input.requestUpdate();
      const editorAction = updateOptFieldsAction(optFields);
      const actions = editorAction(inputs, newWizard());
      expect(actions.length).to.equal(1);
      expect(actions[0]).to.satisfy(isUpdate);
      const oldElement = (<Update>actions[0]).old.element;
      const newElement = (<Update>actions[0]).new.element;
      expect(oldElement).to.not.have.attribute('reasonCode');
      expect(newElement).to.have.attribute('reasonCode', 'true');
    });
    it('update a OptFields element when only dataRef attribute changed', async () => {
      const input = <WizardSelect>inputs[4];
      input.nullSwitch?.click();
      input.value = 'true';
      await input.requestUpdate();
      const editorAction = updateOptFieldsAction(optFields);
      const actions = editorAction(inputs, newWizard());
      expect(actions.length).to.equal(1);
      expect(actions[0]).to.satisfy(isUpdate);
      const oldElement = (<Update>actions[0]).old.element;
      const newElement = (<Update>actions[0]).new.element;
      expect(oldElement).to.not.have.attribute('dataRef');
      expect(newElement).to.have.attribute('dataRef', 'true');
    });
    it('update a OptFields element when only entryID attribute changed', async () => {
      const input = <WizardSelect>inputs[5];
      input.nullSwitch?.click();
      input.value = 'true';
      await input.requestUpdate();
      const editorAction = updateOptFieldsAction(optFields);
      const actions = editorAction(inputs, newWizard());
      expect(actions.length).to.equal(1);
      expect(actions[0]).to.satisfy(isUpdate);
      const oldElement = (<Update>actions[0]).old.element;
      const newElement = (<Update>actions[0]).new.element;
      expect(oldElement).to.not.have.attribute('entryID');
      expect(newElement).to.have.attribute('entryID', 'true');
    });
    it('update a OptFields element when only configRef attribute changed', async () => {
      const input = <WizardSelect>inputs[6];
      input.nullSwitch?.click();
      input.value = 'true';
      await input.requestUpdate();
      const editorAction = updateOptFieldsAction(optFields);
      const actions = editorAction(inputs, newWizard());
      expect(actions.length).to.equal(1);
      expect(actions[0]).to.satisfy(isUpdate);
      const oldElement = (<Update>actions[0]).old.element;
      const newElement = (<Update>actions[0]).new.element;
      expect(oldElement).to.not.have.attribute('configRef');
      expect(newElement).to.have.attribute('configRef', 'true');
    });
    it('update a OptFields element when only bufOvfl attribute changed', async () => {
      const input = <WizardSelect>inputs[7];
      input.value = 'false';
      await input.requestUpdate();
      const editorAction = updateOptFieldsAction(optFields);
      const actions = editorAction(inputs, newWizard());
      expect(actions.length).to.equal(1);
      expect(actions[0]).to.satisfy(isUpdate);
      const oldElement = (<Update>actions[0]).old.element;
      const newElement = (<Update>actions[0]).new.element;
      expect(oldElement).to.have.attribute('bufOvfl', 'true');
      expect(newElement).to.have.attribute('bufOvfl', 'false');
    });
  });
});
