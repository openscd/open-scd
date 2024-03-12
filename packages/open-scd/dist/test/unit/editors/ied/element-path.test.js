import { expect, fixture, html } from '@open-wc/testing';
import '../../../../src/editors/ied/element-path.js';
describe('element-path', () => {
    let element;
    beforeEach(async () => {
        element = await fixture(html `<element-path
      .elementNames=${['IED1', 'AccessPoint1', 'My Little Server']}
    ></element-path>`);
    });
    it('looks like the latest snapshot', async () => {
        await expect(element).shadowDom.to.equalSnapshot();
    });
});
//# sourceMappingURL=element-path.test.js.map