import { expect, fixture, html } from '@open-wc/testing';

import GooseSubscriberDataBinding from '../../../src/editors/GooseSubscriberDataBinding.js';

describe('SMV Subscribe Data Binding Plugin', () => {
  customElements.define(
    'goose-subscriber-data-binding-plugin',
    GooseSubscriberDataBinding
  );

  let element: GooseSubscriberDataBinding;
  let doc: XMLDocument;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/editors/DataBindingGOOSE2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = await fixture(
      html`<goose-subscriber-data-binding-plugin
        .doc="${doc}"
      ></goose-subscriber-data-binding-plugin>`
    );
  });

  it('looks like the latest snapshot', async () => {
    await expect(element).shadowDom.to.equalSnapshot();
  });
});
