import {expect, fixture, html} from '@open-wc/testing';

import "../../../src/compas/CompasScltypeList.js";
import {CompasScltypeList} from "../../../src/compas/CompasScltypeList.js";

describe('compas-scltype-list', () => {
  let element: CompasScltypeList;

  beforeEach(async () => {
    element = <CompasScltypeList>(
      await fixture(
        html`<compas-scltype-list></compas-scltype-list>`
      )
    );
  });

  it('looks like the latest snapshot', async () => {
    expect(element).shadowDom
      .to.equalSnapshot();
  });
});
