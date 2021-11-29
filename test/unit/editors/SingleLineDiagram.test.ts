import { expect, fixture, html } from '@open-wc/testing';
import SingleLineDiagramPlugin from '../../../src/editors/SingleLineDiagram.js';

describe('Single Line Diagram plugin', () => {
  if (customElements.get('single-line-diagram-plugin') === undefined)
    customElements.define(
      'single-line-diagram-plugin',
      SingleLineDiagramPlugin
    );

  let doc: Document;
  let sldPlugin: SingleLineDiagramPlugin;
  beforeEach(async () => {
    doc = await fetch('/base/test/testfiles/valid2007B4withSubstationXY.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    sldPlugin = <SingleLineDiagramPlugin>(
      await fixture(
        html`<single-line-diagram-plugin
          .doc=${doc}
        ></single-line-diagram-plugin>`
      )
    );
  });

  it('looks like the latest snapshot', () => {
    expect(sldPlugin.svg).to.equalSnapshot();
  });
});
