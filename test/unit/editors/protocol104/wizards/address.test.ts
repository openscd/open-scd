import { expect, fixture, html } from '@open-wc/testing';

import { MockWizard } from "../../../../mock-wizard.js";

import '../../../../mock-wizard.js';

import { WizardInputElement } from "../../../../../src/foundation.js";
import { WizardTextField } from "../../../../../src/wizard-textfield.js";
import { WizardSelect } from "../../../../../src/wizard-select.js";

import {
  executeWizardReplaceAction,
  expectWizardNoUpdateAction,
  fetchDoc,
  setWizardSelectValue,
  setWizardTextFieldValue
} from "../../../wizards/test-support.js";

import {
  editAddressWizard,
  updateValue
} from "../../../../../src/editors/protocol104/wizards/address.js";

describe('Wizards for 104 Address Element', () => {
  let doc: XMLDocument;
  let address: Element;
  let dai: Element;
  let element: MockWizard;
  let inputs: WizardInputElement[];

  beforeEach(async () => {
    doc = await fetchDoc('/test/testfiles/104/valid-addresses.scd');
    element = await fixture(html`<mock-wizard></mock-wizard>`);
  });

  describe('edit basic 104 Address', () => {
    beforeEach(async () => {
      address = doc.querySelector('IED[name="B2"] LN0[lnClass="LLN0"] DAI[name="stVal"] Address')!;
      dai = address.closest('DAI')!;

      const wizard = editAddressWizard(dai, address);
      element.workflow.push(() => wizard);
      await element.requestUpdate();
      inputs = Array.from(element.wizardUI.inputs);
    });

    it('update basic fields should be updated in document', async function () {
      await setWizardTextFieldValue(<WizardTextField>inputs[2], '11'); // Casdu Field
      await setWizardTextFieldValue(<WizardTextField>inputs[3], '21'); // IOA Field

      const updateAction = executeWizardReplaceAction(
        updateValue(dai, address),
        inputs
      );
      expect(updateAction.old.element).to.have.attribute('casdu', '1');
      expect(updateAction.new.element).to.have.attribute('casdu', '11');
      expect(updateAction.old.element).to.have.attribute('ioa', '2');
      expect(updateAction.new.element).to.have.attribute('ioa', '21');
    });

    it('when no fields changed there will be no update action', async function () {
      expectWizardNoUpdateAction(updateValue(dai, address), inputs);
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });
  });

  describe('edit 104 Address with expected value', () => {
    beforeEach(async () => {
      address = doc.querySelector('IED[name="B1"] LN[lnType="SE_GGIO_SET_V002"] DOI[name="Mod"] DAI[name="ctlVal"] Address[ioa="2"]')!;
      dai = address.closest('DAI')!;

      const wizard = editAddressWizard(dai, address);
      element.workflow.push(() => wizard);
      await element.requestUpdate();
      inputs = Array.from(element.wizardUI.inputs);
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });
  });

  describe('edit 104 Address with unit multiplier', () => {
    beforeEach(async () => {
      address = doc.querySelector('IED[name="B1"] LN[lnType="SE_GGIO_SET_V002"] DOI[name="IntIn1"] DAI[name="stVal"] Address')!;
      dai = address.closest('DAI')!;

      const wizard = editAddressWizard(dai, address);
      element.workflow.push(() => wizard);
      await element.requestUpdate();
      inputs = Array.from(element.wizardUI.inputs);
    });

    it('update unit multiplier field should be updated in document', async function () {
      await setWizardSelectValue(<WizardSelect>inputs[5], 'k'); // Unit Multiplier Field

      const updateAction = executeWizardReplaceAction(
        updateValue(dai, address),
        inputs
      );
      expect(updateAction.old.element).to.not.have.attribute('unitMultiplier');
      expect(updateAction.new.element).to.have.attribute('unitMultiplier', 'k');
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });
  });

  describe('edit 104 Address with scale fields', () => {
    beforeEach(async () => {
      address = doc.querySelector('IED[name="B1"] LN[lnType="SE_MMXU_SET_V001"] DOI[name="Hz"] DAI[name="f"] Address')!;
      dai = address.closest('DAI')!;

      const wizard = editAddressWizard(dai, address);
      element.workflow.push(() => wizard);
      await element.requestUpdate();
      inputs = Array.from(element.wizardUI.inputs);
    });

    it('update scale fields should be updated in document', async function () {
      await setWizardTextFieldValue(<WizardTextField>inputs[6], '1.234'); // Scale Multiplier Field
      await setWizardTextFieldValue(<WizardTextField>inputs[7], '2.345'); // Scale Offset Field

      const updateAction = executeWizardReplaceAction(
        updateValue(dai, address),
        inputs
      );
      expect(updateAction.old.element).to.not.have.attribute('scaleMultiplier');
      expect(updateAction.new.element).to.have.attribute('scaleMultiplier', '1.234');
      expect(updateAction.old.element).to.not.have.attribute('scaleOffset');
      expect(updateAction.new.element).to.have.attribute('scaleOffset', '2.345');
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });
  });
});
