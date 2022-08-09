import { expect } from "@open-wc/testing";

import { fetchDoc } from "../wizards/test-support.js";
import {
  COMPAS_NAMESPACE,
  COMPAS_PREFIX,
  COMPAS_SCL_PRIVATE_TYPE, createCompasSclName, createPrivate, getCompasSclName,
  getPrivate
} from "../../../src/compas/private.js";

describe('Private Utility', () => {
  let doc: XMLDocument;
  let scl: Element;

  beforeEach(async () => {
    doc = await fetchDoc('/test/testfiles/compas/compas-scl-private-missing-private.scd');
    scl = doc.querySelector('SCL')!;
  });

  describe('getPrivate & createPrivate', () => {
    it('Search and create Private Element', async function () {
      let privateElement = getPrivate(scl, COMPAS_SCL_PRIVATE_TYPE);
      expect(privateElement).to.be.null;

      privateElement = createPrivate(scl, COMPAS_SCL_PRIVATE_TYPE);
      expect(privateElement).to.be.not.null;
      expect(privateElement).to.have.attribute('type', COMPAS_SCL_PRIVATE_TYPE);

      scl.prepend(privateElement);
      privateElement = getPrivate(scl, COMPAS_SCL_PRIVATE_TYPE);
      expect(privateElement).to.be.not.null;
      expect(privateElement).to.have.attribute('type', COMPAS_SCL_PRIVATE_TYPE);
    });
  });

  describe('getCompasSclName & createCompasSclName', () => {
    it('Search and create Compas SCL Name Element', async function () {
      const privateElement = createPrivate(scl, COMPAS_SCL_PRIVATE_TYPE);
      scl.prepend(privateElement);

      let sclNameElement = getCompasSclName(scl);
      expect(sclNameElement).to.be.null;

      sclNameElement = createCompasSclName(scl, 'new');
      expect(sclNameElement).to.be.not.null;
      expect(sclNameElement).to.have.text('new');

      privateElement.prepend(sclNameElement);
      sclNameElement = getCompasSclName(scl);
      expect(sclNameElement).to.be.not.null;
      expect(sclNameElement).to.have.text('new');
    });
  });

  describe('addPrefixAndNamespaceToDocument', () => {
    it('Check adding prefix', async function () {
      // No namespace exist for CoMPAS
      expect(scl).to.not.have.attribute('xmlns:' + COMPAS_PREFIX);

      // Namespace for CoMPAS will be added.
      const privateElement = createPrivate(scl, COMPAS_SCL_PRIVATE_TYPE);
      scl.prepend(privateElement);
      const sclNameElement = createCompasSclName(scl, 'new');
      privateElement.prepend(sclNameElement);
      expect(privateElement.childElementCount).to.be.equal(1);
      expect(scl).to.have.attribute('xmlns:' + COMPAS_PREFIX, COMPAS_NAMESPACE);

      // Namespace for CoMPAS still available.
      privateElement.removeChild(sclNameElement);
      expect(privateElement.childElementCount).to.be.equal(0);
      expect(scl).to.have.attribute('xmlns:' + COMPAS_PREFIX, COMPAS_NAMESPACE);

      // Namespace for CoMPAS still available (only added once).
      privateElement.prepend(sclNameElement);
      expect(privateElement.childElementCount).to.be.equal(1);
      expect(scl).to.have.attribute('xmlns:' + COMPAS_PREFIX, COMPAS_NAMESPACE);
    });
  });
});
