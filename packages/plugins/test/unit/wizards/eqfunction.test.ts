import { expect, fixture, html } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';

import '@openscd/open-scd/src/addons/Wizards.js';
import { OscdWizards } from '@openscd/open-scd/src/addons/Wizards.js';

import { WizardTextField } from '@openscd/open-scd/src/wizard-textfield.js';
import { WizardInputElement } from '@openscd/open-scd/src/foundation.js';
import { 
  isCreate,
  isReplace,
  Create, 
  Replace 
} from '@openscd/core/foundation/deprecated/editor.js';
import {
  createEqFunctionWizard,
  editEqFunctionWizard,
} from '../../../src/wizards/eqfunction.js';

describe('Wizards for SCL EqFunction element', () => {
  let doc: XMLDocument;
  let element: OscdWizards;
  let inputs: WizardInputElement[];

  let primaryAction: HTMLElement;

  let actionEvent: SinonSpy;

  beforeEach(async () => {
    element = await fixture(
      html`<oscd-wizards .host=${document}></oscd-wizards>`
    );
    doc = await fetch('test/testfiles/zeroline/functions.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    actionEvent = spy();
    window.addEventListener('editor-action', actionEvent);
  });

  describe('define an create wizard that', () => {
    beforeEach(async () => {
      const wizard = createEqFunctionWizard(
        doc.querySelector('ConductingEquipment')!
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

    it('triggers simple create action on primary action click', async () => {
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
      expect(createAction.new.element).to.not.have.attribute('desc');
      expect(createAction.new.element).to.not.have.attribute('type');
    });

    it('allows to create non required attributes desc and type', async () => {
      inputs[0].value = 'someNonEmptyName';

      (<WizardTextField>inputs[1]).nullSwitch?.click();
      (<WizardTextField>inputs[2]).nullSwitch?.click();
      inputs[1].value = 'SomeDesc';
      inputs[2].value = 'SomeType';

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
      expect(createAction.new.element).to.have.attribute('desc', 'SomeDesc');
      expect(createAction.new.element).to.have.attribute('type', 'SomeType');
    });
  });

  describe('define an edit wizard that', () => {
    beforeEach(async () => {
      const wizard = editEqFunctionWizard(
        doc.querySelector(
          'PowerTransformer[name="myPtr3"] > EqFunction[name="myEqFuncQB3"]'
        )!
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
      inputs[0].value = '';
      await element.requestUpdate();

      await primaryAction.click();

      expect(actionEvent).to.not.have.been.called;
    });

    it('does not trigger action without changes', async () => {
      await primaryAction.click();

      expect(actionEvent).to.not.have.been.called;
    });

    it('does not trigger action if name attribute is not unique', async () => {
      inputs[0].value = 'myEqFuncQB2';
      primaryAction.click();
      await element.updateComplete;

      expect(actionEvent).to.not.have.been.called;
    });

    it('triggers simple replace action updating name attribute', async () => {
      inputs[0].value = 'someNonEmptyName';
      await element.requestUpdate();
      await primaryAction.click();

      expect(actionEvent).to.be.calledOnce;
      const action = actionEvent.args[0][0].detail.action;
      expect(action).to.satisfy(isReplace);
      const createAction = <Replace>action;

      expect(createAction.new.element).to.have.attribute(
        'name',
        'someNonEmptyName'
      );
    });

    it('triggers simple replace action updating desc attribute', async () => {
      inputs[1].value = 'someDesc';
      await element.requestUpdate();
      await primaryAction.click();

      expect(actionEvent).to.be.calledOnce;
      const action = actionEvent.args[0][0].detail.action;
      expect(action).to.satisfy(isReplace);
      const createAction = <Replace>action;

      expect(createAction.new.element).to.have.attribute('desc', 'someDesc');
    });

    it('triggers simple replace action updating type attribute', async () => {
      inputs[2].value = 'someType';
      await element.requestUpdate();
      await primaryAction.click();

      expect(actionEvent).to.be.calledOnce;
      const action = actionEvent.args[0][0].detail.action;
      expect(action).to.satisfy(isReplace);
      const createAction = <Replace>action;

      expect(createAction.new.element).to.have.attribute('type', 'someType');
    });
  });
});
