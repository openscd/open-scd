import { html, fixture, expect } from '@open-wc/testing';

import '../../mock-wizard.js';

import Protocol104 from '../../../src/editors/Protocol104.js';
import { Editing } from '../../../src/Editing.js';
import { Wizarding } from '../../../src/Wizarding.js';

describe('Protocol 104 Plugin', () => {
  customElements.define(
    'protocol104-plugin',
    Wizarding(Editing(Protocol104))
  );
  let element: Protocol104;
  let doc: XMLDocument;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/104/valid-subnetwork.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = await fixture(
      html`<protocol104-plugin .doc=${doc}></protocol104-plugin>`
    );
  });

  describe('in Values view', () => {
      it('the plugin looks like the latest snapshot', async () => {
        await expect(element).shadowDom.to.equalSnapshot();
      });
  });

  describe('in Network view', () => {
    beforeEach(async () => {
      const radioButton = element.shadowRoot?.querySelector('#byNetworkRadio');
      (<HTMLElement>radioButton).click();
      await element.updateComplete;
    });

    it('the plugin looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });
});
