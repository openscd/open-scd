import { html, fixture, expect } from '@open-wc/testing';

import '../../../../src/editors/substation/substation-editor.js';
import { SubstationEditor } from '../../../../src/editors/substation/substation-editor.js';
import { getDocument } from '../../../data.js';

describe('substation-editor', () => {
  let element: SubstationEditor;
  const validSCL = getDocument();
  beforeEach(async () => {
    element = await fixture(html`<substation-editor
      .element=${validSCL.querySelector('Substation')}
    ></substation-editor>`);
  });

  it('has a name property', () =>
    expect(element).to.have.property('name', 'AA1'));

  it('has a desc property', () =>
    expect(element).to.have.property('desc', 'Substation'));

  it('looks like the latest snapshot', () => {
    expect(element).shadowDom.to.equalSnapshot();
  });
});
