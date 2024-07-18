import { expect, fixture, html } from '@open-wc/testing';

import '../../../../src/editors/publisher/sampled-value-control-element-editor.js';
import { SampledValueControlElementEditor } from '../../../../src/editors/publisher/sampled-value-control-element-editor.js';

describe('Editor for SampledValueControl element its referenced elements', () => {
  let doc: XMLDocument;
  let element: SampledValueControlElementEditor;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/wizards/sampledvaluecontrol.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('with deprecated multicast attribute set to false', () => {
    beforeEach(async () => {
      const sampledValueControl = doc.querySelector(
        'SampledValueControl[multicast="false"]'
      )!;

      element = await fixture(
        html`<sampled-value-control-element-editor
          .element=${sampledValueControl}
        ></sampled-value-control-element-editor>`
      );
    });

    it('looks like the latest snapshot', async () =>
      await expect(element).shadowDom.to.equalSnapshot());
  });

  describe('with multicast SampledValueControl', () => {
    beforeEach(async () => {
      const SampledValueControl = doc.querySelector(
        'SampledValueControl[multicast="true"]'
      )!;

      element = await fixture(
        html`<sampled-value-control-element-editor
          .element=${SampledValueControl}
        ></sampled-value-control-element-editor>`
      );
    });

    it('looks like the latest snapshot', async () =>
      await expect(element).shadowDom.to.equalSnapshot());
  });
});
