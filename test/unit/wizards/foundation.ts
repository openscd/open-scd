import {expect} from "@open-wc/testing";

import {isUpdate, SimpleAction, Update, WizardActor, WizardInput} from "../../../src/foundation.js";
import {WizardTextField} from "../../../src/wizard-textfield.js";

const noOp = () => {
  return;
};
export const newWizard = (done = noOp) => {
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

export function expectUpdateAction(simpleAction: SimpleAction, tagName: string, attributeName: string,
                                   oldValue: string | null, newValue: string | null) {
  expect(simpleAction).to.satisfy(isUpdate);

  expect((<Update>simpleAction).old.element.tagName).to.be.equal(tagName);
  if (oldValue === null) {
    expect((<Update>simpleAction).old.element).to.not.have.attribute(attributeName);
  } else {
    expect((<Update>simpleAction).old.element).to.have.attribute(attributeName, oldValue);
  }

  expect((<Update>simpleAction).new.element.tagName).to.be.equal(tagName);
  if (newValue === null) {
    expect((<Update>simpleAction).new.element).to.not.have.attribute(attributeName);
  } else {
    expect((<Update>simpleAction).new.element).to.have.attribute(attributeName, newValue);
  }
}

export function expectUpdateTextValue(action: Update, parentTagName: string, oldValue: string, newValue: string): void {
  expect(action.old.element.parentElement!.tagName).to.be.equal(parentTagName);
  expect(action.old.element.textContent).to.be.equal(oldValue);
  expect(action.new.element.textContent).to.be.equal(newValue);
}

export async function fetchDoc(docName: string): Promise<XMLDocument> {
  return await fetch(docName)
    .then(response => response.text())
    .then(str => new DOMParser().parseFromString(str, 'application/xml'));
}
