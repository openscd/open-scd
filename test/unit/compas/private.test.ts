import { expect } from '@open-wc/testing';

import { fetchDoc } from '../wizards/test-support.js';
import {
  COMPAS_NAMESPACE,
  COMPAS_PREFIX,
  COMPAS_SCL_PRIVATE_TYPE,
  createCompasSclName,
  createLabel,
  createLabels,
  createPrivate,
  getCompasSclName,
  getLabels,
  getPrivate,
} from '../../../src/compas/private.js';

describe('Private Utility', () => {
  let doc: XMLDocument;
  let scl: Element;

  describe('getPrivate & createPrivate', () => {
    beforeEach(async () => {
      doc = await fetchDoc(
        '/test/testfiles/compas/compas-scl-private-missing-private.scd'
      );
      scl = doc.querySelector('SCL')!;
    });

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
    beforeEach(async () => {
      doc = await fetchDoc(
        '/test/testfiles/compas/compas-scl-private-missing-compas-elements.scd'
      );
      scl = doc.querySelector('SCL')!;
    });

    it('Search and create Compas SCL Name Element', async function () {
      const privateElement = getPrivate(scl, COMPAS_SCL_PRIVATE_TYPE)!;

      let sclNameElement = getCompasSclName(privateElement);
      expect(sclNameElement).to.be.null;

      sclNameElement = createCompasSclName(privateElement, 'new');
      expect(sclNameElement).to.be.not.null;
      expect(sclNameElement).to.have.text('new');

      privateElement.prepend(sclNameElement);
      sclNameElement = getCompasSclName(privateElement);
      expect(sclNameElement).to.be.not.null;
      expect(sclNameElement).to.have.text('new');
    });
  });

  describe('getLabels & createLabels', () => {
    beforeEach(async () => {
      doc = await fetchDoc(
        '/test/testfiles/compas/compas-scl-private-missing-compas-elements.scd'
      );
      scl = doc.querySelector('SCL')!;
    });

    it('Search and create Compas Labels Element', async function () {
      const privateElement = getPrivate(scl, COMPAS_SCL_PRIVATE_TYPE)!;

      let labelsElement = getLabels(privateElement);
      expect(labelsElement).to.be.null;

      labelsElement = createLabels(privateElement);
      expect(labelsElement).to.be.not.null;

      privateElement.append(labelsElement);
      labelsElement = getLabels(privateElement);
      expect(labelsElement).to.be.not.null;
    });

    it('Create Compas Label Element', async function () {
      const privateElement = getPrivate(scl, COMPAS_SCL_PRIVATE_TYPE)!;
      const labelsElement = createLabels(privateElement);
      privateElement.append(labelsElement);

      let labelElement: Element | null = createLabel(labelsElement, 'Label1');
      expect(labelElement).to.be.not.null;
      expect(labelElement).to.have.text('Label1');

      labelsElement.append(labelElement);
      labelElement = labelsElement.querySelector('Label');
      expect(labelElement).to.be.not.null;
      expect(labelElement).to.have.text('Label1');
    });
  });

  describe('addPrefixAndNamespaceToDocument', () => {
    beforeEach(async () => {
      doc = await fetchDoc(
        '/test/testfiles/compas/compas-scl-private-missing-private.scd'
      );
      scl = doc.querySelector('SCL')!;
    });

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
