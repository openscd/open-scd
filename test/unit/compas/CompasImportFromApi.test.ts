import {expect, fixtureSync, html} from '@open-wc/testing';
import CompasImportFromApiElement from '../../../src/compas/CompasImportFromApi.js';

import "../../../src/compas/CompasImportFromApi.js";

describe('compas-import-from-api', () => {
  let element: CompasImportFromApiElement;

  beforeEach(async () => {
    element = fixtureSync(html`<compas-import-from-api></compas-import-from-api>`);
    await element;
  });

  it('looks like the latest snapshot', () => {
    expect(element).shadowDom.to.equalSnapshot();
  });
});
