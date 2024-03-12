import { html, fixture, expect } from '@open-wc/testing';
import '../../../mock-open-scd.js';
import TemplatesPlugin from '../../../../src/editors/Templates.js';
import { patterns } from '../../../../src/foundation.js';
describe('EnumType wizards', () => {
    if (customElements.get('templates-editor') === undefined)
        customElements.define('templates-editor', TemplatesPlugin);
    let doc;
    let parent;
    let templates;
    let eNumTypeList;
    beforeEach(async () => {
        parent = await fixture(html `<mock-open-scd><templates-editor></templates-editor></mock-open-scd>`);
        templates = parent.getActivePlugin();
        doc = await fetch('/test/testfiles/templates/datypes.scd')
            .then(response => response.text())
            .then(str => new DOMParser().parseFromString(str, 'application/xml'));
        templates.doc = doc;
        await templates.updateComplete;
        eNumTypeList = (templates.shadowRoot?.querySelector('filtered-list[id="enumtypelist"]'));
    });
    describe('defines a createEnumTypeWizard', () => {
        let selector;
        let idField;
        let primayAction;
        beforeEach(async () => {
            const button = (templates?.shadowRoot?.querySelectorAll('mwc-icon-button[icon="playlist_add"]')[3]);
            button.click();
            await parent.updateComplete;
            await new Promise(resolve => setTimeout(resolve, 100)); // await animation
            selector = (parent.wizardUI.dialog?.querySelector('mwc-select[label="values"]'));
            idField = (parent.wizardUI.dialog?.querySelector('wizard-textfield[label="id"]'));
            primayAction = (parent.wizardUI.dialog?.querySelector('mwc-button[slot="primaryAction"]'));
        });
        it('looks like the latest snapshot', async () => {
            await expect(parent.wizardUI.dialog).to.equalSnapshot({
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
            const pattern = '([:_A-Za-z]|[\u00C0-\u00D6]|[\u00D8-\u00F6]|[\u00F8-\u02FF]|[\u0370-\u037D]' +
                '|[\u037F-\u1FFF]|[\u200C-\u200D]|[\u2070-\u218F]|[\u2C00-\u2FEF]' +
                '|[\u3001-\uD7FF]|[\uF900-\uFDCF]|[\uFDF0-\uFFFD]|[.0-9\\-]|\u00B7|[\u0300-\u036F]|[\u203F-\u2040])+';
            expect(parent.wizardUI.dialog.querySelectorAll('wizard-textfield[pattern]')
                .length).to.equal(2);
            expect(parent.wizardUI
                .dialog.querySelectorAll('wizard-textfield[pattern]')[0]
                .getAttribute('pattern')).to.equal(pattern);
            expect(parent.wizardUI
                .dialog.querySelectorAll('wizard-textfield[pattern]')[1]
                .getAttribute('pattern')).to.equal(patterns.normalizedString);
        });
        it('allows to add empty EnumType to the project', async () => {
            expect(doc.querySelector('EnumType[id="myGeneralEnumType"]')).to.not
                .exist;
            idField.maybeValue = 'myGeneralEnumType';
            await parent.requestUpdate();
            primayAction.click();
            await parent.updateComplete;
            expect(doc.querySelector('EnumType[id="myGeneralEnumType"]')).to.exist;
        });
        it('respects the sequence defined in the standard', async () => {
            idField.maybeValue = 'myGeneralEnumType';
            await parent.requestUpdate();
            primayAction.click();
            await parent.updateComplete;
            const element = doc.querySelector('EnumType[id="myGeneralEnumType"]');
            expect(element?.nextElementSibling?.tagName).to.equal('EnumType');
            expect(element?.previousElementSibling?.tagName).to.equal('DAType');
        });
        it('allows to add a predefined EnumType', async () => {
            expect(doc.querySelector('EnumType[id="myGeneralEnumType"]')).to.not
                .exist;
            selector.value = 'AdjustmentKind';
            idField.maybeValue = 'myGeneralEnumType';
            await parent.requestUpdate();
            primayAction.click();
            await parent.updateComplete;
            expect(doc.querySelector('EnumType[id="myGeneralEnumType"]')).to.exist;
            expect(doc.querySelectorAll('EnumType[id="myGeneralEnumType"] > EnumVal')
                .length).to.equal(4);
        });
    });
    describe('defines an eNumTypeEditWizard', () => {
        let idField;
        let primayAction;
        let deleteButton;
        beforeEach(async () => {
            (eNumTypeList.querySelector('mwc-list-item[value="#Dummy_ctlModel"]')).click();
            await parent.requestUpdate();
            await new Promise(resolve => setTimeout(resolve, 100)); // await animation
            idField = (parent.wizardUI.dialog?.querySelector('wizard-textfield[label="id"]'));
            primayAction = (parent.wizardUI.dialog?.querySelector('mwc-button[slot="primaryAction"]'));
            deleteButton = (parent.wizardUI.dialog?.querySelectorAll('mwc-menu > mwc-list-item')[0]);
        });
        it('looks like the latest snapshot', async () => {
            await expect(parent.wizardUI.dialog).to.equalSnapshot({
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
            const pattern = '([:_A-Za-z]|[\u00C0-\u00D6]|[\u00D8-\u00F6]|[\u00F8-\u02FF]|[\u0370-\u037D]' +
                '|[\u037F-\u1FFF]|[\u200C-\u200D]|[\u2070-\u218F]|[\u2C00-\u2FEF]' +
                '|[\u3001-\uD7FF]|[\uF900-\uFDCF]|[\uFDF0-\uFFFD]|[.0-9\\-]|\u00B7|[\u0300-\u036F]|[\u203F-\u2040])+';
            expect(parent.wizardUI.dialog.querySelectorAll('wizard-textfield[pattern]')
                .length).to.equal(2);
            expect(parent.wizardUI
                .dialog.querySelectorAll('wizard-textfield[pattern]')[0]
                .getAttribute('pattern')).to.equal(pattern);
            expect(parent.wizardUI
                .dialog.querySelectorAll('wizard-textfield[pattern]')[1]
                .getAttribute('pattern')).to.equal(patterns.normalizedString);
        });
        it('edits EnumType attributes id', async () => {
            expect(doc.querySelector('EnumType[id="Dummy_ctlModel"]')).to.exist;
            idField.value = 'changedEnumType';
            await parent.requestUpdate();
            primayAction.click();
            await parent.requestUpdate();
            expect(doc.querySelector('EnumType[id="Dummy_ctlModel"]')).to.not.exist;
            expect(doc.querySelector('EnumType[id="changedEnumType"]')).to.exist;
        });
        it('deletes the EnumVal element on delete button click', async () => {
            expect(doc.querySelector('EnumType[id="Dummy_ctlModel"]')).to.exist;
            expect(doc.querySelectorAll('EnumType').length).to.equal(4);
            deleteButton.click();
            await parent.requestUpdate();
            expect(doc.querySelector('EnumType[id="Dummy_ctlModel"]')).to.not.exist;
            expect(doc.querySelectorAll('EnumType').length).to.equal(3);
        });
        it('does not edit EnumType element without changes', async () => {
            const originData = (doc.querySelector('EnumType[id="Dummy_ctlModel"]')).cloneNode(true);
            primayAction.click();
            await parent.requestUpdate();
            expect(originData.isEqualNode(doc.querySelector('EnumType[id="Dummy_ctlModel"]'))).to.be.true;
        });
    });
    describe('defines a eNumValWizard to edit an existing EnumVal', () => {
        let ordField;
        let valueField;
        let descField;
        let primayAction;
        let deleteButton;
        beforeEach(async () => {
            (eNumTypeList.querySelector('mwc-list-item[value="#Dummy_ctlModel"]')).click();
            await parent.requestUpdate();
            await new Promise(resolve => setTimeout(resolve, 100)); // await animation
            (parent.wizardUI?.dialog?.querySelector('mwc-list-item[value="#Dummy_ctlModel>1"]')).click();
            await parent.requestUpdate();
            await new Promise(resolve => setTimeout(resolve, 100)); // await animation
            ordField = (parent.wizardUI.dialog?.querySelector('wizard-textfield[label="ord"]'));
            valueField = (parent.wizardUI.dialog?.querySelector('wizard-textfield[label="value"]'));
            descField = (parent.wizardUI.dialog?.querySelector('wizard-textfield[label="desc"]'));
            primayAction = (parent.wizardUI.dialog?.querySelector('mwc-button[slot="primaryAction"]'));
            deleteButton = (parent.wizardUI.dialog?.querySelectorAll('mwc-menu > mwc-list-item')[0]);
        });
        it('looks like the latest snapshot', async () => {
            await expect(parent.wizardUI.dialog).to.equalSnapshot();
        });
        it('edits EnumVal attributes ord', async () => {
            expect(doc.querySelector('EnumType[id="Dummy_ctlModel"] > EnumVal[ord="1"]')).to.exist;
            ordField.value = '10';
            await parent.requestUpdate();
            primayAction.click();
            await parent.requestUpdate();
            expect(doc.querySelector('EnumType[id="Dummy_ctlModel"] > EnumVal[ord="1"]')).to.not.exist;
            expect(doc.querySelector('EnumType[id="Dummy_ctlModel"] > EnumVal[ord="10"]')).to.exist;
        });
        it('edits EnumVal attributes value', async () => {
            expect(doc.querySelector('EnumType[id="Dummy_ctlModel"] > EnumVal[ord="1"]')
                ?.textContent).to.equal('direct-with-normal-security');
            valueField.value = 'direct-with-normal-security-test';
            descField.nullable = false;
            descField.maybeValue = 'myDesc';
            await parent.requestUpdate();
            primayAction.click();
            await parent.requestUpdate();
            expect(doc.querySelector('EnumType[id="Dummy_ctlModel"] > EnumVal[ord="1"][desc="myDesc"]')?.textContent).to.equal('direct-with-normal-security-test');
        });
        it('deletes the EnumVal element on delete button click', async () => {
            expect(doc.querySelector('EnumType[id="Dummy_ctlModel"] > EnumVal[ord="1"]')).to.exist;
            expect(doc.querySelectorAll('EnumType[id="Dummy_ctlModel"] > EnumVal').length).to.equal(5);
            deleteButton.click();
            await parent.requestUpdate();
            expect(doc.querySelector('EnumType[id="Dummy_ctlModel"] > EnumVal[name="1"]')).to.not.exist;
            expect(doc.querySelectorAll('EnumType[id="Dummy_ctlModel"] > EnumVal').length).to.equal(4);
        });
        it('does not edit EnumVal element without changes', async () => {
            const originData = (doc.querySelector('EnumType[id="Dummy_ctlModel"] > EnumVal[ord="1"]')).cloneNode(true);
            primayAction.click();
            await parent.requestUpdate();
            expect(originData.isEqualNode(doc.querySelector('EnumType[id="Dummy_ctlModel"] > EnumVal[ord="1"]'))).to.be.true;
        });
    });
    describe('defines a eNumValWizard to create a new EnumVal element', () => {
        let ordField;
        let valueField;
        let descField;
        let primayAction;
        beforeEach(async () => {
            (eNumTypeList.querySelector('mwc-list-item[value="#Dummy_ctlModel"]')).click();
            await parent.requestUpdate();
            await new Promise(resolve => setTimeout(resolve, 100)); // await animation
            (parent.wizardUI.dialog?.querySelectorAll('mwc-menu > mwc-list-item')[1]).click();
            await parent.requestUpdate();
            await new Promise(resolve => setTimeout(resolve, 100)); // await animation
            ordField = (parent.wizardUI.dialog?.querySelector('wizard-textfield[label="ord"]'));
            descField = (parent.wizardUI.dialog?.querySelector('wizard-textfield[label="desc"]'));
            valueField = (parent.wizardUI.dialog?.querySelector('wizard-textfield[label="value"]'));
            primayAction = (parent.wizardUI.dialog?.querySelector('mwc-button[slot="primaryAction"]'));
        });
        it('looks like the latest snapshot', async () => {
            await expect(parent.wizardUI.dialog).to.equalSnapshot();
        });
        it('creates a new EnumVal element', async () => {
            expect(doc.querySelector('EnumType[id="Dummy_ctlModel"] > EnumVal[ord="9"]')).to.not.exist;
            ordField.value = '9';
            valueField.value = 'newValue';
            await parent.requestUpdate();
            primayAction.click();
            await parent.requestUpdate();
            expect(doc.querySelector('EnumType[id="Dummy_ctlModel"] > EnumVal[ord="9"]:not([desc])')?.textContent).to.equal('newValue');
        });
        it('creates yet another new EnumVal element', async () => {
            expect(doc.querySelector('EnumType[id="Dummy_ctlModel"] > EnumVal[ord="9"]')).to.not.exist;
            ordField.value = '9';
            valueField.value = 'newValue';
            descField.nullable = false;
            descField.maybeValue = 'myDesc';
            await parent.requestUpdate();
            primayAction.click();
            await parent.requestUpdate();
            expect(doc.querySelector('EnumType[id="Dummy_ctlModel"] > EnumVal[ord="9"][desc="myDesc"]')?.textContent).to.equal('newValue');
        });
    });
});
//# sourceMappingURL=enumtype-wizarding.test.js.map