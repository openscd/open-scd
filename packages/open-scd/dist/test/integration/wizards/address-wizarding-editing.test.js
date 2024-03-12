import { expect, fixture, html } from '@open-wc/testing';
import '../../mock-wizard-editor.js';
import { editGseWizard } from '../../../src/wizards/gse.js';
import { newWizardEvent } from '../../../src/foundation.js';
describe('address wizarding editing integration', () => {
    let doc;
    let element;
    beforeEach(async () => {
        element = await fixture(html `<mock-wizard-editor></mock-wizard-editor>`);
        doc = await fetch('/test/testfiles/wizards/gsecontrol.scd')
            .then(response => response.text())
            .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    });
    describe('editGseWizard', () => {
        let primaryAction;
        let vlanPriorityField;
        let vlanIdField;
        beforeEach(async () => {
            const wizard = editGseWizard(doc.querySelector('GSE[ldInst="CircuitBreaker_CB1"][cbName="GCB"]'));
            element.dispatchEvent(newWizardEvent(() => wizard));
            await element.requestUpdate();
            primaryAction = (element.wizardUI.dialog?.querySelector('mwc-button[slot="primaryAction"]'));
            vlanIdField = element.wizardUI.dialog.querySelector('wizard-textfield[label="VLAN-ID"]');
            vlanPriorityField = element.wizardUI.dialog.querySelector('wizard-textfield[label="VLAN-PRIORITY"]');
            await vlanPriorityField.updateComplete;
        });
        it('VLAN-ID gets saved after nullswitch toggle', async () => {
            expect(doc
                .querySelector('GSE[ldInst="CircuitBreaker_CB1"][cbName="GCB"] > Address > P[type="VLAN-ID"]')
                ?.textContent?.trim()).to.be.undefined;
            expect(vlanIdField.nullSwitch?.selected).to.be.false;
            vlanIdField.nullSwitch?.click();
            vlanIdField.value = '007';
            primaryAction.click();
            await element.updateComplete;
            expect(vlanIdField.nullSwitch?.selected).to.be.true;
            expect(doc
                .querySelector('GSE[ldInst="CircuitBreaker_CB1"][cbName="GCB"] > Address > P[type="VLAN-ID"]')
                ?.textContent?.trim()).to.equal('007');
        });
    });
});
//# sourceMappingURL=address-wizarding-editing.test.js.map