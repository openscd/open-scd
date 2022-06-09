import { fixture, html, expect } from '@open-wc/testing';

import '../../../mock-wizard-editor.js';
import { MockWizardEditor } from '../../../mock-wizard-editor.js';

import '../../../../src/editors/substation/l-node-editor.js';
import { LNodeEditor } from '../../../../src/editors/substation/l-node-editor.js';
import { WizardTextField } from '../../../../src/wizard-textfield.js';

describe('l-node-editor wizarding editing integration', () => {
  let doc: XMLDocument;
  let parent: MockWizardEditor;
  let element: LNodeEditor | null;

  let primaryAction: HTMLElement;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/zeroline/functions.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    parent = <MockWizardEditor>(
      await fixture(
        html`<mock-wizard-editor
          ><l-node-editor
            .element=${doc.querySelector('Substation > LNode[lnClass="CSWI"]')}
          ></l-node-editor
        ></mock-wizard-editor>`
      )
    );

    element = parent.querySelector('l-node-editor');
  });

  describe('has a delete icon button that', () => {
    let deleteButton: HTMLElement;

    beforeEach(async () => {
      deleteButton = <HTMLElement>(
        element?.shadowRoot?.querySelector('mwc-fab[icon="delete"]')
      );
      await parent.updateComplete;
    });

    it('removes the attached LNode element from the document', async () => {
      expect(doc.querySelector('Substation > LNode[lnClass="CSWI"]')).to.exist;

      await deleteButton.click();

      expect(doc.querySelector('Substation > LNode[lnClass="CSWI"]')).to.not
        .exist;
    });
  });

  describe('has a edit icon button that', () => {
    let prefixField: WizardTextField;
    let lnInstField: WizardTextField;

    beforeEach(async () => {
      element!.element = doc.querySelector(
        'SubFunction[name="myBaySubFunc"] > LNode[lnClass="XSWI"]'
      )!;

      (<HTMLElement>(
        element?.shadowRoot?.querySelector('mwc-fab[icon="edit"]')
      )).click();
      await parent.updateComplete;

      prefixField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector(
          'wizard-textfield[label="prefix"]'
        )
      );

      lnInstField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector(
          'wizard-textfield[label="lnInst"]'
        )
      );

      primaryAction = <HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );

      await parent.updateComplete;
    });

    it('changes prefix attribute on primary action', async () => {
      prefixField.value = 'newPref';

      primaryAction.click();
      await parent.updateComplete;

      expect(
        doc.querySelector(
          'SubFunction[name="myBaySubFunc"] > LNode[lnClass="XSWI"]'
        )
      ).to.have.attribute('prefix', 'newPref');
    });

    it('changes lnInst attribute on primary action', async () => {
      lnInstField.value = '31';

      primaryAction.click();
      await parent.updateComplete;

      expect(
        doc.querySelector(
          'SubFunction[name="myBaySubFunc"] > LNode[lnClass="XSWI"]'
        )
      ).to.have.attribute('lnInst', '31');
    });
  });

  describe('has a copy content icon button that', () => {
    let contentCopyButton: HTMLElement;

    beforeEach(async () => {
      element!.element = doc.querySelector(
        'SubFunction[name="mySubFunc2"] > LNode[lnClass="XSWI"]'
      )!;
      await parent.updateComplete;

      contentCopyButton = <HTMLElement>(
        element?.shadowRoot?.querySelector('mwc-fab[icon="content_copy"]')
      );
      await parent.updateComplete;
    });

    it('adds new LNode element', async () => {
      contentCopyButton.click();
      await parent.updateComplete;

      expect(
        doc.querySelectorAll(
          'SubFunction[name="mySubFunc2"] > LNode[lnClass="XSWI"]'
        )
      ).to.have.lengthOf(3);
    });

    it('makes sure the lnInst is always unique', async () => {
      contentCopyButton.click();
      contentCopyButton.click();
      contentCopyButton.click();
      await parent.updateComplete;

      expect(
        doc.querySelectorAll(
          'SubFunction[name="mySubFunc2"] > LNode[lnClass="XSWI"]'
        )
      ).to.have.lengthOf(5);

      const lnInsts = Array.from(
        doc.querySelectorAll(
          'SubFunction[name="mySubFunc2"] > LNode[lnClass="XSWI"]'
        )
      ).map(lNode => lNode.getAttribute('lnInst')!);

      const duplicates = lnInsts.filter(
        (item, index) => lnInsts.indexOf(item) !== index
      );

      expect(duplicates).to.lengthOf(0);
    });
  });
});
