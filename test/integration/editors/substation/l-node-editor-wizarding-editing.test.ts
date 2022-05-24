import { fixture, html, expect } from '@open-wc/testing';

import '../../../mock-wizard-editor.js';
import { MockWizardEditor } from '../../../mock-wizard-editor.js';

import '../../../../src/editors/substation/l-node-editor.js';
import { LNodeEditor } from '../../../../src/editors/substation/l-node-editor.js';

describe('l-node-editor wizarding editing integration', () => {
  let doc: XMLDocument;
  let parent: MockWizardEditor;
  let element: LNodeEditor | null;

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
});
