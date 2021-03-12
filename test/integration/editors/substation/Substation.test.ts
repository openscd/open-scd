import { html, fixture, expect } from '@open-wc/testing';

import '../../../mock-wizard.js';
import { Editing } from '../../../../src/Editing.js';
import Substation from '../../../../src/editors/Substation.js';
import { Wizarding, WizardingElement } from '../../../../src/Wizarding.js';

import { getDocument, missingSubstation } from '../../../data.js';

describe('Substation Plugin', () => {
  customElements.define('substation-plugin', Wizarding(Editing(Substation)));
  let element: Substation;
  beforeEach(async () => {
    element = await fixture(html`<substation-plugin></substation-plugin>`);
  });

  describe('without a doc loaded', () => {
    it('looks like the latest snapshot', () => {
      expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('with a doc loaded including substation section', () => {
    const doc = getDocument();
    let element: Substation;
    beforeEach(async () => {
      element = await fixture(
        html`<substation-plugin .doc="${doc}"></substation-plugin>`
      );
    });
    it('constains a substation-editor rendering the substation section', () => {
      expect(element.shadowRoot?.querySelector('substation-editor')).to.exist;
    });
  });

  describe('with a doc loaded missing a substation section', () => {
    const doc = new DOMParser().parseFromString(
      missingSubstation,
      'application/xml'
    );
    let parent: WizardingElement;

    beforeEach(async () => {
      parent = <WizardingElement>(
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
    it('that opens a add substation wizard on click()', async () => {
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
