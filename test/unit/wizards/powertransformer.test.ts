import {expect, fixture, html} from '@open-wc/testing';

import '../../mock-wizard.js';
import {MockWizard} from '../../mock-wizard.js';
import {editPowerTransformerWizard} from "../../../src/wizards/powertransformer.js";

describe('Wizards for SCL element Power Transformer', () => {
  let doc: XMLDocument;
  let element: MockWizard;

  beforeEach(async () => {
    element = await fixture(html`<mock-wizard></mock-wizard>`);
    doc = await fetch('/test/testfiles/valid2007B4withSubstationXY.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    const wizard = editPowerTransformerWizard(doc.querySelector('PowerTransformer[name="TA1"]')!);
    element.workflow.push(wizard);
    await element.requestUpdate();
  });

  it('looks like the latest snapshot', async () => {
    await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
  });
});
