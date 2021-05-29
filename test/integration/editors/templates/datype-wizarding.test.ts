import { html, fixture, expect } from '@open-wc/testing';

import TemplatesPlugin from '../../../../src/editors/Templates.js';
import { MockWizardEditor } from '../../../mock-wizard-editor.js';

import { Select } from '@material/mwc-select';
import { WizardTextField } from '../../../../src/wizard-textfield.js';

describe('DAType wizards', () => {
  let doc: Document;
  customElements.define('templates-editor', TemplatesPlugin);
  let parent: MockWizardEditor;
  let templates: TemplatesPlugin;

  beforeEach(async () => {
    parent = await fixture(
      html`<mock-wizard-editor
        ><templates-editor></templates-editor
      ></mock-wizard-editor>`
    );

    templates = <TemplatesPlugin>parent.querySelector('templates-editor')!;

    doc = await fetch('/base/test/testfiles/datypes.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    templates.doc = doc;
    await templates.updateComplete;
  });

  describe('defines a createDATypeWizard', () => {
    let selector: Select;
    let idField: WizardTextField;
    let primayAction: HTMLElement;
    beforeEach(async () => {
      const button = <HTMLElement>(
        templates?.shadowRoot?.querySelector(
          'mwc-icon-button[icon="playlist_add"]'
        )
      );
      button.click();
      await parent.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      selector = <Select>(
        parent.wizardUI.dialog?.querySelector('mwc-select[label="values"]')
      );
      idField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-textfield[label="id"]')
      );
      primayAction = <HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );
    });

    it('looks like the latest snapshot', () => {
      expect(parent.wizardUI.dialog).to.equalSnapshot();
    });

    it('allows to add empty DATypes to the project', async () => {
      expect(doc.querySelector('DAType[id="myGeneralDAType"]')).to.not.exist;
      idField.maybeValue = 'myGeneralDAType';
      await parent.requestUpdate();
      primayAction.click();
      await parent.updateComplete;
      expect(doc.querySelector('DAType[id="myGeneralDAType"]')).to.exist;
    });
    it('respects the sequence defined in the standard', async () => {
      idField.maybeValue = 'myGeneralDAType';
      await parent.requestUpdate();
      primayAction.click();
      await parent.updateComplete;
      const element = doc.querySelector('DAType[id="myGeneralDAType"]');
      expect(element?.nextElementSibling?.tagName).to.equal('DAType');
      expect(element?.previousElementSibling?.tagName).to.equal('DOType');
    });
    it('recursevly add missing! subsequent EnumType elements', async () => {
      expect(doc.querySelector('DAType[id="myOriginator"]')).to.not.exist;
      selector.value = 'OpenSCD_Originator';
      idField.maybeValue = 'myOriginator';
      await parent.requestUpdate();
      primayAction.click();
      await parent.updateComplete;
      expect(doc.querySelector('DAType[id="myOriginator"]')).to.exist;
      expect(doc.querySelector('EnumType[id="OriginatorCategoryKind"]')).to
        .exist;
      expect(
        doc.querySelectorAll('EnumType[id="OriginatorCategoryKind"]').length
      ).to.equal(1);
    });
  });

  /* describe('defines a dATypeWizard',{

    it('looks like the latest snapshot',{});
    it('allows to edit DATypes to the project',{});
  })

  describe('defines a bDAWizard to edit BDA element',{

    it('looks like the latest snapshot',{});
    it('filters available types depending on the bType',{});
    it('enables type selection only for bType Enum or DAType',{});
    it('remembers the current type',{});
    it('allows to edit BDA elements',{});
    it('does not edit unchanged BDA elements',{});
  }) */
});
