import { fixture, html, expect } from '@open-wc/testing';

import '../../../../src/editors/substation/bay-editor.js';
import { BayEditor } from '../../../../src/editors/substation/bay-editor.js';

describe('bay-editor', () => {
  let element: BayEditor;
  let validSCL: XMLDocument;

  beforeEach(async () => {
    validSCL = await fetch('/base/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    element = <BayEditor>(
      await fixture(
        html`<bay-editor
          .element=${validSCL.querySelector('Bay')}
        ></bay-editor>`
      )
    );
  });

  it('has a name property', () =>
    expect(element).to.have.property('name', 'COUPLING_BAY'));

  it('has a desc property', () =>
    expect(element).to.have.property('desc', 'Bay'));

  it('looks like the latest snapshot', () => {
    expect(element).shadowDom.to.equalSnapshot();
  });
});
