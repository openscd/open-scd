import { html, fixture, expect } from '@open-wc/testing';

import { newPendingStateEvent } from '../../src/foundation.js';
import { WaitingElement } from '../../src/Waiting.js';

import './mock-waiter.js';

describe('WaitingElement', () => {
  let element: WaitingElement;
  beforeEach(async () => {
    element = <WaitingElement>await fixture(html`<mock-waiter></mock-waiter>`);
  });

  it('does not wait for pending state initially', () =>
    expect(element).property('waiting').to.be.false);

  it('starts waiting on incoming PendingStateEvent', async () => {
    const promise = new Promise<string>(resolve =>
      setTimeout(() => resolve('done'), 1000 /* ms */)
    );
    element.dispatchEvent(newPendingStateEvent(promise));
    expect(element).property('waiting').to.be.true;
  });

  it('stops waiting on promise resolution', async () => {
    const promise = new Promise<string>(resolve =>
      setTimeout(() => resolve('done'), 20 /* ms */)
    );
    element.dispatchEvent(newPendingStateEvent(promise));
    await promise;
    await element.workDone;
    expect(element).property('waiting').to.be.false;
  });

  it('stops waiting on promise rejection', async () => {
    const promise = new Promise<string>((_resolve, reject) =>
      setTimeout(() => reject('done'), 20 /* ms */)
    );
    element.dispatchEvent(newPendingStateEvent(promise));
    await promise.catch(() => null);
    await element.workDone;
    expect(element).property('waiting').to.be.false;
  });
});
