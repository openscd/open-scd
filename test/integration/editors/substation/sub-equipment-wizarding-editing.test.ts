import { fixture, html, expect } from '@open-wc/testing';

import '../../../mock-wizard-editor.js';
import { MockWizardEditor } from '../../../mock-wizard-editor.js';

import '../../../../src/editors/substation/sub-equipment-editor.js';
import { WizardTextField } from '../../../../src/wizard-textfield.js';
import { SubEquipmentEditor } from '../../../../src/editors/substation/sub-equipment-editor.js';
import { WizardCheckbox } from '../../../../src/wizard-checkbox.js';

describe('sub-equipment-editor wizarding editing integration', () => {
  let doc: XMLDocument;
  let parent: MockWizardEditor;
  let element: SubEquipmentEditor | null;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/SubEquipment.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    parent = <MockWizardEditor>(
      await fixture(
        html`<mock-wizard-editor
          ><sub-equipment-editor
            .element=${doc.querySelector('SubEquipment[name="subque"]')}
          ></sub-equipment-editor
        ></mock-wizard-editor>`
      )
    );

    element = parent.querySelector('sub-equipment-editor');
  });

  describe('open edit wizard', () => {
    let nameField: WizardTextField;
    let virtualField: WizardCheckbox;
    let primaryAction: HTMLElement;

    beforeEach(async () => {
      (<HTMLElement>(
        element?.shadowRoot?.querySelector('mwc-icon-button[icon="edit"]')
      )).click();
      await parent.updateComplete;

      nameField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-textfield[label="name"]')
      );

      virtualField = <WizardCheckbox>(
        parent.wizardUI.dialog?.querySelector(
          'wizard-checkbox[label="virtual"]'
        )
      );

      primaryAction = <HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );
    });

    it('does not update SubEquipment if name attribute is not unique', async () => {
      nameField.value = 'addEqi';
      primaryAction.click();
      await parent.updateComplete;

      expect(doc.querySelectorAll('SubEquipment[name="addEqi"]')).to.lengthOf(
        1
      );
    });

    it('does update SubEquipment if name attribute is unique', async () => {
      nameField.value = 'addEqi2';
      await parent.updateComplete;
      primaryAction.click();

      expect(doc.querySelector('SubEquipment[name="addEqi2"]')).to.exist;
      expect(doc.querySelector('SubEquipment[name="subque"]')).to.not.exist;
    });

    it('does update SubEquipment when virtual is checked', async () => {
      expect(virtualField.nullSwitch).to.exist;

      virtualField.nullSwitch?.click();

      virtualField.maybeValue = 'true';

      await parent.updateComplete;
      primaryAction.click();

      expect(
        doc
          .querySelector('SubEquipment[name="subque"]')
          ?.hasAttribute('virtual')
      );
      expect(
        doc
          .querySelector('SubEquipment[name="subque"]')
          ?.getAttribute('virtual')
      ).to.equal('true');
    });
  });
});
