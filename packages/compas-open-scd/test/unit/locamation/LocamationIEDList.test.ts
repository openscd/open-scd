import { expect, fixture, html } from '@open-wc/testing';

import {MockWizardEditor} from "@openscd/open-scd/test/mock-wizard-editor.js";
import {fetchDoc} from "@openscd/plugins/test/unit/wizards/test-support.js";
import {initializeNsdoc, Nsdoc} from "@openscd/open-scd/src/foundation/nsdoc.js"

import '@openscd/open-scd/test/mock-wizard-editor.js';
import { newWizardEvent } from '@openscd/open-scd/src/foundation.js';

import {
  LocamationIEDListElement,
  locamationIEDListWizard,
} from '../../../src/locamation/LocamationIEDList.js';

import '../../../src/locamation/LocamationIEDList.js';

describe('Wizards for Locamation Plugin to select the IED/Logical Device - ', () => {
  let nsdoc: Nsdoc;
  let doc: XMLDocument;

  beforeEach(async () => {
    nsdoc = await initializeNsdoc();
  });

  describe('starting screen as wizard - ', async () => {
    let element: MockWizardEditor;

    beforeEach(async () => {
      doc = await fetchDoc('/test/testfiles/locamation/LCMTN_VMU_MMS.scd');

      element = await fixture(html`<mock-wizard-editor></mock-wizard-editor>`);
      const wizard = locamationIEDListWizard(doc, nsdoc);
      element.dispatchEvent(newWizardEvent(wizard));
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

      element = await fixture(
        html`<locamation-ied-list
          .doc="${doc}"
          .nsdoc="${nsdoc}"
        ></locamation-ied-list>`
      );
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

      element = await fixture(
        html`<locamation-ied-list
          .doc="${doc}"
          .nsdoc="${nsdoc}"
        ></locamation-ied-list>`
      );
      await element.requestUpdate();
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });
});
