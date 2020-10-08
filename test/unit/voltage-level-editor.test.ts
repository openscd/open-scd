import { fixture, html, expect } from '@open-wc/testing';

import '../../src/editors/substation/voltage-level-editor.js';
import { VoltageLevelEditor } from '../../src/editors/substation/voltage-level-editor.js';

import { getDocument } from '../data.js';

describe('voltage-level-editor', () => {
  let element: VoltageLevelEditor;
  const validSCL = getDocument();
  beforeEach(async () => {
    element = <VoltageLevelEditor>(
      await fixture(
        html`<voltage-level-editor
          .element=${validSCL.querySelector('VoltageLevel')}
          .parent=${validSCL.querySelector('Substation')}
        ></voltage-level-editor>`
      )
    );
  });

  it('has a name property', () =>
    expect(element).to.have.property('name', 'E1'));

  it('has a desc property', () =>
    expect(element).to.have.property('desc', 'Voltage Level'));

  it('renders header with name and desc visible', () => {
    expect(element).property('header').to.contain.text('E1');
    expect(element).property('header').to.contain.text('Voltage Level');
  });
});
