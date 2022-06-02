import { expect, fixture, html } from '@open-wc/testing';

import { MockWizard } from "../../../../mock-wizard.js";

import '../../../../mock-wizard.js';

import { ComplexAction, isSimple, WizardInputElement } from "../../../../../src/foundation.js";

import { remove104Private, showDOIInfoWizard } from "../../../../../src/editors/protocol104/wizards/doi.js";

import { fetchDoc } from "../../../wizards/test-support.js";

describe('Wizards for 104 DOI Element', () => {
  let doc: XMLDocument;
  let doi: Element;
  let element: MockWizard;
  let inputs: WizardInputElement[];

  beforeEach(async () => {
    doc = await fetchDoc('/test/testfiles/104/valid-addresses.scd');
    element = await fixture(html`<mock-wizard></mock-wizard>`);
  });

  describe('show 104 DOI Info', () => {
    beforeEach(async () => {
      doi = doc.querySelector('IED[name="B1"] LN[lnType="SE_GGIO_SET_V002"] DOI[name="CntVal1"]')!;

      const wizard = showDOIInfoWizard(doi);
      element.workflow.push(() => wizard);
      await element.requestUpdate();
      inputs = Array.from(element.wizardUI.inputs);
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });
  });

  describe('show 104 DOI Info with ctlModel', () => {
    beforeEach(async () => {
      doi = doc.querySelector('IED[name="B1"] LN[lnType="SE_GGIO_SET_V002"] DOI[name="CmdBlk"]')!;

      const wizard = showDOIInfoWizard(doi);
      element.workflow.push(() => wizard);
      await element.requestUpdate();
      inputs = Array.from(element.wizardUI.inputs);
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });
  });

  describe('remove 104 Private elements', () => {
    it('return expected number of Delete Actions when there are 104 Private elements', () => {
      doi = doc.querySelector('IED[name="B1"] LN[lnType="SE_GGIO_SET_V002"] DOI[name="Mod"]')!;
      const actions = remove104Private(doi)();

      expect(actions.length).to.equal(1);
      expect(actions[0]).to.not.satisfy(isSimple);

      const complexAction = <ComplexAction>actions[0];
      expect(complexAction.actions.length).to.equal(2);
    })

    it('return no Delete Actions when there are no 104 Private elements', () => {
      doi = doc.querySelector('IED[name="B1"] LN[lnType="SE_GSAL_SET_V001"] DOI[name="OpCntRs"]')!;
      const actions = remove104Private(doi)();

      expect(actions.length).to.equal(0);
    })
  });
});
