import { expect, fixture, html } from '@open-wc/testing';

import Sitipe from '../../../src/compas-editors/Sitipe.js';

describe('Sitipe plugin', () => {
  customElements.define('sitipe-plugin', Sitipe);

  let element: Sitipe;

  describe('No doc loaded', () => {
    beforeEach(async () => {
      element = await fixture(html`<sitipe-plugin></sitipe-plugin>`);
    });

    it('Should look like latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('With Doc loaded', () => {
    let doc: XMLDocument;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/Sitipe.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      element = await fixture(
        html`<sitipe-plugin .doc=${doc}></sitipe-plugin>`
      );
    });

    it('Should look like latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });
});
