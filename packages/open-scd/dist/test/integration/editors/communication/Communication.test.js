import { html, fixture, expect } from '@open-wc/testing';
import '../../../mock-open-scd.js';
import Communication from '../../../../src/editors/Communication.js';
describe('Communication Plugin', () => {
    customElements.define('communication-plugin', Communication);
    let element;
    beforeEach(async () => {
        element = await fixture(html `<communication-plugin></communication-plugin>`);
    });
    describe('without a doc loaded', () => {
        it('looks like the latest snapshot', async () => {
            await expect(element).shadowDom.to.equalSnapshot();
        });
    });
    describe('with a doc loaded including communication section', () => {
        let doc;
        let element;
        beforeEach(async () => {
            doc = await fetch('/test/testfiles/valid2007B4.scd')
                .then(response => response.text())
                .then(str => new DOMParser().parseFromString(str, 'application/xml'));
            element = await fixture(html `<communication-plugin .doc="${doc}"></communication-plugin>`);
        });
        it('constains a subnetwork-editor rendering the communication section', () => {
            expect(element.shadowRoot?.querySelector('subnetwork-editor')).to.exist;
        });
    });
    describe('with a doc loaded missing a communication section', () => {
        let doc;
        let parent;
        let fab;
        let element;
        beforeEach(async () => {
            doc = await fetch('/test/testfiles/missingCommunication.scd')
                .then(response => response.text())
                .then(str => new DOMParser().parseFromString(str, 'application/xml'));
            parent = await fixture(html `<mock-open-scd
          ><communication-plugin .doc=${doc}></communication-plugin
        ></mock-open-scd>`);
            element = parent.getActivePlugin();
            await parent.updateComplete;
            fab = (parent
                ?.querySelector('communication-plugin')
                ?.shadowRoot?.querySelector('mwc-fab'));
        });
        it('has a mwc-fab', () => {
            expect(element.shadowRoot?.querySelector('mwc-fab')).to.exist;
        });
        it('that opens a add subnetwork wizard on mwc-fab click', async () => {
            expect(parent.wizardUI.dialogs.length).to.equal(0);
            fab.click();
            await parent.updateComplete;
            expect(parent.wizardUI.dialogs.length).to.equal(1);
        });
        it('Should create a Communication Element', async () => {
            expect(parent.wizardUI.dialogs.length).to.equal(0);
            expect(element.doc.querySelector('Communication')).is.null;
            await fab.click();
            await new Promise(resolve => setTimeout(resolve, 100)); // await animation
            await parent.updateComplete;
            const dialog = parent.wizardUI.dialog;
            expect(dialog).to.not.be.undefined;
            const nameInput = dialog.querySelector('wizard-textfield[label="name"]');
            nameInput.value = 'Test';
            await new Promise(resolve => setTimeout(resolve, 100)); // await animation
            const saveButton = dialog.querySelector('mwc-button[slot="primaryAction"]');
            await saveButton.click();
            await new Promise(resolve => setTimeout(resolve, 100)); // await animation
            expect(element.doc.querySelector('Communication')).not.is.null;
            expect(element.doc.querySelector('Communication > SubNetwork[name="Test"]')).to.exist;
        });
    });
});
//# sourceMappingURL=Communication.test.js.map