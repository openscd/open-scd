import { expect, fixture, html } from '@open-wc/testing';
import { ZerolinePane } from '../../src/zeroline-pane.js';
import {
  attachedIeds,
  unreferencedIeds,
} from '../../src/zeroline/foundation.js';

describe('zeroline-pane', () => {
  let doc: XMLDocument;

  let substation1: Element;
  let substation2: Element;

  let voltageLevel1: Element;
  let voltageLevel2: Element;

  let bay1: Element;
  let bay2: Element;

  beforeEach(async () => {
    doc = await fetch('/base/test/testfiles/zeroline/iedalloctest.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    substation1 = doc.querySelector('Substation[name="AA1"]')!;
    substation2 = doc.querySelector('Substation[name="AA2"]')!;

    voltageLevel1 = doc.querySelector('VoltageLevel[name="E1"]')!;
    voltageLevel2 = doc.querySelector('VoltageLevel[name="J1"]')!;

    bay1 = doc.querySelector('Bay[name="Bay1"]')!;
    bay2 = doc.querySelector('Bay[name="Bay2"]')!;
  });

  it('per default looks like the latest snapshot', async () => {
    const element = await fixture(
      html`<zeroline-pane .doc=${doc}></zeroline-pane>`
    );

    await new Promise(resolve => setTimeout(resolve, 2000)); // await animation

    expect(element).shadowDom.to.equalSnapshot();
  }).timeout(5000);

  it('readonly looks like the latest snapshot', async () => {
    const element = await fixture(
      html`<zeroline-pane .doc=${doc} .readonly=${true}></zeroline-pane>`
    );

    await new Promise(resolve => setTimeout(resolve, 2000)); // await animation

    expect(element).shadowDom.to.equalSnapshot();
  }).timeout(5000);

  it('showieds looks like the latest snapshot', async () => {
    const element = await fixture(
      html`<zeroline-pane .doc=${doc} .showieds=${true}></zeroline-pane>`
    );

    await new Promise(resolve => setTimeout(resolve, 2000)); // await animation

    expect(element).shadowDom.to.equalSnapshot();
  }).timeout(5000);

  describe('unreferencedIeds', () => {
    it('returns IEDs that cannot be allocated to any element', () => {
      expect(unreferencedIeds(doc).length).to.equal(2);
      expect(unreferencedIeds(doc)[0].getAttribute('name')).to.equal('IED6');
      expect(unreferencedIeds(doc)[1].getAttribute('name')).to.equal('IED8');
    });
  });
  describe('attachedIeds', () => {
    describe('return IEDs for Bay elements that', () => {
      it('are connected itself or underlaying conduncting equipment', () => {
        expect(attachedIeds(bay1).length).to.equal(2);
        expect(attachedIeds(bay1)[0].getAttribute('name')).to.equal('IED1');
        expect(attachedIeds(bay1)[1].getAttribute('name')).to.equal('IED4');
      });

      it('are not connected to another Bay ass well', () => {
        expect(attachedIeds(bay2).length).to.equal(0);
      });
    });
    describe('return IEDs for VoltageLevel elements that', () => {
      it('are connected itself or underlaying elements', () => {
        expect(attachedIeds(voltageLevel1).length).to.equal(2);
        expect(attachedIeds(voltageLevel1)[0].getAttribute('name')).to.equal(
          'IED2'
        );
        expect(attachedIeds(voltageLevel1)[1].getAttribute('name')).to.equal(
          'IED5'
        );
      });

      it('are not connected to another Bay ass well', () => {
        expect(attachedIeds(voltageLevel2).length).to.equal(0);
      });
    });
    describe('return IEDs for Substation elements that', () => {
      it('are connected itself or underlaying elements', () => {
        expect(attachedIeds(substation1).length).to.equal(2);
        expect(attachedIeds(substation1)[0].getAttribute('name')).to.equal(
          'IED3'
        );
        expect(attachedIeds(substation1)[1].getAttribute('name')).to.equal(
          'IED7'
        );
      });
      it('are not connected to another Substation ass well', () => {
        expect(attachedIeds(substation2).length).to.equal(0);
      });
    });
  });
  it('both the functions return every IED only once', () => {
    const numSub1 = attachedIeds(substation1).length;
    const numSub2 = attachedIeds(substation2).length;
    const numVolt1 = attachedIeds(voltageLevel1).length;
    const numVolt2 = attachedIeds(voltageLevel2).length;
    const numBay1 = attachedIeds(bay1).length;
    const numBay2 = attachedIeds(bay2).length;

    const numUnRef = unreferencedIeds(doc).length;

    const sumIeds =
      numBay1 + numBay2 + numVolt1 + numVolt2 + numSub1 + numSub2 + numUnRef;

    expect(sumIeds).to.equal(doc.querySelectorAll('IED').length);
  });
}).timeout(10000);
