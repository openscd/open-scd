import { html, fixture, expect } from '@open-wc/testing';

import '../../mock-wizard.js';
import { MockWizard } from '../../mock-wizard.js';

import { Editing } from '../../../src/Editing.js';
import Substation from '../../../src/editors/Substation.js';
import { Wizarding } from '../../../src/Wizarding.js';

describe('Substation Plugin', () => {
  customElements.define('substation-plugin', Wizarding(Editing(Substation)));
  let element: Substation;
  beforeEach(async () => {
    element = await fixture(html`<substation-plugin></substation-plugin>`);
  });

  describe('without a doc loaded', () => {
    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('with a doc loaded including substation section', () => {
    let doc: XMLDocument;
    let element: Substation;
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/valid2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      element = await fixture(
        html`<substation-plugin .doc="${doc}"></substation-plugin>`
      );
    });
    it('constains a zeroline-pane rendering the substation sections', () => {
      expect(element.shadowRoot?.querySelector('zeroline-pane')).to.exist;
    });
  });

  describe('with a doc loaded missing a substation section', () => {
    let doc: XMLDocument;
    let parent: MockWizard;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/missingSubstation.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizard>(
        await fixture(
          html`<mock-wizard
            ><substation-plugin .doc=${doc}></substation-plugin
          ></mock-wizard>`
        )
      );
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
      await parent.updateComplete;
      expect(parent.wizardUI.dialogs.length).to.equal(1);
    });
  });
});
