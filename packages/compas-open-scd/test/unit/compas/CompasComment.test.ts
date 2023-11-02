import { expect, fixture, html } from '@open-wc/testing';

import { CompasCommentElement } from '../../../src/compas/CompasComment.js';
import '../../../src/compas/CompasComment.js';

describe('compas-comment', () => {
  let element: CompasCommentElement;
  beforeEach(async () => {
    element = await fixture(html`<compas-comment></compas-comment>`);
  });

  it('will be valid', () => {
    // When nothing entered it will also be valid.
    expect(element.valid()).to.be.true;

    element.value = 'Some comments';
    expect(element.valid()).to.be.true;
  });

  it('will return entered value', () => {
    const value = 'Some comments';
    element.value = value;

    expect(element.value).to.be.equal(value);
  });

  it('looks like the latest snapshot', async () => {
    await expect(element).shadowDom.to.equalSnapshot();
  });
});
