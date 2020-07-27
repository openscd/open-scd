import { html, fixture, expect } from '@open-wc/testing';

import { OpenScd } from '../src/open-scd.js';
import '../src/open-scd.js';

describe('open-scd', () => {
  let element: OpenScd;
  beforeEach(async () => {
    element = await fixture(html` <open-scd></open-scd> `);
  });

  it('renders a progress bar on `hasPendingChildren`', async () => {
    const progressBar = element.shadowRoot!.querySelector(
      'mwc-linear-progress[indeterminate]'
    );
    expect(progressBar).property('closed').to.be.true;
    element.hasPendingChildren = true;
    await element.updateComplete;
    expect(progressBar).property('closed').to.be.false;
    element.hasPendingChildren = false;
    await element.updateComplete;
    expect(progressBar).property('closed').to.be.true;
  });

  it('toggles a drawer on navigation icon click', async () => {
    console.log('expecting something about', element.shadowRoot);
    const drawer = element.shadowRoot!.querySelector('mwc-drawer')!;
    expect(drawer).property('open').to.be.false;
    const menuButton = <HTMLElement>(
      element.shadowRoot!.querySelector(
        'mwc-icon-button[slot="navigationIcon"]'
      )
    );
    await menuButton.click();
    expect(drawer).property('open').to.be.true;
    await menuButton.click();
    expect(drawer).property('open').to.be.false;
  });

  /*
  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
   */
});
