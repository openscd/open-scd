import { expect, fixture, html } from '@open-wc/testing';

import '@openscd/open-scd/src/addons/Wizards.js';
import { OscdWizards } from '@openscd/open-scd/src/addons/Wizards.js';

import { initializeNsdoc } from '@openscd/open-scd/src/foundation/nsdoc.js';
import { createDoInfoWizard } from '../../../../src/editors/ied/do-wizard.js';
import { getAncestorsFromDO } from './test-support.js';

describe('do-wizard', async () => {
  let element: OscdWizards;
  let validSCL: XMLDocument;
  localStorage.clear();
  const nsdoc74 = await fetch(
    '@openscd/open-scd/test/testfiles/foundation/testFile74.nsdoc'
  ).then(response => response.text());

  localStorage.setItem('IEC 61850-7-4', nsdoc74!);

  const nsdoc = await initializeNsdoc();

  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/editors/iedEditorWithIEDs.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('with no ancestors', () => {
    beforeEach(async () => {
      const doElement = validSCL.querySelector(
        'DataTypeTemplates > LNodeType[id="Dummy.LLN0"] > DO[name="Mod"]'
      )!;
      const ancestors: Element[] = [];

      element = await fixture(
        html`<oscd-wizards .host=${document}></oscd-wizards>`
      );
      const wizard = createDoInfoWizard(doElement, undefined, ancestors, nsdoc);
      element.workflow.push(() => wizard);
      await element.requestUpdate();
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });
  });

  describe('with a DO element', () => {
    beforeEach(async () => {
      const doElement = validSCL.querySelector(
        'DataTypeTemplates > LNodeType[id="Dummy.LLN0"] > DO[name="Mod"]'
      )!;
      const ancestors = getAncestorsFromDO(doElement);

      element = await fixture(
        html`<oscd-wizards .host=${document}></oscd-wizards>`
      );
      const wizard = createDoInfoWizard(doElement, undefined, ancestors, nsdoc);
      element.workflow.push(() => wizard);
      await element.requestUpdate();
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
      localStorage.clear();
    });
  });

  describe('with a DO element and DOI Element', () => {
    beforeEach(async () => {
      const doElement = validSCL.querySelector(
        'DataTypeTemplates > LNodeType[id="Dummy.CSWIwithoutCtlModel"] > DO[name="Pos"]'
      )!;
      const doiElement = validSCL.querySelector(
        'IED[name="IED1"] > AccessPoint[name="P1"] > Server > ' +
          'LDevice[inst="CircuitBreaker_CB1"] > LN[lnClass="CSWI"] > DOI[name="Pos"]'
      )!;
      const ancestors = getAncestorsFromDO(doElement);

      element = await fixture(
        html`<oscd-wizards .host=${document}></oscd-wizards>`
      );
      const wizard = createDoInfoWizard(
        doElement,
        doiElement,
        ancestors,
        nsdoc
      );
      element.workflow.push(() => wizard);
      await element.requestUpdate();
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });
  });
});
