import { expect, fixture, html } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';

import '../../../../mock-wizard.js';

import { Delete, EditorAction, isDelete, isReplace, Replace, WizardInputElement } from '../../../../../src/foundation.js';
import { MockWizard } from '../../../../mock-wizard.js';
import { WizardTextField } from '../../../../../src/wizard-textfield.js';
import { editRedundancyGroupWizard } from '../../../../../src/editors/protocol104/wizards/redundancygroup.js';

describe('Wizards for the Redundancy Group SCL element group', () => {
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
      const wizard = editRedundancyGroupWizard(doc.querySelector('Communication > SubNetwork[name="W1"] > ConnectedAP[iedName="B1"]')!, 2);
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
      input = <WizardTextField>inputs.find(input => input.label === 'TIMEOUT-1');
      input.value = '';
      await input.requestUpdate();

      primaryAction.click();
      await element.requestUpdate();

      expect(actionEvent).to.not.have.been.called;
    });

    it('properly updates a P element of type TIMEOUT-1', async () => {
      input = <WizardTextField>inputs.find(input => input.label === 'TIMEOUT-1');
      input.value = '18';
      await input.requestUpdate();

      primaryAction.click();
      await element.requestUpdate();

      const action = <EditorAction>actionEvent.args[3][0].detail.action;
      expect(action).to.satisfy(isReplace);
      expect((<Replace>action).old.element.innerHTML).to.eql('3');
      expect((<Replace>action).new.element.innerHTML).to.eql('18');
    });

    it('properly deletes a full Redundancy Group', async () => {
      const deleteAction = <HTMLElement>(
        element.wizardUI.dialog?.querySelectorAll(
          'mwc-menu > mwc-list-item'
        )[1]
      );

      deleteAction.click();
      await element.requestUpdate();

      const ip = <EditorAction>actionEvent.args[0][0].detail.action;
      expect(ip).to.satisfy(isDelete);
      expect((<Delete>ip).old.element.textContent).to.eql('192.128.0.2');

      const ipSubnet = <EditorAction>actionEvent.args[1][0].detail.action;
      expect(ipSubnet).to.satisfy(isDelete);
      expect((<Delete>ipSubnet).old.element.textContent).to.eql('255.255.255.0');

      const wFactor = <EditorAction>actionEvent.args[2][0].detail.action;
      expect(wFactor).to.satisfy(isDelete);
      expect((<Delete>wFactor).old.element.textContent).to.eql('8');
      
      const kFactor = <EditorAction>actionEvent.args[3][0].detail.action;
      expect(kFactor).to.satisfy(isDelete);
      expect((<Delete>kFactor).old.element.textContent).to.eql('12');
      
      const timeout0 = <EditorAction>actionEvent.args[4][0].detail.action;
      expect(timeout0).to.satisfy(isDelete);
      expect((<Delete>timeout0).old.element.textContent).to.eql('30');
      
      const timeout1 = <EditorAction>actionEvent.args[5][0].detail.action;
      expect(timeout1).to.satisfy(isDelete);
      expect((<Delete>timeout1).old.element.textContent).to.eql('3');
      
      const timeout2 = <EditorAction>actionEvent.args[6][0].detail.action;
      expect(timeout2).to.satisfy(isDelete);
      expect((<Delete>timeout2).old.element.textContent).to.eql('10');
      
      const timeout3 = <EditorAction>actionEvent.args[7][0].detail.action;
      expect(timeout3).to.satisfy(isDelete);
      expect((<Delete>timeout3).old.element.textContent).to.eql('20');
    });
  });
});
