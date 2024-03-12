import { html, fixture, expect } from '@open-wc/testing';
import '../../../../src/editors/protocol104/subnetwork-container.js';
describe('subnetwork-104-container', () => {
    let element;
    let subNetwork;
    beforeEach(async () => {
        const validSCL = await fetch('/test/testfiles/104/valid-subnetwork.scd')
            .then(response => response.text())
            .then(str => new DOMParser().parseFromString(str, 'application/xml'));
        subNetwork = validSCL.querySelector('SubNetwork[name="F1"]');
        element = (await fixture(html `<subnetwork-104-container .element=${subNetwork}></subnetwork-104-container>`));
    });
    it('looks like the latest snapshot', async () => {
        await expect(element).shadowDom.to.equalSnapshot();
    });
});
//# sourceMappingURL=subnetwork-container.test.js.map