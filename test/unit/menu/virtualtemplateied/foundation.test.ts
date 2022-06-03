import { expect } from '@open-wc/testing';

import {
  getNonLeafParent,
  isLeafFunction,
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
});
