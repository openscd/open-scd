import { expect, fixture, html } from '@open-wc/testing';
import '@openscd/open-scd/src/addons/Wizards.js';
import { OscdWizards } from '@openscd/open-scd/src/addons/Wizards';

import { editLNWizard } from '../../../src/wizards/ln.js';
import { WizardInputElement } from '@openscd/open-scd/src/foundation.js';
import { fetchDoc } from './test-support.js';



describe('ln wizards', () => {
  let doc: XMLDocument;
  let element: OscdWizards;
  let inputs: WizardInputElement[];
  const ln = <Element>(
    new DOMParser().parseFromString(
      `<LN desc="LN-description" lnType="LN-type" inst="1" lnClass="LN-class" prefix="LN-prefix"></LN>`,
      'application/xml'
    ).documentElement
  );

  beforeEach(async () => {
    doc = await fetchDoc('/test/testfiles/wizards/ied.scd');

    element = await fixture(
      html`<oscd-wizards .host=${document}></oscd-wizards>`
    );
    const wizard = editLNWizard(ln);

    element.workflow.push(() => wizard);
    await element.requestUpdate();
    inputs = Array.from(element.wizardUI.inputs);
  });

  it('contains a wizard-textfield with a non-empty "lnType" value', async () => {
    expect(
      (<WizardInputElement[]>inputs).find(
        (textField) => textField.label === 'lnType'
      )?.value
    ).to.equal('LN-type');
  });
});
