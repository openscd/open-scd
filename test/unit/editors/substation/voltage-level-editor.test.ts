import { fixture, html, expect } from '@open-wc/testing';

import '../../../../src/editors/substation/voltage-level-editor.js';
import { VoltageLevelEditor } from '../../../../src/editors/substation/voltage-level-editor.js';
import { getDocument } from '../../../data.js';

describe('voltage-level-editor', () => {
  let element: VoltageLevelEditor;
  const validSCL = getDocument();
  beforeEach(async () => {
    element = <VoltageLevelEditor>(
      await fixture(
        html`<voltage-level-editor
          .element=${validSCL.querySelector('VoltageLevel')}
        ></voltage-level-editor>`
      )
    );
  });

  it('has a name property', () =>
    expect(element).to.have.property('name', 'E1'));

  it('has a desc property', () =>
    expect(element).to.have.property('desc', 'Voltage Level'));

  it('looks like the latest snapshot', () => {
    expect(element).shadowDom.to.equalSnapshot();
  });
});
