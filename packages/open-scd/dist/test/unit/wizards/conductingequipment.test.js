import { expect, fixture, html } from '@open-wc/testing';
import { spy } from 'sinon';
import '../../../src/addons/Wizards.js';
import { isCreate, } from '../../../src/foundation.js';
import { fetchDoc } from './test-support.js';
import { createConductingEquipmentWizard } from '../../../src/wizards/conductingequipment.js';
describe('Wizards for SCL element ConductingEquipment', () => {
    let doc;
    let element;
    let inputs;
    let primaryAction;
    let actionEvent;
    describe('defines a create wizard that', () => {
        let parent;
        beforeEach(async () => {
            doc = await fetchDoc('/test/testfiles/valid2007B.scd');
            actionEvent = spy();
            window.addEventListener('editor-action', actionEvent);
        });
        describe('when adding an earth switch', () => {
            describe('with existing ground cNode in the same VoltageLevel', () => {
                beforeEach(async () => {
                    parent = doc.querySelector('Bay');
                    element = await fixture(html `<oscd-wizards .host=${document}></mock-wizards>`);
                    const wizard = createConductingEquipmentWizard(parent);
                    element.workflow.push(() => wizard);
                    await element.requestUpdate();
                    inputs = Array.from(element.wizardUI.inputs);
                    primaryAction = (element.wizardUI.dialog?.querySelector('mwc-button[slot="primaryAction"]'));
                });
                it('does not create a new ConnectivityNode', async () => {
                    inputs[0].value = 'ERS';
                    inputs[1].value = 'QC9';
                    await element.requestUpdate();
                    await primaryAction.click();
                    expect(actionEvent).to.be.calledOnce;
                });
                it('does set the Terminals attributes correctly', async () => {
                    inputs[0].value = 'ERS';
                    inputs[1].value = 'QC9';
                    await element.requestUpdate();
                    await primaryAction.click();
                    const action = actionEvent.args[0][0].detail.action;
                    const terminal = action.new.element.querySelector('Terminal');
                    expect(terminal).to.have.attribute('substationName', 'AA1');
                    expect(terminal).to.have.attribute('voltageLevelName', 'E1');
                    expect(terminal).to.have.attribute('bayName', 'COUPLING_BAY');
                    expect(terminal).to.have.attribute('connectivityNode', 'AA1/E1/COUPLING_BAY/grounded');
                });
            });
            describe('with missing ground cNode in the same VoltageLevel', () => {
                beforeEach(async () => {
                    parent = doc.querySelector('VoltageLevel[name="J1"] > Bay');
                    element = await fixture(html `<oscd-wizards .host=${document}></oscd-wizards>`);
                    const wizard = createConductingEquipmentWizard(parent);
                    element.workflow.push(() => wizard);
                    await element.requestUpdate();
                    inputs = Array.from(element.wizardUI.inputs);
                    primaryAction = (element.wizardUI.dialog?.querySelector('mwc-button[slot="primaryAction"]'));
                });
                it('does create a new ConnectivityNode', async () => {
                    inputs[0].value = 'ERS';
                    inputs[1].value = 'QC9';
                    await element.requestUpdate();
                    await primaryAction.click();
                    expect(actionEvent).to.be.calledTwice;
                    expect(actionEvent.args[0][0].detail.action).to.satisfy(isCreate);
                    const action = actionEvent.args[1][0].detail.action;
                    expect(action.new.element.tagName).to.equal('ConnectivityNode');
                });
                it('does set the pathName of ConnectivityNode correctly', async () => {
                    inputs[0].value = 'ERS';
                    inputs[1].value = 'QC9';
                    await element.requestUpdate();
                    await primaryAction.click();
                    const action = actionEvent.args[1][0].detail.action;
                    expect(action.new.element).to.have.attribute('pathName', 'AA1/J1/Bay1/grounded');
                    expect(action.new.element).to.have.attribute('name', 'grounded');
                });
                it('does set the Terminals attributes correctly', async () => {
                    inputs[0].value = 'ERS';
                    inputs[1].value = 'QC9';
                    await element.requestUpdate();
                    await primaryAction.click();
                    const action = actionEvent.args[0][0].detail.action;
                    const terminal = action.new.element.querySelector('Terminal');
                    expect(terminal).to.have.attribute('substationName', 'AA1');
                    expect(terminal).to.have.attribute('voltageLevelName', 'J1');
                    expect(terminal).to.have.attribute('bayName', 'Bay1');
                    expect(terminal).to.have.attribute('connectivityNode', 'AA1/J1/Bay1/grounded');
                });
            });
        });
    });
});
//# sourceMappingURL=conductingequipment.test.js.map