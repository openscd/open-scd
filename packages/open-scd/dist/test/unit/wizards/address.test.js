import { expect, fixture, html } from '@open-wc/testing';
import '../../../src/addons/Wizards.js';
import { WizardTextField } from '../../../src/wizard-textfield.js';
import { getValue, isCreate, isDelete, } from '../../../src/foundation.js';
import { contentGseOrSmvWizard, updateAddress, } from '../../../src/wizards/address.js';
function addressContent(inputs) {
    const addressContent = {};
    addressContent['MAC-Address'] = getValue(inputs.find(i => i.label === 'MAC-Address'));
    addressContent['APPID'] = getValue(inputs.find(i => i.label === 'APPID'));
    addressContent['VLAN-ID'] = getValue(inputs.find(i => i.label === 'VLAN-ID'));
    addressContent['VLAN-PRIORITY'] = getValue(inputs.find(i => i.label === 'VLAN-PRIORITY'));
    return addressContent;
}
describe('address', () => {
    let doc;
    let element;
    beforeEach(async () => {
        element = await fixture(html `<oscd-wizards .host=${document}></oscd-wizards>`);
        doc = await fetch('/test/testfiles/wizards/gsecontrol.scd')
            .then(response => response.text())
            .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    });
    describe('renderGseSmvAddress', () => {
        beforeEach(async () => {
            const gse = doc.querySelector('GSE[ldInst="CircuitBreaker_CB1"][cbName="GCB"]');
            const hasInstType = Array.from(gse.querySelectorAll('Address > P')).some(pType => pType.getAttribute('xsi:type'));
            const attributes = {};
            ['MAC-Address', 'APPID', 'VLAN-ID', 'VLAN-PRIORITY'].forEach(key => {
                if (!attributes[key])
                    attributes[key] =
                        gse.querySelector(`Address > P[type="${key}"]`)?.innerHTML.trim() ??
                            null;
            });
            const wizard = [
                {
                    title: 'title',
                    content: contentGseOrSmvWizard({ hasInstType, attributes }),
                },
            ];
            element.workflow.push(() => wizard);
            await element.requestUpdate();
        });
        it('looks like the latest snapshot', async () => {
            await expect(element.wizardUI.dialog).to.equalSnapshot();
        }).timeout(5000);
    });
    describe('updateAddress', () => {
        let gse;
        let inputs;
        let wizard;
        describe('with exiting address element', () => {
            beforeEach(async () => {
                gse = doc.querySelector('GSE[ldInst="CircuitBreaker_CB1"][cbName="GCB"]');
                const hasInstType = Array.from(gse.querySelectorAll('Address > P')).some(pType => pType.getAttribute('xsi:type'));
                const attributes = {};
                ['MAC-Address', 'APPID', 'VLAN-ID', 'VLAN-PRIORITY'].forEach(key => {
                    if (!attributes[key])
                        attributes[key] =
                            gse
                                .querySelector(`Address > P[type="${key}"]`)
                                ?.innerHTML.trim() ?? null;
                });
                wizard = [
                    {
                        title: 'asdas',
                        content: contentGseOrSmvWizard({ hasInstType, attributes }),
                    },
                ];
                element.workflow.push(() => wizard);
                await element.requestUpdate();
                inputs = Array.from(element.wizardUI.inputs);
                await element.requestUpdate();
            });
            it('does not update a Address element when no attribute has changed', () => {
                const actions = updateAddress(gse, addressContent(inputs), false);
                expect(actions).to.be.empty;
            });
            it('update a Address element when VLAN ID gets created', async () => {
                const input = inputs[2];
                const type = input.label;
                const newValue = 'newValue';
                input.maybeValue = newValue;
                await input.requestUpdate();
                const actions = updateAddress(gse, addressContent(inputs), false);
                expect(actions.length).to.equal(2);
                expect(actions[0]).to.satisfy(isDelete);
                expect(actions[1]).to.satisfy(isCreate);
                const oldElement = actions[0].old.element;
                const newElement = actions[1].new.element;
                expect(oldElement.querySelector(`P[type="${type}"]`)?.textContent?.trim()).to.be.undefined;
                expect(newElement.querySelector(`P[type="${type}"]`)?.textContent?.trim()).to.equal(newValue);
                expect(newElement.querySelector(`P[type="${type}"]`)).to.not.have.attribute('xsi:type', `tP_${type}`);
            });
            it('update a Address element when at least one attribute changes', async () => {
                for (const rawInput of inputs) {
                    const input = rawInput instanceof WizardTextField
                        ? rawInput
                        : rawInput;
                    const type = input.label;
                    const newValue = 'newValue';
                    const oldValue = input.value || undefined;
                    input.maybeValue = newValue;
                    await input.requestUpdate();
                    const actions = updateAddress(gse, addressContent(inputs), false);
                    expect(actions.length).to.equal(2);
                    expect(actions[0]).to.satisfy(isDelete);
                    expect(actions[1]).to.satisfy(isCreate);
                    const oldElement = actions[0].old.element;
                    const newElement = actions[1].new.element;
                    expect(oldElement.querySelector(`P[type="${type}"]`)?.textContent?.trim()).to.equal(oldValue);
                    expect(newElement.querySelector(`P[type="${type}"]`)?.textContent?.trim()).to.equal(newValue);
                    expect(newElement.querySelector(`P[type="${type}"]`)).to.not.have.attribute('xsi:type', `tP_${type}`);
                }
            });
            it('update a Address element when status of instType has changed', async () => {
                for (const rawInput of inputs) {
                    const input = rawInput instanceof WizardTextField
                        ? rawInput
                        : rawInput;
                    const type = input.label;
                    const newValue = input.value;
                    const oldValue = input.value || undefined;
                    input.maybeValue = newValue;
                    await input.requestUpdate();
                    const actions = updateAddress(gse, addressContent(inputs), true);
                    expect(actions.length).to.equal(2);
                    expect(actions[0]).to.satisfy(isDelete);
                    expect(actions[1]).to.satisfy(isCreate);
                    const oldElement = actions[0].old.element;
                    const newElement = actions[1].new.element;
                    expect(oldElement.querySelector(`P[type="${type}"]`)?.textContent?.trim()).to.equal(oldValue);
                    expect(newElement.querySelector(`P[type="${type}"]`)?.textContent?.trim()).to.equal(newValue);
                    expect(newElement.querySelector(`P[type="${type}"]`)).to.have.attribute('xsi:type', `tP_${type}`);
                }
            });
        });
        describe('with missing address element', () => {
            beforeEach(async () => {
                gse = doc.querySelector('GSE[ldInst="CircuitBreaker_CB1"][cbName="GCB2"]');
                const hasInstType = Array.from(gse.querySelectorAll('Address > P')).some(pType => pType.getAttribute('xsi:type'));
                const attributes = {};
                ['MAC-Address', 'APPID', 'VLAN-ID', 'VLAN-PRIORITY'].forEach(key => {
                    if (!attributes[key])
                        attributes[key] =
                            gse
                                .querySelector(`Address > P[type="${key}"]`)
                                ?.innerHTML.trim() ?? null;
                });
                wizard = [
                    {
                        title: 'asdas',
                        content: contentGseOrSmvWizard({ hasInstType, attributes }),
                    },
                ];
                element.workflow.push(() => wizard);
                await element.requestUpdate();
                inputs = Array.from(element.wizardUI.inputs);
                await element.requestUpdate();
            });
            it('creates a Address element when at least one attribute changes', async () => {
                for (const rawInput of inputs) {
                    const input = rawInput instanceof WizardTextField
                        ? rawInput
                        : rawInput;
                    if (input.maybeValue === null) {
                        input.nullSwitch?.click();
                        await input.requestUpdate();
                    }
                    const type = input.label;
                    const newValue = 'newValue';
                    input.value = newValue;
                    await input.requestUpdate();
                    const actions = updateAddress(gse, addressContent(inputs), false);
                    expect(actions.length).to.equal(1);
                    expect(actions[0]).to.satisfy(isCreate);
                    const newElement = actions[0].new.element;
                    expect(newElement.querySelector(`P[type="${type}"]`)?.textContent?.trim()).to.equal(newValue);
                    expect(newElement.querySelector(`P[type="${type}"]`)).to.not.have.attribute('xsi:type', `tP_${type}`);
                }
            });
            it('update a Address element when status of instType has changed', async () => {
                for (const rawInput of inputs) {
                    const input = rawInput instanceof WizardTextField
                        ? rawInput
                        : rawInput;
                    if (input.maybeValue === null) {
                        input.nullSwitch?.click();
                        await input.requestUpdate();
                    }
                    const type = input.label;
                    const newValue = input.value;
                    input.value = newValue;
                    await input.requestUpdate();
                    const actions = updateAddress(gse, addressContent(inputs), true);
                    expect(actions.length).to.equal(1);
                    expect(actions[0]).to.satisfy(isCreate);
                    const newElement = actions[0].new.element;
                    expect(newElement.querySelector(`P[type="${type}"]`)?.textContent?.trim()).to.equal(newValue);
                    expect(newElement.querySelector(`P[type="${type}"]`)).to.have.attribute('xsi:type', `tP_${type}`);
                }
            });
        });
    });
});
//# sourceMappingURL=address.test.js.map