import { expect, fixture, html } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';

import '../../../../mock-wizard.js';

import { ComplexAction, Create, Delete, isCreate, isDelete, isReplace, Replace, WizardInputElement } from '../../../../../src/foundation.js';
import { MockWizard } from '../../../../mock-wizard.js';
import { WizardTextField } from '../../../../../src/wizard-textfield.js';
import { createLogicLinkWizard, editLogicLinkWizard } from '../../../../../src/editors/protocol104/wizards/logiclink.js';

describe('Wizards for the Logic Link SCL element group', () => {
  let doc: XMLDocument;
  let element: MockWizard;
  let inputs: WizardInputElement[];
  let input: WizardInputElement | undefined;
  let primaryAction: HTMLElement;

  let actionEvent: SinonSpy;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/104/valid-subnetwork.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = <MockWizard>await fixture(html`<mock-wizard></mock-wizard>`);

    actionEvent = spy();
    window.addEventListener('editor-action', actionEvent);
  });

  describe('include an edit wizard that', () => {
    beforeEach(async () => {
      const wizard = editLogicLinkWizard(doc.querySelector('Communication > SubNetwork[name="W1"] > ConnectedAP[iedName="B1"]')!, 2, 1);
      element.workflow.push(() => wizard);
      await element.requestUpdate();
  
      inputs = Array.from(element.wizardUI.inputs);
  
      primaryAction = <HTMLElement>(
        element.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );
    });

    it('does not edit any P element with unchanged wizard inputs', async () => {
      primaryAction.click();
      await element.requestUpdate();
      expect(actionEvent).to.not.have.been.called;
    });

    it('does not trigger a editor action to update P elements(s) when not all fields are filled in', async () => {
      input = <WizardTextField>inputs.find(input => input.label === 'IP-SUBNET');
      input.value = '';
      await input.requestUpdate();

      primaryAction.click();
      await element.requestUpdate();

      expect(actionEvent).to.not.have.been.called;
    });

    it('properly updates a P element of type IP', async () => {
      input = <WizardTextField>inputs.find(input => input.label === 'IP');
      input.value = '192.128.0.12';
      await input.requestUpdate();

      primaryAction.click();
      await element.requestUpdate();
      
      const complexAction = <ComplexAction>actionEvent.args[0][0].detail.action;
      expect(complexAction.title).to.contain('edit');
      expect(complexAction.actions).to.have.lengthOf(1);

      const action = complexAction.actions[0];
      expect(action).to.satisfy(isReplace);
      expect((<Replace>(action)).old.element.textContent).to.eql('192.128.0.2');
      expect((<Replace>(action)).new.element.textContent).to.eql('192.128.0.12');
    });

    it('properly creates a P element if not present', async () => {
      doc.querySelector('Communication > SubNetwork[name="W1"] > ConnectedAP[iedName="B1"] > Address > P[type="RG2-LL1-IP-SUBNET"]')?.remove();

      input = <WizardTextField>inputs.find(input => input.label === 'IP-SUBNET');
      input.value = '200.200.200.2';
      await input.requestUpdate();

      primaryAction.click();
      await element.requestUpdate();
      
      const complexAction = <ComplexAction>actionEvent.args[0][0].detail.action;
      expect(complexAction.title).to.contain('edit');
      expect(complexAction.actions).to.have.lengthOf(1);

      const action = complexAction.actions[0];
      expect(action).to.satisfy(isCreate);
      expect((<Create>(action)).new.element.textContent).to.eql('200.200.200.2');
    });

    it('properly deletes a full Logic Link group', async () => {
      const deleteAction = <HTMLElement>(
        element.wizardUI.dialog?.querySelector(
          'mwc-menu > mwc-list-item'
        )
      );

      deleteAction.click();
      await element.requestUpdate();

      const complexAction = <ComplexAction>actionEvent.args[0][0].detail.action;
      expect(complexAction.title).to.contain('remove');
      expect(complexAction.actions).to.have.lengthOf(2);

      const firstAction = complexAction.actions[0];
      expect(firstAction).to.satisfy(isDelete);
      expect((<Delete>(firstAction)).old.element.textContent).to.eql('192.128.0.2');

      const secondAction = complexAction.actions[1];
      expect(secondAction).to.satisfy(isDelete);
      expect((<Delete>(secondAction)).old.element.textContent).to.eql('255.255.255.0');
    });
  });

  describe('include a create wizard that', () => {
    beforeEach(async () => {
      const wizard = createLogicLinkWizard(doc.querySelector('SubNetwork[type="104"] > ConnectedAP[iedName="B1"][apName="AP1"]')!, 1, [1, 2]);
      element.workflow.push(() => wizard);
      await element.requestUpdate();

      inputs = Array.from(element.wizardUI.inputs);

      primaryAction = <HTMLElement>(
        element.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });

    it('doesn\'t trigger a create editor action on primary action without all fields being filled in', async () => {
      const ipElement = <WizardTextField>inputs.find(input => input.label === 'IP');
      ipElement.value = '192.168.0.1';
      await ipElement.requestUpdate();

      primaryAction.click();
      await element.requestUpdate();

      expect(actionEvent).to.not.have.been.called;
    });

    it('triggers a create editor action on primary action with all fields being filled in', async () => {
      const ipElement = <WizardTextField>inputs.find(input => input.label === 'IP');
      ipElement.value = '192.168.0.1';

      const ipSubNetElement = <WizardTextField>inputs.find(input => input.label === 'IP-SUBNET');
      ipSubNetElement.value = '255.255.255.0';
      await element.requestUpdate();

      primaryAction.click();
      await element.requestUpdate();

      const complexAction = <ComplexAction>actionEvent.args[0][0].detail.action;
      expect(complexAction.title).to.contain('add');
      expect(complexAction.actions).to.have.lengthOf(2);

      const firstAction = complexAction.actions[0];
      expect(firstAction).to.satisfy(isCreate);
      expect((<Create>(firstAction)).new.element.textContent).to.eql('192.168.0.1');

      const secondAction = complexAction.actions[1];
      expect(secondAction).to.satisfy(isCreate);
      expect((<Create>(secondAction)).new.element.textContent).to.eql('255.255.255.0');
    });
  });
});
