import { expect, fixture, html } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';

import '../../mock-wizard.js';
import { MockWizard } from '../../mock-wizard.js';

import { WizardCheckbox } from '../../../src/wizard-checkbox.js';
import { isReplace, Replace } from '../../../src/foundation.js';
import { editSmvOptsWizard } from '../../../src/wizards/smvopts.js';

describe('Wizards for SCL SmvOpts element', () => {
  let element: MockWizard;
  let smvOpts: Element;
  let inputs: WizardCheckbox[];

  let primaryAction: HTMLElement;

  let actionEvent: SinonSpy;

  beforeEach(async () => {
    element = await fixture(html`<mock-wizard></mock-wizard>`);
    smvOpts = <Element>(
      new DOMParser().parseFromString(
        `<SmvOpts refreshTime="true" dataSet="true"></SmvOpts>`,
        'application/xml'
      ).documentElement
    );

    actionEvent = spy();
    window.addEventListener('editor-action', actionEvent);
  });

  describe('define an edit wizard that', () => {
    beforeEach(async () => {
      const wizard = editSmvOptsWizard(smvOpts);
      element.workflow.push(() => wizard);
      await element.requestUpdate();

      inputs = <WizardCheckbox[]>(<unknown>Array.from(element.wizardUI.inputs));
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

    it('does not update a SmvOpts element with no changed attributes', async () => {
      primaryAction.click();
      await element.requestUpdate();
      expect(actionEvent.notCalled).to.be.true;
    });

    it('update the SmvOpts element with changed dataSet attribute', async () => {
      const input = inputs[2];
      input.maybeValue = 'false';
      await input.requestUpdate();

      primaryAction.click();
      await element.requestUpdate();
      expect(actionEvent).to.be.calledOnce;

      const action = actionEvent.args[0][0].detail.action;
      expect(action).to.satisfy(isReplace);

      const updateAction = <Replace>action;
      expect(updateAction.old.element).to.have.attribute('dataSet', 'true');
      expect(updateAction.new.element).to.have.attribute('dataSet', 'false');
    });

    it('removes the SmvOpts attribute dataSet with nulled select', async () => {
      const input = inputs[2];
      input.nullSwitch?.click();
      await input.requestUpdate();

      primaryAction.click();
      await element.requestUpdate();
      expect(actionEvent).to.be.calledOnce;

      const action = actionEvent.args[0][0].detail.action;
      expect(action).to.satisfy(isReplace);

      const updateAction = <Replace>action;
      expect(updateAction.old.element).to.have.attribute('dataSet', 'true');
      expect(updateAction.new.element).to.not.have.attribute('dataSet');
    });

    it('updates the SmvOpts element with changed refreshTime attribute', async () => {
      const input = inputs[0];
      input.maybeValue = 'false';
      await input.requestUpdate();

      primaryAction.click();
      await element.requestUpdate();
      expect(actionEvent).to.be.calledOnce;

      const action = actionEvent.args[0][0].detail.action;
      expect(action).to.satisfy(isReplace);

      const updateAction = <Replace>action;
      expect(updateAction.old.element).to.have.attribute('refreshTime', 'true');
      expect(updateAction.new.element).to.have.attribute(
        'refreshTime',
        'false'
      );
    });

    it('updates the SmvOpts element with changed sampleRate attribute', async () => {
      const input = inputs[1];
      input.nullSwitch?.click();
      input.maybeValue = 'true';
      await input.requestUpdate();

      primaryAction.click();
      await element.requestUpdate();
      expect(actionEvent).to.be.calledOnce;

      const action = actionEvent.args[0][0].detail.action;
      expect(action).to.satisfy(isReplace);

      const updateAction = <Replace>action;
      expect(updateAction.old.element).to.not.have.attribute('sampleRate');
      expect(updateAction.new.element).to.have.attribute('sampleRate', 'true');
    });

    it('updates the SmvOpts element with changed security attribute', async () => {
      const input = inputs[3];
      input.nullSwitch?.click();
      input.maybeValue = 'true';
      await input.requestUpdate();

      primaryAction.click();
      await element.requestUpdate();
      expect(actionEvent).to.be.calledOnce;

      const action = actionEvent.args[0][0].detail.action;
      expect(action).to.satisfy(isReplace);

      const updateAction = <Replace>action;
      expect(updateAction.old.element).to.not.have.attribute('security');
      expect(updateAction.new.element).to.have.attribute('security', 'true');
    });

    it('updates the SmvOpts element with changed synchSourceId attribute', async () => {
      const input = inputs[4];
      input.nullSwitch?.click();
      input.maybeValue = 'true';
      await input.requestUpdate();

      primaryAction.click();
      await element.requestUpdate();
      expect(actionEvent).to.be.calledOnce;

      const action = actionEvent.args[0][0].detail.action;
      expect(action).to.satisfy(isReplace);

      const updateAction = <Replace>action;
      expect(updateAction.old.element).to.not.have.attribute('synchSourceId');
      expect(updateAction.new.element).to.have.attribute(
        'synchSourceId',
        'true'
      );
    });
  });
});
