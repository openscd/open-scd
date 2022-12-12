import { expect, fixture, html } from '@open-wc/testing';

import '../../../../src/editors/substation/zeroline-pane.js';
import { ZerolinePane } from '../../../../src/editors/substation/zeroline-pane.js';
import {
  attachedIeds,
  getAttachedIeds,
} from '../../../../src/editors/substation/foundation.js';

describe('zeroline-pane', () => {
  let doc: XMLDocument;

  let substation1: Element;
  let substation2: Element;

  let voltageLevel1: Element;
  let voltageLevel2: Element;

  let bay1: Element;
  let bay2: Element;

  let remainingIeds: Set<Element>;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/zeroline/iedalloctest.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    substation1 = doc.querySelector('Substation[name="AA1"]')!;
    substation2 = doc.querySelector('Substation[name="AA2"]')!;

    voltageLevel1 = doc.querySelector('VoltageLevel[name="E1"]')!;
    voltageLevel2 = doc.querySelector('VoltageLevel[name="J1"]')!;

    bay1 = doc.querySelector('Bay[name="Bay1"]')!;
    bay2 = doc.querySelector('Bay[name="Bay2"]')!;

    remainingIeds = new Set(Array.from(doc.querySelectorAll('IED')));
  });

  it('per default looks like the latest snapshot', async () => {
    const element: ZerolinePane = await fixture(
      html`<zeroline-pane
        .doc=${doc}
        .getAttachedIeds="${undefined}"
      ></zeroline-pane>`
    );

    if (element.showieds.on) await element.showieds.click();
    if (element.showfunctions.on) await element.showfunctions.click();

    await new Promise(resolve => setTimeout(resolve, 2000)); // await animation

    await expect(element).shadowDom.to.equalSnapshot();
  }).timeout(5000);

  it('showieds looks like the latest snapshot', async () => {
    const element: ZerolinePane = await fixture(
      html`<zeroline-pane
        .doc=${doc}
        .getAttachedIeds=${getAttachedIeds(doc)}
      ></zeroline-pane>`
    );

    if (!element.showieds.on) await element.showieds.click();
    if (element.showfunctions.on) await element.showfunctions.click();

    await new Promise(resolve => setTimeout(resolve, 2000)); // await IEDs are rendered

    await expect(element).shadowDom.to.equalSnapshot();
  }).timeout(5000);

  describe('attachedIeds', () => {
    it('returns IEDs that cannot be allocated to any element', async () => {
      const ieds = await attachedIeds(doc.documentElement!, remainingIeds);

      expect(ieds.length).to.equal(2);
      expect(ieds[0].getAttribute('name')).to.equal('IED6');
      expect(ieds[1].getAttribute('name')).to.equal('IED8');
    });
    describe('return IEDs for Bay elements that', () => {
      it('are connected itself or underlaying conduncting equipment', async () => {
        const ieds = await attachedIeds(bay1, remainingIeds);

        expect(ieds.length).to.equal(2);
        expect(ieds[0].getAttribute('name')).to.equal('IED1');
        expect(ieds[1].getAttribute('name')).to.equal('IED4');
      });

      it('are not connected to another Bay as well', async () => {
        expect((await attachedIeds(bay2, remainingIeds)).length).to.equal(0);
      });
    });
    describe('return IEDs for VoltageLevel elements that', () => {
      it('are connected itself or underlaying elements', async () => {
        const ieds = await attachedIeds(voltageLevel1, remainingIeds);

        expect(ieds.length).to.equal(2);
        expect(ieds[0].getAttribute('name')).to.equal('IED2');
        expect(ieds[1].getAttribute('name')).to.equal('IED5');
      });

      it('are not connected to another Bay ass well', async () => {
        expect(
          (await attachedIeds(voltageLevel2, remainingIeds)).length
        ).to.equal(0);
      });
    });
    describe('return IEDs for Substation elements that', () => {
      it('are connected itself or underlaying elements', async () => {
        const ieds = await attachedIeds(substation1, remainingIeds);

        expect(ieds.length).to.equal(2);
        expect(ieds[0].getAttribute('name')).to.equal('IED3');
        expect(ieds[1].getAttribute('name')).to.equal('IED7');
      });
      it('are not connected to another Substation ass well', async () => {
        expect(
          (await attachedIeds(substation2, remainingIeds)).length
        ).to.equal(0);
      });
    });
  });

  it('both the functions return every IED only once', async () => {
    const numSub1 = (await attachedIeds(substation1, remainingIeds)).length;
    const numSub2 = (await attachedIeds(substation2, remainingIeds)).length;
    const numVolt1 = (await attachedIeds(voltageLevel1, remainingIeds)).length;
    const numVolt2 = (await attachedIeds(voltageLevel2, remainingIeds)).length;
    const numBay1 = (await attachedIeds(bay1, remainingIeds)).length;
    const numBay2 = (await attachedIeds(bay2, remainingIeds)).length;

    const numUnRef = (await attachedIeds(doc.documentElement, remainingIeds))
      .length;

    const sumIeds =
      numBay1 + numBay2 + numVolt1 + numVolt2 + numSub1 + numSub2 + numUnRef;

    expect(sumIeds).to.equal(doc.querySelectorAll('IED').length);
  });
}).timeout(10000);
