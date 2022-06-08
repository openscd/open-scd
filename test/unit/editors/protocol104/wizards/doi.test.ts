import { expect, fixture, html } from '@open-wc/testing';

import { MockWizard } from '../../../../mock-wizard.js';

import '../../../../mock-wizard.js';

import { showDOIInfoWizard } from '../../../../../src/editors/protocol104/wizards/doi.js';

import { fetchDoc } from '../../../wizards/test-support.js';

describe('Wizards for 104 DOI Element', () => {
  let doc: XMLDocument;
  let doi: Element;
  let element: MockWizard;

  beforeEach(async () => {
    doc = await fetchDoc('/test/testfiles/104/valid-addresses.scd');
    element = await fixture(html`<mock-wizard></mock-wizard>`);
  });

  describe('show 104 DOI Info', () => {
    beforeEach(async () => {
      doi = doc.querySelector(
        'IED[name="B1"] LN[lnType="SE_GGIO_SET_V002"] DOI[name="CntVal1"]'
      )!;

      const wizard = showDOIInfoWizard(doi);
      element.workflow.push(() => wizard);
      await element.requestUpdate();
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });
  });

  describe('show 104 DOI Info with ctlModel', () => {
    beforeEach(async () => {
      doi = doc.querySelector(
        'IED[name="B1"] LN[lnType="SE_GGIO_SET_V002"] DOI[name="CmdBlk"]'
      )!;

      const wizard = showDOIInfoWizard(doi);
      element.workflow.push(() => wizard);
      await element.requestUpdate();
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });
  });
});
