import {expect, fixture, fixtureSync, html, waitUntil} from '@open-wc/testing';

import CompasAutoAlignmentElement from "../../../src/compas/CompasAutoAlignment.js";

import "../../../src/compas/CompasAutoAlignment.js";

describe('compas-auto-alignment', () => {
  let element: CompasAutoAlignmentElement;
  const docName = 'minigrid-3.0.0.cid';
  const docId = 'a8ad1a2f-0f39-4e0d-91ab-7c304f2c0dcf';

  describe('document with substations', () => {
    beforeEach(async () => {
      const doc = await fetch('/test/testfiles/compas/minigrid-3.0.0.cid')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      element = await fixture(
        html`<compas-auto-alignment .doc="${doc}" .docName="${docName}" .docId="${docId}"></compas-auto-alignment>`
      );
    });

    it('has 4 item entries', () => {
      expect(element.shadowRoot!.querySelectorAll('mwc-check-list-item'))
        .to.have.length(4)
    });

    it('valid when a item is selected', () => {
      element.shadowRoot!.querySelectorAll('mwc-check-list-item').item(0).selected = true;

      expect(element.valid())
        .to.be.true
    });

    it('invalid when no items selected', () => {
      expect(element.valid())
        .to.be.false
    });

    it('when multiple items selected, values are returned', () => {
      element.shadowRoot!.querySelectorAll('mwc-check-list-item').item(0).selected = true;
      element.shadowRoot!.querySelectorAll('mwc-check-list-item').item(1).selected = true;

      expect(element.getSelectedValues())
        .to.have.length(2)
        .to.contains("_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4")
        .to.contains("_974565b1-ac55-4901-9f48-afc7ef5486df");
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('document without substations', () => {
    beforeEach(async () => {
      const doc = await fetch('/test/testfiles/compas/test-scd.cid')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      element = await fixture(
        html`<compas-auto-alignment .doc="${doc}" .docName="${docName}" .docId="${docId}"></compas-auto-alignment>`
      );
    });

    it('has no entries', () => {
      expect(element.shadowRoot!.querySelectorAll('mwc-check-list-item'))
        .to.have.length(0)
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });
});
