import { html, fixture, expect } from '@open-wc/testing';

import { OpenScd } from '../src/open-scd.js';

describe('open-scd', () => {
  let element: OpenScd;
  beforeEach(async () => {
    element = await fixture(html` <open-scd></open-scd> `);
  });

  it('renders a progress bar', () => {
    const linearProgress: HTMLElement = <HTMLElement>(
      element.shadowRoot!.querySelector('mwc-linear-progress')!
    );
    expect(linearProgress).to.exist;
  });

  it('toggles a drawer on menu button click', () => {
    const drawer = element.shadowRoot!.querySelector('mwc-drawer');
    expect(drawer).to.exist;
    expect(drawer).to.not.be.visible;
    const menuButton = <HTMLElement>(
      element.shadowRoot!.querySelector(
        'mwc-icon-button[slot="navigationIcon"]'
      )
    );
    menuButton.click();
    expect(drawer).to.be.visible;
    menuButton.click();
    expect(drawer).to.not.be.visible;
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
