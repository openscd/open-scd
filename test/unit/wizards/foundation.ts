import {expect} from "@open-wc/testing";

import {isUpdate, Update, WizardActor, WizardInput} from "../../../src/foundation.js";
import {WizardTextField} from "../../../src/wizard-textfield.js";

const noOp = () => {
  return;
};
const newWizard = (done = noOp) => {
  const element = document.createElement('mwc-dialog');
  element.close = done;
  return element;
};

export async function setWizardTextFieldValue(field: WizardTextField, value: string | null): Promise<void> {
  if (field.nullSwitch && !field.nullSwitch.checked) {
    field.nullSwitch?.click();
  }
  field.maybeValue = value;
  await field.requestUpdate();
}

export function executeWizardUpdateAction(wizardActor: WizardActor, inputs: WizardInput[]): Update {
  const updateActions = wizardActor(inputs, newWizard());
  expect(updateActions.length).to.equal(1);
  expect(updateActions[0]).to.satisfy(isUpdate);
  return <Update>updateActions[0];
}

export function expectWizardNoUpdateAction(wizardActor: WizardActor, inputs: WizardInput[]): void {
  const updateActions = wizardActor(inputs, newWizard());
  expect(updateActions).to.be.empty;
}

export async function fetchDoc(docName: string): Promise<XMLDocument> {
  return await fetch(docName)
    .then(response => response.text())
    .then(str => new DOMParser().parseFromString(str, 'application/xml'));
}
