import { html, fixture, expect } from '@open-wc/testing';

import '../../../../src/editors/templates/enum-editor.js';
import { EnumEditor } from '../../../../src/editors/templates/enum-editor.js';
import { getDocument } from '../../../data.js';

describe('enum-editor', () => {
  let element: EnumEditor;
  const validSCL = getDocument();
  beforeEach(async () => {
    element = await fixture(html`<enum-editor
      .element=${validSCL.querySelector('EnumType')}
    ></enum-editor>`);
  });

  it('has a name property', () =>
    expect(element).to.have.property('id', 'Dummy_ctlModel'));

  it('has a desc property', () =>
    expect(element).to.have.property('desc', null));

  it('has a size property', () => expect(element).to.have.property('size', 5));

  it('looks like the latest snapshot', () => {
    expect(element).shadowDom.to.equalSnapshot();
  });
});
