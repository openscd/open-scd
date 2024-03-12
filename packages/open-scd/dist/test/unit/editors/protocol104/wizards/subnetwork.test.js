import { expect, fixture, html } from '@open-wc/testing';
import { spy } from 'sinon';
import '../../../../../src/addons/Wizards.js';
import { isCreate, patterns, } from '../../../../../src/foundation.js';
import { createSubNetworkWizard } from '../../../../../src/editors/protocol104/wizards/subnetwork.js';
describe('SubNetwork 104 wizard', () => {
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
    describe('include an create wizard that', () => {
        beforeEach(async () => {
            doc = await fetch('/test/testfiles/104/valid-subnetwork.scd')
                .then(response => response.text())
                .then(str => new DOMParser().parseFromString(str, 'application/xml'));
            const wizard = createSubNetworkWizard(doc.querySelector('Communication'));
            element.workflow.push(() => wizard);
            await element.requestUpdate();
            inputs = Array.from(element.wizardUI.inputs);
            primaryAction = (element.wizardUI.dialog?.querySelector('mwc-button[slot="primaryAction"]'));
        });
        it('looks like the latest snapshot', async () => {
            await expect(element.wizardUI.dialog).dom.to.equalSnapshot({
                ignoreAttributes: [
                    {
                        tags: ['wizard-textfield'],
                        attributes: ['pattern'],
                    },
                ],
            });
        });
        //work around, because the escapes get removed in snapshot
        it('should have correct pattern', async () => {
            expect(element.wizardUI.dialog.querySelectorAll('wizard-textfield[pattern]')
                .length).to.equal(2);
            expect(element.wizardUI
                .dialog.querySelectorAll('wizard-textfield[pattern]')[0]
                .getAttribute('pattern')).to.equal(patterns.normalizedString);
            expect(element.wizardUI
                .dialog.querySelectorAll('wizard-textfield[pattern]')[1]
                .getAttribute('pattern')).to.equal(patterns.decimal);
        });
        it('does not allow creating SubNetwork with empty name attribute', async () => {
            input = inputs.find(input => input.label === 'name');
            input.value = '';
            await input.requestUpdate();
            primaryAction.click();
            await element.requestUpdate();
            expect(actionEvent).to.not.be.called;
        });
        it('triggers an editor action to create SubNetwork element including BitRate', async () => {
            input = inputs.find(input => input.label === 'name');
            input.value = 'myNewSubNetworkName';
            await input.requestUpdate();
            primaryAction.click();
            await element.requestUpdate();
            expect(actionEvent).to.be.calledOnce;
            expect(actionEvent.args[0][0].detail.action).to.satisfy(isCreate);
            const updateAction = actionEvent.args[0][0].detail.action;
            expect(updateAction.new.element).to.have.a.attribute('name', 'myNewSubNetworkName');
            expect(updateAction.new.element).to.have.a.attribute('desc', '');
            expect(updateAction.new.element).to.have.a.attribute('type', '104');
            expect(updateAction.new.element.querySelector('BitRate')).to
                .exist;
            expect(updateAction.new.element.querySelector('BitRate')).to.have.attribute('multiplier', 'M');
            expect(updateAction.new.element
                .querySelector('BitRate')
                ?.textContent?.trim()).to.equal('100');
        });
        it('triggers an editor action to create SubNetwork element excluding non required /BitRate', async () => {
            const name = (inputs.find(input => input.label === 'name'));
            const desc = (inputs.find(input => input.label === 'desc'));
            const type = (inputs.find(input => input.label === 'type'));
            const bitrate = (inputs.find(input => input.label === 'BitRate'));
            await element.requestUpdate();
            desc.nullSwitch?.click();
            type.nullSwitch?.click();
            bitrate.nullSwitch?.click();
            name.value = 'myNewSubNetworkName';
            await name.requestUpdate();
            primaryAction.click();
            await element.requestUpdate();
            expect(actionEvent).to.be.calledOnce;
            expect(actionEvent.args[0][0].detail.action).to.satisfy(isCreate);
            const updateAction = actionEvent.args[0][0].detail.action;
            expect(updateAction.new.element).to.have.a.attribute('name', 'myNewSubNetworkName');
            expect(updateAction.new.element).to.not.have.a.attribute('desc');
            expect(updateAction.new.element).to.not.have.a.attribute('type');
            expect(updateAction.new.element.querySelector('BitRate')).to
                .not.exist;
        });
    });
});
//# sourceMappingURL=subnetwork.test.js.map