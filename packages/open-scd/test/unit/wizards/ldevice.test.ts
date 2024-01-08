import { expect, fixture, html } from '@open-wc/testing';

import '../../mock-wizard.js';
import { MockWizard } from '../../mock-wizard.js';

import { WizardTextField } from '../../../src/wizard-textfield.js';
import { WizardInputElement } from '../../../src/foundation.js';
import { editLDeviceWizard } from '../../../src/wizards/ldevice.js';

import { fetchDoc, setWizardTextFieldValue } from './test-support.js';

describe('Wizards for SCL element LDevice', () => {
  let doc: XMLDocument;
  let ied: Element;
  let services: Element;
  let ldevice: Element;
  let element: MockWizard;
  let inputs: WizardInputElement[];

  beforeEach(async () => {
    doc = await fetchDoc('/test/testfiles/wizards/ied.scd');
    ied = doc.querySelector('IED[name="IED3"]')!;
    services = ied.querySelector('Services')!;
    ldevice = ied.querySelectorAll('AccessPoint > Server > LDevice')[0];
    element = await fixture(html`<mock-wizard></mock-wizard>`);
    const wizard = editLDeviceWizard(ldevice);
    element.workflow.push(() => wizard);
    await element.requestUpdate();
    inputs = Array.from(element.wizardUI.inputs);
  });

  it('contains a wizard-textfield with a non-empty "inst" value', async () => {
    expect(
      (<WizardTextField[]>inputs).find(textField => textField.label == 'ldInst')
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

  describe('Allowing ldName editing', () => {
    it('ConfLdName should not be present and therefore ldName should be readonly', async function () {
      expect(services.querySelector('ConfLdName')).to.not.exist;
      expect(<WizardTextField>inputs[0]).to.have.attribute('readonly');
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });

    it('ConfLdName should be present in IED1 and therefore ldName should be readonly', async function () {
      ied = doc.querySelector('IED[name="IED1"]')!;
      services = ied.querySelector('Services')!;
      ldevice = ied.querySelectorAll('AccessPoint > Server > LDevice')[0];
      element = await fixture(html`<mock-wizard></mock-wizard>`);
      const wizard = editLDeviceWizard(ldevice);
      element.workflow.push(() => wizard);
      await element.requestUpdate();
      inputs = Array.from(element.wizardUI.inputs);

      expect(services.querySelector('ConfLdName')).to.exist;
      expect(<WizardTextField>inputs[0]).to.not.have.attribute('readonly');
    });
  });
});
