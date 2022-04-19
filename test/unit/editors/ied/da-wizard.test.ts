import { html, fixture, expect } from '@open-wc/testing';

import '../../../mock-wizard.js';
import { MockWizard } from "../../../mock-wizard.js";

import { initializeNsdoc } from '../../../../src/foundation/nsdoc.js';
import { createDaInfoWizard } from "../../../../src/editors/ied/da-wizard.js";
import { getAncestorsFromDA } from "./test-support.js";

describe('da-wizard', async () => {
  let element: MockWizard;
  let validSCL: XMLDocument;

  const nsdoc = await initializeNsdoc();

  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/valid2007B4withIEDModifications.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('with no ancestors', () => {
    beforeEach(async () => {
      const daElement = validSCL.querySelector('DataTypeTemplates > DOType[id="Dummy.XCBR1.Pos"] > DA[name="ctlModel"]')!;
      const ancestors: Element[] = [];

      element = await fixture(html`<mock-wizard></mock-wizard>`);
      const wizard = createDaInfoWizard(daElement, undefined, ancestors, nsdoc);
      element.workflow.push(() => wizard);
      await element.requestUpdate();
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });
  });

  describe('with a DA element', () => {
    beforeEach(async () => {
      const daElement = validSCL.querySelector('DataTypeTemplates > DOType[id="Dummy.XCBR1.Pos"] > DA[name="ctlModel"]')!;
      const ancestors = getAncestorsFromDA(daElement, 'Dummy.XCBR1.Pos');

      element = await fixture(html`<mock-wizard></mock-wizard>`);
      const wizard = createDaInfoWizard(daElement, undefined, ancestors, nsdoc);
      element.workflow.push(() => wizard);
      await element.requestUpdate();
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });
  });

  describe('with a BDA element', () => {
    beforeEach(async () => {
      const bdaElement = validSCL.querySelector('DataTypeTemplates > DAType[id="Dummy.LPHD1.Sim.SBOw"] > BDA[name="ctlVal"]')!;
      const daElement = validSCL.querySelector('DataTypeTemplates > DOType[id="Dummy.LPHD1.Sim"] > DA[name="SBOw"]')!;
      const ancestors = getAncestorsFromDA(daElement, 'Dummy.LPHD1.Sim');
      ancestors.push(daElement);

      element = await fixture(html`<mock-wizard></mock-wizard>`);
      const wizard = createDaInfoWizard(bdaElement, undefined, ancestors, nsdoc);
      element.workflow.push(() => wizard);
      await element.requestUpdate();
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });
  });

  describe('with a DA element and DAI Element', () => {
    beforeEach(async () => {
      const daElement = validSCL.querySelector('DataTypeTemplates > DOType[id="Dummy.XCBR1.Pos"] > DA[name="ctlModel"]')!;
      const daiElement = validSCL.querySelector(':root > IED[name="IED2"] > AccessPoint[name="P1"] > Server > ' +
        'LDevice[inst="CircuitBreaker_CB1"] > LN[lnType="Dummy.XCBR1"] > DOI[name="Pos"]> DAI[name="ctlModel"]')!;
      const ancestors = getAncestorsFromDA(daElement, 'Dummy.XCBR1.Pos');

      element = await fixture(html`<mock-wizard></mock-wizard>`);
      const wizard = createDaInfoWizard(daElement, daiElement, ancestors, nsdoc);
      element.workflow.push(() => wizard);
      await element.requestUpdate();
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });
  });
});
