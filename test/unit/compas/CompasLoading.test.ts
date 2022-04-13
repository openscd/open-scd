import {fixture, html, expect} from '@open-wc/testing';

import {CompasLoadingElement} from "../../../src/compas/CompasLoading.js";
import "../../../src/compas/CompasLoading.js";

describe('compas-loading', () => {
  let element: CompasLoadingElement;
  beforeEach(async () => {
    element = await fixture(
      html`<compas-loading></compas-loading>`
    );
  });

  it('looks like the latest snapshot', async () => {
    await expect(element).shadowDom.to.equalSnapshot();
  });
});
