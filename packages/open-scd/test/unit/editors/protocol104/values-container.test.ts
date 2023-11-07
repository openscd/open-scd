import { expect, fixture, html } from '@open-wc/testing';

import '../../../../src/editors/protocol104/values-container.js';
import { Values104Container } from '../../../../src/editors/protocol104/values-container.js';

describe('values-104-container', () => {
  let element: Values104Container;
  let document: XMLDocument;

  describe('SCL with IED Elements', () => {
    beforeEach(async () => {
      document = await fetch('/test/testfiles/104/valid-addresses.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      element = await fixture(
        html`<values-104-container .doc=${document}></values-104-container>`
      );
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });

    it('getIEDElements will return a list which is alphabetically ordered', () => {
      const ieds = element.iedElements;
      expect(ieds.length).to.be.equal(2);
      expect(ieds[0].getAttribute('name')).to.be.equal('B1');
      expect(ieds[1].getAttribute('name')).to.be.equal('B2');
    });
  });

  describe('SCL without IED Elements', () => {
    beforeEach(async () => {
      document = await fetch('/test/testfiles/104/valid-no-ied.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      element = await fixture(
        html`<values-104-container .doc=${document}></values-104-container>`
      );
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });
});
