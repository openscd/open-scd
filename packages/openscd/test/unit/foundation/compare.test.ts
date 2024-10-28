import { expect, fixtureSync } from '@open-wc/testing';

import { html } from 'lit-element';

import {
  DiffFilter,
  diffSclAttributes,
  diffSclChilds,
  identityForCompare,
  isSame,
  renderDiff,
} from '../../../src/foundation/compare.js';

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

  describe('identityForCompare', () => {
    it('will return the identity of the sub element, not the full identity', () => {
      const voltageLevel = oldSclElement.querySelector(
        'VoltageLevel[name="S1 30kV"]'
      );

      const result = identityForCompare(voltageLevel!);
      expect(result).to.be.equal('S1 30kV');
    });

    it('will return the identity of the main element, meaning the full identity', () => {
      const substation = oldSclElement.querySelector(
        'Substation[name="Substation 1"]'
      );

      const result = identityForCompare(substation!);
      expect(result).to.be.equal('Substation 1');
    });

    it('will return the NaN of the root element', () => {
      const substation = oldSclElement.querySelector('SCL');

      const result = identityForCompare(substation!);
      expect(result).to.be.NaN;
    });
  });

  describe('isSame', () => {
    it('will return true when the same elements are passed', () => {
      const voltageLevel = oldSclElement.querySelector(
        'VoltageLevel[name="S1 30kV"]'
      );

      const same = isSame(voltageLevel!, voltageLevel!);
      expect(same).to.be.true;
    });

    it('will return true when the same elements from different sources are passed', () => {
      const newVoltageLevel = newSclElement.querySelector(
        'VoltageLevel[name="S1 30kV"]'
      );
      const oldVoltageLevel = oldSclElement.querySelector(
        'VoltageLevel[name="S1 30kV"]'
      );

      const same = isSame(newVoltageLevel!, oldVoltageLevel!);
      expect(same).to.be.true;
    });

    it('will return false when the different type of elements are passed', () => {
      const voltageLevel = oldSclElement.querySelector(
        'VoltageLevel[name="S1 30kV"]'
      );
      const substation = oldSclElement.querySelector(
        'Substation[name="Substation 1"]'
      );

      const same = isSame(voltageLevel!, substation!);
      expect(same).to.be.false;
    });

    it('will return false when the different elements of the same type are passed', () => {
      const voltageLevel = oldSclElement.querySelector(
        'VoltageLevel[name="S1 30kV"]'
      );
      const differentVoltageLevel = oldSclElement.querySelector(
        'VoltageLevel[name="S1 380kV"]'
      );

      const same = isSame(differentVoltageLevel!, voltageLevel!);
      expect(same).to.be.false;
    });
  });

  describe('diffSclAttributes', () => {
    it('no attributes changed', () => {
      const newVoltageLevel = newSclElement.querySelector(
        'VoltageLevel[name="S1 30kV"]'
      );
      const oldVoltageLevel = oldSclElement.querySelector(
        'VoltageLevel[name="S1 30kV"]'
      );

      const diffAttributes = diffSclAttributes(
        newVoltageLevel!,
        oldVoltageLevel!,
        {},
        newVoltageLevel!
      );
      expect(diffAttributes).to.have.length(0);
    });

    it('one attribute has changed', () => {
      const newVoltageLevel = newSclElement.querySelector(
        'VoltageLevel[name="S1 110kV"]'
      );
      const oldVoltageLevel = oldSclElement.querySelector(
        'VoltageLevel[name="S1 110kV"]'
      );

      const diffAttributes = diffSclAttributes(
        newVoltageLevel!,
        oldVoltageLevel!,
        {},
        newVoltageLevel!
      );
      expect(diffAttributes).to.have.length(1);
      expect(diffAttributes[0][0]).to.be.equal('desc');
      expect(diffAttributes[0][1].oldValue).to.be.null;
      expect(diffAttributes[0][1].newValue).to.be.equal('Extra Voltage Level');
    });

    it('only name changed on copied element', () => {
      const newSubstation = newSclElement.querySelector(
        'Substation[name="Substation 1 (Copy)"]'
      );
      const oldSubstation = oldSclElement.querySelector(
        'Substation[name="Substation 1"]'
      );

      const diffAttributes = diffSclAttributes(newSubstation!, oldSubstation!, {}, newSubstation!);
      expect(diffAttributes).to.have.length(1);
      expect(diffAttributes[0][0]).to.be.equal('name');
      expect(diffAttributes[0][1].oldValue).to.be.equal('Substation 1');
      expect(diffAttributes[0][1].newValue).to.be.equal('Substation 1 (Copy)');
    });
  });

  describe('diffSclChilds', () => {
    it('all children can be updated', () => {
      const newVoltageLevel = newSclElement.querySelector(
        'VoltageLevel[name="S1 380kV"]'
      );
      const oldVoltageLevel = oldSclElement.querySelector(
        'VoltageLevel[name="S1 380kV"]'
      );

      const diffChilds = diffSclChilds(newVoltageLevel!, oldVoltageLevel!, {}, newVoltageLevel!, oldVoltageLevel!);
      expect(diffChilds).to.have.length(5);

      const updatedChilds = diffChilds.filter(
        diff => diff.newValue !== null && diff.oldValue !== null
      );
      expect(updatedChilds).to.have.length(5);
    });

    it('all children can be updated of a copied element', () => {
      const newSubstation = newSclElement.querySelector(
        'Substation[name="Substation 1 (Copy)"]'
      );
      const oldSubstation = oldSclElement.querySelector(
        'Substation[name="Substation 1"]'
      );

      const diffChilds = diffSclChilds(newSubstation!, oldSubstation!, {}, newSclElement, oldSclElement);
      expect(diffChilds).to.have.length(3);

      const updatedChilds = diffChilds.filter(
        diff => diff.newValue !== null && diff.oldValue !== null
      );
      expect(updatedChilds).to.have.length(3);
    });

    it('one child is added', () => {
      const newVoltageLevel = newSclElement.querySelector(
        'VoltageLevel[name="S1 30kV"]'
      );
      const oldVoltageLevel = oldSclElement.querySelector(
        'VoltageLevel[name="S1 30kV"]'
      );

      const diffChilds = diffSclChilds(newVoltageLevel!, oldVoltageLevel!, {}, newSclElement, oldSclElement);
      expect(diffChilds).to.have.length(5);

      const addedBay = diffChilds.filter(diff => diff.oldValue === null);
      expect(addedBay).to.have.length(1);
      expect(addedBay[0].newValue?.tagName).to.be.equal('Bay');
    });

    it('one child is removed', () => {
      const newVoltageLevel = newSclElement.querySelector(
        'VoltageLevel[name="S1 110kV"]'
      );
      const oldVoltageLevel = oldSclElement.querySelector(
        'VoltageLevel[name="S1 110kV"]'
      );

      const diffChilds = diffSclChilds(newVoltageLevel!, oldVoltageLevel!, {}, newVoltageLevel!, oldVoltageLevel!);
      expect(diffChilds).to.have.length(7);

      const removedBay = diffChilds.filter(diff => diff.newValue === null);
      expect(removedBay).to.have.length(1);
      expect(removedBay[0].oldValue?.tagName).to.be.equal('Bay');
    });
  });

  describe('renderDiff', () => {
    it('no changes, so no template is returned', async () => {
      const newVoltageLevel = newSclElement.querySelector(
        'VoltageLevel[name="S1 380kV"]'
      );
      const oldVoltageLevel = oldSclElement.querySelector(
        'VoltageLevel[name="S1 380kV"]'
      );

      const templateResult = renderDiff(newVoltageLevel!, oldVoltageLevel!);
      expect(templateResult).to.be.null;
    });

    it('child is added, so check latest snapshot', async () => {
      const newVoltageLevel = newSclElement.querySelector(
        'VoltageLevel[name="S1 30kV"]'
      );
      const oldVoltageLevel = oldSclElement.querySelector(
        'VoltageLevel[name="S1 30kV"]'
      );

      const templateResult = renderDiff(newVoltageLevel!, oldVoltageLevel!);
      expect(templateResult).to.be.not.null;

      const element = fixtureSync(html`<div>${templateResult}</div>`);
      await element;
      await expect(element).to.equalSnapshot();
    });

    it('child is removed and attribute added/removed/updated, so check latest snapshot', async () => {
      const newVoltageLevel = newSclElement.querySelector(
        'VoltageLevel[name="S1 110kV"]'
      );
      const oldVoltageLevel = oldSclElement.querySelector(
        'VoltageLevel[name="S1 110kV"]'
      );

      const templateResult = renderDiff(newVoltageLevel!, oldVoltageLevel!);
      expect(templateResult).to.be.not.null;

      const element = fixtureSync(html`<div>${templateResult}</div>`);
      await element;
      await expect(element).to.equalSnapshot();
    });

    it('child is added, but is ignored', async () => {
      const newVoltageLevel = newSclElement.querySelector(
        'VoltageLevel[name="S1 30kV"]'
      );
      const oldVoltageLevel = oldSclElement.querySelector(
        'VoltageLevel[name="S1 30kV"]'
      );

      const ignoreDiffs: DiffFilter<Element> = {
        'Bay': {
          full: true
        }
      }
      const templateResult = renderDiff(newVoltageLevel!, oldVoltageLevel!, ignoreDiffs);

      expect(templateResult).to.be.null;
    });

    it('attribute is updated, but is ignored, so check latest snapshot', async () => {
      const newVoltageLevel = newSclElement.querySelector(
        'VoltageLevel[name="S1 110kV"]'
      );
      const oldVoltageLevel = oldSclElement.querySelector(
        'VoltageLevel[name="S1 110kV"]'
      );
      const ignoreDiffs: DiffFilter<Element> = {
        'Bay': {
          full: false,
          attributes: {
            'desc': true
          }
        }
      };

      const templateResult = renderDiff(newVoltageLevel!, oldVoltageLevel!, ignoreDiffs);

      expect(templateResult).to.be.not.null;

      const element = fixtureSync(html`<div>${templateResult}</div>`);
      await element;
      await expect(element).to.equalSnapshot();
    });

  });
});
