import { html, fixture, expect } from '@open-wc/testing';

import '../../../../src/editors/templates/enum-val-editor.js';
import { EnumValEditor } from '../../../../src/editors/templates/enum-val-editor.js';
import { getDocument } from '../../../data.js';

describe('enum-val-editor', () => {
  let element: EnumValEditor;
  const validSCL = getDocument();
  beforeEach(async () => {
    element = await fixture(html`<enum-val-editor
      .element=${validSCL.querySelector('EnumVal')}
    ></enum-val-editor>`);
  });

  it('has an ord property', () => expect(element).to.have.property('ord', '0'));

  it('has a desc property', () =>
    expect(element).to.have.property('desc', null));

  it('has a value property', () =>
    expect(element).to.have.property('value', 'status-only'));

  it('looks like the latest snapshot', () => {
    expect(element).shadowDom.to.equalSnapshot();
  });
});
