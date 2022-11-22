import { expect, fixture, html } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';

import '../../mock-wizard.js';
import { MockWizard } from '../../mock-wizard.js';

import {
  isReplace,
  Replace,
  WizardInputElement,
} from '../../../src/foundation.js';
import { editSubEquipmentWizard } from '../../../src/wizards/subequipment.js';
import { WizardCheckbox } from '../../../src/wizard-checkbox.js';

describe('Wizards for SCL SubEquipment element', () => {
  let doc: XMLDocument;
  let element: MockWizard;
  let inputs: WizardInputElement[];

  let primaryAction: HTMLElement;

  let actionEvent: SinonSpy;

  beforeEach(async () => {
    element = await fixture(html`<mock-wizard></mock-wizard>`);
    doc = await fetch('test/testfiles/SubEquipment.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    actionEvent = spy();
    window.addEventListener('editor-action', actionEvent);
  });

  describe('define an edit wizard that', () => {
    beforeEach(async () => {
      const wizard = editSubEquipmentWizard(doc.querySelector('SubEquipment')!);
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
      inputs[0].value = 'addEqi';
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

    it('triggers simple replace action updating phase attribute', async () => {
      inputs[2].value = 'AB';
      await element.requestUpdate();
      await primaryAction.click();

      expect(actionEvent).to.be.calledOnce;
      const action = actionEvent.args[0][0].detail.action;
      expect(action).to.satisfy(isReplace);
      const createAction = <Replace>action;

      expect(createAction.new.element).to.have.attribute('phase', 'AB');
    });

    it('triggers simple replace action updating virtual attribute', async () => {
      const virtualCheckbox: WizardCheckbox = <WizardCheckbox>(
        element.wizardUI.dialog?.querySelector(
          'wizard-checkbox[label="virtual"]'
        )
      );

      virtualCheckbox.nullSwitch?.click();
      virtualCheckbox.checked = true;

      await element.requestUpdate();
      await primaryAction.click();

      expect(actionEvent).to.be.calledOnce;
      const action = actionEvent.args[0][0].detail.action;
      expect(action).to.satisfy(isReplace);
      const createAction = <Replace>action;

      expect(createAction.new.element).to.have.attribute('virtual', 'true');
    });
  });
});
