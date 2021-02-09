import { html, fixture, expect } from '@open-wc/testing';

import '../../../../src/editors/templates/enum-type-editor.js';
import { EnumTypeEditor } from '../../../../src/editors/templates/enum-type-editor.js';
import { getDocument } from '../../../data.js';

describe('enum-type-editor', () => {
  let element: EnumTypeEditor;
  const validSCL = getDocument();
  beforeEach(async () => {
    element = await fixture(html`<enum-type-editor
      .element=${validSCL.querySelector('EnumType')}
    ></enum-type-editor>`);
  });

  it('has an element id property', () =>
    expect(element).to.have.property('eID', 'Dummy_ctlModel'));

  it('has a desc property', () =>
    expect(element).to.have.property('desc', null));

  it('has a size property', () => expect(element).to.have.property('size', 5));

  it('looks like the latest snapshot', () => {
    expect(element).shadowDom.to.equalSnapshot();
  });
});
