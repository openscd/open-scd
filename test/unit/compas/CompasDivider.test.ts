import {fixture, html, expect} from '@open-wc/testing';

import {CompasDividerElement} from "../../../src/compas/CompasDivider.js";
import "../../../src/compas/CompasDivider.js";

describe('compas-divider', () => {
  let element: CompasDividerElement;
  beforeEach(async () => {
    element = await fixture(
      html`<compas-divider></compas-divider>`
    );
  });

  it('looks like the latest snapshot', () => {
    expect(element).shadowDom
      .to.equalSnapshot();
  });
});
