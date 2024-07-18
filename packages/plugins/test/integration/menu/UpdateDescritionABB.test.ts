import { expect, fixture, html } from '@open-wc/testing';

import '@openscd/open-scd/test/mock-open-scd.js';
import { MockOpenSCD } from '@openscd/open-scd/test/mock-open-scd.js';

import UpdateDescriptionAbb from '../../../src/menu/UpdateDescriptionABB.js';

describe('Update method for desc attributes in ABB IEDs', () => {
  if (customElements.get('update-description-abb') === undefined)
    customElements.define('update-description-abb', UpdateDescriptionAbb);

  let parent: MockOpenSCD;
  let element: UpdateDescriptionAbb;
  let doc: XMLDocument;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/updatedesc/updatedescABB.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    parent = await fixture(html`
      <mock-open-scd
        ><update-description-abb></update-description-abb
      ></mock-open-scd>
    `);

    element = parent.getActivePlugin();

    element.doc = doc;
    element.run();
    await parent.requestUpdate();
  });

  it('creates desc attributes for ExtRef elements with existing intAddr attribute', async () => {
    expect(
      doc.querySelector(
        'IED[name="IED1"] LN[lnClass="CSWI"][inst="1"] ExtRef:not([desc])'
      )
    ).to.exist;
    parent.wizardUI?.dialog
      ?.querySelector<HTMLElement>('mwc-button[slot="primaryAction"]')!
      .click();
    await parent.updateComplete;
    expect(
      doc.querySelector(
        'IED[name="IED1"] LN[lnClass="CSWI"][inst="1"] ExtRef[desc="GOOSERCV_BIN.3.I1"]'
      )
    ).to.exist;
  });

  it('does not create desc attributes for ExtRef elements with missing intAddr attribute', async () => {
    expect(
      doc.querySelector(
        'IED[name="IED1"] LN[lnClass="CSWI"][inst="2"] ExtRef:not([desc])'
      )
    ).to.exist;
    parent.wizardUI?.dialog
      ?.querySelector<HTMLElement>('mwc-button[slot="primaryAction"]')!
      .click();
    await parent.updateComplete;
    expect(
      doc.querySelector(
        'IED[name="IED1"] LN[lnClass="CSWI"][inst="2"] ExtRef:not([desc])'
      )
    ).to.exist;
  });
});
