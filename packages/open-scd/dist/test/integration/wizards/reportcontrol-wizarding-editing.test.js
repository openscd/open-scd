import { expect, fixture, html } from '@open-wc/testing';
import '../../mock-wizard-editor.js';
import { createReportControlWizard, reportControlCopyToIedSelector, reportControlParentSelector, selectReportControlWizard, } from '../../../src/wizards/reportcontrol.js';
import { newWizardEvent } from '../../../src/foundation.js';
describe('Wizards for SCL element ReportControl', () => {
    let doc;
    let element;
    let primaryAction;
    beforeEach(async () => {
        element = await fixture(html `<mock-wizard-editor></mock-wizard-editor>`);
        doc = await fetch('/test/testfiles/wizards/reportcontrol.scd')
            .then(response => response.text())
            .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    });
    describe('define a select wizards that ', () => {
        let reportControlList;
        describe('with the document element as input', () => {
            beforeEach(async () => {
                const wizard = selectReportControlWizard(doc.documentElement);
                element.dispatchEvent(newWizardEvent(() => wizard));
                await element.requestUpdate();
                reportControlList = (element.wizardUI.dialog?.querySelector('filtered-list'));
                await reportControlList.updateComplete;
            });
            it('shows all ReportControl elements within a project', () => expect(reportControlList.items.length).to.equal(doc.querySelectorAll('ReportControl').length));
            it('opens edit wizard for selected ReportControl element on click', async () => {
                const reportItem = reportControlList.items[1];
                reportItem.click();
                await new Promise(resolve => setTimeout(resolve, 20)); // await animation
                const nameField = (element.wizardUI.dialog?.querySelector('wizard-textfield[label="name"]'));
                await nameField.requestUpdate();
                expect(nameField.value).to.equal(doc.querySelectorAll('ReportControl')[1].getAttribute('name'));
            });
            describe('has an add Report primary button that', () => {
                let iEDPicker;
                beforeEach(async () => {
                    (element.wizardUI.dialog?.querySelector('mwc-button[slot="primaryAction"]')).click();
                    await new Promise(resolve => setTimeout(resolve, 50)); // await animation
                    iEDPicker = (element.wizardUI.dialog?.querySelector('finder-list'));
                });
                it('opens a potential list of host IEDs for the ReportControl element', async () => expect(iEDPicker).to.exist);
            });
        });
        describe('with a specific IED as input', () => {
            beforeEach(async () => {
                const wizard = selectReportControlWizard(doc.querySelector('IED'));
                element.dispatchEvent(newWizardEvent(() => wizard));
                await element.requestUpdate();
                reportControlList = (element.wizardUI.dialog?.querySelector('filtered-list'));
                await reportControlList.updateComplete;
            });
            it('allows to filter ReportControl elements per IED', async () => expect(reportControlList.items.length).to.equal(doc.querySelector('IED').querySelectorAll('ReportControl').length));
            it('opens edit wizard for selected ReportControl element on click', async () => {
                const reportItem = reportControlList.items[1];
                reportItem.click();
                await new Promise(resolve => setTimeout(resolve, 20)); // await animation
                const nameField = (element.wizardUI.dialog?.querySelector('wizard-textfield[label="name"]'));
                await nameField.requestUpdate();
                expect(nameField.value).to.equal(doc.querySelectorAll('ReportControl')[1].getAttribute('name'));
            });
            describe('has an add Report primary button that', () => {
                it('opens the create wizard for the ReportControl element', async () => {
                    const primaryAction = (element.wizardUI.dialog?.querySelector('mwc-button[slot="primaryAction"]'));
                    await primaryAction.click();
                    await new Promise(resolve => setTimeout(resolve, 20)); // await animation
                    const nameField = (element.wizardUI.dialog?.querySelector('wizard-textfield[label="name"]'));
                    await nameField.requestUpdate();
                    expect(nameField).to.exist;
                });
            });
        });
    });
    describe('defines an edit wizard that', () => {
        let nameField;
        let secondaryAction;
        let parentIED;
        beforeEach(async () => {
            element.workflow.length = 0; // remove all wizard from FIFO queue
            parentIED = doc.querySelector('IED');
            element.dispatchEvent(newWizardEvent(() => selectReportControlWizard(parentIED)));
            await element.requestUpdate();
            await new Promise(resolve => setTimeout(resolve, 20)); // await animation
            const report = (element.wizardUI.dialog?.querySelector('filtered-list')
                .items[1]);
            report.click();
            await new Promise(resolve => setTimeout(resolve, 20)); // await animation
            nameField = element.wizardUI.dialog.querySelector('wizard-textfield[label="name"]');
            primaryAction = (element.wizardUI.dialog?.querySelector('mwc-button[slot="primaryAction"]'));
            secondaryAction = (element.wizardUI.dialog?.querySelector('mwc-button[slot="secondaryAction"]'));
            await nameField.updateComplete;
        });
        it('rejects name attribute starting with decimals', async () => {
            expect(parentIED.querySelectorAll('ReportControl')[1]?.getAttribute('name')).to.not.equal('4adsasd');
            nameField.value = '4adsasd';
            await element.requestUpdate();
            primaryAction.click();
            expect(parentIED.querySelectorAll('ReportControl')[1]?.getAttribute('name')).to.not.equal('4adsasd');
        });
        it('edits name attribute on primary action', async () => {
            expect(parentIED.querySelectorAll('ReportControl')[1]?.getAttribute('name')).to.not.equal('myNewName');
            nameField.value = 'myNewName';
            await element.requestUpdate();
            primaryAction.click();
            expect(parentIED.querySelectorAll('ReportControl')[1]?.getAttribute('name')).to.equal('myNewName');
        });
        it('dynamically updates wizards after attribute change', async () => {
            nameField.value = 'myNewName';
            primaryAction.click();
            await new Promise(resolve => setTimeout(resolve, 100)); // await animation
            const report = (element.wizardUI.dialog?.querySelector('filtered-list')
                .items[1]);
            expect(report.innerHTML).to.contain('myNewName');
        });
        it('returns back to its starting wizard on secondary action', async () => {
            secondaryAction.click();
            await new Promise(resolve => setTimeout(resolve, 100)); // await animation
            const report = (element.wizardUI.dialog?.querySelector('filtered-list')
                .items[0]);
            expect(report.innerHTML).to.contain('ReportCb');
        });
        it('opens edit wizard for DataSet element on edit dataset button click', async () => {
            const editDataSetButton = (Array.from(element.wizardUI.dialog.querySelectorAll('mwc-menu > mwc-list-item')).find(item => item.innerHTML.includes(`[scl.DataSet]`)));
            await element.wizardUI.dialog?.requestUpdate();
            editDataSetButton.click();
            await new Promise(resolve => setTimeout(resolve, 100)); // await animation
            const nameField = (element.wizardUI.dialog?.querySelector('wizard-textfield[label="name"]'));
            await nameField.updateComplete;
            expect(nameField.value).to.equal(doc.querySelectorAll('DataSet')[1].getAttribute('name'));
        });
        it('opens edit wizard for TrgOps element on edit trigger options button click', async () => {
            const editTrgOpsButton = (Array.from(element.wizardUI.dialog.querySelectorAll('mwc-menu > mwc-list-item')).find(item => item.innerHTML.includes(`[scl.TrgOps]`)));
            await element.wizardUI.dialog?.requestUpdate();
            editTrgOpsButton.click();
            await new Promise(resolve => setTimeout(resolve, 100)); // await animation
            const dchgSelect = (element.wizardUI.dialog?.querySelector('wizard-checkbox[label="dchg"]'));
            await dchgSelect.updateComplete;
            expect(dchgSelect).to.exist;
        });
        it('opens edit wizard for OptFields element on edit optional fields button click', async () => {
            const editOptFieldsButton = (Array.from(element.wizardUI.dialog.querySelectorAll('mwc-menu > mwc-list-item')).find(item => item.innerHTML.includes(`[scl.OptFields]`)));
            await element.wizardUI.dialog?.requestUpdate();
            editOptFieldsButton.click();
            await new Promise(resolve => setTimeout(resolve, 100)); // await animation
            const seqNumSelect = (element.wizardUI.dialog?.querySelector('wizard-checkbox[label="seqNum"]'));
            await seqNumSelect.updateComplete;
            expect(seqNumSelect).to.exist;
        });
        it('removes the ReportControl element and its referenced elements on remove button click', async () => {
            expect(doc.querySelector('IED[name="IED2"] LN[lnClass="XSWI"] ReportControl[name="ReportCb2"]')).to.exist;
            expect(doc.querySelector('IED[name="IED2"] LN[lnClass="XSWI"][inst="1"] DataSet[name="dataSet"]')).to.exist;
            const deleteElement = (Array.from(element.wizardUI.dialog.querySelectorAll('mwc-menu > mwc-list-item')).find(item => item.innerHTML.includes(`[remove]`)));
            await element.wizardUI.dialog?.requestUpdate();
            deleteElement.click();
            expect(doc.querySelector('IED[name="IED2"] LN[lnClass="XSWI"][inst="1"] ReportControl[name="ReportCb2"]')).to.not.exist;
            expect(doc.querySelector('IED[name="IED2"] LN[lnClass="XSWI"][inst="1"] DataSet[name="dataSet"]')).to.not.exist;
        });
        it('opens a IEDs selector wizard on copy to other IEDs meu action', async () => {
            const copyMenuAction = (Array.from(element.wizardUI.dialog.querySelectorAll('mwc-menu > mwc-list-item')).find(item => item.innerHTML.includes(`[controlblock.label.copy]`)));
            await element.wizardUI.dialog?.requestUpdate();
            copyMenuAction.click();
            await new Promise(resolve => setTimeout(resolve, 100)); // await animation
            const iedsPicker = element.wizardUI.dialog?.querySelector('filtered-list');
            expect(iedsPicker).to.exist;
            expect(iedsPicker.multi).to.be.true;
        });
    });
    describe('defines a selector wizard to select ReportControl parent', () => {
        let iEDPicker;
        beforeEach(async () => {
            const wizard = reportControlParentSelector(doc);
            element.dispatchEvent(newWizardEvent(() => wizard));
            await element.requestUpdate();
            iEDPicker = (element.wizardUI.dialog?.querySelector('finder-list'));
            primaryAction = (element.wizardUI.dialog?.querySelector('mwc-button[slot="primaryAction"]'));
        });
        it('opens a potential list of host IEDs for the ReportControl element', () => expect(iEDPicker).to.exist);
        it('is not of type multi', () => expect(iEDPicker.multi).to.be.false);
        it('forwards LN0/LN as parent to ReportControl create wizard', async () => {
            expect(doc
                .querySelector('IED[name="IED3"]')
                ?.querySelectorAll('LN0 > ReportControl')).to.have.lengthOf(1);
            iEDPicker.path = ['IED: IED3'];
            primaryAction.click();
            await new Promise(resolve => setTimeout(resolve, 100)); // await animation
            const nameField = (element.wizardUI.dialog?.querySelector('wizard-textfield[label="name"]'));
            expect(nameField).to.exist;
            (element.wizardUI.dialogs[3]?.querySelector('mwc-button[slot="primaryAction"]')).click();
            await new Promise(resolve => setTimeout(resolve, 100)); // await animation
            expect(doc
                .querySelector('IED[name="IED3"]')
                ?.querySelectorAll('LN0 > ReportControl')).to.have.lengthOf(2);
        });
    });
    describe('defines a selector wizard to select ReportControl copy to sink', () => {
        let iedsPicker;
        let listItem;
        beforeEach(async () => {
            const sourceReportControl = doc.querySelector('IED[name="IED2"] ReportControl[name="ReportCb"]');
            const wizard = reportControlCopyToIedSelector(sourceReportControl);
            element.dispatchEvent(newWizardEvent(() => wizard));
            await element.requestUpdate();
            iedsPicker = (element.wizardUI.dialog?.querySelector('filtered-list'));
            primaryAction = (element.wizardUI.dialog?.querySelector('mwc-button[slot="primaryAction"]'));
        });
        it('opens a potential list of sink IEDs for the copy operation', () => expect(iedsPicker).to.exist);
        describe('with a sink IED not meeting any of the data references', () => {
            beforeEach(async () => {
                listItem = (iedsPicker.items.find(item => item.value.includes('IED4')));
                await element.requestUpdate();
            });
            it('disables the list item', () => expect(listItem.disabled).to.be.true);
            it('does not copy the control block ', async () => {
                listItem.selected = true;
                await listItem.requestUpdate();
                primaryAction.click();
                expect(doc.querySelector('IED[name="IED4"] ReportControl')).to.not
                    .exist;
            });
        });
        describe('with a sink IED meeting partially the data references', () => {
            beforeEach(async () => {
                listItem = (iedsPicker.items.find(item => item.value.includes('IED5')));
                await element.requestUpdate();
                await listItem.requestUpdate();
            });
            it('list item is selectable', () => expect(listItem.disabled).to.be.false);
            it('does copy the control block ', async () => {
                listItem.selected = true;
                await listItem.requestUpdate();
                primaryAction.click();
                expect(doc.querySelector('IED[name="IED5"] ReportControl')).to.exist;
            });
            it('removes non referenced data from the DataSet the control block ', async () => {
                listItem.selected = true;
                await listItem.requestUpdate();
                primaryAction.click();
                const rpControl = doc.querySelector('IED[name="IED5"] ReportControl');
                const dataSet = doc.querySelector(`IED[name="IED5"] DataSet[name="${rpControl.getAttribute('datSet')}"]`);
                expect(dataSet).to.exist;
                expect(dataSet.children).to.have.lengthOf(3);
            });
        });
        describe('with a sink IED already containing ReportControl', () => {
            beforeEach(async () => {
                listItem = (iedsPicker.items.find(item => item.value.includes('IED4')));
                await element.requestUpdate();
            });
            it('list item is disabled', () => expect(listItem.disabled).to.be.true);
            it('does not copy report control block nor DataSet ', async () => {
                listItem.selected = true;
                await listItem.requestUpdate();
                primaryAction.click();
                const rpControl = doc.querySelector('IED[name="IED6"] ReportControl');
                expect(rpControl.getAttribute('datSet')).to.not.exist;
                const dataSet = doc.querySelector(`IED[name="IED6"] DataSet`);
                expect(dataSet).to.not.exist;
            });
        });
        describe('with a sink IED already containing DataSet', () => {
            beforeEach(async () => {
                listItem = (iedsPicker.items.find(item => item.value.includes('IED7')));
                await element.requestUpdate();
            });
            it('does not copy report control block nor DataSet ', async () => {
                listItem.selected = true;
                await listItem.requestUpdate();
                primaryAction.click();
                const rpControl = doc.querySelector('IED[name="IED7"] ReportControl');
                expect(rpControl).to.not.exist;
                const dataSet = doc.querySelector(`IED[name="IED7"] DataSet`);
                expect(dataSet?.children).to.have.lengthOf(3);
            });
        });
    });
    describe('defines a create wizards that', () => {
        let primaryAction;
        beforeEach(async () => {
            const wizard = createReportControlWizard(doc.querySelector('LN0'));
            element.dispatchEvent(newWizardEvent(() => wizard));
            await element.requestUpdate();
            primaryAction = (element.wizardUI.dialogs[3]?.querySelector('mwc-button[slot="primaryAction"]'));
        });
        it('creates a new instance of a ReportControl element', () => {
            expect(doc
                .querySelector('IED[name="IED2"]')
                ?.querySelectorAll('LN0 > ReportControl')).to.have.lengthOf(1);
            primaryAction.click();
            expect(doc
                .querySelector('IED[name="IED2"]')
                ?.querySelectorAll('LN0 > ReportControl')).to.have.lengthOf(2);
        });
        it('creates a new instance of a DataSet element referenced from ReportControl', () => {
            expect(doc
                .querySelector('IED[name="IED2"]')
                ?.querySelectorAll('LN0 > DataSet')).to.have.lengthOf(1);
            primaryAction.click();
            expect(doc
                .querySelector('IED[name="IED2"]')
                ?.querySelectorAll('LN0 > DataSet')).to.have.lengthOf(2);
        });
    });
});
//# sourceMappingURL=reportcontrol-wizarding-editing.test.js.map