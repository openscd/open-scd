import { expect, fixture, html } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';

import '../../mock-wizard-editor.js';
import { MockWizardEditor } from '../../mock-wizard-editor.js';

import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

import { lNodeWizard } from '../../../src/wizards/lnode.js';
import { Create, isCreate } from '../../../src/foundation.js';

describe('Wizards for LNode element', () => {
  let element: MockWizardEditor;
  let doc: Document;

  let actionEvent: SinonSpy;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/lnodewizard.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = <MockWizardEditor>(
      await fixture(html`<mock-wizard-editor></mock-wizard-editor>`)
    );

    actionEvent = spy();
    window.addEventListener('editor-action', actionEvent);
  });

  describe('contain a LNode instantiate wizard that', () => {
    describe('with existing LLN0 and LPHD instances', () => {
      beforeEach(async () => {
        const wizard = lNodeWizard(
          doc.querySelector('Function[name="parentFunction"]')!
        );
        element.workflow.push(() => wizard);
        await element.requestUpdate();
      });

      it('looks like the latest snapshot', async () =>
        await expect(element.wizardUI.dialog).to.equalSnapshot());
    });

    describe('with existing LLN0 but missing LPHD instances', () => {
      beforeEach(async () => {
        const wizard = lNodeWizard(
          doc.querySelector('SubFunction[name="circuitBreaker"]')!
        );
        element.workflow.push(() => wizard);
        await element.requestUpdate();
      });

      it('looks like the latest snapshot', async () =>
        await expect(element.wizardUI.dialog).to.equalSnapshot());
    });

    describe('with missing LLN0 and LPHD instances', () => {
      beforeEach(async () => {
        const wizard = lNodeWizard(
          doc.querySelector('SubFunction[name="disconnector"]')!
        );
        element.workflow.push(() => wizard);
        await element.requestUpdate();
      });

      it('looks like the latest snapshot', async () =>
        await expect(element.wizardUI.dialog).to.equalSnapshot());
    });

    describe('has a primary action that', () => {
      let primaryAction: HTMLElement;
      let listItems: ListItemBase[];

      beforeEach(async () => {
        const wizard = lNodeWizard(
          doc.querySelector('SubFunction[name="disconnector"]')!
        );
        element.workflow.push(() => wizard);
        await element.requestUpdate();

        primaryAction = <HTMLElement>(
          element.wizardUI.dialog?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        );

        listItems = Array.from(
          element.wizardUI!.dialog!.querySelectorAll<ListItemBase>(
            'mwc-check-list-item'
          )
        );
      });

      it('triggers Create action for all selected LNodeType', async () => {
        listItems[1].selected = true;
        listItems[2].selected = true;
        listItems[3].selected = true;

        await primaryAction.click();

        expect(actionEvent).to.have.be.calledThrice;
        expect(actionEvent.args[0][0].detail.action).to.satisfy(isCreate);
        expect(actionEvent.args[1][0].detail.action).to.satisfy(isCreate);
        expect(actionEvent.args[2][0].detail.action).to.satisfy(isCreate);
      });

      it('does set iedName, lnCalss, lnInst and lnType', async () => {
        listItems[4].selected = true;

        await primaryAction.click();

        expect(actionEvent).to.have.be.calledOnce;
        const action = <Create>actionEvent.args[0][0].detail.action;
        expect(action.new.element).to.have.attribute('iedName', 'None');
        expect(action.new.element).to.have.attribute('lnClass', 'CILO');
        expect(action.new.element).to.have.attribute('lnInst', '1');
        expect(action.new.element).to.have.attribute('lnType', 'Dummy.CILO');
      });

      it('does not set ldInst and prefix', async () => {
        listItems[4].selected = true;

        await primaryAction.click();

        expect(actionEvent).to.have.be.calledOnce;
        const action = <Create>actionEvent.args[0][0].detail.action;
        expect(action.new.element).to.not.have.attribute('ldInst');
        expect(action.new.element).to.not.have.attribute('prefix');
      });

      it('makes sure that lnInst is unique in case lnClass is existing already', async () => {
        listItems[4].selected = true;

        await primaryAction.click();

        expect(actionEvent).to.have.be.calledOnce;
        const action = <Create>actionEvent.args[0][0].detail.action;
        expect(action.new.element).to.have.attribute('lnInst', '1');
      });

      it('makes sure that lnInst is unique if several LNodeType with same lnClass are selected', async () => {
        listItems[3].selected = true;
        listItems[5].selected = true;

        await primaryAction.click();

        expect(actionEvent).to.have.be.calledTwice;
        const action1 = <Create>actionEvent.args[0][0].detail.action;
        const action2 = <Create>actionEvent.args[1][0].detail.action;
        expect(action1.new.element).to.have.attribute('lnInst', '1');
        expect(action2.new.element).to.have.attribute('lnInst', '2');
      });

      it('does add empty string to LNode with lnClass LLN0', async () => {
        listItems[0].selected = true;

        await primaryAction.click();

        expect(actionEvent).to.have.be.calledOnce;
        const action = <Create>actionEvent.args[0][0].detail.action;
        expect(action.new.element).to.have.attribute('lnInst', '');
      });
    });
  });

  describe('contain a LNode reference create wizard that', () => {
    describe('with references to existing logical nodes', () => {
      beforeEach(async () => {
        const wizard = lNodeWizard(
          doc.querySelector('ConductingEquipment[name="QB1"]')!
        );
        element.workflow.push(() => wizard);
        await element.requestUpdate();
      });

      it('looks like the latest snapshot', async () =>
        await expect(element.wizardUI.dialog).to.equalSnapshot());
    });

    describe('with missing references to existing logical nodes', () => {
      beforeEach(async () => {
        const wizard = lNodeWizard(doc.querySelector('Substation')!);
        element.workflow.push(() => wizard);
        await element.requestUpdate();
      });

      it('looks like the latest snapshot', async () =>
        await expect(element.wizardUI.dialog).to.equalSnapshot());
    });
  });
});
