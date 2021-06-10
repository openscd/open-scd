import {expect, fixture, html} from '@open-wc/testing';

import "../../../src/compas/CompasScltypeRadiogroup.js";
import {CompasScltypeRadiogroup} from "../../../src/compas/CompasScltypeRadiogroup.js";

describe('compas-scltype-radiogroup', () => {
  let element: CompasScltypeRadiogroup;

  beforeEach(async () => {
    element = <CompasScltypeRadiogroup>(
      await fixture(
        html`<compas-scltype-radiogroup></compas-scltype-radiogroup>`
      )
    );
  });

  it('looks like the latest snapshot', async () => {
    expect(element).shadowDom
      .to.equalSnapshot();
  });
});
