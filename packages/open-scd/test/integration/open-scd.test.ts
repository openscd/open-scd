import { expect, fixture, html } from '@open-wc/testing';

import '../../src/open-scd.js';
import { newEmptySCD } from '../../src/schemas.js';
import { OpenSCD } from '../../src/open-scd.js';
import { OscdWaiter } from '../../src/addons/Waiter.js';
import { OscdHistory } from '../../src/addons/History.js';
import { OscdLayout } from '../../src/addons/Layout.js';

describe('open-scd', () => {
  let element: OpenSCD;
  let historyAddon: OscdHistory;
  let layoutAddon: OscdLayout;
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
    historyAddon = element.shadowRoot?.querySelector('oscd-history') as OscdHistory;
    layoutAddon = element.shadowRoot?.querySelector('oscd-layout') as OscdLayout;
  });

  it('looks like its snapshot', async () => {
    await expect(element).shadowDom.to.equalSnapshot();
  });

  describe('layout', () => {
    it('looks like its snapshot', async () => {
      await expect(layoutAddon).shadowDom.to.equalSnapshot();
    });
  });

  it('opens the menu on navigation icon click', async () => {
    const menu = layoutAddon.shadowRoot!.querySelector('mwc-drawer')!;
    expect(menu).property('open').to.be.false;
    const menuButton = <HTMLElement>(
      layoutAddon.shadowRoot!.querySelector(
        'mwc-icon-button[slot="navigationIcon"]'
      )
    );
    await menuButton.click();
    expect(menu).property('open').to.be.true;
  });

  it('opens the log on log icon click', async () => {
    expect(historyAddon.logUI).to.have.property('open', false);
    await (<HTMLElement>(
      layoutAddon.shadowRoot!.querySelector('mwc-icon-button[icon="list"]')!
    )).click();
    expect(historyAddon.logUI).to.have.property('open', true);
  });

  it('opens the history on history icon click', async () => {
    expect(historyAddon.historyUI).to.have.property('open', false);
    await (<HTMLElement>(
      layoutAddon.shadowRoot!.querySelector('mwc-icon-button[icon="history"]')!
    )).click();
    expect(historyAddon.historyUI).to.have.property('open', true);
  });

  it('opens the log on snackbar button click', async () => {
    expect(historyAddon.logUI).to.have.property('open', false);
    await historyAddon.errorUI.querySelector('mwc-button')!.click();
    expect(historyAddon.logUI).to.have.property('open', true);
  });

  it('opens the diagnostics on snackbar button click', async () => {
    expect(historyAddon.diagnosticUI).to.have.property('open', false);
    await historyAddon.issueUI.querySelector('mwc-button')!.click();
    expect(historyAddon.diagnosticUI).to.have.property('open', true);
  });

  /**
   * @deprecated
   * Remove this integration test. It's no longer an integration test but an E2E test.
   */
  it('renders a progress indicator on `waiting`', async () => {
    const waiter: OscdWaiter =
      element.shadowRoot!.querySelector<OscdWaiter>('oscd-waiter')!;
    const progressBar = waiter.shadowRoot!.querySelector(
      'mwc-linear-progress[indeterminate]'
    )!;
    expect(progressBar).property('closed').to.be.true;

    waiter.waiting = true;
    await waiter.updateComplete;
    expect(progressBar).property('closed').to.be.false;
    waiter.waiting = false;
    await waiter.updateComplete;
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
    await element.updateComplete;
    expect(element.src).to.be.a('string').and.equal(emptyBlobURL);
    expect(async () => await fetch(emptyBlobURL)).to.throw;
  });

  it('renders menu plugins passed down as props and it looks like its snapshot', async () => {
    element = await fixture(html`
      <open-scd
        .plugins=${{
          menu: [
            {
              name: 'Top Mock Plugin',
              src: 'https://mockup-plugin.url/plugin-top.js',
              icon: 'link',
              active: true,
              requireDoc: false,
              position: 'top',
            },
            {
              name: 'Middle Mock Plugin',
              src: 'https://mockup-plugin.url/plugin-middle.js',
              icon: 'link',
              active: true,
              requireDoc: false,
              position: 'middle',
            },
            {
              name: 'Bottom Mock Plugin',
              src: 'https://mockup-plugin.url/plugin-bottom.js',
              icon: 'link',
              active: true,
              position: 'bottom',
            },
          ],
          editor: [],
        }}
      ></open-scd>

      <link href="public/google/fonts/roboto-v27.css" rel="stylesheet" />
      <link href="public/google/fonts/roboto-mono-v13.css" rel="stylesheet" />
      <link
        href="public/google/icons/material-icons-outlined.css"
        rel="stylesheet"
      />
    `);
    layoutAddon = element.shadowRoot?.querySelector('oscd-layout') as OscdLayout;
    element.requestUpdate();

    await expect(layoutAddon).shadowDom.to.equalSnapshot();
  });

  it('renders editor plugins passed down as props and it looks like its snapshot', async () => {
    element = await fixture(html`
      <open-scd
        .plugins=${{
          menu: [],
          editor: [
            {
              name: 'Mock Editor Plugin',
              src: 'https://mockup-plugin.url/editor-plugin.js',
              icon: 'link',
              active: true,
              requireDoc: true,
            },
          ],
        }}
      ></open-scd>

      <link href="public/google/fonts/roboto-v27.css" rel="stylesheet" />
      <link href="public/google/fonts/roboto-mono-v13.css" rel="stylesheet" />
      <link
        href="public/google/icons/material-icons-outlined.css"
        rel="stylesheet"
      />
    `);
    layoutAddon = element.shadowRoot?.querySelector('oscd-layout') as OscdLayout;
    element.requestUpdate();

    await expect(layoutAddon).shadowDom.to.equalSnapshot();
  });
}).timeout(4000);
