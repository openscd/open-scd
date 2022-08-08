import { expect, fixture, html } from '@open-wc/testing';
import History from '../../../src/menu/History.js';
import {
    newOpenDocEvent,
  } from '../../../src/foundation.js';
describe('when loading file with history items', () => {
    if (customElements.get('scl-history') === undefined)
    customElements.define('scl-history', History);
    let element: History;
    let doc: XMLDocument;

    beforeEach(async () => {
        doc = await fetch('/test/testfiles/history.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
        element = await fixture(html`
            <scl-history .doc=${doc}></scl-history>
        `);
        element.run();
        await element.requestUpdate();
    });

    it('has 7 items in the history list', () => {
        expect(element.sclHistory.length).to.be.equal(7);
    });

    it('expect the correct values of the first line (with valid when and no why)', () => {
        expect(element.sclHistory.length).to.be.equal(7);
        expect(element.sclHistory[0].kind).to.be.equal('sclhistory');
        expect(element.sclHistory[0].title).to.satisfy((msg: string) =>
        msg.startsWith('SCD created from CIM File(s):')
        );
        expect(element.sclHistory[0].message).to.be.equal('Test User 1');
        expect(element.sclHistory[0].time).to.be.not.null;
    });

    it('expect the correct values of the third line (with no when and no why)', () => {
        expect(element.sclHistory.length).to.be.equal(7);
        expect(element.sclHistory[2].kind).to.be.equal('sclhistory');
        expect(element.sclHistory[2].title).to.satisfy((msg: string) =>
        msg.startsWith('SCD updated, ')
        );
        expect(element.sclHistory[2].message).to.be.equal('Test User 1');
        expect(element.sclHistory[2].time).to.be.null;
    });

    it('expect the correct values of the forth line (with invalid when, but valid why)', () => {
        expect(element.sclHistory.length).to.be.equal(7);
        expect(element.sclHistory[3].kind).to.be.equal('sclhistory');
        expect(element.sclHistory[3].title).to.satisfy((msg: string) =>
        msg.startsWith('SCD updated, ')
        );
        expect(element.sclHistory[3].message).to.be.equal(
        'Test User 1 : Small correction in substation'
        );
        expect(element.sclHistory[3].time).to.be.null;
    });

    it('expect the correct message values (with missing who)', () => {
        expect(element.sclHistory.length).to.be.equal(7);
        expect(element.sclHistory[4].kind).to.be.equal('sclhistory');
        expect(element.sclHistory[4].title).to.satisfy((msg: string) =>
        msg.startsWith('SCD updated, ')
        );
        expect(element.sclHistory[4].message).to.be.equal(
        'Small correction in substation'
        );
        expect(element.sclHistory[4].time).to.be.null;
    });

    it('expect undefined message (with missing who and why)', () => {
        expect(element.sclHistory.length).to.be.equal(7);
        expect(element.sclHistory[5].kind).to.be.equal('sclhistory');
        expect(element.sclHistory[5].title).to.satisfy((msg: string) =>
        msg.startsWith('SCD updated, ')
        );
        expect(element.sclHistory[5].message).to.be.undefined;
        expect(element.sclHistory[5].time).to.be.null;
    });

    it('expect undefined title (with invalid what)', () => {
        expect(element.sclHistory.length).to.be.equal(7);
        expect(element.sclHistory[6].kind).to.be.equal('sclhistory');
        expect(element.sclHistory[6].title).to.satisfy((msg: string) =>
        msg.startsWith('UNDEFINED')
        );
        expect(element.sclHistory[6].message).to.be.equal(
        'Test User 1 : Small correction in substation'
        );
        expect(element.sclHistory[6].time).to.be.null;
    });
});