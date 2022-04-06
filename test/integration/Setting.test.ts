import { html, fixture, expect } from '@open-wc/testing';

import '../../src/open-scd.js';

import { OpenSCD } from '../../src/open-scd.js';
import { newLoadNsdocEvent } from '../../src/Setting.js';

describe('Setting', () => {
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
  });

  it('opens the log on log menu entry click', async () => {
    await (<HTMLElement>(
      element.shadowRoot!.querySelector('mwc-list-item[iconid="history"]')!
    )).click();
    expect(element.logUI).to.have.property('open', true);
  });

  it('upload .nsdoc file using event and looks like latest snapshot', async () => {
    element.settingsUI.show();
    await element.settingsUI.updateComplete;

    const nsdocFile = await fetch(
      '/test/testfiles/nsdoc/IEC_61850-7-2.nsdoc'
    ).then(response => response.text());

    element.dispatchEvent(newLoadNsdocEvent(nsdocFile, 'IEC_61850-7-2.nsdoc'));

    await element.requestUpdate();
    await element.updateComplete;

    expect(localStorage.getItem('IEC 61850-7-2')).to.eql(nsdocFile);
    await expect(element).shadowDom.to.equalSnapshot();
  });

  it('upload invalid .nsdoc file using event and log event fired', async () => {
    element.settingsUI.show();
    await element.settingsUI.updateComplete;

    const nsdocFile = await fetch('/test/testfiles/nsdoc/invalid.nsdoc').then(
      response => response.text()
    );

    element.dispatchEvent(newLoadNsdocEvent(nsdocFile, 'invalid.nsdoc'));

    await element.requestUpdate();
    await element.updateComplete;

    expect(element.history.length).to.be.equal(1);
    expect(element.history[0].title).to.be.equal(
      "Invalid NSDoc (invalid.nsdoc); no 'id' attribute found in file"
    );
  });

  it('upload .nsdoc file with wrong version using event and log event fired', async () => {
    element.settingsUI.show();
    await element.settingsUI.updateComplete;

    const nsdocFile = await fetch(
      '/test/testfiles/nsdoc/wrong-version.nsdoc'
    ).then(response => response.text());

    element.dispatchEvent(newLoadNsdocEvent(nsdocFile, 'wrong-version.nsdoc'));

    await element.requestUpdate();
    await element.updateComplete;

    expect(element.history.length).to.be.equal(1);
    expect(element.history[0].title).to.be.equal(
      'The version of IEC 61850-7-3 NSD (2007B3) does not correlate ' +
        'with the version of the corresponding NSDoc (wrong-version.nsdoc, 2007B4)'
    );
  });
}).timeout(4000);
