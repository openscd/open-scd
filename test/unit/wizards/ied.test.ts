import {expect, fixture, html} from '@open-wc/testing';

import '../../mock-wizard.js';
import {MockWizard} from '../../mock-wizard.js';

import {WizardTextField} from '../../../src/wizard-textfield.js';
import {ComplexAction, isSimple, isUpdate, Update, WizardInput} from '../../../src/foundation.js';
import {editIEDWizard, updateIED} from '../../../src/wizards/ied.js';

import {
  expectUpdateAction,
  expectWizardNoUpdateAction,
  fetchDoc, newWizard,
  setWizardTextFieldValue,
} from './foundation.js';

describe('Wizards for SCL element IED', () => {
  let doc: XMLDocument;
  let ied: Element;
  let element: MockWizard;
  let inputs: WizardInput[];

  beforeEach(async () => {
    doc = await fetchDoc('/test/testfiles/wizards/ied.scd');
    ied = doc.querySelector('IED[name="IED3"]')!;

    element = await fixture(html`<mock-wizard></mock-wizard>`);
    const wizard = editIEDWizard(ied);
    element.workflow.push(() => wizard);
    await element.requestUpdate();
    inputs = Array.from(element.wizardUI.inputs);
  });

  it('update name should be updated in document', async function () {
    await setWizardTextFieldValue(<WizardTextField>inputs[0], 'OtherIED3');

    const complexAction = updateIED(ied)(inputs, newWizard());
    expect(complexAction.length).to.equal(1);
    expect(complexAction[0]).to.not.satisfy(isSimple);

    const simpleActions = (<ComplexAction>complexAction[0]).actions;
    expect(simpleActions.length).to.equal(2);

    expectUpdateAction(simpleActions[0], 'IED', 'name', 'IED3', 'OtherIED3');
    expectUpdateAction(simpleActions[1], 'ConnectedAP', 'iedName', 'IED3', 'OtherIED3');
  });

  it('update name should be unique in document', async function () {
    await setWizardTextFieldValue(<WizardTextField>inputs[0], 'IED2');
    expect(inputs[0].checkValidity()).to.be.false;
  });

  it('update description should be updated in document', async function () {
    await setWizardTextFieldValue(<WizardTextField>inputs[1], 'Some description');

    const complexAction = updateIED(ied)(inputs, newWizard());
    expect(complexAction.length).to.equal(1);
    expect(complexAction[0]).to.not.satisfy(isSimple);

    const simpleActions = (<ComplexAction>complexAction[0]).actions;
    expect(simpleActions.length).to.equal(1);

    expectUpdateAction(simpleActions[0], 'IED', 'desc', null, 'Some description');
  });

  it('when no fields changed there will be no update action', async function () {
    expectWizardNoUpdateAction(updateIED(ied), inputs);
  });

  it('looks like the latest snapshot', async () => {
    await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
  });
});
