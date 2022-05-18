import { html, fixture, expect } from '@open-wc/testing';

import '../../../../src/editors/protocol104/values-container.js'
import { Values104Container } from '../../../../src/editors/protocol104/values-container.js';

describe('values-104-container', () => {
  let element: Values104Container;
  let document: XMLDocument;

  beforeEach(async () => {
    document = await fetch('/test/testfiles/104-protocol.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = await fixture(
      html `<values-104-container .doc=${document}></values-104-container>`
    );
  });

  it('looks like the latest snapshot', async () => {
    await expect(element).shadowDom.to.equalSnapshot();
  });

  it('getIEDElements will return a list which is alphabetically ordered', () => {
    const ieds = element['getIEDElements']();
    expect(ieds.length).to.be.equals(2);
    expect(ieds[0].getAttribute('name')).to.be.equals('B1');
    expect(ieds[1].getAttribute('name')).to.be.equals('B2');
  });
});
