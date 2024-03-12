import { expect, fixture, html } from '@open-wc/testing';
import { spy } from 'sinon';
import '../../../src/addons/Wizards.js';
import { isCreate, isDelete, isSimple, } from '../../../src/foundation.js';
import { editConnectedApWizard } from '../../../src/wizards/connectedap.js';
describe('Wizards for SCL element ConnectedAP', () => {
    let doc;
    let element;
    let inputs;
    let input;
    let primaryAction;
    let actionEvent;
    beforeEach(async () => {
        element = await fixture(html `<oscd-wizards .host=${document}></oscd-wizards>`);
        actionEvent = spy();
        window.addEventListener('editor-action', actionEvent);
    });
    describe('include an edit wizard that', () => {
        beforeEach(async () => {
            doc = await fetch('/test/testfiles/valid2003.scd')
                .then(response => response.text())
                .then(str => new DOMParser().parseFromString(str, 'application/xml'));
            const wizard = editConnectedApWizard(doc.querySelector('ConnectedAP'));
            element.workflow.push(() => wizard);
            await element.requestUpdate();
            inputs = Array.from(element.wizardUI.inputs);
            primaryAction = (element.wizardUI.dialog?.querySelector('mwc-button[slot="primaryAction"]'));
        });
        it('does not edit any P element with unchanged wizard inputs', async () => {
            primaryAction.click();
            await element.requestUpdate();
            expect(actionEvent).to.not.have.been.called;
        });
        it('triggers a complex editor action to update P elements(s)', async () => {
            input = inputs.find(input => input.label === 'IP');
            input.value = '192.168.210.158';
            await input.requestUpdate();
            primaryAction.click();
            await element.requestUpdate();
            expect(actionEvent).to.be.calledOnce;
            expect(actionEvent.args[0][0].detail.action).to.not.satisfy(isSimple);
        });
        it('triggers a complex action as combination of delete and create with prior existing Address field', async () => {
            input = inputs.find(input => input.label === 'IP');
            input.value = '192.168.210.158';
            await input.requestUpdate();
            primaryAction.click();
            await element.requestUpdate();
            const complexAction = actionEvent.args[0][0].detail.action;
            expect(complexAction.actions).to.have.lengthOf(2);
            expect(complexAction.actions[0]).to.satisfy(isDelete);
            expect(complexAction.actions[1]).to.satisfy(isCreate);
        });
        it('triggers a complex action being a pure create with prior missing Address field', async () => {
            doc
                .querySelector('ConnectedAP')
                ?.removeChild(doc.querySelector('ConnectedAP > Address'));
            input = inputs.find(input => input.label === 'IP');
            input.value = '192.168.210.158';
            await input.requestUpdate();
            primaryAction.click();
            await element.requestUpdate();
            const complexAction = actionEvent.args[0][0].detail.action;
            expect(complexAction.actions).to.have.lengthOf(1);
            expect(complexAction.actions[0]).to.satisfy(isCreate);
        });
        it('properly updates a P element of type IP', async () => {
            input = inputs.find(input => input.label === 'IP');
            input.value = '192.168.210.158';
            await input.requestUpdate();
            primaryAction.click();
            await element.requestUpdate();
            const complexAction = actionEvent.args[0][0].detail.action;
            const oldAddress = (complexAction.actions[0].old.element);
            const newAddress = (complexAction.actions[1].new.element);
            expect(oldAddress.querySelector('P[type="IP"]')?.textContent).to.equal('192.168.210.111');
            expect(newAddress.querySelector('P[type="IP"]')?.textContent).to.equal('192.168.210.158');
        });
        it('adds type restrictions with selected option type restriction', async () => {
            (element.wizardUI.shadowRoot?.querySelector('#typeRestriction')).checked = true;
            await element.requestUpdate();
            primaryAction.click();
            await element.requestUpdate();
            const complexAction = actionEvent.args[0][0].detail.action;
            const oldAddress = (complexAction.actions[0].old.element);
            const newAddress = (complexAction.actions[1].new.element);
            const oldIP = oldAddress.querySelector('P[type="IP"]');
            const newIP = newAddress.querySelector('P[type="IP"]');
            expect(oldIP?.getAttributeNS('http://www.w3.org/2001/XMLSchema-instance', 'type')).to.not.exist;
            expect(newIP?.getAttributeNS('http://www.w3.org/2001/XMLSchema-instance', 'type')).to.exist;
        });
    });
});
//# sourceMappingURL=connectedap.test.js.map