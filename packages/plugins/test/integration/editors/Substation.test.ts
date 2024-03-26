import { html, fixture, expect } from '@open-wc/testing';

import '@openscd/open-scd/test/mock-open-scd.js';

import Substation from '../../../src/editors/Substation.js';
import { MockOpenSCD } from '@openscd/open-scd/test/mock-open-scd.js';

describe('Substation Plugin', () => {
  customElements.define('substation-plugin', Substation);
  let element: Substation;
  let parent: MockOpenSCD;
  beforeEach(async () => {
    parent = await fixture(
      html`<mock-open-scd
        ><substation-plugin></substation-plugin
      ></mock-open-scd>`
    );
    element = parent.getActivePlugin();
  });

  describe('without a doc loaded', () => {
    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('with a doc loaded including substation section', () => {
    let doc: XMLDocument;
    let element: Substation;
    let parent: MockOpenSCD;
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/valid2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = await fixture(
        html`<mock-open-scd
          ><substation-plugin .doc="${doc}"></substation-plugin
        ></mock-open-scd>`
      );
      element = parent.getActivePlugin();
    });
    it('constains a zeroline-pane rendering the substation sections', () => {
      expect(element.shadowRoot?.querySelector('zeroline-pane')).to.exist;
    });
  });

  describe('with a doc loaded missing a substation section', () => {
    let doc: XMLDocument;
    let parent: MockOpenSCD;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/missingSubstation.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = await fixture(
        html`<mock-open-scd
          ><substation-plugin .doc=${doc}></substation-plugin
        ></mock-open-scd>`
      );
      element = parent.getActivePlugin();
      await element.updateComplete;
    });
    it('has a mwc-fab', () => {
      expect(element.shadowRoot?.querySelector('mwc-fab')).to.exist;
    });
    it('that opens an add substation wizard on click', async () => {
      expect(parent.wizardUI.dialogs.length).to.equal(0);
      (<HTMLElement>(
        parent
          ?.querySelector('substation-plugin')
          ?.shadowRoot?.querySelector('mwc-fab')
      )).click();
      await parent.requestUpdate();
      await parent.updateComplete;
      expect(parent.wizardUI.dialogs.length).to.equal(1);
    });
  });
});
