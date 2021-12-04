import { html, fixture, expect } from '@open-wc/testing';

import '../../../mock-wizard-editor.js';
import { MockWizardEditor } from '../../../mock-wizard-editor.js';

import { Editing, EditingElement } from '../../../../src/Editing.js';
import { Wizarding, WizardingElement } from '../../../../src/Wizarding.js';
import TemplatesPlugin from '../../../../src/editors/Templates.js';

describe('Templates Plugin', () => {
  customElements.define(
    'templates-plugin',
    Wizarding(Editing(TemplatesPlugin))
  );
  let element: TemplatesPlugin;
  beforeEach(async () => {
    element = await fixture(html`<templates-plugin></templates-plugin>`);
  });

  describe('without a doc loaded', () => {
    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('with a doc loaded', () => {
    let doc: XMLDocument;
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/templates/datypes.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      element.doc = doc;
      await element.updateComplete;
    });
    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('with a doc loaded missing a datatypetemplates section', () => {
    let doc: XMLDocument;
    let parent: MockWizardEditor;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/templates/missingdatatypes.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      parent = <MockWizardEditor>(
        await fixture(
          html`<mock-wizard-editor
            ><templates-plugin .doc=${doc}></templates-plugin
          ></mock-wizard-editor>`
        )
      );
      await element.updateComplete;
    });
    it('has a mwc-fab', () => {
      expect(element.shadowRoot?.querySelector('mwc-fab')).to.exist;
    });
    it('adding a DataTypeTemplates on click()', async () => {
      expect(doc.querySelector('DataTypeTemplates')).to.not.exist;
      (<HTMLElement>(
        parent
          ?.querySelector('templates-plugin')
          ?.shadowRoot?.querySelector('mwc-fab')
      )).click();
      await parent.updateComplete;
      expect(doc.querySelector('DataTypeTemplates')).to.exist;
    });
  });
  describe('with a doc loaded having a datatypetemplates section', () => {
    let doc: XMLDocument;
    let parent: WizardingElement & EditingElement;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/templates/datypes.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <WizardingElement & EditingElement>(
        await fixture(
          html`<mock-wizard-editor
            ><templates-plugin .doc=${doc}></templates-plugin
          ></mock-wizard-editor>`
        )
      );
      await element.updateComplete;
    });
    it('opens an add enumtype wizard', async () => {
      expect(parent.wizardUI.dialogs.length).to.equal(0);
      (<HTMLElement>(
        parent
          ?.querySelector('templates-plugin')
          ?.shadowRoot?.querySelectorAll(
            'mwc-icon-button[icon="playlist_add"]'
          )[2]
      )).click();
      await parent.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      expect(parent.wizardUI.dialogs.length).to.equal(1);
    });
    it('adding an EnumType with the enumtype wizard', async () => {
      expect(doc.querySelectorAll('EnumType').length).to.equal(4);
      (<HTMLElement>(
        parent
          ?.querySelector('templates-plugin')
          ?.shadowRoot?.querySelector(
            'section:last-child mwc-icon-button[icon="playlist_add"]'
          )
      )).click();
      await parent.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      parent.wizardUI.inputs[1].value = 'myID';
      await parent.updateComplete;
      (<HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      )).click();
      await parent.updateComplete;
      expect(doc.querySelectorAll('EnumType').length).to.equal(5);
    });
  });
});
