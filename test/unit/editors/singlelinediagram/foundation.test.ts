import { expect } from "@open-wc/testing";
import { getSCLCoordinates, getDescriptionAttribute, getNameAttribute, getPathNameAttribute, isBusBar, getConnectedTerminals, calculateConnectivityNodeSclCoordinates } from "../../../../src/editors/singlelinediagram/foundation";

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
    });

    describe('defines a getDescriptionAttribute function that', () => {
        it('returns the correct description for an element.', () => {
            const element = doc.querySelector('Bay[name="Bay A"]');
            expect(getDescriptionAttribute(element!)).to.eql('Feld A');
        });
    });

    describe('defines a getPathName function that', () => {
        it('returns the correct path name for an element.', () => {
            const element = doc.querySelector('Bay[name="Bay A"] > ConnectivityNode[name="L1"]');
            expect(getPathNameAttribute(element!)).to.eql('AA1/J1/Bay A/L1');
        });
    });

    describe('defines a getSCLCoordinates function that', () => {
        it('returns the correct x and y coordinates for an element.', () => {
            const element = doc.querySelector('Bay[name="Bay A"] > ConductingEquipment[name="QB1"]');
            expect(getSCLCoordinates(element!)).to.eql({x: 1, y: 1});
        });
        it('returns 0,0 coordinates for an element that hasn\'t got any coordinates.', () => {
            const element = doc.querySelector('Bay[name="Bay A"] > ConnectivityNode[name="L1"]');
            expect(getSCLCoordinates(element!)).to.eql({x: 0, y: 0});
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
            const element = doc.querySelector('Bay[name="Bay A"] > ConnectivityNode[name="L1"]');
            expect(getConnectedTerminals(element!).length).to.eql(3);
        });
        it('calculates the total number of connected terminals for a single element connected to multiple bays.', () => {
            const element = doc.querySelector('Bay[name="BusBar A"] > ConnectivityNode[name="L1"]');
            expect(getConnectedTerminals(element!).length).to.eql(4);
        });
    });

    describe('defines a calculateConnectivityNodeCoordinates function that', () => {
        it('calculates the x and y coordinates of an element without defined coordinates,' +
            'based on the coordinates of connected elements.', () => {
            const element = doc.querySelector('Bay[name="Bay A"] > ConnectivityNode[name="L1"]');
            expect(calculateConnectivityNodeSclCoordinates(doc, getPathNameAttribute(element!)!)).to.eql({x: 2, y: 2});
        });
    });
});