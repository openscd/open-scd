import { fixture, html, expect } from '@open-wc/testing';

import '../../../../src/editors/substation/sub-equipment-editor.js';
import { SubEquipmentEditor } from '../../../../src/editors/substation/sub-equipment-editor.js';

describe('sub-equipment-editor', () => {
  let element: SubEquipmentEditor;
  let doc: XMLDocument;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/SubEquipment.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    element = <SubEquipmentEditor>(
      await fixture(
        html`<sub-equipment-editor
          .element=${doc.querySelector('SubEquipment')}
        ></sub-equipment-editor>`
      )
    );
  });

  it('looks like the latest snapshot', async () => {
    await expect(element).shadowDom.to.equalSnapshot();
  });

  describe('With children', () => {
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/SubEquipment.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      element = <SubEquipmentEditor>(
        await fixture(
          html`<sub-equipment-editor
            .element=${doc.querySelector('SubEquipment[name="addEqi"]')}
          ></sub-equipment-editor>`
        )
      );
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('without description and state', () => {
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/SubEquipment.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      element = <SubEquipmentEditor>(
        await fixture(
          html`<sub-equipment-editor
            .element=${doc.querySelector('SubEquipment[name="other"]')}
          ></sub-equipment-editor>`
        )
      );
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });
});
