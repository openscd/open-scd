import { expect, fixture, html } from '@open-wc/testing';

import '@openscd/open-scd/src/addons/Wizards.js';
import { OscdWizards } from '@openscd/open-scd/src/addons/Wizards.js';

import { WizardTextField } from '@openscd/open-scd/src/wizard-textfield.js';
import {
  WizardInputElement,
  getValue,
} from '@openscd/open-scd/src/foundation.js';
import { createUpdateAction } from '@openscd/core/foundation/deprecated/editor.js';
import { editLDeviceWizard } from '../../../src/wizards/ldevice.js';
import {
  fetchDoc,
  setWizardTextFieldValue,
  expectUpdateAction,
} from './test-support.js';

describe('Wizards for SCL element LDevice', () => {
  let doc: XMLDocument;
  let ied: Element;
  let services: Element;
  let ldevice: Element;
  let element: OscdWizards;
  let inputs: WizardInputElement[];

  beforeEach(async () => {
    doc = await fetchDoc('/test/testfiles/wizards/ied.scd');
    ied = doc.querySelector('IED[name="IED3"]')!;
    services = ied.querySelector('Services')!;
    ldevice = ied.querySelectorAll('AccessPoint > Server > LDevice')[0];
    element = await fixture(
      html`<oscd-wizards .host=${document}></oscd-wizards>`
    );
    const wizard = editLDeviceWizard(ldevice);
    element.workflow.push(() => wizard);
    await element.requestUpdate();
    inputs = Array.from(element.wizardUI.inputs);
  });

  it('contains a wizard-textfield with a non-empty "inst" value', async () => {
    expect(
      (<WizardTextField[]>inputs).find(textField => textField.label == 'inst')
        ?.value
    ).to.be.equal(ldevice.getAttribute('inst'));
  });
  it('contains a wizard-textfield with an empty "desc" value', async () => {
    expect(
      (<WizardTextField[]>inputs).find(textField => textField.label == 'desc')
        ?.value
    ).to.be.equal('');
  });
  it('contains a wizard-textfield with an empty "ldName" value', async () => {
    expect(
      (<WizardTextField[]>inputs).find(textField => textField.label == 'ldName')
        ?.value
    ).to.be.equal('');
  });

  describe('Allowing/Disallowing ldName editing', () => {
    it('ConfLdName should not be present and therefore ldName should be readonly', async function () {
      expect(services.querySelector('ConfLdName')).to.not.exist;
      expect(<WizardTextField>inputs[0]).to.have.attribute('readonly');
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });

    it('ConfLdName should be present in IED1 and therefore ldName should not be readonly', async function () {
      ied = doc.querySelector('IED[name="IED1"]')!;
      services = ied.querySelector('Services')!;
      ldevice = ied.querySelectorAll('AccessPoint > Server > LDevice')[0];
      element = await fixture(
        html`<oscd-wizards .host=${document}></oscd-wizards>`
      );
      const wizard = editLDeviceWizard(ldevice);
      element.workflow.push(() => wizard);
      await element.requestUpdate();
      inputs = Array.from(element.wizardUI.inputs);

      expect(services.querySelector('ConfLdName')).to.exist;
      expect(<WizardTextField>inputs[0]).to.not.have.attribute('readonly');

      describe('Modify ldName', () => {
        it('should be registered as an update action', async () => {
          const newValue = 'LDevice1';
          const ldeviceTextField = (<WizardTextField[]>inputs).find(
            textField => textField.label == 'ldName'
          )!;

          expect(ldeviceTextField?.value).to.be.equal('');
          await setWizardTextFieldValue(ldeviceTextField, newValue);

          const ldNameVal = getValue(inputs.find(i => i.label === 'ldName')!)!;
          expect(ldNameVal).to.not.be.equal(ldevice.getAttribute('ldName'));

          const simpleAction = createUpdateAction(ldevice, {
            ldName: ldNameVal,
          });

          expectUpdateAction(
            simpleAction,
            ldevice.tagName,
            ldeviceTextField.label,
            null,
            newValue
          );
        });
      });
    });
  });
});
