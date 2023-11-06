import { expect, fixture, html } from '@open-wc/testing';

import SMVSubscribeDataBindingPlugin from '../../../src/editors/SMVSubscriberDataBinding.js';

describe('SMV Subscribe Data Binding Plugin', () => {
  customElements.define(
    'smv-subscribe-data-binding-plugin',
    SMVSubscribeDataBindingPlugin
  );

  let element: SMVSubscribeDataBindingPlugin;
  let doc: XMLDocument;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/editors/DataBindingSMV2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = await fixture(
      html`<smv-subscribe-data-binding-plugin
        .doc="${doc}"
      ></smv-subscribe-data-binding-plugin>`
    );
  });

  it('looks like the latest snapshot', async () => {
    await expect(element).shadowDom.to.equalSnapshot();
  });
});
