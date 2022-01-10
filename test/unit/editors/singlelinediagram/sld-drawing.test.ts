import { expect } from '@open-wc/testing';
import { SCL_COORDINATES_NAMESPACE } from '../../../../src/editors/singlelinediagram/foundation.js';
import {
  createBayElement,
  createBusBarElement,
  createConductingEquipmentElement,
  createConnectivityNodeElement,
  createPowerTransformerElement,
  createTerminalElement,
  createVoltageLevelElement,
  EQUIPMENT_SIZE,
  getAbsolutePosition,
  getBusBarLength,
  getDirections,
  getParentElementName,
  SVG_GRID_SIZE,
} from '../../../../src/editors/singlelinediagram/sld-drawing.js';

function setCoordinates(element: Element, x: number, y: number): void {
  element.setAttributeNS(
    SCL_COORDINATES_NAMESPACE,
    'x',
    `${x}`
  );

  element.setAttributeNS(
    SCL_COORDINATES_NAMESPACE,
    'y',
    `${y}`
  );
}

describe('Single Line Diagram drawing', () => {
  let doc: Document;
  beforeEach(async () => {
    doc = await fetch('/test/testfiles/valid2007B4withSubstationXY.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('defines getDirections for equipment to connectivity node connection', () => {
    let equipment: Element;
    let cNode: Element;
    beforeEach(() => {
      equipment = doc.querySelector(
        'VoltageLevel[name="J1"] > Bay[name="Bay A"] > ConductingEquipment[name="QA1"]'
      )!;

      cNode = doc.querySelector(
        'VoltageLevel[name="J1"] > Bay[name="Bay A"] > ConnectivityNode[name="L2"]'
      )!;
    });

    it('return correct directions for equipment to cNode positioning', () => {
      expect(getDirections(equipment, cNode)).to.deep.equal({
        startDirection: 'bottom',
        endDirection: 'top',
      });
    });

    it('return correct directions for another equipment to cNode positioning', () => {
      setCoordinates(equipment, 2, 7);

      expect(getDirections(equipment, cNode)).to.deep.equal({
        startDirection: 'top',
        endDirection: 'bottom',
      });
    });

    it('return correct directions for another equipment to cNode positioning', () => {
      setCoordinates(equipment, 4, 5);

      expect(getDirections(equipment, cNode)).to.deep.equal({
        startDirection: 'left',
        endDirection: 'right',
      });
    });

    it('return correct directions for another equipment to cNode positioning', () => {
      setCoordinates(equipment, 0, 5);

      expect(getDirections(equipment, cNode)).to.deep.equal({
        startDirection: 'right',
        endDirection: 'left',
      });
    });

    it('return correct directions for another equipment to cNode positioning', () => {
      setCoordinates(equipment, 4, 3);

      expect(getDirections(equipment, cNode)).to.deep.equal({
        startDirection: 'bottom',
        endDirection: 'right',
      });
    });

    it('return correct directions for another equipment to cNode positioning', () => {
      setCoordinates(equipment, 4, 7);

      expect(getDirections(equipment, cNode)).to.deep.equal({
        startDirection: 'top',
        endDirection: 'right',
      });
    });

    it('return correct directions for another equipment to cNode positioning', () => {
      setCoordinates(equipment, 0, 7);

      expect(getDirections(equipment, cNode)).to.deep.equal({
        startDirection: 'top',
        endDirection: 'left',
      });
    });

    it('return correct directions for another equipment to cNode positioning', () => {
      setCoordinates(equipment, 0, 3);

      expect(getDirections(equipment, cNode)).to.deep.equal({
        startDirection: 'bottom',
        endDirection: 'left',
      });
    });

    it('return default directions equipment overlaying each other', () => {
      setCoordinates(equipment, 2, 5);

      expect(getDirections(equipment, cNode)).to.deep.equal({
        startDirection: 'bottom',
        endDirection: 'top',
      });
    });
  });

  describe('defines a getAbsolutePosition function that', () => {
    it('returns the correct absolute position for an element with a Bay as parent.', () => {
      const element = doc.querySelector(
        'Bay[name="Bay A"] > ConductingEquipment[name="QB1"]'
      );
      // Absolute position of QB1 should be x=(1 + 1 + 1), and y=(1 + 6 + 3), if looking at the coordinates of all the parents.
      // Times the SVG_GRID_SIZE to get the absolute position on the svg.
      expect(getAbsolutePosition(element!)).to.eql({
        x: 3 * 2 * SVG_GRID_SIZE + (SVG_GRID_SIZE - EQUIPMENT_SIZE) / 2,
        y: 10 * 2 * SVG_GRID_SIZE + (SVG_GRID_SIZE - EQUIPMENT_SIZE) / 2,
      });
    });

    it('returns the correct absolute position for an element with a VoltageLevel as parent.', () => {
      const element = doc.querySelector('Bay[name="BusBar A"]');
      // Absolute position of Busbar A should be x=(1 + 1), and y=(1 + 3), if looking at the coordinates of all the parents.
      // Times the SVG_GRID_SIZE to get the absolute position on the svg.
      expect(getAbsolutePosition(element!)).to.eql({
        x: 2 * 2 * SVG_GRID_SIZE + (SVG_GRID_SIZE - EQUIPMENT_SIZE) / 2,
        y: 4 * 2 * SVG_GRID_SIZE + (SVG_GRID_SIZE - EQUIPMENT_SIZE) / 2,
      });
    });

    it('returns relative position elements without legal parent.', () => {
      const element = doc.querySelector('VoltageLevel[name="J1"]');
      const copiedElement = <Element>element?.cloneNode();

      expect(getAbsolutePosition(copiedElement!)).to.eql({
        x: 1 * 2 * SVG_GRID_SIZE + (SVG_GRID_SIZE - EQUIPMENT_SIZE) / 2,
        y: 3 * 2 * SVG_GRID_SIZE + (SVG_GRID_SIZE - EQUIPMENT_SIZE) / 2,
      });
    });

    it('returns default for invalid elements.', () => {
      const element = doc.querySelector('LDevice');

      expect(getAbsolutePosition(element!)).to.eql({
        x: 0 * 2 * SVG_GRID_SIZE + (SVG_GRID_SIZE - EQUIPMENT_SIZE) / 2,
        y: 0 * 2 * SVG_GRID_SIZE + (SVG_GRID_SIZE - EQUIPMENT_SIZE) / 2,
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
      const element = doc.querySelector('VoltageLevel[name="J1"]')!;
      expect(getBusBarLength(element)).to.eql(
        18 * 2 * SVG_GRID_SIZE +
          (SVG_GRID_SIZE - EQUIPMENT_SIZE) / 2 +
          SVG_GRID_SIZE
      );
    });
  });

  describe('creates a group element for every given PowerTransformer element that', () => {
    it('looks like its latest snapshot', () => {
      const pTrans = doc.querySelector('PowerTransformer')!;
      expect(createPowerTransformerElement(pTrans)).to.equalSnapshot();
    });
  });

  describe('creates a group element for every given ConductingEquipment element that', () => {
    it('looks like its latest snapshot', () => {
      const condEq = doc.querySelector('ConductingEquipment')!;
      expect(createConductingEquipmentElement(condEq)).to.equalSnapshot();
    });
  });

  describe('creates a group element for every given VoltageLevel element that', () => {
    it('looks like its latest snapshot', () => {
      const voltLv = doc.querySelector('VoltageLevel')!;
      expect(createVoltageLevelElement(voltLv)).to.equalSnapshot();
    });
  });

  describe('creates a group element for every given Bus Bar element that', () => {
    it('looks like its latest snapshot', () => {
      const busBar = doc.querySelector('Bay[name="BusBar A"]')!;
      expect(createBusBarElement(busBar, 200)).to.equalSnapshot();
    });
  });

  describe('creates a group element for every given Bay element that', () => {
    it('looks like its latest snapshot', () => {
      const bay = doc.querySelector('Bay[name="Bay A"]')!;
      expect(createBayElement(bay)).to.equalSnapshot();
    });
  });

  describe('creates a group element for every given ConnectivityNode element that', () => {
    it('looks like its latest snapshot', () => {
      const cNode = doc.querySelector(
        'Bay[name="Bay A"] > ConnectivityNode[name="L1"]'
      )!;
      expect(createConnectivityNodeElement(cNode)).to.equalSnapshot();
    });
  });

  describe('creates a group element for every given Terminal element that', () => {
    it('looks like its latest snapshot', () => {
      const terminal = doc.querySelector(
        'ConductingEquipment > Terminal[name="T2"]'
      )!;
      expect(createTerminalElement(terminal, 'top')).to.equalSnapshot();
    });
  });
});
