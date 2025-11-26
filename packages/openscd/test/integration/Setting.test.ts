import { expect, fixture, html } from '@open-wc/testing';

import { newLoadNsdocEvent } from '@openscd/core/foundation/deprecated/settings.js';
import '../../src/addons/History.js';
import '../../src/addons/Settings.js';
import { OscdHistory } from '../../src/addons/History.js';
import { OscdSettings } from '../../src/addons/Settings.js';
import { XMLEditor } from '@openscd/core';

describe('Oscd-Settings', () => {
  let logger: OscdHistory;
  let settings: OscdSettings;
  let editor: XMLEditor;

  beforeEach(async () => {
    localStorage.clear();
    editor = new XMLEditor();

    logger = await fixture(
      html`<oscd-history .host=${document} .editor=${editor}>
        <oscd-settings .host=${document}></oscd-settings>
      </oscd-history>`
    );

    settings = logger.querySelector('oscd-settings')!;
  });

  it('upload .nsdoc file using event and looks like latest snapshot', async () => {
    settings.settingsUI.show();
    await settings.settingsUI.updateComplete;

    const nsdocFile = await fetch(
      '/test/testfiles/nsdoc/IEC_61850-7-2.nsdoc'
    ).then(response => response.text());

    settings.dispatchEvent(newLoadNsdocEvent(nsdocFile, 'IEC_61850-7-2.nsdoc'));

    await settings.requestUpdate();
    await settings.updateComplete;

    await logger.updateComplete;

    expect(localStorage.getItem('IEC 61850-7-2')).to.eql(nsdocFile);
    // Create a snapshot of the Settings Dialog only, not the whole Mock Component.
    await expect(
      settings.shadowRoot!.querySelector('mwc-dialog[id="settings"]')
    ).to.equalSnapshot();
  });

  it('upload invalid .nsdoc file using event and log event fired', async () => {
    settings.settingsUI.show();
    await settings.settingsUI.updateComplete;

    const nsdocFile = await fetch('/test/testfiles/nsdoc/invalid.nsdoc').then(
      response => response.text()
    );

    logger.dispatchEvent(newLoadNsdocEvent(nsdocFile, 'invalid.nsdoc'));

    await logger.requestUpdate();
    await logger.updateComplete;

    expect(logger.log.length).to.be.equal(1);
    expect(logger.log[0].title).to.be.equal(
      "Invalid NSDoc (invalid.nsdoc); no 'id' attribute found in file"
    );
  });

  it('upload .nsdoc file with missmatched nsd version using event and log event fired', async () => {
    settings.settingsUI.show();
    await settings.settingsUI.updateComplete;

    const nsdocFile = await fetch('/test/testfiles/nsdoc/IEC_61850-7-2-B-3.nsdoc').then(
      response => response.text()
    );

    logger.dispatchEvent(newLoadNsdocEvent(nsdocFile, 'IEC_61850-7-2-B-3.nsdoc'));

    await logger.requestUpdate();
    await logger.updateComplete;

    expect(logger.log.length).to.be.equal(1);
    expect(logger.log[0].title).to.be.equal(
      "The version of IEC 61850-7-2 NSD (2007B5) does not correlate with the version of the corresponding NSDoc (IEC_61850-7-2-B-3.nsdoc, 2007B3)"
    );
  });

  it('upload .nsdoc file with wrong version using event and log event fired', async () => {
    settings.settingsUI.show();
    await settings.settingsUI.updateComplete;

    const nsdocFile = await fetch(
      '/test/testfiles/nsdoc/wrong-version.nsdoc'
    ).then(response => response.text());

    logger.dispatchEvent(newLoadNsdocEvent(nsdocFile, 'wrong-version.nsdoc'));

    await logger.requestUpdate();
    await logger.updateComplete;

    expect(logger.log.length).to.be.equal(1);
    expect(logger.log[0].title).to.be.equal(
      'The version of IEC 61850-7-3 NSD (2007B5) does not correlate ' +
        'with the version of the corresponding NSDoc (wrong-version.nsdoc, 2007B4)'
    );
  });
}).timeout(4000);
