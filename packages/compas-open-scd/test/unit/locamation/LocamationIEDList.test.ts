import {expect, fixture, html} from "@open-wc/testing";

import {MockWizard} from "../../mock-wizard.js";
import {fetchDoc} from "../wizards/test-support.js";
import {initializeNsdoc, Nsdoc} from "../../../src/foundation/nsdoc.js";

import "../../mock-wizard.js";

import {LocamationIEDListElement, locamationIEDListWizard} from "../../../src/locamation/LocamationIEDList.js";

import "../../../src/locamation/LocamationIEDList.js";

describe('Wizards for Locamation Plugin to select the IED/Logical Device - ', () => {
  let nsdoc: Nsdoc;
  let doc: XMLDocument;

  beforeEach(async () => {
    nsdoc = await initializeNsdoc();
  });

  describe('starting screen as wizard - ', async () => {
    let element: MockWizard;

    beforeEach(async () => {
      doc = await fetchDoc('/test/testfiles/locamation/LCMTN_VMU_MMS.scd');

      element = await fixture(html`<mock-wizard></mock-wizard>`);
      const wizard = locamationIEDListWizard(doc, nsdoc);
      element.workflow.push(() => wizard);
      await element.requestUpdate();
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });
  });

  describe('starting screen as web component with locamation IED - ', async () => {
    let element: LocamationIEDListElement;

    beforeEach(async () => {
      doc = await fetchDoc('/test/testfiles/locamation/LCMTN_VMU_MMS.scd');

      element = await fixture(html`<locamation-ied-list .doc="${doc}" .nsdoc="${nsdoc}"></locamation-ied-list>`);
      await element.requestUpdate();
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('starting screen as web component without locamation IED - ', async () => {
    let element: LocamationIEDListElement;

    beforeEach(async () => {
      doc = await fetchDoc('/test/testfiles/valid2007B4.scd');

      element = await fixture(html`<locamation-ied-list .doc="${doc}" .nsdoc="${nsdoc}"></locamation-ied-list>`);
      await element.requestUpdate();
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });
});
