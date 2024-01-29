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
import { createLineWizard, editLineWizard } from '../../../src/wizards/line.js';
import { WizardCheckbox } from '../../../src/wizard-checkbox.js';

describe('Wizards for SCL Line element', () => {
  let doc: XMLDocument;
  let element: MockWizard;
  let inputs: WizardInputElement[];

  let primaryAction: HTMLElement;
  let actionEvent: SinonSpy;

  beforeEach(async () => {
    element = await fixture(html`<mock-wizard></mock-wizard>`);
    doc = await fetch('/test/testfiles/editors/substation/Line.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    actionEvent = spy();
    window.addEventListener('editor-action', actionEvent);
  });
  describe('define an edit wizard that', () => {
    beforeEach(async () => {
      const wizard = editLineWizard(doc.querySelector('Line[name="Berlin"]')!);
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
      inputs[0].value = '';
      await element.requestUpdate();
      await primaryAction.click();
      expect(actionEvent).to.not.have.been.called;
    });
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
      inputs[1].value = 'someNonEmptyDesc';

      await element.requestUpdate();
      await primaryAction.click();

      expect(actionEvent).to.be.calledOnce;
      const action = actionEvent.args[0][0].detail.action;
      expect(action).to.satisfy(isReplace);
      const editAction = <Replace>action;

      expect(editAction.new.element).to.have.attribute(
        'desc',
        'someNonEmptyDesc'
      );
    });
    it('allows to create non required attribute type', async () => {
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
    it('allows to create non required attribute nomFreq', async () => {
      inputs[3].value = '50';

      await element.requestUpdate();
      await primaryAction.click();

      expect(actionEvent).to.be.calledOnce;
      const action = actionEvent.args[0][0].detail.action;
      expect(action).to.satisfy(isReplace);
      const editAction = <Replace>action;

      expect(editAction.new.element).to.have.attribute('nomFreq', '50');
    });
    it('allows to create non required attribute numPhases', async () => {
      inputs[4].value = '3';

      await element.requestUpdate();
      await primaryAction.click();

      expect(actionEvent).to.be.calledOnce;
      const action = actionEvent.args[0][0].detail.action;
      expect(action).to.satisfy(isReplace);
      const editAction = <Replace>action;

      expect(editAction.new.element).to.have.attribute('numPhases', '3');
    });
  });

  describe('define a create wizard that', () => {
    beforeEach(async () => {
      const wizard = createLineWizard(
        doc.querySelector('Line[name="Berlin"]')!
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

    it('allows to create name and non required attribute nomFreq', async () => {
      inputs[0].value = 'someNonEmptyName';
      inputs[3].value = '50';

      await element.requestUpdate();
      await primaryAction.click();

      expect(actionEvent).to.be.calledOnce;
      const action = actionEvent.args[0][0].detail.action;
      expect(action).to.satisfy(isCreate);
      const createAction = <Create>action;
      expect(createAction.new.element).to.have.attribute('nomFreq', '50');
    });

    it('allows to create name and non required attribute numPhases', async () => {
      inputs[0].value = 'someNonEmptyName';
      inputs[4].value = '3';

      await element.requestUpdate();
      await primaryAction.click();

      expect(actionEvent).to.be.calledOnce;
      const action = actionEvent.args[0][0].detail.action;
      expect(action).to.satisfy(isCreate);
      const createAction = <Create>action;
      expect(createAction.new.element).to.have.attribute('numPhases', '3');
    });
  });
});
