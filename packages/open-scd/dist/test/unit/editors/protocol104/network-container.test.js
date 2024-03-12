import { expect, fixture, html } from '@open-wc/testing';
import { spy } from 'sinon';
import '../../../../src/editors/protocol104/network-container.js';
describe('network-104-container', () => {
    let element;
    let document;
    let wizardEvent;
    beforeEach(async () => {
        document = await fetch('/test/testfiles/104/valid-subnetwork.scd')
            .then(response => response.text())
            .then(str => new DOMParser().parseFromString(str, 'application/xml'));
        element = await fixture(html `<network-104-container .doc=${document}></network-104-container>`);
        wizardEvent = spy();
        window.addEventListener('wizard', wizardEvent);
    });
    it('looks like the latest snapshot', async () => {
        await expect(element).shadowDom.to.equalSnapshot();
    });
    it('getSubNetworkElements will return a list of SubNetwork elements which is alphabetically ordered', () => {
        const subNetworks = element['getSubNetworkElements']();
        expect(subNetworks.length).to.be.equal(2);
        expect(subNetworks[0].getAttribute('name')).to.be.equal('F1');
        expect(subNetworks[1].getAttribute('name')).to.be.equal('W1');
    });
    it('has a mwc-fab which calls a create SubNetwork wizard dialog', () => {
        element.shadowRoot?.querySelector('mwc-fab').click();
        expect(wizardEvent).to.have.be.calledOnce;
        expect(wizardEvent.args[0][0].detail.wizard()[0].title).to.contain('add');
    });
});
//# sourceMappingURL=network-container.test.js.map