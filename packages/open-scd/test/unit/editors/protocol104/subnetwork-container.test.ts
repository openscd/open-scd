import { html, fixture, expect } from '@open-wc/testing';

import '../../../../src/editors/protocol104/subnetwork-container.js'
import { SubNetwork104Container } from '../../../../src/editors/protocol104/subnetwork-container.js';

describe('subnetwork-104-container', () => {
  let element: SubNetwork104Container;
  let subNetwork: Element;

  beforeEach(async () => {
    const validSCL = await fetch('/test/testfiles/104/valid-subnetwork.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    subNetwork = validSCL.querySelector('SubNetwork[name="F1"]')!;
    element = <SubNetwork104Container>(
      await fixture(
        html`<subnetwork-104-container .element=${subNetwork}></subnetwork-104-container>`
      )
    );
  });

  it('looks like the latest snapshot', async () => {
    await expect(element).shadowDom.to.equalSnapshot();
  });
});
