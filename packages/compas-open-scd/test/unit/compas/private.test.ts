import { expect } from '@open-wc/testing';

import { fetchDoc } from '../wizards/test-support.js';
import {
  COMPAS_NAMESPACE,
  COMPAS_PREFIX,
  COMPAS_SCL_PRIVATE_TYPE,
  copyCompasSclFileType,
  copyCompasSclName,
  createCompasSclName,
  createLabel,
  createLabels,
  createPrivate,
  getCompasSclFileType,
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

  describe('getCompasSclFileType', () => {
    it('when private contains SCL File Type then value returned', async () => {
      doc = await fetchDoc(
        '/test/testfiles/compas/compas-scl-private-update-existing.scd'
      );
      const privateElement = doc.querySelector(
        `:root > Private[type="${COMPAS_SCL_PRIVATE_TYPE}"]`
      )!;

      expect(getCompasSclFileType(privateElement)).to.have.text('CID');
    });

    it('when private does not contain SCL File Type then null returned', async () => {
      doc = await fetchDoc(
        '/test/testfiles/compas/compas-scl-private-missing-private.scd'
      );
      const privateElement = doc.querySelector(
        `:root > Private[type="${COMPAS_SCL_PRIVATE_TYPE}"]`
      )!;

      expect(getCompasSclFileType(privateElement)).to.be.null;
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

  describe('copy functions', () => {
    let fromDoc: Document;
    let fromParent: Element;
    let toParent: Element;

    beforeEach(async () => {
      doc = await fetchDoc('/test/testfiles/compas/save-compas-as-version.scd');
      toParent = doc.querySelector(
        `:root > Private[type="${COMPAS_SCL_PRIVATE_TYPE}"]`
      )!;

      fromDoc = await fetchDoc('/test/testfiles/compas/save-compas.scd');
      fromParent = fromDoc.querySelector(
        `:root > Private[type="${COMPAS_SCL_PRIVATE_TYPE}"]`
      )!;
    });

    describe('copyCompasSclName', () => {
      it('when called with both parent then SCL Name is copied', () => {
        expect(toParent.querySelector('SclName')).to.have.text('AmsterdamCS');

        copyCompasSclName(fromParent, toParent);
        expect(toParent.querySelector('SclName')).to.have.text('UtrechtCS');
      });

      it('when no source (from) then nothing happens', () => {
        expect(toParent.querySelector('SclName')).to.have.text('AmsterdamCS');

        copyCompasSclName(null, toParent);
        expect(toParent.querySelector('SclName')).to.have.text('AmsterdamCS');
      });

      it('when no destination (to) then nothing happens', () => {
        copyCompasSclName(fromParent, null);
      });

      it('when no source SCL Name (from) then destination SCL Name (to) is cleared', () => {
        expect(toParent.querySelector('SclName')).to.have.text('AmsterdamCS');
        fromParent.removeChild(fromParent.querySelector('SclName')!);

        copyCompasSclName(fromParent, toParent);
        expect(toParent.querySelector('SclName')).to.have.text('');
      });

      it('when both have no SCL Name (from) then nothing happens', () => {
        fromParent.removeChild(fromParent.querySelector('SclName')!);
        toParent.removeChild(toParent.querySelector('SclName')!);

        copyCompasSclName(fromParent, toParent);
        expect(toParent.querySelector('SclName')).to.be.null;
      });
    });

    describe('copyCompasSclFileType', () => {
      it('when called with both parent then SCL File Type is copied', () => {
        expect(toParent.querySelector('SclFileType')).to.have.text('SCD');

        copyCompasSclFileType(fromParent, toParent);
        expect(toParent.querySelector('SclFileType')).to.have.text('CID');
      });

      it('when no source (from) then nothing happens', () => {
        expect(toParent.querySelector('SclFileType')).to.have.text('SCD');

        copyCompasSclFileType(null, toParent);
        expect(toParent.querySelector('SclFileType')).to.have.text('SCD');
      });

      it('when no destination (to) then nothing happens', () => {
        copyCompasSclFileType(fromParent, null);
      });

      it('when no source SCL Name (from) then destination SCL Name (to) is cleared', () => {
        expect(toParent.querySelector('SclFileType')).to.have.text('SCD');
        fromParent.removeChild(fromParent.querySelector('SclFileType')!);

        copyCompasSclFileType(fromParent, toParent);
        expect(toParent.querySelector('SclFileType')).to.have.text('');
      });

      it('when both have no SCL Name (from) then nothing happens', () => {
        fromParent.removeChild(fromParent.querySelector('SclFileType')!);
        toParent.removeChild(toParent.querySelector('SclFileType')!);

        copyCompasSclFileType(fromParent, toParent);
        expect(toParent.querySelector('SclFileType')).to.be.null;
      });
    });
  });
});
