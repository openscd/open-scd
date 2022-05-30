import {expect, fixtureSync, html} from '@open-wc/testing';

import {diffSclAttributes, diffSclChilds, renderDiff} from "../../../src/compas/CompasCompareDialog.js";

describe('compas-compare-dialog', () => {
  let oldSclElement: Element;
  let newSclElement: Element;

  beforeEach(async () => {
    oldSclElement = await fetch('/test/testfiles/compas/minigrid-3.0.0.cid')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'))
      .then(document => document.documentElement);
    newSclElement = await fetch('/test/testfiles/compas/minigrid-3.1.0.cid')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'))
      .then(document => document.documentElement);
  });

  describe('diff SCL childs', () => {
    it('get root child diffs', () => {
      const diffChilds = diffSclChilds(oldSclElement, newSclElement);
      expect(diffChilds).to.have.length(5);
    });

    it('get voltage level child diffs with removed bay', () => {
      const oldVoltageLevel = oldSclElement.querySelector('VoltageLevel[name="S4 110kV"]')
      const newVoltageLevel = newSclElement.querySelector('VoltageLevel[name="S4 110kV"]')

      const diffChilds = diffSclChilds(oldVoltageLevel!, newVoltageLevel!);
      expect(diffChilds).to.have.length(9);

      const removedBay = diffChilds.filter(diff => diff.newValue == null)
      expect(removedBay).to.have.length(1);
      expect(removedBay[0].oldValue?.tagName).to.be.equal('Bay')
    });
  });

  describe('diff SCL attributes', () => {
    it('get root attributes diffs', () => {
      const diffAttributes = diffSclAttributes(oldSclElement, newSclElement);
      expect(diffAttributes).to.have.length(0);
    });

    it('get header attributes diffs with different version', () => {
      const oldHeader = oldSclElement.querySelector('Header')
      const newHeader = newSclElement.querySelector('Header')

      const diffAttributes = diffSclAttributes(oldHeader!, newHeader!);
      expect(diffAttributes).to.have.length(1);
      expect(diffAttributes[0][0]).to.be.equal('version');
      expect(diffAttributes[0][1].oldValue).to.be.equal('3.0.0');
      expect(diffAttributes[0][1].newValue).to.be.equal('3.1.0');
    });
  });

  describe('rendering full compare dialog', () => {
    let element: Element;

    beforeEach(async () => {
      element = fixtureSync(html`<div>${renderDiff(oldSclElement, newSclElement)}</div>`);
      await element;
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).to.equalSnapshot();
    });
  });
});
