import { expect, fixture, html } from '@open-wc/testing';

import GooseSubscriberLaterBinding from '../../../src/editors/GooseSubscriberLaterBinding.js';

describe('SMV Subscribe Later Binding Plugin', () => {
  customElements.define(
    'goose-subscriber-later-binding-plugin',
    GooseSubscriberLaterBinding
  );

  let element: GooseSubscriberLaterBinding;
  let doc: XMLDocument;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/editors/LaterBindingGOOSE2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = await fixture(
      html`<goose-subscriber-later-binding-plugin
        .doc="${doc}"
      ></goose-subscriber-later-binding-plugin>`
    );
  });

  it('looks like the latest snapshot', async () => {
    await expect(element).shadowDom.to.equalSnapshot();
  });
});
