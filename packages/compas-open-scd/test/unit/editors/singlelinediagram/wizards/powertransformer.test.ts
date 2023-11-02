import { expect, fixture, html } from '@open-wc/testing';

import '../../../../mock-wizard.js';
import { MockWizard } from '../../../../mock-wizard.js';
import {
  executeWizardReplaceAction,
  expectWizardNoUpdateAction,
  fetchDoc,
  setWizardTextFieldValue,
} from '../../../wizards/test-support.js';

import { WizardTextField } from '../../../../../src/wizard-textfield.js';
import { WizardInputElement } from '../../../../../src/foundation.js';
import { editPowerTransformerWizard } from '../../../../../src/editors/singlelinediagram/wizards/powertransformer.js';
import { updateNamingAndCoordinatesAction } from '../../../../../src/editors/singlelinediagram/wizards/foundation.js';

describe('Wizards for SCL element Power Transformer (X/Y)', () => {
  let doc: XMLDocument;
  let powerTransformer: Element;
  let element: MockWizard;
  let inputs: WizardInputElement[];

  beforeEach(async () => {
    doc = await fetchDoc('/test/testfiles/valid2007B4withSubstationXY.scd');
    powerTransformer = doc.querySelector('PowerTransformer[name="TA1"]')!;

    element = await fixture(html`<mock-wizard></mock-wizard>`);
    const wizard = editPowerTransformerWizard(powerTransformer);
    element.workflow.push(() => wizard);
    await element.requestUpdate();
    inputs = Array.from(element.wizardUI.inputs);
  });

  it('update name should be updated in document', async function () {
    await setWizardTextFieldValue(<WizardTextField>inputs[0], 'OtherTA1');

    const updateAction = executeWizardReplaceAction(
      updateNamingAndCoordinatesAction(powerTransformer),
      element.wizardUI,
      inputs
    );
    expect(updateAction.old.element).to.have.attribute('name', 'TA1');
    expect(updateAction.new.element).to.have.attribute('name', 'OtherTA1');
  });

  it('update description should be updated in document', async function () {
    await setWizardTextFieldValue(
      <WizardTextField>inputs[1],
      'Some description'
    );

    const updateAction = executeWizardReplaceAction(
      updateNamingAndCoordinatesAction(powerTransformer),
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
    await setWizardTextFieldValue(<WizardTextField>inputs[3], '4');

    const updateAction = executeWizardReplaceAction(
      updateNamingAndCoordinatesAction(powerTransformer),
      element.wizardUI,
      inputs
    );
    expect(updateAction.old.element).to.have.attribute('sxy:x', '1');
    expect(updateAction.new.element).to.have.attribute('sxy:x', '4');
  });

  it('update Y-Coordinate should be updated in document', async function () {
    await setWizardTextFieldValue(<WizardTextField>inputs[4], '5');

    const updateAction = executeWizardReplaceAction(
      updateNamingAndCoordinatesAction(powerTransformer),
      element.wizardUI,
      inputs
    );
    expect(updateAction.old.element).to.have.attribute('sxy:y', '9');
    expect(updateAction.new.element).to.have.attribute('sxy:y', '5');
  });

  it('clear Y-Coordinate should be updated in document', async function () {
    await setWizardTextFieldValue(<WizardTextField>inputs[4], null);

    const updateAction = executeWizardReplaceAction(
      updateNamingAndCoordinatesAction(powerTransformer),
      element.wizardUI,
      inputs
    );
    expect(updateAction.old.element).to.have.attribute('sxy:y', '9');
    expect(updateAction.new.element).to.not.have.attribute('sxy:y');
  });

  it('when no fields changed there will be no update action', async function () {
    expectWizardNoUpdateAction(
      updateNamingAndCoordinatesAction(powerTransformer),
      element.wizardUI,
      inputs
    );
  });

  it('looks like the latest snapshot', async () => {
    await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
  });
});
