import { expect, fixture, html } from '@open-wc/testing';

import '../../../../src/editors/ied/server-container.js';
import { ServerContainer } from '../../../../src/editors/ied/server-container.js';

import { getLNClasses } from './test-support.js';

describe('server-container', () => {
  let element: ServerContainer;
  let serverElement: Element;
  let doc: XMLDocument;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/editors/iedEditorWithIEDs.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('Server Element with LDevice Elements', () => {
    let selectedLNClasses: string[] = [];

    beforeEach(async () => {
      serverElement = doc.querySelector(
        'IED[name="IED1"] > AccessPoint[name="P1"] > Server'
      )!;
    });

    describe('and all LN Elements of the LDevice Element displayed', () => {
      beforeEach(async () => {
        selectedLNClasses = getLNClasses(serverElement);

        element = await fixture(html` <server-container
          .element=${serverElement}
          .selectedLNClasses="${selectedLNClasses}"
        ></server-container>`);
      });

      it('expect the correct number of LDevice Elements returned', () => {
        expect(element['lDeviceElements'].length).to.be.equal(2);
      });

      it('looks like the latest snapshot', async () => {
        await expect(element).shadowDom.to.equalSnapshot();
      });
    });

    describe('and some LN Elements displayed', () => {
      beforeEach(async () => {
        selectedLNClasses = getLNClasses(serverElement).slice(1, 2);

        element = await fixture(html` <server-container
          .element=${serverElement}
          .selectedLNClasses="${selectedLNClasses}"
        ></server-container>`);
      });

      it('expect the correct number of LN Elements returned', () => {
        expect(element['lDeviceElements'].length).to.be.equal(1);
      });

      it('looks like the latest snapshot', async () => {
        await expect(element).shadowDom.to.equalSnapshot();
      });
    });

    describe('and no LN Elements displayed', () => {
      beforeEach(async () => {
        selectedLNClasses = [];

        element = await fixture(html` <server-container
          .element=${serverElement}
          .selectedLNClasses="${selectedLNClasses}"
        ></server-container>`);
      });

      it('expect the correct number of LDevice Elements returned', () => {
        expect(element['lDeviceElements'].length).to.be.equal(0);
      });

      it('looks like the latest snapshot', async () => {
        await expect(element).shadowDom.to.equalSnapshot();
      });
    });
  });

  describe('Server Element without LDevice Element', () => {
    beforeEach(async () => {
      serverElement = doc.querySelector(
        'IED[name="IED5"] > AccessPoint[name="P1"] > Server'
      )!;

      element = await fixture(html` <server-container
        .element=${serverElement}
        .selectedLNClasses="${getLNClasses(serverElement)}"
      ></server-container>`);
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });
});
