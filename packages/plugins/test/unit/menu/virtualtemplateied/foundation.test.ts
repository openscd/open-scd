import { expect } from '@open-wc/testing';
import { identity } from '@openscd/open-scd/src/foundation.js';

import {
  getFunctionNamingPrefix,
  getNonLeafParent,
  getSpecificationIED,
  getUniqueFunctionName,
  isLeafFunction,
  VirtualIEDDescription,
} from '../../../../src/menu/virtualtemplateied/foundation.js';

describe('foundation for virtual IED creation', () => {
  describe('function checking for leaf function type elements', () => {
    let randomElement: Element;
    let leafSubFunction: Element;
    let nonLeafSubFunction: Element;
    let leafEqSubFunction: Element;
    let nonLeafEqSubFunction: Element;

    beforeEach(() => {
      randomElement = new DOMParser().parseFromString(
        '<Element name="someFunction"></Element>',
        'application/xml'
      ).documentElement;

      leafSubFunction = new DOMParser().parseFromString(
        '<SubFunction name="leafFunction"><LNode/></SubFunction>',
        'application/xml'
      ).documentElement;

      nonLeafSubFunction = new DOMParser().parseFromString(
        '<SubFunction name="nonLeafFunction"><LNode/><LNode/></SubFunction>',
        'application/xml'
      ).documentElement;

      leafEqSubFunction = new DOMParser().parseFromString(
        '<EqSubFunction name="leafFunction"><LNode/></EqSubFunction>',
        'application/xml'
      ).documentElement;

      nonLeafEqSubFunction = new DOMParser().parseFromString(
        '<EqSubFunction name="nonLeafFunction"><LNode/><LNode/></EqSubFunction>',
        'application/xml'
      ).documentElement;
    });

    it('returns false for input null', () =>
      expect(isLeafFunction(null)).to.be.false);

    it('returns false for Function element', () =>
      expect(isLeafFunction(randomElement)).to.be.false);

    it('returns true for leaf SubFcuntion element', () =>
      expect(isLeafFunction(leafSubFunction)).to.be.true);

    it('returns true for non-leaf SubFuction element', () =>
      expect(isLeafFunction(nonLeafSubFunction)).to.be.false);

    it('returns true for leaf EqSubFunction element', () =>
      expect(isLeafFunction(leafEqSubFunction)).to.be.true);

    it('returns true for non-leaf SubFunction element', () =>
      expect(isLeafFunction(nonLeafEqSubFunction)).to.be.false);
  });

  describe('getNonLeafParent function', () => {
    let invalidParantTag: Element;
    let directParent: Element;
    let directParentsLNode: Element | null;
    let leafParent: Element;
    let leafParentsLNode: Element | null;

    beforeEach(() => {
      invalidParantTag = new DOMParser().parseFromString(
        '<Element name="someElement"><LNode/></Element>',
        'application/xml'
      ).documentElement;

      directParent = new DOMParser().parseFromString(
        '<SubFunction name="leafFunction"><LNode/><LNode/></SubFunction>',
        'application/xml'
      ).documentElement;
      directParentsLNode = directParent.querySelector('LNode');

      leafParent = new DOMParser().parseFromString(
        '<Function name="onLeaf"><SubFunction name="leafFunction"><LNode/></SubFunction></Function>',
        'application/xml'
      ).documentElement;
      leafParentsLNode = leafParent.querySelector('LNode');
    });

    it('return null for null inputs', () =>
      expect(getNonLeafParent(null)).to.be.null);

    it('returns null for invalid closest parent tag', () =>
      expect(getNonLeafParent(invalidParantTag)).to.be.null);

    it('returns null for invalid parent tag', () =>
      expect(getNonLeafParent(directParentsLNode)).to.equal(directParent));

    it('returns null for invalid parent tag', () =>
      expect(getNonLeafParent(leafParentsLNode)).to.equal(leafParent));
  });

  describe('getFunctionNamingPrefix function', () => {
    let lNodeWithPrefix: Element;
    let lNodeWithOutPrefix: Element;
    let leafSubFunction: Element;
    let leafSubFunctionsLNode: Element;
    let nonLeafSubFunction: Element;
    let nonLeafSubFunctionsLNode: Element;

    beforeEach(() => {
      lNodeWithPrefix = new DOMParser().parseFromString(
        '<LNode prefix=""/>',
        'application/xml'
      ).documentElement;

      lNodeWithOutPrefix = new DOMParser().parseFromString(
        '<LNode />',
        'application/xml'
      ).documentElement;

      leafSubFunction = new DOMParser().parseFromString(
        '<SubFunction name="leafFunction"><LNode/></SubFunction>',
        'application/xml'
      ).documentElement;
      leafSubFunctionsLNode = leafSubFunction.querySelector('LNode')!;

      nonLeafSubFunction = new DOMParser().parseFromString(
        '<SubFunction name="leafFunction"><LNode/><LNode/></SubFunction>',
        'application/xml'
      ).documentElement;
      nonLeafSubFunctionsLNode = nonLeafSubFunction.querySelector('LNode')!;
    });

    it('return prefix attribute if present in LNode', () =>
      expect(getFunctionNamingPrefix(lNodeWithPrefix)).to.equal(
        lNodeWithPrefix.getAttribute('prefix')
      ));

    it('return empty string if no valid prefix exist', () =>
      expect(getFunctionNamingPrefix(lNodeWithOutPrefix)).to.equal(''));

    it('returns leaf SubFunction name for missing prefix attribute', () =>
      expect(getFunctionNamingPrefix(leafSubFunctionsLNode)).to.be.equal(
        'leafFunction'
      ));

    it('returns empty string if no valid string exist', () =>
      expect(getFunctionNamingPrefix(nonLeafSubFunctionsLNode)).to.be.equal(
        ''
      ));
  });

  describe('getUniqueFunctionName function', () => {
    let doc: XMLDocument;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/virtualied/specificfromfunctions.ssd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    });

    it('return unique name for function type element', () =>
      expect(
        getUniqueFunctionName(
          doc.querySelector('EqFunction[name="Disconnector"]')!
        )
      ).to.equal('Q01_QB1_Disconnector'));

    it('return unique name for another function type element', () =>
      expect(
        getUniqueFunctionName(
          doc.querySelector('EqFunction[name="Earth_Switch"]')!
        )
      ).to.equal('E1_Q01_QC9_Earth_Switch'));

    it('return function type element name if already unique in project', () =>
      expect(
        getUniqueFunctionName(
          doc.querySelector('Function[name="Distance_Protection"]')!
        )
      ).to.equal('Distance_Protection'));

    it('return identity string in case input element is not function type element', () =>
      expect(getUniqueFunctionName(doc.querySelector('Bay')!)).to.equal(
        identity(doc.querySelector('Bay'))
      ));
  });

  describe('getUniqueFunctionName function', () => {
    let doc: XMLDocument;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/virtualied/specificfromfunctions.ssd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    });

    it('return unique name for function type element', () =>
      expect(
        getUniqueFunctionName(
          doc.querySelector('EqFunction[name="Disconnector"]')!
        )
      ).to.equal('Q01_QB1_Disconnector'));

    it('return unique name for another function type element', () =>
      expect(
        getUniqueFunctionName(
          doc.querySelector('EqFunction[name="Earth_Switch"]')!
        )
      ).to.equal('E1_Q01_QC9_Earth_Switch'));

    it('return function type element name if already unique in project', () =>
      expect(
        getUniqueFunctionName(
          doc.querySelector('Function[name="Distance_Protection"]')!
        )
      ).to.equal('Distance_Protection'));

    it('return identity string in case input element is not function type element', () =>
      expect(getUniqueFunctionName(doc.querySelector('Bay')!)).to.equal(
        identity(doc.querySelector('Bay'))
      ));
  });

  describe('getSpecificationIED function', () => {
    let doc: XMLDocument;
    let virtualIED: VirtualIEDDescription;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/virtualied/specificfromfunctions.ssd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      virtualIED = {
        manufacturer: 'some manufactorer',
        desc: null,
        apName: 'P1',
        lDevices: [
          {
            validLdInst: 'someProtection',
            anyLNs: [
              { lnClass: 'LLN0', inst: '', prefix: null, lnType: 'someLLN0' },
              { lnClass: 'PTOC', inst: '1', prefix: 'IDD', lnType: 'somePTOC' },
            ],
          },
          {
            validLdInst: 'someControl',
            anyLNs: [
              { lnClass: 'LLN0', inst: '', prefix: null, lnType: 'someLLN0' },
              { lnClass: 'CSWI', inst: '1', prefix: '', lnType: 'someCSWI' },
            ],
          },
        ],
      };
    });

    it('looks like the latest snapshot', async () =>
      await expect(
        getSpecificationIED(doc, virtualIED)
      ).dom.to.equalSnapshot());
  });
});
