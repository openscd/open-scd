import {expect, fixture, html} from '@open-wc/testing';

import '../../mock-wizard.js';
import {MockWizard} from '../../mock-wizard.js';

import {WizardTextField} from '../../../src/wizard-textfield.js';
import {WizardInput} from '../../../src/foundation.js';
import {editIEDWizard} from '../../../src/wizards/ied.js';
import {updateNamingAction} from '../../../src/wizards/foundation/actions.js';

import {
  executeWizardUpdateAction,
  expectWizardNoUpdateAction,
  fetchDoc,
  setWizardTextFieldValue,
} from './foundation.js';

describe('Wizards for SCL element IED', () => {
  let doc: XMLDocument;
  let ied: Element;
  let element: MockWizard;
  let inputs: WizardInput[];

  beforeEach(async () => {
    doc = await fetchDoc('/test/testfiles/valid2007B4.scd');
    ied = doc.querySelector('IED[name="IED3"]')!;

    element = await fixture(html`<mock-wizard></mock-wizard>`);
    const wizard = editIEDWizard(ied);
    element.workflow.push(() => wizard);
    await element.requestUpdate();
    inputs = Array.from(element.wizardUI.inputs);
  });

  it('update name should be updated in document', async function () {
    await setWizardTextFieldValue(<WizardTextField>inputs[0], 'OtherIED3');

    const updateAction = executeWizardUpdateAction(
      updateNamingAction(ied),
      inputs
    );
    expect(updateAction.old.element).to.have.attribute('name', 'IED3');
    expect(updateAction.new.element).to.have.attribute('name', 'OtherIED3');
  });

  it('update name should be unique in document', async function () {
    await setWizardTextFieldValue(<WizardTextField>inputs[0], 'IED2');
    expect(inputs[0].checkValidity()).to.be.false;
  });

  it('update description should be updated in document', async function () {
    await setWizardTextFieldValue(<WizardTextField>inputs[1], 'Some description');

    const updateAction = executeWizardUpdateAction(
      updateNamingAction(ied),
      inputs
    );
    expect(updateAction.old.element).to.not.have.attribute('desc');
    expect(updateAction.new.element).to.have.attribute('desc', 'Some description');
  });

  it('when no fields changed there will be no update action', async function () {
    expectWizardNoUpdateAction(updateNamingAction(ied), inputs);
  });

  it('looks like the latest snapshot', async () => {
    await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
  });
});
