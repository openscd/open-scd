import { expect, fixture, html } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';

import '../../mock-wizard.js';
import { MockWizard } from '../../mock-wizard.js';

import { editDataSetWizard } from '../../../src/wizards/dataset.js';
import { WizardTextField } from '../../../src/wizard-textfield.js';
import {
  Delete,
  isDelete,
  isUpdate,
  Update,
  Wizard,
  WizardInput,
} from '../../../src/foundation.js';

describe('dataset wizards', () => {
  let doc: XMLDocument;
  let element: MockWizard;
  let wizardEvent: SinonSpy;
  let actionEvent: SinonSpy;

  beforeEach(async () => {
    element = await fixture(html`<mock-wizard></mock-wizard>`);
    doc = await fetch('/test/testfiles/wizards/gsecontrol.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('include a dataset edit wizard', () => {
    beforeEach(async () => {
      const wizard = editDataSetWizard(
        doc.querySelector('IED[name="IED2"] DataSet[name="GooseDataSet1"]')!
      );
      element.workflow.push(() => wizard);
      await element.requestUpdate();

      wizardEvent = spy();
      window.addEventListener('wizard', wizardEvent);
      actionEvent = spy();
      window.addEventListener('editor-action', actionEvent);
    });

    it('looks like the latest snapshot', async () =>
      await expect(element.wizardUI.dialog).to.equalSnapshot()).timeout(5000);

    it('allows to add a new FCDA on add FCDA button click', async () => {
      const addButton = <HTMLElement>(
        element.wizardUI.dialog?.querySelector('mwc-button[icon="add"]')
      );
      await addButton.click();
      expect(wizardEvent).to.be.calledOnce;
    });

    describe('with stand alone DataSet', () => {
      let dataSet: Element;
      let wizard: Wizard;
      let inputs: WizardInput[];
      let primaryAction: HTMLElement;

      beforeEach(async () => {
        dataSet = <Element>(
          new DOMParser().parseFromString(
            `<DataSet name="myDS"></DataSet>`,
            'application/xml'
          ).documentElement
        );
        wizard = editDataSetWizard(dataSet);
        element.workflow.length = 0;
        element.workflow.push(() => wizard);
        await element.requestUpdate();
        inputs = Array.from(element.wizardUI.inputs);
        await element.requestUpdate();

        primaryAction = <HTMLElement>(
          element.wizardUI.dialog?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        );
      });

      it('does not update a DataSet element when no attribute has changed', async () => {
        primaryAction.click();
        await element.requestUpdate();
        expect(actionEvent.notCalled).to.be.true;
      });

      it('update a DataSet element when only name attribute changed', async () => {
        const input = <WizardTextField>inputs[0];
        input.value = 'myNewDataSetName';
        await input.requestUpdate();

        primaryAction.click();
        await element.requestUpdate();
        expect(actionEvent).to.be.calledOnce;

        const action = actionEvent.args[0][0].detail.action;
        expect(action).to.satisfy(isUpdate);

        const updateAction = <Update>action;
        expect(updateAction.old.element).to.have.attribute('name', 'myDS');
        expect(updateAction.new.element).to.have.attribute(
          'name',
          'myNewDataSetName'
        );
      });
    });

    describe('with connected DataSet', () => {
      let dataSet: Element;
      let wizard: Wizard;
      let inputs: WizardInput[];
      let primaryAction: HTMLElement;
      let firstFCDA: HTMLElement;
      let thirdFCDA: HTMLElement;

      beforeEach(async () => {
        dataSet = doc.querySelector(
          'IED[name="IED2"] DataSet[name="GooseDataSet1"]'
        )!;
        wizard = editDataSetWizard(dataSet);
        element.workflow.length = 0;
        element.workflow.push(() => wizard);
        await element.requestUpdate();
        inputs = Array.from(element.wizardUI.inputs);
        await element.requestUpdate();

        primaryAction = <HTMLElement>(
          element.wizardUI.dialog?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        );

        firstFCDA = <HTMLElement>(
          element.wizardUI.dialog?.querySelector(
            'filtered-list>mwc-check-list-item'
          )
        );

        thirdFCDA = <HTMLElement>(
          element.wizardUI.dialog?.querySelector(
            'filtered-list>mwc-check-list-item:nth-child(3)'
          )
        );
      });

      it('does not update a DataSet element when no attribute has changed', async () => {
        primaryAction.click();
        await element.requestUpdate();
        expect(actionEvent.notCalled).to.be.true;
      });

      it('update a DataSet element when only name attribute changed', async () => {
        const input = <WizardTextField>inputs[0];
        input.value = 'myNewDataSetName';
        await input.requestUpdate();

        primaryAction.click();
        await element.requestUpdate();
        expect(actionEvent).to.be.calledThrice;

        const action = actionEvent.args[0][0].detail.action;
        expect(action).to.satisfy(isUpdate);

        const updateAction = <Update>action;
        expect(updateAction.old.element).to.have.attribute(
          'name',
          'GooseDataSet1'
        );
        expect(updateAction.new.element).to.have.attribute(
          'name',
          'myNewDataSetName'
        );
      });

      it('update a DataSet of all referenced control blocks', async () => {
        const input = <WizardTextField>inputs[0];
        input.value = 'myNewDataSetName';
        await input.requestUpdate();

        primaryAction.click();
        await element.requestUpdate();
        expect(actionEvent).to.be.calledThrice;

        for (let i = 1; i < actionEvent.args.length; i++) {
          const action = actionEvent.args[i][0].detail.action;
          expect(action).to.satisfy(isUpdate);

          const updateAction = <Update>action;
          expect(updateAction.old.element).to.have.attribute(
            'datSet',
            'GooseDataSet1'
          );
          expect(updateAction.new.element).to.have.attribute(
            'datSet',
            'myNewDataSetName'
          );
        }
      });

      it('update a DataSet element when only desc attribute changed', async () => {
        const input = <WizardTextField>inputs[1];
        input.nullSwitch?.click();
        input.value = 'myDesc';
        await input.requestUpdate();

        primaryAction.click();
        await element.requestUpdate();
        expect(actionEvent).to.be.calledOnce;

        const action = actionEvent.args[0][0].detail.action;
        expect(action).to.satisfy(isUpdate);

        const updateAction = <Update>action;
        expect(updateAction.old.element).to.not.have.attribute('desc');
        expect(updateAction.new.element).to.have.attribute('desc', 'myDesc');
      });

      it('removes all unselected FCDA child elements', async () => {
        firstFCDA.click();
        thirdFCDA.click();
        await element.requestUpdate();

        primaryAction.click();
        await element.requestUpdate();
        expect(actionEvent).to.be.calledTwice;

        const action = actionEvent.args[0][0].detail.action;
        expect(action).to.satisfy(isDelete);

        const updateAction = <Delete>action;
        expect(updateAction.old.element).to.have.attribute('ldInst', 'CBSW');
        expect(updateAction.old.element).to.have.attribute('prefix', '');
        expect(updateAction.old.element).to.have.attribute('lnClass', 'XSWI');
        expect(updateAction.old.element).to.have.attribute('lnInst', '2');
        expect(updateAction.old.element).to.have.attribute('doName', 'Pos');
        expect(updateAction.old.element).to.have.attribute('daName', 'stVal');
      });

      it('removes all unselected FCDA child elements', async () => {
        firstFCDA.click();
        thirdFCDA.click();
        await element.requestUpdate();

        primaryAction.click();
        await element.requestUpdate();
        expect(actionEvent).to.be.calledTwice;

        const action = actionEvent.args[1][0].detail.action;
        expect(action).to.satisfy(isDelete);

        const updateAction = <Delete>action;
        expect(updateAction.old.element).to.have.attribute('ldInst', 'CBSW');
        expect(updateAction.old.element).to.have.attribute('prefix', '');
        expect(updateAction.old.element).to.have.attribute('lnClass', 'XSWI');
        expect(updateAction.old.element).to.have.attribute('lnInst', '2');
        expect(updateAction.old.element).to.have.attribute(
          'doName',
          'OpSlc.dsd'
        );
        expect(updateAction.old.element).to.have.attribute(
          'daName',
          'sasd.ads.asd'
        );
      });
    });
  });
});
