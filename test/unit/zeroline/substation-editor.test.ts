import { html, fixture, expect } from '@open-wc/testing';

import '../../../src/zeroline/substation-editor.js';
import { SubstationEditor } from '../../../src/zeroline/substation-editor.js';

describe('substation-editor', () => {
  let element: SubstationEditor;
  let validSCL: XMLDocument;

  beforeEach(async () => {
    validSCL = await fetch('/base/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    element = await fixture(html`<substation-editor
      .element=${validSCL.querySelector('Substation')}
    ></substation-editor>`);
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

  describe('with showieds property', () => {
    beforeEach(async () => {
      element.showieds = true;
      await element.requestUpdate();
    });
    it('looks like the latest snapshot', () => {
      expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('with readonly and showieds property', () => {
    beforeEach(async () => {
      element.showieds = true;
      element.readonly = true;
      await element.requestUpdate();
    });
    it('looks like the latest snapshot', () => {
      expect(element).shadowDom.to.equalSnapshot();
    });
  });
});
