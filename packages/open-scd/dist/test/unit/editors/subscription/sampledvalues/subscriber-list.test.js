import { html, fixture, expect } from '@open-wc/testing';
import '../../../../../src/editors/subscription/sampledvalues/subscriber-list.js';
describe('subscriber-list-smv', () => {
    let element;
    let validSCL;
    beforeEach(async () => {
        validSCL = await fetch('/test/testfiles/valid2007B4.scd')
            .then(response => response.text())
            .then(str => new DOMParser().parseFromString(str, 'application/xml'));
        element = await fixture(html `<subscriber-list-smv
      .doc=${validSCL}
    ></subscriber-list-smv>`);
    });
    it('initially looks like the latest snapshot', async () => {
        await expect(element).shadowDom.to.equalSnapshot();
    });
});
//# sourceMappingURL=subscriber-list.test.js.map