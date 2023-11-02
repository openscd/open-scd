import { expect, fixture, html } from '@open-wc/testing';

import SMVSubscribeLaterBindingPlugin from '../../../src/editors/SMVSubscriberLaterBinding.js';

describe('SMV Subscribe Later Binding Plugin', () => {
  customElements.define(
    'smv-subscribe-later-binding-plugin',
    SMVSubscribeLaterBindingPlugin
  );

  let element: SMVSubscribeLaterBindingPlugin;
  let doc: XMLDocument;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/editors/LaterBindingSMV2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = await fixture(
      html`<smv-subscribe-later-binding-plugin
        .doc="${doc}"
      ></smv-subscribe-later-binding-plugin>`
    );
  });

  it('looks like the latest snapshot', async () => {
    await expect(element).shadowDom.to.equalSnapshot();
  });
});
