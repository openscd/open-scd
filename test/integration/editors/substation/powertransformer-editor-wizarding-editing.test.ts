import { fixture, html, expect } from '@open-wc/testing';

import '../../../mock-wizard-editor.js';
import { MockWizardEditor } from '../../../mock-wizard-editor.js';

import '../../../../src/editors/substation/powertransformer-editor.js';
import { PowerTransformerEditor } from '../../../../src/editors/substation/powertransformer-editor.js';
import { WizardTextField } from '../../../../src/wizard-textfield.js';

describe('powertransformer-editor wizarding editing integration', () => {
  describe('open create wizard for element EqFunction', () => {
    let doc: XMLDocument;
    let parent: MockWizardEditor;
    let element: PowerTransformerEditor | null;

    let nameField: WizardTextField;
    let primaryAction: HTMLElement;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/zeroline/functions.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
        await fixture(
          html`<mock-wizard-editor
            ><powertransformer-editor
              .element=${doc.querySelector('PowerTransformer[name="myPtr2"]')}
              ?showfunctions=${true}
            ></powertransformer-editor
          ></mock-wizard-editor>`
        )
      );

      element = parent.querySelector('powertransformer-editor');

      (<HTMLElement>(
        element?.shadowRoot?.querySelector('mwc-list-item[value="EqFunction"]')
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

    it('does not add EqFunction if name attribute is not unique', async () => {
      expect(
        doc.querySelector(
          'PowerTransformer[name="myPtr2"] > EqFunction[name="myEqFuncPtr2"]'
        )
      ).to.exist;

      nameField.value = 'myEqFuncPtr2';
      primaryAction.click();
      await parent.updateComplete;

      expect(
        doc.querySelectorAll(
          'PowerTransformer[name="myPtr2"] > EqFunction[name="myEqFuncPtr2"]'
        ).length
      ).to.equal(1);
    });

    it('does add EqFunction if name attribute is unique', async () => {
      expect(
        doc.querySelector(
          'PowerTransformer[name="myPtr2"] > EqFunction[name="someNewFunction"]'
        )
      ).to.not.exist;

      nameField.value = 'someNewFunction';
      await parent.updateComplete;
      primaryAction.click();

      expect(
        doc.querySelector(
          'PowerTransformer[name="myPtr2"] > EqFunction[name="someNewFunction"]'
        )
      ).to.exist;
    });
  });
});
