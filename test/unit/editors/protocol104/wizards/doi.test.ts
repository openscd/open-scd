import { expect, fixture, html } from '@open-wc/testing';

import { MockWizard } from "../../../../mock-wizard.js";

import '../../../../mock-wizard.js';

import { WizardInputElement } from "../../../../../src/foundation.js";

import { showDoiInfoWizard } from "../../../../../src/editors/protocol104/wizards/doi.js";

import { fetchDoc } from "../../../wizards/test-support.js";

describe('Wizards for 104 DOI Element', () => {
  let doc: XMLDocument;
  let doi: Element;
  let element: MockWizard;
  let inputs: WizardInputElement[];

  beforeEach(async () => {
    doc = await fetchDoc('/test/testfiles/104/valid-addresses-case1.scd');
    element = await fixture(html`<mock-wizard></mock-wizard>`);
  });

  describe('show 104 DOI Info', () => {
    beforeEach(async () => {
      doi = doc.querySelector('IED[name="B1"] LN[lnType="SE_GGIO_SET_V002"] DOI[name="Mod"]')!;

      const wizard = showDoiInfoWizard(doi);
      element.workflow.push(() => wizard);
      await element.requestUpdate();
      inputs = Array.from(element.wizardUI.inputs);
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });
  });
});
