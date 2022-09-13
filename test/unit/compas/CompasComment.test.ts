import { expect, fixture, html } from '@open-wc/testing';
import { WizardTextField } from '../../../src/wizard-textfield.js';

import { CompasCommentElement } from '../../../src/compas/CompasComment.js';
import '../../../src/compas/CompasComment.js';

describe('compas-comment', () => {
  let element: CompasCommentElement;
  beforeEach(async () => {
    element = await fixture(html`<compas-comment></compas-comment>`);
  });

  it('will always be valid', () => {
    // When nothing entered it will be valid.
    expect(element.valid()).to.be.true;

    setValue('Some comments');
    expect(element.valid()).to.be.true;
  });

  it('will return entered value', () => {
    const value = 'Some comments';
    setValue(value);

    expect(element.value).to.be.equal(value);
  });

  it('looks like the latest snapshot', async () => {
    await expect(element).shadowDom.to.equalSnapshot();
  });

  function setValue(value: string) {
    const item = <WizardTextField>(
      element
        .shadowRoot!.querySelectorAll('wizard-textfield[id="comment"]')
        .item(0)
    );
    item.value = value;
  }
});
