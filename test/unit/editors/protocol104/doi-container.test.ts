import { html, fixture, expect } from '@open-wc/testing';

import '../../../../src/editors/protocol104/doi-container.js'

import { getFullPath } from "../../../../src/editors/protocol104/foundation/foundation.js";
import { Doi104Container } from '../../../../src/editors/protocol104/doi-container.js';

describe('doi-104-container -', () => {
  let document: XMLDocument;
  let doiElement: Element;
  let element: Doi104Container;

  beforeEach(async () => {
    document = await fetch('/test/testfiles/104/valid-addresses-case1.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('DOI with simple Address Element', () => {
    beforeEach(async () => {
      doiElement = document.querySelector('IED[name="B1"] DOI[name="CmdBlk"]')!;

      element = await fixture(
        html`<doi-104-container .element="${doiElement}"></doi-104-container>`
      );
      await element.requestUpdate();
    });

    it('getDaiElements will return a list which is ordered on full path', () => {
      const dais = element['getDaiElements']();
      expect(dais.length).to.be.equals(2);
      expect(getFullPath(dais[0], 'DOI')).to.be.equals('Oper / ctlVal');
      expect(getFullPath(dais[1], 'DOI')).to.be.equals('stVal');
    });

    it('getAddressElements will return a list', () => {
      const dai = element['getDaiElements']()[0];
      const addresses = element['getAddressElements'](dai);
      expect(addresses.length).to.be.equals(1);
      expect(Doi104Container['get104DetailsLine'](addresses[0])).to.be.equals('casdu: 201, ioa: 2, ti: 58');
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('DOI without Address Elements', () => {
    beforeEach(async () => {
      doiElement = document.querySelector('IED[name="B3"] DOI[name="Beh"]')!;

      element = await fixture(
        html`<doi-104-container .element="${doiElement}"></doi-104-container>`
      );
      await element.requestUpdate();
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });
});
