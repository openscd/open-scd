import { html, fixture, expect } from '@open-wc/testing';
import '../../mock-open-scd.js';
import TemplatesPlugin from '../../../src/editors/Templates.js';
describe('DA wizarding editing integration', () => {
    if (customElements.get('templates-editor') === undefined)
        customElements.define('templates-editor', TemplatesPlugin);
    let doc;
    let parent;
    let templates;
    let dOTypeList;
    beforeEach(async () => {
        doc = await fetch('/test/testfiles/templates/dotypes.scd')
            .then(response => response.text())
            .then(str => new DOMParser().parseFromString(str, 'application/xml'));
        parent = await fixture(html `<mock-open-scd
        ><templates-editor .doc=${doc}></templates-editor
      ></mock-open-scd>`);
        templates = parent.getActivePlugin();
        await parent.updateComplete;
        dOTypeList = (templates.shadowRoot?.querySelector('filtered-list[id="dotypelist"]'));
    });
    describe('defines a editDaWizard to edit an existing DA', () => {
        let nameField;
        let primayAction;
        let deleteButton;
        beforeEach(async () => {
            (dOTypeList.querySelector('mwc-list-item[value="#Dummy.LLN0.Mod"]')).click();
            await parent.requestUpdate();
            await new Promise(resolve => setTimeout(resolve, 100)); // await animation
            (parent.wizardUI?.dialog?.querySelector('mwc-list-item[value="#Dummy.LLN0.Mod>stVal"]')).click();
            await parent.requestUpdate();
            await new Promise(resolve => setTimeout(resolve, 100)); // await animation
            nameField = (parent.wizardUI.dialog?.querySelector('wizard-textfield[label="name"]'));
            primayAction = (parent.wizardUI.dialog?.querySelector('mwc-button[slot="primaryAction"]'));
            deleteButton = (Array.from(parent.wizardUI.dialog.querySelectorAll('mwc-menu > mwc-list-item')).find(item => item.innerHTML.includes('Remove')));
        });
        it('looks like the latest snapshot', async () => {
            await expect(parent.wizardUI.dialog).to.equalSnapshot();
        });
        it('edits DA attributes name', async () => {
            expect(doc.querySelector('DOType[id="Dummy.LLN0.Mod"] > DA[name="stVal"]')).to.exist;
            nameField.value = 'newCtlVal';
            await parent.requestUpdate();
            primayAction.click();
            await parent.requestUpdate();
            expect(doc.querySelector('DOType[id="Dummy.LLN0.Mod"] > DA[name="stVal"]')).to.not.exist;
            expect(doc.querySelector('DOType[id="Dummy.LLN0.Mod"] > DA[name="newCtlVal"]')).to.exist;
        });
        it('deletes the DA element on delete button click', async () => {
            expect(doc.querySelector('DOType[id="Dummy.LLN0.Mod"] > DA[name="stVal"]')).to.exist;
            expect(doc.querySelectorAll('DOType[id="Dummy.LLN0.Mod"] > DA').length).to.equal(14);
            deleteButton.click();
            await parent.requestUpdate();
            expect(doc.querySelector('DOType[id="Dummy.LLN0.Mod"] > DA[name="stVal"]')).to.not.exist;
            expect(doc.querySelectorAll('DOType[id="Dummy.LLN0.Mod"] > DA').length).to.equal(13);
        });
        it('does not edit DA element without changes', async () => {
            const originData = (doc.querySelector('DOType[id="Dummy.LLN0.Mod"] > DA[name="stVal"]')).cloneNode(true);
            primayAction.click();
            await parent.requestUpdate();
            expect(originData.isEqualNode(doc.querySelector('DOType[id="Dummy.LLN0.Mod"] > DA[name="stVal"]'))).to.be.true;
        });
    });
    describe('defines a createDaWizard to create a new DA element', () => {
        let nameField;
        let descField;
        let sAddrField;
        let bTypeSelect;
        let valKindSelect;
        let valImportSelect;
        let fcSelect;
        let primayAction;
        beforeEach(async () => {
            (dOTypeList.querySelector('mwc-list-item[value="#Dummy.LLN0.Mod"]')).click();
            await parent.requestUpdate();
            await new Promise(resolve => setTimeout(resolve, 100)); // await animation
            (Array.from(parent.wizardUI.dialog.querySelectorAll('mwc-menu > mwc-list-item')).find(item => item.innerHTML.includes('Data attribute'))).click();
            await parent.requestUpdate();
            await new Promise(resolve => setTimeout(resolve, 100)); // await animation
            nameField = (parent.wizardUI.dialog?.querySelector('wizard-textfield[label="name"]'));
            descField = (parent.wizardUI.dialog?.querySelector('wizard-textfield[label="desc"]'));
            sAddrField = (parent.wizardUI.dialog?.querySelector('wizard-textfield[label="sAddr"]'));
            bTypeSelect = (parent.wizardUI.dialog?.querySelector('wizard-select[label="bType"]'));
            valKindSelect = (parent.wizardUI.dialog?.querySelector('wizard-select[label="valKind"]'));
            valImportSelect = (parent.wizardUI.dialog?.querySelector('wizard-checkbox[label="valImport"]'));
            fcSelect = (parent.wizardUI.dialog?.querySelector('wizard-select[label="fc"]'));
            primayAction = (parent.wizardUI.dialog?.querySelector('mwc-button[slot="primaryAction"]'));
        });
        it('looks like the latest snapshot', async () => {
            await expect(parent.wizardUI.dialog).to.equalSnapshot();
        });
        it('creates a new DA element', async () => {
            expect(doc.querySelector('DOType[id="Dummy.LLN0.Mod"] > DA[name="newDAElement"]')).to.not.exist;
            nameField.value = 'newDAElement';
            fcSelect.value = 'ST';
            bTypeSelect.value = 'Struct';
            await parent.requestUpdate();
            primayAction.click();
            await parent.requestUpdate();
            expect(doc.querySelector('DOType[id="Dummy.LLN0.Mod"] > ' +
                'DA[name="newDAElement"]:not([desc]):not([sAddr])[bType="Struct"]' +
                '[type="Dummy_origin"]:not([valKind]):not([valImport])')).to.exist;
        });
        it('creates yet another new DA element', async () => {
            const name = 'newDAElement2';
            const desc = 'newDAdesc';
            const sAddr = 'myNewAddr';
            expect(doc.querySelector('DAType[id="#Dummy.LLN0.Mod"] > DA[name="newDAElement2"]')).to.not.exist;
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
            fcSelect.value = 'ST';
            await parent.requestUpdate();
            primayAction.click();
            await parent.requestUpdate();
            expect(doc.querySelector(`DOType[id="Dummy.LLN0.Mod"] >` +
                `DA[name="${name}"][desc="${desc}"][sAddr="${sAddr}"][bType="BOOLEAN"]` +
                `:not([type])[valKind="RO"][valImport="true"]`)).to.exist;
        });
    });
});
//# sourceMappingURL=da-wizarding-editing.test.js.map