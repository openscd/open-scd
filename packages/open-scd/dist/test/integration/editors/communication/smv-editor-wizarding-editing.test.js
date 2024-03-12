import { fixture, html, expect } from '@open-wc/testing';
import '../../../mock-wizard-editor.js';
import '../../../../src/editors/communication/smv-editor.js';
describe('smv-editor wizarding editing integration', () => {
    describe('edit wizard', () => {
        let doc;
        let parent;
        let element;
        let secondaryAction;
        let primaryAction;
        let macAddressField;
        beforeEach(async () => {
            doc = await fetch('/test/testfiles/valid2007B4.scd')
                .then(response => response.text())
                .then(str => new DOMParser().parseFromString(str, 'application/xml'));
            parent = (await fixture(html `<mock-wizard-editor
            ><smv-editor
              .element=${doc.querySelector('ConnectedAP[iedName="IED3"] > SMV')}
            ></smv-editor>
            ></mock-wizard-editor
          >`));
            element = parent.querySelector('smv-editor');
            await (element?.shadowRoot?.querySelector('mwc-fab[icon="edit"]')).click();
            await parent.updateComplete;
            macAddressField = (parent.wizardUI.dialog?.querySelector('wizard-textfield[label="MAC-Address"]'));
            secondaryAction = (parent.wizardUI.dialog?.querySelector('mwc-button[slot="secondaryAction"]'));
            primaryAction = (parent.wizardUI.dialog?.querySelector('mwc-button[slot="primaryAction"]'));
        });
        it('closes on secondary action', async () => {
            expect(parent.wizardUI.dialog).to.exist;
            secondaryAction.click();
            await new Promise(resolve => setTimeout(resolve, 100)); // await animation
            expect(parent.wizardUI.dialog).to.not.exist;
        });
        it('changes MAC address attribute on primary action', async () => {
            expect(doc.querySelector('ConnectedAP[iedName="IED3"] > SMV > Address > P[type="MAC-Address"]')?.textContent).to.equal('01-0C-CD-04-00-20');
            macAddressField.value = '01-0C-CD-04-0F-FF';
            await parent.requestUpdate();
            primaryAction.click();
            await parent.requestUpdate();
            expect(doc.querySelector('ConnectedAP[iedName="IED3"] > SMV > Address > P[type="MAC-Address"]')?.textContent).to.equal('01-0C-CD-04-0F-FF');
        });
        it('does not change Address if no changes have been made', async () => {
            const reference = doc.querySelector('ConnectedAP[iedName="IED3"] > SMV');
            primaryAction.click();
            expect(doc
                .querySelector('ConnectedAP[iedName="IED3"] > SMV')
                ?.isEqualNode(reference)).to.be.true;
        });
    });
    describe('remove action', () => {
        let doc;
        let parent;
        let element;
        let deleteButton;
        beforeEach(async () => {
            doc = await fetch('/test/testfiles/valid2007B4.scd')
                .then(response => response.text())
                .then(str => new DOMParser().parseFromString(str, 'application/xml'));
            parent = (await fixture(html `<mock-wizard-editor
            ><smv-editor
              .element=${doc.querySelector('ConnectedAP[iedName="IED3"] > SMV')}
            ></smv-editor
          ></mock-wizard-editor>`));
            element = parent.querySelector('smv-editor');
            await parent.updateComplete;
            deleteButton = (element?.shadowRoot?.querySelector('mwc-fab[icon="delete"]'));
        });
        it('removes SMV on delete button click', async () => {
            expect(doc.querySelector('ConnectedAP[iedName="IED3"] > SMV')).to.exist;
            deleteButton.click();
            await parent.updateComplete;
            expect(doc.querySelector('ConnectedAP[iedName="IED3"] > SMV')).to.not
                .exist;
        });
    });
});
//# sourceMappingURL=smv-editor-wizarding-editing.test.js.map