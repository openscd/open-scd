import { expect, fixtureSync } from '@open-wc/testing';

import {
  diffSclAttributes,
  diffSclChilds,
  renderDiff,
} from '../../../src/foundation/compare.js';
import { html } from 'lit-element';

describe('compas-compare-dialog', () => {
  let oldSclElement: Element;
  let newSclElement: Element;

  beforeEach(async () => {
    oldSclElement = await fetch(
      '/test/testfiles/foundation/compare-original.cid'
    )
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'))
      .then(document => document.documentElement);
    newSclElement = await fetch(
      '/test/testfiles/foundation/compare-changed.cid'
    )
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'))
      .then(document => document.documentElement);
  });

  describe('diffSclAttributes', () => {
    it('no attributes changed', () => {
      const oldVoltageLevel = oldSclElement.querySelector(
        'VoltageLevel[name="S1 30kV"]'
      );
      const newVoltageLevel = newSclElement.querySelector(
        'VoltageLevel[name="S1 30kV"]'
      );

      const diffAttributes = diffSclAttributes(
        oldVoltageLevel!,
        newVoltageLevel!
      );
      expect(diffAttributes).to.have.length(0);
    });

    it('one attribute has changed', () => {
      const oldVoltageLevel = oldSclElement.querySelector(
        'VoltageLevel[name="S1 110kV"]'
      );
      const newVoltageLevel = newSclElement.querySelector(
        'VoltageLevel[name="S1 110kV"]'
      );

      const diffAttributes = diffSclAttributes(
        oldVoltageLevel!,
        newVoltageLevel!
      );
      expect(diffAttributes).to.have.length(1);
      expect(diffAttributes[0][0]).to.be.equal('desc');
      expect(diffAttributes[0][1].oldValue).to.be.null;
      expect(diffAttributes[0][1].newValue).to.be.equal('Extra Voltage Level');
    });
  });

  describe('diffSclChilds', () => {
    it('all children can be updated', () => {
      const oldVoltageLevel = oldSclElement.querySelector(
        'VoltageLevel[name="S1 380kV"]'
      );
      const newVoltageLevel = newSclElement.querySelector(
        'VoltageLevel[name="S1 380kV"]'
      );

      const diffChilds = diffSclChilds(oldVoltageLevel!, newVoltageLevel!);
      expect(diffChilds).to.have.length(5);

      const updatedChilds = diffChilds.filter(
        diff => diff.newValue !== null && diff.oldValue !== null
      );
      expect(updatedChilds).to.have.length(5);
    });

    it('one child is added', () => {
      const oldVoltageLevel = oldSclElement.querySelector(
        'VoltageLevel[name="S1 30kV"]'
      );
      const newVoltageLevel = newSclElement.querySelector(
        'VoltageLevel[name="S1 30kV"]'
      );

      const diffChilds = diffSclChilds(oldVoltageLevel!, newVoltageLevel!);
      expect(diffChilds).to.have.length(5);

      const addedBay = diffChilds.filter(diff => diff.oldValue === null);
      expect(addedBay).to.have.length(1);
      expect(addedBay[0].newValue?.tagName).to.be.equal('Bay');
    });

    it('one child is removed', () => {
      const oldVoltageLevel = oldSclElement.querySelector(
        'VoltageLevel[name="S1 110kV"]'
      );
      const newVoltageLevel = newSclElement.querySelector(
        'VoltageLevel[name="S1 110kV"]'
      );

      const diffChilds = diffSclChilds(oldVoltageLevel!, newVoltageLevel!);
      expect(diffChilds).to.have.length(7);

      const removedBay = diffChilds.filter(diff => diff.newValue === null);
      expect(removedBay).to.have.length(1);
      expect(removedBay[0].oldValue?.tagName).to.be.equal('Bay');
    });
  });

  describe('renderDiff', () => {
    it('no changes, so no template is returned', async () => {
      const oldVoltageLevel = oldSclElement.querySelector(
        'VoltageLevel[name="S1 380kV"]'
      );
      const newVoltageLevel = newSclElement.querySelector(
        'VoltageLevel[name="S1 380kV"]'
      );

      const templateResult = renderDiff(oldVoltageLevel!, newVoltageLevel!);
      expect(templateResult).to.be.null;
    });

    it('child is added, so check latest snapshot', async () => {
      const oldVoltageLevel = oldSclElement.querySelector(
        'VoltageLevel[name="S1 30kV"]'
      );
      const newVoltageLevel = newSclElement.querySelector(
        'VoltageLevel[name="S1 30kV"]'
      );

      const templateResult = renderDiff(oldVoltageLevel!, newVoltageLevel!);
      expect(templateResult).to.be.not.null;

      const element = fixtureSync(html`<div>${templateResult}</div>`);
      await element;
      await expect(element).to.equalSnapshot();
    });

    it('child is removed and attribute added/removed/updated, so check latest snapshot', async () => {
      const oldVoltageLevel = oldSclElement.querySelector(
        'VoltageLevel[name="S1 110kV"]'
      );
      const newVoltageLevel = newSclElement.querySelector(
        'VoltageLevel[name="S1 110kV"]'
      );

      const templateResult = renderDiff(oldVoltageLevel!, newVoltageLevel!);
      expect(templateResult).to.be.not.null;

      const element = fixtureSync(html`<div>${templateResult}</div>`);
      await element;
      await expect(element).to.equalSnapshot();
    });
  });
});
