import { expect, fixture, html } from '@open-wc/testing';

import '../../../mock-wizard-editor.js';
import { MockWizardEditor } from '../../../mock-wizard-editor.js';

import { CheckListItem } from '@material/mwc-list/mwc-check-list-item';

import '../../../../src/open-scd.js';
import ImportingIedPlugin from '../../../../src/menu/ImportIEDs.js';
import { OpenSCD } from '../../../../src/open-scd.js';

describe('ImportIedsPlugin', () => {
  customElements.define('import-ieds-plugin', ImportingIedPlugin);

  describe('imports valid ied elements', () => {
    let doc: XMLDocument;
    let importDoc: XMLDocument;

    let parent: MockWizardEditor;
    let element: ImportingIedPlugin;

    beforeEach(async () => {
      parent = await fixture(
        html`<mock-wizard-editor
          ><import-ieds-plugin></import-ieds-plugin
        ></mock-wizard-editor>`
      );

      element = <ImportingIedPlugin>parent.querySelector('import-ieds-plugin')!;

      doc = await fetch('/test/testfiles/valid2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      element.doc = doc;
      await element.updateComplete;

      importDoc = await fetch('/test/testfiles/importieds/valid.iid')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    });

    it('loads ied element to the project', async () => {
      expect(element.doc?.querySelector(':root > IED[name="TestImportIED"]')).to
        .not.exist;
      element.prepareImport(importDoc, doc);
      await element.updateComplete;
      expect(element.doc?.querySelector(':root > IED[name="TestImportIED"]')).to
        .exist;
    });

    it('loads unique lnodetypes to the project', () => {
      expect(
        element.doc?.querySelectorAll(':root > DataTypeTemplates >  LNodeType')
          .length
      ).to.equal(11);
      element.prepareImport(importDoc, doc);
      expect(
        element.doc?.querySelectorAll(':root > DataTypeTemplates >  LNodeType')
          .length
      ).to.equal(16);
    });
    it('loads unique dotypes to the project', () => {
      expect(
        element.doc?.querySelectorAll(':root > DataTypeTemplates >  DOType')
          .length
      ).to.equal(16);
      element.prepareImport(importDoc, doc);
      expect(
        element.doc?.querySelectorAll(':root > DataTypeTemplates >  DOType')
          .length
      ).to.equal(26);
    });

    it('loads unique datypes to the project', () => {
      expect(
        element.doc?.querySelectorAll(':root > DataTypeTemplates >  DAType')
          .length
      ).to.equal(7);
      element.prepareImport(importDoc, doc);
      expect(
        element.doc?.querySelectorAll(':root > DataTypeTemplates >  DAType')
          .length
      ).to.equal(11);
    });
    it('loads unique enumtypes to the project', () => {
      expect(
        element.doc?.querySelectorAll(':root > DataTypeTemplates >  EnumType')
          .length
      ).to.equal(4);
      element.prepareImport(importDoc, doc);
      expect(
        element.doc?.querySelectorAll(':root > DataTypeTemplates >  EnumType')
          .length
      ).to.equal(10);
    });
    it('adds the connectedap of the imported ied', () => {
      expect(element.doc.querySelector('ConnectedAP[iedName="TestImportIED"]'))
        .to.not.exist;
      element.prepareImport(importDoc, doc);
      expect(element.doc.querySelector('ConnectedAP[iedName="TestImportIED"]'))
        .to.exist;
      expect(
        element.doc.querySelector('ConnectedAP[iedName="TestImportIED"]')
          ?.parentElement
      ).to.equal(element.doc.querySelector('SubNetwork[name="NewSubNetwork"]'));
    });
    it('creates new subnetwork if not present in the doc', () => {
      expect(element.doc.querySelector('SubNetwork[name="NewSubNetwork"]')).to
        .not.exist;
      element.prepareImport(importDoc, doc);
      expect(element.doc.querySelector('SubNetwork[name="NewSubNetwork"]')).to
        .exist;
    });
    it('allows multiple import of TEMPLATE IEDs', async () => {
      expect(element.doc.querySelectorAll('IED').length).to.equal(3);

      const templateIED1 = await fetch(
        '/test/testfiles/importieds/template.icd'
      )
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      element.prepareImport(templateIED1, doc);

      const templateIED2 = await fetch(
        '/test/testfiles/importieds/template.icd'
      )
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      element.prepareImport(templateIED2, doc);

      expect(element.doc.querySelector('IED[name="TEMPLATE_IED1"]')).to.exist;
      expect(element.doc.querySelector('IED[name="TEMPLATE_IED2"]')).to.exist;
    });
    it('renders wizard for files containing more than one IED', async () => {
      const multipleIedDoc = await fetch(
        '/test/testfiles/importieds/multipleied.scd'
      )
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      element.prepareImport(multipleIedDoc, doc);

      await parent.updateComplete;

      expect(parent.wizardUI.dialog).to.exist;
      expect(
        parent.wizardUI.dialog?.querySelectorAll('mwc-check-list-item').length
      ).to.equal(3);
    });
    it('imports selected IED from Import IED wizard', async () => {
      const multipleIedDoc = await fetch(
        '/test/testfiles/importieds/multipleied.scd'
      )
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      element.prepareImport(multipleIedDoc, doc);
      await parent.updateComplete;

      (<CheckListItem>(
        parent.wizardUI.dialog!.querySelector(
          'mwc-check-list-item:nth-child(2)'
        )
      )).setAttribute('selected', 'true');
      await parent.requestUpdate();

      (<HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      )).click();
      await parent.updateComplete;

      expect(element.doc.querySelector('IED[name="IED4"]')).to.exist;
    });
  });

  describe('importing invalid ieds', () => {
    let doc: XMLDocument;
    let importDoc: XMLDocument;

    let parent: OpenSCD;
    let element: ImportingIedPlugin;

    beforeEach(async () => {
      parent = await fixture(
        html`<open-scd><import-ieds-plugin></import-ieds-plugin></open-scd>>`
      );

      element = <ImportingIedPlugin>parent.querySelector('import-ieds-plugin')!;

      doc = await fetch('/test/testfiles/valid2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      element.doc = doc;
      await element.updateComplete;
    });

    it('throws missing ied elements error', async () => {
      importDoc = await fetch('/test/testfiles/importieds/invalid.iid')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      element.prepareImport(importDoc, doc);

      expect(parent.history[0].kind).to.equal('error');
      expect(parent.history[0].title).to.equal('No IED element in the file');
    });
    it('throws duplicate ied name error', async () => {
      importDoc = await fetch('/test/testfiles/importieds/dublicate.iid')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      element.prepareImport(importDoc, doc);

      expect(parent.history[0].kind).to.equal('error');
      expect(parent.history[0].title).to.equal(
        'IED element IED2 already in the file'
      );
    });
    it('throws parser error', async () => {
      importDoc = await fetch('/test/testfiles/importieds/parsererror.iid')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      element.prepareImport(importDoc, doc);

      expect(parent.history[0].kind).to.equal('error');
      expect(parent.history[0].title).to.equal('Parser error');
    });
  });
});
