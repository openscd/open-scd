import { expect, fixture, html } from '@open-wc/testing';

import { initializeNsdoc, Nsdoc } from '../../../../src/foundation/nsdoc.js';

import '../../../../src/editors/ied/ldevice-container.js';

import { LDeviceContainer } from '../../../../src/editors/ied/ldevice-container.js';

describe('ldevice-container', () => {
  let doc: XMLDocument;
  let nsdoc: Nsdoc;

  let lDeviceElement: Element;
  let element: LDeviceContainer;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/valid2007B4withIEDModifications.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    nsdoc = await initializeNsdoc();
  });

  describe('LDevice Element with LN Elements', () => {
    let selectedLNClasses: string[] = [];

    beforeEach(async () => {
      lDeviceElement = doc.querySelector('LDevice[inst="Disconnectors"]')!;
    });

    describe('and all LN Elements displayed', () => {
      beforeEach(async () => {
        selectedLNClasses = getLNClasses(lDeviceElement);

        element = await fixture(html` <ldevice-container
          .element="${lDeviceElement}"
          .nsdoc="${nsdoc}"
          .selectedLNClasses="${selectedLNClasses}"
        ></ldevice-container>`);
      });

      it('expect the correct number of LN Elements returned', () => {
        expect(element['lnElements'].length).to.be.equal(9);
      });

      it('looks like the latest snapshot', async () => {
        await expect(element).shadowDom.to.equalSnapshot();
      });
    });

    describe('and some LN Elements displayed', () => {
      beforeEach(async () => {
        selectedLNClasses = getLNClasses(lDeviceElement).slice(0, 2);

        element = await fixture(html` <ldevice-container
          .element="${lDeviceElement}"
          .nsdoc="${nsdoc}"
          .selectedLNClasses="${selectedLNClasses}"
        ></ldevice-container>`);
      });

      it('expect the correct number of LN Elements returned', () => {
        expect(element['lnElements'].length).to.be.equal(4);
      });

      it('looks like the latest snapshot', async () => {
        await expect(element).shadowDom.to.equalSnapshot();
      });
    });

    describe('and no LN Elements displayed', () => {
      beforeEach(async () => {
        selectedLNClasses = [];

        element = await fixture(html` <ldevice-container
          .element="${lDeviceElement}"
          .nsdoc="${nsdoc}"
          .selectedLNClasses="${selectedLNClasses}"
        ></ldevice-container>`);
      });

      it('expect the correct number of LN Elements returned', () => {
        expect(element['lnElements'].length).to.be.equal(0);
      });

      it('looks like the latest snapshot', async () => {
        await expect(element).shadowDom.to.equalSnapshot();
      });
    });
  });

  describe('LDevice Element without LN Element', () => {
    beforeEach(async () => {
      lDeviceElement = doc.querySelector('LDevice[inst="EmptyLDevice"]')!;
    });

    it('looks like the latest snapshot', async () => {
      element = await fixture(html`<ldevice-container
        .element=${lDeviceElement}
        .nsdoc="${nsdoc}"
        .selectedLNClasses="${getLNClasses(lDeviceElement)}"
      ></ldevice-container>`);
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  function getLNClasses(element: Element): string[] {
    return Array.from(element.querySelectorAll('LN0, LN'))
      .map(element => element.getAttribute('lnClass'))
      .filter(value => value) as string[];
  }
});
