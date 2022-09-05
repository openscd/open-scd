import { expect, fixture, html } from '@open-wc/testing';

import '../mock-setter-logger.js';
import { MockSetterLogger } from '../mock-setter-logger.js';

import { newLoadNsdocEvent } from '../../src/Setting.js';

describe('Setting', () => {
  let element: MockSetterLogger;

  beforeEach(async () => {
    localStorage.clear();

    element = await fixture(html`<mock-setter-logger></mock-setter-logger>`);
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
    // Create a snapshot of the Settings Dialog only, not the whole Mock Component.
    await expect(
      element.shadowRoot!.querySelector('mwc-dialog[id="settings"]')
    ).to.equalSnapshot();
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
