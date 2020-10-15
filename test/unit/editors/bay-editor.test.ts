import { fixture, html, expect } from '@open-wc/testing';

import '../../../src/editors/substation/bay-editor.js';
import { BayEditor } from '../../../src/editors/substation/bay-editor.js';
import { getDocument } from '../../data.js';

describe('bay-editor', () => {
  let element: BayEditor;
  const validSCL = getDocument();
  beforeEach(async () => {
    element = <BayEditor>await fixture(
      html`<bay-editor
          .element=${validSCL.querySelector('Bay')}
          .parent=${validSCL.querySelector('Voltage Level')}
        ></voltage-level-editor>`
    );
  });

  it('has a name property', () =>
    expect(element).to.have.property('name', 'Coupling_Bay'));

  it('has a desc property', () =>
    expect(element).to.have.property('desc', 'Bay'));

  it('renders header with name and desc visible', () => {
    expect(element).property('header').to.contain.text('Coupling_Bay');
    expect(element).property('header').to.contain.text('Bay');
  });
});
