import { html, fixture, expect } from '@open-wc/testing';

import '../../../../src/editors/protocol104/ied-container.js'

import { getFullPath } from "../../../../src/editors/protocol104/foundation/foundation.js";
import { Ied104Container } from '../../../../src/editors/protocol104/ied-container.js';

describe('ied-104-container -', () => {
  let document: XMLDocument;
  let iedElement: Element;
  let element: Ied104Container;

  beforeEach(async () => {
    document = await fetch('/test/testfiles/104-protocol.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('IED with DAI Elements', () => {
    beforeEach(async () => {
      iedElement = document.querySelector('IED[name="B2"]')!;

      element = await fixture(
        html`<ied-104-container .element="${iedElement}"></ied-104-container>`
      );
      await element.requestUpdate();
    });

    it('getDaiElements will return a list which is alphabetically ordered', () => {
      const dais = element['getDaiElements']();
      expect(dais.length).to.be.equals(2);
      expect(getFullPath(dais[0])).to.be.equals('AP1 / LD0 / LLN0 / Beh / stVal');
      expect(getFullPath(dais[1])).to.be.equals('AP1 / LD0 / PPRE-GGIO-2 / Beh / stVal');
    });

    it('looks like the latest snapshot', async () => {
      element.shadowRoot!.querySelector('mwc-icon-button-toggle')!.on = true;
      await element.requestUpdate();

      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('IED without DAI Elements', () => {
    beforeEach(async () => {
      iedElement = document.querySelector('IED[name="B3"]')!;

      element = await fixture(
        html`<ied-104-container .element="${iedElement}"></ied-104-container>`
      );
      await element.requestUpdate();
    });

    it('looks like the latest snapshot', async () => {
      element.shadowRoot!.querySelector('mwc-icon-button-toggle')!.on = true;
      await element.requestUpdate();

      await expect(element).shadowDom.to.equalSnapshot();
    });
  });
});
