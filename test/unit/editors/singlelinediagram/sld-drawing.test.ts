import { expect } from '@open-wc/testing';
import {
  createPowerTransformerElement,
  getAbsolutePosition,
  getBusBarLength,
  getParentElementName,
  SVG_GRID_SIZE,
} from '../../../../src/editors/singlelinediagram/sld-drawing.js';

describe('Single Line Diagram drawing', () => {
  let doc: Document;
  beforeEach(async () => {
    doc = await fetch('/test/testfiles/valid2007B4withSubstationXY.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('defines a getAbsolutePosition function that', () => {
    it('returns the correct absolute position for an element with a Bay as parent.', () => {
      const element = doc.querySelector(
        'Bay[name="Bay A"] > ConductingEquipment[name="QB1"]'
      );
      // Absolute position of QB1 should be x=(1 + 1 + 1), and y=(1 + 6 + 3), if looking at the coordinates of all the parents.
      // Times the SVG_GRID_SIZE to get the absolute position on the svg.
      expect(getAbsolutePosition(element!)).to.eql({
        x: 3 * SVG_GRID_SIZE,
        y: 10 * SVG_GRID_SIZE,
      });
    });

    it('returns the correct absolute position for an element with a VoltageLevel as parent.', () => {
      const element = doc.querySelector('Bay[name="BusBar A"]');
      // Absolute position of Busbar A should be x=(1 + 1), and y=(1 + 3), if looking at the coordinates of all the parents.
      // Times the SVG_GRID_SIZE to get the absolute position on the svg.
      expect(getAbsolutePosition(element!)).to.eql({
        x: 2 * SVG_GRID_SIZE,
        y: 4 * SVG_GRID_SIZE,
      });
    });

    it('returns relative position elements without legal parent.', () => {
      const element = doc.querySelector('VoltageLevel[name="J1"]');
      const copiedElement = <Element>element?.cloneNode();

      expect(getAbsolutePosition(copiedElement!)).to.eql({
        x: 1 * SVG_GRID_SIZE,
        y: 3 * SVG_GRID_SIZE,
      });
    });

    it('returns default for invalid elements.', () => {
      const element = doc.querySelector('LDevice');

      expect(getAbsolutePosition(element!)).to.eql({
        x: 0,
        y: 0,
      });
    });
  });

  describe('defines a getParentElementName function that', () => {
    it('returns the correct parent of an element.', () => {
      const element = doc.querySelector(
        'Bay[name="Bay A"] > ConnectivityNode[name="L2"]'
      );
      expect(getParentElementName(element!)).to.eql('Bay A');
    });
    it('returns undefined for an element without a parent.', () => {
      const element = doc.querySelector('Substation');
      expect(getParentElementName(element!)).to.be.undefined;
    });
  });

  describe('defines a getBusBarLength function that', () => {
    it('returns a correct length for the bus bar given voltage level as root', () => {
      const element = doc.querySelector('VoltageLevel[name="J1"]') ?? doc;
      expect(getBusBarLength(element)).to.eql(
        18 * SVG_GRID_SIZE + SVG_GRID_SIZE
      );
    });
    it('returns a correct length for the bus bar given XMLDocument as root', () => {
      expect(getBusBarLength(doc)).to.eql(18 * SVG_GRID_SIZE + SVG_GRID_SIZE);
    });
  });

  describe('creates a group element for every given PowerTransformer element that', () => {
    it('looks like its latest snapshot', () => {
      const pTrans = doc.querySelector('PowerTransformer')!;
      expect(createPowerTransformerElement(pTrans)).to.equalSnapshot();
    });
  });
});
