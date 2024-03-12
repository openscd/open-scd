import { html, fixture, expect } from '@open-wc/testing';
import '../../src/addons/Waiter.js';
import { newPendingStateEvent } from '../../src/foundation.js';
describe('OSCD-Waiter', () => {
    let element;
    beforeEach(async () => {
        element = await fixture(html `<oscd-waiter></oscd-waiter>`);
    });
    it('does not wait for pending state initially', () => expect(element).property('waiting').to.be.false);
    it('starts waiting on incoming PendingStateEvent', async () => {
        const promise = new Promise(resolve => setTimeout(() => resolve(), 1500 /* ms */));
        element.dispatchEvent(newPendingStateEvent(promise));
        expect(element).property('waiting').to.be.true;
    });
    it('stops waiting on promise resolution', async () => {
        const promise = new Promise(resolve => setTimeout(() => resolve(), 20 /* ms */));
        element.dispatchEvent(newPendingStateEvent(promise));
        await promise;
        await element.workDone;
        expect(element).property('waiting').to.be.false;
    });
    it('stops waiting on promise rejection', async () => {
        const promise = new Promise((_resolve, reject) => setTimeout(() => reject(), 20 /* ms */));
        element.dispatchEvent(newPendingStateEvent(promise));
        await promise.catch(() => null);
        await element.workDone;
        expect(element).property('waiting').to.be.false;
    });
});
//# sourceMappingURL=Waiting.test.js.map