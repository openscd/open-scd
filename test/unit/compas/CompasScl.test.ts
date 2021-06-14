import {expect, fixture, html} from '@open-wc/testing';

import "../../../src/compas/CompasScl.js";
import {CompasScl} from "../../../src/compas/CompasScl.js";

describe('compas-scl-list', () => {
  let element: CompasScl;

  beforeEach(async () => {
    element = <CompasScl>(
      await fixture(
        html`<compas-scl-list .type="IID"></compas-scl-list>`
      )
    );
  });

  it('looks like the latest snapshot', async () => {
    expect(element).shadowDom
      .to.equalSnapshot();
  });
});
