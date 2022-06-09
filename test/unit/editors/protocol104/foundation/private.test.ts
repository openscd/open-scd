import { expect } from '@open-wc/testing';

import {
  addPrefixAndNamespaceToDocument,
  createAddressElements,
  createPrivateAddress,
  createPrivateElement,
  PROTOCOL_104_NS,
  PROTOCOL_104_PREFIX,
  PROTOCOL_104_PRIVATE,
} from '../../../../../src/editors/protocol104/foundation/private.js';

describe('foundation', () => {
  let document: XMLDocument;

  beforeEach(async () => {
    document = await fetch('/test/testfiles/104/valid-empty-addresses.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('addPrefixAndNamespaceToDocument', () => {
    it('adding prefix for namespace', async () => {
      addPrefixAndNamespaceToDocument(document);

      const sclElement = document.querySelector('SCL')!;
      expect(
        sclElement.getAttribute('xmlns:' + PROTOCOL_104_PREFIX)
      ).to.be.equals(PROTOCOL_104_NS);
    });

    it('do nothing when prefix exists', async () => {
      document = await fetch('/test/testfiles/104/valid-no-ied.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      let sclElement = document.querySelector('SCL')!;
      expect(
        sclElement.getAttribute('xmlns:' + PROTOCOL_104_PREFIX)
      ).to.be.equals(PROTOCOL_104_NS);

      addPrefixAndNamespaceToDocument(document);

      sclElement = document.querySelector('SCL')!;
      expect(
        sclElement.getAttribute('xmlns:' + PROTOCOL_104_PREFIX)
      ).to.be.equals(PROTOCOL_104_NS);
    });
  });

  describe('createPrivateElement', () => {
    it('new private element is created with correct type', async () => {
      const privateElement = createPrivateElement(document);

      expect(privateElement.tagName).to.be.equals('Private');
      expect(privateElement.getAttribute('type')).to.be.equals(
        PROTOCOL_104_PRIVATE
      );
    });
  });

  describe('createPrivateElement', () => {
    it('new address element is created with correct type', async () => {
      const ti = '30';

      const addressElement = createPrivateAddress(document, ti);

      expect(addressElement.tagName).to.be.equals('Address');
      expect(addressElement.namespaceURI).to.be.equals(PROTOCOL_104_NS);
      expect(addressElement.getAttribute('ti')).to.be.equals(ti);
    });
  });

  describe('createAddressElements', () => {
    it('only single address element created without expected value', async () => {
      const ti = '30';

      const addressElements = createAddressElements(
        document,
        ti,
        false,
        undefined
      );

      expect(addressElements.length).to.be.equals(1);
      expect(addressElements[0].tagName).to.be.equals('Address');
      expect(addressElements[0].getAttribute('ti')).to.be.equals(ti);
    });

    it('only two address element created without expected value', async () => {
      const ti = '30';

      const addressElements = createAddressElements(
        document,
        ti,
        true,
        undefined
      );

      expect(addressElements.length).to.be.equals(2);
      expect(addressElements[0].tagName).to.be.equals('Address');
      expect(addressElements[0].getAttribute('ti')).to.be.equals(ti);
      expect(addressElements[1].tagName).to.be.equals('Address');
      expect(addressElements[1].getAttribute('ti')).to.be.equals(ti);
      expect(addressElements[1].getAttribute('inverted')).to.be.equals('true');
    });

    it('only single address element created with expected value', async () => {
      const ti = '30';
      const expectedValue = 'ev';

      const addressElements = createAddressElements(
        document,
        ti,
        false,
        expectedValue
      );

      expect(addressElements.length).to.be.equals(1);
      expect(addressElements[0].tagName).to.be.equals('Address');
      expect(addressElements[0].getAttribute('ti')).to.be.equals(ti);
      expect(addressElements[0].getAttribute('expectedValue')).to.be.equals(
        expectedValue
      );
    });

    it('only two address element created without expected value', async () => {
      const ti = '30';
      const expectedValue = 'ev';

      const addressElements = createAddressElements(
        document,
        ti,
        true,
        expectedValue
      );

      expect(addressElements.length).to.be.equals(2);
      expect(addressElements[0].tagName).to.be.equals('Address');
      expect(addressElements[0].getAttribute('ti')).to.be.equals(ti);
      expect(addressElements[0].getAttribute('expectedValue')).to.be.equals(
        expectedValue
      );
      expect(addressElements[1].tagName).to.be.equals('Address');
      expect(addressElements[1].getAttribute('ti')).to.be.equals(ti);
      expect(addressElements[1].getAttribute('inverted')).to.be.equals('true');
      expect(addressElements[1].getAttribute('expectedValue')).to.be.equals(
        expectedValue
      );
    });
  });
});
