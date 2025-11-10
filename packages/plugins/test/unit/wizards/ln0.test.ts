import { expect, fixture, html } from '@open-wc/testing';
import '@openscd/open-scd/src/addons/Wizards.js';
import { OscdWizards } from '@openscd/open-scd/src/addons/Wizards';

import { editLN0Wizard } from '../../../src/wizards/ln0.js';
import { WizardInputElement } from '@openscd/open-scd/src/foundation.js';
import { fetchDoc } from './test-support.js';
import { WizardTextField } from '@openscd/open-scd/src/wizard-textfield.js';

describe('ln0 wizards', () => {
  let doc: XMLDocument;
  let element: OscdWizards;
  let inputs: WizardInputElement[];
  let ln: Element;

  const readonlyFields = ['lnClass', 'inst'];

  beforeEach(async () => {
    doc = await fetchDoc('/test/testfiles/wizards/ied.scd');

    ln = doc.querySelector('LN0')!;
    expect(ln).to.exist;

    element = await fixture(
      html`<oscd-wizards .host=${document}></oscd-wizards>`
    );
    const wizard = editLN0Wizard(ln);

    element.workflow.push(() => wizard);
    await element.requestUpdate();
    inputs = Array.from(element.wizardUI.inputs);
  });

  it('contains a wizard-select for lnType with available LNodeTypes', async () => {
    const lnTypeInput = (<WizardInputElement[]>inputs).find(
      input => input.label === 'lnType'
    );
    expect(lnTypeInput).to.exist;
    expect(lnTypeInput?.tagName).to.equal('WIZARD-SELECT');
  });

  it('lnType select contains LNodeType options with lnClass="LLN0"', async () => {
    const lnTypeSelect = (<WizardInputElement[]>inputs).find(
      input => input.label === 'lnType'
    );
    const options = lnTypeSelect?.querySelectorAll('mwc-list-item');
    expect(options).to.have.length.greaterThan(0);

    const lln0Types = doc.querySelectorAll('LNodeType[lnClass="LLN0"]');
    expect(options).to.have.lengthOf(lln0Types.length);
  });

  it('contains required fields', async () => {
    ['lnType', 'lnClass'].forEach(field => {
      const input = (<WizardInputElement[]>inputs).find(i => i.label === field);
      expect(input).to.exist;
    });
  });

  readonlyFields.forEach(field => {
    it(`is a readonly field ${field}`, async () => {
      const input = (<WizardInputElement[]>inputs).find(
        textField => textField.label === field
      ) as WizardTextField;

      expect(input.readOnly).to.be.true;
    });
  });
});
