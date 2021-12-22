import {expect, fixture, html} from '@open-wc/testing';

import '../../../../mock-wizard.js';
import {MockWizard} from '../../../../mock-wizard.js';
import {editBayWizard} from "../../../../../src/editors/singlelinediagram/wizards/bay.js";

describe('Wizards for SCL element Bay (X/Y)', () => {
  let doc: XMLDocument;
  let element: MockWizard;

  beforeEach(async () => {
    element = await fixture(html`<mock-wizard></mock-wizard>`);
    doc = await fetch('/test/testfiles/valid2007B4withSubstationXY.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    const wizard = editBayWizard(doc.querySelector('Bay[name="BusBar A"]')!);
    element.workflow.push(wizard);
    await element.requestUpdate();
  });

  it('looks like the latest snapshot', async () => {
    await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
  });
});
