import { fixture, html, expect } from '@open-wc/testing';
import { spy } from 'sinon';
import '../../../../src/editors/substation/ied-editor.js';
describe('A component to visualize SCL element IED', () => {
    let element;
    let validSCL;
    let wizardEvent;
    beforeEach(async () => {
        validSCL = await fetch('/test/testfiles/valid2007B4.scd')
            .then(response => response.text())
            .then(str => new DOMParser().parseFromString(str, 'application/xml'));
        element = (await fixture(html `<ied-editor
          .element=${validSCL.querySelector('IED')}
        ></ied-editor>`));
        wizardEvent = spy();
        window.addEventListener('wizard', wizardEvent);
    });
    it('looks like the latest snapshot', async () => {
        await expect(element).shadowDom.to.equalSnapshot();
    });
    it('renders label UNDEFINED in case IED name attribute is missing', async () => {
        const condEq = validSCL.querySelector('IED');
        condEq?.removeAttribute('name');
        await element.requestUpdate();
        expect(element).to.have.property('name', 'UNDEFINED');
    });
    it('triggers select wizard for GSEControl element on action button click', async () => {
        (element.shadowRoot?.querySelector('mwc-fab[class="selectgse"]')).click();
        await element.requestUpdate();
        expect(wizardEvent).to.have.be.calledOnce;
        expect(wizardEvent.args[0][0].detail.wizard()[0].title).to.contain('select');
    });
    it('triggers select wizard for SampledValueControl element on action button click', async () => {
        (element.shadowRoot?.querySelector('mwc-fab[class="selectsmv"]')).click();
        await element.requestUpdate();
        expect(wizardEvent).to.have.be.calledOnce;
        expect(wizardEvent.args[0][0].detail.wizard()[0].title).to.contain('select');
    });
    it('triggers select wizard for ReportControl element on action button click', async () => {
        (element.shadowRoot?.querySelector('mwc-fab[class="selectreport"]')).click();
        await element.requestUpdate();
        expect(wizardEvent).to.have.be.calledOnce;
        expect(wizardEvent.args[0][0].detail.wizard()[0].title).to.contain('select');
    });
    it('triggers reference wizard for removing IED on action button click', async () => {
        (element.shadowRoot?.querySelector('mwc-fab[class="delete"]')).click();
        await element.requestUpdate();
        expect(wizardEvent).to.have.be.calledOnce;
        expect(wizardEvent.args[0][0].detail.wizard()[0].title).to.contain('delete');
    });
    it('triggers create wizard for ClientLN element on action button click', async () => {
        (element.shadowRoot?.querySelector('mwc-fab[class="connectreport"]')).click();
        await element.requestUpdate();
        expect(wizardEvent).to.have.be.calledOnce;
        expect(wizardEvent.args[0][0].detail.wizard()[0].title).to.contain('connectToIED');
    });
    it('still triggers create wizard for ClientLN element with missing parent', async () => {
        const copyElement = element.cloneNode(true);
        element.element = copyElement;
        await element.requestUpdate();
        (element.shadowRoot?.querySelector('mwc-fab[class="connectreport"]')).click();
        await element.requestUpdate();
        expect(wizardEvent).to.have.been.calledOnce;
        expect(wizardEvent.args[0][0].detail.wizard()[0].title).to.contain('connectToIED');
    });
});
//# sourceMappingURL=ied-editor.test.js.map