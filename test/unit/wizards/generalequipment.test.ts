import { expect, fixture, html } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';

import '../../mock-wizard.js';
import { MockWizard } from '../../mock-wizard.js';

import { WizardTextField } from '../../../src/wizard-textfield.js';
import {
  EditorAction,
  isCreate,
  isReplace,
  Replace,
  WizardInputElement,
} from '../../../src/foundation.js';
import { editGeneralEquipmentWizard } from '../../../src/wizards/generalEquipment.js';
import { boolean } from 'fast-check';
import { WizardCheckbox } from '../../../src/wizard-checkbox.js';

describe('Wizards for SCL GeneralEquipment element', () => {
  let doc: XMLDocument;
  let element: MockWizard;
  let inputs: WizardInputElement[];

  let primaryAction: HTMLElement;

  let actionEvent: SinonSpy;

  beforeEach(async () => {
    element = await fixture(html`<mock-wizard></mock-wizard>`);
    doc = await fetch('/test/testfiles/editors/substation/generalequipment.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    actionEvent = spy();
    window.addEventListener('editor-action', actionEvent);
  });

  describe('define an edit wizard that', () => {
    beforeEach(async () => {
      const wizard = editGeneralEquipmentWizard(
        doc.querySelector('GeneralEquipment')!
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

    it('allows to create non required attribute virtual', async () => {
      const virtualCheckbox = <WizardCheckbox>(
        element.wizardUI.dialog?.querySelector(
          'wizard-checkbox[label="virtual"]'
        )
      );

      virtualCheckbox.nullSwitch!.click();
      virtualCheckbox.maybeValue = 'true';
      await element.requestUpdate();
      await primaryAction.click();

      expect(actionEvent).to.be.calledOnce;
      const action = actionEvent.args[0][0].detail.action;
      expect(action).to.satisfy(isReplace);
      const editAction = <Replace>action;

      expect(editAction.new.element).to.have.attribute('virtual', 'true');
    });

    it('does not accept empty type attribute', async () => {
      inputs[2].value = '';
      await element.requestUpdate();
      await primaryAction.click();
      expect(actionEvent).to.not.have.been.called;
    });

    it('does not accept invalid type attribute', async () => {
      inputs[2].value = 'notAXN';
      await element.requestUpdate();
      await primaryAction.click();
      expect(actionEvent).to.not.have.been.called;
    });

    it('allows to create type attribute', async () => {
      inputs[2].value = 'BAT';
      await element.requestUpdate();
      await primaryAction.click();
      expect(actionEvent).to.be.calledOnce;
      const action = actionEvent.args[0][0].detail.action;
      expect(action).to.satisfy(isReplace);
      const editAction = <Replace>action;

      expect(editAction.new.element).to.have.attribute('type', 'BAT');
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
  });
});
