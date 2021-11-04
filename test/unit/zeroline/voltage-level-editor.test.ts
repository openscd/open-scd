import { fixture, expect } from '@open-wc/testing';
import { html } from '../../../src/foundation.js';

import '../../../src/zeroline/voltage-level-editor.js';
import { VoltageLevelEditor } from '../../../src/zeroline/voltage-level-editor.js';

describe('voltage-level-editor', () => {
  let element: VoltageLevelEditor;
  let validSCL: XMLDocument;

  beforeEach(async () => {
    validSCL = await fetch('/base/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    element = <VoltageLevelEditor>(
      await fixture(
        html`<voltage-level-editor
          .element=${validSCL.querySelector('VoltageLevel')}
        ></voltage-level-editor>`
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
