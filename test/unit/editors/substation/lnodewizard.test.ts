import { expect } from '@open-wc/testing';

import { getLNode } from '../../../../src/wizards/lnode.js';

describe('lnodewizard', () => {
  describe('defines a getLNode function that', () => {
    let doc: Document;
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/lnodewizard.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    });

    it('returns LNode on existing lnode references in the parent element', () => {
      expect(
        getLNode(
          doc.querySelector('Bay[name="COUPLING_BAY"]')!,
          doc.querySelector(
            'IED[name="IED2"] LDevice[inst="CBSW"] > LN[lnClass="XSWI"][inst="3"]'
          )!
        )
      ).to.not.be.null;
    });

    it('returns LNode with missing or empty prefix in LN', () => {
      expect(
        getLNode(
          doc.querySelector('Bay[name="COUPLING_BAY"]')!,
          doc.querySelector(
            'IED[name="IED2"] LDevice[inst="CBSW"] > LN[lnClass="LPHD"][inst="1"]'
          )!
        )
      ).to.not.be.null;
    });

    it('returns LNode with missing or empty prefix and missing or empty inst in LN0', () => {
      expect(
        getLNode(
          doc.querySelector('Bay[name="COUPLING_BAY"]')!,
          doc.querySelector('IED[name="IED2"] LDevice[inst="CBSW"] > LN0')!
        )
      ).to.not.be.null;
    });
  });
});
