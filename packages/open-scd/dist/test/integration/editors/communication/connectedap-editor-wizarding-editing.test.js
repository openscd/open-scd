import { fixture, html, expect } from '@open-wc/testing';
import '../../../mock-wizard-editor.js';
import '../../../../src/editors/communication/connectedap-editor.js';
describe('connectedap-editor wizarding editing integration', () => {
    describe('edit wizard', () => {
        let doc;
        let parent;
        let element;
        let secondaryAction;
        let primaryAction;
        let ipField;
        beforeEach(async () => {
            doc = await fetch('/test/testfiles/valid2007B4.scd')
                .then(response => response.text())
                .then(str => new DOMParser().parseFromString(str, 'application/xml'));
            parent = (await fixture(html `<mock-wizard-editor
            ><connectedap-editor
              .element=${doc.querySelector('SubNetwork[name="StationBus"] > ConnectedAP')}
            ></connectedap-editor>
            ></mock-wizard-editor
          >`));
            element = parent.querySelector('connectedap-editor');
            await (element?.shadowRoot?.querySelector('mwc-fab[icon="edit"]')).click();
            await parent.updateComplete;
            ipField = (parent.wizardUI.dialog?.querySelector('wizard-textfield[label="IP"]'));
            secondaryAction = (parent.wizardUI.dialog?.querySelector('mwc-button[slot="secondaryAction"]'));
            primaryAction = (parent.wizardUI.dialog?.querySelector('mwc-button[slot="primaryAction"]'));
        });
        it('closes on secondary action', async () => {
            expect(parent.wizardUI.dialog).to.exist;
            secondaryAction.click();
            await new Promise(resolve => setTimeout(resolve, 100)); // await animation
            expect(parent.wizardUI.dialog).to.not.exist;
        });
        it('changes name attribute on primary action', async () => {
            expect(doc.querySelector('ConnectedAP > Address > P[type="IP"]')?.textContent).to.equal('192.168.210.111');
            ipField.value = '192.168.210.116';
            await parent.requestUpdate();
            primaryAction.click();
            await parent.requestUpdate();
            expect(doc.querySelector('ConnectedAP > Address > P[type="IP"]')?.textContent).to.equal('192.168.210.116');
        });
        it('does not change Address if no changes have been made', async () => {
            const reference = doc.querySelector('ConnectedAP');
            primaryAction.click();
            expect(doc.querySelector('ConnectedAP')?.isEqualNode(reference)).to.be
                .true;
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
            ><connectedap-editor
              .element=${doc.querySelector('SubNetwork[name="StationBus"] > ConnectedAP')}
            ></connectedap-editor
          ></mock-wizard-editor>`));
            element = parent.querySelector('connectedap-editor');
            await parent.updateComplete;
            deleteButton = (element?.shadowRoot?.querySelector('mwc-fab[icon="delete"]'));
        });
        it('removes ConnectedAP on delete button click', async () => {
            expect(doc.querySelector('SubNetwork[name="StationBus"] > ConnectedAP'))
                .to.exist;
            deleteButton.click();
            await parent.updateComplete;
            expect(doc.querySelector('SubNetwork[name="StationBus"] > ConnectedAP'))
                .to.not.exist;
        });
    });
});
//# sourceMappingURL=connectedap-editor-wizarding-editing.test.js.map