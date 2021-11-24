import { expect } from '@open-wc/testing';
import {
  getRelativeCoordinates,
  getDescriptionAttribute,
  getNameAttribute,
  getPathNameAttribute,
  isBusBar,
  getConnectedTerminals,
  calculateConnectivityNodeCoordinates,
} from '../../../../src/editors/singlelinediagram/foundation.js';

describe('Single Line Diagram foundation', () => {
  let doc: Document;
  beforeEach(async () => {
    doc = await fetch('/base/test/testfiles/valid2007B4withSubstationXY.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('defines a getNameAttribute function that', () => {
    it('returns the correct name for an element.', () => {
      const element = doc.querySelector('Bay[desc="Feld A"]');
      expect(getNameAttribute(element!)).to.eql('Bay A');
    });
    it('returns undefined for an element without a name.', () => {
      const element = doc.querySelector('VoltageLevel[name="J1"] > Voltage');
      expect(getNameAttribute(element!)).to.be.undefined;
    });
  });

  describe('defines a getDescriptionAttribute function that', () => {
    it('returns the correct description for an element.', () => {
      const element = doc.querySelector('Bay[name="Bay A"]');
      expect(getDescriptionAttribute(element!)).to.eql('Feld A');
    });
    it('returns undefined for an element without a description.', () => {
      const element = doc.querySelector('VoltageLevel[name="J1"] > Voltage');
      expect(getDescriptionAttribute(element!)).to.be.undefined;
    });
  });

  describe('defines a getPathName function that', () => {
    it('returns the correct path name for an element.', () => {
      const element = doc.querySelector(
        'Bay[name="Bay A"] > ConnectivityNode[name="L1"]'
      );
      expect(getPathNameAttribute(element!)).to.eql('AA1/J1/Bay A/L1');
    });
    it('returns undefined for an element without a pathName.', () => {
      const element = doc.querySelector('VoltageLevel[name="J1"] > Voltage');
      expect(getPathNameAttribute(element!)).to.be.undefined;
    });
  });

  describe('defines a getRelativeCoordinates function that', () => {
    it('returns the correct x and y coordinates for an element.', () => {
      const element = doc.querySelector(
        'Bay[name="Bay A"] > ConductingEquipment[name="QB1"]'
      );
      expect(getRelativeCoordinates(element!)).to.eql({ x: 1, y: 1 });
    });
    it("returns {x: 0, y: 0} coordinates for an element that hasn't got any coordinates.", () => {
      const element = doc.querySelector(
        'Bay[name="Bay A"] > ConnectivityNode[name="L1"]'
      );
      expect(getRelativeCoordinates(element!)).to.eql({ x: 0, y: 0 });
    });
  });

  describe('defines an isBusBar function that', () => {
    it('returns true if an element is a bus bar.', () => {
      const element = doc.querySelector('Bay[name="BusBar A"]');
      expect(isBusBar(element!)).to.be.true;
    });
    it('returns false if an element is not a bus bar.', () => {
      const element = doc.querySelector('Bay[name="Bay A"]');
      expect(isBusBar(element!)).to.be.false;
    });
  });

  describe('defines a getConnectedTerminals function that', () => {
    it('calculates the total number of connected terminals for a single element within the same bay.', () => {
      const element = doc.querySelector(
        'Bay[name="Bay A"] > ConnectivityNode[name="L1"]'
      );
      expect(getConnectedTerminals(element!).length).to.eql(3);
    });
    it('calculates the total number of connected terminals for a single element connected to multiple bays.', () => {
      const element = doc.querySelector(
        'Bay[name="BusBar A"] > ConnectivityNode[name="L1"]'
      );
      expect(getConnectedTerminals(element!).length).to.eql(4);
    });
  });

  describe('defines a calculateConnectivityNodeCoordinates function that', () => {
    it(
      'calculates the x and y coordinates of an element without defined coordinates,' +
        'based on the coordinates of connected elements.',
      () => {
        const element = doc.querySelector(
          'Bay[name="Bay A"] > ConnectivityNode[name="L1"]'
        );
        expect(calculateConnectivityNodeCoordinates(element!)).to.eql({
          x: Math.round((4 + 5 + 4) / 3),
          y: Math.round((10 + 10 + 12) / 3),
        });
      }
    );
    it("returns a default {x:0, y:0} for elements that aren't Connectivity Nodes", () => {
      const element = doc.querySelector(
        'Bay[name="Bay A"] > ConductingEquipment[name="QB1"]'
      );
      expect(calculateConnectivityNodeCoordinates(element!)).to.eql({
        x: 0,
        y: 0,
      });
    });
  });
});
