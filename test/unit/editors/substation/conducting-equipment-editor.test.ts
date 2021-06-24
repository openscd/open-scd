import { fixture, html, expect } from '@open-wc/testing';

import '../../../../src/editors/substation/conducting-equipment-editor.js';
import { ConductingEquipmentEditor } from '../../../../src/editors/substation/conducting-equipment-editor.js';

describe('conducting-equipment-editor', () => {
  let element: ConductingEquipmentEditor;
  let validSCL: XMLDocument;

  beforeEach(async () => {
    validSCL = await fetch('/base/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    element = <ConductingEquipmentEditor>(
      await fixture(
        html`<conducting-equipment-editor
          .element=${validSCL.querySelector('ConductingEquipment')}
        ></conducting-equipment-editor>`
      )
    );
  });

  it('has a name property', () =>
    expect(element).to.have.property('name', 'QA1'));

  it('has a desc property', () =>
    expect(element).to.have.property('desc', 'coupling field ciscuit breaker'));

  it('looks like the latest snapshot', () => {
    expect(element).shadowDom.to.equalSnapshot();
  });
});
