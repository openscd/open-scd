import {expect, fixtureSync, html, waitUntil} from '@open-wc/testing';
import sinon from "sinon";

import {CompasExistsInElement} from "../../../src/compas/CompasExistsIn.js";
import CompasSaveElement from "../../../src/compas/CompasSave.js";

import "../../../src/compas/CompasSave.js";

describe('compas-save', () => {
  let element: CompasSaveElement & CompasExistsInElement;
  const docName = 'station123.scd';
  const docId = '6a45ae97-5605-44f8-b4e6-25305bc6c036';

  describe('still determining if document exists in CoMPAS', () => {
    beforeEach(async () => {
      element = fixtureSync(
        html`<compas-save .docName="${docName}" .docId="${docId}"></compas-save>`
      );

      sinon.stub(element, 'checkExistInCompas').callsFake(() => {
        // Do nothing so that it seems like loading from compas.
      });

      await element;
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('new document in compas', () => {
    beforeEach(async () => {
      element = fixtureSync(
          html`<compas-save .docName="${docName}"></compas-save>`
      );

      sinon.stub(element, 'checkExistInCompas').callsFake(() => {
        element.existInCompas = false;
      });

      await element;
      await waitUntil(() => element.existInCompas !== undefined);
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('existing document in compas', () => {
    beforeEach(async () => {
      element = fixtureSync(
        html`<compas-save .docName="${docName}" .docId="${docId}"></compas-save>`
      );

      sinon.stub(element, 'checkExistInCompas').callsFake(() => {
        element.existInCompas = true;
      });

      await element;
      await waitUntil(() => element.existInCompas !== undefined);

    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  })

  afterEach(() => {
    sinon.restore();
  });
});
