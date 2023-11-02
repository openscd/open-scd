import { expect, fixture, html } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';

import '../../mock-wizard.js';
import { MockWizard } from '../../mock-wizard.js';

import {
  Create,
  isCreate,
  WizardInputElement,
} from '../../../src/foundation.js';

import { fetchDoc } from './test-support.js';
import { createConductingEquipmentWizard } from '../../../src/wizards/conductingequipment.js';

describe('Wizards for SCL element ConductingEquipment', () => {
  let doc: XMLDocument;
  let element: MockWizard;
  let inputs: WizardInputElement[];
  let primaryAction: HTMLElement;

  let actionEvent: SinonSpy;

  describe('defines a create wizard that', () => {
    let parent: Element;

    beforeEach(async () => {
      doc = await fetchDoc('/test/testfiles/valid2007B.scd');

      actionEvent = spy();
      window.addEventListener('editor-action', actionEvent);
    });

    describe('when adding an earth switch', () => {
      describe('with existing ground cNode in the same VoltageLevel', () => {
        beforeEach(async () => {
          parent = doc.querySelector('Bay')!;

          element = await fixture(html`<mock-wizard></mock-wizard>`);
          const wizard = createConductingEquipmentWizard(parent);
          element.workflow.push(() => wizard);
          await element.requestUpdate();
          inputs = Array.from(element.wizardUI.inputs);

          primaryAction = <HTMLElement>(
            element.wizardUI.dialog?.querySelector(
              'mwc-button[slot="primaryAction"]'
            )
          );
        });
        it('does not create a new ConnectivityNode', async () => {
          inputs[0].value = 'ERS';
          inputs[1].value = 'QC9';

          await element.requestUpdate();
          await primaryAction.click();

          expect(actionEvent).to.be.calledOnce;
        });

        it('does set the Terminals attributes correctly', async () => {
          inputs[0].value = 'ERS';
          inputs[1].value = 'QC9';

          await element.requestUpdate();
          await primaryAction.click();

          const action = <Create>actionEvent.args[0][0].detail.action;
          const terminal = (<Element>action.new.element).querySelector(
            'Terminal'
          )!;
          expect(terminal).to.have.attribute('substationName', 'AA1');
          expect(terminal).to.have.attribute('voltageLevelName', 'E1');
          expect(terminal).to.have.attribute('bayName', 'COUPLING_BAY');
          expect(terminal).to.have.attribute(
            'connectivityNode',
            'AA1/E1/COUPLING_BAY/grounded'
          );
        });
      });

      describe('with missing ground cNode in the same VoltageLevel', () => {
        beforeEach(async () => {
          parent = doc.querySelector('VoltageLevel[name="J1"] > Bay')!;

          element = await fixture(html`<mock-wizard></mock-wizard>`);
          const wizard = createConductingEquipmentWizard(parent);
          element.workflow.push(() => wizard);
          await element.requestUpdate();
          inputs = Array.from(element.wizardUI.inputs);

          primaryAction = <HTMLElement>(
            element.wizardUI.dialog?.querySelector(
              'mwc-button[slot="primaryAction"]'
            )
          );
        });

        it('does create a new ConnectivityNode', async () => {
          inputs[0].value = 'ERS';
          inputs[1].value = 'QC9';

          await element.requestUpdate();
          await primaryAction.click();

          expect(actionEvent).to.be.calledTwice;
          expect(actionEvent.args[0][0].detail.action).to.satisfy(isCreate);

          const action = <Create>actionEvent.args[1][0].detail.action;
          expect((<Element>action.new.element).tagName).to.equal(
            'ConnectivityNode'
          );
        });

        it('does set the pathName of ConnectivityNode correctly', async () => {
          inputs[0].value = 'ERS';
          inputs[1].value = 'QC9';

          await element.requestUpdate();
          await primaryAction.click();

          const action = <Create>actionEvent.args[1][0].detail.action;
          expect(<Element>action.new.element).to.have.attribute(
            'pathName',
            'AA1/J1/Bay1/grounded'
          );
          expect(<Element>action.new.element).to.have.attribute(
            'name',
            'grounded'
          );
        });

        it('does set the Terminals attributes correctly', async () => {
          inputs[0].value = 'ERS';
          inputs[1].value = 'QC9';

          await element.requestUpdate();
          await primaryAction.click();

          const action = <Create>actionEvent.args[0][0].detail.action;
          const terminal = (<Element>action.new.element).querySelector(
            'Terminal'
          )!;
          expect(terminal).to.have.attribute('substationName', 'AA1');
          expect(terminal).to.have.attribute('voltageLevelName', 'J1');
          expect(terminal).to.have.attribute('bayName', 'Bay1');
          expect(terminal).to.have.attribute(
            'connectivityNode',
            'AA1/J1/Bay1/grounded'
          );
        });
      });
    });
  });
});
