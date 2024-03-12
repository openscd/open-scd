import { expect, fixture, html } from '@open-wc/testing';
import '../../../mock-wizard-editor.js';
import '../../../../src/editors/substation/zeroline-pane.js';
describe('zeroline-pane wizarding editing integration', () => {
    let doc;
    let parent;
    let zeroline;
    beforeEach(async () => {
        doc = await fetch('/test/testfiles/comm-map.scd')
            .then(response => response.text())
            .then(str => new DOMParser().parseFromString(str, 'application/xml'));
        parent = (await fixture(html `<mock-wizard-editor
          ><zeroline-pane .doc=${doc}></zeroline-pane
        ></mock-wizard-editor>`));
        zeroline = parent.querySelector('zeroline-pane');
        await parent.updateComplete;
    });
    it('opens selectGseControlWizard for the complete SCL file', async () => {
        zeroline.gsecontrol.click();
        await parent.updateComplete;
        await parent.wizardUI.updateComplete;
        expect(parent.wizardUI.dialog).to.exist;
        const gseControlList = (parent.wizardUI.dialog?.querySelector('filtered-list'));
        await gseControlList.updateComplete;
        expect(gseControlList.items.length).to.equal(doc.querySelectorAll('GSEControl').length);
    });
    it('opens selectSampledValueControlWizard for the complete SCL file', async () => {
        zeroline.smvcontrol.click();
        await parent.updateComplete;
        await parent.wizardUI.updateComplete;
        expect(parent.wizardUI.dialog).to.exist;
        const smvControlList = (parent.wizardUI.dialog?.querySelector('filtered-list'));
        await smvControlList.updateComplete;
        expect(smvControlList.items.length).to.equal(doc.querySelectorAll('SampledValueControl').length);
    });
    it('opens select wizard for SCL element ReportControl for the complete project', async () => {
        zeroline.reportcontrol.click();
        await parent.updateComplete;
        await parent.wizardUI.updateComplete;
        expect(parent.wizardUI.dialog).to.exist;
        const reportControlList = (parent.wizardUI.dialog?.querySelector('filtered-list'));
        await reportControlList.updateComplete;
        expect(reportControlList.items.length).to.equal(doc.querySelectorAll('ReportControl').length);
    });
    it('add Substation element with add button', async () => {
        expect(doc.querySelector('Substation[name="newSubstation"]')).to.not.exist;
        zeroline.addButton.click();
        zeroline.addMenu.querySelector('[value=Substation]').click();
        await parent.updateComplete;
        await parent.wizardUI.updateComplete;
        const primaryAction = (parent.wizardUI.dialog?.querySelector('mwc-button[slot="primaryAction"]'));
        await primaryAction.updateComplete;
        const nameField = (parent.wizardUI.dialog?.querySelector('wizard-textfield[label="name"]'));
        nameField.value = 'newSubstation';
        await nameField.updateComplete;
        primaryAction.click();
        expect(doc.querySelector('Substation[name="newSubstation"]')).to.exist;
    });
});
//# sourceMappingURL=zeroline-pane.test.js.map