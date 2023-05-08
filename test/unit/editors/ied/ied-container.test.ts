import { expect, fixture, html } from '@open-wc/testing';

import '../../../../src/editors/ied/ied-container.js';
import { IedContainer } from '../../../../src/editors/ied/ied-container.js';

describe('ied-container', () => {
  let element: IedContainer;
  let validSCL: XMLDocument;

  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/editors/iedEditorWithIEDs.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = await fixture(html`<ied-container
      .element=${validSCL.querySelector('IED[name="IED1"]')}
    ></ied-container>`);
  });

  it('looks like the latest snapshot', async () => {
    await expect(element).shadowDom.to.equalSnapshot();
  });

  it('Should show services icon when Services are available', async () => {
    validSCL = await fetch('/test/testfiles/Services.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = await fixture(html`<ied-container
      .element=${validSCL.querySelector('IED[name="WithServices"]')}
    ></ied-container>`);

    expect(
      element.shadowRoot!.querySelector("mwc-icon-button[icon='settings']")
    ).to.exist;
  });
});
