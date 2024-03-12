import { expect } from '@open-wc/testing';
import { isCreate, isDelete, isReplace, isUpdate, } from '../../../src/foundation.js';
export async function setWizardTextFieldValue(field, value) {
    if (field.nullSwitch && !field.nullSwitch.selected) {
        field.nullSwitch?.click();
    }
    field.maybeValue = value;
    await field.requestUpdate();
}
export async function setWizardSelectValue(field, value) {
    if (field.nullSwitch && !field.nullSwitch.selected) {
        field.nullSwitch?.click();
    }
    field.maybeValue = value;
    await field.requestUpdate();
}
export function executeWizardReplaceAction(wizardActor, wizard, inputs) {
    const replaceActions = wizardActor(inputs, wizard);
    expect(replaceActions.length).to.equal(1);
    expect(replaceActions[0]).to.satisfy(isReplace);
    return replaceActions[0];
}
export function executeWizardCreateAction(wizardActor, wizard, inputs) {
    const createActions = wizardActor(inputs, wizard);
    expect(createActions.length).to.equal(1);
    expect(createActions[0]).to.satisfy(isCreate);
    return createActions[0];
}
export function expectWizardNoUpdateAction(wizardActor, wizard, inputs) {
    const updateActions = wizardActor(inputs, wizard);
    expect(updateActions).to.be.empty;
}
export function expectReplaceAction(simpleAction, tagName, attributeName, oldValue, newValue) {
    expect(simpleAction).to.satisfy(isReplace);
    expect(simpleAction.old.element.tagName).to.be.equal(tagName);
    if (oldValue === null) {
        expect(simpleAction.old.element).to.not.have.attribute(attributeName);
    }
    else {
        expect(simpleAction.old.element).to.have.attribute(attributeName, oldValue);
    }
    expect(simpleAction.new.element.tagName).to.be.equal(tagName);
    if (newValue === null) {
        expect(simpleAction.new.element).to.not.have.attribute(attributeName);
    }
    else {
        expect(simpleAction.new.element).to.have.attribute(attributeName, newValue);
    }
}
export function expectUpdateAction(simpleAction, tagName, attributeName, oldValue, newValue) {
    expect(simpleAction).to.satisfy(isUpdate);
    expect(simpleAction.element.tagName).to.be.equal(tagName);
    const oldAttributes = simpleAction.oldAttributes;
    if (oldValue === null) {
        expect(Object.keys(oldAttributes)).to.not.contain(attributeName);
    }
    else {
        expect(Object.keys(oldAttributes)).to.contain(attributeName);
        expect(Object.values(oldAttributes)).to.contain(oldValue);
    }
    const newAttributes = simpleAction.newAttributes;
    if (newValue === null) {
        expect(Object.keys(newAttributes)).to.not.contain(attributeName);
    }
    else {
        expect(Object.keys(newAttributes)).to.contain(attributeName);
        expect(Object.values(newAttributes)).to.contain(newValue);
    }
}
export function expectUpdateTextValue(action, parentTagName, oldValue, newValue) {
    expect(action.old.element.parentElement.tagName).to.be.equal(parentTagName);
    expect(action.old.element.textContent).to.be.equal(oldValue);
    expect(action.new.element.textContent).to.be.equal(newValue);
}
export async function fetchDoc(docName) {
    return await fetch(docName)
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
}
export function expectDeleteAction(simpleAction, tagName) {
    expect(simpleAction).to.satisfy(isDelete);
    const oldElement = simpleAction.old.element;
    expect(oldElement.tagName).to.be.equal(tagName);
}
//# sourceMappingURL=test-support.js.map