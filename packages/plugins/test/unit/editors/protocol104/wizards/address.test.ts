import { expect, fixture, html } from '@open-wc/testing';

import '@openscd/open-scd/src/addons/Wizards.js';
import { OscdWizards } from '@openscd/open-scd/src/addons/Wizards.js';

import { WizardInputElement } from '@openscd/open-scd/src/foundation.js';
import { WizardTextField } from '@openscd/open-scd/src/wizard-textfield.js';
import { WizardSelect } from '@openscd/open-scd/src/wizard-select.js';

import {
  executeWizardReplaceAction,
  expectWizardNoUpdateAction,
  fetchDoc,
  setWizardSelectValue,
  setWizardTextFieldValue,
} from '../../../wizards/test-support.js';

import {
  editAddressWizard,
  updateAddressValue,
} from '../../../../../src/editors/protocol104/wizards/address.js';

describe('Wizards for 104 Address Element', () => {
  let doc: XMLDocument;
  let address: Element;
  let dai: Element;
  let doi: Element;
  let ied: Element;
  let element: OscdWizards;
  let inputs: WizardInputElement[];

  beforeEach(async () => {
    doc = await fetchDoc('/test/testfiles/104/valid-addresses.scd');
    element = await fixture(
      html`<oscd-wizards .host=${document}></oscd-wizards>`
    );
  });

  async function prepareWizard(daiQuery: string): Promise<void> {
    address = doc.querySelector(daiQuery)!;
    dai = address.closest('DAI')!;
    doi = dai.closest('DOI')!;
    ied = dai.closest('IED')!;

    const wizard = editAddressWizard(ied, doi, dai, address);
    element.workflow.push(() => wizard);
    await element.requestUpdate();
    inputs = Array.from(element.wizardUI.inputs);
  }

  describe('when adding a 104 Address', () => {
    beforeEach(async () => {
      await prepareWizard(
        'IED[name="B1"] LN[lnType="SE_GGIO_SET_V002"] DOI[name="Mod"] DAI[name="ctlVal"] Address'
      );
    });

    it('shows a validation error message if the combination of casdu and ioa is already in use', async () => {
      await setWizardTextFieldValue(<WizardTextField>inputs[2], '208'); // Casdu Field
      await setWizardTextFieldValue(<WizardTextField>inputs[3], '2'); // IOA Field
      await element.updateComplete;
      expect(inputs[3].checkValidity()).to.be.false;
      expect(inputs[3].validity.customError).to.be.true;
      expect(inputs[3].validationMessage).to.include('ioaConflict');
    });
  });

  describe('edit basic 104 Address', () => {
    beforeEach(async () => {
      await prepareWizard(
        'IED[name="B2"] LN0[lnClass="LLN0"] DAI[name="stVal"] Address'
      );
    });

    it('update basic fields should be updated in document', async function () {
      await setWizardTextFieldValue(<WizardTextField>inputs[2], '11'); // Casdu Field
      await setWizardTextFieldValue(<WizardTextField>inputs[3], '21'); // IOA Field

      const updateAction = executeWizardReplaceAction(
        updateAddressValue(doi, dai, address),
        element.wizardUI,
        inputs
      );
      expect(updateAction.old.element).to.have.attribute('casdu', '1');
      expect(updateAction.new.element).to.have.attribute('casdu', '11');
      expect(updateAction.old.element).to.have.attribute('ioa', '2');
      expect(updateAction.new.element).to.have.attribute('ioa', '21');
    });

    it('when no fields changed there will be no update action', async function () {
      expectWizardNoUpdateAction(
        updateAddressValue(doi, dai, address),
        element.wizardUI,
        inputs
      );
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });
  });

  describe('edit 104 Address with expected value', () => {
    beforeEach(async () => {
      await prepareWizard(
        'IED[name="B1"] LN[lnType="SE_GGIO_SET_V002"] DOI[name="Mod"] DAI[name="ctlVal"] Address[ioa="2"]'
      );
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });
  });

  describe('edit 104 Address with unit multiplier', () => {
    beforeEach(async () => {
      await prepareWizard(
        'IED[name="B1"] LN[lnType="SE_GGIO_SET_V002"] DOI[name="IntIn1"] DAI[name="stVal"] Address'
      );
    });

    it('update unit multiplier field should be updated in document', async function () {
      await setWizardSelectValue(<WizardSelect>inputs[5], 'k'); // Unit Multiplier Field

      const updateAction = executeWizardReplaceAction(
        updateAddressValue(doi, dai, address),
        element.wizardUI,
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
      await prepareWizard(
        'IED[name="B1"] LN[lnType="SE_MMXU_SET_V001"] DOI[name="Hz"] DAI[name="f"] Address'
      );
    });

    it('update scale fields should be updated in document', async function () {
      await setWizardTextFieldValue(<WizardTextField>inputs[6], '1.234'); // Scale Multiplier Field
      await setWizardTextFieldValue(<WizardTextField>inputs[7], '2.345'); // Scale Offset Field

      const updateAction = executeWizardReplaceAction(
        updateAddressValue(doi, dai, address),
        element.wizardUI,
        inputs
      );
      expect(updateAction.old.element).to.not.have.attribute('scaleMultiplier');
      expect(updateAction.new.element).to.have.attribute(
        'scaleMultiplier',
        '1.234'
      );
      expect(updateAction.old.element).to.not.have.attribute('scaleOffset');
      expect(updateAction.new.element).to.have.attribute(
        'scaleOffset',
        '2.345'
      );
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot({
        ignoreAttributes: [
          {
            tags: ['wizard-textfield'],
            attributes: ['pattern'],
          },
        ],
      });
    });

    //work around, because the escapes get removed in snapshot
    it('should have correct pattern', async () => {
      const decimal_pattern = '[+\\-]?[0-9]+(([.][0-9]*)?|([.][0-9]+))';

      expect(
        element.wizardUI.dialog!.querySelectorAll('wizard-textfield[pattern]')!
          .length
      ).to.equal(2);

      expect(
        element.wizardUI
          .dialog!.querySelectorAll('wizard-textfield[pattern]')[0]
          .getAttribute('pattern')
      ).to.equal(decimal_pattern);

      expect(
        element.wizardUI
          .dialog!.querySelectorAll('wizard-textfield[pattern]')[1]
          .getAttribute('pattern')
      ).to.equal(decimal_pattern);
    });
  });

  describe('edit 104 Address with mapped cdc value', () => {
    beforeEach(async () => {
      await prepareWizard(
        'IED[name="B1"] LN[lnType="SE_MMXU_SET_V001"] DOI[name="PPV"] DAI[name="f"] Address'
      );
    });
    it('should have mappedCmv translation value in helper field', async () => {
      const cdc = element.wizardUI.dialog!.querySelector<WizardTextField>(
        'wizard-textfield[label="cdc"]'
      );
      expect(cdc).to.exist;
      await expect(cdc!.helper).to.equal('[protocol104.mappedCmv]');
    });
  });

  describe('edit 104 Address with inverted value', () => {
    beforeEach(async () => {
      await prepareWizard(
        'IED[name="B1"] LN[lnType="SE_GGIO_SET_V002"] DOI[name="Ind2"] DAI[name="stVal"] Address[inverted="true"]'
      );
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });
  });

  describe('edit 104 Address with check value', () => {
    beforeEach(async () => {
      await prepareWizard(
        'IED[name="B1"] LN[lnType="SE_GGIO_SET_V002"] DOI[name="DPCSO1"] DAI[name="Check"] Address[check="interlocking"]'
      );
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });
  });
});
