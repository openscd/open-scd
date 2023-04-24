import { expect, fixture, html } from '@open-wc/testing';
import '../../mock-wizard.js';
import { MockWizard } from '../../mock-wizard.js';

import { WizardTextField } from '../../../src/wizard-textfield.js';
import { SinonSpy, spy } from 'sinon';

import {
  Create,
  isCreate,
  isReplace,
  Replace,
  WizardInputElement,
} from '../../../src/foundation.js';
import {
  createProcessWizard,
  editProcessWizard,
} from '../../../src/wizards/process.js';

describe('Wizards for SCL Process element', () => {
  let doc: XMLDocument;
  let element: MockWizard;
  let inputs: WizardInputElement[];

  let primaryAction: HTMLElement;
  let actionEvent: SinonSpy;

  beforeEach(async () => {
    element = await fixture(html`<mock-wizard></mock-wizard>`);
    doc = await fetch('/test/testfiles/editors/substation/Process.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    actionEvent = spy();
    window.addEventListener('editor-action', actionEvent);
  });

  describe('define an edit wizard that', () => {
    beforeEach(async () => {
      const wizard = editProcessWizard(
        doc.querySelector('Process[name="ProcessGenConduct"]')!
      );
      element.workflow.push(() => wizard);
      await element.requestUpdate();

      inputs = Array.from(element.wizardUI.inputs);

      primaryAction = <HTMLElement>(
        element.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );

      await element.wizardUI.requestUpdate(); // make sure wizard is rendered
    });

    it('looks like the the latest snapshot', async () =>
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot());

    it('triggers simple edit action on primary action click', async () => {
      inputs[0].value = 'someNonEmptyName';

      await element.requestUpdate();
      await primaryAction.click();

      expect(actionEvent).to.be.calledOnce;
      const action = actionEvent.args[0][0].detail.action;
      expect(action).to.satisfy(isReplace);
      const editAction = <Replace>action;

      expect(editAction.new.element).to.have.attribute(
        'name',
        'someNonEmptyName'
      );
    });

    it('allows to create non required attribute desc', async () => {
      (<WizardTextField>inputs[1]).nullSwitch?.click();
      inputs[1].value = 'someDesc';

      await element.requestUpdate();
      await primaryAction.click();

      expect(actionEvent).to.be.calledOnce;
      const action = actionEvent.args[0][0].detail.action;
      expect(action).to.satisfy(isReplace);
      const editAction = <Replace>action;
      expect(editAction.new.element).to.have.attribute('desc', 'someDesc');
    });
    it('allows to create non required attribute type', async () => {
      (<WizardTextField>inputs[2]).nullSwitch?.click();
      inputs[2].value = 'someNonEmptyType';

      await element.requestUpdate();
      await primaryAction.click();

      expect(actionEvent).to.be.calledOnce;
      const action = actionEvent.args[0][0].detail.action;
      expect(action).to.satisfy(isReplace);
      const editAction = <Replace>action;

      expect(editAction.new.element).to.have.attribute(
        'type',
        'someNonEmptyType'
      );
    });
  });
  describe('define a create wizard that', () => {
    beforeEach(async () => {
      const wizard = createProcessWizard(
        doc.querySelector('Process[name="ProcessGenConduct"]')!
      );
      element.workflow.push(() => wizard);
      await element.requestUpdate();

      inputs = Array.from(element.wizardUI.inputs);

      primaryAction = <HTMLElement>(
        element.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );

      await element.wizardUI.requestUpdate(); // make sure wizard is rendered
    });

    it('looks like the the latest snapshot', async () =>
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot());

    it('does not accept empty name attribute', async () => {
      await primaryAction.click();

      expect(actionEvent).to.not.have.been.called;
    });

    it('allows to create required attributes name', async () => {
      inputs[0].value = 'someNonEmptyName';
      await element.requestUpdate();
      await primaryAction.click();

      expect(actionEvent).to.be.calledOnce;
      const action = actionEvent.args[0][0].detail.action;
      expect(action).to.satisfy(isCreate);
      const createAction = <Create>action;

      expect(createAction.new.element).to.have.attribute(
        'name',
        'someNonEmptyName'
      );
    });

    it('allows to create name and non required attribute desc', async () => {
      inputs[0].value = 'someNonEmptyName';
      inputs[1].value = 'someNonEmptyDesc';

      await element.requestUpdate();
      await primaryAction.click();

      expect(actionEvent).to.be.calledOnce;
      const action = actionEvent.args[0][0].detail.action;
      expect(action).to.satisfy(isCreate);
      const createAction = <Create>action;
      expect(createAction.new.element).to.have.attribute(
        'desc',
        'someNonEmptyDesc'
      );
    });

    it('allows to create name and non required attribute type', async () => {
      inputs[0].value = 'someNonEmptyName';
      inputs[2].value = 'someNonEmptyType';

      await element.requestUpdate();
      await primaryAction.click();

      expect(actionEvent).to.be.calledOnce;
      const action = actionEvent.args[0][0].detail.action;
      expect(action).to.satisfy(isCreate);
      const createAction = <Create>action;
      expect(createAction.new.element).to.have.attribute(
        'type',
        'someNonEmptyType'
      );
    });
  });
});
