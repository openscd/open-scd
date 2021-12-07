import { expect, fixture, html } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';

import '../../mock-wizard.js';
import { MockWizard } from '../../mock-wizard.js';

import { isUpdate, Update, WizardInput } from '../../../src/foundation.js';
import { WizardSelect } from '../../../src/wizard-select.js';
import { editTrgOpsWizard } from '../../../src/wizards/trgops.js';

describe('Wizards for SCL TrgOps element', () => {
  let element: MockWizard;
  let trgOps: Element;
  let inputs: WizardInput[];

  let primaryAction: HTMLElement;

  let actionEvent: SinonSpy;

  beforeEach(async () => {
    element = await fixture(html`<mock-wizard></mock-wizard>`);
    trgOps = <Element>(
      new DOMParser().parseFromString(
        `<TrgOps dchg="true" gi="false"></TrgOps>`,
        'application/xml'
      ).documentElement
    );

    actionEvent = spy();
    window.addEventListener('editor-action', actionEvent);
  });

  describe('define an edit wizard that', () => {
    beforeEach(async () => {
      const wizard = editTrgOpsWizard(trgOps);
      element.workflow.push(wizard);
      await element.requestUpdate();

      inputs = Array.from(element.wizardUI.inputs);
      await element.requestUpdate();

      primaryAction = <HTMLElement>(
        element.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    }).timeout(5000);

    it('does not update the TrgOps element with no changed attributes', async () => {
      primaryAction.click();
      await element.requestUpdate();
      expect(actionEvent.notCalled).to.be.true;
    });

    it('updates the TrgOps element with changed dchg attribute', async () => {
      const input = <WizardSelect>inputs[0];
      input.value = 'false';
      await input.requestUpdate();

      primaryAction.click();
      await element.requestUpdate();
      expect(actionEvent).to.be.calledOnce;

      const action = actionEvent.args[0][0].detail.action;
      expect(action).to.satisfy(isUpdate);

      const updateAction = <Update>action;
      expect(updateAction.old.element).to.have.attribute('dchg', 'true');
      expect(updateAction.new.element).to.have.attribute('dchg', 'false');
    });

    it('updates the TrgOps element with changed qchg attribute', async () => {
      const input = <WizardSelect>inputs[1];
      input.nullSwitch?.click();
      input.value = 'false';
      await input.requestUpdate();

      primaryAction.click();
      await element.requestUpdate();
      expect(actionEvent).to.be.calledOnce;

      const action = actionEvent.args[0][0].detail.action;
      expect(action).to.satisfy(isUpdate);

      const updateAction = <Update>action;
      expect(updateAction.old.element).to.not.have.attribute('qchg');
      expect(updateAction.new.element).to.have.attribute('qchg', 'false');
    });

    it('updates the TrgOps element with changed dupd attribute', async () => {
      const input = <WizardSelect>inputs[2];
      input.nullSwitch?.click();
      input.value = 'true';
      await input.requestUpdate();

      primaryAction.click();
      await element.requestUpdate();
      expect(actionEvent).to.be.calledOnce;

      const action = actionEvent.args[0][0].detail.action;
      expect(action).to.satisfy(isUpdate);

      const updateAction = <Update>action;
      expect(updateAction.old.element).to.not.have.attribute('dupd');
      expect(updateAction.new.element).to.have.attribute('dupd', 'true');
    });

    it('updates the TrgOps element with changed gi attribute', async () => {
      const input = <WizardSelect>inputs[4];
      input.value = 'true';
      await input.requestUpdate();

      primaryAction.click();
      await element.requestUpdate();
      expect(actionEvent).to.be.calledOnce;

      const action = actionEvent.args[0][0].detail.action;
      expect(action).to.satisfy(isUpdate);

      const updateAction = <Update>action;
      expect(updateAction.old.element).to.have.attribute('gi', 'false');
      expect(updateAction.new.element).to.have.attribute('gi', 'true');
    });

    it('updates the TrgOps element with changed period attribute', async () => {
      const input = <WizardSelect>inputs[3];
      input.nullSwitch?.click();
      input.value = 'true';
      await input.requestUpdate();

      primaryAction.click();
      await element.requestUpdate();
      expect(actionEvent).to.be.calledOnce;

      const action = actionEvent.args[0][0].detail.action;
      expect(action).to.satisfy(isUpdate);

      const updateAction = <Update>action;
      expect(updateAction.old.element).to.not.have.attribute('period');
      expect(updateAction.new.element).to.have.attribute('period', 'true');
    });

    describe('with existing parent report control block', () => {
      let reportControlBlock: Element;

      beforeEach(async () => {
        reportControlBlock = <Element>(
          new DOMParser().parseFromString(
            `<ReportControl><TrgOps gi="false"></TrgOps></ReportControl>`,
            'application/xml'
          ).documentElement
        );
        trgOps = reportControlBlock.querySelector('TrgOps')!;
        element.workflow.length = 0;
        const wizard = editTrgOpsWizard(trgOps);
        element.workflow.push(wizard);
        await element.requestUpdate();

        inputs = Array.from(element.wizardUI.inputs);
        await element.requestUpdate();

        primaryAction = <HTMLElement>(
          element.wizardUI.dialog?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        );
      });

      it('adds missing intgPd in parent report control block with selected period', async () => {
        const input = <WizardSelect>inputs[3];
        input.nullSwitch?.click();
        input.value = 'true';
        await input.requestUpdate();

        primaryAction.click();
        await element.requestUpdate();
        expect(actionEvent).to.be.calledTwice;

        const action1 = actionEvent.args[0][0].detail.action;
        const action2 = actionEvent.args[1][0].detail.action;

        expect(action1).to.satisfy(isUpdate);
        expect(action2).to.satisfy(isUpdate);

        const updateAction2 = <Update>action2;

        expect(updateAction2.old.element).to.not.have.attribute('intgPd');
        expect(updateAction2.new.element).to.have.attribute('intgPd', '1000');
      });

      it('removes intgPd in parent report control block with deselected period', async () => {
        const input = <WizardSelect>inputs[3];
        reportControlBlock.setAttribute('intgPd', '1000');
        input.nullSwitch?.click();
        input.value = 'false';
        await input.requestUpdate();

        primaryAction.click();
        await element.requestUpdate();
        expect(actionEvent).to.be.calledTwice;

        const action1 = actionEvent.args[0][0].detail.action;
        const action2 = actionEvent.args[1][0].detail.action;

        expect(action1).to.satisfy(isUpdate);
        expect(action2).to.satisfy(isUpdate);

        const updateAction2 = <Update>action2;
        expect(updateAction2.old.element).to.have.attribute('intgPd', '1000');
        expect(updateAction2.new.element).to.not.have.attribute('intgPd');
      });

      it('does not falsely add intgPd in parent report control block', async () => {
        const input = <WizardSelect>inputs[3];
        reportControlBlock.setAttribute('intgPd', '1000');
        input.nullSwitch?.click();
        input.value = 'true';
        await input.requestUpdate();

        primaryAction.click();
        await element.requestUpdate();
        expect(actionEvent).to.be.calledOnce;
      });

      it('does not falsely remove intgPd in parent report control block', async () => {
        const input = <WizardSelect>inputs[3];
        input.nullSwitch?.click();
        input.value = 'false';
        await input.requestUpdate();

        primaryAction.click();
        await element.requestUpdate();
        expect(actionEvent).to.be.calledOnce;
      });
    });
  });
});
