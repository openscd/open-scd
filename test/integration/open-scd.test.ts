import { expect, fixture, html } from '@open-wc/testing';

import '../../src/open-scd.js';

import { newEmptySCD } from '../../src/schemas.js';
import { OpenSCD } from '../../src/open-scd.js';

describe('open-scd', () => {
  let element: OpenSCD;

  beforeEach(async () => {
    localStorage.clear();

    element = await fixture(html`
      <open-scd></open-scd>

      <link href="public/google/fonts/roboto-v27.css" rel="stylesheet" />
      <link href="public/google/fonts/roboto-mono-v13.css" rel="stylesheet" />
      <link
        href="public/google/icons/material-icons-outlined.css"
        rel="stylesheet"
      />
    `);
    await element.updateComplete;
  });

  it('looks like its snapshot', async () => {
    await expect(element).shadowDom.to.equalSnapshot();
  });

  it('opens the menu on navigation icon click', async () => {
    const menu = element.shadowRoot!.querySelector('mwc-drawer')!;
    expect(menu).property('open').to.be.false;
    const menuButton = <HTMLElement>(
      element.shadowRoot!.querySelector(
        'mwc-icon-button[slot="navigationIcon"]'
      )
    );
    await menuButton.click();
    expect(menu).property('open').to.be.true;
  });

  it('opens the log on log icon click', async () => {
    expect(element.logUI).to.have.property('open', false);
    await (<HTMLElement>(
      element.shadowRoot!.querySelector('mwc-icon-button[icon="history"]')!
    )).click();
    expect(element.logUI).to.have.property('open', true);
  });

  it('opens the log on snackbar button click', async () => {
    expect(element.logUI).to.have.property('open', false);
    await element.errorUI.querySelector('mwc-button')!.click();
    expect(element.logUI).to.have.property('open', true);
  });

  it('opens the diagnostics on snackbar button click', async () => {
    expect(element.diagnosticUI).to.have.property('open', false);
    await element.issueUI.querySelector('mwc-button')!.click();
    expect(element.diagnosticUI).to.have.property('open', true);
  });

  it('renders a progress indicator on `waiting`', async () => {
    const progressBar = element.shadowRoot!.querySelector(
      'mwc-linear-progress[indeterminate]'
    );
    expect(progressBar).property('closed').to.be.true;
    element.waiting = true;
    await element.updateComplete;
    expect(progressBar).property('closed').to.be.false;
    element.waiting = false;
    await element.updateComplete;
    expect(progressBar).property('closed').to.be.true;
  });

  it('revokes `src="blob:..."` URLs after parsing', async () => {
    const emptyBlobURL = URL.createObjectURL(
      new Blob(
        [new XMLSerializer().serializeToString(newEmptySCD('id', '2007B'))],
        {
          type: 'application/xml',
        }
      )
    );
    expect(await fetch(emptyBlobURL)).to.be.ok;
    element.setAttribute('src', emptyBlobURL);
    await element.workDone;
    expect(element.src).to.be.a('string').and.equal(emptyBlobURL);
    expect(async () => await fetch(emptyBlobURL)).to.throw;
  });
}).timeout(4000);
