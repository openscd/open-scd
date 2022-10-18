import { expect, fixture, html } from '@open-wc/testing';
import CompasImportFromApiElement from '../../../src/compas/CompasImportFromApi.js';

import '../../../src/compas/CompasImportFromApi.js';

describe('compas-import-from-api', () => {
  let element: CompasImportFromApiElement;

  beforeEach(async () => {
    element = await fixture(
      html`<compas-import-from-api></compas-import-from-api>`
    );
    await element.requestUpdate();
    await element.updateComplete;
  });

  it('looks like the latest snapshot', async () => {
    await expect(element).shadowDom.to.equalSnapshot();
  });
});
