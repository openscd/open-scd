import { fixture, html, expect } from '@open-wc/testing';

import '../../../mock-wizard-editor.js';
import { MockWizardEditor } from '../../../mock-wizard-editor.js';

import '../../../../src/editors/substation/sub-function-editor.js';
import { SubFunctionEditor } from '../../../../src/editors/substation/sub-function-editor.js';
import { WizardTextField } from '../../../../src/wizard-textfield.js';

describe('sub-function-editor wizarding editing integration', () => {
  describe('open create wizard for element SubFunction', () => {
    let doc: XMLDocument;
    let parent: MockWizardEditor;
    let element: SubFunctionEditor | null;

    let nameField: WizardTextField;
    let primaryAction: HTMLElement;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/zeroline/functions.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
        await fixture(
          html`<mock-wizard-editor
            ><sub-function-editor
              .element=${doc.querySelector(
                'Function[name="voltLvName"] > SubFunction'
              )}
            ></sub-function-editor
          ></mock-wizard-editor>`
        )
      );

      element = parent.querySelector('sub-function-editor');

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
          'Function[name="voltLvName"] > SubFunction > SubFunction'
        )
      ).to.exist;

      nameField.value = 'mySubSubFunction';
      primaryAction.click();
      await parent.updateComplete;

      expect(
        doc.querySelectorAll(
          'Function[name="voltLvName"] > SubFunction > SubFunction'
        ).length
      ).to.equal(1);
    });

    it('does add SubFunction if name attribute is unique', async () => {
      expect(
        doc.querySelector(
          'Function[name="voltLvName"] > SubFunction > SubFunction[name="someNewSubFunction"]'
        )
      ).to.not.exist;

      nameField.value = 'someNewSubFunction';
      await parent.updateComplete;
      primaryAction.click();

      expect(
        doc.querySelector(
          'Function[name="voltLvName"] > SubFunction > SubFunction[name="someNewSubFunction"]'
        )
      ).to.exist;
    });
  });
});
