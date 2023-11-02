import { expect, fixture, html } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';

import '../../../../mock-wizard.js';

import { Checkbox } from '@material/mwc-checkbox';
import { createConnectedApWizard, editConnectedApWizard } from '../../../../../src/editors/protocol104/wizards/connectedap.js';
import { ComplexAction, Create, Delete, isCreate, isDelete, WizardInputElement } from '../../../../../src/foundation.js';
import { MockWizard } from '../../../../mock-wizard.js';
import { WizardTextField } from '../../../../../src/wizard-textfield.js';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

describe('Wizards for SCL element ConnectedAP', () => {
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
      const wizard = editConnectedApWizard(doc.querySelector('SubNetwork[type="104"] > ConnectedAP[apName="AP2"]')!);
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

    it('does not trigger a complex editor action to update P elements(s) when not all fields are filled in', async () => {
      input = <WizardTextField>inputs.find(input => input.label === 'IP');
      input.value = '';
      await input.requestUpdate();

      primaryAction.click();
      await element.requestUpdate();

      expect(actionEvent).to.not.have.been.called;
    });

    it('triggers a complex action as combination of delete and create with prior existing Address field', async () => {
      input = <WizardTextField>inputs.find(input => input.label === 'IP');
      input.value = '192.128.0.1';
      await input.requestUpdate();

      primaryAction.click();
      await element.requestUpdate();

      const complexAction = <ComplexAction>actionEvent.args[0][0].detail.action;
      expect(complexAction.actions).to.have.lengthOf(2);
      expect(complexAction.actions[0]).to.satisfy(isDelete);
      expect(complexAction.actions[1]).to.satisfy(isCreate);
    });

    it('properly updates a P element of type IP', async () => {
      input = <WizardTextField>inputs.find(input => input.label === 'IP');
      input.value = '192.168.210.158';
      await input.requestUpdate();

      primaryAction.click();
      await element.requestUpdate();

      const complexAction = <ComplexAction>actionEvent.args[0][0].detail.action;

      const oldAddress = <Element>(
        (<Delete>complexAction.actions[0]).old.element
      );
      const newAddress = <Element>(
        (<Create>complexAction.actions[1]).new.element
      );

      expect(
        oldAddress.querySelector<Element>('P[type="IP"]')?.textContent
      ).to.equal('192.128.0.11');
      expect(
        newAddress.querySelector<Element>('P[type="IP"]')?.textContent
      ).to.equal('192.168.210.158');
    });

    it('adds type restrictions with selected option type restriction', async () => {
      (<Checkbox>(
        element.wizardUI.shadowRoot?.querySelector('#typeRestriction')
      )).checked = true;
      await element.requestUpdate();

      primaryAction.click();
      await element.requestUpdate();

      const complexAction = <ComplexAction>actionEvent.args[0][0].detail.action;

      const oldAddress = <Element>(
        (<Delete>complexAction.actions[0]).old.element
      );
      const newAddress = <Element>(
        (<Create>complexAction.actions[1]).new.element
      );

      const oldIP = oldAddress.querySelector<Element>('P[type="IP"]');
      const newIP = newAddress.querySelector<Element>('P[type="IP"]');

      expect(
        oldIP?.getAttributeNS(
          'http://www.w3.org/2001/XMLSchema-instance',
          'type'
        )
      ).to.not.exist;
      expect(
        newIP?.getAttributeNS(
          'http://www.w3.org/2001/XMLSchema-instance',
          'type'
        )
      ).to.exist;
    });
  });

  describe('include a create wizard that', () => {
    beforeEach(async () => {
      const wizard = createConnectedApWizard(doc.querySelector('SubNetwork[type="104"] > ConnectedAP[apName="AP2"]')!);
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

    it('does not allow to add connected AccessPoints', () => {
      const disabledItems = Array.from(
        element.wizardUI.dialog!.querySelectorAll<ListItemBase>(
          'mwc-check-list-item'
        )
      ).filter(item => item.disabled);

      for (const item of disabledItems) {
        const [iedName, apName] = item.value.split('>');
        expect(
          doc.querySelector(
            `ConnectedAP[iedName="${iedName}"][apName="${apName}"]`
          )
        ).to.exist;
      }
    });

    it('allows to add unconnected AccessPoints', () => {
      const enabledItems = Array.from(
        element.wizardUI.dialog!.querySelectorAll<ListItemBase>(
          'mwc-check-list-item'
        )
      ).filter(item => !item.disabled);

      for (const item of enabledItems) {
        const [iedName, apName] = item.value.split('>');
        expect(
          doc.querySelector(
            `ConnectedAP[iedName="${iedName}"][apName="${apName}"]`
          )
        ).to.not.exist;
      }
    });

    it('shows all AccessPoint in the project', async () => {
      expect(
        element.wizardUI.dialog?.querySelectorAll('mwc-check-list-item').length
      ).to.equal(doc.querySelectorAll(':root > IED > AccessPoint').length)
    });

    it('triggers a create editor action on primary action', async () => {
      Array.from(
        element.wizardUI.dialog!.querySelectorAll<ListItemBase>(
          'mwc-check-list-item'
        )
      )
        .filter(item => !item.disabled)[0]
        .click();
      await element.requestUpdate();

      primaryAction.click();
      await element.requestUpdate();

      expect(actionEvent).to.be.calledOnce;
      expect(actionEvent.args[0][0].detail.action).to.satisfy(isCreate);
    });
  });
});
