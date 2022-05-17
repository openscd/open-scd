import { html, fixture, expect } from '@open-wc/testing';

import '../../mock-wizard.js';

import Communication104 from '../../../src/editors/Communication104.js';
import { Editing } from '../../../src/Editing.js';
import { Wizarding } from '../../../src/Wizarding.js';

describe('Communication 104 Plugin', () => {
  customElements.define(
    'communication104-plugin',
    Wizarding(Editing(Communication104))
  );
  let element: Communication104;
  let doc: XMLDocument;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/communication.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = await fixture(
      html`<communication104-plugin .doc=${doc}></communication104-plugin>`
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
