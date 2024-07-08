import { expect, fixture, html } from '@open-wc/testing';
import '@openscd/open-scd/src/addons/Wizards.js';
import { OscdWizards } from '@openscd/open-scd/src/addons/Wizards';

import { editLN0Wizard } from '../../../src/wizards/ln0.js';
import { WizardInputElement } from '@openscd/open-scd/src/foundation.js';
import { fetchDoc, setWizardTextFieldValue } from './test-support.js';
import { WizardTextField } from '@openscd/open-scd/src/wizard-textfield.js';



describe('ln0 wizards', () => {
  let doc: XMLDocument;
  let element: OscdWizards;
  let inputs: WizardInputElement[];

  const values = {
    lnType: 'LN0-type',
    desc: 'LN0-description',
    lnClass: 'LN0-class',
    inst: '1',
  };
  const requiredFields = [
    'lnType',
    'lnClass',
  ];

  const ln = <Element>(
    new DOMParser().parseFromString(
      `<LN0 desc="${values.desc}" lnType="${values.lnType}" inst="${values.inst}" lnClass="${values.lnClass}"></LN0>`,
      'application/xml'
    ).documentElement
  );

  beforeEach(async () => {
    doc = await fetchDoc('/test/testfiles/wizards/ied.scd');

    element = await fixture(
      html`<oscd-wizards .host=${document}></oscd-wizards>`
    );
    const wizard = editLN0Wizard(ln);

    element.workflow.push(() => wizard);
    await element.requestUpdate();
    inputs = Array.from(element.wizardUI.inputs);
  });

  Object.entries(values).forEach(([key, value]) => {
    it(`contains a wizard-textfield with a non-empty "${key}" value`, async () => {
      expect(
        (<WizardInputElement[]>inputs).find(
          (textField) => textField.label === key
        )?.value
      ).to.equal(value);
    });
  });

  requiredFields.forEach((field) => {
    it(`is a required field ${field}`, async () => {
      const input = (<WizardInputElement[]>inputs).find(
        (textField) => textField.label === field
      ) as WizardTextField;

      await setWizardTextFieldValue(input!, '');

      expect(input.checkValidity()).to.be.false;
    });
  });
});
