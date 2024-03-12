import { expect, fixture, html } from '@open-wc/testing';
import '../../mock-wizard-editor.js';
import '../../../src/editors/substation/zeroline-pane.js';
describe('clientln wizards', () => {
    let doc;
    let parent;
    let element;
    beforeEach(async () => {
        doc = await fetch('/test/testfiles/comm-map.scd')
            .then(response => response.text())
            .then(str => new DOMParser().parseFromString(str, 'application/xml'));
        parent = await fixture(html `<mock-wizard-editor
        ><zeroline-pane .doc=${doc}></zeroline-pane
      ></mock-wizard-editor>`);
        await parent.updateComplete;
        element = parent.querySelector('zeroline-pane');
        await element.updateComplete;
        element.showieds.click();
        await element.requestUpdate();
    });
    describe('createClientLnWizard', () => {
        let ied1;
        let primaryAction;
        let reportCbs;
        let logicalnodes;
        beforeEach(async () => {
            if (!element.showieds.on)
                element.showieds.click();
            await new Promise(resolve => setTimeout(resolve, 100)); // await animation
            ied1 = element.shadowRoot.querySelector('ied-editor');
            ied1.connectReport.click();
            await parent.updateComplete;
            await new Promise(resolve => setTimeout(resolve, 100)); // await animation
            primaryAction = parent.wizardUI.dialog.querySelector('mwc-button[slot="primaryAction"]');
            reportCbs =
                parent.wizardUI.dialog.querySelector('#sourcelist').items;
            logicalnodes =
                parent.wizardUI.dialog.querySelector('#sinklist').items;
        });
        it('looks like the latest snapshot', async () => {
            await expect(parent.wizardUI.dialog).to.equalSnapshot();
        }).timeout(5000);
        it('add ClientLN referencing to logical nodes in AccessPoint', async () => {
            expect(doc.querySelector('IED[name="IED2"] ReportControl[name="ReportEmpty"] ClientLN'))?.to.not.exist;
            reportCbs[2].click();
            logicalnodes[0].click();
            await parent.updateComplete;
            primaryAction.click();
            await parent.updateComplete;
            expect(doc.querySelector('IED[name="IED2"] ReportControl[name="ReportEmpty"] ClientLN[iedName="IED1"][apRef="P1"][prefix="DC"][lnClass="CILO"][lnInst="1"]'))?.to.exist;
        });
        it('does not add an already existing ClientLN referencing to logical nodes in AccessPoint', async () => {
            expect(doc.querySelectorAll('IED[name="IED2"] ReportControl[name="ReportCb"] ClientLN[iedName="IED1"][apRef="P1"][prefix="DC"][lnClass="CILO"][lnInst="1"]').length)?.to.equal(1);
            reportCbs[0].click();
            logicalnodes[0].click();
            await parent.updateComplete;
            primaryAction.click();
            await parent.updateComplete;
            expect(doc.querySelectorAll('IED[name="IED2"] ReportControl[name="ReportCb"] ClientLN[iedName="IED1"][apRef="P1"][prefix="DC"][lnClass="CILO"][lnInst="1"]').length)?.to.equal(1);
        });
        it('add ClientLN referencing to LN0', async () => {
            expect(doc.querySelector('IED[name="IED2"] ReportControl[name="ReportEmpty"] ClientLN'))?.to.not.exist;
            reportCbs[2].click();
            logicalnodes[14].click();
            await parent.updateComplete;
            primaryAction.click();
            await parent.updateComplete;
            expect(doc.querySelector('IED[name="IED2"] ReportControl[name="ReportEmpty"] ClientLN[iedName="IED1"][apRef="P1"][ldInst="Disconnectors"][lnClass="LLN0"]'))?.to.exist;
        });
        it('does not add an already existing ClientLN referencing to LN0', async () => {
            expect(doc.querySelectorAll('IED[name="IED2"] ReportControl[name="ReportCb"] ' +
                'ClientLN[iedName="IED3"][apRef="P1"][ldInst="Disconnectors"][lnClass="LLN0"]').length)?.to.equal(1);
            reportCbs[0].click();
            logicalnodes[14].click();
            await parent.updateComplete;
            primaryAction.click();
            await parent.updateComplete;
            expect(doc.querySelectorAll('IED[name="IED2"] ReportControl[name="ReportCb"] ClientLN[iedName="IED3"][apRef="P1"][ldInst="Disconnectors"][lnClass="LLN0"]').length)?.to.equal(1);
        });
        it('add ClientLN referencing to logical nodes located in logical devices', async () => {
            expect(doc.querySelector('IED[name="IED2"] ReportControl[name="ReportEmpty"] ClientLN'))?.to.not.exist;
            reportCbs[2].click();
            logicalnodes[5].click();
            await parent.updateComplete;
            primaryAction.click();
            await parent.updateComplete;
            expect(doc.querySelector('IED[name="IED2"] ReportControl[name="ReportEmpty"] ClientLN[iedName="IED1"][apRef="P1"][ldInst="Disconnectors"][prefix="DC"][lnClass="XSWI"][lnInst="1"]'))?.to.exist;
        });
        it('does not add an already existing ClientLN referencing to to logical nodes located in logical devices', async () => {
            expect(doc.querySelectorAll('IED[name="IED2"] ReportControl[name="ReportCb"] ClientLN[iedName="IED1"][apRef="P1"][ldInst="CircuitBreaker_CB1"][lnClass="XCBR"][lnInst="1"]').length)?.to.equal(1);
            reportCbs[0].click();
            logicalnodes[0].click();
            await parent.updateComplete;
            primaryAction.click();
            await parent.updateComplete;
            expect(doc.querySelectorAll('IED[name="IED2"] ReportControl[name="ReportCb"] ClientLN[iedName="IED1"][apRef="P1"][ldInst="CircuitBreaker_CB1"][lnClass="XCBR"][lnInst="1"]').length)?.to.equal(1);
        });
        it('disabled report control blocks when the number of ClientLns reach the max attribute', async () => {
            expect(reportCbs[1]).to.have.attribute('disabled');
        });
    }).timeout(5000);
    describe('selectClientLnWizard', () => {
        let commMappings;
        beforeEach(async () => {
            element.commmap.click();
            await parent.updateComplete;
            await new Promise(resolve => setTimeout(resolve, 100)); // await animation
            commMappings = (parent.wizardUI.dialog?.querySelector('filtered-list'));
            commMappings.items[1].click();
            await parent.updateComplete;
            await parent.wizardUI.updateComplete;
        });
        it('looks like the latest snapshot', async () => {
            await expect(parent.wizardUI.dialog).to.equalSnapshot();
        });
        it('filteres ClientLNs to one receiving IED', async () => {
            expect(parent.wizardUI.dialog?.querySelectorAll('mwc-check-list-item').length).to.equal(doc.querySelectorAll('IED[name="IED2"] ReportControl ClientLN[iedName="IED1"]').length);
        });
        it('allowes to remove ClientLNs', async () => {
            (parent.wizardUI.dialog?.querySelector('filtered-list')).items[2].click();
            await parent.updateComplete;
            (parent.wizardUI.dialog?.querySelector('mwc-button[slot="primaryAction"]')).click();
            await parent.updateComplete;
            expect(doc.querySelector('ClientLN[iedName="IED1"][ldInst="CircuitBreaker_CB1"][lnClass="CSWI"]')).to.be.null;
        });
    });
}).timeout(5000);
//# sourceMappingURL=clientln.test.js.map