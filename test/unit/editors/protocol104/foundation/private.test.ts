import { expect } from '@open-wc/testing';

import {
  addPrefixAndNamespaceToDocument,
  createPrivateAddress,
  createPrivateElement,
  getPrivateElement,
  PROTOCOL_104_NS,
  PROTOCOL_104_PREFIX,
  PROTOCOL_104_PRIVATE,
} from '../../../../../src/editors/protocol104/foundation/private.js';

describe('foundation', () => {
  let doc: XMLDocument;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/104/valid-empty-addresses.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('addPrefixAndNamespaceToDocument', () => {
    it('adding prefix for namespace', async () => {
      addPrefixAndNamespaceToDocument(doc);

      const sclElement = doc.querySelector('SCL')!;
      expect(
        sclElement.getAttribute('xmlns:' + PROTOCOL_104_PREFIX)
      ).to.be.equal(PROTOCOL_104_NS);
    });

    it('do nothing when prefix exists', async () => {
      doc = await fetch('/test/testfiles/104/valid-no-ied.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      let sclElement = doc.querySelector('SCL')!;
      expect(
        sclElement.getAttribute('xmlns:' + PROTOCOL_104_PREFIX)
      ).to.be.equal(PROTOCOL_104_NS);

      addPrefixAndNamespaceToDocument(doc);

      sclElement = doc.querySelector('SCL')!;
      expect(
        sclElement.getAttribute('xmlns:' + PROTOCOL_104_PREFIX)
      ).to.be.equal(PROTOCOL_104_NS);
    });
  });

  describe('getPrivateElement', () => {
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/104/valid-addresses.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    });

    it('when called on DAI Element with Private then Private returned', () => {
      const daiElement = doc.querySelector(
        'IED[name="B1"] LN0[lnType="SE_LLN0_SET_V001"] > DOI[name="Mod"] > SDI[name="Oper"] > DAI[name="ctlVal"]'
      );
      const privateElement = getPrivateElement(daiElement!);

      expect(privateElement).to.be.not.null;
      expect(privateElement).to.have.attribute('type', PROTOCOL_104_PRIVATE);
    });

    it('when called on DAI Element without Private then null returned', () => {
      const daiElement = doc.querySelector(
        'IED[name="B1"] LN0[lnType="SE_LLN0_SET_V001"] > DOI[name="Mod"] > DAI[name="ctlModel"]'
      );
      const privateElement = getPrivateElement(daiElement!);

      expect(privateElement).to.be.null;
    });
  });

  describe('createPrivateElement', () => {
    it('new private element is created with correct type', async () => {
      const privateElement = createPrivateElement(doc);

      expect(privateElement.tagName).to.be.equal('Private');
      expect(privateElement.getAttribute('type')).to.be.equal(
        PROTOCOL_104_PRIVATE
      );
    });
  });

  describe('createPrivateElement', () => {
    it('new address element is created with correct type', async () => {
      const ti = '30';

      const addressElement = createPrivateAddress(doc, ti);

      expect(addressElement.tagName).to.be.equal('Address');
      expect(addressElement.namespaceURI).to.be.equal(PROTOCOL_104_NS);
      expect(addressElement.getAttribute('ti')).to.be.equal(ti);
    });
  });
});
