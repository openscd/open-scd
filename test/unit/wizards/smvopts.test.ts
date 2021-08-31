import { expect, fixture, html } from '@open-wc/testing';

import {
  isUpdate,
  Update,
  Wizard,
  WizardInput,
} from '../../../src/foundation.js';

import { MockWizard } from '../../mock-wizard.js';
import { WizardSelect } from '../../../src/wizard-select.js';

import {
  editSmvOptsWizard,
  updateSmvOptsAction,
} from '../../../src/wizards/smvopts.js';

describe('smvopts wizards', () => {
  let element: MockWizard;

  beforeEach(async () => {
    element = await fixture(html`<mock-wizard></mock-wizard>`);
  });

  describe('editSmvOptsWizard', () => {
    beforeEach(async () => {
      const smvOpts = <Element>(
        new DOMParser().parseFromString(
          `<SmvOpts refreshTime="true" timestamp="true"></SmvOpts>`,
          'application/xml'
        ).documentElement
      );
      const wizard = editSmvOptsWizard(smvOpts);
      element.workflow.push(wizard);
      await element.requestUpdate();
    });
    it('looks like the latest snapshot', async () => {
      expect(element.wizardUI.dialog).to.equalSnapshot();
    }).timeout(5000);
  });

  describe('updateSmvOptsAction', () => {
    let smvOpts: Element;
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
      smvOpts = <Element>(
        new DOMParser().parseFromString(
          `<SmvOpts refreshTime="true" timestamp="true"></SmvOpts>`,
          'application/xml'
        ).documentElement
      );

      wizard = editSmvOptsWizard(smvOpts);
      element.workflow.push(wizard);
      await element.requestUpdate();
      inputs = Array.from(element.wizardUI.inputs);
      await element.requestUpdate();
    });

    it('does not update a SmvOpts element when no attribute has changed', () => {
      const editorAction = updateSmvOptsAction(smvOpts);
      const actions = editorAction(inputs, element.wizardUI);
      expect(actions).to.be.empty;
    });

    it('update a SmvOpts element when only refreshTime attribute changed', async () => {
      const input = <WizardSelect>inputs[0];
      input.value = 'false';
      await input.requestUpdate();
      const editorAction = updateSmvOptsAction(smvOpts);
      const actions = editorAction(inputs, newWizard());
      expect(actions.length).to.equal(1);
      expect(actions[0]).to.satisfy(isUpdate);
      const oldElement = (<Update>actions[0]).old.element;
      const newElement = (<Update>actions[0]).new.element;
      expect(oldElement).to.have.attribute('refreshTime', 'true');
      expect(newElement).to.have.attribute('refreshTime', 'false');
    });

    it('remove a SmvOpts attribute refreshTime with nulled select', async () => {
      const input = <WizardSelect>inputs[0];
      input.nullSwitch?.click();
      await input.requestUpdate();
      const editorAction = updateSmvOptsAction(smvOpts);
      const actions = editorAction(inputs, newWizard());
      expect(actions.length).to.equal(1);
      expect(actions[0]).to.satisfy(isUpdate);
      const oldElement = (<Update>actions[0]).old.element;
      const newElement = (<Update>actions[0]).new.element;
      expect(oldElement).to.have.attribute('refreshTime', 'true');
      expect(newElement).to.not.have.attribute('dataSet');
    });

    it('update a SmvOpts element when only sampleSynchronized attribute changed', async () => {
      const input = <WizardSelect>inputs[1];
      input.nullSwitch?.click();
      input.value = 'true';
      await input.requestUpdate();
      const editorAction = updateSmvOptsAction(smvOpts);
      const actions = editorAction(inputs, newWizard());
      expect(actions.length).to.equal(1);
      expect(actions[0]).to.satisfy(isUpdate);
      const oldElement = (<Update>actions[0]).old.element;
      const newElement = (<Update>actions[0]).new.element;
      expect(oldElement).to.not.have.attribute('sampleSynchronized');
      expect(newElement).to.have.attribute('sampleSynchronized', 'true');
    });

    it('update a SmvOpts element when only sampleRate attribute changed', async () => {
      const input = <WizardSelect>inputs[2];
      input.nullSwitch?.click();
      input.value = 'true';
      await input.requestUpdate();
      const editorAction = updateSmvOptsAction(smvOpts);
      const actions = editorAction(inputs, newWizard());
      expect(actions.length).to.equal(1);
      expect(actions[0]).to.satisfy(isUpdate);
      const oldElement = (<Update>actions[0]).old.element;
      const newElement = (<Update>actions[0]).new.element;
      expect(oldElement).to.not.have.attribute('sampleRate');
      expect(newElement).to.have.attribute('sampleRate', 'true');
    });

    it('update a SmvOpts element when only dataSet attribute changed', async () => {
      const input = <WizardSelect>inputs[3];
      input.nullSwitch?.click();
      input.value = 'true';
      await input.requestUpdate();
      const editorAction = updateSmvOptsAction(smvOpts);
      const actions = editorAction(inputs, newWizard());
      expect(actions.length).to.equal(1);
      expect(actions[0]).to.satisfy(isUpdate);
      const oldElement = (<Update>actions[0]).old.element;
      const newElement = (<Update>actions[0]).new.element;
      expect(oldElement).to.not.have.attribute('dataSet');
      expect(newElement).to.have.attribute('dataSet', 'true');
    });

    it('update a SmvOpts element when only security attribute changed', async () => {
      const input = <WizardSelect>inputs[4];
      input.nullSwitch?.click();
      input.value = 'true';
      await input.requestUpdate();
      const editorAction = updateSmvOptsAction(smvOpts);
      const actions = editorAction(inputs, newWizard());
      expect(actions.length).to.equal(1);
      expect(actions[0]).to.satisfy(isUpdate);
      const oldElement = (<Update>actions[0]).old.element;
      const newElement = (<Update>actions[0]).new.element;
      expect(oldElement).to.not.have.attribute('security');
      expect(newElement).to.have.attribute('security', 'true');
    });

    it('update a SmvOpts element when only timestamp attribute changed', async () => {
      const input = <WizardSelect>inputs[5];
      input.value = 'false';
      await input.requestUpdate();
      const editorAction = updateSmvOptsAction(smvOpts);
      const actions = editorAction(inputs, newWizard());
      expect(actions.length).to.equal(1);
      expect(actions[0]).to.satisfy(isUpdate);
      const oldElement = (<Update>actions[0]).old.element;
      const newElement = (<Update>actions[0]).new.element;
      expect(oldElement).to.have.attribute('timestamp', 'true');
      expect(newElement).to.have.attribute('timestamp', 'false');
    });

    it('update a SmvOpts element when only synchSourceId attribute changed', async () => {
      const input = <WizardSelect>inputs[6];
      input.nullSwitch?.click();
      input.value = 'true';
      await input.requestUpdate();
      const editorAction = updateSmvOptsAction(smvOpts);
      const actions = editorAction(inputs, newWizard());
      expect(actions.length).to.equal(1);
      expect(actions[0]).to.satisfy(isUpdate);
      const oldElement = (<Update>actions[0]).old.element;
      const newElement = (<Update>actions[0]).new.element;
      expect(oldElement).to.not.have.attribute('synchSourceId');
      expect(newElement).to.have.attribute('synchSourceId', 'true');
    });
  });
});
