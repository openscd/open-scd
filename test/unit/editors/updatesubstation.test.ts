import { expect } from '@open-wc/testing';

import { isValidReference } from '../../../src/menu/UpdateSubstation.js';
import { identity } from '../../../src/foundation.js';

describe('isValidReference', () => {
  let ours: XMLDocument;
  beforeEach(async () => {
    ours = await fetch('/test/testfiles/updatesubstation-ours.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  it('returns true for lNodeIdentity pointing to logical node in the IED', () => {
    const lNode = ours.querySelector(
      'LNode[iedName="IED1"][ldInst="Disconnectors"][prefix="DC"][lnClass="XSWI"][lnInst="1"]'
    );
    expect(isValidReference(ours, identity(lNode))).to.be.true;
  });
  it('checks reference for client side logical nodes', () => {
    const lNode = ours.querySelector(
      'LNode[iedName="IED1"][prefix="DC3"][lnClass="XSWI"][lnInst="2"]'
    );
    expect(isValidReference(ours, identity(lNode))).to.be.true;
  });
  it('returns false for NaN identities', () => {
    expect(isValidReference(ours, NaN)).to.be.false;
  });
  it('returns false for incorrect lNodeIdentities', () => {
    const lNodeMissingIedNAme = ours.querySelector(
      'LNode[iedName="IED1"][prefix="DC"][lnClass="XSWI"][lnInst="2"]'
    );
    lNodeMissingIedNAme?.removeAttribute('iedName');
    expect(isValidReference(ours, identity(lNodeMissingIedNAme))).to.be.false;
    const lNodeMissingLnClass = ours.querySelector(
      'LNode[iedName="IED1"][prefix="DC"][lnClass="XSWI"][lnInst="2"]'
    );
    lNodeMissingLnClass?.removeAttribute('iedName');
    expect(isValidReference(ours, identity(lNodeMissingLnClass))).to.be.false;
  });
  it('returns false when reference does not match with logical node', () => {
    const lNode = ours.querySelector(
      'LNode[iedName="IED1"][ldInst="Disconnectors"][prefix="DC"][lnClass="XSWI"][lnInst="1"]'
    );
    lNode?.setAttribute('lnClass', 'LPHD');
    expect(isValidReference(ours, identity(lNode))).to.be.false;
  });
});
