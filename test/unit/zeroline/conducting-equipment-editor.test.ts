import { fixture, html, expect } from '@open-wc/testing';

import '../../../src/zeroline/conducting-equipment-editor.js';
import { ConductingEquipmentEditor } from '../../../src/zeroline/conducting-equipment-editor.js';

describe('conducting-equipment-editor', () => {
  let element: ConductingEquipmentEditor;
  let validSCL: XMLDocument;

  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/valid2007B4.scd')
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

  it('looks like the latest snapshot', () => {
    expect(element).shadowDom.to.equalSnapshot();
  });

  describe('with readonly property', () => {
    beforeEach(async () => {
      element.readonly = true;
      await element.requestUpdate();
    });
    it('looks like the latest snapshot', () => {
      expect(element).shadowDom.to.equalSnapshot();
    });
  });
});
