import { expect } from '@open-wc/testing';

import {
  Create,
  Delete,
  isCreate,
  isDelete,
  isReplace,
  isUpdate,
  Replace,
  SimpleAction,
  Update,
  WizardActor,
  WizardInputElement,
} from '../../../src/foundation.js';
import { WizardTextField } from '../../../src/wizard-textfield.js';

const noOp = () => {
  return;
};
export const newWizard = (done = noOp) => {
  const element = document.createElement('mwc-dialog');
  element.close = done;
  return element;
};

export async function setWizardTextFieldValue(
  field: WizardTextField,
  value: string | null
): Promise<void> {
  if (field.nullSwitch && !field.nullSwitch.checked) {
    field.nullSwitch?.click();
  }
  field.maybeValue = value;
  await field.requestUpdate();
}

export function executeWizardReplaceAction(
  wizardActor: WizardActor,
  inputs: WizardInputElement[]
): Replace {
  const replaceActions = wizardActor(inputs, newWizard());
  expect(replaceActions.length).to.equal(1);
  expect(replaceActions[0]).to.satisfy(isReplace);
  return <Replace>replaceActions[0];
}

export function executeWizardCreateAction(
  wizardActor: WizardActor,
  inputs: WizardInputElement[]
): Create {
  const createActions = wizardActor(inputs, newWizard());
  expect(createActions.length).to.equal(1);
  expect(createActions[0]).to.satisfy(isCreate);
  return <Create>createActions[0];
}

export function expectWizardNoUpdateAction(
  wizardActor: WizardActor,
  inputs: WizardInputElement[]
): void {
  const updateActions = wizardActor(inputs, newWizard());
  expect(updateActions).to.be.empty;
}

export function expectReplaceAction(
  simpleAction: SimpleAction,
  tagName: string,
  attributeName: string,
  oldValue: string | null,
  newValue: string | null
): void {
  expect(simpleAction).to.satisfy(isReplace);

  expect((<Replace>simpleAction).old.element.tagName).to.be.equal(tagName);
  if (oldValue === null) {
    expect((<Replace>simpleAction).old.element).to.not.have.attribute(
      attributeName
    );
  } else {
    expect((<Replace>simpleAction).old.element).to.have.attribute(
      attributeName,
      oldValue
    );
  }

  expect((<Replace>simpleAction).new.element.tagName).to.be.equal(tagName);
  if (newValue === null) {
    expect((<Replace>simpleAction).new.element).to.not.have.attribute(
      attributeName
    );
  } else {
    expect((<Replace>simpleAction).new.element).to.have.attribute(
      attributeName,
      newValue
    );
  }
}

export function expectUpdateAction(
  simpleAction: SimpleAction,
  tagName: string,
  attributeName: string,
  oldValue: string | null,
  newValue: string | null
): void {
  expect(simpleAction).to.satisfy(isUpdate);

  expect((<Update>simpleAction).element.tagName).to.be.equal(tagName);
  const oldAttributes = (<Update>simpleAction).oldAttributes;
  if (oldValue === null) {
    expect(Object.keys(oldAttributes)).to.not.contain(attributeName);
  } else {
    expect(Object.keys(oldAttributes)).to.contain(attributeName);
    expect(Object.values(oldAttributes)).to.contain(oldValue);
  }

  const newAttributes = (<Update>simpleAction).newAttributes;
  if (newValue === null) {
    expect(Object.keys(newAttributes)).to.not.contain(attributeName);
  } else {
    expect(Object.keys(newAttributes)).to.contain(attributeName);
    expect(Object.values(newAttributes)).to.contain(newValue);
  }
}

export function expectUpdateTextValue(
  action: Replace,
  parentTagName: string,
  oldValue: string,
  newValue: string
): void {
  expect(action.old.element.parentElement!.tagName).to.be.equal(parentTagName);
  expect(action.old.element.textContent).to.be.equal(oldValue);
  expect(action.new.element.textContent).to.be.equal(newValue);
}

export async function fetchDoc(docName: string): Promise<XMLDocument> {
  return await fetch(docName)
    .then(response => response.text())
    .then(str => new DOMParser().parseFromString(str, 'application/xml'));
}

export function expectDeleteAction(
  simpleAction: SimpleAction,
  tagName: string,
): void {
  expect(simpleAction).to.satisfy(isDelete);

  const oldElement = (<Delete>simpleAction).old.element;
  expect((<Element>oldElement).tagName).to.be.equal(tagName);
}
