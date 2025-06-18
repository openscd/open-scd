import { expect } from '@open-wc/testing';

import {
  cloneElement,
  getChildElementsByTagName,
  getUniqueElementName,
} from '../src/foundation.js';

describe('foundation', () => {
  let scl1: Element;
  let scl2: Element;

  let substation: Element;
  let ied: Element;
  let communication: Element;
  let bay: Element;
  let privateSection: Element;
  let privateElement: Element;
  let publicElement: Element;

  beforeEach(async () => {
    scl1 = (
      await fetch('/test/testfiles/valid2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'))
    ).documentElement;
    scl2 = (
      await fetch('/test/testfiles/valid2003.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'))
    ).documentElement;

    substation = scl1.querySelector('Substation')!;
    ied = scl1.querySelector('IED')!;
    communication = scl1.querySelector('Communication')!;
    bay = scl1.querySelector('Bay')!;
    privateSection = bay.querySelector('Private')!;
    privateElement = privateSection.firstElementChild!;
    publicElement = bay.children.item(1)!;
  });

  describe('cloneElement', () => {
    let element: Element;
    beforeEach(() => {
      element = new DOMParser().parseFromString(
        `<Element attr1="attrValue" ></Element>`,
        'application/xml'
      ).documentElement;
    });
    it('does not copy child nodes', () => {
      const newElement = cloneElement(element, {});
      expect(newElement.childNodes.length).to.equal(0);
    });
    it('creates a newElement with specified attrs', () => {
      const attr1 = 'newAttr1';
      const attr2 = 'newAttr2';
      const newElement = cloneElement(element, { attr1, attr2 });
      expect(newElement.attributes.length).to.equal(2);
      expect(newElement).to.have.attribute('attr2', 'newAttr2');
    });
    it('leaves attr untouched if not part of attrs', () => {
      const attr2 = 'newAttr2';
      const newElement = cloneElement(element, { attr2 });
      expect(newElement.attributes.length).to.equal(2);
      expect(newElement).to.have.attribute('attr1', 'attrValue');
    });
    it('updates existing attr if part of attrs', () => {
      const attr1 = 'newAttr1';
      const newElement = cloneElement(element, { attr1 });
      expect(newElement.attributes.length).to.equal(1);
      expect(newElement).to.have.attribute('attr1', 'newAttr1');
    });
    it('removes existing attr if set to null', () => {
      const attr1 = null;
      const attr2 = 'newAttr2';
      const newElement = cloneElement(element, { attr1, attr2 });
      expect(newElement.attributes.length).to.equal(1);
      expect(newElement).to.not.have.attribute('attr1');
    });
  });

  describe('getUniqueElementName', () => {
    let parent: Element;
    beforeEach(() => {
      const testDoc = new DOMParser().parseFromString(
        '<Parent>' +
          '<Child name="newChild1"/><Child name="newChild2"/>' +
          '<Child2 name="newChild3"/><Child2 name="newChild21"/>' +
          '</Parent>',
        'application/xml'
      );
      parent = testDoc.querySelector<Element>('Parent')!;
    });

    it('returns unique name for Child', () =>
      expect(getUniqueElementName(parent, 'Child')).to.equal('newChild3'));

    it('returns unique name for Child2', () =>
      expect(getUniqueElementName(parent, 'Child2')).to.equal('newChild22'));
  });

  describe('getChildElementsByTagName', () => {
    let doc: Document;
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/lnodewizard.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    });
    it('returns a child Element array with a specific tag', () => {
      const parent = doc.querySelector('Bay[name="COUPLING_BAY"]');
      expect(getChildElementsByTagName(parent!, 'LNode').length).to.have.equal(
        parent?.querySelectorAll(
          ':root > Substation > VoltageLevel > Bay[name="COUPLING_BAY"] > LNode'
        ).length
      );
    });
  });
});
