import { expect } from '@open-wc/testing';

import { existFcdaReference } from '../../../src/foundation/scl.js';

describe('Global SCL related functions including', () => {
  let ied: Element;
  let fcda1: Element;
  let fcda2: Element;

  beforeEach(async () => {
    const doc = await fetch('/test/testfiles/foundation/sclbasics.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    ied = doc.querySelector('IED')!;

    fcda1 = doc.createElementNS(doc.documentElement.namespaceURI, 'FCDA');
    fcda1.setAttribute('ldInst', 'ldInst1');
    fcda1.setAttribute('prefix', 'my');
    fcda1.setAttribute('lnClass', 'MMXU');
    fcda1.setAttribute('lnInst', '1');
    fcda1.setAttribute('doName', 'A.phsA');
    fcda1.setAttribute('daName', 'cVal.mag.i');
    fcda1.setAttribute('fc', 'MX');

    fcda2 = doc.createElementNS(doc.documentElement.namespaceURI, 'FCDA');
    fcda2.setAttribute('ldInst', 'ldInst1');
    fcda2.setAttribute('prefix', '');
    fcda2.setAttribute('lnClass', 'LLN0');
    fcda2.setAttribute('lnInst', '');
    fcda2.setAttribute('doName', 'Beh');
    fcda2.setAttribute('daName', 'stVal');
    fcda2.setAttribute('fc', 'ST');
  });

  describe('a function that checks FCDA reference validity in IED that', () => {
    it('return false for invalid LDevice instance', () => {
      fcda1.setAttribute('ldInst', 'ldInst');
      expect(existFcdaReference(fcda1, ied)).to.be.false;
    });

    it('returns false for invalid LN prefix', () => {
      fcda1.setAttribute('prefix', 'mys');
      expect(existFcdaReference(fcda1, ied)).to.be.false;
    });

    it('equally treats missing and empty LN prefix', () => {
      fcda2.removeAttribute('prefix');
      expect(existFcdaReference(fcda2, ied)).to.be.true;
    });

    it('returns false for invalid LN lnClass', () => {
      fcda1.setAttribute('lnClass', 'LLN0');
      expect(existFcdaReference(fcda1, ied)).to.be.false;
    });

    it('returns false for invalid LN inst', () => {
      fcda1.setAttribute('prefix', '2');
      expect(existFcdaReference(fcda1, ied)).to.be.false;
    });

    it('equally treats missing and empty LN prefix', () => {
      fcda2.removeAttribute('lnInst');
      expect(existFcdaReference(fcda2, ied)).to.be.true;
    });

    it('returns false for invalid DO name', () => {
      fcda2.setAttribute('doName', 'beh');
      expect(existFcdaReference(fcda2, ied)).to.be.false;
    });

    it('returns false for invalid SDO name', () => {
      fcda1.setAttribute('doName', 'A.PhsA');
      expect(existFcdaReference(fcda1, ied)).to.be.false;
    });

    it('returns false for invalid DA name', () => {
      fcda2.setAttribute('daName', 'StVal');
      expect(existFcdaReference(fcda2, ied)).to.be.false;
    });

    it('returns false for invalid BDA name', () => {
      fcda1.setAttribute('daName', 'cVal.maG.i');
      expect(existFcdaReference(fcda1, ied)).to.be.false;
    });

    it('returns false for missing FC in FCD type data reference', () => {
      fcda1.removeAttribute('daName');
      fcda1.setAttribute('fc', 'CO');
      expect(existFcdaReference(fcda1, ied)).to.be.false;
    });

    it('returns true for FCD type data reference', () => {
      fcda1.removeAttribute('daName');
      expect(existFcdaReference(fcda1, ied)).to.be.true;
    });

    it('returns false for invalid FC definition', () => {
      fcda1.setAttribute('fc', 'ST');
      expect(existFcdaReference(fcda1, ied)).to.be.false;

      fcda2.setAttribute('fc', 'MX');
      expect(existFcdaReference(fcda2, ied)).to.be.false;
    });

    it('returns true for existing MMXU data reference', () =>
      expect(existFcdaReference(fcda1, ied)).to.be.true);

    it('returns true for existing LLN0 data reference', () =>
      expect(existFcdaReference(fcda2, ied)).to.be.true);
  });
});
