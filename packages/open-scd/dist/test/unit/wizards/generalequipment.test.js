import { expect, fixture, html } from '@open-wc/testing';
import { spy } from 'sinon';
import '../../../src/addons/Wizards.js';
import { isCreate, isReplace, } from '../../../src/foundation.js';
import { createGeneralEquipmentWizard, editGeneralEquipmentWizard, } from '../../../src/wizards/generalEquipment.js';
describe('Wizards for SCL GeneralEquipment element', () => {
    let doc;
    let element;
    let inputs;
    let primaryAction;
    let actionEvent;
    beforeEach(async () => {
        element = await fixture(html `<oscd-wizards .host=${document}></oscd-wizards>`);
        doc = await fetch('/test/testfiles/editors/substation/generalequipment.scd')
            .then(response => response.text())
            .then(str => new DOMParser().parseFromString(str, 'application/xml'));
        actionEvent = spy();
        window.addEventListener('editor-action', actionEvent);
    });
    describe('define an create wizard that', () => {
        beforeEach(async () => {
            const wizard = createGeneralEquipmentWizard(doc.querySelector('Substation'));
            element.workflow.push(() => wizard);
            await element.requestUpdate();
            inputs = Array.from(element.wizardUI.inputs);
            primaryAction = (element.wizardUI.dialog?.querySelector('mwc-button[slot="primaryAction"]'));
            await element.wizardUI.requestUpdate(); // make sure wizard is rendered
        });
        it('looks like the the latest snapshot', async () => await expect(element.wizardUI.dialog).dom.to.equalSnapshot());
        it('does not accept empty name attribute', async () => {
            await primaryAction.click();
            expect(actionEvent).to.not.have.been.called;
        });
        it('allows to create required attributes name and type', async () => {
            inputs[0].value = 'someNonEmptyName';
            inputs[2].value = 'AXN';
            await element.requestUpdate();
            await primaryAction.click();
            expect(actionEvent).to.be.calledOnce;
            const action = actionEvent.args[0][0].detail.action;
            expect(action).to.satisfy(isCreate);
            const createAction = action;
            expect(createAction.new.element).to.have.attribute('name', 'someNonEmptyName');
            expect(createAction.new.element).to.have.attribute('type', 'AXN');
            expect(createAction.new.element).to.not.have.attribute('desc');
        });
        it('does not accept invalid type attribute', async () => {
            inputs[0].value = 'someNonEmptyName';
            inputs[2].value = 'notValidAXN';
            await element.requestUpdate();
            await primaryAction.click();
            expect(actionEvent).to.not.have.been.called;
        });
        it('allows to create non required attributes desc', async () => {
            inputs[0].value = 'someNonEmptyName';
            inputs[2].value = 'AXN';
            inputs[1].nullSwitch?.click();
            inputs[1].value = 'SomeDesc';
            await element.requestUpdate();
            await primaryAction.click();
            expect(actionEvent).to.be.calledOnce;
            const action = actionEvent.args[0][0].detail.action;
            expect(action).to.satisfy(isCreate);
            const createAction = action;
            expect(createAction.new.element).to.have.attribute('name', 'someNonEmptyName');
            expect(createAction.new.element).to.have.attribute('desc', 'SomeDesc');
            expect(createAction.new.element).to.have.attribute('type', 'AXN');
        });
        it('allows to create non required attributes virtual', async () => {
            inputs[0].value = 'someNonEmptyName';
            inputs[2].value = 'AXN';
            inputs[1].nullSwitch?.click();
            inputs[1].value = 'SomeDesc';
            const virtualCheckbox = (element.wizardUI.dialog?.querySelector('wizard-checkbox[label="virtual"]'));
            virtualCheckbox.nullSwitch.click();
            virtualCheckbox.maybeValue = 'true';
            await element.requestUpdate();
            await primaryAction.click();
            expect(actionEvent).to.be.calledOnce;
            const action = actionEvent.args[0][0].detail.action;
            expect(action).to.satisfy(isCreate);
            const createAction = action;
            expect(createAction.new.element).to.have.attribute('name', 'someNonEmptyName');
            expect(createAction.new.element).to.have.attribute('desc', 'SomeDesc');
            expect(createAction.new.element).to.have.attribute('type', 'AXN');
            expect(createAction.new.element).to.have.attribute('virtual', 'true');
        });
    });
    describe('define an edit wizard that', () => {
        beforeEach(async () => {
            const wizard = editGeneralEquipmentWizard(doc.querySelector('GeneralEquipment'));
            element.workflow.push(() => wizard);
            await element.requestUpdate();
            inputs = Array.from(element.wizardUI.inputs);
            primaryAction = (element.wizardUI.dialog?.querySelector('mwc-button[slot="primaryAction"]'));
            await element.wizardUI.requestUpdate(); // make sure wizard is rendered
        });
        it('looks like the the latest snapshot', async () => await expect(element.wizardUI.dialog).dom.to.equalSnapshot());
        it('does not accept empty name attribute', async () => {
            inputs[0].value = '';
            await element.requestUpdate();
            await primaryAction.click();
            expect(actionEvent).to.not.have.been.called;
        });
        it('triggers simple edit action on primary action click', async () => {
            inputs[0].value = 'someNonEmptyName';
            await element.requestUpdate();
            await primaryAction.click();
            expect(actionEvent).to.be.calledOnce;
            const action = actionEvent.args[0][0].detail.action;
            expect(action).to.satisfy(isReplace);
            const editAction = action;
            expect(editAction.new.element).to.have.attribute('name', 'someNonEmptyName');
        });
        it('allows to create non required attribute virtual', async () => {
            const virtualCheckbox = (element.wizardUI.dialog?.querySelector('wizard-checkbox[label="virtual"]'));
            virtualCheckbox.nullSwitch.click();
            virtualCheckbox.maybeValue = 'true';
            await element.requestUpdate();
            await primaryAction.click();
            expect(actionEvent).to.be.calledOnce;
            const action = actionEvent.args[0][0].detail.action;
            expect(action).to.satisfy(isReplace);
            const editAction = action;
            expect(editAction.new.element).to.have.attribute('virtual', 'true');
        });
        it('does not accept empty type attribute', async () => {
            inputs[2].value = '';
            await element.requestUpdate();
            await primaryAction.click();
            expect(actionEvent).to.not.have.been.called;
        });
        it('does not accept invalid type attribute', async () => {
            inputs[2].value = 'notAXN';
            await element.requestUpdate();
            await primaryAction.click();
            expect(actionEvent).to.not.have.been.called;
        });
        it('allows to create type attribute', async () => {
            inputs[2].value = 'BAT';
            await element.requestUpdate();
            await primaryAction.click();
            expect(actionEvent).to.be.calledOnce;
            const action = actionEvent.args[0][0].detail.action;
            expect(action).to.satisfy(isReplace);
            const editAction = action;
            expect(editAction.new.element).to.have.attribute('type', 'BAT');
        });
        it('allows to create non required attribute desc', async () => {
            inputs[1].value = 'someNonEmptyDesc';
            await element.requestUpdate();
            await primaryAction.click();
            expect(actionEvent).to.be.calledOnce;
            const action = actionEvent.args[0][0].detail.action;
            expect(action).to.satisfy(isReplace);
            const editAction = action;
            expect(editAction.new.element).to.have.attribute('desc', 'someNonEmptyDesc');
        });
    });
});
//# sourceMappingURL=generalequipment.test.js.map