import { expect, fixture, html } from '@open-wc/testing';
import '../../../../../src/addons/Wizards.js';
import { isCreate, isSimple, } from '../../../../../src/foundation.js';
import { createAddressesAction, createAddressesWizard, } from '../../../../../src/editors/protocol104/wizards/createAddresses.js';
import { fetchDoc } from '../../../wizards/test-support.js';
describe('Wizards for preparing 104 Address Creation', () => {
    let doc;
    let lnElement;
    let doElement;
    let element;
    let inputs;
    beforeEach(async () => {
        doc = await fetchDoc('/test/testfiles/104/valid-empty-addresses.scd');
        element = await fixture(html `<oscd-wizards .host=${document}></oscd-wizards>`);
    });
    async function prepareWizard(queryLnSelector, doName) {
        lnElement = doc.querySelector(queryLnSelector);
        const lnType = lnElement.getAttribute('lnType');
        doElement = doc.querySelector(`LNodeType[id="${lnType}"] > DO[name="${doName}"]`);
        const wizard = createAddressesWizard(lnElement, doElement);
        element.workflow.push(() => wizard);
        await element.requestUpdate();
        inputs = Array.from(element.wizardUI.inputs);
    }
    function expectCreateActions(actions, expectedCreateActions) {
        // We always first expect a ComplexAction.
        expect(actions).to.have.length(1);
        expect(actions[0]).to.not.satisfy(isSimple);
        // Next check the number of Actions and if they are all Create Actions.
        const createActions = actions[0].actions;
        expect(createActions).to.have.length(expectedCreateActions);
        createActions.forEach(createAction => {
            expect(createAction).to.satisfy(isCreate);
        });
    }
    describe('show prepare 104 Address creation (single monitor TI only)', () => {
        beforeEach(async () => {
            await prepareWizard('IED[name="B1"] LN0[lnType="SE_LLN0_SET_V001"]', 'MltLev');
        });
        it('when processing the request, the expected Create Actions are returned', () => {
            const actions = createAddressesAction(lnElement, doElement, false)(inputs, element.wizardUI);
            expectCreateActions(actions, 1);
        });
        it('looks like the latest snapshot', async () => {
            await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
        });
    });
    describe('show prepare 104 Address creation (multi monitor TI only)', () => {
        const newTiValue = '39';
        beforeEach(async () => {
            await prepareWizard('IED[name="B1"] LN[lnType="SE_GAPC_SET_V001"]', 'Op');
        });
        it('when processing the request, the expected Create Actions are returned', async () => {
            inputs[3].value = newTiValue;
            const actions = createAddressesAction(lnElement, doElement, false)(inputs, element.wizardUI);
            expectCreateActions(actions, 1);
        });
        it('TI contains description', async () => {
            const tiDescription = element.wizardUI.dialog.querySelector(`wizard-select[label="monitorTi"] > mwc-list-item[value='${newTiValue}']`);
            expect(tiDescription.textContent?.trim()).to.equal(`${newTiValue} ([protocol104.values.signalNames.tiNumber${newTiValue}])`);
        });
        it('looks like the latest snapshot', async () => {
            await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
        });
    });
    describe('show prepare 104 Address creation with enc cdc value', () => {
        let monitorTi;
        let controlTi;
        beforeEach(async () => {
            await prepareWizard('IED[name="B1"] LN[lnType="SE_GGIO_SET_V002"]', 'Mod');
            const cdc = element.wizardUI.dialog.querySelector('wizard-textfield[label="Common Data Class"]');
            expect(cdc).to.exist;
            expect(cdc.maybeValue).to.equal('ENC');
            monitorTi = element.wizardUI.dialog.querySelector('wizard-select[label="monitorTi"]');
            controlTi = element.wizardUI.dialog.querySelector('wizard-select[label="controlTi"]');
            expect(monitorTi).to.exist;
            expect(controlTi).to.exist;
        });
        it('controlTi should change to correct value when selecting monitorTi', async () => {
            monitorTi.value = '30';
            await element.requestUpdate();
            expect(controlTi.maybeValue).to.equal('58');
            monitorTi.value = '35';
            await element.requestUpdate();
            expect(controlTi.maybeValue).to.equal('62');
        });
        it('monitorTi should change to correct value when selecting controlTi', async () => {
            controlTi.value = '58';
            await element.requestUpdate();
            expect(monitorTi.maybeValue).to.equal('30');
            controlTi.value = '62';
            await element.requestUpdate();
            expect(monitorTi.maybeValue).to.equal('35');
        });
    });
    describe('show prepare 104 Address creation with mapped cdc value', () => {
        beforeEach(async () => {
            await prepareWizard('IED[name="B1"] LN[lnType="SE_MMXU_SET_V001"]', 'PPV');
        });
        it('should have mappedCmv translation value in helper field', async () => {
            const cdc = element.wizardUI.dialog.querySelector('wizard-textfield[label="Common Data Class"]');
            expect(cdc).to.exist;
            await expect(cdc.helper).to.equal('[protocol104.mappedCmv]');
        });
    });
    describe('show prepare 104 Address creation (single monitor TI with CtlModel)', () => {
        beforeEach(async () => {
            await prepareWizard('IED[name="B1"] LN[lnType="SE_GGIO_SET_V002"]', 'SPCSO1');
        });
        it('when processing the request, the expected Create Actions are returned', () => {
            const actions = createAddressesAction(lnElement, doElement, false)(inputs, element.wizardUI);
            expectCreateActions(actions, 1);
        });
        it('looks like the latest snapshot', async () => {
            await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
        });
    });
    describe('show prepare 104 Address creation (single monitor TI and single control TI with CtlModel)', () => {
        const newMonitorTiValue = '30';
        const newControlTiValue = '58';
        beforeEach(async () => {
            await prepareWizard('IED[name="B1"] LN[lnType="SE_GGIO_SET_V002"]', 'SPCSO2');
        });
        it('when processing the request without Check Selected, the expected Create Actions are returned', () => {
            inputs[3].value = newMonitorTiValue;
            inputs[5].value = newControlTiValue;
            const actions = createAddressesAction(lnElement, doElement, true)(inputs, element.wizardUI);
            expectCreateActions(actions, 2);
        });
        it('TIs contain descriptions', async () => {
            const monitorTi = element.wizardUI.dialog.querySelector('wizard-textfield[label="monitorTi"]');
            expect(monitorTi).to.exist;
            const controlTi = element.wizardUI.dialog.querySelector(`wizard-textfield[label="controlTi"]`);
            expect(controlTi).to.exist;
            const monitorTiValue = monitorTi.value;
            const controlTiValue = controlTi.value;
            expect(monitorTiValue).to.equal(`${newMonitorTiValue} ([protocol104.values.signalNames.tiNumber${newMonitorTiValue}])`);
            expect(controlTiValue).to.equal(`${newControlTiValue} ([protocol104.values.signalNames.tiNumber${newControlTiValue}])`);
        });
        it('when processing the request with Check Selected, the expected Create Actions are returned', async () => {
            const switchElement = element.wizardUI.dialog.querySelector(`mwc-switch[id="controlCheck"]`);
            switchElement.selected = true;
            await element.requestUpdate();
            const actions = createAddressesAction(lnElement, doElement, true)(inputs, element.wizardUI);
            expectCreateActions(actions, 3);
        });
        it('looks like the latest snapshot', async () => {
            await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
        });
    });
});
//# sourceMappingURL=createAddresses.test.js.map