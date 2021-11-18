import { expect } from "@open-wc/testing";
import { adjustCircleIconElementWithAbsoluteCoordinates, adjustLineIconElementWithAbsoluteCoordinates, adjustPathIconElementWithAbsoluteCoordinates, getAbsolutePosition, getAbsolutePositionWithCustomCoordinates, getParentElementName, SVG_GRID_SIZE } from "../../../../src/editors/singlelinediagram/sld-drawing";

describe('Single Line Diagram drawing', () => {
    let doc: Document;
    beforeEach(async () => {
        doc = await fetch('/base/test/testfiles/valid2007B4withSubstationXY.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    });

    describe('defines a getAbsolutePosition function that', () => {
        it('returns the correct absolute position for an element with a Bay as parent.', () => {
            const element = doc.querySelector('Bay[name="Bay A"] > ConductingEquipment[name="QB1"]');
            // Absolute position of QB1 should be x=(1 + 1 + 1), and y=(1 + 6 + 3), if looking at the coordinates of all the parents.
            // Times the SVG_GRID_SIZE to get the absolute position on the svg.
            expect(getAbsolutePosition(element!)).to.eql({x: 3 * SVG_GRID_SIZE,y: 10 * SVG_GRID_SIZE});
        });
        it('returns the correct absolute position for an element with a VoltageLevel as parent.', () => {
            const element = doc.querySelector('Bay[name="BusBar A"]');
            // Absolute position of Busbar A should be x=(1 + 1), and y=(1 + 3), if looking at the coordinates of all the parents.
            // Times the SVG_GRID_SIZE to get the absolute position on the svg.
            expect(getAbsolutePosition(element!)).to.eql({x: 2 * SVG_GRID_SIZE,y: 4 * SVG_GRID_SIZE});
        });
        it('returns the default 0,0 position for elements without legal parent.', () => {
            const element = doc.querySelector('VoltageLevel[name="J1"]');

            expect(getAbsolutePosition(element!)).to.eql({x: 0,y: 0});
        });
    });

    describe('defines a getAbsolutePositionWithCustomCoordinates function that', () => {
        it('returns the correct absolute position for an element with custom SCL coordinates and a Bay as parent.', () => {
            const element = doc.querySelector('Bay[name="Bay A"] > ConnectivityNode[name="L2"]');
            const customPosition = {x: 5, y: 1};
            // Absolute position of L2 should be x=(1 + 1 + 5), and y=(3 + 6 + 1), if looking at the coordinates of all the parents.
            // Times the SVG_GRID_SIZE to get the absolute position on the svg.
            expect(getAbsolutePositionWithCustomCoordinates(element!, customPosition)).to.eql({x: 7 * SVG_GRID_SIZE,y: 10 * SVG_GRID_SIZE});
        });
        it('returns the default 0,0 position for elements without legal parent.', () => {
            const element = doc.querySelector('VoltageLevel[name="J1"]');
            const customPosition = {x: 15, y: 4};
            
            expect(getAbsolutePositionWithCustomCoordinates(element!, customPosition)).to.eql({x: 0,y: 0});
        });
    });

    describe('defines a getParentElementName function that', () => {
        it('returns the correct parent of an element.', () => {
            const element = doc.querySelector('Bay[name="Bay A"] > ConnectivityNode[name="L2"]');
            expect(getParentElementName(element!)).to.eql('Bay A');
        });
        it('returns undefined for an element without a parent.', () => {
            const element = doc.querySelector('Substation');
            expect(getParentElementName(element!)).to.be.undefined;
        });
    });

    describe('defines a adjustCircleIconElementWithAbsoluteCoordinates function that', () => {
        it('adjusts the coordinates of a SVGCircleElement using the given absolute position.', () => {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', '5');
            circle.setAttribute('cy', '2');

            const absolutePosition = {x: 200, y: 300};

            adjustCircleIconElementWithAbsoluteCoordinates(circle, absolutePosition);
            expect(circle.getAttribute('cx')).to.eql('205');
            expect(circle.getAttribute('cy')).to.eql('302');
        });
    });

    describe('defines a adjustLineIconElementWithAbsoluteCoordinates function that', () => {
        it('adjusts the coordinates of a SVGLineElement using the given absolute position.', () => {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', '5');
            line.setAttribute('x2', '2');
            line.setAttribute('y1', '54');
            line.setAttribute('y2', '221');

            const absolutePosition = {x: 1337, y: 404};

            adjustLineIconElementWithAbsoluteCoordinates(line, absolutePosition);
            expect(line.getAttribute('x1')).to.eql('1342');
            expect(line.getAttribute('x2')).to.eql('1339');
            expect(line.getAttribute('y1')).to.eql('458');
            expect(line.getAttribute('y2')).to.eql('625');
        });
    });

    describe('defines a adjustPathIconElementWithAbsoluteCoordinates function that', () => {
        it('adjusts the coordinates of a SVGPathElement using the given absolute position.', () => {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', 'M 13 9 L 16 6 Z');

            const absolutePosition = {x: 10, y: 20};

            adjustPathIconElementWithAbsoluteCoordinates(path, absolutePosition);
            expect(path.getAttribute('d')).to.equal('M 23 29 L 26 26 Z');
        });
        it('adjusts the coordinates of a more complex SVGPathElement containing commas, using the given absolute position.', () => {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', 'M 11 7 L 10 8 C 5 13 , 11 20 , 17 15 L 18 14 Z ');

            const absolutePosition = {x: 43, y: 200};

            adjustPathIconElementWithAbsoluteCoordinates(path, absolutePosition);
            expect(path.getAttribute('d')).to.equal('M 54 207 L 53 208 C 48 213 , 54 220 , 60 215 L 61 214 Z');
        });
    });
});