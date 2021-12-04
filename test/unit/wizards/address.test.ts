import { expect, fixture, html } from '@open-wc/testing';

import '../../mock-wizard.js';
import { MockWizard } from '../../mock-wizard.js';

import { WizardSelect } from '../../../src/wizard-select.js';
import { WizardTextField } from '../../../src/wizard-textfield.js';
import {
  Create,
  Delete,
  isCreate,
  isDelete,
  Wizard,
  WizardInput,
} from '../../../src/foundation.js';
import {
  renderGseSmvAddress,
  updateAddress,
} from '../../../src/wizards/address.js';

describe('address', () => {
  let doc: XMLDocument;
  let element: MockWizard;

  beforeEach(async () => {
    element = await fixture(html`<mock-wizard></mock-wizard>`);
    doc = await fetch('/test/testfiles/wizards/gsecontrol.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('renderGseSmvAddress', () => {
    beforeEach(async () => {
      const gse = doc.querySelector(
        'GSE[ldInst="CircuitBreaker_CB1"][cbName="GCB"]'
      )!;
      const wizard = [{ title: 'title', content: renderGseSmvAddress(gse) }];

      element.workflow.push(wizard);
      await element.requestUpdate();
    });
    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).to.equalSnapshot();
    }).timeout(5000);
  });

  describe('updateAddress', () => {
    let gse: Element;
    let inputs: WizardInput[];
    let wizard: Wizard;

    describe('with exiting address element', () => {
      beforeEach(async () => {
        gse = doc.querySelector(
          'GSE[ldInst="CircuitBreaker_CB1"][cbName="GCB"]'
        )!;

        wizard = [
          {
            title: 'asdas',
            content: renderGseSmvAddress(gse),
          },
        ];
        element.workflow.push(wizard);
        await element.requestUpdate();
        inputs = Array.from(element.wizardUI.inputs);
        await element.requestUpdate();
      });

      it('does not update a Address element when no attribute has changed', () => {
        const actions = updateAddress(gse, inputs, false);
        expect(actions).to.be.empty;
      });
      it('update a Address element when at least one attribute changes', async () => {
        for (const rawInput of inputs) {
          const input =
            rawInput instanceof WizardTextField
              ? <WizardTextField>rawInput
              : <WizardSelect>rawInput;

          const type = input.label;
          const newValue = 'newValue';
          const oldValue = input.value;

          input.value = newValue;
          await input.requestUpdate();
          const actions = updateAddress(gse, inputs, false);
          expect(actions.length).to.equal(2);
          expect(actions[0]).to.satisfy(isDelete);
          expect(actions[1]).to.satisfy(isCreate);
          const oldElement = (<Delete>actions[0]).old.element;
          const newElement = (<Create>actions[1]).new.element;
          expect(
            oldElement.querySelector(`P[type="${type}"]`)?.textContent?.trim()
          ).to.equal(oldValue);
          expect(
            newElement.querySelector(`P[type="${type}"]`)?.textContent?.trim()
          ).to.equal(newValue);
          expect(
            newElement.querySelector(`P[type="${type}"]`)
          ).to.not.have.attribute('xsi:type', `tP_${type}`);
        }
      });
      it('update a Address element when status of instType has changed', async () => {
        for (const rawInput of inputs) {
          const input =
            rawInput instanceof WizardTextField
              ? <WizardTextField>rawInput
              : <WizardSelect>rawInput;

          const type = input.label;
          const newValue = input.value;
          const oldValue = input.value;

          input.value = newValue;
          await input.requestUpdate();
          const actions = updateAddress(gse, inputs, true);
          expect(actions.length).to.equal(2);
          expect(actions[0]).to.satisfy(isDelete);
          expect(actions[1]).to.satisfy(isCreate);
          const oldElement = (<Delete>actions[0]).old.element;
          const newElement = (<Create>actions[1]).new.element;
          expect(
            oldElement.querySelector(`P[type="${type}"]`)?.textContent?.trim()
          ).to.equal(oldValue);
          expect(
            newElement.querySelector(`P[type="${type}"]`)?.textContent?.trim()
          ).to.equal(newValue);
          expect(
            newElement.querySelector(`P[type="${type}"]`)
          ).to.have.attribute('xsi:type', `tP_${type}`);
        }
      });
    });
    describe('with missing address element', () => {
      beforeEach(async () => {
        gse = doc.querySelector(
          'GSE[ldInst="CircuitBreaker_CB1"][cbName="GCB2"]'
        )!;

        wizard = [
          {
            title: 'asdas',
            content: renderGseSmvAddress(gse),
          },
        ];
        element.workflow.push(wizard);
        await element.requestUpdate();
        inputs = Array.from(element.wizardUI.inputs);
        await element.requestUpdate();
      });

      it('creates a Address element when at least one attribute changes', async () => {
        for (const rawInput of inputs) {
          const input =
            rawInput instanceof WizardTextField
              ? <WizardTextField>rawInput
              : <WizardSelect>rawInput;

          const type = input.label;
          const newValue = 'newValue';

          input.value = newValue;
          await input.requestUpdate();
          const actions = updateAddress(gse, inputs, false);
          expect(actions.length).to.equal(1);
          expect(actions[0]).to.satisfy(isCreate);
          const newElement = (<Create>actions[0]).new.element;
          expect(
            newElement.querySelector(`P[type="${type}"]`)?.textContent?.trim()
          ).to.equal(newValue);
          expect(
            newElement.querySelector(`P[type="${type}"]`)
          ).to.not.have.attribute('xsi:type', `tP_${type}`);
        }
      });
      it('update a Address element when status of instType has changed', async () => {
        for (const rawInput of inputs) {
          const input =
            rawInput instanceof WizardTextField
              ? <WizardTextField>rawInput
              : <WizardSelect>rawInput;

          const type = input.label;
          const newValue = input.value;

          input.value = newValue;
          await input.requestUpdate();
          const actions = updateAddress(gse, inputs, true);
          expect(actions.length).to.equal(1);
          expect(actions[0]).to.satisfy(isCreate);
          const newElement = (<Create>actions[0]).new.element;
          expect(
            newElement.querySelector(`P[type="${type}"]`)?.textContent?.trim()
          ).to.equal(newValue);
          expect(
            newElement.querySelector(`P[type="${type}"]`)
          ).to.have.attribute('xsi:type', `tP_${type}`);
        }
      });
    });
  });
});
