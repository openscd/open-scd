import { expect, fixture, html } from '@open-wc/testing';
import '../../../mock-wizard-editor.js';
import '../../../../src/editors/substation/tapchanger-editor.js';
const openAndCancelMenu = (parent, element) => new Promise(async (resolve) => {
    expect(parent.wizardUI.dialog).to.be.undefined;
    element?.shadowRoot
        ?.querySelector("mwc-icon-button[icon='playlist_add']")
        .click();
    const lnodMenuItem = element?.shadowRoot?.querySelector(`mwc-list-item[value='LNode']`);
    lnodMenuItem.click();
    await new Promise(resolve => setTimeout(resolve, 100)); // await animation
    expect(parent.wizardUI.dialog).to.exist;
    const secondaryAction = (parent.wizardUI.dialog?.querySelector('mwc-button[slot="secondaryAction"][dialogaction="close"]'));
    secondaryAction.click();
    await new Promise(resolve => setTimeout(resolve, 100)); // await animation
    expect(parent.wizardUI.dialog).to.be.undefined;
    return resolve();
});
describe('tapchanger-editor wizarding editing integration', () => {
    let doc;
    let parent;
    let element;
    describe('edit wizard', () => {
        let nameField;
        let descField;
        let primaryAction;
        let secondaryAction;
        beforeEach(async () => {
            doc = await fetch('/test/testfiles/editors/substation/TapChanger.scd')
                .then(response => response.text())
                .then(str => new DOMParser().parseFromString(str, 'application/xml'));
            parent = (await fixture(html `<mock-wizard-editor
            ><tapchanger-editor
              .element=${doc.querySelector('TransformerWinding[name="withTapChanger1"] > TapChanger[name="tapChComplet"]')}
            ></tapchanger-editor
          ></mock-wizard-editor>`));
            element = parent.querySelector('tapchanger-editor');
            await (element?.shadowRoot?.querySelector('mwc-icon-button[icon="edit"]')).click();
            await parent.updateComplete;
            nameField = (parent.wizardUI.dialog?.querySelector('wizard-textfield[label="name"]'));
            descField = (parent.wizardUI.dialog?.querySelector('wizard-textfield[label="desc"]'));
            secondaryAction = (parent.wizardUI.dialog?.querySelector('mwc-button[slot="secondaryAction"]'));
            primaryAction = (parent.wizardUI.dialog?.querySelector('mwc-button[slot="primaryAction"]'));
        });
        it('closes on secondary action', async () => {
            secondaryAction.click();
            await new Promise(resolve => setTimeout(resolve, 100)); // await animation
            expect(parent.wizardUI.dialog).to.not.exist;
        });
        it('does not change name attribute if not unique within parent element', async () => {
            const oldName = nameField.value;
            nameField.value = 'empty';
            primaryAction.click();
            await parent.updateComplete;
            expect(doc
                .querySelector('TransformerWinding[name="withTapChanger1"] > TapChanger[name="tapChComplet"]')
                ?.getAttribute('name')).to.equal(oldName);
        });
        it('changes desc attribute on primary action', async () => {
            descField.value = 'newDesc';
            primaryAction.click();
            await parent.updateComplete;
            expect(doc
                .querySelector('TransformerWinding[name="withTapChanger1"] > TapChanger[name="tapChComplet"]')
                ?.getAttribute('desc')).to.equal('newDesc');
        });
        it('changes virtual attribute on primary action', async () => {
            const virtualCheckbox = (parent.wizardUI.dialog?.querySelector('wizard-checkbox[label="virtual"]'));
            virtualCheckbox.nullSwitch.click();
            virtualCheckbox.maybeValue = 'false';
            primaryAction.click();
            await parent.updateComplete;
            expect(doc
                .querySelector('TransformerWinding[name="withTapChanger1"] > TapChanger[name="tapChComplet"]')
                ?.getAttribute('virtual')).to.equal('false');
        });
        describe('has a delete icon button that', () => {
            let deleteButton;
            beforeEach(async () => {
                deleteButton = (element?.shadowRoot?.querySelector('mwc-icon-button[icon="delete"]'));
                await parent.updateComplete;
            });
            it('removes the attached TapChanger element from the document', async () => {
                expect(doc.querySelector('TransformerWinding[name="withTapChanger1"] > TapChanger[name="tapChComplet"]')).to.exist;
                await deleteButton.click();
                expect(doc.querySelector('TransformerWinding[name="withTapChanger1"] > TapChanger[name="tapChComplet"]')).to.not.exist;
            });
        });
    });
    describe('Open add wizard', () => {
        let doc;
        let parent;
        let element;
        beforeEach(async () => {
            doc = await fetch('/test/testfiles/editors/substation/TapChanger.scd')
                .then(response => response.text())
                .then(str => new DOMParser().parseFromString(str, 'application/xml'));
            parent = (await fixture(html `<mock-wizard-editor
            ><tapchanger-editor
              .element=${doc.querySelector('TransformerWinding[name="withTapChanger1"] > TapChanger[name="tapChComplet"]')}
            ></tapchanger-editor
          ></mock-wizard-editor>`));
            element = parent.querySelector('tapchanger-editor');
            await parent.updateComplete;
        });
        it('Should open the same wizard for the second time', async () => {
            await openAndCancelMenu(parent, element);
            await openAndCancelMenu(parent, element);
        });
    });
});
//# sourceMappingURL=tapchanger-editor-wizard-editing.test.js.map