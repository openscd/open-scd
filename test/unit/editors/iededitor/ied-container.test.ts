import { html, fixture, expect } from '@open-wc/testing';

import '../../../../src/editors/iededitor/ied-container.js'
import { IedContainer } from '../../../../src/editors/iededitor/ied-container.js';

describe('ied-container', () => {
  let element: IedContainer;
  let validSCL: XMLDocument;

  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = await fixture(html`<ied-container
      .element=${validSCL.querySelector('IED[name="IED1"]')}
    ></ied-container>`);
  });

  it('looks like the latest snapshot', async () => {
    await expect(element).shadowDom.to.equalSnapshot();
  });

  describe('with readonly property', () => {
    beforeEach(async () => {
      element.readonly = true;
      await element.requestUpdate();
    });
    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });
});
