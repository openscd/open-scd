import { html, fixture, expect } from '@open-wc/testing';
import '../../mock-open-scd.js';
import TemplatesPlugin from '../../../src/editors/Templates.js';
describe('BDA wizarding editing integration', () => {
    if (customElements.get('templates-editor') === undefined)
        customElements.define('templates-editor', TemplatesPlugin);
    let doc;
    let parent;
    let templates;
    let dATypeList;
    beforeEach(async () => {
        parent = await fixture(html `<mock-open-scd><templates-editor></templates-editor></mock-open-scd>`);
        templates = parent.getActivePlugin();
        doc = await fetch('/test/testfiles/templates/datypes.scd')
            .then(response => response.text())
            .then(str => new DOMParser().parseFromString(str, 'application/xml'));
        templates.doc = doc;
        await templates.updateComplete;
        dATypeList = (templates.shadowRoot?.querySelector('filtered-list[id="datypelist"]'));
    });
    describe('defines a editBDaWizard to edit an existing BDA', () => {
        let nameField;
        let primayAction;
        let deleteButton;
        beforeEach(async () => {
            (dATypeList.querySelector('mwc-list-item[value="#Dummy.LLN0.Mod.SBOw"]')).click();
            await parent.requestUpdate();
            await new Promise(resolve => setTimeout(resolve, 100)); // await animation
            (parent.wizardUI?.dialog?.querySelector('mwc-list-item[value="#Dummy.LLN0.Mod.SBOw>ctlVal"]')).click();
            await parent.requestUpdate();
            await new Promise(resolve => setTimeout(resolve, 100)); // await animation
            nameField = (parent.wizardUI.dialog?.querySelector('wizard-textfield[label="name"]'));
            primayAction = (parent.wizardUI.dialog?.querySelector('mwc-button[slot="primaryAction"]'));
            deleteButton = (Array.from(parent.wizardUI.dialog.querySelectorAll('mwc-menu > mwc-list-item')).find(item => item.innerHTML.includes('Remove')));
        });
        it('looks like the latest snapshot', async () => {
            await expect(parent.wizardUI.dialog).to.equalSnapshot();
        });
        it('edits BDA element', async () => {
            expect(doc.querySelector('DAType[id="Dummy.LLN0.Mod.SBOw"] > BDA[name="ctlVal"]')).to.exist;
            nameField.value = 'newCtlVal';
            await parent.requestUpdate();
            primayAction.click();
            await parent.requestUpdate();
            expect(doc.querySelector('DAType[id="Dummy.LLN0.Mod.SBOw"] > BDA[name="ctlVal"]')).to.not.exist;
            expect(doc.querySelector('DAType[id="Dummy.LLN0.Mod.SBOw"] > BDA[name="newCtlVal"]')).to.exist;
        });
        it('deletes the BDA element on delete button click', async () => {
            expect(doc.querySelector('DAType[id="Dummy.LLN0.Mod.SBOw"] > BDA[name="ctlVal"]')).to.exist;
            expect(doc.querySelectorAll('DAType[id="Dummy.LLN0.Mod.SBOw"] > BDA').length).to.equal(6);
            deleteButton.click();
            await parent.requestUpdate();
            expect(doc.querySelector('DAType[id="Dummy.LLN0.Mod.SBOw"] > BDA[name="ctlVal"]')).to.not.exist;
            expect(doc.querySelectorAll('DAType[id="Dummy.LLN0.Mod.SBOw"] > BDA').length).to.equal(5);
        });
    });
    describe('defines a createBDaWizard to create a new BDA element', () => {
        let nameField;
        let descField;
        let sAddrField;
        let bTypeSelect;
        let valKindSelect;
        let valImportSelect;
        let primayAction;
        beforeEach(async () => {
            (dATypeList.querySelector('mwc-list-item[value="#Dummy.LLN0.Mod.SBOw"]')).click();
            await parent.requestUpdate();
            await new Promise(resolve => setTimeout(resolve, 100)); // await animation
            (parent.wizardUI.dialog?.querySelectorAll('mwc-menu > mwc-list-item')[1]).click();
            await parent.requestUpdate();
            await new Promise(resolve => setTimeout(resolve, 100)); // await animation
            nameField = (parent.wizardUI.dialog?.querySelector('wizard-textfield[label="name"]'));
            descField = (parent.wizardUI.dialog?.querySelector('wizard-textfield[label="desc"]'));
            sAddrField = (parent.wizardUI.dialog?.querySelector('wizard-textfield[label="sAddr"]'));
            bTypeSelect = (parent.wizardUI.dialog?.querySelector('wizard-select[label="bType"]'));
            valKindSelect = (parent.wizardUI.dialog?.querySelector('wizard-select[label="valKind"]'));
            valImportSelect = (parent.wizardUI.dialog?.querySelector('wizard-checkbox[label="valImport"]'));
            primayAction = (parent.wizardUI.dialog?.querySelector('mwc-button[slot="primaryAction"]'));
        });
        it('looks like the latest snapshot', async () => {
            await expect(parent.wizardUI.dialog).to.equalSnapshot();
        });
        it('creates a new BDA element', async () => {
            expect(doc.querySelector('DAType[id="Dummy.LLN0.Mod.SBOw"] > BDA[name="newBDAElement"]')).to.not.exist;
            nameField.value = 'newBDAElement';
            await parent.requestUpdate();
            bTypeSelect.value = 'BOOLEAN';
            await parent.requestUpdate();
            primayAction.click();
            await parent.requestUpdate();
            expect(doc.querySelector('DAType[id="Dummy.LLN0.Mod.SBOw"] > BDA[name="newBDAElement"]:not([desc]):not([sAddr])[bType="BOOLEAN"]:not([valKind]):not([valImport])')).to.exist;
        });
        it('creates yet another new BDA element', async () => {
            const name = 'newBDAElement2';
            const desc = 'newBDAdesc';
            const sAddr = 'myNewAddr';
            expect(doc.querySelector('DAType[id="Dummy.LLN0.Mod.SBOw"] > BDA[name="newBDAElement2"]')).to.not.exist;
            nameField.value = name;
            descField.nullable = false;
            descField.value = desc;
            sAddrField.nullable = false;
            sAddrField.value = sAddr;
            bTypeSelect.value = 'BOOLEAN';
            valKindSelect.nullable = false;
            valKindSelect.value = 'RO';
            valImportSelect.nullable = false;
            valImportSelect.maybeValue = 'true';
            await parent.requestUpdate();
            primayAction.click();
            await parent.requestUpdate();
            expect(doc.querySelector(`DAType[id="Dummy.LLN0.Mod.SBOw"] >` +
                `BDA[name="${name}"][desc="${desc}"][sAddr="${sAddr}"][bType="BOOLEAN"]:not([type])[valKind="RO"][valImport="true"]`)).to.exist;
        });
    });
});
//# sourceMappingURL=bda-wizarding-editing.test.js.map