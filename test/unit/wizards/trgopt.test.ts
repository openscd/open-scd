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
import {
  editTrgOpsWizard,
  updateTrgOpsAction,
} from '../../../src/wizards/trgopt.js';
import { MockWizard } from '../../mock-wizard.js';

describe('trgops wizards', () => {
  let element: MockWizard;

  beforeEach(async () => {
    element = await fixture(html`<mock-wizard></mock-wizard>`);
  });

  describe('updateTrgOpsWizard', () => {
    beforeEach(async () => {
      const trgOps = <Element>(
        new DOMParser().parseFromString(
          `<TrgOps dchg="true" gi="false"></TrgOps>`,
          'application/xml'
        ).documentElement
      );
      const wizard = editTrgOpsWizard(trgOps);
      element.workflow.push(wizard);
      await element.requestUpdate();
    });
    it('looks like the latest snapshot', async () => {
      expect(element.wizardUI.dialog).to.equalSnapshot();
    }).timeout(5000);
  });

  describe('updateTrgOpsAction', () => {
    let reportCb: Element;
    let trgOps: Element;
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
      reportCb = <Element>(
        new DOMParser().parseFromString(
          `<ReportControl><TrgOps dchg="true" gi="false"></TrgOps></ReportControl>`,
          'application/xml'
        ).documentElement
      );
      trgOps = reportCb.querySelector('TrgOps')!;

      wizard = editTrgOpsWizard(trgOps);
      element.workflow.push(wizard);
      await element.requestUpdate();
      inputs = Array.from(element.wizardUI.inputs);
      await element.requestUpdate();
    });

    it('does not update a TrgOps element when no attribute has changed', () => {
      const editorAction = updateTrgOpsAction(trgOps);
      const actions = editorAction(inputs, element.wizardUI);
      expect(actions).to.be.empty;
    });
    it('update a TrgOps element when only dchg attribute changed', async () => {
      const input = <WizardSelect>inputs[0];
      input.value = 'false';
      await input.requestUpdate();
      const editorAction = updateTrgOpsAction(trgOps);
      const actions = editorAction(inputs, newWizard());
      expect(actions.length).to.equal(1);
      expect(actions[0]).to.satisfy(isUpdate);
      const oldElement = (<Update>actions[0]).old.element;
      const newElement = (<Update>actions[0]).new.element;
      expect(oldElement).to.have.attribute('dchg', 'true');
      expect(newElement).to.have.attribute('dchg', 'false');
    });
    it('update a TrgOps element when only qchg attribute changed', async () => {
      const input = <WizardSelect>inputs[1];
      input.nullSwitch?.click();
      await input.requestUpdate();
      input.value = 'false';
      await input.requestUpdate();
      const editorAction = updateTrgOpsAction(trgOps);
      const actions = editorAction(inputs, newWizard());
      expect(actions.length).to.equal(1);
      expect(actions[0]).to.satisfy(isUpdate);
      const oldElement = (<Update>actions[0]).old.element;
      const newElement = (<Update>actions[0]).new.element;
      expect(oldElement).to.not.have.attribute('qchg');
      expect(newElement).to.have.attribute('qchg', 'false');
    });
    it('update a TrgOps element when only dupd attribute changed', async () => {
      const input = <WizardSelect>inputs[2];
      input.nullSwitch?.click();
      await input.requestUpdate();
      input.value = 'true';
      await input.requestUpdate();
      const editorAction = updateTrgOpsAction(trgOps);
      const actions = editorAction(inputs, newWizard());
      expect(actions.length).to.equal(1);
      expect(actions[0]).to.satisfy(isUpdate);
      const oldElement = (<Update>actions[0]).old.element;
      const newElement = (<Update>actions[0]).new.element;
      expect(oldElement).to.not.have.attribute('dupd');
      expect(newElement).to.have.attribute('dupd', 'true');
    });
    it('update a TrgOps element when only gi attribute changed', async () => {
      const input = <WizardSelect>inputs[4];
      input.value = 'true';
      await input.requestUpdate();
      const editorAction = updateTrgOpsAction(trgOps);
      const actions = editorAction(inputs, newWizard());
      expect(actions.length).to.equal(1);
      expect(actions[0]).to.satisfy(isUpdate);
      const oldElement = (<Update>actions[0]).old.element;
      const newElement = (<Update>actions[0]).new.element;
      expect(oldElement).to.have.attribute('gi', 'false');
      expect(newElement).to.have.attribute('gi', 'true');
    });
    it('update a TrgOps element when only period attribute changed', async () => {
      const input = <WizardSelect>inputs[3];
      reportCb.setAttribute('intgPd', '1000');
      input.nullSwitch?.click();
      await input.requestUpdate();
      input.value = 'true';
      await input.requestUpdate();
      const editorAction = updateTrgOpsAction(trgOps);
      const actions = editorAction(inputs, newWizard());
      expect(actions.length).to.equal(1);
      expect(actions[0]).to.satisfy(isUpdate);
      const oldElement = (<Update>actions[0]).old.element;
      const newElement = (<Update>actions[0]).new.element;
      expect(oldElement).to.not.have.attribute('period');
      expect(newElement).to.have.attribute('period', 'true');
    });
    it('on period actiovation makes sure to add missing intgPd in parent control block', async () => {
      const input = <WizardSelect>inputs[3];
      input.nullSwitch?.click();
      await input.requestUpdate();
      input.value = 'true';
      await input.requestUpdate();
      const editorAction = updateTrgOpsAction(trgOps);
      const actions = editorAction(inputs, newWizard());
      expect(actions.length).to.equal(2);
      expect(actions[0]).to.satisfy(isUpdate);
      expect(actions[1]).to.satisfy(isUpdate);
      const oldElement = (<Update>actions[1]).old.element;
      const newElement = (<Update>actions[1]).new.element;
      expect(oldElement).to.not.have.attribute('intgPd');
      expect(newElement).to.have.attribute('intgPd', '1000');
    });
    it('on period deactivation makes sure to remove missing intgPd in parent control block', async () => {
      const input = <WizardSelect>inputs[3];
      reportCb.setAttribute('intgPd', '1000');
      input.nullSwitch?.click();
      input.value = 'false';
      await input.requestUpdate();
      const editorAction = updateTrgOpsAction(trgOps);
      const actions = editorAction(inputs, newWizard());
      expect(actions.length).to.equal(2);
      expect(actions[0]).to.satisfy(isUpdate);
      expect(actions[1]).to.satisfy(isUpdate);
      const oldElement = (<Update>actions[1]).old.element;
      const newElement = (<Update>actions[1]).new.element;
      expect(oldElement).to.have.attribute('intgPd', '1000');
      expect(newElement).to.not.have.attribute('intgPd');
    });
    it('on period remove makes sure to remove missing intgPd in parent control block', async () => {
      trgOps.setAttribute('period', 'true');
      reportCb.setAttribute('intgPd', '1000');

      wizard = editTrgOpsWizard(trgOps);
      element.workflow.push(wizard);
      await element.requestUpdate();
      inputs = Array.from(element.wizardUI.inputs);
      await element.requestUpdate();

      const input = <WizardSelect>inputs[3];
      input.nullSwitch?.click();
      await input.requestUpdate();

      const editorAction = updateTrgOpsAction(trgOps);
      const actions = editorAction(inputs, newWizard());
      expect(actions.length).to.equal(2);
      expect(actions[0]).to.satisfy(isUpdate);
      expect(actions[1]).to.satisfy(isUpdate);
      const oldElement = (<Update>actions[1]).old.element;
      const newElement = (<Update>actions[1]).new.element;
      expect(oldElement).to.have.attribute('intgPd', '1000');
      expect(newElement).to.not.have.attribute('intgPd');
    });
  });
});
