import { expect, fixture, html } from '@open-wc/testing';

import '../../mock-wizard.js';
import { MockWizard } from '../../mock-wizard.js';

import { WizardTextField } from '../../../src/wizard-textfield.js';
import { WizardSelect } from '../../../src/wizard-select.js';
import {
  ComplexAction,
  Create,
  isSimple,
  Replace,
  WizardAction,
  WizardInputElement,
} from '../../../src/foundation.js';

import {
  fetchDoc,
  newWizard,
  setWizardSelectValue,
  setWizardTextFieldValue,
} from './test-support.js';
import {
  createDAIWizard,
  createValue,
  editDAIWizard,
  updateValue,
} from '../../../src/wizards/dai.js';

describe('Wizards for SCL element DAI', () => {
  let doc: XMLDocument;
  let doi: Element;
  let dai: Element;
  let da: Element;
  let element: MockWizard;
  let inputs: WizardInputElement[];

  describe('create DAI with existing Val Element', () => {
    beforeEach(async () => {
      doc = await fetchDoc('/test/testfiles/wizards/ied.scd');
      dai = doc.querySelector(
        'IED[name="IED1"] > AccessPoint[name="P1"] > Server > LDevice[inst="CircuitBreaker_CB1"] > LN[inst="1"][lnClass="XCBR"] > DOI[name="Beh"] > DAI[name="integer"]'
      )!;
      doi = dai.closest('DOI')!;
      da = doc.querySelector(
        'DOType[cdc="ENS"][id="Dummy.LLN0.Beh"] > DA[name="integer"]'
      )!;

      element = await fixture(html`<mock-wizard></mock-wizard>`);
      const wizard = createDAIWizard(doi, dai, da);
      element.workflow.push(() => wizard);
      await element.requestUpdate();
      inputs = Array.from(element.wizardUI.inputs);
    });

    it('update value should be updated in document', async function () {
      await setWizardTextFieldValue(<WizardTextField>inputs[0], '24');

      const complexActions = createValue(
        doi,
        da,
        dai,
        dai
      )(inputs, newWizard());
      expectCreateComplexAction(complexActions, '24');
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });
  });

  describe('create DAI without Val Element', () => {
    beforeEach(async () => {
      doc = await fetchDoc('/test/testfiles/wizards/ied.scd');
      dai = doc.querySelector(
        'IED[name="IED1"] > AccessPoint[name="P1"] > Server > LDevice[inst="CircuitBreaker_CB1"] > LN[inst="1"][lnClass="XCBR"] > DOI[name="Beh"] > DAI[name="t"]'
      )!;
      doi = dai.closest('DOI')!;
      da = doc.querySelector(
        'DOType[cdc="ENS"][id="Dummy.LLN0.Beh"] > DA[name="t"]'
      )!;

      element = await fixture(html`<mock-wizard></mock-wizard>`);
      const wizard = createDAIWizard(dai.closest('DOI')!, dai, da);
      element.workflow.push(() => wizard);
      await element.requestUpdate();
      inputs = Array.from(element.wizardUI.inputs);
    });

    it('update value should be updated in document', async function () {
      await setWizardTextFieldValue(<WizardTextField>inputs[0], '');
      await setWizardTextFieldValue(<WizardTextField>inputs[1], '');

      const complexActions = createValue(
        dai.closest('DOI')!,
        da,
        dai,
        dai
      )(inputs, newWizard());
      expectCreateComplexAction(complexActions, '0000-00-00T00:00:00.000');
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });
  });

  describe('edit existing DAI with Val Element', () => {
    beforeEach(async () => {
      doc = await fetchDoc('/test/testfiles/wizards/ied.scd');
      dai = doc.querySelector(
        'IED[name="IED1"] > AccessPoint[name="P1"] > Server > LDevice[inst="CircuitBreaker_CB1"] > LN[prefix="CB"][lnClass="CSWI"] > DOI[name="Beh"] > DAI[name="integer"]'
      )!;
      da = doc.querySelector(
        'DOType[cdc="ENS"][id="Dummy.LLN0.Beh"] > DA[name="integer"]'
      )!;

      element = await fixture(html`<mock-wizard></mock-wizard>`);
      const wizard = editDAIWizard(da, dai);
      element.workflow.push(() => wizard);
      await element.requestUpdate();
      inputs = Array.from(element.wizardUI.inputs);
    });

    it('update value should be updated in document', async function () {
      await setWizardTextFieldValue(<WizardTextField>inputs[0], '8');

      const complexActions = updateValue(da, dai)(inputs, newWizard());
      expectUpdateComplexAction(complexActions);

      const replace = <Replace>(<ComplexAction>complexActions[0]).actions[0];
      expect(replace.old.element.textContent).to.equal('5');
      expect(replace.new.element.textContent).to.equal('8');
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });
  });

  describe('edit existing DAI without Val Element', () => {
    beforeEach(async () => {
      doc = await fetchDoc('/test/testfiles/wizards/ied.scd');
      dai = doc.querySelector(
        'IED[name="IED1"] > AccessPoint[name="P1"] > Server > LDevice[inst="CircuitBreaker_CB1"] > LN[inst="1"][lnClass="XCBR"] > DOI[name="Beh"] > DAI[name="stVal"]'
      )!;
      da = doc.querySelector(
        'DOType[cdc="ENS"][id="Dummy.LLN0.Beh"] > DA[name="stVal"]'
      )!;

      element = await fixture(html`<mock-wizard></mock-wizard>`);
      const wizard = editDAIWizard(da, dai);
      element.workflow.push(() => wizard);
      await element.requestUpdate();
      inputs = Array.from(element.wizardUI.inputs);
    });

    it('update value should be updated in document', async function () {
      await setWizardSelectValue(<WizardSelect>inputs[0], 'blocked');

      const complexActions = updateValue(da, dai)(inputs, newWizard());
      expectUpdateComplexAction(complexActions);

      const create = <Create>(<ComplexAction>complexActions[0]).actions[0];
      expect(create.new.parent).to.equal(dai);
      expect(create.new.element.textContent).to.equal('blocked');
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });
  });

  function expectUpdateComplexAction(complexActions: WizardAction[]): void {
    expect(complexActions.length).to.equal(1);
    expect(complexActions[0]).to.not.satisfy(isSimple);

    expect((<ComplexAction>complexActions[0]).title).to.equal(
      '[dai.action.updatedai]'
    );

    const actions = (<ComplexAction>complexActions[0]).actions;
    expect(actions.length).to.equal(1);
  }

  function expectCreateComplexAction(
    complexActions: WizardAction[],
    expectedValue: string
  ): void {
    expect(complexActions.length).to.equal(1);
    expect(complexActions[0]).to.not.satisfy(isSimple);

    expect((<ComplexAction>complexActions[0]).title).to.equal(
      '[dai.action.createdai]'
    );

    const actions = (<ComplexAction>complexActions[0]).actions;
    expect(actions.length).to.equal(1);

    const create = <Create>actions[0];
    expect(create.new.parent).to.equal(doi);
    expect(create.new.element).to.equal(dai);

    const val = dai.querySelector('Val')!;
    expect(val.textContent).to.be.equal(expectedValue);
  }
});
