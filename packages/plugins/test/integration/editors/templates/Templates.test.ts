import { html, fixture, expect } from '@open-wc/testing';

import '@openscd/open-scd/test/mock-open-scd.js';
import { MockOpenSCD } from '@openscd/open-scd/test/mock-open-scd.js';

import TemplatesPlugin from '../../../../src/editors/Templates.js';

import { newWizardEvent } from '@openscd/open-scd/src/foundation.js';

describe('Templates Plugin', () => {
  customElements.define('templates-plugin', TemplatesPlugin);

  let element: TemplatesPlugin;
  let parent: MockOpenSCD;

  beforeEach(async () => {
    parent = await fixture(
      html`<mock-open-scd><templates-plugin></templates-plugin></mock-open-scd>`
    );

    element = parent.getActivePlugin();
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
      await element.requestUpdate();
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });

    describe('having a LNodeType element list that', () => {
      beforeEach(async () => {
        parent.workflow.length = 0;
        (<HTMLElement>(
          element?.shadowRoot
            ?.querySelectorAll('filtered-list')[0]
            .querySelector('mwc-list-item')
        )).click();

        await parent.requestUpdate();
      });

      it('opens a LNodeType edit wizard on list element click', () =>
        expect(
          parent.wizardUI.dialog?.querySelector(
            'wizard-textfield[label="lnClass"]'
          )
        ).to.exist);

      it('allows to reopen the LNodeType edit wizard for the same element', async () => {
        parent.dispatchEvent(newWizardEvent());

        await parent.requestUpdate();

        (<HTMLElement>(
          element?.shadowRoot?.querySelector(
            'filtered-list:nth-of-type(1) > mwc-list-item'
          )
        )).click();
        await parent.requestUpdate();

        expect(
          parent.wizardUI.dialog?.querySelector(
            'wizard-textfield[label="lnClass"]'
          )
        ).to.exist;
      });
    });

    describe('having a DOType element list that', () => {
      beforeEach(async () => {
        parent.workflow.length = 0;
        (<HTMLElement>(
          element?.shadowRoot
            ?.querySelectorAll('filtered-list')[1]
            .querySelector('mwc-list-item')
        )).click();

        await parent.requestUpdate();
      });

      it('opens a DOType edit wizard on list element click', () =>
        expect(
          parent.wizardUI.dialog?.querySelector('wizard-textfield[label="CDC"]')
        ).to.exist);

      it('allows to reopen the DOType edit wizard for the same element', async () => {
        parent.dispatchEvent(newWizardEvent());

        await parent.requestUpdate();

        (<HTMLElement>(
          element?.shadowRoot
            ?.querySelectorAll('filtered-list')[1]
            .querySelector('mwc-list-item')
        )).click();
        await parent.requestUpdate();

        expect(
          parent.wizardUI.dialog?.querySelector('wizard-textfield[label="CDC"]')
        ).to.exist;
      });
    });

    describe('having a DAType element list that', () => {
      beforeEach(async () => {
        parent.workflow.length = 0;
        (<HTMLElement>(
          element?.shadowRoot
            ?.querySelectorAll('filtered-list')[2]
            .querySelector('mwc-list-item')
        )).click();

        await parent.requestUpdate();
      });

      it('opens a DAType edit wizard on list element click', () =>
        expect(parent.wizardUI.dialog).to.exist);

      it('allows to reopen the DAType edit wizard for the same element', async () => {
        parent.dispatchEvent(newWizardEvent());

        await parent.requestUpdate();

        (<HTMLElement>(
          element?.shadowRoot
            ?.querySelectorAll('filtered-list')[3]
            .querySelector('mwc-list-item')
        )).click();
        await parent.requestUpdate();

        expect(parent.wizardUI.dialog).to.exist;
      });
    });

    describe('having a EnumType element list that', () => {
      beforeEach(async () => {
        parent.workflow.length = 0;
        (<HTMLElement>(
          element?.shadowRoot
            ?.querySelectorAll('filtered-list')[3]
            .querySelector('mwc-list-item')
        )).click();

        await parent.requestUpdate();
      });

      it('opens a EnumType edit wizard on list element click', () =>
        expect(parent.wizardUI.dialog).to.exist);

      it('allows to reopen the EnumType edit wizard for the same element', async () => {
        parent.dispatchEvent(newWizardEvent());

        await parent.requestUpdate();

        (<HTMLElement>(
          element?.shadowRoot
            ?.querySelectorAll('filtered-list')[3]
            .querySelector('mwc-list-item')
        )).click();
        await parent.requestUpdate();

        expect(parent.wizardUI.dialog).to.exist;
      });
    });
  });

  describe('with a doc loaded missing a datatypetemplates section', () => {
    let doc: XMLDocument;
    let parent: MockOpenSCD;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/templates/missingdatatypes.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      parent = await fixture(
        html`<mock-open-scd
          ><templates-plugin .doc=${doc}></templates-plugin
        ></mock-open-scd>`
      );
      element = parent.getActivePlugin();
      await element.updateComplete;
    });

    it('has a mwc-fab', () => {
      expect(element.shadowRoot?.querySelector('mwc-fab')).to.exist;
    });

    it('adds a DataTypeTemplates on floating action button click', async () => {
      expect(doc.querySelector('DataTypeTemplates')).to.not.exist;
      (<HTMLElement>(
        parent
          ?.querySelector('templates-plugin')
          ?.shadowRoot?.querySelector('mwc-fab')
      )).click();
      await parent.updateComplete;
      expect(
        parent!
          .querySelector<TemplatesPlugin>('templates-plugin')!
          .doc!.querySelector('DataTypeTemplates')
      ).to.exist;
    });
  });

  describe('with a doc loaded having a datatypetemplates section', () => {
    let doc: XMLDocument;
    let parent: MockOpenSCD;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/templates/datypes.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = await fixture(
        html`<mock-open-scd
          ><templates-plugin .doc=${doc}></templates-plugin
        ></mock-open-scd>`
      );
      element = parent.getActivePlugin();
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
