import { fixture, html, expect } from '@open-wc/testing';

import '../../../mock-wizard-editor.js';
import { MockWizardEditor } from '../../../mock-wizard-editor.js';

import '../../../../src/editors/substation/function-editor.js';
import { FunctionEditor } from '../../../../src/editors/substation/function-editor.js';
import { WizardTextField } from '../../../../src/wizard-textfield.js';

describe('function-editor wizarding editing integration', () => {
  describe('open create wizard for element SubFunction', () => {
    let doc: XMLDocument;
    let parent: MockWizardEditor;
    let element: FunctionEditor | null;

    let nameField: WizardTextField;
    let primaryAction: HTMLElement;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/zeroline/functions.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
        await fixture(
          html`<mock-wizard-editor
            ><function-editor
              .element=${doc.querySelector('Function')}
            ></function-editor
          ></mock-wizard-editor>`
        )
      );

      element = parent.querySelector('function-editor');

      (<HTMLElement>(
        element?.shadowRoot?.querySelector('mwc-list-item[value="SubFunction"]')
      )).click();
      await parent.updateComplete;

      nameField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-textfield[label="name"]')
      );

      primaryAction = <HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );
    });

    it('does not add SubFunction if name attribute is not unique', async () => {
      expect(
        doc.querySelector(
          'Substation > Function > SubFunction[name="mySubFunc"]'
        )
      ).to.exist;

      nameField.value = 'mySubFunc';
      primaryAction.click();
      await parent.updateComplete;

      expect(
        doc.querySelectorAll(
          'Substation > Function > SubFunction[name="mySubFunc"]'
        ).length
      ).to.equal(1);
    });

    it('does add SubFunction if name attribute is unique', async () => {
      expect(
        doc.querySelector(
          'Substation > Function > SubFunction[name="someNewFunction"]'
        )
      ).to.not.exist;

      nameField.value = 'someNewFunction';
      await parent.updateComplete;
      primaryAction.click();

      expect(
        doc.querySelector(
          'Substation > Function > SubFunction[name="someNewFunction"]'
        )
      ).to.exist;
    });
  });
});
