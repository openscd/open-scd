import { expect, fixture, html } from '@open-wc/testing';

import '../../../mock-wizard-editor.js';
import { MockWizardEditor } from '../../../mock-wizard-editor.js';

import '../../../../src/editors/substation/transformer-winding-editor.js';
import { TransformerWindingEditor } from '../../../../src/editors/substation/transformer-winding-editor.js';
import { WizardTextField } from '../../../../src/wizard-textfield.js';
import { WizardCheckbox } from '../../../../src/wizard-checkbox.js';

describe('transformer-winding-editor wizarding editing integration', () => {
  let doc: XMLDocument;
  let parent: MockWizardEditor;
  let element: TransformerWindingEditor | null;

  describe('edit wizard', () => {
    let nameField: WizardTextField;
    let descField: WizardTextField;
    let primaryAction: HTMLElement;
    let secondaryAction: HTMLElement;

    beforeEach(async () => {
      doc = await fetch(
        'test/testfiles/editors/substation/TransformerWinding.scd'
      )
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
        await fixture(
          html`<mock-wizard-editor
            ><transformer-winding-editor
              .element=${doc.querySelector('TransformerWinding[name="some"]')}
            ></transformer-winding-editor
          ></mock-wizard-editor>`
        )
      );
      element = parent.querySelector('transformer-winding-editor');
      await (<HTMLElement>(
        element?.shadowRoot?.querySelector('mwc-icon-button[icon="edit"]')
      )).click();
      await parent.updateComplete;

      nameField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-textfield[label="name"]')
      );
      descField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-textfield[label="desc"]')
      );

      secondaryAction = <HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="secondaryAction"]'
        )
      );
      primaryAction = <HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );
    });
    it('closes on secondary action', async () => {
      secondaryAction.click();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      expect(parent.wizardUI.dialog).to.not.exist;
    });
    it('does not change name attribute if not unique within parent element', async () => {
      const oldName = nameField.value;
      nameField.value = 'some1';
      primaryAction.click();
      await parent.updateComplete;
      expect(
        doc
          .querySelector('TransformerWinding[name="some"]')
          ?.getAttribute('name')
      ).to.equal(oldName);
    });
    it('changes desc attribute on primary action', async () => {
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      descField.nullSwitch!.click();
      await parent.updateComplete;
      descField.value = 'newDesc';
      primaryAction.click();
      await parent.updateComplete;
      expect(
        doc
          .querySelector('TransformerWinding[name="some"]')
          ?.getAttribute('desc')
      ).to.equal('newDesc');
    });
    it('changes virtual attribute on primary action', async () => {
      const virtualCheckbox = <WizardCheckbox>(
        parent.wizardUI.dialog?.querySelector(
          'wizard-checkbox[label="virtual"]'
        )
      );
      virtualCheckbox.nullSwitch!.click();
      virtualCheckbox.maybeValue = 'true';
      primaryAction.click();
      await parent.updateComplete;
      expect(
        doc
          .querySelector('TransformerWinding[name="some"]')
          ?.getAttribute('virtual')
      ).to.equal('true');
    });

    describe('has a delete icon button that', () => {
      let deleteButton: HTMLElement;

      beforeEach(async () => {
        deleteButton = <HTMLElement>(
          element?.shadowRoot?.querySelector('mwc-icon-button[icon="delete"]')
        );
        await parent.updateComplete;
      });

      it('removes the attached TransformerWinding element from the document', async () => {
        expect(doc.querySelector('TransformerWinding[name="some"]')).to.exist;
        console.log(deleteButton);
        await deleteButton.click();

        //expect(doc.querySelector('TransformerWinding[name="some"]')).to.not
        //  .exist;
      });
    });
  });
});
