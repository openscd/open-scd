import { expect, fixture, html } from '@open-wc/testing';

import '@openscd/open-scd/src/addons/Wizards.js';
import { OscdWizards } from '@openscd/open-scd/src/addons/Wizards.js';

import {
  executeWizardReplaceAction,
  expectWizardNoUpdateAction,
  fetchDoc,
  setWizardTextFieldValue,
} from '../../../wizards/test-support.js';

import { WizardTextField } from '@openscd/open-scd/src/wizard-textfield.js';
import { WizardInputElement } from '@openscd/open-scd/src/foundation.js';
import { editBayWizard } from '../../../../../src/editors/singlelinediagram/wizards/bay.js';
import { updateNamingAndCoordinatesAction } from '../../../../../src/editors/singlelinediagram/wizards/foundation.js';

describe('Wizards for SCL element Bay (X/Y)', () => {
  let doc: XMLDocument;
  let bay: Element;
  let element: OscdWizards;
  let inputs: WizardInputElement[];

  beforeEach(async () => {
    doc = await fetchDoc('/test/testfiles/valid2007B4withSubstationXY.scd');
    bay = doc.querySelector('Bay[name="BusBar A"]')!;

    element = await fixture(
      html`<oscd-wizards .host=${document}></oscd-wizards>`
    );
    const wizard = editBayWizard(bay);
    element.workflow.push(() => wizard);
    await element.requestUpdate();
    inputs = Array.from(element.wizardUI.inputs);
  });

  it('update name should be updated in document', async function () {
    await setWizardTextFieldValue(<WizardTextField>inputs[0], 'OtherBusBar A');

    const updateAction = executeWizardReplaceAction(
      updateNamingAndCoordinatesAction(bay),
      element.wizardUI,
      inputs
    );
    expect(updateAction.old.element).to.have.attribute('name', 'BusBar A');
    expect(updateAction.new.element).to.have.attribute('name', 'OtherBusBar A');
  });

  it('update description should be updated in document', async function () {
    await setWizardTextFieldValue(
      <WizardTextField>inputs[1],
      'Some description'
    );

    const updateAction = executeWizardReplaceAction(
      updateNamingAndCoordinatesAction(bay),
      element.wizardUI,
      inputs
    );
    expect(updateAction.old.element).to.not.have.attribute('desc');
    expect(updateAction.new.element).to.have.attribute(
      'desc',
      'Some description'
    );
  });

  it('update X-Coordinate should be updated in document', async function () {
    await setWizardTextFieldValue(<WizardTextField>inputs[2], '4');

    const updateAction = executeWizardReplaceAction(
      updateNamingAndCoordinatesAction(bay),
      element.wizardUI,
      inputs
    );
    expect(updateAction.old.element).to.have.attribute('sxy:x', '1');
    expect(updateAction.new.element).to.have.attribute('sxy:x', '4');
  });

  it('update Y-Coordinate should be updated in document', async function () {
    await setWizardTextFieldValue(<WizardTextField>inputs[3], '5');

    const updateAction = executeWizardReplaceAction(
      updateNamingAndCoordinatesAction(bay),
      element.wizardUI,
      inputs
    );
    expect(updateAction.old.element).to.have.attribute('sxy:y', '1');
    expect(updateAction.new.element).to.have.attribute('sxy:y', '5');
  });

  it('clear Y-Coordinate should be updated in document', async function () {
    await setWizardTextFieldValue(<WizardTextField>inputs[3], null);

    const updateAction = executeWizardReplaceAction(
      updateNamingAndCoordinatesAction(bay),
      element.wizardUI,
      inputs
    );
    expect(updateAction.old.element).to.have.attribute('sxy:y', '1');
    expect(updateAction.new.element).to.not.have.attribute('sxy:y');
  });

  it('when no fields changed there will be no update action', async function () {
    expectWizardNoUpdateAction(
      updateNamingAndCoordinatesAction(bay),
      element.wizardUI,
      inputs
    );
  });

  it('looks like the latest snapshot', async () => {
    await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
  });
});
