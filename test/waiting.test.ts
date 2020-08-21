import { html, fixture, expect } from '@open-wc/testing';
import { newPendingStateEvent } from '../src/foundation.js';
import { WaitingElement } from '../src/waiting.js';

import './mock-waiter.js';
import { cre, del, mov, upd } from './mock-actions.js';
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
});
