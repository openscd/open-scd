import { fixture, html, expect } from '@open-wc/testing';
import { spy } from 'sinon';
import '../../../../src/editors/substation/bay-editor.js';
import '../../../../src/editors/substation/substation-editor.js';
import '../../../../src/editors/substation/voltage-level-editor.js';
async function loadAndClone(cloneEntity, file) {
    const doc = await fetch('/test/testfiles/zeroline/clone/' + file)
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    cloneEntity.doc = doc;
    cloneEntity.element = doc.querySelector(cloneEntity.element.tagName);
    await cloneEntity.updateComplete;
    cloneEntity.shadowRoot.querySelector('mwc-icon-button[icon="content_copy"]').click();
    await cloneEntity.updateComplete;
}
async function setUpAndTriggerRedirectUI(redirectUI, name, redirects) {
    if (!redirectUI)
        return;
    redirectUI.querySelector('wizard-textfield').value = name;
    if (redirects) {
        Object.entries(redirects).forEach(([oldIed, newIed]) => {
            const select = (redirectUI.querySelector(`mwc-select[label="${oldIed}"]`));
            if (select)
                select.value = newIed;
        });
    }
    redirectUI
        .querySelector('mwc-button[icon="content_copy"]')
        ?.click();
    await redirectUI.updateComplete;
}
describe('Clone Redirection UI', () => {
    describe('triggered by bay-editor', () => {
        let element;
        let actionEvent;
        beforeEach(async () => {
            const bay = new DOMParser().parseFromString('<Bay name="someName" />', 'application/xml').documentElement;
            element = (await fixture(html `<bay-editor .element=${bay}></bay-editor>`));
            actionEvent = spy();
            window.addEventListener('editor-action', actionEvent);
        });
        it('looks like the latest snapshot', async () => {
            await loadAndClone(element, 'validRedirect.scd');
            expect(element.dialog).to.exist;
            expect(actionEvent).to.not.have.been.called;
            await expect(element.dialog).to.equalSnapshot();
        });
        it('checks for name uniqueness ', async () => {
            await loadAndClone(element, 'validRedirect.scd');
            await setUpAndTriggerRedirectUI(element.dialog, 'Q01');
            expect(actionEvent).to.not.have.been.called;
        });
        it('only redirect selected IEDs', async () => {
            await loadAndClone(element, 'validRedirect.scd');
            await setUpAndTriggerRedirectUI(element.dialog, 'Q02', {
                IED1: 'IED3',
                IED2: 'No',
            });
            const cloneEntity = actionEvent.args[0][0].detail.action.new.element;
            expect(cloneEntity.querySelectorAll('LNode').length).to.equal(2);
            expect(cloneEntity.querySelectorAll('LNode:not([iedName="IED3"])').length).to.equal(0);
        });
        it('checks reference validity before redirect', async () => {
            await loadAndClone(element, 'validRedirect.scd');
            await setUpAndTriggerRedirectUI(element.dialog, 'Q02', {
                IED1: 'No',
                IED2: 'IED4',
            });
            const cloneEntity = actionEvent.args[0][0].detail.action.new.element;
            expect(cloneEntity.querySelectorAll('LNode[lnClass="CSWI"]')).to.not
                .exist;
        });
        describe('is not visible to the user', () => {
            it('in specification phase (LNode="None")', async () => {
                await loadAndClone(element, 'specificationOnly.scd');
                expect(element.dialog).to.not.exist;
                expect(actionEvent).to.have.been.called;
            });
            it('in case LNode are all in use', async () => {
                await loadAndClone(element, 'noUnusedLNode.scd');
                expect(element.dialog).to.not.exist;
                expect(actionEvent).to.have.been.called;
            });
            it('in case LNode are not present in all other IEDs', async () => {
                await loadAndClone(element, 'refMissmatch.scd');
                expect(element.dialog).to.not.exist;
                expect(actionEvent).to.have.been.called;
            });
        });
    });
    describe('triggered by voltage-level-editor', () => {
        let element;
        beforeEach(async () => {
            const voltageLevel = new DOMParser().parseFromString('<VoltageLevel name="someName" />', 'application/xml').documentElement;
            element = (await fixture(html `<voltage-level-editor
            .element=${voltageLevel}
          ></voltage-level-editor>`));
        });
        it('looks like the latest snapshot', async () => {
            await loadAndClone(element, 'validRedirect.scd');
            expect(element.dialog).to.exist;
            await expect(element.dialog).to.equalSnapshot();
        });
    });
    describe('triggered by substation-editor', () => {
        let element;
        beforeEach(async () => {
            const substation = new DOMParser().parseFromString('<Substation name="someName" />', 'application/xml').documentElement;
            element = (await fixture(html `<substation-editor .element=${substation}></substation-editor>`));
        });
        it('looks like the latest snapshot', async () => {
            await loadAndClone(element, 'validRedirect.scd');
            expect(element.dialog).to.exist;
            await expect(element.dialog).to.equalSnapshot();
        });
    });
});
//# sourceMappingURL=redirectionUI.test.js.map