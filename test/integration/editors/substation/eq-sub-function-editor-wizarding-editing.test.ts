import { fixture, html, expect } from '@open-wc/testing';

import '../../../mock-wizard-editor.js';
import { MockWizardEditor } from '../../../mock-wizard-editor.js';

import '../../../../src/editors/substation/eq-sub-function-editor.js';
import { EqSubFunctionEditor } from '../../../../src/editors/substation/eq-sub-function-editor.js';
import { WizardTextField } from '../../../../src/wizard-textfield.js';

describe('eq-sub-function-editor wizarding editing integration', () => {
  describe('open create wizard for element EqSubFunction', () => {
    let doc: XMLDocument;
    let parent: MockWizardEditor;
    let element: EqSubFunctionEditor | null;

    let nameField: WizardTextField;
    let primaryAction: HTMLElement;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/zeroline/functions.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
        await fixture(
          html`<mock-wizard-editor
            ><eq-sub-function-editor
              .element=${doc.querySelector(
                'ConductingEquipment[name="QA1"] EqSubFunction'
              )}
            ></eq-sub-function-editor
          ></mock-wizard-editor>`
        )
      );

      element = parent.querySelector('eq-sub-function-editor');

      (<HTMLElement>(
        element?.shadowRoot?.querySelector(
          'mwc-list-item[value="EqSubFunction"]'
        )
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

    it('does not add EqSubFunction if name attribute is not unique', async () => {
      expect(
        doc.querySelector(
          'ConductingEquipment[name="QA1"] EqSubFunction[name="myEqSubSubFunction"]'
        )
      ).to.exist;

      nameField.value = 'myEqSubSubFunction';
      primaryAction.click();
      await parent.updateComplete;

      expect(
        doc.querySelectorAll(
          'ConductingEquipment[name="QA1"] EqSubFunction[name="myEqSubSubFunction"]'
        ).length
      ).to.equal(1);
    });

    it('does add EqFunction if name attribute is unique', async () => {
      expect(
        doc.querySelector(
          'ConductingEquipment[name="QA1"] EqSubFunction[name="someNewEqSubFunction"]'
        )
      ).to.not.exist;

      nameField.value = 'someNewEqSubFunction';
      await parent.updateComplete;
      primaryAction.click();

      expect(
        doc.querySelector(
          'ConductingEquipment[name="QA1"] EqSubFunction[name="someNewEqSubFunction"]'
        )
      ).to.exist;
    });
  });
});
