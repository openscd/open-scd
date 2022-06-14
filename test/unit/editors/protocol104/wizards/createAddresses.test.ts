import { expect, fixture, html } from '@open-wc/testing';

import { MockWizard } from '../../../../mock-wizard.js';

import '../../../../mock-wizard.js';

import { createAddressesWizard } from '../../../../../src/editors/protocol104/wizards/createAddresses.js';

import { fetchDoc } from '../../../wizards/test-support.js';

describe('Wizards for preparing 104 Address Creation', () => {
  let doc: XMLDocument;
  let doiElement: Element;
  let element: MockWizard;

  beforeEach(async () => {
    doc = await fetchDoc('/test/testfiles/104/valid-addresses.scd');
    element = await fixture(html`<mock-wizard></mock-wizard>`);
  });

  describe('show prepare 104 Address creation (single monitor TI only)', () => {
    beforeEach(async () => {
      doiElement = doc.querySelector(
        'IED[name="B1"] LN0[lnType="SE_LLN0_SET_V001"] DOI[name="MltLev"]'
      )!;

      const wizard = createAddressesWizard(doiElement);
      element.workflow.push(() => wizard);
      await element.requestUpdate();
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });
  });

  describe('show prepare 104 Address creation (multi monitor TI only)', () => {
    beforeEach(async () => {
      doiElement = doc.querySelector(
        'IED[name="B1"] LN[lnType="SE_GAPC_SET_V001"] DOI[name="Op"]'
      )!;

      const wizard = createAddressesWizard(doiElement);
      element.workflow.push(() => wizard);
      await element.requestUpdate();
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });
  });

  describe('show prepare 104 Address creation (single monitor TI with CtlModel)', () => {
    beforeEach(async () => {
      doiElement = doc.querySelector(
        'IED[name="B1"] LN[lnType="SE_GGIO_SET_V002"] DOI[name="SPCSO1"]'
      )!;

      const wizard = createAddressesWizard(doiElement);
      element.workflow.push(() => wizard);
      await element.requestUpdate();
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });
  });

  describe('show prepare 104 Address creation (single monitor TI and single control TI with CtlModel)', () => {
    beforeEach(async () => {
      doiElement = doc.querySelector(
        'IED[name="B1"] LN[lnType="SE_GGIO_SET_V002"] DOI[name="SPCSO2"]'
      )!;

      const wizard = createAddressesWizard(doiElement);
      element.workflow.push(() => wizard);
      await element.requestUpdate();
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });
  });
});
