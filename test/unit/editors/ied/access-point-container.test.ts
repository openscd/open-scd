import { expect, fixture, html } from '@open-wc/testing';

import '../../../../src/editors/ied/access-point-container.js';
import { AccessPointContainer } from '../../../../src/editors/ied/access-point-container.js';

import { getLNClasses } from './test-support.js';

describe('access-point-container', () => {
  let element: AccessPointContainer;
  let apElement: Element;
  let validSCL: XMLDocument;

  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/editors/iedEditorWithIEDs.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('with Server Elements', () => {
    beforeEach(async () => {
      apElement = validSCL.querySelector(
        'IED[name="IED1"] > AccessPoint[name="P1"]'
      )!;
      element = await fixture(html`<access-point-container
        .element="${apElement}"
        .selectedLNClasses="${getLNClasses(apElement)}"
      ></access-point-container>`);
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('with LN Elements', () => {
    describe('and all LN Classes displayed', () => {
      beforeEach(async () => {
        apElement = validSCL.querySelector(
          'IED[name="IED4"] > AccessPoint[name="P1"]'
        )!;
        element = await fixture(html`<access-point-container
          .element="${apElement}"
          .selectedLNClasses="${getLNClasses(apElement)}"
        ></access-point-container>`);
      });

      it('looks like the latest snapshot', async () => {
        await expect(element).shadowDom.to.equalSnapshot();
      });
    });

    describe('and some LN Classes hidden', () => {
      beforeEach(async () => {
        apElement = validSCL.querySelector(
          'IED[name="IED4"] > AccessPoint[name="P1"]'
        )!;
        element = await fixture(html`<access-point-container
          .element="${apElement}"
          .selectedLNClasses="${getLNClasses(apElement).slice(0, 1)}"
        ></access-point-container>`);
      });

      it('looks like the latest snapshot', async () => {
        await expect(element).shadowDom.to.equalSnapshot();
      });
    });

    describe('and all LN Classes hidden', () => {
      beforeEach(async () => {
        apElement = validSCL.querySelector(
          'IED[name="IED4"] > AccessPoint[name="P1"]'
        )!;

        element = await fixture(html`<access-point-container
          .element="${apElement}"
          .selectedLNClasses="${[]}"
        ></access-point-container>`);
      });

      it('looks like the latest snapshot', async () => {
        await expect(element).shadowDom.to.equalSnapshot();
      });
    });
  });
});
