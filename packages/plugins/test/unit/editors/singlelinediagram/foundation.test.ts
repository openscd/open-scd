import { expect } from '@open-wc/testing';
import {
  getRelativeCoordinates,
  isBusBar,
  getConnectedTerminals,
  calculateConnectivityNodeCoordinates, getCommonParentElement,
} from '../../../../src/editors/singlelinediagram/foundation.js';
import { getDescriptionAttribute, getInstanceAttribute, getNameAttribute, getPathNameAttribute } from '@openscd/open-scd/src/foundation.js';

describe('Single Line Diagram foundation', () => {
  let doc: Document;
  beforeEach(async () => {
    doc = await fetch('/test/testfiles/valid2007B4withSubstationXY.scd')
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

  describe('defines a getInstance function that', () => {
    it('returns the correct instance for an element.', () => {
      const element = doc.querySelector(
        'IED[name="IED1"] > AccessPoint[name="P1"] > Server > LDevice[name="LDeviceA"]'
      );
      expect(getInstanceAttribute(element!)).to.eql('CircuitBreaker_CB1');
    });
    it('returns undefined for an element without an instance.', () => {
      const element = doc.querySelector('IED[name="IED1"] > AccessPoint[name="P1"] > Server');
      expect(getInstanceAttribute(element!)).to.be.undefined;
    });
  });

  describe('defines a getRelativeCoordinates function that', () => {
    it('returns the correct x and y coordinates for an element.', () => {
      const element = doc.querySelector(
        'Bay[name="Bay A"] > ConductingEquipment[name="QB1"]'
      );
      expect(getRelativeCoordinates(element!)).to.eql({ x: 2, y: 2 });
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
          x: Math.round((6 + 10 + 8) / 3),
          y: Math.round((20 + 20 + 24) / 3),
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

  describe('defines a getCommonParentElement function that', () => {
    it("common parent between connectivity node and power transformer should be the substation", () => {
      const substation = doc.querySelector('Substation[name="AA1"]')!;
      const powerTransformer =  doc.querySelector('PowerTransformer[name="TA1"]')!;
      const connectivityNode =  doc.querySelector('Bay[name="Bay A"] > ConnectivityNode[name="L1"]')!;
      expect(getCommonParentElement(powerTransformer, connectivityNode, null)).to.equal(substation);
    });

    it("common parent between connectivity node and conducting equipment should be the bay", () => {
      const bay = doc.querySelector('Bay[name="Bay A"]')!;
      const conductingEquipment =  doc.querySelector('Bay[name="Bay A"] > ConductingEquipment[name="QB1"]')!;
      const connectivityNode =  doc.querySelector('Bay[name="Bay A"] > ConnectivityNode[name="L1"]')!;
      expect(getCommonParentElement(conductingEquipment, connectivityNode, null)).to.equal(bay);
    });

    it("common parent between two unrelated elements will be the root element", () => {
      const powerTransformer =  doc.querySelector('PowerTransformer[name="TA1"]')!;
      const subNetwork =  doc.querySelector('SubNetwork[name="StationBus"]')!;
      expect(getCommonParentElement(powerTransformer, subNetwork, null)).to.equal(doc.firstElementChild);
    });

    it("when no common parent then the default element returned", async () => {
      // Can only happen if from different documents, otherwise there should always be the root as common.
      const otherDoc = await fetch('/test/testfiles/valid2007B4withSubstationXY.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      const substation = doc.querySelector('Substation[name="AA1"]')!;
      const bay = doc.querySelector('Bay[name="Bay A"]')!;
      const conductingEquipment =  doc.querySelector('Bay[name="Bay A"] > ConductingEquipment[name="QB1"]')!;
      const connectivityNode =  otherDoc.querySelector('Bay[name="Bay A"] > ConnectivityNode[name="L1"]')!;
      expect(getCommonParentElement(conductingEquipment, connectivityNode, substation)).to.equal(substation);
    });
  });
});
