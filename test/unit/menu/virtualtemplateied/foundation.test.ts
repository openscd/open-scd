import { expect } from '@open-wc/testing';

import { isLeafFunction } from '../../../../src/menu/virtualtemplateied/foundation.js';

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
});
